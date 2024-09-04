import { KitArmor, KitImplement, KitWeapon } from '../enums/kit';
import { Ability } from './ability';
import { Feature } from './feature';

export interface Kit {
	id: string;
	name: string;
	description: string;

	armor: KitArmor[];
	weapon: KitWeapon[];
	implement: KitImplement[];

	stamina: number;
	speed: number;
	stability: number;

	meleeDamage: {
		tier1: number;
		tier2: number;
		tier3: number;
	} | null;
	rangedDamage: {
		tier1: number;
		tier2: number;
		tier3: number;
	} | null;
	magicalDamage: {
		tier1: number;
		tier2: number;
		tier3: number;
	} | null;

	distance: number;
	reach: number;
	area: number;

	mobility: boolean;
	signatureAbility: Ability;
	ward: Feature | null;
}
