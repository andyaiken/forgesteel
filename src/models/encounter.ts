import { Element } from './element';
import { Monster } from './monster';
import { Terrain } from './terrain';

export interface EncounterSlot {
	id: string;
	monsterID: string;
	monsterGroupID: string;
	count: number;
	customization: {
		addOnIDs: string[];
	};
	monsters: Monster[];
}

export interface EncounterGroup {
	id: string;
	slots: EncounterSlot[];
	acted: boolean;
}

export interface TerrainSlot {
	id: string;
	terrainID: string;
	upgradeIDs: string[];
	count: number;
	terrain: Terrain[];
}

export interface Encounter extends Element {
	groups: EncounterGroup[];
	terrain: TerrainSlot[];
	round: number;
	malice: number;
}
