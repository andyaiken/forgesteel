import { afterEach, describe, expect, test, vi } from 'vitest';
import { ConnectionSettings } from '@/models/connection-settings';
import { Hero } from '@/models/hero';
import MockAdapter from 'axios-mock-adapter';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { WarehouseService } from '@/services/storage/warehouse-service';
import axios from 'axios';

afterEach(() => {
	vi.resetAllMocks();
});

const defaultSettings: ConnectionSettings = {
	useManualWarehouse: true,
	warehouseHost: 'http://test-fake-host',
	warehouseToken: 'abcd123',
	patreonConnected: false,
	usePatreonWarehouse: false,
	patreonConnections: [],
	dataSource: undefined
};

describe('WarehouseService', () => {
	vi.mock('axios', async () => {
		return {
			...(await vi.importActual('axios') as object),
			create: vi.fn().mockReturnValue(await vi.importActual('axios'))
		};
	});

	const catchFn = vi.fn();
	const thenFn = vi.fn();

	const mockAdapter = new MockAdapter(axios);

	mockAdapter.onPost('http://test-fake-host/connect').reply(config => {
		expect(config.headers?.Authorization).toBe('Bearer abcd123');
		return [ 200, { access_token: 'fake_token', refresh_token: 'refresh_token' } ];
	});

	describe('setup', () => {
		test('creates an axios instance with the correct configuration', async () => {
			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);
		});
	});

	// #region Heroes
	describe('getHeroes', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];

			mockAdapter.onGet('data/forgesteel-heroes').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockData } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});

		test('refreshes the token if it has expired', async () => {
			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];

			mockAdapter
				.onGet('data/forgesteel-heroes')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-heroes')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockData } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHeroes()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

	describe('getHero', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockHero = { id: 'test-hero' } as Hero;

			mockAdapter.onGet('data/forgesteel-heroes/test-hero').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockHero } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHero('test-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockHero);
		});

		test('refreshes the token if it has expired', async () => {
			const mockHero = { id: 'test-hero' } as Hero;

			mockAdapter
				.onGet('data/forgesteel-heroes/test-hero')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-heroes/test-hero')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockHero } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHero('test-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockHero);
		});
	});

	describe('putHero', () => {
		test('ensures a hero has an id', async () => {
			const mockHero = { name: 'test-hero' } as Hero;

			mockAdapter.onPut(new RegExp('/data/forgesteel-heroes/*')).reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: config.data } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putHero(mockHero)
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn).toHaveBeenCalled();
			const result = thenFn.mock.lastCall ? thenFn.mock.lastCall[0] : undefined;
			expect(result).toBeDefined();
			expect(result.name).toEqual(mockHero.name);
			expect(result.id).toBeDefined();
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockHero = { id: 'test-hero' } as Hero;

			mockAdapter.onPut('data/forgesteel-heroes/test-hero').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockHero } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putHero(mockHero)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockHero);
		});

		test('refreshes the token if it has expired', async () => {
			const mockHero = { id: 'test-hero' } as Hero;

			mockAdapter
				.onPut('data/forgesteel-heroes/test-hero')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onPut('data/forgesteel-heroes/test-hero')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockHero } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putHero(mockHero)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockHero);
		});
	});

	describe('deleteHero', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onDelete('data/forgesteel-heroes/test-hero').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 204, { } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.deleteHero('test-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalled();
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onDelete('data/forgesteel-heroes/test-hero')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onDelete('data/forgesteel-heroes/test-hero')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.deleteHero('test-hero')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalled();
		});
	});
	// #endregion

	// #region Sourcebooks
	describe('getSourcebooks', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;
			const mockData = [ mockSourcebook ];

			mockAdapter.onGet('data/forgesteel-homebrew-settings').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockData } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSourcebooks()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});

		test('refreshes the token if it has expired', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;
			const mockData = [ mockSourcebook ];

			mockAdapter
				.onGet('data/forgesteel-homebrew-settings')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-homebrew-settings')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockData } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSourcebooks()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

	describe('getSourcebook', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;

			mockAdapter.onGet('data/forgesteel-homebrew-settings/test-Sourcebook').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockSourcebook } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSourcebook('test-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSourcebook);
		});

		test('refreshes the token if it has expired', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;

			mockAdapter
				.onGet('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockSourcebook } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSourcebook('test-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSourcebook);
		});
	});

	describe('putSourcebook', () => {
		test('ensures a Sourcebook has an id', async () => {
			const mockSourcebook = { name: 'test-Sourcebook' } as Sourcebook;

			mockAdapter.onPut(new RegExp('/data/forgesteel-homebrew-settings/*')).reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: config.data } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putSourcebook(mockSourcebook)
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn).toHaveBeenCalled();
			const result = thenFn.mock.lastCall ? thenFn.mock.lastCall[0] : undefined;
			expect(result).toBeDefined();
			expect(result.name).toEqual(mockSourcebook.name);
			expect(result.id).toBeDefined();
			expect(catchFn).not.toHaveBeenCalled();
		});

		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;

			mockAdapter.onPut('data/forgesteel-homebrew-settings/test-Sourcebook').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockSourcebook } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putSourcebook(mockSourcebook)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSourcebook);
		});

		test('refreshes the token if it has expired', async () => {
			const mockSourcebook = { id: 'test-Sourcebook' } as Sourcebook;

			mockAdapter
				.onPut('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onPut('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockSourcebook } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putSourcebook(mockSourcebook)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSourcebook);
		});
	});

	describe('deleteSourcebook', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onDelete('data/forgesteel-homebrew-settings/test-Sourcebook').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 204, { } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.deleteSourcebook('test-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalled();
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onDelete('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onDelete('data/forgesteel-homebrew-settings/test-Sourcebook')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.deleteSourcebook('test-Sourcebook')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalled();
		});
	});
	// #endregion

	// #region Session
	const mockSession = { playerViewID: 'test-session' } as Session;
	describe('getSession', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onGet('data/forgesteel-session').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: mockSession } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSession()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSession);
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onGet('data/forgesteel-session')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-session')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: mockSession } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getSession()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSession);
		});
	});

	describe('putSession', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onPut('data/forgesteel-session').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				expect(config.data).toBe(mockSession);
				return [ 204 ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putSession(mockSession)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSession);
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onPut('data/forgesteel-session')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onPut('data/forgesteel-session')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer fake_token');
					expect(config.data).toBe(mockSession);
					return [ 204 ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putSession(mockSession)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockSession);
		});
	});
	// #endregion

	// #region Hidden Sourcebook IDs
	const testSourcebookIDs = [ 'test-sourcebook-x', 'test-sourcebook-y' ];
	describe('getHiddenSourcebookIDs', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onGet('data/forgesteel-hidden-setting-ids').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				return [ 200, { data: testSourcebookIDs } ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHiddenSourcebookIDs()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onGet('data/forgesteel-hidden-setting-ids')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onGet('data/forgesteel-hidden-setting-ids')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer new_token');
					return [ 200, { data: testSourcebookIDs } ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.getHiddenSourcebookIDs()
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
		});
	});

	describe('putHiddenSourcebookIDs', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			mockAdapter.onPut('data/forgesteel-hidden-setting-ids').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				expect(config.data).toBe(testSourcebookIDs);
				return [ 204 ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putHiddenSourcebookIDs(testSourcebookIDs)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
		});

		test('refreshes the token if it has expired', async () => {
			mockAdapter
				.onPut('data/forgesteel-hidden-setting-ids')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onPut('data/forgesteel-hidden-setting-ids')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer fake_token');
					expect(config.data).toBe(testSourcebookIDs);
					return [ 204 ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.putHiddenSourcebookIDs(testSourcebookIDs)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(testSourcebookIDs);
		});
	});
	// #endregion
});
