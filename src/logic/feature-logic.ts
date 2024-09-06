import { Feature } from '../models/feature';
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

	static createSkillFeature = (data: { id: string, name: string, description: string, skill: string }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Skill,
			choice: false,
			data: {
				options: [],
				listOptions: [],
				count: 1,
				selected: [ data.skill ]
			}
		} as Feature;
	};

	static createSkillChoiceFeature = (data: { id: string, name: string, description: string, options?: string[], listOptions?: SkillList[], count?: number }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Skill,
			choice: true,
			data: {
				options: data.options || [],
				listOptions: data.listOptions || [],
				count: data.count || 1,
				selected: []
			}
		} as Feature;
	};

	static createLanguageChoiceFeature = (data: { id: string, name: string, description: string, options?: string[], count?: number }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Language,
			choice: true,
			data: {
				options: data.options || [],
				count: data.count || 1,
				selected: []
			}
		} as Feature;
	};
}
