import { Navigate, Route, Routes } from 'react-router';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Spin, notification } from 'antd';
import { Ability } from '@/models/ability';
import { AbilityModal } from '@/components/modals/ability/ability-modal';
import { AboutModal } from '@/components/modals/about/about-modal';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Ancestry } from '@/models/ancestry';
import { BackupPage } from '@/components/pages/backup/backup-page';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ConnectionSettings } from '@/models/connection-settings';
import { Counter } from '@/models/counter';
import { Culture } from '@/models/culture';
import { CultureType } from '@/enums/culture-type';
import { DataService } from '@/utils/data-service';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { ElementModal } from '@/components/modals/element/element-modal';
import { Encounter } from '@/models/encounter';
import { EncounterToolsModal } from '@/components/modals/encounter-tools/encounter-tools-modal';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureModal } from '@/components/modals/feature/feature-modal';
import { Follower } from '@/models/follower';
import { FollowerModal } from '@/components/modals/follower/follower-modal';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroEditPage } from '@/components/pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '@/components/pages/heroes/hero-list/hero-list-page';
import { HeroSheetPreviewPage } from '@/components/pages/heroes/hero-sheet/hero-sheet-preview-page';
import { HeroStateModal } from '@/components/modals/hero-state/hero-state-modal';
import { HeroStatePage } from '@/enums/hero-state-page';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { HeroViewPage } from '@/components/pages/heroes/hero-view/hero-view-page';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Kit } from '@/models/kit';
import { LibraryEditPage } from '@/components/pages/library/library-edit/library-edit-page';
import { LibraryListPage } from '@/components/pages/library/library-list/library-list-page';
import { MainLayout } from '@/components/main/main-layout';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterModal } from '@/components/modals/monster/monster-modal';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Options } from '@/models/options';
import { PartyModal } from '@/components/modals/party/party-modal';
import { Perk } from '@/models/perk';
import { PlayerViewModal } from '@/components/modals/player-view/player-view-modal';
import { Project } from '@/models/project';
import { ReferenceModal } from '@/components/modals/reference/reference-modal';
import { RollModal } from '@/components/modals/roll/roll-modal';
import { RulesPage } from '@/enums/rules-page';
import { Session } from '@/models/session';
import { SessionDirectorPage } from '@/components/pages/session/director/session-director-page';
import { SessionLogic } from '@/logic/session-logic';
import { SessionPlayerPage } from '@/components/pages/session/player/session-player-page';
import { SettingsModal } from '@/components/modals/settings/settings-modal';
import { SourcebookData } from '@/data/sourcebook-data';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic';
import { SourcebooksModal } from '@/components/modals/sourcebooks/sourcebooks-modal';
import { SubClass } from '@/models/subclass';
import { SummoningInfo } from '@/models/summon';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { TerrainModal } from '@/components/modals/terrain/terrain-modal';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';
import { WelcomePage } from '@/components/pages/welcome/welcome-page';
import localforage from 'localforage';
import { useErrorListener } from '@/hooks/use-error-listener';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';
import { useSyncStatus } from '@/hooks/use-sync-status';

import './main.scss';

interface Props {
	heroes: Hero[];
	session: Session;
	homebrewSourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	options: Options;
	connectionSettings: ConnectionSettings;
	dataService: DataService;
}

