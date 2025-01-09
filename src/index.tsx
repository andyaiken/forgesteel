import { HashRouter } from 'react-router';
import { Main } from './components/main/main.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<Main />
		</HashRouter>
	</StrictMode>
);
