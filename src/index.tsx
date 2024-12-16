import { CampaignSetting } from './models/campaign-setting.ts';
import { Hero } from './models/hero.ts';
import { HeroLogic } from './logic/hero-logic.ts';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

const promises = [
	localforage.getItem<Hero[]>('forgesteel-heroes'),
	localforage.getItem<CampaignSetting[]>('forgesteel-homebrew-settings'),
	localforage.getItem<string[]>('forgesteel-hidden-setting-ids'),
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

	let homebrewSettings = results[1] as CampaignSetting[] | null;
	if (!homebrewSettings) {
		homebrewSettings = [];
	}

	homebrewSettings.forEach(setting => {
		if (setting.domains === undefined) {
			setting.domains = [];
		}
		if (setting.items === undefined) {
			setting.items = [];
		}
		if (setting.perks === undefined) {
			setting.perks = [];
		}
		if (setting.monsterGroups === undefined) {
			setting.monsterGroups = [];
		}
	});

	let hiddenSettingIDs = results[2] as string[] | null;
	if (!hiddenSettingIDs) {
		hiddenSettingIDs = [];
	}

	let options = results[3] as Options | null;
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
				homebrewSettings={homebrewSettings}
				hiddenSettingIDs={hiddenSettingIDs}
				options={options}
			/>
		</StrictMode>
	);
});
