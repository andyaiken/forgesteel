import { Feature, FeatureBonus, FeatureMovementMode, FeatureRollModifierData, FeatureSize, FeatureSkillCancelChoice, FeatureSkillChoice, FeatureSummonChoice, FeatureSummonChoiceData, FeatureToggle } from '@/models/feature';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AbilityData } from '@/data/ability-data';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeroLogic } from '@/logic/hero-logic';
import { Kit } from '@/models/kit';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { RollType } from '@/enums/roll-type';
import { Skill } from '@/models/skill';
import { SkillList } from '@/enums/skill-list';
import { Summon } from '@/models/summon';
import { TutorialMode } from '@/enums/tutorial-mode';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { berserker } from '@/data/classes/fury/berserker';
import { corven } from '@/data/kits/stormwight/corven';
import { fury } from '@/data/classes/fury/fury';
import { stormwight } from '@/data/classes/fury/stormwight';
import { vuken } from '@/data/kits/stormwight/vuken';

describe('getAbilities', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('includes a companion\'s Companion-keyword abilities, since a companion shares the hero\'s turn', () => {
		const companionChoices = beastheart.featuresByLevel.find(fbl => fbl.level === 1)
			?.features.find(f => f.id === 'beastheart-1-2a')?.data as FeatureSummonChoiceData;
		const basilisk = companionChoices.options.find(o => o.monster.id === 'beastheart-companion-1') as Summon;

		const summonChoiceFeature = {
			id: 'test-companion-choice',
			name: 'Companion',
			type: FeatureType.SummonChoice,
			data: {
				options: companionChoices.options,
				count: 1,
				selected: [ basilisk ]
			}
		} as FeatureSummonChoice;

		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([
			{ feature: summonChoiceFeature, source: 'test', level: 1 }
		]);

		const hero = FactoryLogic.createHero();
		const abilities = HeroLogic.getAbilities(hero, [], []);

		expect(abilities.some(a => a.ability.name === 'Petrify')).toBe(true);
	});

	it('does NOT include a summoned creature\'s abilities when they lack the Companion keyword (eg a Summoner minion)', () => {
		const summonChoiceFeature = {
			id: 'test-summon-choice',
			name: 'Signature Minion',
			description: '',
			type: FeatureType.SummonChoice,
			data: {
				options: [],
				count: 1,
				selected: [ FactoryLogic.createSummon({
					monster: FactoryLogic.createMonster({
						id: 'test-minion',
						name: 'Test Minion',
						level: 0,
						role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion),
						keywords: [],
						encounterValue: 0,
						size: FactoryLogic.createSize(1, 'M'),
						speed: FactoryLogic.createSpeed(5),
						stamina: 3,
						stability: 1,
						freeStrikeDamage: 1,
						characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
						features: [
							FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'test-minion-maneuver',
									name: 'Should Not Appear',
									description: '',
									type: FactoryLogic.type.createManeuver(),
									keywords: [],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									sections: []
								})
							})
						]
					}),
					cost: 1,
					count: 1
				}) ]
			}
		} as FeatureSummonChoice;

		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([
			{ feature: summonChoiceFeature, source: 'test', level: 1 }
		]);

		const hero = FactoryLogic.createHero();
		const abilities = HeroLogic.getAbilities(hero, [], []);

		expect(abilities.some(a => a.ability.name === 'Should Not Appear')).toBe(false);
	});
});

