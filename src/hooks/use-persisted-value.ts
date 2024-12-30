import { useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';

export const usePersistedValue = <T>(key: string, initialValue: T): [T, (newValue: T) => Promise<void>] => {
	const [ value, setValue ] = useState<T>(initialValue);

	useEffect(
		() => {
			localforage.getItem<T>(key)
				.then(persistedValue => {
					setValue(persistedValue ?? initialValue);
				});

			function handleStorageChange(event: StorageEvent) {
				if (event.key !== key) {
					return;
				}
				localforage.getItem<T>(key)
					.then(persistedValue => {
						setValue(persistedValue ?? initialValue);
					});
			}
			addEventListener('storage', handleStorageChange);
			// Unregister event listener on unmount
			return () => {
				removeEventListener('storage', handleStorageChange);
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ ]
	);

	const persistValue = useCallback(async (newValue: T) => {
		await localforage.setItem(key, newValue);
		localStorage.setItem(key, `${new Date().getTime()}`);

		setValue(newValue);
	}, [ key ]);

	return [ value, persistValue ];
};
