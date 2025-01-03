import { Button, Popover } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { Modal } from '../modal/modal';
import { MonsterPanel } from '../../panels/elements/monster-panel/monster-panel';
import { PanelMode } from '../../../enums/panel-mode';

import './monster-modal.scss';

interface Props {
	monster: Monster;
	monsterGroup: MonsterGroup;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const MonsterModal = (props: Props) => {
	try {
		return (
			<Modal
				toolbar={
					<>
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
					</>
				}
				content={
					<div className='monster-modal'>
						<MonsterPanel monster={props.monster} monsterGroup={props.monsterGroup} mode={PanelMode.Full} />
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
