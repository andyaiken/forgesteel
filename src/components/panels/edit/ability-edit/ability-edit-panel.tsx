import { Ability, AbilitySectionField, AbilitySectionRoll, AbilitySectionText } from '../../../../models/ability';
import { Alert, Button, Input, Popover, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { AbilityDistanceType } from '../../../../enums/abiity-distance-type';
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

	const setKeywords = (value: string[]) => {
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
			case AbilityDistanceType.Summoner:
				return 'Summoner Range';
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
			case 'Summoner':
				copy.distance[index] = FactoryLogic.distance.createSummoner();
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

	const addSection = (type: 'text' | 'field' | 'roll') => {
		const copy = Utils.copy(ability);
		switch (type) {
			case 'text':
				copy.sections.push(FactoryLogic.createAbilitySectionText(''));
				break;
			case 'field':
				copy.sections.push(FactoryLogic.createAbilitySectionField({
					name: '',
					effect: ''
				}));
				break;
			case 'roll':
				copy.sections.push(FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: Characteristic.Might,
						tier1: '',
						tier2: '',
						tier3: ''
					})
				));
				break;
		}
		setAbility(copy);
		props.onChange(copy);
	};

	const moveSection = (index: number, direction: 'up' | 'down') => {
		const copy = Utils.copy(ability);
		copy.sections = Collections.move(copy.sections, index, direction);
		setAbility(copy);
		props.onChange(copy);
	};

	const deleteSection = (index: number) => {
		const copy = Utils.copy(ability);
		copy.sections.splice(index, 1);
		setAbility(copy);
		props.onChange(copy);
	};

	const setTextSectionText = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionText).text = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setFieldSectionName = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionField).name = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setFieldSectionEffect = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionField).effect = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setFieldSectionValue = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionField).value = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setFieldSectionRepeatable = (index: number, value: boolean) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionField).repeatable = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRollSectionCharacteristics = (index: number, value: Characteristic[]) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionRoll).roll.characteristic = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRollSectionBonus = (index: number, value: number) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionRoll).roll.bonus = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRollSectionTier1 = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionRoll).roll.tier1 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRollSectionTier2 = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionRoll).roll.tier2 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const setRollSectionTier3 = (index: number, value: string) => {
		const copy = Utils.copy(ability);
		(copy.sections[index] as AbilitySectionRoll).roll.tier3 = value;
		setAbility(copy);
		props.onChange(copy);
	};

	const getSectionTitle = (section: AbilitySectionText | AbilitySectionField | AbilitySectionRoll) => {
		switch (section.type) {
			case 'text':
				return 'Text';
			case 'field':
				return section.name || 'Field';
			case 'roll':
				return 'Roll';
		}
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
										<MultiLine value={ability.description} onChange={setDescription} />
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
											mode='tags'
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
										<HeaderText
											extra={
												<Button type='text' icon={<PlusOutlined />} onClick={addDistance} />
											}
										>
											Distance
										</HeaderText>
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
															<Select
																style={{ width: '100%' }}
																placeholder='Distance'
																options={[ 'Self', 'Melee', 'Ranged', 'Area', 'Line', 'Summoner', 'Special' ].map(option => ({ value: option }))}
																optionRender={option => <div className='ds-text'>{option.data.value}</div>}
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
																(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Summoner Range') && (getDistanceMainType(n) !== 'Special') ?
																	<HeaderText>Value</HeaderText>
																	: null
															}
															{
																(getDistanceMainType(n) !== 'Self') && (getDistanceMainType(n) !== 'Summoner Range') && (getDistanceMainType(n) !== 'Special') ?
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
								label: 'Content',
								children: (
									<div>
										<HeaderText
											extra={
												<Popover
													trigger='click'
													content={
														<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
															<Button type='text' onClick={() => addSection('text')}>Add Text</Button>
															<Button type='text' onClick={() => addSection('field')}>Add a Field</Button>
															<Button type='text' onClick={() => addSection('roll')}>Add a Roll</Button>
														</div>
													}
												>
													<Button type='text' icon={<PlusOutlined />} />
												</Popover>
											}
										>
											Sections
										</HeaderText>
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												ability.sections.map((section, n) => (
													<Expander
														key={n}
														title={getSectionTitle(section)}
														extra={[
															<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'up'); }} />,
															<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'down'); }} />,
															<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(n); }} />
														]}
													>
														{
															section.type === 'text' ?
																<Space direction='vertical' style={{ width: '100%' }}>
																	<HeaderText>Text</HeaderText>
																	<MultiLine value={section.text} onChange={value => setTextSectionText(n, value)} />
																</Space>
																: null
														}
														{
															section.type === 'field' ?
																<Space direction='vertical' style={{ width: '100%' }}>
																	<HeaderText>Name</HeaderText>
																	<Input
																		status={section.name === '' ? 'warning' : ''}
																		placeholder='Name'
																		allowClear={true}
																		value={section.name}
																		onChange={e => setFieldSectionName(n, e.target.value)}
																	/>
																	<HeaderText>Effect</HeaderText>
																	<MultiLine value={section.effect} onChange={value => setFieldSectionEffect(n, value)} />
																	<HeaderText>Cost</HeaderText>
																	<NumberSpin min={0} value={section.value} onChange={value => setFieldSectionValue(n, value)} />
																	<Toggle label='Repeatable' value={section.repeatable} onChange={value => setFieldSectionRepeatable(n, value)} />
																</Space>
																: null
														}
														{
															section.type === 'roll' ?
																<Space direction='vertical' style={{ width: '100%' }}>
																	<HeaderText>Characteristics / Bonus</HeaderText>
																	<Select
																		style={{ width: '100%' }}
																		disabled={section.roll.bonus > 0}
																		status={(section.roll.characteristic.length === 0) && (section.roll.bonus === 0) ? 'warning' : ''}
																		placeholder='Characteristics'
																		mode='multiple'
																		options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(option => ({ value: option }))}
																		optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																		value={section.roll.characteristic}
																		onChange={value => setRollSectionCharacteristics(n, value)}
																	/>
																	<NumberSpin disabled={section.roll.characteristic.length > 0} label='Bonus' min={0} value={section.roll.bonus} onChange={value => setRollSectionBonus(n, value)} />
																	{
																		(section.roll.characteristic.length === 0) && (section.roll.bonus === 0) ?
																			<Alert
																				type='warning'
																				showIcon={true}
																				message='A roll must have either (a) at least one characteristic or (b) a set bonus.'
																			/>
																			: null
																	}
																	<HeaderText>Tiers</HeaderText>
																	<Input
																		status={section.roll.tier1 === '' ? 'warning' : ''}
																		placeholder='Tier 1'
																		allowClear={true}
																		value={section.roll.tier1}
																		onChange={e => setRollSectionTier1(n, e.target.value)}
																	/>
																	<Input
																		status={section.roll.tier2 === '' ? 'warning' : ''}
																		placeholder='Tier 2'
																		allowClear={true}
																		value={section.roll.tier2}
																		onChange={e => setRollSectionTier2(n, e.target.value)}
																	/>
																	<Input
																		status={section.roll.tier3 === '' ? 'warning' : ''}
																		placeholder='Tier 3'
																		allowClear={true}
																		value={section.roll.tier3}
																		onChange={e => setRollSectionTier3(n, e.target.value)}
																	/>
																</Space>
																: null
														}
													</Expander>
												))
											}
										</Space>
										{
											ability.sections.length === 0 ?
												<Empty />
												: null
										}
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
