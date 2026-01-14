import { Ability, AbilitySectionField, AbilitySectionPackage, AbilitySectionRoll, AbilitySectionText } from '@/models/ability';
import { Alert, Button, Popover, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityUsage } from '@/enums/ability-usage';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './ability-edit-panel.scss';

interface Props {
	ability: Ability;
	onChange: (ability: Ability) => void;
}

export const AbilityEditPanel = (props: Props) => {
	const [ ability, setAbility ] = useState<Ability>(props.ability);

	const getAbilityPage = () => {
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

		return (
			<div>
				<HeaderText>Name</HeaderText>
				<TextInput
					status={ability.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					value={ability.name}
					onChange={setName}
				/>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={ability.description} onChange={setDescription} />
			</div>
		);
	};

	const getUsagePage = () => {
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

		const setTypeFreeStrike = (value: boolean) => {
			const copy = Utils.copy(ability);
			copy.type.freeStrike = value;
			setAbility(copy);
			props.onChange(copy);
		};

		const setTypeQualifiers = (value: string) => {
			const copy = Utils.copy(ability);
			copy.type.qualifiers = value ? [ value ] : [];
			setAbility(copy);
			props.onChange(copy);
		};

		const setTypeOrder = (value: number) => {
			const copy = Utils.copy(ability);
			copy.type.order = value;
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

		return (
			<div>
				<HeaderText>Type</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					<Select
						style={{ width: '100%' }}
						placeholder='Select usage type'
						options={[ AbilityUsage.MainAction, AbilityUsage.Maneuver, AbilityUsage.Move, AbilityUsage.Trigger, AbilityUsage.VillainAction, AbilityUsage.ChampionAction, AbilityUsage.NoAction, AbilityUsage.Other ].map(option => ({ value: option }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={ability.type.usage}
						onChange={setTypeUsage}
					/>
					{
						ability.type.usage === AbilityUsage.Trigger ?
							<TextInput
								status={ability.type.trigger === '' ? 'warning' : ''}
								placeholder='Trigger'
								allowClear={true}
								value={ability.type.trigger}
								onChange={setTypeTrigger}
							/>
							: null
					}
					{
						ability.type.usage === AbilityUsage.Other ?
							<TextInput
								status={ability.type.time === '' ? 'warning' : ''}
								placeholder='Other'
								allowClear={true}
								value={ability.type.time}
								onChange={setTypeTime}
							/>
							: null
					}
					{
						ability.type.usage === AbilityUsage.VillainAction ?
							<NumberSpin label='Villain Action Order' min={1} max={3} value={ability.type.order || 1} onChange={setTypeOrder} />
							: null
					}
					<TextInput
						placeholder='Qualifiers'
						allowClear={true}
						value={ability.type.qualifiers.join(', ')}
						onChange={setTypeQualifiers}
					/>
					{
						(ability.type.usage === AbilityUsage.MainAction) || (ability.type.usage === AbilityUsage.Maneuver) || (ability.type.usage === AbilityUsage.Trigger) ?
							<Toggle label='Free' value={ability.type.free} onChange={setTypeFree} />
							: null
					}
					<Toggle label='Can be used as a free strike' value={ability.type.freeStrike} onChange={setTypeFreeStrike} />
				</Space>
				<HeaderText>Keywords</HeaderText>
				<Select
					style={{ width: '100%' }}
					placeholder='Keywords'
					mode='tags'
					allowClear={true}
					options={AbilityLogic.getKeywords().map(option => ({ value: option }))}
					optionRender={option => <div className='ds-text'>{option.data.value}</div>}
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
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						(ability.distance || []).map((distance, n) => (
							<Expander
								key={n}
								title={AbilityLogic.getDistance(distance)}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveDistance(n, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveDistance(n, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteDistance(n); }} />
								]}
							>
								<Space orientation='vertical' style={{ width: '100%' }}>
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
										(getDistanceMainType(n) === 'Area') || (getDistanceMainType(n) === 'Line') ?
											<HeaderText>Within</HeaderText>
											: null
									}
									{
										(getDistanceMainType(n) === 'Area') || (getDistanceMainType(n) === 'Line') ?
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
											<TextInput
												status={distance.special === '' ? 'warning' : ''}
												placeholder='Special'
												allowClear={true}
												value={distance.special}
												onChange={value => setDistanceSpecial(n, value)}
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
				<TextInput
					status={ability.target === '' ? 'warning' : ''}
					placeholder='Target'
					allowClear={true}
					value={ability.target}
					onChange={setTarget}
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
		);
	};

	const getContentPage = () => {
		const addSection = (type: 'text' | 'field' | 'roll' | 'package') => {
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
				case 'package':
					copy.sections.push(FactoryLogic.createAbilitySectionPackage(''));
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

		return (
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
									<Button type='text' onClick={() => addSection('package')}>Add a Package</Button>
								</div>
							}
						>
							<Button type='text' icon={<PlusOutlined />} />
						</Popover>
					}
				>
					Sections
				</HeaderText>
				<Space orientation='vertical' style={{ width: '100%' }}>
					{
						(ability.sections || []).map((section, n) => {
							const getSectionTitle = () => {
								switch (section.type) {
									case 'text':
										return 'Text';
									case 'field':
										return section.name || 'Field';
									case 'roll':
										return 'Roll';
									case 'package':
										return `Package: ${section.tag || '(no tag set)'}`;
								}
							};

							const getSectionContent = () => {
								switch (section.type) {
									case 'text': {
										const setTextSectionText = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionText).text = value;
											setAbility(copy);
											props.onChange(copy);
										};

										return (
											<Space orientation='vertical' style={{ width: '100%' }}>
												<HeaderText>Text</HeaderText>
												<MarkdownEditor value={section.text} onChange={setTextSectionText} />
											</Space>
										);
									}
									case 'field': {
										const setFieldSectionName = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionField).name = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setFieldSectionEffect = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionField).effect = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setFieldSectionValue = (value: number) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionField).value = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setFieldSectionRepeatable = (value: boolean) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionField).repeatable = value;
											setAbility(copy);
											props.onChange(copy);
										};

										return (
											<Space orientation='vertical' style={{ width: '100%' }}>
												<HeaderText>Name</HeaderText>
												<TextInput
													status={section.name === '' ? 'warning' : ''}
													placeholder='Name'
													allowClear={true}
													value={section.name}
													onChange={setFieldSectionName}
												/>
												<HeaderText>Effect</HeaderText>
												<MultiLine
													placeholder='Effect'
													value={section.effect}
													onChange={setFieldSectionEffect}
												/>
												<HeaderText>Cost</HeaderText>
												<NumberSpin min={0} value={section.value} onChange={setFieldSectionValue} />
												<Toggle label='Repeatable' value={section.repeatable} onChange={setFieldSectionRepeatable} />
											</Space>
										);
									}
									case 'roll': {
										const setRollSectionCharacteristics = (value: Characteristic[]) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionRoll).roll.characteristic = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setRollSectionBonus = (value: number) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionRoll).roll.bonus = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setRollSectionTier1 = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionRoll).roll.tier1 = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setRollSectionTier2 = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionRoll).roll.tier2 = value;
											setAbility(copy);
											props.onChange(copy);
										};

										const setRollSectionTier3 = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionRoll).roll.tier3 = value;
											setAbility(copy);
											props.onChange(copy);
										};

										return (
											<Space orientation='vertical' style={{ width: '100%' }}>
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
													onChange={setRollSectionCharacteristics}
												/>
												<NumberSpin disabled={section.roll.characteristic.length > 0} label='Bonus' min={0} value={section.roll.bonus} onChange={setRollSectionBonus} />
												{
													(section.roll.characteristic.length === 0) && (section.roll.bonus === 0) ?
														<Alert
															type='warning'
															showIcon={true}
															title='A roll must have either (a) at least one characteristic or (b) a set bonus.'
														/>
														: null
												}
												<HeaderText>Tiers</HeaderText>
												<TextInput
													status={section.roll.tier1 === '' ? 'warning' : ''}
													placeholder='Tier 1'
													allowClear={true}
													value={section.roll.tier1}
													onChange={setRollSectionTier1}
												/>
												<TextInput
													status={section.roll.tier2 === '' ? 'warning' : ''}
													placeholder='Tier 2'
													allowClear={true}
													value={section.roll.tier2}
													onChange={setRollSectionTier2}
												/>
												<TextInput
													status={section.roll.tier3 === '' ? 'warning' : ''}
													placeholder='Tier 3'
													allowClear={true}
													value={section.roll.tier3}
													onChange={setRollSectionTier3}
												/>
											</Space>
										);
									}
									case 'package': {
										const setPackageSectionTag = (value: string) => {
											const copy = Utils.copy(ability);
											(copy.sections[n] as AbilitySectionPackage).tag = value;
											setAbility(copy);
											props.onChange(copy);
										};

										return (
											<Space orientation='vertical' style={{ width: '100%' }}>
												<HeaderText>Tag</HeaderText>
												<TextInput
													status={section.tag === '' ? 'warning' : ''}
													placeholder='Tag'
													allowClear={true}
													value={section.tag}
													onChange={setPackageSectionTag}
												/>
											</Space>
										);
									}
								}
							};

							return (
								<Expander
									key={n}
									title={getSectionTitle()}
									extra={[
										<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'up'); }} />,
										<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'down'); }} />,
										<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(n); }} />
									]}
								>
									{getSectionContent()}
								</Expander>
							);
						})
					}
				</Space>
				{
					ability.sections.length === 0 ?
						<Empty />
						: null
				}
			</div>
		);
	};

	return (
		<ErrorBoundary>
			<div className='ability-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Ability',
							children: getAbilityPage()
						},
						{
							key: '2',
							label: 'Usage',
							children: getUsagePage()
						},
						{
							key: '3',
							label: 'Content',
							children: getContentPage()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
