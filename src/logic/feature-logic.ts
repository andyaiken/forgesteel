import { Feature, FeatureAbilityData, FeatureClassAbilityData, FeatureLanguageData, FeatureSkillData } from '../models/feature';
import { Ability } from '../models/ability';
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

	static createClassAbilityChoiceFeature = (data: { id: string, name: string, description?: string, cost: number, count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name,
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

	static createLanguageChoiceFeature = (data: { id: string, name: string, description?: string, options?: string[], count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name,
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

	static createSkillFeature = (data: { id: string, name: string, description?: string, skill: string }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description || `You gain the ${data.skill} skill`,
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

	static createSkillChoiceFeature = (data: { id: string, name: string, description?: string, options?: string[], listOptions?: SkillList[], count?: number }) => {
		const count = data.count || 1;
		return {
			id: data.id,
			name: data.name,
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
