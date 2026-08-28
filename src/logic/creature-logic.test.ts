import { describe, expect, test } from 'vitest';
import { CreatureLogic } from '@/logic/creature-logic';
import { FeatureSummonChoice } from '@/models/feature';
import { Summon } from '@/models/summon';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { circleOfGraves } from '@/data/classes/summoner/graves';

describe('isSummon', () => {
	test('returns true for Summoner minions', () => {
		const signatureMinions = circleOfGraves.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-4') as FeatureSummonChoice;
		const skeleton = signatureMinions.data.options.find(o => o.id === 'summoner-4-1-4c') as Summon;
		expect(CreatureLogic.isSummon(skeleton)).toBe(true);
	});

	test('returns false for Beastheart Companions', () => {
		const companions = beastheart.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'beastheart-1-2a') as FeatureSummonChoice;
		const bear = companions.data.options.find(o => o.id === 'beastheart-1-2a-2') as Summon;
		expect(CreatureLogic.isSummon(bear)).toBe(false);
	});
});

describe('isCompanion', () => {
	test('returns true for Beastheart Companions', () => {
		const companions = beastheart.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'beastheart-1-2a') as FeatureSummonChoice;
		const bear = companions.data.options.find(o => o.id === 'beastheart-companion-2') as Summon;
		expect(CreatureLogic.isCompanion(bear)).toBe(true);
	});

	test('returns false for Summoner minions', () => {
		const signatureMinions = circleOfGraves.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-4') as FeatureSummonChoice;
		const skeleton = signatureMinions.data.options.find(o => o.id === 'summoner-4-1-4c') as Summon;
		expect(CreatureLogic.isCompanion(skeleton)).toBe(false);
	});
});

describe('getEchelon', () => {
	test('advances every three levels', () => {
		expect([ 1, 2, 3 ].map(CreatureLogic.getEchelon)).toEqual([ 1, 1, 1 ]);
		expect([ 4, 5, 6 ].map(CreatureLogic.getEchelon)).toEqual([ 2, 2, 2 ]);
		expect([ 7, 8, 9 ].map(CreatureLogic.getEchelon)).toEqual([ 3, 3, 3 ]);
		expect(CreatureLogic.getEchelon(10)).toBe(4);
	});

	test('keeps monsters above the hero levels in the fourth echelon', () => {
		expect(CreatureLogic.getEchelon(11)).toBe(4);
		expect(CreatureLogic.getEchelon(12)).toBe(4);
	});

	test('never drops below the first echelon', () => {
		expect(CreatureLogic.getEchelon(0)).toBe(1);
		expect(CreatureLogic.getEchelon(-1)).toBe(1);
	});
});
