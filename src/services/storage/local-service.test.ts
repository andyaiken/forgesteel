import { DataStorageKeys, LocalService } from './local-service';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Hero } from '@/models/hero';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import localforage from 'localforage';

afterEach(() => {
	vi.resetAllMocks();
});

vi.mock('localforage');

describe('LocalService', () => {
	let service = new LocalService();
	beforeEach(async () => {
		service = new LocalService();
		const connected = await service.initialize();
		expect(connected).toBe(true);
	});

	const catchFn = vi.fn();
	const thenFn = vi.fn();

	const mockHero1 = { id: 'test-hero1' } as Hero;
	const mockHero2 = { id: 'test-hero2' } as Hero;

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

	const mockSourcebook1 = { id: 'test-Sourcebook1' } as Sourcebook;
	const mockSourcebook2 = { id: 'test-Sourcebook2' } as Sourcebook;

	describe('getSourcebooks', () => {
		test('retrieves sourcebooks stored at correct key', async () => {
			const testData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getSourcebooks()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Sourcebooks);
			expect(thenFn).toHaveBeenCalledWith(testData);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('getSourcebook', () => {
		test('returns null when no Sourcebooks have been stored', async () => {
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(null));

			await service.getSourcebook('some-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Sourcebooks);
			expect(thenFn).toHaveBeenCalledWith(null);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('returns null when no Sourcebook with id exists', async () => {
			const testData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getSourcebook('none-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Sourcebooks);
			expect(thenFn).toHaveBeenCalledWith(null);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('returns the Sourcebook with the matching id if it exists', async () => {
			const testData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testData));

			await service.getSourcebook('test-Sourcebook1')
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Sourcebooks);
			expect(thenFn).toHaveBeenCalledWith(mockSourcebook1);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('putSourcebook', () => {
		const mockSourcebook3 = { id: 'test-Sourcebook3' } as Sourcebook;

		beforeEach(() => {
			// dirty mock of localforage that will return the last thing set when get is called
			let lastSet: Sourcebook[];
			localforage.setItem = vi.fn().mockImplementation((_key: string, value: Sourcebook[]) => { lastSet = value; });
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(lastSet));
		});

		test('saving a new Sourcebook will return that Sourcebook with subsequent get single', async () => {
			const putThenFn = vi.fn();
			await service.putSourcebook(mockSourcebook3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getSourcebook('test-Sourcebook3')
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalledWith(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving a new Sourcebook will return that Sourcebook with subsequent get all - no prior', async () => {
			const putThenFn = vi.fn();
			await service.putSourcebook(mockSourcebook3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getSourcebooks()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(1);
			expect(getResult).toContainEqual(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving a new Sourcebook will return that Sourcebook with subsequent get all - with prior', async () => {
			const existingData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, existingData);

			const putThenFn = vi.fn();
			await service.putSourcebook(mockSourcebook3)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getSourcebooks()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(3);
			expect(getResult).toContainEqual(mockSourcebook1);
			expect(getResult).toContainEqual(mockSourcebook2);
			expect(getResult).toContainEqual(mockSourcebook3);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('saving an existing Sourcebook will update the existing entry', async () => {
			const existingData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, existingData);

			const updatedSourcebook1 = {
				id: 'test-Sourcebook1',
				name: 'new value'
			} as Sourcebook;

			const putThenFn = vi.fn();
			await service.putSourcebook(updatedSourcebook1)
				.then(putThenFn)
				.catch(catchFn);

			expect(putThenFn).toHaveBeenCalledWith(updatedSourcebook1);
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getSourcebooks()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(2);
			expect(getResult).toContainEqual(updatedSourcebook1);
			expect(getResult).toContainEqual(mockSourcebook2);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('deleteSourcebook', () => {
		beforeEach(() => {
			// dirty mock of localforage that will return the last thing set when get is called
			let lastSet: Sourcebook[];
			localforage.setItem = vi.fn().mockImplementation((_key: string, value: Sourcebook[]) => { lastSet = value; });
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(lastSet));
		});

		test('deleting a Sourcebook removes it from the set', async () => {
			const existingData = [ mockSourcebook1, mockSourcebook2 ];
			localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, existingData);

			await service.deleteSourcebook('test-Sourcebook1')
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn).toHaveBeenCalled();
			expect(catchFn).not.toHaveBeenCalled();

			const getThenFn = vi.fn();
			await service.getSourcebooks()
				.then(getThenFn)
				.catch(catchFn);

			expect(getThenFn).toHaveBeenCalled();
			const getResult = getThenFn.mock.lastCall ? getThenFn.mock.lastCall[0] : undefined;
			expect(getResult).toBeDefined();
			expect(getResult).toHaveLength(1);
			expect(getResult).toContainEqual(mockSourcebook2);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	const mockSession = { playerViewID: 'test-session' } as Session;

	describe('getSession', () => {
		test('retrieves session stored at correct key', async () => {
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await service.getSession()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.Session);
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('putSession', () => {
		test('sets session at correct key', async () => {
			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await service.putSession(mockSession)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith(DataStorageKeys.Session, mockSession);
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	const testSourcebookIDs = [ 'test-sourcebook-x', 'test-sourcebook-y' ];
	describe('getHiddenSourcebookIDs', () => {
		test('retrieves session stored at correct key', async () => {
			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(testSourcebookIDs));

			await service.getHiddenSourcebookIDs()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith(DataStorageKeys.HiddenSourcebookIDs);
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('putHiddenSourcebookIDs', () => {
		test('sets session at correct key', async () => {
			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(testSourcebookIDs));

			await service.putHiddenSourcebookIDs(testSourcebookIDs)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith(DataStorageKeys.HiddenSourcebookIDs, testSourcebookIDs);
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
});
