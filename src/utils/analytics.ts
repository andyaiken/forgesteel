import { Element } from '@/models/element';
import { Hero } from '@/models/hero';
import { SourcebookElementKind } from '@/models/sourcebook';

declare let gtag: (...args: unknown[]) => void;

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

	static logElementSelected = (element: Element, type: string) => {
		gtag('event', 'element_selected', {
			element: element.id,
			type: type
		});
	};

	static logHomebrewCreated = (type: SourcebookElementKind) => {
		gtag('event', 'homebrew_created', {
			type: type
		});
	};

	static logHomebrewEdited = (type: SourcebookElementKind) => {
		gtag('event', 'homebrew_edited', {
			type: type
		});
	};
};
