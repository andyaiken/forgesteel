import { DataStorageKeys, StorageService } from '@/services/storage/storage-service';
import { Hero } from '@/models/hero';
import { Utils } from '@/utils/utils';
import localforage from 'localforage';

export class LocalService implements StorageService {
	initialize(): Promise<boolean> {
		return Promise.resolve(true);
	}

	get<T>(key: string): Promise<T | null> {
		try {
			return localforage.getItem<T>(key);
		} catch (error) {
			console.error(`Error getting ${key}`, error);
			return Promise.resolve(null);
		}
	}

	put<T>(key: string, value: T): Promise<T> {
		return localforage.setItem<T>(key, value);
	}

	async getHeroes(): Promise<Hero[]> {
		const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
		if (!heroes) {
			return [];
		}
		return heroes;
	}

	async getHero(id: string): Promise<Hero | null> {
		const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
		if (heroes) {
			const found = heroes.find(h => h.id === id);
			if (found) {
				return found;
			}
		}
		return null;
	}

	async putHero(hero: Hero): Promise<Hero> {
		const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
		if (heroes) {
			const copy = Utils.copy(heroes);
			if (heroes.some(h => h.id === hero.id)) {
				const list = copy.map(h => h.id === hero.id ? hero : h);
				localforage.setItem<Hero[]>(DataStorageKeys.Heroes, list);
			} else {
				copy.push(hero);
				localforage.setItem<Hero[]>(DataStorageKeys.Heroes, copy);
			}
		} else {
			localforage.setItem<Hero[]>(DataStorageKeys.Heroes, [ hero ]);
		}

		return hero;
	}

	async deleteHero(id: string): Promise<void> {
		const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
		if (heroes) {
			const copy = Utils.copy(heroes.filter(h => h.id !== id));
			localforage.setItem<Hero[]>(DataStorageKeys.Heroes, copy);
		}
	}
};
