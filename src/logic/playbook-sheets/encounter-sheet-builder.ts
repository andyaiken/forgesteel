import { Encounter } from '../../models/encounter';
import { EncounterDifficultyLogic } from '../encounter-difficulty-logic';
import { EncounterLogic } from '../encounter-logic';
import { EncounterSheet } from '../../models/classic-sheets/encounter-sheet';
import { Hero } from '../../models/hero';
import { Options } from '../../models/options';
import { Sourcebook } from '../../models/sourcebook';

export class EncounterSheetBuilder {
	static buildEncounterSheet = (encounter: Encounter, sourcebooks: Sourcebook[], heroes: Hero[], options: Options): EncounterSheet => {
		const strength = EncounterDifficultyLogic.getStrength(encounter, sourcebooks);
		const difficulty = EncounterDifficultyLogic.getDifficulty(strength, options, heroes);
		const victories = EncounterDifficultyLogic.getVictories(difficulty);

		const sheet: EncounterSheet = {
			id: encounter.id,
			name: encounter.name,
			description: encounter.description,
			heroCount: options.heroCount,
			heroLvl: options.heroLevel,
			heroVictories: options.heroVictories,
			difficulty: difficulty.toString(),
			encounterVictories: victories,
			encounterEv: strength
		};

		sheet.successCondition = encounter.objective?.successCondition;
		sheet.failureCondition = encounter.objective?.failureCondition;

		const monsterGroups = EncounterLogic.getMonsterGroups(encounter, sourcebooks);

		sheet.malice = monsterGroups.filter(group => group.malice.length > 0).map(group => ({ monster: group.name, malice: group.malice }));

		sheet.groups = encounter.groups;

		return sheet;
	};
}
