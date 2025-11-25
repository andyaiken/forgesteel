import axios, { AxiosError } from 'axios';
import { ConnectionSettings } from '@/models/connection-settings';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import localforage from 'localforage';

export class DataService {
	settings: ConnectionSettings;
	readonly host: string;
	readonly apiToken: string;
	private jwt: string | null;

	constructor(settings: ConnectionSettings) {
		this.settings = settings;
		this.host = settings.warehouseHost;
		this.apiToken = settings.warehouseToken;
		this.jwt = null;
	};

	private getErrorMessage = (error: unknown) => {
		let msg = 'Error communicating with FS Warehouse';
		if (error instanceof AxiosError) {
			msg = `There was a problem with Forge Steel Warehouse: ${error.message}`;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.message ?? error.response.data;
				msg = `FS Warehouse Error: [${code}] ${respMsg}`;
			}
		}
		return msg;
	};

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

	private async getLocalOrWarehouse<T>(key: string): Promise<T | null> {
		if (this.settings.useWarehouse) {
			await this.ensureJwt();
			try {
				const response = await axios.get(`${this.host}/data/${key}`, {
					headers: { Authorization: `Bearer ${this.jwt}` }
				});
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
		if (this.settings.useWarehouse) {
			await this.ensureJwt();
			try {
				await axios.put(`${this.host}/data/${key}`,
					value, {
						headers: { Authorization: `Bearer ${this.jwt}` }
					});
				return value;
			} catch (error) {
				console.error('Error communicating with FS Warehouse', error);
				throw new Error(this.getErrorMessage(error), { cause: error });
			}
		} else {
			return localforage.setItem<T>(key, value);
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
};
