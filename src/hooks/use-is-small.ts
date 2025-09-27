import { useMediaQuery } from './use-media-query';

export const useIsSmall = () => {
	return useMediaQuery('(max-width: 1000px)');
};
