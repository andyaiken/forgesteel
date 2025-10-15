import { afterEach, assert, describe, expect, test, vi } from 'vitest';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from './ability-logic';
import { Characteristic } from '@/enums/characteristic';
import { CreatureLogic } from './creature-logic';
import { FactoryLogic } from './factory-logic';
import { HeroLogic } from './hero-logic';

describe('getPowerRollCharacteristics', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	vi.mock('@/logic/creature-logic', () => {
		const CreatureLogic = vi.fn();
		return { CreatureLogic: CreatureLogic };
	});

	vi.mock('@/logic/hero-logic', () => {
		const HeroLogic = vi.fn();
		return { HeroLogic: HeroLogic };
	});

	test.each([
		[ AbilityData.freeStrikeMelee, [ Characteristic.Might, Characteristic.Agility ] ],
		[ AbilityData.grab, [ Characteristic.Might ] ]
	])('should return the Ability RollSection characteristics when no creature is passed', (ability: Ability, expected: Characteristic[]) => {
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isHero = vi.fn().mockReturnValue(false);

		const result = AbilityLogic.getPowerRollCharacteristics(ability, undefined);
		expect(result.length).toBe(expected.length);
		expected.every(c => assert(result.includes(c), `expected result to include ${c}`));
	});

	test('should NOT swap Might for Intuition on Grab and Knockback for heroes withOUT Psionic Martial Arts', () => {
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isHero = vi.fn().mockReturnValue(true);
		HeroLogic.getFeatures = vi.fn().mockReturnValue([]);

		const hero = FactoryLogic.createHero([]);

		[ AbilityData.grab, AbilityData.knockback ].forEach(ability => {
			const result = AbilityLogic.getPowerRollCharacteristics(ability, hero);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(Characteristic.Might);
		});
	});

	test('should swap Might for Intuition on Grab and Knockback for Nulls with Psionic Martial Arts', () => {
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isHero = vi.fn().mockReturnValue(true);
		HeroLogic.getFeatures = vi.fn().mockReturnValue([ { feature: { id: 'null-1-8' } } ]); // Psionic Martial Arts id

		const hero = FactoryLogic.createHero([]);

		[ AbilityData.grab, AbilityData.knockback ].forEach(ability => {
			const result = AbilityLogic.getPowerRollCharacteristics(ability, hero);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(Characteristic.Intuition);
		});
	});
});
