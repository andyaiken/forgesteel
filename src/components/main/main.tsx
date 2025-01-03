import { Navigate, Route, Routes } from 'react-router';
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
import { MainLayout } from './main-layout';
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
import { SourcebookElementKind } from '../../models/sourcebook-element-kind';
import { SourcebookElementsKey } from '../../models/sourcebook-elements-key';
import { SourcebookLogic } from '../../logic/sourcebook-logic';
import { SourcebooksModal } from '../modals/sourcebooks/sourcebooks-modal';
import { Title } from '../../models/title';
import { TitleModal } from '../modals/title/title-modal';
import { Utils } from '../../utils/utils';
import { WelcomePage } from '../pages/welcome/welcome-page';
import { getSourcebookKey } from '../../utils/get-sourcebook-key';
import localforage from 'localforage';
import { useNavigation } from '../../hooks/use-navigation';

import './main.scss';

interface Props {
	heroes: Hero[];
	playbook: Playbook;
	homebrewSourcebooks: Sourcebook[];
	hiddenSourcebookIDs: string[];
	options: Options;
}

export const Main = (props: Props) => {
	const navigation = useNavigation();
	const [ heroes, setHeroes ] = useState<Hero[]>(props.heroes);
	const [ playbook, setPlaybook ] = useState<Playbook>(props.playbook);
	const [ homebrewSourcebooks, setHomebrewSourcebooks ] = useState<Sourcebook[]>(props.homebrewSourcebooks);
	const [ hiddenSourcebookIDs, setHiddenSourcebookIDs ] = useState<string[]>(props.hiddenSourcebookIDs);
	const [ options, setOptions ] = useState<Options>(props.options);
	const [ drawer, setDrawer ] = useState<ReactNode>(null);

	//#region Persistence

	const persistHeroes = async (heroes: Hero[]) => {
		const newHeroes = await localforage
			.setItem<Hero[]>('forgesteel-heroes', Collections.sort(heroes, h => h.name));
		setHeroes(newHeroes);
	};

	const persistHero = async (hero: Hero) => {
		if (heroes.some(h => h.id === hero.id)) {
			const list = (JSON.parse(JSON.stringify(heroes)) as Hero[])
				.map(h => h.id === hero.id ? hero : h);

			await persistHeroes(list);
		}
		else {
			const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
			copy.push(hero);
			Collections.sort(copy, h => h.name);

			await persistHeroes(copy);
		}
	};

	const persistPlaybook = async (playbook: Playbook) => {
		await localforage
			.setItem<Playbook>('forgesteel-playbook', playbook)
			.then(setPlaybook);
	};

	const persistHomebrewSourcebooks = async (homebrew: Sourcebook[]) => {
		await localforage
			.setItem<Sourcebook[]>('forgesteel-homebrew-settings', homebrew)
			.then(setHomebrewSourcebooks);
	};

	const persistHiddenSourcebookIDs = async (ids: string[]) => {
		await localforage
			.setItem<string[]>('forgesteel-hidden-setting-ids', ids)
			.then(setHiddenSourcebookIDs);
	};

	const persistOptions = (options: Options) => {
		localforage
			.setItem<Options>('forgesteel-options', options)
			.then(setOptions);
	};

	//#endregion

	//#region Heroes

	const addHero = async () => {
		const hero = FactoryLogic.createHero([
			SourcebookData.core.id,
			SourcebookData.orden.id
		]);

		await persistHero(hero);
		navigation.goToHeroEdit(hero.id);
	};

	const importHero = async (hero: Hero) => {
		hero.id = Utils.guid();
		HeroLogic.updateHero(hero);

		await persistHero(hero);
		navigation.goToHeroView(hero.id);
		setDrawer(null);
	};

	const viewHero = (heroID: string) => {
		const hero = heroes.find(h => h.id === heroID);
		if (hero) {
			navigation.goToHeroView(hero.id);
		}
	};

	const closeHero = () => {
		navigation.goToHeroList();
	};

	const editHero = (heroId: string) => {
		navigation.goToHeroEdit(heroId);
	};

	const exportHero = (heroId: string, format: 'image' | 'pdf' | 'json') => {
		const hero = heroes.find(h => h.id === heroId)!;
		const ids = (format === 'pdf') ? [ 'stats', 'actions', 'maneuvers', 'moves', 'triggers', 'others', 'none' ] : [ heroId ];
		Utils.export(ids, hero.name || 'Unnamed Hero', hero, 'hero', format);
	};

	const deleteHero = (heroId: string) => {
		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		persistHeroes(copy.filter(h => h.id !== heroId));
		navigation.goToHeroList();
	};

	const saveEditHero = async (hero: Hero) => {
		await persistHero(hero);
		navigation.goToHeroView(hero.id);
	};

	const cancelEditHero = (heroId: string) => {
		navigation.goToHeroView(heroId);
	};

	//#endregion

	//#region Library

	const createHomebrewElement = async (type: SourcebookElementKind, sourcebookID: string | null) => {
		const sourcebook = homebrewSourcebooks.find(cs => cs.id === sourcebookID) || null;
		switch (type) {
			case 'ancestry':
				await createAncestry(null, sourcebook);
				break;
			case 'culture':
				await createCulture(null, sourcebook);
				break;
			case 'career':
				await createCareer(null, sourcebook);
				break;
			case 'class':
				await createClass(null, sourcebook);
				break;
			case 'complication':
				await createComplication(null, sourcebook);
				break;
			case 'kit':
				await createKit(null, sourcebook);
				break;
			case 'perk':
				await createPerk(null, sourcebook);
				break;
			case 'title':
				await createTitle(null, sourcebook);
				break;
			case 'item':
				await createItem(null, sourcebook);
				break;
			case 'monster-group':
				await createMonsterGroup(null, sourcebook);
				break;
		}
	};

	const importHomebrewElement = async (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => {
		element.id = Utils.guid();
		if (kind === 'monster-group') {
			const group = element as MonsterGroup;
			group.monsters.forEach(m => m.id === Utils.guid());
		}

		const sourcebooks = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		let sourcebook = sourcebooks.find(cs => cs.id === sourcebookID);
		if (!sourcebook) {
			sourcebook = FactoryLogic.createSourcebook();
			sourcebooks.push(sourcebook);
		}
		const sourcebookKey = getSourcebookKey(kind);
		(sourcebook as Record<SourcebookElementsKey, Element[]>)[sourcebookKey].push(element);
		Collections.sort<Element>(sourcebook[sourcebookKey], item => item.name);

		await persistHomebrewSourcebooks(sourcebooks);
		navigation.goToLibraryList();
		setDrawer(null);
	};

	const createAncestry = async (original: Ancestry | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectAncestry(ancestry);
		} else {
			editAncestry(ancestry, sourcebook);
		}
	};

	const createCulture = async (original: Culture | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectCulture(culture);
		} else {
			editCulture(culture, sourcebook);
		}
	};

	const createCareer = async (original: Career | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectCareer(career);
		} else {
			editCareer(career, sourcebook);
		}
	};

	const createClass = async (original: HeroClass | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectClass(heroClass);
		} else {
			editClass(heroClass, sourcebook);
		}
	};

	const createComplication = async (original: Complication | null, sourcebook: Sourcebook | null) => {
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

	const createDomain = async (original: Domain | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectDomain(domain);
		} else {
			editDomain(domain, sourcebook);
		}
	};

	const createKit = async (original: Kit | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectKit(kit);
		} else {
			editKit(kit, sourcebook);
		}
	};

	const createPerk = async (original: Perk | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectPerk(perk);
		} else {
			editPerk(perk, sourcebook);
		}
	};

	const createTitle = async (original: Title | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectTitle(title);
		} else {
			editTitle(title, sourcebook);
		}
	};

	const createItem = async (original: Item | null, sourcebook: Sourcebook | null) => {
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
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectItem(item);
		} else {
			editItem(item, sourcebook);
		}
	};

	const createMonsterGroup = async (original: MonsterGroup | null, sourcebook: Sourcebook | null) => {
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
			monsterGroup.monsters.forEach(m => m.id === Utils.guid());
		} else {
			monsterGroup = FactoryLogic.createMonsterGroup();
		}

		sourcebook.monsterGroups.push(monsterGroup);
		await persistHomebrewSourcebooks(sourcebooks);
		if (drawer) {
			onSelectMonsterGroup(monsterGroup);
		} else {
			editMonsterGroup(monsterGroup, sourcebook);
		}
	};

	function editHomebrewElement(kind: 'ancestry', element: Ancestry, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'culture', element: Culture, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'career', element: Career, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'class', element: HeroClass, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'complication', element: Complication, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'domain', element: Domain, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'kit', element: Kit, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'perk', element: Perk, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'title', element: Title, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'item', element: Item, sourcebook: Sourcebook): void;
	function editHomebrewElement(kind: 'monster-group', element: MonsterGroup, sourcebook: Sourcebook): void;
	function editHomebrewElement(
		kind: SourcebookElementKind,
		element: Ancestry | Culture | Career | HeroClass | Complication | Domain | Kit | Perk | Title | Item | MonsterGroup,
		sourcebook: Sourcebook
	) {
		navigation.goToLibraryEdit(sourcebook.id, kind, element.id);
		setDrawer(null);
	}

	const editAncestry = (ancestry: Ancestry, sourcebook: Sourcebook) => {
		editHomebrewElement('ancestry', ancestry, sourcebook);
	};

	const editCulture = (culture: Culture, sourcebook: Sourcebook) => {
		editHomebrewElement('culture', culture, sourcebook);
	};

	const editCareer = (career: Career, sourcebook: Sourcebook) => {
		editHomebrewElement('career', career, sourcebook);
	};

	const editClass = (heroClass: HeroClass, sourcebook: Sourcebook) => {
		editHomebrewElement('class', heroClass, sourcebook);
	};

	const editComplication = (complication: Complication, sourcebook: Sourcebook) => {
		editHomebrewElement('complication', complication, sourcebook);
	};

	const editDomain = (domain: Domain, sourcebook: Sourcebook) => {
		editHomebrewElement('domain', domain, sourcebook);
	};

	const editKit = (kit: Kit, sourcebook: Sourcebook) => {
		editHomebrewElement('kit', kit, sourcebook);
	};

	const editPerk = (perk: Perk, sourcebook: Sourcebook) => {
		editHomebrewElement('perk', perk, sourcebook);
	};

	const editTitle = (title: Title, sourcebook: Sourcebook) => {
		editHomebrewElement('title', title, sourcebook);
	};

	const editItem = (item: Item, sourcebook: Sourcebook) => {
		editHomebrewElement('item', item, sourcebook);
	};

	const editMonsterGroup = (monsterGroup: MonsterGroup, sourcebook: Sourcebook) => {
		editHomebrewElement('monster-group', monsterGroup, sourcebook);
	};

	const deleteSourcebookElement = async (kind: SourcebookElementKind, elementId: string) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebookKey = getSourcebookKey(kind);
		copy.forEach((cs: Record<SourcebookElementsKey, Element[]>) => {
			cs[sourcebookKey] = cs[sourcebookKey].filter(x => x.id !== elementId);
		});
		await persistHomebrewSourcebooks(copy);
		setDrawer(null);
	};

	const saveEditElement = async (sourcebookId: string, kind: SourcebookElementKind, element: Element) => {
		const list = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebook = list.find(cs => cs.id === sourcebookId) as Record<SourcebookElementsKey, Element[]>;
		if (sourcebook) {
			const elementKey = getSourcebookKey(kind);
			sourcebook[elementKey] = sourcebook[elementKey].map(x => x.id === element.id ? element : x);
		}

		await persistHomebrewSourcebooks(list);
		navigation.goToLibraryList();
	};

	const cancelEditElement = () => {
		navigation.goToLibraryList();
	};

	//#endregion

	//#region Encounters

	const createEncounter = async (original: Encounter | null) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;

		let encounter: Encounter;
		if (original) {
			encounter = JSON.parse(JSON.stringify(original)) as Encounter;
			encounter.id = Utils.guid();
		} else {
			encounter = FactoryLogic.createEncounter();
		}

		copy.encounters.push(encounter);
		await persistPlaybook(copy);
		if (drawer) {
			onSelectEncounter(encounter);
		} else {
			editEncounter(encounter.id);
		}
	};

	const importEncounter = async (encounter: Encounter) => {
		encounter.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters.push(encounter);
		Collections.sort(copy.encounters, item => item.name);

		await persistPlaybook(copy);
		navigation.goToEncounterList();
		setDrawer(null);
	};

	const editEncounter = (encounterId: string) => {
		navigation.goToEncounterEdit(encounterId);
		setDrawer(null);
	};

	const deleteEncounter = async (encounter: Encounter) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters = copy.encounters.filter(enc => enc.id !== encounter.id);

		await persistPlaybook(copy);
		setDrawer(null);
	};

	const saveEditEncounter = async (encounter: Encounter) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		const encounterIndex = copy.encounters.findIndex(enc => enc.id === encounter.id);
		if (encounterIndex !== -1) {
			copy.encounters[encounterIndex] = encounter;
		}

		await persistPlaybook(copy);
		navigation.goToEncounterList();
	};

	const cancelEditEncounter = () => {
		navigation.goToEncounterList();
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
				delete={() => deleteSourcebookElement('ancestry', ancestry.id)}
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
				delete={() => deleteSourcebookElement('culture', culture.id)}
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
				delete={() => deleteSourcebookElement('career', career.id)}
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
				delete={() => deleteSourcebookElement('class', heroClass.id)}
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
				delete={() => deleteSourcebookElement('complication', complication.id)}
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
				delete={() => deleteSourcebookElement('domain', domain.id)}
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
				delete={() => deleteSourcebookElement('kit', kit.id)}
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
				delete={() => deleteSourcebookElement('perk', perk.id)}
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
				delete={() => deleteSourcebookElement('title', title.id)}
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
				delete={() => deleteSourcebookElement('item', item.id)}
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
				delete={() => deleteSourcebookElement('monster-group', monsterGroup.id)}
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
				edit={() => editEncounter(encounter.id)}
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

	const onShowHeroState = (heroId: string, page: 'hero' | 'stats' | 'conditions') => {
		const hero = props.heroes.find(h => h.id === heroId)!;
		setDrawer(
			<HeroStateModal
				hero={hero}
				startPage={page}
				onChange={updatedHero => {
					persistHero(updatedHero);
				}}
				onLevelUp={async () => {
					if (hero && hero.class) {
						hero.class.level += 1;
						await persistHero(hero);
						navigation.goToHeroEdit(hero.id);
						setDrawer(null);
					}
				}}
			/>
		);
	};

	const onShowRules = (heroId: string) => {
		const hero = props.heroes.find(h => h.id === heroId)!;
		setDrawer(
			<RulesModal
				hero={hero}
				sourcebooks={[ SourcebookData.core, SourcebookData.orden, ...homebrewSourcebooks ]}
			/>
		);
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

	return (
		<Routes>
			<Route
				path='/'
				element={
					<MainLayout
						section='hero'
						drawer={drawer}
						setDrawer={setDrawer}
					/>
				}
			>
				<Route
					index={true}
					element={
						<WelcomePage
							showAbout={showAbout}
							showHeroes={heroes.length === 0 ? addHero : navigation.goToHeroList}
							showLibrary={() => navigation.goToLibraryList()}
							showEncounters={navigation.goToEncounterList}
						/>
					}
				/>
				<Route path='hero'>
					<Route
						index={true}
						element={<Navigate to='list' replace={true} />}
					/>
					<Route
						path='list'
						element={
							<HeroListPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								addHero={addHero}
								importHero={importHero}
								viewHero={viewHero}
							/>
						}
					/>
					<Route
						path='view/:heroId'
						element={
							<HeroPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								options={options}
								setOptions={persistOptions}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								closeHero={closeHero}
								editHero={editHero}
								exportHero={exportHero}
								deleteHero={deleteHero}
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
						}
					/>
					<Route
						path='edit/:heroId'
						element={<Navigate to='ancestry' replace={true} />}
					/>
					<Route
						path='edit/:heroId/:tab'
						element={
							<HeroEditPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								saveChanges={saveEditHero}
								cancelChanges={cancelEditHero}
							/>
						}
					/>
				</Route>
				<Route path='library'>
					<Route
						index={true}
						element={<Navigate to='list' replace={true} />}
					/>
					<Route
						path='list'
						element={<Navigate to='ancestry' replace={true} />}
					/>
					<Route
						path='list/:tab'
						element={
							<LibraryListPage
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								hiddenSourcebookIDs={hiddenSourcebookIDs}
								goHome={navigation.goToWelcome}
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
						}
					/>
					<Route
						path='edit/:sourcebookId/:kind/:elementId'
						element={
							<LibraryEditPage
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								saveChanges={saveEditElement}
								cancelChanges={cancelEditElement}
							/>
						}
					/>
				</Route>
				<Route path='encounter'>
					<Route
						index={true}
						element={<Navigate to='list' replace={true} />}
					/>
					<Route
						path='list'
						element={
							<EncounterListPage
								playbook={playbook}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								viewEncounter={onSelectEncounter}
								onCreateEncounter={() => createEncounter(null)}
								onImportEncounter={importEncounter}
							/>
						}
					/>
					<Route
						path='edit/:encounterId'
						element={
							<EncounterEditPage
								playbook={playbook}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								goHome={navigation.goToWelcome}
								showAbout={showAbout}
								showMonster={onSelectMonster}
								saveChanges={saveEditEncounter}
								cancelChanges={cancelEditEncounter}
							/>
						}
					/>
				</Route>
			</Route>
		</Routes>
	);
};
