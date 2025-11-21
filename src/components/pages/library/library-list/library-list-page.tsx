import { Alert, Button, Divider, Flex, Input, Popover, Segmented, Select, Space, Upload } from 'antd';
import { CopyOutlined, DoubleLeftOutlined, DoubleRightOutlined, DownOutlined, DownloadOutlined, EditOutlined, FilterFilled, FilterOutlined, PlusOutlined, SearchOutlined, ThunderboltOutlined, UploadOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { AdventurePanel } from '@/components/panels/elements/adventure-panel/adventure-panel';
import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Career } from '@/models/career';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { Culture } from '@/models/culture';
import { CulturePanel } from '@/components/panels/elements/culture-panel/culture-panel';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Element } from '@/models/element';
import { ElementSheet } from '@/components/panels/classic-sheet/element-sheet/element-sheet';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterData } from '@/data/encounter-data';
import { EncounterDifficulty } from '@/enums/encounter-difficulty';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { EncounterLogic } from '@/logic/encounter-logic';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { Imbuement } from '@/models/imbuement';
import { ImbuementPanel } from '@/components/panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '@/models/item';
import { ItemPanel } from '@/components/panels/elements/item-panel/item-panel';
import { Kit } from '@/models/kit';
import { KitPanel } from '@/components/panels/elements/kit-panel/kit-panel';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterFilterPanel } from '@/components/panels/monster-filter/monster-filter-panel';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterGroupPanel } from '@/components/panels/elements/monster-group-panel/monster-group-panel';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Montage } from '@/models/montage';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { Negotiation } from '@/models/negotiation';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SelectorRow } from '@/components/panels/selector-row/selector-row';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { TacticalMap } from '@/models/tactical-map';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapLogic } from '@/logic/tactical-map-logic';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { ViewSelector } from '@/components/panels/view-selector/view-selector';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';
import { useTitle } from '@/hooks/use-title';

import './library-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	hiddenSourcebookIDs: string[];
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
	showSettings: () => void;
	showSourcebooks: () => void;
	showMonster: (monster: Monster) => void;
	showEncounterTools: (encounter: Encounter) => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElementData: (category: string, element: Element) => void;
	exportElementImage: (category: string, element: Element) => void;
	exportElementPdf: (category: string, element: Element, resolution: 'standard' | 'high') => void;
}

