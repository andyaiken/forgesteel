import { Negotiation } from '@/models/negotiation';
import { NegotiationSheet } from '@/models/classic-sheets/negotiation-sheet';

export class NegotiationSheetBuilder {
	static buildNegotiationSheet = (negotiation: Negotiation): NegotiationSheet => {
		const sheet: NegotiationSheet = {
			id: negotiation.id,
			name: negotiation.name,
			attitude: negotiation.attitude.toString(),
			impression: negotiation.impression,
			interest: negotiation.interest,
			patience: negotiation.patience,
			outcomes: negotiation.outcomes,
			languages: [],
			motivations: negotiation.motivations.map(m => ({ trait: m.trait.toString(), description: m.description })),
			pitfalls: negotiation.pitfalls.map(m => ({ trait: m.trait.toString(), description: m.description }))
		};

		let nativeFound = false;
		negotiation.languages.forEach(lang => {
			if (lang !== 'Caelian' && !nativeFound) {
				sheet.languages.push(`${lang} (Native)`);
				nativeFound = true;
			} else {
				sheet.languages.push(lang);
			}
		});

		return sheet;
	};
};
