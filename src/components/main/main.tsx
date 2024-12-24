import { ReactNode, useState } from 'react';
import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { AncestryModal } from '../modals/ancestry/ancestry-modal';
import { Career } from '../../models/career';
import { CareerModal } from '../modals/career/career-modal';
import { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { ClassModal } from '../modals/class/class-modal';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { ComplicationModal } from '../modals/complication/complication-modal';
import { Culture } from '../../models/culture';
import { CultureModal } from '../modals/culture/culture-modal';
import { Domain } from '../../models/domain';
import { DomainModal } from '../modals/domain/domain-modal';
import { Drawer } from 'antd';
import { Element } from '../../models/element';
import { Encounter } from '../../models/encounter';
import { EncounterEditPage } from '../pages/encounters/encounter-edit/encounter-edit';
import { EncounterListPage } from '../pages/encounters/encounter-list/encounter-list';
import { EncounterModal } from '../modals/encounter/encounter-modal';
import { FactoryLogic } from '../../logic/factory-logic';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/heroes/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroPage } from '../pages/heroes/hero-view/hero-view-page';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import { Item } from '../../models/item';
import { ItemModal } from '../modals/item/item-modal';
import { Kit } from '../../models/kit';
import { KitModal } from '../modals/kit/kit-modal';
import { LibraryEditPage } from '../pages/library/library-edit/library-edit';
import { LibraryListPage } from '../pages/library/library-list/library-list';
import { MonsterGroup } from '../../models/monster';
import { MonsterGroupModal } from '../modals/monster-group/monster-group-modal';
import { MonsterModal } from '../modals/monster/monster-modal';
import { Options } from '../../models/options';
import { Perk } from '../../models/perk';
import { PerkModal } from '../modals/perk/perk-modal';
import { Playbook } from '../../models/playbook';
import { RulesModal } from '../modals/rules/rules-modal';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookData } from '../../data/sourcebook-data';
import { SourcebookLogic } from '../../logic/sourcebook-logic';
import { SourcebooksModal } from '../modals/sourcebooks/sourcebooks-modal';
import { Title } from '../../models/title';
import { TitleModal } from '../modals/title/title-modal';
import { Utils } from '../../utils/utils';
import { WelcomePage } from '../pages/welcome/welcome-page';
import localforage from 'localforage';

import pbds from '../../assets/powered-by-draw-steel.png';

import './main.scss';

enum Page {
	Welcome,
	HeroList,
	HeroView,
	HeroEdit,
	LibraryList,
	LibraryEdit,
	EncounterList,
	EncounterEdit
}

interface Props {
	heroes: Hero[];
	playbook: Playbook;
	homebrewSourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	options: Options;
}

