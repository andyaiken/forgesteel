import { FeatureType } from '../enums/feature-type';
import { SkillList } from '../enums/skill-list';

export interface Feature {
	id: string;
	name: string;
	description: string;

	type: FeatureType;

	skill: {
		options: string[];
		listOptions: SkillList[];
		selected: string[];
	} | null;

	language: {
		options: string[];
		selected: string[];
	} | null;
}

