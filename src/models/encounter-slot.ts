import { Monster } from './monster';
import { MonsterState } from './monster-state';

export interface EncounterSlotCustomization {
	addOnIDs: string[];
	itemIDs: string[];
	convertToSolo: boolean;
}

export interface EncounterSlot {
	id: string;
	monsterID: string;
	count: number;
	customization: EncounterSlotCustomization;
	monsters: Monster[];
	state: MonsterState;
}
