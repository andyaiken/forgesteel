import { FeatureSummonChoice, FeatureSummonChoiceData } from '@/models/feature';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { HeroLogic } from '@/logic/hero-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Summon } from '@/models/summon';
import { beastheart } from '@/data/classes/beastheart/beastheart';

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
