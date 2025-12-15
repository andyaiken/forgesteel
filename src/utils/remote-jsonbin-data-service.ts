import axios, { AxiosError } from 'axios';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/utils/data-service';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';

interface JsonBinData {
	[key: string]: unknown;
}

export class RemoteJsonBinDataService extends DataService {
	private apiUrl: string = '';
	private apiKey: string = '';

	// Document IDs for storing different data types
	private readonly HEROES_DOC_ID = 'forgesteel-heroes';
	private readonly HOMEBREW_DOC_ID = 'forgesteel-homebrew-settings';
	private readonly OPTIONS_DOC_ID = 'forgesteel-options';
	private readonly PLAYBOOK_DOC_ID = 'forgesteel-playbook';
	private readonly SESSION_DOC_ID = 'forgesteel-session';
	private readonly HIDDEN_SETTINGS_DOC_ID = 'forgesteel-hidden-setting-ids';

	constructor(settings: ConnectionSettings) {
		super(settings);
		
		this.apiUrl = `https://api.jsonbin.io/v3/b/${settings.jsonBinId}`;
		this.apiKey = settings.jsonBinAccessKey;
	}

	private formatJsonBinError(error: unknown): string {
		let msg = 'Error communicating with JSONBin';
		if (error instanceof AxiosError) {
			msg = `There was a problem with JSONBin: ${error.message}`;
			if (error.response) {
				const code = error.response.status;
				const respMsg = error.response.data.message ?? error.response.data;
				msg = `JSONBin Error: [${code}] ${respMsg}`;
			}
		}
		return msg;
	}

	override async initialize(): Promise<boolean> {
		// JSONBin doesn't require initialization, just verify we have valid credentials
		try {
			await this.getBaseData();
			return true;
		} catch {
			// If the document doesn't exist yet, that's fine - service is still connected
			return true;
		}
	}

	private async getBaseData(): Promise<JsonBinData> {
		try {
			const response = await axios.get(`${this.apiUrl}/latest`, {
				headers: {
					'X-Access-key': this.apiKey,
					'Content-Type': 'application/json',
					'X-Bin-Meta': 'false'
				}
			});
			return response.data;
		} catch (error) {
			console.error('Error getting blob from JSONBin', error);
			throw new Error(this.formatJsonBinError(error), { cause: error });
		}
	}

	private async saveBaseData(baseData: JsonBinData): Promise<void> {
		try {
			await axios.put(this.apiUrl, baseData, {
				headers: {
					'X-Access-key': this.apiKey,
					'Content-Type': 'application/json',
					'X-Bin-Meta': 'false'
				}
			});
		} catch (error) {
			console.error('Error saving blob to JSONBin', error);
			throw new Error(this.formatJsonBinError(error), { cause: error });
		}
	}

	private async getDocument<T>(docId: string): Promise<T | null> {
		try {
			const baseData = await this.getBaseData();
			return (baseData[docId] as T) ?? null;
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 404) {
				// Document doesn't exist yet
				return null;
			}
			throw error;
		}
	}

	private async setDocument<T>(docId: string, data: T): Promise<T> {
		try {
			const baseData = await this.getBaseData();
			baseData[docId] = data;
			await this.saveBaseData(baseData);
			return data;
		} catch (error) {
			console.error('Error setting document in JSONBin', error);
			throw new Error(this.formatJsonBinError(error), { cause: error });
		}
	}

	override async getOptions(): Promise<Options | null> {
		return this.getDocument<Options>(this.OPTIONS_DOC_ID);
	}

	override async saveOptions(options: Options): Promise<Options> {
		return this.setDocument<Options>(this.OPTIONS_DOC_ID, options);
	}

	override async getHeroes(): Promise<Hero[] | null> {
		return this.getDocument<Hero[]>(this.HEROES_DOC_ID);
	}

	override async saveHeroes(heroes: Hero[]): Promise<Hero[]> {
		return this.setDocument<Hero[]>(this.HEROES_DOC_ID, heroes);
	}

	override async getHomebrew(): Promise<Sourcebook[] | null> {
		return this.getDocument<Sourcebook[]>(this.HOMEBREW_DOC_ID);
	}

	override async saveHomebrew(sourcebooks: Sourcebook[]): Promise<Sourcebook[]> {
		return this.setDocument<Sourcebook[]>(this.HOMEBREW_DOC_ID, sourcebooks);
	}

	/**
	 * On load will be combined into the homebrew sourcebooks, will eventually be deprecated and removed
	 */
	override async getPlaybook(): Promise<Playbook | null> {
		return this.getDocument<Playbook>(this.PLAYBOOK_DOC_ID);
	}

	/**
	 * @deprecated Playbook has been combined with homebrew sourcebooks - will eventually be removed
	 */
	override async savePlaybook(playbook: Playbook): Promise<Playbook> {
		return this.setDocument<Playbook>(this.PLAYBOOK_DOC_ID, playbook);
	}

	override async getSession(): Promise<Session | null> {
		return this.getDocument<Session>(this.SESSION_DOC_ID);
	}

	override async saveSession(session: Session): Promise<Session> {
		return this.setDocument<Session>(this.SESSION_DOC_ID, session);
	}

	override async getHiddenSettingIds(): Promise<string[] | null> {
		return this.getDocument<string[]>(this.HIDDEN_SETTINGS_DOC_ID);
	}

	override async saveHiddenSettingIds(ids: string[]): Promise<string[]> {
		return this.setDocument<string[]>(this.HIDDEN_SETTINGS_DOC_ID, ids);
	}
}