// A test class with two heroic resources: thresholds that don't name a resource key off Ferocity,
// and one threshold names Rampage explicitly
const buildThresholdHero = (options: { level?: number, ferocity?: number, rampage?: number }) => {
	const hero = FactoryLogic.createHero();

	hero.class = FactoryLogic.createClass();
	hero.class.name = 'Test Class';
	hero.class.level = options.level ?? 1;
	// Drop the placeholder resource that createClass adds, so Ferocity is the hero's heroic resource
	hero.class.featuresByLevel
		.forEach(lvl => lvl.features = lvl.features.filter(f => f.type !== FeatureType.HeroicResource));
	hero.class.featuresByLevel
		.filter(lvl => lvl.level === 1)
		.forEach(lvl => {
			lvl.features.push(FactoryLogic.feature.createHeroicResource({
				id: 'test-ferocity',
				name: 'Ferocity',
				gains: []
			}));
			lvl.features.push(FactoryLogic.feature.createHeroicResource({
				id: 'test-rampage',
				name: 'Rampage',
				gains: []
			}));
			lvl.features.push(FactoryLogic.feature.createHeroicResourceThreshold({
				id: 'test-threshold-2',
				value: 2,
				feature: FactoryLogic.feature.create({
					id: 'test-threshold-2-feature',
					name: 'Ferocity 2 Benefit',
					description: ''
				})
			}));
			lvl.features.push(FactoryLogic.feature.createHeroicResourceThreshold({
				id: 'test-threshold-8',
				value: 8,
				level: 4,
				feature: FactoryLogic.feature.create({
					id: 'test-threshold-8-feature',
					name: 'Ferocity 8 Benefit',
					description: ''
				})
			}));
			lvl.features.push(FactoryLogic.feature.createHeroicResourceThreshold({
				id: 'test-threshold-rampage',
				resource: 'Rampage',
				value: 8,
				feature: FactoryLogic.feature.create({
					id: 'test-threshold-rampage-feature',
					name: 'Rampage 8 Benefit',
					description: ''
				})
			}));
		});

	const resources = hero.class.featuresByLevel
		.flatMap(lvl => lvl.features)
		.filter(f => f.type === FeatureType.HeroicResource);
	resources.filter(f => f.id === 'test-ferocity').forEach(f => f.data.value = options.ferocity ?? 0);
	resources.filter(f => f.id === 'test-rampage').forEach(f => f.data.value = options.rampage ?? 0);

	return hero;
};

describe('getFeatures - heroic resource thresholds', () => {
	const buildHero = buildThresholdHero;

	const featureNames = (hero: ReturnType<typeof buildHero>) => HeroLogic.getFeatures(hero).map(f => f.feature.name);

	it('does not unlock a threshold feature while the resource is below the minimum', () => {
		const names = featureNames(buildHero({ ferocity: 1 }));
		expect(names).not.toContain('Ferocity 2 Benefit');
	});

	it('unlocks a threshold feature once the resource reaches the minimum', () => {
		const names = featureNames(buildHero({ ferocity: 2 }));
		expect(names).toContain('Ferocity 2 Benefit');
	});

	it('does not unlock a threshold feature below its minimum level, even with enough of the resource', () => {
		const names = featureNames(buildHero({ level: 3, ferocity: 12 }));
		expect(names).toContain('Ferocity 2 Benefit');
		expect(names).not.toContain('Ferocity 8 Benefit');
	});

	it('unlocks a level-gated threshold feature once both the level and the resource minimum are met', () => {
		const names = featureNames(buildHero({ level: 4, ferocity: 12 }));
		expect(names).toContain('Ferocity 8 Benefit');
	});

	it('defaults to the hero\'s first heroic resource when no resource is named', () => {
		// Rampage is at 12, but the unnamed thresholds key off Ferocity, which is at 0
		const names = featureNames(buildHero({ ferocity: 0, rampage: 12 }));
		expect(names).not.toContain('Ferocity 2 Benefit');
	});

	it('keys off the named resource when one is given', () => {
		const belowNames = featureNames(buildHero({ ferocity: 12, rampage: 7 }));
		expect(belowNames).not.toContain('Rampage 8 Benefit');

		const aboveNames = featureNames(buildHero({ ferocity: 0, rampage: 8 }));
		expect(aboveNames).toContain('Rampage 8 Benefit');
	});
});

