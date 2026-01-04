/* eslint-disable @typescript-eslint/no-deprecated */
import { afterEach, describe, expect, test, vi } from 'vitest';
import { DataService } from '@/utils/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { StorageService } from '@/service/storage/storage-service';
import localforage from 'localforage';

afterEach(() => {
	vi.resetAllMocks();
});

vi.mock('localforage');

const mockStorage = {} as StorageService;

const mockOptions = {} as Options;
const mockHeroes = [] as Hero[];
const mockHomebrew = [] as Sourcebook[];
const mockPlaybook = {} as Playbook;
const mockSession = {} as Session;
const mockHiddenSettingIds = [ 'one', 'two' ];

const catchFn = vi.fn();
const thenFn = vi.fn();

describe('DataService', () => {
	// #region Options
	describe('getOptions', () => {
		test('always calls localforage', async () => {
			const ds = new DataService(mockStorage);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockOptions));

			await ds.getOptions()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-options');
			expect(thenFn).toHaveBeenCalledWith(mockOptions);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveOptions', () => {
		test('always calls localforage', async () => {
			const ds = new DataService(mockStorage);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockOptions));

			await ds.saveOptions(mockOptions)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-options', mockOptions);
			expect(thenFn).toHaveBeenCalledWith(mockOptions);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Options

	// #region Heroes
	describe('getHeroes', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.get = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.get).toHaveBeenCalledWith('forgesteel-heroes');
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveHeroes', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.put = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.saveHeroes(mockHeroes)
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.put).toHaveBeenCalledWith('forgesteel-heroes', mockHeroes);
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Heroes

	// #region Playbook
	describe('getHomebrew', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.get = vi.fn().mockImplementation(() => Promise.resolve(mockHomebrew));

			await ds.getHomebrew()
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.get).toHaveBeenCalledWith('forgesteel-homebrew-settings');
			expect(thenFn).toHaveBeenCalledWith(mockHomebrew);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveHomebrew', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.put = vi.fn().mockImplementation(() => Promise.resolve(mockHomebrew));

			await ds.saveHomebrew(mockHomebrew)
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.put).toHaveBeenCalledWith('forgesteel-homebrew-settings', mockHomebrew);
			expect(thenFn).toHaveBeenCalledWith(mockHomebrew);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Homebrew

	// #region Playbook
	describe('getPlaybook', () => {
		test('always calls localforage', async () => {
			const ds = new DataService(mockStorage);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockPlaybook));

			await ds.getPlaybook()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-playbook');
			expect(thenFn).toHaveBeenCalledWith(mockPlaybook);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('savePlaybook', () => {
		test('always calls localforage', async () => {
			const ds = new DataService(mockStorage);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockPlaybook));

			await ds.savePlaybook(mockPlaybook)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-playbook', mockPlaybook);
			expect(thenFn).toHaveBeenCalledWith(mockPlaybook);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Playbook

	// #region Session
	describe('getSession', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.get = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await ds.getSession()
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.get).toHaveBeenCalledWith('forgesteel-session');
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveSession', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.put = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await ds.saveSession(mockSession)
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.put).toHaveBeenCalledWith('forgesteel-session', mockSession);
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Session

	// #region HiddenSettingIds
	describe('getHiddenSettingIds', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.get = vi.fn().mockImplementation(() => Promise.resolve(mockHiddenSettingIds));

			await ds.getHiddenSettingIds()
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.get).toHaveBeenCalledWith('forgesteel-hidden-setting-ids');
			expect(thenFn).toHaveBeenCalledWith(mockHiddenSettingIds);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveHiddenSettingIds', () => {
		test('forwards to the storage service', async () => {
			const ds = new DataService(mockStorage);

			mockStorage.put = vi.fn().mockImplementation(() => Promise.resolve(mockHiddenSettingIds));

			await ds.saveHiddenSettingIds(mockHiddenSettingIds)
				.then(thenFn)
				.catch(catchFn);

			expect(mockStorage.put).toHaveBeenCalledWith('forgesteel-hidden-setting-ids', mockHiddenSettingIds);
			expect(thenFn).toHaveBeenCalledWith(mockHiddenSettingIds);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion HiddenSettingIds
});
