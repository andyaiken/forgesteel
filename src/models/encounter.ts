import { Monster, MonsterState } from './monster';
import { Element } from './element';
import { Hero } from './hero';
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
	state: MonsterState;
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
	objective: EncounterObjective;
	round: number;
	malice: number;
}
