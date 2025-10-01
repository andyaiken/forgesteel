import { Button, Divider, Flex, Input, Popover, Progress, Segmented, Space } from 'antd';
import { DownOutlined, EditFilled, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Encounter } from '@/models/encounter';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Modal } from '@/components/modals/modal/modal';
import { Monster } from '@/models/monster';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterHealthPanel } from '@/components/panels/health/health-panel';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { MonsterToken } from '@/components/panels/token/token';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { ResourcePill } from '@/components/controls/pill/pill';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SummoningInfo } from '@/models/summon';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-modal.scss';

interface Props {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	encounter?: Encounter;
	summon?: SummoningInfo;
	options: Options;
	onClose: () => void;
	export?: (format: 'image' | 'pdf' | 'json') => void;
	updateMonster?: (monster: Monster) => void;
	setMalice?: (value: number) => void;
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
						options={props.options}
						mode={PanelMode.Full}
					/>
				);
			case 'Malice':
				return (
					<Space direction='vertical' style={{ width: '100%', padding: '20px' }}>
						{
							MonsterLogic.getMaliceOptions(monster, props.monsterGroup).map(malice => {
								const cost = malice.type === FeatureType.MaliceAbility ? malice.data.ability.cost as number : malice.data.cost;

								return (
									<SelectablePanel key={malice.id}>
										<FeaturePanel
											feature={malice}
											options={props.options}
											cost={cost}
											repeatable={malice.type === FeatureType.Malice ? malice.data.repeatable : undefined}
											mode={PanelMode.Full}
										/>
										{
											encounter && props.setMalice ?
												encounter.malice >= cost ?
													<Button
														block={true}
														onClick={() => {
															const value = Math.max(encounter!.malice - cost, 0);
															const copy = Utils.copy(encounter);
															copy.malice = value;
															setEncounter(copy);
															props.setMalice!(value);
														}}
													>
														Use
														<ResourcePill value={cost} />
													</Button>
													:
													<div className='malice-progress'>
														<Progress percent={100 * encounter.malice / cost} steps={cost} showInfo={false} />
														<ResourcePill value={`${encounter.malice} of ${cost}`} />
													</div>
												: null
										}
									</SelectablePanel>
								);
							})
						}
					</Space>
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
										options={encounter ? [ 'Encounter', 'Stat Block', 'Malice' ] : [ 'Encounter', 'Stat Block' ]}
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
