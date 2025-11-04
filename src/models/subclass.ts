import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface SubClass extends Element {
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];

	selected: boolean;
}
