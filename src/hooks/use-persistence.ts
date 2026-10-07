import { useBuiltInSourcebooks, useDataManager, useHeroes } from '@/contexts/data-context';
import { useEffect, useRef, useState } from 'react';
import { ConnectionSettings } from '@/models/connection-settings';
import { DataService } from '@/services/data-service';
import { Hero } from '@/models/hero';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic';
import { Session } from '@/models/session';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { StorageServiceFactory } from '@/services/storage/storage-service-factory';
import { Utils } from '@/utils/utils';
import localforage from 'localforage';
import { notification } from 'antd';

const HERO_SAVE_DEBOUNCE_MS = 400;

interface PendingHeroSave {
	hero: Hero;
	timer: ReturnType<typeof setTimeout>;
	resolvers: (() => void)[];
}

interface Props {
	notify: ReturnType<typeof notification.useNotification>[0];
	playerView: Window | null;
	connectionSettings: ConnectionSettings;
	dataService: DataService;
}

export const usePersistence = (props: Props) => {
	const { notify, playerView } = props;
	const heroes = useHeroes();
	const builtInSourcebooks = useBuiltInSourcebooks();
	const dataManager = useDataManager();

	const [ connectionSettings, setConnectionSettings ] = useState<ConnectionSettings>(props.connectionSettings);
	const [ dataService, setDataService ] = useState<DataService>(props.dataService);

	const pendingHeroSavesRef = useRef<Map<string, PendingHeroSave>>(new Map());

	const flushHeroSave = (heroId: string) => {
		const pending = pendingHeroSavesRef.current.get(heroId);
		if (!pending) {
			return;
		}

		pendingHeroSavesRef.current.delete(heroId);
		clearTimeout(pending.timer);

		dataManager
			.saveHero(pending.hero)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error saving hero',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			})
			.then(() => {
				pending.resolvers.forEach(resolve => resolve());
			});
	};

	// Keep a stable indirection to the latest closure so the unmount effect
	// below (which must only run once) always flushes with fresh dataManager / notify.
	const flushHeroSaveRef = useRef(flushHeroSave);
	flushHeroSaveRef.current = flushHeroSave;

	useEffect(() => {
		return () => {
			// Flush any hero saves still debouncing so a last-second edit isn't lost on unmount.
			// Reading the ref at unmount is the point here - we want whatever is still pending then
			// eslint-disable-next-line react-hooks/exhaustive-deps
			pendingHeroSavesRef.current.forEach((_, heroId) => flushHeroSaveRef.current(heroId));
		};
	}, []);

	const persistHero = (hero: Hero) => {
		// UI / local state is already updated synchronously by callers before this is invoked;
		// only the network PUT is delayed and coalesced here, per hero.id.
		return new Promise<void>(resolve => {
			const existing = pendingHeroSavesRef.current.get(hero.id);
			if (existing) {
				clearTimeout(existing.timer);
				existing.hero = hero;
				existing.resolvers.push(resolve);
				existing.timer = setTimeout(() => flushHeroSave(hero.id), HERO_SAVE_DEBOUNCE_MS);
			} else {
				const timer = setTimeout(() => flushHeroSave(hero.id), HERO_SAVE_DEBOUNCE_MS);
				pendingHeroSavesRef.current.set(hero.id, { hero, timer, resolvers: [ resolve ] });
			}
		});
	};

	const persistSession = (session: Session) => {
		return dataManager
			.saveSession(session)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error saving session',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			})
			.then(() => {
				if (playerView) {
					playerView.location.reload();
				}
			});
	};

	const persistHomebrewSourcebook = (homebrew: Sourcebook) => {
		return dataManager
			.saveSourcebook(homebrew)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error saving sourcebooks',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			});
	};

	const replaceHomebrewSourcebook = (homebrew: Sourcebook, allHomebrew: Sourcebook[]) => {
		return persistHomebrewSourcebook(homebrew)
			.then(() => {
				const allSourcebooks = SourcebookLogic.getSourcebooks(builtInSourcebooks, allHomebrew);
				Utils.copy(heroes)
					.filter(hero => hero.sourcebookIDs.includes(homebrew.id))
					.forEach(hero => {
						HeroUpdateLogic.updateHero(hero, allSourcebooks);
						persistHero(hero);
					});
			});
	};

	const deleteHomebrewSourcebook = (homebrew: Sourcebook) => {
		return dataManager.deleteSourcebook(homebrew)
			.catch(err => {
				console.error(err);
				notify.error({
					title: 'Error deleting Sourcebook',
					description: Utils.getErrorMessage(err),
					placement: 'top'
				});
			});
	};

	const persistConnectionSettings = (connectionSettings: ConnectionSettings) => {
		return localforage
			.setItem<ConnectionSettings>('forgesteel-connection-settings', connectionSettings)
			.then(
				setConnectionSettings,
				err => {
					console.error(err);
					notify.error({
						title: 'Error saving connection settings',
						description: Utils.getErrorMessage(err),
						placement: 'top'
					});
				}
			).then(() => {
				const storage = StorageServiceFactory.fromConnectionSettings(connectionSettings);
				const ds = new DataService(storage);
				ds.initialize().catch(err => {
					notify.error({
						title: 'Couldn\'t connect to Warehouse with the new settings',
						description: Utils.getErrorMessage(err),
						placement: 'top'
					});
				});
				setDataService(ds);
			});
	};

	return {
		connectionSettings,
		dataService,
		persistHero,
		persistSession,
		persistHomebrewSourcebook,
		replaceHomebrewSourcebook,
		deleteHomebrewSourcebook,
		persistConnectionSettings
	};
};
