import { Element } from '@/models/element';
import { Monster } from '@/models/monster';

export interface SummoningInfo {
	isSignature: boolean;
	cost: number;
	count: number;
};

export interface Summon extends Element {
	monster: Monster;
	info: SummoningInfo;
};
