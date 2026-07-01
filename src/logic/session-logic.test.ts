import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { SessionLogic } from '@/logic/session-logic';

const createPartyHero = (folder: string, isDisabled = false) => {
	const hero = FactoryLogic.createHero([]);
	hero.folder = folder;
	hero.isDisabled = isDisabled;
	return hero;
};

describe('startEncounter', () => {
	test('adds only active heroes when a party is configured', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party'),
			createPartyHero('party', true)
		];
		const encounter = FactoryLogic.createEncounter();
		const options = { party: 'party' } as Options;

		const started = SessionLogic.startEncounter(encounter, [], heroes, options);

		expect(started.heroes).toHaveLength(2);
	});

	test('skips group monster population when active party is below minHeroCount', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party', true),
			createPartyHero('party', true)
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

describe('startEncounter without party', () => {
	test('adds no heroes when party is not configured', () => {
		const heroes: Hero[] = [ createPartyHero('party') ];
		const encounter = FactoryLogic.createEncounter();
		const options = { party: '' } as Options;

		const started = SessionLogic.startEncounter(encounter, [], heroes, options);

		expect(started.heroes).toHaveLength(0);
	});
});
