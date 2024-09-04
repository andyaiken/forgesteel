import localforage from 'localforage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Main } from './components/main/main.tsx';

import { Hero } from './models/hero.ts';

import './index.scss';

localforage
	.getItem<Hero[]>('drawsteel-heroes')
	.then(heroes => {
		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<Main heroes={heroes ?? []} />
			</StrictMode>
		);
	});
