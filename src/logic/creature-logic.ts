import { Characteristic } from '../enums/characteristic';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { Monster } from '../models/monster';
import { MonsterLogic } from './monster-logic';

export class CreatureLogic {
	static getCharacteristic = (creature: Hero | Monster, characteristic: Characteristic) => {
		if (CreatureLogic.isMonster(creature)) {
			return MonsterLogic.getCharacteristic(creature, characteristic);
		} else {
			return HeroLogic.getCharacteristic(creature, characteristic);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isMonster = (creature: any): creature is Monster => {
		return 'withCaptain' in creature;
	};
}
