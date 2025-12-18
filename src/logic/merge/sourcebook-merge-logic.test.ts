import { describe, expect, it } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { MergeDuplicateBehavior } from '@/enums/merge-duplicate-behavior';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookMergeLogic } from '@/logic/merge/sourcebook-merge-logic';

describe('merge', () => {
	const byId = (arr: Sourcebook[], id: string): Sourcebook | undefined => {
		return arr.find(s => s.id === id);
	};

	it('should merge items into target', () => {
		const src: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '3',
			name: 'Baz'
		} ];

		const result = SourcebookMergeLogic.merge(src, dest);
		expect(result.length).toBe(3);
		expect(byId(result, '1')?.name).toBe('Foo');
		expect(byId(result, '2')?.name).toBe('Bar');
		expect(byId(result, '3')?.name).toBe('Baz');
	});

	it('should skip merging duplicate ids by default', () => {
		const src: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Baz'
		} ];

		const result1 = SourcebookMergeLogic.merge(src, dest);
		expect(result1.length).toBe(2);
		expect(byId(result1, '1')?.name).toBe('Baz');
		expect(byId(result1, '2')?.name).toBe('Bar');

		const result2 = SourcebookMergeLogic.merge(src, dest, MergeDuplicateBehavior.Skip);
		expect(result2.length).toBe(2);
		expect(byId(result2, '1')?.name).toBe('Baz');
		expect(byId(result2, '2')?.name).toBe('Bar');
	});

	it('should allow for replacing items in target with duplicate ids from the source list', () => {
		const src: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Baz'
		} ];

		const result = SourcebookMergeLogic.merge(src, dest, MergeDuplicateBehavior.Replace);
		expect(result.length).toBe(2);
		expect(byId(result, '1')?.name).toBe('Foo');
		expect(byId(result, '2')?.name).toBe('Bar');
	});
});

describe('containsDuplicates', () => {
	it('should return false when no duplicate ids exist in target', () => {
		const src: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '3',
			name: 'Baz'
		} ];

		const result = SourcebookMergeLogic.containsDuplicates(src, dest);
		expect(result).toBe(false);
	});

	it('should return true when duplicate ids exist in target', () => {
		const src: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1',
			name: 'Baz'
		} ];

		const result = SourcebookMergeLogic.containsDuplicates(src, dest);
		expect(result).toBe(true);
	});
});

describe('missingData', () => {
	it('should return false when check is not missing any entries present in reference', () => {
		const check: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '3'
		} ];

		const ref: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '3'
		} ];

		const result = SourcebookMergeLogic.missingData(ref, check);
		expect(result).toBe(false);
	});

	it('should return true when check IS missing data in reference', () => {
		const check: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '1'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '3'
		} ];

		const ref: Sourcebook[] = [ {
			...FactoryLogic.createSourcebook(),
			id: '3'
		}, {
			...FactoryLogic.createSourcebook(),
			id: '4'
		} ];

		const result = SourcebookMergeLogic.missingData(ref, check);
		expect(result).toBe(true);
	});
});
