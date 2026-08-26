import { FeatureCompanion, FeatureFollower, FeatureRetainer, FeatureSummon, FeatureSummonChoice, FeatureSummonChoiceData } from '@/models/feature';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { AncestryData } from '@/data/ancestry-data';
import { Complication } from '@/models/complication';
import { ComplicationData } from '@/data/complication-data';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
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
import { PregenData } from '@/data/pregen-data';
import { PregenLogic } from '../pregen-logic';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { Summon } from '@/models/summon';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { berserker } from '@/data/classes/fury/berserker';
import { boren } from '@/data/kits/stormwight/boren';
import { circleOfGraves } from '@/data/classes/summoner/graves';
import { circleofStorms } from '@/data/classes/summoner/storms';
import { core } from '@/data/sourcebooks/official/core';
import { fury } from '@/data/classes/fury/fury';
import { nullClass } from '@/data/classes/null/null';
import { orden } from '@/data/sourcebooks/official/orden';
import { retainer } from '@/data/monsters/retainer';
import { stormwight } from '@/data/classes/fury/stormwight';

vi.mock('@/logic/hero-logic', () => {
	const HeroLogic = vi.fn();
	return { HeroLogic: HeroLogic };
});
vi.unmock('@/logic/hero-logic');

afterEach(() => {
	vi.resetAllMocks();
});

