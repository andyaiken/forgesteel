import { Alert, Button, Space } from 'antd';
import { Empty } from '../../controls/empty/empty';
import { HeaderText } from '../../controls/header-text/header-text';
import { Modal } from '../modal/modal';
import { Playbook } from '../../../models/playbook';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

import './player-view-modal.scss';

interface Props {
	session: Playbook;
	updateSession: (session: Playbook) => void;
	onClose: () => void;
}

export const PlayerViewModal = (props: Props) => {
	const [ session, setSession ] = useState<Playbook>(Utils.copy(props.session));

	const setPlayerViewID = (value: string | null) => {
		const copy = Utils.copy(session);
		copy.playerViewID = value;
		setSession(copy);
		props.updateSession(copy);
	};

	try {
		return (
			<Modal
				content={
					<div className='player-view-modal'>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Button block={true} onClick={() => window.open(`${window.location.pathname}#/session/player`, '_blank')}>
								Open Player View
							</Button>
							<Alert
								type='info'
								showIcon={true}
								message={
									<div>
										<p>
											Player View opens in a new window.
										</p>
										<p>
											To share it with your players, don't share the link - share the window (ie in Discord or on a second screen).
										</p>
									</div>
								}
							/>
							{
								(session.encounters.length === 0) && (session.montages.length === 0) && (session.negotiations.length === 0) && (session.tacticalMaps.length === 0) && (session.counters.length === 0) ?
									<Empty text='Nothing to share' />
									:
									<HeaderText>What do you want to share?</HeaderText>
							}
							{session.encounters.map(e => <Toggle key={e.id} label={e.name} value={session.playerViewID === e.id} onChange={value => setPlayerViewID(value ? e.id : null)} />)}
							{session.montages.map(m => <Toggle key={m.id} label={m.name} value={session.playerViewID === m.id} onChange={value => setPlayerViewID(value ? m.id : null)} />)}
							{session.negotiations.map(n => <Toggle key={n.id} label={n.name} value={session.playerViewID === n.id} onChange={value => setPlayerViewID(value ? n.id : null)} />)}
							{session.tacticalMaps.map(tm => <Toggle key={tm.id} label={tm.name} value={session.playerViewID === tm.id} onChange={value => setPlayerViewID(value ? tm.id : null)} />)}
							{session.counters.map(c => <Toggle key={c.id} label={c.name} value={session.playerViewID === c.id} onChange={value => setPlayerViewID(value ? c.id : null)} />)}
						</Space>
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
