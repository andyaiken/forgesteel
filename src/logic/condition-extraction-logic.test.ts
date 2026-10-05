import { AbilitySectionField, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { Feature, FeatureSummonChoice, FeatureSummonChoiceData } from '@/models/feature';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { AbilityData } from '@/data/ability-data';
import { ConditionExtractionLogic } from '@/logic/condition-extraction-logic';
import { ConditionLogic } from '@/logic/condition-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeroLogic } from '@/logic/hero-logic';
import { MonsterData } from '@/data/monster-data';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Summon } from '@/models/summon';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { censor } from '@/data/classes/censor/censor';
import { paragon } from '@/data/classes/censor/paragon';
import { tactician } from '@/data/classes/tactician/tactician';

const createAbility = (name: string, sections: (AbilitySectionText | AbilitySectionField | AbilitySectionRoll)[]) => {
	return FactoryLogic.feature.createAbility({
		ability: FactoryLogic.createAbility({
			id: Utils.guid(),
			name: name,
			type: FactoryLogic.type.createMain(),
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			sections: sections
		})
	});
};

const createRoll = (tier1: string, tier2: string, tier3: string) => {
	return FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({ bonus: 2, tier1: tier1, tier2: tier2, tier3: tier3 }));
};

const createMonster = (name: string, features: Feature[]) => {
	return FactoryLogic.createMonster({
		id: Utils.guid(),
		name: name,
		description: '',
		level: 1,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
		keywords: [],
		encounterValue: 0,
		size: FactoryLogic.createSize(1, 'M'),
		speed: FactoryLogic.createSpeed(5),
		stamina: 10,
		stability: 0,
		freeStrikeDamage: 2,
		characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
		features: features
	});
};

