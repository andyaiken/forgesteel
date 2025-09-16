import { BookOutlined, CopyOutlined, DownOutlined, DownloadOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popover, Select, Space, Upload } from 'antd';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '../../../../models/sourcebook';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Career } from '../../../../models/career';
import { CareerPanel } from '../../../panels/elements/career-panel/career-panel';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Complication } from '../../../../models/complication';
import { ComplicationPanel } from '../../../panels/elements/complication-panel/complication-panel';
import { Culture } from '../../../../models/culture';
import { CulturePanel } from '../../../panels/elements/culture-panel/culture-panel';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Domain } from '../../../../models/domain';
import { DomainPanel } from '../../../panels/elements/domain-panel/domain-panel';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { Imbuement } from '../../../../models/imbuement';
import { ImbuementPanel } from '../../../panels/elements/imbuement-panel/imbuement-panel';
import { Item } from '../../../../models/item';
import { ItemPanel } from '../../../panels/elements/item-panel/item-panel';
import { Kit } from '../../../../models/kit';
import { KitPanel } from '../../../panels/elements/kit-panel/kit-panel';
import { Monster } from '../../../../models/monster';
import { MonsterGroup } from '../../../../models/monster-group';
import { MonsterGroupPanel } from '../../../panels/elements/monster-group-panel/monster-group-panel';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Perk } from '../../../../models/perk';
import { PerkPanel } from '../../../panels/elements/perk-panel/perk-panel';
import { Playbook } from '../../../../models/playbook';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { SelectorRow } from '../../../panels/selector-row/selector-row';
import { SourcebookData } from '../../../../data/sourcebook-data';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { SubClass } from '../../../../models/subclass';
import { SubclassPanel } from '../../../panels/elements/subclass-panel/subclass-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { Title } from '../../../../models/title';
import { TitlePanel } from '../../../panels/elements/title-panel/title-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './library-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	hiddenSourcebookIDs: string[];
	highlightAbout: boolean;
	showDirectory: () => void;
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
	const [ sourcebookID, setSourcebookID ] = useState<string | null>(props.sourcebooks.filter(cs => cs.isHomebrew).length > 0 ? props.sourcebooks.filter(cs => cs.isHomebrew)[0].id : null);

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
				list = getMonsterGroups();
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
				getPanel = (element: Element) => <MonsterGroupPanel key={element.id} monsterGroup={element as MonsterGroup} options={props.options} mode={PanelMode.Full} onSelectMonster={props.showMonster} />;
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

	const getSourcebook = (id: string) => {
		let sourcebook: Sourcebook | undefined;

		switch (category) {
			case 'ancestry':
				sourcebook = props.sourcebooks.find(sb => sb.ancestries.some(a => a.id === id));
				break;
			case 'career':
				sourcebook = props.sourcebooks.find(sb => sb.careers.some(a => a.id === id));
				break;
			case 'class':
				sourcebook = props.sourcebooks.find(sb => sb.classes.some(a => a.id === id));
				break;
			case 'complication':
				sourcebook = props.sourcebooks.find(sb => sb.complications.some(a => a.id === id));
				break;
			case 'culture':
				sourcebook = props.sourcebooks.find(sb => sb.cultures.some(a => a.id === id));
				break;
			case 'domain':
				sourcebook = props.sourcebooks.find(sb => sb.domains.some(a => a.id === id));
				break;
			case 'imbuement':
				sourcebook = props.sourcebooks.find(sb => sb.imbuements.some(a => a.id === id));
				break;
			case 'item':
				sourcebook = props.sourcebooks.find(sb => sb.items.some(a => a.id === id));
				break;
			case 'kit':
				sourcebook = props.sourcebooks.find(sb => sb.kits.some(a => a.id === id));
				break;
			case 'monster-group':
				sourcebook = props.sourcebooks.find(sb => sb.monsterGroups.some(a => a.id === id));
				break;
			case 'perk':
				sourcebook = props.sourcebooks.find(sb => sb.perks.some(a => a.id === id));
				break;
			case 'subclass':
				sourcebook = props.sourcebooks.find(sb => sb.subclasses.some(a => a.id === id));
				break;
			case 'terrain':
				sourcebook = props.sourcebooks.find(sb => sb.terrain.some(a => a.id === id));
				break;
			case 'title':
				sourcebook = props.sourcebooks.find(sb => sb.titles.some(a => a.id === id));
				break;
		}

		return sourcebook || null;
	};

	const getInfo = (id: string) => {
		const sb = getSourcebook(id);
		if (sb && sb.id !== SourcebookData.core.id) {
			return sb.name;
		}

		return null;
	};

	const getElementToolbar = () => {
		const list = getList();
		const element = list.find(item => item.id == selectedID);
		const sourcebook = getSourcebook(selectedID || '');

		if (!element || !sourcebook) {
			return null;
		}

		return (
			<>
				{
					!sourcebook.isHomebrew && (props.sourcebooks.filter(sb => sb.isHomebrew).length === 0) ?
						<Button icon={<CopyOutlined />} onClick={() => props.createElement(category, null, element)}>
							Create Homebrew Version
						</Button>
						: null
				}
				{
					!sourcebook.isHomebrew && (props.sourcebooks.filter(sb => sb.isHomebrew).length > 0) ?
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
								Create Homebrew Version
								<DownOutlined />
							</Button>
						</Popover>
						: null
				}
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

	try {
		const list = getList();
		const selected = list.find(item => item.id == selectedID);
		const getPanel = getElementPanel();

		const sourcebookOptions = props.sourcebooks
			.filter(cs => cs.isHomebrew)
			.map(cs => ({ label: cs.name || 'Unnamed Sourcebook', value: cs.id }));

		return (
			<ErrorBoundary>
				<div className='library-list-page'>
					<AppHeader subheader='Library' showDirectory={props.showDirectory}>
						<Input
							name='search'
							placeholder='Search'
							allowClear={true}
							value={searchTerm}
							suffix={<SearchOutlined />}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='divider' />
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
						{getElementToolbar()}
						<div className='divider' />
						<Button icon={<BookOutlined />} onClick={props.showSourcebooks}>
							Sourcebooks
						</Button>
					</AppHeader>
					<div className='library-list-page-content'>
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
							<SelectorRow selected={category === 'monster-group'} content='Monster Groups' info={getMonsterGroups().length} onSelect={() => navigation.goToLibrary('monster-group')} />
							<SelectorRow selected={category === 'perk'} content='Perks' info={getPerks().length} onSelect={() => navigation.goToLibrary('perk')} />
							<SelectorRow selected={category === 'subclass'} content='Subclasses' info={getSubclasses().length} onSelect={() => navigation.goToLibrary('subclass')} />
							<SelectorRow selected={category === 'terrain'} content='Terrain' info={getTerrainObjects().length} onSelect={() => navigation.goToLibrary('terrain')} />
							<SelectorRow selected={category === 'title'} content='Titles' info={getTitles().length} onSelect={() => navigation.goToLibrary('title')} />
						</div>
						<div className='selection-list elements'>
							{
								list.map(a => (
									<SelectorRow key={a.id} selected={selectedID === a.id} content={a.name} info={getInfo(a.id)} onSelect={() => navigation.goToLibrary(category, a.id)} />
								))
							}
							{
								list.length === 0 ?
									<Empty />
									: null
							}
						</div>
						<div className='element-selected'>
							{
								selected ?
									getPanel(selected)
									:
									<Empty text='Nothing selected' />
							}
						</div>
					</div>
					<AppFooter page='library' highlightAbout={props.highlightAbout} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
