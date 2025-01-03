import type {
	Feature,
	FeatureAbility,
	FeatureAbilityCost,
	FeatureAbilityCostData,
	FeatureAbilityData,
	FeatureBonus,
	FeatureBonusData,
	FeatureChoice,
	FeatureChoiceData,
	FeatureClassAbility,
	FeatureClassAbilityData,
	FeatureDamageModifier,
	FeatureDamageModifierData,
	FeatureDomain,
	FeatureDomainData,
	FeatureDomainFeature,
	FeatureDomainFeatureData,
	FeatureKit,
	FeatureKitData,
	FeatureKitType,
	FeatureKitTypeData,
	FeatureLanguage,
	FeatureLanguageChoice,
	FeatureLanguageChoiceData,
	FeatureLanguageData,
	FeatureMalice,
	FeatureMaliceData,
	FeatureMultiple,
	FeatureMultipleData,
	FeaturePerk,
	FeaturePerkData,
	FeatureSize,
	FeatureSizeData,
	FeatureSkill,
	FeatureSkillChoice,
	FeatureSkillChoiceData,
	FeatureSkillData,
	FeatureSpeed,
	FeatureSpeedData,
	FeatureText,
	FeatureTitle,
	FeatureTitleData
} from '../models/feature';
import { Ability } from '../models/ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Collections } from '../utils/collections';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { DamageModifier } from '../models/damage-modifier';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { FormatLogic } from './format-logic';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { KitType } from '../enums/kit';
import { PerkList } from '../enums/perk-list';
import { SkillList } from '../enums/skill-list';

