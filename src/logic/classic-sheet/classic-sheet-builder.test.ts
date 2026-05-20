import { afterEach, describe, expect, test, vi } from 'vitest';
import { angryBeehive, corrosivePool, frozenPond } from '@/data/terrain/environmental-hazards';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from '@/logic/ability-logic';
import { ArtifactData } from '@/data/items/artifact-data';
import { Characteristic } from '@/enums/characteristic';
import { ClassicSheetBuilder } from '@/logic/classic-sheet/classic-sheet-builder';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';
import { ajax } from '@/data/monsters/ajax';
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

	test('if a Hero does NOT has multiple kits that apply, rollBonuses is empty', () => {
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		const result = ClassicSheetBuilder.buildAbilitySheet(AbilityData.escapeGrab, hero, undefined, options);
		expect(result.rollBonuses).toBeNullable();
	});

	test('if a Hero has multiple kits that apply, rollBonuses gets populated', () => {
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		vi.spyOn(HeroLogic, 'getKitDamageBonuses').mockReturnValue([
			{ name: 'Melee 1', type: 'melee', tier1: 1, tier2: 1, tier3: 1 },
			{ name: 'Melee 2', type: 'melee', tier1: 0, tier2: 0, tier3: 4 }
		]);

		const result = ClassicSheetBuilder.buildAbilitySheet(AbilityData.freeStrikeMelee, hero, undefined, options);
		expect(result.rollBonuses?.length).toBe(2);
	});

	test('if a Hero has multiple kits that apply, rollBonuses gets populated', () => {
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		vi.spyOn(HeroLogic, 'getKitDamageBonuses').mockReturnValue([
			{ name: 'Melee 1', type: 'ranged', tier1: 1, tier2: 1, tier3: 1 },
			{ name: 'Melee 1', type: 'melee', tier1: 1, tier2: 1, tier3: 1 },
			{ name: 'Melee 2', type: 'ranged', tier1: 0, tier2: 0, tier3: 4 }
		]);

		const result = ClassicSheetBuilder.buildAbilitySheet(AbilityData.freeStrikeRanged, hero, undefined, options);
		expect(result.rollBonuses?.length).toBe(2);
	});

	test('if a Hero has multiple kits but one is always worse, rollBonuses stays empty', () => {
		const hero = FactoryLogic.createHero([]);
		const options = {} as Options;

		vi.spyOn(HeroLogic, 'getKitDamageBonuses').mockReturnValue([
			{ name: 'Melee 1', type: 'melee', tier1: 1, tier2: 1, tier3: 1 },
			{ name: 'Melee 2', type: 'melee', tier1: 0, tier2: 0, tier3: 0 }
		]);

		const result = ClassicSheetBuilder.buildAbilitySheet(AbilityData.freeStrikeMelee, hero, undefined, options);
		expect(result.rollBonuses).toBeNullable();
	});
});

describe('buildMonsterSheet', () => {
	test.each([
		[ goblin.monsters[4], 'Lvl 1 Horde Ambusher' ], // Goblin Assassin
		[ goblin.monsters[0], 'Lvl 1 Minion Harrier' ], // Goblin Runner
		[ ajax.monsters[0], 'Lvl 11 Solo' ]
	])('sets type correctly', (monster, expectedType) => {
		const result = ClassicSheetBuilder.buildMonsterSheet(monster);
		expect(result.type).toBe(expectedType);
	});
});

describe('buildTerrainSheet', () => {
	test.each([
		[ frozenPond, '5 to all damage except fire damage' ],
		[ corrosivePool, '20 to all damage except cold or fire damage' ],
		[ angryBeehive, '' ]
	])('pulls Immunity from sections correctly', (terrain, expectedImmunity) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain);
		expect(result.immunity).toBe(expectedImmunity);
	});

	test.each([
		[ frozenPond, 'The **Slippery Surface** ability.' ],
		[ corrosivePool, 'A creature or object takes' ],
		[ angryBeehive, 'The hive is removed' ]
	])('combines Activate and Effect into one section', (terrain, effectStart) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain);

		const sectionIds = result.sections.map(s => s.id);
		expect(sectionIds).toContain('activate-effect');
		expect(sectionIds).not.toContain('activate');
		expect(sectionIds).not.toContain('effect');

		const aeSection = result.sections.find(s => s.id === 'activate-effect');
		expect(aeSection?.description).toContain(`\n**Effect**: ${effectStart}`);
	});

	test('Does not create an Upgrades section if none are present', () => {
		const result = ClassicSheetBuilder.buildTerrainSheet(corrosivePool);
		const sectionIds = result.sections.map(s => s.id);
		expect(sectionIds).not.toContain('upgrades');
	});

	test.each([
		[ frozenPond, 'Upgrade' ],
		[ angryBeehive, 'Upgrades' ]
	])('label the Upgrade section according to the number of Upgrades', (terrain, expectedSectionName) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain);

		const upgradeSection = result.sections.find(s => s.id === 'upgrades');
		expect(upgradeSection?.name).toBe(expectedSectionName);
	});

	test.each([
		[ frozenPond, [ 'Thin Ice (+1 EV)' ] ],
		[ angryBeehive, [ 'Concealed Hive (+1 EV)', 'Killer Bees (+2 EV)' ] ]
	])('properly combines Upgrades into a single section', (terrain, expectedUpgrades) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain);

		const upgradeSection = result.sections.find(s => s.id === 'upgrades');
		expectedUpgrades.forEach(expectedUpgrade => {
			expect(upgradeSection?.description).toContain(expectedUpgrade);
		});
	});

	test.each([
		[ frozenPond ],
		[ angryBeehive ]
	])('includes Upgrades as a section when no upgradeIds are passed', terrain => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain);

		const sectionIds = result.sections.map(s => s.id);
		expect(sectionIds).toContain('upgrades');
	});

	test.each([
		[ frozenPond, [ 'thin-ice' ] ],
		[ angryBeehive, [ 'killer-bees' ] ],
		[ angryBeehive, [ 'killer-bees', 'concealed-beehive' ] ]
	])('includes selected Upgrades as individual sections when passed to the builder', (terrain, upgradeIds) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain, upgradeIds);

		const sectionIds = result.sections.map(s => s.id);
		expect(sectionIds).not.toContain('upgrades');

		upgradeIds.forEach(upgradeId => {
			expect(sectionIds).toContain(upgradeId);
		});
	});

	test.each([
		[ frozenPond, [ 'thin-ice' ], '2 per 10 x 10 pond' ],
		[ angryBeehive, [ 'killer-bees' ], 4 ],
		[ angryBeehive, [ 'killer-bees', 'concealed-beehive' ], 5 ]
	])('selected upgrades increase the EV of the terrain by the correct amount', (terrain, upgradeIds, expectedEv) => {
		const result = ClassicSheetBuilder.buildTerrainSheet(terrain, upgradeIds);

		expect(result.encounterValue).toBe(expectedEv.toString());
	});
});
