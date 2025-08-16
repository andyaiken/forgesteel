import { Feature, FeatureAbility, FeatureAddOn, FeatureMalice } from './feature';
import { Characteristic } from '../enums/characteristic';
import { Condition } from './condition';
import { Element } from './element';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Size } from './size';
import { Speed } from './speed';

export interface MonsterRole {
	type: MonsterRoleType;
	organization: MonsterOrganizationType;
};

export interface MonsterState {
	staminaDamage: number;
	staminaTemp: number;
	recoveriesUsed: number;
	conditions: Condition[];
	reactionUsed: boolean;
	hidden: boolean;
	defeated: boolean;
	captainID: string | undefined;
};

export interface Monster extends Element {
	picture: string | null;
	level: number;
	echelon: number;
	role: MonsterRole;
	keywords: string[];
	encounterValue: number;
	size: Size;
	speed: Speed;
	stamina: number;
	stability: number;
	freeStrikeDamage: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	withCaptain: string;
	features: Feature[];
	retainer: {
		level: number;
		level4?: Feature;
		level7?: Feature;
		level10?: Feature;
		featuresByLevel: {
			level: number,
			feature: Feature;
		}[];
	} | null;
	state: MonsterState;
};

export interface MonsterGroup extends Element {
	picture: string | null;
	information: Element[];
	echelonInfo?: MonsterGroupEchelon[];
	malice: (FeatureMalice | FeatureAbility)[];
	monsters: Monster[];
	addOns: FeatureAddOn[];
};

export interface MonsterGroupEchelon extends Element {
	echelon: number;
	subInfo?: Element[];
}
