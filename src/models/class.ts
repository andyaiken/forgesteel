import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
import { Feature } from './feature';
import { Kit } from './kit';

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
	kits: Kit[];

	selected: boolean;
}

export interface HeroClass {
	id: string;
	name: string;
	description: string;

	heroicResource: string;
	subclassName: string;
	subclassCount: number;
	primaryCharacteristics: Characteristic[];

	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	abilities: Ability[];
	kits: Kit[];
	subclasses: SubClass[];

	level: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
}
