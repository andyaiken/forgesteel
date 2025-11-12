import { PanelWidth } from '@/enums/panel-width';
import { SheetPageSize } from '@/enums/sheet-page-size';

export interface Options {
	// Hero
	shownStandardAbilities: string[];
	xpPerLevel: number;
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
	showPowerRollCalculation: boolean;
	sheetTextColor: 'light' | 'default' | 'dark';
	featuresInclude: 'minimal' | 'no-basic' | 'all';
	pageOrientation: 'portrait' | 'landscape';
	// Monster Builder
	similarLevel: boolean;
	similarRole: boolean;
	similarOrganization: boolean;
	similarSize: boolean;
	// Encounter
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
	playerGridSize: number;
}