export const Main = (props: Props) => {
	const isSmall = useIsSmall();
	const navigation = useNavigation();
	const [ notify, notifyContext ] = notification.useNotification();
	const { triggerSyncOnChange } = useSyncStatus();
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ session, setSession ] = useState<Session>(props.session);
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(props.homebrewSourcebooks);
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(props.hiddenSourcebookIDs);
	const [ options, setOptions ] = useState<Options>(() => {
		const opts = Utils.copy(props.options);
		if (isSmall) {
			opts.compactView = true;
		}
		return opts;
	});
	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings>(props.connectionSettings);
	const [ errors, setErrors ] = useState<Event[]>([]);
	const [ drawer, setDrawer ] = useState<ReactNode>(null);
	const [ playerView, setPlayerView ] = useState<Window | null>(null);
	const [ spinning, setSpinning ] = useState(false);

	useErrorListener(event => setErrors([ ...errors, event ]));

	// #region Persistence

	const persistHero = (hero: Hero) => {
		if (heroes.some(h => h.id === hero.id)) {
			const copy = Utils.copy(heroes);
			const list = copy.map(h => h.id === hero.id ? hero : h);

			return persistHeroes(list);
		}
		else {
			const copy = Utils.copy(heroes);
			copy.push(hero);
			Collections.sort(copy, h => h.name);

			return persistHeroes(copy);
		}
	};

	const persistHeroes = (heroes: Hero[]) => {
		return props.dataService
			.saveHeroes(Collections.sort(heroes, h => h.name))
			.then(
				setHeroes,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving heroes',
						description: err,
						placement: 'top'
					});
				}
			)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error saving heroes',
					description: err,
					placement: 'top'
				});
			})
			.then(() => {
				// Trigger sync when data changes
				triggerSyncOnChange();
			});
	};

	const persistSession = (session: Session) => {
		return props.dataService
			.saveSession(session)
			.then(
				setSession,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving session',
						description: err,
						placement: 'top'
					});
				}
			)
			.then(() => {
				if (playerView) {
					playerView.location.reload();
				}
				// Trigger sync when data changes
				triggerSyncOnChange();
			});
	};

	const persistHomebrewSourcebooks = (homebrew: Sourcebook[]) => {
		return props.dataService
			.saveHomebrew(homebrew)
			.then(
				setHomebrewSourcebooks,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving sourcebooks',
						description: err,
						placement: 'top'
					});
				}
			);
	};

	const persistHiddenSourcebookIDs = (ids: string[]) => {
		return props.dataService
			.saveHiddenSettingIds(ids)
			.then(
				setHiddenSourcebookIDs,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving hidden sourcebooks',
						description: err,
						placement: 'top'
					});
				}
			);
	};

	const persistOptions = (options: Options) => {
		return props.dataService
			.saveOptions(options)
			.then(
				setOptions,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving options',
						description: err,
						placement: 'top'
					});
				}
			);
	};

	const persistConnectionSettings = (connectionSettings: ConnectionSettings) => {
		return localforage
			.setItem<ConnectionSettings>('forgesteel-connection-settings', connectionSettings)
			.then(
				setConnectionSettings,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving connection settings',
						description: err,
						placement: 'top'
					});
				}
			);
	};

	// #endregion

	// #region Welcome

	const newHero = (folder: string) => {
		const hero = FactoryLogic.createHero([ SourcebookData.core.id, SourcebookData.orden.id ]);
		hero.folder = folder;

		setDrawer(null);
		persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'start'));
	};

	// #endregion

	// #region Heroes

	const deleteHero = (hero: Hero) => {
		const copy = Utils.copy(heroes.filter(h => h.id !== hero.id));
		const stayInFolder = copy.some(h => h.folder === hero.folder);
		navigation.goToHeroList(stayInFolder ? hero.folder : undefined);

		persistHeroes(copy);
	};

	const saveHero = (hero: Hero) => {
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));
	};

	const importHero = (hero: Hero, folder: string, createCopy: boolean = false) => {
		if (createCopy) {
			hero = Utils.copy(hero);
			hero.name = `Copy of ${hero.name}`;
		}
		if (heroes.some(h => h.id === hero.id)) {
			hero.id = Utils.guid();
		}
		hero.folder = folder;
		HeroUpdateLogic.updateHero(hero, SourcebookLogic.getSourcebooks(homebrewSourcebooks));

		setDrawer(null);
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));

		return hero;
	};

	const copyHero = (hero: Hero) => {
		importHero(hero, hero.folder, true);
	};

	const exportHeroData = (hero: Hero) => {
		Utils.exportData(hero.name || 'Unnamed Hero', hero, 'hero');
	};

	const exportHeroImage = (hero: Hero) => {
		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=hero-sheet-${hero.id}-page]`).forEach(elem => pageIds.push(elem.id));

		Utils.exportImage(pageIds, hero.name || 'Unnamed Hero');
	};

	const exportHeroPdf = (hero: Hero, resolution: 'standard' | 'high') => {
		const name = hero.name || 'Unnamed Hero';

		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=hero-sheet-${hero.id}-page]`).forEach(elem => pageIds.push(elem.id));

		setSpinning(true);
		Utils.elementsToPdf(pageIds, name, options.classicSheetPageSize, resolution)
			.then(() => setSpinning(false));
	};

	const exportStandardAbilities = () => {
		const pageIds: string[] = [];
		document.querySelectorAll('[id^=hero-sheet-standard-abilities-page-abilities]').forEach(elem => pageIds.push(elem.id));

		setSpinning(true);
		Utils.elementsToPdf(pageIds, 'Standard Abilities', options.classicSheetPageSize, 'high')
			.then(() => setSpinning(false));
	};

	const setNotes = (hero: Hero, value: string) => {
		const copy = Utils.copy(hero);
		copy.state.notes = value;

		persistHero(copy);
	};

	// #endregion

	// #region Library

	const createLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, original: Element | null) => {
		const createAdventure = (original: Adventure | null, sourcebook: Sourcebook) => {
			let adventure: Adventure;
			if (original) {
				adventure = Utils.copy(original);
				adventure.id = Utils.guid();
			} else {
				adventure = FactoryLogic.createAdventure();
			}

			sourcebook.adventures.push(adventure);
			return adventure.id;
		};

		const createAncestry = (original: Ancestry | null, sourcebook: Sourcebook) => {
			let ancestry: Ancestry;
			if (original) {
				ancestry = Utils.copy(original);
				ancestry.id = Utils.guid();
			} else {
				ancestry = FactoryLogic.createAncestry();
			}

			sourcebook.ancestries.push(ancestry);
			return ancestry.id;
		};

		const createCareer = (original: Career | null, sourcebook: Sourcebook) => {
			let career: Career;
			if (original) {
				career = Utils.copy(original);
				career.id = Utils.guid();
			} else {
				career = FactoryLogic.createCareer();
			}

			sourcebook.careers.push(career);
			return career.id;
		};

		const createClass = (original: HeroClass | null, sourcebook: Sourcebook) => {
			let heroClass: HeroClass;
			if (original) {
				heroClass = Utils.copy(original);
				heroClass.id = Utils.guid();

				// Make sure this has 10 levels
				while (heroClass.featuresByLevel.length < 10) {
					heroClass.featuresByLevel.push({
						level: heroClass.featuresByLevel.length + 1,
						features: []
					});
				}
				heroClass.subclasses.forEach(sc => {
					while (sc.featuresByLevel.length < 10) {
						sc.featuresByLevel.push({
							level: sc.featuresByLevel.length + 1,
							features: []
						});
					}
				});
			} else {
				heroClass = FactoryLogic.createClass();
			}

			sourcebook.classes.push(heroClass);
			return heroClass.id;
		};

		const createComplication = (original: Complication | null, sourcebook: Sourcebook) => {
			let complication: Complication;
			if (original) {
				complication = Utils.copy(original);
				complication.id = Utils.guid();
			} else {
				complication = FactoryLogic.createComplication();
			}

			sourcebook.complications.push(complication);
			return complication.id;
		};

		const createCulture = (original: Culture | null, sourcebook: Sourcebook) => {
			let culture: Culture;
			if (original) {
				culture = Utils.copy(original);
				culture.id = Utils.guid();
			} else {
				culture = FactoryLogic.createCulture('', '', CultureType.Ancestral);
			}

			sourcebook.cultures.push(culture);
			return culture.id;
		};

		const createDomain = (original: Domain | null, sourcebook: Sourcebook) => {
			let domain: Domain;
			if (original) {
				domain = Utils.copy(original);
				domain.id = Utils.guid();

				// Make sure this has 10 levels
				while (domain.featuresByLevel.length < 10) {
					domain.featuresByLevel.push({
						level: domain.featuresByLevel.length + 1,
						features: []
					});
				}
			} else {
				domain = FactoryLogic.createDomain();
			}

			sourcebook.domains.push(domain);
			return domain.id;
		};

		const createEncounter = (original: Encounter | null, sourcebook: Sourcebook) => {
			let encounter: Encounter;
			if (original) {
				encounter = Utils.copy(original);
				encounter.id = Utils.guid();
			} else {
				encounter = FactoryLogic.createEncounter();
			}

			sourcebook.encounters.push(encounter);
			return encounter.id;
		};

		const createImbuement = (original: Imbuement | null, sourcebook: Sourcebook) => {
			let imbuement: Imbuement;
			if (original) {
				imbuement = Utils.copy(original);
				imbuement.id = Utils.guid();
			} else {
				imbuement = FactoryLogic.createImbuement({
					type: ItemType.Consumable,
					crafting: FactoryLogic.createProject({}),
					level: 1,
					feature: FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				});
			}

			sourcebook.imbuements.push(imbuement);
			return imbuement.id;
		};

		const createItem = (original: Item | null, sourcebook: Sourcebook) => {
			let item: Item;
			if (original) {
				item = Utils.copy(original);
				item.id = Utils.guid();
			} else {
				item = FactoryLogic.createItem({
					id: Utils.guid(),
					name: '',
					description: '',
					type: ItemType.Consumable,
					crafting: FactoryLogic.createProject({})
				});
			}

			sourcebook.items.push(item);
			return item.id;
		};

		const createKit = (original: Kit | null, sourcebook: Sourcebook) => {
			let kit: Kit;
			if (original) {
				kit = Utils.copy(original);
				kit.id = Utils.guid();
			} else {
				kit = FactoryLogic.createKit();
			}

			sourcebook.kits.push(kit);
			return kit.id;
		};

		const createMonsterGroup = (original: MonsterGroup | null, sourcebook: Sourcebook) => {
			let monsterGroup: MonsterGroup;
			if (original) {
				monsterGroup = Utils.copy(original);
				monsterGroup.id = Utils.guid();
				monsterGroup.monsters.forEach(m => m.id = Utils.guid());
			} else {
				monsterGroup = FactoryLogic.createMonsterGroup();
			}

			sourcebook.monsterGroups.push(monsterGroup);
			return monsterGroup.id;
		};

		const createMontage = (original: Montage | null, sourcebook: Sourcebook) => {
			let montage: Montage;
			if (original) {
				montage = Utils.copy(original);
				montage.id = Utils.guid();
			} else {
				montage = FactoryLogic.createMontage();
			}

			sourcebook.montages.push(montage);
			return montage.id;
		};

		const createNegotiation = (original: Negotiation | null, sourcebook: Sourcebook) => {
			let negotiation: Negotiation;
			if (original) {
				negotiation = Utils.copy(original);
				negotiation.id = Utils.guid();
			} else {
				negotiation = FactoryLogic.createNegotiation();
			}

			sourcebook.negotiations.push(negotiation);
			return negotiation.id;
		};

		const createPerk = (original: Perk | null, sourcebook: Sourcebook) => {
			let perk: Perk;
			if (original) {
				perk = Utils.copy(original);
				perk.id = Utils.guid();
			} else {
				perk = FactoryLogic.createPerk();
			}

			sourcebook.perks.push(perk);
			return perk.id;
		};

		const createProject = (original: Project | null, sourcebook: Sourcebook) => {
			let project: Project;
			if (original) {
				project = Utils.copy(original);
				project.id = Utils.guid();
			} else {
				project = FactoryLogic.createProject({});
			}

			sourcebook.projects.push(project);
			return project.id;
		};

		const createSubClass = (original: SubClass | null, sourcebook: Sourcebook) => {
			let sc: SubClass;
			if (original) {
				sc = Utils.copy(original);
				sc.id = Utils.guid();

				// Make sure this has 10 levels
				while (sc.featuresByLevel.length < 10) {
					sc.featuresByLevel.push({
						level: sc.featuresByLevel.length + 1,
						features: []
					});
				}
			} else {
				sc = FactoryLogic.createSubclass();
			}

			sourcebook.subclasses.push(sc);
			return sc.id;
		};

		const createTacticalMap = (original: TacticalMap | null, sourcebook: Sourcebook) => {
			let map: TacticalMap;
			if (original) {
				map = Utils.copy(original);
				map.id = Utils.guid();
			} else {
				map = FactoryLogic.createTacticalMap();
			}

			sourcebook.tacticalMaps.push(map);
			return map.id;
		};

		const createTerrain = (original: Terrain | null, sourcebook: Sourcebook) => {
			let terrain: Terrain;
			if (original) {
				terrain = Utils.copy(original);
				terrain.id = Utils.guid();
			} else {
				terrain = FactoryLogic.createTerrain();
			}

			sourcebook.terrain.push(terrain);
			return terrain.id;
		};

		const createTitle = (original: Title | null, sourcebook: Sourcebook) => {
			let title: Title;
			if (original) {
				title = Utils.copy(original);
				title.id = Utils.guid();
			} else {
				title = FactoryLogic.createTitle();
			}

			sourcebook.titles.push(title);
			return title.id;
		};

		const sourcebooks = Utils.copy(homebrewSourcebooks);
		let sourcebook = sourcebooks.find(sb => sb.id === sourcebookID) || null;
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		}

		let id = '';
		switch (kind) {
			case 'adventure':
				id = createAdventure(original as Adventure | null, sourcebook);
				break;
			case 'ancestry':
				id = createAncestry(original as Ancestry | null, sourcebook);
				break;
			case 'career':
				id = createCareer(original as Career | null, sourcebook);
				break;
			case 'class':
				id = createClass(original as HeroClass | null, sourcebook);
				break;
			case 'complication':
				id = createComplication(original as Complication | null, sourcebook);
				break;
			case 'culture':
				id = createCulture(original as Culture | null, sourcebook);
				break;
			case 'domain':
				id = createDomain(original as Domain | null, sourcebook);
				break;
			case 'encounter':
				id = createEncounter(original as Encounter | null, sourcebook);
				break;
			case 'imbuement':
				id = createImbuement(original as Imbuement | null, sourcebook);
				break;
			case 'item':
				id = createItem(original as Item | null, sourcebook);
				break;
			case 'kit':
				id = createKit(original as Kit | null, sourcebook);
				break;
			case 'monster-group':
				id = createMonsterGroup(original as MonsterGroup | null, sourcebook);
				break;
			case 'montage':
				id = createMontage(original as Montage | null, sourcebook);
				break;
			case 'negotiation':
				id = createNegotiation(original as Negotiation | null, sourcebook);
				break;
			case 'perk':
				id = createPerk(original as Perk | null, sourcebook);
				break;
			case 'project':
				id = createProject(original as Project | null, sourcebook);
				break;
			case 'subclass':
				id = createSubClass(original as SubClass | null, sourcebook);
				break;
			case 'tactical-map':
				id = createTacticalMap(original as TacticalMap | null, sourcebook);
				break;
			case 'terrain':
				id = createTerrain(original as Terrain | null, sourcebook);
				break;
			case 'title':
				id = createTitle(original as Title | null, sourcebook);
				break;
		}

		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit(kind, sourcebook.id, id));
	};

	const moveLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const sourcebooks = Utils.copy(homebrewSourcebooks);

		let sourceSourcebook: Sourcebook | undefined = undefined;
		switch (kind) {
			case 'adventure':
				sourceSourcebook = SourcebookLogic.getAdventureSourcebook(sourcebooks, element as Adventure);
				break;
			case 'ancestry':
				sourceSourcebook = SourcebookLogic.getAncestrySourcebook(sourcebooks, element as Ancestry);
				break;
			case 'career':
				sourceSourcebook = SourcebookLogic.getCareerSourcebook(sourcebooks, element as Career);
				break;
			case 'class':
				sourceSourcebook = SourcebookLogic.getClassSourcebook(sourcebooks, element as HeroClass);
				break;
			case 'complication':
				sourceSourcebook = SourcebookLogic.getComplicationSourcebook(sourcebooks, element as Complication);
				break;
			case 'culture':
				sourceSourcebook = SourcebookLogic.getCultureSourcebook(sourcebooks, element as Culture);
				break;
			case 'domain':
				sourceSourcebook = SourcebookLogic.getDomainSourcebook(sourcebooks, element as Domain);
				break;
			case 'encounter':
				sourceSourcebook = SourcebookLogic.getEncounterSourcebook(sourcebooks, element as Encounter);
				break;
			case 'imbuement':
				sourceSourcebook = SourcebookLogic.getImbuementSourcebook(sourcebooks, element as Imbuement);
				break;
			case 'item':
				sourceSourcebook = SourcebookLogic.getItemSourcebook(sourcebooks, element as Item);
				break;
			case 'kit':
				sourceSourcebook = SourcebookLogic.getKitSourcebook(sourcebooks, element as Kit);
				break;
			case 'monster-group':
				sourceSourcebook = SourcebookLogic.getMonsterGroupSourcebook(sourcebooks, element as MonsterGroup);
				break;
			case 'montage':
				sourceSourcebook = SourcebookLogic.getMontageSourcebook(sourcebooks, element as Montage);
				break;
			case 'negotiation':
				sourceSourcebook = SourcebookLogic.getNegotiationSourcebook(sourcebooks, element as Negotiation);
				break;
			case 'perk':
				sourceSourcebook = SourcebookLogic.getPerkSourcebook(sourcebooks, element as Perk);
				break;
			case 'project':
				sourceSourcebook = SourcebookLogic.getProjectSourcebook(sourcebooks, element as Project);
				break;
			case 'subclass':
				sourceSourcebook = SourcebookLogic.getSubclassSourcebook(sourcebooks, element as SubClass);
				break;
			case 'tactical-map':
				sourceSourcebook = SourcebookLogic.getTacticalMapSourcebook(sourcebooks, element as TacticalMap);
				break;
			case 'terrain':
				sourceSourcebook = SourcebookLogic.getTerrainSourcebook(sourcebooks, element as Terrain);
				break;
			case 'title':
				sourceSourcebook = SourcebookLogic.getTitleSourcebook(sourcebooks, element as Title);
				break;
		}

		if (!sourceSourcebook) {
			return;
		}

		// Get destination sourcebook
		let destinationSourcebook = sourcebooks.find(sb => sb.id === sourcebookID) || null;
		if (!destinationSourcebook) {
			destinationSourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(destinationSourcebook);
		}

		switch (kind) {
			case 'adventure':
				destinationSourcebook.adventures.push(element as Adventure);
				sourceSourcebook.adventures = sourceSourcebook.adventures.filter(x => x.id !== element.id);
				break;
			case 'ancestry':
				destinationSourcebook.ancestries.push(element as Ancestry);
				sourceSourcebook.ancestries = sourceSourcebook.ancestries.filter(x => x.id !== element.id);
				break;
			case 'career':
				destinationSourcebook.careers.push(element as Career);
				sourceSourcebook.careers = sourceSourcebook.careers.filter(x => x.id !== element.id);
				break;
			case 'class':
				destinationSourcebook.classes.push(element as HeroClass);
				sourceSourcebook.classes = sourceSourcebook.classes.filter(x => x.id !== element.id);
				break;
			case 'complication':
				destinationSourcebook.complications.push(element as Complication);
				sourceSourcebook.complications = sourceSourcebook.complications.filter(x => x.id !== element.id);
				break;
			case 'culture':
				destinationSourcebook.cultures.push(element as Culture);
				sourceSourcebook.cultures = sourceSourcebook.cultures.filter(x => x.id !== element.id);
				break;
			case 'domain':
				destinationSourcebook.domains.push(element as Domain);
				sourceSourcebook.domains = sourceSourcebook.domains.filter(x => x.id !== element.id);
				break;
			case 'encounter':
				destinationSourcebook.encounters.push(element as Encounter);
				sourceSourcebook.encounters = sourceSourcebook.encounters.filter(x => x.id !== element.id);
				break;
			case 'imbuement':
				destinationSourcebook.imbuements.push(element as Imbuement);
				sourceSourcebook.imbuements = sourceSourcebook.imbuements.filter(x => x.id !== element.id);
				break;
			case 'item':
				destinationSourcebook.items.push(element as Item);
				sourceSourcebook.items = sourceSourcebook.items.filter(x => x.id !== element.id);
				break;
			case 'kit':
				destinationSourcebook.kits.push(element as Kit);
				sourceSourcebook.kits = sourceSourcebook.kits.filter(x => x.id !== element.id);
				break;
			case 'monster-group':
				destinationSourcebook.monsterGroups.push(element as MonsterGroup);
				sourceSourcebook.monsterGroups = sourceSourcebook.monsterGroups.filter(x => x.id !== element.id);
				break;
			case 'montage':
				destinationSourcebook.montages.push(element as Montage);
				sourceSourcebook.montages = sourceSourcebook.montages.filter(x => x.id !== element.id);
				break;
			case 'negotiation':
				destinationSourcebook.negotiations.push(element as Negotiation);
				sourceSourcebook.negotiations = sourceSourcebook.negotiations.filter(x => x.id !== element.id);
				break;
			case 'perk':
				destinationSourcebook.perks.push(element as Perk);
				sourceSourcebook.perks = sourceSourcebook.perks.filter(x => x.id !== element.id);
				break;
			case 'project':
				destinationSourcebook.projects.push(element as Project);
				sourceSourcebook.projects = sourceSourcebook.projects.filter(x => x.id !== element.id);
				break;
			case 'subclass':
				destinationSourcebook.subclasses.push(element as SubClass);
				sourceSourcebook.subclasses = sourceSourcebook.subclasses.filter(x => x.id !== element.id);
				break;
			case 'tactical-map':
				destinationSourcebook.tacticalMaps.push(element as TacticalMap);
				sourceSourcebook.tacticalMaps = sourceSourcebook.tacticalMaps.filter(x => x.id !== element.id);
				break;
			case 'terrain':
				destinationSourcebook.terrain.push(element as Terrain);
				sourceSourcebook.terrain = sourceSourcebook.terrain.filter(x => x.id !== element.id);
				break;
			case 'title':
				destinationSourcebook.titles.push(element as Title);
				sourceSourcebook.titles = sourceSourcebook.titles.filter(x => x.id !== element.id);
				break;
		}

		persistHomebrewSourcebooks(sourcebooks);
	};

	const deleteLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const copy = Utils.copy(homebrewSourcebooks);
		const sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (sourcebook) {
			switch (kind) {
				case 'adventure':
					sourcebook.adventures = sourcebook.adventures.filter(x => x.id !== element.id);
					break;
				case 'ancestry':
					sourcebook.ancestries = sourcebook.ancestries.filter(x => x.id !== element.id);
					break;
				case 'career':
					sourcebook.careers = sourcebook.careers.filter(x => x.id !== element.id);
					break;
				case 'class':
					sourcebook.classes = sourcebook.classes.filter(x => x.id !== element.id);
					break;
				case 'complication':
					sourcebook.complications = sourcebook.complications.filter(x => x.id !== element.id);
					break;
				case 'culture':
					sourcebook.cultures = sourcebook.cultures.filter(x => x.id !== element.id);
					break;
				case 'domain':
					sourcebook.domains = sourcebook.domains.filter(x => x.id !== element.id);
					break;
				case 'encounter':
					sourcebook.encounters = sourcebook.encounters.filter(x => x.id !== element.id);
					break;
				case 'imbuement':
					sourcebook.imbuements = sourcebook.imbuements.filter(x => x.id !== element.id);
					break;
				case 'item':
					sourcebook.items = sourcebook.items.filter(x => x.id !== element.id);
					break;
				case 'kit':
					sourcebook.kits = sourcebook.kits.filter(x => x.id !== element.id);
					break;
				case 'monster-group':
					sourcebook.monsterGroups = sourcebook.monsterGroups.filter(x => x.id !== element.id);
					break;
				case 'montage':
					sourcebook.montages = sourcebook.montages.filter(x => x.id !== element.id);
					break;
				case 'negotiation':
					sourcebook.negotiations = sourcebook.negotiations.filter(x => x.id !== element.id);
					break;
				case 'perk':
					sourcebook.perks = sourcebook.perks.filter(x => x.id !== element.id);
					break;
				case 'project':
					sourcebook.projects = sourcebook.projects.filter(x => x.id !== element.id);
					break;
				case 'subclass':
					sourcebook.subclasses = sourcebook.subclasses.filter(x => x.id !== element.id);
					break;
				case 'tactical-map':
					sourcebook.tacticalMaps = sourcebook.tacticalMaps.filter(x => x.id !== element.id);
					break;
				case 'terrain':
					sourcebook.terrain = sourcebook.terrain.filter(x => x.id !== element.id);
					break;
				case 'title':
					sourcebook.titles = sourcebook.titles.filter(x => x.id !== element.id);
					break;
			}
		}

		setDrawer(null);
		persistHomebrewSourcebooks(copy).then(() => navigation.goToLibrary(kind, element.id));
	};

	const saveLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const copy = Utils.copy(homebrewSourcebooks);
		const sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (sourcebook) {
			switch (kind) {
				case 'adventure':
					sourcebook.adventures = sourcebook.adventures.map(x => x.id === element.id ? element : x) as Adventure[];
					break;
				case 'ancestry':
					sourcebook.ancestries = sourcebook.ancestries.map(x => x.id === element.id ? element : x) as Ancestry[];
					break;
				case 'career':
					sourcebook.careers = sourcebook.careers.map(x => x.id === element.id ? element : x) as Career[];
					break;
				case 'class':
					sourcebook.classes = sourcebook.classes.map(x => x.id === element.id ? element : x) as HeroClass[];
					break;
				case 'complication':
					sourcebook.complications = sourcebook.complications.map(x => x.id === element.id ? element : x) as Complication[];
					break;
				case 'culture':
					sourcebook.cultures = sourcebook.cultures.map(x => x.id === element.id ? element : x) as Culture[];
					break;
				case 'domain':
					sourcebook.domains = sourcebook.domains.map(x => x.id === element.id ? element : x) as Domain[];
					break;
				case 'encounter':
					sourcebook.encounters = sourcebook.encounters.map(x => x.id === element.id ? element : x) as Encounter[];
					break;
				case 'imbuement':
					sourcebook.imbuements = sourcebook.imbuements.map(x => x.id === element.id ? element : x) as Imbuement[];
					break;
				case 'item':
					sourcebook.items = sourcebook.items.map(x => x.id === element.id ? element : x) as Item[];
					break;
				case 'kit':
					sourcebook.kits = sourcebook.kits.map(x => x.id === element.id ? element : x) as Kit[];
					break;
				case 'monster-group':
					sourcebook.monsterGroups = sourcebook.monsterGroups.map(x => x.id === element.id ? element : x) as MonsterGroup[];
					break;
				case 'montage':
					sourcebook.montages = sourcebook.montages.map(x => x.id === element.id ? element : x) as Montage[];
					break;
				case 'negotiation':
					sourcebook.negotiations = sourcebook.negotiations.map(x => x.id === element.id ? element : x) as Negotiation[];
					break;
				case 'perk':
					sourcebook.perks = sourcebook.perks.map(x => x.id === element.id ? element : x) as Perk[];
					break;
				case 'project':
					sourcebook.projects = sourcebook.projects.map(x => x.id === element.id ? element : x) as Project[];
					break;
				case 'subclass':
					sourcebook.subclasses = sourcebook.subclasses.map(x => x.id === element.id ? element : x) as SubClass[];
					break;
				case 'tactical-map':
					sourcebook.tacticalMaps = sourcebook.tacticalMaps.map(x => x.id === element.id ? element : x) as TacticalMap[];
					break;
				case 'terrain':
					sourcebook.terrain = sourcebook.terrain.map(x => x.id === element.id ? element : x) as Terrain[];
					break;
				case 'title':
					sourcebook.titles = sourcebook.titles.map(x => x.id === element.id ? element : x) as Title[];
					break;
			}
		}

		persistHomebrewSourcebooks(copy)
			.then(() => {
				const heroesCopy = Utils.copy(heroes);
				heroesCopy.forEach(hero => HeroUpdateLogic.updateHero(hero, SourcebookLogic.getSourcebooks(copy)));
				persistHeroes(heroesCopy);
			})
			.then(() => navigation.goToLibrary(kind, element.id));
	};

	const importLibraryElement = (kind: SourcebookElementKind, sourcebookID: string, element: Element) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks);
		const elementIDs = sourcebooks.flatMap(sb => SourcebookLogic.getElements(sb)).map(e => e.element.id);
		if (elementIDs.includes(element.id)) {
			element.id = Utils.guid();
		}
		if (kind === 'monster-group') {
			const group = element as MonsterGroup;
			group.monsters.forEach(m => m.id = Utils.guid());
		}

		const copy = Utils.copy(homebrewSourcebooks);
		let sourcebook = copy.find(sb => sb.id === sourcebookID);
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			copy.push(sourcebook);
		}

		switch (kind) {
			case 'adventure':
				sourcebook.adventures.push(element as Adventure);
				sourcebook.adventures = Collections.sort<Element>(sourcebook.adventures, item => item.name) as Adventure[];
				break;
			case 'ancestry':
				sourcebook.ancestries.push(element as Ancestry);
				sourcebook.ancestries = Collections.sort<Element>(sourcebook.ancestries, item => item.name) as Ancestry[];
				break;
			case 'career':
				sourcebook.careers.push(element as Career);
				sourcebook.careers = Collections.sort<Element>(sourcebook.careers, item => item.name) as Career[];
				break;
			case 'class':
				sourcebook.classes.push(element as HeroClass);
				sourcebook.classes = Collections.sort<Element>(sourcebook.classes, item => item.name) as HeroClass[];
				break;
			case 'complication':
				sourcebook.complications.push(element as Complication);
				sourcebook.complications = Collections.sort<Element>(sourcebook.complications, item => item.name) as Complication[];
				break;
			case 'culture':
				sourcebook.cultures.push(element as Culture);
				sourcebook.cultures = Collections.sort<Element>(sourcebook.cultures, item => item.name) as Culture[];
				break;
			case 'domain':
				sourcebook.domains.push(element as Domain);
				sourcebook.domains = Collections.sort<Element>(sourcebook.domains, item => item.name) as Domain[];
				break;
			case 'encounter':
				sourcebook.encounters.push(element as Encounter);
				sourcebook.encounters = Collections.sort<Element>(sourcebook.encounters, item => item.name) as Encounter[];
				break;
			case 'imbuement':
				sourcebook.imbuements.push(element as Imbuement);
				sourcebook.imbuements = Collections.sort<Element>(sourcebook.imbuements, imbuement => imbuement.name) as Imbuement[];
				break;
			case 'item':
				sourcebook.items.push(element as Item);
				sourcebook.items = Collections.sort<Element>(sourcebook.items, item => item.name) as Item[];
				break;
			case 'kit':
				sourcebook.kits.push(element as Kit);
				sourcebook.kits = Collections.sort<Element>(sourcebook.kits, item => item.name) as Kit[];
				break;
			case 'monster-group':
				sourcebook.monsterGroups.push(element as MonsterGroup);
				sourcebook.monsterGroups = Collections.sort<Element>(sourcebook.monsterGroups, item => item.name) as MonsterGroup[];
				break;
			case 'montage':
				sourcebook.montages.push(element as Montage);
				sourcebook.montages = Collections.sort<Element>(sourcebook.montages, item => item.name) as Montage[];
				break;
			case 'negotiation':
				sourcebook.negotiations.push(element as Negotiation);
				sourcebook.negotiations = Collections.sort<Element>(sourcebook.negotiations, item => item.name) as Negotiation[];
				break;
			case 'perk':
				sourcebook.perks.push(element as Perk);
				sourcebook.perks = Collections.sort<Element>(sourcebook.perks, item => item.name) as Perk[];
				break;
			case 'project':
				sourcebook.projects.push(element as Project);
				sourcebook.projects = Collections.sort<Element>(sourcebook.projects, item => item.name) as Project[];
				break;
			case 'subclass':
				sourcebook.subclasses.push(element as SubClass);
				sourcebook.subclasses = Collections.sort<Element>(sourcebook.subclasses, item => item.name) as SubClass[];
				break;
			case 'tactical-map':
				sourcebook.tacticalMaps.push(element as TacticalMap);
				sourcebook.tacticalMaps = Collections.sort<Element>(sourcebook.tacticalMaps, item => item.name) as TacticalMap[];
				break;
			case 'terrain':
				sourcebook.terrain.push(element as Terrain);
				sourcebook.terrain = Collections.sort<Element>(sourcebook.terrain, item => item.name) as Terrain[];
				break;
			case 'title':
				sourcebook.titles.push(element as Title);
				sourcebook.titles = Collections.sort<Element>(sourcebook.titles, item => item.name) as Title[];
				break;
		}

		SourcebookUpdateLogic.updateSourcebook(sourcebook);

		setDrawer(null);
		persistHomebrewSourcebooks(copy).then(() => navigation.goToLibrary(kind));
	};

	const exportLibraryElementData = (category: string, element: Element) => {
		const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

		Utils.exportData(name, element, category);
	};

	const exportLibraryElementImage = (category: string, element: Element) => {
		const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=${category.toLowerCase()}-${element.id}-page]`).forEach(elem => pageIds.push(elem.id));

		Utils.exportImage(pageIds, name);
	};

	const exportLibraryElementPdf = (category: string, element: Element, resolution: 'standard' | 'high') => {
		const name = element.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`;

		const pageIds: string[] = [];
		document.querySelectorAll(`[id^=${category.toLowerCase()}-${element.id}-page]`).forEach(elem => pageIds.push(elem.id));

		setSpinning(true);
		Utils.elementsToPdf(pageIds, name, options.classicSheetPageSize, resolution)
			.then(() => setSpinning(false));
	};

	// #endregion

	// #region Session

	const startEncounter = async (encounter: Encounter) => {
		const copy = SessionLogic.startEncounter(encounter, SourcebookLogic.getSourcebooks(homebrewSourcebooks), heroes, options);

		const sessionCopy = Utils.copy(session);
		sessionCopy.encounters.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startMontage = async (montage: Montage) => {
		const copy = SessionLogic.startMontage(montage);

		const sessionCopy = Utils.copy(session);
		sessionCopy.montages.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startNegotiation = async (negotiation: Negotiation) => {
		const copy = SessionLogic.startNegotiation(negotiation);

		const sessionCopy = Utils.copy(session);
		sessionCopy.negotiations.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startMap = async (map: TacticalMap) => {
		const copy = SessionLogic.startMap(map);

		const sessionCopy = Utils.copy(session);
		sessionCopy.tacticalMaps.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const startCounter = async (counter: Counter) => {
		const copy = SessionLogic.startCounter(counter);

		const sessionCopy = Utils.copy(session);
		sessionCopy.counters.push(copy);

		await persistSession(sessionCopy);
		await navigation.goToSession();
		return copy.id;
	};

	const updateEncounter = (encounter: Encounter) => {
		const copy = Utils.copy(session);

		const index = copy.encounters.findIndex(n => n.id === encounter.id);
		if (index !== -1) {
			copy.encounters[index] = encounter;
		}

		persistSession(copy);
	};

	const updateMontage = (montage: Montage) => {
		const copy = Utils.copy(session);

		const index = copy.montages.findIndex(n => n.id === montage.id);
		if (index !== -1) {
			copy.montages[index] = montage;
		}

		persistSession(copy);
	};

	const updateNegotiation = (negotiation: Negotiation) => {
		const copy = Utils.copy(session);

		const index = copy.negotiations.findIndex(n => n.id === negotiation.id);
		if (index !== -1) {
			copy.negotiations[index] = negotiation;
		}

		persistSession(copy);
	};

	const updateMap = (map: TacticalMap) => {
		const copy = Utils.copy(session);

		const index = copy.tacticalMaps.findIndex(tm => tm.id === map.id);
		if (index !== -1) {
			copy.tacticalMaps[index] = map;
		}

		persistSession(copy);
	};

	const updateCounter = (counter: Counter) => {
		const copy = Utils.copy(session);

		const index = copy.counters.findIndex(c => c.id === counter.id);
		if (index !== -1) {
			copy.counters[index] = counter;
		}

		persistSession(copy);
	};

	const finishSessionElement = (id: string) => {
		const copy = Utils.copy(session);

		copy.encounters = copy.encounters.filter(e => e.id !== id);
		copy.montages = copy.montages.filter(m => m.id !== id);
		copy.negotiations = copy.negotiations.filter(n => n.id !== id);
		copy.tacticalMaps = copy.tacticalMaps.filter(tm => tm.id !== id);
		copy.counters = copy.counters.filter(c => c.id !== id);

		if (copy.playerViewID === id) {
			copy.playerViewID = null;
		}

		persistSession(copy);

		const options = AdventureLogic.getContentOptions(copy);
		return options.length > 0 ? options[0].id : null;
	};

	// #endregion

	// #region Modals

	const showAbout = () => {
		setDrawer(
			<AboutModal
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showSettings = () => {
		setDrawer(
			<SettingsModal
				options={options}
				errors={errors}
				heroes={heroes}
				setOptions={persistOptions}
				connectionSettings={connectionSettings}
				setConnectionSettings={persistConnectionSettings}
				clearErrors={() => setErrors([])}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showRoll = (hero?: Hero) => {
		setDrawer(
			<RollModal
				hero={hero}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showReference = () => {
		onShowReference(null);
	};

	const onSelectLibraryElement = (element: Element, category: SourcebookElementKind) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks);

		setDrawer(
			<ElementModal
				category={category}
				element={element}
				sourcebooks={sourcebooks}
				options={options}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectMonster = (monster: Monster, monsterGroup?: MonsterGroup, summon?: SummoningInfo) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks);

		setDrawer(
			<MonsterModal
				monster={monster}
				monsterGroup={monsterGroup}
				summon={summon}
				sourcebooks={sourcebooks}
				options={options}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectTerrain = (terrain: Terrain, upgradeIDs: string[]) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks);

		setDrawer(
			<TerrainModal
				terrain={terrain}
				upgradeIDs={upgradeIDs}
				sourcebooks={sourcebooks}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectFollower = (follower: Follower) => {
		setDrawer(
			<FollowerModal
				follower={follower}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectCharacteristic = (characteristic: Characteristic, hero: Hero) => {
		setDrawer(
			<RollModal
				characteristics={[ characteristic ]}
				hero={hero}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onSelectFeature = (feature: Feature, hero: Hero) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks)
			.filter(sb => hero.settingIDs.includes(sb.id));

		setDrawer(
			<FeatureModal
				feature={feature}
				hero={hero}
				sourcebooks={sourcebooks}
				options={options}
				onClose={() => setDrawer(null)}
				updateHero={persistHero}
			/>
		);
	};

	const onSelectAbility = (ability: Ability, hero: Hero) => {
		setDrawer(
			<AbilityModal
				ability={ability}
				hero={hero}
				onClose={() => setDrawer(null)}
				updateHero={persistHero}
			/>
		);
	};

	const onShowHeroState = (hero: Hero, page: HeroStatePage) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks)
			.filter(sb => hero.settingIDs.includes(sb.id));

		setDrawer(
			<HeroStateModal
				hero={hero}
				sourcebooks={sourcebooks}
				options={options}
				startPage={page}
				showEncounterControls={false}
				onClose={() => setDrawer(null)}
				onChange={persistHero}
				onLevelUp={hero => {
					setDrawer(null);
					persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'class'));
				}}
			/>
		);
	};

	const onShowParty = (folder: string) => {
		setDrawer(
			<PartyModal
				heroes={heroes.filter(h => h.folder === folder)}
				sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
				options={options}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const onShowReference = (hero: Hero | null, page?: RulesPage) => {
		const sourcebooks = SourcebookLogic.getSourcebooks(homebrewSourcebooks);

		setDrawer(
			<ReferenceModal
				hero={hero}
				sourcebooks={sourcebooks}
				startPage={page}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showSourcebooks = () => {
		setDrawer(
			<SourcebooksModal
				heroes={heroes}
				officialSourcebooks={SourcebookLogic.getSourcebooks()}
				homebrewSourcebooks={homebrewSourcebooks}
				hiddenSourcebookIDs={hiddenSourcebookIDs}
				onClose={() => setDrawer(null)}
				onHomebrewSourcebookChange={persistHomebrewSourcebooks}
				onHiddenSourcebookIDsChange={persistHiddenSourcebookIDs}
			/>
		);
	};

	const showEncounterTools = (encounter: Encounter) => {
		setDrawer(
			<EncounterToolsModal
				encounter={encounter}
				sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
				options={options}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	const showPlayerView = () => {
		setDrawer(
			<PlayerViewModal
				session={session}
				updateSession={persistSession}
				openPlayerView={setPlayerView}
				onClose={() => setDrawer(null)}
			/>
		);
	};

	// #endregion

	return (
		<ErrorBoundary name='main'>
			<Routes>
				<Route
					path='/'
					element={
						<MainLayout
							drawer={drawer}
							setDrawer={setDrawer}
						/>
					}
				>
					<Route
						index={true}
						element={
							<WelcomePage
								highlightAbout={errors.length > 0}
								showReference={showReference}
								showRoll={() => showRoll()}
								showAbout={showAbout}
								showSettings={showSettings}
								onNewHero={() => newHero('')}
							/>
						}
					/>
					<Route path='hero'>
						<Route
							index={true}
							path=':folder?'
							element={
								<HeroListPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={props.options}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSettings={showSettings}
									addHero={newHero}
									importHero={importHero}
									showParty={onShowParty}
								/>
							}
						/>
						<Route
							path='view/:heroID'
							element={
								<HeroViewPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={options}
									highlightAbout={errors.length > 0}
									showReference={onShowReference}
									showRoll={showRoll}
									showAbout={showAbout}
									showSettings={showSettings}
									exportHeroData={exportHeroData}
									exportHeroImage={exportHeroImage}
									exportHeroPdf={exportHeroPdf}
									exportStandardAbilities={exportStandardAbilities}
									copyHero={copyHero}
									deleteHero={deleteHero}
									showAncestry={ancestry => onSelectLibraryElement(ancestry, 'ancestry')}
									showCulture={culture => onSelectLibraryElement(culture, 'culture')}
									showCareer={career => onSelectLibraryElement(career, 'career')}
									showClass={heroClass => onSelectLibraryElement(heroClass, 'class')}
									showComplication={complication => onSelectLibraryElement(complication, 'complication')}
									showDomain={domain => onSelectLibraryElement(domain, 'domain')}
									showKit={kit => onSelectLibraryElement(kit, 'kit')}
									showTitle={title => onSelectLibraryElement(title, 'title')}
									showMonster={(monster, summon) => onSelectMonster(monster, undefined, summon)}
									showFollower={onSelectFollower}
									showCharacteristic={onSelectCharacteristic}
									showFeature={onSelectFeature}
									showAbility={onSelectAbility}
									showHeroState={onShowHeroState}
									setNotes={setNotes}
								/>
							}
						/>
						<Route
							path='edit/:heroID'
							element={<Navigate to='start' replace={true} />}
						/>
						<Route
							path='edit/:heroID/:page'
							element={
								<HeroEditPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={options}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSettings={showSettings}
									saveChanges={saveHero}
									importSourcebook={sourcebook => {
										const copy = Utils.copy(homebrewSourcebooks);
										copy.push(sourcebook);
										persistHomebrewSourcebooks(copy);
									}}
								/>
							}
						/>
						<Route
							path='sheet/:heroID'
							element={
								<HeroSheetPreviewPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={options}
									setOptions={persistOptions}
								/>
							}
						/>
					</Route>
					<Route path='library'>
						<Route
							index={true}
							element={<Navigate to='ancestry' replace={true} />}
						/>
						<Route
							path=':kind/:elementID?'
							element={
								<LibraryListPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={options}
									hiddenSourcebookIDs={hiddenSourcebookIDs}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSourcebooks={showSourcebooks}
									showSettings={showSettings}
									showMonster={onSelectMonster}
									showEncounterTools={showEncounterTools}
									createElement={(kind, sourcebookID, element) => createLibraryElement(kind, sourcebookID, element)}
									importElement={importLibraryElement}
									moveElement={moveLibraryElement}
									deleteElement={deleteLibraryElement}
									exportElementData={exportLibraryElementData}
									exportElementImage={exportLibraryElementImage}
									exportElementPdf={exportLibraryElementPdf}
									startEncounter={startEncounter}
									startMontage={startMontage}
									startNegotiation={startNegotiation}
									startMap={startMap}
								/>
							}
						/>
						<Route
							path='edit/:kind/:sourcebookID/:elementID/:subElementID?'
							element={
								<LibraryEditPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									options={options}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSettings={showSettings}
									showMonster={onSelectMonster}
									showTerrain={onSelectTerrain}
									saveChanges={saveLibraryElement}
								/>
							}
						/>
					</Route>
					<Route path='session'>
						<Route
							index={true}
							element={<Navigate to='director' replace={true} />}
						/>
						<Route
							path='director'
							element={
								<SessionDirectorPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									session={session}
									options={options}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSettings={showSettings}
									showPlayerView={showPlayerView}
									startEncounter={startEncounter}
									startMontage={startMontage}
									startNegotiation={startNegotiation}
									startMap={startMap}
									startCounter={startCounter}
									updateHero={persistHero}
									updateEncounter={updateEncounter}
									updateMontage={updateMontage}
									updateNegotiation={updateNegotiation}
									updateMap={updateMap}
									updateCounter={updateCounter}
									finishSessionElement={finishSessionElement}
								/>
							}
						/>
						<Route
							path='player'
							element={
								<SessionPlayerPage
									heroes={heroes}
									sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
									session={session}
									options={options}
									highlightAbout={errors.length > 0}
									showReference={showReference}
									showRoll={() => showRoll()}
									showAbout={showAbout}
									showSettings={showSettings}
								/>
							}
						/>
					</Route>
				</Route>
				<Route path='backup'>
					<Route
						index={true}
						element={
							<BackupPage
								heroes={heroes}
								homebrewSourcebooks={homebrewSourcebooks}
								options={options}
								highlightAbout={errors.length > 0}
								showReference={showReference}
								showRoll={() => showRoll()}
								showAbout={showAbout}
								showSettings={showSettings}
							/>
						}
					/>
				</Route>
				<Route path='*' element={<Navigate to='/' replace={true} />} />
			</Routes>
			{notifyContext}
			<Spin spinning={spinning} size='large' fullscreen={true} />
		</ErrorBoundary>
	);
};
