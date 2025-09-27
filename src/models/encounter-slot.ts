import { Monster } from '@/models/monster';
import { MonsterState } from '@/models/monster-state';

export interface EncounterSlotCustomization {
	addOnIDs: string[];
	itemIDs: string[];
	levelAdjustment: number;
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
