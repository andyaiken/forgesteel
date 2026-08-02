import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Collections } from '@/utils/collections';
import { Element } from '@/models/element';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

export interface VisibilityKindOptions {
	showMonsters?: boolean;
	includeCulturesFromAncestries?: boolean;
	includeSubclassesFromClasses?: boolean;
	includeProjectsFromImbuements?: boolean;
	includeProjectsFromItems?: boolean;
}

export class VisibilityLogic {
	static isElementHidden = (elementID: string, hiddenElementIDs: string[]) => {
		return hiddenElementIDs.includes(elementID);
	};

	static getElementIDsForSourcebook = (sourcebook: Sourcebook): string[] => {
		const ids = SourcebookLogic.getElements(sourcebook).map(x => x.element.id);
		sourcebook.monsterGroups.forEach(group => {
			group.monsters.forEach(monster => ids.push(monster.id));
		});
		sourcebook.classes.forEach(heroClass => {
			heroClass.subclasses.forEach(subclass => ids.push(subclass.id));
		});
		return Collections.distinct(ids, id => id);
	};

	static clearHiddenForSourcebook = (hiddenElementIDs: string[], sourcebook: Sourcebook): string[] => {
		const sourceElementIDs = new Set(VisibilityLogic.getElementIDsForSourcebook(sourcebook));
		return hiddenElementIDs.filter(id => !sourceElementIDs.has(id));
	};

	static getElementIDsForKind = (sourcebooks: Sourcebook[], kind: SourcebookElementKind, options: VisibilityKindOptions = {}): string[] => {
		const showMonsters = options.showMonsters ?? false;
		const includeCulturesFromAncestries = options.includeCulturesFromAncestries ?? false;
		const includeSubclassesFromClasses = options.includeSubclassesFromClasses ?? false;
		const includeProjectsFromImbuements = options.includeProjectsFromImbuements ?? false;
		const includeProjectsFromItems = options.includeProjectsFromItems ?? false;

		let elements: Element[] = [];
		switch (kind) {
			case 'adventure':
				elements = SourcebookLogic.getAdventures(sourcebooks);
				break;
			case 'ancestry':
				elements = SourcebookLogic.getAncestries(sourcebooks);
				break;
			case 'career':
				elements = SourcebookLogic.getCareers(sourcebooks);
				break;
			case 'class':
				elements = SourcebookLogic.getClasses(sourcebooks);
				break;
			case 'complication':
				elements = SourcebookLogic.getComplications(sourcebooks);
				break;
			case 'culture':
				elements = SourcebookLogic.getCultures(sourcebooks, includeCulturesFromAncestries);
				break;
			case 'domain':
				elements = SourcebookLogic.getDomains(sourcebooks);
				break;
			case 'encounter':
				elements = SourcebookLogic.getEncounters(sourcebooks);
				break;
			case 'imbuement':
				elements = SourcebookLogic.getImbuements(sourcebooks);
				break;
			case 'item':
				elements = SourcebookLogic.getItems(sourcebooks);
				break;
			case 'kit':
				elements = SourcebookLogic.getKits(sourcebooks);
				break;
			case 'monster-group':
				elements = showMonsters ?
					SourcebookLogic.getMonsters(sourcebooks) :
					SourcebookLogic.getMonsterGroups(sourcebooks);
				break;
			case 'montage':
				elements = SourcebookLogic.getMontages(sourcebooks);
				break;
			case 'negotiation':
				elements = SourcebookLogic.getNegotiations(sourcebooks);
				break;
			case 'perk':
				elements = SourcebookLogic.getPerks(sourcebooks);
				break;
			case 'project':
				elements = SourcebookLogic.getProjects(sourcebooks, includeProjectsFromImbuements, includeProjectsFromItems);
				break;
			case 'subclass':
				elements = SourcebookLogic.getSubclasses(sourcebooks, includeSubclassesFromClasses);
				break;
			case 'tactical-map':
				elements = SourcebookLogic.getTacticalMaps(sourcebooks);
				break;
			case 'terrain':
				elements = SourcebookLogic.getTerrains(sourcebooks);
				break;
			case 'title':
				elements = SourcebookLogic.getTitles(sourcebooks);
				break;
		}

		return Collections.distinct(elements.map(e => e.id), id => id);
	};

