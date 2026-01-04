import axios, { AxiosError, AxiosInstance } from 'axios';
import { Config } from '@/utils/config';
import { PatreonSession } from '@/models/patreon-connection';

export class PatreonService {
	private tokenHandlerHost: string;

	private api: AxiosInstance;

	constructor() {
		this.tokenHandlerHost = Config.getTokenHandlerHost();

		this.api = axios.create({
			baseURL: this.tokenHandlerHost,
			withCredentials: true
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

	// #region login
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

			if (response.data) {
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

	// #region session
	async getPatreonSession(): Promise<PatreonSession> {
		try {
			const response = await this.api.get('/th/session');
			const result: PatreonSession = {
				authenticated: false,
				connections: []
			};

			if (response.data) {
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

	// #region refresh
	async refreshTokens() {
		try {
			await this.api.post('/th/refresh');
			return;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	};

	// #region logout
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
