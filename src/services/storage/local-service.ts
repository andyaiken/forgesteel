import { Hero } from '@/models/hero';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { StorageService } from '@/services/storage/storage-service';
import { Utils } from '@/utils/utils';
import localforage from 'localforage';

export enum DataStorageKeys {
	Heroes = 'forgesteel-heroes',
	Sourcebooks = 'forgesteel-homebrew-settings',
	Session = 'forgesteel-session',
	HiddenSourcebookIDs = 'forgesteel-hidden-setting-ids'
};

// Heroes and sourcebooks are each stored as a single list, so saving or deleting one means reading the list, changing it,
// and writing it back. Two of those running at once would both start from the same list, and the second write would undo
// the first - importing several heroes together, for example, would keep only the last one. So they're queued, and run one
// at a time. The queue is shared by every LocalService, since they all write to the same storage.
let writeQueue: Promise<unknown> = Promise.resolve();

const queueWrite = <T>(write: () => Promise<T>): Promise<T> => {
	const result = writeQueue.then(write);
	// A failed write still has to let the ones queued behind it run
	writeQueue = result.catch(() => undefined);
	return result;
};

export class LocalService implements StorageService {
	initialize(): Promise<boolean> {
		return Promise.resolve(true);
	}

	// #region Heroes
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
		return queueWrite(async () => {
			const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
			if (heroes) {
				const copy = Utils.copy(heroes);
				if (heroes.some(h => h.id === hero.id)) {
					const list = copy.map(h => h.id === hero.id ? hero : h);
					await localforage.setItem<Hero[]>(DataStorageKeys.Heroes, list);
				} else {
					copy.push(hero);
					await localforage.setItem<Hero[]>(DataStorageKeys.Heroes, copy);
				}
			} else {
				await localforage.setItem<Hero[]>(DataStorageKeys.Heroes, [ hero ]);
			}

			return hero;
		});
	}

	async deleteHero(id: string): Promise<void> {
		return queueWrite(async () => {
			const heroes = await localforage.getItem<Hero[]>(DataStorageKeys.Heroes);
			if (heroes) {
				const copy = Utils.copy(heroes.filter(h => h.id !== id));
				await localforage.setItem<Hero[]>(DataStorageKeys.Heroes, copy);
			}
		});
	}
	// #endregion

	// #region Sourcebooks
	async getSourcebooks(): Promise<Sourcebook[]> {
		const sourcebooks = await localforage.getItem<Sourcebook[]>(DataStorageKeys.Sourcebooks);
		if (!sourcebooks) {
			return [];
		}
		return sourcebooks;
	}

	async getSourcebook(id: string): Promise<Sourcebook | null> {
		const sourcebooks = await localforage.getItem<Sourcebook[]>(DataStorageKeys.Sourcebooks);
		if (sourcebooks) {
			const found = sourcebooks.find(h => h.id === id);
			if (found) {
				return found;
			}
		}
		return null;
	}

	async putSourcebook(sourcebook: Sourcebook): Promise<Sourcebook> {
		return queueWrite(async () => {
			const sourcebooks = await localforage.getItem<Sourcebook[]>(DataStorageKeys.Sourcebooks);
			if (sourcebooks) {
				const copy = Utils.copy(sourcebooks);
				if (sourcebooks.some(h => h.id === sourcebook.id)) {
					const list = copy.map(h => h.id === sourcebook.id ? sourcebook : h);
					await localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, list);
				} else {
					copy.push(sourcebook);
					await localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, copy);
				}
			} else {
				await localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, [ sourcebook ]);
			}

			return sourcebook;
		});
	}

	async deleteSourcebook(id: string): Promise<void> {
		return queueWrite(async () => {
			const sourcebooks = await localforage.getItem<Sourcebook[]>(DataStorageKeys.Sourcebooks);
			if (sourcebooks) {
				const copy = Utils.copy(sourcebooks.filter(h => h.id !== id));
				await localforage.setItem<Sourcebook[]>(DataStorageKeys.Sourcebooks, copy);
			}
		});
	}
	// #endregion

	getSession(): Promise<Session | null> {
		try {
			return localforage.getItem<Session>(DataStorageKeys.Session);
		} catch (error) {
			console.error('Error getting Session', error);
			return Promise.resolve(null);
		}
	}

	putSession(session: Session): Promise<Session> {
		return localforage.setItem<Session>(DataStorageKeys.Session, session);
	}

	getHiddenSourcebookIDs(): Promise<string[] | null> {
		try {
			return localforage.getItem<string[]>(DataStorageKeys.HiddenSourcebookIDs);
		} catch (error) {
			console.error('Error getting hidden sourcebook ids', error);
			return Promise.resolve(null);
		}
	}

	putHiddenSourcebookIDs(ids: string[]): Promise<string[]> {
		return localforage.setItem<string[]>(DataStorageKeys.HiddenSourcebookIDs, ids);
	}
};
