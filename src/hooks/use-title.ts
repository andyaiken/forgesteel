import { useEffect } from 'react';

export const useTitle = (title: string) => {
	useEffect(() => {
		const originalTitle = document?.title || 'Forge Steel';

		if (document && (document.title !== title)) {
			document.title = `Forge Steel - ${title}`;
		}

		return () => {
			document.title = originalTitle || 'Forge Steel';
		};
	}, [ title ]);
};
