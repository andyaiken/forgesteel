import { FeatureClassAbility, FeatureComplication, FeatureSummonChoice } from '@/models/feature';
import { describe, expect, it } from 'vitest';
import { Complication } from '@/models/complication';
import { ComplicationData } from '@/data/complication-data';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { ExtensionLogic } from '@/logic/extension-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { beastheart } from '@/data/classes/beastheart/beastheart';
import { beastheartSourcebook } from '@/data/sourcebooks/official/beastheart';
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

describe('extensions and standalone subclasses', () => {
	const createHomebrew = () => {
		const sourcebook = FactoryLogic.createSourcebook();
		sourcebook.id = 'homebrew';

		const extension = FactoryLogic.createExtension();
		extension.targetKind = 'class';
		extension.targetID = beastheart.id;
		extension.changes.push({
			id: 'change',
			type: ExtensionChangeType.AddAbility,
			data: { ability: FactoryLogic.createAbility({ id: 'homebrew-ability', name: 'Homebrew', cost: 'signature', sections: [] }) }
		});
		sourcebook.extensions.push(extension);

		const subclass = FactoryLogic.createSubclass();
		subclass.id = 'homebrew-subclass';
		subclass.classID = fury.id;
		sourcebook.subclasses.push(subclass);

		return sourcebook;
	};

	// Builds the hero the way the hero builder does - from the extended sourcebooks, with the extension approved - and picks the homebrew ability
	const buildBeastheart = (homebrew: Sourcebook) => {
		const hero = FactoryLogic.createHero();
		hero.sourcebookIDs = [ core.id, beastheartSourcebook.id, homebrew.id ];
		hero.extensionIDs = homebrew.extensions.map(e => e.id);
		const extended = ExtensionLogic.applyExtensions([ core, beastheartSourcebook, homebrew ], { extensionIDs: hero.extensionIDs });
		hero.class = Utils.copy(SourcebookLogic.getClasses(extended).find(c => c.id === beastheart.id)!);
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.id === 'beastheart-1-7')
			.forEach(f => (f as FeatureClassAbility).data.selectedIDs = [ 'homebrew-ability' ]);
		return hero;
	};

	const getAbilityIDs = (hero: Hero, sourcebooks: Sourcebook[]) => HeroLogic.getAbilities(hero, sourcebooks, []).map(a => a.ability.id);

	it('keeps a homebrew subclass chosen for an official class across a reload', () => {
		const homebrew = createHomebrew();
		const hero = FactoryLogic.createHero();
		hero.sourcebookIDs = [ core.id, homebrew.id ];
		hero.class = Utils.copy(fury);
		const subclass = Utils.copy(homebrew.subclasses[0]);
		subclass.selected = true;
		hero.class.subclasses.push(subclass);

		HeroUpdateLogic.updateHero(hero, [ core, homebrew ]);

		expect(hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.id)).toEqual([ 'homebrew-subclass' ]);
	});

	it('keeps an ability chosen from an extension across a reload', () => {
		const homebrew = createHomebrew();
		const hero = buildBeastheart(homebrew);
		const sourcebooks = [ core, beastheartSourcebook, homebrew ];
		expect(getAbilityIDs(hero, sourcebooks)).toContain('homebrew-ability');

		HeroUpdateLogic.updateHero(hero, sourcebooks);

		expect(getAbilityIDs(hero, sourcebooks)).toContain('homebrew-ability');
	});

	it('drops an extension once the hero no longer uses its sourcebook', () => {
		const homebrew = createHomebrew();
		const hero = buildBeastheart(homebrew);
		hero.sourcebookIDs = [ core.id, beastheartSourcebook.id ];

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook, homebrew ]);

		expect(hero.class!.abilities.map(a => a.id)).not.toContain('homebrew-ability');
	});

	it('drops an extension once the hero no longer approves it', () => {
		const homebrew = createHomebrew();
		const hero = buildBeastheart(homebrew);
		hero.extensionIDs = [];

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook, homebrew ]);

		expect(hero.class!.abilities.map(a => a.id)).not.toContain('homebrew-ability');
	});

	it('drops an extension that has been deleted from its sourcebook', () => {
		const homebrew = createHomebrew();
		const hero = buildBeastheart(homebrew);
		homebrew.extensions = [];

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook, homebrew ]);

		expect(hero.class!.abilities.map(a => a.id)).not.toContain('homebrew-ability');
	});

	// A shared hero, opened by someone without the homebrew, shouldn't lose it
	it('keeps the hero\'s copy when the extension\'s sourcebook is not loaded', () => {
		const homebrew = createHomebrew();
		const hero = buildBeastheart(homebrew);

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook ]);

		expect(hero.class!.abilities.map(a => a.id)).toContain('homebrew-ability');
		expect(getAbilityIDs(hero, [ core, beastheartSourcebook ])).toContain('homebrew-ability');
	});

	it('drops a companion added by an extension once the hero no longer approves it', () => {
		const homebrew = createHomebrew();
		const companionFeature = beastheart.featuresByLevel[0].features.find(f => f.id === 'beastheart-1-2a') as FeatureSummonChoice;
		const companion = Utils.copy(companionFeature.data.options[0]);
		companion.id = 'homebrew-companion';
		companion.monster.id = 'homebrew-companion';
		homebrew.extensions[0].changes.push({ id: 'companion', type: ExtensionChangeType.AddSummonOption, data: { featureID: 'beastheart-1-2a', summon: companion } });

		const hero = buildBeastheart(homebrew);
		const getCompanionIDs = () => HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.id === 'beastheart-1-2a')
			.flatMap(f => (f as FeatureSummonChoice).data.selected.map(s => s.id));
		// Selected the way the picker does it - a copy of the option, which the extension has marked as its own
		HeroLogic.getFeatures(hero)
			.map(f => f.feature as FeatureSummonChoice)
			.filter(f => f.id === 'beastheart-1-2a')
			.forEach(f => f.data.selected = [ Utils.copy(f.data.options.find(o => o.id === 'homebrew-companion')!) ]);

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook, homebrew ]);
		expect(getCompanionIDs()).toEqual([ 'homebrew-companion' ]);

		hero.extensionIDs = [];
		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook, homebrew ]);
		expect(getCompanionIDs()).toEqual([]);
	});

	// Such as a companion whose ID has since changed in the official data - the hero's customizations are worth more than tidiness
	it('keeps a selected summon that is no longer an option, if no extension added it', () => {
		const hero = FactoryLogic.createHero();
		hero.sourcebookIDs = [ core.id, beastheartSourcebook.id ];
		hero.class = Utils.copy(beastheart);
		const feature = HeroLogic.getFeatures(hero).map(f => f.feature).find(f => f.id === 'beastheart-1-2a') as FeatureSummonChoice;
		const companion = Utils.copy(feature.data.options[0]);
		companion.id = 'renamed-companion';
		feature.data.selected = [ companion ];

		HeroUpdateLogic.updateHero(hero, [ core, beastheartSourcebook ]);

		const updated = HeroLogic.getFeatures(hero).map(f => f.feature).find(f => f.id === 'beastheart-1-2a') as FeatureSummonChoice;
		expect(updated.data.selected.map(s => s.id)).toEqual([ 'renamed-companion' ]);
	});
});

