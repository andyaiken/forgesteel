import { Ability } from './ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { DamageModifier } from './damage-modifier';
import { Domain } from './domain';
import { Element } from './element';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Kit } from './kit';
import { KitType } from '../enums/kit';
import { Size } from './size';
import { SkillList } from '../enums/skill-list';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FeatureData { }

export interface FeatureAbilityData extends FeatureData {
	ability: Ability;
};

export interface FeatureAbilityCostData extends FeatureData {
	keywords: AbilityKeyword[];
	modifier: number;
};

export interface FeatureBonusData extends FeatureData {
	field: FeatureField;
	value: number;
	valuePerLevel: number;
};

export interface FeatureChoiceData extends FeatureData {
	options: { feature: Feature, value: number }[];
	count: number;
	selected: Feature[];
}

export interface FeatureClassAbilityData extends FeatureData {
	cost: number;
	count: number;
	selectedIDs: string[];
}

export interface FeatureDamageModifierData extends FeatureData {
	modifiers: DamageModifier[];
}

export interface FeatureDomainData extends FeatureData {
	count: number;
	selected: Domain[];
};

export interface FeatureDomainFeatureData extends FeatureData {
	level: number;
	count: number;
	selected: Feature[];
};

export interface FeatureKitData extends FeatureData {
	types: KitType[];
	count: number;
	selected: Kit[];
};

export interface FeatureKitTypeData extends FeatureData {
	types: KitType[];
};

export interface FeatureLanguageData extends FeatureData {
	language: string;
};

export interface FeatureLanguageChoiceData extends FeatureData {
	options: string[];
	count: number;
	selected: string[];
};

export interface FeatureMultipleData extends FeatureData {
	features: Feature[];
};

export interface FeatureSizeData extends FeatureData {
	size: Size;
};

export interface FeatureSkillData extends FeatureData {
	skill: string;
};

export interface FeatureSkillChoiceData extends FeatureData {
	options: string[];
	listOptions: SkillList[];
	count: number;
	selected: string[];
};

export interface Feature extends Element {
	type: FeatureType;
	data: FeatureData | null;
}
