import { afterEach, assert, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from '@/logic/ability-logic';
import { Characteristic } from '@/enums/characteristic';
import { CreatureLogic } from '@/logic/creature-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';

vi.mock('@/logic/creature-logic', () => {
	const CreatureLogic = vi.fn();
	return { CreatureLogic: CreatureLogic };
});

vi.mock('@/logic/hero-logic', () => {
	const HeroLogic = vi.fn();
	return { HeroLogic: HeroLogic };
});

describe('getPowerRollCharacteristics', () => {
	afterEach(() => {
		vi.resetAllMocks();
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

		const hero = FactoryLogic.createHero();

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

		const hero = FactoryLogic.createHero();

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

	test.each([
		[ 'equal to three times your Agility score', 1, 'equal to 3' ],
		[ 'equal to 3 times your Agility score', 1, 'equal to 3' ]
	])('should properly calculate multiplier references to characteristics', (text, characteristic, expected) => {
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(characteristic);
		const hero = {} as Hero;

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});

	test.each([
		[ 'Regain 5 + M', 'Regain 8' ],
		[ 'Regain 5 + 2M', 'Regain 11' ],
		[ 'Regain 5 + 2m', 'Regain 11' ],
		[ 'Regain 5 + 2 x Might', 'Regain 11' ],
		[ 'Regain 5 + 2×Might', 'Regain 11' ]
	])('should properly apply a multiplier on a short-form characteristic reference (%s)', (text, expected) => {
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(3);
		const hero = {} as Hero;

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});

	test.each([
		[ 'A<0 restrained (save ends)', '`A<0` **restrained** (save ends)' ],
		[ 'the target is dazed and slowed (save ends)', 'the target is **dazed** and **slowed** (save ends)' ],
		[ 'the target takes 3 fire damage', 'the target takes 3 fire damage' ]
	])('should bold known condition names (%s)', (text, expected) => {
		expect(AbilityLogic.getTextEffect(text, undefined)).toBe(expected);
	});

	test.each([
		[ 'Push 1', 'Push 2' ],
		[ 'pushed 2 squares away', 'pushed 3 squares away' ],
		[ 'pulled 5 squares', 'pulled 6 squares' ],
		[ 'slides 3 squares', 'slides 4 squares' ],
		[ 'slid 2 squares', 'slid 3 squares' ]
	])('should apply the forced movement bonus to push/pull/slide text regardless of verb conjugation (%s)', (text, expected) => {
		HeroLogic.getForcedMovementBonus = vi.fn().mockReturnValue(1);
		const hero = {} as Hero;

		expect(AbilityLogic.getTextEffect(text, hero)).toBe(expected);
	});
});

describe('getTierEffect', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const ability = AbilityData.freeStrikeMelee;
	const hero = {} as Hero;

	beforeEach(() => {
		HeroLogic.getFeatures = vi.fn().mockReturnValue([]);
		HeroLogic.getKitDamageBonuses = vi.fn().mockReturnValue([]);
		HeroLogic.getFeatureDamageBonuses = vi.fn().mockReturnValue([]);
		HeroLogic.getRolledDamageBonus = vi.fn().mockReturnValue(0);
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(3);
		HeroLogic.getPotency = vi.fn().mockReturnValue(0);
		HeroLogic.getForcedMovementBonus = vi.fn().mockReturnValue(0);
	});

	test.each([
		[ '5 + 2M damage', '11 damage' ],
		[ '7 + 3M damage', '16 damage' ],
		[ '10 + 4M damage', '22 damage' ],
		[ '5 + 2m damage', '11 damage' ],
		[ '5 + 2 x M damage', '11 damage' ],
		[ '5 + 2 x Might damage', '11 damage' ],
		[ '5 + 2×Might damage', '11 damage' ]
	])('should apply a per-tier characteristic multiplier (%s)', (text, expected) => {
		expect(AbilityLogic.getTierEffect(text, 1, ability, undefined, hero)).toBe(expected);
	});

	it('should still support a bare, unmultiplied characteristic reference', () => {
		expect(AbilityLogic.getTierEffect('3 + M damage', 1, ability, undefined, hero)).toBe('6 damage');
	});

	it('should still take the max of an "or" list of bare characteristics', () => {
		HeroLogic.getCharacteristic = vi.fn().mockImplementation((_hero: Hero, characteristic: Characteristic) => {
			return characteristic === Characteristic.Agility ? 5 : 3;
		});

		expect(AbilityLogic.getTierEffect('3 + M or A damage', 1, ability, undefined, hero)).toBe('8 damage');
	});

	it('should combine a later untyped damage section into the primary (typed) damage section', () => {
		const text = '2 corruption damage; A<0 restrained (save ends); +4 damage';
		expect(AbilityLogic.getTierEffect(text, 1, ability, undefined, hero)).toBe('6 corruption damage; `A<0` **restrained** (save ends)');
	});

	it('should combine a later damage section that repeats the same type', () => {
		expect(AbilityLogic.getTierEffect('2 corruption damage; +4 corruption damage', 1, ability, undefined, hero)).toBe('6 corruption damage');
	});

	it('should NOT combine damage sections that specify different types', () => {
		expect(AbilityLogic.getTierEffect('2 lightning damage; 2 sonic damage', 1, ability, undefined, hero)).toBe('2 lightning damage; 2 sonic damage');
	});

	it('should NOT combine a later damage section that is conditional', () => {
		const text = '3 damage; if the target is prone, an extra 2 damage';
		expect(AbilityLogic.getTierEffect(text, 1, ability, undefined, hero)).toBe('3 damage; if the target is **prone**, an extra 2 damage');
	});

	it('should NOT combine a later conditional damage section even if it repeats the primary type', () => {
		const text = '3 fire damage; if burning, an extra 2 fire damage';
		expect(AbilityLogic.getTierEffect(text, 1, ability, undefined, hero)).toBe(text);
	});
});

describe('getTierEffectRetainer', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const ability = { cost: 1 } as Ability;
	const retainer = {} as Monster;

	it('should combine a later untyped damage section into the primary (typed) damage section', () => {
		const text = '2 corruption damage; A<0 restrained (save ends); +4 damage';
		expect(AbilityLogic.getTierEffectRetainer(text, 1, ability, retainer)).toBe('6 corruption damage; `A<0` **restrained** (save ends)');
	});

	it('should combine a later damage section that repeats the same type', () => {
		expect(AbilityLogic.getTierEffectRetainer('2 corruption damage; +4 corruption damage', 1, ability, retainer)).toBe('6 corruption damage');
	});

	it('should NOT combine damage sections that specify different types', () => {
		expect(AbilityLogic.getTierEffectRetainer('2 lightning damage; 2 sonic damage', 1, ability, retainer)).toBe('2 lightning damage; 2 sonic damage');
	});

	it('should NOT combine a later damage section that is conditional', () => {
		const text = '3 damage; if the target is prone, an extra 2 damage';
		expect(AbilityLogic.getTierEffectRetainer(text, 1, ability, retainer)).toBe('3  damage; if the target is **prone**, an extra 2 damage');
	});

	it('should NOT combine a later conditional damage section even if it repeats the primary type', () => {
		const text = '3 fire damage; if burning, an extra 2 fire damage';
		expect(AbilityLogic.getTierEffectRetainer(text, 1, ability, retainer)).toBe(text);
	});
});

describe('getPowerRollBonusValue', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const createAbility = (roll: { characteristic?: Characteristic, bonus?: number, tier1: string }) => {
		return FactoryLogic.createAbility({
			id: 'test-ability',
			name: 'Test Ability',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: roll.characteristic,
					bonus: roll.bonus,
					tier1: roll.tier1,
					tier2: '',
					tier3: ''
				}))
			]
		});
	};

	const monster = {} as Monster;

	const mockMonster = (characteristics: Partial<Record<Characteristic, number>>) => {
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isMonster = vi.fn().mockReturnValue(true);
		CreatureLogic.getCharacteristic = vi.fn().mockImplementation((_creature, ch: Characteristic) => characteristics[ch] ?? 0);
	};

	beforeEach(() => {
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isHero = vi.fn().mockReturnValue(false);
		// @ts-expect-error doesn't like me mocking a typeguard
		CreatureLogic.isMonster = vi.fn().mockReturnValue(false);
	});

	it('should use the stated bonus when the roll has no characteristic', () => {
		const ability = createAbility({ bonus: 5, tier1: '16 damage; M < 4 the target loses 1d3 recoveries' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, monster)).toBe(5);
	});

	it('should use a monster\'s highest characteristic when no bonus is stated', () => {
		mockMonster({ [Characteristic.Might]: 2, [Characteristic.Agility]: 1, [Characteristic.Reason]: 4, [Characteristic.Intuition]: 4, [Characteristic.Presence]: 2 });

		const ability = createAbility({ tier1: '3 damage; M < 2 push (see effect)' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, monster)).toBe(4);
	});

	it('should prefer a stated bonus to a monster\'s highest characteristic', () => {
		mockMonster({ [Characteristic.Might]: 5 });

		const ability = createAbility({ bonus: 4, tier1: '3 damage' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, monster)).toBe(4);
	});

	it('should infer the bonus from the potency when there is no creature to read it from', () => {
		const ability = createAbility({ tier1: '7 cold damage; P<3 slowed (save ends)' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, undefined)).toBe(3);
	});

	it('should infer the bonus from a potency written with spaces around the comparator', () => {
		const ability = createAbility({ tier1: '7 cold damage; P < 3 slowed (save ends)' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, undefined)).toBe(3);
	});

	it('should fall back to the echelon 1 minimum with no bonus, no creature and no potency', () => {
		const ability = createAbility({ tier1: '6 damage; vertical push 3' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, undefined)).toBe(2);
	});

	it('should use the creature characteristic in preference to a stated bonus', () => {
		CreatureLogic.getCharacteristic = vi.fn().mockReturnValue(3);

		const ability = createAbility({ characteristic: Characteristic.Reason, bonus: 5, tier1: '5 corruption damage' });
		expect(AbilityLogic.getPowerRollBonusValue(ability, monster)).toBe(3);
	});
});
