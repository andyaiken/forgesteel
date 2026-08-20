import { describe, expect, it } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Utils } from '@/utils/utils';
import { summoner } from '@/data/classes/summoner/summoner';

// A summoner of the Circle of Blight, with the given formation selected (if any)
const buildSummoner = (formationID?: string, level = 1): Hero => {
	const hero = FactoryLogic.createHero();

	hero.class = Utils.copy(summoner);
	hero.class.level = level;
	hero.class.subclasses.filter(sc => sc.id === 'summoner-sub-1').forEach(sc => sc.selected = true);

	// Take every minion on offer, so we have some to inspect
	hero.class.subclasses
		.filter(sc => sc.selected)
		.flatMap(sc => sc.featuresByLevel)
		.flatMap(lvl => lvl.features)
		.filter(f => f.type === FeatureType.SummonChoice)
		.forEach(f => f.data.selected = f.data.options);

	const formationChoice = hero.class.featuresByLevel
		.flatMap(lvl => lvl.features)
		.find(f => f.id === 'summoner-1-7');
	if (formationChoice && (formationChoice.type === FeatureType.Choice)) {
		const option = formationChoice.data.options.find(o => o.feature.id === formationID);
		formationChoice.data.selected = option ? [ option.feature ] : [];
	}

	return hero;
};

const getSummon = (hero: Hero, name: string) => {
	const summon = HeroLogic.getSummons(hero).find(s => s.monster.name === name);
	expect(summon).toBeDefined();
	return summon!.monster;
};

describe('Elite Formation', () => {
	it('leaves minions at their printed Stamina and stability when a different formation is chosen', () => {
		// Horde Formation has no effect on individual minions
		const minion = getSummon(buildSummoner('summoner-1-7a'), 'Ensnarer');

		expect(minion.role.organization).toBe(MonsterOrganizationType.Minion);
		expect(MonsterLogic.getStamina(minion)).toBe(minion.stamina);
		expect(MonsterLogic.getStability(minion)).toBe(minion.stability);
	});

	it('gives each minion +3 Stamina and +1 stability', () => {
		const base = getSummon(buildSummoner(), 'Ensnarer');
		const elite = getSummon(buildSummoner('summoner-1-7c'), 'Ensnarer');

		expect(MonsterLogic.getStamina(elite)).toBe(MonsterLogic.getStamina(base) + 3);
		expect(MonsterLogic.getStability(elite)).toBe(MonsterLogic.getStability(base) + 1);
	});

	it('does not buff the summoner\'s champion, who is not a minion', () => {
		// The Portfolio Champion arrives at level 8
		const base = getSummon(buildSummoner(undefined, 8), 'Demon Lord’s Aspect');
		const elite = getSummon(buildSummoner('summoner-1-7c', 8), 'Demon Lord’s Aspect');

		expect(elite.role.organization).toBe(MonsterOrganizationType.Champion);
		expect(MonsterLogic.getStamina(elite)).toBe(MonsterLogic.getStamina(base));
		expect(MonsterLogic.getStability(elite)).toBe(MonsterLogic.getStability(base));
	});
});
