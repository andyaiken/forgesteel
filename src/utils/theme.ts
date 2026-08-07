export type ThemeMode = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

// Created once and kept, rather than made fresh per call: a MediaQueryList
// that nothing holds a reference to is not reliably kept alive, and losing it
// would silently take the 'system' listener with it.
let osDarkQuery: MediaQueryList | null = null;

const prefersDark = () => {
	osDarkQuery ??= window.matchMedia('(prefers-color-scheme: dark)');
	return osDarkQuery;
};

const subscribers = new Set<() => void>();

/**
 * The mode the user picked. Anything unrecognised - including nothing saved at
 * all - falls back to following the operating system.
 */
export const getThemeMode = (): ThemeMode => {
	const saved = localStorage.getItem(STORAGE_KEY);
	return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
};

/** The theme actually in effect, with 'system' resolved against the OS. */
export const getTheme = (): Theme => {
	const mode = getThemeMode();
	return mode === 'system' ? (prefersDark().matches ? 'dark' : 'light') : mode;
};

/** Called whenever the theme changes. Returns an unsubscribe function. */
export const subscribeToTheme = (onChange: () => void) => {
	subscribers.add(onChange);
	return () => {
		subscribers.delete(onChange);
	};
};

// Paints the document, then wakes anything listening. The `data-theme`
// attribute is an output - it drives the stylesheets - rather than a channel
// this module reads back or expects anyone else to write.
const apply = () => {
	const theme = getTheme();
	document.documentElement.setAttribute('data-theme', theme);
	document.documentElement.style.colorScheme = theme;
	subscribers.forEach(onChange => onChange());
};

/** Records the user's choice and applies it immediately. */
export const setThemeMode = (mode: ThemeMode) => {
	localStorage.setItem(STORAGE_KEY, mode);
	apply();
};

/**
 * Applies the saved theme on boot and keeps following the OS from then on.
 *
 * The OS listener deliberately lives here, for the lifetime of the page, rather
 * than inside a component: it used to be an effect in the settings hook, which
 * meant 'system' only tracked the OS while the settings screen happened to be
 * open. Re-applying reads the saved mode afresh, so an OS change is a no-op
 * when the user has chosen an explicit theme.
 */
export const initializeTheme = () => {
	apply();
	prefersDark().addEventListener('change', apply);
};
