import { Element } from './element';

export interface EncounterSlot {
	id: string;
	monsterID: string;
	count: number;
}

export interface EncounterGroup {
	id: string;
	slots: EncounterSlot[];
}

export interface Encounter extends Element {
	groups: EncounterGroup[];
}
