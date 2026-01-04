import axios, { AxiosError, AxiosInstance } from 'axios';
import { ConnectionSettings } from '@/models/connection-settings';
import { StorageService } from './storage-service';

export class WarehouseService implements StorageService {
	readonly host: string;
	readonly apiToken: string;

	private useNewAuth: boolean;
	private jwt: string | null;
	private refreshToken: string | null;
	// private csrfToken: boolean;

	private api: AxiosInstance;

	constructor(settings: ConnectionSettings) {
		this.host = settings.warehouseHost;
		this.apiToken = settings.warehouseToken;

		this.useNewAuth = false;
		this.jwt = null;
		this.refreshToken = null;
		// this.csrfToken = false;

		this.api = axios.create({
			baseURL: this.host,
			withCredentials: true,
			withXSRFToken: true,
			xsrfCookieName: 'csrf_access_token',
			xsrfHeaderName: 'X-CSRF-TOKEN'
		});

		this.api.interceptors.request.use(async config => {
			if (this.jwt === null) {
				await this.ensureJwt();
			}
			config.headers.Authorization = `Bearer ${this.jwt}`;
			return config;
		});

		this.api.interceptors.response.use(undefined, async error => {
			if (!this.useNewAuth && this.isExpiredTokenError(error)) {
				this.jwt = null;
				try {
					await this.refreshJwt();
					return this.api(error.config);
				} catch (retryError) {
					console.error('Error communicating with FS Warehouse', retryError);
					throw new Error(this.getErrorMessage(retryError), { cause: retryError });
				}
			}
		});
	};

	private async ensureJwt() {
		if (this.jwt === null) {
			try {
				const response = await axios.post(`${this.host}/connect`, {}, { headers: { Authorization: `Bearer ${this.apiToken}` } });
				this.jwt = response.data.access_token;
				this.refreshToken = response.data.refresh_token;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		}
		return this.jwt;
	}

	private isExpiredTokenError = (err: unknown): boolean => {
		if ((err as AxiosError).isAxiosError) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const error = err as AxiosError<any, any>;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.msg;

				if (code === 401 && respMsg === 'Token has expired') {
					return true;
				}
			}
		}
		return false;
	};

	private async refreshJwt() {
		try {
			const response = await axios.post(`${this.host}/refresh`, {}, { headers: { Authorization: `Bearer ${this.refreshToken}` } });
			this.jwt = response.data.access_token;
		} catch (error) {
			console.error('Error communicating with FS Warehouse', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async initialize(): Promise<boolean> {
		if (this.useNewAuth) {
			// const connected = await this.ensureCsrf();
			// return connected;
			return false;
		} else {
			await this.ensureJwt();
			return true;
		}
	}

	private getErrorMessage = (error: unknown) => {
		let msg = 'Error communicating with FS Warehouse';
		if (error instanceof AxiosError) {
			msg = `There was a problem with Forge Steel Warehouse: ${error.message}`;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.message ?? error.response.data.msg ?? error.response.data;
				msg = `FS Warehouse Error: [${code}] ${respMsg}`;

				// Future: move somewhere where it isn't a side effect
				// if (code === 401) {
				// 	this.csrfToken = false;
				// }
			}
		}
		return msg;
	};

	async get<T>(key: string): Promise<T | null> {
		try {
			const response = await this.api.get(`data/${key}`);
			return response.data.data;
		} catch (error) {
			console.error('Error communicating with FS Warehouse', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async put<T>(key: string, value: T): Promise<T> {
		try {
			await this.api.put(`data/${key}`, value);
			return value;
		} catch (error) {
			console.error('Error communicating with FS Warehouse', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}
};
