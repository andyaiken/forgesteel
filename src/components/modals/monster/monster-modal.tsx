import { Button, Popover } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { Modal } from '../modal/modal';
import { MonsterPanel } from '../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { UploadOutlined } from '@ant-design/icons';

import './monster-modal.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	options: Options;
	onClose: () => void;
	export?: (format: 'image' | 'pdf' | 'json') => void;
	updateMonster?: (monster: Monster) => void;
}

export const MonsterModal = (props: Props) => {
	try {
		return (
			<Modal
				toolbar={
					<>
						{
							props.export ?
								<Popover
									trigger='click'
									content={(
										<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
											<Button onClick={() => props.export!('image')}>Export As Image</Button>
											<Button onClick={() => props.export!('pdf')}>Export As PDF</Button>
											<Button onClick={() => props.export!('json')}>Export as Data</Button>
										</div>
									)}
								>
									<Button icon={<UploadOutlined />}>
										Export
									</Button>
								</Popover>
								: null
						}
					</>
				}
				content={
					<div className='monster-modal'>
						<MonsterPanel
							monster={props.monster}
							monsterGroup={props.monsterGroup}
							options={props.options}
							mode={PanelMode.Full}
							updateMonster={props.updateMonster}
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
