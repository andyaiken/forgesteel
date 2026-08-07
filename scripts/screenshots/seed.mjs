/**
 * Builds the app state that screenshots are taken against, and writes it into the
 * browser's storage.
 *
 * The state is built by importing the app's own data and logic modules from the Vite
 * dev server, so screenshots always use real, current data rather than hand-maintained
 * fixtures. It's done in the page rather than in Node because the app's modules expect
 * a browser, and because it's the same environment the app itself loads them in.
 */

// Matches DataStorageKeys in src/services/storage/local-service.ts
const StorageKeys = {
	Heroes: 'forgesteel-heroes',
	Sourcebooks: 'forgesteel-homebrew-settings',
	Session: 'forgesteel-session',
	HiddenSourcebookIDs: 'forgesteel-hidden-setting-ids',
	Options: 'forgesteel-options'
};

// localforage's IndexedDB defaults; see https://localforage.github.io/localForage/#settings-api-config.
// The version is deliberately not pinned here - localforage bumps it as it pleases, and we
// only ever want to join whatever database it has already created.
const LocalForageDb = { name: 'localforage', store: 'keyvaluepairs' };

// Pregens promoted to full heroes for screenshots, keyed by the name the manifest uses.
// Values are the pregen's `name` in src/data/pregen-data.ts.
const heroPicks = {
	tactician: 'The Earth Cries The Skies Divide',
	fury: 'Keth'
};

// Sample content started into the session, keyed by the name the manifest uses.
// Values name a static on the matching data class.
const sessionPicks = {
	encounters: { goblinAmbush: 'goblinAmbush' },
	montages: { fightFire: 'fightFire' },
	negotiations: { banditChief: 'banditChief' }
};

/**
 * Returns { storage, heroes } - the payload to write into IndexedDB, plus a summary of
 * what's in it for the manifest to build routes from. The page must be on the app's origin.
 */
