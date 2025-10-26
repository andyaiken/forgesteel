import { Adventure, AdventurePackage } from '@/models/adventure';
import { Alert, Button, Input, Popover, Segmented, Tag } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, DownOutlined, EditOutlined, PlayCircleOutlined, SearchOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '@/models/playbook';
import { ReactNode, useState } from 'react';
import { AdventurePanel } from '@/components/panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '@/components/panels/app-footer/app-footer';
import { AppHeader } from '@/components/panels/app-header/app-header';
import { CreatePanel } from '@/components/pages/playbook/playbook-list/create-panel/create-panel';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { Encounter } from '@/models/encounter';
import { EncounterPanel } from '@/components/panels/elements/encounter-panel/encounter-panel';
import { EncounterSheetPage } from '@/components/panels/classic-sheet/encounter-sheet/encounter-sheet-page';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { Montage } from '@/models/montage';
import { MontagePanel } from '@/components/panels/elements/montage-panel/montage-panel';
import { MontageSheetPage } from '@/components/panels/classic-sheet/montage-sheet/montage-sheet-page';
import { Negotiation } from '@/models/negotiation';
import { NegotiationPanel } from '@/components/panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '@/models/options';
import { OptionsPanel } from '@/components/panels/options/options-panel';
import { PanelMode } from '@/enums/panel-mode';
import { PlaybookLogic } from '@/logic/playbook-logic';
import { SelectorRow } from '@/components/panels/selector-row/selector-row';
import { Sourcebook } from '@/models/sourcebook';
import { TacticalMap } from '@/models/tactical-map';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';
import { TacticalMapPanel } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '@/utils/utils';
import { useNavigation } from '@/hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-list-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	highlightAbout: boolean;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showEncounterTools: (encounter: Encounter) => void;
	setOptions: (options: Options) => void;
	createElement: (kind: PlaybookElementKind, element: Element | null) => void;
	importElement: (kind: PlaybookElementKind, element: Element) => void;
	importAdventurePackage: (ap: AdventurePackage) => void;
	deleteElement: (kind: PlaybookElementKind, element: Element) => void;
	exportElement: (kind: PlaybookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
	exportElementPdf: (kind: PlaybookElementKind, element: Element, resolution: 'standard' | 'high') => void;
	startElement: (kind: PlaybookElementKind, element: Element) => void;
}

