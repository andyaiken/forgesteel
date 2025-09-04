import { Element } from './element';
import { Feature } from './feature';
import { ItemType } from '../enums/item-type';
import { Project } from './project';

export interface Imbuement extends Element {
	type: ItemType;
	crafting: Project | null;
	level: number;
	feature: Feature;
}
