import { describe, expect, it } from 'vitest';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { SummonLogic } from '@/logic/summon-logic';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';
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

	it('does not stack when a customized minion is saved back to the hero', () => {
		const hero = buildSummoner('summoner-1-7c');
		const processed = getSummon(hero, 'Ensnarer');
		const choice = HeroLogic.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.SummonChoice)
			.flatMap(f => f.data.selected).find(s => s.name === 'Ensnarer')!;

		processed.name = 'Renamed';
		SummonLogic.applyCustomization(choice.monster, processed);
		SummonLogic.applyCustomization(choice.monster, getSummon(hero, 'Renamed'));

		const after = getSummon(hero, 'Renamed');
		expect(MonsterLogic.getStamina(after)).toBe(MonsterLogic.getStamina(processed));
		expect(MonsterLogic.getStability(after)).toBe(MonsterLogic.getStability(processed));
	});
});

// A beastheart with the basilisk (or another named companion) as their companion
const buildBeastheart = (level = 1, companionName = 'Basilisk'): Hero => {
	const hero = FactoryLogic.createHero();

	hero.class = Utils.copy(beastheart);
	hero.class.level = level;

	hero.class.featuresByLevel
		.flatMap(lvl => lvl.features)
		.filter(f => f.id === 'beastheart-1-2a')
		.filter(f => f.type === FeatureType.SummonChoice)
		.forEach(f => f.data.selected = f.data.options.filter(o => o.name === companionName).map(o => Utils.copy(o)));

	return hero;
};

const getCompanionChoice = (hero: Hero) => {
	return HeroLogic.getFeatures(hero)
		.map(f => f.feature)
		.filter(f => f.type === FeatureType.SummonChoice)
		.flatMap(f => f.data.selected)
		.find(s => s.monster.id === 'beastheart-companion-1')!;
};

describe('Beastheart companion', () => {
	it('keeps its Stamina in step with the beastheart after being renamed', () => {
		const hero = buildBeastheart();

		const companion = HeroLogic.getSummons(hero).find(s => s.monster.id === 'beastheart-companion-1')!.monster;
		expect(MonsterLogic.getStamina(companion)).toBe(HeroLogic.getStamina(hero));

		companion.name = 'Gorgon';
		SummonLogic.applyCustomization(getCompanionChoice(hero).monster, companion);

		HeroLogic.setLevel(hero, FactoryLogic.createOptions(), 2);

		const after = HeroLogic.getSummons(hero).find(s => s.monster.id === 'beastheart-companion-1')!.monster;
		expect(after.name).toBe('Gorgon');
		expect(HeroLogic.getStamina(hero)).toBeGreaterThan(MonsterLogic.getStamina(companion));
		expect(MonsterLogic.getStamina(after)).toBe(HeroLogic.getStamina(hero));
	});

	// Strong Like Bear: the beastheart gains +1 stability, not the bear
	it('gives the beastheart, not the bear, the bear\'s stability bonus', () => {
		const withBasilisk = buildBeastheart();
		const withBear = buildBeastheart(1, 'Bear');
		expect(HeroLogic.getStability(withBear)).toBe(HeroLogic.getStability(withBasilisk) + 1);

		const bear = HeroLogic.getSummons(withBear).find(s => s.monster.id === 'beastheart-companion-2')!.monster;
		expect(MonsterLogic.getStability(bear)).toBe(bear.stability);
	});

	// Hellish Pact: the beastheart shares the hellhound's fire immunity
	it('gives the beastheart the hellhound\'s fire immunity', () => {
		const fireImmunity = (hero: Hero) => HeroLogic.getDamageModifiers(hero)
			.find(dm => (dm.damageType === DamageType.Fire) && (dm.modifierType === DamageModifierType.Immunity))?.value || 0;

		expect(fireImmunity(buildBeastheart())).toBe(0);
		expect(fireImmunity(buildBeastheart(1, 'Hellhound'))).toBe(3);
	});
});
