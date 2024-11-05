import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { Feature } from './feature';
import { SubClass } from './subclass';

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
