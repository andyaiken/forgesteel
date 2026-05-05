import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { StorageService } from '@/services/storage/storage-service';
import localforage from 'localforage';

export class DataService {
	private readonly storageService: StorageService;

	constructor(storage: StorageService) {
		this.storageService = storage;
	};

	async initialize(): Promise<boolean> {
		return this.storageService.initialize();
	}

	// #region Options
	// Always local only

	async getOptions(): Promise<Options | null> {
		return localforage.getItem<Options>('forgesteel-options');
	}

	async saveOptions(options: Options): Promise<Options> {
		return localforage.setItem<Options>('forgesteel-options', options);
	}

	// #endregion

	// #region Heroes

	async getHeroes(): Promise<Hero[] | null> {
		return this.storageService.get<Hero[]>('forgesteel-heroes');
	};

	async saveHeroes(heroes: Hero[]): Promise<Hero[]> {
		return this.storageService.put<Hero[]>('forgesteel-heroes', heroes);
	}

	// #endregion

	// #region Homebrew sourcebooks

	async getHomebrew(): Promise<Sourcebook[] | null> {
		return this.storageService.get<Sourcebook[]>('forgesteel-homebrew-settings');
	}

	async saveHomebrew(sourcebooks: Sourcebook[]): Promise<Sourcebook[]> {
		return this.storageService.put<Sourcebook[]>('forgesteel-homebrew-settings', sourcebooks);
	}

	// #endregion

	// #region Session

	async getSession(): Promise<Session | null> {
		return this.storageService.get<Session>('forgesteel-session');
	}

	async saveSession(session: Session): Promise<Session> {
		return this.storageService.put<Session>('forgesteel-session', session);
	}

	// #endregion

	// #region Hidden sourcebook IDs

	async getHiddenSourcebookIDs(): Promise<string[] | null> {
		return this.storageService.get<string[]>('forgesteel-hidden-setting-ids');
	}

	async saveHiddenSourcebookIDs(ids: string[]): Promise<string[]> {
		return this.storageService.put<string[]>('forgesteel-hidden-setting-ids', ids);
	}

	// #endregion
};
