import { Button, Flex, Input, Segmented } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, FilterFilled, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';
import { Sourcebook, SourcebookElementKind } from '@/models/sourcebook';
import { AddBtn } from '@/components/pages/library/library-list/controls/add-btn';
import { Adventure } from '@/models/adventure';
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
import { Domain } from '@/models/domain';
import { DomainPanel } from '@/components/panels/elements/domain-panel/domain-panel';
import { Element } from '@/models/element';
import { ElementSheet } from '@/components/panels/classic-sheet/element-sheet/element-sheet';
import { ElementToolbar } from '@/components/pages/library/library-list/controls/element-toolbar';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
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
import { Negotiation } from '@/models/negotiation';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
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
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '@/models/terrain';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { Title } from '@/models/title';
import { TitlePanel } from '@/components/panels/elements/title-panel/title-panel';
import { Toggle } from '@/components/controls/toggle/toggle';
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
	moveElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	deleteElement: (kind: SourcebookElementKind, sourcebookID: string, element: Element) => void;
	exportElementData: (category: string, element: Element) => void;
	exportElementImage: (category: string, element: Element) => void;
	exportElementPdf: (category: string, element: Element, resolution: 'standard' | 'high') => void;
	startEncounter: (encounter: Encounter) => Promise<string>;
	startMontage: (montage: Montage) => Promise<string>;
	startNegotiation: (negotiation: Negotiation) => Promise<string>;
	startMap: (map: TacticalMap) => Promise<string>;
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
	const [ sourcebookID, setSourcebookID ] = useState<string>(props.sourcebooks.filter(sb => sb.type === SourcebookType.Homebrew).length > 0 ? Collections.sort(props.sourcebooks, sb => sb.name).filter(sb => sb.type === SourcebookType.Homebrew)[0].id : '');
	useTitle('Library');

	if (kind !== previousCategory) {
		setCategory(kind || 'ancestry');
		setPreviousCategory(kind);
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
					getPanel = (element: Element) => <EncounterPanel key={element.id} encounter={element as Encounter} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} showTools={() => props.showEncounterTools(element as Encounter)} />;
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

	const selected = getList(category).find(item => item.id == selectedID);
	const getPanel = getElementPanel();

	const showViewSelector = !!selectedID && (category !== 'adventure') && (category !== 'tactical-map');

	return (
		<ErrorBoundary>
			<div className='library-list-page'>
				<AppHeader subheader='Library'>
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
					{
						selected ?
							<ElementToolbar
								element={selected}
								category={category}
								sourcebooks={props.sourcebooks}
								showMonsters={showMonsters}
								sourcebookID={sourcebookID}
								view={view}
								setShowMonsters={setShowMonsters}
								setSourcebookID={setSourcebookID}
								setView={setView}
								createElement={props.createElement}
								importElement={props.importElement}
								moveElement={props.moveElement}
								deleteElement={props.deleteElement}
								exportElementData={props.exportElementData}
								exportElementImage={props.exportElementImage}
								exportElementPdf={props.exportElementPdf}
								startElement={() => {
									switch (category) {
										case 'encounter':
											props.startEncounter(selected as Encounter);
											break;
										case 'montage':
											props.startMontage(selected as Montage);
											break;
										case 'negotiation':
											props.startNegotiation(selected as Negotiation);
											break;
										case 'tactical-map':
											props.startMap(selected as TacticalMap);
											break;
									}
								}}
							/>
							: null
					}
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
