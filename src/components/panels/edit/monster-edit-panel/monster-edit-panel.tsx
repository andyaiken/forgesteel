import { Alert, Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Expander } from '../../../controls/expander/expander';
import { Feature } from '../../../../models/feature';
import { FeatureEditPanel } from '../feature-edit-panel/feature-edit-panel';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Monster } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './monster-edit-panel.scss';

interface Props {
	monster: Monster;
	onChange: (monster: Monster) => void;
}

export const MonsterEditPanel = (props: Props) => {
	const [ monster, setMonster ] = useState<Monster>(props.monster);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.name = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.description = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setKeywords = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.keywords = value.split(' ');
		setMonster(copy);
		props.onChange(copy);
	};

	const setLevel = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.level = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setRoleType = (value: MonsterRoleType) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.role.type = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setIsMinion = (value: boolean) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.role.isMinion = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setEncounterValue = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.encounterValue = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSizeValue = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.size.value = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSizeMod = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.size.mod = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setSpeed = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.speed.value = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setMovementMode = (value: string) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.speed.modes = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setStamina = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.stamina = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setStability = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.stability = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setFreeStrikeDamage = (value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.freeStrikeDamage = value;
		setMonster(copy);
		props.onChange(copy);
	};

	const setCharacteristic = (ch: Characteristic, value: number) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.characteristics
			.filter(c => c.characteristic === ch)
			.forEach(c => c.value = value);
		setMonster(copy);
		props.onChange(copy);
	};

	const addFeature = () => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.features.push(FeatureLogic.feature.createFeature({
			id: Utils.guid(),
			name: '',
			description: ''
		}));
		setMonster(copy);
		props.onChange(copy);
	};

	const changeFeature = (feature: Feature) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		const index = copy.features.findIndex(f => f.id === feature.id);
		if (index !== -1) {
			copy.features[index] = feature;
		}
		setMonster(copy);
		props.onChange(copy);
	};

	const moveFeature = (feature: Feature, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		const index = copy.features.findIndex(f => f.id === feature.id);
		copy.features = Collections.move(copy.features, index, direction);
		setMonster(copy);
		props.onChange(copy);
	};

	const deleteFeature = (feature: Feature) => {
		const copy = JSON.parse(JSON.stringify(monster)) as Monster;
		copy.features = copy.features.filter(f => f.id !== feature.id);
		setMonster(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className='monster-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Monster',
							children: (
								<div>
									<HeaderText>Name</HeaderText>
									<Input
										className={monster.name === '' ? 'input-empty' : ''}
										placeholder='Name'
										allowClear={true}
										addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
										value={monster.name}
										onChange={e => setName(e.target.value)}
									/>
									<HeaderText>Description</HeaderText>
									<MultiLine label='Description' value={monster.description} onChange={setDescription} />
								</div>
							)
						},
						{
							key: '2',
							label: 'Stats',
							children: (
								<div>
									<HeaderText>Keywords</HeaderText>
									<Input
										placeholder='Keywords'
										allowClear={true}
										value={monster.keywords.join(' ')}
										onChange={e => setKeywords(e.target.value)}
									/>
									<HeaderText>Level</HeaderText>
									<NumberSpin min={1} max={10} value={monster.level} onChange={setLevel} />
									<HeaderText>Role</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										<Select
											style={{ width: '100%' }}
											placeholder='Select role'
											options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Leader, MonsterRoleType.Mount, MonsterRoleType.Solo, MonsterRoleType.Support ].map(option => ({ value: option, desc: MonsterLogic.getRoleDescription(option) }))}
											optionRender={option => <Field label={option.data.value} value={option.data.desc} />}
											value={monster.role.type}
											onChange={setRoleType}
										/>
										<Toggle label='Minion' value={monster.role.isMinion} onChange={setIsMinion} />
									</Space>
									<HeaderText>Encounter Value</HeaderText>
									<NumberSpin min={1} value={monster.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
									<HeaderText>Size</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										<NumberSpin min={1} value={monster.size.value} onChange={setSizeValue} />
										{
											monster.size.value === 1 ?
												<Segmented
													block={true}
													options={[ 'T', 'S', 'M', 'L' ]}
													value={monster.size.mod}
													onChange={setSizeMod}
												/>
												: null
										}
									</Space>
									<HeaderText>Speed</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										<NumberSpin min={0} value={monster.speed.value} onChange={setSpeed} />
										<Input
											placeholder='Movement mode'
											allowClear={true}
											value={monster.speed.modes}
											onChange={e => setMovementMode(e.target.value)}
										/>
									</Space>
									<HeaderText>Stamina</HeaderText>
									<NumberSpin min={0} value={monster.stamina} steps={[ 1, 10 ]} onChange={setStamina} />
									<HeaderText>Stability</HeaderText>
									<NumberSpin min={0} value={monster.stability} onChange={setStability} />
									<HeaderText>Free Strike Damage</HeaderText>
									<NumberSpin min={0} value={monster.freeStrikeDamage} steps={[ 1, 10 ]} onChange={setFreeStrikeDamage} />
								</div>
							)
						},
						{
							key: '3',
							label: 'Characteristics',
							children: (
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										[
											Characteristic.Might,
											Characteristic.Agility,
											Characteristic.Reason,
											Characteristic.Intuition,
											Characteristic.Presence
										].map(ch => (
											<NumberSpin
												key={ch}
												label={ch}
												min={-5}
												max={5}
												value={MonsterLogic.getCharacteristic(monster, ch)}
												onChange={value => setCharacteristic(ch, value)}
											/>
										))
									}
								</Space>
							)
						},
						{
							key: '4',
							label: 'Features',
							children: (
								<Space direction='vertical' style={{ width: '100%' }}>
									{
										monster.features.map(f => (
											<Expander
												key={f.id}
												title={f.name || 'Unnamed Feature'}
												extra={[
													<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={() => moveFeature(f, 'up')} />,
													<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={() => moveFeature(f, 'down')} />,
													<DangerButton key='delete' mode='icon' onConfirm={() => deleteFeature(f)} />
												]}
											>
												<FeatureEditPanel
													feature={f}
													allowedTypes={[ FeatureType.Text, FeatureType.Ability, FeatureType.DamageModifier ]}
													onChange={changeFeature}
												/>
											</Expander>
										))
									}
									{
										monster.features.length === 0 ?
											<Alert
												type='warning'
												showIcon={true}
												message='No features'
											/>
											: null
									}
									<Button block={true} onClick={addFeature}>Add a new feature</Button>
								</Space>
							)
						}
					]}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
