import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Element } from './element';
import { PowerRoll } from './power-roll';

export interface AbilityType {
	usage: AbilityUsage;
	free: boolean;
	trigger: string;
	time: string;
	qualifiers: string[];
}

export interface AbilityDistance {
	type: AbilityDistanceType;
	value: number;
	value2: number;
	within: number;
	special: string;
	qualifier: string;
}

export interface Ability extends Element {
	type: AbilityType;
	keywords: AbilityKeyword[];
	distance: AbilityDistance[];
	target: string; // Creature, Object, Enemy, Ally, Self, All
	cost: number | 'signature';
	repeatable: boolean;
	minLevel: number;
	preEffect: string;
	powerRoll: PowerRoll | null,
	test: PowerRoll | null,
	effect: string;
	strained: string;
	alternateEffects: string[];
	spend: { name: string, value: number, repeatable: boolean, effect: string }[];
	persistence: { value: number, effect: string }[];
}
