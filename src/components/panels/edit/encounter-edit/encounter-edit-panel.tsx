import { Alert, Button, Divider, Flex, Input, Popover, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, EditFilled, EditOutlined, FilterFilled, FilterOutlined, InfoCircleOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup, EncounterObjective, TerrainSlot } from '../../../../models/encounter';
import { MonsterFilter, TerrainFilter } from '../../../../models/filter';
import { MonsterInfo, TerrainInfo } from '../../token/token';
import { ReactNode, useState } from 'react';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Element } from '../../../../models/element';
import { ElementEditPanel } from '../element-edit/element-edit-panel';
import { Empty } from '../../../controls/empty/empty';
import { EncounterDifficultyLogic } from '../../../../logic/encounter-difficulty-logic';
import { EncounterDifficultyPanel } from '../../encounter-difficulty/encounter-difficulty-panel';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectiveData } from '../../../../data/encounter-objective-data';
import { EncounterSlot } from '../../../../models/encounter-slot';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { Monster } from '../../../../models/monster';
import { MonsterFilterPanel } from '../../monster-filter/monster-filter-panel';
import { MonsterGroup } from '../../../../models/monster-group';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterPanel } from '../../elements/monster-panel/monster-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Pill } from '../../../controls/pill/pill';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Terrain } from '../../../../models/terrain';
import { TerrainFilterPanel } from '../../terrain-filter/terrain-filter-panel';
import { TerrainLogic } from '../../../../logic/terrain-logic';
import { TerrainPanel } from '../../elements/terrain-panel/terrain-panel';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';

import './encounter-edit-panel.scss';

interface Props {
	encounter: Encounter;
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (encounter: Encounter) => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
}

