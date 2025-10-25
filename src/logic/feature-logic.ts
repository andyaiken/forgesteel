import { Feature, FeatureAbilityCostData, FeatureAbilityDamage, FeatureAbilityDamageData, FeatureAbilityData, FeatureAbilityDistanceData, FeatureAddOnData, FeatureAncestryChoiceData, FeatureAncestryFeatureChoiceData, FeatureBonus, FeatureBonusData, FeatureCharacteristicBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureCompanionData, FeatureConditionImmunityData, FeatureDamageModifierData, FeatureData, FeatureDomainData, FeatureDomainFeatureData, FeatureFixtureData, FeatureFollowerData, FeatureHeroicResourceData, FeatureHeroicResourceGainData, FeatureItemChoiceData, FeatureKitData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureMaliceData, FeatureMovementModeData, FeatureMultipleData, FeaturePackageContentData, FeaturePackageData, FeaturePerkData, FeatureProficiencyData, FeatureSaveThresholdData, FeatureSizeData, FeatureSkillChoiceData, FeatureSpeedData, FeatureSummonChoiceData, FeatureSummonData, FeatureTaggedFeatureChoiceData, FeatureTaggedFeatureData, FeatureTitleChoiceData } from '@/models/feature';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { AbilityUsage } from '@/enums/ability-usage';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureAddOnType } from '@/enums/feature-addon-type';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { FollowerType } from '@/enums/follower-type';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { MonsterFeatureCategory } from '@/enums/monster-feature-category';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { Utils } from '@/utils/utils';