describe('getConditionsForMonster', () => {
	test('finds a condition explained by a sentence in the same ability', () => {
		const monster = createMonster('Hexer', [
			createAbility('Hex Bolt', [
				createRoll('5 damage; P < 0 the target is hexed (save ends)', '8 damage; P < 1 the target is hexed (save ends)', '11 damage; P < 2 the target is hexed (save ends)'),
				FactoryLogic.createAbilitySectionText('A hexed target glows green, and each of their heroic abilities has its cost increased by 2.')
			])
		]);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, null);

		expect(conditions).toEqual([ {
			name: 'Hexed',
			rules: 'A hexed target glows green, and each of their heroic abilities has its cost increased by 2.',
			ends: ConditionEndType.SaveEnds,
			owner: 'Hexer',
			abilities: [ 'Hex Bolt' ],
			related: []
		} ]);
	});

	test('takes the duration from the clause that applies the condition', () => {
		const monster = createMonster('Test Monster', [
			createAbility('Dazzle', [
				FactoryLogic.createAbilitySectionText('The target is dazzled (EoT). A dazzled target takes a bane on strikes.')
			]),
			createAbility('Soak', [
				FactoryLogic.createAbilitySectionText('The target is soaked until the end of the encounter. A soaked creature has fire immunity 5.')
			])
		]);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, null);

		expect(conditions.map(c => [ c.name, c.ends ])).toEqual([
			[ 'Dazzled', ConditionEndType.EndOfTurn ],
			[ 'Soaked', ConditionEndType.UntilRemoved ]
		]);
	});

	test('follows an explicit reference to a named feature', () => {
		const monster = createMonster('Basilisk', [
			createAbility('Petrify', [
				FactoryLogic.createAbilitySectionText('The target takes 5 corruption damage and is stoned (save ends) (see Stoned).'),
				FactoryLogic.createAbilitySectionSpend({ effect: 'While stoned this way, the target is also slowed.' })
			]),
			FactoryLogic.feature.create({
				id: 'stoned',
				name: 'Stoned',
				description: 'A stoned creature is magically turning to stone. Each time a creature fails the saving throw to end this effect, they take 3 corruption damage.'
			})
		]);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, null);

		expect(conditions).toHaveLength(1);
		expect(conditions[0].rules).toBe('A stoned creature is magically turning to stone. Each time a creature fails the saving throw to end this effect, they take 3 corruption damage.');
	});

	test('finds a condition explained by another ability of the same monster', () => {
		const monster = createMonster('Firestarter', [
			createAbility('Flamebelcher', [
				createRoll('3 fire damage; A < 0 the target is seared (save ends)', '6 fire damage; A < 1 the target is seared (save ends)', '8 fire damage; A < 2 the target is seared (save ends)'),
				FactoryLogic.createAbilitySectionText('A seared creature takes a bane on strikes and has damage weakness 5.')
			]),
			createAbility('Enflame', [
				createRoll('2 fire damage', '4 fire damage; A < 1 the target is seared (save ends)', '6 fire damage; A < 2 the target is seared (save ends)')
			])
		]);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, null);

		expect(conditions).toHaveLength(1);
		expect(conditions[0].abilities).toEqual([ 'Flamebelcher', 'Enflame' ]);
	});

	test('finds a condition explained by a monster group information entry', () => {
		const monster = createMonster('Slink', [
			createAbility('Tonguelash', [
				FactoryLogic.createAbilitySectionText('The target is wet (save ends).')
			])
		]);
		const group = FactoryLogic.createMonsterGroup();
		group.information.push({ id: 'wet', name: 'Wet', description: 'While wet, a creature slips and falls prone if they end their turn with no movement remaining.' });
		group.monsters.push(monster);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, group);

		expect(conditions).toHaveLength(1);
		expect(conditions[0].rules).toBe('While wet, a creature slips and falls prone if they end their turn with no movement remaining.');
	});

	test('uses the whole of a section that applies and then explains a condition', () => {
		const text = `The target is cursed by you until the end of the encounter.

Whenever a creature cursed by you uses a main action, they take 3 damage.

When a creature cursed by you is reduced to 0 Stamina, you can curse a new target.`;
		const monster = createMonster('Witch', [
			createAbility('Curse', [ FactoryLogic.createAbilitySectionText(text) ])
		]);

		const conditions = ConditionExtractionLogic.getConditionsForMonster(monster, null);

		expect(conditions).toHaveLength(1);
		expect(conditions[0].name).toBe('Cursed');
		expect(conditions[0].rules).toBe(text);
		expect(conditions[0].ends).toBe(ConditionEndType.UntilRemoved);
	});

	test('ignores standard conditions, damage, and terrain', () => {
		const monster = createMonster('Test Monster', [
			createAbility('Standard', [
				FactoryLogic.createAbilitySectionText('The target is slowed and weakened (save ends). The target is frightened of you (save ends).'),
				FactoryLogic.createAbilitySectionText('The area is difficult terrain until the end of the encounter.')
			]),
			FactoryLogic.feature.createAbility({ ability: AbilityData.clawDirt })
		]);

		expect(ConditionExtractionLogic.getConditionsForMonster(monster, null)).toEqual([]);
	});

	test('ignores a condition with no explanation', () => {
		const monster = createMonster('Test Monster', [
			createAbility('Befuddle', [
				FactoryLogic.createAbilitySectionText('The target is befuddled (save ends).')
			])
		]);

		expect(ConditionExtractionLogic.getConditionsForMonster(monster, null)).toEqual([]);
	});

	describe('official monsters', () => {
		const groups = Object.values(MonsterData)
			.filter((group): group is MonsterGroup => !!group && (typeof group === 'object') && ('monsters' in group));
		const conditions = groups.flatMap(group => group.monsters.flatMap(monster => ConditionExtractionLogic.getConditionsForMonster(monster, group)));

		test('finds the custom conditions', () => {
			const names = conditions.map(c => c.name);
			[
				'Blood soaked',
				'Burning',
				'Charmed',
				'Compelled',
				'Cursed',
				'Dazzled',
				'Devolved',
				'Dragonsealed',
				'Hexed',
				'Hooked',
				'Hopeless',
				'Illuminated',
				'Immolated',
				'Impaled',
				'Levitated',
				'Marked',
				'Seared',
				'Shapechanged',
				'Slagged',
				'Slimed',
				'Soulbound',
				'Thunderstruck',
				'Warped',
				'Wet',
				'Wracked with pain'
			].forEach(name => expect(names).toContain(name));
			expect(conditions.length).toBeGreaterThanOrEqual(40);
		});

		test('keeps conditions with the same name apart when their rules differ', () => {
			const dragonsealed = conditions.filter(c => c.name === 'Dragonsealed');
			expect(dragonsealed.length).toBeGreaterThanOrEqual(4);
			expect(new Set(dragonsealed.map(c => c.rules)).size).toBe(dragonsealed.length);
		});

		test('merges a condition that refers to an ability which defines it', () => {
			const thunderstruck = conditions.filter(c => c.name === 'Thunderstruck');
			expect(thunderstruck).toHaveLength(1);
			expect(thunderstruck[0].abilities).toEqual([ 'Thunderstruck', 'Unlimited Power!' ]);
		});
	});
});

