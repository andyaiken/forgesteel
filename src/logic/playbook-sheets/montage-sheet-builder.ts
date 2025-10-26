import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { Hero } from '@/models/hero';
import { Montage } from '@/models/montage';
import { MontageLogic } from '../montage-logic';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { Options } from '@/models/options';
import { SheetFormatter } from '../classic-sheet/sheet-formatter';

export class MontageSheetBuilder {
	static buildMontageSheet = (montage: Montage, heroes: Hero[], options: Options): MontageSheet => {
		const sheet: MontageSheet = {
			id: montage.id,
			name: montage.name,
			outcomes: {
				totalSuccess: montage.outcomes.totalSuccess,
				partialSuccess: montage.outcomes.partialSuccess,
				totalFailure: montage.outcomes.totalFailure
			},
			hazards: '',
			eventsNotes: ''
		};

		if ([ EncounterDifficulty.Easy, EncounterDifficulty.Standard, EncounterDifficulty.Hard ].includes(montage.difficulty)) {
			sheet.difficulty = montage.difficulty.toString();
			if (montage.difficulty === EncounterDifficulty.Standard) {
				sheet.difficulty = 'Moderate';
			}
			sheet.successLimit = MontageLogic.getSuccessLimit(montage, heroes, options);
			sheet.failureLimit = MontageLogic.getFailureLimit(montage, heroes, options);
		}
		sheet.numHeroes = MontageLogic.getHeroCount(heroes, options);

		let hazards = '';
		let eventsNotes = '';
		montage.sections.forEach(section => {
			section.challenges.forEach(challenge => {
				hazards += `\n**${challenge.name}** (${challenge.characteristics.join(', ')})`;
			});
			section.twists.forEach(twist => {
				eventsNotes += `\n**${twist.name}**\n${twist.description}`;
			});
		});
		sheet.hazards = SheetFormatter.enhanceMarkdown(hazards);
		sheet.eventsNotes = SheetFormatter.enhanceMarkdown(eventsNotes);

		return sheet;
	};
};
