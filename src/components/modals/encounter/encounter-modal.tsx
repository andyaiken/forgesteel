import { Button, Popover } from 'antd';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Encounter } from '../../../models/encounter';
import { EncounterPanel } from '../../panels/elements/encounter-panel/encounter-panel';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';

import './encounter-modal.scss';

interface Props {
	encounter: Encounter;
	playbook: Playbook;
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const EncounterModal = (props: Props) => {
	try {
		return (
			<Modal
				toolbar={
					<>
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
					</>
				}
				content={
					<div className='encounter-modal'>
						<EncounterPanel encounter={props.encounter} playbook={props.playbook} mode={PanelMode.Full} />
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
