import { Element } from '@/models/element';
import { Feature } from '@/models/feature';

export interface Title extends Element {
	echelon: number;
	prerequisites: string;
	features: Feature[];
	selectedFeatureID: string;
}
