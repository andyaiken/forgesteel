import { DamageModifier, Modifier } from '@/models/damage-modifier';
import { Ability } from '@/models/ability';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { ConditionType } from '@/enums/condition-type';
import { DamageType } from '@/enums/damage-type';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { FeatureAddOnType } from '@/enums/feature-addon-type';
import { FeatureField } from '@/enums/feature-field';
import { FeatureType } from '@/enums/feature-type';
import { Fixture } from '@/models/fixture';
import { Follower } from '@/models/follower';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { Kit } from '@/models/kit';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { Monster } from '@/models/monster';
import { Perk } from '@/models/perk';
import { PerkList } from '@/enums/perk-list';
import { PowerRoll } from '@/models/power-roll';
import { Size } from '@/models/size';
import { SkillList } from '@/enums/skill-list';
import { StatBlockIcon } from '@/enums/stat-block-icon';
import { Summon } from '@/models/summon';
import { Title } from '@/models/title';

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
		customID: string;
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
	count: number | 'ancestry';
	selected: Feature[];
}
export type FeatureChoice = FeatureOf<FeatureType.Choice, FeatureChoiceData>;

export interface FeatureClassAbilityData extends _FeatureData {
	classID: string | undefined;
	cost: number | 'signature';
	allowAnySource: boolean;
	minLevel: number;
	count: number;
	selectedIDs: string[];
}
export type FeatureClassAbility = FeatureOf<FeatureType.ClassAbility, FeatureClassAbilityData>;

export interface FeatureConditionImmunityData extends _FeatureData {
	conditions: ConditionType[];
}
export type FeatureConditionImmunity = FeatureOf<FeatureType.ConditionImmunity, FeatureConditionImmunityData>;

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

export interface FeatureFixtureData extends _FeatureData {
	fixture: Fixture;
};
export type FeatureFixture = FeatureOf<FeatureType.Fixture, FeatureFixtureData>;

export interface FeatureFollowerData extends _FeatureData {
	follower: Follower;
};
export type FeatureFollower = FeatureOf<FeatureType.Follower, FeatureFollowerData>;

export interface FeatureHeroicResourceData extends _FeatureData {
	type: 'heroic' | 'epic';
	gains: { tag: string, trigger: string, value: string }[];
	details: string;
	canBeNegative: boolean;
	value: number;
};
export type FeatureHeroicResource = FeatureOf<FeatureType.HeroicResource, FeatureHeroicResourceData>;

export interface FeatureHeroicResourceGainData extends _FeatureData {
	tag: string;
	trigger: string;
	value: string;
	replacesTags: string[];
};
export type FeatureHeroicResourceGain = FeatureOf<FeatureType.HeroicResourceGain, FeatureHeroicResourceGainData>;

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
	echelon: number;
	icon?: StatBlockIcon;
};
export type FeatureMalice = FeatureOf<FeatureType.Malice, FeatureMaliceData>;

export interface FeatureMaliceAbilityData extends _FeatureData {
	ability: Ability;
	echelon: number;
};
export type FeatureMaliceAbility = FeatureOf<FeatureType.MaliceAbility, FeatureMaliceAbilityData>;

export interface FeatureMovementModeData extends _FeatureData {
	mode: string;
};
export type FeatureMovementMode = FeatureOf<FeatureType.MovementMode, FeatureMovementModeData>;

export interface FeatureMultipleData extends _FeatureData {
	features: Feature[];
};
export type FeatureMultiple = FeatureOf<FeatureType.Multiple, FeatureMultipleData>;

export interface FeaturePackageData extends _FeatureData {
	tag: string;
};
export type FeaturePackage = FeatureOf<FeatureType.Package, FeaturePackageData>;

export interface FeaturePackageContentData extends _FeatureData {
	tag: string;
};
export type FeaturePackageContent = FeatureOf<FeatureType.PackageContent, FeaturePackageContentData>;

export interface FeaturePerkData extends _FeatureData {
	lists: PerkList[];
	count: number;
	selected: Perk[];
};
export type FeaturePerk = FeatureOf<FeatureType.Perk, FeaturePerkData>;

export interface FeatureProficiencyData extends _FeatureData {
	weapons: KitWeapon[];
	armor: KitArmor[];
};
export type FeatureProficiency = FeatureOf<FeatureType.Proficiency, FeatureProficiencyData>;

export interface FeatureSizeData extends _FeatureData {
	size: Size;
};
export type FeatureSize = FeatureOf<FeatureType.Size, FeatureSizeData>;

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

export interface FeatureSummonData extends _FeatureData {
	summons: Summon[];
};
export type FeatureSummon = FeatureOf<FeatureType.Summon, FeatureSummonData>;

export interface FeatureSummonChoiceData extends _FeatureData {
	options: Summon[];
	count: number;
	selected: Summon[];
};
export type FeatureSummonChoice = FeatureOf<FeatureType.SummonChoice, FeatureSummonChoiceData>;

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
	| FeatureConditionImmunity
	| FeatureDamageModifier
	| FeatureDomain
	| FeatureDomainFeature
	| FeatureFixture
	| FeatureFollower
	| FeatureHeroicResource
	| FeatureHeroicResourceGain
	| FeatureItemChoice
	| FeatureKit
	| FeatureLanguage
	| FeatureLanguageChoice
	| FeatureMalice
	| FeatureMaliceAbility
	| FeatureMovementMode
	| FeatureMultiple
	| FeaturePackage
	| FeaturePackageContent
	| FeaturePerk
	| FeatureProficiency
	| FeatureSize
	| FeatureSkillChoice
	| FeatureSpeed
	| FeatureSummon
	| FeatureSummonChoice
	| FeatureText
	| FeatureTaggedFeature
	| FeatureTaggedFeatureChoice
	| FeatureTitleChoice;

export type FeatureData = Feature['data'];
