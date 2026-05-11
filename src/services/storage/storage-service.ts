import { Hero } from '@/models/hero';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';

/**
 * Interface for abstracting data storage between local vs remote.
 *
 * Be aware that adding to this interface will almost always
 * require coordinating changes with the warehouse API
*/
export interface StorageService {
	/**
	 * Perform any initialization required for the StorageService
	 * before it can manipulate data.
	 *
	 * This might be e.g. authentication with a backend, etc.
	 *
	 * @returns a Promise that resolves with a boolean indicating
	 * whether initialization was successful
	 */
	initialize(): Promise<boolean>;

	// Hero storage
	getHeroes(): Promise<Hero[]>;
	getHero(id: string): Promise<Hero | null>;
	putHero(hero: Hero): Promise<Hero>;
	deleteHero(id: string): Promise<void>;

	// Homebrew storage
	getSourcebooks(): Promise<Sourcebook[]>;
	getSourcebook(id: string): Promise<Sourcebook | null>;
	putSourcebook(sourcebook: Sourcebook): Promise<Sourcebook>;
	deleteSourcebook(id: string): Promise<void>;

	// Session
	getSession(): Promise<Session | null>;
	putSession(session: Session): Promise<Session>;

	// Hidden sourcebook IDs
	getHiddenSourcebookIDs(): Promise<string[] | null>;
	putHiddenSourcebookIDs(ids: string[]): Promise<string[]>;
};
