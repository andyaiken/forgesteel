import { Encounter, EncounterGroup } from '@/models/encounter';
import { EncounterGroupSheet, EncounterSheet, EncounterSlotSheet } from '@/models/classic-sheets/encounter-sheet';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { CreatureLogic } from '@/logic/creature-logic';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { EncounterLogic } from '@/logic/encounter-logic';
import { EncounterSlot } from '@/models/encounter-slot';
import { Hero } from '@/models/hero';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

export class EncounterSheetBuilder {
	static buildEncounterSheet = (encounter: Encounter, sourcebooks: Sourcebook[], heroes: Hero[], options: Options): EncounterSheet => {
		const strength = EncounterDifficultyLogic.getStrength(encounter, sourcebooks);
		const difficulty = EncounterDifficultyLogic.getDifficulty(strength, options, heroes);
		const victories = EncounterDifficultyLogic.getVictories(difficulty);

		const sheet: EncounterSheet = {
			id: encounter.id,
			name: encounter.name,
			description: encounter.description,
			heroCount: options.heroCount,
			heroLvl: options.heroLevel,
			heroVictories: options.heroVictories,
			difficulty: difficulty.toString(),
			encounterVictories: victories,
			encounterEv: strength
		};

		sheet.notes = encounter.notes.map(note => `# ${note.name}\n${note.description}`).join('\n\n');

		sheet.objective = encounter.objective?.name;
		sheet.successCondition = encounter.objective?.successCondition;
		sheet.failureCondition = encounter.objective?.failureCondition;

		sheet.groups = encounter.groups.map(g => this.buildEncounterGroupSheet(g, sourcebooks, options));

		const terrain = encounter.terrain.map(slot => SourcebookLogic.getTerrains(sourcebooks).find(t => t.id === slot.terrainID)).filter(t => !!t);
		sheet.terrain = terrain;

		const encounterMonsters = EncounterLogic.getMonsterData(encounter)
			.map(data => EncounterLogic.getCustomizedMonster(data.monsterID, data.customization, sourcebooks))
			.filter(m => !!m);
		sheet.monsters = encounterMonsters.map(ClassicSheetBuilder.buildMonsterSheet);

		const seenMalice = new Set<string>();
		const possibleMalice = EncounterLogic.getAllMaliceFeatures(encounter, sourcebooks);
		sheet.malice = possibleMalice
			.map(groupMalice => {
				const maxLvl = encounterMonsters.reduce((maxLvl, monster) => Math.max(maxLvl, monster.level), 0);
				const echelon = CreatureLogic.getEchelon(maxLvl);
				const usableMalice = groupMalice.features
					.filter(m => m.data.echelon <= echelon)
					.filter(m => !encounter.hiddenMaliceFeatures.includes(m.id))
					.filter(m => seenMalice.has(m.id) ? false : seenMalice.add(m.id));
				return ({ monster: groupMalice.group, malice: usableMalice });
			})
			.filter(mg => mg.malice.length);

		return sheet;
	};

	static buildEncounterGroupSheet = (group: EncounterGroup, sourcebooks: Sourcebook[], options: Options): EncounterGroupSheet => {
		const slots = group.slots.map(s => this.buildEncounterSlotSheet(s, sourcebooks, options)).filter(s => !!s);
		const adjustedSlots: EncounterSlotSheet[] = [];
		slots.forEach(slot => {
			const existingMinion = adjustedSlots.filter(s => s.isMinion).find(s => s.monster.id === slot.monster.id);
			if (existingMinion) {
				existingMinion.count += slot.count;
			} else {
				if (slot.isMinion) {
					adjustedSlots.push(slot);
				} else {
					for (let i = 0; i < slot.count; ++i) {
						const split = Utils.copy(slot);
						split.count = 1;
						adjustedSlots.push(split);
					}
				}
			}
		});

		adjustedSlots.sort((a, b) => {
			if (a.isMinion && !b.isMinion) {
				return 1;
			} else if (b.isMinion && !a.isMinion) {
				return -1;
			} else {
				return a.monster.name.localeCompare(b.monster.name);
			}
		});

		const sheet: EncounterGroupSheet = {
			id: group.id,
			name: group.name,
			slots: adjustedSlots
		};

		return sheet;
	};

	static buildEncounterSlotSheet = (slot: EncounterSlot, sourcebooks: Sourcebook[], options: Options): EncounterSlotSheet | null => {
		const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization, sourcebooks);
		if (!monster) {
			console.error('Failed to get monster for encounter slot:', slot);
			return null;
		}
		const roleMult = MonsterLogic.getRoleMultiplier(monster.role.organization, options);
		const sheet: EncounterSlotSheet = {
			id: slot.id,
			monster: monster,
			isMinion: monster.role.organization === MonsterOrganizationType.Minion,
			count: roleMult * slot.count
		};

		return sheet;
	};
}