export const buildSeedState = async (page, keys = StorageKeys, heroes = heroPicks, session = sessionPicks) => {
	return page.evaluate(async ({ keys, heroPicks, sessionPicks }) => {
		const { PregenData } = await import('/src/data/pregen-data.ts');
		const { PregenLogic } = await import('/src/logic/pregen-logic.ts');
		const { SourcebookData } = await import('/src/data/sourcebook-data.ts');
		const { SourcebookLogic } = await import('/src/logic/sourcebook-logic.ts');
		const { SessionLogic } = await import('/src/logic/session-logic.ts');
		const { FactoryLogic } = await import('/src/logic/factory-logic.ts');
		const { EncounterData } = await import('/src/data/encounter-data.ts');
		const { MontageData } = await import('/src/data/montage-data.ts');
		const { NegotiationData } = await import('/src/data/negotiation-data.ts');
		const { ProjectData } = await import('/src/data/project-data.ts');
		const { MonsterData } = await import('/src/data/monster-data.ts');
		const { KitData } = await import('/src/data/kit-data.ts');
		const { ConditionEndType, ConditionType } = await import('/src/enums/condition-type.ts');
		const { Utils } = await import('/src/utils/utils.ts');

		// Built-in sourcebooks load asynchronously; nothing else here works until they're cached
		await SourcebookData.loadAll();

		// cookieConsent suppresses the footer banner, which would otherwise appear in every shot.
		// The party has to be set - and match the heroes' folder - or encounters start with no
		// heroes in them, and the session screens all show their empty state.
		// This shows on screen as the heroes' folder, so it wants to read like a real party name
		const party = 'Adventuring Party';
		const options = { ...FactoryLogic.createOptions(), cookieConsent: true, party: party };
		const sourcebooks = SourcebookLogic.getSourcebooks([]);
		const pregens = PregenData.getPregens();

		const pick = (source, name, label) => {
			const found = source[name];
			if (!found) {
				throw new Error(`No ${label} called '${name}'. Available: ${Object.keys(source).join(', ')}`);
			}
			return found;
		};

		// #region Heroes

		const builtHeroes = {};
		Object.entries(heroPicks).forEach(([ key, name ]) => {
			const pregen = pregens.find(p => p.name === name);
			if (!pregen) {
				throw new Error(`No pregen named '${name}' (for hero '${key}'). Available: ${pregens.map(p => p.name).join(', ')}`);
			}

			const hero = PregenLogic.pregenToHero(pregen, sourcebooks, options);
			// Deterministic IDs keep routes - and therefore the manifest - stable between runs
			hero.id = `screenshot-hero-${key}`;
			// Encounters are populated from the active heroes in the party
			hero.isActive = true;
			hero.folder = party;
			builtHeroes[key] = hero;
		});

		// A pristine hero makes for dull screenshots: the vitals, inventory and project
		// panels would all be empty. Rough this one up a bit so those shots have content.
		const played = builtHeroes.tactician;
		if (played) {
			played.state.staminaDamage = 11;
			played.state.conditions = [
				{ id: 'screenshot-condition-1', type: ConditionType.Bleeding, text: '', ends: ConditionEndType.UntilRemoved }
			];
			played.state.inventory = SourcebookLogic.getItems(sourcebooks).slice(0, 3);
			played.state.projects = [ { ...ProjectData.discoverLore, progress: { prerequisites: true, source: true, followerID: null, points: 24 } } ];
		}

		// #endregion

		// #region Session

		const heroList = Object.values(builtHeroes);
		const built = { encounters: {}, montages: {}, negotiations: {} };

		Object.entries(sessionPicks.encounters).forEach(([ key, name ]) => {
			const started = SessionLogic.startEncounter(pick(EncounterData, name, 'encounter'), sourcebooks, heroList, options);
			started.id = `screenshot-encounter-${key}`;
			built.encounters[key] = started;
		});
		Object.entries(sessionPicks.montages).forEach(([ key, name ]) => {
			const started = SessionLogic.startMontage(pick(MontageData, name, 'montage'));
			started.id = `screenshot-montage-${key}`;
			built.montages[key] = started;
		});
		Object.entries(sessionPicks.negotiations).forEach(([ key, name ]) => {
			const started = SessionLogic.startNegotiation(pick(NegotiationData, name, 'negotiation'));
			started.id = `screenshot-negotiation-${key}`;
			built.negotiations[key] = started;
		});

		const sessionState = {
			...FactoryLogic.createSession(),
			encounters: Object.values(built.encounters),
			montages: Object.values(built.montages),
			negotiations: Object.values(built.negotiations),
			counters: [ { id: 'screenshot-counter-1', name: 'Reinforcements', description: 'Arrive when this reaches 5', value: 2 } ]
		};

		// #endregion

		// #region Homebrew

		// The built-in sourcebooks carry no encounters, montages, negotiations or monster groups
		// of your own, so the Library's director sections and every homebrew editor would open
		// on an empty list. This gives them something real to show.
		const homebrew = {
			...FactoryLogic.createSourcebook(),
			id: 'screenshot-sourcebook',
			name: 'Screenshot Sourcebook',
			description: 'Homebrew content for the tip screenshots.',
			// Re-IDed so they don't collide with the built-in copies they were taken from -
			// a collision resolves to the built-in one, which isn't editable
			encounters: [ { ...Utils.copy(EncounterData.goblinAmbush), id: 'screenshot-library-encounter' } ],
			montages: [ { ...Utils.copy(MontageData.fightFire), id: 'screenshot-library-montage' } ],
			negotiations: [ { ...Utils.copy(NegotiationData.banditChief), id: 'screenshot-library-negotiation' } ],
			// Renamed as well as re-IDed, so it doesn't show up as a second identical 'Angulotl'
			// next to the built-in group in monster pickers
			monsterGroups: [ { ...Utils.copy(MonsterData.angulotl), id: 'screenshot-library-monster-group', name: 'Angulotl Warband' } ],
			kits: [ { ...Utils.copy(KitData.battlemind), id: 'screenshot-library-kit' } ]
		};

		// #endregion

		const summarise = source => Object.fromEntries(Object.entries(source).map(([ key, value ]) => [ key, { id: value.id, name: value.name } ]));

		return {
			heroes: summarise(builtHeroes),
			encounters: summarise(built.encounters),
			montages: summarise(built.montages),
			negotiations: summarise(built.negotiations),
			homebrew: {
				id: homebrew.id,
				encounter: homebrew.encounters[0].id,
				montage: homebrew.montages[0].id,
				negotiation: homebrew.negotiations[0].id,
				monsterGroup: homebrew.monsterGroups[0].id,
				// The monster builder edits one monster within its group, so shots need its ID too
				monster: homebrew.monsterGroups[0].monsters[0].id,
				kit: homebrew.kits[0].id
			},
			storage: {
				[keys.Options]: options,
				[keys.Heroes]: Object.values(builtHeroes),
				[keys.Session]: sessionState,
				[keys.Sourcebooks]: [ homebrew ],
				[keys.HiddenSourcebookIDs]: []
			}
		};
	}, { keys: keys, heroPicks: heroes, sessionPicks: session });
};

/**
 * Writes the seeded state into localforage's IndexedDB store, replacing whatever's there.
 *
 * The page must already be on the app's origin; caller is expected to navigate or reload
 * afterwards so the app boots with the data in place.
 */
export const writeSeedState = async (page, storage) => {
	await page.evaluate(async ({ storage, db }) => {
		const open = version => new Promise((resolve, reject) => {
			const request = version ? indexedDB.open(db.name, version) : indexedDB.open(db.name);
			request.onupgradeneeded = () => {
				if (!request.result.objectStoreNames.contains(db.store)) {
					request.result.createObjectStore(db.store);
				}
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});

		// Join whatever database localforage has already created; only force an upgrade
		// on the off-chance the app hasn't written anything yet and the store is missing
		let connection = await open();
		if (!connection.objectStoreNames.contains(db.store)) {
			const version = connection.version + 1;
			connection.close();
			connection = await open(version);
		}

		await new Promise((resolve, reject) => {
			const transaction = connection.transaction(db.store, 'readwrite');
			const store = transaction.objectStore(db.store);
			store.clear();
			Object.entries(storage).forEach(([ key, value ]) => store.put(value, key));
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});

		connection.close();
	}, { storage: storage, db: LocalForageDb });
};
