import { Characteristic } from '@/enums/characteristic';
import { Element } from '@/models/element';

export interface Pregen extends Element {
	sourcebookIDs: string[];

	ancestryID: string | null;
	cultureID: string | null;
	careerID: string | null;
	classID: string | null;
	complicationID: string | null;

	incitingIncidentID: string | null;
	level: number;
	characteristics: { characteristic: Characteristic; value: number }[];
	selectedSubclassIDs: string[];

	featureSelections: { featureID: string; selections: string[] }[];
}
