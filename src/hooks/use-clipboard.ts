import { useCallback, useSyncExternalStore } from 'react';
import { Ability } from '@/models/ability';
import { ClipboardData } from '@/models/clipboard-data';
import { Feature } from '@/models/feature';
import { Utils } from '@/utils/utils';

let copiedData: ClipboardData = {
	feature: null,
	ability: null
};
const listeners = new Set<() => void>();

const setCopiedData = (value: ClipboardData) => {
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

	const hasFeature = useCallback(() => data.feature !== null, [ data ]);
	const getFeature = useCallback(() => Utils.copy(data.feature), [ data ]);
	const setFeature = useCallback((feature: Feature | null) => setCopiedData({ ...copiedData, feature: Utils.copy(feature) }), []);

	const hasAbility = useCallback(() => data.ability !== null, [ data ]);
	const getAbility = useCallback(() => Utils.copy(data.ability), [ data ]);
	const setAbility = useCallback((ability: Ability | null) => setCopiedData({ ...copiedData, ability: Utils.copy(ability) }), []);

	return { hasFeature, getFeature, setFeature, hasAbility, getAbility, setAbility };
};
