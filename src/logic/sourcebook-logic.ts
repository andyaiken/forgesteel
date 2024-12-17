import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { Kit } from '../models/kit';
import { Perk } from '../models/perk';
import { Sourcebook } from '../models/sourcebook';

export class SourcebookLogic {
	static getElementCount = (sourcebook: Sourcebook) => {
		let count = 0;

		count += sourcebook.ancestries.length;
		count += sourcebook.cultures.length;
		count += sourcebook.careers.length;
		count += sourcebook.classes.length;
		count += sourcebook.complications.length;
		count += sourcebook.kits.length;
		count += sourcebook.domains.length;
		count += sourcebook.perks.length;
		count += sourcebook.items.length;

		return count;
	};

	static getAncestrySourcebook = (sourcebook: Sourcebook[], ancestry: Ancestry) => {
		return sourcebook.find(s => s.ancestries.find(a => a.id === ancestry.id));
	};

	static getCultureSourcebook = (sourcebook: Sourcebook[], culture: Culture) => {
		return sourcebook.find(s => s.cultures.find(c => c.id === culture.id));
	};

	static getCareerSourcebook = (sourcebook: Sourcebook[], career: Career) => {
		return sourcebook.find(s => s.careers.find(c => c.id === career.id));
	};

	static getClassSourcebook = (sourcebook: Sourcebook[], heroClass: HeroClass) => {
		return sourcebook.find(s => s.classes.find(c => c.id === heroClass.id));
	};

	static getComplicationSourcebook = (sourcebook: Sourcebook[], complication: Complication) => {
		return sourcebook.find(s => s.complications.find(c => c.id === complication.id));
	};

	static getKitSourcebook = (sourcebook: Sourcebook[], kit: Kit) => {
		return sourcebook.find(s => s.kits.find(k => k.id === kit.id));
	};

	static getDomainSourcebook = (sourcebook: Sourcebook[], domain: Domain) => {
		return sourcebook.find(s => s.domains.find(d => d.id === domain.id));
	};

	static getPerkSourcebook = (sourcebook: Sourcebook[], perk: Perk) => {
		return sourcebook.find(s => s.perks.find(p => p.id === perk.id));
	};

	static getItemSourcebook = (sourcebook: Sourcebook[], item: Item) => {
		return sourcebook.find(s => s.items.find(i => i.id === item.id));
	};
}