describe('buildSummonSheet', () => {
	test('it builds sheets for Summoner minions properly', () => {
		const signatureMinions = circleOfGraves.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-4') as FeatureSummonChoice;
		const skeleton = signatureMinions.data.options.find(o => o.id === 'summoner-4-1-4c') as Summon;
		const summoner = FactoryLogic.createHero();
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

	test('minion abilities cost essence, not malice', () => {
		const minions = circleofStorms.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-2-1-6') as FeatureSummonChoice;
		const crux = minions.data.options.find(o => o.id === 'summoner-2-1-6a') as Summon;
		const summoner = FactoryLogic.createHero();
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(2);

		const sheet = HeroSheetBuilder.buildSummonSheet(crux, summoner);
		const ability = sheet.abilities?.find(a => a.name === 'Ashen Cloud');
		expect(ability).toBeDefined();
		expect(ability?.abilityType).toBe('1 Essence');
	});

	test('minion power rolls use the summoner\'s characteristic', () => {
		const minions = circleOfGraves.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-5') as FeatureSummonChoice;
		const graveKnight = minions.data.options.find(o => o.id === 'summoner-4-1-5a') as Summon;
		const summoner = FactoryLogic.createHero();
		HeroLogic.getCharacteristic = vi.fn().mockReturnValue(3);

		// Knight Strike rolls Reason - the grave knight's own Reason is 0, the summoner's is 3
		const sheet = HeroSheetBuilder.buildSummonSheet(graveKnight, summoner);
		const ability = sheet.abilities?.find(a => a.name === 'Knight Strike');
		const powerRoll = ability?.sections?.find(s => typeof s !== 'string' && 'rollPower' in s);
		expect(powerRoll).toBeDefined();
		expect(powerRoll).toHaveProperty('rollPower', '3');
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

const undeadSignatureChoices = circleOfGraves.featuresByLevel.find(fbl => fbl.level === 1)
	?.features.find(f => f.id === 'summoner-4-1-4')?.data as FeatureSummonChoiceData;
const minionSummon1 = undeadSignatureChoices.options.find(o => o.monster.id === 'summoner-4-1-4a') as Summon;

const beastheartCompanionChoices = beastheart.featuresByLevel.find(fbl => fbl.level === 1)
	?.features.find(f => f.id === 'beastheart-1-2a')?.data as FeatureSummonChoiceData;
const companion1 = beastheartCompanionChoices.options.find(o => o.monster.id === 'beastheart-companion-1') as Summon;

const mockSummonChoiceFeature = {
	id: 'mock-summon-choice',
	name: 'Mock Summon Choice',
	type: FeatureType.SummonChoice,
	data: {
		selected: [ companion1, minionSummon1 ]
	}
} as FeatureSummonChoice;

const mockSummonFeature = {
	id: 'mock-summon',
	name: 'Mock Summon',
	type: FeatureType.Summon,
	data: {
		summons: [ minionSummon1 ]
	}
} as FeatureSummon;
// #endregion

describe('buildCompanionSheet', () => {
	const buildBeastheartHero = (level: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(beastheart);
		hero.class.level = level;
		return hero;
	};

	test('it should apply the beastheart companion characteristic bonus that scales with hero level', () => {
		const heroAtLevel1 = buildBeastheartHero(1);
		const heroAtLevel4 = buildBeastheartHero(4);

		const sheetAtLevel1 = HeroSheetBuilder.buildCompanionSheet(companion1, heroAtLevel1);
		const sheetAtLevel4 = HeroSheetBuilder.buildCompanionSheet(companion1, heroAtLevel4);

		expect(sheetAtLevel1.characteristics.might).toBe(2);
		expect(sheetAtLevel1.characteristics.intuition).toBe(2);
		expect(sheetAtLevel4.characteristics.might).toBe(3);
		expect(sheetAtLevel4.characteristics.intuition).toBe(3);
	});
});

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
});

describe('buildRetainerSheet', () => {
	const humanWarrior = retainer.monsters.find(m => m.id === 'retainer-12') as Monster;

	test.each([
		[ 1, 3 ],
		[ 4, 2 ],
		[ 7, 1 ],
		[ 10, 0 ]
	])('should limit advancement features included based on level', (level, numAdvancements) => {
		const sheet = HeroSheetBuilder.buildRetainerSheet(humanWarrior, level);
		expect(sheet.advancement?.length).toBe(numAdvancements);
	});
});

describe('buildHeroSheet', () => {
	const buildComplicationFeature = (id: string, complication: Complication) => {
		const feature = FactoryLogic.feature.createComplication({ id: id });
		feature.data.selected = Utils.copy(complication);
		return feature;
	};
	test('it should build follower sheets for all correct types of follower/companion features', () => {
		const pregen = PregenData.getPregens()[0];
		const options = { xpPerLevel: 16 } as Options;
		const hero = PregenLogic.pregenToHero(pregen, [ core, orden ], options);
		const sourcebooks: Sourcebook[] = [];

		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([
			{ feature: mockFeatureRetainer, source: 'test', level: 1 },
			{ feature: mockFeatureFollower, source: 'test', level: 1 },
			{ feature: mockFeatureCompanion, source: 'test', level: 1 },
			{ feature: mockSummonChoiceFeature, source: 'test', level: 1 },
			{ feature: mockSummonFeature, source: 'test', level: 1 }
		]);

		const result = HeroSheetBuilder.buildHeroSheet(hero, sourcebooks, options);

		expect(result).toBeDefined();
		expect(result).not.toBeNullable();
		expect(result.followers.length).toBe(4);
		expect(result.summons.length).toBe(2);
	});

	test('it marks only the hero\'s own skills with their test modifiers', () => {
		const hero = FactoryLogic.createHero();
		const options = { xpPerLevel: 16 } as Options;

		const skillChoice = FactoryLogic.feature.createSkillChoice({ id: 'test-skills', selected: [ 'Sneak' ] });
		// Scoped to the whole Intrigue group, which also covers skills the hero doesn't have
		const groupModifier = FactoryLogic.feature.createRollModifier({
			id: 'roll-modifier',
			modifier: RollModifierType.Edge,
			skillLists: [ SkillList.Intrigue ]
		});

		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([
			{ feature: skillChoice, source: 'test', level: 1 },
			{ feature: groupModifier, source: 'test', level: 1 }
		]);

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], options);

		expect(result.skillRollModifiers?.get('Sneak')).toEqual([ RollModifierType.Edge ]);
		// Hide is also an Intrigue skill, but the hero doesn't have it
		expect(result.skillRollModifiers?.get('Hide')).toBeUndefined();
	});

	test('it should not report unlocked heroic resource threshold benefits as missed features', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = 10;
		hero.class.subclasses.filter(sc => sc.id === berserker.id).forEach(sc => sc.selected = true);
		// At 12 ferocity every Growing Ferocity rung is unlocked, so its benefit is collated onto the hero
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.value = 12);

		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const result = HeroSheetBuilder.buildHeroSheet(hero, [], {} as Options);

		expect(warn.mock.calls.filter(c => String(c[0]).includes('Missed features'))).toEqual([]);
		expect((result.featuresReferenceOther || []).map(f => f.feature.name)).not.toContain('Growing Ferocity (Ferocity 2)');
	});

	// A Multiple with no prose of its own is dropped from the card - its children say everything it
	// has to say - but dropping it must not push it into the 'other features' catch-all instead
	test('it should not report a wrapper with no prose of its own as a missed feature', () => {
		const hero = FactoryLogic.createHero();
		// Lightning Soul's benefit is a Multiple wrapping a surge gain and a line of prose
		hero.complication = Utils.copy(ComplicationData.lightningSoul);

		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], {} as Options);

		expect(warn.mock.calls.filter(c => String(c[0]).includes('Missed features'))).toEqual([]);
		expect((result.featuresReferenceOther || []).map(f => f.feature.id)).not.toContain('comp-lightningSoul-b');
		// The wrapper is covered, not printed - its children carry the content
		expect((result.complication?.benefits || []).map(f => f.id)).toEqual([ 'comp-lightningSoul-b1', 'comp-lightningSoul-b2' ]);
	});

	// A complication added through Customize gets its own card alongside the builder's one, and its
	// features must be marked covered or they get duplicated into the 'other features' catch-all
	test('it should build a card for each complication added through customize', () => {
		const hero = FactoryLogic.createHero();
		hero.complication = Utils.copy(ComplicationData.lightningSoul);
		hero.features.push(buildComplicationFeature('custom-1', ComplicationData.gettingTooOldForThis));

		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], {} as Options);

		expect(warn.mock.calls.filter(c => String(c[0]).includes('Missed features'))).toEqual([]);
		expect(result.complication?.id).toEqual('comp-lightningSoul');
		expect(result.extraComplications.map(c => c.id)).toEqual([ 'comp-gettingTooOldForThis' ]);
		expect(result.extraComplications[0].benefits.map(f => f.id)).toEqual([ 'comp-gettingTooOldForThis-b' ]);
		expect(result.extraComplications[0].drawbacks.map(f => f.id)).toEqual([ 'comp-gettingTooOldForThis-d' ]);
		// Covered by their own card, so they must not also appear in the catch-all
		expect((result.featuresReferenceOther || []).map(f => f.feature.id))
			.not.toContain('comp-gettingTooOldForThis-b');
		// Nor should the wrapper feature the selection hangs off
		expect((result.featuresReferenceOther || []).map(f => f.feature.id)).not.toContain('custom-1');
	});

	// The hero can carry several, and none of them is the builder's
	test('it should build cards for several complications with no builder complication', () => {
		const hero = FactoryLogic.createHero();
		hero.features.push(buildComplicationFeature('custom-1', ComplicationData.gettingTooOldForThis));
		hero.features.push(buildComplicationFeature('custom-2', ComplicationData.lightningSoul));

		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], {} as Options);

		expect(warn.mock.calls.filter(c => String(c[0]).includes('Missed features'))).toEqual([]);
		expect(result.complication).toBeUndefined();
		expect(result.extraComplications.map(c => c.id))
			.toEqual([ 'comp-gettingTooOldForThis', 'comp-lightningSoul' ]);
	});

	// An unconfigured complication feature has nothing to show yet
	test('it should not build a card for a complication feature with nothing selected', () => {
		const hero = FactoryLogic.createHero();
		hero.features.push(FactoryLogic.feature.createComplication({ id: 'custom-1' }));

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], {} as Options);

		expect(result.extraComplications).toEqual([]);
	});

	// The complication's features have to reach the hero the same way the builder's one does
	test('it should include features from a complication added through customize', () => {
		const hero = FactoryLogic.createHero();
		hero.features.push(buildComplicationFeature('custom-1', ComplicationData.gettingTooOldForThis));

		const featureIDs = HeroLogic.getFeatures(hero).map(f => f.feature.id);

		expect(featureIDs).toContain('comp-gettingTooOldForThis-b');
		expect(featureIDs).toContain('comp-gettingTooOldForThis-d');
	});

	// isClassFeatureInKit keeps Growing Ferocity with the class features, and it matches on the
	// wrapper's name - so opening the wrapper up must not leave the rungs inside it behind
	test('it should not list a kit feature that belongs with the class features', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = 4;
		hero.class.subclasses.filter(sc => sc.id === stormwight.id).forEach(sc => sc.selected = true);
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => f.data.selected = [ Utils.copy(boren) ]);

		const result = HeroSheetBuilder.buildHeroSheet(hero, [ core, orden ], {} as Options);

		const benefits = (result.modifierBenefits || []).map(f => f.name);
		expect(benefits).toContain('Bear Claws');
		// The Ferocity rungs live inside the Growing Ferocity wrapper and are named for their
		// thresholds, so a filter applied after flattening would let them through
		expect(benefits.filter(n => /^Ferocity \d+$/.test(n))).toEqual([]);
	});
});

