import { FactoryLogic } from './logic/factory-logic.ts';
import { HashRouter } from 'react-router';
import { Main } from './components/main/main.tsx';
import { Options } from './models/options.ts';
import { Playbook } from './models/playbook.ts';
import { Sourcebook } from './models/sourcebook.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import localforage from 'localforage';

import './index.scss';

const promises = [
	localforage.getItem<Sourcebook[]>('forgesteel-homebrew-settings'),
	localforage.getItem<string[]>('forgesteel-hidden-setting-ids'),
	localforage.getItem<Playbook>('forgesteel-playbook'),
	localforage.getItem<Options>('forgesteel-options')
] as const;

Promise.all(promises).then(([ sourcebooks, hiddenSourcebookIDs, playbook, options ]) => {
	if (!sourcebooks) {
		sourcebooks = [];
	}

	sourcebooks.forEach(sourcebook => {
		if (sourcebook.domains === undefined) {
			sourcebook.domains = [];
		}
		if (sourcebook.items === undefined) {
			sourcebook.items = [];
		}
		if (sourcebook.perks === undefined) {
			sourcebook.perks = [];
		}
		if (sourcebook.titles === undefined) {
			sourcebook.titles = [];
		}
		if (sourcebook.monsterGroups === undefined) {
			sourcebook.monsterGroups = [];
		}
	});

	if (!hiddenSourcebookIDs) {
		hiddenSourcebookIDs = [];
	}

	if (!playbook) {
		playbook = FactoryLogic.createPlaybook();
	}

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
					homebrewSourcebooks={sourcebooks}
					hiddenSourcebookIDs={hiddenSourcebookIDs}
					playbook={playbook}
					options={options}
				/>
			</HashRouter>
		</StrictMode>
	);
});
