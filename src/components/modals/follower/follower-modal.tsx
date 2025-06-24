import { Follower } from '../../../models/follower';
import { FollowerPanel } from '../../panels/elements/follower-panel/follower-panel';
import { Modal } from '../modal/modal';
import { PanelMode } from '../../../enums/panel-mode';

import './follower-modal.scss';

interface Props {
	follower: Follower;
	onClose: () => void;
}

export const FollowerModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='follower-modal'>
						<FollowerPanel follower={props.follower} mode={PanelMode.Full} />
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
