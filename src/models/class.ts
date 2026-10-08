import { Ability } from '@/models/ability';
import { Characteristic } from '@/enums/characteristic';
import { Element } from '@/models/element';
import { Extensible } from '@/models/extension';
import { Feature } from '@/models/feature';
import { SubClass } from '@/models/subclass';

export interface HeroClass extends Element, Extensible {
	type: 'standard' | 'master';
	subclassName: string;
	subclassCount: number;

	primaryCharacteristicsOptions: Characteristic[][];
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
