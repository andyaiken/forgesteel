import axios, { AxiosError } from 'axios';
import { PatreonSession } from '@/models/patreon-connection';
import { Utils } from '@/utils/utils';

export class PatreonService {
	private tokenHandlerHost: string;

	constructor() {
		const envVal = import.meta.env.VITE_PATREON_TOKEN_HANDLER_HOST;
		this.tokenHandlerHost = Utils.valueOrDefault(envVal, 'https://forgesteel-warehouse-b7wsk.ondigitalocean.app');
	};

	// #region Token Handler
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

	// login start
	async getPatreonAuthUrl(): Promise<string> {
		const loginStartUrl = `${this.tokenHandlerHost}/th/login/start`;

		try {
			const response = await axios.post(loginStartUrl);
			return response.data.authorizationUrl;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	// login end
	async finishPatreonLogin(code: string, state: string): Promise<PatreonSession> {
		const loginEndUrl = `${this.tokenHandlerHost}/th/login/end`;
		axios.defaults.withCredentials = true;
		try {
			const response = await axios.post(loginEndUrl, { code: code, state: state });
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

	// session
	async getPatreonSession(): Promise<PatreonSession> {
		const sessionUrl = `${this.tokenHandlerHost}/th/session`;
		axios.defaults.withCredentials = true;
		try {
			const response = await axios.get(sessionUrl);
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

	// logout
	async logoutPatreon(): Promise<undefined> {
		const logoutUrl = `${this.tokenHandlerHost}/th/logout`;
		axios.defaults.withCredentials = true;
		try {
			await axios.post(logoutUrl);
			return;
		} catch (error) {
			console.error('Error communicating with Token Handler', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}
	// #endregion
};
