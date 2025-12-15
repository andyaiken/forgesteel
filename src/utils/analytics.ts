import { Element } from '@/models/element';
import { Hero } from '@/models/hero';
import { SourcebookElementKind } from '@/models/sourcebook';

export class Analytics {
	static logHeroCreated = (hero: Hero) => {
		gtag('event', 'hero_created', {
			ancestry: hero.ancestry?.id || '',
			culture: hero.culture?.id || '',
			career: hero.career?.id || '',
			class: hero.class?.id || '',
			complication: hero.complication?.id || ''
		});
	};

	static logHeroEdited = (hero: Hero) => {
		gtag('event', 'hero_edited', {
			ancestry: hero.ancestry?.id || '',
			culture: hero.culture?.id || '',
			career: hero.career?.id || '',
			class: hero.class?.id || '',
			complication: hero.complication?.id || ''
		});
	};

	static logHomebrewEdited = (type: SourcebookElementKind, element: Element) => {
		gtag('event', 'homebrew_created', {
			type: type,
			name: element.name
		});
	};
};
