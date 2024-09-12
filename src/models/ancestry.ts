import { Feature } from './feature';

export interface Size {
	value: number;
	mod: string;
};

export interface Ancestry {
	id: string;
	name: string;
	description: string;

	size: Size;
	speed: number;
	features: Feature[];
}
