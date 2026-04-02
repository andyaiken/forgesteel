import { Alert, Button, Divider, Flex, Segmented } from 'antd';
import { AppFooter, FooterParams } from '@/components/panels/app-footer/app-footer';
import { ArrowRightOutlined, CopyOutlined, DoubleLeftOutlined, DoubleRightOutlined, EditOutlined, FilterFilled, FilterOutlined, PlayCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { ButtonConfig, ButtonGroup, DangerConfig, DropdownConfig } from '@/components/controls/button-group/button-group';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { AddBtn } from '@/components/pages/library/library-list/controls/add-btn';
import { Adventure } from '@/models/adventure';
import { AdventurePanel } from '@/components/panels/elements/adventure-panel/adventure-panel';
import { Ancestry } from '@/models/ancestry';
import { AncestryPanel } from '@/components/panels/elements/ancestry-panel/ancestry-panel';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { Career } from '@/models/career';
import { CareerPanel } from '@/components/panels/elements/career-panel/career-panel';
import { ClassPanel } from '@/components/panels/elements/class-panel/class-panel';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ComplicationPanel } from '@/components/panels/elements/complication-panel/complication-panel';
import { Culture } from '@/models/culture';
import { CulturePanel } from '@/components/panels/elements/culture-panel/culture-panel';
import { DestinationSelector } from '@/components/pages/library/library-list/controls/destination-selector';
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { EncounterSheetPage } from '@/components/panels/classic-sheet/encounter-sheet/encounter-sheet-page';
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
import { LibraryLogic } from '@/logic/library-logic';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterFilterPanel } from '@/components/panels/monster-filter/monster-filter-panel';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterGroupPanel } from '@/components/panels/elements/monster-group-panel/monster-group-panel';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Montage } from '@/models/montage';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { MontageSheetPage } from '@/components/panels/classic-sheet/montage-sheet/montage-sheet-page';
import { Negotiation } from '@/models/negotiation';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { NegotiationSheetPage } from '@/components/panels/classic-sheet/negotiation-sheet/negotiation-sheet-page';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Perk } from '@/models/perk';
import { PerkPanel } from '@/components/panels/elements/perk-panel/perk-panel';
import { Project } from '@/models/project';
import { ProjectPanel } from '@/components/panels/elements/project-panel/project-panel';
import { SearchBox } from '@/components/controls/text-input/text-input';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SelectorRow } from '@/components/panels/selector-row/selector-row';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { SourcebookType } from '@/enums/sourcebook-type';
import { SubClass } from '@/models/subclass';
import { SubclassPanel } from '@/components/panels/elements/subclass-panel/subclass-panel';
import { TacticalMap } from '@/models/tactical-map';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Toggle } from '@/components/controls/toggle/toggle';
import { ViewSelector } from '@/components/panels/view-selector/view-selector';
import { useIsSmall } from '@/hooks/use-is-small';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';
import { useTitle } from '@/hooks/use-title';

import './library-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	hiddenSourcebookIDs: string[];
	params: FooterParams;
	showSourcebooks: () => void;
	showMonster: (monster: Monster) => void;
	showEncounterTools: (encounter: Encounter, tool: string) => void;
	createElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element | null) => void;
	importElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	moveElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElementData: (category: string, element: Element) => void;
	exportElementImage: (category: string, element: Element) => void;
	exportElementPdf: (category: string, element: Element, resolution: 'standard' | 'high') => void;
	startEncounter: (encounter: Encounter) => void;
	startMontage: (montage: Montage) => void;
	startNegotiation: (negotiation: Negotiation) => void;
	startMap: (map: TacticalMap) => void;
}

