import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { DataStorageKeys } from './storage-service';
import { Hero } from '@/models/hero';
import { LocalService } from './local-service';
import localforage from 'localforage';

afterEach(() => {
	vi.resetAllMocks();
});

vi.mock('localforage');

describe('LocalService', () => {
	const mockHero1 = { id: 'test-hero1' } as Hero;
	const mockHero2 = { id: 'test-hero2' } as Hero;

	let service = new LocalService();
	beforeEach(async () => {
		service = new LocalService();
		const connected = await service.initialize();
		expect(connected).toBe(true);
	});

	const catchFn = vi.fn();
	const thenFn = vi.fn();

	describe('getHeroes', () => {
		test('retrieves Heroes stored at correct key', async () => {
			const testData = [ mockHero1, mockHero2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Heroes);
			expect(thenFn).toHaveBeenCalledWith(testData);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('getHero', () => {
		test('returns null when no heroes have been stored', async () => {
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(null));

			await service.getHero('some-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Heroes);
			expect(thenFn).toHaveBeenCalledWith(null);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('returns null when no hero with id exists', async () => {
			const testData = [ mockHero1, mockHero2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getHero('none-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Heroes);
			expect(thenFn).toHaveBeenCalledWith(null);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('returns the hero with the matching id if it exists', async () => {
			const testData = [ mockHero1, mockHero2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getHero('test-hero1')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Heroes);
			expect(thenFn).toHaveBeenCalledWith(mockHero1);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('putHero', () => {
		const mockHero3 = { id: 'test-hero3' } as Hero;

		beforeEach(() => {
			// dirty mock of localforage that will return the last thing set when get is called
			let lastSet: Hero[];
			localforage.setItem = vi.fn().mockImplementation((_key: string, value: Hero[]) => { lastSet = value; });
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(lastSet));
		});

		test('saving a new hero will return that hero with subsequent get single', async () => {
			const putThenFn = vi.fn();
			await service.putHero(mockHero3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getHero('test-hero3')
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalledWith(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving a new hero will return that hero with subsequent get all - no prior', async () => {
			const putThenFn = vi.fn();
			await service.putHero(mockHero3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getHeroes()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(1);
			expect(getResult).toContainEqual(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving a new hero will return that hero with subsequent get all - with prior', async () => {
			const existingData = [ mockHero1, mockHero2 ];
			localforage.setItem<Hero[]>(DataStorageKeys.Heroes, existingData);

			const putThenFn = vi.fn();
			await service.putHero(mockHero3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getHeroes()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(3);
			expect(getResult).toContainEqual(mockHero1);
			expect(getResult).toContainEqual(mockHero2);
			expect(getResult).toContainEqual(mockHero3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving an existing hero will update the existing entry', async () => {
			const existingData = [ mockHero1, mockHero2 ];
			localforage.setItem<Hero[]>(DataStorageKeys.Heroes, existingData);

			const updatedHero1 = {
				id: 'test-hero1',
				name: 'new value'
			} as Hero;

			const putThenFn = vi.fn();
			await service.putHero(updatedHero1)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(updatedHero1);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getHeroes()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(2);
			expect(getResult).toContainEqual(updatedHero1);
			expect(getResult).toContainEqual(mockHero2);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('deleteHero', () => {
		beforeEach(() => {
			// dirty mock of localforage that will return the last thing set when get is called
			let lastSet: Hero[];
			localforage.setItem = vi.fn().mockImplementation((_key: string, value: Hero[]) => { lastSet = value; });
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(lastSet));
		});

		test('deleting a hero removes it from the set', async () => {
			const existingData = [ mockHero1, mockHero2 ];
			localforage.setItem<Hero[]>(DataStorageKeys.Heroes, existingData);

			await service.deleteHero('test-hero1')
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn).toHaveBeenCalled();
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getHeroes()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(1);
			expect(getResult).toContainEqual(mockHero2);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
});
