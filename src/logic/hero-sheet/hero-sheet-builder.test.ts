import { afterEach, describe, expect, test, vi } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureSummonChoice } from '@/models/feature';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroSheetBuilder } from '@/logic/hero-sheet/hero-sheet-builder';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Summon } from '@/models/summon';
import { undead } from '@/data/classes/summoner/undead';

describe('buildSummonSheet', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	vi.mock('@/logic/hero-logic', () => {
		const HeroLogic = vi.fn();
		return { HeroLogic: HeroLogic };
	});

	test('it builds sheets for Summoner minions properly', () => {
		const signatureMinions = undead.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-4') as FeatureSummonChoice;
		const skeleton = signatureMinions.data.options.find(o => o.id === 'summoner-4-1-4c') as Summon;
		const summoner = FactoryLogic.createHero([]);
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(2);

		const sheet = HeroSheetBuilder.buildSummonSheet(skeleton, summoner);
		expect(sheet).not.toBeNull();
		expect(sheet.id).toBe('summoner-4-1-4c');
		expect(sheet.name).toBe('Skeleton');
		expect(sheet.type).toBe('Signature Minion Harrier');
		expect(sheet.role).toBe(MonsterRoleType.Harrier);

		expect(sheet.characteristics.might).toBe(-2);
		expect(sheet.characteristics.agility).toBe(2);
		expect(sheet.characteristics.reason).toBe(0);
		expect(sheet.characteristics.intuition).toBe(0);
		expect(sheet.characteristics.presence).toBe(-2);

		expect(sheet.keywords).toBe('Undead');
		expect(sheet.cost).toBe('1 essence per minion summoned');

		expect(sheet.size).toBe('1M');
		expect(sheet.speed).toBe(6);
		expect(sheet.stamina).toBe(2);
		expect(sheet.stability).toBe(0);
		expect(sheet.freeStrike).toBe(1);

		expect(sheet.immunity).toBe('Corruption 2, Poison 2');
		expect(sheet.weakness).toBe('');
		expect(sheet.movement).toBe('');
		expect(sheet.freeStrikeDamageType).toBe('');
	});
});