export const EncounterEditPanel = (props: Props) => {
	const [ encounter, setEncounter ] = useState<Encounter>(props.encounter);
	const [ filterVisible, setFilterVisible ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ terrainFilter, setTerrainFilter ] = useState<TerrainFilter>(FactoryLogic.createTerrainFilter());

	try {
		const getNameAndDescriptionSection = () => {
			const setName = (value: string) => {
				const copy = Utils.copy(encounter);
				copy.name = value;
				setEncounter(copy);
				props.onChange(copy);
			};

			const setDescription = (value: string) => {
				const copy = Utils.copy(encounter);
				copy.description = value;
				setEncounter(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Name</HeaderText>
					<Input
						status={encounter.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
						value={encounter.name}
						onChange={e => setName(e.target.value)}
					/>
					<HeaderText>Description</HeaderText>
					<MultiLine value={encounter.description} onChange={setDescription} />
				</Space>
			);
		};

		const getMonstersSection = () => {
			const setName = (group: EncounterGroup, value: string) => {
				const copy = Utils.copy(encounter);
				copy.groups.filter(g => g.id === group.id).forEach(g => g.name = value);
				setEncounter(copy);
				props.onChange(copy);
			};

			const deleteGroup = (group: EncounterGroup) => {
				const copy = Utils.copy(encounter);
				copy.groups = copy.groups.filter(g => g.id !== group.id);
				setEncounter(copy);
				props.onChange(copy);
			};

			const getSlot = (slot: EncounterSlot, group: EncounterGroup) => {
				const setSlotCount = (groupID: string, slotID: string, value: number) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.count = value;

							if (slot.count === 0) {
								group.slots = group.slots.filter(s => s.id !== slotID);
							}
						}

						if (group.slots.length === 0) {
							copy.groups = copy.groups.filter(g => g.id !== groupID);
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const moveSlot = (slotID: string, fromGroupID: string, toGroupID: string, remove: boolean) => {
					const copy = Utils.copy(encounter);
					const fromGroup = copy.groups.find(g => g.id === fromGroupID);
					let toGroup = copy.groups.find(g => g.id === toGroupID);
					if (!toGroup) {
						toGroup = FactoryLogic.createEncounterGroup();
						copy.groups.push(toGroup);
					}
					if (fromGroup && toGroup) {
						const slot = fromGroup.slots.find(s => s.id === slotID);
						if (slot) {
							if (remove) {
								fromGroup.slots = fromGroup.slots.filter(s => s.id !== slotID);
							}
							toGroup.slots.push(slot);
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const setSlotAddOnIDs = (groupID: string, slotID: string, value: string[]) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.customization.addOnIDs = value;
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const setSlotLevelAdjustment = (groupID: string, slotID: string, value: number) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.customization.levelAdjustment = value;
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const setSlotConvertToSolo = (groupID: string, slotID: string, value: boolean) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.customization.convertToSolo = value;
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const addItem = (groupID: string, slotID: string, value: string) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.customization.itemIDs.push(value);
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const removeItem = (groupID: string, slotID: string, value: string) => {
					const copy = Utils.copy(encounter);
					const group = copy.groups.find(g => g.id === groupID);
					if (group) {
						const slot = group.slots.find(s => s.id === slotID);
						if (slot) {
							slot.customization.itemIDs = slot.customization.itemIDs.filter(id => id !== value);
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				return (
					<MonsterSlotPanel
						key={slot.id}
						slot={slot}
						group={group}
						encounter={encounter}
						sourcebooks={props.sourcebooks}
						options={props.options}
						showMonster={props.showMonster}
						setSlotCount={setSlotCount}
						moveSlot={moveSlot}
						setSlotAddOnIDs={setSlotAddOnIDs}
						setSlotLevelAdjustment={setSlotLevelAdjustment}
						setSlotConvertToSolo={setSlotConvertToSolo}
						addItem={addItem}
						removeItem={removeItem}
					/>
				);
			};

			const warnings = [];
			const statblocks = Collections.distinct(encounter.groups.flatMap(g => g.slots).map(s => s.monsterID), s => s).length;
			if (statblocks > 6) {
				warnings.push(
					<Alert
						key='too-many-statblocks'
						type='warning'
						showIcon={true}
						message={`You shouldn't generally have more than 6 different types of monster in an encounter (this encounter has ${statblocks}).`}
					/>
				);
			}

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{warnings}
					{
						encounter.groups.map((group, n) => (
							<GroupPanel
								key={group.id}
								group={group}
								index={n}
								sourcebooks={props.sourcebooks}
								options={props.options}
								setName={setName}
								deleteGroup={deleteGroup}
								getSlot={getSlot}
							/>
						))
					}
					{
						encounter.groups.length === 0 ?
							<div className='ds-text dimmed-text centered-text'>None</div>
							: null
					}
				</Space>
			);
		};

		const getTerrainSection = () => {
			const getTerrain = (slot: TerrainSlot) => {
				const setTerrainCount = (id: string, value: number) => {
					const copy = Utils.copy(encounter);
					const slot = copy.terrain.find(t => t.id === id);
					if (slot) {
						slot.count = value;

						if (slot.count === 0) {
							copy.terrain = copy.terrain.filter(t => t.id !== id);
						}
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				const setTerrainUpgradeIDs = (id: string, value: string[]) => {
					const copy = Utils.copy(encounter);
					const slot = copy.terrain.find(t => t.id === id);
					if (slot) {
						slot.upgradeIDs = value;
					}
					setEncounter(copy);
					props.onChange(copy);
				};

				return (
					<TerrainSlotPanel
						slot={slot}
						sourcebooks={props.sourcebooks}
						showTerrain={props.showTerrain}
						setTerrainCount={setTerrainCount}
						setTerrainUpgradeIDs={setTerrainUpgradeIDs}
					/>
				);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						encounter.terrain.map(slot => (
							<div key={`${slot.terrainID}-container`} className='terrain-container-row'>
								{getTerrain(slot)}
							</div>
						))
					}
					{
						encounter.terrain.length === 0 ?
							<div className='ds-text dimmed-text centered-text'>None</div>
							: null
					}
				</Space>
			);
		};

		const getObjectiveSection = () => {
			const setObjective = (value: EncounterObjective | null) => {
				const copy = Utils.copy(encounter);
				copy.objective = Utils.copy(value);
				setEncounter(copy);
				props.onChange(copy);
			};

			const setObjectiveName = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.name = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			const setObjectiveDescription = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.description = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			const setObjectiveDifficultyModifier = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.difficultyModifier = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			const setObjectiveSuccessCondition = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.successCondition = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			const setObjectiveFailureCondition = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.failureCondition = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			const setObjectiveVictories = (value: string) => {
				const copy = Utils.copy(encounter);
				if (copy.objective) {
					copy.objective.victories = value;
					setEncounter(copy);
					props.onChange(copy);
				}
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Flex align='center' justify='space-between' gap={10}>
						<Toggle label='Specify an encounter objective' value={!!encounter.objective} onChange={value => setObjective(value ? FactoryLogic.createEncounterObjective() : null)} />
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
									{
										[
											EncounterObjectiveData.diminishNumbers,
											EncounterObjectiveData.defeatFoe,
											EncounterObjectiveData.getThing,
											EncounterObjectiveData.destroyThing,
											EncounterObjectiveData.saveAnother,
											EncounterObjectiveData.escort,
											EncounterObjectiveData.holdThemOff,
											EncounterObjectiveData.assaultDefenses,
											EncounterObjectiveData.stopAction,
											EncounterObjectiveData.completeAction
										].map(o => (
											<Button key={o.id} block={true} onClick={() => setObjective(o)}>{o.name}</Button>
										))
									}
								</div>
							)}
						>
							<Button>
								Common Objectives
								<DownOutlined />
							</Button>
						</Popover>
					</Flex>
					{
						encounter.objective ?
							<>
								<HeaderText>Name</HeaderText>
								<Input
									placeholder='Name'
									allowClear={true}
									value={encounter.objective.name}
									onChange={e => setObjectiveName(e.target.value)}
								/>
								<HeaderText>Description</HeaderText>
								<MultiLine value={encounter.objective.description} onChange={setObjectiveDescription} />
								<HeaderText>Difficulty Modifier</HeaderText>
								<MultiLine value={encounter.objective.difficultyModifier} onChange={setObjectiveDifficultyModifier} />
								<HeaderText>Success Condition</HeaderText>
								<MultiLine value={encounter.objective.successCondition} onChange={setObjectiveSuccessCondition} />
								<HeaderText>Failure Condition</HeaderText>
								<MultiLine value={encounter.objective.failureCondition} onChange={setObjectiveFailureCondition} />
								<HeaderText>Victories</HeaderText>
								<MultiLine value={encounter.objective.victories} onChange={setObjectiveVictories} />
							</>
							: null
					}
				</Space>
			);
		};

		const getNotesSection = () => {
			const addNote = () => {
				const copy = Utils.copy(encounter);
				copy.notes.push({
					id: Utils.guid(),
					name: '',
					description: ''
				});
				setEncounter(copy);
				props.onChange(copy);
			};

			const changeNote = (notes: Element) => {
				const copy = Utils.copy(encounter);
				const index = copy.notes.findIndex(i => i.id === notes.id);
				if (index !== -1) {
					copy.notes[index] = notes;
				}
				setEncounter(copy);
				props.onChange(copy);
			};

			const moveNote = (notes: Element, direction: 'up' | 'down') => {
				const copy = Utils.copy(encounter);
				const index = copy.notes.findIndex(i => i.id === notes.id);
				copy.notes = Collections.move(copy.notes, index, direction);
				setEncounter(copy);
				props.onChange(copy);
			};

			const deleteNote = (notes: Element) => {
				const copy = Utils.copy(encounter);
				copy.notes = copy.notes.filter(i => i.id !== notes.id);
				setEncounter(copy);
				props.onChange(copy);
			};

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText
						extra={
							<Button type='text' icon={<PlusOutlined />} onClick={addNote} />
						}
					>
						Notes
					</HeaderText>
					{
						encounter.notes.map(i => (
							<Expander
								key={i.id}
								title={i.name || 'Unnamed Note'}
								extra={[
									<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveNote(i, 'up'); }} />,
									<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveNote(i, 'down'); }} />,
									<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteNote(i); }} />
								]}
							>
								<ElementEditPanel
									element={i}
									onChange={changeNote}
								/>
							</Expander>
						))
					}
					{
						encounter.notes.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getMonsterListSection = () => {
			const setMonsterFilterName = (name: string) => {
				const copy = Utils.copy(monsterFilter);
				copy.name = name;
				setMonsterFilter(copy);
			};

			const addMonster = (monster: Monster, encounterGroupID: string | null) => {
				const copy = Utils.copy(encounter);

				if (encounterGroupID) {
					const group = copy.groups.find(g => g.id === encounterGroupID);
					if (group) {
						const slot = group.slots.find(s => s.monsterID === monster.id);
						if (slot) {
							slot.count += 1;
						} else {
							group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
						}
					};
				} else {
					const group = FactoryLogic.createEncounterGroup();
					group.slots.push(FactoryLogic.createEncounterSlot(monster.id));
					copy.groups.push(group);
				}

				setEncounter(copy);
				props.onChange(copy);
			};

			const groups = Collections.sort(props.sourcebooks.flatMap(sb => sb.monsterGroups).filter(g => g.monsters.some(m => (m.role.organization !== MonsterOrganizationType.Retainer) && MonsterLogic.matches(m, monsterFilter))), g => g.name);

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Input
						placeholder='Search'
						allowClear={true}
						value={monsterFilter.name}
						onChange={e => setMonsterFilterName(e.target.value)}
					/>
					{
						filterVisible ?
							<MonsterFilterPanel
								monsterFilter={monsterFilter}
								monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
								includeNameFilter={false}
								onChange={setMonsterFilter}
							/>
							: null
					}
					{
						groups.map(g => (
							<Expander key={g.id} title={g.name}>
								<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
									{
										g.monsters.filter(m => m.role.organization !== MonsterOrganizationType.Retainer).filter(m => MonsterLogic.matches(m, monsterFilter)).map(m => {
											const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id) as MonsterGroup;

											let addBtn: ReactNode;
											if (encounter.groups.length === 0) {
												addBtn = (
													<Button icon={<PlusOutlined />} onClick={() => addMonster(m, null)}>Add</Button>
												);
											} else {
												const groups = encounter.groups.map((group, n) => ({
													key: group.id,
													label: <div className='ds-text centered-text'>Group {n + 1}</div>
												}));
												groups.push({
													key: '',
													label: <div className='ds-text centered-text'>New Group</div>
												});
												addBtn = (
													<DropdownButton
														label='Add'
														items={groups}
														onClick={groupID => addMonster(m, groupID !== '' ? groupID : null)}
													/>
												);
											}

											return (
												<div key={m.id} className='monster-row'>
													<MonsterInfo monster={m} />
													<Flex gap={10}>
														<Button onClick={() => props.showMonster(m, monsterGroup)}>Details</Button>
														{addBtn}
													</Flex>
												</div>
											);
										})
									}
								</Space>
							</Expander>
						))
					}
					{
						groups.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getTerrainListSection = () => {
			const setTerrainFilterName = (name: string) => {
				const copy = Utils.copy(terrainFilter);
				copy.name = name;
				setTerrainFilter(copy);
			};

			const addTerrain = (terrain: Terrain) => {
				const copy = Utils.copy(encounter);

				const data = copy.terrain.find(t => t.terrainID === terrain.id);
				if (data) {
					data.count += 1;
				} else {
					copy.terrain.push({
						id: Utils.guid(),
						terrainID: terrain.id,
						upgradeIDs: [],
						count: 1,
						terrain: []
					});
				}

				setEncounter(copy);
				props.onChange(copy);
			};

			const allTerrains = SourcebookLogic.getTerrains(props.sourcebooks);
			const terrains = Collections.sort(allTerrains.filter(m => TerrainLogic.matches(m, terrainFilter)), t => t.name);

			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<Input
						placeholder='Search'
						allowClear={true}
						value={terrainFilter.name}
						onChange={e => setTerrainFilterName(e.target.value)}
					/>
					{
						filterVisible ?
							<TerrainFilterPanel
								terrainFilter={terrainFilter}
								terrain={allTerrains}
								includeNameFilter={false}
								onChange={setTerrainFilter}
							/>
							: null
					}
					{
						terrains.map(t => {
							return (
								<div key={t.id} className='terrain-row'>
									<TerrainInfo terrain={t} />
									<Flex gap={10}>
										<Button onClick={() => props.showTerrain(t, [])}>Details</Button>
										<Button icon={<PlusOutlined />} onClick={() => addTerrain(t)}>Add</Button>
									</Flex>
								</div>
							);
						})
					}
					{
						terrains.length === 0 ?
							<Empty />
							: null
					}
				</Space>
			);
		};

		const getDifficultySection = () => {
			const strength = EncounterDifficultyLogic.getStrength(encounter, props.sourcebooks);
			const difficulty = EncounterDifficultyLogic.getDifficulty(strength, props.options, props.heroes);

			return (
				<Expander title='Difficulty' tags={[ difficulty ]}>
					<EncounterDifficultyPanel
						encounter={encounter}
						sourcebooks={props.sourcebooks}
						heroes={props.heroes}
						options={props.options}
					/>
				</Expander>
			);
		};

		return (
			<ErrorBoundary>
				<div className='encounter-edit-panel'>
					<div className='encounter-workspace-column'>
						<Tabs
							items={[
								{
									key: '1',
									label: 'Encounter',
									children: getNameAndDescriptionSection()
								},
								{
									key: '2',
									label: 'Monsters',
									children: getMonstersSection()
								},
								{
									key: '3',
									label: 'Terrain',
									children: getTerrainSection()
								},
								{
									key: '4',
									label: 'Objective',
									children: getObjectiveSection()
								},
								{
									key: '5',
									label: 'Notes',
									children: getNotesSection()
								}
							]}
						/>
					</div>
					<div className='encounter-list-column'>
						{getDifficultySection()}
						<Tabs
							items={[
								{
									key: '1',
									label: 'Monsters',
									children: getMonsterListSection()
								},
								{
									key: '2',
									label: 'Terrain',
									children: getTerrainListSection()
								}
							]}
							tabBarExtraContent={
								<Button
									className='filter-button'
									type='text'
									icon={filterVisible ? <FilterFilled /> : <FilterOutlined />}
									onClick={() => setFilterVisible(!filterVisible)}
								/>
							}
						/>

					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface GroupPanelProps {
	group: EncounterGroup;
	index: number;
	sourcebooks: Sourcebook[];
	options: Options;
	setName: (group: EncounterGroup, value: string) => void;
	deleteGroup: (group: EncounterGroup) => void;
	getSlot: (slot: EncounterSlot, group: EncounterGroup) => ReactNode;
}

const GroupPanel = (props: GroupPanelProps) => {
	const [ editing, setEditing ] = useState<boolean>(false);

	return (
		<div className='group-row'>
			<HeaderText
				extra={
					<Flex>
						<Button key='edit' type='text' icon={editing ? <EditFilled /> : <EditOutlined />} onClick={() => setEditing(!editing)} />
						<DangerButton key='delete' mode='clear' label='Delete Group' onConfirm={() => props.deleteGroup(props.group)} />
					</Flex>
				}
			>
				{
					editing ?
						<Input
							placeholder='Group name'
							value={props.group.name}
							allowClear={true}
							onChange={e => props.setName(props.group, e.target.value)}
						/>
						:
						(props.group.name || `Group ${props.index + 1}`)
				}
			</HeaderText>
			{props.group.slots.map(slot => props.getSlot(slot, props.group))}
			{
				props.group.slots.length === 0 ?
					<Empty />
					: null
			}
			{
				EncounterDifficultyLogic.getGroupStrength(props.group, props.sourcebooks) < EncounterDifficultyLogic.getHeroValue(props.options.heroLevel) ?
					<Alert
						type='warning'
						showIcon={true}
						message='This group is probably not strong enough; you might want to add more monsters'
					/>
					: null
			}
			{
				EncounterDifficultyLogic.getGroupStrength(props.group, props.sourcebooks) > (EncounterDifficultyLogic.getHeroValue(props.options.heroLevel) * 2) ?
					<Alert
						type='warning'
						showIcon={true}
						message='This group is probably too strong; you might want to split it into smaller groups'
					/>
					: null
			}
		</div>
	);
};

interface MonsterSlotPanelProps {
	slot: EncounterSlot;
	group: EncounterGroup;
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	options: Options;
	showMonster: (monster: Monster, group: MonsterGroup) => void;
	setSlotCount: (groupID: string, slotID: string, value: number) => void;
	moveSlot: (slotID: string, fromGroupID: string, toGroupID: string, remove: boolean) => void;
	setSlotAddOnIDs: (groupID: string, slotID: string, ids: string[]) => void;
	setSlotLevelAdjustment: (groupID: string, slotID: string, value: number) => void;
	setSlotConvertToSolo: (groupID: string, slotID: string, value: boolean) => void;
	addItem: (groupID: string, slotID: string, itemID: string) => void;
	removeItem: (groupID: string, slotID: string, itemID: string) => void;
}

const MonsterSlotPanel = (props: MonsterSlotPanelProps) => {
	const [ showCustomize, setShowCustomize ] = useState<boolean>(false);

	const originalMonster = SourcebookLogic.getMonster(props.sourcebooks, props.slot.monsterID);
	const monster = EncounterLogic.getCustomizedMonster(props.slot.monsterID, props.slot.customization, props.sourcebooks);
	const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, props.slot.monsterID);

	if (originalMonster && monster && monsterGroup) {
		const getCustomizePanel = () => {
			return (
				<Space direction='vertical' style={{ width: '100%' }}>
					<HeaderText>Customize</HeaderText>
					<NumberSpin label='Adjust level' value={props.slot.customization.levelAdjustment} onChange={value => props.setSlotLevelAdjustment(props.group.id, props.slot.id, value)} />
					{
						monsterGroup.addOns.length > 0 ?
							<Select
								style={{ width: '100%' }}
								placeholder='Select'
								mode='multiple'
								options={Collections.sort(monsterGroup.addOns, a => a.name).map(a => ({ value: a.id, label: a.name, feature: a, cost: a.data.cost }))}
								optionRender={option => <FeaturePanel feature={option.data.feature} options={props.options} cost={option.data.cost} mode={PanelMode.Full} />}
								showSearch={true}
								filterOption={(input, option) => {
									const strings = option ?
										[
											option.label
										]
										: [];
									return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
								}}
								value={props.slot.customization.addOnIDs}
								onChange={ids => props.setSlotAddOnIDs(props.group.id, props.slot.id, ids)}
							/>
							: null
					}
					{
						(originalMonster.role.organization === MonsterOrganizationType.Elite) || (originalMonster.role.organization === MonsterOrganizationType.Leader) ?
							<Toggle label='Turn this monster into a Solo' value={props.slot.customization.convertToSolo} onChange={value => props.setSlotConvertToSolo(props.group.id, props.slot.id, value)} />
							: null
					}
					{
						props.slot.customization.itemIDs.map(itemID => {
							const item = SourcebookLogic.getItems(props.sourcebooks).find(i => i.id === itemID);
							if (item) {
								return (
									<Flex align='center'>
										<Field label={item.name} value={item.description} />
										<DangerButton mode='icon' onConfirm={() => props.removeItem(props.group.id, props.slot.id, itemID)} />
									</Flex>
								);
							}

							return null;
						})
					}
					<Select
						style={{ width: '100%' }}
						placeholder='Add an item'
						options={SourcebookLogic.getItems(props.sourcebooks).map(i => ({ value: i.id, label: <Field label={i.name} value={i.description} />, data: i }))}
						showSearch={true}
						filterOption={(input, option) => {
							const strings = option ?
								[
									option.data.name,
									option.data.description
								]
								: [];
							return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
						}}
						onChange={id => props.addItem(props.group.id, props.slot.id, id)}
					/>
				</Space>
			);
		};

		return (
			<div className='slot-row'>
				<div className='content'>
					<MonsterPanel
						monster={monster}
						monsterGroup={monsterGroup}
						options={props.options}
						extra={
							<Flex align='center'>
								<Button type='text' title='Customize' icon={<EditOutlined />} onClick={() => setShowCustomize(!showCustomize)} />
								<Button type='text' title='Show stat block' icon={<InfoCircleOutlined />} onClick={() => props.showMonster(monster, monsterGroup)} />
							</Flex>
						}
					/>
					{showCustomize ? getCustomizePanel() : null}
				</div>
				<div className='actions'>
					<NumberSpin
						value={props.slot.count}
						format={value => (value * MonsterLogic.getRoleMultiplier(monster.role.organization, props.options)).toString()}
						onChange={value => props.setSlotCount(props.group.id, props.slot.id, value)}
					/>
					<Divider />
					<DropdownButton
						label='Move To'
						items={[
							...props.encounter.groups
								.map((g, n) => ({ id: g.id, name: `Group ${n + 1}` }))
								.filter(g => g.id !== props.group.id)
								.map(g => ({ key: g.id, label: <div className='ds-text centered-text'>{g.name}</div> })),
							{ key: '', label: <div className='ds-text centered-text'>New Group</div> }
						]}
						onClick={toGroupID => props.moveSlot(props.slot.id, props.group.id, toGroupID, true)}
					/>
					<DropdownButton
						label='Copy To'
						items={[
							...props.encounter.groups
								.map((g, n) => ({ id: g.id, name: `Group ${n + 1}` }))
								.filter(g => g.id !== props.group.id)
								.map(g => ({ key: g.id, label: <div className='ds-text centered-text'>{g.name}</div> })),
							{ key: '', label: <div className='ds-text centered-text'>New Group</div> }
						]}
						onClick={toGroupID => props.moveSlot(props.slot.id, props.group.id, toGroupID, false)}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='slot-row'>
			Unknown monster
		</div>
	);
};

interface TerrainSlotPanelProps {
	slot: TerrainSlot;
	sourcebooks: Sourcebook[];
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
	setTerrainCount: (id: string, value: number) => void;
	setTerrainUpgradeIDs: (id: string, value: string[]) => void;
}

const TerrainSlotPanel = (props: TerrainSlotPanelProps) => {
	const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === props.slot.terrainID);

	if (terrain) {
		return (
			<div className='terrain-row'>
				<div className='content'>
					<TerrainPanel terrain={terrain} extra={<Button type='text' title='Show stat block' icon={<InfoCircleOutlined />} onClick={() => props.showTerrain(terrain, props.slot.upgradeIDs)} />} />
					{
						terrain.upgrades.length > 0 ?
							<Expander title='Customize'>
								<HeaderText>Customize</HeaderText>
								<Select
									style={{ width: '100%' }}
									placeholder='Select'
									mode='multiple'
									options={Collections.sort(terrain.upgrades, a => a.label).map(a => ({ value: a.id, label: a.label, cost: a.cost }))}
									optionRender={option => <Flex align='center' gap={8}><div className='ds-text'>{option.data.label}</div><Pill>+{option.data.cost} EV</Pill></Flex>}
									showSearch={true}
									filterOption={(input, option) => {
										const strings = option ?
											[
												option.label
											]
											: [];
										return strings.some(str => str.toLowerCase().includes(input.toLowerCase()));
									}}
									value={props.slot.upgradeIDs}
									onChange={ids => props.setTerrainUpgradeIDs(props.slot.id, ids)}
								/>
							</Expander>
							: null
					}
				</div>
				<div className='actions'>
					<NumberSpin
						value={props.slot.count}
						onChange={value => props.setTerrainCount(props.slot.id, value)}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='terrain-row'>
			Unknown terrain
		</div>
	);
};
