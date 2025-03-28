import { Element } from './element';
import { Feature } from './feature';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';

export interface KitDamageBonus {
	tier1: number;
	tier2: number;
	tier3: number;
};

export interface Kit extends Element {
	type: string;
	armor: KitArmor[];
	weapon: KitWeapon[];

	stamina: number;
	speed: number;
	stability: number;
	meleeDamage: KitDamageBonus | null;
	rangedDamage: KitDamageBonus | null;
	meleeDistance: number;
	rangedDistance: number;
	disengage: number;

	features: Feature[];
};
