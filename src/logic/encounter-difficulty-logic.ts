import { Encounter, EncounterGroup, TerrainSlot } from '@/models/encounter';
import { Collections } from '@/utils/collections';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { EncounterLogic } from '@/logic/encounter-logic';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';

export class EncounterDifficultyLogic {
	static getStrength = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const monsters = Collections.sum(encounter.groups, g => EncounterDifficultyLogic.getGroupStrength(g, sourcebooks));
		const terrain = Collections.sum(encounter.terrain, t => EncounterDifficultyLogic.getTerrainStrength(t, sourcebooks));
		return monsters + terrain;
	};

	static getGroupStrength = (group: EncounterGroup, sourcebooks: Sourcebook[]) => {
		return Collections.sum(group.slots, slot => {
			const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, sourcebooks);

			const group = SourcebookLogic.getMonsterGroup(sourcebooks, slot.monsterID);
			const addOns = group ? group.addOns.filter(a => slot.customization.addOnIDs.includes(a.id)) : [];
			const addOnPoints = Collections.sum(addOns, a => a.data.cost);
			const addOnCost = addOnPoints > 4 ? (addOnPoints - 4) * 2 : 0;

			return monster ? (monster.encounterValue + addOnCost) * slot.count : 0;
		});
	};

	static getTerrainStrength = (slot: TerrainSlot, sourcebooks: Sourcebook[]) => {
		const terrain = SourcebookLogic.getTerrains(sourcebooks).find(t => t.id === slot.terrainID);
		const upgrades = terrain ? terrain.upgrades.filter(a => slot.upgradeIDs.includes(a.id)) : [];
		const upgradeCost = Collections.sum(upgrades, a => a.cost);
		return terrain ? (terrain.encounterValue + upgradeCost) * slot.count : 0;
	};

	static getHeroValue = (level: number) => {
		return 4 + (2 * level);
	};

	static getBudgets = (options: Options, heroes: Hero[]) => {
		let heroCount = options.heroCount;
		let heroLevel = options.heroLevel;
		let heroVictories = options.heroVictories;

		if (options.heroParty) {
			const party = heroes.filter(h => h.folder === options.heroParty);
			heroCount = party.length;
			heroLevel = Math.round(Collections.mean(party, h => h.class ? h.class.level : 1));
			heroVictories = Math.round(Collections.mean(party, h => h.state.victories));
		}

		const effectiveHeroCount = heroCount + Math.floor(heroVictories / 2);
		const heroValue = EncounterDifficultyLogic.getHeroValue(heroLevel);

		return {
			maxTrivial: ((effectiveHeroCount - 1) * heroValue) - 1,
			maxEasy: (effectiveHeroCount * heroValue) - 1,
			maxStandard: (effectiveHeroCount + 1) * heroValue,
			maxHard: (effectiveHeroCount + 3) * heroValue
		};
	};

	static getDifficulty = (encounterStrength: number, options: Options, heroes: Hero[]) => {
		const budgets = EncounterDifficultyLogic.getBudgets(options, heroes);

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
}
