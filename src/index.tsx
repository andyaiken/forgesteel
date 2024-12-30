import { HashRouter } from 'react-router';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

const promises = [
	localforage.getItem<Options>('forgesteel-options')
] as const;

Promise.all(promises).then(([ options ]) => {
	if (!options) {
		options = {
			showSkillsInGroups: false,
			showFreeStrikes: false,
			showStandardAbilities: false,
			dimUnavailableAbilities: false
		};
	}

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<HashRouter>
				<Main
					options={options}
				/>
			</HashRouter>
		</StrictMode>
	);
});
