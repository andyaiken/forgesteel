import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { Monster } from '@/models/monster';

export interface SummoningInfo {
	isSignature: boolean;
	cost: number;
	count: number;
	level: number;
	level3: Feature[];
	level6: Feature[];
	level10: Feature[];
};

export interface Summon extends Element {
	monster: Monster;
	info: SummoningInfo;
	// Set when an extension added this summon to a summon choice, so that a hero's selection of it goes when the extension does
	extensionID?: string;
};
