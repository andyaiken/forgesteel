import { Flex, Select, Slider, Space, Tag } from 'antd';
import { Collections } from '@/utils/collections';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Field } from '@/components/controls/field/field';
import { Monster } from '@/models/monster';
import { MonsterFilter } from '@/models/filter';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Utils } from '@/utils/utils';
import { useState } from 'react';

import './monster-filter-panel.scss';

interface Props {
	monsterFilter: MonsterFilter;
	monsters: Monster[];
	includeNameFilter: boolean;
	includeOrgFilter: boolean;
	includeEVFilter: boolean;
	onChange: (monsterFilter: MonsterFilter) => void;
}

export const MonsterFilterPanel = (props: Props) => {
	const [ showName, setShowName ] = useState<boolean>(true);
	const [ showKeywords, setShowKeywords ] = useState<boolean>(false);
	const [ showRole, setShowRole ] = useState<boolean>(false);
	const [ showOrg, setShowOrg ] = useState<boolean>(false);
	const [ showSize, setShowSize ] = useState<boolean>(false);
	const [ showLevel, setShowLevel ] = useState<boolean>(false);
	const [ showEV, setShowEV ] = useState<boolean>(false);

	const toggleName = (value: boolean) => {
		setFilterName('');
		setShowName(value);
	};

	const toggleKeywords = (value: boolean) => {
		setFilterKeywords([]);
		setShowKeywords(value);
	};

	const toggleRoles = (value: boolean) => {
		setFilterRoles(value ? [ MonsterRoleType.Ambusher ] : []);
		setShowRole(value);
	};

	const toggleOrg = (value: boolean) => {
		setFilterOrganizations(value ? [ MonsterOrganizationType.Platoon ] : []);
		setShowOrg(value);
	};

	const toggleSize = (value: boolean) => {
		setFilterSize(value ? [ 1, 2 ] : []);
		setShowSize(value);
	};

	const toggleLevel = (value: boolean) => {
		setFilterLevel(value ? [ 1, 2 ] : []);
		setShowLevel(value);
	};

	const toggleEV = (value: boolean) => {
		setFilterEV(value ? [ 1, 10 ] : []);
		setShowEV(value);
	};

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
				<Space orientation='vertical' style={{ width: '100%' }}>
					<Flex align='center' justify='center' gap={5} wrap={true}>
						{props.includeNameFilter ? <Tag.CheckableTag checked={showName} onChange={toggleName}>Name</Tag.CheckableTag> : null}
						<Tag.CheckableTag checked={showKeywords} onChange={toggleKeywords}>Keywords</Tag.CheckableTag>
						<Tag.CheckableTag checked={showRole} onChange={toggleRoles}>Role</Tag.CheckableTag>
						{props.includeOrgFilter ? <Tag.CheckableTag checked={showOrg} onChange={toggleOrg}>Organization</Tag.CheckableTag> : null}
						<Tag.CheckableTag checked={showSize} onChange={toggleSize}>Size</Tag.CheckableTag>
						<Tag.CheckableTag checked={showLevel} onChange={toggleLevel}>Level</Tag.CheckableTag>
						{props.includeEVFilter ? <Tag.CheckableTag checked={showEV} onChange={toggleEV}>EV</Tag.CheckableTag> : null}
					</Flex>
					{
						showName && props.includeNameFilter ?
							<TextInput
								placeholder='Name'
								allowClear={true}
								value={props.monsterFilter.name}
								onChange={setFilterName}
							/>
							: null
					}
					{
						showKeywords ?
							<Select
								style={{ width: '100%' }}
								mode='tags'
								allowClear={true}
								placeholder='Keywords'
								options={keywords.map(k => ({ label: k, value: k }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={props.monsterFilter.keywords}
								onChange={setFilterKeywords}
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
								value={props.monsterFilter.roles}
								onChange={setFilterRoles}
							/>
							: null
					}
					{
						showOrg ?
							<Select
								style={{ width: '100%' }}
								mode='multiple'
								allowClear={true}
								placeholder='Organization'
								options={[ MonsterOrganizationType.Minion, MonsterOrganizationType.Horde, MonsterOrganizationType.Platoon, MonsterOrganizationType.Elite, MonsterOrganizationType.Leader, MonsterOrganizationType.Solo, MonsterOrganizationType.Retainer ].map(r => ({ label: r, value: r }))}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={props.monsterFilter.organizations}
								onChange={setFilterOrganizations}
							/>
							: null
					}
					{
						showSize && (props.monsterFilter.size.length > 0) ?
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
					{
						showLevel && (props.monsterFilter.level.length > 0) ?
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
					{
						showEV && (props.monsterFilter.ev.length > 0) ?
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
				</Space>
			</div>
		</ErrorBoundary>
	);
};
