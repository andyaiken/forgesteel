import { describe, expect, test } from 'vitest';
import { SheetFormatter } from './sheet-formatter';

describe.concurrent('Test addSign', () => {
	test.each([
		[ 1, '+1' ],
		[ 2, '+2' ],
		[ 10, '+10' ],
		[ 5, '+5' ]
	])('addSign(%i) -> %s', (n, expected) => {
		expect(SheetFormatter.addSign(n)).toBe(expected);
	});

	test('Does not add a sign to 0', () => {
		expect(SheetFormatter.addSign(0)).toBe('0');
	});

	test.each([
		[ -1, '-1' ],
		[ -2, '-2' ],
		[ -10, '-10' ],
		[ -5, '-5' ]
	])('addSign(%i) -> %s', (n, expected) => {
		expect(SheetFormatter.addSign(n)).toBe(expected);
	});
});

describe.concurrent('Test markdown enhancement', () => {
	test.each([
		[ 'M < Strong', '<span class="potency">m&lt;s]</span>' ],
		[ 'A < Average', '<span class="potency">a&lt;v]</span>' ],
		[ 'R < weak', '<span class="potency">r&lt;w]</span>' ],
		[ 'I < [strong]', '<span class="potency">i&lt;s]</span>' ],
		[ 'P < [weak]', '<span class="potency">p&lt;w]</span>' ]
	])('converts potency text to glyph form', (inStr, expected) => {
		expect(SheetFormatter.enhanceMarkdown(inStr)).toBe(expected);
	});
});
