import { Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { FeatureAbility, FeatureText } from '@/models/feature';
import { Collections } from '@/utils/collections';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { DamageType } from '@/enums/damage-type';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { MultiLine } from '@/components/controls/multi-line/multi-line';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Size } from '@/models/size';
import { Sourcebook } from '@/models/sourcebook';
import { Terrain } from '@/models/terrain';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './terrain-edit-panel.scss';

interface Props {
	terrain: Terrain;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (terrain: Terrain) => void;
}

export const TerrainEditPanel = (props: Props) => {
	const [ terrain, setTerrain ] = useState<Terrain>(props.terrain);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(terrain);
			copy.name = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(terrain);
			copy.description = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					status={terrain.name === '' ? 'warning' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={terrain.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine value={terrain.description} onChange={setDescription} />
			</Space>
		);
	};

	const getTerrainStatsSection = () => {
		const setCategory = (value: TerrainCategory) => {
			const copy = Utils.copy(terrain);
			copy.category = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.level = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(terrain);
			copy.role.type = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setTerrainRoleType = (value: TerrainRoleType) => {
			const copy = Utils.copy(terrain);
			copy.role.terrainType = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setEncounterValue = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.encounterValue = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setArea = (value: string) => {
			const copy = Utils.copy(terrain);
			copy.area = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setStaminaBase = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.stamina.base = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setStaminaPerSquare = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.stamina.perSquare = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setSize = (value: string | Size) => {
			const copy = Utils.copy(terrain);
			copy.size = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = Utils.copy(terrain);
			if (typeof copy.size !== 'string') {
				copy.size.value = value;
				setTerrain(copy);
				props.onChange(copy);
			}
		};

		const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(terrain);
			if (typeof copy.size !== 'string') {
				copy.size.mod = value;
				setTerrain(copy);
				props.onChange(copy);
			}
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Category</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainCategory.SupernaturalObject, TerrainCategory.Environmental, TerrainCategory.Fieldwork, TerrainCategory.Mechanism, TerrainCategory.PowerFixture, TerrainCategory.SiegeEngine ].map(c => ({ label: c, value: c }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.category}
					onChange={setCategory}
				/>
				<HeaderText>Level</HeaderText>
				<NumberSpin
					min={1}
					max={10}
					value={terrain.level}
					onChange={setLevel}
				/>
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ MonsterRoleType.NoRole, MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(type => ({ label: type, value: type, desc: MonsterLogic.getRoleTypeDescription(type) }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label,
								option.desc
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(type => ({ label: type, value: type }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					showSearch={true}
					filterOption={(input, option) => {
						const strings = option ?
							[
								option.label
							]
							: [];
						return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
					}}
					value={terrain.role.terrainType}
					onChange={setTerrainRoleType}
				/>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={terrain.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				<Input
					placeholder='Area'
					allowClear={true}
					value={terrain.area}
					onChange={e => setArea(e.target.value)}
				/>
				<HeaderText>Stamina</HeaderText>
				<NumberSpin label='Base Stamina' min={0} value={terrain.stamina.base} steps={[ 1, 10 ]} onChange={setStaminaBase} />
				<NumberSpin label='Per Square' min={0} value={terrain.stamina.perSquare} steps={[ 1, 10 ]} onChange={setStaminaPerSquare} />
				<HeaderText>Size</HeaderText>
				<Segmented
					block={true}
					options={[
						{ value: false, label: 'Standard' },
						{ value: true, label: 'Custom' }
					]}
					value={typeof terrain.size === 'string'}
					onChange={value => setSize(value ? '' : FactoryLogic.createSize(1, 'M'))}
				/>
				{
					typeof terrain.size === 'string' ?
						<Input
							placeholder='Size'
							allowClear={true}
							value={terrain.size}
							onChange={e => setSize(e.target.value)}
						/>
						:
						<>
							<NumberSpin min={1} value={terrain.size.value} onChange={setSizeValue} />
							{
								terrain.size.value === 1 ?
									<Segmented<'' | 'T' | 'S' | 'M' | 'L'>
										name='sizemodtypes'
										block={true}
										options={[ 'T', 'S', 'M', 'L' ]}
										value={terrain.size.mod}
										onChange={setSizeMod}
									/>
									: null
							}
						</>
				}
			</Space>
		);
	};

	const getTerrainDamageSection = () => {
		const addDamageMod = () => {
			const copy = Utils.copy(terrain);
			copy.damageMods.push(FactoryLogic.damageModifier.create({
				damageType: DamageType.Damage,
				modifierType: DamageModifierType.Immunity,
				value: 0
			}));
			setTerrain(copy);
			props.onChange(copy);
		};

		const setModifierType = (index: number, value: DamageModifierType) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].type = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setDamageType = (index: number, value: DamageType) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].damageType = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setValue = (index: number, value: number) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].value = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveDamageMod = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.damageMods = Collections.move(copy.damageMods, index, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteDamageMod = (index: number) => {
			const copy = Utils.copy(terrain);
			copy.damageMods.splice(index, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addDamageMod} />
					}
				>
					Damage Modifiers
				</HeaderText>
				{
					terrain.damageMods.map((dm, n) => (
						<Expander
							key={n}
							title={FormatLogic.getDamageModifier(dm)}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveDamageMod(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveDamageMod(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteDamageMod(n); }} />
							]}
						>
							<HeaderText>Modifier Type</HeaderText>
							<Segmented
								name='modifiertypes'
								block={true}
								options={[ DamageModifierType.Immunity, DamageModifierType.Weakness ]}
								value={dm.type}
								onChange={value => setModifierType(n, value)}
							/>
							<HeaderText>Damage Type</HeaderText>
							<Select
								style={{ width: '100%' }}
								placeholder='Damage type'
								options={[ DamageType.Damage, DamageType.Acid, DamageType.Cold, DamageType.Corruption, DamageType.Fire, DamageType.Holy, DamageType.Lightning, DamageType.Poison, DamageType.Psychic, DamageType.Sonic ].map(option => ({ value: option }))}
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
								value={dm.damageType}
								onChange={value => setDamageType(n, value)}
							/>
							<HeaderText>Value</HeaderText>
							<NumberSpin min={0} value={dm.value} onChange={value => setValue(n, value)} />
						</Expander>
					))
				}
				{
					terrain.damageMods.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getTerrainSectionsSection = () => {
		const addSection = () => {
			const copy = Utils.copy(terrain);
			copy.sections.push({
				id: Utils.guid(),
				content: [
					FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				]
			});
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveSection = (sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.sections = Collections.move(copy.sections, sectionIndex, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteSection = (sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.sections.splice(sectionIndex, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		const addSectionContent = (sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content.push(
				FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				})
			);
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveSectionContent = (sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteSectionContent = (sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content.splice(contentIndex, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		const setSectionContentFeature = (sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content[contentIndex] = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addSection} />
					}
				>
					Sections
				</HeaderText>
				{
					terrain.sections.map((section, sectionIndex) => (
						<Expander
							key={section.id}
							title='Section'
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(sectionIndex); }} />
							]}
						>
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									section.content.map((feature, contentIndex) => (
										<Expander
											key={feature.id}
											title={feature.name}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSectionContent(sectionIndex, contentIndex, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSectionContent(sectionIndex, contentIndex, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSectionContent(sectionIndex, contentIndex); }} />
											]}
										>
											<FeatureEditPanel
												feature={feature}
												allowedTypes={[ FeatureType.Text, FeatureType.Ability ]}
												sourcebooks={props.sourcebooks}
												options={props.options}
												onChange={f => setSectionContentFeature(sectionIndex, contentIndex, f as FeatureText | FeatureAbility)}
											/>
										</Expander>
									))
								}
								{
									section.content.length === 0 ?
										<Empty />
										: null
								}
								<Button icon={<PlusOutlined />} onClick={() => addSectionContent(sectionIndex)} />
							</Space>
						</Expander>
					))
				}
				{
					terrain.sections.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getTerrainCustomizationSection = () => {
		const addUpgrade = () => {
			const copy = Utils.copy(terrain);
			copy.upgrades.push({
				id: Utils.guid(),
				label: '',
				cost: 1,
				text: '',
				sections: []
			});
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveUpgrade = (upgradeIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades = Collections.move(copy.upgrades, upgradeIndex, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteUpgrade = (upgradeIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades.splice(upgradeIndex, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		const setUpgradeLabel = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].label = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setUpgradeText = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].text = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const setUpgradeCost = (upgradeIndex: number, value: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].cost = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		const addUpgradeSection = (upgradeIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections.push({
				id: Utils.guid(),
				content: [
					FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					})
				]
			});
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveUpgradeSection = (upgradeIndex: number, sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections = Collections.move(copy.sections, sectionIndex, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteUpgradeSection = (upgradeIndex: number, sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections.splice(sectionIndex, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		const addUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content.push(
				FactoryLogic.feature.create({
					id: Utils.guid(),
					name: '',
					description: ''
				})
			);
			setTerrain(copy);
			props.onChange(copy);
		};

		const moveUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			setTerrain(copy);
			props.onChange(copy);
		};

		const deleteUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content.splice(contentIndex, 1);
			setTerrain(copy);
			props.onChange(copy);
		};

		const setUpgradeSectionContentFeature = (upgradeIndex: number, sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content[contentIndex] = value;
			setTerrain(copy);
			props.onChange(copy);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addUpgrade} />
					}
				>
					Customizations
				</HeaderText>
				{
					terrain.upgrades.map((upgrade, upgradeIndex) => (
						<Expander
							key={upgrade.id}
							title={upgrade.label || 'Unnamed Customization'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgrade(upgradeIndex, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgrade(upgradeIndex, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgrade(upgradeIndex); }} />
							]}
						>
							<Space direction='vertical' style={{ width: '100%' }}>
								<HeaderText>Label</HeaderText>
								<Input
									status={upgrade.label === '' ? 'warning' : ''}
									placeholder='Label'
									allowClear={true}
									value={upgrade.label}
									onChange={e => setUpgradeLabel(upgradeIndex, e.target.value)}
								/>
								<HeaderText>Text</HeaderText>
								<MultiLine value={upgrade.text} onChange={value => setUpgradeText(upgradeIndex, value)} />
								<HeaderText>Cost</HeaderText>
								<NumberSpin min={1} value={upgrade.cost} onChange={value => setUpgradeCost(upgradeIndex, value)} />
								<HeaderText
									extra={
										<Button type='text' icon={<PlusOutlined />} onClick={() => addUpgradeSection(upgradeIndex)} />
									}
								>
									Sections
								</HeaderText>
								{
									upgrade.sections.map((section, sectionIndex) => (
										<Expander
											key={section.id}
											title='Section'
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSection(upgradeIndex, sectionIndex, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSection(upgradeIndex, sectionIndex, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgradeSection(upgradeIndex, sectionIndex); }} />
											]}
										>
											<Space direction='vertical' style={{ width: '100%' }}>
												<HeaderText
													extra={
														<Button type='text' icon={<PlusOutlined />} onClick={() => addUpgradeSectionContent(upgradeIndex, sectionIndex)} />
													}
												>
													Content
												</HeaderText>
												{
													section.content.map((feature, contentIndex) => (
														<Expander
															key={feature.id}
															title={feature.name}
															extra={[
																<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex, 'up'); }} />,
																<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex, 'down'); }} />,
																<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteUpgradeSectionContent(upgradeIndex, sectionIndex, contentIndex); }} />
															]}
														>
															<FeatureEditPanel
																feature={feature}
																allowedTypes={[ FeatureType.Text, FeatureType.Ability ]}
																sourcebooks={props.sourcebooks}
																options={props.options}
																onChange={f => setUpgradeSectionContentFeature(upgradeIndex, sectionIndex, contentIndex, f as FeatureText | FeatureAbility)}
															/>
														</Expander>
													))
												}
												{
													section.content.length === 0 ?
														<Empty />
														: null
												}
											</Space>
										</Expander>
									))
								}
								{
									upgrade.sections.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						</Expander>
					))
				}
				{
					terrain.upgrades.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='terrain-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Terrain',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Stats',
							children: getTerrainStatsSection()
						},
						{
							key: '3',
							label: 'Damage',
							children: getTerrainDamageSection()
						},
						{
							key: '4',
							label: 'Sections',
							children: getTerrainSectionsSection()
						},
						{
							key: '5',
							label: 'Customization',
							children: getTerrainCustomizationSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
