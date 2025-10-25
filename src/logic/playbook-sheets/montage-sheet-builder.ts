import { Montage } from '@/models/montage';
import { MontageSheet } from '@/models/classic-sheets/montage-sheet';
import { SheetFormatter } from '../classic-sheet/sheet-formatter';

export class MontageSheetBuilder {
	static buildMontageSheet = (montage: Montage): MontageSheet => {
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
