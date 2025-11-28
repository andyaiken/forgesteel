import { Button, Input, Segmented, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
import { FeatureEditPanel } from '@/components/panels/edit/feature-edit/feature-edit-panel';
import { FeatureLogic } from '@/logic/feature-logic';
import { Field } from '@/components/controls/field/field';
import { Fixture } from '@/models/fixture';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { Sourcebook } from '@/models/sourcebook';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './fixture-edit-panel.scss';

interface Props {
	fixture: Fixture;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (fixture: Fixture) => void;
}

export const FixtureEditPanel = (props: Props) => {
	const [ fixture, setFixture ] = useState<Fixture>(props.fixture);

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(fixture);
			copy.name = value;
			setFixture(copy);
			props.onChange(copy);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(fixture);
			copy.description = value;
			setFixture(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={fixture.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={fixture.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={fixture.description} onChange={setDescription} />
			</Space>
		);
	};

	const getDetailsSection = () => {
		const setRoleType = (value: MonsterRoleType) => {
			const copy = Utils.copy(fixture);
			copy.role.type = value;
			setFixture(copy);
			props.onChange(copy);
		};

		const setTerrainRoleType = (value: TerrainRoleType) => {
			const copy = Utils.copy(fixture);
			copy.role.terrainType = value;
			setFixture(copy);
			props.onChange(copy);
		};

		const setBaseStamina = (value: number) => {
			const copy = Utils.copy(fixture);
			copy.baseStamina = value;
			setFixture(copy);
			props.onChange(copy);
		};

		const setSizeValue = (value: number) => {
			const copy = Utils.copy(fixture);
			copy.size.value = value;
			setFixture(copy);
			props.onChange(copy);
		};

		const setSizeMod = (value: '' | 'T' | 'S' | 'M' | 'L') => {
			const copy = Utils.copy(fixture);
			copy.size.mod = value;
			setFixture(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Role</HeaderText>
				<Select
					style={{ width: '100%' }}
					options={[ MonsterRoleType.NoRole, MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(type => ({ label: type, value: type, desc: MonsterLogic.getRoleTypeDescription(type) }))}
					optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
					value={fixture.role.type}
					onChange={setRoleType}
				/>
				<Select
					style={{ width: '100%' }}
					options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(type => ({ label: type, value: type }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={fixture.role.terrainType}
					onChange={setTerrainRoleType}
				/>
				<HeaderText>Base Stamina</HeaderText>
				<NumberSpin min={0} value={fixture.baseStamina} onChange={setBaseStamina} />
				<HeaderText>Size</HeaderText>
				<NumberSpin min={1} value={fixture.size.value} onChange={setSizeValue} />
				{
					fixture.size.value === 1 ?
						<Segmented<'' | 'T' | 'S' | 'M' | 'L'>
							name='sizemodtypes'
							block={true}
							options={[ 'T', 'S', 'M', 'L' ]}
							value={fixture.size.mod}
							onChange={setSizeMod}
						/>
						: null
				}
			</Space>
		);
	};

	const getFeaturesByLevelEditSection = () => {
		const addFeature = (level: number) => {
			const copy = Utils.copy(fixture);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features.push(FactoryLogic.feature.create({
						id: Utils.guid(),
						name: '',
						description: ''
					}));
				});
			setFixture(copy);
			props.onChange(copy);
		};

		const changeFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(fixture);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					if (index !== -1) {
						lvl.features[index] = feature;
					}
				});
			setFixture(copy);
			props.onChange(copy);
		};

		const moveFeature = (level: number, feature: Feature, direction: 'up' | 'down') => {
			const copy = Utils.copy(fixture);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					const index = lvl.features.findIndex(f => f.id === feature.id);
					lvl.features = Collections.move(lvl.features, index, direction);
				});
			setFixture(copy);
			props.onChange(copy);
		};

		const deleteFeature = (level: number, feature: Feature) => {
			const copy = Utils.copy(fixture);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => {
					lvl.features = lvl.features.filter(f => f.id !== feature.id);
				});
			setFixture(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					fixture.featuresByLevel.map(lvl => (
						<div key={lvl.level}>
							<HeaderText
								extra={
									<Button type='text' icon={<PlusOutlined />} onClick={() => addFeature(lvl.level)} />
								}
							>
								Level {lvl.level.toString()}
							</HeaderText>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									lvl.features.map(f => (
										<Expander
											key={f.id}
											title={f.name || 'Unnamed Feature'}
											tags={[ FeatureLogic.getFeatureTag(f) ]}
											extra={[
												<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'up'); }} />,
												<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveFeature(lvl.level, f, 'down'); }} />,
												<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteFeature(lvl.level, f); }} />
											]}
										>
											<FeatureEditPanel
												feature={f}
												sourcebooks={props.sourcebooks}
												options={props.options}
												onChange={feature => changeFeature(lvl.level, feature)}
											/>
										</Expander>
									))
								}
								{
									lvl.features.length === 0 ?
										<Empty />
										: null
								}
							</Space>
						</div>
					))
				}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='domain-edit-panel'>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Fixture',
							children: getNameAndDescriptionSection()
						},
						{
							key: '2',
							label: 'Details',
							children: getDetailsSection()
						},
						{
							key: '3',
							label: 'Levels',
							children: getFeaturesByLevelEditSection()
						}
					]}
				/>
			</div>
		</ErrorBoundary>
	);
};
