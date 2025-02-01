import { Navigate, Route, Routes } from 'react-router';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind, SourcebookElementsKey } from '../../models/sourcebook';
import { Ability } from '../../models/ability';
import { AbilityModal } from '../modals/ability/ability-modal';
import { AboutModal } from '../modals/about/about-modal';
import { Ancestry } from '../../models/ancestry';
import { Career } from '../../models/career';
import { Characteristic } from '../../enums/characteristic';
import { CharacteristicModal } from '../modals/characteristic/characteristic-modal';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { Culture } from '../../models/culture';
import { Domain } from '../../models/domain';
import { Element } from '../../models/element';
import { ElementModal } from '../modals/element/element-modal';
import { Encounter } from '../../models/encounter';
import { EncounterEditPage } from '../pages/encounters/encounter-edit/encounter-edit';
import { EncounterListPage } from '../pages/encounters/encounter-list/encounter-list';
import { EncounterViewPage } from '../pages/encounters/encounter-view/encounter-view-page';
import { FactoryLogic } from '../../logic/factory-logic';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/heroes/hero-list/hero-list-page';
import { HeroLogic } from '../../logic/hero-logic';
import { HeroStateModal } from '../modals/hero-state/hero-state-modal';
import { HeroViewPage } from '../pages/heroes/hero-view/hero-view-page';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';
import { Kit } from '../../models/kit';
import { LibraryEditPage } from '../pages/library/library-edit/library-edit';
import { LibraryListPage } from '../pages/library/library-list/library-list';
import { LibraryViewPage } from '../pages/library/library-view/library-view-page';
import { MainLayout } from './main-layout';
import { MonsterGroup } from '../../models/monster';
import { MonsterModal } from '../modals/monster/monster-modal';
import { Options } from '../../models/options';
import { Perk } from '../../models/perk';
import { Playbook } from '../../models/playbook';
import { RulesModal } from '../modals/rules/rules-modal';
import { SourcebookData } from '../../data/sourcebook-data';
import { SourcebookLogic } from '../../logic/sourcebook-logic';
import { SourcebooksModal } from '../modals/sourcebooks/sourcebooks-modal';
import { Title } from '../../models/title';
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
		await localforage
			.setItem<Hero[]>('forgesteel-heroes', Collections.sort(heroes, h => h.name))
			.then(setHeroes);
	};

	const persistHero = async (hero: Hero) => {
		if (heroes.some(h => h.id === hero.id)) {
			const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
			const list = copy.map(h => h.id === hero.id ? hero : h);

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

	const persistOptions = async (options: Options) => {
		await localforage
			.setItem<Options>('forgesteel-options', options)
			.then(setOptions);
	};

	//#endregion

	//#region Heroes

	const createHero = () => {
		const hero = FactoryLogic.createHero([
			SourcebookData.core.id,
			SourcebookData.orden.id
		]);

		persistHero(hero).then(() => navigation.goToHeroEdit(hero.id, 'ancestry'));
	};

	const deleteHero = (hero: Hero) => {
		const copy = JSON.parse(JSON.stringify(heroes)) as Hero[];
		persistHeroes(copy.filter(h => h.id !== hero.id)).then(() => navigation.goToHeroList());
	};

	const saveHero = (hero: Hero) => {
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));
	};

	const importHero = (hero: Hero) => {
		hero.id = Utils.guid();
		HeroLogic.updateHero(hero);

		setDrawer(null);
		persistHero(hero).then(() => navigation.goToHeroView(hero.id));
	};

	const exportHero = (hero: Hero, format: 'image' | 'pdf' | 'json') => {
		const ids = (format === 'pdf') ? [ 'stats', 'actions', 'maneuvers', 'moves', 'triggers', 'others', 'none' ] : [ hero.id ];
		Utils.export(ids, hero.name || 'Unnamed Hero', hero, 'hero', format);
	};

	//#endregion

	//#region Library

	const createElement = (type: SourcebookElementKind, original: Element | null, sourcebookID: string | null) => {
		const sourcebook = homebrewSourcebooks.find(cs => cs.id === sourcebookID) || null;
		switch (type) {
			case 'ancestry':
				createAncestry(original as Ancestry | null, sourcebook);
				break;
			case 'culture':
				createCulture(original as Culture | null, sourcebook);
				break;
			case 'career':
				createCareer(original as Career | null, sourcebook);
				break;
			case 'class':
				createClass(original as HeroClass | null, sourcebook);
				break;
			case 'complication':
				createComplication(original as Complication | null, sourcebook);
				break;
			case 'domain':
				createDomain(original as Domain | null, sourcebook);
				break;
			case 'kit':
				createKit(original as Kit | null, sourcebook);
				break;
			case 'perk':
				createPerk(original as Perk | null, sourcebook);
				break;
			case 'title':
				createTitle(original as Title | null, sourcebook);
				break;
			case 'item':
				createItem(original as Item | null, sourcebook);
				break;
			case 'monster-group':
				createMonsterGroup(original as MonsterGroup | null, sourcebook);
				break;
		}
	};

	const deleteElement = (kind: SourcebookElementKind, element: Element) => {
		const copy = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebookKey = getSourcebookKey(kind);
		copy.forEach((cs: Record<SourcebookElementsKey, Element[]>) => {
			cs[sourcebookKey] = cs[sourcebookKey].filter(x => x.id !== element.id);
		});
		setDrawer(null);
		persistHomebrewSourcebooks(copy).then(() => navigation.goToLibraryList(kind));
	};

	const saveElement = (sourcebookID: string, kind: SourcebookElementKind, element: Element) => {
		const list = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebook = list.find(cs => cs.id === sourcebookID) as Record<SourcebookElementsKey, Element[]>;
		if (sourcebook) {
			const elementKey = getSourcebookKey(kind);
			sourcebook[elementKey] = sourcebook[elementKey].map(x => x.id === element.id ? element : x);
		}

		persistHomebrewSourcebooks(list).then(() => navigation.goToLibraryList(kind));
	};

	const importElement = (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => {
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

		setDrawer(null);
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryList(kind));
	};

	const exportElement = (kind: SourcebookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => {
		let name: string;
		let extension: string;

		switch (kind) {
			case 'ancestry':
				name = 'Ancestry';
				extension = 'ancestry';
				break;
			case 'career':
				name = 'Career';
				extension = 'career';
				break;
			case 'class':
				name = 'Class';
				extension = 'class';
				break;
			case 'complication':
				name = 'Complication';
				extension = 'complication';
				break;
			case 'culture':
				name = 'Culture';
				extension = 'culture';
				break;
			case 'domain':
				name = 'Domain';
				extension = 'domain';
				break;
			case 'item':
				name = 'Ancestry';
				extension = 'ancestry';
				break;
			case 'kit':
				name = 'Kit';
				extension = 'kit';
				break;
			case 'monster-group':
				name = 'Monster Group';
				extension = 'monster-group';
				break;
			case 'perk':
				name = 'Perk';
				extension = 'perk';
				break;
			case 'title':
				name = 'Title';
				extension = 'title';
				break;
		};

		Utils.export([ element.id ], element.name || name, element, extension, format);
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('ancestry', sourcebook.id, ancestry.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('culture', sourcebook.id, culture.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('career', sourcebook.id, career.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('class', sourcebook.id, heroClass.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('complication', sourcebook.id, complication.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('domain', sourcebook.id, domain.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('kit', sourcebook.id, kit.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('perk', sourcebook.id, perk.id));
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
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('title', sourcebook.id, title.id));
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
			item = FactoryLogic.createItem({
				id: Utils.guid(),
				name: '',
				description: '',
				type: ItemType.Consumable,
				crafting: FactoryLogic.createProject({})
			});
		}

		sourcebook.items.push(item);
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('item', sourcebook.id, item.id));
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
			monsterGroup.monsters.forEach(m => m.id = Utils.guid());
		} else {
			monsterGroup = FactoryLogic.createMonsterGroup();
		}

		sourcebook.monsterGroups.push(monsterGroup);
		persistHomebrewSourcebooks(sourcebooks).then(() => navigation.goToLibraryEdit('monster-group', sourcebook.id, monsterGroup.id));
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
		persistPlaybook(copy).then(() => navigation.goToEncounterView(encounter.id));
	};

	const deleteEncounter = (encounter: Encounter) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters = copy.encounters.filter(enc => enc.id !== encounter.id);

		persistPlaybook(copy).then(() => navigation.goToEncounterList());
	};

	const saveEncounter = (encounter: Encounter) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		const encounterIndex = copy.encounters.findIndex(enc => enc.id === encounter.id);
		if (encounterIndex !== -1) {
			copy.encounters[encounterIndex] = encounter;
		}

		persistPlaybook(copy).then(() => navigation.goToEncounterList());
	};

	const importEncounter = (encounter: Encounter) => {
		encounter.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters.push(encounter);
		Collections.sort(copy.encounters, item => item.name);

		setDrawer(null);
		persistPlaybook(copy).then(() => navigation.goToEncounterList());
	};

	const exportEncounter = (encounter: Encounter, format: 'image' | 'pdf' | 'json') => {
		Utils.export([ encounter.id ], encounter.name || 'Encounter', encounter, 'encounter', format);
	};

	//#endregion

	//#region Modals

	const showAbout = () => {
		setDrawer(
			<AboutModal />
		);
	};

	const onSelectElement = (element: Element, kind: SourcebookElementKind) => {
		setDrawer(
			<ElementModal
				kind={kind}
				element={element}
				export={format => exportElement(kind, element, format)}
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
					export={format => Utils.export([ monster.id ], monster.name || 'Monster', monster, 'monster', format)}
				/>
			);
		}
	};

	const onSelectCharacteristic = (characteristic: Characteristic, hero: Hero) => {
		setDrawer(
			<CharacteristicModal characteristic={characteristic} hero={hero} />
		);
	};

	const onSelectAbility = (ability: Ability, hero: Hero) => {
		setDrawer(
			<AbilityModal ability={ability} hero={hero} updateHero={async hero => await persistHero(hero)} />
		);
	};

	const onShowHeroState = (hero: Hero, page: 'hero' | 'stats' | 'conditions') => {
		setDrawer(
			<HeroStateModal
				hero={hero}
				sourcebooks={[ SourcebookData.core, SourcebookData.orden, ...homebrewSourcebooks ]}
				startPage={page}
				onChange={async hero => await persistHero(hero)}
				onLevelUp={async () => {
					if (hero && hero.class) {
						hero.class.level += 1;
						await persistHero(hero);
						navigation.goToHeroEdit(hero.id, 'class');
						setDrawer(null);
					}
				}}
			/>
		);
	};

	const onShowRules = (hero: Hero) => {
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
				heroes={heroes}
				officialSourcebooks={[ SourcebookData.core, SourcebookData.orden ]}
				homebrewSourcebooks={homebrewSourcebooks}
				hiddenSourcebookIDs={hiddenSourcebookIDs}
				onHomebrewSourcebookChange={async sourcebooks => await persistHomebrewSourcebooks(sourcebooks)}
				onHiddenSourcebookIDsChange={async ids => persistHiddenSourcebookIDs(ids)}
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
							showHeroes={heroes.length === 0 ? createHero : navigation.goToHeroList}
							showLibrary={() => navigation.goToLibraryList('ancestry')}
							showEncounters={navigation.goToEncounterList}
						/>
					}
				/>
				<Route path='hero'>
					<Route
						index={true}
						element={
							<HeroListPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								addHero={createHero}
								importHero={importHero}
							/>
						}
					/>
					<Route
						path='view/:heroID'
						element={
							<HeroViewPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								options={options}
								setOptions={async options => await persistOptions(options)}
								showAbout={showAbout}
								exportHero={exportHero}
								deleteHero={deleteHero}
								showAncestry={ancestry => onSelectElement(ancestry, 'ancestry')}
								showCulture={culture => onSelectElement(culture, 'culture')}
								showCareer={career => onSelectElement(career, 'career')}
								showClass={heroClass => onSelectElement(heroClass, 'class')}
								showComplication={complication => onSelectElement(complication, 'complication')}
								showDomain={domain => onSelectElement(domain, 'domain')}
								showKit={kit => onSelectElement(kit, 'kit')}
								showCharacteristic={onSelectCharacteristic}
								showAbility={onSelectAbility}
								showHeroState={onShowHeroState}
								showRules={onShowRules}
							/>
						}
					/>
					<Route
						path='edit/:heroID'
						element={<Navigate to='ancestry' replace={true} />}
					/>
					<Route
						path='edit/:heroID/:tab'
						element={
							<HeroEditPage
								heroes={heroes}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								saveChanges={saveHero}
							/>
						}
					/>
				</Route>
				<Route path='library'>
					<Route
						index={true}
						element={<Navigate to='ancestry' replace={true} />}
					/>
					<Route
						path=':tab'
						element={
							<LibraryListPage
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								hiddenSourcebookIDs={hiddenSourcebookIDs}
								showAbout={showAbout}
								showSourcebooks={showSourcebooks}
								onCreateHomebrew={(kind, sourcebookID) => createElement(kind, null, sourcebookID)}
								onImportHomebrew={importElement}
							/>
						}
					/>
					<Route
						path='view/:kind/:elementID'
						element={
							<LibraryViewPage
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								createHomebrew={(kind, element, sourcebook) => createElement(kind, element, sourcebook? sourcebook.id : null)}
								export={exportElement}
								delete={deleteElement}
							/>
						}
					/>
					<Route
						path='edit/:kind/:sourcebookID/:elementID/:subElementID?'
						element={
							<LibraryEditPage
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								showMonster={onSelectMonster}
								saveChanges={saveElement}
							/>
						}
					/>
				</Route>
				<Route path='encounter'>
					<Route
						index={true}
						element={
							<EncounterListPage
								playbook={playbook}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								onCreateEncounter={() => createEncounter(null)}
								onImportEncounter={importEncounter}
							/>
						}
					/>
					<Route
						path='view/:encounterID'
						element={
							<EncounterViewPage
								playbook={playbook}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								export={exportEncounter}
								delete={deleteEncounter}
							/>
						}
					/>
					<Route
						path='edit/:encounterID'
						element={
							<EncounterEditPage
								playbook={playbook}
								sourcebooks={SourcebookLogic.getSourcebooks(homebrewSourcebooks)}
								showAbout={showAbout}
								showMonster={onSelectMonster}
								saveChanges={saveEncounter}
							/>
						}
					/>
				</Route>
			</Route>
		</Routes>
	);
};
