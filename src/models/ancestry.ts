import { Element } from './element';
import { Feature } from './feature';

export interface Ancestry extends Element {
	features: Feature[];
}
