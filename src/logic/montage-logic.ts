import { Collections } from '@/utils/collections';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { Hero } from '@/models/hero';
import { Montage } from '@/models/montage';
import { Options } from '@/models/options';

export class MontageLogic {
	static getSuccessLimit = (montage: Montage, heroes: Hero[], options: Options) => {
		let value = 6;

		switch (montage.difficulty) {
			case EncounterDifficulty.Easy:
				value = 5;
				break;
			case EncounterDifficulty.Standard:
				value = 6;
				break;
			case EncounterDifficulty.Hard:
				value = 7;
				break;
		}

		let heroCount = options.heroCount;
		if (options.heroParty) {
			const party = heroes.filter(h => h.folder === options.heroParty);
			heroCount = party.length;
		}
		if (heroCount < 5) {
			value -= 2 * (5 - heroCount);
		}
		if (heroCount > 5) {
			value += (heroCount - 5);
		}

		return Math.max(value, 2);
	};

	static getFailureLimit = (montage: Montage, heroes: Hero[], options: Options) => {
		let value = 6;

		switch (montage.difficulty) {
			case EncounterDifficulty.Easy:
				value = 5;
				break;
			case EncounterDifficulty.Standard:
				value = 4;
				break;
			case EncounterDifficulty.Hard:
				value = 3;
				break;
		}

		let heroCount = options.heroCount;
		if (options.heroParty) {
			const party = heroes.filter(h => h.folder === options.heroParty);
			heroCount = party.length;
		}
		if (heroCount < 5) {
			value -= 2 * (5 - heroCount);
		}
		if (heroCount > 5) {
			value += (heroCount - 5);
		}

		return Math.max(value, 2);
	};

	static getOutcome = (montage: Montage, heroes: Hero[], options: Options) => {
		const successes = Collections.sum(montage.sections, s => Collections.sum(s.challenges, c => c.successes));
		const failures = Collections.sum(montage.sections, s => Collections.sum(s.challenges, c => c.failures));
		const successLimit = MontageLogic.getSuccessLimit(montage, heroes, options);
		const failureLimit = MontageLogic.getFailureLimit(montage, heroes, options);

		if (successes >= successLimit) {
			return 'Total Success';
		}
		if ((failures >= failureLimit) && (successes >= 2)) {
			return 'Partial Success';
		}
		if ((failures >= failureLimit) && (successes < 2)) {
			return 'Total Failure';
		}

		return 'In Progress';
	};
};
