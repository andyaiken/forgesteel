import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Ancestry } from '../../models/ancestry';
import { Career } from '../../models/career';
import { Collections } from '../../utils/collections';
import { Complication } from '../../models/complication';
import { Culture } from '../../models/culture';
import { Domain } from '../../models/domain';
import { Element } from '../../models/element';
import { Encounter } from '../../models/encounter';
import { EncounterEditPage } from '../pages/encounters/encounter-edit/encounter-edit';
import { EncounterListPage } from '../pages/encounters/encounter-list/encounter-list';
import { FactoryLogic } from '../../logic/factory-logic';
import { Hero } from '../../models/hero';
import { HeroClass } from '../../models/class';
import { HeroEditPage } from '../pages/heroes/hero-edit/hero-edit-page';
import { HeroListPage } from '../pages/heroes/hero-list/hero-list-page';
import { HeroPage } from '../pages/heroes/hero-view/hero-view-page';
import { Item } from '../../models/item';
import { Kit } from '../../models/kit';
import { LibraryEditPage } from '../pages/library/library-edit/library-edit';
import { LibraryListPage } from '../pages/library/library-list/library-list';
import { MainLayout } from './main-layout';
import { MonsterGroup } from '../../models/monster';
import { Perk } from '../../models/perk';
import { Playbook } from '../../models/playbook';
import { Sourcebook } from '../../models/sourcebook';
import { SourcebookData } from '../../data/sourcebook-data';
import { SourcebookElementKind } from '../../models/sourcebook-element-kind';
import { SourcebookElementsKey } from '../../models/sourcebook-elements-key';
import { Title } from '../../models/title';
import { Utils } from '../../utils/utils';
import { WelcomePage } from '../pages/welcome/welcome-page';
import { getSourcebookKey } from '../../utils/get-sourcebook-key';
import { useModals } from '../../hooks/use-modals';
import { useNavigation } from '../../hooks/use-navigation';
import { usePersistedHeroes } from '../../hooks/use-persisted-heroes';
import { usePersistedPlaybook } from '../../hooks/use-persisted-playbook';
import { usePersistedSourcebooks } from '../../hooks/use-persisted-sourcebooks';

import './main.scss';

export const Main = () => {
	const location = useLocation();
	const navigation = useNavigation();
	const modals = useModals();
	const { heroes, persistHero } = usePersistedHeroes();
	const { homebrewSourcebooks, persistHomebrewSourcebooks } = usePersistedSourcebooks();
	const { playbook, persistPlaybook } = usePersistedPlaybook();

	//#region Heroes

	const addHero = async () => {
		const hero = FactoryLogic.createHero([
			SourcebookData.core.id,
			SourcebookData.orden.id
		]);

		await persistHero(hero);
		navigation.goToHeroEdit(hero.id);
	};

	const closeHero = () => {
		navigation.goToHeroList();
	};

	const editHero = (heroId: string) => {
		navigation.goToHeroEdit(heroId);
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
		if (location.hash) {
			modals.showAncestry(ancestry.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'ancestry', ancestry.id);
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
		if (location.hash) {
			modals.showCulture(culture.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'culture', culture.id);
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
		if (location.hash) {
			modals.showCareer(career.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'career', career.id);
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
		if (location.hash) {
			modals.showClass(heroClass.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'class', heroClass.id);
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
		if (location.hash) {
			modals.showComplication(complication.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'complication', complication.id);
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
		if (location.hash) {
			modals.showDomain(domain.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'domain', domain.id);
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
		if (location.hash) {
			modals.showKit(kit.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'kit', kit.id);
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
		if (location.hash) {
			modals.showPerk(perk.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'perk', perk.id);
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
		if (location.hash) {
			modals.showTitle(title.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'title', title.id);
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
		if (location.hash) {
			modals.showItem(item.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'item', item.id);
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
		} else {
			monsterGroup = FactoryLogic.createMonsterGroup();
		}

		sourcebook.monsterGroups.push(monsterGroup);
		await persistHomebrewSourcebooks(sourcebooks);
		if (location.hash) {
			modals.showMonsterGroup(monsterGroup.id);
		} else {
			navigation.goToLibraryEdit(sourcebook.id, 'monster-group', monsterGroup.id);
		}
	};

	const saveEditElement = async (sourcebookId: string, kind: SourcebookElementKind, element: Element) => {
		const list = JSON.parse(JSON.stringify(homebrewSourcebooks)) as Sourcebook[];
		const sourcebook = list.find(cs => cs.id === sourcebookId) as Record<SourcebookElementsKey, Element[]>;
		if (sourcebook) {
			const elementKey = getSourcebookKey(kind);
			sourcebook[elementKey] = sourcebook[elementKey].map(x => x.id === element.id ? element : x);
		}

		await persistHomebrewSourcebooks(list);
		navigation.goToLibraryList(kind);
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
		navigation.goToEncounterEdit(encounter.id);
	};

	const importEncounter = async (encounter: Encounter) => {
		encounter.id = Utils.guid();

		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters.push(encounter);
		Collections.sort(copy.encounters, item => item.name);

		await persistPlaybook(copy);
		navigation.goToEncounterList();
	};

	const deleteEncounter = async (encounterId: string) => {
		const copy = JSON.parse(JSON.stringify(playbook)) as Playbook;
		copy.encounters = copy.encounters.filter(enc => enc.id !== encounterId);

		await persistPlaybook(copy);
		navigation.goToEncounterList();
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

	return (
		<Routes>
			<Route
				path='/'
				element={
					<MainLayout
						onAncestryCreate={createAncestry}
						onCareerCreate={createCareer}
						onClassCreate={createClass}
						onComplicationCreate={createComplication}
						onCultureCreate={createCulture}
						onDomainCreate={createDomain}
						onItemCreate={createItem}
						onKitCreate={createKit}
						onPerkCreate={createPerk}
						onTitleCreate={createTitle}
						onHeroChange={persistHero}
						onEncounterDelete={deleteEncounter}
						onMonsterGroupCreate={createMonsterGroup}
					/>
				}>
				<Route
					index={true}
					element={
						<WelcomePage
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
								goHome={navigation.goToWelcome}
								addHero={addHero}
							/>
						}
					/>
					<Route
						path='view/:heroId'
						element={
							<HeroPage
								goHome={navigation.goToWelcome}
								closeHero={closeHero}
								editHero={editHero}
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
								goHome={navigation.goToWelcome}
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
								goHome={navigation.goToWelcome}
								onCreateHomebrew={createHomebrewElement}
								onImportHomebrew={importHomebrewElement}
							/>
						}
					/>
					<Route
						path='edit/:sourcebookId/:kind/:elementId'
						element={
							<LibraryEditPage
								goHome={navigation.goToWelcome}
								saveChanges={saveEditElement}
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
								goHome={navigation.goToWelcome}
								onCreateEncounter={() => createEncounter(null)}
								onImportEncounter={importEncounter}
							/>
						}
					/>
					<Route
						path='edit/:encounterId'
						element={
							<EncounterEditPage
								goHome={navigation.goToWelcome}
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
