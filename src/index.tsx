import { FactoryLogic } from './logic/factory-logic.ts';
import { Format } from './utils/format.ts';
import { HashRouter } from 'react-router';
import { Hero } from './models/hero.ts';
import { HeroLogic } from './logic/hero-logic.ts';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { PanelWidth } from './enums/panel-width.ts';
import { Playbook } from './models/playbook.ts';
import { PlaybookLogic } from './logic/playbook-logic.ts';
import { Sourcebook } from './models/sourcebook.ts';
import { SourcebookData } from './data/sourcebook-data.ts';
import { SourcebookLogic } from './logic/sourcebook-logic.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

const promises = [
	localforage.getItem<Hero[]>('forgesteel-heroes'),
	localforage.getItem<Sourcebook[]>('forgesteel-homebrew-settings'),
	localforage.getItem<string[]>('forgesteel-hidden-setting-ids'),
	localforage.getItem<Playbook>('forgesteel-playbook'),
	localforage.getItem<Playbook>('forgesteel-session'),
	localforage.getItem<Options[]>('forgesteel-options')
];

Promise.all(promises).then(results => {
	//#region Heroes

	let heroes = results[0] as Hero[] | null;
	if (!heroes) {
		heroes = [];
	}

	heroes.forEach(hero => {
		HeroLogic.updateHero(hero);
	});

	//#endregion

	//#region Homebrew sourcebooks

	let sourcebooks = results[1] as Sourcebook[] | null;
	if (!sourcebooks) {
		sourcebooks = [];
	}

	sourcebooks.forEach(sourcebook => {
		SourcebookLogic.updateSourcebook(sourcebook);
	});

	[ SourcebookData.core, SourcebookData.orden, ...sourcebooks ].forEach(sourcebook => {
		sourcebook.items.forEach(item => {
			if (item.crafting) {
				item.crafting.id = `${item.id}-crafting`;
				item.crafting.name = `Craft ${item.name}`;
				item.crafting.description = `Craft ${Format.startsWithVowel(item.name) ? 'an' : 'a'} ${item.name}`;
			}
		});
	});

	//#endregion

	//#region Hidden sourcebook IDs

	let hiddenSourcebookIDs = results[2] as string[] | null;
	if (!hiddenSourcebookIDs) {
		hiddenSourcebookIDs = [];
	}

	//#endregion

	//#region Playbook

	let playbook = results[3] as Playbook | null;
	if (!playbook) {
		playbook = FactoryLogic.createPlaybook();
	}

	PlaybookLogic.updatePlaybook(playbook);

	//#endregion

	//#region Session

	let session = results[4] as Playbook | null;
	if (!session) {
		session = FactoryLogic.createPlaybook();
	}

	PlaybookLogic.updatePlaybook(session);

	//#endregion

	//#region Options

	let options = results[5] as Options | null;
	if (!options) {
		options = {
			singlePage: false,
			separateInventoryFeatures: false,
			showSkillsInGroups: true,
			showStandardAbilities: true,
			dimUnavailableAbilities: true,
			showSources: true,
			abilityWidth: PanelWidth.Medium,
			showMonstersInGroups: true,
			showSimilarMonsters: false,
			similarLevel: true,
			similarRole: true,
			similarOrganization: true,
			similarSize: true,
			minionCount: 8,
			party: '',
			heroParty: '',
			heroCount: 4,
			heroLevel: 1,
			heroVictories: 0,
			showDefeatedCombatants: false,
			gridSize: 50,
			playerGridSize: 50
		};
	}

	if (options.singlePage === undefined) {
		options.singlePage = false;
	}

	if (options.separateInventoryFeatures === undefined) {
		options.separateInventoryFeatures = false;
	}

	if (options.abilityWidth === undefined) {
		options.abilityWidth = PanelWidth.Medium;
	}

	if (options.showSources === undefined) {
		options.showSources = false;
	}

	if (options.showMonstersInGroups === undefined) {
		options.showMonstersInGroups = true;
	}

	if (options.showSimilarMonsters === undefined) {
		options.showSimilarMonsters = true;
	}

	if (options.similarLevel === undefined) {
		options.similarLevel = true;
	}

	if (options.similarRole === undefined) {
		options.similarRole = true;
	}

	if (options.similarOrganization === undefined) {
		options.similarOrganization = true;
	}

	if (options.similarSize === undefined) {
		options.similarSize = true;
	}

	if (options.minionCount === undefined) {
		options.minionCount = 8;
	}

	if (options.party === undefined) {
		options.party = '';
	}

	if (options.heroParty === undefined) {
		options.heroParty = '';
	}

	if (options.heroCount === undefined) {
		options.heroCount = 4;
	}

	if (options.heroLevel === undefined) {
		options.heroLevel = 1;
	}

	if (options.heroVictories === undefined) {
		options.heroVictories = 0;
	}

	if (options.showDefeatedCombatants === undefined) {
		options.showDefeatedCombatants = false;
	}

	if (options.gridSize === undefined) {
		options.gridSize = 50;
	}

	if (options.playerGridSize === undefined) {
		options.playerGridSize = 50;
	}

	//#endregion

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<HashRouter>
				<Main
					heroes={heroes}
					homebrewSourcebooks={sourcebooks}
					hiddenSourcebookIDs={hiddenSourcebookIDs}
					playbook={playbook}
					session={session}
					options={options}
				/>
			</HashRouter>
		</StrictMode>
	);
});
