import { describe, expect, test } from 'vitest';
import { CreatureLogic } from '@/logic/creature-logic';
import { FeatureSummonChoice } from '@/models/feature';
import { Summon } from '@/models/summon';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { undead } from '@/data/classes/summoner/undead';

describe('isSummon', () => {
	test('returns true for Summoner minions', () => {
		const signatureMinions = undead.featuresByLevel.flatMap(fbl => fbl.features)
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
		const bear = companions.data.options.find(o => o.id === 'beastheart-1-2a-2') as Summon;
		expect(CreatureLogic.isCompanion(bear)).toBe(true);
	});

	test('returns false for Summoner minions', () => {
		const signatureMinions = undead.featuresByLevel.flatMap(fbl => fbl.features)
			.find(f => f.id === 'summoner-4-1-4') as FeatureSummonChoice;
		const skeleton = signatureMinions.data.options.find(o => o.id === 'summoner-4-1-4c') as Summon;
		expect(CreatureLogic.isCompanion(skeleton)).toBe(false);
	});
});
