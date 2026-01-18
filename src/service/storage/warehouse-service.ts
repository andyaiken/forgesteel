import axios, { AxiosError, AxiosInstance } from 'axios';
import { Config } from '@/utils/config';
import { ConnectionSettings } from '@/models/connection-settings';
import { StorageService } from '@/service/storage/storage-service';

export class WarehouseService implements StorageService {
	readonly host: string;
	readonly apiToken: string;

	private useNewAuth: boolean;
	private jwt: string | null;
	private refreshToken: string | null;

	private api: AxiosInstance;

	constructor(settings: ConnectionSettings) {
		if (settings.usePatreonWarehouse) {
			this.host = Config.getPatreonWarehouseHost();
			this.apiToken = '';
			this.useNewAuth = true;
		} else {
			this.host = settings.warehouseHost;
			this.apiToken = settings.warehouseToken;
			this.useNewAuth = false;
		}

		this.jwt = null;
		this.refreshToken = null;

		this.api = axios.create({
			baseURL: this.host,
			withCredentials: true,
			withXSRFToken: true,
			xsrfCookieName: 'csrf_access_token',
			xsrfHeaderName: 'X-CSRF-TOKEN'
		});
	};

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
			const response = await axios.post(`${this.host}/refresh`, {}, {
				headers: { Authorization: `Bearer ${this.refreshToken}` },
				withCredentials: true,
				withXSRFToken: true,
				xsrfCookieName: 'csrf_refresh_token',
				xsrfHeaderName: 'X-CSRF-TOKEN'
			});
			this.jwt = response.data.access_token;
		} catch (error) {
			console.error('Error communicating with FS Warehouse', error);
			throw new Error(this.getErrorMessage(error), { cause: error });
		}
	}

	async initialize(): Promise<boolean> {
		this.api.interceptors.request.use(async config => {
			if (!this.useNewAuth) {
				if (this.jwt === null)
					await this.ensureAuth();
				config.headers.Authorization = `Bearer ${this.jwt}`;
			}
			return config;
		});

		const NO_RETRY_HEADER = 'X-NO-RETRY';
		this.api.interceptors.response.use(undefined, async error => {
			if (this.isExpiredTokenError(error)) {
				if (error.config.headers && error.config.headers[NO_RETRY_HEADER])
					return Promise.reject(error);

				this.jwt = null;
				await this.refreshJwt();

				error.config.headers ||= {};
				error.config.headers[NO_RETRY_HEADER] = 'true';

				return this.api(error.config);
			}
		});

		const connected = await this.ensureAuth();
		return connected;
	}

	private async ensureAuth() {
		if (!this.useNewAuth) {
			await this.ensureJwt();
		}
		return true;
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
