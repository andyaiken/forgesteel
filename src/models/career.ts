import { Feature } from './feature';

export interface Career {
	id: string;
	name: string;
	description: string;

	features: Feature[];
	title: Feature | null;
}
