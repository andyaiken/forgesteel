import { Alert, Button, Flex, Input, Popover, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, EditFilled, EditOutlined, EllipsisOutlined, FilterFilled, FilterOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { Encounter, EncounterGroup, EncounterObjective, TerrainSlot } from '@/models/encounter';
import { Fragment, ReactNode, useState } from 'react';
import { MonsterFilter, TerrainFilter } from '@/models/filter';
import { MonsterInfo, TerrainInfo } from '@/components/panels/token/token';
import { Collections } from '@/utils/collections';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DropdownButton } from '@/components/controls/dropdown-button/dropdown-button';
import { Element } from '@/models/element';
import { ElementEditPanel } from '@/components/panels/edit/element-edit/element-edit-panel';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterDifficultyLogic } from '@/logic/encounter-difficulty-logic';
import { EncounterDifficultyPanel } from '@/components/panels/encounter-difficulty/encounter-difficulty-panel';
import { EncounterLogic } from '@/logic/encounter-logic';
import { EncounterObjectiveData } from '@/data/encounter-objective-data';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Expander } from '@/components/controls/expander/expander';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { Field } from '@/components/controls/field/field';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Hero } from '@/models/hero';
import { MarkdownEditor } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterFilterPanel } from '@/components/panels/monster-filter/monster-filter-panel';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { NameGenerator } from '@/utils/name-generator';
import { NumberSpin } from '@/components/controls/number-spin/number-spin';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { Pill } from '@/components/controls/pill/pill';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Terrain } from '@/models/terrain';
import { TerrainFilterPanel } from '@/components/panels/terrain-filter/terrain-filter-panel';
import { TerrainLogic } from '@/logic/terrain-logic';
import { Toggle } from '@/components/controls/toggle/toggle';
import { Utils } from '@/utils/utils';

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
	const [ draggedMonster, setDraggedMonster ] = useState<Monster | null>(null);
	const [ draggedTerrain, setDraggedTerrain ] = useState<Terrain | null>(null);

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
			<Space orientation='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						status={encounter.name === '' ? 'warning' : ''}
						placeholder='Name'
						allowClear={true}
						value={encounter.name}
						onChange={e => setName(e.target.value)}
					/>
					<Button icon={<ThunderboltOutlined />} onClick={() => setName(NameGenerator.generateName())} />
				</Space.Compact>
				<HeaderText>Description</HeaderText>
				<MarkdownEditor value={encounter.description} onChange={setDescription} />
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

		const addGroup = () => {
			const copy = Utils.copy(encounter);
			copy.groups.push(FactoryLogic.createEncounterGroup());
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
						const slotCopy = Utils.copy(slot);
						slotCopy.id = Utils.guid();
						toGroup.slots.push(slotCopy);
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
					title={`You shouldn't generally have more than 6 different types of monster in an encounter (this encounter has ${statblocks}).`}
				/>
			);
		}

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{warnings}
				<HeaderText
					extra={
						<Button type='text' icon={<PlusOutlined />} onClick={addGroup} />
					}
				>
					Monsters
				</HeaderText>
				{
					encounter.groups.map((group, n) => (
						<GroupPanel
							key={group.id}
							group={group}
							index={n}
							sourcebooks={props.sourcebooks}
							options={props.options}
							draggedMonster={draggedMonster}
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
					key={slot.id}
					slot={slot}
					sourcebooks={props.sourcebooks}
					showTerrain={props.showTerrain}
					setTerrainCount={setTerrainCount}
					setTerrainUpgradeIDs={setTerrainUpgradeIDs}
				/>
			);
		};

		return (
			<div className='encounter-terrain-panel'>
				<TerrainDropTarget
					encounter={encounter}
					draggedTerrain={draggedTerrain}
					getSlot={getTerrain}
				/>
			</div>
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
			<Space orientation='vertical' style={{ width: '100%' }}>
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
							<MarkdownEditor value={encounter.objective.description} onChange={setObjectiveDescription} />
							<HeaderText>Difficulty Modifier</HeaderText>
							<MarkdownEditor value={encounter.objective.difficultyModifier} onChange={setObjectiveDifficultyModifier} />
							<HeaderText>Success Condition</HeaderText>
							<MarkdownEditor value={encounter.objective.successCondition} onChange={setObjectiveSuccessCondition} />
							<HeaderText>Failure Condition</HeaderText>
							<MarkdownEditor value={encounter.objective.failureCondition} onChange={setObjectiveFailureCondition} />
							<HeaderText>Victories</HeaderText>
							<MarkdownEditor value={encounter.objective.victories} onChange={setObjectiveVictories} />
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
			<Space orientation='vertical' style={{ width: '100%' }}>
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

	const getMaliceSection = () => {
		const maliceFeatures = EncounterLogic.getAllMaliceFeatures(encounter, props.sourcebooks);

		const removeMaliceFeatureIds = (ids: string[]) => {
			const copy = Utils.copy(encounter);
			copy.hiddenMaliceFeatures = [ ...copy.hiddenMaliceFeatures, ...ids.filter(id => !copy.hiddenMaliceFeatures.includes(id)) ];

			setEncounter(copy);
			props.onChange(copy);
		};

		const addMaliceFeatureIds = (ids: string[]) => {
			const copy = Utils.copy(encounter);
			copy.hiddenMaliceFeatures = copy.hiddenMaliceFeatures.filter(f => !ids.includes(f));

			setEncounter(copy);
			props.onChange(copy);
		};

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
				{
					maliceFeatures.map((groupMalice, i) => {
						return (
							<Fragment key={`group-malice-${groupMalice.group}-${i}`}>
								<HeaderText
									extra={
										<Flex>
											<Button
												type='text'
												icon={<MinusCircleOutlined />}
												onClick={() => {
													const featureIds = groupMalice.features.map(f => f.id);
													removeMaliceFeatureIds(featureIds);
												}}
											/>
											<Button
												type='text'
												icon={<PlusCircleOutlined />}
												onClick={() => {
													const featureIds = groupMalice.features.map(f => f.id);
													addMaliceFeatureIds(featureIds);
												}}
											/>
										</Flex>
									}
								>
									{groupMalice.group}
								</HeaderText>
								{
									groupMalice.features.map(feature => (
										<Toggle
											key={`malice-feature-toggle-${i}-${feature.id}`}
											label={feature.name}
											value={!encounter.hiddenMaliceFeatures.includes(feature.id)}
											onChange={value => {
												if (value) {
													addMaliceFeatureIds([ feature.id ]);
												} else {
													removeMaliceFeatureIds([ feature.id ]);
												}
											}}
										/>
									))
								}
							</Fragment>
						);
					})
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

		const groups = Collections.sort(props.sourcebooks.flatMap(sb => sb.monsterGroups).filter(g => g.monsters.some(m => (m.role.organization !== MonsterOrganizationType.Retainer) && MonsterLogic.matches(m, monsterFilter))), g => g.name);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
							includeOrgFilter={true}
							includeEVFilter={true}
							onChange={setMonsterFilter}
						/>
						: null
				}
				{
					groups.map(g => (
						<Expander key={g.id} title={g.name}>
							<Space orientation='vertical' style={{ width: '100%' }}>
								{
									Collections.sort(g.monsters.filter(m => m.role.organization !== MonsterOrganizationType.Retainer).filter(m => MonsterLogic.matches(m, monsterFilter)), m => m.name).map(m => (
										<MonsterListItem
											key={m.id}
											monster={m}
											monsterGroup={SourcebookLogic.getMonsterGroup(props.sourcebooks, m.id) as MonsterGroup}
											encounter={encounter}
											addMonster={addMonster}
											showMonster={props.showMonster}
										/>
									))
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

		const allTerrains = SourcebookLogic.getTerrains(props.sourcebooks);
		const terrains = Collections.sort(allTerrains.filter(m => TerrainLogic.matches(m, terrainFilter)), t => t.name);

		return (
			<Space orientation='vertical' style={{ width: '100%' }}>
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
					terrains.map(t => (
						<TerrainListItem
							key={t.id}
							terrain={t}
							showTerrain={props.showTerrain}
							addTerrain={addTerrain}
						/>
					))
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

	const onDragStart = (event: DragStartEvent) => {
		const data = event.active.data.current as { type: string, element: Element };
		switch (data.type) {
			case 'monster':
				setDraggedMonster(data.element as Monster);
				break;
			case 'terrain':
				setDraggedTerrain(data.element as Terrain);
				break;
		}
	};

	const onDragCancel = () => {
		setDraggedMonster(null);
		setDraggedTerrain(null);
	};

	const onDragEnd = (event: DragEndEvent) => {
		if (draggedMonster && event.over) {
			const groupID = event.over.id.toString();
			addMonster(draggedMonster, groupID);
		}

		if (draggedTerrain && event.over) {
			addTerrain(draggedTerrain);
		}

		setDraggedMonster(null);
		setDraggedTerrain(null);
	};

	return (
		<ErrorBoundary>
			<div className='encounter-edit-panel'>
				<DndContext
					onDragStart={onDragStart}
					onDragCancel={onDragCancel}
					onDragEnd={onDragEnd}
				>
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
								},
								{
									key: '6',
									label: 'Malice',
									children: getMaliceSection()
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
									icon={filterVisible ? <FilterFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <FilterOutlined />}
									onClick={() => setFilterVisible(!filterVisible)}
								/>
							}
						/>

					</div>
					<DragOverlay>
						{draggedMonster ? <MonsterListItem monster={draggedMonster} /> : null}
						{draggedTerrain ? <TerrainListItem terrain={draggedTerrain} /> : null}
					</DragOverlay>
				</DndContext>
			</div>
		</ErrorBoundary>
	);
};

interface GroupPanelProps {
	group: EncounterGroup;
	index: number;
	sourcebooks: Sourcebook[];
	options: Options;
	draggedMonster: Monster | null;
	setName: (group: EncounterGroup, value: string) => void;
	deleteGroup: (group: EncounterGroup) => void;
	getSlot: (slot: EncounterSlot, group: EncounterGroup) => ReactNode;
}

const GroupPanel = (props: GroupPanelProps) => {
	const [ editing, setEditing ] = useState<boolean>(false);

	return (
		<ErrorBoundary>
			<div className='encounter-group-panel'>
				<HeaderText
					level={3}
					extra={
						<Flex>
							<Button key='edit' type='text' icon={editing ? <EditFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <EditOutlined />} onClick={() => setEditing(!editing)} />
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
				<MonsterDropTarget
					group={props.group}
					draggedMonster={props.draggedMonster}
					getSlot={props.getSlot}
				/>
				{
					(props.group.slots.length > 0) && (EncounterDifficultyLogic.getGroupStrength(props.group, props.sourcebooks) < EncounterDifficultyLogic.getHeroValue(props.options.heroLevel)) ?
						<Alert
							type='warning'
							showIcon={true}
							title='This group is probably not strong enough; you might want to add more monsters'
						/>
						: null
				}
				{
					(props.group.slots.length > 0) && (EncounterDifficultyLogic.getGroupStrength(props.group, props.sourcebooks) > (EncounterDifficultyLogic.getHeroValue(props.options.heroLevel) * 2)) ?
						<Alert
							type='warning'
							showIcon={true}
							title='This group is probably too strong; you might want to split it into smaller groups'
						/>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};

interface MonsterDropTargetProps {
	group: EncounterGroup;
	draggedMonster: Monster | null;
	getSlot: (slot: EncounterSlot, group: EncounterGroup) => ReactNode;
}

const MonsterDropTarget = (props: MonsterDropTargetProps) => {
	const { isOver, setNodeRef } = useDroppable({ id: props.group.id });

	const classNames = [ 'drag-target' ];
	if (props.draggedMonster) {
		classNames.push('drag-highlight');

		if (isOver) {
			classNames.push('drag-over');
		}
	}

	return (
		<div className={classNames.join(' ')} ref={setNodeRef}>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{props.group.slots.map(slot => props.getSlot(slot, props.group))}
				{
					props.group.slots.length === 0 ?
						<div className='ds-text dimmed-text centered-text'>No monsters</div>
						: null
				}
			</Space>
			{
				props.draggedMonster ?
					<div className='drop-info-container'>
						<div className='drop-info'>Drop here</div>
					</div>
					: null
			}
		</div>
	);
};

interface TerrainDropTargetProps {
	encounter: Encounter;
	draggedTerrain: Terrain | null;
	getSlot: (slot: TerrainSlot) => ReactNode;
}

const TerrainDropTarget = (props: TerrainDropTargetProps) => {
	const { isOver, setNodeRef } = useDroppable({ id: 'terrain' });

	const classNames = [ 'drag-target' ];
	if (props.draggedTerrain) {
		classNames.push('drag-highlight');

		if (isOver) {
			classNames.push('drag-over');
		}
	}

	return (
		<div className={classNames.join(' ')} ref={setNodeRef}>
			<Space orientation='vertical' style={{ width: '100%' }}>
				{props.encounter.terrain.map(slot => props.getSlot(slot))}
				{
					props.encounter.terrain.length === 0 ?
						<div className='ds-text dimmed-text centered-text'>No terrain</div>
						: null
				}
			</Space>
			{
				props.draggedTerrain ?
					<div className='drop-info-container'>
						<div className='drop-info'>Drop here</div>
					</div>
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
				<Space orientation='vertical' style={{ width: '100%' }}>
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
						onChange={id => props.addItem(props.group.id, props.slot.id, id)}
					/>
				</Space>
			);
		};

		const getMenu = () => {
			return (
				<Space orientation='vertical'>
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
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='slot-row'>
					<div className='content'>
						<Flex align='center' justify='space-between'>
							<MonsterInfo monster={monster} />
							<Flex align='center'>
								<Button type='text' title='Show stat block' icon={<InfoCircleOutlined />} onClick={() => props.showMonster(monster, monsterGroup)} />
								<Button type='text' title='Customize' icon={showCustomize ? <EditFilled /> : <EditOutlined />} onClick={() => setShowCustomize(!showCustomize)} />
								<Popover content={getMenu()}>
									<Button type='text' icon={<EllipsisOutlined />} />
								</Popover>
							</Flex>
						</Flex>
						{showCustomize ? getCustomizePanel() : null}
					</div>
					<div className='actions'>
						<NumberSpin
							value={props.slot.count}
							format={value => (value * MonsterLogic.getRoleMultiplier(monster.role.organization)).toString()}
							onChange={value => props.setSlotCount(props.group.id, props.slot.id, value)}
						/>
					</div>
				</div>
			</ErrorBoundary>
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
	const [ showCustomize, setShowCustomize ] = useState<boolean>(false);

	const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === props.slot.terrainID);

	if (terrain) {
		const getCustomizePanel = () => {
			return (
				<Space orientation='vertical' style={{ width: '100%' }}>
					<HeaderText>Customize</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Select'
						mode='multiple'
						options={Collections.sort(terrain.upgrades, a => a.label).map(a => ({ value: a.id, label: a.label, cost: a.cost }))}
						optionRender={option => <Flex align='center' gap={8}><div className='ds-text'>{option.data.label}</div><Pill>+{option.data.cost} EV</Pill></Flex>}
						value={props.slot.upgradeIDs}
						onChange={ids => props.setTerrainUpgradeIDs(props.slot.id, ids)}
					/>
				</Space>
			);
		};

		return (
			<ErrorBoundary>
				<div className='terrain-row'>
					<div className='content'>
						<Flex align='center' justify='space-between'>
							<TerrainInfo terrain={terrain} />
							<Flex align='center'>
								<Button type='text' title='Show stat block' icon={<InfoCircleOutlined />} onClick={() => props.showTerrain(terrain, props.slot.upgradeIDs)} />
								{terrain.upgrades.length > 0 ? <Button type='text' title='Customize' icon={showCustomize ? <EditFilled /> : <EditOutlined />} onClick={() => setShowCustomize(!showCustomize)} /> : null}
							</Flex>
						</Flex>
						{showCustomize ? getCustomizePanel() : null}
					</div>
					<div className='actions'>
						<NumberSpin
							value={props.slot.count}
							onChange={value => props.setTerrainCount(props.slot.id, value)}
						/>
					</div>
				</div>
			</ErrorBoundary>
		);
	}

	return (
		<div className='terrain-row'>
			Unknown terrain
		</div>
	);
};

interface MonsterListItemProps {
	monster: Monster;
	monsterGroup?: MonsterGroup;
	encounter?: Encounter;
	addMonster?: (monster: Monster, groupID: string | null) => void;
	showMonster?: (monster: Monster, monsterGroup: MonsterGroup) => void;
}

const MonsterListItem = (props: MonsterListItemProps) => {
	const { attributes, listeners, setNodeRef } = useDraggable({ id: props.monster.id, data: { type: 'monster', element: props.monster } });

	let showBtn: ReactNode | null = null;
	if (props.monsterGroup && props.showMonster) {
		showBtn = (
			<Button type='text' icon={<InfoCircleOutlined />} onClick={() => props.showMonster!(props.monster, props.monsterGroup!)} />
		);
	}

	let addBtn: ReactNode | null = null;
	if (props.encounter && props.addMonster) {
		if (props.encounter.groups.length === 0) {
			addBtn = (
				<Button type='text' icon={<PlusOutlined />} onClick={() => props.addMonster!(props.monster, null)} />
			);
		} else {
			addBtn = (
				<Popover
					content={
						<Space orientation='vertical'>
							{
								props.encounter.groups.map((group, n) => (
									<Button key={group.id} type='text' block={true} onClick={() => props.addMonster!(props.monster, group.id)}>Group {n + 1}</Button>
								))
							}
							<Button key='' type='text' block={true} onClick={() => props.addMonster!(props.monster, null)}>New Group</Button>
						</Space>
					}
				>
					<Button type='text' icon={<PlusOutlined />} />
				</Popover>
			);
		}
	}

	return (
		<div className='monster-list-item'>
			<div className='info-container' ref={setNodeRef} {...listeners} {...attributes}>
				<MonsterInfo monster={props.monster} />
			</div>
			<Flex>
				{showBtn}
				{addBtn}
			</Flex>
		</div>
	);
};

interface TerrainListItemProps {
	terrain: Terrain;
	addTerrain?: (terrain: Terrain) => void;
	showTerrain?: (terrain: Terrain, upgradeIDs: string[]) => void;
}

const TerrainListItem = (props: TerrainListItemProps) => {
	const { attributes, listeners, setNodeRef } = useDraggable({ id: props.terrain.id, data: { type: 'terrain', element: props.terrain } });

	let showBtn: ReactNode | null = null;
	if (props.showTerrain) {
		showBtn = (
			<Button type='text' icon={<InfoCircleOutlined />} onClick={() => props.showTerrain!(props.terrain, [])} />
		);
	}

	let addBtn: ReactNode | null = null;
	if (props.addTerrain) {
		addBtn = (
			<Button type='text' icon={<PlusOutlined />} onClick={() => props.addTerrain!(props.terrain)} />
		);
	}

	return (
		<div className='terrain-list-item'>
			<div className='info-container' ref={setNodeRef} {...listeners} {...attributes}>
				<TerrainInfo terrain={props.terrain} />
			</div>
			<Flex>
				{showBtn}
				{addBtn}
			</Flex>
		</div>
	);
};
