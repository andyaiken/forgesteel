import { Hero, HeroOverview } from '@/models/hero';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeroLogic } from '@/logic/hero-logic';
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

	initialize = async (): Promise<boolean> => {
		const result = await this.storageService.initialize();

		const heroes = await this.getHeroes();
		if (heroes.length > 0) {
			this.saveHeroOverview(heroes.map(HeroLogic.createOverview));
			heroes.forEach(this.saveHero);
			this.saveHeroes([]);
		}

		const sourcebooks = await this.getHomebrew();
		if (sourcebooks.length > 0) {
			this.saveSourcebookIDs(sourcebooks.map(sb => sb.id));
			sourcebooks.forEach(this.saveSourcebook);
			this.saveHomebrew([]);
		}

		return result;
	};

	// #region Options
	// Always local only

	getOptions = async (): Promise<Options> => {
		const result = await localforage.getItem<Options>('forgesteel-options');
		return result ?? FactoryLogic.createOptions();
	};

	saveOptions = async (options: Options): Promise<Options> => {
		return localforage.setItem<Options>('forgesteel-options', options);
	};

	// #endregion

	// #region Heroes

	getHeroes = async (): Promise<Hero[]> => {
		const result = await this.storageService.get<Hero[]>('forgesteel-heroes');
		return result ?? [];
	};

	saveHeroes = async (heroes: Hero[]): Promise<Hero[]> => {
		return this.storageService.put<Hero[]>('forgesteel-heroes', heroes);
	};

	// #endregion

	// #region Hero Overview

	getHeroOverview = async (): Promise<HeroOverview[]> => {
		const result = await this.storageService.get<HeroOverview[]>('forgesteel-hero-overview');
		return result ?? [];
	};

	saveHeroOverview = async (heroes: HeroOverview[]): Promise<HeroOverview[]> => {
		return this.storageService.put<HeroOverview[]>('forgesteel-hero-overview', heroes);
	};

	// #endregion

	// #region Hero

	getAllHeroes = async (): Promise<Hero[]> => {
		const overview = await this.getHeroOverview();
		const heroes = await Promise.all(overview.map(o => o.id).map(this.getHero));
		return heroes.filter(h => !!h);
	};

	getHero = async (heroID: string): Promise<Hero | null> => {
		return this.storageService
			.get<Hero>(`forgesteel-hero-${heroID}`)
			.then(result => {
				return result;
			})
			.catch(err => {
				console.error(err);
				return null;
			});
	};

	saveHero = async (hero: Hero): Promise<Hero> => {
		return this.storageService.put<Hero>(`forgesteel-hero-${hero.id}`, hero);
	};

	// #endregion

	// #region Homebrew sourcebooks

	getHomebrew = async (): Promise<Sourcebook[]> => {
		const result = await this.storageService.get<Sourcebook[]>('forgesteel-homebrew-settings');
		return result ?? [];
	};

	saveHomebrew = async (sourcebooks: Sourcebook[]): Promise<Sourcebook[]> => {
		return this.storageService.put<Sourcebook[]>('forgesteel-homebrew-settings', sourcebooks);
	};

	// #endregion

	// #region Sourcebook IDs

	getSourcebookIDs = async (): Promise<string[]> => {
		const result = await this.storageService.get<string[]>('forgesteel-sourcebook-ids');
		return result ?? [];
	};

	saveSourcebookIDs = async (sourcebookIDs: string[]): Promise<string[]> => {
		return this.storageService.put<string[]>('forgesteel-sourcebook-ids', sourcebookIDs);
	};

	// #endregion

	// #region Sourcebooks

	getAllSourcebooks = async (): Promise<Sourcebook[]> => {
		const sourcebookIDs = await this.getSourcebookIDs();
		const sourcebooks = await Promise.all(sourcebookIDs.map(this.getSourcebook));
		return sourcebooks.filter(sb => !!sb);
	};

	getSourcebook = async (sourcebookID: string): Promise<Sourcebook | null> => {
		return this.storageService
			.get<Sourcebook>(`forgesteel-sourcebook-${sourcebookID}`)
			.then(result => {
				return result;
			})
			.catch(err => {
				console.error(err);
				return null;
			});
	};

	saveSourcebook = async (sourcebook: Sourcebook): Promise<Sourcebook> => {
		return this.storageService.put<Sourcebook>(`forgesteel-sourcebook-${sourcebook.id}`, sourcebook);
	};

	// #endregion

	// #region Session

	getSession = async (): Promise<Session> => {
		const result = await this.storageService.get<Session>('forgesteel-session');
		return result ?? FactoryLogic.createSession();
	};

	saveSession = async (session: Session): Promise<Session> => {
		return this.storageService.put<Session>('forgesteel-session', session);
	};

	// #endregion

	// #region Hidden sourcebook IDs

	getHiddenSourcebookIDs = async (): Promise<string[]> => {
		const result = await this.storageService.get<string[]>('forgesteel-hidden-setting-ids');
		return result ?? [];
	};

	saveHiddenSourcebookIDs = async (ids: string[]): Promise<string[]> => {
		return this.storageService.put<string[]>('forgesteel-hidden-setting-ids', ids);
	};

	// #endregion
};
