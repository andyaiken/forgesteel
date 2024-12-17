import { Element } from './element';

export interface EncounterSlot {
	monsterID: string;
	count: number;
}

export interface EncounterGroup {
	slots: EncounterSlot[];
}

export interface Encounter extends Element {
	groups: EncounterGroup[];
}
