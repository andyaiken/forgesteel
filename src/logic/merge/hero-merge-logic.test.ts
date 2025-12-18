import { describe, expect, it } from 'vitest';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroMergeLogic } from '@/logic/merge/hero-merge-logic';
import { MergeDuplicateBehavior } from '@/enums/merge-duplicate-behavior';

describe('merge', () => {
	const byId = (arr: Hero[], id: string): Hero | undefined => {
		return arr.find(s => s.id === id);
	};

	it('should merge items into target', () => {
		const src: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createHero([]),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '3',
			name: 'Baz'
		} ];

		const result = HeroMergeLogic.merge(src, dest);
		expect(result.length).toBe(3);
		expect(byId(result, '1')?.name).toBe('Foo');
		expect(byId(result, '2')?.name).toBe('Bar');
		expect(byId(result, '3')?.name).toBe('Baz');
	});

	it('should skip merging duplicate ids by default', () => {
		const src: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createHero([]),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Baz'
		} ];

		const result1 = HeroMergeLogic.merge(src, dest);
		expect(result1.length).toBe(2);
		expect(byId(result1, '1')?.name).toBe('Baz');
		expect(byId(result1, '2')?.name).toBe('Bar');

		const result2 = HeroMergeLogic.merge(src, dest, MergeDuplicateBehavior.Skip);
		expect(result2.length).toBe(2);
		expect(byId(result2, '1')?.name).toBe('Baz');
		expect(byId(result2, '2')?.name).toBe('Bar');
	});

	it('should allow for replacing items in target with duplicate ids from the source list', () => {
		const src: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createHero([]),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Baz'
		} ];

		const result = HeroMergeLogic.merge(src, dest, MergeDuplicateBehavior.Replace);
		expect(result.length).toBe(2);
		expect(byId(result, '1')?.name).toBe('Foo');
		expect(byId(result, '2')?.name).toBe('Bar');
	});
});

describe('containsDuplicates', () => {
	it('should return false when no duplicate ids exist in target', () => {
		const src: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createHero([]),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '3',
			name: 'Baz'
		} ];

		const result = HeroMergeLogic.containsDuplicates(src, dest);
		expect(result).toBe(false);
	});

	it('should return true when duplicate ids exist in target', () => {
		const src: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Foo'
		}, {
			...FactoryLogic.createHero([]),
			id: '2',
			name: 'Bar'
		} ];

		const dest: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1',
			name: 'Baz'
		} ];

		const result = HeroMergeLogic.containsDuplicates(src, dest);
		expect(result).toBe(true);
	});
});

describe('missingData', () => {
	it('should return false when check is not missing any entries present in reference', () => {
		const check: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1'
		}, {
			...FactoryLogic.createHero([]),
			id: '3'
		} ];

		const ref: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '3'
		} ];

		const result = HeroMergeLogic.missingData(ref, check);
		expect(result).toBe(false);
	});

	it('should return true when check IS missing data in reference', () => {
		const check: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '1'
		}, {
			...FactoryLogic.createHero([]),
			id: '3'
		} ];

		const ref: Hero[] = [ {
			...FactoryLogic.createHero([]),
			id: '3'
		}, {
			...FactoryLogic.createHero([]),
			id: '4'
		} ];

		const result = HeroMergeLogic.missingData(ref, check);
		expect(result).toBe(true);
	});
});
