import { DataLoader } from '@/components/panels/data-loader/data-loader';
import { DataManagerProvider } from './contexts/data-context';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HashRouter } from 'react-router';
import { Main } from '@/components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/utils/initialize-theme';
import { registerSW } from 'virtual:pwa-register';

import './index.scss';

initializeTheme();

// Register Service Worker for PWA functionality
registerSW({
	onRegisterError: error => {
		console.error('SW registration failed: ', error);
	}
});

const root = createRoot(document.getElementById('root')!);
root.render(
	<ErrorBoundary>
		<StrictMode>
			<DataLoader
				onComplete={data => {
					root.render(
						<ErrorBoundary>
							<StrictMode>
								<HashRouter>
									<DataManagerProvider
										dataService={data.service}
										initialOptions={data.options}
										initialSession={data.session}
										initialHeroes={data.heroes}
										initialHomebrewSourcebooks={data.homebrewSourcebooks}
										initialHiddenSourcebookIDs={data.hiddenSourcebookIDs}
									>
										<Main
											connectionSettings={data.connectionSettings}
											dataService={data.service}
										/>
									</DataManagerProvider>
								</HashRouter>
							</StrictMode>
						</ErrorBoundary>
					);
				}}
			/>
		</StrictMode>
	</ErrorBoundary>
);
