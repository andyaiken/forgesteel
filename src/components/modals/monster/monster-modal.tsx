import { Button, Divider, Flex, Input, Popover, Segmented } from 'antd';
import { DownOutlined, EditFilled, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { HeaderText } from '../../controls/header-text/header-text';
import { Modal } from '../modal/modal';
import { Monster } from '../../../models/monster';
import { MonsterGroup } from '../../../models/monster-group';
import { MonsterHealthPanel } from '../../panels/health/health-panel';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterPanel } from '../../panels/elements/monster-panel/monster-panel';
import { MonsterToken } from '../../panels/token/token';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
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
	const [ editingName, setEditingName ] = useState<boolean>(false);

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
					<div style={{ padding: '0 20px' }}>
						<HeaderText
							level={1}
							ribbon={<MonsterToken monster={monster} monsterGroup={props.monsterGroup} size={28} />}
							extra={
								props.updateMonster ?
									<Button
										type='text'
										title='Edit the name'
										icon={editingName ? <EditFilled style={{ color: 'rgb(64, 150, 255)' }} /> : <EditOutlined />}
										onClick={() => setEditingName(!editingName)}
									/>
									: undefined
							}
						>
							{MonsterLogic.getMonsterName(monster, props.monsterGroup)}
						</HeaderText>
						{
							editingName && props.updateMonster ?
								<div>
									<Input
										placeholder='Name'
										allowClear={true}
										value={monster.name}
										onChange={e => {
											const copy = Utils.copy(monster);
											copy.name = e.target.value;
											updateMonster(copy);
										}}
									/>
									<Divider />
								</div>
								: null
						}
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
								<Flex align='center' justify='center' style={{ width: '100%' }}>
									<Segmented
										name='tabs'
										options={[ 'Encounter', 'Stat Block' ]}
										value={page}
										onChange={setPage}
									/>
								</Flex>
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
										<DownOutlined />
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
