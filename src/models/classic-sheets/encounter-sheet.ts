import { Feature } from '@/models/feature';
import { Monster } from '@/models/monster';
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { TerrainSheet } from './terrain-sheet';

export interface EncounterSheet {
	id: string;
	name: string;
	description: string;

	notes?: string;

	heroCount: number;
	heroLvl: number;
	heroVictories: number;

	difficulty: string;
	encounterVictories: number;
	encounterEv: number;

	objective?: string;
	successCondition?: string;
	failureCondition?: string;

	malice?: { monster: string, malice: Feature[] }[];
	groups?: EncounterGroupSheet[];
	terrainSlots?: TerrainSlotSheet[];

	terrain?: TerrainSheet[];
	monsters?: MonsterSheet[];
}

// #region Encounter Group
export interface EncounterGroupSheet {
	id: string;
	name: string;
	slots: EncounterSlotSheet[];
	groupEv: number;
}

export interface EncounterSlotSheet {
	id: string;
	monster: Monster;
	count: number;
	isMinion: boolean;
}
// #endregion

export interface TerrainSlotSheet {
	id: string;
	terrain: TerrainSheet;
	count: number;
	slotEv: number;
}
