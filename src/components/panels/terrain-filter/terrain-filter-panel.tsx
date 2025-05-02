import { Input, Select, Slider, Space } from 'antd';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { TerrainFilter } from '../../../models/filter';
import { TerrainRoleType } from '../../../enums/terrain-role-type';
import { Utils } from '../../../utils/utils';

import './terrain-filter-panel.scss';

interface Props {
	terrainFilter: TerrainFilter;
	onChange: (terrainFilter: TerrainFilter) => void;
}

export const TerrainFilterPanel = (props: Props) => {
	const setFilterName = (value: string) => {
		const copy = Utils.copy(props.terrainFilter);
		copy.name = value;
		props.onChange(copy);
	};

	const setFilterRoles = (value: MonsterRoleType[]) => {
		const copy = Utils.copy(props.terrainFilter);
		copy.roles = value;
		props.onChange(copy);
	};

	const setFilterTerrainRoles = (value: TerrainRoleType[]) => {
		const copy = Utils.copy(props.terrainFilter);
		copy.terrainRoles = value;
		props.onChange(copy);
	};

	const setFilterLevel = (value: number[]) => {
		const copy = Utils.copy(props.terrainFilter);
		copy.level = value;
		props.onChange(copy);
	};

	const setFilterEV = (value: number[]) => {
		const copy = Utils.copy(props.terrainFilter);
		copy.ev = value;
		props.onChange(copy);
	};

	return (
		<ErrorBoundary>
			<div className='terrain-filter-panel'>
				<Space direction='vertical' style={{ width: '100%' }}>
					<Input
						placeholder='Name, keywords'
						allowClear={true}
						value={props.terrainFilter.name}
						onChange={e => setFilterName(e.target.value)}
					/>
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						allowClear={true}
						placeholder='Role'
						options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(r => ({ label: r, value: r }))}
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
						value={props.terrainFilter.roles}
						onChange={setFilterRoles}
					/>
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						allowClear={true}
						placeholder='Terrain roles'
						options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(r => ({ label: r, value: r }))}
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
						value={props.terrainFilter.terrainRoles}
						onChange={setFilterTerrainRoles}
					/>
					<div>
						<Slider
							range={{ draggableTrack: true }}
							min={1}
							max={10}
							value={props.terrainFilter.level}
							onChange={setFilterLevel}
						/>
						<Field label='Level' value={`${Math.min(...props.terrainFilter.level)} to ${Math.max(...props.terrainFilter.level)}`} />
					</div>
					<div>
						<Slider
							range={{ draggableTrack: true }}
							min={0}
							max={120}
							value={props.terrainFilter.ev}
							onChange={setFilterEV}
						/>
						<Field label='EV' value={`${Math.min(...props.terrainFilter.ev)} to ${Math.max(...props.terrainFilter.ev)}`} />
					</div>
				</Space>
			</div>
		</ErrorBoundary>
	);
};
