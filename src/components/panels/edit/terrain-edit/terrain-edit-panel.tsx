import { Button, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons';
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
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { Size } from '@/models/size';
import { Sourcebook } from '@/models/sourcebook';
import { Terrain } from '@/models/terrain';
import { TerrainCategory } from '@/enums/terrain-category';
import { TerrainPanel } from '@/components/panels/elements/terrain-panel/terrain-panel';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './terrain-edit-panel.scss';

interface Props {
	terrain: Terrain;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onChange: (terrain: Terrain) => void;
}

export const TerrainEditPanel = (props: Props) => {
	const [ terrain, setTerrain ] = useState<Terrain>(props.terrain);
	const [ revision, setRevision ] = useState<number>(0);

	const updateTerrain = (value: Terrain) => {
		setTerrain(value);
		setRevision(revision + 1);
		props.onChange(value);
	};

	const getNameAndDescriptionSection = () => {
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(terrain);
			copy.name = name;
			copy.description = desc;
			updateTerrain(copy);
		};

		return (
			<NameDescEditPanel
				element={terrain}
				onChange={onChange}
			/>
		);
	};

	const getTerrainStatsSection = () => {
		const setCategory = (value: TerrainCategory) => {
			const copy = Utils.copy(terrain);
			copy.category = value;
			updateTerrain(copy);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.level = value;
			updateTerrain(copy);
		};

		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(terrain);
			copy.role.type = value;
			updateTerrain(copy);
		};

		const setTerrainRoleType = (value: TerrainRoleType) => {
			const copy = Utils.copy(terrain);
			copy.role.terrainType = value;
			updateTerrain(copy);
		};

		const setEncounterValue = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.encounterValue = value;
			updateTerrain(copy);
		};

		const setArea = (value: string) => {
			const copy = Utils.copy(terrain);
			copy.area = value;
			updateTerrain(copy);
		};

		const setStaminaBase = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.stamina.base = value;
			updateTerrain(copy);
		};

		const setStaminaPerSquare = (value: number) => {
			const copy = Utils.copy(terrain);
			copy.stamina.perSquare = value;
			updateTerrain(copy);
		};

		const setSize = (value: string | Size) => {
			const copy = Utils.copy(terrain);
			copy.size = value;
			updateTerrain(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = Utils.copy(terrain);
			if (typeof copy.size !== 'string') {
				copy.size.value = value;
				updateTerrain(copy);
			}
		};

		const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(terrain);
			if (typeof copy.size !== 'string') {
				copy.size.mod = value;
				updateTerrain(copy);
			}
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Category</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainCategory.SupernaturalObject, TerrainCategory.Environmental, TerrainCategory.Fieldwork, TerrainCategory.Mechanism, TerrainCategory.PowerFixture, TerrainCategory.SiegeEngine ].map(c => ({ label: c, value: c }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
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
					value={terrain.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(type => ({ label: type, value: type }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={terrain.role.terrainType}
					onChange={setTerrainRoleType}
				/>
				<HeaderText>Encounter Value</HeaderText>
				<NumberSpin min={1} value={terrain.encounterValue} steps={[ 1, 10 ]} onChange={setEncounterValue} />
				<TextInput
					placeholder='Area'
					allowClear={true}
					value={terrain.area}
					onChange={setArea}
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
						<TextInput
							placeholder='Size'
							allowClear={true}
							value={terrain.size}
							onChange={setSize}
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
			updateTerrain(copy);
		};

		const setModifierType = (index: number, value: DamageModifierType) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].type = value;
			updateTerrain(copy);
		};

		const setDamageType = (index: number, value: DamageType) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].damageType = value;
			updateTerrain(copy);
		};

		const setValue = (index: number, value: number) => {
			const copy = Utils.copy(terrain);
			copy.damageMods[index].value = value;
			updateTerrain(copy);
		};

		const moveDamageMod = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.damageMods = Collections.move(copy.damageMods, index, direction);
			updateTerrain(copy);
		};

		const deleteDamageMod = (index: number) => {
			const copy = Utils.copy(terrain);
			copy.damageMods.splice(index, 1);
			updateTerrain(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
			updateTerrain(copy);
		};

		const moveSection = (sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.sections = Collections.move(copy.sections, sectionIndex, direction);
			updateTerrain(copy);
		};

		const deleteSection = (sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.sections.splice(sectionIndex, 1);
			updateTerrain(copy);
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
			updateTerrain(copy);
		};

		const moveSectionContent = (sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			updateTerrain(copy);
		};

		const deleteSectionContent = (sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content.splice(contentIndex, 1);
			updateTerrain(copy);
		};

		const setSectionContentFeature = (sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(terrain);
			copy.sections[sectionIndex].content[contentIndex] = value;
			updateTerrain(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
							<Space orientation='vertical' style={{ width: '100%' }}>
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
			updateTerrain(copy);
		};

		const moveUpgrade = (upgradeIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades = Collections.move(copy.upgrades, upgradeIndex, direction);
			updateTerrain(copy);
		};

		const deleteUpgrade = (upgradeIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades.splice(upgradeIndex, 1);
			updateTerrain(copy);
		};

		const setUpgradeLabel = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].label = value;
			updateTerrain(copy);
		};

		const setUpgradeText = (upgradeIndex: number, value: string) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].text = value;
			updateTerrain(copy);
		};

		const setUpgradeCost = (upgradeIndex: number, value: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].cost = value;
			updateTerrain(copy);
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
			updateTerrain(copy);
		};

		const moveUpgradeSection = (upgradeIndex: number, sectionIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections = Collections.move(copy.sections, sectionIndex, direction);
			updateTerrain(copy);
		};

		const deleteUpgradeSection = (upgradeIndex: number, sectionIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections.splice(sectionIndex, 1);
			updateTerrain(copy);
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
			updateTerrain(copy);
		};

		const moveUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content = Collections.move(copy.sections[sectionIndex].content, contentIndex, direction);
			updateTerrain(copy);
		};

		const deleteUpgradeSectionContent = (upgradeIndex: number, sectionIndex: number, contentIndex: number) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content.splice(contentIndex, 1);
			updateTerrain(copy);
		};

		const setUpgradeSectionContentFeature = (upgradeIndex: number, sectionIndex: number, contentIndex: number, value: FeatureText | FeatureAbility) => {
			const copy = Utils.copy(terrain);
			copy.upgrades[upgradeIndex].sections[sectionIndex].content[contentIndex] = value;
			updateTerrain(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
							<Space orientation='vertical' style={{ width: '100%' }}>
								<HeaderText>Label</HeaderText>
								<TextInput
									status={upgrade.label === '' ? 'warning' : ''}
									placeholder='Label'
									allowClear={true}
									value={upgrade.label}
									onChange={value => setUpgradeLabel(upgradeIndex, value)}
								/>
								<HeaderText>Text</HeaderText>
								<MarkdownEditor value={upgrade.text} onChange={value => setUpgradeText(upgradeIndex, value)} />
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
											<Space orientation='vertical' style={{ width: '100%' }}>
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
				<div className='terrain-workspace-column'>
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
				{
					props.mode === PanelMode.Full ?
						<div className='terrain-preview-column'>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Preview',
										children: (
											<SelectablePanel>
												<TerrainPanel
													key={revision}
													terrain={terrain}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
										)
									}
								]}
							/>
						</div>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
