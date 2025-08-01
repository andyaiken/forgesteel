import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Collections } from '../utils/collections';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { FactoryLogic } from './factory-logic';
import { Feature } from '../models/feature';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { MonsterFeatureCategory } from '../enums/monster-feature-category';

export class FeatureLogic {
	static getFeaturesFromAncestry = (ancestry: Ancestry, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push(...ancestry.features.map(f => ({ feature: f, source: ancestry.name })));

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromCulture = (culture: Culture, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		if (culture.environment) {
			features.push({ feature: culture.environment, source: culture.name });
		}
		if (culture.organization) {
			features.push({ feature: culture.organization, source: culture.name });
		}
		if (culture.upbringing) {
			features.push({ feature: culture.upbringing, source: culture.name });
		}

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromCareer = (career: Career, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push(...career.features.map(f => ({ feature: f, source: career.name })));

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromClass = (heroClass: HeroClass, hero: Hero) => {
		const features: { feature: Feature, source: string, level: number }[] = [];

		const classLevel = heroClass.level;

		heroClass.featuresByLevel.forEach(lvl => {
			if (lvl.level <= classLevel) {
				features.push(...lvl.features.map(f => ({ feature: f, source: heroClass.name, level: lvl.level })));
			}
		});

		heroClass.subclasses
			.filter(sc => sc.selected)
			.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					if (lvl.level <= classLevel) {
						features.push(...lvl.features.map(f => ({ feature: f, source: sc.name, level: lvl.level })));
					}
				});
			});

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromComplication = (complication: Complication, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push(...complication.features.map(f => ({ feature: f, source: complication.name })));

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromCustomization = (hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push(...hero.features.map(f => ({ feature: f, source: 'Customization' })));

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromItem = (item: Item, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		const ft = FactoryLogic.feature.create({
			id: item.id,
			name: item.count === 1 ? item.name : `${item.name} x${item.count}`,
			description: item.effect || item.description
		});
		features.push({ feature: ft, source: item.name });

		const heroLevel = hero.class?.level || 1;
		item.featuresByLevel
			.filter(lvl => lvl.level <= heroLevel)
			.forEach(lvl => {
				lvl.features.forEach(f => {
					if (f.type === FeatureType.Text) {
						if (f.description) {
							if (f.name) {
								ft.description += '\n\n';
								ft.description += `**${f.name}**`;
							}
							ft.description += '\n\n';
							ft.description += f.description;
						}
					} else {
						features.push({ feature: f, source: item.name });
					}
				});
			});

		if (item.customizationsByLevel) {
			item.customizationsByLevel
				.forEach(lvl => {
					lvl.features
						.filter(f => f.selected)
						.map(f => f.feature)
						.forEach(f => {
							if (f.type === FeatureType.Text) {
								if (f.description) {
									if (f.name) {
										ft.description += '\n\n';
										ft.description += `**${f.name}**`;
									}
									ft.description += '\n\n';
									ft.description += f.description;
								}
							} else {
								features.push({ feature: f, source: item.name });
							}
						});
				});

			const hasLvl1 = item.customizationsByLevel.filter(lvl => lvl.level === 1).flatMap(lvl => lvl.features).filter(f => f.selected).length > 0;
			const hasLvl5 = item.customizationsByLevel.filter(lvl => lvl.level === 5).flatMap(lvl => lvl.features).filter(f => f.selected).length > 0;
			const hasLvl9 = item.customizationsByLevel.filter(lvl => lvl.level === 9).flatMap(lvl => lvl.features).filter(f => f.selected).length > 0;
			if (item.type === ItemType.ImbuedArmor) {
				// Imbued armor grants +6 / +12 / +21 stamina based on highest enhancement tier
				if (hasLvl1) {
					features.push({
						feature: FactoryLogic.feature.createBonus({
							id: item.name + '-bonus-1',
							field: FeatureField.Stamina,
							value: 6
						}),
						source: item.name
					});
				}
				if (hasLvl5) {
					features.push({
						feature: FactoryLogic.feature.createBonus({
							id: item.name + '-bonus-5',
							field: FeatureField.Stamina,
							value: 6
						}),
						source: item.name
					});
				}
				if (hasLvl9) {
					features.push({
						feature: FactoryLogic.feature.createBonus({
							id: item.name + '-bonus-9',
							field: FeatureField.Stamina,
							value: 9
						}),
						source: item.name
					});
				}
			}
			if (item.type === ItemType.ImbuedImplement) {
				// Imbued implement grants +1 / +2 / +3 damage to magic / psionic abilities based on highest enhancement tier
				if (hasLvl1) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-1a',
							keywords: [ AbilityKeyword.Magic ],
							value: 1
						}),
						source: item.name
					});
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-1b',
							keywords: [ AbilityKeyword.Psionic ],
							value: 1
						}),
						source: item.name
					});
				}
				if (hasLvl5) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-5a',
							keywords: [ AbilityKeyword.Magic ],
							value: 1
						}),
						source: item.name
					});
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-5b',
							keywords: [ AbilityKeyword.Psionic ],
							value: 1
						}),
						source: item.name
					});
				}
				if (hasLvl9) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-9a',
							keywords: [ AbilityKeyword.Magic ],
							value: 1
						}),
						source: item.name
					});
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-9b',
							keywords: [ AbilityKeyword.Psionic ],
							value: 1
						}), source: item.name
					});
				}
			}
			if (item.type === ItemType.ImbuedWeapon) {
				// Imbued weapon grants +1 / +2 / +3 damage to weapon abilities based on highest enhancement tier
				if (hasLvl1) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-1',
							keywords: [ AbilityKeyword.Weapon ],
							value: 1
						}),
						source: item.name
					});
				}
				if (hasLvl5) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-5',
							keywords: [ AbilityKeyword.Weapon ],
							value: 1
						}),
						source: item.name
					});
				}
				if (hasLvl9) {
					features.push({
						feature: FactoryLogic.feature.createAbilityDamage({
							id: item.name + '-bonus-9',
							keywords: [ AbilityKeyword.Weapon ],
							value: 1
						}),
						source: item.name
					});
				}
			}
		}

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static simplifyFeatures = (features: { feature: Feature, source: string, level?: number }[], hero: Hero) => {
		const list: { feature: Feature, source: string, level?: number }[] = [];

		const addFeature = (feature: Feature, source: string, level?: number) => {
			list.push({ feature: feature, source: source, level: level });

			switch (feature.type) {
				case FeatureType.AncestryFeatureChoice:
					if (feature.data.selected) {
						addFeature(feature.data.selected, source, level);
					}
					break;
				case FeatureType.Choice:
					feature.data.selected.forEach(f => addFeature(f, source, level));
					break;
				case FeatureType.Domain:
					feature.data.selected.forEach(d => {
						d.defaultFeatures.forEach(f => addFeature(f, d.name, level));
					});
					break;
				case FeatureType.DomainFeature:
					feature.data.selected.forEach(f => addFeature(f, source, level));
					break;
				case FeatureType.ItemChoice:
					feature.data.selected.forEach(item => FeatureLogic.getFeaturesFromItem(item, hero).forEach(f => addFeature(f.feature, f.source, level)));
					break;
				case FeatureType.Kit:
					feature.data.selected.forEach(kit => kit.features.forEach(f => addFeature(f, kit.name, level)));
					break;
				case FeatureType.Multiple:
					feature.data.features.forEach(f => addFeature(f, source, level));
					break;
				case FeatureType.Perk:
					feature.data.selected.forEach(f => addFeature(f, source, level));
					break;
				case FeatureType.TaggedFeatureChoice:
					feature.data.selected.forEach(f => addFeature(f, source, level));
					break;
				case FeatureType.TitleChoice:
					feature.data.selected.forEach(title => title.features.filter(f => f.id === title.selectedFeatureID).forEach(f => addFeature(f, source, level)));
					break;
			}
		};

		features.forEach(f => addFeature(f.feature, f.source, f.level));

		return list;
	};

	///////////////////////////////////////////////////////////////////////////

	static isChoice = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice:
			case FeatureType.AncestryFeatureChoice:
			case FeatureType.Choice:
			case FeatureType.ClassAbility:
			case FeatureType.Companion:
			case FeatureType.Domain:
			case FeatureType.DomainFeature:
			case FeatureType.ItemChoice:
			case FeatureType.Kit:
			case FeatureType.LanguageChoice:
			case FeatureType.Perk:
			case FeatureType.SkillChoice:
			case FeatureType.Summon:
			case FeatureType.TaggedFeatureChoice:
			case FeatureType.TitleChoice:
				return true;
		};

		return false;
	};

	static isChosen = (feature: Feature, formerAncestries: Ancestry[]) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice:
				return !!feature.data.selected;
			case FeatureType.AncestryFeatureChoice:
				return !!feature.data.selected;
			case FeatureType.Choice: {
				let availableOptions = [ ...feature.data.options ];
				if (availableOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
					availableOptions = availableOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					const additionalOptions = formerAncestries
						.flatMap(a => a.features)
						.filter(f => f.type === FeatureType.Choice)
						.flatMap(f => f.data.options)
						.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					availableOptions.push(...additionalOptions);
				}
				const selected = feature.data.selected
					.map(f => availableOptions.find(opt => opt.feature.id === f.id))
					.filter(opt => !!opt);
				return Collections.sum(selected, i => i.value) >= feature.data.count;
			}
			case FeatureType.ClassAbility:
				return feature.data.selectedIDs.length >= feature.data.count;
			case FeatureType.Companion:
				return feature.data.selected !== null;
			case FeatureType.Domain:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.DomainFeature:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.ItemChoice:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.Kit:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.LanguageChoice:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.Perk:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.SkillChoice:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.TaggedFeatureChoice:
				return feature.data.selected.length >= feature.data.count;
			case FeatureType.TitleChoice:
				return feature.data.selected.length >= feature.data.count;
		};

		return true;
	};

	///////////////////////////////////////////////////////////////////////////

	static getFeatureTag = (feature: Feature) => {
		if (feature.type === FeatureType.Ability) {
			if (feature.data.ability.cost === 'signature') {
				return 'Signature';
			}

			return feature.data.ability.type.usage;
		}

		return feature.type;
	};

	static getFeatureCategory = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Ability:
				if (feature.data.ability.cost === 'signature') {
					return MonsterFeatureCategory.Signature;
				}
				switch (feature.data.ability.type.usage) {
					case AbilityUsage.MainAction:
						return MonsterFeatureCategory.Action;
					case AbilityUsage.Maneuver:
						return MonsterFeatureCategory.Maneuver;
					case AbilityUsage.Trigger:
						return MonsterFeatureCategory.Trigger;
				}
				return MonsterFeatureCategory.Other;
			case FeatureType.ConditionImmunity:
			case FeatureType.DamageModifier:
				return MonsterFeatureCategory.DamageMod;
		}

		return MonsterFeatureCategory.Text;
	};

	static getFeatureTypeDescription = (type: FeatureType) => {
		switch (type) {
			case FeatureType.Ability:
				return 'This feature grants you an ability.';
			case FeatureType.AbilityCost:
				return 'This feature modifies the cost to use an ability.';
			case FeatureType.AbilityDamage:
				return 'This feature modifies the damage of an ability.';
			case FeatureType.AbilityDistance:
				return 'This feature modifies the distance of an ability.';
			case FeatureType.AddOn:
				return 'This feature grants you a monster customization.';
			case FeatureType.AncestryChoice:
				return 'This feature sets the hero\'s ancestry.';
			case FeatureType.AncestryFeatureChoice:
				return 'This feature allows you to select a feature from an ancestry.';
			case FeatureType.Bonus:
				return 'This feature modifies a statistic.';
			case FeatureType.CharacteristicBonus:
				return 'This feature modifies a characteristic.';
			case FeatureType.Choice:
				return 'This feature allows you to choose from a collection of features.';
			case FeatureType.ClassAbility:
				return 'This feature allows you to choose an ability from your class.';
			case FeatureType.Companion:
				return 'This feature grants you a companion, mount, or retainer.';
			case FeatureType.ConditionImmunity:
				return 'This feature grants you immunity to one or more condition types.';
			case FeatureType.DamageModifier:
				return 'This feature grants you an immunity or a weakness.';
			case FeatureType.Domain:
				return 'This feature allows you to choose a domain.';
			case FeatureType.DomainFeature:
				return 'This feature allows you to choose a feature from your domain.';
			case FeatureType.Follower:
				return 'This feature grants you a follower.';
			case FeatureType.HeroicResource:
				return 'This feature grants you a heroic (or epic) resource.';
			case FeatureType.HeroicResourceGain:
				return 'This feature grants you a way to gain your heroic resource.';
			case FeatureType.ItemChoice:
				return 'This feature allows you to choose an item.';
			case FeatureType.Kit:
				return 'This feature allows you to choose a kit.';
			case FeatureType.Language:
				return 'This feature grants you a language.';
			case FeatureType.LanguageChoice:
				return 'This feature allows you to choose a language.';
			case FeatureType.Malice:
				return 'This feature grants you a malice effect.';
			case FeatureType.MovementMode:
				return 'This feature grants you an additional movement mode.';
			case FeatureType.Multiple:
				return 'This feature grants you a collection of features.';
			case FeatureType.Package:
				return 'This feature collates content from other features.';
			case FeatureType.PackageContent:
				return 'This feature provides content for a Package feature.';
			case FeatureType.Perk:
				return 'This feature allows you to choose a perk.';
			case FeatureType.Proficiency:
				return 'This feature grants you proficiency with weapons or armor.';
			case FeatureType.Size:
				return 'This feature sets your size.';
			case FeatureType.Skill:
				return 'This feature grants you a skill.';
			case FeatureType.SkillChoice:
				return 'This feature allows you to choose a skill.';
			case FeatureType.Speed:
				return 'This feature sets your base speed.';
			case FeatureType.Summon:
				return 'This feature allows you to choose monsters you can summon.';
			case FeatureType.TaggedFeature:
				return 'This feature describes a tagged feature.';
			case FeatureType.TaggedFeatureChoice:
				return 'This feature allows you to select a tagged feature.';
			case FeatureType.Text:
				return 'This feature has no special properties, just a text description.';
			case FeatureType.TitleChoice:
				return 'This feature allows you to choose a title.';
		}
	};
}
