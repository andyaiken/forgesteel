import { afterEach, describe, expect, test, vi } from 'vitest';
import { ConnectionSettings } from '@/models/connection-settings';
import { Hero } from '@/models/hero';
import MockAdapter from 'axios-mock-adapter';
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

	describe('get', () => {
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

			await service.get<Hero[]>('forgesteel-heroes')
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

			await service.get<Hero[]>('forgesteel-heroes')
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

	describe('put', () => {
		test('calls the correct api endpoint with the correct authorization', async () => {
			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];

			mockAdapter.onPut('data/forgesteel-heroes').reply(config => {
				expect(config.headers?.Authorization).toBe('Bearer fake_token');
				expect(config.data).toBe(mockData);
				return [ 204 ];
			});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.put<Hero[]>('forgesteel-heroes', mockData)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});

		test('refreshes the token if it has expired', async () => {
			const mockHero = { id: 'test-hero' } as Hero;
			const mockData = [ mockHero ];

			mockAdapter
				.onPut('data/forgesteel-heroes')
				.replyOnce(401, { msg: 'Token has expired' })
				.onPost('http://test-fake-host/refresh')
				.reply(config => {
					expect(config.headers?.Authorization).toBe('Bearer refresh_token');
					return [ 200, { access_token: 'new_token' } ];
				})
				.onPut('data/forgesteel-heroes')
				.replyOnce(config => {
					expect(config.headers?.Authorization).toBe('Bearer fake_token');
					expect(config.data).toBe(mockData);
					return [ 204 ];
				});

			const service = new WarehouseService(defaultSettings);
			const connected = await service.initialize();
			expect(connected).toBe(true);

			await service.put<Hero[]>('forgesteel-heroes', mockData)
				.then(thenFn)
				.catch(catchFn);

			expect(catchFn).not.toHaveBeenCalled();
			expect(thenFn).toHaveBeenCalledWith(mockData);
		});
	});

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
});
