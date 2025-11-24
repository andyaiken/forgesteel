import { Encounter, EncounterGroup } from '@/models/encounter';
import { EncounterSlot, EncounterSlotCustomization } from '@/models/encounter-slot';
import { FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { MonsterData } from '@/data/monster-data';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

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
			customization: EncounterSlotCustomization;
		}[] = [];

		encounter.groups.flatMap(g => g.slots).forEach(s => {
			const key = s.monsterID + s.customization.addOnIDs.join('') + (s.customization.convertToSolo ? 'SOLO' : '');
			const item = list.find(i => i.key === key);
			if (!item) {
				list.push({
					key: key,
					monsterID: s.monsterID,
					customization: {
						addOnIDs: [ ...s.customization.addOnIDs ],
						itemIDs: [ ...s.customization.itemIDs ],
						levelAdjustment: s.customization.levelAdjustment,
						convertToSolo: s.customization.convertToSolo
					}
				});
			}
		});

		return list;
	};

	static getMonsterGroups = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const groups = this.getMonsterData(encounter)
			.map(data => SourcebookLogic.getMonsterGroup(sourcebooks, data.monsterID))
			.filter(group => !!group);
		return Collections.distinct(groups, item => item.id);
	};

	static getContentIDs = (encounter: Encounter, sourcebooks: Sourcebook[]) => {
		const ids: string[] = [];

		encounter.groups.forEach(g => {
			g.slots.forEach(s => {
				const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, s.monsterID);
				if (monsterGroup) {
					if (!ids.includes(monsterGroup.id)) {
						ids.push(monsterGroup.id);
					}
				}
				s.customization.itemIDs.forEach(id => {
					if (!ids.includes(id)) {
						ids.push(id);
					}
				});
			});
		});

		encounter.terrain.forEach(ts => {
			if (!ids.includes(ts.terrainID)) {
				ids.push(ts.terrainID);
			}
		});

		return ids;
	};

	static getCustomizedMonster = (monsterID: string, customization: EncounterSlotCustomization, sourcebooks: Sourcebook[]) => {
		const monster = SourcebookLogic.getMonster(sourcebooks, monsterID);
		const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, monsterID);

		if (monster && monsterGroup) {
			const copy = Utils.copy(monster);
			copy.id = Utils.guid();

			let points = 0;
			customization.addOnIDs.forEach(id => {
				const addOn = monsterGroup.addOns.find(a => a.id === id);
				if (addOn) {
					copy.features.push(addOn);
					points += addOn.data.cost;
				}
			});
			if (points > 4) {
				copy.encounterValue += (points - 4) * 2;
			}

			customization.itemIDs.forEach(id => {
				const item = SourcebookLogic.getItems(sourcebooks).find(i => i.id === id);
				if (item) {
					if (item.effect) {
						copy.features.push(FactoryLogic.feature.create({
							id: item.id,
							name: item.name,
							description: item.effect
						}));
					}
					item.featuresByLevel
						.filter(lvl => lvl.level <= copy.level)
						.flatMap(lvl => lvl.features)
						.forEach(f => {
							const featureCopy = Utils.copy(f);
							copy.features.push(featureCopy);
						});
				}
			});

			if (customization.levelAdjustment !== 0) {
				const suggestedBefore = MonsterLogic.getSuggestedStats(copy);
				copy.level += customization.levelAdjustment;
				const suggestedAfter = MonsterLogic.getSuggestedStats(copy);

				const characteristicMod = suggestedAfter.highestCharacteristic - suggestedBefore.highestCharacteristic;
				const evMod = suggestedAfter.ev - suggestedBefore.ev;
				const staminaMod = suggestedAfter.stamina - suggestedBefore.stamina;
				const freeStrikeDamageMod = suggestedAfter.freeStrikeDamage - suggestedBefore.freeStrikeDamage;
				const tier1Mod = suggestedAfter.damage.tier1 - suggestedBefore.damage.tier1;
				const tier2Mod = suggestedAfter.damage.tier2 - suggestedBefore.damage.tier2;
				const tier3Mod = suggestedAfter.damage.tier3 - suggestedBefore.damage.tier3;

				const max = Collections.max(copy.characteristics.map(c => c.value), v => v);
				copy.characteristics.filter(c => c.value === max).forEach(c => c.value += characteristicMod);

				copy.encounterValue += evMod;
				copy.stamina += staminaMod;
				copy.freeStrikeDamage += freeStrikeDamageMod;

				copy.features
					.filter(f => f.type === FeatureType.Ability)
					.map(f => f.data.ability)
					.flatMap(a => a.sections)
					.filter(s => s.type === 'roll')
					.forEach(s => {
						if (s.roll.bonus > 0) {
							s.roll.bonus += characteristicMod;
						}
						if (tier1Mod !== 0 && s.roll.tier1.includes('damage')) {
							s.roll.tier1 = `${s.roll.tier1}; ${tier1Mod > 0 ? '+' : ''}${tier1Mod} damage`;
						}
						if (tier2Mod !== 0 && s.roll.tier2.includes('damage')) {
							s.roll.tier2 = `${s.roll.tier2}; ${tier2Mod > 0 ? '+' : ''}${tier2Mod} damage`;
						}
						if (tier3Mod !== 0 && s.roll.tier3.includes('damage')) {
							s.roll.tier3 = `${s.roll.tier3}; ${tier3Mod > 0 ? '+' : ''}${tier3Mod} damage`;
						}
					});
			}

			if (customization.convertToSolo) {
				copy.role.organization = MonsterOrganizationType.Solo;
				copy.encounterValue *= 3;
				copy.stamina *= 2.5;

				copy.features.push(FactoryLogic.feature.create({
					id: 'custom-solo-turn',
					name: 'Solo Turns',
					description: 'The creature can take two turns each round. They can’t take turns consecutively.'
				}));

				copy.features.push(FactoryLogic.feature.create({
					id: 'custom-solo-action',
					name: 'Solo Action',
					description: '(5 Malice) The creature takes an additional main action on their turn. They can use this feature even if they are dazed.'
				}));

				if (!copy.features.some(f => f.name === 'End Effect')) {
					copy.features.push(FactoryLogic.feature.create({
						id: 'custom-end-effect',
						name: 'End Effect',
						description: 'At the end of each of their turns, the creature can take 10 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
					}));
				}
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

	static getAllMaliceFeatures = (encounter: Encounter, sourcebooks: Sourcebook[]): { group: string, features: (FeatureMalice | FeatureMaliceAbility)[] }[] => {
		const monsterGroups = this.getMonsterGroups(encounter, sourcebooks);
		const result: { group: string, features: (FeatureMalice | FeatureMaliceAbility)[] }[] = [
			{ group: 'Basic', features: MonsterData.malice }
		];
		monsterGroups.filter(group => group.malice.length > 0)
			.forEach(group => {
				result.push(
					{ group: group.name, features: group.malice }
				);
			});
		return result;
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

	static generateEncounter = (encounter: Encounter, sourcebooks: Sourcebook[], keywords: string[], minStrength: number, minLevel: number, maxLevel: number) => {
		const monsters = SourcebookLogic.getMonsters(sourcebooks)
			.filter(m => (keywords.length === 0) || keywords.some(k => m.keywords.includes(k)))
			.filter(m => (m.level >= minLevel) && (m.level <= maxLevel));

		if (monsters.length === 0) {
			return;
		}

		while (EncounterDifficultyLogic.getStrength(encounter, sourcebooks) < minStrength) {
			const monster = Collections.draw(monsters);

			const slot = FactoryLogic.createEncounterSlotFromMonster(monster);
			switch (monster.role.organization) {
				case MonsterOrganizationType.Minion:
					slot.count = 4;
					break;
				case MonsterOrganizationType.Horde:
					slot.count = 2;
					break;
			}

			const group = FactoryLogic.createEncounterGroup();
			group.slots.push(slot);

			encounter.groups.push(group);
		}
	};
}
