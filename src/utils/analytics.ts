import { Element } from '@/models/element';
import { Hero } from '@/models/hero';
import { SourcebookElementKind } from '@/models/sourcebook';

export class Analytics {
	static logHeroCreated = (hero: Hero) => {
		const params: Gtag.CustomParams = {};
		params['ancestry'] = hero.ancestry?.id || '';
		params['culture'] = hero.culture?.id || '';
		params['career'] = hero.career?.id || '';
		params['class'] = hero.class?.id || '';
		params['complication'] = hero.complication?.id || '';

		gtag('event', 'hero_created', params);
	};

	static logHeroEdited = (hero: Hero) => {
		const params: Gtag.CustomParams = {};
		params['ancestry'] = hero.ancestry?.id || '';
		params['culture'] = hero.culture?.id || '';
		params['career'] = hero.career?.id || '';
		params['class'] = hero.class?.id || '';
		params['complication'] = hero.complication?.id || '';

		gtag('event', 'hero_edited', params);
	};

	static logHomebrewEdited = (type: SourcebookElementKind, element: Element) => {
		const params: Gtag.CustomParams = {};
		params['type'] = type;
		params['name'] = element.name;

		gtag('event', 'homebrew_created', params);
	};
};