export class FeatureLogic {
	static feature = {
		createFeature: (data: { id: string, name: string, description: string }) => {
			return {
				id: data.id,
				name: data.name,
				description: data.description,
				type: FeatureType.Text,
				data: null
			} as FeatureText;
		},
		createAbilityFeature: (data: { ability: Ability }) => {
			return {
				id: data.ability.id,
				name: data.ability.name,
				description: data.ability.description,
				type: FeatureType.Ability,
				data: {
					ability: data.ability
				} as FeatureAbilityData
			} as FeatureAbility;
		},
		createAbilityCostFeature: (data: { id: string, name?: string, description?: string, keywords: AbilityKeyword[], modifier: number }) => {
			return {
				id: data.id,
				name: data.name || `${data.keywords.join(', ')} cost modifier`,
				description: data.description || '',
				type: FeatureType.AbilityCost,
				data: {
					keywords: data.keywords,
					modifier: data.modifier
				} as FeatureAbilityCostData
			} as FeatureAbilityCost;
		},
		createBonusFeature: (data: { id: string, name?: string, description?: string, field: FeatureField, value?: number, valuePerLevel?: number, valuePerEchelon?: number }) => {
			return {
				id: data.id,
				name: data.name || data.field.toString(),
				description: data.description || '',
				type: FeatureType.Bonus,
				data: {
					field: data.field,
					value: data.value || 0,
					valuePerLevel: data.valuePerLevel || 0,
					valuePerEchelon: data.valuePerEchelon || 0
				} as FeatureBonusData
			} as FeatureBonus;
		},
		createChoiceFeature: (data: { id: string, name?: string, description?: string, options: { feature: Feature, value: number }[], count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Choice',
				description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
				type: FeatureType.Choice,
				data: {
					options: data.options,
					count: count,
					selected: []
				} as FeatureChoiceData
			} as FeatureChoice;
		},
		createClassAbilityChoiceFeature: (data: { id: string, name?: string, description?: string, cost: number, count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Ability',
				description: data.description || `Choose ${count > 1 ? count : 'a'} ${data.cost === 0 ? 'signature' : `${data.cost}pt`} ${count > 1 ? 'abilities' : 'ability'}.`,
				type: FeatureType.ClassAbility,
				data: {
					cost: data.cost,
					count: count,
					selectedIDs: []
				} as FeatureClassAbilityData
			} as FeatureClassAbility;
		},
		createDamageModifierFeature: (data: { id: string, name?: string, description?: string, modifiers: DamageModifier[] }) => {
			return {
				id: data.id,
				name: data.name || 'Damage Modifier',
				description: data.description || data.modifiers.map(FormatLogic.getDamageModifier).join(', '),
				type: FeatureType.DamageModifier,
				data: {
					modifiers: data.modifiers
				} as FeatureDamageModifierData
			} as FeatureDamageModifier;
		},
		createDomainChoiceFeature: (data: { id: string, name?: string, description?: string, count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Domain',
				description: data.description || (count > 1 ? `Choose ${count} domains.` : 'Choose a domain.'),
				type: FeatureType.Domain,
				data: {
					count: count,
					selected: []
				} as FeatureDomainData
			} as FeatureDomain;
		},
		createDomainFeatureFeature: (data: { id: string, name?: string, description?: string, level: number, count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Domain Feature Choice',
				description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
				type: FeatureType.DomainFeature,
				data: {
					level: data.level,
					count: count,
					selected: []
				} as FeatureDomainFeatureData
			} as FeatureDomainFeature;
		},
		createKitChoiceFeature: (data: { id: string, name?: string, description?: string, types?: KitType[], count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Kit',
				description: data.description || (count > 1 ? `Choose ${count} kits.` : 'Choose a kit.'),
				type: FeatureType.Kit,
				data: {
					types: data.types || [],
					count: count,
					selected: []
				} as FeatureKitData
			} as FeatureKit;
		},
		createKitTypeFeature: (data: { id: string, name?: string, description?: string, types: KitType[] }) => {
			return {
				id: data.id,
				name: data.name || 'Kit Type',
				description: data.description || `Allow ${data.types.join(', ')} kits.`,
				type: FeatureType.KitType,
				data: {
					types: data.types || []
				} as FeatureKitTypeData
			} as FeatureKitType;
		},
		createLanguageFeature: (data: { id: string, name?: string, description?: string, language: string }) => {
			return {
				id: data.id,
				name: data.name || data.language,
				description: data.description || '',
				type: FeatureType.Language,
				data: {
					language: data.language
				} as FeatureLanguageData
			} as FeatureLanguage;
		},
		createLanguageChoiceFeature: (data: { id: string, name?: string, description?: string, options?: string[], count?: number, selected?: string[] }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Language',
				description: data.description || '',
				type: FeatureType.LanguageChoice,
				data: {
					options: data.options || [],
					count: count,
					selected: data.selected || []
				} as FeatureLanguageChoiceData
			} as FeatureLanguageChoice;
		},
		createMaliceFeature: (data: { id: string, name: string, description: string, cost: number }) => {
			return {
				id: data.id,
				name: data.name,
				description: data.description,
				type: FeatureType.Malice,
				data: {
					cost: data.cost
				} as FeatureMaliceData
			} as FeatureMalice;
		},
		createMultipleFeature: (data: { id: string, name?: string, description?: string, features: Feature[] }) => {
			return {
				id: data.id,
				name: data.name || data.features.map(f => f.name || 'Unnamed Feature').join(', '),
				description: data.description || '',
				type: FeatureType.Multiple,
				data: {
					features: data.features
				} as FeatureMultipleData
			} as FeatureMultiple;
		},
		createPerkFeature: (data: { id: string, name?: string, description?: string, lists?: PerkList[], count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Perk',
				description: data.description || (count > 1 ? `Choose ${count} perks.` : 'Choose a perk.'),
				type: FeatureType.Perk,
				data: {
					lists: data.lists || [ PerkList.Crafting, PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Lore, PerkList.Supernatural ],
					count: count,
					selected: []
				} as FeaturePerkData
			} as FeaturePerk;
		},
		createSizeFeature: (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: string }) => {
			return {
				id: data.id,
				name: data.name || 'Size',
				description: data.description || '',
				type: FeatureType.Size,
				data: {
					size: {
						value: data.sizeValue,
						mod: data.sizeMod
					}
				} as FeatureSizeData
			} as FeatureSize;
		},
		createSkillFeature: (data: { id: string, name?: string, description?: string, skill: string }) => {
			return {
				id: data.id,
				name: data.name || data.skill,
				description: data.description || '',
				type: FeatureType.Skill,
				data: {
					skill: data.skill
				} as FeatureSkillData
			} as FeatureSkill;
		},
		createSkillChoiceFeature: (data: { id: string, name?: string, description?: string, options?: string[], listOptions?: SkillList[], count?: number, selected?: string[] }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || (count > 1 ? 'Skills' : 'Skill'),
				description: data.description || '',
				type: FeatureType.SkillChoice,
				data: {
					options: data.options || [],
					listOptions: data.listOptions || [],
					count: count,
					selected: data.selected || []
				} as FeatureSkillChoiceData
			} as FeatureSkillChoice;
		},
		createSpeedFeature: (data: { id: string, name?: string, description?: string, speed: number }) => {
			return {
				id: data.id,
				name: data.name || 'Speed',
				description: data.description || '',
				type: FeatureType.Speed,
				data: {
					speed: data.speed
				} as FeatureSpeedData
			} as FeatureSpeed;
		},
		createTitleFeature: (data: { id: string, name?: string, description?: string, count?: number }) => {
			const count = data.count || 1;
			return {
				id: data.id,
				name: data.name || 'Title',
				description: data.description || (count > 1 ? `Choose ${count} titles.` : 'Choose a title.'),
				type: FeatureType.Title,
				data: {
					count: count,
					selected: []
				} as FeatureTitleData
			} as FeatureTitle;
		}
	};

	static getFeaturesFromAncestry = (ancestry: Ancestry) => {
		const features: Feature[] = [];

		features.push(...ancestry.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromCulture = (culture: Culture) => {
		const features: Feature[] = [];

		if (culture.environment) {
			features.push(culture.environment);
		}
		if (culture.organization) {
			features.push(culture.organization);
		}
		if (culture.upbringing) {
			features.push(culture.upbringing);
		}

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromCareer = (career: Career) => {
		const features: Feature[] = [];

		features.push(...career.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromClass = (heroClass: HeroClass) => {
		const features: Feature[] = [];

		const classLevel = heroClass.level;

		heroClass.featuresByLevel.forEach(lvl => {
			if (lvl.level <= classLevel) {
				features.push(...lvl.features);
			}
		});

		heroClass.subclasses
			.filter(sc => sc.selected)
			.forEach(sc => {
				sc.featuresByLevel.forEach(lvl => {
					if (lvl.level <= classLevel) {
						features.push(...lvl.features);
					}
				});
			});

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromComplication = (complication: Complication) => {
		const features: Feature[] = [];

		features.push(...complication.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromItem = (item: Item) => {
		const features: Feature[] = [];

		features.push(...item.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static simplifyFeatures = (features: Feature[]) => {
		// If any features grant kits, get the features from those kits
		const featuresFromKits: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				const data = f.data as FeatureKitData;
				data.selected.forEach(kit => {
					featuresFromKits.push(...kit.features);
				});
			});
		features.push(...featuresFromKits);

		// If any features grant perks, get the features from those perks
		const featuresFromPerks: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Perk)
			.forEach(f => {
				const data = f.data as FeaturePerkData;
				data.selected.forEach(perk => {
					featuresFromPerks.push(perk);
				});
			});
		features.push(...featuresFromPerks);

		// If any features grant titles, get the features from those titles
		const featuresFromTitles: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Title)
			.forEach(f => {
				const data = f.data as FeatureTitleData;
				data.selected.forEach(title => {
					featuresFromTitles.push(...title.features);
				});
			});
		features.push(...featuresFromTitles);

		// If any features grant feature choices, get the selected features
		const featuresFromChoices: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Choice)
			.forEach(f => {
				const data = f.data as FeatureChoiceData;
				data.selected.forEach(selected => {
					featuresFromChoices.push(selected);
				});
			});
		features
			.filter(f => f.type === FeatureType.DomainFeature)
			.forEach(f => {
				const data = f.data as FeatureDomainFeatureData;
				featuresFromChoices.push(...data.selected);
			});
		features.push(...featuresFromChoices);

		// If any features grant multiple features, get those features
		const featuresFromMultiple: Feature[] = [];
		features
			.filter(f => f.type === FeatureType.Multiple)
			.forEach(f => {
				const data = f.data as FeatureMultipleData;
				featuresFromMultiple.push(...data.features);
			});
		features.push(...featuresFromMultiple);

		return features;
	};

	///////////////////////////////////////////////////////////////////////////

	static isChoice = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Choice:
			case FeatureType.ClassAbility:
			case FeatureType.Domain:
			case FeatureType.DomainFeature:
			case FeatureType.Kit:
			case FeatureType.LanguageChoice:
			case FeatureType.Perk:
			case FeatureType.SkillChoice:
			case FeatureType.Title:
				return true;
		};

		return false;
	};

	static isChosen = (feature: Feature) => {
		switch (feature.type) {
			case FeatureType.Choice: {
				const data = feature.data as FeatureChoiceData;
				const selected = data.selected
					.map(f => data.options.find(opt => opt.feature.id === f.id))
					.filter(opt => !!opt);
				return Collections.sum(selected, i => i.value) >= data.count;
			}
			case FeatureType.ClassAbility: {
				const data = feature.data as FeatureClassAbilityData;
				return data.selectedIDs.length >= data.count;
			}
			case FeatureType.Domain: {
				const data = feature.data as FeatureDomainData;
				return data.selected.length >= data.count;
			}
			case FeatureType.DomainFeature: {
				const data = feature.data as FeatureDomainFeatureData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Kit: {
				const data = feature.data as FeatureKitData;
				return data.selected.length >= data.count;
			}
			case FeatureType.LanguageChoice: {
				const data = feature.data as FeatureLanguageChoiceData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Perk: {
				const data = feature.data as FeaturePerkData;
				return data.selected.length >= data.count;
			}
			case FeatureType.SkillChoice: {
				const data = feature.data as FeatureSkillChoiceData;
				return data.selected.length >= data.count;
			}
			case FeatureType.Title: {
				const data = feature.data as FeatureTitleData;
				return data.selected.length >= data.count;
			}
		};

		return true;
	};

	///////////////////////////////////////////////////////////////////////////

	static getFeatureTypeDescription = (type: FeatureType) => {
		switch (type) {
			case FeatureType.Ability:
				return 'This feature grants you an ability.';
			case FeatureType.AbilityCost:
				return 'This feature modifies the cost to use an ability.';
			case FeatureType.Bonus:
				return 'This feature modifies a statistic.';
			case FeatureType.Choice:
				return 'This feature allows you to choose from a collection of features.';
			case FeatureType.ClassAbility:
				return 'This feature allows you to choose an ability from your class.';
			case FeatureType.DamageModifier:
				return 'This feature grants you an immunity or a weakness.';
			case FeatureType.Domain:
				return 'This feature allows you to choose a domain.';
			case FeatureType.DomainFeature:
				return 'This feature allows you to choose a feature from your domain.';
			case FeatureType.Kit:
				return 'This feature allows you to choose a kit.';
			case FeatureType.KitType:
				return 'This feature changes the types of kit you can select.';
			case FeatureType.Language:
				return 'This feature grants you a language.';
			case FeatureType.LanguageChoice:
				return 'This feature allows you to choose a language.';
			case FeatureType.Malice:
				return 'This feature grants you a malice effect.';
			case FeatureType.Multiple:
				return 'This feature grants you a collection of features.';
			case FeatureType.Perk:
				return 'This feature allows you to choose a perk.';
			case FeatureType.Size:
				return 'This feature sets your size.';
			case FeatureType.Skill:
				return 'This feature grants you a skill.';
			case FeatureType.SkillChoice:
				return 'This feature allows you to choose a skill.';
			case FeatureType.Speed:
				return 'This feature sets your base speed.';
			case FeatureType.Text:
				return 'This feature has no special properties, just a text description.';
			case FeatureType.Title:
				return 'This feature allows you to choose a title.';
		}
	};
}
