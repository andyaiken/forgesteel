import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ConnectionSettings } from '@/models/connection-settings';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { PatreonSession } from '@/models/patreon-connection';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import localforage from 'localforage';

export class DataService {
	settings: ConnectionSettings;
	readonly host: string;
	readonly apiToken: string;

	private useNewAuth: boolean;
	private jwt: string | null;
	private csrfToken: boolean;

	private tokenHandlerHost: string;

	constructor(settings: ConnectionSettings) {
		this.settings = settings;
		this.host = settings.warehouseHost;
		this.apiToken = settings.warehouseToken;

		this.useNewAuth = false;
		this.jwt = null;
		this.csrfToken = false;

		// this.tokenHandlerHost = 'http://localhost:5000';
		this.tokenHandlerHost = 'https://forgesteel-warehouse-b7wsk.ondigitalocean.app';
	};

	private getErrorMessage = (error: unknown) => {
		let msg = 'Error communicating with FS Warehouse';
		if (error instanceof AxiosError) {
			msg = `There was a problem with Forge Steel Warehouse: ${error.message}`;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.message ?? error.response.data;
				msg = `FS Warehouse Error: [${code}] ${respMsg}`;

				if (code === 401) {
					this.csrfToken = false;
				}
			}
		}
		return msg;
	};

	private async checkUseCookieAuth(): Promise<boolean> {
		// Future work - once Patreon is integrated and backend is on same domain,
		// use new auth for patreon. Otherwise, use header auth
		return false;
	}

	private async ensureJwt() {
		if (this.jwt === null) {
			try {
				const response = await axios.get(`${this.host}/connect`, { headers: { Authorization: `Bearer ${this.apiToken}` } });
				this.jwt = response.data.access_token;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		}
		return this.jwt;
	}

	private async ensureCsrf(): Promise<boolean> {
		axios.defaults.xsrfCookieName = 'csrf_access_token';
		axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		if (!this.csrfToken) {
			try {
				await axios.post(`${this.host}/connect`, {}, {
					headers: { Authorization: `Bearer ${this.apiToken}` },
					withCredentials: true,
					withXSRFToken: true
				});
				this.csrfToken = true;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		}
		return this.csrfToken;
	}

	private async getLocalOrWarehouse<T>(key: string): Promise<T | null> {
		axios.defaults.xsrfCookieName = 'csrf_access_token';
		axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		if (this.settings.useWarehouse) {
			let config: AxiosRequestConfig = {
				withCredentials: true,
				withXSRFToken: true
			};
			if (!this.useNewAuth) {
				await this.ensureJwt();
				config = { headers: { Authorization: `Bearer ${this.jwt}` } };
			}

			try {
				const response = await axios.get(`${this.host}/data/${key}`, config);
				return response.data.data;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		} else {
			return localforage.getItem<T>(key);
		}
	}

	private async putLocalOrWarehouse<T>(key: string, value: T): Promise<T> {
		axios.defaults.xsrfCookieName = 'csrf_access_token';
		axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
		if (this.settings.useWarehouse) {
			let config: AxiosRequestConfig = {
				withCredentials: true,
				withXSRFToken: true
			};
			if (!this.useNewAuth) {
				await this.ensureJwt();
				config = { headers: { Authorization: `Bearer ${this.jwt}` } };
			}

			try {
				await axios.put(`${this.host}/data/${key}`, value, config);
				return value;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		} else {
			return localforage.setItem<T>(key, value);
		}
	}

	async initialize(): Promise<boolean> {
		if (this.settings.useWarehouse) {
			this.useNewAuth = await this.checkUseCookieAuth();
			if (this.useNewAuth) {
				const connected = await this.ensureCsrf();
				return connected;
			} else {
				await this.ensureJwt();
				return true;
			}
		} else {
			return true;
		}
	}

	async getOptions(): Promise<Options | null> {
		return localforage.getItem<Options>('forgesteel-options');
	}

	async saveOptions(options: Options): Promise<Options> {
		return localforage.setItem<Options>('forgesteel-options', options);
	}

	async getHeroes(): Promise<Hero[] | null> {
		return this.getLocalOrWarehouse<Hero[]>('forgesteel-heroes');
	};

	async saveHeroes(heroes: Hero[]): Promise<Hero[]> {
		return this.putLocalOrWarehouse<Hero[]>('forgesteel-heroes', heroes);
	}

	async getHomebrew(): Promise<Sourcebook[] | null> {
		return this.getLocalOrWarehouse<Sourcebook[]>('forgesteel-homebrew-settings');
	}

	async saveHomebrew(sourcebooks: Sourcebook[]): Promise<Sourcebook[]> {
		return this.putLocalOrWarehouse<Sourcebook[]>('forgesteel-homebrew-settings', sourcebooks);
	}

	/**
	 * On load will be combined into the homebrew sourcebooks, will eventually be deprecated and removed
	 */
	async getPlaybook(): Promise<Playbook | null> {
		return localforage.getItem<Playbook>('forgesteel-playbook');
	}

	/**
	 * @deprecated Playbook has been combined with homebrew sourcebooks - will eventually be removed
	 */
	async savePlaybook(playbook: Playbook): Promise<Playbook> {
		return localforage.setItem<Playbook>('forgesteel-playbook', playbook);
	}

	async getSession(): Promise<Session | null> {
		return this.getLocalOrWarehouse<Session>('forgesteel-session');
	}

	async saveSession(session: Session): Promise<Session> {
		return this.putLocalOrWarehouse<Session>('forgesteel-session', session);
	}

	async getHiddenSettingIds(): Promise<string[] | null> {
		return this.getLocalOrWarehouse<string[]>('forgesteel-hidden-setting-ids');
	}

	async saveHiddenSettingIds(ids: string[]): Promise<string[]> {
		return this.putLocalOrWarehouse<string[]>('forgesteel-hidden-setting-ids', ids);
	}

	// #region Token Handler
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

	// refresh?
	// #endregion
};
