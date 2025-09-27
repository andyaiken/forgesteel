import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Ancestry extends Element {
	features: Feature[];
	ancestryPoints: number;
}
