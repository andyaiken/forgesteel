import { DamageModifier, Modifier } from './damage-modifier';
import { Ability } from './ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Ancestry } from './ancestry';
import { Characteristic } from '../enums/characteristic';
import { DamageType } from '../enums/damage-type';
import { Domain } from './domain';
import { Element } from './element';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Item } from './item';
import { ItemType } from '../enums/item-type';
import { Kit } from './kit';
import { Monster } from './monster';
import { Perk } from './perk';
import { PerkList } from '../enums/perk-list';
import { PowerRoll } from './power-roll';
import { Size } from './size';
import { SkillList } from '../enums/skill-list';
import { Title } from './title';

export enum FeatureAddOnType {
	Mobility = 'Mobility',
	Defensive = 'Defensive',
	Offensive = 'Offensive',
	Supernatural = 'Supernatural'
};

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
export type FeatureAbilityCost = FeatureOf<FeatureType.AbilityCost, FeatureAbilityCostData>;

export interface FeatureAbilityDamageData extends _FeatureData, Modifier {
	keywords: AbilityKeyword[];
	damageType: DamageType;
};
export type FeatureAbilityDamage = FeatureOf<FeatureType.AbilityDamage, FeatureAbilityDamageData>;

export interface FeatureAbilityDistanceData extends _FeatureData, Modifier {
	keywords: AbilityKeyword[];
};
export type FeatureAbilityDistance = FeatureOf<FeatureType.AbilityDistance, FeatureAbilityDistanceData>;

export interface FeatureAddOnData extends _FeatureData {
	category: FeatureAddOnType;
	cost: number;
};
export type FeatureAddOn = FeatureOf<FeatureType.AddOn, FeatureAddOnData>;

export interface FeatureAncestryChoiceData extends _FeatureData {
	selected: Ancestry | null;
};
export type FeatureAncestryChoice = FeatureOf<FeatureType.AncestryChoice, FeatureAncestryChoiceData>;

export interface FeatureAncestryFeatureChoiceData extends _FeatureData {
	source: {
		current: boolean;
		former: boolean;
	};
	value: number;
	selected: Feature | null;
};
export type FeatureAncestryFeatureChoice = FeatureOf<FeatureType.AncestryFeatureChoice, FeatureAncestryFeatureChoiceData>;

export interface FeatureBonusData extends _FeatureData, Modifier {
	field: FeatureField;
};
export type FeatureBonus = FeatureOf<FeatureType.Bonus, FeatureBonusData>;

export interface FeatureCharacteristicBonusData extends _FeatureData {
	characteristic: Characteristic;
	value: number;
};
export type FeatureCharacteristicBonus = FeatureOf<FeatureType.CharacteristicBonus, FeatureCharacteristicBonusData>;

export interface FeatureChoiceData extends _FeatureData {
	options: { feature: Feature, value: number }[];
	count: number;
	selected: Feature[];
}
export type FeatureChoice = FeatureOf<FeatureType.Choice, FeatureChoiceData>;

export interface FeatureClassAbilityData extends _FeatureData {
	classID: string | undefined;
	cost: number | 'signature';
	minLevel: number;
	count: number;
	selectedIDs: string[];
}
export type FeatureClassAbility = FeatureOf<FeatureType.ClassAbility, FeatureClassAbilityData>;

export interface FeatureCompanionData extends _FeatureData {
	type: 'companion' | 'mount' | 'retainer';
	selected: Monster | null;
}
export type FeatureCompanion = FeatureOf<FeatureType.Companion, FeatureCompanionData>;

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

export interface FeatureItemChoiceData extends _FeatureData {
	types: ItemType[];
	count: number;
	selected: Item[];
};
export type FeatureItemChoice = FeatureOf<FeatureType.ItemChoice, FeatureItemChoiceData>;

export interface FeatureKitData extends _FeatureData {
	types: string[];
	count: number;
	selected: Kit[];
};
export type FeatureKit = FeatureOf<FeatureType.Kit, FeatureKitData>;

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

export interface FeatureMaliceData extends _FeatureData {
	cost: number;
	repeatable?: boolean;
	sections: (string | PowerRoll)[];
};
export type FeatureMalice = FeatureOf<FeatureType.Malice, FeatureMaliceData>;

export interface FeatureMultipleData extends _FeatureData {
	features: Feature[];
};
export type FeatureMultiple = FeatureOf<FeatureType.Multiple, FeatureMultipleData>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FeaturePackageData extends _FeatureData { };
export type FeaturePackage = FeatureOf<FeatureType.Package, FeaturePackageData>;

export interface FeaturePerkData extends _FeatureData {
	lists: PerkList[];
	count: number;
	selected: Perk[];
};
export type FeaturePerk = FeatureOf<FeatureType.Perk, FeaturePerkData>;

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

export interface FeatureTaggedFeatureData extends _FeatureData {
	tag: string;
	feature: Feature;
};
export type FeatureTaggedFeature = FeatureOf<FeatureType.TaggedFeature, FeatureTaggedFeatureData>;

export interface FeatureTaggedFeatureChoiceData extends _FeatureData {
	tag: string;
	count: number;
	selected: Feature[];
};
export type FeatureTaggedFeatureChoice = FeatureOf<FeatureType.TaggedFeatureChoice, FeatureTaggedFeatureChoiceData>;

export type FeatureText = FeatureOf<FeatureType.Text>;

export interface FeatureTitleChoiceData extends _FeatureData {
	echelon: number;
	count: number;
	selected: Title[];
};
export type FeatureTitleChoice = FeatureOf<FeatureType.TitleChoice, FeatureTitleChoiceData>;

export type Feature =
	| FeatureAbility
	| FeatureAbilityCost
	| FeatureAbilityDamage
	| FeatureAbilityDistance
	| FeatureAddOn
	| FeatureAncestryChoice
	| FeatureAncestryFeatureChoice
	| FeatureBonus
	| FeatureCharacteristicBonus
	| FeatureChoice
	| FeatureClassAbility
	| FeatureCompanion
	| FeatureDamageModifier
	| FeatureDomain
	| FeatureDomainFeature
	| FeatureItemChoice
	| FeatureKit
	| FeatureLanguage
	| FeatureLanguageChoice
	| FeatureMalice
	| FeatureMultiple
	| FeaturePackage
	| FeaturePerk
	| FeatureSize
	| FeatureSkill
	| FeatureSkillChoice
	| FeatureSpeed
	| FeatureText
	| FeatureTaggedFeature
	| FeatureTaggedFeatureChoice
	| FeatureTitleChoice;

export type FeatureData = Feature['data'];
