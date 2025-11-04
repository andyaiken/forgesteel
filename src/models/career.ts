import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Career extends Element {
	features: Feature[];
	incitingIncidents: {
		options: Element[];
		selected: Element | null;

		/**
		 * @deprecated This field has been subsumed into the language field.
		 */
		selectedID: string | null;
	};
}
