import { Montage } from '@/models/montage';

export class MontageSheetBuilder {
	static buildMontageSheet = (montage: Montage) => {
		const sheet = {
			id: montage.id,
			goal: montage.name,
			outcomes: {
				totalSuccess: montage.outcomes.totalSuccess,
				partialSuccess: montage.outcomes.partialSuccess,
				totalFailure: montage.outcomes.totalFailure
			}
		};

		return sheet;
	};
};
