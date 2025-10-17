import { describe, expect, test } from 'vitest';
import { FormatLogic } from './format-logic';

describe('getDice', () => {
	test.each([
		[ 'Lorem Ipsum dolor sit amet' ],
		[ 'Dice dice dice' ]
	])('should return null when there are no dice references in the text', (text: string) => {
		expect(FormatLogic.getDice(text)).toBe(null);
	});

	test.each([
		[ '1d6', '1d6' ],
		[ '1d3 + 1', '1d3' ],
		[ '1d3+1', '1d3' ],
		[ '1d6 plus something', '1d6' ],
		[ 'lorem ipsum 3d6 plus something', '3d6' ]
	])('should find properly formatted dice roll references', (text: string, expected: string) => {
		expect(FormatLogic.getDice(text)).toBe(expected);
	});
});

describe('getConstant', () => {
	test.each([
		[ 'no number' ],
		[ 'equal to 1d6' ],
		[ 'equal to twice your Might' ],
		[ '5x your level' ],
		[ '3 times your level' ]
	])('should return 0 when there is no constant in the text', (text: string) => {
		expect(FormatLogic.getConstant(text)).toBe(0);
	});

	test.each([
		[ '1', 1 ],
		[ '1 + your level', 1 ],
		[ '2 plus your might', 2 ],
		[ '2d6 plus your might', 0 ],
		[ '2d6 + 4', 4 ]
	])('should return the correct constant in the formula', (text: string, expected: number) => {
		expect(FormatLogic.getConstant(text)).toBe(expected);
	});
});
