import { Element } from './element';
import { Feature } from './feature';

export interface Title extends Element {
	echelon: number;
	prerequisites: string;
	features: Feature[];
}
