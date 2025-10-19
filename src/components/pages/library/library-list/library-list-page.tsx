import { Alert, Button, Divider, Flex, Input, Popover, Segmented, Select, Space, Upload } from 'antd';
import { CopyOutlined, DoubleLeftOutlined, DoubleRightOutlined, DownOutlined, DownloadOutlined, EditOutlined, FilterFilled, FilterOutlined, PlusOutlined, SearchOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
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
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
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
import { Options } from '@/models/options';
import { OptionsPanel } from '@/components/panels/options/options-panel';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { Playbook } from '@/models/playbook';
import { PlaybookLogic } from '@/logic/playbook-logic';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SelectorRow } from '@/components/panels/selector-row/selector-row';
import { SourcebookData } from '@/data/sourcebook-data';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';

import './library-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	hiddenSourcebookIDs: string[];
	highlightAbout: boolean;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showSourcebooks: () => void;
	showSubclass: (subclass: SubClass) => void;
	showMonster: (monster: Monster) => void;
	setOptions: (options: Options) => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string | null, element: Element | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string | null, element: Element) => void;
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElement: (kind: SourcebookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
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
	const [ showMonsterFilter, setShowMonsterFilter ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ sourcebookID, setSourcebookID ] = useState<string | null>(props.sourcebooks.filter(cs => cs.isHomebrew).length > 0 ? props.sourcebooks.filter(cs => cs.isHomebrew)[0].id : null);

	if (kind !== previousCategory) {
		setCategory(kind || 'ancestry');
		setPreviousCategory(kind);
	}

	if (elementID !== previousSelectedID) {
		setSelectedID(elementID || null);
		setPreviousSelectedID(elementID);
	}

	const setShowMonsterGroups = (value: boolean) => {
		const copy = Utils.copy(props.options);
		copy.showMonsterGroups = value;
		props.setOptions(copy);
	};

	const getSourcebooks = () => {
		return props.sourcebooks.filter(cs => !props.hiddenSourcebookIDs.includes(cs.id));
	};

	// #region Get Elements

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
				.getCultures(getSourcebooks())
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

	const getSubclasses = () => {
		try {
			return SourcebookLogic
				.getSubClasses(getSourcebooks())
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
				list = props.options.showMonsterGroups ? getMonsterGroups() : getMonsters();
				break;
			case 'perk':
				list = getPerks();
				break;
			case 'subclass':
				list = getSubclasses();
				break;
			case 'terrain':
				list = getTerrainObjects();
				break;
			case 'title':
				list = getTitles();
				break;
		}

		return list;
	};

	const getGroupHeaders = () => {
		const headers = getList().map(getGroupHeader);
		const distinct = Collections.distinct(headers, x => x);
		return Collections.sort(distinct, x => x || '');
	};

	const getElementPanel = () => {
		let getPanel: (element: Element) => ReactNode = () => null;

		switch (category) {
			case 'ancestry':
				getPanel = (element: Element) => <AncestryPanel key={element.id} ancestry={element as Ancestry} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'career':
				getPanel = (element: Element) => <CareerPanel key={element.id} career={element as Career} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'class':
				getPanel = (element: Element) => <ClassPanel key={element.id} heroClass={element as HeroClass} options={props.options} mode={PanelMode.Full} onSelectSubclass={props.showSubclass} />;
				break;
			case 'complication':
				getPanel = (element: Element) => <ComplicationPanel key={element.id} complication={element as Complication} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'culture':
				getPanel = (element: Element) => <CulturePanel key={element.id} culture={element as Culture} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'domain':
				getPanel = (element: Element) => <DomainPanel key={element.id} domain={element as Domain} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'imbuement':
				getPanel = (element: Element) => <ImbuementPanel key={element.id} imbuement={element as Imbuement} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'item':
				getPanel = (element: Element) => <ItemPanel key={element.id} item={element as Item} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'kit':
				getPanel = (element: Element) => <KitPanel key={element.id} kit={element as Kit} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'monster-group':
				getPanel = (element: Element) => {
					return props.options.showMonsterGroups ?
						<MonsterGroupPanel key={element.id} monsterGroup={element as MonsterGroup} options={props.options} mode={PanelMode.Full} onSelectMonster={props.showMonster} />
						:
						<MonsterPanel key={element.id} monster={element as Monster} options={props.options} mode={PanelMode.Full} />;
				};
				break;
			case 'perk':
				getPanel = (element: Element) => <PerkPanel key={element.id} perk={element as Perk} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'subclass':
				getPanel = (element: Element) => <SubclassPanel key={element.id} subclass={element as SubClass} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'terrain':
				getPanel = (element: Element) => <TerrainPanel key={element.id} terrain={element as Terrain} mode={PanelMode.Full} />;
				break;
			case 'title':
				getPanel = (element: Element) => <TitlePanel key={element.id} title={element as Title} options={props.options} mode={PanelMode.Full} />;
				break;
		}

		return getPanel;
	};

	const getSourcebook = (element: Element) => {
		let sourcebook: Sourcebook | undefined;

		switch (category) {
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
				sourcebook = props.options.showMonsterGroups ?
					SourcebookLogic.getMonsterGroupSourcebook(props.sourcebooks, element as MonsterGroup)
					:
					SourcebookLogic.getMonsterSourcebook(props.sourcebooks, element as Monster);
				break;
			case 'perk':
				sourcebook = SourcebookLogic.getPerkSourcebook(props.sourcebooks, element as Perk);
				break;
			case 'subclass':
				sourcebook = SourcebookLogic.getSubClassSourcebook(props.sourcebooks, element as SubClass);
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
		if ((category === 'monster-group') && props.options.showMonsterGroups) {
			return (element as MonsterGroup).monsters.length;
		}

		return undefined;
	};

	const getTags = (element: Element) => {
		const tags: string[] = [];

		const sb = getSourcebook(element);
		if (sb && sb.id !== SourcebookData.core.id) {
			tags.push(sb.name || 'Unnamed Sourcebook');
			if (sb.isHomebrew) {
				tags.push('Homebrew');
			}
		}

		if (category === 'class') {
			const heroClass = element as HeroClass;
			switch (heroClass.type) {
				case 'master':
					tags.push('Master Class');
					break;
			}
		}

		return tags.length > 0 ? tags : undefined;
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

		if (category === 'title') {
			const title = element as Title;
			return `Echelon ${title.echelon}`;
		}

		return null;
	};

	const getElementToolbar = () => {
		const element = getList().find(item => item.id == selectedID);
		if (!element) {
			return null;
		}

		const sourcebook = getSourcebook(element);
		if (!sourcebook) {
			return null;
		}

		const homebrewSourcebooks = props.sourcebooks.filter(sb => sb.isHomebrew);

		const getCreateHomebrew = () => {
			if ((category === 'monster-group') && !props.options.showMonsterGroups) {
				return (
					<Popover
						trigger='click'
						content={(
							<Alert
								type='info'
								showIcon={true}
								message='To create a homebrew version of this monster, switch to Group view.'
								action={<Button style={{ marginLeft: '5px' }} onClick={() => setShowMonsterGroups(true)}>Switch</Button>}
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

			if (!sourcebook.isHomebrew && (homebrewSourcebooks.length === 0)) {
				return (
					<Button icon={<CopyOutlined />} onClick={() => props.createElement(category, null, element)}>
						Create Homebrew Version
					</Button>
				);
			}

			if (!sourcebook.isHomebrew && (homebrewSourcebooks.length > 0)) {
				return (
					<Popover
						trigger='click'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<ErrorBoundary>
									{homebrewSourcebooks.map(sb => <Button key={sb.id} onClick={() => props.createElement(category, sb.id, element)}>In {sb.name || 'Unnamed Sourcebook'}</Button>)}
								</ErrorBoundary>
								<Button onClick={() => props.createElement(category, null, element)}>In a new sourcebook</Button>
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

		return (
			<>
				{getCreateHomebrew()}
				{
					sourcebook.isHomebrew ?
						<Button icon={<EditOutlined />} onClick={() => navigation.goToLibraryEdit(category, sourcebook.id, element.id)}>
							Edit
						</Button>
						: null
				}
				{
					sourcebook.isHomebrew ?
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<ErrorBoundary>
										{
											props.sourcebooks
												.filter(sb => sb.isHomebrew)
												.map(sb => <Button key={sb.id} onClick={() => props.createElement(category, sb.id, element)}>In {sb.name || 'Unnamed Sourcebook'}</Button>)
										}
									</ErrorBoundary>
									<Button onClick={() => props.createElement(category, null, element)}>In a new sourcebook</Button>
								</div>
							)}
						>
							<Button icon={<CopyOutlined />}>
								Copy
							</Button>
						</Popover>
						: null
				}
				<Popover
					trigger='click'
					content={(
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<Button onClick={() => props.exportElement(category, element, 'image')}>Export As Image</Button>
							<Button onClick={() => props.exportElement(category, element, 'pdf')}>Export As PDF</Button>
							<Button onClick={() => props.exportElement(category, element, 'json')}>Export as Data</Button>
						</div>
					)}
				>
					<Button icon={<UploadOutlined />}>
						Export
						<DownOutlined />
					</Button>
				</Popover>
				{
					sourcebook.isHomebrew ?
						<DangerButton
							mode='block'
							disabled={PlaybookLogic.getUsedIn(props.playbook, element.id).length !== 0}
							onConfirm={() => props.deleteElement(category, sourcebook.id, element)}
						/>
						: null
				}
			</>
		);
	};

	const getSidebar = () => {
		const getElementListHeader = () => {
			if (category === 'monster-group') {
				return (
					<div className='list-header'>
						<Flex align='center' justify='space-between' gap={5}>
							<Segmented
								style={{ flex: '1 1 0' }}
								block={true}
								options={[
									{ value: true, label: 'Groups' },
									{ value: false, label: 'Monsters' }
								]}
								value={props.options.showMonsterGroups}
								onChange={setShowMonsterGroups}
							/>
							<Button
								type='text'
								disabled={props.options.showMonsterGroups}
								icon={showMonsterFilter ? <FilterFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <FilterOutlined />}
								onClick={() => setShowMonsterFilter(!showMonsterFilter)}
							/>
						</Flex>
						{
							!props.options.showMonsterGroups && showMonsterFilter ?
								<SelectablePanel style={{ padding: '15px 10px 10px 10px' }}>
									<MonsterFilterPanel monsterFilter={monsterFilter} monsters={SourcebookLogic.getMonsters(props.sourcebooks)} includeNameFilter={false} onChange={setMonsterFilter} />
								</SelectablePanel>
								: null
						}
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
							content={(category === 'monster-group') && !props.options.showMonsterGroups ? <MonsterInfo monster={a as Monster} /> : a.name || `Unnamed ${Format.capitalize(category)}`}
							info={getInfo(a)}
							tags={getTags(a)}
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
								<SelectorRow selected={category === 'ancestry'} content='Ancestries' info={getAncestries().length} onSelect={() => navigation.goToLibrary('ancestry')} />
								<SelectorRow selected={category === 'career'} content='Careers' info={getCareers().length} onSelect={() => navigation.goToLibrary('career')} />
								<SelectorRow selected={category === 'class'} content='Classes' info={getClasses().length} onSelect={() => navigation.goToLibrary('class')} />
								<SelectorRow selected={category === 'complication'} content='Complications' info={getComplications().length} onSelect={() => navigation.goToLibrary('complication')} />
								<SelectorRow selected={category === 'culture'} content='Cultures' info={getCultures().length} onSelect={() => navigation.goToLibrary('culture')} />
								<SelectorRow selected={category === 'domain'} content='Domains' info={getDomains().length} onSelect={() => navigation.goToLibrary('domain')} />
								<SelectorRow selected={category === 'imbuement'} content='Imbuements' info={getImbuements().length} onSelect={() => navigation.goToLibrary('imbuement')} />
								<SelectorRow selected={category === 'item'} content='Items' info={getItems().length} onSelect={() => navigation.goToLibrary('item')} />
								<SelectorRow selected={category === 'kit'} content='Kits' info={getKits().length} onSelect={() => navigation.goToLibrary('kit')} />
								<SelectorRow selected={category === 'monster-group'} content='Monsters' info={props.options.showMonsterGroups ? getMonsterGroups().length : getMonsters().length} onSelect={() => navigation.goToLibrary('monster-group')} />
								<SelectorRow selected={category === 'perk'} content='Perks' info={getPerks().length} onSelect={() => navigation.goToLibrary('perk')} />
								<SelectorRow selected={category === 'subclass'} content='Subclasses' info={getSubclasses().length} onSelect={() => navigation.goToLibrary('subclass')} />
								<SelectorRow selected={category === 'terrain'} content='Terrain' info={getTerrainObjects().length} onSelect={() => navigation.goToLibrary('terrain')} />
								<SelectorRow selected={category === 'title'} content='Titles' info={getTitles().length} onSelect={() => navigation.goToLibrary('title')} />
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

	const sourcebookOptions = props.sourcebooks
		.filter(cs => cs.isHomebrew)
		.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

	return (
		<ErrorBoundary>
			<div className='library-list-page'>
				<AppHeader subheader='Library'>
					{
						(category === 'monster-group') && !props.options.showMonsterGroups ?
							<Popover
								trigger='click'
								content={(
									<Alert
										type='info'
										showIcon={true}
										message='To create a new monster, switch to Group view.'
										action={<Button style={{ marginLeft: '5px' }} onClick={() => setShowMonsterGroups(true)}>Switch</Button>}
									/>
								)}
							>
								<Button type='primary'>
									Add
									<DownOutlined />
								</Button>
							</Popover>
							:
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
										{
											sourcebookOptions.length > 1 ?
												<div>
													<div className='ds-text'>Where do you want it to live?</div>
													<Select
														style={{ width: '100%' }}
														placeholder='Select'
														options={sourcebookOptions}
														optionRender={option => <div className='ds-text'>{option.data.label}</div>}
														showSearch={true}
														filterOption={(input, option) => {
															const strings = option ?
																[
																	option.label
																]
																: [];
															return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
														}}
														value={sourcebookID}
														onChange={setSourcebookID}
													/>
												</div>
												: null
										}
										{sourcebookOptions.length > 1 ? <Divider /> : null}
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
										</Space>
									</div>
								)}
							>
								<Button type='primary'>
									Add
									<DownOutlined />
								</Button>
							</Popover>
					}
					{getElementToolbar()}
					<Popover
						trigger='click'
						content={<OptionsPanel mode='library' options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
					>
						<Button icon={<SettingOutlined />}>
							Options
							<DownOutlined />
						</Button>
					</Popover>
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
				<AppFooter page='library' highlightAbout={props.highlightAbout} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
			</div>
		</ErrorBoundary>
	);
};
