import { Feature, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureKitData, FeatureLanguageData, FeatureMultipleData, FeatureSizeData, FeatureSkillData, FeatureSubclassData } from '../models/feature';
import { Ability } from '../models/ability';
import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { DamageModifier } from '../models/damage-modifier';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { FormatLogic } from './format-logic';
import { HeroClass } from '../models/class';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit';
import { SkillList } from '../enums/skill-list';

export class FeatureLogic {
	static createFeature = (data: { id: string, name: string, description: string }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Text,
			choice: false,
			data: null
		} as Feature;
	};

	static createAbilityFeature = (data: { ability: Ability }) => {
		return {
			id: data.ability.id,
			name: data.ability.name,
			description: data.ability.description,
			type: FeatureType.Ability,
			choice: false,
			data: {
				ability: data.ability
			} as FeatureAbilityData
		} as Feature;
	};

	static createBonusFeature = (data: { id: string, name?: string, description?: string, field: FeatureField, value: number, valuePerLevel?: number }) => {
		let desc = `${data.field} ${data.value >= 0 ? '+' : ''}${data.value}`;
		if (data.valuePerLevel) {
			desc += `, ${data.valuePerLevel >= 0 ? '+' : ''}${data.valuePerLevel} per level after 1st`;
		}

		return {
			id: data.id,
			name: data.name || data.field.toString(),
			description: data.description || desc,
			type: FeatureType.Bonus,
			choice: false,
			data: {
				field: data.field,
				value: data.value,
				valuePerLevel: data.value || 0
			} as FeatureBonusData
		} as Feature;
	};

	static createChoiceFeature = (data: { id: string, name?: string, description?: string, options: { feature: Feature, value: number }[], count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || 'Choice',
			description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
			type: FeatureType.Choice,
			choice: true,
			data: {
				options: data.options,
				count: count,
				selected: []
			} as FeatureChoiceData
		} as Feature;
	};

	static createClassAbilityChoiceFeature = (data: { id: string, name?: string, description?: string, cost: number, count?: number }) => {
		const count = data.count || 1;
		const type = data.cost === 0 ? 'signature' : `${data.cost}-point`;
		return {
			id: data.id,
			name: data.name || 'Ability',
			description: data.description || (count > 1 ? `Choose ${count} ${type} class abilities.` : `Choose a ${type} class ability.`),
			type: FeatureType.ClassAbility,
			choice: true,
			data: {
				cost: data.cost,
				count: count,
				selectedIDs: []
			} as FeatureClassAbilityData
		} as Feature;
	};

	static createDamageModifierFeature = (data: { id: string, name?: string, description?: string, modifiers: DamageModifier[] }) => {
		let name = 'Damage Modifier';
		let description = 'Damage Modifier';
		if (data.modifiers.every(dm => dm.type === DamageModifierType.Immunity)) {
			name = 'Immunity';
			description = data.modifiers.map(dm => `${dm.damageType} ${dm.value}`).join(', ');
		}
		if (data.modifiers.every(dm => dm.type === DamageModifierType.Weakness)) {
			name = 'Weakness';
			description = data.modifiers.map(dm => `${dm.damageType} ${dm.value}`).join(', ');
		}

		return {
			id: data.id,
			name: data.name || name,
			description: data.description || description,
			type: FeatureType.DamageModifier,
			choice: false,
			data: {
				modifiers: data.modifiers
			} as FeatureDamageModifierData
		} as Feature;
	};

	static createKitChoiceFeature = (data: { id: string, name?: string, description?: string, types?: KitType[], count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || 'Kit',
			description: data.description || (count > 1 ? `Choose ${count} kits.` : 'Choose a kit.'),
			type: FeatureType.Kit,
			choice: true,
			data: {
				types: data.types || [],
				count: count,
				selected: []
			} as FeatureKitData
		} as Feature;
	};

	static createLanguageChoiceFeature = (data: { id: string, name?: string, description?: string, options?: string[], count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || 'Language',
			description: data.description || (count > 1 ? `Choose ${count} languages.` : 'Choose a language.'),
			type: FeatureType.Language,
			choice: true,
			data: {
				options: data.options || [],
				count: count,
				selected: []
			} as FeatureLanguageData
		} as Feature;
	};

	static createMultipleFeature = (data: { id: string, name?: string, description?: string, features: Feature[] }) => {
		return {
			id: data.id,
			name: data.name || 'Multiple Features',
			description: data.description || data.features.map(f => f.name).join(', '),
			type: FeatureType.Multiple,
			choice: false,
			data: {
				features: data.features
			} as FeatureMultipleData
		} as Feature;
	};

	static createSizeFeature = (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: string; }) => {
		return {
			id: data.id,
			name: data.name || 'Size',
			description: data.description || `Size: ${FormatLogic.getSize({ value: data.sizeValue, mod: data.sizeMod })}`,
			type: FeatureType.Size,
			choice: false,
			data: {
				size: {
					value: data.sizeValue,
					mod: data.sizeMod
				}
			} as FeatureSizeData
		} as Feature;
	};

	static createSkillFeature = (data: { id: string, name?: string, description?: string, skill: string }) => {
		return {
			id: data.id,
			name: data.name || data.skill,
			description: data.description || `You gain the ${data.skill} skill.`,
			type: FeatureType.Skill,
			choice: false,
			data: {
				options: [],
				listOptions: [],
				count: 1,
				selected: [ data.skill ]
			} as FeatureSkillData
		} as Feature;
	};

	static createSkillChoiceFeature = (data: { id: string, name?: string, description?: string, options?: string[], listOptions?: SkillList[], count?: number }) => {
		const count = data.count || 1;
		const names = (data.options || []).concat((data.listOptions || []).map(l => `the ${l} list`)).join(', ');
		return {
			id: data.id,
			name: data.name || (count > 1 ? 'Skills' : 'Skill'),
			description: data.description || (count > 1 ? `Choose ${count} skills from ${names}.` : `Choose a skill from ${names}.`),
			type: FeatureType.Skill,
			choice: true,
			data: {
				options: data.options || [],
				listOptions: data.listOptions || [],
				count: count,
				selected: []
			} as FeatureSkillData
		} as Feature;
	};

	static createSubclassFeature = (data: { id: string, name?: string, description?: string, category: string, count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || 'Subclass Feature Choice',
			description: data.description || (count > 1 ? `Choose ${count} options.` : 'Choose an option.'),
			type: FeatureType.SubclassFeature,
			choice: true,
			data: {
				category: data.category,
				count: count,
				selected: []
			} as FeatureSubclassData
		} as Feature;
	};

	///////////////////////////////////////////////////////////////////////////

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
		features.push(career.title);

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

	static getFeaturesFromKit = (kit: Kit) => {
		const features: Feature[] = [];

		features.push(...kit.features);

		return FeatureLogic.simplifyFeatures(features);
	};

	static getFeaturesFromComplication = (complication: Complication) => {
		const features: Feature[] = [];

		features.push(...complication.features);

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
			.filter(f => f.type === FeatureType.SubclassFeature)
			.forEach(f => {
				const data = f.data as FeatureSubclassData;
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
}
