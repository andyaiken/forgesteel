import { Element } from './element';
import { Feature } from './feature';

export interface Career extends Element {
	features: Feature[];
	title: Feature;
	incitingIncidents: {
		options: Element[];
		selectedID: string | null;
	};
}
