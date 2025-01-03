import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { PowerRollType } from '../enums/power-roll-type';

export interface AbilityType {
	usage: AbilityUsage;
	free: boolean;
	trigger: string;
	time: string;
}

export interface AbilityDistance {
	type: AbilityDistanceType;
	value: number;
	value2: number;
	within: number;
	special: string;
}

export interface PowerRoll {
	type: PowerRollType;
	characteristic: Characteristic[];
	bonus: number;
	tier1: string;
	tier2: string;
	tier3: string;
}

export interface Ability extends Element {
	type: AbilityType;
	keywords: AbilityKeyword[];
	distance: AbilityDistance[];
	target: string; // Creature, Object, Enemy, Ally, Self, All
	cost: number;
	preEffect: string;
	powerRoll: PowerRoll | null,
	effect: string;
	strained: string;
	alternateEffects: string[];
	spend: { value: number, effect: string }[];
	persistence: { value: number, effect: string }[];
}
