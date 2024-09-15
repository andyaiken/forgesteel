import { Hero } from './models/hero.ts';
import { Main } from './components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

localforage
	.getItem<Hero[]>('forgesteel-heroes')
	.then(heroes => {
		if (heroes) {
			heroes.forEach(hero => {
				if (hero.kit) {
					if (hero.kit.abilities === undefined) {
						hero.kit.abilities = [];
					}
					if (hero.kit.features === undefined) {
						hero.kit.features = [];
					}
				}
			});
		}

		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<Main heroes={heroes ?? []} />
			</StrictMode>
		);
	});
