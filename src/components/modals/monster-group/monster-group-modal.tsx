import { Button, Popover } from 'antd';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { MonsterGroup } from '../../../models/monster';
import { MonsterGroupPanel } from '../../panels/monster-group-panel/monster-group-panel';
import { PanelMode } from '../../../enums/panel-mode';
import { Playbook } from '../../../models/playbook';
import { PlaybookLogic } from '../../../logic/playbook-logic';

import './monster-group-modal.scss';

interface Props {
	monsterGroup: MonsterGroup;
	playbook: Playbook;
	export: (format: 'image' | 'pdf' | 'json') => void;
	edit: () => void;
	delete: () => void;
}

export const MonsterGroupModal = (props: Props) => {
	try {
		return (
			<div className='monster-group-modal'>
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
					<DangerButton
						disabled={props.monsterGroup.monsters.some(monster => PlaybookLogic.isUsed(props.playbook, monster.id))}
						onConfirm={props.delete}
					/>
				</div>
				<MonsterGroupPanel monsterGroup={props.monsterGroup} mode={PanelMode.Full} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
