import { Characteristic } from '../enums/characteristic';
import { Feature } from './feature';

export interface HeroClass {
	id: string;
	name: string;
	description: string;

	heroicResource: string;
	primaryCharacteristics: Characteristic[];
	startingStamina: number;
	staminaPerLevel: number;
	recoveries: number;

	featuresByLevel: { level: number, features: Feature[] }[];

	level: number;
	characteristics: { characteristic: Characteristic, value: number }[];
}