describe('buildComplicationSheet', () => {
	test('it should open up a benefit that is a Multiple', () => {
		const result = HeroSheetBuilder.buildComplicationSheet(Utils.copy(ComplicationData.lightningSoul));

		// Both of the wrapper's parts have to reach the card, and the wrapper itself carries no prose
		// of its own - keeping it would print a blank line above them
		expect(result.benefits.map(f => f.id)).toEqual([ 'comp-lightningSoul-b1', 'comp-lightningSoul-b2' ]);
		expect(result.drawbacks.map(f => f.id)).toEqual([ 'comp-lightningSoul-d' ]);
	});

	test('it should drop the complication name from a benefit that is a surge gain', () => {
		const result = HeroSheetBuilder.buildComplicationSheet(Utils.copy(ComplicationData.shadowBorn));

		// The card's own 'Benefit' heading already says what this is
		expect(result.benefits.map(f => f.name)).toEqual([ '' ]);
	});

	test('it should leave the name on a feature the sheet renders as a bulleted line', () => {
		const complication = Utils.copy(ComplicationData.shadowBorn);
		// A Bonus renders as '• Name: value', so blanking its name would leave a dangling bullet
		complication.features = [
			FactoryLogic.feature.createBonus({ id: 'comp-shadowBorn-x', name: 'Shadow Born Benefit', field: FeatureField.Stamina, value: 3 })
		];

		const result = HeroSheetBuilder.buildComplicationSheet(complication);

		expect(result.benefits.map(f => f.name)).toEqual([ 'Shadow Born Benefit' ]);
	});

	test('it should not rename the hero\'s own complication features', () => {
		const complication = Utils.copy(ComplicationData.lightningSoul);

		HeroSheetBuilder.buildComplicationSheet(complication);

		expect(complication.features.map(f => f.name)).toEqual([ 'Lightning Soul Benefit', 'Lightning Soul Drawback' ]);
	});
});

