import { useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';

const PERSISTED_UPDATE_EVENT_TYPE = 'forgesteel-persisted-update';

export const usePersistedValue = <T>(key: string, initialValue: T): [T, (newValue: T) => Promise<void>] => {
	const [ value, setValue ] = useState<T>(initialValue);

	useEffect(
		() => {
			localforage.getItem<T>(key)
				.then(persistedValue => {
					setValue(persistedValue ?? initialValue);
				});

			function loadValue() {
				localforage.getItem<T>(key)
					.then(persistedValue => {
						setValue(persistedValue ?? initialValue);
					});
			}
			function handleStorageChange(event: StorageEvent) {
				if (event.key !== key) {
					return;
				}
				loadValue();
			}
			function handleCustomChange(event: Event) {
				if ((event as CustomEvent<{ key: string }>).detail?.key !== key) {
					return;
				}
				loadValue();
			}
			addEventListener('storage', handleStorageChange);
			addEventListener(PERSISTED_UPDATE_EVENT_TYPE, handleCustomChange);
			// Unregister event listener on unmount
			return () => {
				removeEventListener('storage', handleStorageChange);
				removeEventListener(PERSISTED_UPDATE_EVENT_TYPE, handleCustomChange);
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ ]
	);

	const persistValue = useCallback(async (newValue: T) => {
		await localforage.setItem(key, newValue);
		localStorage.setItem(key, `${new Date().getTime()}`);

		const persistedUpdateEvent = new CustomEvent(PERSISTED_UPDATE_EVENT_TYPE, { detail: { key } });
		dispatchEvent(persistedUpdateEvent);
	}, [ key ]);

	return [ value, persistValue ];
};
