import { Element } from './element';
import { Feature } from './feature';

export interface Culture extends Element {
	languages: string[];
	environment: Feature | null;
	organization: Feature | null;
	upbringing: Feature | null;
}
