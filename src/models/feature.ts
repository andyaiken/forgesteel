import { FeatureType } from '../enums/feature-type';
import { SkillList } from '../enums/skill-list';

export interface FeatureSkillData {
	options: string[];
	listOptions: SkillList[];
	count: number;
	selected: string[];
};

export interface FeatureLanguageData {
	options: string[];
	count: number;
	selected: string[];
};

export interface Feature {
	id: string;
	name: string;
	description: string;

	type: FeatureType;
	choice: boolean;

	data: FeatureSkillData | FeatureLanguageData | null;
}
