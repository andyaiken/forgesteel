import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Sourcebook } from '@/models/sourcebook';
import { VisibilityLogic } from '@/logic/visibility-logic';

const createTestMonster = (id: string, name: string) => {
	return FactoryLogic.createMonster({
		id,
		name,
		level: 1,
		role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
		keywords: [],
		encounterValue: 1,
		size: FactoryLogic.createSize(1),
		speed: FactoryLogic.createSpeed(5),
		stamina: 10,
		stability: 0,
		freeStrikeDamage: 1,
		characteristics: FactoryLogic.createCharacteristics(0, 0, 0, 0, 0),
		features: []
	});
};

const createAncestry = (id: string, name: string) => {
	const ancestry = FactoryLogic.createAncestry();
	ancestry.id = id;
	ancestry.name = name;
	return ancestry;
};

const createSourcebookWithAncestries = (id: string, ancestries: { id: string, name: string }[]): Sourcebook => {
	const sourcebook = FactoryLogic.createSourcebook();
	sourcebook.id = id;
	sourcebook.name = id;
	sourcebook.ancestries = ancestries.map(a => createAncestry(a.id, a.name));
	return sourcebook;
};

describe('VisibilityLogic', () => {
	describe('single item hide / show', () => {
		test('hideElement adds an id once', () => {
			expect(VisibilityLogic.hideElement([], 'devil')).toEqual([ 'devil' ]);
			expect(VisibilityLogic.hideElement([ 'devil' ], 'devil')).toEqual([ 'devil' ]);
			expect(VisibilityLogic.hideElement([ 'other' ], 'devil').sort()).toEqual([ 'devil', 'other' ]);
		});

		test('showElement removes only that id', () => {
			expect(VisibilityLogic.showElement([ 'devil', 'human' ], 'devil')).toEqual([ 'human' ]);
			expect(VisibilityLogic.showElement([ 'human' ], 'devil')).toEqual([ 'human' ]);
		});

		test('isElementHidden reports membership', () => {
			expect(VisibilityLogic.isElementHidden('devil', [ 'devil' ])).toBe(true);
			expect(VisibilityLogic.isElementHidden('devil', [ 'human' ])).toBe(false);
		});

		test('getVisibleSourcebooks omits a single hidden item', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'devil', name: 'Devil' },
				{ id: 'human', name: 'Human' }
			]);

			const result = VisibilityLogic.getVisibleSourcebooks([ core ], [], [ 'devil' ]);

			expect(result[0].ancestries.map(a => a.id)).toEqual([ 'human' ]);
		});

		test('showing a hidden item restores it in getVisibleSourcebooks', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'devil', name: 'Devil' },
				{ id: 'human', name: 'Human' }
			]);

			const hidden = VisibilityLogic.hideElement([], 'devil');
			const shown = VisibilityLogic.showElement(hidden, 'devil');
			const result = VisibilityLogic.getVisibleSourcebooks([ core ], [], shown);

			expect(result[0].ancestries.map(a => a.id).sort()).toEqual([ 'devil', 'human' ]);
		});
	});

	describe('category hide / show', () => {
		test('toggleCategoryHidden hides all items of that kind in the given sourcebooks', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);

			const hidden = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');

			expect(hidden.sort()).toEqual([ 'a1', 'a2' ]);
		});

		test('toggleCategoryHidden shows all when every category item is already hidden', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);

			const shown = VisibilityLogic.toggleCategoryHidden([ 'a1', 'a2', 'unrelated' ], [ core ], 'ancestry');

			expect(shown).toEqual([ 'unrelated' ]);
		});

		test('toggleCategoryHidden with partial hides finishes hiding the rest', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' },
				{ id: 'a3', name: 'A3' }
			]);

			const hidden = VisibilityLogic.toggleCategoryHidden([ 'a1' ], [ core ], 'ancestry');

			expect(hidden.sort()).toEqual([ 'a1', 'a2', 'a3' ]);
		});

		test('toggleCategoryHidden only affects currently provided (visible) sources', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'core-devil', name: 'Devil' }
			]);
			const extras = createSourcebookWithAncestries('extras', [
				{ id: 'extras-elf', name: 'Elf' }
			]);

			// Library passes only active/visible sourcebooks into category toggle
			const hidden = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');

			expect(hidden).toEqual([ 'core-devil' ]);
			expect(hidden).not.toContain('extras-elf');

			const visible = VisibilityLogic.getVisibleSourcebooks([ core, extras ], [], hidden);
			expect(visible.find(sb => sb.id === 'core')!.ancestries).toHaveLength(0);
			expect(visible.find(sb => sb.id === 'extras')!.ancestries.map(a => a.id)).toEqual([ 'extras-elf' ]);
		});

		test('getVisibleSourcebooks reflects a fully hidden category', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);
			const hidden = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');
			const result = VisibilityLogic.getVisibleSourcebooks([ core ], [], hidden);

			expect(result[0].ancestries).toHaveLength(0);
		});

		test('toggleCategoryHidden for monster-group uses groups or monsters based on options', () => {
			const group = FactoryLogic.createMonsterGroup();
			group.id = 'group-1';
			group.monsters = [
				createTestMonster('m1', 'M1'),
				createTestMonster('m2', 'M2')
			];
			const sourcebook = FactoryLogic.createSourcebook();
			sourcebook.id = 'sb';
			sourcebook.monsterGroups = [ group ];

			const hiddenGroups = VisibilityLogic.toggleCategoryHidden([], [ sourcebook ], 'monster-group', { showMonsters: false });
			expect(hiddenGroups).toEqual([ 'group-1' ]);

			const hiddenMonsters = VisibilityLogic.toggleCategoryHidden([], [ sourcebook ], 'monster-group', { showMonsters: true });
			expect(hiddenMonsters.sort()).toEqual([ 'm1', 'm2' ]);
		});
	});

	describe('sourcebook toggle resets item visibility', () => {
		test('clearHiddenForSourcebook removes single-item hides for that source only', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'devil', name: 'Devil' },
				{ id: 'human', name: 'Human' }
			]);
			const extras = createSourcebookWithAncestries('extras', [
				{ id: 'elf', name: 'Elf' }
			]);

			const hidden = [ 'devil', 'elf' ];
			const afterCoreToggle = VisibilityLogic.clearHiddenForSourcebook(hidden, core);

			expect(afterCoreToggle).toEqual([ 'elf' ]);
			expect(VisibilityLogic.clearHiddenForSourcebook(afterCoreToggle, extras)).toEqual([]);
		});

		test('clearHiddenForSourcebook removes category hides for that source', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);

			const hidden = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');
			expect(hidden.sort()).toEqual([ 'a1', 'a2' ]);

			const cleared = VisibilityLogic.clearHiddenForSourcebook(hidden, core);
			expect(cleared).toEqual([]);
		});

		test('hide then show source restores previously hidden single items', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'devil', name: 'Devil' },
				{ id: 'human', name: 'Human' }
			]);

			let hiddenElementIDs = VisibilityLogic.hideElement([], 'devil');
			let visible = VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs);
			expect(visible[0].ancestries.map(a => a.id)).toEqual([ 'human' ]);

			// Source hide/show cycle clears per-item overrides for that source
			hiddenElementIDs = VisibilityLogic.clearHiddenForSourcebook(hiddenElementIDs, core);
			visible = VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs);

			expect(visible[0].ancestries.map(a => a.id).sort()).toEqual([ 'devil', 'human' ]);
		});

		test('hide then show source restores previously hidden category items', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);

			let hiddenElementIDs = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');
			expect(VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs)[0].ancestries).toHaveLength(0);

			hiddenElementIDs = VisibilityLogic.clearHiddenForSourcebook(hiddenElementIDs, core);
			const visible = VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs);

			expect(visible[0].ancestries.map(a => a.id).sort()).toEqual([ 'a1', 'a2' ]);
		});

		test('toggling one source does not restore hidden items from another source', () => {
			const core = createSourcebookWithAncestries('core', [ { id: 'devil', name: 'Devil' } ]);
			const extras = createSourcebookWithAncestries('extras', [ { id: 'elf', name: 'Elf' } ]);

			let hiddenElementIDs = VisibilityLogic.hideElement([], 'devil');
			hiddenElementIDs = VisibilityLogic.hideElement(hiddenElementIDs, 'elf');

			hiddenElementIDs = VisibilityLogic.clearHiddenForSourcebook(hiddenElementIDs, core);

			expect(hiddenElementIDs).toEqual([ 'elf' ]);
			const visible = VisibilityLogic.getVisibleSourcebooks([ core, extras ], [], hiddenElementIDs);
			expect(visible.find(sb => sb.id === 'core')!.ancestries.map(a => a.id)).toEqual([ 'devil' ]);
			expect(visible.find(sb => sb.id === 'extras')!.ancestries).toHaveLength(0);
		});

		test('clearHiddenForSourcebook also clears nested monster and subclass ids', () => {
			const monster = createTestMonster('imp', 'Imp');
			const group = FactoryLogic.createMonsterGroup();
			group.id = 'devils';
			group.monsters = [ monster ];

			const subclass = FactoryLogic.createSubclass();
			subclass.id = 'shadow';
			const heroClass = FactoryLogic.createClass();
			heroClass.id = 'class-1';
			heroClass.subclasses = [ subclass ];

			const sourcebook = FactoryLogic.createSourcebook();
			sourcebook.id = 'core';
			sourcebook.monsterGroups = [ group ];
			sourcebook.classes = [ heroClass ];

			const cleared = VisibilityLogic.clearHiddenForSourcebook([ 'imp', 'shadow', 'other' ], sourcebook);
			expect(cleared).toEqual([ 'other' ]);
		});
	});

	describe('display all hidden library items', () => {
		test('passing empty hiddenElementIDs shows individually hidden items (setting on)', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'devil', name: 'Devil' },
				{ id: 'human', name: 'Human' }
			]);
			const hiddenElementIDs = [ 'devil' ];

			// Library uses [] for hiddenElementIDs when showHiddenLibraryItems is true
			const whenShowingHidden = VisibilityLogic.getVisibleSourcebooks([ core ], [], []);
			expect(whenShowingHidden[0].ancestries.map(a => a.id).sort()).toEqual([ 'devil', 'human' ]);

			const whenHiding = VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs);
			expect(whenHiding[0].ancestries.map(a => a.id)).toEqual([ 'human' ]);
		});

		test('display-all-hidden still respects hidden sourcebooks', () => {
			const core = createSourcebookWithAncestries('core', [ { id: 'devil', name: 'Devil' } ]);
			const extras = createSourcebookWithAncestries('extras', [ { id: 'elf', name: 'Elf' } ]);

			const result = VisibilityLogic.getVisibleSourcebooks(
				[ core, extras ],
				[ 'extras' ],
				[] // showHiddenLibraryItems: true
			);

			expect(result.map(sb => sb.id)).toEqual([ 'core' ]);
			expect(result[0].ancestries.map(a => a.id)).toEqual([ 'devil' ]);
		});

		test('display-all-hidden reveals category-hidden items without clearing stored hides', () => {
			const core = createSourcebookWithAncestries('core', [
				{ id: 'a1', name: 'A1' },
				{ id: 'a2', name: 'A2' }
			]);
			const hiddenElementIDs = VisibilityLogic.toggleCategoryHidden([], [ core ], 'ancestry');

			const displayed = VisibilityLogic.getVisibleSourcebooks([ core ], [], []);
			expect(displayed[0].ancestries).toHaveLength(2);

			const storedStillHidden = VisibilityLogic.getVisibleSourcebooks([ core ], [], hiddenElementIDs);
			expect(storedStillHidden[0].ancestries).toHaveLength(0);
			expect(hiddenElementIDs.sort()).toEqual([ 'a1', 'a2' ]);
		});
	});

	describe('getVisibleSourcebooks nesting', () => {
		test('strips nested monsters and subclasses', () => {
			const monsterKeep = createTestMonster('monster-keep', 'Keep');
			const monsterHide = createTestMonster('monster-hide', 'Hide');
			const group = FactoryLogic.createMonsterGroup();
			group.id = 'group-1';
			group.monsters = [ monsterKeep, monsterHide ];

			const subclassKeep = FactoryLogic.createSubclass();
			subclassKeep.id = 'subclass-keep';
			const subclassHide = FactoryLogic.createSubclass();
			subclassHide.id = 'subclass-hide';
			const heroClass = FactoryLogic.createClass();
			heroClass.id = 'class-1';
			heroClass.subclasses = [ subclassKeep, subclassHide ];

			const sourcebook = FactoryLogic.createSourcebook();
			sourcebook.id = 'sb-1';
			sourcebook.monsterGroups = [ group ];
			sourcebook.classes = [ heroClass ];

			const result = VisibilityLogic.getVisibleSourcebooks([ sourcebook ], [], [ 'monster-hide', 'subclass-hide' ]);

			expect(result[0].monsterGroups[0].monsters.map(m => m.id)).toEqual([ 'monster-keep' ]);
			expect(result[0].classes[0].subclasses.map(s => s.id)).toEqual([ 'subclass-keep' ]);
		});

		test('drops entire hidden sourcebooks', () => {
			const core = createSourcebookWithAncestries('core', [ { id: 'a1', name: 'A1' } ]);
			const extras = createSourcebookWithAncestries('extras', [ { id: 'a2', name: 'A2' } ]);

			const result = VisibilityLogic.getVisibleSourcebooks([ core, extras ], [ 'extras' ], []);
			expect(result.map(sb => sb.id)).toEqual([ 'core' ]);
		});
	});
});
