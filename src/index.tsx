import { DataLoader } from '@/components/panels/data-loader/data-loader';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HashRouter } from 'react-router';
import { Main } from '@/components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from '@/utils/initialize-theme';

import './index.scss';

initializeTheme();

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
			.catch(registrationError => {
				console.error('SW registration failed: ', registrationError);
			});
	});
}

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
									<Main
										heroes={data.heroes}
										homebrewSourcebooks={data.homebrewSourcebooks}
										hiddenSourcebookIDs={data.hiddenSourcebookIDs}
										session={data.session}
										options={data.options}
										connectionSettings={data.connectionSettings}
										dataService={data.service}
									/>
								</HashRouter>
							</StrictMode>
						</ErrorBoundary>
					);
				}}
			/>
		</StrictMode>
	</ErrorBoundary>
);
