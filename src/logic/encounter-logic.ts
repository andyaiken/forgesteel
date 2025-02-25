import { Collections } from '../utils/collections';
import { Encounter } from '../models/encounter';
import { EncounterDifficulty } from '../enums/encounter-difficulty';
import { MonsterLogic } from './monster-logic';
import { Options } from '../models/options';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from './sourcebook-logic';

export class EncounterLogic {
	static getMonsterCount = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		let total = 0;

		encounter.groups.forEach(g => {
			g.slots.forEach(s => {
				let count = s.count;

				const monster = SourcebookLogic.getMonster(sourcebooks, s.monsterID);
				if (monster) {
					count *= MonsterLogic.getRoleMultiplier(monster.role.organization);
				}

				total += count;
			});
		});

		return total;
	};

	static getStrength = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		return Collections.sum(encounter.groups, group => {
			return Collections.sum(group.slots, slot => {
				const monster = SourcebookLogic.getMonster(sourcebooks, slot.monsterID);
				return monster ? monster.encounterValue * slot.count : 0;
			});
		});
	};

	static getBudgets = (options: Options) => {
		const effectiveHeroCount = options.heroCount + Math.floor(options.heroVictories / 2);

		const getBudget = (heroCount: number, heroLevel: number) => {
			const heroWorth = 4 + (2 * heroLevel);
			return heroCount * heroWorth;
		};

		return {
			maxTrivial: getBudget(effectiveHeroCount - 1, options.heroLevel),
			maxEasy: getBudget(effectiveHeroCount, options.heroLevel),
			maxStandard: getBudget(effectiveHeroCount + 1, options.heroLevel),
			maxHard: getBudget(effectiveHeroCount + 3, options.heroLevel)
		};
	};

	static getDifficulty = (encounterStrength: number, options: Options) => {
		const budgets = EncounterLogic.getBudgets(options);

		if (budgets.maxHard > 40) {
			if (encounterStrength > budgets.maxHard * 500) {
				return EncounterDifficulty.Death;
			}

			if (encounterStrength > budgets.maxHard * 400) {
				return EncounterDifficulty.BlackGods;
			}

			if (encounterStrength > budgets.maxHard * 300) {
				return EncounterDifficulty.Annihilation;
			}

			if (encounterStrength > budgets.maxHard * 200) {
				return EncounterDifficulty.Silly;
			}

			if (encounterStrength > budgets.maxHard * 100) {
				return EncounterDifficulty.SuperExtreme;
			}
		}

		if (encounterStrength > budgets.maxHard) {
			return EncounterDifficulty.Extreme;
		}

		if (encounterStrength > budgets.maxStandard) {
			return EncounterDifficulty.Hard;
		}

		if (encounterStrength > budgets.maxEasy) {
			return EncounterDifficulty.Standard;
		}

		if (encounterStrength > budgets.maxTrivial) {
			return EncounterDifficulty.Easy;
		}

		if (encounterStrength > 0) {
			return EncounterDifficulty.Trivial;
		}

		return EncounterDifficulty.Empty;
	};

	static getVictories = (difficulty: EncounterDifficulty) => {
		switch (difficulty) {
			case EncounterDifficulty.Empty:
			case EncounterDifficulty.Trivial:
				return 0;
			case EncounterDifficulty.Easy:
			case EncounterDifficulty.Standard:
				return 1;
		}

		return 2;
	};

	static getMonsterIDs = (encounter: Encounter) => {
		return Collections.distinct(encounter.groups.flatMap(g => g.slots.flatMap(s => s.monsterID)), item => item);
	};

	static getMonsterGroups = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const groups = this.getMonsterIDs(encounter).map(id => SourcebookLogic.getMonsterGroup(sourcebooks, id)).filter(group => !!group);
		return Collections.distinct(groups, item => item.id);
	};
}
