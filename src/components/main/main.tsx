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
import { CollectionsModal } from '../modals/collections/collections-modal';
import { Complication } from '../../models/complication';
import { ComplicationModal } from '../modals/complication/complication-modal';
import { Culture } from '../../models/culture';
import { CultureModal } from '../modals/culture/culture-modal';
import { Domain } from '../../models/domain';
import { DomainModal } from '../modals/domain/domain-modal';
import { Drawer } from 'antd';
import { Element } from '../../models/element';
import { ElementEditPage } from '../pages/elements/element-edit/element-edit';
import { ElementListPage } from '../pages/elements/element-list/element-list';
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
import { MonsterEditPage } from '../pages/monsters/monster-edit/monster-edit';
import { MonsterGroup } from '../../models/monster';
import { MonsterGroupModal } from '../modals/monster-group/monster-group-modal';
import { MonsterListPage } from '../pages/monsters/monster-list/monster-list';
import { Options } from '../../models/options';
import { Perk } from '../../models/perk';
import { PerkModal } from '../modals/perk/perk-modal';
import { Playbook } from '../../models/playbook';
import { RulesModal } from '../modals/rules/rules-modal';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookData } from '../../data/sourcebook-data';
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
	ElementList,
	ElementEdit,
	MonsterList,
	MonsterEdit
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
	const [ selectedMonsterGroup, setSelectedMonsterGroup ] = useState<MonsterGroup | null>(null);
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
		setSelectedMonsterGroup(null);
	};

	const showHeroList = () => {
		setPage(Page.HeroList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedMonsterGroup(null);
	};

	const showElementList = () => {
		setPage(Page.ElementList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedMonsterGroup(null);
	};

	const showMonsterList = () => {
		setPage(Page.MonsterList);
		setSelectedHero(null);
		setSelectedSourcebook(null);
		setSelectedElement(null);
		setSelectedElementType('');
		setSelectedMonsterGroup(null);
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
			const ids = (format === 'pdf') ? [ 'stats', 'actions', 'maneuvers', 'triggers', 'others' ] : [ selectedHero.id ];
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

	//#region Elements

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
			case 'Item':
				createItem(null, sourcebook);
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
					sourcebook.ancestries.push(element as unknown as Ancestry);
					Collections.sort(sourcebook.ancestries, item => item.name);
					break;
				case 'Culture':
					sourcebook.cultures.push(element as unknown as Culture);
					Collections.sort(sourcebook.cultures, item => item.name);
					break;
				case 'Career':
					sourcebook.careers.push(element as unknown as Career);
					Collections.sort(sourcebook.careers, item => item.name);
					break;
				case 'Class':
					sourcebook.classes.push(element as unknown as HeroClass);
					Collections.sort(sourcebook.classes, item => item.name);
					break;
				case 'Complication':
					sourcebook.complications.push(element as unknown as Complication);
					Collections.sort(sourcebook.complications, item => item.name);
					break;
				case 'Domain':
					sourcebook.domains.push(element as unknown as Domain);
					Collections.sort(sourcebook.domains, item => item.name);
					break;
				case 'Kit':
					sourcebook.kits.push(element as unknown as Kit);
					Collections.sort(sourcebook.kits, item => item.name);
					break;
				case 'Perk':
					sourcebook.perks.push(element as unknown as Perk);
					Collections.sort(sourcebook.perks, item => item.name);
					break;
				case 'Item':
					sourcebook.items.push(element as unknown as Item);
					Collections.sort(sourcebook.items, item => item.name);
					break;
			}
		}

		persistHomebrewSourcebooks(sourcebooks);
		setPage(Page.ElementList);
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

	const editAncestry = (ancestry: Ancestry, sourcebook: Sourcebook) => {
		setSelectedElement(ancestry);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Ancestry');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editCulture = (culture: Culture, sourcebook: Sourcebook) => {
		setSelectedElement(culture);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Culture');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editCareer = (career: Career, sourcebook: Sourcebook) => {
		setSelectedElement(career);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Career');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editClass = (heroClass: HeroClass, sourcebook: Sourcebook) => {
		setSelectedElement(heroClass);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Class');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editComplication = (complication: Complication, sourcebook: Sourcebook) => {
		setSelectedElement(complication);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Complication');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editDomain = (domain: Domain, sourcebook: Sourcebook) => {
		setSelectedElement(domain);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Domain');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editKit = (kit: Kit, sourcebook: Sourcebook) => {
		setSelectedElement(kit);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Kit');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editPerk = (perk: Perk, sourcebook: Sourcebook) => {
		setSelectedElement(perk);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Perk');
		setPage(Page.ElementEdit);
		setDrawer(null);
	};

	const editItem = (item: Item, sourcebook: Sourcebook) => {
		setSelectedElement(item);
		setSelectedSourcebook(sourcebook);
		setSelectedElementType('Item');
		setPage(Page.ElementEdit);
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

	const deleteItem = (item: Item) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		copy.forEach(cs => {
			cs.items = cs.items.filter(i => i.id !== item.id);
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
							sourcebook.ancestries[ancestryIndex] = element as unknown as Ancestry;
						}
					}
						break;
					case 'Culture': {
						const cultureIndex = sourcebook.cultures.findIndex(c => c.id === element.id);
						if (cultureIndex !== -1) {
							sourcebook.cultures[cultureIndex] = element as unknown as Culture;
						}
					}
						break;
					case 'Career': {
						const careerIndex = sourcebook.careers.findIndex(c => c.id === element.id);
						if (careerIndex !== -1) {
							sourcebook.careers[careerIndex] = element as unknown as Career;
						}
					}
						break;
					case 'Class': {
						const classIndex = sourcebook.classes.findIndex(c => c.id === element.id);
						if (classIndex !== -1) {
							sourcebook.classes[classIndex] = element as unknown as HeroClass;
						}
					}
						break;
					case 'Complication': {
						const complicationIndex = sourcebook.complications.findIndex(c => c.id === element.id);
						if (complicationIndex !== -1) {
							sourcebook.complications[complicationIndex] = element as unknown as Complication;
						}
					}
						break;
					case 'Domain': {
						const domainIndex = sourcebook.domains.findIndex(d => d.id === element.id);
						if (domainIndex !== -1) {
							sourcebook.domains[domainIndex] = element as unknown as Domain;
						}
					}
						break;
					case 'Kit': {
						const kitIndex = sourcebook.kits.findIndex(k => k.id === element.id);
						if (kitIndex !== -1) {
							sourcebook.kits[kitIndex] = element as unknown as Kit;
						}
					}
						break;
					case 'Perk': {
						const perkIndex = sourcebook.perks.findIndex(p => p.id === element.id);
						if (perkIndex !== -1) {
							sourcebook.perks[perkIndex] = element as unknown as Perk;
						}
					}
						break;
					case 'Item': {
						const itemIndex = sourcebook.items.findIndex(i => i.id === element.id);
						if (itemIndex !== -1) {
							sourcebook.items[itemIndex] = element as unknown as Item;
						}
					}
						break;
				}
			};

			persistHomebrewSourcebooks(list);
			setPage(Page.ElementList);
			setSelectedSourcebook(null);
			setSelectedElement(null);
			setSelectedElementType('');
			setSelectedMonsterGroup(null);
		}
	};

	const cancelEditSelectedElement = () => {
		if (selectedElement) {
			setPage(Page.ElementList);
		}
	};

	//#endregion

	//#region Monsters

	const createMonsterGroup = (original: MonsterGroup | null) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;

		let monsterGroup: MonsterGroup;
		if (original) {
			monsterGroup = JSON.parse(JSON.stringify(original)) as MonsterGroup;
			monsterGroup.id = Utils.guid();
		} else {
			monsterGroup = FactoryLogic.createMonsterGroup();
		}

		copy.monsterGroups.push(monsterGroup);
		persistPlaybook(copy);
		if (drawer) {
			onSelectMonsterGroup(monsterGroup);
		} else {
			editMonsterGroup(monsterGroup);
		}
	};

	const importMonsterGroup = (monsterGroup: MonsterGroup) => {
		monsterGroup.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.monsterGroups.push(monsterGroup);
		Collections.sort(copy.monsterGroups, item => item.name);

		persistPlaybook(copy);
		setPage(Page.MonsterList);
		setDrawer(null);
	};

	const editMonsterGroup = (monsterGroup: MonsterGroup) => {
		setSelectedMonsterGroup(monsterGroup);
		setPage(Page.MonsterEdit);
		setDrawer(null);
	};

	const deleteMonsterGroup = (monsterGroup: MonsterGroup) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.monsterGroups = copy.monsterGroups.filter(mg => mg.id !== monsterGroup.id);

		persistPlaybook(copy);
		setDrawer(null);
	};

	const saveEditSelectedMonsterGroup = (monsterGroup: MonsterGroup) => {
		if (selectedMonsterGroup) {
			const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
			const monsterGroupIndex = copy.monsterGroups.findIndex(mg => mg.id === monsterGroup.id);
			if (monsterGroupIndex !== -1) {
				copy.monsterGroups[monsterGroupIndex] = monsterGroup;
			}

			persistPlaybook(copy);
			setSelectedMonsterGroup(null);
			setPage(Page.MonsterList);
		}
	};

	const cancelEditSelectedMonsterGroup = () => {
		if (selectedMonsterGroup) {
			setPage(Page.MonsterList);
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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
		const container = SourcebookData
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

	const onSelectItem = (item: Item) => {
		const container = SourcebookData
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
		setDrawer(
			<MonsterGroupModal
				monsterGroup={monsterGroup}
				export={format => Utils.export([ monsterGroup.id ], monsterGroup.name || 'Monster Group', monsterGroup, 'monster-group', format)}
				edit={() => editMonsterGroup(monsterGroup)}
				delete={() => deleteMonsterGroup(monsterGroup)}
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

	const showCollections = () => {
		setDrawer(
			<CollectionsModal
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
						showElements={showElementList}
						showMonsters={showMonsterList}
					/>
				);
			case Page.HeroList:
				return (
					<HeroListPage
						heroes={heroes}
						sourcebooks={SourcebookData.getSourcebooks(homebrewSourcebooks)}
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
						sourcebooks={SourcebookData.getSourcebooks(homebrewSourcebooks)}
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
						sourcebooks={SourcebookData.getSourcebooks(homebrewSourcebooks)}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedHero}
						cancelChanges={cancelEditSelectedHero}
					/>
				);
			case Page.ElementList:
				return (
					<ElementListPage
						sourcebooks={SourcebookData.getSourcebooks(homebrewSourcebooks)}
						hiddenSourcebookIDs={hiddenSourcebookIDs}
						goHome={showWelcome}
						showAbout={showAbout}
						showCollections={showCollections}
						viewAncestry={onSelectAncestry}
						viewCulture={onSelectCulture}
						viewCareer={onSelectCareer}
						viewClass={onSelectClass}
						viewComplication={onSelectComplication}
						viewDomain={onSelectDomain}
						viewKit={onSelectKit}
						viewPerk={onSelectPerk}
						viewItem={onSelectItem}
						onCreateHomebrew={createHomebrewElement}
						onImportHomebrew={importHomebrewElement}
					/>
				);
			case Page.ElementEdit:
				return (
					<ElementEditPage
						element={selectedElement as Ancestry | Culture | Career | HeroClass | Kit | Complication}
						elementType={selectedElementType}
						sourcebooks={[ SourcebookData.core, SourcebookData.orden, selectedSourcebook as Sourcebook ]}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedElement}
						cancelChanges={cancelEditSelectedElement}
					/>
				);
			case Page.MonsterList:
				return (
					<MonsterListPage
						playbook={playbook}
						goHome={showWelcome}
						showAbout={showAbout}
						viewMonsterGroup={onSelectMonsterGroup}
						onCreateMonster={() => createMonsterGroup(null)}
						onImportMonster={importMonsterGroup}
					/>
				);
			case Page.MonsterEdit:
				return (
					<MonsterEditPage
						monsterGroup={selectedMonsterGroup as MonsterGroup}
						sourcebooks={[ SourcebookData.core, SourcebookData.orden, selectedSourcebook as Sourcebook ]}
						goHome={showWelcome}
						showAbout={showAbout}
						saveChanges={saveEditSelectedMonsterGroup}
						cancelChanges={cancelEditSelectedMonsterGroup}
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
