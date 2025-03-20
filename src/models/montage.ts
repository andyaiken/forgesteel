import { Characteristic } from '../enums/characteristic';
import { Element } from './element';

export interface MontageChallenge extends Element {
	characteristics: Characteristic[];
	skills: string;
	abilities: string;
	uses: number;
	successes: number;
	failures: number;
};

export interface MontageSection extends Element {
	challenges: MontageChallenge[];
	twistInfo: string;
	twists: MontageChallenge[];
};

export interface Montage extends Element {
	scene: string;
	sections: MontageSection[];
	outcomes: {
		totalSuccess: string;
		partialSuccess: string;
		totalFailure: string;
	}
};
