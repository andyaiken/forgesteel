import { useState, useEffect } from 'react';

export const useTheme = () => {
	const [isDark, setIsDark] = useState(() => {
		return document.documentElement.getAttribute('data-theme') === 'dark';
	});

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
		return () => observer.disconnect();
	}, []);

	const setTheme = (theme: 'dark' | 'light') => {
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.style.colorScheme = theme;
		localStorage.setItem('theme', theme);
		setIsDark(theme === 'dark');
	};

	const toggleTheme = () => {
		setTheme(isDark ? 'light' : 'dark');
	};

	return {
		isDark,
		setTheme,
		toggleTheme,
	};
};
