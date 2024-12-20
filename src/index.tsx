import { FactoryLogic } from './logic/factory-logic.ts';
import { Hero } from './models/hero.ts';
import { HeroLogic } from './logic/hero-logic.ts';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { Playbook } from './models/playbook.ts';
import { Sourcebook } from './models/sourcebook.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

const promises = [
	localforage.getItem<Hero[]>('forgesteel-heroes'),
	localforage.getItem<Sourcebook[]>('forgesteel-homebrew-settings'),
	localforage.getItem<string[]>('forgesteel-hidden-setting-ids'),
	localforage.getItem<Playbook>('forgesteel-playbook'),
	localforage.getItem<Options[]>('forgesteel-options')
];

Promise.all(promises).then(results => {
	let heroes = results[0] as Hero[] | null;
	if (!heroes) {
		heroes = [];
	}

	heroes.forEach(hero => {
		HeroLogic.updateHero(hero);
	});

	let sourcebooks = results[1] as Sourcebook[] | null;
	if (!sourcebooks) {
		sourcebooks = [];
	}

	sourcebooks.forEach(sourcebook => {
		if (sourcebook.domains === undefined) {
			sourcebook.domains = [];
		}
		if (sourcebook.items === undefined) {
			sourcebook.items = [];
		}
		if (sourcebook.perks === undefined) {
			sourcebook.perks = [];
		}
		if (sourcebook.monsterGroups === undefined) {
			sourcebook.monsterGroups = [];
		}
	});

	let hiddenSourcebookIDs = results[2] as string[] | null;
	if (!hiddenSourcebookIDs) {
		hiddenSourcebookIDs = [];
	}

	let playbook = results[3] as Playbook | null;
	if (!playbook) {
		playbook = FactoryLogic.createPlaybook();
	}

	let options = results[4] as Options | null;
	if (!options) {
		options = {
			showSkillsInGroups: false,
			showFreeStrikes: false,
			showStandardAbilities: false,
			dimUnavailableAbilities: false
		};
	}

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Main
				heroes={heroes}
				homebrewSourcebooks={sourcebooks}
				hiddenSourcebookIDs={hiddenSourcebookIDs}
				playbook={playbook}
				options={options}
			/>
		</StrictMode>
	);
});
