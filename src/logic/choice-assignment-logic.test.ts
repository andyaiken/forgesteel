import { ChoiceAssignmentLogic, ChoiceSlot } from '@/logic/choice-assignment-logic';
import { describe, expect, test } from 'vitest';

const slot = (id: string, rank: number, accepts: string[], selected: string[] = [], capacity = 1): ChoiceSlot => ({
	id, rank, capacity, selected, accepts: n => accepts.includes(n)
});

describe('ChoiceAssignmentLogic', () => {
	test('allows an override in a free slot without changing its default options', () => {
		const slots = [ slot('culture', 1, [ 'Kalliak' ]) ];
		expect(ChoiceAssignmentLogic.selectWithOverride(slots, 'Ananjali', false)).toBeNull();
		const selected = ChoiceAssignmentLogic.selectWithOverride(slots, 'Ananjali', true);
		expect(selected).toEqual({ culture: [ 'Ananjali' ] });
		const updated = slots.map(s => ({ ...s, selected: selected![s.id] }));
		expect(ChoiceAssignmentLogic.getUnsupportedSelections(updated)).toEqual([ 'Ananjali' ]);
		expect(ChoiceAssignmentLogic.selectWithOverride(updated, 'Another', true)).toBeNull();
		expect(ChoiceAssignmentLogic.deselect(updated, 'Ananjali')).toEqual({ culture: [] });
	});

	test('prefers a standard choice slot before overriding a restricted slot', () => {
		const slots = [ slot('culture', 1, [ 'Kalliak' ]), slot('career', 2, [ 'Kalliak', 'Ananjali' ]) ];
		expect(ChoiceAssignmentLogic.selectWithOverride(slots, 'Ananjali', true)).toEqual({ culture: [], career: [ 'Ananjali' ] });
	});

	test('a career language choice cannot also cover an overridden ancestral language', () => {
		const slots = [
			slot('culture', 1, [ 'Kalliak' ], [ 'Ananjali' ]),
			slot('career', 3, [ 'Kalliak', 'Ananjali', 'The First Language' ], [ 'The First Language' ]),
			slot('default', 1, [ 'Caelian' ], [ 'Caelian' ])
		];
		expect(ChoiceAssignmentLogic.getUnsupportedSelections(slots)).toEqual([ 'Ananjali' ]);
	});

	test('allows a valid swap between sources without changing the selections', () => {
		const slots = [ slot('culture', 1, [ 'Kalliak' ], [ 'Ananjali' ]), slot('career', 2, [ 'Kalliak', 'Ananjali' ], [ 'Kalliak' ]) ];
		expect(ChoiceAssignmentLogic.getUnsupportedSelections(slots)).toEqual([]);
		expect(slots.map(s => s.selected)).toEqual([ [ 'Ananjali' ], [ 'Kalliak' ] ]);
	});

	test('respects unlimited choices', () => {
		expect(ChoiceAssignmentLogic.getUnsupportedSelections([ slot('any', 1, [ 'A', 'B' ], [ 'A', 'B' ], -1) ])).toEqual([]);
	});

	test('accepts selected skills available through another source', () => {
		const slots = [ slot('class', 1, [ 'Magic' ], [ 'Music' ]), slot('culture', 2, [ 'Music', 'Perform' ]) ];
		expect(ChoiceAssignmentLogic.getUnsupportedSelections(slots)).toEqual([]);
	});

	test('reports skills unavailable through any source once, including custom skills', () => {
		const slots = [ slot('class', 1, [ 'Magic' ], [ 'Music', 'Custom' ]), slot('culture', 2, [ 'Perform' ], [ 'Music' ]) ];
		expect(ChoiceAssignmentLogic.getUnsupportedSelections(slots)).toEqual([ 'Music', 'Custom' ]);
	});

	test('prefers the more restricted slot', () => {
		const slots = [ slot('lore', 10, [ 'Music', 'History' ]), slot('music', 2, [ 'Music', 'Performance' ]) ];
		expect(ChoiceAssignmentLogic.select(slots, 'Music')).toEqual({ lore: [], music: [ 'Music' ] });
	});

	test('moves an existing selection to make room', () => {
		const slots = [ slot('narrow', 2, [ 'Music', 'Performance' ], [ 'Performance' ]), slot('other', 5, [ 'Performance', 'History' ]) ];
		expect(ChoiceAssignmentLogic.select(slots, 'Music')).toEqual({ narrow: [ 'Music' ], other: [ 'Performance' ] });
	});

	test('fails when there is no room', () => {
		const slots = [ slot('narrow', 2, [ 'Music' ], [ 'Music' ]) ];
		expect(ChoiceAssignmentLogic.select(slots, 'Performance')).toBeNull();
	});

	test('deselects', () => {
		expect(ChoiceAssignmentLogic.deselect([ slot('a', 1, [], [ 'x' ]) ], 'x')).toEqual({ a: [] });
	});

	test('reassigns remaining selections after deselecting', () => {
		const slots = [ slot('narrow', 2, [ 'Music', 'Performance' ]), slot('any', 10, [ 'Music', 'Performance', 'History' ], [ 'Music', 'History' ]) ];
		slots[1].capacity = 2;
		// Removing History should move Music into the narrow slot, freeing the flexible one
		expect(ChoiceAssignmentLogic.deselect(slots, 'History')).toEqual({ narrow: [ 'Music' ], any: [] });
	});
});
