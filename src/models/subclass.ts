import { Ability } from '@/models/ability';
import { Element } from '@/models/element';
import { Extensible } from '@/models/extension';
import { Feature } from '@/models/feature';

export interface SubClass extends Element, Extensible {
	classID: string;
	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	abilities: Ability[];

	selected: boolean;
}