describe('getConditionsForHero', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test('finds Judged for a censor, including their order benefit', () => {
		const hero = FactoryLogic.createHero();
		hero.name = 'Aria';
		hero.class = Utils.copy(censor);
		hero.class.level = 1;
		hero.class.subclasses.forEach(sc => sc.selected = (sc.id === paragon.id));

		const judged = ConditionExtractionLogic.getConditionsForHero(hero, []).find(c => c.name === 'Judged');

		expect(judged).toBeDefined();
		expect(judged!.owner).toBe('Aria');
		expect(judged!.abilities).toEqual([ 'Judgment' ]);
		expect(judged!.ends).toBe(ConditionEndType.UntilRemoved);
		expect(judged!.rules).toContain('Whenever a creature judged by you uses a main action');
		expect(judged!.rules).toContain('**Judgment Order Benefit:** The first time on a turn that you use your Judgment ability to judge a creature, you can vertical pull');
	});

	test('finds Marked for a tactician, with related abilities', () => {
		const hero = FactoryLogic.createHero();
		hero.name = 'Brin';
		hero.class = Utils.copy(tactician);
		hero.class.level = 1;

		const marked = ConditionExtractionLogic.getConditionsForHero(hero, []).find(c => c.name === 'Marked');

		expect(marked).toBeDefined();
		expect(marked!.abilities).toEqual([ 'Mark' ]);
		expect(marked!.related).toContain('Mark: Trigger');
		expect(marked!.rules).toContain('While a creature marked by you is within your line of effect');
	});

	test('finds a condition inflicted by a companion, once, with the companion as its owner', () => {
		const choices = beastheart.featuresByLevel.find(lvl => lvl.level === 1)
			?.features.find(f => f.id === 'beastheart-1-2a')?.data as FeatureSummonChoiceData;
		const basilisk = choices.options.find(o => o.monster.id === 'beastheart-companion-1') as Summon;
		const feature = {
			id: 'test-companion-choice',
			name: 'Companion',
			description: '',
			type: FeatureType.SummonChoice,
			data: { options: choices.options, count: 1, selected: [ basilisk ] }
		} as FeatureSummonChoice;
		vi.spyOn(HeroLogic, 'getFeatures').mockReturnValue([ { feature: feature, source: 'test', level: 1 } ]);

		const stoned = ConditionExtractionLogic.getConditionsForHero(FactoryLogic.createHero(), []).filter(c => c.name === 'Stoned');

		expect(stoned).toHaveLength(1);
		expect(stoned[0].owner).toBe(basilisk.monster.name);
		expect(stoned[0].abilities).toContain('Petrify');
		expect(stoned[0].rules).toMatch(/^A stoned creature is magically turning to stone\./);
	});
});

