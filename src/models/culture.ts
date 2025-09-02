import { Feature, FeatureLanguageChoice } from './feature';
import { CultureType } from '../enums/culture-type';
import { Element } from './element';

export interface Culture extends Element {
	type: CultureType;
	language: FeatureLanguageChoice;
	environment: Feature | null;
	organization: Feature | null;
	upbringing: Feature | null;

	/**
	 * @deprecated This field has been subsumed into the language field.
	 */
	languages: string[];
}
