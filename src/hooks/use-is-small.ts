import { useMediaQuery } from '@/hooks/use-media-query';

export const useIsSmall = () => {
	return useMediaQuery('(max-width: 1000px)');
};
