import { Extension, ExtensionChange } from '@/models/extension';
import { describe, expect, it } from 'vitest';
import { ExtensionChangeType } from '@/enums/extension-change-type';
import { ExtensionLogic } from '@/logic/extension-logic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureType } from '@/enums/feature-type';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';
import { beastheartSourcebook } from '@/data/sourcebooks/official/beastheart';
import { core } from '@/data/sourcebooks/official/core';
import { orden } from '@/data/sourcebooks/official/orden';

const createHomebrew = (...extensions: Extension[]) => {
	const sourcebook = FactoryLogic.createSourcebook();
	sourcebook.id = 'homebrew';
	sourcebook.extensions = extensions;
	return sourcebook;
};

const createExtension = (targetKind: Extension['targetKind'], targetID: string, ...changes: ExtensionChange[]) => {
	const extension = FactoryLogic.createExtension();
	extension.targetKind = targetKind;
	extension.targetID = targetID;
	extension.changes = changes;
	return extension;
};

const createAbility = (id: string) => FactoryLogic.createAbility({ id: id, name: id, cost: 'signature', sections: [] });

const createText = (id: string) => FactoryLogic.feature.create({ id: id, name: id, description: '' });

const getClass = (sourcebooks: Sourcebook[], id: string) => SourcebookLogic.getClasses(sourcebooks).find(c => c.id === id)!;

const getAncestry = (sourcebooks: Sourcebook[], id: string) => SourcebookLogic.getAncestries(sourcebooks).find(a => a.id === id)!;

const getMonsterGroup = (sourcebooks: Sourcebook[], id: string) => SourcebookLogic.getMonsterGroups(sourcebooks).find(mg => mg.id === id)!;

const createMalice = (id: string) => FactoryLogic.feature.createMalice({ id: id, name: id, cost: 3, sections: [] });

// A variant of one of the group's own monsters, as the extension editor makes when it copies one
const createMonster = (sourcebooks: Sourcebook[], groupID: string, id: string) => {
	const monster = Utils.copy(getMonsterGroup(sourcebooks, groupID).monsters[0]);
	monster.id = id;
	return monster;
};

