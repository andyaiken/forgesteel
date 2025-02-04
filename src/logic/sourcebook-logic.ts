import { Ancestry } from '../models/ancestry';
import { Career } from '../models/career';
import { Collections } from '../utils/collections';
import { Complication } from '../models/complication';
import { Culture } from '../models/culture';
import { Domain } from '../models/domain';
import { HeroClass } from '../models/class';
import { Item } from '../models/item';
import { Kit } from '../models/kit';
import { Language } from '../models/language';
import { MonsterGroup } from '../models/monster';
import { Perk } from '../models/perk';
import { Project } from '../models/project';
import { Skill } from '../models/skill';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import { Title } from '../models/title';

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
		count += sourcebook.monsterGroups.length;

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

	static getTitleSourcebook = (sourcebooks: Sourcebook[], title: Title) => {
		return sourcebooks.find(s => s.titles.find(t => t.id === title.id));
	};

	static getItemSourcebook = (sourcebooks: Sourcebook[], item: Item) => {
		return sourcebooks.find(s => s.items.find(i => i.id === item.id));
	};

	static getMonsterGroupSourcebook = (sourcebooks: Sourcebook[], monsterGroup: MonsterGroup) => {
		return sourcebooks.find(s => s.monsterGroups.find(mg => mg.id === monsterGroup.id));
	};

	///////////////////////////////////////////////////////////////////////////

	static getSourcebooks = (homebrew: Sourcebook[]) => {
		const list: Sourcebook[] = [
			SourcebookData.core,
			SourcebookData.orden
		];

		list.push(...Collections.sort(homebrew, cs => cs.name));

		return list;
	};

	static getAncestries = (sourcebooks: Sourcebook[]) => {
		const list: Ancestry[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.ancestries);
		});

		return Collections.sort(list, item => item.name);
	};

	static getCultures = (sourcebooks: Sourcebook[]) => {
		const list: Culture[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.cultures);
		});

		return Collections.sort(list, item => item.name);
	};

	static getCareers = (sourcebooks: Sourcebook[]) => {
		const list: Career[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.careers);
		});

		return Collections.sort(list, item => item.name);
	};

	static getClasses = (sourcebooks: Sourcebook[]) => {
		const list: HeroClass[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.classes);
		});

		return Collections.sort(list, item => item.name);
	};

	static getComplications = (sourcebooks: Sourcebook[]) => {
		const list: Complication[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.complications);
		});

		return Collections.sort(list, item => item.name);
	};

	static getKits = (sourcebooks: Sourcebook[]) => {
		const list: Kit[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.kits);
		});

		return Collections.sort(list, item => item.name);
	};

	static getDomains = (sourcebooks: Sourcebook[]) => {
		const list: Domain[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.domains);
		});

		return Collections.sort(list, item => item.name);
	};

	static getPerks = (sourcebooks: Sourcebook[]) => {
		const list: Perk[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.perks);
		});

		return Collections.sort(list, item => item.name);
	};

	static getTitles = (sourcebooks: Sourcebook[]) => {
		const list: Title[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.titles);
		});

		return Collections.sort(list, item => item.name);
	};

	static getItems = (sourcebooks: Sourcebook[]) => {
		const list: Item[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.items);
		});

		return Collections.sort(list, item => item.name);
	};

	static getMonsterGroups = (sourcebooks: Sourcebook[]) => {
		const list: MonsterGroup[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.monsterGroups);
		});

		return Collections.sort(list, item => item.name);
	};

	static getSkills = (sourcebooks: Sourcebook[]) => {
		const list: Skill[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.skills);
		});

		return Collections.sort(list, item => item.name);
	};

	static getLanguages = (sourcebooks: Sourcebook[]) => {
		const list: Language[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.languages);
		});

		return Collections.sort(list, item => item.name);
	};

	static getProjects = (sourcebooks: Sourcebook[]) => {
		const list: Project[] = [];

		sourcebooks.forEach(sourcebook => {
			list.push(...sourcebook.projects);
			list.push(...sourcebook.items.map(i => i.crafting).filter(p => !!p));
		});

		return Collections.sort(list, item => item.name);
	};

	///////////////////////////////////////////////////////////////////////////

	static getSkill = (skillName: string, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks);

		const skill = skills.find(s => s.name === skillName);
		return skill || null;
	};

	static getSkillsFromList = (list: SkillList, sourcebooks: Sourcebook[]) => {
		const skills = SourcebookLogic.getSkills(sourcebooks).filter(s => s.list === list);
		return Collections.sort(skills, skill => skill.name);
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