describe('surge gains on the sheet', () => {
	test('it should carry a gain\'s condition through to the reference table', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(nullClass);
		hero.class.level = 6;

		const result = HeroSheetBuilder.buildHeroSheet(hero, [], {} as Options);

		// Elemental Buffer's surges can only be spent one way, which the trigger alone doesn't say
		const gain = (result.surgeGains || []).find(g => g.tag === 'reduce-damage');
		expect(gain?.value).toBe('2');
		expect(gain?.condition).toBe('These surges can be used only to increase the damage of your next strike.');
	});

	// Prose about the feature is not a rule, and the reference card has no room for it
	test('it should leave a gain\'s descriptive prose off the reference table', () => {
		const hero = FactoryLogic.createHero();
		hero.ancestry = Utils.copy(AncestryData.memonek);
		// Useful Emotion is one of the traits a memonek spends ancestry points on
		hero.ancestry.features
			.filter(f => f.type === FeatureType.Choice)
			.forEach(f => f.data.selected = f.data.options
				.map(o => o.feature)
				.filter(o => o.id === 'memonek-feature-3-4'));

		const result = HeroSheetBuilder.buildHeroSheet(hero, [], {} as Options);

		const gain = (result.surgeGains || []).find(g => g.tag === 'start-combat');
		expect(gain?.trigger).toBe('Start of combat');
		expect(gain?.condition).toBe('');
	});

	const buildBerserker = (level: number, ferocity: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = level;
		hero.class.subclasses.filter(sc => sc.id === berserker.id).forEach(sc => sc.selected = true);
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.value = ferocity);

		return HeroSheetBuilder.buildHeroSheet(hero, [], {} as Options);
	};

	// A sheet is printed once and has to stay true for the whole encounter, so the table can't be
	// the gains that happen to be unlocked at the moment it was exported - out of combat that's none
	test.each([
		[ 0 ],
		[ 4 ],
		[ 8 ]
	])('it should list every gain whatever the resource is sitting at (%i ferocity)', ferocity => {
		const result = buildBerserker(4, ferocity);

		expect((result.surgeGains || []).map(g => `${g.value}:${g.tag}`)).toEqual([ '1:push', '2:push 2' ]);
	});

	test('it should leave out a rung the hero has not levelled into', () => {
		// Growing Ferocity (Ferocity 8) is a 4th-level subclass feature
		const result = buildBerserker(1, 8);

		expect((result.surgeGains || []).map(g => g.tag)).toEqual([ 'push' ]);
	});

	// Both Growing Ferocity rungs share a trigger, so without the rung the two rows read the same
	test('it should say which rung a threshold-gated gain sits on', () => {
		const result = buildBerserker(4, 0);

		expect((result.surgeGains || []).map(g => g.requirement)).toEqual([ 'Ferocity 4+', 'Ferocity 8+' ]);
	});

	test('it should leave the rung off a gain that is not behind a threshold', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(nullClass);
		hero.class.level = 6;

		const result = HeroSheetBuilder.buildHeroSheet(hero, [], {} as Options);

		expect((result.surgeGains || []).find(g => g.tag === 'reduce-damage')?.requirement).toBeUndefined();
	});
});
