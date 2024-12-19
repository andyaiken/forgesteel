import { Button, Popover } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { MonsterPanel } from '../../panels/monster-panel/monster-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';

import './monster-modal.scss';

interface Props {
	monster: Monster;
	monsterGroup: MonsterGroup;
	playbook: Playbook;
	export: (format: 'image' | 'pdf' | 'json') => void;
}

export const MonsterModal = (props: Props) => {
	try {
		return (
			<div className='monster-modal'>
				<div className='toolbar'>
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
				</div>
				<MonsterPanel monster={props.monster} monsterGroup={props.monsterGroup} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