describe('extensions to domains and kits', () => {
	const createHomebrew = (targetKind: 'domain' | 'kit', targetID: string) => {
		const sourcebook = FactoryLogic.createSourcebook();
		sourcebook.id = 'homebrew';

		const extension = FactoryLogic.createExtension();
		extension.targetKind = targetKind;
		extension.targetID = targetID;
		extension.changes.push({
			id: 'change',
			type: ExtensionChangeType.AddFeature,
			// Level 0 is a domain's default features; a kit has no levels
			data: { level: (targetKind === 'domain') ? 0 : 1, feature: FactoryLogic.feature.create({ id: 'homebrew-feature', name: 'Homebrew', description: '' }) }
		});
		sourcebook.extensions.push(extension);

		return sourcebook;
	};

	// Builds the hero the way the hero builder does - choosing from the extended sourcebooks, with the extension approved
	const buildHero = (homebrew: Sourcebook, kind: 'domain' | 'kit') => {
		const hero = FactoryLogic.createHero();
		hero.sourcebookIDs = [ core.id, orden.id, homebrew.id ];
		hero.extensionIDs = homebrew.extensions.map(e => e.id);
		const extended = ExtensionLogic.applyExtensions([ core, orden, homebrew ], { extensionIDs: hero.extensionIDs });

		if (kind === 'domain') {
			hero.class = Utils.copy(conduit);
			hero.class.level = 1;
			const domain = SourcebookLogic.getDomains(extended).find(d => d.id === life.id)!;
			HeroLogic.getFeatures(hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.Domain)
				.forEach(f => f.data.selected = [ Utils.copy(domain) ]);
		} else {
			hero.class = Utils.copy(fury);
			hero.class.level = 1;
			hero.class.subclasses.filter(sc => sc.id === stormwight.id).forEach(sc => sc.selected = true);
			const kit = SourcebookLogic.getKits(extended).find(k => k.id === boren.id)!;
			HeroLogic.getFeatures(hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.Kit)
				.forEach(f => f.data.selected = [ Utils.copy(kit) ]);
		}

		return hero;
	};

	const getFeatureIDs = (hero: Hero, kind: 'domain' | 'kit') => (kind === 'domain') ?
		HeroLogic.getDomains(hero).flatMap(d => d.defaultFeatures).map(f => f.id)
		:
		HeroLogic.getKits(hero).flatMap(k => k.features).map(f => f.id);

	describe.each([
		{ kind: 'domain' as const, targetID: life.id },
		{ kind: 'kit' as const, targetID: boren.id }
	])('$kind', ({ kind, targetID }) => {
		it('keeps the extension while the hero uses its sourcebook', () => {
			const homebrew = createHomebrew(kind, targetID);
			const hero = buildHero(homebrew, kind);
			expect(getFeatureIDs(hero, kind)).toContain('homebrew-feature');

			HeroUpdateLogic.updateHero(hero, [ core, orden, homebrew ]);

			expect(getFeatureIDs(hero, kind)).toContain('homebrew-feature');
		});

		// The sourcebook is still loaded - the hero just doesn't use it any more
		it('drops the extension once the hero no longer uses its sourcebook', () => {
			const homebrew = createHomebrew(kind, targetID);
			const hero = buildHero(homebrew, kind);
			hero.sourcebookIDs = [ core.id, orden.id ];

			HeroUpdateLogic.updateHero(hero, [ core, orden, homebrew ]);

			expect(getFeatureIDs(hero, kind)).not.toContain('homebrew-feature');
		});

		// A shared hero, opened by someone without the homebrew, shouldn't lose it
		it('keeps the hero\'s copy when the extension\'s sourcebook is not loaded', () => {
			const homebrew = createHomebrew(kind, targetID);
			const hero = buildHero(homebrew, kind);

			HeroUpdateLogic.updateHero(hero, [ core, orden ]);

			expect(getFeatureIDs(hero, kind)).toContain('homebrew-feature');
		});
	});
});
