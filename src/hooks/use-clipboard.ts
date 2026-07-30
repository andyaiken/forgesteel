import { useCallback, useSyncExternalStore } from 'react';
import { Utils } from '@/utils/utils';

type TypeGuard<T> = (value: unknown) => value is T;

let copiedData: unknown = null;

const listeners = new Set<() => void>();

const setCopiedData = (value: unknown) => {
	copiedData = value;
	listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);
	return () => listeners.delete(listener);
};

const getSnapshot = () => copiedData;

export const useClipboard = () => {
	const data = useSyncExternalStore(subscribe, getSnapshot);

	const hasData = useCallback(<T>(isType: TypeGuard<T>) => isType(data), [ data ]);
	const getData = useCallback(<T>(isType: TypeGuard<T>): T | null => isType(data) ? data : null, [ data ]);
	const setData = useCallback(<T>(value: T) => setCopiedData(Utils.copy(value)), []);

	return { hasData, getData, setData };
};
