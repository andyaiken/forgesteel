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

	test('keeps a partially filled final row instead of dropping its required card', () => {
		const card = makeFillerCard('minion', 30, 1, false);
		const result = SheetLayout.getFillerCards(2, 88, 0, { required: [ card ], optional: [] }, { perRow: 2 } as CardPageLayout);

		expect(result).toEqual([ 'minion' ]);
		expect(card.shown).toBe(true);
	});

	test('keeps wide cards when the final row cannot be filled', () => {
		const card = makeFillerCard('reference', 30, 2, false);
		const result = SheetLayout.getFillerCards(3, 88, 0, { required: [ card ], optional: [] }, { perRow: 3 } as CardPageLayout);

		expect(result).toEqual([ 'reference' ]);
		expect(card.shown).toBe(true);
	});
});

describe('getMonsterCardPages', () => {
	test('preserves the supplied order across pages when card heights differ', () => {
		const cards = [
			makeFillerCard('signature-a', 20, 1, false),
			makeFillerCard('signature-b', 25, 1, false),
			makeFillerCard('minion-3', 60, 1, false),
			makeFillerCard('minion-5', 50, 1, false),
			makeFillerCard('fixture', 10, 1, false)
		];
		const layout = { perRow: 2, linesY: 88, orientation: 'portrait' } as CardPageLayout;
		const pages = SheetLayout.getMonsterCardPages(cards, layout, 'summons', true);

		expect(pages).toHaveLength(2);
		expect(pages.flatMap(page => page.props.children[1].props.children)).toEqual(cards.map(card => card.element));
		expect(cards.every(card => card.shown)).toBe(true);
	});

	test('moves a wide card to the next row without letting later cards pass it', () => {
		const cards = [
			makeFillerCard('signature', 30, 1, false),
			makeFillerCard('wide-minion', 60, 2, false),
			makeFillerCard('fixture', 10, 1, false)
		];
		const layout = { perRow: 2, linesY: 88, orientation: 'portrait' } as CardPageLayout;
		const pages = SheetLayout.getMonsterCardPages(cards, layout, 'summons', true);

		expect(pages).toHaveLength(2);
		expect(pages[0].props.children[1].props.children).toEqual([ cards[0].element ]);
		expect(pages[1].props.children[1].props.children).toEqual([ cards[1].element, cards[2].element ]);
	});

	test('includes every minion on consecutive pages, including a final unpaired card', () => {
		const cards = Array.from({ length: 5 }, (_, i) => makeFillerCard(`minion-${i}`, 60, 1, false));
		const layout = { perRow: 2, linesY: 88, orientation: 'portrait' } as CardPageLayout;
		const pages = SheetLayout.getMonsterCardPages(cards, layout, 'summons');

		expect(pages).toHaveLength(3);
		expect(cards.every(card => card.shown)).toBe(true);
		expect(pages.flatMap(page => page.props.children[1].props.children)).toEqual(cards.map(card => card.element));
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
