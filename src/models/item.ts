import { AbilityKeyword } from '../enums/ability-keyword';
import { Element } from './element';
import { Feature } from './feature';
import { ItemType } from '../enums/item-type';
import { Project } from './project';

export interface Item extends Element {
	type: ItemType;
	keywords: AbilityKeyword[];
	crafting: Project;
	effect: string;
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	count: number;
}
