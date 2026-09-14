import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { OptionsLogic } from '@/logic/options-logic';

const createPartyHero = (folder: string, level = 1, victories = 0, isActive = true) => {
	const hero = FactoryLogic.createHero();
	hero.folder = folder;
	hero.isActive = isActive;
	hero.class = FactoryLogic.createClass();
	hero.class.level = level;
	hero.state.victories = victories;
	return hero;
};

describe('getHeroCount', () => {
	test('returns the correct hero count when defined in options', () => {
		const options = {
			heroCount: 4
		} as Options;

		expect(OptionsLogic.getHeroCount(options, [])).toBe(4);
	});

	test('returns the correct hero count when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('test'),
			createPartyHero('test'),
			createPartyHero('test'),
			createPartyHero('test'),
			createPartyHero('asdf')
		];
		const options = {
			heroParty: 'test'
		} as Options;

		expect(OptionsLogic.getHeroCount(options, heroes)).toBe(4);
	});

	test('excludes inactive heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party'),
			createPartyHero('party', 1, 0, false)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroCount(options, heroes)).toBe(2);
	});
});

describe('getHeroLevel', () => {
	test('excludes inactive heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party', 2),
			createPartyHero('party', 4),
			createPartyHero('party', 10, 0, false)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroLevel(options, heroes)).toBe(3);
	});
});

describe('getHeroVictories', () => {
	test('excludes inactive heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party', 1, 2),
			createPartyHero('party', 1, 4),
			createPartyHero('party', 1, 10, false)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroVictories(options, heroes)).toBe(3);
	});
});
