import { Hero } from '@/models/hero';
import { SourcebookElementKind } from '@/models/sourcebook';

export class Analytics {
	static logHeroCreated = (hero: Hero) => {
		gtag('event', 'hero_created_ancestry', { ancestry: hero.ancestry?.id || '' });
		gtag('event', 'hero_created_culture', { culture: hero.culture?.id || '' });
		gtag('event', 'hero_created_career', { career: hero.career?.id || '' });
		gtag('event', 'hero_created_class', { class: hero.class?.id || '' });
		gtag('event', 'hero_created_complication', { complication: hero.complication?.id || '' });
	};

	static logHeroEdited = (hero: Hero) => {
		gtag('event', 'hero_edited_ancestry', { ancestry: hero.ancestry?.id || '' });
		gtag('event', 'hero_edited_culture', { culture: hero.culture?.id || '' });
		gtag('event', 'hero_edited_career', { career: hero.career?.id || '' });
		gtag('event', 'hero_edited_class', { class: hero.class?.id || '' });
		gtag('event', 'hero_edited_complication', { complication: hero.complication?.id || '' });
	};

	static logHomebrewEdited = (type: SourcebookElementKind) => {
		gtag('event', 'homebrew_created', { type: type });
	};
};
