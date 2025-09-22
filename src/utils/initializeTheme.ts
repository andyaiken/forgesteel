export const initializeTheme = () => {
	const setTheme = (theme: 'dark' | 'light') => {
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.style.colorScheme = theme;
		localStorage.setItem('theme', theme);
	};

	const theme = localStorage.getItem('theme');
	if (theme) {
		if (theme === 'dark') {
			setTheme('dark');
		}
		if (theme === 'light') {
			setTheme('light');
		}
		return;
	}

	const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
	if (prefersDarkTheme.matches) {
		setTheme('dark');
		return;
	}

	const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
	if (prefersLightTheme.matches) {
		setTheme('light');
		return;
	}

	setTheme('dark');
};
