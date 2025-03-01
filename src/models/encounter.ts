import { Element } from './element';
import { Monster } from './monster';

export interface EncounterSlot {
	id: string;
	monsterID: string;
	count: number;
	monsters: Monster[]
}

export interface EncounterGroup {
	id: string;
	slots: EncounterSlot[];
}

export interface Encounter extends Element {
	groups: EncounterGroup[];
	malice: number;
}
