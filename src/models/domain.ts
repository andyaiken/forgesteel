import { Element } from './element';
import { Feature } from './feature';

export interface Domain extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	piety: string;
}
