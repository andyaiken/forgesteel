import { describe, expect, test } from 'vitest';
import { FactoryLogic } from '../factory-logic';
import { Feature } from '@/models/feature';
import { FeatureType } from '@/enums/feature-type';
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

describe.concurrent('cleanupText', () => {
	test('does not remove markdown tables', () => {
		const inStr = `
		| Header | Cells |
		|:---|:---|
		| Some | Data |
		| More | Data |
		`;
		expect(SheetFormatter.cleanupText(inStr)).toBe(inStr);
	});
});

describe.concurrent('calculateFeatureSize', () => {
	test('properly calculates size for features with tables', () => {
		const feature = FactoryLogic.feature.create({
			id: 'calc-feature-size-tables-1',
			name: 'Test Tables Size Feature',
			description: `
This is some initial feature text. It will be followed by a table.

| Header 1 | Header 2 |
|:---|:---|
| 1 | some text |
| 2 | more text |
| 3 | more text |
| 4 | more text |
			`
		});

		expect(SheetFormatter.calculateFeatureSize(feature, null, 100, true)).toBe(3);

		expect(SheetFormatter.calculateFeatureSize(feature, null, 100, false)).toBe(11.4);
	});
});

describe.concurrent('divideFeatures', () => {
	const features = [
		FactoryLogic.feature.create({
			id: 'df-1',
			name: 'DF 1',
			description: 'Line 1'
		}),
		FactoryLogic.feature.create({
			id: 'df-2',
			name: 'DF 2',
			description: `
Line 1

Line 2

Line 3`
		})
	];

	test('does expand a displayed feature if it will fit', () => {
		const result = SheetFormatter.divideFeatures(features, null, 10, 50, 1);
		expect(result.displayed.length).toBe(2);
		expect(result.displayed[0].feature.id).toBe('df-1');
		expect(result.displayed[1].feature.id).toBe('df-2');
		expect(result.displayed.every(f => f.display === 'full')).toBe(true);
	});

	test('does not expand a displayed feature if it might cause column balancing issues', () => {
		const result = SheetFormatter.divideFeatures(features, null, 10, 50, 2);
		expect(result.displayed.length).toBe(2);
		expect(result.displayed[0].feature.id).toBe('df-1');
		expect(result.displayed[0].display).toBe('full');
		expect(result.displayed[1].feature.id).toBe('df-2');
		expect(result.displayed[1].display).toBe('short');
	});
});

describe.concurrent('sortFeatures', () => {
	test.each([
		[ FeatureType.Package, FeatureType.Text, true ],
		[ FeatureType.Package, FeatureType.PackageContent, false ],
		[ FeatureType.Ability, FeatureType.PackageContent, true ],
		[ FeatureType.HeroicResource, FeatureType.Ability, true ],
		[ FeatureType.HeroicResource, FeatureType.Kit, false ],
		[ FeatureType.Domain, FeatureType.HeroicResource, true ],
		[ FeatureType.Language, FeatureType.ConditionImmunity, true ]
	])('sorts types correctly', (aType, bType, bFirst) => {
		const fA = {
			type: aType
		} as Feature;
		const fB = {
			type: bType
		} as Feature;

		const result = SheetFormatter.sortFeatures(fA, fB);
		if (bFirst) {
			expect(result).toBeGreaterThan(0);
		} else {
			expect(result).toBeLessThan(0);
		}
	});

	test.each([
		[ 'Line1 \n Line 2', 'Line 1', false ],
		[ 'Line 1', 'Line 1 \n Line 2', true ]
	])('falls back to sorting by length if types are the same', (aDesc, bDesc, aFirst) => {
		const fA = {
			type: FeatureType.Text,
			description: aDesc
		} as Feature;
		const fB = {
			type: FeatureType.Text,
			description: bDesc
		} as Feature;
		const result = SheetFormatter.sortFeatures(fA, fB);

		if (aFirst) {
			expect(result).toBeLessThan(0);
		} else {
			expect(result).toBeGreaterThan(0);
		}
	});
});
