import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { Kit } from '../models/kit';
import { MonsterGroup } from '../models/monster';
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

	static getAncestrySourcebook = (sourcebooks: Sourcebook[], ancestry: Ancestry) => {
		return sourcebooks.find(s => s.ancestries.find(a => a.id === ancestry.id));
	};

	static getCultureSourcebook = (sourcebooks: Sourcebook[], culture: Culture) => {
		return sourcebooks.find(s => s.cultures.find(c => c.id === culture.id));
	};

	static getCareerSourcebook = (sourcebooks: Sourcebook[], career: Career) => {
		return sourcebooks.find(s => s.careers.find(c => c.id === career.id));
	};

	static getClassSourcebook = (sourcebooks: Sourcebook[], heroClass: HeroClass) => {
		return sourcebooks.find(s => s.classes.find(c => c.id === heroClass.id));
	};

	static getComplicationSourcebook = (sourcebooks: Sourcebook[], complication: Complication) => {
		return sourcebooks.find(s => s.complications.find(c => c.id === complication.id));
	};

	static getKitSourcebook = (sourcebooks: Sourcebook[], kit: Kit) => {
		return sourcebooks.find(s => s.kits.find(k => k.id === kit.id));
	};

	static getDomainSourcebook = (sourcebooks: Sourcebook[], domain: Domain) => {
		return sourcebooks.find(s => s.domains.find(d => d.id === domain.id));
	};

	static getPerkSourcebook = (sourcebooks: Sourcebook[], perk: Perk) => {
		return sourcebooks.find(s => s.perks.find(p => p.id === perk.id));
	};

	static getItemSourcebook = (sourcebooks: Sourcebook[], item: Item) => {
		return sourcebooks.find(s => s.items.find(i => i.id === item.id));
	};

	static getMonsterGroupSourcebook = (sourcebooks: Sourcebook[], monsterGroup: MonsterGroup) => {
		return sourcebooks.find(s => s.monsterGroups.find(mg => mg.id === monsterGroup.id));
	};

	///////////////////////////////////////////////////////////////////////////

	static getMonster = (sourcebooks: Sourcebook[], monsterID: string) => {
		const monsters = sourcebooks
			.flatMap(s => s.monsterGroups)
			.flatMap(mg => mg.monsters);
		return monsters.find(m => m.id === monsterID) || null;
	};

	static getMonsterGroup = (sourcebooks: Sourcebook[], monsterID: string) => {
		return sourcebooks
			.flatMap(s => s.monsterGroups)
			.find(mg => {
				const ids = mg.monsters.map(m => m.id);
				return ids.includes(monsterID);
			}) || null;
	};
}
