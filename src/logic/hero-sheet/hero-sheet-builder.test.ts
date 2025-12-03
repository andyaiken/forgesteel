/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FeatureCompanion, FeatureFollower, FeatureRetainer, FeatureSummonChoice, FeatureSummonChoiceData } from '@/models/feature';
import { afterEach, describe, expect, expectTypeOf, test, vi } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { FollowerSheet } from '@/models/classic-sheets/hero-sheet';
import { FollowerType } from '@/enums/follower-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroSheetBuilder } from '@/logic/hero-sheet/hero-sheet-builder';
import { Monster } from '@/models/monster';
import { MonsterData } from '@/data/monster-data';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { Summon } from '@/models/summon';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { highElfTactician } from '@/data/heroes/high-elf-tactician';
import { retainer } from '@/data/monsters/retainer';
import { undead } from '@/data/classes/summoner/undead';

afterEach(() => {
	vi.resetAllMocks();
});

describe('buildSummonSheet', () => {
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

// #region Mock data
const mockHero = { id: 'test123' } as Hero;

const mockArtisan = FactoryLogic.createFollower(FollowerType.Artisan);
const mockFeatureFollower = {
	id: 'mock-follower',
	name: 'Mock Follower',
	type: FeatureType.Follower,
	data: {
		follower: mockArtisan
	}
} as FeatureFollower;

const testCompanionMonster = MonsterData.undead.monsters[0];
const mockFeatureCompanion = {
	id: 'mock-companion',
	name: 'Mock Companion',
	type: FeatureType.Companion,
	data: {
		selected: testCompanionMonster
	}
} as FeatureCompanion;

const retainer1 = retainer.monsters[0];
const mockFeatureRetainer = {
	id: 'mock-retainer',
	name: 'Mock Retainer',
	type: FeatureType.Retainer,
	data: {
		selected: retainer1
	}
} as FeatureRetainer;

const undeadSignatureChoices = undead.featuresByLevel.find(fbl => fbl.level === 1)
	?.features.find(f => f.id === 'summoner-4-1-4')?.data as FeatureSummonChoiceData;
const minionSummon1 = undeadSignatureChoices.options.find(o => o.monster.id === 'summoner-4-1-4a') as Summon;

const beastheartCompanionChoices = beastheart.featuresByLevel.find(fbl => fbl.level === 1)
	?.features.find(f => f.id === 'beastheart-1-2a')?.data as FeatureSummonChoiceData;
const companion1 = beastheartCompanionChoices.options.find(o => o.monster.id === 'beastheart-1-2a-1') as Summon;

const mockSummonChoiceFeature = {
	id: 'mock-summon-chouice',
	name: 'Mock Summon Choice',
	type: FeatureType.SummonChoice,
	data: {
		selected: [ companion1, minionSummon1 ]
	}
} as FeatureSummonChoice;
// #endregion

describe('buildFollowerCompanionSheet()', () => {
	test('it should call the correct builder method for Follower features', () => {
		const mockResult = { id: 'foo' } as FollowerSheet;
		const mockBuilderMethod = vi.spyOn(HeroSheetBuilder, 'buildFollowerSheet').mockReturnValueOnce(mockResult);

		const result = HeroSheetBuilder.buildFollowerCompanionSheet(mockFeatureFollower, mockHero);

		expect(mockBuilderMethod).toHaveBeenCalledExactlyOnceWith(mockArtisan);
		expect(result).toBe(mockResult);
	});

	test('it should call the correct builder method for Companion features', () => {
		const mockResult = { id: 'bar' } as FollowerSheet;
		const mockBuilderMethod = vi.spyOn(HeroSheetBuilder, 'buildRetainerSheet').mockReturnValueOnce(mockResult);

		const result = HeroSheetBuilder.buildFollowerCompanionSheet(mockFeatureCompanion, mockHero);

		expect(mockBuilderMethod).toHaveBeenCalledExactlyOnceWith(testCompanionMonster, undefined);
		expect(result).toBe(mockResult);
	});

	test('it should call the correct builder method for Retainer features', () => {
		const mockResult = { id: 'bar' } as FollowerSheet;
		const mockBuilderMethod = vi.spyOn(HeroSheetBuilder, 'buildRetainerSheet').mockReturnValueOnce(mockResult);

		const result = HeroSheetBuilder.buildFollowerCompanionSheet(mockFeatureRetainer, mockHero);

		expect(mockBuilderMethod).toHaveBeenCalledExactlyOnceWith(retainer1, undefined);
		expect(result).toBe(mockResult);
	});

	test('it should call the correct builder method for Summoner selection features', () => {
		const mockSheet1 = { id: 'companion-1' } as FollowerSheet;

		const mockBuilderMethod = vi.spyOn(HeroSheetBuilder, 'buildCompanionSheet')
			.mockReturnValueOnce(mockSheet1);

		const result = HeroSheetBuilder.buildFollowerCompanionSheet(mockSummonChoiceFeature, mockHero);

		expect(mockBuilderMethod).toHaveBeenCalledExactlyOnceWith(companion1, mockHero);
		expect(result).toBeDefined();
		expect(result).not.toBeNullable();

		// @ts-ignore we are asserting all this stuff it's compaining about
		expectTypeOf(result).toBeArray();
		// @ts-ignore
		expect(result.length).toBe(1);
		// @ts-ignore
		expect(result[0]).toBe(mockSheet1);
	});
});

describe('buildRetainerSheet', () => {
	const humanWarrior = retainer.monsters.find(m => m.id === 'retainer-12') as Monster;

	test.each([
		[ 1, 0 ],
		[ 4, 1 ],
		[ 7, 2 ],
		[ 10, 3 ]
	])('should limit advancement features included based on level', (level, numAdvancements) => {
		const sheet = HeroSheetBuilder.buildRetainerSheet(humanWarrior, level);
		expect(sheet.advancement?.length).toBe(numAdvancements);
	});
});

describe('buildHeroSheet', () => {
	vi.unmock('@/logic/hero-logic');

	test('it should build follower sheets for all correct types of follower/companion features', () => {
		const hero = highElfTactician;
		const sourcebooks: Sourcebook[] = [];
		const options = {} as Options;

		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([
			{ feature: mockFeatureRetainer, source: 'test' },
			{ feature: mockFeatureFollower, source: 'test' },
			{ feature: mockFeatureCompanion, source: 'test' },
			{ feature: mockSummonChoiceFeature, source: 'test' }
		]);

		const result = HeroSheetBuilder.buildHeroSheet(hero, sourcebooks, options);

		expect(result).toBeDefined();
		expect(result).not.toBeNullable();
		expect(result.followers.length).toBe(4);
	});
});