describe('getConditionsForEncounter', () => {
	test('finds conditions from monsters and malice, and merges duplicates', () => {
		const hexAbility = createAbility('Hex Bolt', [
			FactoryLogic.createAbilitySectionText('The target is hexed (save ends). A hexed target glows green.')
		]);
		const monster = createMonster('Hexer', [ hexAbility ]);

		const group = FactoryLogic.createMonsterGroup();
		group.name = 'Hexers';
		group.monsters.push(monster);
		group.malice.push(FactoryLogic.feature.createMalice({
			id: 'gloom',
			name: 'Gloom',
			cost: 3,
			sections: [ 'Each enemy is gloomy (save ends). A gloomy creature can’t regain Stamina.' ]
		}));

		const sourcebook = FactoryLogic.createSourcebook();
		sourcebook.monsterGroups.push(group);

		const encounter = FactoryLogic.createEncounter();
		const encounterGroup = FactoryLogic.createEncounterGroup();
		encounterGroup.slots.push(FactoryLogic.createEncounterSlot(monster.id), FactoryLogic.createEncounterSlot(monster.id));
		encounter.groups.push(encounterGroup);

		const conditions = ConditionExtractionLogic.getConditionsForEncounter(encounter, [ sourcebook ]);

		expect(conditions.map(c => [ c.owner, c.name ])).toEqual([
			[ 'Hexer', 'Hexed' ],
			[ 'Hexers', 'Gloomy' ]
		]);
	});
});

describe('getStaleConditions', () => {
	const hexer = createMonster('Hexer', [
		createAbility('Hex Bolt', [
			FactoryLogic.createAbilitySectionText('The target is hexed (save ends). A hexed target glows green.')
		])
	]);
	const goblin = createMonster('Goblin', []);

	const group = FactoryLogic.createMonsterGroup();
	group.monsters.push(hexer, goblin);
	const sourcebook = FactoryLogic.createSourcebook();
	sourcebook.monsterGroups.push(group);

	const createEncounter = (includeHexer: boolean) => {
		const encounter = FactoryLogic.createEncounter();
		const encounterGroup = FactoryLogic.createEncounterGroup();
		const goblinSlot = FactoryLogic.createEncounterSlot(goblin.id);
		encounterGroup.slots.push(goblinSlot);
		if (includeHexer) {
			encounterGroup.slots.push(FactoryLogic.createEncounterSlot(hexer.id));
		}
		encounter.groups.push(encounterGroup);
		return { encounter: encounter, goblinSlot: goblinSlot };
	};

	test('flags a condition whose source has been removed from the encounter', () => {
		const { encounter, goblinSlot } = createEncounter(true);
		const hexed = ConditionExtractionLogic.getConditionsForEncounter(encounter, [ sourcebook ]).find(c => c.name === 'Hexed')!;
		goblinSlot.customization.conditions.push(ConditionLogic.createFromExtracted(hexed));

		expect(ConditionExtractionLogic.getStaleConditions(encounter, [ sourcebook ])).toEqual([]);

		encounter.groups[0].slots = encounter.groups[0].slots.filter(s => s.monsterID !== hexer.id);

		expect(ConditionExtractionLogic.getStaleConditions(encounter, [ sourcebook ])).toEqual([
			{ monster: 'Goblin', condition: 'Hexed', owner: 'Hexer' }
		]);
	});

	test('never flags a hand-typed, quick, or standard condition', () => {
		const { encounter, goblinSlot } = createEncounter(false);
		goblinSlot.customization.conditions.push(
			{ id: 'custom', type: ConditionType.Custom, text: '**Webbed**\n\nCan’t move.', ends: ConditionEndType.SaveEnds },
			{ id: 'quick', type: ConditionType.Quick, text: 'Surprised', ends: ConditionEndType.UntilRemoved },
			{ id: 'standard', type: ConditionType.Dazed, text: '', ends: ConditionEndType.SaveEnds }
		);

		expect(ConditionExtractionLogic.getStaleConditions(encounter, [ sourcebook ])).toEqual([]);
	});
});
