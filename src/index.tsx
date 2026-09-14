import { AppTheme } from '@/components/main/app-theme';
import { DataLoader } from '@/components/panels/data-loader/data-loader';
import { DataManagerProvider } from './contexts/data-context';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HashRouter } from 'react-router';
import { Main } from '@/components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/utils/theme';
import { registerSW } from 'virtual:pwa-register';

import './style/index.scss';

if (window.navigator.storage && window.navigator.storage.persist) {
	window.navigator.storage
		.persist()
		.catch(() => {
			// Nothing to do here
		});
}

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
			<AppTheme>
				<DataLoader
					onComplete={data => {
						root.render(
							<ErrorBoundary>
								<StrictMode>
									<AppTheme>
										<HashRouter>
											<DataManagerProvider
												dataService={data.service}
												initialOptions={data.options}
												initialSession={data.session}
												initialHeroes={data.heroes}
												initialHomebrewSourcebooks={data.homebrewSourcebooks}
												initialBuiltInSourcebooks={data.builtInSourcebooks}
												initialHiddenSourcebookIDs={data.hiddenSourcebookIDs}
											>
												<Main
													connectionSettings={data.connectionSettings}
													dataService={data.service}
												/>
											</DataManagerProvider>
										</HashRouter>
									</AppTheme>
								</StrictMode>
							</ErrorBoundary>
						);
					}}
				/>
			</AppTheme>
		</StrictMode>
	</ErrorBoundary>
);