describe('getFeatures - Growing Ferocity', () => {
	const buildFury = (level: number, ferocity: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = level;
		hero.class.subclasses.filter(sc => sc.id === berserker.id).forEach(sc => sc.selected = true);
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.value = ferocity);
		return hero;
	};

	const featureNames = (level: number, ferocity: number) => HeroLogic.getFeatures(buildFury(level, ferocity)).map(f => f.feature.name);

	it('unlocks no rungs at 0 ferocity', () => {
		const names = featureNames(10, 0);
		expect(names.filter(n => n.startsWith('Growing Ferocity ('))).toEqual([]);
	});

	it('unlocks rungs cumulatively as ferocity rises', () => {
		expect(featureNames(1, 2)).toContain('Growing Ferocity (Ferocity 2)');
		expect(featureNames(1, 2)).not.toContain('Growing Ferocity (Ferocity 4)');

		const atSix = featureNames(1, 6);
		expect(atSix).toContain('Growing Ferocity (Ferocity 2)');
		expect(atSix).toContain('Growing Ferocity (Ferocity 4)');
		expect(atSix).toContain('Growing Ferocity (Ferocity 6)');
	});

	it('gates the higher rungs behind level as well as ferocity', () => {
		// The Ferocity 8 rung is a 4th-level feature, so a 3rd-level fury can't have it at any ferocity
		expect(featureNames(3, 12)).not.toContain('Growing Ferocity (Ferocity 8)');
		expect(featureNames(4, 12)).toContain('Growing Ferocity (Ferocity 8)');
		// ...and a 4th-level fury only has it once they actually reach 8 ferocity
		expect(featureNames(4, 7)).not.toContain('Growing Ferocity (Ferocity 8)');
	});

	it('unlocks all six rungs for a 10th-level fury at 12 ferocity', () => {
		// A rung can be backed by more than one feature, so count distinct names
		const names = Collections.distinct(featureNames(10, 12), n => n);
		expect(names.filter(n => n.startsWith('Growing Ferocity (Ferocity ')).sort()).toEqual([
			'Growing Ferocity (Ferocity 10)',
			'Growing Ferocity (Ferocity 12)',
			'Growing Ferocity (Ferocity 2)',
			'Growing Ferocity (Ferocity 4)',
			'Growing Ferocity (Ferocity 6)',
			'Growing Ferocity (Ferocity 8)'
		]);
	});
});

describe('getFeatures - stormwight kit thresholds', () => {
	// Kits have no level structure of their own, so a stormwight's Growing Ferocity rungs
	// can only be level-gated by the threshold's own level minimum
	const buildVuken = (level: number, ferocity: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = level;
		hero.class.subclasses.filter(sc => sc.id === stormwight.id).forEach(sc => sc.selected = true);
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.value = ferocity);
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => f.data.selected = [ Utils.copy(vuken) ]);
		return hero;
	};

	// A rung can be backed by more than one feature, so count distinct names
	const rungs = (level: number, ferocity: number) => Collections.distinct(
		HeroLogic.getFeatures(buildVuken(level, ferocity))
			.map(f => f.feature.name)
			.filter(n => n.startsWith('Growing Ferocity (Ferocity ')),
		n => n
	).sort();

	it('withholds the level-gated rungs from a low-level stormwight, however much ferocity they have', () => {
		expect(rungs(1, 12)).toEqual([
			'Growing Ferocity (Ferocity 2)',
			'Growing Ferocity (Ferocity 4)',
			'Growing Ferocity (Ferocity 6)'
		]);
	});

	it('grants every rung to a 10th-level stormwight at 12 ferocity', () => {
		expect(rungs(10, 12)).toHaveLength(6);
	});

	it('grants no rungs at 0 ferocity, whatever the level', () => {
		expect(rungs(10, 0)).toEqual([]);
	});
});

describe('getHeroicResources', () => {
	it('gives each resource only the thresholds that key off it', () => {
		const resources = HeroLogic.getHeroicResources(buildThresholdHero({ level: 10, ferocity: 12, rampage: 12 }));

		const ferocity = resources.find(r => r.name === 'Ferocity');
		const rampage = resources.find(r => r.name === 'Rampage');

		expect(ferocity?.thresholds.map(t => t.feature.name)).toEqual([ 'Ferocity 2 Benefit', 'Ferocity 8 Benefit' ]);
		expect(rampage?.thresholds.map(t => t.feature.name)).toEqual([ 'Rampage 8 Benefit' ]);
	});

	it('sorts thresholds by increasing value', () => {
		// The stormwight rungs are all named 'Ferocity <n>', and getFeatures sorts features by name,
		// so without an explicit sort these arrive as 10, 12, 2, 4, 6, 8
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = 10;
		hero.class.subclasses.filter(sc => sc.id === stormwight.id).forEach(sc => sc.selected = true);
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => f.data.selected = [ Utils.copy(vuken) ]);

		const ferocity = HeroLogic.getHeroicResources(hero).find(r => r.name === 'Ferocity');

		expect(ferocity?.thresholds.map(t => t.value)).toEqual([ 2, 4, 6, 8, 10, 12 ]);
	});
});

