import { AbilityUpdateLogic } from '@/logic/update/ability-update-logic';
import { Collections } from '@/utils/collections';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureUpdateLogic } from '@/logic/update/feature-update-logic';
import { ItemUpdateLogic } from '@/logic/update/item-update-logic';
import { LanguageType } from '@/enums/language-type';
import { MonsterUpdateLogic } from '@/logic/update/monster-update-logic';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';

export class SourcebookUpdateLogic {
	static updateSourcebook = (sourcebook: Sourcebook) => {
		if (sourcebook.adventures === undefined) {
			sourcebook.adventures = [];
		}
		if (sourcebook.domains === undefined) {
			sourcebook.domains = [];
		}
		if (sourcebook.encounters === undefined) {
			sourcebook.encounters = [];
		}
		if (sourcebook.items === undefined) {
			sourcebook.items = [];
		}
		if (sourcebook.monsterGroups === undefined) {
			sourcebook.monsterGroups = [];
		}
		if (sourcebook.montages === undefined) {
			sourcebook.montages = [];
		}
		if (sourcebook.negotiations === undefined) {
			sourcebook.negotiations = [];
		}
		if (sourcebook.perks === undefined) {
			sourcebook.perks = [];
		}
		if (sourcebook.projects === undefined) {
			sourcebook.projects = [];
		}
		if (sourcebook.subclasses === undefined) {
			sourcebook.subclasses = [];
		}
		if (sourcebook.tacticalMaps === undefined) {
			sourcebook.tacticalMaps = [];
		}
		if (sourcebook.terrain === undefined) {
			sourcebook.terrain = [];
		}
		if (sourcebook.titles === undefined) {
			sourcebook.titles = [];
		}

		sourcebook.adventures = Collections.distinct(sourcebook.adventures, a => a.id);
		sourcebook.ancestries = Collections.distinct(sourcebook.ancestries, a => a.id);
		sourcebook.careers = Collections.distinct(sourcebook.careers, a => a.id);
		sourcebook.classes = Collections.distinct(sourcebook.classes, a => a.id);
		sourcebook.complications = Collections.distinct(sourcebook.complications, a => a.id);
		sourcebook.cultures = Collections.distinct(sourcebook.cultures, a => a.id);
		sourcebook.domains = Collections.distinct(sourcebook.domains, a => a.id);
		sourcebook.encounters = Collections.distinct(sourcebook.encounters, a => a.id);
		sourcebook.imbuements = Collections.distinct(sourcebook.imbuements, a => a.id);
		sourcebook.items = Collections.distinct(sourcebook.items, a => a.id);
		sourcebook.kits = Collections.distinct(sourcebook.kits, a => a.id);
		sourcebook.monsterGroups = Collections.distinct(sourcebook.monsterGroups, a => a.id);
		sourcebook.montages = Collections.distinct(sourcebook.montages, a => a.id);
		sourcebook.negotiations = Collections.distinct(sourcebook.negotiations, a => a.id);
		sourcebook.perks = Collections.distinct(sourcebook.perks, a => a.id);
		sourcebook.projects = Collections.distinct(sourcebook.projects, a => a.id);
		sourcebook.subclasses = Collections.distinct(sourcebook.subclasses, a => a.id);
		sourcebook.tacticalMaps = Collections.distinct(sourcebook.tacticalMaps, a => a.id);
		sourcebook.terrain = Collections.distinct(sourcebook.terrain, a => a.id);
		sourcebook.titles = Collections.distinct(sourcebook.titles, a => a.id);

		sourcebook.classes.forEach(c => {
			if (c.type === undefined) {
				c.type = 'standard';
			}

			if (c.primaryCharacteristicsOptions === undefined) {
				c.primaryCharacteristicsOptions = [];
			}

			c.featuresByLevel.forEach(lvl => {
				lvl.features.forEach(FeatureUpdateLogic.updateFeature);
			});

			c.subclasses.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					lvl.features.forEach(FeatureUpdateLogic.updateFeature);
				});
			});

			c.abilities.forEach(AbilityUpdateLogic.updateAbility);
		});

		sourcebook.cultures.forEach(culture => {
			/* eslint-disable @typescript-eslint/no-deprecated */

			if (culture.language === undefined) {
				culture.language = FactoryLogic.feature.createLanguageChoice({
					id: Utils.guid(),
					selected: culture.languages
				});

				culture.languages = [];
			}

			/* eslint-enable @typescript-eslint/no-deprecated */
		});

		sourcebook.monsterGroups.forEach(group => {
			MonsterUpdateLogic.updateMonsterGroup(group);
			group.monsters.forEach(MonsterUpdateLogic.updateMonster);
		});

		sourcebook.domains.forEach(domain => {
			domain.featuresByLevel.forEach(lvl => {
				lvl.features.forEach(FeatureUpdateLogic.updateFeature);
			});
		});

		sourcebook.perks.forEach(FeatureUpdateLogic.updateFeature);

		sourcebook.titles.forEach(title => {
			title.features.forEach(FeatureUpdateLogic.updateFeature);
		});

		if (sourcebook.imbuements === undefined) {
			sourcebook.imbuements = [];
		}

		/* eslint-disable @typescript-eslint/no-deprecated */
		sourcebook.items.forEach(item => {
			if (item.customizationsByLevel && (item.customizationsByLevel.length > 0)) {
				item.customizationsByLevel.forEach(level => {
					level.features.forEach(feature => {
						if (!sourcebook.imbuements.find(imbuement => imbuement.id === feature.feature.id)) {
							sourcebook.imbuements.push(FactoryLogic.createImbuement({
								type: item.type,
								level: level.level,
								feature: feature.feature
							}));
						};
					});
				});
			}
			ItemUpdateLogic.updateItem(item);
		});
		/* eslint-enable @typescript-eslint/no-deprecated */

		sourcebook.kits.forEach(kit => {
			if (kit.type === 'Standard') {
				kit.type = '';
			}
			kit.features.forEach(FeatureUpdateLogic.updateFeature);
		});

		sourcebook.terrain.forEach(terrain => {
			if (terrain.state === undefined) {
				terrain.state = {
					squares: 1,
					staminaDamage: 0
				};
			}
		});

		sourcebook.languages.forEach(language => {
			if (language.type === undefined) {
				language.type = LanguageType.Cultural;
			}
			if (language.related === undefined) {
				language.related = [];
			}
		});
	};
}
