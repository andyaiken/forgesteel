import { Segmented, Select, Space, Tabs } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeatureListEditPanel } from '@/components/panels/edit/feature-list-edit/feature-list-edit-panel';
import { Field } from '@/components/controls/field/field';
import { Fixture } from '@/models/fixture';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { NameDescEditPanel } from '@/components/panels/edit/name-desc-edit/name-desc-edit-panel';
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
		const onChange = (name: string, desc: string) => {
			const copy = Utils.copy(fixture);
			copy.name = name;
			copy.description = desc;
			setFixture(copy);
			props.onChange(copy);
		};

		return (
			<NameDescEditPanel
				element={fixture}
				onChange={onChange}
			/>
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
		const onChange = (level: number, features: Feature[]) => {
			const copy = Utils.copy(fixture);
			copy.featuresByLevel
				.filter(lvl => lvl.level === level)
				.forEach(lvl => lvl.features = Utils.copy(features));
			setFixture(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					fixture.featuresByLevel.map(lvl => (
						<FeatureListEditPanel
							key={lvl.level}
							title={`Level ${lvl.level}`}
							features={lvl.features}
							sourcebooks={props.sourcebooks}
							options={props.options}
							onChange={features => onChange(lvl.level, features)}
						/>
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
