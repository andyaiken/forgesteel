import { Button, Popover } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { ReactNode } from 'react';
import { Sourcebook } from '../../../../models/sourcebook';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-view-page.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	export: (kind: PlaybookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
	delete: (kind: PlaybookElementKind, element: Element) => void;
}

export const PlaybookViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();

	let element: Element | null = null;
	let panel: ReactNode | null = null;
	switch (kind) {
		case 'encounter':
			element = props.playbook.encounters.find(x => x.id === elementID) as Element;
			panel = (
				<EncounterPanel
					encounter={element as Encounter}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					mode={PanelMode.Full}
					showDifficulty={true}
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
	}

	if (!element || !panel) {
		return null;
	}

	try {
		return (
			<div className='playbook-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Playbook' } ]} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Button onClick={() => navigation.goToPlaybookList(kind!)}>
						Close
					</Button>
					<Button icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit(kind!, elementID!)}>
						Edit
					</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(kind!, element, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(kind!, element, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(kind!, element, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
							<DownOutlined />
						</Button>
					</Popover>
					<DangerButton
						onConfirm={() => props.delete(kind!, element)}
					/>
				</AppHeader>
				<div className='playbook-view-page-content'>
					{panel}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
