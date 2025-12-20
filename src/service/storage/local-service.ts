import { StorageService } from './storage-service';
import localforage from 'localforage';

export class LocalService implements StorageService {
	initialize(): Promise<boolean> {
		return Promise.resolve(true);
	}

	get<T>(key: string): Promise<T | null> {
		return localforage.getItem<T>(key);
	}

	put<T>(key: string, value: T): Promise<T> {
		return localforage.setItem<T>(key, value);
	}
};
