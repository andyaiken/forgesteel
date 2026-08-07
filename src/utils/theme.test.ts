import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// These tests run in vitest's default node environment, so the handful of
// browser globals utils/theme touches are stubbed by hand rather than pulling
// in a DOM implementation for one module.

interface FakeMediaQuery {
	matches: boolean;
	addEventListener: (type: string, listener: () => void) => void;
	removeEventListener: (type: string, listener: () => void) => void;
}

let attributes: Record<string, string>;
let store: Record<string, string>;
let listeners: (() => void)[];
let media: FakeMediaQuery;

/** Flips the OS preference and fires `change`, as a real browser would. */
const setOsPrefersDark = (value: boolean) => {
	media.matches = value;
	listeners.forEach(l => l());
};

const getAppliedTheme = () => attributes['data-theme'];

// A fresh copy of the module per test, so its retained MediaQueryList and its
// registered listener don't leak from one case into the next.
const loadTheme = async () => {
	vi.resetModules();
	return import('@/utils/theme');
};

beforeEach(() => {
	attributes = {};
	store = {};
	listeners = [];
	media = {
		matches: false,
		addEventListener: (_type, listener) => { listeners.push(listener); },
		removeEventListener: (_type, listener) => { listeners = listeners.filter(l => l !== listener); }
	};

	vi.stubGlobal('window', { matchMedia: () => media });
	vi.stubGlobal('localStorage', {
		getItem: (key: string) => (key in store ? store[key] : null),
		setItem: (key: string, value: string) => { store[key] = value; }
	});
	vi.stubGlobal('document', {
		documentElement: {
			setAttribute: (key: string, value: string) => { attributes[key] = value; },
			style: {}
		}
	});
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('getThemeMode', () => {
	test('returns the saved mode', async () => {
		const { getThemeMode } = await loadTheme();
		store.theme = 'dark';
		expect(getThemeMode()).toBe('dark');
	});

	test('falls back to system when nothing is saved', async () => {
		const { getThemeMode } = await loadTheme();
		expect(getThemeMode()).toBe('system');
	});

	test('falls back to system when the saved value is not recognised', async () => {
		const { getThemeMode } = await loadTheme();
		store.theme = 'chartreuse';
		expect(getThemeMode()).toBe('system');
	});
});

describe('initializeTheme', () => {
	test('applies an explicitly saved theme', async () => {
		const { initializeTheme } = await loadTheme();
		store.theme = 'dark';
		initializeTheme();
		expect(getAppliedTheme()).toBe('dark');
	});

	test('resolves system against the OS preference', async () => {
		const { initializeTheme } = await loadTheme();
		media.matches = true;
		initializeTheme();
		expect(getAppliedTheme()).toBe('dark');
	});
});

describe('following the OS preference', () => {
	// The regression this module was restructured for: the listener used to be
	// an effect in the settings hook, so 'system' only tracked the OS while the
	// settings screen was mounted.
	test('follows the OS on system, with no component mounted', async () => {
		const { initializeTheme } = await loadTheme();
		store.theme = 'system';
		initializeTheme();
		expect(getAppliedTheme()).toBe('light');

		setOsPrefersDark(true);
		expect(getAppliedTheme()).toBe('dark');

		setOsPrefersDark(false);
		expect(getAppliedTheme()).toBe('light');
	});

	test('ignores the OS when a theme was chosen explicitly', async () => {
		const { initializeTheme } = await loadTheme();
		store.theme = 'light';
		initializeTheme();

		setOsPrefersDark(true);
		expect(getAppliedTheme()).toBe('light');
	});

	// The listener re-reads the saved mode rather than capturing it, so it keeps
	// working after the user switches between options.
	test('starts following the OS when the user switches to system', async () => {
		const { initializeTheme, setThemeMode } = await loadTheme();
		store.theme = 'light';
		initializeTheme();

		setThemeMode('system');
		setOsPrefersDark(true);
		expect(getAppliedTheme()).toBe('dark');
	});

	test('stops following the OS when the user switches away from system', async () => {
		const { initializeTheme, setThemeMode } = await loadTheme();
		store.theme = 'system';
		initializeTheme();

		setThemeMode('light');
		setOsPrefersDark(true);
		expect(getAppliedTheme()).toBe('light');
	});
});

describe('setThemeMode', () => {
	test('saves the choice and applies it', async () => {
		const { setThemeMode } = await loadTheme();
		setThemeMode('dark');
		expect(store.theme).toBe('dark');
		expect(getAppliedTheme()).toBe('dark');
	});
});

describe('getTheme', () => {
	test('returns an explicitly chosen theme', async () => {
		const { getTheme } = await loadTheme();
		store.theme = 'dark';
		expect(getTheme()).toBe('dark');
	});

	test('resolves system against the OS preference', async () => {
		const { getTheme } = await loadTheme();
		store.theme = 'system';
		expect(getTheme()).toBe('light');

		media.matches = true;
		expect(getTheme()).toBe('dark');
	});
});

describe('subscribeToTheme', () => {
	test('notifies on an explicit change', async () => {
		const { setThemeMode, subscribeToTheme } = await loadTheme();
		const onChange = vi.fn();
		subscribeToTheme(onChange);

		setThemeMode('dark');
		expect(onChange).toHaveBeenCalled();
	});

	test('notifies when the OS preference moves', async () => {
		const { initializeTheme, subscribeToTheme } = await loadTheme();
		store.theme = 'system';
		initializeTheme();

		const onChange = vi.fn();
		subscribeToTheme(onChange);

		setOsPrefersDark(true);
		expect(onChange).toHaveBeenCalled();
	});

	test('stops notifying once unsubscribed', async () => {
		const { setThemeMode, subscribeToTheme } = await loadTheme();
		const onChange = vi.fn();
		const unsubscribe = subscribeToTheme(onChange);

		unsubscribe();
		setThemeMode('dark');
		expect(onChange).not.toHaveBeenCalled();
	});
});
