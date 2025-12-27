import { describe, expect, test } from 'vitest';
import { FormatLogic } from '@/logic/format-logic';

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

describe('getMultiplier', () => {
	test.each([
		[ 'no number' ],
		[ 'equal to 1d6' ],
		[ '1' ],
		[ '1 + your level' ],
		[ '2 plus your might score' ]
	])('should return 1 when there is no multiplier in the text', (text: string) => {
		expect(FormatLogic.getMultiplier(text)).toBe(1);
	});

	test.each([
		[ 'equal to twice your Might', 2 ],
		[ '3x your level', 3 ],
		[ 'three times your might', 3 ],
		[ '3 times might', 3 ],
		[ '4 times agility', 4 ]
	])('should return the correct multiplier in the formula', (text: string, expected: number) => {
		expect(FormatLogic.getMultiplier(text)).toBe(expected);
	});
});
