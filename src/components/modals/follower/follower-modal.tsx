import { Expander } from '@/components/controls/expander/expander';
import { Follower } from '@/models/follower';
import { FollowerEditPanel } from '@/components/panels/edit/follower-edit/follower-edit-panel';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './follower-modal.scss';

interface Props {
	follower: Follower;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (follower: Follower) => void;
	onClose: () => void;
}

export const FollowerModal = (props: Props) => {
	const [ follower, setFollower ] = useState<Follower>(Utils.copy(props.follower));

	const onChange = (follower: Follower) => {
		setFollower(follower);
		props.onChange(follower);
	};

	return (
		<Modal
			content={
				<div className='follower-modal'>
					<div style={{ padding: '20px' }}>
						<Expander title='Customize'>
							<FollowerEditPanel
								follower={follower}
								sourcebooks={props.sourcebooks}
								options={props.options}
								onChange={onChange}
							/>
						</Expander>
					</div>
					<FollowerPanel follower={follower} mode={PanelMode.Full} />
				</div>
			}
			onClose={props.onClose}
		/>
	);
};
