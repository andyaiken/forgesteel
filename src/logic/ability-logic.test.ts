import { afterEach, assert, describe, expect, it, test, vi } from 'vitest';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from '@/logic/ability-logic';
import { Characteristic } from '@/enums/characteristic';
import { CreatureLogic } from '@/logic/creature-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';

describe('getPowerRollCharacteristics', () => {
	afterEach(() => {
		vi.resetAllMocks();
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

describe('getTextEffect', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	vi.mock('@/logic/hero-logic', () => {
		const HeroLogic = vi.fn();
		return { HeroLogic: HeroLogic };
	});
	HeroLogic.getPotency = vi.fn();

	it('should calculate constant dice roll effects properly when no hero is provided', () => {
		expect(AbilityLogic.getTextEffect('Value equal to 1d6 + 2', undefined)).toBe('Value equal to 1d6 + 2');
	});

	it('should calculate constant dice roll effects properly when a hero is provided', () => {
		const hero = {} as Hero;
		expect(AbilityLogic.getTextEffect('Value equal to 1d6 + 2', hero)).toBe('Value equal to 1d6 + 2');
	});

	test.each([
		[ '<weak', 0, '< 0' ],
		[ '< avg', 2, '< 2' ],
		[ '< average', 1, '< 1' ],
		[ '<strong', 5, '< 5' ]
	])('should properly swap in the correct Hero potency value', (text: string, potency: number, expected: string) => {
		const hero = {} as Hero;
		HeroLogic.getPotency = vi.fn().mockReturnValue(potency);

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});

	test.each([
		[ 'equal to your level', 1, 'equal to 1' ],
		[ 'equal to 2 + your level', 1, 'equal to 3' ]
	])('should properly calculate references to hero level', (text: string, level: number, expected: string) => {
		const hero = {
			class: { level: level }
		} as Hero;

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});

	test.each([
		[ 'equal to 1d6 + your level', 2, 'equal to 1d6 + 2' ],
		[ 'equal to 1d6 + twice your level', 3, 'equal to 1d6 + 6' ]
	])('should properly calculate combinations of dice rolls and hero level', (text: string, level: number, expected: string) => {
		const hero = {
			class: { level: level }
		} as Hero;

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});
});
