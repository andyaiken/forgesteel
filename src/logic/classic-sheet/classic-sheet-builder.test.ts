import { afterEach, describe, expect, test, vi } from 'vitest';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from '@/logic/ability-logic';
import { ArtifactData } from '@/data/items/artifact-data';
import { Characteristic } from '@/enums/characteristic';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';
import { goblin } from '@/data/monsters/goblin';

describe('buildCharacteristicsSheet', () => {
	test('builds sheet when nothing is passed in', () => {
		const sheet = ClassicSheetBuilder.buildCharacteristicsSheet(undefined);
		expect(sheet.might).toBe(0);
		expect(sheet.agility).toBe(0);
		expect(sheet.reason).toBe(0);
		expect(sheet.intuition).toBe(0);
		expect(sheet.presence).toBe(0);
	});

	test('builds sheets for Monsters as expected', () => {
		const monster = goblin.monsters.find(m => m.id === 'goblin-1');// Goblin Runner

		const sheet = ClassicSheetBuilder.buildCharacteristicsSheet(monster);
		expect(sheet.might).toBe(-2);
		expect(sheet.agility).toBe(2);
		expect(sheet.reason).toBe(0);
		expect(sheet.intuition).toBe(0);
		expect(sheet.presence).toBe(-1);
	});
});

describe('buildItemSheet', () => {
	test('builds artifact sheets correctly', () => {
		const artifact = ArtifactData.bladeOfAThousandYears;
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		const result = ClassicSheetBuilder.buildItemSheet(artifact, hero, options);
		expect(result.effect).toContain('**Suited for Victory**');
		expect(result.effect).toContain('**Turn the Tide**');
	});
});

describe('buildAbilitySheet', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('when showPowerRollCalc is false, uses characteristics', () => {
		const ability = AbilityData.escapeGrab;
		const hero = FactoryLogic.createHero([]);

		const options = {
			showPowerRollCalculation: false
		} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(ability, hero, undefined, options);
		expect(result.rollPower).toBe('M or A');
	});

	test('when showPowerRollCalc is true, calculates value', () => {
		const ability = AbilityData.escapeGrab;
		const hero = FactoryLogic.createHero([]);
		vi.spyOn(HeroLogic, 'getCharacteristic').mockReturnValue(4);

		const options = {
			showPowerRollCalculation: true
		} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(ability, hero, undefined, options);
		expect(result.rollPower).toBe('4');
	});

	test.each([
		[ AbilityData.advance, true ],
		[ AbilityData.escapeGrab, false ]
	])('properly sets isNotTrueAbility for non-ability abilities', (ability: Ability, expected: boolean) => {
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(ability, hero, undefined, options);
		expect(result.isNotTrueAbility).toBe(expected);
	});

	test('power roll is displayed properly', () => {
		const ability = AbilityData.escapeGrab;
		vi.spyOn(AbilityLogic, 'getPowerRollCharacteristics').mockReturnValue([
			Characteristic.Reason,
			Characteristic.Presence
		]);
		const hero = FactoryLogic.createHero([]);
		const options = {
			showPowerRollCalculation: false
		} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(ability, hero, undefined, options);
		expect(result.rollPower).toBe('R or P');
	});

	test('if a power roll can use any characteristic, clean up the text', () => {
		const ability = AbilityData.escapeGrab;
		vi.spyOn(AbilityLogic, 'getPowerRollCharacteristics').mockReturnValue([
			Characteristic.Reason,
			Characteristic.Intuition,
			Characteristic.Presence,
			Characteristic.Agility,
			Characteristic.Might
		]);
		const hero = FactoryLogic.createHero([]);
		const options = {
			showPowerRollCalculation: false
		} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(ability, hero, undefined, options);
		expect(result.rollPower).toBe('Highest Characteristic');
	});
});
