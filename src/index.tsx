import { Hero } from './models/hero.ts';
import { Main } from './components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

localforage
	.getItem<Hero[]>('forgesteel-heroes')
	.then(heroes => {
		createRoot(document.getElementById('root')!).render(
			<StrictMode>
				<Main heroes={heroes ?? []} />
			</StrictMode>
		);
	});
