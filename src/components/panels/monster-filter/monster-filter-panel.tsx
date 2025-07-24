import { Flex, Input, Select, Slider, Space } from 'antd';
import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { Field } from '../../controls/field/field';
import { Monster } from '../../../models/monster';
import { MonsterFilter } from '../../../models/filter';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { MonsterRoleType } from '../../../enums/monster-role-type';
import { Toggle } from '../../controls/toggle/toggle';
import { Utils } from '../../../utils/utils';

import './monster-filter-panel.scss';

interface Props {
	monsterFilter: MonsterFilter;
	monsters: Monster[];
	includeNameFilter: boolean;
	onChange: (monsterFilter: MonsterFilter) => void;
}

export const MonsterFilterPanel = (props: Props) => {
	const setFilterName = (value: string) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.name = value;
		props.onChange(copy);
	};

	const setFilterKeywords = (value: string[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.keywords = value;
		props.onChange(copy);
	};

	const setFilterRoles = (value: MonsterRoleType[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.roles = value;
		props.onChange(copy);
	};

	const setFilterOrganizations = (value: MonsterOrganizationType[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.organizations = value;
		props.onChange(copy);
	};

	const setFilterSize = (value: number[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.size = value;
		props.onChange(copy);
	};

	const setFilterLevel = (value: number[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.level = value;
		props.onChange(copy);
	};

	const setFilterEV = (value: number[]) => {
		const copy = Utils.copy(props.monsterFilter);
		copy.ev = value;
		props.onChange(copy);
	};

	const keywords = Collections.distinct(props.monsters.flatMap(m => m.keywords), k => k).sort();
	const maxSize = Collections.max(props.monsters.map(m => m.size.value), x => x) || 1;
	const maxLevel = Collections.max(props.monsters.map(m => m.level), x => x) || 1;
	const maxEV = Collections.max(props.monsters.map(m => m.encounterValue), x => x) || 0;

	return (
		<ErrorBoundary>
			<div className='monster-filter-panel'>
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						props.includeNameFilter ?
							<Input
								placeholder='Name'
								allowClear={true}
								value={props.monsterFilter.name}
								onChange={e => setFilterName(e.target.value)}
							/>
							: null
					}
					<Select
						style={{ width: '100%' }}
						mode='multiple'
						allowClear={true}
						placeholder='Keywords'
						options={keywords.map(k => ({ label: k, value: k }))}
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
						value={props.monsterFilter.keywords}
						onChange={setFilterKeywords}
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
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.label
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						value={props.monsterFilter.organizations}
						onChange={setFilterOrganizations}
					/>
					<Flex gap={10}>
						<div style={{ flex: '1 1 0' }}>
							<Toggle label='By size' value={props.monsterFilter.size.length > 0} onChange={value => setFilterSize(value ? [ 1, 2 ] : [])} />
							{
								props.monsterFilter.size.length > 0 ?
									<>
										<Slider
											range={{ draggableTrack: true }}
											min={1}
											max={maxSize}
											value={props.monsterFilter.size}
											onChange={setFilterSize}
										/>
										<Field label='Size' value={`${Math.min(...props.monsterFilter.size)} to ${Math.max(...props.monsterFilter.size)}`} />
									</>
									: null
							}
						</div>
						<div style={{ flex: '1 1 0' }}>
							<Toggle label='By level' value={props.monsterFilter.level.length > 0} onChange={value => setFilterLevel(value ? [ 1, 2 ] : [])} />
							{
								props.monsterFilter.level.length > 0 ?
									<>
										<Slider
											range={{ draggableTrack: true }}
											min={1}
											max={maxLevel}
											value={props.monsterFilter.level}
											onChange={setFilterLevel}
										/>
										<Field label='Level' value={`${Math.min(...props.monsterFilter.level)} to ${Math.max(...props.monsterFilter.level)}`} />
									</>
									: null
							}
						</div>
						<div style={{ flex: '1 1 0' }}>
							<Toggle label='By EV' value={props.monsterFilter.ev.length > 0} onChange={value => setFilterEV(value ? [ 1, 10 ] : [])} />
							{
								props.monsterFilter.ev.length > 0 ?
									<>
										<Slider
											range={{ draggableTrack: true }}
											min={0}
											max={maxEV}
											value={props.monsterFilter.ev}
											onChange={setFilterEV}
										/>
										<Field label='EV' value={`${Math.min(...props.monsterFilter.ev)} to ${Math.max(...props.monsterFilter.ev)}`} />
									</>
									: null
							}
						</div>
					</Flex>
				</Space>
			</div>
		</ErrorBoundary>
	);
};
