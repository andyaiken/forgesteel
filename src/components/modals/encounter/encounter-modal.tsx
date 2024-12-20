import { Button, Popover } from 'antd';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Encounter } from '../../../models/encounter';
import { EncounterPanel } from '../../panels/encounter-panel/encounter-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';
import { Sourcebook } from '../../../models/sourcebook';

import './encounter-modal.scss';

interface Props {
	encounter: Encounter;
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const EncounterModal = (props: Props) => {
	try {
		return (
			<div className='encounter-modal'>
				<div className='toolbar'>
					<Button onClick={props.edit}>Edit</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export('image')}>Export As Image</Button>
								<Button onClick={() => props.export('pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export('json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button>
							Export
						</Button>
					</Popover>
					<DangerButton onConfirm={props.delete} />
				</div>
				<EncounterPanel encounter={props.encounter} playbook={props.playbook} sourcebooks={props.sourcebooks} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
