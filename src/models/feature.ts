import { Ability } from './ability';
import { FeatureType } from '../enums/feature-type';
import { SkillList } from '../enums/skill-list';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FeatureData { }

export interface FeatureAbilityData extends FeatureData {
	ability: Ability;
};

export interface FeatureLanguageData extends FeatureData {
	options: string[];
	count: number;
	selected: string[];
};

export interface FeatureSkillData extends FeatureData {
	options: string[];
	listOptions: SkillList[];
	count: number;
	selected: string[];
};

// TODO: Add other feature types
// Recoveries

export interface Feature {
	id: string;
	name: string;
	description: string;

	type: FeatureType;
	choice: boolean;

	data: FeatureData | null;
}
