/* eslint-disable @typescript-eslint/no-deprecated */
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import axios from 'axios';
import localforage from 'localforage';

afterEach(() => {
	vi.resetAllMocks();
});

vi.mock('axios');
vi.mock('localforage');

const useLocalSettings: ConnectionSettings = {
	useWarehouse: false,
	warehouseHost: '',
	warehouseToken: ''
};

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
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

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
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

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
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-heroes');
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('gets a JWT and calls the Warehouse when configured to do so', async () => {
			const connSettings: ConnectionSettings = {
				useWarehouse: true,
				warehouseHost: 'http://test-fake-host',
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const jwtResponse = { data: { access_token: 'fake_token' } };

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			const responseObj = { data: { data: mockData } };
			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(jwtResponse))
				.mockImplementationOnce(() => Promise.resolve(responseObj));

			const ds = new DataService(connSettings);

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenNthCalledWith(1, 'http://test-fake-host/connect', {
				headers: { Authorization: 'Bearer abcd123' }
			});

			expect(axios.get).toHaveBeenNthCalledWith(2, 'http://test-fake-host/data/forgesteel-heroes', {
				headers: { Authorization: 'Bearer fake_token' }
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

	describe('saveHeroes', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.saveHeroes(mockHeroes)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-heroes', mockHeroes);
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('calls warehouse if configured', async () => {
			const connSettings: ConnectionSettings = {
				warehouseHost: 'fake-host',
				useWarehouse: true,
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const jwtResponse = { data: { access_token: 'fake_token' } };

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(jwtResponse));

			axios.put = vi.fn();

			const ds = new DataService(connSettings);

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			// const responseObj = { data: mockData };
			await ds.saveHeroes(mockData)
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenCalledWith('fake-host/connect', {
				headers: { Authorization: 'Bearer abcd123' }
			});

			expect(axios.put).toHaveBeenCalledWith('fake-host/data/forgesteel-heroes', mockData, {
				headers: { Authorization: 'Bearer fake_token' }
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});
	// #endregion Heroes

	// #region Playbook
	describe('getHomebrew', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockHomebrew));

			await ds.getHomebrew()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-homebrew-settings');
			expect(thenFn).toHaveBeenCalledWith(mockHomebrew);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveHomebrew', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockHomebrew));

			await ds.saveHomebrew(mockHomebrew)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-homebrew-settings', mockHomebrew);
			expect(thenFn).toHaveBeenCalledWith(mockHomebrew);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Homebrew

	// #region Playbook
	describe('getPlaybook', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

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
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

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
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await ds.getSession()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-session');
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveSession', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockSession));

			await ds.saveSession(mockSession)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-session', mockSession);
			expect(thenFn).toHaveBeenCalledWith(mockSession);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Session

	// #region HiddenSettingIds
	describe('getHiddenSettingIds', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockHiddenSettingIds));

			await ds.getHiddenSettingIds()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-hidden-setting-ids');
			expect(thenFn).toHaveBeenCalledWith(mockHiddenSettingIds);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('saveHiddenSettingIds', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(useLocalSettings);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockHiddenSettingIds));

			await ds.saveHiddenSettingIds(mockHiddenSettingIds)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-hidden-setting-ids', mockHiddenSettingIds);
			expect(thenFn).toHaveBeenCalledWith(mockHiddenSettingIds);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion HiddenSettingIds
});
