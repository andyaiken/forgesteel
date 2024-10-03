import { CampaignSetting } from './models/campaign-setting.ts';
import { Hero } from './models/hero.ts';
import { HeroLogic } from './logic/hero-logic.ts';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

localforage
	.getItem<Hero[]>('forgesteel-heroes')
	.then(heroes => {
		if (!heroes) {
			heroes = [];
		}

		heroes.forEach(hero => {
			HeroLogic.updateHero(hero);
		});

		localforage
			.getItem<CampaignSetting[]>('forgesteel-homebrew-settings')
			.then(homebrewSettings => {
				if (!homebrewSettings) {
					homebrewSettings = [];
				}

				localforage
					.getItem<Options>('forgesteel-options')
					.then(options => {
						if (!options) {
							options = {
								showSkillsInGroups: false,
								showFreeStrikes: false,
								showStandardAbilities: false
							};
						}

						createRoot(document.getElementById('root')!).render(
							<StrictMode>
								<Main
									heroes={heroes}
									homebrewSettings={homebrewSettings}
									options={options}
								/>
							</StrictMode>
						);
					});
			});
	});
