import { FactoryLogic } from './logic/factory-logic.ts';
import { FeatureType } from './enums/feature-type.ts';
import { Format } from './utils/format.ts';
import { HashRouter } from 'react-router';
import { Hero } from './models/hero.ts';
import { HeroLogic } from './logic/hero-logic.ts';
import { Main } from './components/main/main.tsx';
import { MonsterOrganizationType } from './enums/monster-organization-type.ts';
import { Options } from './models/options.ts';
import { Playbook } from './models/playbook.ts';
import { Sourcebook } from './models/sourcebook.ts';
import { SourcebookData } from './data/sourcebook-data.ts';
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
		if (sourcebook.titles === undefined) {
			sourcebook.titles = [];
		}
		if (sourcebook.monsterGroups === undefined) {
			sourcebook.monsterGroups = [];
		}
		if (sourcebook.projects === undefined) {
			sourcebook.projects = [];
		}

		sourcebook.classes.forEach(c => {
			c.featuresByLevel.forEach(lvl => {
				lvl.features
					.filter(f => f.type === FeatureType.ClassAbility)
					.forEach(f => {
						f.data.minLevel = 1;
					});
			});

			c.subclasses.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					lvl.features
						.filter(f => f.type === FeatureType.ClassAbility)
						.forEach(f => {
							f.data.minLevel = 1;
						});
				});
			});
		});

		sourcebook.monsterGroups.forEach(group => {
			group.monsters.forEach(monster => {
				if (monster.role.organization === undefined) {
					monster.role.organization = MonsterOrganizationType.Platoon;
				}

				monster.features
					.filter(f => f.type === FeatureType.DamageModifier)
					.forEach(f => {
						f.data.modifiers.forEach(dm => {
							if (dm.valueCharacteristics === undefined) {
								dm.valueCharacteristics = [];
							}
							if (dm.valueCharacteristicMultiplier === undefined) {
								dm.valueCharacteristicMultiplier = 1;
							}
						});
					});
			});
		});
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

	let hiddenSourcebookIDs = results[2] as string[] | null;
	if (!hiddenSourcebookIDs) {
		hiddenSourcebookIDs = [];
	}

	let playbook = results[3] as Playbook | null;
	if (!playbook) {
		playbook = FactoryLogic.createPlaybook();
	}

	if (playbook.negotiations === undefined) {
		playbook.negotiations = [];
	}

	playbook.negotiations.forEach(n => {
		if (n.impression === undefined) {
			n.impression = 1;
		}
	});

	if (playbook.montages === undefined) {
		playbook.montages = [];
	}

	let options = results[4] as Options | null;
	if (!options) {
		options = {
			showSkillsInGroups: false,
			showFreeStrikes: false,
			showStandardAbilities: false,
			dimUnavailableAbilities: false,
			showMonstersInGroups: true,
			showSimilarMonsters: false,
			similarLevel: true,
			similarRole: true,
			similarOrganization: true,
			similarSize: true,
			heroCount: 4,
			heroLevel: 1,
			heroVictories: 0
		};
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

	if (options.heroCount === undefined) {
		options.heroCount = 4;
	}

	if (options.heroLevel === undefined) {
		options.heroLevel = 1;
	}

	if (options.heroVictories === undefined) {
		options.heroVictories = 0;
	}

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<HashRouter>
				<Main
					heroes={heroes}
					homebrewSourcebooks={sourcebooks}
					hiddenSourcebookIDs={hiddenSourcebookIDs}
					playbook={playbook}
					options={options}
				/>
			</HashRouter>
		</StrictMode>
	);
});
