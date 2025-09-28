import { Element } from './element';
import { Monster } from './monster';

export interface SummoningInfo {
	isSignature: boolean;
	cost: number;
	count: number;
};

export interface Summon extends Element {
	monster: Monster;
	info: SummoningInfo;
};
