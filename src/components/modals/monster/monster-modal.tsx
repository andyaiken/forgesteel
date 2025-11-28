import { Button, Divider, Flex, Input, Segmented, Space } from 'antd';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Encounter } from '@/models/encounter';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MalicePanel } from '@/components/panels/malice/malice-panel';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterHealthPanel } from '@/components/panels/health/health-panel';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterToken } from '@/components/panels/token/token';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Sourcebook } from '@/models/sourcebook';
import { SummoningInfo } from '@/models/summon';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-modal.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	encounter?: Encounter;
	summon?: SummoningInfo;
	sourcebooks: Sourcebook[];
	options: Options;
	onClose: () => void;
	updateMonster?: (monster: Monster) => void;
	updateEncounter?: (encounter: Encounter) => void;
}

export const MonsterModal = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(Utils.copy(props.monster));
	const [ encounter, setEncounter ] = useState<Encounter | undefined>(props.encounter ? Utils.copy(props.encounter) : undefined);
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
						summon={props.summon}
						sourcebooks={props.sourcebooks}
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'Malice':
				return (
					<Space orientation='vertical' style={{ width: '100%', padding: '20px' }}>
						{
							MonsterLogic.getMaliceOptions(monster, props.monsterGroup)
								.map(malice => (
									<MalicePanel
										malice={malice}
										options={props.options}
										currentMalice={encounter ? encounter.malice : undefined}
										updateCurrentMalice={
											encounter ?
												value => {
													const copy = Utils.copy(encounter);
													copy.malice = value;
													setEncounter(copy);
													if (props.updateEncounter) {
														props.updateEncounter(copy);
													}
												}
												: undefined
										}
									/>
								))
						}
					</Space>
				);
		}

		return null;
	};

	return (
		<Modal
			toolbar={
				<>
					{
						props.updateMonster ?
							<Flex align='center' justify='center' style={{ width: '100%' }}>
								<Segmented
									name='tabs'
									options={encounter ? [ 'Encounter', 'Stat Block', 'Malice' ] : [ 'Encounter', 'Stat Block' ]}
									value={page}
									onChange={setPage}
								/>
							</Flex>
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
};
