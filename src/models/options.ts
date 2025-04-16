import { PanelWidth } from '../enums/panel-width';

export interface Options {
	// Hero
	showSkillsInGroups: boolean;
	showFreeStrikes: boolean;
	showStandardAbilities: boolean;
	dimUnavailableAbilities: boolean;
	featureWidth: PanelWidth;
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
	// Tactical Map
	gridSize: number;
	playerGridSize: number;
}
