import { Collections } from '../utils/collections';
import type { Hero } from '../models/hero';
import { HeroLogic } from '../logic/hero-logic';
import { Utils } from '../utils/utils';
import { useMemo } from 'react';
import { usePersistedValue } from './use-persisted-value';

export const usePersistedHeroes = () => {
	const [ persistedHeroes, persistHeroes ] = usePersistedValue<Hero[]>('forgesteel-heroes', []);

	const heroes = useMemo(
		() => persistedHeroes.map(h => {
			const copy: Hero = { ...h };
			HeroLogic.updateHero(copy);
			return copy;
		}),
		[ persistedHeroes ]
	);

	const persistHero = async (hero: Hero) => {
		if (heroes.some(h => h.id === hero.id)) {
			const list = (JSON.parse(JSON.stringify(heroes)) as Hero[])
				.map(h => h.id === hero.id ? hero : h);

			await persistHeroes(list);
		}
		else {
			const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
			copy.push(hero);
			Collections.sort(copy, h => h.name);

			await persistHeroes(copy);
		}
	};

	const exportHero = (heroId: string, format: 'image' | 'pdf' | 'json') => {
		const hero = heroes.find(h => h.id === heroId)!;
		const ids = (format === 'pdf') ? [ 'stats', 'actions', 'maneuvers', 'moves', 'triggers', 'others', 'none' ] : [ heroId ];
		Utils.export(ids, hero.name || 'Unnamed Hero', hero, 'hero', format);
	};

	const importHero = async (hero: Hero) => {
		hero.id = Utils.guid();
		HeroLogic.updateHero(hero);

		await persistHero(hero);
	};

	const deleteHero = (heroId: string) => {
		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		return persistHeroes(copy.filter(h => h.id !== heroId));
	};

	return {
		heroes,
		persistHeroes,
		persistHero,
		exportHero,
		importHero,
		deleteHero
	};
};
