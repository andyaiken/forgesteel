import { Feature } from './feature';

export interface Complication {
	id: string;
	name: string;
	description: string;

	benefit: Feature;
	drawback: Feature;
}
