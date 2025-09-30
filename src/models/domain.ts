import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Domain extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	resourceGains: {
		resource: string;
		tag: string;
		trigger: string;
		value: string;
	}[];
	defaultFeatures: Feature[];
}
