import { FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { Monster } from '@/models/monster';
import { MonsterSheet } from '@/models/classic-sheets/monster-sheet';
import { Terrain } from '@/models/terrain';

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

	malice?: { monster: string, malice: (FeatureMalice | FeatureMaliceAbility)[] }[];
	groups?: EncounterGroupSheet[];

	terrain?: Terrain[];
	monsters?: MonsterSheet[];
}

// #region Encounter Group
export interface EncounterGroupSheet {
	id: string;
	name: string;
	slots: EncounterSlotSheet[];
}

export interface EncounterSlotSheet {
	id: string;
	monster: Monster;
	count: number;
	isMinion: boolean;
}
// #endregion
