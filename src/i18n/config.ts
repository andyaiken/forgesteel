import HttpBackend from 'i18next-http-backend';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'common';

i18next.use(HttpBackend).use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'it',
	debug: true,
	ns: [ 'common', 'welcomePage' ],
	backend: {
		loadPath: '/forgesteel/locales/{{lng}}/{{ns}}.json'
	},
	react: { useSuspense: false },
	defaultNS
});
