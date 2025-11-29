import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Complication } from '@/models/complication';
import { Culture } from '@/models/culture';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Encounter } from '@/models/encounter';
import { EncounterLogic } from '@/logic/encounter-logic';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { Item } from '@/models/item';
import { Kit } from '@/models/kit';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { Montage } from '@/models/montage';
import { Negotiation } from '@/models/negotiation';
import { Perk } from '@/models/perk';
import { Project } from '@/models/project';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { TacticalMap } from '@/models/tactical-map';
import { Terrain } from '@/models/terrain';
import { Title } from '@/models/title';
import { Utils } from '@/utils/utils';

export class LibraryLogic {
	static getAdventures = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getAdventures(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getAncestries = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getAncestries(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getCareers = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getCareers(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getClasses = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getClasses(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)),
					...item.abilities.flatMap(a => a.name),
					...item.subclasses.map(sc => sc.name),
					...item.subclasses.flatMap(sc => sc.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name)))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getComplications = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getComplications(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getCultures = (sourcebooks: Sourcebook[], searchTerm: string, showCulturesFromAncestries: boolean) => {
		try {
			return SourcebookLogic
				.getCultures(sourcebooks, showCulturesFromAncestries)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getDomains = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getDomains(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getEncounters = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getEncounters(sourcebooks)
				.filter(item => !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getImbuements = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getImbuements(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getItems = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getItems(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.keywords,
					...item.featuresByLevel.flatMap(lvl => lvl.features.map(f => f.name))
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getKits = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getKits(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getMonsterGroups = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getMonsterGroups(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.monsters.map(m => m.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getMonsters = (sourcebooks: Sourcebook[], searchTerm: string, filter: MonsterFilter) => {
		try {
			return SourcebookLogic
				.getMonsters(sourcebooks)
				.filter(item => MonsterLogic.matches(item, filter))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getMontages = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getMontages(sourcebooks)
				.filter(item => !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getNegotiations = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getNegotiations(sourcebooks)
				.filter(item => !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getPerks = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getPerks(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getProjects = (sourcebooks: Sourcebook[], searchTerm: string, showProjectsFromImbuements: boolean, showProjectsFromItems: boolean) => {
		try {
			return SourcebookLogic
				.getProjects(sourcebooks, showProjectsFromImbuements, showProjectsFromItems)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getSubclasses = (sourcebooks: Sourcebook[], searchTerm: string, showSubclassesFromClasses: boolean) => {
		try {
			return SourcebookLogic
				.getSubclasses(sourcebooks, showSubclassesFromClasses)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getTacticalMaps = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getTacticalMaps(sourcebooks)
				.filter(item => !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getTerrainObjects = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getTerrains(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	static getTitles = (sourcebooks: Sourcebook[], searchTerm: string) => {
		try {
			return SourcebookLogic
				.getTitles(sourcebooks)
				.filter(item => Utils.textMatches([
					item.name,
					item.description,
					...item.features.map(f => f.name)
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	///////////////////////////////////////////////////////////////////////////

	static getSourcebook = (element: Element, category: SourcebookElementKind, sourcebooks: Sourcebook[], showMonsters: boolean) => {
		let sourcebook: Sourcebook | undefined;

		switch (category) {
			case 'adventure':
				sourcebook = SourcebookLogic.getAdventureSourcebook(sourcebooks, element as Adventure);
				break;
			case 'ancestry':
				sourcebook = SourcebookLogic.getAncestrySourcebook(sourcebooks, element as Ancestry);
				break;
			case 'career':
				sourcebook = SourcebookLogic.getCareerSourcebook(sourcebooks, element as Career);
				break;
			case 'class':
				sourcebook = SourcebookLogic.getClassSourcebook(sourcebooks, element as HeroClass);
				break;
			case 'complication':
				sourcebook = SourcebookLogic.getComplicationSourcebook(sourcebooks, element as Complication);
				break;
			case 'culture':
				sourcebook = SourcebookLogic.getCultureSourcebook(sourcebooks, element as Culture);
				break;
			case 'domain':
				sourcebook = SourcebookLogic.getDomainSourcebook(sourcebooks, element as Domain);
				break;
			case 'encounter':
				sourcebook = SourcebookLogic.getEncounterSourcebook(sourcebooks, element as Encounter);
				break;
			case 'imbuement':
				sourcebook = SourcebookLogic.getImbuementSourcebook(sourcebooks, element as Imbuement);
				break;
			case 'item':
				sourcebook = SourcebookLogic.getItemSourcebook(sourcebooks, element as Item);
				break;
			case 'kit':
				sourcebook = SourcebookLogic.getKitSourcebook(sourcebooks, element as Kit);
				break;
			case 'monster-group':
				sourcebook = showMonsters ?
					SourcebookLogic.getMonsterSourcebook(sourcebooks, element as Monster)
					:
					SourcebookLogic.getMonsterGroupSourcebook(sourcebooks, element as MonsterGroup);
				break;
			case 'montage':
				sourcebook = SourcebookLogic.getMontageSourcebook(sourcebooks, element as Montage);
				break;
			case 'negotiation':
				sourcebook = SourcebookLogic.getNegotiationSourcebook(sourcebooks, element as Negotiation);
				break;
			case 'perk':
				sourcebook = SourcebookLogic.getPerkSourcebook(sourcebooks, element as Perk);
				break;
			case 'project':
				sourcebook = SourcebookLogic.getProjectSourcebook(sourcebooks, element as Project);
				break;
			case 'subclass':
				sourcebook = SourcebookLogic.getSubclassSourcebook(sourcebooks, element as SubClass);
				break;
			case 'tactical-map':
				sourcebook = SourcebookLogic.getTacticalMapSourcebook(sourcebooks, element as TacticalMap);
				break;
			case 'terrain':
				sourcebook = SourcebookLogic.getTerrainSourcebook(sourcebooks, element as Terrain);
				break;
			case 'title':
				sourcebook = SourcebookLogic.getTitleSourcebook(sourcebooks, element as Title);
				break;
		}

		return sourcebook || null;
	};

	static getInfo = (element: Element, category: SourcebookElementKind, showMonsters: boolean) => {
		if ((category === 'monster-group') && !showMonsters) {
			return (element as MonsterGroup).monsters.length;
		}

		return undefined;
	};

	static getGroupHeader = (element: Element, category: SourcebookElementKind, sourcebooks: Sourcebook[]) => {
		if (category === 'culture') {
			const culture = element as Culture;
			return culture.type;
		}

		if (category === 'item') {
			const item = element as Item;
			return item.type;
		}

		if (category === 'imbuement') {
			const imbuement = element as Imbuement;
			return `Level ${imbuement.level}`;
		}

		if (category === 'kit') {
			const kit = element as Kit;
			if (kit.type) {
				return kit.type;
			}
		}

		if (category === 'perk') {
			const perk = element as Perk;
			return perk.list;
		}

		if (category === 'project') {
			const project = element as Project;
			if (project.name.startsWith('Craft')) {
				return 'Crafting';
			}
			if (project.name.startsWith('Imbue')) {
				return 'Imbuing';
			}
			return 'Misc';
		}

		if (category === 'subclass') {
			const c = SourcebookLogic.getClasses(sourcebooks).find(c => c.subclasses.some(sc => sc.id === element.id));
			if (c) {
				return c.name;
			}
		}

		if (category === 'title') {
			const title = element as Title;
			return `Echelon ${title.echelon}`;
		}

		return null;
	};

	///////////////////////////////////////////////////////////////////////////

	static getExternalContent = (element: Element, category: SourcebookElementKind, sourcebooks: Sourcebook[]) => {
		// Which sourcebooks do we care about?
		const data = sourcebooks
			.filter(sb => sb.type === SourcebookType.Homebrew)
			.filter(sb => !SourcebookLogic.getElements(sb).map(e => e.element.id).includes(element.id))
			.map(sb => {
				const elements = SourcebookLogic.getElements(sb);
				return {
					sourcebook: sb,
					elements: elements,
					elementIDs: elements.map(e => e.element.id)
				};
			});

		const external: { element: Element, sourcebook: Sourcebook }[] = [];

		const contentIDs: string[] = [];
		switch (category) {
			case 'adventure': {
				const adventure = element as Adventure;
				contentIDs.push(...AdventureLogic.getContentIDs(adventure.plot));
				break;
			}
			case 'encounter': {
				const encounter = element as Encounter;
				contentIDs.push(...EncounterLogic.getContentIDs(encounter, sourcebooks));
				break;
			}
		}
		contentIDs.forEach(id => {
			const sourcebookData = data.find(sb => sb.elementIDs.includes(id));
			if (sourcebookData) {
				const elementData = sourcebookData.elements.find(e => e.element.id === id);
				if (elementData) {
					external.push({
						element: elementData.element,
						sourcebook: sourcebookData.sourcebook
					});

					if (elementData.type === 'encounter') {
						external.push(...LibraryLogic.getExternalContent(elementData.element, 'encounter', sourcebooks));
					}
				}
			}
		});

		return external;
	};
};
