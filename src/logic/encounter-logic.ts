import { Encounter, EncounterGroup, EncounterSlot, TerrainSlot } from '../models/encounter';
import { Collections } from '../utils/collections';
import { EncounterDifficulty } from '../enums/encounter-difficulty';
import { Hero } from '../models/hero';
import { MonsterLogic } from './monster-logic';
import { Options } from '../models/options';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookLogic } from './sourcebook-logic';
import { Utils } from '../utils/utils';

export class EncounterLogic {
	static getMonsterCount = (encounter: Encounter, sourcebooks: Sourcebook[], options: Options) => {
		let total = 0;

		encounter.groups.forEach(g => {
			g.slots.forEach(s => {
				let count = s.count;

				const monster = SourcebookLogic.getMonster(sourcebooks, s.monsterID);
				if (monster) {
					count *= MonsterLogic.getRoleMultiplier(monster.role.organization, options);
				}

				total += count;
			});
		});

		return total;
	};

	static getStrength = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const monsters = Collections.sum(encounter.groups, g => EncounterLogic.getGroupStrength(g, sourcebooks));
		const terrain = Collections.sum(encounter.terrain, t => EncounterLogic.getTerrainStrength(t, sourcebooks));
		return monsters + terrain;
	};

	static getGroupStrength = (group: EncounterGroup, sourcebooks: Sourcebook[]) => {
		return Collections.sum(group.slots, slot => {
			const monster = SourcebookLogic.getMonster(sourcebooks, slot.monsterID);

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
		const heroValue = EncounterLogic.getHeroValue(heroLevel);

		return {
			maxTrivial: (effectiveHeroCount - 1) * heroValue,
			maxEasy: effectiveHeroCount * heroValue,
			maxStandard: (effectiveHeroCount + 1) * heroValue,
			maxHard: (effectiveHeroCount + 3) * heroValue
		};
	};

	static getDifficulty = (encounterStrength: number, options: Options, heroes: Hero[]) => {
		const budgets = EncounterLogic.getBudgets(options, heroes);

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

	static getGroupName = (group: EncounterGroup, encounter: Encounter) => {
		const names = group.slots.flatMap(s => s.monsters).map(m => m.name);
		if (names.length === 0) {
			const index = encounter.groups.findIndex(g => g.id === group.id);
			return `Group ${index + 1}`;
		}
		if (names.length === 1) {
			return names[0];
		}
		return `${names[0]} (and ${names.length > 2 ? `${names.length - 1} others` : '1 other'})`;
	};

	static getSlotName = (slot: EncounterSlot) => {
		const names = slot.monsters.map(m => m.name);
		if (names.length === 0) {
			return 'Slot';
		}
		if (names.length === 1) {
			return names[0];
		}
		return `${names[0]} (and ${names.length > 2 ? `${names.length - 1} others` : '1 other'})`;
	};

	static getMonsterData = (encounter: Encounter) => {
		const list: {
			key: string;
			monsterID: string;
			monsterGroupID: string;
			addOnIDs: string[];
		}[] = [];

		encounter.groups.flatMap(g => g.slots).forEach(s => {
			const key = s.monsterID + s.monsterGroupID + s.customization.addOnIDs.join('');
			const item = list.find(i => i.key === key);
			if (!item) {
				list.push({
					key: key,
					monsterID: s.monsterID,
					monsterGroupID: s.monsterGroupID,
					addOnIDs: [ ... s.customization.addOnIDs ]
				});
			}
		});

		return list;
	};

	static getMonsterGroups = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const groups = this.getMonsterData(encounter).map(data => SourcebookLogic.getMonsterGroup(sourcebooks, data.monsterID)).filter(group => !!group);
		return Collections.distinct(groups, item => item.id);
	};

	static getCustomizedMonster = (monsterID: string, addOnIDs: string[], sourcebooks: Sourcebook[]) => {
		const monster = SourcebookLogic.getMonster(sourcebooks, monsterID);
		const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, monsterID);

		if (monster && monsterGroup) {
			const copy = Utils.copy(monster);
			copy.id = Utils.guid();

			let points = 0;
			addOnIDs.forEach(id => {
				const addOn = monsterGroup.addOns.find(a => a.id === id);
				if (addOn) {
					copy.features.push(addOn);
					points += addOn.data.cost;
				}
			});
			if (points > 4) {
				copy.encounterValue += (points - 4) * 2;
			}

			return copy;
		}

		return null;
	};

	static getMaliceGained = (encounter: Encounter) => {
		if (encounter.heroes.length === 0) {
			return 0;
		}

		let malice = 0;

		if (encounter.round === 0) {
			// Gain malice equal to the average number of victories per hero
			malice += Math.round(Collections.mean(encounter.heroes, h => h.state.victories));
		}

		// Gain malice equal to the number of active heroes plus the number of the round that's starting
		malice += encounter.heroes.filter(h => !h.state.defeated).length;
		malice += encounter.round + 1;

		return malice;
	};

	static getCombatants = (encounter: Encounter) => {
		const combatants: { type: 'group' | 'hero', id: string, section: 'ready' | 'current' | 'finished' | 'defeated' }[] = [];

		encounter.groups
			.filter(g => g.slots.length > 0)
			.forEach(g => {
				const section = g.slots.every(s => s.state.defeated) || g.slots.flatMap(s => s.monsters).every(m => m.state.defeated) ? 'defeated' : g.encounterState;
				combatants.push({ type: 'group', id: g.id, section: section });
			});

		encounter.heroes.forEach(h => {
			const section = h.state.defeated ? 'defeated' : h.state.encounterState;
			combatants.push({ type: 'hero', id: h.id, section: section });
		});

		return combatants;
	};

	static getEncounterVictory = (encounter: Encounter) => {
		const combatants = EncounterLogic.getCombatants(encounter);
		const activeCombatants = combatants.filter(c => c.section !== 'defeated');
		const inactiveCombatants = combatants.filter(c => c.section === 'defeated');

		if (activeCombatants.every(c => c.type === 'group') && inactiveCombatants.some(c => c.type === 'hero')) {
			return 'monsters';
		}

		if (activeCombatants.every(c => c.type === 'hero') && inactiveCombatants.some(c => c.type === 'group')) {
			return 'heroes';
		}

		return null;
	};
}
