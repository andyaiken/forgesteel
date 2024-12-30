import { FactoryLogic } from '../logic/factory-logic';
import type { Playbook } from '../models/playbook';
import { useMemo } from 'react';
import { usePersistedValue } from './use-persisted-value';

export const usePersistedPlaybook = () => {
	const [ persistedPlaybook, persistPlaybook ] = usePersistedValue<Playbook>('forgesteel-playbook', FactoryLogic.createPlaybook());

	const playbook = useMemo(
		() => persistedPlaybook ?? FactoryLogic.createPlaybook(),
		[ persistedPlaybook ]
	);

	return {
		playbook,
		persistPlaybook
	};
};
