import { PanelWidth } from '@/enums/panel-width';
import { SheetPageSize } from '@/enums/sheet-page-size';

export interface Options {
	// App
	cookieConsent: boolean;
	// Hero
	shownStandardAbilities: string[];
	xpPerLevel: number;
	// Hero: Modern Sheet
	singlePage: boolean;
	separateInventoryFeatures: boolean;
	showSkillsInGroups: boolean;
	showSources: boolean;
	compactView: boolean;
	abilityWidth: PanelWidth;
	// Hero: Classic Sheet
	includePlayState: boolean;
	classicSheetPageSize: SheetPageSize;
	colorSheet: boolean;
	colorScheme: 'community' | 'classic';
	showPowerRollCalculation: boolean;
	sheetTextColor: 'light' | 'default' | 'dark';
	featuresInclude: 'minimal' | 'no-basic' | 'all';
	pageOrientation: 'portrait' | 'landscape';
	debugClassicSheet: boolean;
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
