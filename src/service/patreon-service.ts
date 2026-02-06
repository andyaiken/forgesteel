import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from 'axios';
import { Config } from '@/utils/config';
import { PatreonSession } from '@/models/patreon-connection';

export class PatreonService {
	private tokenHandlerHost: string;

	private api: AxiosInstance;

	constructor() {
		this.tokenHandlerHost = Config.getTokenHandlerHost();

		this.api = axios.create({
			baseURL: this.tokenHandlerHost,
			withCredentials: true,
			withXSRFToken: true,
			xsrfCookieName: 'csrf_access_token',
			xsrfHeaderName: 'X-CSRF-TOKEN'
		});

		const NO_RETRY_HEADER = 'X-NO-RETRY';
		this.api.interceptors.response.use(undefined, async error => {
			if (!axios.isCancel(error)
				&& axios.isAxiosError(error)
				&& error.config
				&& error.response?.status === 401) {
				if (error.config.headers && error.config.headers[NO_RETRY_HEADER])
					return Promise.reject(error);

				error.config.headers ||= {} as AxiosRequestHeaders;
				error.config.headers[NO_RETRY_HEADER] = 'true';

				await axios.post(`${this.tokenHandlerHost}/refresh`, {}, {
					withCredentials: true,
					withXSRFToken: true,
					xsrfCookieName: 'csrf_refresh_token',
					xsrfHeaderName: 'X-CSRF-TOKEN'
				});

				return this.api(error.config);
			}
		});
	};

	private getErrorMessage = (error: unknown) => {
		let msg = 'Error communicating with FS Warehouse';
		if (error instanceof AxiosError) {
			msg = `There was a problem with Forge Steel Warehouse: ${error.message}`;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.message ?? error.response.data.msg ?? error.response.data;
				msg = `FS Warehouse Error: [${code}] ${respMsg}`;
			}
		}
		return msg;
	};

	async getPatreonAuthUrl(): Promise<string> {
		try {
			const response = await this.api.post('/th/login/start');
			return response.data.authorizationUrl;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async finishPatreonLogin(code: string, state: string): Promise<PatreonSession> {
		try {
			const response = await this.api.post('/th/login/end', { code: code, state: state });
			const result: PatreonSession = {
				authenticated: false,
				connections: []
			};

			if (response && response.data) {
				result.authenticated = response.data.authenticated_with_patreon;

				if (response.data.authenticated_with_patreon && response.data.user) {
					result.connections.push({
						id: 'forgesteel',
						name: 'Forge Steel Patreon',
						status: response.data.user.forgesteel
					});

					result.connections.push({
						id: 'mcdm',
						name: 'MCDM Patreon',
						status: response.data.user.mcdm
					});
				}
			}

			return result;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async getPatreonSession(): Promise<PatreonSession> {
		try {
			const response = await this.api.get('/th/session');
			const result: PatreonSession = {
				authenticated: false,
				connections: []
			};

			if (response && response.data) {
				result.authenticated = response.data.authenticated_with_patreon;

				if (response.data.authenticated_with_patreon && response.data.user) {
					result.connections.push({
						id: 'forgesteel',
						name: 'Forge Steel Patreon',
						status: response.data.user.forgesteel
					});

					result.connections.push({
						id: 'mcdm',
						name: 'MCDM Patreon',
						status: response.data.user.mcdm
					});
				}
			}

			return result;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async refreshTokens() {
		try {
			await this.api.post('/th/refresh');
			return;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	};

	async logoutPatreon() {
		try {
			await this.api.post('/th/logout');
			return;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}
};
