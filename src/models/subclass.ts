import { Element } from './element';
import { Feature } from './feature';

export interface SubClass extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];

	selected: boolean;
}
