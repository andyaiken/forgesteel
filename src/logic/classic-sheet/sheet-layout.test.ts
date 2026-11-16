import { CardPageLayout, FillerCard, SheetLayout } from '@/logic/classic-sheet/sheet-layout';
import { describe, expect, test } from 'vitest';
import { JSX } from 'react';

const makeFillerCard = (element: unknown, height: number, width: number, shown: boolean) => {
	return {
		element: element as JSX.Element,
		height: height,
		width: width,
		shown: shown
	} as FillerCard;
};

describe('getFillerCards', () => {
	test('returns an empty array when there are no extra cards', () => {
		const extraCards = {
			required: [],
			optional: []
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 100, 100, extraCards, layout);
		expect(result).not.toBeNull();
		expect(result).not.toBeUndefined();
		expect(result.length).toBe(0);
	});

	test('returns nothing when no cards will fit', () => {
		const r1 = makeFillerCard('r1', 20, 1, false);
		const o1 = makeFillerCard('o1', 20, 1, false);
		const extraCards = {
			required: [ r1 ],
			optional: [ o1 ]
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 10, 10, extraCards, layout);
		expect(result).not.toBeNull();
		expect(result).not.toBeUndefined();
		expect(result.length).toBe(0);
	});

	test('returns nothing when all cards are shown', () => {
		const r1 = makeFillerCard('r1', 1, 1, true);
		const o1 = makeFillerCard('o1', 1, 1, true);
		const extraCards = {
			required: [ r1 ],
			optional: [ o1 ]
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 10, 10, extraCards, layout);
		expect(result).not.toBeNull();
		expect(result).not.toBeUndefined();
		expect(result.length).toBe(0);
	});

	test('returns a card if one will fit', () => {
		const r1 = makeFillerCard('r1', 10, 1, false);
		const o1 = makeFillerCard('o1', 20, 1, false);
		const extraCards = {
			required: [ r1 ],
			optional: [ o1 ]
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 10, 10, extraCards, layout);
		expect(result.length).toBe(1);
		expect(result[0]).toBe('r1');
	});

	test('returns a required card over an optional one', () => {
		const r1 = makeFillerCard('r1', 10, 1, false);
		const r2 = makeFillerCard('r1', 5, 1, true);
		const o1 = makeFillerCard('o1', 5, 1, false);
		const extraCards = {
			required: [ r1, r2 ],
			optional: [ o1 ]
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 10, 10, extraCards, layout);
		expect(result.length).toBe(1);
		expect(result[0]).toBe('r1');
	});

	test('returns stacked cards if there is space', () => {
		const r1 = makeFillerCard('r1', 3, 1, false);
		const r2 = makeFillerCard('r2', 3, 1, false);
		const extraCards = {
			required: [ r1, r2 ],
			optional: [ ]
		};
		const layout = {
			perRow: 3
		} as CardPageLayout;

		const result = SheetLayout.getFillerCards(1, 10, 10, extraCards, layout);
		expect(result.length).toBe(1);
		expect(result[0]).toMatchInlineSnapshot(`
			<div
			  className="stacked-cards"
			>
			  r1
			  r2
			</div>
		`);
	});
});

describe('findExtraCard', () => {
	test('returns nothing if there are no extra cards', () => {
		const extraCards = {
			required: [],
			optional: []
		};
		const result = SheetLayout.findExtraCard(extraCards, 100, 100);
		expect(result).toBeNullable();
	});

	test('returns nothing if there are no unshown extra cards', () => {
		const r1 = makeFillerCard('r1', 1, 1, true);
		const o1 = makeFillerCard('o1', 1, 1, true);
		const extraCards = {
			required: [ r1 ],
			optional: [ o1 ]
		};
		const result = SheetLayout.findExtraCard(extraCards, 100, 100);
		expect(result).toBeNullable();
	});

	test.each([
		[ [ makeFillerCard('r1', 1, 1, false) ], [ makeFillerCard('o1', 1, 1, false) ], 'r1' ],
		[ [ makeFillerCard('r1', 1, 1, true) ], [ makeFillerCard('o1', 1, 1, false) ], 'o1' ]
	])('returns the largest unshown card, preferring required', (req: FillerCard[], opt: FillerCard[], expected: string) => {
		const extraCards = {
			required: req,
			optional: opt
		};
		const result = SheetLayout.findExtraCard(extraCards, 100, 100);
		expect(result?.element).toBe(expected);
	});
});

describe('getRowBreak', () => {
	test('returns null when every row fits', () => {
		expect(SheetLayout.getRowBreak([ 100, 200, 300 ], 300, false)).toBeNull();
	});

	test('breaks at the first row that runs past the limit', () => {
		expect(SheetLayout.getRowBreak([ 100, 200, 301, 400 ], 300, false)).toBe(2);
	});

	test('can give up every row when the page has room for none', () => {
		expect(SheetLayout.getRowBreak([ 400, 500 ], 300, false)).toBe(0);
	});

	test('keeps a first row that does not fit when asked to, so a row taller than a page cannot break forever', () => {
		expect(SheetLayout.getRowBreak([ 400, 500 ], 300, true)).toBeNull();
		expect(SheetLayout.getRowBreak([ 100, 400 ], 300, true)).toBe(1);
	});
});
