import { AbilityKeyword } from '../enums/ability-keyword';
import { Element } from './element';
import { Feature } from './feature';
import { Imbuement } from './imbuement';
import { ItemType } from '../enums/item-type';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';
import { Project } from './project';

export interface Item extends Element {
	type: ItemType;
	keywords: (AbilityKeyword | KitArmor | KitWeapon)[];
	crafting: Project | null;
	effect: string;
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	imbuements: Imbuement[];
	count: number;

	/**
	 * @deprecated This field has been subsumed into the imbuements field.
	 */
	customizationsByLevel: {
		level: number;
		features: { feature: Feature, selected: boolean }[];
	}[],
}
