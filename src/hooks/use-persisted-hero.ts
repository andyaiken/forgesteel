import { useMemo } from 'react';
import { usePersistedHeroes } from './use-persisted-heroes';

export const usePersistedHero = (heroId: string) => {
	const { heroes } = usePersistedHeroes();
	const hero = useMemo(() => heroes.find(h => h.id === heroId), [ heroes, heroId ]);
	return hero;
};
