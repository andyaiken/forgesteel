import { KitArmor, KitImplement, KitType, KitWeapon } from '../enums/kit';
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
	implement: KitImplement[];

	stamina: number;
	speed: number;
	stability: number;

	meleeDamage: KitDamageBonus | null;
	rangedDamage: KitDamageBonus | null;
	magicalDamage: KitDamageBonus | null;

	distance: number;
	reach: number;
	area: number;

	mobility: boolean;
	features: Feature[];
};
