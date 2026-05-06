import { Hero } from '@/models/hero';
import { Options } from '@/models/options';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { StorageService } from '@/services/storage/storage-service';
import localforage from 'localforage';

/**
 * Handles data storage, abstracting out whether that data is stored locally or in a remote warehouse
 */
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

	async getHeroes(): Promise<Hero[]> {
		return this.storageService.getHeroes();
	};

	async getHero(id: string): Promise<Hero | null> {
		return this.storageService.getHero(id);
	}

	async saveHero(hero: Hero): Promise<Hero> {
		return this.storageService.putHero(hero);
	}

	async deleteHero(id: string): Promise<void> {
		return this.storageService.deleteHero(id);
	}

	// #endregion

	// #region Homebrew sourcebooks

	async getHomebrew(): Promise<Sourcebook[] | null> {
		return this.storageService.getSourcebooks();
	}

	async getSourcebook(id: string): Promise<Sourcebook | null> {
		return this.storageService.getSourcebook(id);
	}

	async saveSourcebook(sourcebook: Sourcebook): Promise<Sourcebook> {
		return this.storageService.putSourcebook(sourcebook);
	}

	async deleteSourcebook(id: string): Promise<void> {
		return this.storageService.deleteSourcebook(id);
	}

	// #endregion

	// #region Session

	async getSession(): Promise<Session | null> {
		return this.storageService.getSession();
	}

	async saveSession(session: Session): Promise<Session> {
		return this.storageService.putSession(session);
	}

	// #endregion

	// #region Hidden sourcebook IDs

	async getHiddenSourcebookIDs(): Promise<string[] | null> {
		return this.storageService.getHiddenSourcebookIDs();
	}

	async saveHiddenSourcebookIDs(ids: string[]): Promise<string[]> {
		return this.storageService.putHiddenSourcebookIDs(ids);
	}

	// #endregion
};