export class FeatureLogic {
	static getFeaturesFromAncestry = (ancestry: Ancestry, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push(...ancestry.features.map(f => ({ feature: f, source: ancestry.name })));

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static getFeaturesFromCulture = (culture: Culture, hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

		features.push({
			feature: culture.language,
			source: culture.name
		});

		if (culture.environment) {
			features.push({ feature: culture.environment, source: culture.name });
		}
		if (culture.organization) {
			features.push({ feature: culture.organization, source: culture.name });
		}
		if (culture.upbringing) {
			features.push({ feature: culture.upbringing, source: culture.name });
		}

		features.push({
			feature: FactoryLogic.feature.create({
				id: `${culture.name.toLocaleLowerCase().replaceAll(' ', '-')}-culture-lore-influence`,
				name: `${culture.name} Culture`.trim(),
				description: 'You gain an edge on tests made to recall lore about your culture, and on tests made to influence and interact with people of your culture.'
			}),
			source: culture.name
		});

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

		features.push(...hero.features.map(f => {
			let source = 'Customization';
			switch (f.type) {
				case FeatureType.TitleChoice:
					source = f.data.selected.length === 1 ? f.data.selected[0].name : 'Title';
					break;
				case FeatureType.Companion:
				case FeatureType.Follower:
					source = 'Follower';
					break;
			}
			return ({ feature: f, source: source });
		}));

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

		item.imbuements.map(imbuement => imbuement.feature)
			.forEach(feature => {
				if (feature.type === FeatureType.Text) {
					if (feature.description) {
						if (feature.name) {
							ft.description += '\n\n';
							ft.description += `**${feature.name}**`;
						}
						ft.description += '\n\n';
						ft.description += feature.description;
					}
				} else {
					features.push({ feature: feature, source: item.name });
				}
			});

		const hasLvl1 = item.imbuements.filter(lvl => lvl.level === 1).length > 0;
		const hasLvl5 = item.imbuements.filter(lvl => lvl.level === 5).length > 0;
		const hasLvl9 = item.imbuements.filter(lvl => lvl.level === 9).length > 0;
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

		return FeatureLogic.simplifyFeatures(features, hero);
	};

	static simplifyFeatures = (features: { feature: Feature, source: string, level?: number }[], hero: Hero) => {
		const list: { feature: Feature, source: string, level?: number }[] = [];

		const addFeature = (feature: Feature, source: string, level?: number) => {
			if (!feature) {
				return;
			}

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
						if (d.defaultFeatures) {
							d.defaultFeatures.forEach(f => addFeature(f, `${d.name} Domain`, level));
						}
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

	// Combine Features that do the 'same thing' - e.g. multiple Stamina bonuses into one
	static reduceFeatures = (features: Feature[]): Feature[] => {
		const reduced: Feature[] = [];

		features.forEach(f => {
			switch (f.type) {
				case FeatureType.Bonus: {
					const match = reduced.find(m => m.type === FeatureType.Bonus
							&& this.matchDataFields(m.data, f.data, [ 'field' ]));
					if (match) {
						(match as FeatureBonus).data.value += f.data.value;
					} else {
						reduced.push(Utils.copy(f));
					}
					break;
				}
				case FeatureType.AbilityDamage: {
					const match = reduced.find(m => m.type === FeatureType.AbilityDamage
						&& this.matchDataFields(m.data, f.data, [ 'damageType', 'keywords' ]));
					if (match) {
						(match as FeatureAbilityDamage).data.value += f.data.value;
					} else {
						reduced.push(Utils.copy(f));
					}
					break;
				}
				default:
					reduced.push(Utils.copy(f));
					break;
			}
		});

		return reduced;
	};

	static matchDataFields<T>(a: T, b: T, fields: string[]): boolean {
		return fields.every(field => {
			if (Object.prototype.hasOwnProperty.call(a, field)
				&& Object.prototype.hasOwnProperty.call(b, field)) {
				const aField = a[field as keyof T];
				const bField = b[field as keyof T];

				if (aField instanceof Array && bField instanceof Array) {
					return aField.every(x => bField.includes(x));
				} else {
					return aField === bField;
				}
			} else {
				return false;
			}
		});
	};

	static switchFeatureCharacteristic = (feature: Feature, fromCharacteristic: Characteristic, toCharacteristic: Characteristic) => {
		const fromStr = fromCharacteristic.toString();
		const toStr = toCharacteristic.toString();

		const fromChar = fromStr[0];
		const toChar = toStr[0];

		feature.description = feature.description.replaceAll(fromStr, toStr);

		switch (feature.type) {
			case FeatureType.Ability:
				feature.data.ability.sections.forEach(s => {
					switch (s.type) {
						case 'text':
							s.text = s.text.replaceAll(fromStr, toStr);
							break;
						case 'field':
							s.effect = s.effect.replaceAll(fromStr, toStr);
							break;
						case 'roll':
							s.roll.characteristic = [ toCharacteristic ];
							s.roll.tier1 = s.roll.tier1.replaceAll(fromStr, toStr);
							s.roll.tier1 = s.roll.tier1.replaceAll(`+ ${fromChar}`, `+ ${toChar}`);
							s.roll.tier2 = s.roll.tier2.replaceAll(fromStr, toStr);
							s.roll.tier2 = s.roll.tier2.replaceAll(`+ ${fromChar}`, `+ ${toChar}`);
							s.roll.tier3 = s.roll.tier3.replaceAll(fromStr, toStr);
							s.roll.tier3 = s.roll.tier3.replaceAll(`+ ${fromChar}`, `+ ${toChar}`);
							s.roll.crit = s.roll.crit.replaceAll(fromStr, toStr);
							s.roll.crit = s.roll.crit.replaceAll(`+ ${fromChar}`, `+ ${toChar}`);
							break;
					}
				});
				break;
			case FeatureType.Choice:
				[ ...feature.data.options.map(f => f.feature), ...feature.data.selected ]
					.forEach(f => FeatureLogic.switchFeatureCharacteristic(f, fromCharacteristic, toCharacteristic));
				break;
			case FeatureType.Multiple:
				feature.data.features.forEach(f => FeatureLogic.switchFeatureCharacteristic(f, fromCharacteristic, toCharacteristic));
				break;
		}
	};

	///////////////////////////////////////////////////////////////////////////

	static getFeatureData = (type: FeatureType) => {
		let data: FeatureData | null = null;

		switch (type) {
			case FeatureType.Ability:
				data = {
					ability: FactoryLogic.createAbility({
						id: Utils.guid(),
						name: '',
						description: '',
						type: FactoryLogic.type.createMain(),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '',
						sections: []
					})
				} as FeatureAbilityData;
				break;
			case FeatureType.AbilityCost:
				data = {
					keywords: [],
					modifier: -1
				} as FeatureAbilityCostData;
				break;
			case FeatureType.AbilityDamage:
				data = {
					keywords: [],
					value: 0,
					valueFromController: null,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0,
					damageType: DamageType.Damage
				} as FeatureAbilityDamageData;
				break;
			case FeatureType.AbilityDistance:
				data = {
					keywords: [],
					value: 0,
					valueFromController: null,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				} as FeatureAbilityDistanceData;
				break;
			case FeatureType.AddOn:
				data = {
					category: FeatureAddOnType.Defensive,
					cost: 1
				} as FeatureAddOnData;
				break;
			case FeatureType.AncestryChoice:
				data = {
					selected: null
				} as FeatureAncestryChoiceData;
				break;
			case FeatureType.AncestryFeatureChoice:
				data = {
					source: {
						current: true,
						former: true,
						customID: ''
					},
					value: 1,
					selected: null
				} as FeatureAncestryFeatureChoiceData;
				break;
			case FeatureType.Bonus:
				data = {
					field: FeatureField.Recoveries,
					value: 0,
					valueFromController: null,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				} as FeatureBonusData;
				break;
			case FeatureType.CharacteristicBonus:
				data = {
					characteristic: Characteristic.Might,
					value: 1
				} as FeatureCharacteristicBonusData;
				break;
			case FeatureType.Choice:
				data = {
					options: [],
					count: 1,
					selected: []
				} as FeatureChoiceData;
				break;
			case FeatureType.ClassAbility:
				data = {
					classID: undefined,
					cost: 1,
					count: 1,
					allowAnySource: false,
					minLevel: 1,
					selectedIDs: []
				} as FeatureClassAbilityData;
				break;
			case FeatureType.ConditionImmunity:
				data = {
					conditions: []
				} as FeatureConditionImmunityData;
				break;
			case FeatureType.DamageModifier:
				data = {
					modifiers: []
				} as FeatureDamageModifierData;
				break;
			case FeatureType.Domain:
				data = {
					characteristic: Characteristic.Intuition,
					count: 1,
					selected: []
				} as FeatureDomainData;
				break;
			case FeatureType.DomainFeature:
				data = {
					level: 1,
					count: 1,
					selected: []
				} as FeatureDomainFeatureData;
				break;
			case FeatureType.Companion: {
				data = {
					type: 'companion',
					selected: null
				} as FeatureCompanionData;
				break;
			}
			case FeatureType.Fixture:
				data = {
					fixture: {
						id: Utils.guid(),
						name: '',
						description: '',
						role: FactoryLogic.createTerrainRole(MonsterRoleType.NoRole, TerrainRoleType.Hazard),
						baseStamina: 20,
						size: FactoryLogic.createSize(2),
						featuresByLevel: [
							{
								level: 1,
								features: []
							},
							{
								level: 2,
								features: []
							},
							{
								level: 3,
								features: []
							},
							{
								level: 4,
								features: []
							},
							{
								level: 5,
								features: []
							},
							{
								level: 6,
								features: []
							},
							{
								level: 7,
								features: []
							},
							{
								level: 8,
								features: []
							},
							{
								level: 9,
								features: []
							},
							{
								level: 10,
								features: []
							}
						]
					}
				} as FeatureFixtureData;
				break;
			case FeatureType.Follower:
				data = {
					follower: FactoryLogic.createFollower(FollowerType.Artisan)
				} as FeatureFollowerData;
				break;
			case FeatureType.HeroicResource:
				data = {
					type: 'heroic',
					gains: [],
					details: '',
					canBeNegative: false,
					value: 0
				} as FeatureHeroicResourceData;
				break;
			case FeatureType.HeroicResourceGain:
				data = {
					tag: '',
					trigger: '',
					value: '1',
					replacesTags: []
				} as FeatureHeroicResourceGainData;
				break;
			case FeatureType.ItemChoice:
				data = {
					types: [],
					count: 1,
					selected: []
				} as FeatureItemChoiceData;
				break;
			case FeatureType.Kit:
				data = {
					types: [],
					count: 1,
					selected: []
				} as FeatureKitData;
				break;
			case FeatureType.Language:
				data = {
					language: ''
				} as FeatureLanguageData;
				break;
			case FeatureType.LanguageChoice:
				data = {
					options: [],
					count: 1,
					selected: []
				} as FeatureLanguageChoiceData;
				break;
			case FeatureType.MovementMode:
				data = {
					mode: ''
				} as FeatureMovementModeData;
				break;
			case FeatureType.Malice:
				data = {
					cost: 3,
					repeatable: false,
					sections: [ '' ]
				} as FeatureMaliceData;
				break;
			case FeatureType.Multiple:
				data = {
					features: []
				} as FeatureMultipleData;
				break;
			case FeatureType.Package:
				data = {
					tag: ''
				} as FeaturePackageData;
				break;
			case FeatureType.PackageContent:
				data = {
					tag: ''
				} as FeaturePackageContentData;
				break;
			case FeatureType.Perk:
				data = {
					lists: [],
					count: 1,
					selected: []
				} as FeaturePerkData;
				break;
			case FeatureType.Proficiency:
				data = {
					weapons: [],
					armor: []
				} as FeatureProficiencyData;
				break;
			case FeatureType.SaveThreshold:
				data = {
					value: 5
				} as FeatureSaveThresholdData;
				break;
			case FeatureType.Size:
				data = {
					size: {
						value: 1,
						mod: 'M'
					}
				} as FeatureSizeData;
				break;
			case FeatureType.SkillChoice:
				data = {
					options: [],
					listOptions: [],
					count: 1,
					selected: []
				} as FeatureSkillChoiceData;
				break;
			case FeatureType.Speed:
				data = {
					speed: 5
				} as FeatureSpeedData;
				break;
			case FeatureType.Summon:
				data = {
					summons: []
				} as FeatureSummonData;
				break;
			case FeatureType.SummonChoice:
				data = {
					options: [],
					count: 1,
					selected: []
				} as FeatureSummonChoiceData;
				break;
			case FeatureType.TaggedFeature:
				data = {
					tag: '',
					feature: FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				} as FeatureTaggedFeatureData;
				break;
			case FeatureType.TaggedFeatureChoice:
				data = {
					tag: '',
					count: 1,
					selected: []
				} as FeatureTaggedFeatureChoiceData;
				break;
			case FeatureType.TitleChoice:
				data = {
					echelon: 1,
					count: 1,
					selected: []
				} as FeatureTitleChoiceData;
				break;
		}

		return data;
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
			case FeatureType.SummonChoice:
			case FeatureType.TaggedFeatureChoice:
			case FeatureType.TitleChoice:
				return true;
		};

		return false;
	};

	static isChosen = (feature: Feature, hero: Hero) => {
		switch (feature.type) {
			case FeatureType.AncestryChoice:
				return !!feature.data.selected;
			case FeatureType.AncestryFeatureChoice:
				return !!feature.data.selected;
			case FeatureType.Choice: {
				let availableOptions = [ ...feature.data.options ];
				if (availableOptions.some(opt => opt.feature.type === FeatureType.AncestryFeatureChoice)) {
					availableOptions = availableOptions.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					const additionalOptions = HeroLogic.getFormerAncestries(hero)
						.flatMap(a => a.features)
						.filter(f => f.type === FeatureType.Choice)
						.flatMap(f => f.data.options)
						.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice);
					availableOptions.push(...additionalOptions);
				}
				const selected = feature.data.selected
					.map(f => availableOptions.find(opt => opt.feature.id === f.id))
					.filter(opt => !!opt);
				const count = feature.data.count === 'ancestry' ? HeroLogic.getAncestryPoints(hero) : feature.data.count;
				return Collections.sum(selected, i => i.value) >= count;
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
			case FeatureType.SummonChoice:
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
				return 'This feature sets the hero\'s former ancestry.';
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
			case FeatureType.Fixture:
				return 'This feature allows you to summon a fixture.';
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
			case FeatureType.MaliceAbility:
				return 'This feature grants you a malice ability.';
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
			case FeatureType.SaveThreshold:
				return 'This feature modifies your threshold for saves.';
			case FeatureType.Size:
				return 'This feature sets your size.';
			case FeatureType.SkillChoice:
				return 'This feature allows you to choose a skill.';
			case FeatureType.Speed:
				return 'This feature sets your base speed.';
			case FeatureType.Summon:
				return 'This feature specifies monsters you can summon.';
			case FeatureType.SummonChoice:
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
