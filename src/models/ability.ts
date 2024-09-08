import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';

export interface Effect {
	text: string;
}

export interface Ability {
	id: string;
	name: string;
	description: string;

	keywords: AbilityKeyword[];
	type: {
		usage: AbilityUsage;
		free: boolean;
		trigger: string;
		time: string;
	}
	distance: string; // Reach X, Ranged X, Reach X or Ranged X, [Aura X / Burst X / Cube X, XxX Line, Wall X, Special] [within X], Self
	target: string; // Creature, Object, Enemy, Ally, Self, All
	cost: number;

	powerRoll: {
		characteristic: Characteristic[];
		tier1: Effect[];
		tier2: Effect[];
		tier3: Effect[];
		additional: Effect[];
	} | null
}
