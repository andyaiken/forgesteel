import { useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export const useTheme = () => {
	const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
		const saved = localStorage.getItem('theme');
		return (saved as ThemeMode) || 'system';
	});

	useEffect(() => {
		if (themeMode !== 'system') {
			return;
		}
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const apply = () => {
			document.documentElement.setAttribute('data-theme', media.matches ? 'dark' : 'light');
			document.documentElement.style.colorScheme = media.matches ? 'dark' : 'light';
		};
		apply();
		media.addEventListener('change', apply);
		return () => media.removeEventListener('change', apply);
	}, [themeMode]);

	const setTheme = (mode: ThemeMode) => {
		let actualTheme: 'dark' | 'light';
		
		if (mode === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			actualTheme = prefersDark ? 'dark' : 'light';
		} else {
			actualTheme = mode;
		}

		document.documentElement.setAttribute('data-theme', actualTheme);
		document.documentElement.style.colorScheme = actualTheme;
		localStorage.setItem('theme', mode);
		setThemeMode(mode);
	};

	return {
		themeMode,
		setTheme,
	};
};
