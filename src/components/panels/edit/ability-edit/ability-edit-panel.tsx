import { Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { Ability } from '../../../../models/ability';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './ability-edit-panel.scss';

interface Props {
	ability: Ability;
	onChange: (ability: Ability) => void;
}

export const AbilityEditPanel = (props: Props) => {
	const [ ability, setAbility ] = useState<Ability>(props.ability);

	const setName = (value: string) => {
		const copy = Utils.copy(ability);
		copy.name = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDescription = (value: string) => {
		const copy = Utils.copy(ability);
		copy.description = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeUsage = (value: AbilityUsage) => {
		const copy = Utils.copy(ability);
		copy.type.usage = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeFree = (value: boolean) => {
		const copy = Utils.copy(ability);
		copy.type.free = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTrigger = (value: string) => {
		const copy = Utils.copy(ability);
		copy.type.trigger = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setTypeTime = (value: string) => {
		const copy = Utils.copy(ability);
		copy.type.time = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setKeywords = (value: AbilityKeyword[]) => {
		const copy = Utils.copy(ability);
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
		const copy = Utils.copy(ability);

		switch (value) {
			case 'Self':
				copy.distance[index] = FactoryLogic.distance.createSelf();
				break;
			case 'Melee':
				copy.distance[index] = FactoryLogic.distance.createMelee();
				break;
			case 'Ranged':
				copy.distance[index] = FactoryLogic.distance.createRanged(10);
				break;
			case 'Area':
				copy.distance[index] = FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 });
				break;
			case 'Line':
				copy.distance[index] = FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 5, within: 1 });
				break;
			case 'Special':
				copy.distance[index] = FactoryLogic.distance.createSpecial('');
				break;
		}

		setAbility(copy);
		props.onChange(copy);
	};

	const addDistance = () => {
		const copy = Utils.copy(ability);
		copy.distance.push(FactoryLogic.distance.createMelee());
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceType = (index: number, value: AbilityDistanceType) => {
		const copy = Utils.copy(ability);
		copy.distance[index].type = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		copy.distance[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceValue2 = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		copy.distance[index].value2 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceWithin = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		copy.distance[index].within = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setDistanceSpecial = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		copy.distance[index].special = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveDistance = (index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(ability);
		copy.distance = Collections.move(copy.distance, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteDistance = (index: number) => {
		const copy = Utils.copy(ability);
		copy.distance.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const setTarget = (value: string) => {
		const copy = Utils.copy(ability);
		copy.target = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setCost = (value: number | 'signature') => {
		const copy = Utils.copy(ability);
		copy.cost = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRepeatable = (value: boolean) => {
		const copy = Utils.copy(ability);
		copy.repeatable = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPreEffect = (value: string) => {
		const copy = Utils.copy(ability);
		copy.preEffect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll = (value: boolean) => {
		const copy = Utils.copy(ability);
		copy.powerRoll = value ? FactoryLogic.createPowerRoll({ characteristic: [], tier1: '', tier2: '', tier3: '' }) : null;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRollCharacteristics = (value: Characteristic[]) => {
		const copy = Utils.copy(ability);
		if (copy.powerRoll) {
			copy.powerRoll.characteristic = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll1 = (value: string) => {
		const copy = Utils.copy(ability);
		if (copy.powerRoll) {
			copy.powerRoll.tier1 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll2 = (value: string) => {
		const copy = Utils.copy(ability);
		if (copy.powerRoll) {
			copy.powerRoll.tier2 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setPowerRoll3 = (value: string) => {
		const copy = Utils.copy(ability);
		if (copy.powerRoll) {
			copy.powerRoll.tier3 = value;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const setEffect = (value: string) => {
		const copy = Utils.copy(ability);
		copy.effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const addAlternateEffect = () => {
		const copy = Utils.copy(ability);
		copy.alternateEffects.push('');
		setAbility(copy);
		props.onChange(copy);
	};

	const setAlternateEffect = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		copy.alternateEffects[index] = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveAlternateEffect = (index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(ability);
		copy.alternateEffects = Collections.move(copy.alternateEffects, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteAlternateEffect = (index: number) => {
		const copy = Utils.copy(ability);
		copy.alternateEffects.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addSpend = () => {
		const copy = Utils.copy(ability);
		copy.spend.push({ name: '', effect: '', value: 1, repeatable: false });
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendValue = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		copy.spend[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setSpendEffect = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		copy.spend[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const moveSpend = (index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(ability);
		copy.spend = Collections.move(copy.spend, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteSpend = (index: number) => {
		const copy = Utils.copy(ability);
		copy.spend.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const addPersistence = () => {
		const copy = Utils.copy(ability);
		copy.persistence.push({ effect: '', value: 1 });
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceValue = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		copy.persistence[index].value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setPersistenceEffect = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		copy.persistence[index].effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const movePersistence = (index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(ability);
		copy.persistence = Collections.move(copy.persistence, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deletePersistence = (index: number) => {
		const copy = Utils.copy(ability);
		copy.persistence.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const setStrained = (value: string) => {
		const copy = Utils.copy(ability);
		copy.strained = value;
		setAbility(copy);
		props.onChange(copy);
	};

	try {
		return (
			<ErrorBoundary>
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
											status={ability.name === '' ? 'warning' : ''}
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
												showSearch={true}
												filterOption={(input, option) => {
													const strings = option ?
														[
															option.value
														]
														: [];
													return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
												}}
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
														status={ability.type.trigger === '' ? 'warning' : ''}
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
														status={ability.type.time === '' ? 'warning' : ''}
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
											options={AbilityLogic.getKeywords().map(option => ({ value: option }))}
											optionRender={option => <div className='ds-text'>{option.data.value}</div>}
											showSearch={true}
											filterOption={(input, option) => {
												const strings = option ?
													[
														option.value
													]
													: [];
												return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
											}}
											value={ability.keywords}
											onChange={setKeywords}
										/>
										<HeaderText>Distance</HeaderText>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												ability.distance.map((distance, n) => (
													<Expander
														key={n}
														title={AbilityLogic.getDistance(distance)}
														extra={[
															<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveDistance(n, 'up'); }} />,
															<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveDistance(n, 'down'); }} />,
															<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteDistance(n); }} />
														]}
													>
														<Space direction='vertical' style={{ width: '100%' }}>
															<HeaderText>Distance Type</HeaderText>
															<Segmented
																name='distancetypes'
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
																		showSearch={true}
																		filterOption={(input, option) => {
																			const strings = option ?
																				[
																					option.value
																				]
																				: [];
																			return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
																		}}
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
																		status={distance.special === '' ? 'warning' : ''}
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
													<Empty />
													: null
											}
											<Button block={true} onClick={addDistance}>
												<PlusOutlined />
												Add a new distance
											</Button>
										</Space>
										<HeaderText>Target</HeaderText>
										<Input
											status={ability.target === '' ? 'warning' : ''}
											placeholder='Target'
											allowClear={true}
											value={ability.target}
											onChange={e => setTarget(e.target.value)}
										/>
										<HeaderText>Signature</HeaderText>
										<Toggle label='Signature' value={ability.cost === 'signature'} onChange={value => setCost(value ? 'signature' : 0)} />
										{
											ability.cost !== 'signature' ?
												<>
													<HeaderText>Cost</HeaderText>
													<NumberSpin min={0} value={ability.cost} onChange={setCost} />
													<HeaderText>Repeatable</HeaderText>
													<Toggle label='Repeatable' value={ability.repeatable} onChange={setRepeatable} />
												</>
												: null
										}
									</div>
								)
							},
							{
								key: '3',
								label: 'Information',
								children: (
									<div>
										<HeaderText>Pre-Roll Effect</HeaderText>
										<MultiLine label='Effect' value={ability.preEffect} onChange={setPreEffect} />
										<HeaderText>Power Roll</HeaderText>
										<Space direction='vertical' style={{ width: '100%' }}>
											<Toggle label='Has Power Roll' value={!!ability.powerRoll} onChange={setPowerRoll} />
											{
												ability.powerRoll ?
													<Select
														style={{ width: '100%' }}
														status={ability.powerRoll.characteristic.length === 0 ? 'warning' : ''}
														placeholder='Characteristics'
														mode='multiple'
														options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
														optionRender={option => <div className='ds-text'>{option.data.value}</div>}
														showSearch={true}
														filterOption={(input, option) => {
															const strings = option ?
																[
																	option.value
																]
																: [];
															return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
														}}
														value={ability.powerRoll.characteristic}
														onChange={setPowerRollCharacteristics}
													/>
													: null
											}
											{
												ability.powerRoll ?
													<Input
														status={ability.powerRoll.tier1 === '' ? 'warning' : ''}
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
														status={ability.powerRoll.tier2 === '' ? 'warning' : ''}
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
														status={ability.powerRoll.tier3 === '' ? 'warning' : ''}
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
															<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveAlternateEffect(n, 'up'); }} />,
															<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveAlternateEffect(n, 'down'); }} />,
															<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteAlternateEffect(n); }} />
														]}
													>
														<Input
															status={effect === '' ? 'warning' : ''}
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
													<Empty />
													: null
											}
											<Button block={true} onClick={addAlternateEffect}>
												<PlusOutlined />
												Add an alternate effect
											</Button>
										</Space>
										<HeaderText>Spend</HeaderText>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												ability.spend.map((spend, n) => (
													<Expander
														key={n}
														title='Spend Effect'
														extra={[
															<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSpend(n, 'up'); }} />,
															<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSpend(n, 'down'); }} />,
															<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSpend(n); }} />
														]}
													>
														<Space direction='vertical' style={{ width: '100%' }}>
															<Input
																status={spend.effect === '' ? 'warning' : ''}
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
													<Empty />
													: null
											}
											<Button block={true} onClick={addSpend}>
												<PlusOutlined />
												Add a spend effect
											</Button>
										</Space>
										<HeaderText>Persistence</HeaderText>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												ability.persistence.map((persist, n) => (
													<Expander
														key={n}
														title='Persistence Effect'
														extra={[
															<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePersistence(n, 'up'); }} />,
															<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePersistence(n, 'down'); }} />,
															<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deletePersistence(n); }} />
														]}
													>
														<Space direction='vertical' style={{ width: '100%' }}>
															<Input
																status={persist.effect === '' ? 'warning' : ''}
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
													<Empty />
													: null
											}
											<Button block={true} onClick={addPersistence}>
												<PlusOutlined />
												Add a persistence effect
											</Button>
											<HeaderText>Strained</HeaderText>
											<MultiLine label='Strained' value={ability.strained} onChange={setStrained} />
										</Space>
									</div>
								)
							}
						]}
					/>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
