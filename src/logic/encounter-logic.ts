import { Collections } from '../utils/collections';
import { Encounter } from '../models/encounter';
import { EncounterDifficulty } from '../enums/encounter-difficulty';
import { MonsterLogic } from './monster-logic';
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

	static getBudget = (heroCount: number, heroLevel: number, victories: number) => {
		const effectiveHeroCount = heroCount + Math.floor(victories / 2);
		const heroWorth = 4 + (2 * heroLevel);
		return effectiveHeroCount * heroWorth;
	};

	static getStrength = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		return Collections.sum(encounter.groups, group => {
			return Collections.sum(group.slots, slot => {
				const monster = SourcebookLogic.getMonster(sourcebooks, slot.monsterID);
				return monster ? monster.encounterValue * slot.count : 0;
			});
		});
	};

	static getDifficulty = (encounterStrength: number, encounterBudget: number) => {
		const fraction = encounterStrength / encounterBudget;

		if (encounterBudget > 20) {
			if (fraction > 500) {
				return EncounterDifficulty.Death;
			}

			if (fraction > 400) {
				return EncounterDifficulty.BlackGods;
			}

			if (fraction > 300) {
				return EncounterDifficulty.Annihilation;
			}

			if (fraction > 200) {
				return EncounterDifficulty.Silly;
			}

			if (fraction > 100) {
				return EncounterDifficulty.SuperExtreme;
			}
		}

		if (fraction > 1.25) {
			return EncounterDifficulty.Extreme;
		}

		if (fraction > 1.1) {
			return EncounterDifficulty.Hard;
		}

		if (fraction > 0.9) {
			return EncounterDifficulty.Standard;
		}

		if (fraction > 0.75) {
			return EncounterDifficulty.Easy;
		}

		if (fraction > 0) {
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
