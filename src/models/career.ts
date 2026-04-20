import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Career extends Element {
	features: Feature[];
	incitingIncidents: {
		options: Element[];
		selected: Element | null;
	};
}
