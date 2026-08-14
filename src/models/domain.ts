import { Element } from '@/models/element';
import { Feature } from '@/models/feature';
import { ResourceGain } from '@/models/resource-gain';

export interface Domain extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	resourceGains: ({ resource: string } & ResourceGain)[];
	defaultFeatures: Feature[];
}
