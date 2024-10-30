import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { Feature } from './feature';

export interface SubClass {
	id: string;
	name: string;
	description: string;

	featuresByLevel: {
		level: number;
		features: Feature[];
		optionalFeatures: {
			category: string;
			features: Feature[];
		}[];
	}[];

	selected: boolean;
}

export interface HeroClass extends Element {
	heroicResource: string;
	subclassName: string;
	subclassCount: number;
	primaryCharacteristics: Characteristic[];

	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	abilities: Ability[];
	subclasses: SubClass[];

	level: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
}
