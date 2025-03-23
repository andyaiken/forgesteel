import { Encounter } from '../../../models/encounter';
import { Modal } from '../modal/modal';
import { MonsterState } from '../../../models/monster';
import { MonsterStatePanel } from '../../panels/monster-state/monster-state-panel';

import './monster-state-modal.scss';

interface Props {
	state: MonsterState;
	source: 'monster' | 'minion-group' | 'minion';
	encounter?: Encounter
	onClose: () => void;
	updateState: (state: MonsterState) => void;
}

export const MonsterStateModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='monster-state-modal'>
						<MonsterStatePanel
							state={props.state}
							source={props.source}
							encounter={props.encounter}
							updateState={props.updateState}
						/>
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
