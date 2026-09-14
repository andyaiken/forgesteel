import { getTheme, getThemeMode, setThemeMode, subscribeToTheme } from '@/utils/theme';
import { useSyncExternalStore } from 'react';

/**
 * Subscribes to the theme store in utils/theme.
 *
 * Two values, because the two callers want different things: the settings
 * screen edits the mode the user picked, which may be 'system'; anything that
 * has to render differently - the Ant Design provider - wants that resolved to
 * a concrete theme.
 *
 * - `themeMode` - what the user chose: 'light', 'dark' or 'system'.
 * - `theme` - what is actually showing: 'light' or 'dark'.
 */
export const useTheme = () => {
	const themeMode = useSyncExternalStore(subscribeToTheme, getThemeMode);
	const theme = useSyncExternalStore(subscribeToTheme, getTheme);

	return {
		themeMode,
		theme,
		setTheme: setThemeMode
	};
};
