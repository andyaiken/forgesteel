import { Characteristic } from '@/enums/characteristic';
import { DamageType } from '@/enums/damage-type';
import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { MonsterRole } from '@/models/monster-roll';
import { MonsterState } from '@/models/monster-state';
import { Size } from '@/models/size';
import { Speed } from '@/models/speed';

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
	freeStrikeType: DamageType;
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
