import { useLayoutEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
	const [ matches, setMatches ] = useState<boolean>(window.matchMedia(query).matches);

	useLayoutEffect(() => {
		const handleChange = () => setMatches(window.matchMedia(query).matches);

		const matchMedia = window.matchMedia(query);

		handleChange();

		matchMedia.addEventListener('change', handleChange);
		return () => matchMedia.removeEventListener('change', handleChange);
	}, [ query ]);

	return matches;
};
