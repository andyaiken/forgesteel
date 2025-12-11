import { Encounter } from '@/models/encounter';
import { EncounterSlot } from '@/models/encounter-slot';
import { MinionGroupHealthPanel } from '@/components/panels/health/health-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './minion-slot-modal.scss';

interface Props {
	slot: EncounterSlot;
	encounter?: Encounter;
	onClose: () => void;
	updateSlot: (slot: EncounterSlot) => void;
}

export const MinionSlotModal = (props: Props) => {
	const [ slot, setSlot ] = useState<EncounterSlot>(Utils.copy(props.slot));

	const updateSlot = (slot: EncounterSlot) => {
		setSlot(slot);
		props.updateSlot(slot);
	};

	return (
		<Modal
			content={
				<div className='minion-slot-modal'>
					<MinionGroupHealthPanel
						slot={slot}
						encounter={props.encounter}
						onChange={updateSlot}
					/>
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