export const PlaybookListPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();
	const [ category, setCategory ] = useState<PlaybookElementKind>(kind || 'adventure');
	const [ selectedID, setSelectedID ] = useState<string | null>(elementID || null);
	const [ previousCategory, setPreviousCategory ] = useState<PlaybookElementKind | undefined>(kind);
	const [ previousSelectedID, setPreviousSelectedID ] = useState<string | null | undefined>(elementID);
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ showSidebar, setShowSidebar ] = useState<boolean>(true);
	const [ view, setView ] = useState<'modern' | 'classic'>('modern');

	if (kind !== previousCategory) {
		setCategory(kind || 'adventure');
		setPreviousCategory(kind);
	}

	if (elementID !== previousSelectedID) {
		setSelectedID(elementID || null);
		setPreviousSelectedID(elementID);
	}

	// #region Get Elements

	const getAdventures = () => {
		try {
			return props.playbook.adventures
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getEncounters = (standaloneOnly: boolean) => {
		try {
			const adventureContentIDs = props.playbook.adventures
				.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return props.playbook.encounters
				.filter(item => !standaloneOnly || !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getMontages = (standaloneOnly: boolean) => {
		try {
			const adventureContentIDs = props.playbook.adventures
				.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return props.playbook.montages
				.filter(item => !standaloneOnly || !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getNegotiations = (standaloneOnly: boolean) => {
		try {
			const adventureContentIDs = props.playbook.adventures
				.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return props.playbook.negotiations
				.filter(item => !standaloneOnly || !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	const getTacticalMaps = (standaloneOnly: boolean) => {
		try {
			const adventureContentIDs = props.playbook.adventures
				.flatMap(a => PlaybookLogic.getAllPlotPoints(a.plot))
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID);

			return props.playbook.tacticalMaps
				.filter(item => !standaloneOnly || !adventureContentIDs.includes(item.id))
				.filter(item => Utils.textMatches([
					item.name,
					item.description
				], searchTerm));
		} catch (ex) {
			console.error(ex);
			return [];
		}
	};

	// #endregion

	const getList = (standaloneOnly: boolean) => {
		let list: Element[] = [];

		switch (category) {
			case 'adventure':
				list = getAdventures();
				break;
			case 'encounter':
				list = getEncounters(standaloneOnly);
				break;
			case 'montage':
				list = getMontages(standaloneOnly);
				break;
			case 'negotiation':
				list = getNegotiations(standaloneOnly);
				break;
			case 'tactical-map':
				list = getTacticalMaps(standaloneOnly);
				break;
		}

		return list;
	};

	const getElementPanel = () => {
		let getPanel: (element: Element) => ReactNode = () => null;

		switch (category) {
			case 'adventure':
				getPanel = (element: Element) => (
					<AdventurePanel
						key={element.id}
						adventure={element as Adventure}
						heroes={props.heroes}
						sourcebooks={props.sourcebooks}
						playbook={props.playbook}
						options={props.options}
						mode={PanelMode.Full}
						onStart={props.startElement}
					/>
				);
				break;
			case 'encounter':
				getPanel = (element: Element) => {
					if (view === 'classic') {
						return (
							<EncounterSheetPage
								key={element.id}
								encounter={element as Encounter}
								heroes={props.heroes}
								sourcebooks={props.sourcebooks}
								options={props.options}
							/>
						);
					} else {
						return (
							<EncounterPanel
								key={element.id}
								encounter={element as Encounter}
								heroes={props.heroes}
								sourcebooks={props.sourcebooks}
								options={props.options}
								mode={PanelMode.Full}
								showTools={() => props.showEncounterTools(element as Encounter)}
							/>
						);
					}
				};
				break;
			case 'montage':
				getPanel = (element: Element) => {
					if (view === 'classic') {
						return (
							<MontageSheetPage
								key={element.id}
								montage={element as Montage}
								options={props.options}
							/>
						);
					} else {
						return (
							<MontagePanel
								key={element.id}
								montage={element as Montage}
								heroes={props.heroes}
								options={props.options}
								mode={PanelMode.Full}
							/>
						);
					}
				};
				break;
			case 'negotiation':
				getPanel = (element: Element) => <NegotiationPanel key={element.id} negotiation={element as Negotiation} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'tactical-map':
				getPanel = (element: Element) => <TacticalMapPanel key={element.id} map={element as TacticalMap} options={props.options} display={TacticalMapDisplayType.DirectorView} mode={PanelMode.Full} />;
				break;
		}

		return getPanel;
	};

	const getElementToolbar = () => {
		const list = getList(false);
		const element = list.find(item => item.id == selectedID);

		if (!element) {
			return null;
		}

		return (
			<>
				<Button icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit(category, element.id)}>
					Edit
				</Button>
				<Popover
					trigger='click'
					content={
						category === 'adventure' ?
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.exportElement(category, element, 'json')}>Export as Data</Button>
							</div>
							:
							<div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
								{
									[ 'encounter', 'montage' ].includes(category) && view !== 'classic' ?
										<Alert
											type='info'
											showIcon={true}
											message='To export your encounter as a PDF, switch to Classic view.'
											action={<Button onClick={() => setView('classic')}>Classic</Button>}
										/>
										: null
								}
								{
									[ 'encounter', 'montage' ].includes(category) && view === 'classic' ?
										<>
											<Button onClick={() => props.exportElementPdf(category, element, 'standard')}>Export as PDF</Button>
											<Button onClick={() => props.exportElementPdf(category, element, 'high')}>Export as PDF (high res)</Button>
										</>
										: null
								}
								{
									![ 'encounter', 'montage' ].includes(category) ?
										<Button onClick={() => props.exportElement(category, element, 'pdf')}>Export As PDF</Button>
										: null
								}
								<Button onClick={() => props.exportElement(category, element, 'json')}>Export as Data</Button>
							</div>
					}
				>
					<Button icon={<UploadOutlined />}>
						Export
						<DownOutlined />
					</Button>
				</Popover>
				{
					(category === 'encounter') || (category === 'montage') || (category === 'negotiation') || (category === 'tactical-map') ?
						<Button icon={<PlayCircleOutlined />} onClick={() => props.startElement(category, element)}>
							Run
						</Button>
						: null
				}
				<DangerButton
					mode='block'
					disabled={PlaybookLogic.getUsedIn(props.playbook, element.id).length !== 0}
					onConfirm={() => props.deleteElement(category, element)}
				/>
			</>
		);
	};

	const getSidebar = () => {
		const list = getList(true);

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
					<Button icon={showSidebar ? <DoubleLeftOutlined /> : <DoubleRightOutlined />} style={{ flex: '0 0 auto' }} onClick={() => setShowSidebar(!showSidebar)} />
				</div>
				{
					showSidebar ?
						<div className='selection-content'>
							<div className='selection-list categories'>
								<SelectorRow selected={category === 'adventure'} content='Adventures' info={getAdventures().length} onSelect={() => navigation.goToPlaybook('adventure')} />
								<SelectorRow selected={category === 'encounter'} content='Encounters' info={getEncounters(true).length} onSelect={() => navigation.goToPlaybook('encounter')} />
								<SelectorRow selected={category === 'montage'} content='Montage' info={getMontages(true).length} onSelect={() => navigation.goToPlaybook('montage')} />
								<SelectorRow selected={category === 'negotiation'} content='Negotiations' info={getNegotiations(true).length} onSelect={() => navigation.goToPlaybook('negotiation')} />
								<SelectorRow selected={category === 'tactical-map'} content='Tactical Maps' info={getTacticalMaps(true).length} onSelect={() => navigation.goToPlaybook('tactical-map')} />
							</div>
							<div className='selection-list elements'>
								{
									list.map(a => (
										<SelectorRow key={a.id} selected={selectedID === a.id} content={a.name || `Unnamed ${Format.capitalize(category)}`} onSelect={() => navigation.goToPlaybook(category, a.id)} />
									))
								}
								{
									list.length === 0 ?
										<Empty />
										: null
								}
							</div>
						</div>
						: null
				}
			</div>
		);
	};

	const selected = getList(false).find(item => item.id == selectedID);
	const getPanel = getElementPanel();

	return (
		<ErrorBoundary>
			<div className='playbook-list-page'>
				<AppHeader subheader='Playbook'>
					<Popover
						trigger='click'
						content={
							<CreatePanel
								currentTab={category}
								createElement={props.createElement}
								importElement={props.importElement}
								importAdventurePackage={props.importAdventurePackage}
							/>
						}
					>
						<Button type='primary'>
							Add
							<DownOutlined />
						</Button>
					</Popover>
					{getElementToolbar()}
					{
						(category === 'encounter') || (category === 'tactical-map') ?
							<div className='divider' />
							: null
					}
					{
						(category === 'encounter') || (category === 'montage') ?
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Segmented
											block={true}
											vertical={true}
											options={[
												{ value: 'modern', label: <div style={{ margin: '5px', width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Modern Sheet</div> },
												{ value: 'classic', label: <div style={{ margin: '5px', width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Tag color='red'>BETA</Tag>Classic Sheet</div> }
											]}
											value={view}
											onChange={setView}
										/>
									</div>
								)}
							>
								<Button>
									View
									<DownOutlined />
								</Button>
							</Popover>
							: null
					}
					{
						(category === 'tactical-map') ?
							<Popover
								trigger='click'
								content={<OptionsPanel mode={category} options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
							>
								<Button icon={<SettingOutlined />}>
									Options
									<DownOutlined />
								</Button>
							</Popover>
							: null
					}

					{
						(category === 'encounter') || (category === 'montage') ?
							<Popover
								trigger='click'
								content={<OptionsPanel mode={`${category}-${view}`} options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
							>
								<Button icon={<SettingOutlined />}>
									Options
									<DownOutlined />
								</Button>
							</Popover>
							: null
					}
				</AppHeader>
				<ErrorBoundary>
					<div className='playbook-list-page-content'>
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
				<AppFooter page='playbook' highlightAbout={props.highlightAbout} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
			</div>
		</ErrorBoundary>
	);
};
