import { Feature, FeatureAbilityData, FeatureBonusData, FeatureChoiceData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureKitData, FeatureLanguageData, FeatureSizeData, FeatureSkillData } from '../models/feature';
import { Ability } from '../models/ability';
import { DamageModifier } from '../models/damage-modifier';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { HeroLogic } from './hero-logic';
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
			description = 'Immunity ' + data.modifiers.map(dm => `${dm.damageType} ${dm.value}`).join(', ');
		}
		if (data.modifiers.every(dm => dm.type === DamageModifierType.Weakness)) {
			name = 'Weakness';
			description = 'Weakness ' + data.modifiers.map(dm => `${dm.damageType} ${dm.value}`).join(', ');
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

	static createSizeFeature = (data: { id: string, name?: string, description?: string, sizeValue: number, sizeMod: string; }) => {
		return {
			id: data.id,
			name: data.name || 'Size',
			description: data.description || `Size: ${HeroLogic.getSizeString({ value: data.sizeValue, mod: data.sizeMod })}`,
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
		return {
			id: data.id,
			name: data.name || (count > 1 ? 'Skills' : 'Skill'),
			description: data.description || (count > 1 ? `Choose ${count} skills.` : 'Choose a skill.'),
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
}
