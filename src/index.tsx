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

				homebrewSettings.forEach(setting => {
					if (setting.domains === undefined) {
						setting.domains = [];
					}
					if (setting.perks === undefined) {
						setting.perks = [];
					}
				});

				localforage
					.getItem<string[]>('forgesteel-hidden-setting-ids')
					.then(hiddenSettingIDs => {
						if (!hiddenSettingIDs) {
							hiddenSettingIDs = [];
						}

						localforage
							.getItem<Options>('forgesteel-options')
							.then(options => {
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
					});

			});
	});
