import { Feature, FeatureAbilityData, FeatureBonusData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureLanguageData, FeatureSkillData } from '../models/feature';
import { Ability } from '../models/ability';
import { DamageModifier } from '../models/damage-modifier';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
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
		let desc = `${data.field} +${data.value}`;
		if (data.valuePerLevel !== 0) {
			desc += `, +${data.valuePerLevel} per level after 1st`;
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

	static createClassAbilityChoiceFeature = (data: { id: string, name?: string, description?: string, cost: number, count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name || 'Ability',
			description: data.description || (count > 1 ? `Choose ${count} abilities.` : 'Choose an ability.'),
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

	static createSkillFeature = (data: { id: string, name?: string, description?: string, skill: string }) => {
		return {
			id: data.id,
			name: data.name || 'Skill',
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
