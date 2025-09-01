import { AbilityUpdateLogic } from './ability-update-logic';
import { FactoryLogic } from '../factory-logic';
import { FeatureUpdateLogic } from './feature-update-logic';
import { ItemUpdateLogic } from './item-update-logic';
import { LanguageType } from '../../enums/language-type';
import { MonsterUpdateLogic } from './monster-update-logic';
import { Sourcebook } from '../../models/sourcebook';

export class SourcebookUpdateLogic {
	static updateSourcebook = (sourcebook: Sourcebook) => {
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
		if (sourcebook.terrain === undefined) {
			sourcebook.terrain = [];
		}
		if (sourcebook.subclasses === undefined) {
			sourcebook.subclasses = [];
		}

		sourcebook.classes.forEach(c => {
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

		sourcebook.monsterGroups.forEach(group => {
			if (group.picture === undefined) {
				group.picture = null;
			}

			if (group.addOns === undefined) {
				group.addOns = [];
			}

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
