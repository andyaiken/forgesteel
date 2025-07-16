import { Element } from './element';
import { PowerRoll } from './power-roll';

export interface PlotContentText {
	id: string;
	contentType: 'text';
	format: 'standard' | 'read-aloud' | 'director';
	text: string;
}

export interface PlotContentImage {
	id: string;
	contentType: 'image';
	title: string;
	data: string;
}

export interface PlotContentRoll {
	id: string;
	contentType: 'roll';
	roll: PowerRoll;
}

export interface PlotContentReference {
	id: string;
	contentType: 'reference';
	type: 'encounter' | 'montage' | 'negotiation' | 'map';
	contentID: string;
}

export type PlotContent = PlotContentText | PlotContentImage | PlotContentRoll | PlotContentReference;

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
