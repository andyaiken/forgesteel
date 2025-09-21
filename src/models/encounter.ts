import { Element } from './element';
import { EncounterSlot } from './encounter-slot';
import { Hero } from './hero';
import { Terrain } from './terrain';

export interface EncounterGroup {
	id: string;
	name: string;
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
	additionalTurnsTaken: string[];
}
