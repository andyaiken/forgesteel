import { Button, Popover } from 'antd';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { Playbook } from '../../../../models/playbook';
import { Sourcebook } from '../../../../models/sourcebook';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './encounter-view-page.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	showAbout: () => void;
	export: (encounter: Encounter, format: 'image' | 'pdf' | 'json') => void;
	delete: (encounter: Encounter) => void;
}

export const EncounterViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { encounterID } = useParams<{ encounterID: string }>();

	const encounter = props.playbook.encounters.find(x => x.id === encounterID);
	if (!encounter) {
		return null;
	}

	try {
		return (
			<div className='encounter-view-page'>
				<AppHeader breadcrumbs={[ { label: 'Encounters' } ]} showAbout={props.showAbout}>
					<Button onClick={() => navigation.goToEncounterList()}>
						Close
					</Button>
					<Button onClick={() => navigation.goToEncounterEdit(encounterID!)}>
						Edit
					</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(encounter, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(encounter, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(encounter, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					<DangerButton
						onConfirm={() => props.delete(encounter)}
					/>
				</AppHeader>
				<div className='encounter-view-page-content'>
					<EncounterPanel
						encounter={encounter}
						playbook={props.playbook}
						sourcebooks={props.sourcebooks}
						mode={PanelMode.Full}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
