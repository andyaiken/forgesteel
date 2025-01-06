import { useCallback, useEffect, useMemo, useState } from 'react';
import localforage from 'localforage';

const useBroadcastChannel = (key: string, listener: (event: MessageEvent) => void) => {
	const channel = useMemo(() => new BroadcastChannel(key), [ key ]);
	useEffect(
		() => {
			channel.addEventListener('message', listener);
			return () => {
				channel.removeEventListener('message', listener);
			};
		},
		[ channel, listener ]
	);

	const postMessage = () => {
		channel.postMessage(undefined);
	};

	return { postMessage };
};

export const usePersistedValue = <T>(key: string, initialValue: T): [T, (newValue: T) => Promise<void>] => {
	const [ value, setValue ] = useState(initialValue);
	const [ defaultValue ] = useState(initialValue);
	const loadValue = useCallback(() => {
		localforage.getItem<T>(key)
			.then(persistedValue => {
				setValue(persistedValue ?? defaultValue);
			});
	}, [ key, defaultValue ]);

	useEffect(() => loadValue(), [ loadValue ]);

	const { postMessage } = useBroadcastChannel(key, loadValue);

	const persistValue = async (newValue: T) => {
		await localforage.setItem(key, newValue);

		loadValue();
		postMessage();
	};

	return [ value, persistValue ];
};
