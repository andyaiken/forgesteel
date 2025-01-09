import { useMemo, useState } from 'react';
import type { Options } from '../models/options';
import { usePersistedValue } from './use-persisted-value';

export const usePersistedOptions = () => {
	const [ defaultOptions ] = useState<Options>({
		showSkillsInGroups: false,
		showFreeStrikes: false,
		showStandardAbilities: false,
		dimUnavailableAbilities: false
	});
	const [ persistedOptions, persistOptions ] = usePersistedValue<Options>('forgesteel-options', defaultOptions);

	const options = useMemo(
		() => persistedOptions ?? defaultOptions,
		[ persistedOptions, defaultOptions ]
	);

	return {
		options,
		persistOptions
	};
};
