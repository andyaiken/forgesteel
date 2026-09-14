import { Ability } from '@/models/ability';
import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface SubClass extends Element {
	classID: string;
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	abilities: Ability[];

	selected: boolean;
}
