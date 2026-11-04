import { ChoiceAssignmentLogic, ChoiceSlot } from '@/logic/choice-assignment-logic';
import { describe, expect, test } from 'vitest';

const slot = (id: string, rank: number, accepts: string[], selected: string[] = [], capacity = 1): ChoiceSlot => ({
	id, rank, capacity, selected, accepts: n => accepts.includes(n)
});

describe('ChoiceAssignmentLogic', () => {
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
