import { Adventure, AdventurePackage } from '../../../../models/adventure';
import { Button, Input, Popover } from 'antd';
import { DownOutlined, EditOutlined, PlayCircleOutlined, SearchOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { ReactNode, useState } from 'react';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { CreatePanel } from './create-panel/create-panel';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Format } from '../../../../utils/format';
import { Hero } from '../../../../models/hero';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { SelectorRow } from '../../../panels/selector-row/selector-row';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
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
				getPanel = (element: Element) => <AdventurePanel key={element.id} adventure={element as Adventure} heroes={props.heroes} sourcebooks={props.sourcebooks} playbook={props.playbook} options={props.options} mode={PanelMode.Full} />;
				break;
			case 'encounter':
				getPanel = (element: Element) => <EncounterPanel key={element.id} encounter={element as Encounter} heroes={props.heroes} sourcebooks={props.sourcebooks} options={props.options} mode={PanelMode.Full} showTools={() => props.showEncounterTools(element as Encounter)} />;
				break;
			case 'montage':
				getPanel = (element: Element) => <MontagePanel key={element.id} montage={element as Montage} mode={PanelMode.Full} />;
				break;
			case 'negotiation':
				getPanel = (element: Element) => <NegotiationPanel key={element.id} negotiation={element as Negotiation} mode={PanelMode.Full} />;
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
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.exportElement(category, element, 'image')}>Export As Image</Button>
								<Button onClick={() => props.exportElement(category, element, 'pdf')}>Export As PDF</Button>
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

	try {
		const list = getList(true);
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
							(category === 'encounter') || (category === 'tactical-map') ?
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
					</AppHeader>
					<div className='playbook-list-page-content'>
						<div className='selection-sidebar'>
							<div className='selection-toolbar'>
								<Input
									name='search'
									placeholder='Search'
									allowClear={true}
									value={searchTerm}
									suffix={<SearchOutlined />}
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</div>
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
					<AppFooter page='playbook' highlightAbout={props.highlightAbout} showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
