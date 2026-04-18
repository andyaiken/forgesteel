import { Flex, Select, Slider, Space, Tag } from 'antd';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { Terrain } from '@/models/terrain';
import { TerrainFilter } from '@/models/filter';
import { TerrainRoleType } from '@/enums/terrain-role-type';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './terrain-filter-panel.scss';

interface Props {
	terrainFilter: TerrainFilter;
	terrain: Terrain[];
	onChange: (terrainFilter: TerrainFilter) => void;
}

export const TerrainFilterPanel = (props: Props) => {
	const [ showName, setShowName ] = useState<boolean>(true);
	const [ showRole, setShowRole ] = useState<boolean>(false);
	const [ showType, setShowType ] = useState<boolean>(false);
	const [ showLevel, setShowLevel ] = useState<boolean>(false);
	const [ showEV, setShowEV ] = useState<boolean>(false);

	const toggleLevel = (value: boolean) => {
		setFilterLevel(value ? [ 1, 2 ] : []);
		setShowLevel(value);
	};

	const toggleEV = (value: boolean) => {
		setFilterEV(value ? [ 1, 10 ] : []);
		setShowEV(value);
	};

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

	const maxLevel = Collections.max(props.terrain.map(t => t.level), x => x) || 1;
	const maxEV = Collections.max(props.terrain.map(t => t.encounterValue), x => x) || 0;

	return (
		<ErrorBoundary>
			<div className='terrain-filter-panel'>
				<Space orientation='vertical' style={{ width: '100%' }}>
					<Flex align='center' justify='center' gap={5}>
						<Tag.CheckableTag checked={showName} onChange={setShowName}>Name</Tag.CheckableTag>
						<Tag.CheckableTag checked={showRole} onChange={setShowRole}>Role</Tag.CheckableTag>
						<Tag.CheckableTag checked={showType} onChange={setShowType}>Terrain Type</Tag.CheckableTag>
						<Tag.CheckableTag checked={showLevel} onChange={toggleLevel}>Level</Tag.CheckableTag>
						<Tag.CheckableTag checked={showEV} onChange={toggleEV}>EV</Tag.CheckableTag>
					</Flex>
					{
						showName ?
							<TextInput
								placeholder='Name'
								allowClear={true}
								value={props.terrainFilter.name}
								onChange={setFilterName}
							/>
							: null
					}
					{
						showRole ?
							<Select
								style={{ width: '100%' }}
								mode='multiple'
								allowClear={true}
								placeholder='Role'
								options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(r => ({ label: r, value: r }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={props.terrainFilter.roles}
								onChange={setFilterRoles}
							/>
							: null
					}
					{
						showType ?
							<Select
								style={{ width: '100%' }}
								mode='multiple'
								allowClear={true}
								placeholder='Terrain types'
								options={[ TerrainRoleType.Fortification, TerrainRoleType.Hazard, TerrainRoleType.Relic, TerrainRoleType.SiegeEngine, TerrainRoleType.Trap, TerrainRoleType.Trigger ].map(r => ({ label: r, value: r }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								showSearch={true}
								value={props.terrainFilter.terrainRoles}
								onChange={setFilterTerrainRoles}
							/>
							: null
					}
					{
						showLevel && (props.terrainFilter.level.length > 0) ?
							<>
								<Slider
									range={{ draggableTrack: true }}
									min={1}
									max={maxLevel}
									value={props.terrainFilter.level}
									onChange={setFilterLevel}
								/>
								<Field label='Level' value={`${Math.min(...props.terrainFilter.level)} to ${Math.max(...props.terrainFilter.level)}`} />
							</>
							: null
					}
					{
						showEV && (props.terrainFilter.ev.length > 0) ?
							<>
								<Slider
									range={{ draggableTrack: true }}
									min={0}
									max={maxEV}
									value={props.terrainFilter.ev}
									onChange={setFilterEV}
								/>
								<Field label='EV' value={`${Math.min(...props.terrainFilter.ev)} to ${Math.max(...props.terrainFilter.ev)}`} />
							</>
							: null
					}
				</Space>
			</div>
		</ErrorBoundary>
	);
};
