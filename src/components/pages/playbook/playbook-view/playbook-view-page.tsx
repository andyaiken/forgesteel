import { Button, Popover } from 'antd';
import { CloseOutlined, CopyOutlined, DownOutlined, EditOutlined, PlayCircleOutlined, SettingOutlined, ToolOutlined, UploadOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Adventure } from '../../../../models/adventure';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppFooter } from '../../../panels/app-footer/app-footer';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { ReactNode } from 'react';
import { Sourcebook } from '../../../../models/sourcebook';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-view-page.scss';

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	playbook: Playbook;
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showReference: () => void;
	showEncounterTools: (encounter: Encounter) => void;
	export: (kind: PlaybookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
	start: (kind: PlaybookElementKind, element: Element) => void;
	copy: (kind: PlaybookElementKind, element: Element) => void;
	delete: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();

	let element: Element | null = null;
	let panel: ReactNode | null = null;
	switch (kind) {
		case 'adventure':
			element = props.playbook.adventures.find(x => x.id === elementID) as Adventure;
			panel = (
				<AdventurePanel
					adventure={element as Adventure}
					mode={PanelMode.Full}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
					onStart={props.start}
				/>
			);
			break;
		case 'encounter':
			element = props.playbook.encounters.find(x => x.id === elementID) as Element;
			panel = (
				<EncounterPanel
					encounter={element as Encounter}
					sourcebooks={props.sourcebooks}
					heroes={props.heroes}
					options={props.options}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'montage':
			element = props.playbook.montages.find(x => x.id === elementID) as Montage;
			panel = (
				<MontagePanel
					montage={element as Montage}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'negotiation':
			element = props.playbook.negotiations.find(x => x.id === elementID) as Negotiation;
			panel = (
				<NegotiationPanel
					negotiation={element as Negotiation}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'tactical-map':
			element = props.playbook.tacticalMaps.find(x => x.id === elementID) as TacticalMap;
			panel = (
				<>
					<HeaderText level={1}>{element.name || 'Unnamed Map'}</HeaderText>
					<div className='tactical-map-container'>
						<TacticalMapPanel
							map={element as TacticalMap}
							display={TacticalMapDisplayType.DirectorView}
							options={props.options}
							mode={PanelMode.Full}
						/>
					</div>
				</>
			);
			break;
	}

	if (!element || !panel) {
		return null;
	}

	const goBack = () => {
		const adventure = props.playbook.adventures.find(a => {
			return PlaybookLogic
				.getAllPlotPoints(a.plot)
				.flatMap(p => p.content)
				.filter(c => c.contentType === 'reference')
				.map(c => c.contentID)
				.includes(element.id);
		});
		if (adventure) {
			navigation.goToPlaybookView('adventure', adventure.id);
		} else {
			navigation.goToPlaybookList(kind!);
		}
	};

	const getSubheader = () => {
		if (kind === 'tactical-map') {
			return 'Tactical Map';
		}

		return Format.capitalize(kind!);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='playbook-view-page'>
					<AppHeader subheader={getSubheader()} showDirectory={props.showDirectory}>
						<Button icon={<CloseOutlined />} onClick={goBack}>
							Close
						</Button>
						<div className='divider' />
						<Button icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit(kind!, elementID!)}>
							Edit
						</Button>
						<Button icon={<CopyOutlined />} onClick={() => props.copy(kind!, element)}>
							Copy
						</Button>
						<Popover
							trigger='click'
							content={
								kind === 'adventure' ?
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Button onClick={() => props.export(kind!, element, 'json')}>Export as Data</Button>
									</div>
									:
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Button onClick={() => props.export(kind!, element, 'image')}>Export As Image</Button>
										<Button onClick={() => props.export(kind!, element, 'pdf')}>Export As PDF</Button>
										<Button onClick={() => props.export(kind!, element, 'json')}>Export as Data</Button>
									</div>
							}
						>
							<Button icon={<UploadOutlined />}>
								Export
								<DownOutlined />
							</Button>
						</Popover>
						<DangerButton
							mode='block'
							disabled={PlaybookLogic.getUsedIn(props.playbook, element.id).length !== 0}
							onConfirm={() => props.delete(kind!, element)}
						/>
						<div className='divider' />
						{
							(kind === 'encounter') || (kind === 'montage') || (kind === 'negotiation') || (kind === 'tactical-map') ?
								<Button icon={<PlayCircleOutlined />} onClick={() => props.start(kind, element)}>
									Run
								</Button>
								: null
						}
						{
							(kind === 'encounter') ?
								<Button icon={<ToolOutlined />} onClick={() => props.showEncounterTools(element as Encounter)}>
									Tools
								</Button>
								: null
						}
						{
							(kind === 'encounter') || (kind === 'tactical-map') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode={kind} options={props.options} heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
										<DownOutlined />
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='playbook-view-page-content'>
						{panel}
					</div>
					<AppFooter page='playbook' showAbout={props.showAbout} showRoll={props.showRoll} showReference={props.showReference} />
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
