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
				if (hero.class) {
					if (hero.class.kits === undefined) {
						hero.class.kits = [];
					}
					hero.class.subclasses.forEach(sc => {
						if (sc.kits === undefined) {
							sc.kits = [];
						}
					});
				}
				if (hero.kit) {
					if (hero.kit.abilities === undefined) {
						hero.kit.abilities = [];
					}
					if (hero.kit.features === undefined) {
						hero.kit.features = [];
					}
				}
				if (hero.state.xp === undefined) {
					hero.state.xp = 0;
				}
			});
		}

		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<Main heroes={heroes ?? []} />
			</StrictMode>
		);
	});
