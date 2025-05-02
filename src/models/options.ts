import { PanelWidth } from '../enums/panel-width';

export interface Options {
	// Hero
	separateInventoryFeatures: boolean;
	showSkillsInGroups: boolean;
	showStandardAbilities: boolean;
	dimUnavailableAbilities: boolean;
	showSources: boolean;
	abilityWidth: PanelWidth;
	// Library
	showMonstersInGroups: boolean;
	// Monster Builder
	showSimilarMonsters: boolean;
	similarLevel: boolean;
	similarRole: boolean;
	similarOrganization: boolean;
	similarSize: boolean;
	// Encounter
	minionCount: number;
	party: string;
	// Encounter Difficulty
	heroCount: number;
	heroLevel: number;
	heroVictories: number;
	showDefeatedCombatants: boolean;
	// Tactical Map
	gridSize: number;
	playerGridSize: number;
}
