import { ConnectionSettings } from '@/models/connection-settings';
import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Playbook } from '@/models/playbook';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import localforage from 'localforage';

export class DataService {
	settings: ConnectionSettings;

	constructor(settings: ConnectionSettings) {
		this.settings = settings;
	};

	async getOptions(): Promise<Options | null> {
		return localforage.getItem<Options>('forgesteel-options');
	}

	async saveOptions(options: Options): Promise<Options> {
		return localforage.setItem<Options>('forgesteel-options', options);
	}

	async getHeroes(): Promise<Hero[] | null> {
		return localforage.getItem<Hero[]>('forgesteel-heroes');
	};

	async saveHeroes(heroes: Hero[]): Promise<Hero[]> {
		return localforage.setItem<Hero[]>('forgesteel-heroes', heroes);
	}

	async getHomebrew(): Promise<Sourcebook[] | null> {
		return localforage.getItem<Sourcebook[]>('forgesteel-homebrew-settings');
	}

	async saveHomebrew(sourcebooks: Sourcebook[]): Promise<Sourcebook[]> {
		return localforage.setItem<Sourcebook[]>('forgesteel-homebrew-settings', sourcebooks);
	}

	async getPlaybook(): Promise<Playbook | null> {
		return localforage.getItem<Playbook>('forgesteel-playbook');
	}

	async savePlaybook(playbook: Playbook): Promise<Playbook> {
		return localforage.setItem<Playbook>('forgesteel-playbook', playbook);
	}

	async getSession(): Promise<Session | null> {
		return localforage.getItem<Session>('forgesteel-session');
	}

	async saveSession(session: Session): Promise<Session> {
		return localforage.setItem<Session>('forgesteel-session', session);
	}

	async getHiddenSettingIds(): Promise<string[] | null> {
		return localforage.getItem<string[]>('forgesteel-hidden-setting-ids');
	}

	async saveHiddenSettingIds(ids: string[]): Promise<string[]> {
		return localforage.setItem<string[]>('forgesteel-hidden-setting-ids', ids);
	}
};
