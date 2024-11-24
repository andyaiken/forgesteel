import { Element } from './element';
import { Feature } from './feature';

export interface Item extends Element {
	features: Feature[];
	count: number;
}
