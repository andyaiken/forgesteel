import { Hero } from '@/models/hero';

export class Analytics {
	static logHeroCreation = (hero: Hero) => {
		gtag('event', 'herocreation', {
			ancestry: hero.ancestry?.id || '',
			culture: hero.culture?.id || '',
			career: hero.career?.id || '',
			class: hero.class?.id || '',
			complication: hero.complication?.id || ''
		});
	};
};
