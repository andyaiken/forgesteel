import { FactoryLogic } from '@/logic/factory-logic.ts';
import { Format } from '@/utils/format.ts';
import { HashRouter } from 'react-router';
import { Hero } from '@/models/hero.ts';
import { HeroUpdateLogic } from '@/logic/update/hero-update-logic.ts';
import { Main } from '@/components/main/main.tsx';
import { Options } from '@/models/options.ts';
import { OptionsUpdateLogic } from '@/logic/update/options-update-logic.ts';
import { Playbook } from '@/models/playbook.ts';
import { PlaybookUpdateLogic } from '@/logic/update/playbook-update-logic.ts';
import { Sourcebook } from '@/models/sourcebook.ts';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SourcebookUpdateLogic } from '@/logic/update/sourcebook-update-logic.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/utils/initialize-theme';
import localforage from 'localforage';

import '@ant-design/v5-patch-for-react-19';
import './index.scss';
import './i18n/config.ts';

initializeTheme();

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/forgesteel/sw.js')
			.catch(registrationError => {
				console.error('SW registration failed: ', registrationError);
			});
	});
}

const promises = [
	localforage.getItem<Sourcebook[]>('forgesteel-homebrew-settings'),
	localforage.getItem<Hero[]>('forgesteel-heroes'),
	localforage.getItem<string[]>('forgesteel-hidden-setting-ids'),
	localforage.getItem<Playbook>('forgesteel-playbook'),
	localforage.getItem<Playbook>('forgesteel-session'),
	localforage.getItem<Options[]>('forgesteel-options')
];

Promise.all(promises).then(results => {
	// #region Homebrew sourcebooks

	let sourcebooks = results[0] as Sourcebook[] | null;
	if (!sourcebooks) {
		sourcebooks = [];
	}

	sourcebooks.forEach(sourcebook => {
		sourcebook.type = SourcebookType.Homebrew;
		SourcebookUpdateLogic.updateSourcebook(sourcebook);
	});

	SourcebookLogic.getSourcebooks(sourcebooks).forEach(sourcebook => {
		sourcebook.items.forEach(item => {
			if (item.crafting) {
				item.crafting.id = `${item.id}-crafting`;
				item.crafting.name = `Craft ${item.name}`;
				item.crafting.description = `Craft ${Format.startsWithVowel(item.name) ? 'an' : 'a'} ${item.name}`;
			}
		});
		sourcebook.imbuements.forEach(imbuement => {
			if (imbuement.crafting) {
				imbuement.crafting.id = `${imbuement.id}-crafting`;
				imbuement.crafting.name = `Imbue ${imbuement.name}`;
				imbuement.crafting.description = `Imbue an item with ${imbuement.name}`;
			}
		});
	});

	// #endregion

	// #region Heroes

	let heroes = results[1] as Hero[] | null;
	if (!heroes) {
		heroes = [];
	}

	heroes.forEach(hero => {
		HeroUpdateLogic.updateHero(hero, SourcebookLogic.getSourcebooks(sourcebooks));
	});

	// #endregion

	// #region Hidden sourcebook IDs

	let hiddenSourcebookIDs = results[2] as string[] | null;
	if (!hiddenSourcebookIDs) {
		hiddenSourcebookIDs = [];
	}

	// #endregion

	// #region Playbook

	let playbook = results[3] as Playbook | null;
	if (!playbook) {
		playbook = FactoryLogic.createPlaybook();
	}

	PlaybookUpdateLogic.updatePlaybook(playbook);

	// #endregion

	// #region Session

	let session = results[4] as Playbook | null;
	if (!session) {
		session = FactoryLogic.createPlaybook();
	}

	PlaybookUpdateLogic.updatePlaybook(session);

	// #endregion

	// #region Options

	let options = results[5] as Options | null;
	if (!options) {
		options = FactoryLogic.createOptions();
	}

	OptionsUpdateLogic.updateOptions(options);

	// #endregion

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<HashRouter>
				<Main
					heroes={heroes}
					homebrewSourcebooks={sourcebooks}
					hiddenSourcebookIDs={hiddenSourcebookIDs}
					playbook={playbook}
					session={session}
					options={options}
				/>
			</HashRouter>
		</StrictMode>
	);
});
