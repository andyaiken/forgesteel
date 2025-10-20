import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { Condition } from '@/models/condition';
import { ConditionType } from '@/enums/condition-type';
import { Culture } from '@/models/culture';
import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { Hero } from '@/models/hero';
import { Item } from '@/models/item';
import { Perk } from '@/models/perk';
import { Title } from '@/models/title';

// #region Character
export interface HeroSheet {
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

	stamina: StaminaSheet;
	recoveries: RecoveriesSheet;

	heroicResourceName?: string;
	heroicResourceCurrent?: number;
	heroicResourceGains?: {
		tag: string;
		trigger: string;
		value: string;
	}[];

	surgeDamageAmount?: string;
	surgesCurrent?: number;

	// Modifiers (Kits, Prayers, Wards, etc)
	modifierTypes: string[];
	modifierName?: string;
	modifierWeaponImplement?: string;
	modifierArmorWard?: string;

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
	immunities: { damageType: string, value: number }[];
	weaknesses: { damageType: string, value: number }[];
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
	career?: CareerSheet;

	// Complication
	complication?: ComplicationSheet;

	// Skills
	allSkills?: Map<string, string[]>;
	skills?: string[];

	// Culture
	culture?: Culture;

	languages?: string[];

	// Perks & Titles
	perks?: Perk[];
	titles?: Title[];

	// Ancestry & Perks combined
	ancestryTraitsPerksCombined?: Feature[];

	// Projects
	projects?: ProjectSheet[];

	// Abilities
	abilities: AbilitySheet[];
	standardAbilities: AbilitySheet[];

	// Followers
	followers: FollowerSheet[];

	// Other Features and Reference
	featuresReferenceOther: {
		feature: Feature,
		source: string
	}[];

	extraReferenceItems: {
		title: string,
		content: string
	}[];

	notes: string;
}
// #endregion

// #region Sub-sheets
export interface StaminaSheet {
	max?: number;
	current?: number;
	temp?: number;
	windedAt?: number;
	deadAt?: number;
}

export interface RecoveriesSheet {
	max?: number;
	value?: number;
	current?: number;
}

export interface CareerSheet {
	id: string;
	name: string;
	benefits: Feature[];
	incitingIncident?: Element;
}

export interface ComplicationSheet {
	id: string;
	name: string;
	description: string;
	benefits: Feature[];
	drawbacks: Feature[];
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
	effect: string;
	features?: Feature[];
}
// #endregion

// #region Follower
export interface FollowerSheet {
	id: string;
	name: string;
	classification: string;
	type: string;
	role: string;

	might: number;
	agility: number;
	reason: number;
	intuition: number;
	presence: number;

	skills?: string[];
	languages?: string[];

	keywords?: string;

	size?: string;
	speed?: number;
	stability?: number;
	freeStrike?: number;

	immunity?: string;
	weakness?: string;
	movement?: string;

	stamina?: StaminaSheet;
	recoveries?: RecoveriesSheet;

	features?: Feature[];
	abilities?: AbilitySheet[];

	advancement?: {
		level: number,
		ability: AbilitySheet
	}[];
};
