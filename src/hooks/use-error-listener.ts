import { useEffect } from 'react';

export const useErrorListener = (handler: EventListener) => {
	useEffect(() => {
		window.addEventListener('error', handler);
		window.addEventListener('unhandledrejection', handler);

		return () => {
			window.removeEventListener('error', handler);
			window.removeEventListener('unhandledrejection', handler);
		};
	}, [ handler ]);
};
