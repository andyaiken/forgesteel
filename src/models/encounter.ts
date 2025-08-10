import { Element } from './element';
import { Hero } from './hero';
import { Terrain } from './terrain';
import { EncounterSlot } from './encounter-slot';

export interface EncounterSlotCustomization {
	addOnIDs: string[];
	itemIDs: string[];
	convertToSolo: boolean;
}

export interface EncounterGroup {
	id: string;
	slots: EncounterSlot[];
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
	objective: EncounterObjective | null;
	notes: Element[];
	initiative: 'heroes' | 'monsters' | undefined;
	round: number;
	malice: number;
}
