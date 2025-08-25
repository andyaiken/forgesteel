import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { Feature } from './feature';
import { MonsterRole } from './monster-roll';
import { MonsterState } from './monster-state';
import { Size } from './size';
import { Speed } from './speed';

export interface Monster extends Element {
	picture: string | null;
	level: number;
	role: MonsterRole;
	keywords: string[];
	encounterValue: number;
	size: Size;
	speed: Speed;
	stamina: number;
	stability: number;
	freeStrikeDamage: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	withCaptain: string;
	features: Feature[];
	retainer: {
		level: number;
		level4?: Feature;
		level7?: Feature;
		level10?: Feature;
		featuresByLevel: {
			level: number,
			feature: Feature;
		}[];
	} | null;
	state: MonsterState;
};
