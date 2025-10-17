import { Montage } from '@/models/montage';

export class MontageSheetBuilder {
	static buildMontageSheet = (montage: Montage) => {
		const sheet = {
			id: montage.id,
			goal: montage.name
		};

		return sheet;
	};
};
