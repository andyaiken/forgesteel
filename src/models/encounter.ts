import { Condition } from '@/models/condition';
import { Element } from '@/models/element';
import { FactionType } from '@/enums/faction-type';
import { Hero } from '@/models/hero';
import { Monster } from '@/models/monster';
import { MonsterState } from '@/models/monster-state';
import { Terrain } from '@/models/terrain';

export interface EncounterSlotCustomization {
	addOnIDs: string[];
	itemIDs: string[];
	levelAdjustment: number;
	staminaAdjustment: number;
	minionCountAdjustment: number;
	convertToSolo: boolean;
	staminaDamage: number;
	staminaTemp: number;
	conditions: Condition[];
}

export interface EncounterSlot {
	id: string;
	monsterID: string;
	count: number;
	customization: EncounterSlotCustomization;
	monsters: Monster[];
	state: MonsterState;
}

export interface EncounterGroup {
	id: string;
	name: string;
	faction: FactionType;
	slots: EncounterSlot[];
	minHeroCount: number | undefined;
	encounterState: 'ready' | 'current' | 'finished';
}

export interface TerrainSlot {
	id: string;
	terrainID: string;
	upgradeIDs: string[];
	count: number;
	terrain: Terrain[];
}

export interface EncounterObjective extends Element {
	difficultyModifier: string;
	successCondition: string;
	failureCondition: string;
	victories: string;
};

export interface Encounter extends Element {
	groups: EncounterGroup[];
	terrain: TerrainSlot[];
	heroes: Hero[];
	/** @deprecated */
	objective: EncounterObjective | null;
	notes: Element[];
	initiative: 'heroes' | 'monsters' | undefined;
	round: number;
	malice: number;
	additionalTurnsTaken: string[];
	hiddenMaliceFeatures: string[];
}
