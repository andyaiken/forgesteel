import type { Feature, FeatureAbility, FeatureMalice } from './feature';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { MonsterOrganization } from './monster-organization';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Size } from './size';

export interface MonsterRole {
	type: MonsterRoleType;
	organization: MonsterOrganization;
};

export interface Monster extends Element {
	level: number;
	role: MonsterRole;
	keywords: string[];
	encounterValue: number;
	size: Size;
	speed: {
		value: number;
		modes: string;
	};
	stamina: number;
	stability: number;
	freeStrikeDamage: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	withCaptain?: string;
	features: Feature[];
};

export interface MonsterGroup extends Element {
	information: Element[];
	malice: (FeatureAbility | FeatureMalice)[];
	monsters: Monster[];
};
