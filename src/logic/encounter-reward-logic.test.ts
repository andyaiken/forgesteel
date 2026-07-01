import { describe, expect, test } from 'vitest';
import { EncounterRewardLogic } from '@/logic/encounter-reward-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { Options } from '@/models/options';

const createHero = (folder: string, isDisabled = false) => {
	const hero = FactoryLogic.createHero([]);
	hero.folder = folder;
	hero.isDisabled = isDisabled;
	return hero;
};

describe('getPresentHeroes', () => {
	test('excludes heroes whose persisted copy is disabled', () => {
		const active = createHero('party');
		const disabled = createHero('party', true);
		const encounterHeroes = [ active, disabled ];
		const persistedHeroes = [
			{ ...active, isDisabled: false },
			{ ...disabled, isDisabled: true }
		];

		const result = EncounterRewardLogic.getPresentHeroes(encounterHeroes, persistedHeroes);

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe(active.id);
	});
});

describe('getPartyHeroes', () => {
	test('includes disabled heroes in the party folder', () => {
		const heroes = [
			createHero('party'),
			createHero('party', true),
			createHero('other')
		];

		const result = EncounterRewardLogic.getPartyHeroes(heroes, 'party');

		expect(result).toHaveLength(2);
	});
});

describe('getTargetHeroes', () => {
	test('present target excludes disabled heroes', () => {
		const active = createHero('party');
		const disabled = createHero('party', true);
		const encounterHeroes = [ active, disabled ];
		const persistedHeroes = [ active, disabled ];

		const result = EncounterRewardLogic.getTargetHeroes('present', encounterHeroes, persistedHeroes, 'party');

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe(active.id);
	});

	test('party target includes disabled heroes', () => {
		const active = createHero('party');
		const disabled = createHero('party', true);
		const encounterHeroes = [ active ];
		const persistedHeroes = [ active, disabled ];

		const result = EncounterRewardLogic.getTargetHeroes('party', encounterHeroes, persistedHeroes, 'party');

		expect(result).toHaveLength(2);
	});
});

describe('getDefaultVictories', () => {
	test('uses active party heroes for default victories', () => {
		const heroes = [
			createHero('party'),
			createHero('party'),
			createHero('party', true)
		];
		heroes[0].state.victories = 2;
		heroes[1].state.victories = 4;
		heroes[2].state.victories = 10;
		const options = { heroParty: 'party' } as Options;

		expect(EncounterRewardLogic.getDefaultVictories(options, heroes)).toBe(3);
	});
});
