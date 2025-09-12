import { useEffect } from 'react';

export const useErrorListener = (handler: EventListener) => {
	useEffect(() => {
		window.addEventListener('error', handler);

		return () => {
			window.removeEventListener('error', handler);
		};
	}, [ handler ]);
};
