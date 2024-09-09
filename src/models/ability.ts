import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';

export interface AbilityType {
		usage: AbilityUsage;
		free: boolean;
		trigger: string;
		time: string;
}

export interface PowerRoll {
		characteristic: Characteristic[];
		tier1: string;
		tier2: string;
		tier3: string;
}

export interface Ability {
	id: string;
	name: string;
	description: string;

	type: AbilityType;
	keywords: AbilityKeyword[];
	distance: string; // Reach X, Ranged X, Reach X or Ranged X, [Aura X / Burst X / Cube X, XxX Line, Wall X, Special] [within X], Self
	target: string; // Creature, Object, Enemy, Ally, Self, All
	cost: number;
	powerRoll: PowerRoll | null,
	effect: string;
	spend: { value: number, effect: string }[];
}
