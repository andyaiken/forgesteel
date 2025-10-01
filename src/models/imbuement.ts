import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { ItemType } from '@/enums/item-type';
import { Project } from '@/models/project';

export interface Imbuement extends Element {
	type: ItemType;
	crafting: Project | null;
	level: number;
	feature: Feature;
}
