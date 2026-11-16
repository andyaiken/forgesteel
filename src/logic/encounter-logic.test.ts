import { FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Encounter } from '@/models/encounter';
import { EncounterLogic } from '@/logic/encounter-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterData } from '@/data/monster-data';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Utils } from '@/utils/utils';

describe('getAllMaliceFeatures', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('returns the basic malice features', () => {
		const encounter = {} as Encounter;
		vi.spyOn(EncounterLogic, 'getMonsterGroups').mockReturnValue([]);

		const result = EncounterLogic.getAllMaliceFeatures(encounter, []);

		expect(result.length).toBe(1);
		MonsterData.malice.forEach(malice => {
			expect(result[0].features).toContain(malice);
		});
	});

	test('returns relevant monster group malice features', () => {
		const encounter = {} as Encounter;
		const malice1 = { id: 'fake-1' } as FeatureMalice;
		const malice2 = { id: 'fake-2' } as FeatureMaliceAbility;
		const group1 = { name: 'testGroup', malice: [ malice1, malice2 ] } as MonsterGroup;
		vi.spyOn(EncounterLogic, 'getMonsterGroups').mockReturnValue([
			group1
		]);

		const result = EncounterLogic.getAllMaliceFeatures(encounter, []);
		expect(result.length).toBe(2);
		const resultGroup = result.find(g => g.group === 'testGroup');
		expect(resultGroup?.features).toContain(malice1);
		expect(resultGroup?.features).toContain(malice2);
	});
});

describe('removeMonsterFromSlot', () => {
	// A squad of four minions with 5 Stamina each
	const createSquad = () => {
		const minion = FactoryLogic.createMonster({
			id: 'minion',
			name: 'Minion',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion),
			keywords: [],
			encounterValue: 1,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
			features: []
		});

		const slot = FactoryLogic.createEncounterSlotFromMonster(minion);
		while (slot.monsters.length < 4) {
			const m = Utils.copy(minion);
			m.id = Utils.guid();
			slot.monsters.push(m);
		}
		return slot;
	};

	test('removes an active minion without changing the damage the squad has taken', () => {
		const slot = createSquad();
		slot.state.staminaDamage = 5;
		slot.monsters[0].state.defeated = true;

		EncounterLogic.removeMonsterFromSlot(slot, slot.monsters[1].id);

		expect(slot.monsters.length).toBe(3);
		expect(slot.state.staminaDamage).toBe(5);
		expect(MonsterLogic.getExpectedMinionCount(slot)).toBe(2);
	});

	test('removes the damage that defeated a minion along with it', () => {
		const slot = createSquad();
		slot.state.staminaDamage = 7;
		slot.monsters[0].state.defeated = true;

		EncounterLogic.removeMonsterFromSlot(slot, slot.monsters[0].id);

		expect(slot.monsters.length).toBe(3);
		expect(slot.state.staminaDamage).toBe(2);
		expect(MonsterLogic.getExpectedMinionCount(slot)).toBe(3);
	});

	test('never leaves the squad with negative damage', () => {
		const slot = createSquad();
		slot.state.staminaDamage = 2;
		slot.monsters[0].state.defeated = true;

		EncounterLogic.removeMonsterFromSlot(slot, slot.monsters[0].id);

		expect(slot.state.staminaDamage).toBe(0);
	});

	test('does nothing for a monster that is not in the slot', () => {
		const slot = createSquad();

		EncounterLogic.removeMonsterFromSlot(slot, 'not-a-monster');

		expect(slot.monsters.length).toBe(4);
	});
});
