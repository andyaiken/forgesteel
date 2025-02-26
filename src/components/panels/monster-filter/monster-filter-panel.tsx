import { Input, Select, Slider, Space } from 'antd';
import { Field } from '../../controls/field/field';
import { MonsterFilter } from '../../../models/monster-filter';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';

import './monster-filter-panel.scss';

interface Props {
	monsterFilter: MonsterFilter;
	onChange: (monsterFilter: MonsterFilter) => void;
}

export const MonsterFilterPanel = (props: Props) => {
	const setFilterName = (value: string) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.name = value;
		props.onChange(copy);
	};

	const setFilterRoles = (value: MonsterRoleType[]) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.roles = value;
		props.onChange(copy);
	};

	const setFilterOrganizations = (value: MonsterOrganizationType[]) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.organizations = value;
		props.onChange(copy);
	};

	const setFilterSize = (value: number[]) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.size = value;
		props.onChange(copy);
	};

	const setFilterLevel = (value: number[]) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.level = value;
		props.onChange(copy);
	};

	const setFilterEV = (value: number[]) => {
		const copy = JSON.parse(JSON.stringify(props.monsterFilter)) as MonsterFilter;
		copy.ev = value;
		props.onChange(copy);
	};

	return (
		<div className='monster-filter-panel'>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Input
					placeholder='Name, keywords'
					allowClear={true}
					value={props.monsterFilter.name}
					onChange={e => setFilterName(e.target.value)}
				/>
				<Select
					style={{ width: '100%' }}
					mode='multiple'
					allowClear={true}
					placeholder='Role'
					options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Mount, MonsterRoleType.Support ].map(r => ({ label: r, value: r }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={props.monsterFilter.roles}
					onChange={setFilterRoles}
				/>
				<Select
					style={{ width: '100%' }}
					mode='multiple'
					allowClear={true}
					placeholder='Organization'
					options={[ MonsterOrganizationType.Minion, MonsterOrganizationType.Band, MonsterOrganizationType.Platoon, MonsterOrganizationType.Troop, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo, MonsterOrganizationType.Retainer ].map(r => ({ label: r, value: r }))}
					optionRender={option => <div className='ds-text'>{option.data.label}</div>}
					value={props.monsterFilter.organizations}
					onChange={setFilterOrganizations}
				/>
				<div>
					<Slider
						range={{ draggableTrack: true }}
						min={1}
						max={10}
						value={props.monsterFilter.size}
						onChange={setFilterSize}
					/>
					<Field label='Size' value={`${Math.min(...props.monsterFilter.size)} to ${Math.max(...props.monsterFilter.size)}`} />
				</div>
				<div>
					<Slider
						range={{ draggableTrack: true }}
						min={1}
						max={10}
						value={props.monsterFilter.level}
						onChange={setFilterLevel}
					/>
					<Field label='Level' value={`${Math.min(...props.monsterFilter.level)} to ${Math.max(...props.monsterFilter.level)}`} />
				</div>
				<div>
					<Slider
						range={{ draggableTrack: true }}
						min={0}
						max={120}
						value={props.monsterFilter.ev}
						onChange={setFilterEV}
					/>
					<Field label='EV' value={`${Math.min(...props.monsterFilter.ev)} to ${Math.max(...props.monsterFilter.ev)}`} />
				</div>
			</Space>
		</div>
	);
};
