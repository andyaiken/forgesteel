import { Feature } from './feature';

export interface Culture {
	id: string;
	name: string;
	description: string;

	environment: Feature | null;
	organization: Feature | null;
	upbringing: Feature | null;
}
