import { PanelWidth } from '@/enums/panel-width';
import { SheetPageSize } from '@/enums/sheet-page-size';

export interface Options {
	// General
	showInteractivePanels: boolean;
	// Hero
	shownStandardAbilities: string[];
	// Hero: Modern Sheet
	singlePage: boolean;
	separateInventoryFeatures: boolean;
	showSkillsInGroups: boolean;
	dimUnavailableAbilities: boolean;
	showSources: boolean;
	compactView: boolean;
	abilityWidth: PanelWidth;
	// Hero: Classic Sheet
	includePlayState: boolean;
	classicSheetPageSize: SheetPageSize;
	colorSheet: boolean;
	sheetTextColor: 'light' | 'default' | 'dark';
	featuresInclude: 'minimal' | 'no-basic' | 'all';
	pageOrientation: 'portrait' | 'landscape';
	// Library
	showMonsterGroups: boolean;
	// Monster Builder
	similarLevel: boolean;
	similarRole: boolean;
	similarOrganization: boolean;
	similarSize: boolean;
	// Encounter
	minionCount: number;
	party: string;
	// Encounter: Running
	showDefeatedCombatants: boolean;
	// Encounter / Montage Difficulty
	heroParty: string;
	heroCount: number;
	heroLevel: number;
	heroVictories: number;
	// Tactical Map
	gridSize: number;
	// Player View
	playerGridSize: number;
}
