import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Complication extends Element {
	features: Feature[];
}
