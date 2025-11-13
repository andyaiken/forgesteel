import { Characteristic } from '@/enums/characteristic';
import { DamageType } from '@/enums/damage-type';
import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { MonsterRole } from '@/models/monster-role';
import { MonsterState } from '@/models/monster-state';
import { RetainerInfo } from '@/models/retainer';
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
	retainer: RetainerInfo | null;
	state: MonsterState;
};
