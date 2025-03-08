import { Element } from './element';
import { Monster } from './monster';

export interface EncounterSlot {
	id: string;
	monsterID: string;
	monsterGroupID: string;
	count: number;
	customization: {
		addOnIDs: string[];
	};
	monsters: Monster[];
}

export interface EncounterGroup {
	id: string;
	slots: EncounterSlot[];
}

export interface Encounter extends Element {
	groups: EncounterGroup[];
	malice: number;
}
