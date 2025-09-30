import { Feature, FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { AbilitySheet } from '@/models/classic-sheets/ability-sheet';
import { Monster } from '@/models/monster';
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

// #region Monster
export interface MonsterSheet {
	id: string;
	name: string;
	type: string;
	role: string;

	might: number;
	agility: number;
	reason: number;
	intuition: number;
	presence: number;

	// skills?: string[];
	// languages?: string[];

	keywords: string;

	size: string;
	speed: number;
	stamina: number;
	stability: number;
	freeStrike: number;

	immunity: string;
	weakness: string;
	movement: string;

	// recoveries?: RecoveriesSheet;

	features?: Feature[];
	abilities?: AbilitySheet[];
};
// #endregion
