import { Hero } from '@/models/hero';

export enum DataStorageKeys {
	Heroes = 'forgesteel-heroes'
};

export interface StorageService {
	initialize(): Promise<boolean>;

	// generic storage
	get<T>(key: string): Promise<T | null>;
	put<T>(key: string, value: T): Promise<T>

	// Hero storage
	getHeroes(): Promise<Hero[]>;
	getHero(id: string): Promise<Hero | null>;
	putHero(hero: Hero): Promise<Hero>;
	deleteHero(id: string): Promise<void>;
};
