import { AbilitySheet } from './ability-sheet';
import { FeatureText } from '../feature';

export interface TerrainSheet {
	id: string;
	name: string;
	type: string;
	role: string;
	description: string;
	encounterValue: string;

	details: string;
	size: string;
	stamina: string;

	immunity: string;
	weakness: string;
	typicalSpace: string;
	direction: string;
	link: string;

	sections: (FeatureText | AbilitySheet)[];
};
