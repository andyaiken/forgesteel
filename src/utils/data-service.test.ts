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

const defaultSettings: ConnectionSettings = {
	useWarehouse: false,
	warehouseHost: '',
	warehouseToken: '',
	patreonConnected: false
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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

			localforage.getItem = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.getItem).toHaveBeenCalledWith('forgesteel-heroes');
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('gets a JWT and calls the Warehouse when configured to do so', async () => {
			const connSettings = { ...defaultSettings,
				useWarehouse: true,
				warehouseHost: 'http://test-fake-host',
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const healthResponse = { data: { version: '0.1.6' } };
			const jwtResponse = { data: { access_token: 'fake_token' } };

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			const responseObj = { data: { data: mockData } };
			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(healthResponse))
				.mockImplementationOnce(() => Promise.resolve(jwtResponse))
				.mockImplementationOnce(() => Promise.resolve(responseObj));

			const ds = new DataService(connSettings);
			const connected = await ds.initialize();
			expect(connected).toBe(true);

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenNthCalledWith(1, 'http://test-fake-host/healthz');

			expect(axios.get).toHaveBeenNthCalledWith(2, 'http://test-fake-host/connect', {
				headers: { Authorization: 'Bearer abcd123' }
			});

			expect(axios.get).toHaveBeenNthCalledWith(3, 'http://test-fake-host/data/forgesteel-heroes', {
				headers: { Authorization: 'Bearer fake_token' }
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});

		test('Uses cookie auth for new versions of Warehouse', async () => {
			const connSettings = { ...defaultSettings,
				useWarehouse: true,
				warehouseHost: 'http://test-fake-host',
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const healthResponse = { data: { version: '1.0.0' } };
			const connectResponse = { data: {} };

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			const responseObj = { data: { data: mockData } };
			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(healthResponse))
				.mockImplementationOnce(() => Promise.resolve(responseObj));

			axios.post = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(connectResponse));

			const ds = new DataService(connSettings);
			const connected = await ds.initialize();
			expect(connected).toBe(true);

			await ds.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenNthCalledWith(1, 'http://test-fake-host/healthz');

			expect(axios.post).toHaveBeenNthCalledWith(1, 'http://test-fake-host/connect', { }, {
				headers: { Authorization: 'Bearer abcd123' },
				withCredentials: true,
				withXSRFToken: true
			});

			expect(axios.get).toHaveBeenNthCalledWith(2, 'http://test-fake-host/data/forgesteel-heroes', {
				withCredentials: true,
				withXSRFToken: true
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

	describe('saveHeroes', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(defaultSettings);

			localforage.setItem = vi.fn().mockImplementation(() => Promise.resolve(mockHeroes));

			await ds.saveHeroes(mockHeroes)
				.then(thenFn)
				.catch(catchFn);

			expect(localforage.setItem).toHaveBeenCalledWith('forgesteel-heroes', mockHeroes);
			expect(thenFn).toHaveBeenCalledWith(mockHeroes);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('calls warehouse if configured', async () => {
			const connSettings = { ...defaultSettings,
				warehouseHost: 'fake-host',
				useWarehouse: true,
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const healthResponse = { data: { version: '0.1.6' } };
			const jwtResponse = { data: { access_token: 'fake_token' } };

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(healthResponse))
				.mockImplementationOnce(() => Promise.resolve(jwtResponse));

			axios.put = vi.fn();

			const ds = new DataService(connSettings);
			const connected = await ds.initialize();
			expect(connected).toBe(true);

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			// const responseObj = { data: mockData };
			await ds.saveHeroes(mockData)
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenNthCalledWith(1, 'fake-host/healthz');

			expect(axios.get).toHaveBeenNthCalledWith(2, 'fake-host/connect', {
				headers: { Authorization: 'Bearer abcd123' }
			});

			expect(axios.put).toHaveBeenCalledWith('fake-host/data/forgesteel-heroes', mockData, {
				headers: { Authorization: 'Bearer fake_token' }
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});

		test('Uses cookie auth for new versions of warehouse', async () => {
			const connSettings = { ...defaultSettings,
				warehouseHost: 'fake-host',
				useWarehouse: true,
				warehouseToken: 'abcd123'
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const healthResponse = { data: { version: '1.0.0' } };
			const connectResponse = { data: { } };

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(healthResponse));

			axios.post = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(connectResponse));

			axios.put = vi.fn();

			const ds = new DataService(connSettings);
			const connected = await ds.initialize();
			expect(connected).toBe(true);

			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];
			// const responseObj = { data: mockData };
			await ds.saveHeroes(mockData)
				.then(thenFn)
				.catch(catchFn);

			expect(axios.get).toHaveBeenNthCalledWith(1, 'fake-host/healthz');

			expect(axios.post).toHaveBeenNthCalledWith(1, 'fake-host/connect', { }, {
				headers: { Authorization: 'Bearer abcd123' },
				withCredentials: true,
				withXSRFToken: true
			});

			expect(axios.put).toHaveBeenCalledWith('fake-host/data/forgesteel-heroes', mockData, {
				withCredentials: true,
				withXSRFToken: true
			});

			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});
	// #endregion Heroes

	// #region Playbook
	describe('getHomebrew', () => {
		test('calls localforage when configured to not use warehouse', async () => {
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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
			const ds = new DataService(defaultSettings);

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

	// #region Token Handler
	describe('getPatreonAuthUrl', () => {
		test('calls the token handler login/start endpoint', async () => {
			const ds = new DataService(defaultSettings);

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const authUrl = 'https://some.fake/auth/url';
			const urlResponse = {
				data: {
					authorizationUrl: authUrl
				}
			};

			axios.post = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(urlResponse));

			await ds.getPatreonAuthUrl()
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn).toHaveBeenCalledWith(authUrl);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('finishPatreonLogin', () => {
		test('returns a successful login correctly', async () => {
			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const sessionResponse = {
				data: {
					authenticated_with_patreon: true,
					user: {
						mcdm: {
							patron: true,
							tier_cents: 800,
							start: 'Wed, 14 Feb 2024 00:00:00 GMT'
						}
					}
				}
			};

			axios.post = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(sessionResponse));

			const ds = new DataService(defaultSettings);

			await ds.finishPatreonLogin('some_code', 'some_state')
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn.mock.lastCall).toEqual([ {
				authenticated: true,
				connections: [
					{
						name: 'MCDM Patreon',
						status: {
							patron: true,
							tier_cents: 800,
							start: 'Wed, 14 Feb 2024 00:00:00 GMT'
						}
					}
				]
			} ]);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});

	describe('getPatreonSession', () => {
		test('returns a logged in session correctly', async () => {
			const connSettings = { ...defaultSettings,
				patreonConnected: true
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const sessionResponse = {
				data: {
					authenticated_with_patreon: true,
					user: {
						mcdm: {
							patron: false,
							tier_cents: 0,
							start: null
						}
					}
				}
			};

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(sessionResponse));

			const ds = new DataService(connSettings);

			await ds.getPatreonSession()
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn.mock.lastCall).toEqual([ {
				authenticated: true,
				connections: [
					{
						name: 'MCDM Patreon',
						status: {
							patron: false,
							tier_cents: 0,
							start: null
						}
					}
				]
			} ]);
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('returns a NON logged in session correctly', async () => {
			const connSettings = { ...defaultSettings,
				patreonConnected: true
			};

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const sessionResponse = {
				data: {
					authenticated_with_patreon: false,
					user: null
				}
			};

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(sessionResponse));

			const ds = new DataService(connSettings);

			await ds.getPatreonSession()
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn.mock.lastCall).toEqual([ {
				authenticated: false,
				connections: []
			} ]);
			expect(catchFn).not.toHaveBeenCalled();
		});
	});
	// #endregion Token Handler
});
