import { Montage, MontageChallenge, MontageSection } from '@/models/montage';
import { describe, expect, test } from 'vitest';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { FactoryLogic } from './factory-logic';
import { Hero } from '@/models/hero';
import { MontageLogic } from './montage-logic';
import { Options } from '@/models/options';

describe('getHeroCount', () => {
	test('returns the correct hero count when defined in options', () => {
		const options = {
			heroCount: 4
		} as Options;

		expect(MontageLogic.getHeroCount([], options)).toBe(4);
	});

	test('returns the correct hero count a party is defined', () => {
		const partyHero = FactoryLogic.createHero([]);
		partyHero.folder = 'test';
		const heroes: Hero[] = new Array(4).fill(partyHero);
		const nonPartyHero = FactoryLogic.createHero([]);
		nonPartyHero.folder = 'asdf';
		heroes.push(nonPartyHero);
		const options = {
			heroParty: 'test'
		} as Options;

		expect(MontageLogic.getHeroCount(heroes, options)).toBe(4);
	});
});

describe('getSuccessLimit', () => {
	test.each([
		[ EncounterDifficulty.Easy, 5, 5 ],
		[ EncounterDifficulty.Standard, 5, 6 ],
		[ EncounterDifficulty.Hard, 5, 7 ],
		[ EncounterDifficulty.Easy, 3, 3 ],
		[ EncounterDifficulty.Standard, 3, 4 ],
		[ EncounterDifficulty.Hard, 3, 5 ],
		[ EncounterDifficulty.Easy, 1, 2 ], // Minimum of 2!
		[ EncounterDifficulty.Easy, 7, 7 ],
		[ EncounterDifficulty.Standard, 7, 8 ],
		[ EncounterDifficulty.Hard, 7, 9 ]
	])('returns the proper success limit for various party sizes and difficulties', (difficulty: EncounterDifficulty, numHeroes: number, expectedSuccesses: number) => {
		const montage = {
			difficulty: difficulty
		} as Montage;
		const partyHero = FactoryLogic.createHero([]);
		partyHero.folder = 'test';
		const heroes: Hero[] = new Array(numHeroes).fill(partyHero);
		const options = {
			heroParty: 'test'
		} as Options;

		const result = MontageLogic.getSuccessLimit(montage, heroes, options);
		expect(result).toBe(expectedSuccesses);
	});
});

describe('getFailureLimit', () => {
	test.each([
		[ EncounterDifficulty.Easy, 5, 5 ],
		[ EncounterDifficulty.Standard, 5, 4 ],
		[ EncounterDifficulty.Hard, 5, 3 ],
		[ EncounterDifficulty.Easy, 3, 3 ],
		[ EncounterDifficulty.Standard, 3, 2 ],
		[ EncounterDifficulty.Hard, 3, 2 ], // Minimum of 2!
		[ EncounterDifficulty.Easy, 7, 7 ],
		[ EncounterDifficulty.Standard, 7, 6 ],
		[ EncounterDifficulty.Hard, 7, 5 ]
	])('returns the proper success limit for various party sizes and difficulties', (difficulty: EncounterDifficulty, numHeroes: number, expectedSuccesses: number) => {
		const montage = {
			difficulty: difficulty
		} as Montage;
		const options = {
			heroCount: numHeroes
		} as Options;

		const result = MontageLogic.getFailureLimit(montage, [], options);
		expect(result).toBe(expectedSuccesses);
	});
});

describe('getOutcome', () => {
	test.each([
		[ EncounterDifficulty.Easy, 5, 5 ],
		[ EncounterDifficulty.Easy, 5, 6 ],
		[ EncounterDifficulty.Standard, 5, 6 ],
		[ EncounterDifficulty.Hard, 5, 7 ]
	])('correctly identifies total successes', (difficulty: EncounterDifficulty, numHeroes: number, numSuccesses: number) => {
		const challenge: MontageChallenge = {
			successes: numSuccesses
		} as MontageChallenge;
		const montage = {
			difficulty: difficulty,
			sections: [ {
				challenges: [ challenge ]
			} as MontageSection ]
		} as Montage;
		const options = {
			heroCount: numHeroes
		} as Options;

		const result = MontageLogic.getOutcome(montage, [], options);
		expect(result).toBe('Total Success');
	});

	test.each([
		[ EncounterDifficulty.Hard, 5, 6, 4 ],
		[ EncounterDifficulty.Hard, 4, 5, 3 ]
	])('correctly identifies partial successes', (difficulty: EncounterDifficulty, numHeroes: number, numSuccesses: number, numFailures: number) => {
		const challenge: MontageChallenge = {
			successes: numSuccesses,
			failures: numFailures
		} as MontageChallenge;
		const montage = {
			difficulty: difficulty,
			sections: [ {
				challenges: [ challenge ]
			} as MontageSection ]
		} as Montage;
		const options = {
			heroCount: numHeroes
		} as Options;

		const result = MontageLogic.getOutcome(montage, [], options);
		expect(result).toBe('Partial Success');
	});

	test.each([
		[ EncounterDifficulty.Easy, 5, 4, 5 ],
		[ EncounterDifficulty.Standard, 5, 5, 4 ],
		[ EncounterDifficulty.Hard, 5, 4, 3 ]
	])('correctly identifies total failures', (difficulty: EncounterDifficulty, numHeroes: number, numSuccesses: number, numFailures: number) => {
		const challenge: MontageChallenge = {
			successes: numSuccesses,
			failures: numFailures
		} as MontageChallenge;
		const montage = {
			difficulty: difficulty,
			sections: [ {
				challenges: [ challenge ]
			} as MontageSection ]
		} as Montage;
		const options = {
			heroCount: numHeroes
		} as Options;

		const result = MontageLogic.getOutcome(montage, [], options);
		expect(result).toBe('Total Failure');
	});

	test.each([
		[ EncounterDifficulty.Easy, 5, 4, 4 ]
	])('correctly identifies in progress montage tests', (difficulty: EncounterDifficulty, numHeroes: number, numSuccesses: number, numFailures: number) => {
		const challenge: MontageChallenge = {
			successes: numSuccesses,
			failures: numFailures
		} as MontageChallenge;
		const montage = {
			difficulty: difficulty,
			sections: [ {
				challenges: [ challenge ]
			} as MontageSection ]
		} as Montage;
		const options = {
			heroCount: numHeroes
		} as Options;

		const result = MontageLogic.getOutcome(montage, [], options);
		expect(result).toBe('In Progress');
	});
});
