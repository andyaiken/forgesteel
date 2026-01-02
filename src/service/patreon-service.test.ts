import { afterEach, describe, expect, test, vi } from 'vitest';
import { PatreonService } from './patreon-service';
import axios from 'axios';

describe('PatreonService', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	// #region Token Handler
	describe('getPatreonAuthUrl', () => {
		test('calls the token handler login/start endpoint', async () => {
			const svc = new PatreonService();

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
				data: {
					authenticated_with_patreon: false,
					user: null
				}
			};

			axios.get = vi.fn()
				.mockImplementationOnce(() => Promise.resolve(sessionResponse));

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