export const LibraryListPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: SourcebookElementKind, elementID: string }>();
	const [ category, setCategory ] = useState<SourcebookElementKind>(kind || 'ancestry');
	const [ selectedID, setSelectedID ] = useState<string | null>(elementID || null);
	const [ previousCategory, setPreviousCategory ] = useState<SourcebookElementKind | undefined>(kind);
	const [ previousSelectedID, setPreviousSelectedID ] = useState<string | null | undefined>(elementID);
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ showSidebar, setShowSidebar ] = useState<boolean>(true);
	const [ view, setView ] = useState<string>('modern');
	const [ showMonsters, setShowMonsters ] = useState<boolean>(false);
	const [ showCulturesFromAncestries, setShowCulturesFromAncestries ] = useState<boolean>(false);
	const [ showSubclassesFromClasses, setShowSubclassesFromClasses ] = useState<boolean>(false);
	const [ showProjectsFromImbuements, setShowProjectsFromImbuements ] = useState<boolean>(false);
	const [ showProjectsFromItems, setShowProjectsFromItems ] = useState<boolean>(false);
	const [ showMonsterFilter, setShowMonsterFilter ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ sourcebookID, setSourcebookID ] = useState<string>(props.sourcebooks.filter(sb => sb.type === SourcebookType.Homebrew).length > 0 ? props.sourcebooks.filter(sb => sb.type === SourcebookType.Homebrew)[0].id : '');
	const [ difficulty, setDifficulty ] = useState<EncounterDifficulty>(EncounterDifficulty.Standard);
	const [ keywords, setKeywords ] = useState<string[]>([]);
	const [ mapImportType, setMapImportType ] = useState<'image' | 'video'>('image');
	const [ mapImportData, setMapImportData ] = useState<string>('');
	const [ mapImportWidth, setMapImportWidth ] = useState<number>(10);
	const [ mapImportHeight, setMapImportHeight ] = useState<number>(5);
	const [ mapGenerateType, setMapGenerateType ] = useState<'dungeon' | 'cavern'>('dungeon');
	const [ mapGenerateSize, setMapGenerateSize ] = useState<number>(5);
	useTitle('Library');

	if (kind !== previousCategory) {
		setCategory(kind || 'ancestry');
		setPreviousCategory(kind);
	}

	if (elementID !== previousSelectedID) {
		setSelectedID(elementID || null);
		setPreviousSelectedID(elementID);
	}

	const getSourcebooks = () => {
		return props.sourcebooks.filter(cs => !props.hiddenSourcebookIDs.includes(cs.id));
	};

	// #region Get Elements

	const getAdventures = () => {
		try {
			return SourcebookLogic
				.getAdventures(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getAncestries = () => {
		try {
			return SourcebookLogic
				.getAncestries(getSourcebooks())
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

	const getCareers = () => {
		try {
			return SourcebookLogic
				.getCareers(getSourcebooks())
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

	const getClasses = () => {
		try {
			return SourcebookLogic
				.getClasses(getSourcebooks())
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

	const getComplications = () => {
		try {
			return SourcebookLogic
				.getComplications(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getCultures = () => {
		try {
			return SourcebookLogic
				.getCultures(getSourcebooks(), showCulturesFromAncestries)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getDomains = () => {
		try {
			return SourcebookLogic
				.getDomains(getSourcebooks())
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

	const getEncounters = () => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(props.sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getEncounters(getSourcebooks())
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

	const getImbuements = () => {
		try {
			return SourcebookLogic
				.getImbuements(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getItems = () => {
		try {
			return SourcebookLogic
				.getItems(getSourcebooks())
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

	const getKits = () => {
		try {
			return SourcebookLogic
				.getKits(getSourcebooks())
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

	const getMonsterGroups = () => {
		try {
			return SourcebookLogic
				.getMonsterGroups(getSourcebooks())
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

	const getMonsters = () => {
		try {
			return SourcebookLogic
				.getMonsters(getSourcebooks())
				.filter(item => MonsterLogic.matches(item, monsterFilter))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getMontages = () => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(props.sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getMontages(getSourcebooks())
				.filter(item => !!adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getNegotiations = () => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(props.sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getNegotiations(getSourcebooks())
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

	const getPerks = () => {
		try {
			return SourcebookLogic
				.getPerks(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getProjects = () => {
		try {
			return SourcebookLogic
				.getProjects(getSourcebooks(), showProjectsFromImbuements, showProjectsFromItems)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getSubclasses = () => {
		try {
			return SourcebookLogic
				.getSubclasses(getSourcebooks(), showSubclassesFromClasses)
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getTacticalMaps = () => {
		try {
			const adventureContentIDs = SourcebookLogic
				.getAdventures(props.sourcebooks)
				.flatMap(a => AdventureLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return SourcebookLogic
				.getTacticalMaps(getSourcebooks())
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

	const getTerrainObjects = () => {
		try {
			return SourcebookLogic
				.getTerrains(getSourcebooks())
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getTitles = () => {
		try {
			return SourcebookLogic
				.getTitles(getSourcebooks())
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

	// #endregion

	const getList = () => {
		let list: Element[] = [];

		switch (category) {
			case 'adventure':
				list = getAdventures();
				break;
			case 'ancestry':
				list = getAncestries();
				break;
			case 'career':
				list = getCareers();
				break;
			case 'class':
				list = getClasses();
				break;
			case 'complication':
				list = getComplications();
				break;
			case 'culture':
				list = getCultures();
				break;
			case 'domain':
				list = getDomains();
				break;
			case 'encounter':
				list = getEncounters();
				break;
			case 'imbuement':
				list = getImbuements();
				break;
			case 'item':
				list = getItems();
				break;
			case 'kit':
				list = getKits();
				break;
			case 'monster-group':
				list = showMonsters ? getMonsters() : getMonsterGroups();
				break;
			case 'montage':
				list = getMontages();
				break;
			case 'negotiation':
				list = getNegotiations();
				break;
			case 'perk':
				list = getPerks();
				break;
			case 'project':
				list = getProjects();
				break;
			case 'subclass':
				list = getSubclasses();
				break;
			case 'tactical-map':
				list = getTacticalMaps();
				break;
			case 'terrain':
				list = getTerrainObjects();
				break;
			case 'title':
				list = getTitles();
				break;
		}

		return Collections.distinct(list, x => x.id);
	};

	const getGroupHeaders = () => {
		const headers = getList().map(getGroupHeader);
		const distinct = Collections.distinct(headers, x => x);
		return Collections.sort(distinct, x => x || '');
	};

	const getElementPanel = () => {
		let getPanel: (element: Element) => ReactNode = () => null;

		if (view === 'classic') {
			let cat: string = category;
			if ((category === 'monster-group') && showMonsters) {
				cat = 'monster';
			}

			getPanel = (element: Element) => {
				return (
					<div style={{ padding: '20px', overflow: 'auto' }}>
						<ElementSheet
							key={element.id}
							type={cat}
							element={element}
							sourcebooks={props.sourcebooks}
							heroes={props.heroes}
							options={props.options}
						/>
					</div>
				);
			};
		} else {
			switch (category) {
				case 'adventure':
					getPanel = (element: Element) => <AdventurePanel key={element.id} adventure={element as Adventure} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'ancestry':
					getPanel = (element: Element) => <AncestryPanel key={element.id} ancestry={element as Ancestry} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'career':
					getPanel = (element: Element) => <CareerPanel key={element.id} career={element as Career} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'class':
					getPanel = (element: Element) => <ClassPanel key={element.id} heroClass={element as HeroClass} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'complication':
					getPanel = (element: Element) => <ComplicationPanel key={element.id} complication={element as Complication} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'culture':
					getPanel = (element: Element) => <CulturePanel key={element.id} culture={element as Culture} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'domain':
					getPanel = (element: Element) => <DomainPanel key={element.id} domain={element as Domain} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'encounter':
					getPanel = (element: Element) => <EncounterPanel key={element.id} encounter={element as Encounter} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'imbuement':
					getPanel = (element: Element) => <ImbuementPanel key={element.id} imbuement={element as Imbuement} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'item':
					getPanel = (element: Element) => <ItemPanel key={element.id} item={element as Item} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'kit':
					getPanel = (element: Element) => <KitPanel key={element.id} kit={element as Kit} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'monster-group':
					getPanel = (element: Element) => {
						return showMonsters ?
							<MonsterPanel key={element.id} monster={element as Monster} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />
							:
							<MonsterGroupPanel key={element.id} monsterGroup={element as MonsterGroup} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} onSelectMonster={props.showMonster} />;
					};
					break;
				case 'montage':
					getPanel = (element: Element) => <MontagePanel key={element.id} montage={element as Montage} heroes={props.heroes} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'negotiation':
					getPanel = (element: Element) => <NegotiationPanel key={element.id} negotiation={element as Negotiation} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'perk':
					getPanel = (element: Element) => <PerkPanel key={element.id} perk={element as Perk} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'project':
					getPanel = (element: Element) => <ProjectPanel key={element.id} project={element as Project} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />;
					break;
				case 'subclass':
					getPanel = (element: Element) => <SubclassPanel key={element.id} subclass={element as SubClass} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
				case 'tactical-map':
					getPanel = (element: Element) => <TacticalMapPanel key={element.id} map={element as TacticalMap} sourcebooks={props.sourcebooks} options={props.options} display={TacticalMapDisplayType.DirectorView} mode={PanelMode.Full} />;
					break;
				case 'terrain':
					getPanel = (element: Element) => <TerrainPanel key={element.id} terrain={element as Terrain} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />;
					break;
				case 'title':
					getPanel = (element: Element) => <TitlePanel key={element.id} title={element as Title} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
					break;
			}
		}

		return getPanel;
	};

	const getSourcebook = (element: Element) => {
		let sourcebook: Sourcebook | undefined;

		switch (category) {
			case 'adventure':
				sourcebook = SourcebookLogic.getAdventureSourcebook(props.sourcebooks, element as Adventure);
				break;
			case 'ancestry':
				sourcebook = SourcebookLogic.getAncestrySourcebook(props.sourcebooks, element as Ancestry);
				break;
			case 'career':
				sourcebook = SourcebookLogic.getCareerSourcebook(props.sourcebooks, element as Career);
				break;
			case 'class':
				sourcebook = SourcebookLogic.getClassSourcebook(props.sourcebooks, element as HeroClass);
				break;
			case 'complication':
				sourcebook = SourcebookLogic.getComplicationSourcebook(props.sourcebooks, element as Complication);
				break;
			case 'culture':
				sourcebook = SourcebookLogic.getCultureSourcebook(props.sourcebooks, element as Culture);
				break;
			case 'domain':
				sourcebook = SourcebookLogic.getDomainSourcebook(props.sourcebooks, element as Domain);
				break;
			case 'encounter':
				sourcebook = SourcebookLogic.getEncounterSourcebook(props.sourcebooks, element as Encounter);
				break;
			case 'imbuement':
				sourcebook = SourcebookLogic.getImbuementSourcebook(props.sourcebooks, element as Imbuement);
				break;
			case 'item':
				sourcebook = SourcebookLogic.getItemSourcebook(props.sourcebooks, element as Item);
				break;
			case 'kit':
				sourcebook = SourcebookLogic.getKitSourcebook(props.sourcebooks, element as Kit);
				break;
			case 'monster-group':
				sourcebook = showMonsters ?
					SourcebookLogic.getMonsterSourcebook(props.sourcebooks, element as Monster)
					:
					SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, element as MonsterGroup);
				break;
			case 'montage':
				sourcebook = SourcebookLogic.getMontageSourcebook(props.sourcebooks, element as Montage);
				break;
			case 'negotiation':
				sourcebook = SourcebookLogic.getNegotiationSourcebook(props.sourcebooks, element as Negotiation);
				break;
			case 'perk':
				sourcebook = SourcebookLogic.getPerkSourcebook(props.sourcebooks, element as Perk);
				break;
			case 'project':
				sourcebook = SourcebookLogic.getProjectSourcebook(props.sourcebooks, element as Project);
				break;
			case 'subclass':
				sourcebook = SourcebookLogic.getSubclassSourcebook(props.sourcebooks, element as SubClass);
				break;
			case 'tactical-map':
				sourcebook = SourcebookLogic.getTacticalMapSourcebook(props.sourcebooks, element as TacticalMap);
				break;
			case 'terrain':
				sourcebook = SourcebookLogic.getTerrainSourcebook(props.sourcebooks, element as Terrain);
				break;
			case 'title':
				sourcebook = SourcebookLogic.getTitleSourcebook(props.sourcebooks, element as Title);
				break;
		}

		return sourcebook || null;
	};

	const getInfo = (element: Element) => {
		if ((category === 'monster-group') && !showMonsters) {
			return (element as MonsterGroup).monsters.length;
		}

		return undefined;
	};

	const getGroupHeader = (element: Element) => {
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
			const c = SourcebookLogic.getClasses(getSourcebooks()).find(c => c.subclasses.some(sc => sc.id === element.id));
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

	const getDestinationSelector = () => {
		const sourcebookOptions: { label: string, value: string }[] = props.sourcebooks
			.filter(cs => cs.type === SourcebookType.Homebrew)
			.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

		sourcebookOptions.push({ label: 'In a new sourcebook', value: '' });

		return (
			<div>
				<div className='ds-text'>Where do you want it to live?</div>
				<Select
					style={{ width: '100%' }}
					placeholder='Select'
					options={sourcebookOptions}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={sourcebookID}
					onChange={setSourcebookID}
				/>
			</div>
		);
	};

	const getAddBtn = () => {
		if ((category === 'monster-group') && showMonsters) {
			return (
				<Popover
					trigger='click'
					content={(
						<Alert
							type='info'
							showIcon={true}
							message='To create a new monster, switch to Group view.'
							action={<Button style={{ marginLeft: '5px' }} onClick={() => setShowMonsters(false)}>Switch</Button>}
						/>
					)}
				>
					<Button type='primary'>
						Add
						<DownOutlined />
					</Button>
				</Popover>
			);
		}

		const exampleEncounters = [
			EncounterData.goblinAmbush,
			EncounterData.dragonAttack
		];

		const generateEncounter = () => {
			const enc = FactoryLogic.createEncounter();

			let heroLevel = props.options.heroLevel;
			if (props.options.heroParty) {
				const party = props.heroes.filter(h => h.folder === props.options.heroParty);
				heroLevel = Math.round(Collections.mean(party, h => h.class ? h.class.level : 1));
			}

			const budgets = EncounterDifficultyLogic.getBudgets(props.options, props.heroes);
			switch (difficulty) {
				case EncounterDifficulty.Easy:
					EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxTrivial, heroLevel, heroLevel + 1);
					break;
				case EncounterDifficulty.Standard:
					EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxEasy, heroLevel, heroLevel + 1);
					break;
				case EncounterDifficulty.Hard:
					EncounterLogic.generateEncounter(enc, props.sourcebooks, keywords, budgets.maxStandard, heroLevel, heroLevel + 2);
					break;
			}

			props.createElement(category, sourcebookID, enc);
		};

		const createImageMap = () => {
			const map = FactoryLogic.createTacticalMap();
			const tile = FactoryLogic.createMapTile();
			tile.dimensions.width = mapImportWidth;
			tile.dimensions.height = mapImportHeight;
			switch (mapImportType) {
				case 'image':
					tile.content = { type: 'image', imageData: mapImportData };
					break;
				case 'video':
					tile.content = { type: 'video', videoData: mapImportData };
			}
			map.items.push(tile);
			props.createElement(category, sourcebookID, map);
		};

		const generateMap = () => {
			const map = FactoryLogic.createTacticalMap();
			switch (mapGenerateType) {
				case 'dungeon':
					TacticalMapLogic.generateDungeon(mapGenerateSize, map);
					break;
				case 'cavern':
					TacticalMapLogic.generateCavern(mapGenerateSize * 50, map);
					break;
			}
			props.createElement(category, sourcebookID, map);
		};

		const getOptions = () => {
			switch (category) {
				case 'encounter':
					return [
						<Expander key='premade' title='Use a premade example'>
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', paddingTop: '15px' }}>
								{
									exampleEncounters.map(e => (
										<Button key={e.id} block={true} onClick={() => props.createElement(category, sourcebookID, e)}>{e.name}</Button>
									))
								}
							</div>
						</Expander>,
						<Expander key='random' title='Generate a random encounter'>
							<Segmented
								style={{ marginTop: '15px' }}
								block={true}
								options={[ EncounterDifficulty.Easy, EncounterDifficulty.Standard, EncounterDifficulty.Hard ]}
								value={difficulty}
								onChange={setDifficulty}
							/>
							<Select
								style={{ width: '100%', margin: '10px 0' }}
								mode='multiple'
								placeholder='Use monsters with any keywords'
								options={Collections.sort(Collections.distinct(SourcebookLogic.getMonsters(props.sourcebooks).flatMap(m => m.keywords), kw => kw), kw => kw).map(kw => ({ value: kw, label: <div className='ds-text'>{kw}</div> }))}
								value={keywords}
								onChange={setKeywords}

							/>
							<Button block={true} type='primary' icon={<ThunderboltOutlined />} onClick={generateEncounter}>Generate</Button>
						</Expander>

					];
				case 'tactical-map':
					return [
						<Expander key='image' title='Use a battlemap'>
							<Space direction='vertical' style={{ width: '100%', marginTop: '15px' }}>
								<Segmented
									block={true}
									options={[
										{ value: 'image', label: 'Image' },
										{ value: 'video', label: 'Animated' }
									]}
									value={mapImportType}
									onChange={setMapImportType}
								/>
								<Upload
									style={{ width: '100%' }}
									accept={mapImportType === 'image' ? '.png,.webp,.gif,.jpg,.jpeg,.svg' : '.mp4,.webm'}
									showUploadList={false}
									beforeUpload={file => {
										const reader = new FileReader();
										reader.onload = progress => {
											if (progress.target) {
												const content = progress.target.result as string;
												setMapImportData(content);
											}
										};
										reader.readAsDataURL(file);
										return false;
									}}
								>
									<Button block={true}>
										<DownloadOutlined />
										Choose file
									</Button>
								</Upload>
								{
									mapImportData ?
										<>
											{
												mapImportType === 'image' ?
													<img
														style={{ width: '100%' }}
														src={mapImportData}
													/>
													:
													<video
														style={{ width: '100%' }}
														src={mapImportData}
														autoPlay={true}
														controls={false}
														loop={true}
														muted={true}
													/>
											}
											<Flex align='center' justify='space-between' gap={10}>
												<NumberSpin min={1} value={mapImportWidth} onChange={setMapImportWidth}>
													<Field orientation='vertical' label='Width' value={mapImportWidth} />
												</NumberSpin>
												<NumberSpin min={1} value={mapImportHeight} onChange={setMapImportHeight}>
													<Field orientation='vertical' label='Height' value={mapImportHeight} />
												</NumberSpin>
											</Flex>
											<Button block={true} type='primary' onClick={createImageMap}>Create</Button>
										</>
										: null
								}
							</Space>
						</Expander>,
						<Expander key='random' title='Generate a random map'>
							<Segmented
								style={{ marginTop: '15px' }}
								block={true}
								options={[
									{ value: 'dungeon', label: 'Dungeon' },
									{ value: 'cavern', label: 'Cavern' }
								]}
								value={mapGenerateType}
								onChange={setMapGenerateType}
							/>
							<NumberSpin min={1} value={mapGenerateSize} onChange={setMapGenerateSize}>
								<Field orientation='vertical' label={mapGenerateType === 'dungeon' ? 'Rooms' : 'Size'} value={mapGenerateSize} />
							</NumberSpin>
							<Button block={true} type='primary' icon={<ThunderboltOutlined />} onClick={generateMap}>Generate</Button>
						</Expander>
					];
				default:
					return [];
			}
		};

		return (
			<Popover
				trigger='click'
				content={(
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						{getDestinationSelector()}
						<Divider />
						<Space direction='vertical' style={{ width: '100%' }}>
							<Button type='primary' block={true} icon={<PlusOutlined />} onClick={() => props.createElement(category, sourcebookID, null)}>Create</Button>
							<Upload
								style={{ width: '100%' }}
								accept={`.drawsteel-${category.toLowerCase()},.ds-${category.toLowerCase()}`}
								showUploadList={false}
								beforeUpload={file => {
									file
										.text()
										.then(json => {
											const e = JSON.parse(json) as Element;
											props.importElement(category, sourcebookID, e);
										});
									return false;
								}}
							>
								<Button block={true} icon={<DownloadOutlined />}>Import</Button>
							</Upload>
							{getOptions()}
						</Space>
					</div>
				)}
			>
				<Button type='primary'>
					Add
					<DownOutlined />
				</Button>
			</Popover>
		);
	};

	const getElementToolbar = () => {
		const element = getList().find(item => item.id == selectedID);
		if (!element) {
			return null;
		}

		const sourcebook = getSourcebook(element);
		if (!sourcebook) {
			if (category === 'subclass') {
				const c = SourcebookLogic.getClasses(getSourcebooks()).find(c => c.subclasses.some(sc => sc.id === element.id));
				if (c) {
					return (
						<Button onClick={() => navigation.goToLibrary('class', c.id)}>
							Open {c.name}
						</Button>
					);
				}
			}

			return null;
		}

		const getCreateHomebrew = () => {
			if ((category === 'monster-group') && showMonsters) {
				return (
					<Popover
						trigger='click'
						content={(
							<Alert
								type='info'
								showIcon={true}
								message='To create a homebrew version of this monster, switch to Group view.'
								action={<Button style={{ marginLeft: '5px' }} onClick={() => setShowMonsters(false)}>Switch</Button>}
							/>
						)}
					>
						<Button icon={<CopyOutlined />}>
							Create Homebrew Version
							<DownOutlined />
						</Button>
					</Popover>
				);
			}

			if (sourcebook.type !== SourcebookType.Homebrew) {
				return (
					<Popover
						trigger='click'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
								{getDestinationSelector()}
								<Button type='primary' onClick={() => props.createElement(category, sourcebookID, element)}>Create</Button>
							</div>
						)}
					>
						<Button icon={<CopyOutlined />}>
							Create Homebrew Version
							<DownOutlined />
						</Button>
					</Popover>
				);
			}

			return null;
		};

		const getEdit = () => {
			return sourcebook.type === SourcebookType.Homebrew ?
				<Button icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit(category, sourcebook.id, element.id)}>
					Edit
				</Button>
				: null;
		};

		const getCopy = () => {
			return sourcebook.type === SourcebookType.Homebrew ?
				<Popover
					trigger='click'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
							{getDestinationSelector()}
							<Button type='primary' onClick={() => props.createElement(category, sourcebookID, element)}>In a new sourcebook</Button>
						</div>
					)}
				>
					<Button icon={<CopyOutlined />}>
						Copy
						<DownOutlined />
					</Button>
				</Popover>
				: null;
		};

		const getExport = () => {
			let content = null;
			switch (category) {
				case 'ancestry':
				case 'career':
				case 'class':
				case 'complication':
				case 'culture':
				case 'domain':
				case 'imbuement':
				case 'item':
				case 'kit':
				case 'monster-group':
				case 'perk':
				case 'project':
				case 'subclass':
				case 'terrain':
				case 'title':
					content = (
						<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
							{
								view !== 'classic' ?
									<Alert
										type='info'
										showIcon={true}
										message='If you want to export as a PDF, switch to Classic view.'
										action={<Button onClick={() => setView('classic')}>Classic</Button>}
									/>
									: null
							}
							{
								view === 'classic' ?
									<>
										<Button onClick={() => props.exportElementImage(((category === 'monster-group') && showMonsters) ? 'monster' : category, element)}>Export As Image</Button>
										<Button onClick={() => props.exportElementPdf(((category === 'monster-group') && showMonsters) ? 'monster' : category, element, 'standard')}>Export As PDF</Button>
										<Button onClick={() => props.exportElementPdf(((category === 'monster-group') && showMonsters) ? 'monster' : category, element, 'high')}>Export As PDF (high res)</Button>
									</>
									: null
							}
							<Button onClick={() => props.exportElementData(((category === 'monster-group') && showMonsters) ? 'monster' : category, element)}>Export as Data</Button>
						</div>
					);
					break;
				case 'encounter':
				case 'montage':
				case 'negotiation':
					content = (
						<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
							{
								view !== 'classic' ?
									<Alert
										type='info'
										showIcon={true}
										message='If you want to export as a PDF, switch to Classic view.'
										action={<Button onClick={() => setView('classic')}>Classic</Button>}
									/>
									: null
							}
							{
								view === 'classic' ?
									<>
										<Button onClick={() => props.exportElementPdf(category, element, 'standard')}>Export As PDF</Button>
										<Button onClick={() => props.exportElementPdf(category, element, 'high')}>Export As PDF (high res)</Button>
									</>
									: null
							}
							<Button onClick={() => props.exportElementData(category, element)}>Export as Data</Button>
						</div>
					);
					break;
				case 'adventure':
				case 'tactical-map':
					content = (
						<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<Button onClick={() => props.exportElementData(category, element)}>Export as Data</Button>
						</div>
					);
					break;
			}

			return (
				<Popover
					trigger='click'
					content={content}
				>
					<Button icon={<UploadOutlined />}>
						Export
						<DownOutlined />
					</Button>
				</Popover>
			);
		};

		const getDelete = () => {
			return sourcebook.type === SourcebookType.Homebrew ?
				<DangerButton
					mode='block'
					disabled={SourcebookLogic.getUsedIn(props.sourcebooks, element.id).length !== 0}
					onConfirm={() => props.deleteElement(category, sourcebook.id, element)}
				/>
				: null;
		};

		return (
			<>
				{getCreateHomebrew()}
				{getEdit()}
				{getCopy()}
				{getExport()}
				{getDelete()}
			</>
		);
	};

	const getSidebar = () => {
		const getElementListHeader = () => {
			switch (category) {
				case 'monster-group':
					return (
						<div className='list-header'>
							<Flex align='center' justify='space-between' gap={5}>
								<Segmented
									style={{ flex: '1 1 0' }}
									block={true}
									options={[
										{ value: false, label: 'Groups' },
										{ value: true, label: 'Monsters' }
									]}
									value={showMonsters}
									onChange={setShowMonsters}
								/>
								<Button
									disabled={!showMonsters}
									icon={showMonsterFilter ? <FilterFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <FilterOutlined />}
									onClick={() => setShowMonsterFilter(!showMonsterFilter)}
								/>
							</Flex>
							{
								showMonsters && showMonsterFilter ?
									<SelectablePanel style={{ padding: '15px 10px 10px 10px' }}>
										<MonsterFilterPanel
											monsterFilter={monsterFilter}
											monsters={SourcebookLogic.getMonsters(props.sourcebooks)}
											includeNameFilter={false}
											includeOrgFilter={true}
											includeEVFilter={true}
											onChange={setMonsterFilter}
										/>
									</SelectablePanel>
									: null
							}
						</div>
					);
				case 'culture':
					return (
						<div className='list-header'>
							<Toggle style={{ margin: '0' }} label='Include cultures from ancestries' value={showCulturesFromAncestries} onChange={setShowCulturesFromAncestries} />
						</div>
					);
				case 'project':
					return (
						<div className='list-header'>
							<Toggle style={{ margin: '0' }} label='Include projects from imbuements' value={showProjectsFromImbuements} onChange={setShowProjectsFromImbuements} />
							<Toggle style={{ margin: '0' }} label='Include projects from items' value={showProjectsFromItems} onChange={setShowProjectsFromItems} />
						</div>
					);
				case 'subclass':
					return (
						<div className='list-header'>
							<Toggle style={{ margin: '0' }} label='Include subclasses from classes' value={showSubclassesFromClasses} onChange={setShowSubclassesFromClasses} />
						</div>
					);
			}

			return null;
		};

		const getElementListItems = () => {
			const listItems: ReactNode[] = [];

			getGroupHeaders().forEach(header => {
				if (header) {
					listItems.push(
						<div key={`${header}-header`} className='selection-list-group-header'>
							<HeaderText level={3}>{header || 'List'}</HeaderText>
						</div>
					);
				}

				const items = getList().filter(item => getGroupHeader(item) === header);

				items.forEach(a => {
					listItems.push(
						<SelectorRow
							key={a.id}
							selected={selectedID === a.id}
							content={(category === 'monster-group') && showMonsters ? <MonsterInfo monster={a as Monster} /> : a.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`}
							info={getInfo(a)}
							onSelect={() => navigation.goToLibrary(category, a.id)}
						/>
					);
				});

				if (items.length === 0) {
					listItems.push(
						<Empty key={`${header}-empty`} />
					);
				}
			});

			if (listItems.length === 0) {
				listItems.push(
					<Empty key='empty' />
				);
			}

			return listItems;
		};

		return (
			<div className={showSidebar ? 'selection-sidebar' : 'selection-sidebar closed'}>
				<div className='selection-toolbar'>
					{
						showSidebar ?
							<Input
								name='search'
								placeholder='Search'
								allowClear={true}
								value={searchTerm}
								suffix={<SearchOutlined />}
								onChange={e => setSearchTerm(e.target.value)}
							/>
							: null
					}
					{
						showSidebar ?
							<Button onClick={props.showSourcebooks}>
								Sourcebooks
							</Button>
							: null
					}
					<Button icon={showSidebar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />} style={{ flex: '0 0 auto' }} onClick={() => setShowSidebar(!showSidebar)} />
				</div>
				{
					showSidebar ?
						<div className='selection-content'>
							<div className='selection-list categories'>
								<div className='selection-list-group-header'>
									<HeaderText level={3}>For Players</HeaderText>
								</div>
								<SelectorRow selected={category === 'ancestry'} content='Ancestries' info={getAncestries().length} onSelect={() => navigation.goToLibrary('ancestry')} />
								<SelectorRow selected={category === 'career'} content='Careers' info={getCareers().length} onSelect={() => navigation.goToLibrary('career')} />
								<SelectorRow selected={category === 'class'} content='Classes' info={getClasses().length} onSelect={() => navigation.goToLibrary('class')} />
								<SelectorRow selected={category === 'complication'} content='Complications' info={getComplications().length} onSelect={() => navigation.goToLibrary('complication')} />
								<SelectorRow selected={category === 'culture'} content='Cultures' info={getCultures().length} onSelect={() => navigation.goToLibrary('culture')} />
								<SelectorRow selected={category === 'domain'} content='Domains' info={getDomains().length} onSelect={() => navigation.goToLibrary('domain')} />
								<SelectorRow selected={category === 'imbuement'} content='Imbuements' info={getImbuements().length} onSelect={() => navigation.goToLibrary('imbuement')} />
								<SelectorRow selected={category === 'item'} content='Items' info={getItems().length} onSelect={() => navigation.goToLibrary('item')} />
								<SelectorRow selected={category === 'kit'} content='Kits' info={getKits().length} onSelect={() => navigation.goToLibrary('kit')} />
								<SelectorRow selected={category === 'perk'} content='Perks' info={getPerks().length} onSelect={() => navigation.goToLibrary('perk')} />
								<SelectorRow selected={category === 'project'} content='Projects' info={getProjects().length} onSelect={() => navigation.goToLibrary('project')} />
								<SelectorRow selected={category === 'subclass'} content='Subclasses' info={getSubclasses().length} onSelect={() => navigation.goToLibrary('subclass')} />
								<SelectorRow selected={category === 'title'} content='Titles' info={getTitles().length} onSelect={() => navigation.goToLibrary('title')} />
								<div className='selection-list-group-header'>
									<HeaderText level={3}>For Directors</HeaderText>
								</div>
								<SelectorRow selected={category === 'adventure'} content='Adventures' info={getAdventures().length} onSelect={() => navigation.goToLibrary('adventure')} />
								<SelectorRow selected={category === 'encounter'} content='Encounters' info={getEncounters().length} onSelect={() => navigation.goToLibrary('encounter')} />
								<SelectorRow selected={category === 'monster-group'} content='Monsters' info={showMonsters ? getMonsters().length : getMonsterGroups().length} onSelect={() => navigation.goToLibrary('monster-group')} />
								<SelectorRow selected={category === 'montage'} content='Montages' info={getMontages().length} onSelect={() => navigation.goToLibrary('montage')} />
								<SelectorRow selected={category === 'negotiation'} content='Negotiations' info={getNegotiations().length} onSelect={() => navigation.goToLibrary('negotiation')} />
								<SelectorRow selected={category === 'tactical-map'} content='Tactical Maps' info={getTacticalMaps().length} onSelect={() => navigation.goToLibrary('tactical-map')} />
								<SelectorRow selected={category === 'terrain'} content='Terrain' info={getTerrainObjects().length} onSelect={() => navigation.goToLibrary('terrain')} />
							</div>
							<div className='selection-list elements'>
								{getElementListHeader()}
								{getElementListItems()}
							</div>
						</div>
						: null
				}
			</div>
		);
	};

	const selected = getList().find(item => item.id == selectedID);
	const getPanel = getElementPanel();

	const showViewSelector = !!selectedID && (category !== 'adventure') && (category !== 'tactical-map');

	return (
		<ErrorBoundary>
			<div className='library-list-page'>
				<AppHeader subheader='Library'>
					{getAddBtn()}
					{getElementToolbar()}
					{
						showViewSelector ?
							<div className='divider' />
							: null
					}
					{
						showViewSelector ?
							<ViewSelector value={view} onChange={setView} />
							: null
					}
				</AppHeader>
				<ErrorBoundary>
					<div className='library-list-page-content'>
						{getSidebar()}
						<div className='element-selected'>
							{
								selected ?
									getPanel(selected)
									:
									<Empty text='Nothing selected' />
							}
						</div>
					</div>
				</ErrorBoundary>
				<AppFooter
					page='library'
					highlightAbout={props.highlightAbout}
					showReference={props.showReference}
					showRoll={props.showRoll}
					showAbout={props.showAbout}
					showSettings={props.showSettings}
				/>
			</div>
		</ErrorBoundary>
	);
};
