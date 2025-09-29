import { Characteristic } from '@/enums/characteristic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';

export class CreatureLogic {
	static getCharacteristic = (creature: Hero | Monster | undefined, characteristic: Characteristic) => {
		if (!creature) {
			return 0;
		} else if (CreatureLogic.isMonster(creature)) {
			return MonsterLogic.getCharacteristic(creature, characteristic);
		} else {
			return HeroLogic.getCharacteristic(creature, characteristic);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isMonster = (creature: any): creature is Monster => {
		return creature && 'withCaptain' in creature;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isHero = (creature: any): creature is Hero => {
		return creature && 'complication' in creature;
	};

	static getEchelon = (level: number) => {
		switch (level) {
			case 1:
			case 2:
			case 3:
				return 1;
			case 4:
			case 5:
			case 6:
				return 2;
			case 7:
			case 8:
			case 9:
				return 3;
			case 10:
				return 4;
		}

		return 1;
	};
}
