import { Alert, Button, Divider, Flex, Input, Popover, Select, Space, Tabs } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, PlusOutlined, SaveOutlined, SettingOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup, EncounterObjective, EncounterSlot, TerrainSlot } from '../../../../models/encounter';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { MonsterFilter, TerrainFilter } from '../../../../models/filter';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { ReactNode, useState } from 'react';
import { Adventure } from '../../../../models/adventure';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Badge } from '../../../controls/badge/badge';
import { Characteristic } from '../../../../enums/characteristic';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { Element } from '../../../../models/element';
import { Empty } from '../../../controls/empty/empty';
import { EncounterDifficultyPanel } from '../../../panels/encounter-difficulty/encounter-difficulty-panel';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectiveData } from '../../../../data/encounter-objective-data';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeaturePanel } from '../../../panels/elements/feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { MonsterFilterPanel } from '../../../panels/monster-filter/monster-filter-panel';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationLogic } from '../../../../logic/negotiation-logic';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { NegotiationTrait } from '../../../../enums/negotiation-trait';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { Plot } from '../../../../models/plot';
import { PlotEditPanel } from '../../../panels/edit/plot-edit/plot-edit-panel';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { TacticalMap } from '../../../../models/tactical-map';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapPanel } from '../../../panels/elements/tactical-map-panel/tactical-map-panel';
import { Terrain } from '../../../../models/terrain';
import { TerrainFilterPanel } from '../../../panels/terrain-filter/terrain-filter-panel';
import { TerrainLogic } from '../../../../logic/terrain-logic';
import { TerrainPanel } from '../../../panels/elements/terrain-panel/terrain-panel';
import { Utils } from '../../../../utils/utils';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-edit-page.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	showRules: () => void;
	showMonster: (monster: Monster, monsterGroup: MonsterGroup) => void;
	showTerrain: (terrain: Terrain, upgradeIDs: string[]) => void;
	saveChanges: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookEditPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();
	const [ element, setElement ] = useState<Element>(() => {
		let original: Element;
		switch (kind!) {
			case 'adventure':
				original = props.playbook.adventures.find(e => e.id === elementID)!;
				break;
			case 'encounter':
				original = props.playbook.encounters.find(e => e.id === elementID)!;
				break;
			case 'montage':
				original = props.playbook.montages.find(e => e.id === elementID)!;
				break;
			case 'negotiation':
				original = props.playbook.negotiations.find(e => e.id === elementID)!;
				break;
			case 'tactical-map':
				original = props.playbook.tacticalMaps.find(e => e.id === elementID)!;
				break;
		}
		return Utils.copy(original);
	});
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter(1, 3));
	const [ terrainFilter, setTerrainFilter ] = useState<TerrainFilter>(FactoryLogic.createTerrainFilter(1, 3));

	//#region Edit

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = Utils.copy(element);
			copy.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const copy = Utils.copy(element);
			copy.description = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={element.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={element.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={element.description} onChange={setDescription} />
			</Space>
		);
	};

	const getAdventurePartySection = () => {
		const adventure = element as Adventure;

		const setCount = (value: number) => {
			const copy = Utils.copy(element) as Adventure;
			copy.party.count = value;
			setElement(copy);
			setDirty(true);
		};

		const setLevel = (value: number) => {
			const copy = Utils.copy(element) as Adventure;
			copy.party.level = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Number of Heroes</HeaderText>
				<NumberSpin min={1} value={adventure.party.count} onChange={setCount} />
				<HeaderText>Hero Level</HeaderText>
				<NumberSpin min={1} max={10} value={adventure.party.level} onChange={setLevel} />
			</Space>
		);
	};

	const getAdventureIntroductionSection = () => {
		const adventure = element as Adventure;

		const addSection = () => {
			const copy = Utils.copy(element) as Adventure;
			copy.introduction.push(FactoryLogic.createElement());
			setElement(copy);
			setDirty(true);
		};

		const setSectionName = (index: number, value: string) => {
			const copy = Utils.copy(element) as Adventure;
			const m = copy.introduction[index];
			m.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setSectionDescription = (index: number, value: string) => {
			const copy = Utils.copy(element) as Adventure;
			const m = copy.introduction[index];
			m.description = value;
			setElement(copy);
			setDirty(true);
		};

		const moveSection = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Adventure;
			copy.introduction = Collections.move(copy.introduction, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteSection = (id: string) => {
			const copy = Utils.copy(element) as Adventure;
			copy.introduction = copy.introduction.filter(section => section.id !== id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					adventure.introduction.map((section, n) => (
						<Expander
							key={section.id}
							title={section.name || 'Unnamed Section'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(section.id); }} />
							]}
						>
							<HeaderText>Section</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Input
									className={section.name === '' ? 'input-empty' : ''}
									placeholder='Name'
									allowClear={true}
									value={section.name}
									onChange={e => setSectionName(n, e.target.value)}
								/>
								<MultiLine label='Description' value={section.description} onChange={value => setSectionDescription(n, value)} />
							</Space>
						</Expander>
					))
				}
				{
					adventure.introduction.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addSection}>
					<PlusOutlined />
					Add a section
				</Button>
			</Space>
		);
	};

	const getAdventurePlotSection = () => {
		const adventure = element as Adventure;

		const addPlotPoint = () => {
			const copy = Utils.copy(element) as Adventure;
			copy.plot.plots.push(FactoryLogic.createAdventurePlot());
			setElement(copy);
			setDirty(true);
		};

		const changePlotPoint = (plot: Plot) => {
			const copy = Utils.copy(element) as Adventure;
			const parent = PlaybookLogic.getPlotPointParent(copy.plot, plot.id);
			if (parent) {
				const index = parent.plots.findIndex(p => p.id === plot.id);
				if (index !== -1) {
					parent.plots[index] = plot;
				}
				setElement(copy);
				setDirty(true);
			}
		};

		const movePlotPoint = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Adventure;
			copy.plot.plots = Collections.move(copy.plot.plots, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deletePlotPoint = (id: string) => {
			const copy = Utils.copy(element) as Adventure;
			copy.plot.plots = copy.plot.plots.filter(p => p.id !== id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					adventure.plot.plots.map((p, n) => (
						<Expander
							key={p.id}
							title={p.name || 'Unnamed Plot Point'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePlotPoint(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePlotPoint(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deletePlotPoint(p.id); }} />
							]}
						>
							<PlotEditPanel
								plot={p}
								adventure={adventure}
								playbook={props.playbook}
								sourcebooks={props.sourcebooks}
								onChange={changePlotPoint}
							/>
						</Expander>
					))
				}
				{
					adventure.introduction.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addPlotPoint}>
					<PlusOutlined />
					Add a plot point
				</Button>
			</Space>
		);
	};

	const getEncounterMonstersSection = () => {
		const encounter = element as Encounter;

		const deleteGroup = (group: EncounterGroup) => {
			const copy = Utils.copy(element) as Encounter;
			copy.groups = copy.groups.filter(g => g.id !== group.id);
			setElement(copy);
			setDirty(true);
		};

		const moveSlot = (slotID: string, fromGroupID: string, toGroupID: string, remove: boolean) => {
			const copy = Utils.copy(element) as Encounter;
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
			setElement(copy);
			setDirty(true);
		};

		const setSlotCount = (groupID: string, slotID: string, value: number) => {
			const copy = Utils.copy(element) as Encounter;
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
			setElement(copy);
			setDirty(true);
		};

		const setSlotAddOnIDs = (groupID: string, slotID: string, value: string[]) => {
			const copy = Utils.copy(element) as Encounter;
			const group = copy.groups.find(g => g.id === groupID);
			if (group) {
				const slot = group.slots.find(s => s.id === slotID);
				if (slot) {
					slot.customization.addOnIDs = value;
				}
			}
			setElement(copy);
			setDirty(true);
		};

		const getSlot = (slot: EncounterSlot, group: EncounterGroup) => {
			const monster = EncounterLogic.getCustomizedMonster(slot.monsterID, slot.customization.addOnIDs, props.sourcebooks);
			const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, slot.monsterID);
			if (monster && monsterGroup) {
				return (
					<div key={slot.id} className='slot-row'>
						<div className='content'>
							<MonsterPanel monster={monster} monsterGroup={monsterGroup} options={props.options} />
							{
								monsterGroup.addOns.length > 0 ?
									<Expander title='Customize'>
										<HeaderText>Customize</HeaderText>
										<Select
											style={{ width: '100%' }}
											placeholder='Select'
											mode='multiple'
											options={Collections.sort(monsterGroup.addOns, a => a.name).map(a => ({ value: a.id, label: a.name, feature: a, cost: a.data.cost }))}
											optionRender={option => <FeaturePanel feature={option.data.feature} options={props.options} cost={option.data.cost} mode={PanelMode.Full} />}
											value={slot.customization.addOnIDs}
											onChange={ids => setSlotAddOnIDs(group.id, slot.id, ids)}
										/>
									</Expander>
									: null
							}
						</div>
						<div className='actions'>
							<NumberSpin
								value={slot.count}
								format={value => (value * MonsterLogic.getRoleMultiplier(monster.role.organization, props.options)).toString()}
								onChange={value => setSlotCount(group.id, slot.id, value)}
							/>
							<Divider />
							<Button block={true} onClick={() => props.showMonster(monster, monsterGroup)}>Details</Button>
							<DropdownButton
								label='Move To'
								items={[
									...encounter.groups
										.map((g, n) => ({ id: g.id, name: `Group ${n + 1}` }))
										.filter(g => g.id !== group.id)
										.map(g => ({ key: g.id, label: <div className='ds-text centered-text'>{g.name}</div> })),
									{ key: '', label: <div className='ds-text centered-text'>New Group</div> }
								]}
								onClick={toGroupID => moveSlot(slot.id, group.id, toGroupID, true)}
							/>
							<DropdownButton
								label='Copy To'
								items={[
									...encounter.groups
										.map((g, n) => ({ id: g.id, name: `Group ${n + 1}` }))
										.filter(g => g.id !== group.id)
										.map(g => ({ key: g.id, label: <div className='ds-text centered-text'>{g.name}</div> })),
									{ key: '', label: <div className='ds-text centered-text'>New Group</div> }
								]}
								onClick={toGroupID => moveSlot(slot.id, group.id, toGroupID, false)}
							/>
						</div>
					</div>
				);
			}
			return (
				<div key={slot.id} className='slot-row'>
					Unknown monster
				</div>
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
						<div key={group.id} className='group-row'>
							{encounter.groups.length > 1 ? <HeaderText>Group {(n + 1).toString()}</HeaderText> : null}
							{group.slots.map(slot => getSlot(slot, group))}
							{
								group.slots.length === 0 ?
									<Empty />
									: null
							}
							{
								EncounterLogic.getGroupStrength(group, props.sourcebooks) < EncounterLogic.getHeroValue(props.options.heroLevel) ?
									<Alert
										type='warning'
										showIcon={true}
										message='This group is probably not strong enough; you might want to add more monsters'
									/>
									: null
							}
							{
								EncounterLogic.getGroupStrength(group, props.sourcebooks) > (EncounterLogic.getHeroValue(props.options.heroLevel) * 2) ?
									<Alert
										type='warning'
										showIcon={true}
										message='This group is probably too strong; you might want to split it into smaller groups'
									/>
									: null
							}
							{encounter.groups.length > 1 ? <DangerButton mode='block' label='Delete Group' onConfirm={() => deleteGroup(group)} /> : null}
						</div>
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

	const getEncounterTerrainSection = () => {
		const encounter = element as Encounter;

		const setTerrainCount = (id: string, value: number) => {
			const copy = Utils.copy(element) as Encounter;
			const slot = copy.terrain.find(t => t.id === id);
			if (slot) {
				slot.count = value;

				if (slot.count === 0) {
					copy.terrain = copy.terrain.filter(t => t.id !== id);
				}
			}
			setElement(copy);
			setDirty(true);
		};

		const setTerrainUpgradeIDs = (id: string, value: string[]) => {
			const copy = Utils.copy(element) as Encounter;
			const slot = copy.terrain.find(t => t.id === id);
			if (slot) {
				slot.upgradeIDs = value;
			}
			setElement(copy);
			setDirty(true);
		};

		const getTerrain = (slot: TerrainSlot) => {
			const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === slot.terrainID);
			if (terrain) {
				return (
					<div key={slot.id} className='terrain-row'>
						<div className='content'>
							<TerrainPanel terrain={terrain} />
							{
								terrain.upgrades.length > 0 ?
									<Expander title='Customize'>
										<HeaderText>Customize</HeaderText>
										<Select
											style={{ width: '100%' }}
											placeholder='Select'
											mode='multiple'
											options={Collections.sort(terrain.upgrades, a => a.label).map(a => ({ value: a.id, label: a.label, cost: a.cost }))}
											optionRender={option => <Flex align='center' gap={8}><div className='ds-text'>{option.data.label}</div><Badge>+{option.data.cost} EV</Badge></Flex>}
											value={slot.upgradeIDs}
											onChange={ids => setTerrainUpgradeIDs(slot.id, ids)}
										/>
									</Expander>
									: null
							}
						</div>
						<div className='actions'>
							<NumberSpin
								value={slot.count}
								onChange={value => setTerrainCount(slot.id, value)}
							/>
							<Divider />
							<Button block={true} onClick={() => props.showTerrain(terrain, slot.upgradeIDs)}>Details</Button>
						</div>
					</div>
				);
			}
			return (
				<div key={slot.terrainID} className='terrain-row'>
					Unknown terrain
				</div>
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

	const getEncounterObjectiveSection = () => {
		const encounter = element as Encounter;

		const setObjective = (value: EncounterObjective) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective = Utils.copy(value);
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveName = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveDescription = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.description = value;
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveDifficultyModifier = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.difficultyModifier = value;
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveSuccessCondition = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.successCondition = value;
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveFailureCondition = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.failureCondition = value;
			setElement(copy);
			setDirty(true);
		};

		const setObjectiveVictories = (value: string) => {
			const copy = Utils.copy(element) as Encounter;
			copy.objective.victories = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Flex justify='end'>
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
						</Button>
					</Popover>
				</Flex>
				<HeaderText>Name</HeaderText>
				<Input
					placeholder='Name'
					allowClear={true}
					value={encounter.objective.name}
					onChange={e => setObjectiveName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={encounter.objective.description} onChange={setObjectiveDescription} />
				<HeaderText>Difficulty Modifier</HeaderText>
				<MultiLine label='Difficulty Modifier' value={encounter.objective.difficultyModifier} onChange={setObjectiveDifficultyModifier} />
				<HeaderText>Success Condition</HeaderText>
				<MultiLine label='Success Condition' value={encounter.objective.successCondition} onChange={setObjectiveSuccessCondition} />
				<HeaderText>Failure Condition</HeaderText>
				<MultiLine label='Failure Condition' value={encounter.objective.failureCondition} onChange={setObjectiveFailureCondition} />
				<HeaderText>Victories</HeaderText>
				<MultiLine label='Victories' value={encounter.objective.victories} onChange={setObjectiveVictories} />
			</Space>
		);
	};

	const getMontageSceneSection = () => {
		const montage = element as Montage;

		const setScene = (value: string) => {
			const copy = Utils.copy(element) as Montage;
			copy.scene = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Setting the Scene</HeaderText>
				<MultiLine label='Scene' value={montage.scene} onChange={setScene} />
			</Space>
		);
	};

	const getMontageSectionsSection = () => {
		const montage = element as Montage;

		const addSection = () => {
			const copy = Utils.copy(element) as Montage;
			copy.sections.push(FactoryLogic.createMontageSection());
			setElement(copy);
			setDirty(true);
		};

		const setSectionName = (index: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[index];
			s.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setSectionDescription = (index: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[index];
			s.description = value;
			setElement(copy);
			setDirty(true);
		};

		const setSectionTwistInfo = (index: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[index];
			s.twistInfo = value;
			setElement(copy);
			setDirty(true);
		};

		const moveSection = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Montage;
			copy.sections = Collections.move(copy.sections, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteSection = (id: string) => {
			const copy = Utils.copy(element) as Montage;
			copy.sections = copy.sections.filter(s => s.id !== id);
			setElement(copy);
			setDirty(true);
		};

		const addChallenge = (sectionIndex: number) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.challenges.push(FactoryLogic.createMontageChallenge({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(copy);
			setDirty(true);
		};

		const setChallengeName = (sectionIndex: number, challengeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setChallengeDescription = (sectionIndex: number, challengeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.description = value;
			setElement(copy);
			setDirty(true);
		};

		const setChallengeCharacteristics = (sectionIndex: number, challengeIndex: number, value: Characteristic[]) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.characteristics = value;
			setElement(copy);
			setDirty(true);
		};

		const setChallengeSkills = (sectionIndex: number, challengeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.skills = value;
			setElement(copy);
			setDirty(true);
		};

		const setChallengeAbilities = (sectionIndex: number, challengeIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.abilities = value;
			setElement(copy);
			setDirty(true);
		};

		const setChallengeUses = (sectionIndex: number, challengeIndex: number, value: number) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const c = s.challenges[challengeIndex];
			c.uses = value;
			setElement(copy);
			setDirty(true);
		};

		const moveChallenge = (sectionIndex: number, challengeIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.challenges = Collections.move(s.challenges, challengeIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteChallenge = (sectionIndex: number, id: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.challenges = s.challenges.filter(c => c.id !== id);
			setElement(copy);
			setDirty(true);
		};

		const addTwist = (sectionIndex: number) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.twists.push(FactoryLogic.createMontageChallenge({
				id: Utils.guid(),
				name: '',
				description: ''
			}));
			setElement(copy);
			setDirty(true);
		};

		const setTwistName = (sectionIndex: number, twistIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.name = value;
			setElement(copy);
			setDirty(true);
		};

		const setTwistDescription = (sectionIndex: number, twistIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.description = value;
			setElement(copy);
			setDirty(true);
		};

		const setTwistCharacteristics = (sectionIndex: number, twistIndex: number, value: Characteristic[]) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.characteristics = value;
			setElement(copy);
			setDirty(true);
		};

		const setTwistSkills = (sectionIndex: number, twistIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.skills = value;
			setElement(copy);
			setDirty(true);
		};

		const setTwistAbilities = (sectionIndex: number, twistIndex: number, value: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.abilities = value;
			setElement(copy);
			setDirty(true);
		};

		const setTwistUses = (sectionIndex: number, twistIndex: number, value: number) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			const t = s.twists[twistIndex];
			t.uses = value;
			setElement(copy);
			setDirty(true);
		};

		const moveTwist = (sectionIndex: number, twistIndex: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.twists = Collections.move(s.twists, twistIndex, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteTwist = (sectionIndex: number, id: string) => {
			const copy = Utils.copy(element) as Montage;
			const s = copy.sections[sectionIndex];
			s.twists = s.twists.filter(t => t.id !== id);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					montage.sections.map((s, sectionIndex) => (
						<Expander
							key={s.id}
							title={s.name || 'Section'}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveSection(sectionIndex, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteSection(s.id); }} />
							]}
						>
							<Tabs
								items={[
									{
										key: '1',
										label: 'Section',
										children: (
											<div>
												<HeaderText>Name</HeaderText>
												<MultiLine label='Name' value={s.name} onChange={value => setSectionName(sectionIndex, value)} />
												<HeaderText>Description</HeaderText>
												<MultiLine label='Description' value={s.description} onChange={value => setSectionDescription(sectionIndex, value)} />
											</div>
										)
									},
									{
										key: '2',
										label: 'Challenges',
										children: (
											<Space direction='vertical' style={{ width: '100%' }}>
												{
													s.challenges.map((c, challengeIndex) => (
														<Expander
															key={c.id}
															title={c.name || 'Challenge'}
															extra={[
																<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveChallenge(sectionIndex, challengeIndex, 'up'); }} />,
																<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveChallenge(sectionIndex, challengeIndex, 'down'); }} />,
																<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteChallenge(sectionIndex, c.id); }} />
															]}
														>
															<HeaderText>Name</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Name'
																allowClear={true}
																value={c.name}
																onChange={e => setChallengeName(sectionIndex, challengeIndex, e.target.value)}
															/>
															<HeaderText>Description</HeaderText>
															<MultiLine label='Description' value={c.description} onChange={value => setChallengeDescription(sectionIndex, challengeIndex, value)} />
															<HeaderText>Characteristics</HeaderText>
															<Select
																style={{ width: '100%' }}
																className={c.characteristics.length < 2 ? 'selection-empty' : ''}
																mode='multiple'
																placeholder='Select characteristics'
																options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch }))}
																optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																value={c.characteristics}
																onChange={value => setChallengeCharacteristics(sectionIndex, challengeIndex, value)}
															/>
															<HeaderText>Skills</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Skills'
																allowClear={true}
																value={c.skills}
																onChange={e => setChallengeSkills(sectionIndex, challengeIndex, e.target.value)}
															/>
															<HeaderText>Abilities</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Skills'
																allowClear={true}
																value={c.abilities}
																onChange={e => setChallengeAbilities(sectionIndex, challengeIndex, e.target.value)}
															/>
															<HeaderText>Uses</HeaderText>
															<NumberSpin label='Uses' min={1} value={c.uses} onChange={value => setChallengeUses(sectionIndex, challengeIndex, value)} />
														</Expander>
													))
												}
												{
													s.challenges.length === 0 ?
														<Empty />
														: null
												}
												<Button block={true} onClick={() => addChallenge(sectionIndex)}>
													<PlusOutlined />
													Add a challenge
												</Button>
											</Space>
										)
									},
									{
										key: '3',
										label: 'Twists',
										children: (
											<Space direction='vertical' style={{ width: '100%' }}>
												<HeaderText>Twists</HeaderText>
												<MultiLine label='Twists' value={s.twistInfo} onChange={value => setSectionTwistInfo(sectionIndex, value)} />
												{
													s.twists.map((t, twistIndex) => (
														<Expander
															key={t.id}
															title={t.name || 'Twist'}
															extra={[
																<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveTwist(sectionIndex, twistIndex, 'up'); }} />,
																<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveTwist(sectionIndex, twistIndex, 'down'); }} />,
																<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteTwist(sectionIndex, t.id); }} />
															]}
														>
															<HeaderText>Name</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Name'
																allowClear={true}
																value={t.name}
																onChange={e => setTwistName(sectionIndex, twistIndex, e.target.value)}
															/>
															<HeaderText>Description</HeaderText>
															<MultiLine label='Description' value={t.description} onChange={value => setTwistDescription(sectionIndex, twistIndex, value)} />
															<HeaderText>Characteristics</HeaderText>
															<Select
																style={{ width: '100%' }}
																className={t.characteristics.length < 2 ? 'selection-empty' : ''}
																mode='multiple'
																placeholder='Select characteristics'
																options={[ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ].map(ch => ({ value: ch }))}
																optionRender={option => <div className='ds-text'>{option.data.value}</div>}
																value={t.characteristics}
																onChange={value => setTwistCharacteristics(sectionIndex, twistIndex, value)}
															/>
															<HeaderText>Skills</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Skills'
																allowClear={true}
																value={t.skills}
																onChange={e => setTwistSkills(sectionIndex, twistIndex, e.target.value)}
															/>
															<HeaderText>Abilities</HeaderText>
															<Input
																className={element.name === '' ? 'input-empty' : ''}
																placeholder='Skills'
																allowClear={true}
																value={t.abilities}
																onChange={e => setTwistAbilities(sectionIndex, twistIndex, e.target.value)}
															/>
															<HeaderText>Uses</HeaderText>
															<NumberSpin label='Uses' min={1} value={t.uses} onChange={value => setTwistUses(sectionIndex, twistIndex, value)} />
														</Expander>
													))
												}
												{
													s.challenges.length === 0 ?
														<Empty />
														: null
												}
												<Button block={true} onClick={() => addTwist(sectionIndex)}>
													<PlusOutlined />
													Add a twist
												</Button>
											</Space>
										)
									}
								]}
							/>
						</Expander>
					))
				}
				{
					montage.sections.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addSection}>
					<PlusOutlined />
					Add a section
				</Button>
			</Space>
		);
	};

	const getMontageOutcomesSection = () => {
		const montage = element as Montage;

		const setSuccess = (value: string) => {
			const copy = Utils.copy(element) as Montage;
			copy.outcomes.totalSuccess = value;
			setElement(copy);
			setDirty(true);
		};

		const setPartial = (value: string) => {
			const copy = Utils.copy(element) as Montage;
			copy.outcomes.partialSuccess = value;
			setElement(copy);
			setDirty(true);
		};

		const setFailure = (value: string) => {
			const copy = Utils.copy(element) as Montage;
			copy.outcomes.totalFailure = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Total Success</HeaderText>
				<MultiLine label='Total success' value={montage.outcomes.totalSuccess} onChange={setSuccess} />
				<HeaderText>Partial Success</HeaderText>
				<MultiLine label='Partial success' value={montage.outcomes.partialSuccess} onChange={setPartial} />
				<HeaderText>Total Failure</HeaderText>
				<MultiLine label='Total failure' value={montage.outcomes.totalFailure} onChange={setFailure} />
			</Space>
		);
	};

	const getNegotiationDetailsSection = () => {
		const negotiation = element as Negotiation;

		const setImpression = (value: number) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.impression = value;
			setElement(copy);
			setDirty(true);
		};

		const setInterest = (value: number) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.interest = value;
			setElement(copy);
			setDirty(true);
		};

		const setPatience = (value: number) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.patience = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin label='Impression' min={0} max={15} value={negotiation.impression} onChange={setImpression} />
				<NumberSpin label='Interest' min={0} max={5} value={negotiation.interest} onChange={setInterest} />
				<NumberSpin label='Patience' min={0} max={5} value={negotiation.patience} onChange={setPatience} />
			</Space>
		);
	};

	const getNegotiationMotivationsSection = () => {
		const negotiation = element as Negotiation;

		const addMotivation = () => {
			const copy = Utils.copy(element) as Negotiation;
			copy.motivations.push({
				trait: NegotiationTrait.Benevolence,
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const setMotivationTrait = (index: number, value: NegotiationTrait) => {
			const copy = Utils.copy(element) as Negotiation;
			const m = copy.motivations[index];
			m.trait = value;
			setElement(copy);
			setDirty(true);
		};

		const setMotivationDescription = (index: number, value: string) => {
			const copy = Utils.copy(element) as Negotiation;
			const m = copy.motivations[index];
			m.description = value;
			setElement(copy);
			setDirty(true);
		};

		const moveMotivation = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Negotiation;
			copy.motivations = Collections.move(copy.motivations, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deleteMotivation = (trait: NegotiationTrait) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.motivations = copy.motivations.filter(m => m.trait !== trait);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					negotiation.motivations.map((m, n) => (
						<Expander
							key={`m${n}`}
							title={m.trait}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); moveMotivation(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deleteMotivation(m.trait); }} />
							]}
						>
							<HeaderText>Motivation</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Select
									style={{ width: '100%' }}
									placeholder='Trait'
									options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getMotivationDescription(nt) }))}
									optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
									value={m.trait}
									onChange={t => setMotivationTrait(n, t)}
								/>
								<MultiLine label='Description' value={m.description} onChange={value => setMotivationDescription(n, value)} />
							</Space>
						</Expander>
					))
				}
				{
					negotiation.motivations.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addMotivation}>
					<PlusOutlined />
					Add a motivation
				</Button>
			</Space>
		);
	};

	const getNegotiationPitfallsSection = () => {
		const negotiation = element as Negotiation;

		const addPitfall = () => {
			const copy = Utils.copy(element) as Negotiation;
			copy.pitfalls.push({
				trait: NegotiationTrait.Benevolence,
				description: ''
			});
			setElement(copy);
			setDirty(true);
		};

		const setPitfallTrait = (index: number, value: NegotiationTrait) => {
			const copy = Utils.copy(element) as Negotiation;
			const m = copy.pitfalls[index];
			m.trait = value;
			setElement(copy);
			setDirty(true);
		};

		const setPitfallDescription = (index: number, value: string) => {
			const copy = Utils.copy(element) as Negotiation;
			const m = copy.pitfalls[index];
			m.description = value;
			setElement(copy);
			setDirty(true);
		};

		const movePitfall = (index: number, direction: 'up' | 'down') => {
			const copy = Utils.copy(element) as Negotiation;
			copy.pitfalls = Collections.move(copy.pitfalls, index, direction);
			setElement(copy);
			setDirty(true);
		};

		const deletePitfall = (trait: NegotiationTrait) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.pitfalls = copy.pitfalls.filter(m => m.trait !== trait);
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					negotiation.pitfalls.map((p, n) => (
						<Expander
							key={`p${n}`}
							title={p.trait}
							extra={[
								<Button key='up' type='text' title='Move Up' icon={<CaretUpOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'up'); }} />,
								<Button key='down' type='text' title='Move Down' icon={<CaretDownOutlined />} onClick={e => { e.stopPropagation(); movePitfall(n, 'down'); }} />,
								<DangerButton key='delete' mode='clear' onConfirm={e => { e.stopPropagation(); deletePitfall(p.trait); }} />
							]}
						>
							<HeaderText>Pitfall</HeaderText>
							<Space direction='vertical' style={{ width: '100%' }}>
								<Select
									style={{ width: '100%' }}
									placeholder='Trait'
									options={[ NegotiationTrait.Benevolence, NegotiationTrait.Discovery, NegotiationTrait.Freedom, NegotiationTrait.Greed, NegotiationTrait.HigherAuthority, NegotiationTrait.Justice, NegotiationTrait.Legacy, NegotiationTrait.Peace, NegotiationTrait.Power, NegotiationTrait.Protection, NegotiationTrait.Revelry, NegotiationTrait.Vengeance ].map(nt => ({ label: nt, value: nt, desc: NegotiationLogic.getPitfallDescription(nt) }))}
									optionRender={option => <Field label={option.data.label} value={option.data.desc} />}
									value={p.trait}
									onChange={t => setPitfallTrait(n, t)}
								/>
								<MultiLine label='Description' value={p.description} onChange={value => setPitfallDescription(n, value)} />
							</Space>
						</Expander>
					))
				}
				{
					negotiation.pitfalls.length === 0 ?
						<Empty />
						: null
				}
				<Button block={true} onClick={addPitfall}>
					<PlusOutlined />
					Add a pitfall
				</Button>
			</Space>
		);
	};

	const getNegotiationOutcomesSection = () => {
		const negotiation = element as Negotiation;

		const setOutcome = (index: number, value: string) => {
			const copy = Utils.copy(element) as Negotiation;
			copy.outcomes[index] = value;
			setElement(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					negotiation.outcomes.map((o, n) => (
						<Expander
							key={`o${n}`}
							title={n}
						>
							<HeaderText>Outcome {n}</HeaderText>
							<MultiLine label='Outcome' value={o} onChange={value => setOutcome(n, value)} />
						</Expander>
					))
				}
			</Space>
		);
	};

	const getTacticalMapBuilder = () => {
		const map = element as TacticalMap;

		return (
			<div className='tactical-map-container'>
				<TacticalMapPanel
					map={map}
					display={TacticalMapDisplayType.DirectorEdit}
					options={props.options}
					mode={PanelMode.Full}
					updateMap={map => {
						setElement(map);
						setDirty(true);
					}}
				/>
			</div>
		);
	};

	const getEditHeaderSection = () => {
		return null;
	};

	const getEditSection = () => {
		switch (kind!) {
			case 'adventure':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Adventure',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Party',
								children: getAdventurePartySection()
							},
							{
								key: '3',
								label: 'Introduction',
								children: getAdventureIntroductionSection()
							},
							{
								key: '4',
								label: 'Plot',
								children: getAdventurePlotSection()
							}
						]}
					/>
				);
			case 'encounter':
				return (
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
								children: getEncounterMonstersSection()
							},
							{
								key: '3',
								label: 'Terrain',
								children: getEncounterTerrainSection()
							},
							{
								key: '4',
								label: 'Objective',
								children: getEncounterObjectiveSection()
							}
						]}
					/>
				);
			case 'negotiation':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Negotiation',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Details',
								children: getNegotiationDetailsSection()
							},
							{
								key: '3',
								label: 'Motivations',
								children: getNegotiationMotivationsSection()
							},
							{
								key: '4',
								label: 'Pitfalls',
								children: getNegotiationPitfallsSection()
							},
							{
								key: '5',
								label: 'Outcomes',
								children: getNegotiationOutcomesSection()
							}
						]}
					/>
				);
			case 'montage':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Montage',
								children: getNameAndDescriptionSection()
							},
							{
								key: '2',
								label: 'Scene',
								children: getMontageSceneSection()
							},
							{
								key: '3',
								label: 'Sections',
								children: getMontageSectionsSection()
							},
							{
								key: '4',
								label: 'Outcomes',
								children: getMontageOutcomesSection()
							}
						]}
					/>
				);
			case 'tactical-map':
				return getTacticalMapBuilder();
		}
	};

	//#endregion

	//#region Preview

	const getEncounterPreviewSection = () => {
		return (
			<SelectablePanel>
				<EncounterPanel
					encounter={element as Encounter}
					sourcebooks={props.sourcebooks}
					options={props.options}
					mode={PanelMode.Full}
				/>
			</SelectablePanel>
		);
	};

	const getEncounterPreviewMonstersSection = () => {
		const addMonster = (monster: Monster, encounterGroupID: string | null) => {
			const copy = Utils.copy(element) as Encounter;

			const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, monster.id);

			if (encounterGroupID) {
				const group = copy.groups.find(g => g.id === encounterGroupID);
				if (group) {
					const slot = group.slots.find(s => s.monsterID === monster.id);
					if (slot) {
						slot.count += 1;
					} else {
						group.slots.push(FactoryLogic.createEncounterSlot(monster.id, monsterGroup!.id));
					}
				};
			} else {
				const group = FactoryLogic.createEncounterGroup();
				group.slots.push(FactoryLogic.createEncounterSlot(monster.id, monsterGroup!.id));
				copy.groups.push(group);
			}

			setElement(copy);
			setDirty(true);
		};

		const encounter = element as Encounter;
		const monsters = Collections.sort(props.sourcebooks.flatMap(s => s.monsterGroups.flatMap(mg => mg.monsters).filter(m => MonsterLogic.matches(m, monsterFilter))), m => m.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Filter'>
					<HeaderText>Filter</HeaderText>
					<MonsterFilterPanel
						monsterFilter={monsterFilter}
						monsters={props.sourcebooks.flatMap(sb => sb.monsterGroups).flatMap(g => g.monsters)}
						onChange={setMonsterFilter}
					/>
				</Expander>
				{
					monsters.map(m => {
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
								<MonsterPanel monster={m} monsterGroup={monsterGroup} options={props.options} />
								<div className='actions'>
									<Button block={true} onClick={() => props.showMonster(m, monsterGroup)}>Details</Button>
									{addBtn}
								</div>
							</div>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	const getEncounterPreviewTerrainSection = () => {
		const addTerrain = (terrain: Terrain) => {
			const copy = Utils.copy(element) as Encounter;

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

			setElement(copy);
			setDirty(true);
		};

		const terrains = Collections.sort(SourcebookLogic.getTerrains(props.sourcebooks).filter(m => TerrainLogic.matches(m, terrainFilter)), t => t.name);

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Filter'>
					<HeaderText>Filter</HeaderText>
					<TerrainFilterPanel terrainFilter={terrainFilter} onChange={setTerrainFilter} />
				</Expander>
				{
					terrains.map(t => {
						return (
							<div key={t.id} className='terrain-row'>
								<TerrainPanel terrain={t} />
								<div className='actions'>
									<Button block={true} onClick={() => props.showTerrain(t, [])}>Details</Button>
									<Button icon={<PlusOutlined />} onClick={() => addTerrain(t)}>Add</Button>
								</div>
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

	const getPreviewHeaderSection = () => {
		if (kind === 'encounter') {
			const strength = EncounterLogic.getStrength(element as Encounter, props.sourcebooks);
			const difficulty = EncounterLogic.getDifficulty(strength, props.options);

			return (
				<Expander title='Difficulty' tags={[ difficulty ]}>
					<EncounterDifficultyPanel
						encounter={element as Encounter}
						sourcebooks={props.sourcebooks}
						options={props.options}
					/>
				</Expander>
			);
		}

		return null;
	};

	const getPreview = () => {
		switch (kind!) {
			case 'adventure':
				return (
					<SelectablePanel>
						<AdventurePanel
							adventure={element as Adventure}
							mode={PanelMode.Full}
							playbook={props.playbook}
							sourcebooks={props.sourcebooks}
							options={props.options}
						/>
					</SelectablePanel>
				);
			case 'encounter':
				return (
					<Tabs
						items={[
							{
								key: '1',
								label: 'Preview',
								children: getEncounterPreviewSection()
							},
							{
								key: '2',
								label: 'Monsters',
								children: getEncounterPreviewMonstersSection()
							},
							{
								key: '3',
								label: 'Terrain',
								children: getEncounterPreviewTerrainSection()
							}
						]}
					/>
				);
			case 'montage':
				return (
					<SelectablePanel>
						<MontagePanel
							montage={element as Montage}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
			case 'negotiation':
				return (
					<SelectablePanel>
						<NegotiationPanel
							negotiation={element as Negotiation}
							mode={PanelMode.Full}
						/>
					</SelectablePanel>
				);
		}
	};

	//#endregion

	const getSubheader = () => {
		if (kind === 'tactical-map') {
			return 'Tactical Map';
		}

		return Format.capitalize(kind!);
	};

	try {
		return (
			<ErrorBoundary>
				<div className='playbook-edit-page'>
					<AppHeader subheader={`${getSubheader()} Builder`} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll} showRules={props.showRules}>
						<Button type='primary' icon={<SaveOutlined />} disabled={!dirty} onClick={() => props.saveChanges(kind!, element)}>
							Save Changes
						</Button>
						<Button icon={<CloseOutlined />} onClick={() => navigation.goToPlaybookView(kind!, element.id)}>
							Cancel
						</Button>
						{
							(kind === 'encounter') ?
								<div className='divider' />
								: null
						}
						{
							(kind === 'encounter') || (kind === 'tactical-map') ?
								<Popover
									trigger='click'
									content={<OptionsPanel mode={kind} options={props.options}heroes={props.heroes} setOptions={props.setOptions} />}
								>
									<Button icon={<SettingOutlined />}>
										Options
									</Button>
								</Popover>
								: null
						}
					</AppHeader>
					<div className='playbook-edit-page-content'>
						<div className='edit-column'>
							{getEditHeaderSection()}
							{getEditSection()}
						</div>
						{
							kind !== 'tactical-map' ?
								<div className='preview-column'>
									{getPreviewHeaderSection()}
									{getPreview()}
								</div>
								: null
						}
					</div>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
