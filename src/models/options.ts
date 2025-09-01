import { PanelWidth } from '../enums/panel-width';
import { SheetPageSize } from '../enums/sheet-page-size';

export interface Options {
	// Hero
	singlePage: boolean;
	separateInventoryFeatures: boolean;
	showSkillsInGroups: boolean;
	showStandardAbilities: boolean;
	dimUnavailableAbilities: boolean;
	showSources: boolean;
	includePlayState: boolean;
	compactView: boolean;
	abilityWidth: PanelWidth;
	classicSheetPageSize: SheetPageSize;
	colorAbilityCards: boolean;
	pageOrientation: 'portrait' | 'landscape';
	// Library
	showMonstersInGroups: boolean;
	showContentInTable: boolean;
	// Monster Builder
	similarLevel: boolean;
	similarRole: boolean;
	similarOrganization: boolean;
	similarSize: boolean;
	// Encounter
	minionCount: number;
	party: string;
	// Encounter Difficulty
	heroParty: string;
	heroCount: number;
	heroLevel: number;
	heroVictories: number;
	showDefeatedCombatants: boolean;
	// Tactical Map
	gridSize: number;
	playerGridSize: number;
}
