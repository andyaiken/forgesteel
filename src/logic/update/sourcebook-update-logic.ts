import { AbilityUpdateLogic } from './ability-update-logic';
import { FeatureType } from '../../enums/feature-type';
import { FeatureUpdateLogic } from './feature-update-logic';
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
				lvl.features
					.filter(f => f.type === FeatureType.Ability)
					.map(f => f.data.ability)
					.forEach(AbilityUpdateLogic.updateAbility);
			});

			c.subclasses.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					lvl.features.forEach(FeatureUpdateLogic.updateFeature);
					lvl.features
						.filter(f => f.type === FeatureType.Ability)
						.map(f => f.data.ability)
						.forEach(AbilityUpdateLogic.updateAbility);
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
				lvl.features
					.filter(f => f.type === FeatureType.Ability)
					.map(f => f.data.ability)
					.forEach(AbilityUpdateLogic.updateAbility);
			});
		});

		sourcebook.perks.forEach(FeatureUpdateLogic.updateFeature);
		sourcebook.perks
			.filter(f => f.type === FeatureType.Ability)
			.map(f => f.data.ability)
			.forEach(AbilityUpdateLogic.updateAbility);

		sourcebook.titles.forEach(title => {
			title.features.forEach(FeatureUpdateLogic.updateFeature);
			title.features
				.filter(f => f.type === FeatureType.Ability)
				.map(f => f.data.ability)
				.forEach(AbilityUpdateLogic.updateAbility);
		});

		sourcebook.items.forEach(item => {
			item.featuresByLevel.forEach(lvl => {
				lvl.features.forEach(FeatureUpdateLogic.updateFeature);
				lvl.features
					.filter(f => f.type === FeatureType.Ability)
					.map(f => f.data.ability)
					.forEach(AbilityUpdateLogic.updateAbility);
			});
			if (item.customizationsByLevel === undefined) {
				item.customizationsByLevel = [
					{
						level: 1,
						features: []
					},
					{
						level: 5,
						features: []
					},
					{
						level: 9,
						features: []
					}
				];
			}
		});

		sourcebook.kits.forEach(kit => {
			if (kit.type === 'Standard') {
				kit.type = '';
			}
			kit.features.forEach(FeatureUpdateLogic.updateFeature);
			kit.features
				.filter(f => f.type === FeatureType.Ability)
				.map(f => f.data.ability)
				.forEach(AbilityUpdateLogic.updateAbility);
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
