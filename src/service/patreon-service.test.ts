import { afterEach, describe, expect, test, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { PatreonService } from './patreon-service';
import axios from 'axios';

describe('PatreonService', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	vi.mock('axios', async () => {
		return {
			...(await vi.importActual('axios') as object),
			create: vi.fn().mockReturnValue(await vi.importActual('axios'))
		};
	});

	const mockAdapter = new MockAdapter(axios);

	// #region Token Handler
	describe('getPatreonAuthUrl', () => {
		test('calls the token handler login/start endpoint', async () => {
			const svc = new PatreonService();

			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const authUrl = 'https://some.fake/auth/url';

			mockAdapter.onPost('/th/login/start').reply(() => {
				return [ 200, { authorizationUrl: authUrl } ];
			});
			await svc.getPatreonAuthUrl()
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
				authenticated_with_patreon: true,
				user: {
					mcdm: {
						patron: true,
						tier_cents: 800,
						start: 'Wed, 14 Feb 2024 00:00:00 GMT'
					}
				}
			};

			mockAdapter.onPost('/th/login/end').reply(() => {
				return [ 200, sessionResponse ];
			});

			const svc = new PatreonService();

			await svc.finishPatreonLogin('some_code', 'some_state')
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn.mock.lastCall).toEqual([ {
				authenticated: true,
				connections: [
					{
						id: 'forgesteel',
						name: 'Forge Steel Patreon',
						status: undefined
					},
					{
						id: 'mcdm',
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
			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const sessionResponse = {
				authenticated_with_patreon: true,
				user: {
					mcdm: {
						patron: false,
						tier_cents: 0,
						start: null
					}
				}
			};

			mockAdapter.onGet('/th/session').reply(() => {
				return [ 200, sessionResponse ];
			});

			const svc = new PatreonService();

			await svc.getPatreonSession()
				.then(thenFn)
				.catch(catchFn);

			expect(thenFn.mock.lastCall).toEqual([ {
				authenticated: true,
				connections: [
					{
						id: 'forgesteel',
						name: 'Forge Steel Patreon',
						status: undefined
					},
					{
						id: 'mcdm',
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
			const catchFn = vi.fn();
			const thenFn = vi.fn();

			const sessionResponse = {
				authenticated_with_patreon: false,
				user: null
			};

			mockAdapter.onGet('/th/session').reply(() => {
				return [ 200, sessionResponse ];
			});

			const svc = new PatreonService();

			await svc.getPatreonSession()
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
