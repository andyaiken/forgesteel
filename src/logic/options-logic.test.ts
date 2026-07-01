import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';
import { OptionsLogic } from '@/logic/options-logic';

const createPartyHero = (folder: string, level = 1, victories = 0, isDisabled = false) => {
	const hero = FactoryLogic.createHero([]);
	hero.folder = folder;
	hero.isDisabled = isDisabled;
	hero.class = FactoryLogic.createClass();
	hero.class.level = level;
	hero.state.victories = victories;
	return hero;
};

describe('getHeroCount', () => {
	test('excludes disabled heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party'),
			createPartyHero('party'),
			createPartyHero('party', 1, 0, true)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroCount(options, heroes)).toBe(2);
	});

	test('treats legacy string disabled values as disabled', () => {
		const hero = createPartyHero('party');
		(hero as unknown as { isDisabled: string }).isDisabled = 'true';
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroCount(options, [ hero ])).toBe(0);
		expect(HeroLogic.isDisabled(hero)).toBe(true);
	});
});

describe('getHeroLevel', () => {
	test('excludes disabled heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party', 2),
			createPartyHero('party', 4),
			createPartyHero('party', 10, 0, true)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroLevel(options, heroes)).toBe(3);
	});
});

describe('getHeroVictories', () => {
	test('excludes disabled heroes when a party is defined', () => {
		const heroes: Hero[] = [
			createPartyHero('party', 1, 2),
			createPartyHero('party', 1, 4),
			createPartyHero('party', 1, 10, true)
		];
		const options = { heroParty: 'party' } as Options;

		expect(OptionsLogic.getHeroVictories(options, heroes)).toBe(3);
	});
});
