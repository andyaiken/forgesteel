import { Feature } from '../models/feature';
import { FeatureType } from '../enums/feature-type';
import { SkillList } from '../enums/skill-list';

export class FeatureLogic {
	static createFeature = (data: { id: string, name: string, description: string }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Skill,
			skill: null,
			language: null
		} as Feature;
	};

	static createSkillFeature = (data: { id: string, name: string, description: string, options?: string[], listOptions?: SkillList[] }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Skill,
			skill: {
				options: data.options || [],
				listOptions: data.listOptions || [],
				selected: []
			},
			language: null
		} as Feature;
	};

	static createLanguageFeature = (data: { id: string, name: string, description: string, options?: string[] }) => {
		return {
			id: data.id,
			name: data.name,
			description: data.description,
			type: FeatureType.Language,
			skill: null,
			language: {
				options: data.options || [],
				selected: []
			}
		} as Feature;
	};
}

// Grant an ability
