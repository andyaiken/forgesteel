import { Options } from '../../models/options';
import { PanelWidth } from '../../enums/panel-width';

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
			options.includePlayState = true;
		}

		if (options.showMonstersInGroups === undefined) {
			options.showMonstersInGroups = true;
		}

		if (options.showContentInTable === undefined) {
			options.showContentInTable = false;
		}

		if (options.showSimilarMonsters === undefined) {
			options.showSimilarMonsters = true;
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
	};
}
