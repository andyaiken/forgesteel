import { Ability } from './ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { DamageModifier } from './damage-modifier';
import { Domain } from './domain';
import { Element } from './element';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Kit } from './kit';
import { KitType } from '../enums/kit';
import { Perk } from './perk';
import { PerkList } from '../enums/perk-list';
import { Size } from './size';
import { SkillList } from '../enums/skill-list';
import { Title } from './title';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface _FeatureData { }

type FeatureOf<Type extends FeatureType, Data extends _FeatureData | null = null> = Element & { type: Type, data: Data };

export interface FeatureAbilityData extends _FeatureData {
	ability: Ability;
};
export type FeatureAbility = FeatureOf<FeatureType.Ability, FeatureAbilityData>;

export interface FeatureAbilityCostData extends _FeatureData {
	keywords: AbilityKeyword[];
	modifier: number;
};
export type FeatureAbilityCost = FeatureOf<FeatureType.AbilityCost, FeatureAbilityCostData>

export interface FeatureBonusData extends _FeatureData {
	field: FeatureField;
	value: number;
	valuePerLevel: number;
	valuePerEchelon: number;
};
export type FeatureBonus = FeatureOf<FeatureType.Bonus, FeatureBonusData>;

export interface FeatureChoiceData extends _FeatureData {
	options: { feature: Feature, value: number }[];
	count: number;
	selected: Feature[];
}
export type FeatureChoice = FeatureOf<FeatureType.Choice, FeatureChoiceData>;

export interface FeatureClassAbilityData extends _FeatureData {
	cost: number;
	count: number;
	selectedIDs: string[];
}
export type FeatureClassAbility = FeatureOf<FeatureType.ClassAbility, FeatureClassAbilityData>;

export interface FeatureDamageModifierData extends _FeatureData {
	modifiers: DamageModifier[];
}
export type FeatureDamageModifier = FeatureOf<FeatureType.DamageModifier, FeatureDamageModifierData>;

export interface FeatureDomainData extends _FeatureData {
	count: number;
	selected: Domain[];
};
export type FeatureDomain = FeatureOf<FeatureType.Domain, FeatureDomainData>;

export interface FeatureDomainFeatureData extends _FeatureData {
	level: number;
	count: number;
	selected: Feature[];
};
export type FeatureDomainFeature = FeatureOf<FeatureType.DomainFeature, FeatureDomainFeatureData>;

export interface FeatureKitData extends _FeatureData {
	types: KitType[];
	count: number;
	selected: Kit[];
};
export type FeatureKit = FeatureOf<FeatureType.Kit, FeatureKitData>;

export interface FeatureKitTypeData extends _FeatureData {
	types: KitType[];
};
export type FeatureKitType = FeatureOf<FeatureType.KitType, FeatureKitTypeData>;

export interface FeatureLanguageData extends _FeatureData {
	language: string;
};
export type FeatureLanguage = FeatureOf<FeatureType.Language, FeatureLanguageData>;

export interface FeatureLanguageChoiceData extends _FeatureData {
	options: string[];
	count: number;
	selected: string[];
};
export type FeatureLanguageChoice = FeatureOf<FeatureType.LanguageChoice, FeatureLanguageChoiceData>;

export interface FeatureMultipleData extends _FeatureData {
	features: Feature[];
};
export type FeatureMultiple = FeatureOf<FeatureType.Multiple, FeatureMultipleData>;

export interface FeaturePerkData extends _FeatureData {
	lists: PerkList[];
	count: number;
	selected: Perk[];
};
export type FeaturePerk = FeatureOf<FeatureType.Perk, FeaturePerkData | null>;

export interface FeatureSizeData extends _FeatureData {
	size: Size;
};
export type FeatureSize = FeatureOf<FeatureType.Size, FeatureSizeData>;

export interface FeatureSkillData extends _FeatureData {
	skill: string;
};
export type FeatureSkill = FeatureOf<FeatureType.Skill, FeatureSkillData>;

export interface FeatureSkillChoiceData extends _FeatureData {
	options: string[];
	listOptions: SkillList[];
	count: number;
	selected: string[];
};
export type FeatureSkillChoice = FeatureOf<FeatureType.SkillChoice, FeatureSkillChoiceData>;

export interface FeatureSpeedData extends _FeatureData {
	speed: number;
};
export type FeatureSpeed = FeatureOf<FeatureType.Speed, FeatureSpeedData>;

export type FeatureText = FeatureOf<FeatureType.Text>;

export interface FeatureTitleData extends _FeatureData {
	count: number;
	selected: Title[];
};
export type FeatureTitle = FeatureOf<FeatureType.Title, FeatureTitleData>;

export type Feature =
	| FeatureAbility
	| FeatureAbilityCost
	| FeatureBonus
	| FeatureChoice
	| FeatureClassAbility
	| FeatureDamageModifier
	| FeatureDomain
	| FeatureDomainFeature
	| FeatureKit
	| FeatureKitType
	| FeatureLanguage
	| FeatureLanguageChoice
	| FeatureMultiple
	| FeaturePerk
	| FeatureSize
	| FeatureSkill
	| FeatureSkillChoice
	| FeatureSpeed
	| FeatureText
	| FeatureTitle;

export type FeatureData = Feature['data'];
