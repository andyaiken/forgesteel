import { Element } from './element';
import { Feature } from './feature';

export interface Domain extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	resourceGains: {
		resource: string;
		trigger: string;
		value: string;
	}[];
	piety: string;
}
