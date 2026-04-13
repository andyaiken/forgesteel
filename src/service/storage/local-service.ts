import { StorageService } from '@/service/storage/storage-service';
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
};