	static toggleCategoryHidden = (
		hiddenElementIDs: string[],
		sourcebooks: Sourcebook[],
		kind: SourcebookElementKind,
		options: VisibilityKindOptions = {}
	): string[] => {
		const categoryIDs = VisibilityLogic.getElementIDsForKind(sourcebooks, kind, options);
		if (categoryIDs.length === 0) {
			return hiddenElementIDs;
		}

		const allHidden = categoryIDs.every(id => hiddenElementIDs.includes(id));
		if (allHidden) {
			const categorySet = new Set(categoryIDs);
			return hiddenElementIDs.filter(id => !categorySet.has(id));
		}

		const copy = Utils.copy(hiddenElementIDs);
		categoryIDs.forEach(id => {
			if (!copy.includes(id)) {
				copy.push(id);
			}
		});
		return copy;
	};

	static hideElement = (hiddenElementIDs: string[], elementID: string): string[] => {
		if (hiddenElementIDs.includes(elementID)) {
			return hiddenElementIDs;
		}
		const copy = Utils.copy(hiddenElementIDs);
		copy.push(elementID);
		return copy;
	};

	static showElement = (hiddenElementIDs: string[], elementID: string): string[] => {
		return hiddenElementIDs.filter(id => id !== elementID);
	};

	static getHiddenElementsForSourcebook = (sourcebook: Sourcebook, hiddenElementIDs: string[]): { element: Element, type: SourcebookElementKind | 'monster' }[] => {
		const hiddenSet = new Set(hiddenElementIDs);
		const results: { element: Element, type: SourcebookElementKind | 'monster' }[] = [];

		SourcebookLogic.getElements(sourcebook).forEach(entry => {
			if (hiddenSet.has(entry.element.id)) {
				results.push(entry);
			}
		});

		sourcebook.monsterGroups.forEach(group => {
			group.monsters.forEach(monster => {
				if (hiddenSet.has(monster.id)) {
					results.push({ element: monster, type: 'monster' });
				}
			});
		});

		sourcebook.classes.forEach(heroClass => {
			heroClass.subclasses.forEach(subclass => {
				if (hiddenSet.has(subclass.id) && !results.some(r => r.element.id === subclass.id)) {
					results.push({ element: subclass, type: 'subclass' });
				}
			});
		});

		return Collections.sort(results, r => r.element.name);
	};

	static getVisibleSourcebooks = (
		sourcebooks: Sourcebook[],
		hiddenSourcebookIDs: string[],
		hiddenElementIDs: string[]
	): Sourcebook[] => {
		const hiddenElementSet = new Set(hiddenElementIDs);

		return sourcebooks
			.filter(sb => !hiddenSourcebookIDs.includes(sb.id))
			.map(sb => {
				const copy = Utils.copy(sb);
				copy.adventures = copy.adventures.filter(x => !hiddenElementSet.has(x.id));
				copy.ancestries = copy.ancestries.filter(x => !hiddenElementSet.has(x.id));
				copy.careers = copy.careers.filter(x => !hiddenElementSet.has(x.id));
				copy.classes = copy.classes
					.filter(x => !hiddenElementSet.has(x.id))
					.map(heroClass => {
						heroClass.subclasses = heroClass.subclasses.filter(sc => !hiddenElementSet.has(sc.id));
						return heroClass;
					});
				copy.complications = copy.complications.filter(x => !hiddenElementSet.has(x.id));
				copy.cultures = copy.cultures.filter(x => !hiddenElementSet.has(x.id));
				copy.domains = copy.domains.filter(x => !hiddenElementSet.has(x.id));
				copy.encounters = copy.encounters.filter(x => !hiddenElementSet.has(x.id));
				copy.imbuements = copy.imbuements.filter(x => !hiddenElementSet.has(x.id));
				copy.items = copy.items.filter(x => !hiddenElementSet.has(x.id));
				copy.kits = copy.kits.filter(x => !hiddenElementSet.has(x.id));
				copy.monsterGroups = copy.monsterGroups
					.filter(x => !hiddenElementSet.has(x.id))
					.map(group => {
						group.monsters = group.monsters.filter(m => !hiddenElementSet.has(m.id));
						return group;
					});
				copy.montages = copy.montages.filter(x => !hiddenElementSet.has(x.id));
				copy.negotiations = copy.negotiations.filter(x => !hiddenElementSet.has(x.id));
				copy.perks = copy.perks.filter(x => !hiddenElementSet.has(x.id));
				copy.projects = copy.projects.filter(x => !hiddenElementSet.has(x.id));
				copy.subclasses = copy.subclasses.filter(x => !hiddenElementSet.has(x.id));
				copy.tacticalMaps = copy.tacticalMaps.filter(x => !hiddenElementSet.has(x.id));
				copy.terrain = copy.terrain.filter(x => !hiddenElementSet.has(x.id));
				copy.titles = copy.titles.filter(x => !hiddenElementSet.has(x.id));
				return copy;
			});
	};
}
