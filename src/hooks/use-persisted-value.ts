import { useCallback, useEffect, useState } from 'react';
import localforage from 'localforage';

export const usePersistedValue = <T>(key: string, initialValue: T): [T, (newValue: T) => Promise<void>] => {
	const [ value, setValue ] = useState<T>(initialValue);

	const loadPersistedValue = useCallback(() => {
		localforage.getItem<T>(key)
			.then(persistedValue => {
				setValue(persistedValue ?? initialValue);
			});
	}, [ key, initialValue ]);

	const handleStorageChange = useCallback((event: StorageEvent) => {
		if (event.key !== key) {
			return;
		}
		loadPersistedValue();
	}, [ key, loadPersistedValue ]);

	useEffect(() => {
		loadPersistedValue();
		addEventListener('storage', handleStorageChange);
		// Unregister event listener on unmount
		return () => {
			removeEventListener('storage', handleStorageChange);
		};
	}, [ loadPersistedValue, handleStorageChange ]);

	const persistValue = useCallback(async (newValue: T) => {
		await localforage.setItem(key, newValue);
		localStorage.setItem(key, `${new Date().getTime()}`);
	}, [ key ]);

	return [ value, persistValue ];
};
