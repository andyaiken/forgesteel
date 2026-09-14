import { ConditionEndType, ConditionType } from '@/enums/condition-type';
import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { MonsterData } from '@/data/monster-data';
import { Options } from '@/models/options';
import { SessionLogic } from '@/logic/session-logic';
import { Sourcebook } from '@/models/sourcebook';

const createPartyHero = (folder: string, isActive = true) => {
	const hero = FactoryLogic.createHero();
	hero.folder = folder;
	hero.isActive = isActive;
	return hero;
};

describe('startEncounter', () => {
	test('adds only active heroes when a party is configured', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party'),
			createPartyHero('party', false)
		];
		const encounter = FactoryLogic.createEncounter();
		const options = { party: 'party' } as Options;

		const started = SessionLogic.startEncounter(encounter, [], heroes, options);

		expect(started.heroes).toHaveLength(2);
	});

	test('skips group monster population when active party is below minHeroCount', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party', false),
			createPartyHero('party', false)
		];
		const encounter = FactoryLogic.createEncounter();
		encounter.groups.push(FactoryLogic.createEncounterGroup());
		encounter.groups[0].minHeroCount = 2;
		encounter.groups[0].slots.push(FactoryLogic.createEncounterSlot('test-monster'));
		const options = { party: 'party' } as Options;

		const started = SessionLogic.startEncounter(encounter, [], heroes, options);

		expect(started.groups[0].slots[0].monsters).toHaveLength(0);
		expect(started.heroes).toHaveLength(1);
	});
});

describe('startEncounter customization presets', () => {
	const sourcebooks = [ { monsterGroups: [ MonsterData.goblin ] } as Sourcebook ];

	test('applies preset stamina damage, temp stamina, and conditions to generated non-minion monsters', () => {
		const heroes: Hero[] = [ createPartyHero('party') ];
		const encounter = FactoryLogic.createEncounter();
		encounter.groups.push(FactoryLogic.createEncounterGroup());
		const slot = FactoryLogic.createEncounterSlot('goblin-5'); // Goblin Assassin, a non-minion (Horde)
		slot.customization.staminaDamage = 2;
		slot.customization.staminaTemp = 3;
		slot.customization.conditions = [ { id: 'c1', type: ConditionType.Dazed, text: '', ends: ConditionEndType.UntilRemoved } ];
		encounter.groups[0].slots.push(slot);
		const options = { party: 'party' } as Options;

		const started = SessionLogic.startEncounter(encounter, sourcebooks, heroes, options);

		const monsters = started.groups[0].slots[0].monsters;
		expect(monsters.length).toBeGreaterThan(0);
		monsters.forEach(m => {
			expect(m.state.staminaDamage).toBe(2);
			expect(m.state.staminaTemp).toBe(3);
			expect(m.state.conditions).toHaveLength(1);
			expect(m.state.conditions[0].type).toBe(ConditionType.Dazed);
		});
	});

	test('applies preset stamina damage and conditions to the pooled slot state for minions, not individual monsters', () => {
		const heroes: Hero[] = [ createPartyHero('party') ];
		const encounter = FactoryLogic.createEncounter();
		encounter.groups.push(FactoryLogic.createEncounterGroup());
		const slot = FactoryLogic.createEncounterSlot('goblin-1'); // Goblin Runner, a minion
		slot.customization.staminaDamage = 5;
		slot.customization.conditions = [ { id: 'c1', type: ConditionType.Prone, text: '', ends: ConditionEndType.UntilRemoved } ];
		encounter.groups[0].slots.push(slot);
		const options = { party: 'party' } as Options;

		const started = SessionLogic.startEncounter(encounter, sourcebooks, heroes, options);

		const resultSlot = started.groups[0].slots[0];
		expect(resultSlot.state.staminaDamage).toBe(5);
		expect(resultSlot.state.conditions).toHaveLength(1);
		expect(resultSlot.state.conditions[0].type).toBe(ConditionType.Prone);
		expect(resultSlot.monsters.length).toBeGreaterThan(0);
		resultSlot.monsters.forEach(m => {
			expect(m.state.staminaDamage).toBe(0);
			expect(m.state.conditions).toHaveLength(0);
		});
	});
});

describe('startEncounter without party', () => {
	test('adds no heroes when party is not configured', () => {
		const heroes: Hero[] = [ createPartyHero('party') ];
		const encounter = FactoryLogic.createEncounter();
		const options = { party: '' } as Options;

		const started = SessionLogic.startEncounter(encounter, [], heroes, options);

		expect(started.heroes).toHaveLength(0);
	});
});
