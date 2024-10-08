import { Element } from './element';
import { Feature } from './feature';

export interface Complication extends Element {
	features: Feature[];
}
