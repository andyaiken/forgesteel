import { Feature, FeatureHeroicResource } from './feature';
import { Condition } from './condition';
import { ConditionType } from '../enums/condition-type';
import { Culture } from './culture';
import { Element } from './element';
import { Hero } from './hero';
import { Item } from './item';
import { Perk } from './perk';
import { Title } from './title';

export interface CharacterSheet {
	hero: Hero,
	name?: string;
	ancestryName?: string;
	className?: string;
	subclassTypeName?: string;
	subclassName?: string;
	level?: number;

	currentVictories?: number;
	wealth?: number;
	renown?: number;
	xp?: number;

	inventory?: ItemSheet[];

	might?: number;
	agility?: number;
	reason?: number;
	intuition?: number;
	presence?: number;

	size?: string;
	speed?: string;
	disengage?: number;
	stability?: number;

	staminaMax?: number;
	staminaCurrent?: number;
	staminaTemp?: number;
	windedAt?: number;
	deadAt?: number;

	recoveriesMax?: number;
	recoveryValue?: number;
	recoveriesCurrent?: number;

	heroicResourceName?: string;
	heroicResourceCurrent?: number;
	heroicResourceFeature?: FeatureHeroicResource;

	surgeDamageAmount?: string;
	surgesCurrent?: number;

	// Modifiers (Kits, Prayers, Wards, etc)
	modifierTypes?: string[];
	modifierName?: string;
	modifierWeaponImplement?: string;
	modifierArmor?: string;

	modifierSpeed?: number;
	modifierMeleeDistance?: number;
	modifierRangedDistance?: number;
	modifierDisengage?: number;
	modifierStability?: number;
	modifierStamina?: number;

	modifierMeleeDamageT1?: number;
	modifierMeleeDamageT2?: number;
	modifierMeleeDamageT3?: number;

	modifierRangedDamageT1?: number;
	modifierRangedDamageT2?: number;
	modifierRangedDamageT3?: number;

	modifierBenefits?: Feature[];

	// Immunities and Weaknesses
	immunities?: { damageType: string, value: number }[];
	weaknesses?: { damageType: string, value: number }[];
	conditionImmunities?: ConditionType[];

	// Potencies
	potencyStrong?: number;
	potencyAverage?: number;
	potencyWeak?: number;

	// Conditions
	conditions?: Condition[];
	condition1Name?: string;
	condition2Name?: string;
	saveEndsTarget?: number;

	// Class Features
	classFeatures?: Feature[];

	// Ancestry Traits
	ancestryTraits?: Feature[];

	// Career
	careerName?: string;
	careerBenefits?: Feature[];
	careerInsightingIncident?: Element;

	// Complication
	complicationName?: string;
	complicationBenefits?: Feature[];
	complicationDrawbacks?: Feature[];

	// Skills
	allSkills?: Map<string, string[]>;
	skills?: string[];

	// Culture
	culture?: Culture;
	cultureFeatures?: Feature[];

	languages?: string[];

	// Perks & titles
	perks?: Perk[];
	titles?: Title[];

	// Projects
	projects?: ProjectSheet[];

	// Abilities
	freeStrikes: AbilitySheet[];
	signatureAbilities: AbilitySheet[];
	heroicAbilities: AbilitySheet[];
	triggeredActions: AbilitySheet[];
	otherRollAbilities: AbilitySheet[];
	otherAbilities: AbilitySheet[];

	// Other Features and Reference
	featuresReferenceOther?: Feature[];
}

export interface ProjectSheet {
	id: string;
	name?: string;
	// assignee?: string;
	characteristic?: string;
	pointsGoal?: number;
	pointsCurrent?: number;
}

export interface ItemSheet {
	id: string;
	item: Item;
	features?: Feature[];
}

export interface AbilitySheet {
	id: string;
	name: string;
	cost: number;
	isSignature: boolean;
	abilityType?: string;
	actionType?: string;
	keywords?: string;
	distance?: string;
	target?: string;
	trigger?: string;
	effect?: string;

	hasPowerRoll: boolean;
	rollPower?: string;
	rollT1Effect?: string;
	rollT2Effect?: string;
	rollT3Effect?: string;
}
