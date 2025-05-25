import { Element } from './element';

export interface PlotContent {
	id: string;
	type: 'encounter' | 'montage' | 'negotiation' | 'map';
	contentID: string;
}

export interface PlotLink {
	id: string;
	plotID: string;
	label: string;
}

export interface Plot extends Element {
	content: PlotContent[];
	plots: Plot[];
	links: PlotLink[];
}
