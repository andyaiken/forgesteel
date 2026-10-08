import { Element } from '@/models/element';
import { Extensible } from '@/models/extension';
import { Feature } from '@/models/feature';
import { ResourceGain } from '@/models/resource-gain';

export interface Domain extends Element, Extensible {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	resourceGains: ({ resource: string } & ResourceGain)[];
	defaultFeatures: Feature[];
}
