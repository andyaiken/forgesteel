import { Collections } from '@/utils/collections';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { Hero } from '@/models/hero';
import { Montage } from '@/models/montage';
import { Options } from '@/models/options';

export class MontageLogic {
	static getHeroCount = (heroes: Hero[], options: Options) => {
		let heroCount = options.heroCount;
		if (options.heroParty) {
			const party = heroes.filter(h => h.folder === options.heroParty);
			heroCount = party.length;
		}
		return heroCount;
	};

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

		const heroCount = this.getHeroCount(heroes, options);
		if (heroCount < 5) {
			value -= (5 - heroCount);
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

		const heroCount = this.getHeroCount(heroes, options);
		if (heroCount < 5) {
			value -= (5 - heroCount);
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

		const heroCount = this.getHeroCount(heroes, options);
		// 2 rounds = 2 * number of heroes chances
		const totalChances = heroCount * 2;
		const testsUsed = successes + failures;
		const timeRanOut = testsUsed >= totalChances;

		// Time runs out or the heroes hit the failure limit
		const unsuccessful = timeRanOut || (failures >= failureLimit);

		if (successes >= successLimit) {
			return 'Total Success';
		} else if (unsuccessful && (successes - failures >= 2)) { // at least two more successes than failures
			return 'Partial Success';
		} else if (unsuccessful && (successes - failures < 2)) {
			return 'Total Failure';
		}

		return 'In Progress';
	};
};
