import { Feature, FeatureAbility, FeatureMalice } from './feature';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Size } from './size';

export interface MonsterRole {
	type: MonsterRoleType;
	organization: MonsterOrganizationType;
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
	features: Feature[];
};

export interface MonsterGroup extends Element {
	information: Element[];
	malice: (FeatureMalice | FeatureAbility)[];
	monsters: Monster[];
};
