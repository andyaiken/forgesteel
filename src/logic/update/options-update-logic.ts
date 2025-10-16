import { Options } from '@/models/options';
import { PanelWidth } from '@/enums/panel-width';
import { SheetPageSize } from '@/enums/sheet-page-size';

export class OptionsUpdateLogic {
	static updateOptions = (options: Options) => {
		if (options.singlePage === undefined) {
			options.singlePage = false;
		}

		if (options.separateInventoryFeatures === undefined) {
			options.separateInventoryFeatures = false;
		}

		if (options.showSources === undefined) {
			options.showSources = false;
		}

		if (options.compactView === undefined) {
			options.compactView = false;
		}

		if (options.abilityWidth === undefined) {
			options.abilityWidth = PanelWidth.Medium;
		}

		if (options.includePlayState === undefined) {
			options.includePlayState = false;
		}

		if (options.colorSheet === undefined) {
			options.colorSheet = true;
		}

		if (options.sheetTextColor === undefined) {
			options.sheetTextColor = 'default';
		}

		if (options.featuresInclude === undefined) {
			options.featuresInclude = 'all';
		}

		if (options.classicSheetPageSize === undefined) {
			options.classicSheetPageSize = SheetPageSize.Letter;
		}

		if (options.pageOrientation === undefined) {
			options.pageOrientation = 'portrait';
		}

		if (options.showInteractivePanels === undefined) {
			options.showInteractivePanels = true;
		}

		if (options.showMonsterGroups === undefined) {
			options.showMonsterGroups = true;
		}

		if (options.similarLevel === undefined) {
			options.similarLevel = true;
		}

		if (options.similarRole === undefined) {
			options.similarRole = true;
		}

		if (options.similarOrganization === undefined) {
			options.similarOrganization = true;
		}

		if (options.similarSize === undefined) {
			options.similarSize = true;
		}

		if (options.minionCount === undefined) {
			options.minionCount = 4;
		}

		if (options.party === undefined) {
			options.party = '';
		}

		if (options.heroParty === undefined) {
			options.heroParty = '';
		}

		if (options.heroCount === undefined) {
			options.heroCount = 4;
		}

		if (options.heroLevel === undefined) {
			options.heroLevel = 1;
		}

		if (options.heroVictories === undefined) {
			options.heroVictories = 0;
		}

		if (options.showDefeatedCombatants === undefined) {
			options.showDefeatedCombatants = false;
		}

		if (options.gridSize === undefined) {
			options.gridSize = 50;
		}

		if (options.playerGridSize === undefined) {
			options.playerGridSize = 50;
		}

		if (options.showStandardAbilities === undefined) {
			options.showStandardAbilities = false;
		}

		if (options.shownStandardAbilities === undefined) {
			options.shownStandardAbilities = [];
		}
	};
}
