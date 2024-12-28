import { KitArmor, KitType, KitWeapon } from '../enums/kit';
import { Element } from './element';
import { Feature } from './feature';

export interface KitDamageBonus {
	tier1: number;
	tier2: number;
	tier3: number;
};

export interface Kit extends Element {
	type: KitType;
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
