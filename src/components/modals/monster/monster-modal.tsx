import { Button, Popover, Segmented } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { Modal } from '../modal/modal';
import { MonsterHealthPanel } from '../../panels/health/health-panel';
import { MonsterPanel } from '../../panels/elements/monster-panel/monster-panel';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { UploadOutlined } from '@ant-design/icons';
import { Utils } from '../../../utils/utils';
import { useState } from 'react';

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
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));
	const [ page, setPage ] = useState<string>(props.updateMonster ? 'Encounter' : 'Stat Block');

	const updateMonster = (monster: Monster) => {
		setMonster(monster);
		if (props.updateMonster) {
			props.updateMonster(monster);
		}
	};

	const getContent = () => {
		switch (page) {
			case 'Encounter':
				return (
					<div style={{ padding: '10px 20px' }}>
						<MonsterPanel
							monster={monster}
							monsterGroup={props.monsterGroup}
							options={props.options}
							mode={PanelMode.Compact}
						/>
						<MonsterHealthPanel
							monster={monster}
							onChange={updateMonster}
						/>
					</div>
				);
			case 'Stat Block':
				return (
					<MonsterPanel
						monster={monster}
						monsterGroup={props.monsterGroup}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
		}

		return null;
	};

	try {
		return (
			<Modal
				toolbar={
					<>
						{
							props.updateMonster ?
								<Segmented
									name='tabs'
									options={[ 'Encounter', 'Stat Block' ]}
									value={page}
									onChange={setPage}
								/>
								: null
						}
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
						{getContent()}
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