export const Main = (props: Props) => {
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ playbook, setPlaybook ] = useState<Playbook>(props.playbook);
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(props.homebrewSourcebooks);
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(props.hiddenSourcebookIDs);
	const [ options, setOptions ] = useState<Options>(props.options);
	const [ page, setPage ] = useState<Page>(Page.Welcome);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ selectedSourcebook, setSelectedSourcebook ] = useState<Sourcebook | null>(null);
	const [ selectedElement, setSelectedElement ] = useState<Element | null>(null);
	const [ selectedElementType, setSelectedElementType ] = useState<string>('');
	const [ selectedEncounter, setSelectedEncounter ] = useState<Encounter | null>(null);
	const [ drawer, setDrawer ] = useState<ReactNode>(null);

	//#region Persistence

	const persistHeroes = (heroes: Hero[]) => {
		localforage
			.setItem<Hero[]>('forgesteel-heroes', Collections.sort(heroes, h => h.name))
			.then(setHeroes);
	};

	const persistPlaybook = (playbook: Playbook) => {
		localforage
			.setItem<Playbook>('forgesteel-playbook', playbook)
			.then(setPlaybook);
	};

	const persistHomebrewSourcebooks = (homebrew: Sourcebook[]) => {
		localforage
			.setItem<Sourcebook[]>('forgesteel-homebrew-settings', homebrew)
			.then(setHomebrewSourcebooks);
	};

	const persistHiddenSourcebookIDs = (ids: string[]) => {
		localforage
			.setItem<string[]>('forgesteel-hidden-setting-ids', ids)
			.then(setHiddenSourcebookIDs);
	};

	const persistOptions = (options: Options) => {
		localforage
			.setItem<Options>('forgesteel-options', options)
			.then(setOptions);
	};

	//#endregion

	//#region Pages

	const showWelcome = () => {
		setPage(Page.Welcome);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedEncounter(null);
	};

	const showHeroList = () => {
		setPage(Page.HeroList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedEncounter(null);
	};

	const showLibraryList = () => {
		setPage(Page.LibraryList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedEncounter(null);
	};

	const showEncounterList = () => {
		setPage(Page.EncounterList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedEncounter(null);
	};

	//#endregion

	//#region Heroes

	const addHero = () => {
		const hero = FactoryLogic.createHero([
			SourcebookData.core.id,
			SourcebookData.orden.id
		]);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroEdit);
		setSelectedHero(hero);
	};

	const importHero = (hero: Hero) => {
		hero.id = Utils.guid();
		HeroLogic.updateHero(hero);

		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		copy.push(hero);
		Collections.sort(copy, h => h.name);

		persistHeroes(copy);
		setPage(Page.HeroView);
		setSelectedHero(hero);
		setDrawer(null);
	};

	const viewHero = (heroID: string) => {
		const hero = heroes.find(h => h.id === heroID);
		if (hero) {
			setPage(Page.HeroView);
			setSelectedHero(hero);
		}
	};

	const closeSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroList);
			setSelectedHero(null);
		}
	};

	const editSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroEdit);
		}
	};

	const exportSelectedHero = (format: 'image' | 'pdf' | 'json') => {
		if (selectedHero) {
			const ids = (format === 'pdf') ? [ 'stats', 'actions', 'maneuvers', 'moves', 'triggers', 'others' ] : [ selectedHero.id ];
			Utils.export(ids, selectedHero.name || 'Unnamed Hero', selectedHero, 'hero', format);
		}
	};

	const deleteSelectedHero = () => {
		if (selectedHero) {
			const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
			persistHeroes(copy.filter(h => h.id !== selectedHero.id));
			setPage(Page.HeroList);
			setSelectedHero(null);
		}
	};

	const saveEditSelectedHero = (hero: Hero) => {
		if (selectedHero) {
			const list = JSON.parse(JSON.stringify(heroes)) as Hero[];
			const index = list.findIndex(h => h.id === hero.id);
			if (index !== -1) {
				list[index] = hero;
				persistHeroes(list);
				setPage(Page.HeroView);
				setSelectedHero(hero);
			}
		}
	};

	const cancelEditSelectedHero = () => {
		if (selectedHero) {
			setPage(Page.HeroView);
		}
	};

	//#endregion

	//#region Library

	const createHomebrewElement = (type: string, sourcebookID: string | null) => {
		const sourcebook = homebrewSourcebooks.find(cs => cs.id === sourcebookID) || null;
		switch (type) {
			case 'Ancestry':
				createAncestry(null, sourcebook);
				break;
			case 'Culture':
				createCulture(null, sourcebook);
				break;
			case 'Career':
				createCareer(null, sourcebook);
				break;
			case 'Class':
				createClass(null, sourcebook);
				break;
			case 'Complication':
				createComplication(null, sourcebook);
				break;
			case 'Kit':
				createKit(null, sourcebook);
				break;
			case 'Perk':
				createPerk(null, sourcebook);
				break;
			case 'Title':
				createTitle(null, sourcebook);
				break;
			case 'Item':
				createItem(null, sourcebook);
				break;
			case 'Monster Group':
				createMonsterGroup(null, sourcebook);
				break;
		}
	};

	const importHomebrewElement = (type: string, sourcebookID: string | null, element: Element) => {
		element.id = Utils.guid();

		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		let sourcebook = sourcebooks.find(cs => cs.id === sourcebookID);
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		}
		if (sourcebook) {
			switch(type) {
				case 'Ancestry':
					sourcebook.ancestries.push(element as Ancestry);
					Collections.sort(sourcebook.ancestries, item => item.name);
					break;
				case 'Culture':
					sourcebook.cultures.push(element as Culture);
					Collections.sort(sourcebook.cultures, item => item.name);
					break;
				case 'Career':
					sourcebook.careers.push(element as Career);
					Collections.sort(sourcebook.careers, item => item.name);
					break;
				case 'Class':
					sourcebook.classes.push(element as HeroClass);
					Collections.sort(sourcebook.classes, item => item.name);
					break;
				case 'Complication':
					sourcebook.complications.push(element as Complication);
					Collections.sort(sourcebook.complications, item => item.name);
					break;
				case 'Domain':
					sourcebook.domains.push(element as Domain);
					Collections.sort(sourcebook.domains, item => item.name);
					break;
				case 'Kit':
					sourcebook.kits.push(element as Kit);
					Collections.sort(sourcebook.kits, item => item.name);
					break;
				case 'Perk':
					sourcebook.perks.push(element as Perk);
					Collections.sort(sourcebook.perks, item => item.name);
					break;
				case 'Title':
					sourcebook.titles.push(element as Title);
					Collections.sort(sourcebook.titles, item => item.name);
					break;
				case 'Item':
					sourcebook.items.push(element as Item);
					Collections.sort(sourcebook.items, item => item.name);
					break;
				case 'Monster Group':
					sourcebook.monsterGroups.push(element as MonsterGroup);
					Collections.sort(sourcebook.monsterGroups, item => item.name);
					break;
			}
		}

		persistHomebrewSourcebooks(sourcebooks);
		setPage(Page.LibraryList);
		setDrawer(null);
	};

	const createAncestry = (original: Ancestry | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let ancestry: Ancestry;
		if (original) {
			ancestry = JSON.parse(JSON.stringify(original)) as Ancestry;
			ancestry.id = Utils.guid();
		} else {
			ancestry = FactoryLogic.createAncestry();
		}

		sourcebook.ancestries.push(ancestry);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectAncestry(ancestry);
		} else {
			editAncestry(ancestry, sourcebook);
		}
	};

	const createCulture = (original: Culture | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let culture: Culture;
		if (original) {
			culture = JSON.parse(JSON.stringify(original)) as Culture;
			culture.id = Utils.guid();
		} else {
			culture = FactoryLogic.createCulture();
		}

		sourcebook.cultures.push(culture);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectCulture(culture);
		} else {
			editCulture(culture, sourcebook);
		}
	};

	const createCareer = (original: Career | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let career: Career;
		if (original) {
			career = JSON.parse(JSON.stringify(original)) as Career;
			career.id = Utils.guid();
		} else {
			career = FactoryLogic.createCareer();
		}

		sourcebook.careers.push(career);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectCareer(career);
		} else {
			editCareer(career, sourcebook);
		}
	};

	const createClass = (original: HeroClass | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let heroClass: HeroClass;
		if (original) {
			heroClass = JSON.parse(JSON.stringify(original)) as HeroClass;
			heroClass.id = Utils.guid();
		} else {
			heroClass = FactoryLogic.createClass();
		}

		sourcebook.classes.push(heroClass);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectClass(heroClass);
		} else {
			editClass(heroClass, sourcebook);
		}
	};

	const createComplication = (original: Complication | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let complication: Complication;
		if (original) {
			complication = JSON.parse(JSON.stringify(original)) as Complication;
			complication.id = Utils.guid();
		} else {
			complication = FactoryLogic.createComplication();
		}

		sourcebook.complications.push(complication);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectComplication(complication);
		} else {
			editComplication(complication, sourcebook);
		}
	};

	const createDomain = (original: Domain | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let domain: Domain;
		if (original) {
			domain = JSON.parse(JSON.stringify(original)) as Domain;
			domain.id = Utils.guid();
		} else {
			domain = FactoryLogic.createDomain();
		}

		sourcebook.domains.push(domain);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectDomain(domain);
		} else {
			editDomain(domain, sourcebook);
		}
	};

	const createKit = (original: Kit | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let kit: Kit;
		if (original) {
			kit = JSON.parse(JSON.stringify(original)) as Kit;
			kit.id = Utils.guid();
		} else {
			kit = FactoryLogic.createKit();
		}

		sourcebook.kits.push(kit);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectKit(kit);
		} else {
			editKit(kit, sourcebook);
		}
	};

	const createPerk = (original: Perk | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let perk: Perk;
		if (original) {
			perk = JSON.parse(JSON.stringify(original)) as Perk;
			perk.id = Utils.guid();
		} else {
			perk = FactoryLogic.createPerk();
		}

		sourcebook.perks.push(perk);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectPerk(perk);
		} else {
			editPerk(perk, sourcebook);
		}
	};

	const createTitle = (original: Title | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let title: Title;
		if (original) {
			title = JSON.parse(JSON.stringify(original)) as Title;
			title.id = Utils.guid();
		} else {
			title = FactoryLogic.createTitle();
		}

		sourcebook.titles.push(title);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectTitle(title);
		} else {
			editTitle(title, sourcebook);
		}
	};

	const createItem = (original: Item | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let item: Item;
		if (original) {
			item = JSON.parse(JSON.stringify(original)) as Item;
			item.id = Utils.guid();
		} else {
			item = FactoryLogic.createItem();
		}

		sourcebook.items.push(item);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectItem(item);
		} else {
			editItem(item, sourcebook);
		}
	};

	const createMonsterGroup = (original: MonsterGroup | null, sourcebook: Sourcebook | null) => {
		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		} else {
			const id = sourcebook.id;
			sourcebook = sourcebooks.find(cs => cs.id === id) as Sourcebook;
		}

		let monsterGroup: MonsterGroup;
		if (original) {
			monsterGroup = JSON.parse(JSON.stringify(original)) as MonsterGroup;
			monsterGroup.id = Utils.guid();
		} else {
			monsterGroup = FactoryLogic.createMonsterGroup();
		}

		sourcebook.monsterGroups.push(monsterGroup);
		persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectMonsterGroup(monsterGroup);
		} else {
			editMonsterGroup(monsterGroup, sourcebook);
		}
	};

	const editAncestry = (ancestry: Ancestry, sourcebook: Sourcebook) => {
		setSelectedElement(ancestry);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Ancestry');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editCulture = (culture: Culture, sourcebook: Sourcebook) => {
		setSelectedElement(culture);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Culture');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editCareer = (career: Career, sourcebook: Sourcebook) => {
		setSelectedElement(career);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Career');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editClass = (heroClass: HeroClass, sourcebook: Sourcebook) => {
		setSelectedElement(heroClass);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Class');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editComplication = (complication: Complication, sourcebook: Sourcebook) => {
		setSelectedElement(complication);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Complication');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editDomain = (domain: Domain, sourcebook: Sourcebook) => {
		setSelectedElement(domain);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Domain');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editKit = (kit: Kit, sourcebook: Sourcebook) => {
		setSelectedElement(kit);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Kit');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editPerk = (perk: Perk, sourcebook: Sourcebook) => {
		setSelectedElement(perk);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Perk');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editTitle = (title: Title, sourcebook: Sourcebook) => {
		setSelectedElement(title);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Title');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editItem = (item: Item, sourcebook: Sourcebook) => {
		setSelectedElement(item);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Item');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const editMonsterGroup = (monsterGroup: MonsterGroup, sourcebook: Sourcebook) => {
		setSelectedElement(monsterGroup);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Monster Group');
		setPage(Page.LibraryEdit);
		setDrawer(null);
	};

	const deleteAncestry = (ancestry: Ancestry) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.ancestries = cs.ancestries.filter(a => a.id !== ancestry.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteCulture = (culture: Culture) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.cultures = cs.cultures.filter(c => c.id !== culture.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteCareer = (career: Career) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.careers = cs.careers.filter(c => c.id !== career.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteClass = (heroClass: HeroClass) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.classes = cs.classes.filter(c => c.id !== heroClass.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteComplication = (complication: Complication) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.complications = cs.complications.filter(c => c.id !== complication.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteDomain = (domain: Domain) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.domains = cs.domains.filter(d => d.id !== domain.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteKit = (kit: Kit) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.kits = cs.kits.filter(k => k.id !== kit.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deletePerk = (perk: Perk) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.perks = cs.perks.filter(p => p.id !== perk.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteTitle = (title: Title) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.titles = cs.titles.filter(t => t.id !== title.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteItem = (item: Item) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.items = cs.items.filter(i => i.id !== item.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const deleteMonsterGroup = (monsterGroup: MonsterGroup) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.monsterGroups = cs.monsterGroups.filter(mg => mg.id !== monsterGroup.id);
		});
		persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const saveEditSelectedElement = (element: Element) => {
		if (selectedElement) {
			const list = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
			const sourcebook = list.find(cs => cs.id === (selectedSourcebook as Sourcebook).id);
			if (sourcebook) {
				switch (selectedElementType) {
					case 'Ancestry': {
						const ancestryIndex = sourcebook.ancestries.findIndex(a => a.id === element.id);
						if (ancestryIndex !== -1) {
							sourcebook.ancestries[ancestryIndex] = element as Ancestry;
						}
					}
						break;
					case 'Culture': {
						const cultureIndex = sourcebook.cultures.findIndex(c => c.id === element.id);
						if (cultureIndex !== -1) {
							sourcebook.cultures[cultureIndex] = element as Culture;
						}
					}
						break;
					case 'Career': {
						const careerIndex = sourcebook.careers.findIndex(c => c.id === element.id);
						if (careerIndex !== -1) {
							sourcebook.careers[careerIndex] = element as Career;
						}
					}
						break;
					case 'Class': {
						const classIndex = sourcebook.classes.findIndex(c => c.id === element.id);
						if (classIndex !== -1) {
							sourcebook.classes[classIndex] = element as HeroClass;
						}
					}
						break;
					case 'Complication': {
						const complicationIndex = sourcebook.complications.findIndex(c => c.id === element.id);
						if (complicationIndex !== -1) {
							sourcebook.complications[complicationIndex] = element as Complication;
						}
					}
						break;
					case 'Domain': {
						const domainIndex = sourcebook.domains.findIndex(d => d.id === element.id);
						if (domainIndex !== -1) {
							sourcebook.domains[domainIndex] = element as Domain;
						}
					}
						break;
					case 'Kit': {
						const kitIndex = sourcebook.kits.findIndex(k => k.id === element.id);
						if (kitIndex !== -1) {
							sourcebook.kits[kitIndex] = element as Kit;
						}
					}
						break;
					case 'Perk': {
						const perkIndex = sourcebook.perks.findIndex(p => p.id === element.id);
						if (perkIndex !== -1) {
							sourcebook.perks[perkIndex] = element as Perk;
						}
					}
						break;
					case 'Title': {
						const titleIndex = sourcebook.titles.findIndex(t => t.id === element.id);
						if (titleIndex !== -1) {
							sourcebook.titles[titleIndex] = element as Title;
						}
					}
						break;
					case 'Item': {
						const itemIndex = sourcebook.items.findIndex(i => i.id === element.id);
						if (itemIndex !== -1) {
							sourcebook.items[itemIndex] = element as Item;
						}
					}
						break;
					case 'Monster Group': {
						const monsterGroupIndex = sourcebook.monsterGroups.findIndex(mg => mg.id === element.id);
						if (monsterGroupIndex !== -1) {
							sourcebook.monsterGroups[monsterGroupIndex] = element as MonsterGroup;
						}
					}
						break;
				}
			};

			persistHomebrewSourcebooks(list);
			setPage(Page.LibraryList);
			setSelectedSourcebook(null);
			setSelectedElement(null);
			setSelectedElementType('');
		}
	};

	const cancelEditSelectedElement = () => {
		if (selectedElement) {
			setPage(Page.LibraryList);
		}
	};

	//#endregion

	//#region Encounters

	const createEncounter = (original: Encounter | null) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;

		let encounter: Encounter;
		if (original) {
			encounter = JSON.parse(JSON.stringify(original)) as Encounter;
			encounter.id = Utils.guid();
		} else {
			encounter = FactoryLogic.createEncounter();
		}

		copy.encounters.push(encounter);
		persistPlaybook(copy);
		if (drawer) {
			onSelectEncounter(encounter);
		} else {
			editEncounter(encounter);
		}
	};

	const importEncounter = (encounter: Encounter) => {
		encounter.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters.push(encounter);
		Collections.sort(copy.encounters, item => item.name);

		persistPlaybook(copy);
		setPage(Page.EncounterList);
		setDrawer(null);
	};

	const editEncounter = (encounter: Encounter) => {
		setSelectedEncounter(encounter);
		setPage(Page.EncounterEdit);
		setDrawer(null);
	};

	const deleteEncounter = (encounter: Encounter) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters = copy.encounters.filter(enc => enc.id !== encounter.id);

		persistPlaybook(copy);
		setDrawer(null);
	};

	const saveEditSelectedEncounter = (encounter: Encounter) => {
		if (selectedEncounter) {
			const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
			const encounterIndex = copy.encounters.findIndex(enc => enc.id === encounter.id);
			if (encounterIndex !== -1) {
				copy.encounters[encounterIndex] = encounter;
			}

			persistPlaybook(copy);
			setSelectedEncounter(null);
			setPage(Page.EncounterList);
		}
	};

	const cancelEditSelectedEncounter = () => {
		if (selectedEncounter) {
			setPage(Page.EncounterList);
		}
	};

	//#endregion

	//#region Modals

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
	};

	const onSelectAncestry = (ancestry: Ancestry) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.ancestries.find(a => a.id === ancestry.id));

		setDrawer(
			<AncestryModal
				ancestry={ancestry}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.ancestries).find(a => a.id === ancestry.id)}
				createHomebrew={sourcebook => createAncestry(ancestry, sourcebook)}
				export={format => Utils.export([ ancestry.id ], ancestry.name || 'Ancestry', ancestry, 'ancestry', format)}
				edit={() => editAncestry(ancestry, container as Sourcebook)}
				delete={() => deleteAncestry(ancestry)}
			/>
		);
	};

	const onSelectCulture = (culture: Culture) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.cultures.find(c => c.id === culture.id));

		setDrawer(
			<CultureModal
				culture={culture}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.cultures).find(c => c.id === culture.id)}
				createHomebrew={sourcebook => createCulture(culture, sourcebook)}
				export={format => Utils.export([ culture.id ], culture.name || 'Culture', culture, 'culture', format)}
				edit={() => editCulture(culture, container as Sourcebook)}
				delete={() => deleteCulture(culture)}
			/>
		);
	};

	const onSelectCareer = (career: Career) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.careers.find(c => c.id === career.id));

		setDrawer(
			<CareerModal
				career={career}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.careers).find(c => c.id === career.id)}
				createHomebrew={sourcebook => createCareer(career, sourcebook)}
				export={format => Utils.export([ career.id ], career.name || 'Career', career, 'career', format)}
				edit={() => editCareer(career, container as Sourcebook)}
				delete={() => deleteCareer(career)}
			/>
		);
	};

	const onSelectClass = (heroClass: HeroClass) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.classes.find(c => c.id === heroClass.id));

		setDrawer(
			<ClassModal
				heroClass={heroClass}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.classes).find(c => c.id === heroClass.id)}
				createHomebrew={sourcebook => createClass(heroClass, sourcebook)}
				export={format => Utils.export([ heroClass.id ], heroClass.name || 'Class', heroClass, 'class', format)}
				edit={() => editClass(heroClass, container as Sourcebook)}
				delete={() => deleteClass(heroClass)}
			/>
		);
	};

	const onSelectComplication = (complication: Complication) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.complications.find(c => c.id === complication.id));

		setDrawer(
			<ComplicationModal
				complication={complication}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.complications).find(c => c.id === complication.id)}
				createHomebrew={sourcebook => createComplication(complication, sourcebook)}
				export={format => Utils.export([ complication.id ], complication.name || 'Complication', complication, 'complication', format)}
				edit={() => editComplication(complication, container as Sourcebook)}
				delete={() => deleteComplication(complication)}
			/>
		);
	};

	const onSelectDomain = (domain: Domain) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.domains.find(d => d.id === domain.id));

		setDrawer(
			<DomainModal
				domain={domain}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.domains).find(d => d.id === domain.id)}
				createHomebrew={sourcebook => createDomain(domain, sourcebook)}
				export={format => Utils.export([ domain.id ], domain.name || 'Domain', domain, 'domain', format)}
				edit={() => editDomain(domain, container as Sourcebook)}
				delete={() => deleteDomain(domain)}
			/>
		);
	};

	const onSelectKit = (kit: Kit) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.kits.find(k => k.id === kit.id));

		setDrawer(
			<KitModal
				kit={kit}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.kits).find(k => k.id === kit.id)}
				createHomebrew={sourcebook => createKit(kit, sourcebook)}
				export={format => Utils.export([ kit.id ], kit.name || 'Kit', kit, 'kit', format)}
				edit={() => editKit(kit, container as Sourcebook)}
				delete={() => deleteKit(kit)}
			/>
		);
	};

	const onSelectPerk = (perk: Perk) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.perks.find(p => p.id === perk.id));

		setDrawer(
			<PerkModal
				perk={perk}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.perks).find(p => p.id === perk.id)}
				createHomebrew={sourcebook => createPerk(perk, sourcebook)}
				export={format => Utils.export([ perk.id ], perk.name || 'Perk', perk, 'perk', format)}
				edit={() => editPerk(perk, container as Sourcebook)}
				delete={() => deletePerk(perk)}
			/>
		);
	};

	const onSelectTitle = (title: Title) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.titles.find(t => t.id === title.id));

		setDrawer(
			<TitleModal
				title={title}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.titles).find(t => t.id === title.id)}
				createHomebrew={sourcebook => createTitle(title, sourcebook)}
				export={format => Utils.export([ title.id ], title.name || 'Title', title, 'title', format)}
				edit={() => editTitle(title, container as Sourcebook)}
				delete={() => deleteTitle(title)}
			/>
		);
	};

	const onSelectItem = (item: Item) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.items.find(i => i.id === item.id));

		setDrawer(
			<ItemModal
				item={item}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.items).find(i => i.id === item.id)}
				createHomebrew={sourcebook => createItem(item, sourcebook)}
				export={format => Utils.export([ item.id ], item.name || 'Item', item, 'item', format)}
				edit={() => editItem(item, container as Sourcebook)}
				delete={() => deleteItem(item)}
			/>
		);
	};

	const onSelectMonsterGroup = (monsterGroup: MonsterGroup) => {
		const container = SourcebookLogic
			.getSourcebooks(homebrewSourcebooks)
			.find(cs => cs.monsterGroups.find(mg => mg.id === monsterGroup.id));

		setDrawer(
			<MonsterGroupModal
				monsterGroup={monsterGroup}
				homebrewSourcebooks={homebrewSourcebooks}
				isHomebrew={!!homebrewSourcebooks.flatMap(cs => cs.monsterGroups).find(mg => mg.id === monsterGroup.id)}
				playbook={playbook}
				createHomebrew={sourcebook => createMonsterGroup(monsterGroup, sourcebook)}
				export={format => Utils.export([ monsterGroup.id ], monsterGroup.name || 'Monster Group', monsterGroup, 'monster-group', format)}
				edit={() => editMonsterGroup(monsterGroup, container as Sourcebook)}
				delete={() => deleteMonsterGroup(monsterGroup)}
			/>
		);
	};

	const onSelectMonster = (monsterID: string) => {
		const monster = SourcebookLogic.getMonster([ SourcebookData.core, SourcebookData.orden, ...homebrewSourcebooks ], monsterID);
		const monsterGroup = SourcebookLogic.getMonsterGroup([ SourcebookData.core, SourcebookData.orden, ...homebrewSourcebooks ], monsterID);

		if (monster && monsterGroup) {
			setDrawer(
				<MonsterModal
					monster={monster}
					monsterGroup={monsterGroup}
					playbook={playbook}
					export={format => Utils.export([ monster.id ], monster.name || 'Monster', monster, 'monster', format)}
				/>
			);
		}
	};

	const onSelectEncounter = (encounter: Encounter) => {
		setDrawer(
			<EncounterModal
				encounter={encounter}
				playbook={playbook}
				sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
				export={format => Utils.export([ encounter.id ], encounter.name || 'Encounter', encounter, 'encounter', format)}
				edit={() => editEncounter(encounter)}
				delete={() => deleteEncounter(encounter)}
			/>
		);
	};

	const onSelectCharacteristic = (characteristic: Characteristic, hero: Hero) => {
		setDrawer(
			<CharacteristicModal characteristic={characteristic} hero={hero} />
		);
	};

	const onSelectAbility = (ability: Ability, hero: Hero) => {
		setDrawer(
			<AbilityModal ability={ability} hero={hero} />
		);
	};

	const onShowHeroState = (page: 'hero' | 'stats' | 'conditions') => {
		if (selectedHero) {
			setDrawer(
				<HeroStateModal
					hero={selectedHero}
					startPage={page}
					onChange={updatedHero => {
						const list = JSON.parse(JSON.stringify(heroes)) as Hero[];
						const index = list.findIndex(h => h.id === updatedHero.id);
						if (index !== -1) {
							list[index] = updatedHero;
							persistHeroes(list);
							setSelectedHero(updatedHero);
						}
					}}
					onLevelUp={() => {
						if (selectedHero && selectedHero.class) {
							selectedHero.class.level += 1;
							const list = JSON.parse(JSON.stringify(heroes)) as Hero[];
							const index = list.findIndex(h => h.id === selectedHero.id);
							if (index !== -1) {
								list[index] = selectedHero;
								persistHeroes(list);
								setPage(Page.HeroEdit);
								setDrawer(null);
							}
						}
					}}
				/>
			);
		}
	};

	const onShowRules = () => {
		if (selectedHero) {
			setDrawer(
				<RulesModal
					hero={selectedHero}
					sourcebooks={[ SourcebookData.core, SourcebookData.orden, ...homebrewSourcebooks ]}
				/>
			);
		}
	};

	const showSourcebooks = () => {
		setDrawer(
			<SourcebooksModal
				officialSourcebooks={[ SourcebookData.core, SourcebookData.orden ]}
				homebrewSourcebooks={homebrewSourcebooks}
				hiddenSourcebookIDs={hiddenSourcebookIDs}
				onHomebrewSourcebookChange={persistHomebrewSourcebooks}
				onHiddenSourcebookIDsChange={persistHiddenSourcebookIDs}
			/>
		);
	};

	//#endregion

	const getContent = () => {
		switch (page) {
			case Page.Welcome:
				return (
					<WelcomePage
						showAbout={showAbout}
						showHeroes={heroes.length === 0 ? addHero : showHeroList}
						showLibrary={showLibraryList}
						showEncounters={showEncounterList}
					/>
				);
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						addHero={addHero}
						importHero={importHero}
						viewHero={viewHero}
					/>
				);
			case Page.HeroView:
				return (
					<HeroPage
						hero={selectedHero as Hero}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						options={options}
						setOptions={persistOptions}
						goHome={showWelcome}
						showAbout={showAbout}
						closeHero={closeSelectedHero}
						editHero={editSelectedHero}
						exportHero={exportSelectedHero}
						deleteHero={deleteSelectedHero}
						onSelectAncestry={onSelectAncestry}
						onSelectCulture={onSelectCulture}
						onSelectCareer={onSelectCareer}
						onSelectClass={onSelectClass}
						onSelectComplication={onSelectComplication}
						onSelectDomain={onSelectDomain}
						onSelectKit={onSelectKit}
						onSelectCharacteristic={onSelectCharacteristic}
						onSelectAbility={onSelectAbility}
						onShowHeroState={onShowHeroState}
						onShowRules={onShowRules}
					/>
				);
			case Page.HeroEdit:
				return (
					<HeroEditPage
						hero={selectedHero as Hero}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
			case Page.LibraryList:
				return (
					<LibraryListPage
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						hiddenSourcebookIDs={hiddenSourcebookIDs}
						goHome={showWelcome}
						showAbout={showAbout}
						showSourcebooks={showSourcebooks}
						viewAncestry={onSelectAncestry}
						viewCulture={onSelectCulture}
						viewCareer={onSelectCareer}
						viewClass={onSelectClass}
						viewComplication={onSelectComplication}
						viewDomain={onSelectDomain}
						viewKit={onSelectKit}
						viewPerk={onSelectPerk}
						viewTitle={onSelectTitle}
						viewItem={onSelectItem}
						viewMonsterGroup={onSelectMonsterGroup}
						onCreateHomebrew={createHomebrewElement}
						onImportHomebrew={importHomebrewElement}
					/>
				);
			case Page.LibraryEdit:
				return (
					<LibraryEditPage
						element={selectedElement as Ancestry | Culture | Career | HeroClass | Complication | Domain | Kit | Perk | Item | MonsterGroup}
						elementType={selectedElementType}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedElement}
						cancelChanges={cancelEditSelectedElement}
					/>
				);
			case Page.EncounterList:
				return (
					<EncounterListPage
						playbook={playbook}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						viewEncounter={onSelectEncounter}
						onCreateEncounter={() => createEncounter(null)}
						onImportEncounter={importEncounter}
					/>
				);
			case Page.EncounterEdit:
				return (
					<EncounterEditPage
						encounter={selectedEncounter as Encounter}
						playbook={playbook}
						sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						showMonster={onSelectMonster}
						saveChanges={saveEditSelectedEncounter}
						cancelChanges={cancelEditSelectedEncounter}
					/>
				);
		}
	};

	return (
		<div className='main'>
			<div className='main-content'>
				{getContent()}
			</div>
			<div className='main-footer'>
				<div className='main-footer-section'>
					<img className='ds-logo' src={pbds} />
					FORGE STEEL is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC
				</div>
				<div className='main-footer-section'>
					DRAW STEEL © 2024 MCDM Productions, LLC
				</div>
				<div className='main-footer-section'>
					Designed by Andy Aiken
				</div>
			</div>
			<Drawer open={drawer !== null} onClose={() => setDrawer(null)} closeIcon={null} width='500px'>
				{drawer}
			</Drawer>
		</div>
	);
};
