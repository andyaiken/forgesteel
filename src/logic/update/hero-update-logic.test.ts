import { describe, expect, it } from 'vitest';
import { Complication } from '@/models/complication';
import { ComplicationData } from '@/data/complication-data';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureComplication } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { Utils } from '@/utils/utils';
import { berserker } from '@/data/classes/fury/berserker';
import { boren } from '@/data/kits/stormwight/boren';
import { conduit } from '@/data/classes/conduit/conduit';
import { core } from '@/data/sourcebooks/official/core';
import { fury } from '@/data/classes/fury/fury';
import { life } from '@/data/domains/life';
import { orden } from '@/data/sourcebooks/official/orden';
import { stormwight } from '@/data/classes/fury/stormwight';

describe('complications added through customize', () => {
	const buildHeroWithComplication = (complication: Complication) => {
		const hero = FactoryLogic.createHero();
		const feature = FactoryLogic.feature.createComplication({ id: 'custom-complication' });
		feature.data.selected = Utils.copy(complication);
		hero.features.push(feature);
		return hero;
	};

	// The hero's features are re-copied on every load, so the selection is lost unless
	// updateHeroFeatureData carries it across
	it('carries the chosen complication across a reload', () => {
		const hero = buildHeroWithComplication(ComplicationData.gettingTooOldForThis);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getComplications(hero).map(c => c.id)).toEqual([ 'comp-gettingTooOldForThis' ]);
	});

	// Taking the sourcebook's copy is what lets a complication pick up rules changes
	it('refreshes the chosen complication from the sourcebook', () => {
		const hero = buildHeroWithComplication(ComplicationData.gettingTooOldForThis);
		(hero.features[hero.features.length - 1] as FeatureComplication).data.selected!.description = 'stale';

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getComplications(hero)[0].description)
			.toEqual(ComplicationData.gettingTooOldForThis.description);
	});

	// A homebrew complication whose sourcebook is gone must survive rather than vanish
	it('keeps a chosen complication that is not in any sourcebook', () => {
		const hero = buildHeroWithComplication({ id: 'homebrew-complication', name: 'Homebrew', description: 'Mine', features: [] });

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getComplications(hero).map(c => c.name)).toEqual([ 'Homebrew' ]);
	});

	// An unconfigured complication feature is left alone, not treated as a selection
	it('leaves an unconfigured complication feature empty', () => {
		const hero = FactoryLogic.createHero();
		hero.features.push(FactoryLogic.feature.createComplication({ id: 'custom-complication' }));

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getComplications(hero)).toEqual([]);
	});
});

describe('updateHeroData', () => {
	const buildBerserker = (ferocity: number) => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = 4;
		hero.class.subclasses.filter(sc => sc.id === berserker.id).forEach(sc => sc.selected = true);
		hero.class.featuresByLevel
			.flatMap(lvl => lvl.features)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.value = ferocity);
		return hero;
	};

	// The hero's class is re-copied from the sourcebook on every load, so anything the encounter
	// has written onto a feature is lost unless updateHeroFeatureData carries it across
	it('carries a claimed surge gain across a reload', () => {
		const hero = buildBerserker(4);
		HeroLogic.getAllSurgeGains(hero).forEach(f => f.data.used = true);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getAllSurgeGains(hero).map(f => `${f.data.tag}:${f.data.used}`))
			.toEqual([ 'push:true', 'push 2:true' ]);
	});

	it('leaves an unclaimed surge gain claimable', () => {
		const hero = buildBerserker(4);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getAllSurgeGains(hero).map(f => f.data.used)).toEqual([ false, false ]);
	});

	// The gain sits behind a Ferocity 4 rung, and the resource value is itself only restored by the
	// same pass - so this would miss if it relied on the gain being unlocked at the time
	it('reaches a gain whose threshold is not unlocked', () => {
		const hero = buildBerserker(0);
		HeroLogic.getAllSurgeGains(hero).forEach(f => f.data.used = true);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(HeroLogic.getAllSurgeGains(hero).map(f => f.data.used)).toEqual([ true, true ]);
	});

	// A heroic resource's gains come from three places - the resource feature itself, standalone gain
	// features, and the hero's domains - and all three are re-copied from the sourcebook on load
	it('carries a claimed heroic resource gain across a reload', () => {
		const hero = buildBerserker(4);
		HeroLogic.getHeroicResources(hero).flatMap(hr => hr.gains).forEach(g => g.used = true);
		const claimed = HeroLogic.getHeroicResources(hero).flatMap(hr => hr.gains).map(g => g.tag);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		// 'take-damage 2' is a standalone gain feature rather than one of the resource's own
		expect(claimed).toContain('take-damage 2');
		expect(HeroLogic.getHeroicResources(hero).flatMap(hr => hr.gains).map(g => `${g.tag}:${g.used}`))
			.toEqual(claimed.map(tag => `${tag}:true`));
	});

	it('carries a claimed domain gain across a reload', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(conduit);
		hero.class.level = 1;
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Domain)
			.forEach(f => f.data.selected = [ Utils.copy(life) ]);

		const domainGains = () => HeroLogic.getDomains(hero).flatMap(d => d.resourceGains);
		expect(domainGains().length).toBe(1);
		domainGains().forEach(g => g.used = true);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(domainGains().map(g => g.used)).toEqual([ true ]);
	});

	// A kit's features never reach the dispatch loop - the hero's class is replaced before it takes
	// its snapshot, so the Kit feature has nothing selected at that point - and the kit itself is
	// re-copied from the sourcebook, so the Kit case has to walk into it
	it('carries a claimed kit surge gain across a reload', () => {
		const hero = FactoryLogic.createHero();
		hero.class = Utils.copy(fury);
		hero.class.level = 4;
		hero.class.subclasses.filter(sc => sc.id === stormwight.id).forEach(sc => sc.selected = true);
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => f.data.selected = [ Utils.copy(boren) ]);

		HeroLogic.getAllSurgeGains(hero).forEach(f => f.data.used = true);
		const claimed = HeroLogic.getAllSurgeGains(hero).map(f => f.data.tag);

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		expect(claimed).toContain('grab');
		expect(HeroLogic.getAllSurgeGains(hero).map(f => `${f.data.tag}:${f.data.used}`))
			.toEqual(claimed.map(tag => `${tag}:true`));
	});

	it('leaves a gain cleared when the sourcebook no longer lines up', () => {
		const hero = buildBerserker(4);
		HeroLogic.getHeroicResources(hero).flatMap(hr => hr.gains).forEach(g => g.used = true);
		// Stand in for a data edit that reworded a gain's tag
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.HeroicResource)
			.forEach(f => f.data.gains.forEach(g => g.tag = `${g.tag}-renamed`));

		HeroUpdateLogic.updateHero(hero, [ core, orden ]);

		const own = HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.HeroicResource)
			.flatMap(f => f.data.gains);
		expect(own.map(g => g.used)).toEqual(own.map(() => false));
	});
});