describe('applyExtensions', () => {
	it('returns the same sourcebooks when there are no extensions', () => {
		const sourcebooks = [ core, orden, beastheartSourcebook ];

		expect(ExtensionLogic.applyExtensions(sourcebooks)).toBe(sourcebooks);
	});

	it('adds an ability to a class without touching the published class', () => {
		const homebrew = createHomebrew(createExtension('class', 'class-beastheart', {
			id: 'c1',
			type: ExtensionChangeType.AddAbility,
			data: { ability: createAbility('homebrew-ability') }
		}));
		const sourcebooks = [ core, beastheartSourcebook, homebrew ];

		const extended = ExtensionLogic.applyExtensions(sourcebooks);

		expect(getClass(extended, 'class-beastheart').abilities.map(a => a.id)).toContain('homebrew-ability');
		expect(getClass(sourcebooks, 'class-beastheart').abilities.map(a => a.id)).not.toContain('homebrew-ability');
		// Sourcebooks that nothing targets come back as they were
		expect(extended[0]).toBe(core);
	});

	it('records which extensions built the copy', () => {
		const extension = createExtension('class', 'class-beastheart', {
			id: 'c1',
			type: ExtensionChangeType.AddAbility,
			data: { ability: createAbility('homebrew-ability') }
		});
		const extended = ExtensionLogic.applyExtensions([ beastheartSourcebook, createHomebrew(extension) ]);

		expect(getClass(extended, 'class-beastheart').appliedExtensions).toEqual([ { extensionID: extension.id, sourcebookID: 'homebrew' } ]);
	});

	it('adds a companion to the beastheart companion choice', () => {
		const companion = Utils.copy(getClass([ beastheartSourcebook ], 'class-beastheart').featuresByLevel[0].features.find(f => f.type === FeatureType.SummonChoice)!.data.options[0]);
		companion.id = 'homebrew-companion';
		const homebrew = createHomebrew(createExtension('class', 'class-beastheart', {
			id: 'c1',
			type: ExtensionChangeType.AddSummonOption,
			data: { featureID: 'beastheart-1-2a', summon: companion }
		}));

		const extended = ExtensionLogic.applyExtensions([ beastheartSourcebook, homebrew ]);

		const feature = getClass(extended, 'class-beastheart').featuresByLevel[0].features.find(f => f.id === 'beastheart-1-2a');
		expect(feature?.type === FeatureType.SummonChoice ? feature.data.options.map(o => o.id) : []).toContain('homebrew-companion');
	});

	it('adds a purchased trait to an ancestry', () => {
		const homebrew = createHomebrew(createExtension('ancestry', 'ancestry-dwarf', {
			id: 'c1',
			type: ExtensionChangeType.AddChoiceOption,
			data: { featureID: 'dwarf-feature-2', option: { feature: createText('homebrew-trait'), value: 2 } }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		const feature = getAncestry(extended, 'ancestry-dwarf').features.find(f => f.id === 'dwarf-feature-2');
		expect(feature?.type === FeatureType.Choice ? feature.data.options.map(o => o.feature.id) : []).toContain('homebrew-trait');
	});

	it('replaces a feature nested inside another', () => {
		const homebrew = createHomebrew(createExtension('ancestry', 'ancestry-dwarf', {
			id: 'c1',
			type: ExtensionChangeType.ReplaceFeature,
			data: { featureID: 'dwarf-feature-2-2b', feature: createText('anything') }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		const features = ExtensionLogic.getTargetFeatures({ kind: 'ancestry', element: getAncestry(extended, 'ancestry-dwarf') }).map(f => f.feature);
		expect(features.find(f => f.id === 'dwarf-feature-2-2b')?.name).toBe('anything');
		expect(features.find(f => f.id === 'dwarf-feature-2-2a')?.name).toBe('Stand Tough');
	});

	it('replaces a feature, keeping its ID', () => {
		const homebrew = createHomebrew(createExtension('ancestry', 'ancestry-dwarf', {
			id: 'c1',
			type: ExtensionChangeType.ReplaceFeature,
			data: { featureID: 'dwarf-feature-2-3', feature: createText('anything') }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		const feature = getAncestry(extended, 'ancestry-dwarf').features.find(f => f.id === 'dwarf-feature-2');
		const option = feature?.type === FeatureType.Choice ? feature.data.options.find(o => o.feature.id === 'dwarf-feature-2-3') : undefined;
		expect(option?.feature.name).toBe('anything');
	});

	// Otherwise the result would depend on which sourcebook happened to load first
	it('applies replacements before additions', () => {
		const addition = createExtension('ancestry', 'ancestry-dwarf', {
			id: 'c1',
			type: ExtensionChangeType.AddChoiceOption,
			data: { featureID: 'dwarf-feature-2', option: { feature: createText('homebrew-trait'), value: 1 } }
		});
		const replacement = createExtension('ancestry', 'ancestry-dwarf', {
			id: 'c2',
			type: ExtensionChangeType.ReplaceFeature,
			data: { featureID: 'dwarf-feature-2', feature: FactoryLogic.feature.createChoice({ id: 'x', name: 'New Traits', options: [] }) }
		});

		const extended = ExtensionLogic.applyExtensions([ core, createHomebrew(addition, replacement) ]);

		const feature = getAncestry(extended, 'ancestry-dwarf').features.find(f => f.id === 'dwarf-feature-2');
		expect(feature?.name).toBe('New Traits');
		expect(feature?.type === FeatureType.Choice ? feature.data.options.map(o => o.feature.id) : []).toEqual([ 'homebrew-trait' ]);
	});

	it('only applies extensions from the enabled sourcebooks', () => {
		const homebrew = createHomebrew(createExtension('class', 'class-beastheart', {
			id: 'c1',
			type: ExtensionChangeType.AddAbility,
			data: { ability: createAbility('homebrew-ability') }
		}));
		const sourcebooks = [ beastheartSourcebook, homebrew ];

		const extended = ExtensionLogic.applyExtensions(sourcebooks, { extensionSourcebookIDs: [ beastheartSourcebook.id ] });

		expect(extended).toBe(sourcebooks);
	});

	it('only applies the approved extensions', () => {
		const approved = createExtension('class', 'class-beastheart', { id: 'c1', type: ExtensionChangeType.AddAbility, data: { ability: createAbility('approved') } });
		const unapproved = createExtension('class', 'class-beastheart', { id: 'c2', type: ExtensionChangeType.AddAbility, data: { ability: createAbility('unapproved') } });

		const extended = ExtensionLogic.applyExtensions([ beastheartSourcebook, createHomebrew(approved, unapproved) ], { extensionIDs: [ approved.id ] });

		const ids = getClass(extended, 'class-beastheart').abilities.map(a => a.id);
		expect(ids).toContain('approved');
		expect(ids).not.toContain('unapproved');
	});

	it('extends a subclass that lives inside its class', () => {
		const homebrew = createHomebrew(createExtension('subclass', 'fury-sub-3', {
			id: 'c1',
			type: ExtensionChangeType.AddFeature,
			data: { level: 2, feature: createText('homebrew-feature') }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		const subclass = getClass(extended, 'class-fury').subclasses.find(sc => sc.id === 'fury-sub-3')!;
		expect(subclass.featuresByLevel.find(lvl => lvl.level === 2)!.features.map(f => f.id)).toContain('homebrew-feature');
		// The class's other subclasses are untouched
		const berserker = getClass(extended, 'class-fury').subclasses.find(sc => sc.id === 'fury-sub-1');
		expect(berserker).toBe(getClass([ core ], 'class-fury').subclasses.find(sc => sc.id === 'fury-sub-1'));
	});

	it('adds a feature to a kit', () => {
		const homebrew = createHomebrew(createExtension('kit', 'kit-mountain', {
			id: 'c1',
			type: ExtensionChangeType.AddFeature,
			data: { level: 1, feature: createText('homebrew-feature') }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		expect(SourcebookLogic.getKits(extended).find(k => k.id === 'kit-mountain')!.features.map(f => f.id)).toContain('homebrew-feature');
	});

	it('adds a default feature to a domain at level 0', () => {
		const homebrew = createHomebrew(createExtension('domain', 'domain-life', {
			id: 'c1',
			type: ExtensionChangeType.AddFeature,
			data: { level: 0, feature: createText('homebrew-feature') }
		}));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		expect(SourcebookLogic.getDomains(extended).find(d => d.id === 'domain-life')!.defaultFeatures.map(f => f.id)).toContain('homebrew-feature');
	});

	it('adds malice and a monster to a monster group without touching the published group', () => {
		const homebrew = createHomebrew(createExtension('monster-group', 'monster-group-goblin',
			{ id: 'c1', type: ExtensionChangeType.AddMalice, data: { malice: createMalice('homebrew-malice') } },
			{ id: 'c2', type: ExtensionChangeType.AddMonster, data: { monster: createMonster([ core ], 'monster-group-goblin', 'homebrew-goblin') } }
		));

		const extended = ExtensionLogic.applyExtensions([ core, homebrew ]);

		expect(getMonsterGroup(extended, 'monster-group-goblin').malice.map(f => f.id)).toContain('homebrew-malice');
		expect(getMonsterGroup(extended, 'monster-group-goblin').monsters.map(m => m.id)).toContain('homebrew-goblin');
		expect(getMonsterGroup([ core ], 'monster-group-goblin').monsters.map(m => m.id)).not.toContain('homebrew-goblin');
		// Encounters find a monster, and the group whose malice it uses, by the monster's ID
		expect(SourcebookLogic.getMonster(extended, 'homebrew-goblin')).not.toBeNull();
		expect(SourcebookLogic.getMonsterGroup(extended, 'homebrew-goblin')!.id).toBe('monster-group-goblin');
	});
});

describe('getDirectorSourcebooks', () => {
	const groupExtension = createExtension('monster-group', 'monster-group-goblin', {
		id: 'c1',
		type: ExtensionChangeType.AddMonster,
		data: { monster: createMonster([ core ], 'monster-group-goblin', 'homebrew-goblin') }
	});
	const classExtension = createExtension('class', 'class-fury', {
		id: 'c2',
		type: ExtensionChangeType.AddAbility,
		data: { ability: createAbility('homebrew-ability') }
	});

	it('applies extensions to monster groups, but leaves extensions to hero elements to each hero', () => {
		const extended = ExtensionLogic.getDirectorSourcebooks([ core, createHomebrew(groupExtension, classExtension) ], []);

		expect(getMonsterGroup(extended, 'monster-group-goblin').monsters.map(m => m.id)).toContain('homebrew-goblin');
		expect(getClass(extended, 'class-fury').abilities.map(a => a.id)).not.toContain('homebrew-ability');
	});

	it('leaves out extensions from hidden sourcebooks', () => {
		const extended = ExtensionLogic.getDirectorSourcebooks([ core, createHomebrew(groupExtension) ], [ 'homebrew' ]);

		expect(getMonsterGroup(extended, 'monster-group-goblin').monsters.map(m => m.id)).not.toContain('homebrew-goblin');
	});
});

describe('getUnresolvedChanges', () => {
	it('flags a change whose feature is not in the target', () => {
		const extension = createExtension('ancestry', 'ancestry-dwarf',
			{ id: 'good', type: ExtensionChangeType.ReplaceFeature, data: { featureID: 'dwarf-feature-2-2b', feature: createText('x') } },
			{ id: 'bad', type: ExtensionChangeType.ReplaceFeature, data: { featureID: 'no-such-feature', feature: createText('y') } }
		);

		expect(ExtensionLogic.getUnresolvedChanges(extension, [ core ])).toEqual([ 'bad' ]);
	});

	it('flags an option added to a feature that is not a choice', () => {
		const extension = createExtension('ancestry', 'ancestry-dwarf', {
			id: 'bad',
			type: ExtensionChangeType.AddChoiceOption,
			data: { featureID: 'dwarf-feature-2-3', option: { feature: createText('x'), value: 1 } }
		});

		expect(ExtensionLogic.getUnresolvedChanges(extension, [ core ])).toEqual([ 'bad' ]);
	});

	it('flags changes that do not suit the kind of element targeted', () => {
		const groupExtension = createExtension('monster-group', 'monster-group-goblin',
			{ id: 'feature', type: ExtensionChangeType.AddFeature, data: { level: 1, feature: createText('x') } },
			{ id: 'malice', type: ExtensionChangeType.AddMalice, data: { malice: createMalice('y') } }
		);
		const classExtension = createExtension('class', 'class-fury',
			{ id: 'malice', type: ExtensionChangeType.AddMalice, data: { malice: createMalice('z') } }
		);

		expect(ExtensionLogic.getUnresolvedChanges(groupExtension, [ core ])).toEqual([ 'feature' ]);
		expect(ExtensionLogic.getUnresolvedChanges(classExtension, [ core ])).toEqual([ 'malice' ]);
	});

	it('flags every change when the target is missing', () => {
		const extension = createExtension('class', 'no-such-class', { id: 'a', type: ExtensionChangeType.AddAbility, data: { ability: createAbility('x') } });

		expect(ExtensionLogic.getUnresolvedChanges(extension, [ core ])).toEqual([ 'a' ]);
	});
});
