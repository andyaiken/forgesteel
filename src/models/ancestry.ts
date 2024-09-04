import { Feature } from './feature';

export interface Ancestry {
	id: string;
	name: string;
	description: string;

	size: {
		value: number;
		mod: string;
	}
	speed: number;
	features: Feature[];
}
