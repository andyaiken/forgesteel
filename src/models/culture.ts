import { CultureType } from '../enums/culture-type';
import { Element } from './element';
import { Feature } from './feature';

export interface Culture extends Element {
	type: CultureType;
	languages: string[];
	environment: Feature | null;
	organization: Feature | null;
	upbringing: Feature | null;
}
