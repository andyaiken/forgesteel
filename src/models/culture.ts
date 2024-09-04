import { Feature } from './feature';

export interface Culture {
	id: string;
	name: string;
	description: string;

	environment: Feature;
	organization: Feature;
	upbringing: Feature;
}