export const LibraryListPage = (props: Props) => {
	const isSmall = useIsSmall();
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
	const [ sourcebookID, setSourcebookID ] = useState<string>(props.sourcebooks.filter(sb => sb.type === SourcebookType.Homebrew).length > 0 ? Collections.sort(props.sourcebooks, sb => sb.name).filter(sb => sb.type === SourcebookType.Homebrew)[0].id : '');
	useTitle('Library');

	if (kind !== previousCategory) {
		setCategory(kind || 'ancestry');
		setPreviousCategory(kind);
		setView('modern');
	}

	if (elementID !== previousSelectedID) {
		setSelectedID(elementID || null);
		setPreviousSelectedID(elementID);
	}

	const getList = (type: string) => {
		let list: Element[] = [];

		const getSourcebooks = () => {
			return props.sourcebooks.filter(sb => !props.hiddenSourcebookIDs.includes(sb.id));
		};

		switch (type) {
			case 'adventure':
				list = LibraryLogic.getAdventures(getSourcebooks(), searchTerm);
				break;
			case 'ancestry':
				list = LibraryLogic.getAncestries(getSourcebooks(), searchTerm);
				break;
			case 'career':
				list = LibraryLogic.getCareers(getSourcebooks(), searchTerm);
				break;
			case 'class':
				list = LibraryLogic.getClasses(getSourcebooks(), searchTerm);
				break;
			case 'complication':
				list = LibraryLogic.getComplications(getSourcebooks(), searchTerm);
				break;
			case 'culture':
				list = LibraryLogic.getCultures(getSourcebooks(), searchTerm, showCulturesFromAncestries);
				break;
			case 'domain':
				list = LibraryLogic.getDomains(getSourcebooks(), searchTerm);
				break;
			case 'encounter':
				list = LibraryLogic.getEncounters(getSourcebooks(), searchTerm);
				break;
			case 'imbuement':
				list = LibraryLogic.getImbuements(getSourcebooks(), searchTerm);
				break;
			case 'item':
				list = LibraryLogic.getItems(getSourcebooks(), searchTerm);
				break;
			case 'kit':
				list = LibraryLogic.getKits(getSourcebooks(), searchTerm);
				break;
			case 'monster-group':
				list = showMonsters ?
					LibraryLogic.getMonsters(getSourcebooks(), searchTerm, monsterFilter)
					:
					LibraryLogic.getMonsterGroups(getSourcebooks(), searchTerm);
				break;
			case 'montage':
				list = LibraryLogic.getMontages(getSourcebooks(), searchTerm);
				break;
			case 'negotiation':
				list = LibraryLogic.getNegotiations(getSourcebooks(), searchTerm);
				break;
			case 'perk':
				list = LibraryLogic.getPerks(getSourcebooks(), searchTerm);
				break;
			case 'project':
				list = LibraryLogic.getProjects(getSourcebooks(), searchTerm, showProjectsFromImbuements, showProjectsFromItems);
				break;
			case 'subclass':
				list = LibraryLogic.getSubclasses(getSourcebooks(), searchTerm, showSubclassesFromClasses);
				break;
			case 'tactical-map':
				list = LibraryLogic.getTacticalMaps(getSourcebooks(), searchTerm);
				break;
			case 'terrain':
				list = LibraryLogic.getTerrainObjects(getSourcebooks(), searchTerm);
				break;
			case 'title':
				list = LibraryLogic.getTitles(getSourcebooks(), searchTerm);
				break;
		}

		return Collections.distinct(list, x => x.id);
	};

	const getElementPanel = () => {
		let getPanel: (element: Element) => ReactNode = () => null;

		if (view === 'classic') {
			getPanel = (element: Element) => {
				switch (category) {
					case 'encounter':
						return (
							<div style={{ padding: '20px', overflow: 'auto' }}>
								<EncounterSheetPage
									encounter={element as Encounter}
									sourcebooks={props.sourcebooks}
									heroes={props.heroes}
									options={props.options}
								/>
							</div>
						);
					case 'montage':
						return (
							<div style={{ padding: '20px', overflow: 'auto' }}>
								<MontageSheetPage
									montage={element as Montage}
									heroes={props.heroes}
									options={props.options}
								/>
							</div>
						);
					case 'negotiation':
						return (
							<div style={{ padding: '20px', overflow: 'auto' }}>
								<NegotiationSheetPage
									negotiation={element as Negotiation}
									options={props.options}
								/>
							</div>
						);
				}

				return null;
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
					getPanel = (element: Element) => <EncounterPanel key={element.id} encounter={element as Encounter} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} showTools={tool => props.showEncounterTools(element as Encounter, tool)} />;
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
					getPanel = (element: Element) => <MontagePanel key={element.id} montage={element as Montage} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
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

			const headers = getList(category).map(item => LibraryLogic.getGroupHeader(item, category, props.sourcebooks));
			const distinctHeaders = Collections.distinct(headers, x => x);
			const sortedHeaders = Collections.sort(distinctHeaders, x => x || '');
			sortedHeaders.forEach(header => {
				if (header) {
					listItems.push(
						<div key={`${header}-header`} className='selection-list-group-header'>
							<HeaderText level={3}>{header || 'List'}</HeaderText>
						</div>
					);
				}

				const items = getList(category).filter(item => LibraryLogic.getGroupHeader(item, category, props.sourcebooks) === header);

				items.forEach(a => {
					listItems.push(
						<SelectorRow
							key={a.id}
							selected={selectedID === a.id}
							content={(category === 'monster-group') && showMonsters ? <MonsterInfo monster={a as Monster} /> : a.name || `Unnamed ${Format.capitalize(category.split('-').join(' '))}`}
							info={LibraryLogic.getInfo(a, category, showMonsters)}
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
							<SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
								<SelectorRow selected={category === 'ancestry'} content='Ancestries' info={getList('ancestry').length} onSelect={() => navigation.goToLibrary('ancestry')} />
								<SelectorRow selected={category === 'career'} content='Careers' info={getList('career').length} onSelect={() => navigation.goToLibrary('career')} />
								<SelectorRow selected={category === 'class'} content='Classes' info={getList('class').length} onSelect={() => navigation.goToLibrary('class')} />
								<SelectorRow selected={category === 'complication'} content='Complications' info={getList('complication').length} onSelect={() => navigation.goToLibrary('complication')} />
								<SelectorRow selected={category === 'culture'} content='Cultures' info={getList('culture').length} onSelect={() => navigation.goToLibrary('culture')} />
								<SelectorRow selected={category === 'domain'} content='Domains' info={getList('domain').length} onSelect={() => navigation.goToLibrary('domain')} />
								<SelectorRow selected={category === 'imbuement'} content='Imbuements' info={getList('imbuement').length} onSelect={() => navigation.goToLibrary('imbuement')} />
								<SelectorRow selected={category === 'item'} content='Items' info={getList('item').length} onSelect={() => navigation.goToLibrary('item')} />
								<SelectorRow selected={category === 'kit'} content='Kits' info={getList('kit').length} onSelect={() => navigation.goToLibrary('kit')} />
								<SelectorRow selected={category === 'perk'} content='Perks' info={getList('perk').length} onSelect={() => navigation.goToLibrary('perk')} />
								<SelectorRow selected={category === 'project'} content='Projects' info={getList('project').length} onSelect={() => navigation.goToLibrary('project')} />
								<SelectorRow selected={category === 'subclass'} content='Subclasses' info={getList('subclass').length} onSelect={() => navigation.goToLibrary('subclass')} />
								<SelectorRow selected={category === 'title'} content='Titles' info={getList('title').length} onSelect={() => navigation.goToLibrary('title')} />
								<div className='selection-list-group-header'>
									<HeaderText level={3}>For Directors</HeaderText>
								</div>
								<SelectorRow selected={category === 'adventure'} content='Adventures' info={getList('adventure').length} onSelect={() => navigation.goToLibrary('adventure')} />
								<SelectorRow selected={category === 'encounter'} content='Encounters' info={getList('encounter').length} onSelect={() => navigation.goToLibrary('encounter')} />
								<SelectorRow selected={category === 'monster-group'} content={showMonsters ? 'Monsters' : 'Monster Groups'} info={showMonsters ? getList('monster').length : getList('monster-group').length} onSelect={() => navigation.goToLibrary('monster-group')} />
								<SelectorRow selected={category === 'montage'} content='Montages' info={getList('montage').length} onSelect={() => navigation.goToLibrary('montage')} />
								<SelectorRow selected={category === 'negotiation'} content='Negotiations' info={getList('negotiation').length} onSelect={() => navigation.goToLibrary('negotiation')} />
								<SelectorRow selected={category === 'tactical-map'} content='Tactical Maps' info={getList('tactical-map').length} onSelect={() => navigation.goToLibrary('tactical-map')} />
								<SelectorRow selected={category === 'terrain'} content='Terrain' info={getList('terrain').length} onSelect={() => navigation.goToLibrary('terrain')} />
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

	const getElementToolbarItems = () => {
		const element = getList(category).find(item => item.id == selectedID);
		if (!element) {
			return [];
		}

		const sourcebook = LibraryLogic.getSourcebook(element, category, props.sourcebooks, showMonsters);
		if (!sourcebook) {
			if (category === 'subclass') {
				const c = SourcebookLogic.getClasses(props.sourcebooks).find(c => c.subclasses.some(sc => sc.id === element.id));
				if (c) {
					return [
						{
							type: 'button',
							label: `Open ${c.name}`,
							onClick: () => navigation.goToLibrary('class', c.id)
						} as ButtonConfig
					];
				}
			}

			return [];
		}

		const getStart = () => {
			switch (category) {
				case 'encounter':
					return {
						type: 'button',
						label: isSmall ? undefined : 'Start',
						icon: <PlayCircleOutlined />,
						onClick: () => props.startEncounter(element as Encounter)
					} as ButtonConfig;
				case 'montage':
					return {
						type: 'button',
						label: isSmall ? undefined : 'Start',
						icon: <PlayCircleOutlined />,
						onClick: () => props.startMontage(element as Montage)
					} as ButtonConfig;
				case 'negotiation':
					return {
						type: 'button',
						label: isSmall ? undefined : 'Start',
						icon: <PlayCircleOutlined />,
						onClick: () => props.startNegotiation(element as Negotiation)
					} as ButtonConfig;
				case 'tactical-map':
					return {
						type: 'button',
						label: isSmall ? undefined : 'Start',
						icon: <PlayCircleOutlined />,
						onClick: () => props.startMap(element as TacticalMap)
					} as ButtonConfig;
			}

			return null;
		};

		const getCreateHomebrew = () => {
			if ((category === 'monster-group') && showMonsters) {
				return {
					type: 'dropdown',
					label: isSmall ? undefined : 'Create Homebrew Version',
					icon: <CopyOutlined />,
					popover: (
						<Alert
							type='info'
							showIcon={true}
							title='To create a homebrew version of this monster, switch to Group view.'
							action={<Button style={{ marginLeft: '5px' }} onClick={() => setShowMonsters(false)}>Switch</Button>}
						/>
					)
				} as DropdownConfig;
			}

			if (sourcebook.type !== SourcebookType.Homebrew) {
				return {
					type: 'dropdown',
					label: isSmall ? undefined : 'Create Homebrew Version',
					icon: <CopyOutlined />,
					popover: (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
							<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={sourcebookID} setSourcebookID={setSourcebookID} />
							<Button type='primary' onClick={() => props.createElement(category, sourcebookID, element)}>Create</Button>
						</div>
					)
				} as DropdownConfig;
			}

			return null;
		};

		const getEdit = () => {
			if (sourcebook.type !== SourcebookType.Homebrew) {
				return null;
			}

			return {
				type: 'button',
				label: isSmall ? undefined : 'Edit',
				icon: <EditOutlined />,
				onClick: () => navigation.goToLibraryEdit(category, sourcebook.id, element.id)
			} as ButtonConfig;
		};

		const getCopy = () => {
			if (sourcebook.type !== SourcebookType.Homebrew) {
				return null;
			}

			return {
				type: 'dropdown',
				label: isSmall ? undefined : 'Copy',
				icon: <CopyOutlined />,
				popover: (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={sourcebookID} setSourcebookID={setSourcebookID} />
						<Button type='primary' onClick={() => props.createElement(category, sourcebookID, element)}>Create a Copy</Button>
					</div>
				)
			} as DropdownConfig;
		};

		const getMove = () => {
			if (sourcebook.type !== SourcebookType.Homebrew) {
				return null;
			}

			return {
				type: 'dropdown',
				label: isSmall ? undefined : 'Move',
				icon: <ArrowRightOutlined />,
				popover: (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
						<div>This currently lives in <b>{sourcebook.name || 'Unnamed Sourcebook'}</b>.</div>
						<DestinationSelector sourcebooks={props.sourcebooks} sourcebookID={sourcebookID} setSourcebookID={setSourcebookID} />
						<Button type='primary' disabled={sourcebook.id === sourcebookID} onClick={() => props.moveElement(category, sourcebookID, element)}>Move</Button>
					</div>
				)
			} as DropdownConfig;
		};

		const getExport = () => {
			const cat = ((category === 'monster-group') && showMonsters) ? 'monster' : category;

			let canExportAsImage = false;
			let canExportAsPDF = false;
			switch (cat) {
				case 'encounter':
				case 'montage':
				case 'negotiation':
					canExportAsImage = false;
					canExportAsPDF = true;
					break;
			}

			const imageOrPDF = canExportAsImage || canExportAsPDF ?
				view === 'classic' ?
					<>
						{
							canExportAsImage ?
								<>
									<Button onClick={() => props.exportElementImage(cat, element)}>
										Export As Image
									</Button>
								</>
								: null
						}
						{canExportAsImage && canExportAsPDF ? <Divider /> : null}
						{
							canExportAsPDF ?
								<>
									<Button onClick={() => props.exportElementPdf(cat, element, 'standard')}>
										Export As PDF
									</Button>
									<Button onClick={() => props.exportElementPdf(cat, element, 'high')}>
										Export As PDF (high res)
									</Button>
								</>
								: null
						}
					</>
					:
					<Alert
						type='info'
						showIcon={true}
						title='If you want to export as a PDF, switch to Classic view.'
						action={<Button onClick={() => setView('classic')}>Classic</Button>}
					/>
				: null;

			const externalContent = LibraryLogic.getExternalContent(element, category, props.sourcebooks);

			return {
				type: 'dropdown',
				label: isSmall ? undefined : 'Export',
				icon: <UploadOutlined />,
				popover: (
					<div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
						{imageOrPDF}
						{imageOrPDF ? <Divider /> : null}
						{
							externalContent.length > 0 ?
								<Alert
									type='warning'
									title={
										<>
											<HeaderText level={3}>External Content</HeaderText>
											<div>Some homebrew content used in this {cat} is located in a different sourcebook.</div>
											<div>The exported file won't contain the following items:</div>
											<ul>
												{externalContent.map(ec => <li key={ec.element.id}><b>{ec.element.name}</b> in {ec.sourcebook.name}</li>)}
											</ul>
										</>
									}
								/>
								: null
						}
						<Button onClick={() => props.exportElementData(cat, element)}>
							Export as Data
						</Button>
					</div>
				)
			} as DropdownConfig;
		};

		const getDelete = () => {
			if (sourcebook.type !== SourcebookType.Homebrew) {
				return null;
			}

			const elements = [ element ];
			if (category === 'class') {
				const c = element as HeroClass;
				if (c.subclasses) {
					elements.push(...c.subclasses);
				} else {
					// This is a subclass, not a class - can't be deleted here
					return null;
				}
			}
			if (category === 'monster-group') {
				const g = element as MonsterGroup;
				if (g.monsters) {
					elements.push(...g.monsters);
				} else {
					// This is a monster, not a group - can't be deleted here
					return null;
				}
			}

			const used: { element: Element, container: Element }[] = [];
			elements.forEach(e => {
				SourcebookLogic.getUsedIn(props.sourcebooks, e.id)
					.filter(x => !elements.map(e => e.id).includes(x.id))
					.forEach(x => {
						used.push({ element: e, container: x });
					});
			});

			let msg = undefined;
			if (used.length > 0) {
				msg = (
					<>
						<div>Cannot delete:</div>
						<ul>
							{
								used.map(x => (
									<li key={x.element.id}>
										<b>{x.element.name || 'Unnamed Element'}</b> is used in <b>{x.container.name || 'Unnamed Element'}</b>
									</li>
								))
							}
						</ul>
					</>
				);
			}

			return {
				type: 'danger',
				label: isSmall ? undefined : 'Delete',
				disabled: !!msg,
				disabledMessage: msg,
				onClick: () => props.deleteElement(category, sourcebook.id, element)
			} as DangerConfig;
		};

		return [
			getStart(),
			getCreateHomebrew(),
			getEdit(),
			getCopy(),
			getMove(),
			getExport(),
			getDelete()
		].filter(item => !!item);
	};

	const getViewSelector = () => {
		if (!selectedID) {
			return null;
		}

		if ((category === 'monster-group') && showMonsters) {
			return null;
		}

		switch (category) {
			case 'adventure':
			case 'tactical-map':
				return null;
			case 'encounter':
			case 'montage':
			case 'negotiation':
				return (
					<ViewSelector
						mode='classic'
						value={view}
						onChange={setView}
					/>
				);
			default:
				return (
					<ViewSelector
						mode='printable'
						value={view}
						onChange={value => {
							if (value === 'print') {
								const sourcebook = props.sourcebooks.find(sb => SourcebookLogic.getElements(sb).map(e => e.element.id).includes(selectedID));
								if (sourcebook) {
									navigation.goToLibraryPrint(category, sourcebook.id, selectedID);
								}
							}
						}}
					/>
				);
		}
	};

	const selected = getList(category).find(item => item.id == selectedID);
	const getPanel = getElementPanel();

	return (
		<ErrorBoundary>
			<div className='library-list-page'>
				<AppHeader subheader='Library'>
					<ButtonGroup
						buttons={[
							{
								type: 'control',
								control: (
									<AddBtn
										category={category}
										heroes={props.heroes}
										sourcebooks={props.sourcebooks}
										options={props.options}
										showMonsters={showMonsters}
										sourcebookID={sourcebookID}
										setShowMonsters={setShowMonsters}
										setSourcebookID={setSourcebookID}
										createElement={props.createElement}
										importElement={props.importElement}
									/>
								)
							},
							...getElementToolbarItems(),
							{ type: 'control', control: getViewSelector() }
						]}
					/>
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
					params={props.params}
					options={props.options}
				/>
			</div>
		</ErrorBoundary>
	);
};
