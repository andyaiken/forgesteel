import { Collections } from '../utils/collections';
import { Encounter } from '../models/encounter';
import { EncounterDifficulty } from '../enums/encounter-difficulty';
import { Playbook } from '../models/playbook';
import { PlaybookLogic } from './playbook-logic';

export class EncounterLogic {
	static getBudget = (heroCount: number, heroLevel: number, victories: number) => {
		const effectiveHeroCount = heroCount + Math.floor(victories / 3);
		const heroWorth = 12 + (3 * heroLevel);
		return effectiveHeroCount * heroWorth;
	};

	static getStrength = (encounter: Encounter, playbook: Playbook) => {
		return Collections.sum(encounter.groups, group => {
			return Collections.sum(group.slots, slot => {
				const monster = PlaybookLogic.getMonster(playbook, slot.monsterID);
				return monster ? monster.encounterValue * slot.count : 0;
			});
		});
	};

	static getDifficulty = (encounterStrength: number, encounterBudget: number) => {
		const fraction = encounterStrength / encounterBudget;
		if (fraction < 0.75) {
			return EncounterDifficulty.Trivial;
		}
		if (fraction < 0.9) {
			return EncounterDifficulty.Easy;
		}
		if (fraction < 1.1) {
			return EncounterDifficulty.Standard;
		}
		if (fraction < 1.25) {
			return EncounterDifficulty.Hard;
		}
		return EncounterDifficulty.Extreme;
	};

	static getMonsterIDs = (encounter: Encounter) => {
		return Collections.distinct(encounter.groups.flatMap(g => g.slots.flatMap(s => s.monsterID)), item => item);
	};
}
