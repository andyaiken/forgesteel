import { Encounter, EncounterGroup, TerrainSlot } from '@/models/encounter';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { EncounterDifficultyLogic } from './encounter-difficulty-logic';
import { EncounterLogic } from './encounter-logic';
import { EncounterSlot } from '@/models/encounter-slot';
import { FeatureAddOn } from '@/models/feature';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { SourcebookLogic } from './sourcebook-logic';

const mockMonster1 = {
	id: 'test-monster1',
	encounterValue: 3,
	role: { organization: MonsterOrganizationType.Horde }
} as Monster;

const mockMonster2 = {
	id: 'test-monster2',
	encounterValue: 4,
	role: { organization: MonsterOrganizationType.Horde }
} as Monster;

const mockMinion = {
	id: 'test-minion1',
	encounterValue: 3,
	role: { organization: MonsterOrganizationType.Minion }
} as Monster;

describe('getGroupStrength', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('correctly calculates the strength of an empty group', () => {
		const group = {
			slots: [] as EncounterSlot[]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(0);
	});

	/**
	 * A single slot of 2 monsters with an EV of 3 per monster
	 */
	test('correctly calculates strength of a basic group of monsters', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMonster1);

		// No addOns
		const mockGroup = {
			addOns: [] as FeatureAddOn[]
		} as MonsterGroup;
		vi.spyOn(SourcebookLogic, 'getMonsterGroup').mockReturnValue(mockGroup);

		const slot = {
			monsterID: 'test-monster1',
			count: 2
		} as EncounterSlot;
		const group = {
			slots: [ slot ]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(6);
	});

	/**
	 * - slot 1: 2 monsters with an EV of 3 per monster
	 * - slot 2: 1 monster with an EV of 4 per monster
	 */
	test('correctly calculates strength of a group with various monsters', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster')
			.mockReturnValueOnce(mockMonster1)
			.mockReturnValueOnce(mockMonster2);

		// No addOns
		const mockGroup = {
			addOns: [] as FeatureAddOn[]
		} as MonsterGroup;
		vi.spyOn(SourcebookLogic, 'getMonsterGroup').mockReturnValue(mockGroup);

		const slot1 = {
			monsterID: 'test-monster1',
			count: 2
		} as EncounterSlot;
		const slot2 = {
			monsterID: 'test-monster2',
			count: 1
		} as EncounterSlot;
		const group = {
			slots: [ slot1, slot2 ]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(10);
	});

	/**
	 * A single slot of 4 minions (1 minion group)
	 */
	test('correctly calculates strength of a basic group of minions', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMinion);

		// No addOns
		const mockGroup = {
			addOns: [] as FeatureAddOn[]
		} as MonsterGroup;
		vi.spyOn(SourcebookLogic, 'getMonsterGroup').mockReturnValue(mockGroup);

		const slot = {
			monsterID: 'test-minion1',
			count: 1,
			customization: { minionCountAdjustment: 0 }
		} as EncounterSlot;
		const group = {
			slots: [ slot ]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(3);
	});

	/**
	 * A single slot of 8 minions (1 minion group with 4 added via customization)
	 */
	test('correctly calculates strength of a customized group of minions', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMinion);

		// No addOns
		const mockGroup = {
			addOns: [] as FeatureAddOn[]
		} as MonsterGroup;
		vi.spyOn(SourcebookLogic, 'getMonsterGroup').mockReturnValue(mockGroup);

		const slot = {
			monsterID: 'test-minion1',
			count: 1,
			customization: { minionCountAdjustment: 4 }
		} as EncounterSlot;
		const group = {
			slots: [ slot ]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(6);
	});

	/**
	 * 2 slots of 6 minions each (3 minion groups across 2 slots)
	 */
	test('correctly calculates strength of complex group of minions', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMinion);

		// No addOns
		const mockGroup = {
			addOns: [] as FeatureAddOn[]
		} as MonsterGroup;
		vi.spyOn(SourcebookLogic, 'getMonsterGroup').mockReturnValue(mockGroup);

		const slot = {
			monsterID: 'test-minion1',
			count: 1,
			customization: { minionCountAdjustment: 2 }
		} as EncounterSlot;
		const group = {
			slots: [ slot, slot ]
		} as EncounterGroup;

		const result = EncounterDifficultyLogic.getGroupStrength(group, []);

		expect(result).toBe(9);
	});
});

describe('getTerrainStrength', () => {
	test('correctly calculates the strength of an empty terrain slot', () => {
		const slot = {} as TerrainSlot;
		const result = EncounterDifficultyLogic.getTerrainStrength(slot, []);

		expect(result).toBe(0);
	});
});

describe('getStrength', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('correctly calculates the strength of an empty encounter', () => {
		const encounter = {
			groups: [] as EncounterGroup[],
			terrain: [] as TerrainSlot[]
		} as Encounter;
		const result = EncounterDifficultyLogic.getStrength(encounter, [], 0);

		expect(result).toBe(0);
	});

	test('correctly calculates the strength of a simple encounter', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMonster1);

		const slot = {
			monsterID: 'test-monster1',
			count: 1
		} as EncounterSlot;
		const group = {
			slots: [ slot ]
		} as EncounterGroup;
		const encounter = {
			groups: [ group ] as EncounterGroup[],
			terrain: [] as TerrainSlot[]
		} as Encounter;
		const result = EncounterDifficultyLogic.getStrength(encounter, [], 0);

		expect(result).toBe(3);
	});

	/**
	 * 2 groups with 6 minions each - 3 total groups
	 */
	test('correctly calculates the strength of an encounter with minions split across groups', () => {
		vi.spyOn(EncounterLogic, 'getCustomizedMonster').mockReturnValue(mockMinion);

		const slot = {
			monsterID: 'test-minion1',
			count: 1,
			customization: { minionCountAdjustment: 2 }
		} as EncounterSlot;
		const group = {
			slots: [ slot ]
		} as EncounterGroup;
		const encounter = {
			groups: [ group, group ] as EncounterGroup[],
			terrain: [] as TerrainSlot[]
		} as Encounter;
		const result = EncounterDifficultyLogic.getStrength(encounter, [], 0);

		expect(result).toBe(9);
	});
});
