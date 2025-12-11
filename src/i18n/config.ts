import HttpBackend from 'i18next-http-backend';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'common';

i18next.use(HttpBackend).use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'it',
	debug: true,
	ns: [ 'common', 'welcomePage', 'hero', 'ancestry' ],
	backend: {
		loadPath: '/forgesteel/locales/{{lng}}/{{ns}}.json'
	},
	react: { useSuspense: false },
	defaultNS,
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
		format: function format(value, format) {
			switch (format) {
				case 'lowercase':
					return value.toLowerCase();
				case 'uppercase':
					return value.toUpperCase();
				case 'capitalize':
					return value.toLowerCase().replace(/(?:^|\s)\w/g, function (match: string) {
						return match.toUpperCase();
					});
			}
		}
	}
});
