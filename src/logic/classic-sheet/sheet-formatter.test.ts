import { afterEach, describe, expect, test, vi } from 'vitest';
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
	test('does expand a displayed feature if it will fit', () => {
		const features = [
			{
				source: 'test',
				feature: FactoryLogic.feature.create({
					id: 'df-1',
					name: 'DF 1',
					description: 'Line 1'
				})
			},
			{
				source: 'test',
				feature: FactoryLogic.feature.create({
					id: 'df-2',
					name: 'DF 2',
					description: `
Line 1

Line 2

Line 3`
				})
			}
		];

		const result = SheetFormatter.divideFeatures(features, null, 10, 50, 1);
		expect(result.displayed.length).toBe(2);
		expect(result.displayed[0].feature.id).toBe('df-1');
		expect(result.displayed[1].feature.id).toBe('df-2');
		expect(result.displayed.every(f => f.display === 'full')).toBe(true);
	});

	test('does not expand a displayed feature if it might cause column balancing issues', () => {
		const features = [
			{
				source: 'test',
				feature: FactoryLogic.feature.create({
					id: 'df-1',
					name: 'DF 1',
					description: 'Line 1'
				})
			},
			{
				source: 'test',
				feature: FactoryLogic.feature.create({
					id: 'df-2',
					name: 'DF 2',
					description: `
Line 1

Line 2

Line 3`
				})
			}
		];

		const result = SheetFormatter.divideFeatures(features, null, 10, 50, 2);
		expect(result.displayed.length).toBe(2);
		expect(result.displayed[0].feature.id).toBe('df-1');
		expect(result.displayed[0].display).toBe('full');
		expect(result.displayed[1].feature.id).toBe('df-2');
		expect(result.displayed[1].display).toBe('short');
		expect(result.reference.length).toBe(1);
		expect(result.reference[0].source).toBe('test');
		expect(result.reference[0].feature.id).toBe('df-2');
	});

	test('should create an extra reference item for tables with more than 3 columns', () => {
		const features = [ {
			source: 'test',
			feature: FactoryLogic.feature.create({
				id: 'tf1',
				name: 'Table Feature',
				description: `
This is some description of the table below.

| Header 1 | Header 2 | Header 3 | Header 4 |
|:---|:---:|:---:|---:|
| Content 1 | Lorem Ipsum | Test 1 | Column 4 |
| Content 2 | Lorem Ipsum | Test 2 | Column 4 |
| Content 3 | Lorem Ipsum | Test 3 | Column 4 |`
			})
		} ];

		const result = SheetFormatter.divideFeatures(features, null, 50, 50, 1);
		expect(result.displayed.length).toBe(1);
		expect(result.displayed[0].feature.id).toBe('tf1');
		expect(result.displayed[0].display).toBe('short');

		expect(result.reference.length).toBe(0);

		expect(result.extraReferenceItems.length).toBe(1);
		expect(result.extraReferenceItems[0].title).toBe('Table Feature: Header 1 Table');
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

describe('containsExtractableReferenceContent', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test.each([
		[ false, false, false ],
		[ true, false, true ],
		[ false, true, true ],
		[ true, true, true ]
	])('returns true if there is an extractable table or is a special feature', (hasTable: boolean, isSpecial: boolean, expected: boolean) => {
		const f = {} as Feature;

		vi.spyOn(SheetFormatter, 'containsLargeTable').mockReturnValue(hasTable);
		vi.spyOn(SheetFormatter, 'isSpecialHandlingFeature').mockReturnValue(isSpecial);

		expect(SheetFormatter.containsExtractableReferenceContent(f)).toBe(expected);
	});
});

describe('containsLargeTable', () => {
	test.each([
		[ 'Some text.' ],
		[ 'Some text.\nMultiple\nLines' ],
		[ `| A Table | With Three | Columns |
| --- | --- | --- |
| A Table | With Three | Columns |
| A Table | With Three | Columns |` ]
	])('returns false when there is not a table with more than 3 columns', (content: string) => {
		const feature = {
			description: content
		} as Feature;

		expect(SheetFormatter.containsLargeTable(feature)).toBe(false);
	});

	test.each([
		[ `| A Table | With | FOUR | Columns |
| --- | --- | --- | --- |
| A Table | With | FOUR | Columns |
| A Table | With | FOUR | Columns |` ],
		[ `| A Table | With | FOUR | Columns |
|:---|:---:|===:|===|
| A Table | With | FOUR | Columns |
| A Table | With | FOUR | Columns |` ]
	])('returns true when there is a table with more than 3 columns', (content: string) => {
		const feature = {
			description: content
		} as Feature;

		expect(SheetFormatter.containsLargeTable(feature)).toBe(true);
	});
});

describe('isSpecialHandlingFeature', () => {
	test.each([
		[ 'not-special', false ],
		[ 'beastheart-1-2b', true ],
		[ 'summoner-1-2', true ]
	])(' returns true for the correct feature ids', (id: string, expected: boolean) => {
		const f = { id: id } as Feature;
		expect(SheetFormatter.isSpecialHandlingFeature(f)).toBe(expected);
	});
});

describe('extractTable', () => {
	test.each([
		[ 'No table here' ],
		[ '| Might | Look |\n|Like| A | Table|\n|But isnt|' ]
	])('returns null when there is no table', (t: string) => {
		expect(SheetFormatter.extractTable(t)).toBeNull();
	});

	test.each([
		[ `|Simple|Table|
|---|---|
|Some|Content|`, '', `|Simple|Table|
|---|---|
|Some|Content|` ],
		[ `Content Before

		|Simple|Table|\n|---|---|\n|Some|Content|`, 'Content Before', '|Simple|Table|\n|---|---|\n|Some|Content|' ],
		[ `Content Before
|Simple|Table|\n|---|---|\n|Some|Content|
		
Content After`, 'Content Before\nContent After', '|Simple|Table|\n|---|---|\n|Some|Content|' ],
		[ `Content Before
			** Table Label**
		|Simple|Table|\n|---|---|\n|Some|Content|`, 'Content Before', '|Simple|Table|\n|---|---|\n|Some|Content|' ]
	])('Correctly extracts tables from features', (initial: string, after: string, table: string) => {
		const result = SheetFormatter.extractTable(initial);
		expect(result).not.toBeNull();
		expect(result?.content).toBe(table);
		expect(result?.leftover).toBe(after);
	});

	test.each([
		[ 'No hint from content\n|Simple|Table|\n|---|---|\n|Some|Content|', 'Simple Table' ],
		[ 'No hint from content\n| Simple 2  |Table|\n|---|---|\n|Some|Content|', 'Simple 2 Table' ],
		[ '**Table Label**\n|Simple|Table|\n|---|---|\n|Some|Content|', 'Table Label' ],
		[ '### Table Label\n|Simple|Table|\n|---|---|\n|Some|Content|', 'Table Label' ],
		[ '\t### Table Label\n|Simple|Table|\n|---|---|\n|Some|Content|', 'Table Label' ]
	])('correctly sets the table title', (text: string, expectedTitle: string) => {
		const result = SheetFormatter.extractTable(text);
		expect(result).not.toBeNull();
		expect(result?.title).toBe(expectedTitle);
	});

	// future: multiple tables?
});

describe('calculateFeatureReferenceSize', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	test('Correctly calculates the size for a single column and source', () => {
		const features = [ { feature: {} as Feature, source: 'Source 1' } ];
		const hero = FactoryLogic.createHero([]);

		vi.spyOn(SheetFormatter, 'calculateFeatureSize').mockReturnValueOnce(10);

		const result = SheetFormatter.calculateFeatureReferenceSize(features, hero, 50, 1);
		expect(result).toBe(14.5);
	});

	test('Correctly calculates the size for a single column and multiple sources', () => {
		const features = [
			{ feature: {} as Feature, source: 'Source 1' },
			{ feature: {} as Feature, source: 'Source 2' }
		];
		const hero = FactoryLogic.createHero([]);

		vi.spyOn(SheetFormatter, 'calculateFeatureSize').mockReturnValueOnce(10).mockReturnValueOnce(20);

		const result = SheetFormatter.calculateFeatureReferenceSize(features, hero, 50, 1);
		expect(result).toBe(36.5);
	});

	test('Correctly calculates the size for two columns and a single feature', () => {
		const features = [
			{ feature: {} as Feature, source: 'Source 1' }
		];
		const hero = FactoryLogic.createHero([]);

		vi.spyOn(SheetFormatter, 'calculateFeatureSize').mockReturnValueOnce(10);

		const result = SheetFormatter.calculateFeatureReferenceSize(features, hero, 50, 2);
		expect(result).toBe(14.5);
	});

	test('Correctly calculates the size for two columns and two features', () => {
		const features = [
			{ feature: {} as Feature, source: 'Source 1' },
			{ feature: {} as Feature, source: 'Source 2' }
		];
		const hero = FactoryLogic.createHero([]);

		vi.spyOn(SheetFormatter, 'calculateFeatureSize').mockReturnValueOnce(10).mockReturnValueOnce(20);

		// with two different sized features, the value of the largest should determine the overall height
		const result = SheetFormatter.calculateFeatureReferenceSize(features, hero, 50, 2);
		expect(result).toBe(24.5);
	});

	test('Correctly calculates the size for two columns and many features', () => {
		const features = [
			{ feature: {} as Feature, source: 'Source 1' },
			{ feature: {} as Feature, source: 'Source 1' },
			{ feature: {} as Feature, source: 'Source 1' },
			{ feature: {} as Feature, source: 'Source 2' },
			{ feature: {} as Feature, source: 'Source 2' },
			{ feature: {} as Feature, source: 'Source 2' }
		];
		const hero = FactoryLogic.createHero([]);

		vi.spyOn(SheetFormatter, 'calculateFeatureSize').mockReturnValue(10);

		// with two different sized features, the value of the largest should determine the overall height
		const result = SheetFormatter.calculateFeatureReferenceSize(features, hero, 50, 2);
		expect(result).toBe(34.5);
	});
});
