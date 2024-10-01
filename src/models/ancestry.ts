import { Feature } from './feature';

export interface Ancestry {
	id: string;
	name: string;
	description: string;

	features: Feature[];
}
