export const initializeTheme = () => {
	const setTheme = (theme: 'dark' | 'light') => {
		document.documentElement.setAttribute('data-theme', theme);
		document.documentElement.style.colorScheme = theme;
	};

	const savedThemePreference = localStorage.getItem('theme');
	
	if (savedThemePreference === 'dark' || savedThemePreference === 'light') {
		setTheme(savedThemePreference);
		return;
	}
	
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	setTheme(prefersDark ? 'dark' : 'light');
};