describe('getSkills / getCancelledSkills', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const skillChoice = (selected: string[]) => ({
		id: 'test-skill-choice',
		name: 'Skill',
		description: '',
		type: FeatureType.SkillChoice,
		data: {
			options: [],
			listOptions: [],
			count: selected.length,
			selectAt: 'build',
			selected: selected
		}
	} as FeatureSkillChoice);

	const skillCancelChoice = (selected: string[], knownSkillsOnly = true) => ({
		id: 'test-skill-cancel-choice',
		name: 'Lost Skill',
		description: '',
		type: FeatureType.SkillCancelChoice,
		data: {
			knownSkillsOnly: knownSkillsOnly,
			count: selected.length,
			selected: selected
		}
	} as FeatureSkillCancelChoice);

	const mockFeatures = (features: (FeatureSkillChoice | FeatureSkillCancelChoice)[]) => {
		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue(features.map(feature => ({ feature: feature, source: 'test', level: 1 })));
	};

	it('removes a cancelled skill from the hero\'s skills', () => {
		mockFeatures([ skillChoice([ 'Alchemy', 'Architecture', 'Blacksmithing' ]), skillCancelChoice([ 'Architecture' ]) ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getSkills(hero, []).map(s => s.name)).toEqual([ 'Alchemy', 'Blacksmithing' ]);
		expect(HeroLogic.getCancelledSkills(hero, []).map(s => s.name)).toEqual([ 'Architecture' ]);
	});

	it('reports a cancelled skill the hero never had', () => {
		mockFeatures([ skillChoice([ 'Alchemy' ]), skillCancelChoice([ 'Sabotage' ], false) ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getSkills(hero, []).map(s => s.name)).toEqual([ 'Alchemy' ]);
		expect(HeroLogic.getCancelledSkills(hero, []).map(s => s.name)).toEqual([ 'Sabotage' ]);
	});

	it('leaves skills untouched when nothing is cancelled', () => {
		mockFeatures([ skillChoice([ 'Alchemy', 'Blacksmithing' ]) ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getSkills(hero, []).map(s => s.name)).toEqual([ 'Alchemy', 'Blacksmithing' ]);
		expect(HeroLogic.getCancelledSkills(hero, [])).toEqual([]);
	});
});

describe('conditional features', () => {
	const simplify = (features: Feature[]) =>
		FeatureLogic.simplifyFeatures(
			features.map(f => ({ feature: f, source: 'test', level: undefined })),
			1,
			TutorialMode.Complete
		).map(f => f.feature);

	const setChecked = (kit: Kit, featureID: string, checked: boolean) => {
		const copy = Utils.copy(kit);
		const toggle = copy.features.find(f => f.id === featureID) as FeatureToggle;
		toggle.data.checked = checked;
		return copy.features;
	};

	it('contributes nothing while a form toggle is off', () => {
		const features = simplify(setChecked(vuken, 'kit-vuken-feature-2a', false));

		expect(features.some(f => f.type === FeatureType.Size)).toBe(false);
		expect(features.some(f => f.type === FeatureType.Bonus)).toBe(false);
	});

	it('contributes the wolf form\'s size and speed once the toggle is on', () => {
		const features = simplify(setChecked(vuken, 'kit-vuken-feature-2a', true));

		const size = features.find(f => f.type === FeatureType.Size) as FeatureSize;
		expect(size.data.size).toEqual({ value: 1, mod: 'L' });

		const speed = features.find(f => f.type === FeatureType.Bonus) as FeatureBonus;
		expect(speed.data.field).toBe(FeatureField.Speed);
		expect(speed.data.value).toBe(2);
	});

	it('surfaces a kit\'s form toggles so the hero can flip them at play time', () => {
		// Kits reach the hero through a Kit feature, so the toggle has to survive that hop
		// to show up in HeroLogic.getConditionalFeatures.
		const kitFeature = FactoryLogic.feature.createKitChoice({ id: 'test-kit', types: [ 'Stormwight' ] });
		kitFeature.data.selected = [ Utils.copy(vuken) ];

		const toggles = simplify([ kitFeature ]).filter(f => f.type === FeatureType.Toggle);

		expect(toggles.map(t => t.data.condition)).toEqual([
			'You are in your wolf form',
			'You are in your hybrid form'
		]);
	});

	it('contributes the crow form\'s movement mode once the toggle is on', () => {
		const features = simplify(setChecked(corven, 'kit-corven-feature-2a', true));

		const mode = features.find(f => f.type === FeatureType.MovementMode) as FeatureMovementMode;
		expect(mode.data.mode).toBe('Fly');
	});
});

describe('getFeatures - Rampage', () => {
	// Rampage is the companion's resource, and the beastheart also has Ferocity, so the
	// thresholds have to key off the right one
	const buildBeastheart = (level: number, rampage: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(beastheart);
		hero.class.level = level;
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.filter(f => f.name === 'Rampage')
			.forEach(f => f.data.value = rampage);
		return hero;
	};

	// The rungs live at the level they unlock at, so their ids don't share a prefix; go by name
	// instead. The threshold wrapper is always present and shares its benefit's name, so drop the
	// wrappers - only the benefits appear once the threshold is actually met
	const rungs = (level: number, rampage: number) => Collections.distinct(
		HeroLogic.getFeatures(buildBeastheart(level, rampage))
			.map(f => f.feature)
			.filter(f => f.type !== FeatureType.HeroicResourceThreshold)
			.map(f => f.name)
			.filter(name => /^Rampage \d+$/.test(name)),
		name => name
	).sort();

	it('grants no rungs below 8 rampage', () => {
		expect(rungs(10, 7)).toEqual([]);
	});

	it('unlocks rungs cumulatively as rampage rises', () => {
		expect(rungs(10, 8)).toEqual([ 'Rampage 8' ]);
		expect(rungs(10, 12)).toEqual([ 'Rampage 12', 'Rampage 8' ]);
	});

	it('gates the higher rungs behind level as well as rampage', () => {
		// Rampage 16 is a 4th-level effect
		expect(rungs(3, 24)).toEqual([ 'Rampage 12', 'Rampage 8' ]);
		expect(rungs(4, 24)).toContain('Rampage 16');
		expect(rungs(4, 24)).not.toContain('Rampage 20');
	});

	it('grants every rung to a 10th-level beastheart at 24 rampage', () => {
		expect(rungs(10, 24)).toHaveLength(5);
	});
});

describe('test modifiers', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const mockFeatures = (features: Feature[]) => {
		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue(features.map(feature => ({ feature: feature, source: 'test', level: 1 })));
	};

	const skill = (name: string, list: SkillList): Skill => ({ name: name, description: '', list: list });

	const modifier = (id: string, data: Partial<FeatureRollModifierData>) =>
		FactoryLogic.feature.createRollModifier({
			id: id,
			modifier: RollModifierType.Edge,
			...data
		});

	it('matches a modifier scoped to the skill by name', () => {
		const mod = modifier('m1', { skills: [ 'Sneak' ] });
		mockFeatures([ mod ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getRollModifiersForSkill(hero, skill('Sneak', SkillList.Intrigue)).map(f => f.id)).toEqual([ 'm1' ]);
		expect(HeroLogic.getRollModifiersForSkill(hero, skill('Climb', SkillList.Exploration))).toEqual([]);
	});

	it('matches a modifier scoped to the skill\'s group', () => {
		const mod = modifier('m2', { skillLists: [ SkillList.Lore ] });
		mockFeatures([ mod ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getRollModifiersForSkill(hero, skill('History', SkillList.Lore)).map(f => f.id)).toEqual([ 'm2' ]);
		expect(HeroLogic.getRollModifiersForSkill(hero, skill('Sneak', SkillList.Intrigue))).toEqual([]);
	});

	it('keeps non-test modifiers off skill rows entirely', () => {
		// A bane on strikes has no skill to sit on, however the skill scopes are filled in
		const strikeMod = modifier('m6', { rollType: RollType.Strike, skills: [ 'Sneak' ] });
		mockFeatures([ strikeMod ]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getRollModifiersForSkill(hero, skill('Sneak', SkillList.Intrigue))).toEqual([]);
	});

	it('offers only the modifiers that might apply to the characteristics being rolled', () => {
		mockFeatures([
			modifier('presence', { characteristics: [ Characteristic.Presence ] }),
			modifier('agility', { characteristics: [ Characteristic.Agility ] }),
			modifier('anyTest', {}),
			modifier('sneak', { skills: [ 'Sneak' ] }),
			modifier('strike', { rollType: RollType.Strike })
		]);

		const hero = FactoryLogic.createHero();
		const ids = HeroLogic.getRollModifiersForTest(hero, [ Characteristic.Presence ]).map(f => f.id);

		// the Presence one matches; the unscoped and skill-scoped ones might apply, so they show;
		// the Agility one can't, and a strike modifier isn't a test at all
		expect(ids).toEqual([ 'presence', 'anyTest', 'sneak' ]);
	});

	it('offers ability modifiers scoped to the ability, and strike modifiers only to strikes', () => {
		mockFeatures([
			modifier('thisManeuver', { rollType: RollType.Knockback }),
			modifier('otherManeuver', { rollType: RollType.Grab }),
			modifier('anyAbility', { rollType: RollType.Ability }),
			modifier('strike', { rollType: RollType.Strike }),
			modifier('test', {})
		]);

		const hero = FactoryLogic.createHero();
		const knockback = AbilityData.standardAbilities.find(a => a.id === 'knockback')!;
		const freeStrike = AbilityData.freeStrikeMelee;

		expect(HeroLogic.getRollModifiersForAbility(hero, knockback).map(f => f.id))
			.toEqual([ 'thisManeuver', 'anyAbility' ]);
		expect(HeroLogic.getRollModifiersForAbility(hero, freeStrike).map(f => f.id))
			.toEqual([ 'anyAbility', 'strike' ]);
	});

	it('offers only project modifiers for a project roll', () => {
		mockFeatures([
			modifier('fishing', { rollType: RollType.Project, condition: 'Fishing' }),
			modifier('test', {}),
			modifier('strike', { rollType: RollType.Strike })
		]);

		const hero = FactoryLogic.createHero();

		expect(HeroLogic.getRollModifiersForProject(hero).map(f => f.id)).toEqual([ 'fishing' ]);
	});

	it('picks up a modifier added through hero customization', () => {
		// Custom features live on hero.features rather than coming from a class or ancestry
		const hero = FactoryLogic.createHero();
		hero.features.push(FactoryLogic.feature.createRollModifier({
			id: 'custom-1',
			modifier: RollModifierType.Edge,
			skills: [ 'Sneak' ]
		}));

		expect(HeroLogic.getRollModifiers(hero).map(f => f.id)).toEqual([ 'custom-1' ]);
		expect(HeroLogic.getRollModifiersForSkill(hero, skill('Sneak', SkillList.Intrigue)).map(f => f.id)).toEqual([ 'custom-1' ]);
	});

	it('clears scopes the roll type does not allow', () => {
		const messy = FactoryLogic.feature.createRollModifier({
			id: 'm12',
			modifier: RollModifierType.Edge,
			rollType: RollType.Strike,
			skills: [ 'Sneak' ],
			characteristics: [ Characteristic.Agility ],
			condition: 'While flanking'
		});

		const cleaned = FeatureLogic.clearRollModifierScopes(messy.data);

		expect(cleaned.skills).toEqual([]);
		expect(cleaned.characteristics).toEqual([]);
		// the condition is always available, whatever the roll type
		expect(cleaned.condition).toBe('While flanking');
	});
});
