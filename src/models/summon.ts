import { Element } from '@/models/element';
import { Feature } from './feature';
import { Monster } from '@/models/monster';

export interface SummoningInfo {
	isSignature: boolean;
	cost: number;
	count: number;
	level10: Feature[];
};

export interface Summon extends Element {
	monster: Monster;
	info: SummoningInfo;
};
