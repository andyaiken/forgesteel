import { Alert, Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DistanceLogic } from '../../../../logic/distance-logic';
import { Expander } from '../../../controls/expander/expander';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PowerRollType } from '../../../../enums/power-roll-type';
import { Toggle } from '../../../controls/toggle/toggle';
import { useState } from 'react';

import './ability-edit-panel.scss';

interface Props {
	ability: Ability;
	onChange: (ability: Ability) => void;
}

export const AbilityEditPanel = (props: Props) => {
	const [ ability, setAbility ] = useState<Ability>(props.ability);

	const setName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.name = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.description = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeUsage = (value: AbilityUsage) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.usage = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeFree = (value: boolean) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.free = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTrigger = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.trigger = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTime = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.type.time = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.keywords = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const getDistanceMainType = (index: number) => {
		const distance = ability.distance[index];

		switch (distance.type) {
			case AbilityDistanceType.Self:
				return 'Self';
			case AbilityDistanceType.Melee:
				return 'Melee';
			case AbilityDistanceType.Ranged:
				return 'Ranged';
			case AbilityDistanceType.Aura:
			case AbilityDistanceType.Burst:
			case AbilityDistanceType.Cube:
			case AbilityDistanceType.Wall:
				return 'Area';
			case AbilityDistanceType.Line:
				return 'Line';
			case AbilityDistanceType.Special:
				return 'Special';
		}
	};

	const setDistanceMainType = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;

		switch (value) {
			case 'Self':
				copy.distance[index].type = AbilityDistanceType.Self;
				break;
			case 'Melee':
				copy.distance[index].type = AbilityDistanceType.Melee;
				break;
			case 'Ranged':
				copy.distance[index].type = AbilityDistanceType.Ranged;
				break;
			case 'Area':
				copy.distance[index].type = AbilityDistanceType.Aura;
				break;
			case 'Line':
				copy.distance[index].type = AbilityDistanceType.Line;
				break;
			case 'Special':
				copy.distance[index].type = AbilityDistanceType.Special;
				break;
		}

		setAbility(copy);
		props.onChange(copy);
	};

	const addDistance = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance.push(AbilityLogic.distance.createMelee(1));
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceType = (index: number, value: AbilityDistanceType) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].type = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue2 = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].value2 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceWithin = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].within = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceSpecial = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance[index].special = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveDistance = (index: number, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance = Collections.move(copy.distance, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteDistance = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.distance.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const setTarget = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.target = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setCost = (value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.cost = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPreEffect = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.preEffect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll = (value: boolean) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.powerRoll = value ? AbilityLogic.createPowerRoll({ characteristic: [], tier1: '', tier2: '', tier3: '' }) : null;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRollType = (value: PowerRollType) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.type = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRollCharacteristics = (value: Characteristic[]) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.characteristic = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll1 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier1 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll2 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier2 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll3 = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		if (copy.powerRoll) {
			copy.powerRoll.tier3 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setEffect = (value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const addAlternateEffect = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects.push('');
		setAbility(copy);
		props.onChange(copy);
	};

	const setAlternateEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects[index] = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveAlternateEffect = (index: number, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects = Collections.move(copy.alternateEffects, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteAlternateEffect = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.alternateEffects.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addSpend = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend.push({ effect: '', value: 1 });
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveSpend = (index: number, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend = Collections.move(copy.spend, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteSpend = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.spend.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addPersistence = () => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence.push({ effect: '', value: 1 });
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceValue = (index: number, value: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceEffect = (index: number, value: string) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const movePersistence = (index: number, direction: 'up' | 'down') => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence = Collections.move(copy.persistence, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deletePersistence = (index: number) => {
		const copy = JSON.parse(JSON.stringify(ability)) as Ability;
		copy.persistence.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	try {
		return (
			<div className='ability-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Ability',
							children: (
								<div>
									<HeaderText>Name</HeaderText>
									<Input
										className={ability.name === '' ? 'input-empty' : ''}
										placeholder='Name'
										allowClear={true}
										value={ability.name}
										onChange={e => setName(e.target.value)}
									/>
									<HeaderText>Description</HeaderText>
									<MultiLine label='Description' value={ability.description} onChange={setDescription} />
								</div>
							)
						},
						{
							key: '2',
							label: 'Usage',
							children: (
								<div>
									<HeaderText>Type</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										<Select
											style={{ width: '100%' }}
											placeholder='Select usage type'
											options={[ AbilityUsage.Action, AbilityUsage.Maneuver, AbilityUsage.Move, AbilityUsage.Trigger, AbilityUsage.VillainAction, AbilityUsage.NoAction, AbilityUsage.Other ].map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											value={ability.type.usage}
											onChange={setTypeUsage}
										/>
										{
											(ability.type.usage === AbilityUsage.Action) || (ability.type.usage === AbilityUsage.Maneuver) || (ability.type.usage === AbilityUsage.Trigger) ?
												<Toggle label='Free' value={ability.type.free} onChange={setTypeFree} />
												: null
										}
										{
											ability.type.usage === AbilityUsage.Trigger ?
												<Input
													className={ability.type.trigger === '' ? 'input-empty' : ''}
													placeholder='Trigger'
													allowClear={true}
													value={ability.type.trigger}
													onChange={e => setTypeTrigger(e.target.value)}
												/>
												: null
										}
										{
											ability.type.usage === AbilityUsage.Other ?
												<Input
													className={ability.type.time === '' ? 'input-empty' : ''}
													placeholder='Other'
													allowClear={true}
													value={ability.type.time}
													onChange={e => setTypeTime(e.target.value)}
												/>
												: null
										}
									</Space>
									<HeaderText>Keywords</HeaderText>
									<Select
										style={{ width: '100%' }}
										placeholder='Keywords'
										mode='multiple'
										allowClear={true}
										options={[ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Persistent, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resistance, AbilityKeyword.Rot, AbilityKeyword.Routine, AbilityKeyword.Strike, AbilityKeyword.Void, AbilityKeyword.Weapon ].map(option => ({ value: option }))}
										optionRender={option => <div className='ds-text'>{option.data.value}</div>}
										value={ability.keywords}
										onChange={setKeywords}
									/>
									<HeaderText>Distance</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											ability.distance.map((distance, n) => (
												<Expander
													key={n}
													title={DistanceLogic.getDistance(distance)}
													extra={[
														<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={() => moveDistance(n, 'up')} />,
														<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={() => moveDistance(n, 'down')} />,
														<DangerButton key='delete' mode='icon' onConfirm={() => deleteDistance(n)} />
													]}
												>
													<Space direction='vertical' style={{ width: '100%' }}>
														<HeaderText>Distance Type</HeaderText>
														<Segmented
															block={true}
															options={[ 'Self', 'Melee', 'Ranged', 'Area', 'Line', 'Special' ]}
															value={getDistanceMainType(n)}
															onChange={value => setDistanceMainType(n, value)}
														/>
														{
															getDistanceMainType(n) === 'Area' ?
																<HeaderText>Area Type</HeaderText>
																: null
														}
														{
															getDistanceMainType(n) === 'Area' ?
																<Select
																	style={{ width: '100%' }}
																	disabled={getDistanceMainType(n) !== 'Area'}
																	placeholder='Area type'
																	options={[ AbilityDistanceType.Aura, AbilityDistanceType.Burst, AbilityDistanceType.Cube, AbilityDistanceType.Wall ].map(option => ({ value: option }))}
																	optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																	value={distance.type}
																	onChange={value => setDistanceType(n, value)}
																/>
																: null
														}
														{
															(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Special') ?
																<HeaderText>Value</HeaderText>
																: null
														}
														{
															(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Special') ?
																<NumberSpin min={1} value={distance.value} onChange={value => setDistanceValue(n, value)} />
																: null
														}
														{
															getDistanceMainType(n) === 'Line' ?
																<HeaderText>Value 2</HeaderText>
																: null
														}
														{
															getDistanceMainType(n) === 'Line' ?
																<NumberSpin min={1} value={distance.value2} onChange={value => setDistanceValue2(n, value)} />
																: null
														}
														{
															(getDistanceMainType(n) === 'Area' ) || (getDistanceMainType(n) === 'Line') ?
																<HeaderText>Within</HeaderText>
																: null
														}
														{
															(getDistanceMainType(n) === 'Area' ) || (getDistanceMainType(n) === 'Line') ?
																<NumberSpin min={1} value={distance.within} onChange={value => setDistanceWithin(n, value)} />
																: null
														}
														{
															getDistanceMainType(n) === 'Special' ?
																<HeaderText>Special</HeaderText>
																: null
														}
														{
															getDistanceMainType(n) === 'Special' ?
																<Input
																	className={distance.special === '' ? 'input-empty' : ''}
																	placeholder='Special'
																	allowClear={true}
																	value={distance.special}
																	onChange={e => setDistanceSpecial(n, e.target.value)}
																/>
																: null
														}
													</Space>
												</Expander>
											))
										}
										{
											ability.distance.length === 0 ?
												<Alert
													type='warning'
													showIcon={true}
													message='No distances'
												/>
												: null
										}
										<Button block={true} onClick={addDistance}>Add a new distance</Button>
									</Space>
									<HeaderText>Target</HeaderText>
									<Input
										className={ability.target === '' ? 'input-empty' : ''}
										placeholder='Target'
										allowClear={true}
										value={ability.target}
										onChange={e => setTarget(e.target.value)}
									/>
									<HeaderText>Cost</HeaderText>
									<NumberSpin min={0} value={ability.cost} onChange={setCost} />
								</div>
							)
						},
						{
							key: '3',
							label: 'Info',
							children: (
								<div>
									<HeaderText>Pre-Roll Effect</HeaderText>
									<MultiLine label='Effect' value={ability.preEffect} onChange={setPreEffect} />
									<HeaderText>Power Roll</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										<Toggle label='Has Power Roll' value={!!ability.powerRoll} onChange={setPowerRoll} />
										{
											ability.powerRoll ?
												<Segmented
													block={true}
													options={[ PowerRollType.PowerRoll, PowerRollType.Resistance ].map(i => ({ label: i, value: i }))}
													value={ability.powerRoll.type}
													onChange={setPowerRollType}
												/>
												: null
										}
										{
											ability.powerRoll ?
												<Select
													style={{ width: '100%' }}
													className={ability.powerRoll.characteristic.length === 0 ? 'selection-empty' : ''}
													placeholder='Characteristics'
													mode='multiple'
													options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
													optionRender={option => <div className='ds-text'>{option.data.value}</div>}
													value={ability.powerRoll.characteristic}
													onChange={setPowerRollCharacteristics}
												/>
												: null
										}
										{
											ability.powerRoll ?
												<Input
													className={ability.powerRoll.tier1 === '' ? 'input-empty' : ''}
													placeholder='Tier 1'
													allowClear={true}
													value={ability.powerRoll.tier1}
													onChange={e => setPowerRoll1(e.target.value)}
												/>
												: null
										}
										{
											ability.powerRoll ?
												<Input
													className={ability.powerRoll.tier2 === '' ? 'input-empty' : ''}
													placeholder='Tier 2'
													allowClear={true}
													value={ability.powerRoll.tier2}
													onChange={e => setPowerRoll2(e.target.value)}
												/>
												: null
										}
										{
											ability.powerRoll ?
												<Input
													className={ability.powerRoll.tier3 === '' ? 'input-empty' : ''}
													placeholder='Tier 3'
													allowClear={true}
													value={ability.powerRoll.tier3}
													onChange={e => setPowerRoll3(e.target.value)}
												/>
												: null
										}
									</Space>
									<HeaderText>Effect</HeaderText>
									<MultiLine label='Effect' value={ability.effect} onChange={setEffect} />
								</div>
							)
						},
						{
							key: '4',
							label: 'Extra',
							children: (
								<div>
									<HeaderText>Alternate Effects</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											ability.alternateEffects.map((effect, n) => (
												<Expander
													key={n}
													title='Alternate Effect'
													extra={[
														<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={() => moveAlternateEffect(n, 'up')} />,
														<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={() => moveAlternateEffect(n, 'down')} />,
														<DangerButton key='delete' mode='icon' onConfirm={() => deleteAlternateEffect(n)} />
													]}
												>
													<Input
														className={effect === '' ? 'input-empty' : ''}
														placeholder='Alternate Effect'
														allowClear={true}
														value={effect}
														onChange={e => setAlternateEffect(n, e.target.value)}
													/>
												</Expander>
											))
										}
										{
											ability.alternateEffects.length === 0 ?
												<Alert
													type='warning'
													showIcon={true}
													message='No alternate effects'
												/>
												: null
										}
										<Button block={true} onClick={addAlternateEffect}>Add an alternate effect</Button>
									</Space>
									<HeaderText>Spend</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											ability.spend.map((spend, n) => (
												<Expander
													key={n}
													title='Spend Effect'
													extra={[
														<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={() => moveSpend(n, 'up')} />,
														<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={() => moveSpend(n, 'down')} />,
														<DangerButton key='delete' mode='icon' onConfirm={() => deleteSpend(n)} />
													]}
												>
													<Space direction='vertical' style={{ width: '100%' }}>
														<Input
															className={spend.effect === '' ? 'input-empty' : ''}
															placeholder='Spend effect'
															allowClear={true}
															value={spend.effect}
															onChange={e => setSpendEffect(n, e.target.value)}
														/>
														<NumberSpin min={0} value={spend.value} onChange={value => setSpendValue(n, value)} />
													</Space>
												</Expander>
											))
										}
										{
											ability.spend.length === 0 ?
												<Alert
													type='warning'
													showIcon={true}
													message='No spend effects'
												/>
												: null
										}
										<Button block={true} onClick={addSpend}>Add a spend effect</Button>
									</Space>
									<HeaderText>Persistence</HeaderText>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											ability.persistence.map((persist, n) => (
												<Expander
													key={n}
													title='Persistence Effect'
													extra={[
														<Button key='up' type='text' icon={<CaretUpOutlined />} onClick={() => movePersistence(n, 'up')} />,
														<Button key='down' type='text' icon={<CaretDownOutlined />} onClick={() => movePersistence(n, 'down')} />,
														<DangerButton key='delete' mode='icon' onConfirm={() => deletePersistence(n)} />
													]}
												>
													<Space direction='vertical' style={{ width: '100%' }}>
														<Input
															className={persist.effect === '' ? 'input-empty' : ''}
															placeholder='Persistence Effect'
															allowClear={true}
															value={persist.effect}
															onChange={e => setPersistenceEffect(n, e.target.value)}
														/>
														<NumberSpin min={0} value={persist.value} onChange={value => setPersistenceValue(n, value)} />
													</Space>
												</Expander>
											))
										}
										{
											ability.persistence.length === 0 ?
												<Alert
													type='warning'
													showIcon={true}
													message='No persistence effects'
												/>
												: null
										}
										<Button block={true} onClick={addPersistence}>Add a persistence effect</Button>
									</Space>
								</div>
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
