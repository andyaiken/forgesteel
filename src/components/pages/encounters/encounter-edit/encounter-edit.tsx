import { Alert, Button, Divider, Input, Segmented, Select, Slider, Space, Tabs } from 'antd';
import { Encounter, EncounterGroup } from '../../../../models/encounter';
import { Monster, MonsterGroup } from '../../../../models/monster';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { ReactNode, useMemo, useState } from 'react';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { DropdownButton } from '../../../controls/dropdown-button/dropdown-button';
import { EncounterDifficulty } from '../../../../enums/encounter-difficulty';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { Expander } from '../../../controls/expander/expander';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { MonsterFilter } from '../../../../models/monster-filter';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterPanel } from '../../../panels/elements/monster-panel/monster-panel';
import { MonsterRoleType } from '../../../../enums/monster-role-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { useModals } from '../../../../hooks/use-modals';
import { useParams } from 'react-router';
import { usePersistedPlaybook } from '../../../../hooks/use-persisted-playbook';
import { usePersistedSourcebooks } from '../../../../hooks/use-persisted-sourcebooks';

import './encounter-edit.scss';

interface Props {
	goHome: () => void;
	saveChanges: (encounter: Encounter) => void;
	cancelChanges: () => void;
}

export const EncounterEditPage = (props: Props) => {
	const modals = useModals();
	const { playbook } = usePersistedPlaybook();
	const { sourcebooks } = usePersistedSourcebooks();
	const { encounterId } = useParams<{ encounterId: string }>();
	const originalEncounter = useMemo(() => playbook.encounters.find(e => e.id === encounterId), [ encounterId, playbook ]);
	const [ previousEncounter, setPreviousEncounter ] = useState(originalEncounter);
	const [ encounter, setEncounter ] = useState(originalEncounter);
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ monsterFilter, setMonsterFilter ] = useState<MonsterFilter>(FactoryLogic.createMonsterFilter());
	const [ heroCount, setHeroCount ] = useState<number>(4);
	const [ heroLevel, setHeroLevel ] = useState<number>(1);
	const [ heroVictories, setHeroVictories ] = useState<number>(0);

	const monsters = useMemo(
		() => Collections.sort(
			sourcebooks.flatMap(s => s.monsterGroups)
				.flatMap(mg => mg.monsters
					.filter(m => MonsterLogic.matches(m, mg, monsterFilter))
					.map(m => ({ monsterGroupId: mg.id, ...m }))
				),
			m => m.name
		),
		[ sourcebooks, monsterFilter ]
	);

	if (originalEncounter !== previousEncounter) {
		setEncounter(originalEncounter);
		setPreviousEncounter(originalEncounter);
	}

	if (!encounter) {
		return null;
	}

	//#region Edit

	const getNameAndDescriptionSection = () => {
		const setName = (value: string) => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;
			copy.name = value;
			setEncounter(copy);
			setDirty(true);
		};

		const setDescription = (value: string) => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;
			copy.description = value;
			setEncounter(copy);
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Name</HeaderText>
				<Input
					className={encounter.name === '' ? 'input-empty' : ''}
					placeholder='Name'
					allowClear={true}
					addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => setName(NameGenerator.generateName())} />}
					value={encounter.name}
					onChange={e => setName(e.target.value)}
				/>
				<HeaderText>Description</HeaderText>
				<MultiLine label='Description' value={encounter.description} onChange={setDescription} />
			</Space>
		);
	};

	const getEncounterMonstersSection = () => {
		const addGroup = () => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;
			copy.groups.push(FactoryLogic.createEncounterGroup());
			setEncounter(copy);
			setDirty(true);
		};

		const deleteGroup = (group: EncounterGroup) => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;
			copy.groups = copy.groups.filter(g => g.id !== group.id);
			setEncounter(copy);
			setDirty(true);
		};

		const setSlotCount = (groupID: string, slotID: string, value: number) => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;
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
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					encounter.groups.map((group, n) => (
						<div key={group.id} className='group-row'>
							{encounter.groups.length > 1 ? <HeaderText>Group {(n + 1).toString()}</HeaderText> : null}
							{
								group.slots.map(slot => {
									const monster = SourcebookLogic.getMonster(sourcebooks, slot.monsterID);
									const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, slot.monsterID);
									if (monster && monsterGroup) {
										return (
											<div key={slot.id} className='slot-row'>
												<MonsterPanel monster={monster} monsterGroup={monsterGroup} mode={PanelMode.Compact} />
												<div className='actions'>
													<Button block={true} onClick={() => modals.showMonster(slot.monsterID)}>Details</Button>
													<NumberSpin value={slot.count} format={value => (value * 8).toString()} onChange={value => setSlotCount(group.id, slot.id, value)} />
												</div>
											</div>
										);
									}
									return (
										<div key={slot.id} className='slot-row'>
											Unknown monster
										</div>
									);
								})
							}
							{
								group.slots.length === 0 ?
									<Alert
										type='warning'
										showIcon={true}
										message='No monsters in this group'
									/>
									: null
							}
							{encounter.groups.length > 1 ? <DangerButton block={true} label='Delete' onConfirm={() => deleteGroup(group)} /> : null}
						</div>
					))
				}
				{encounter.groups.length > 0 ? <Divider /> : null}
				<Button block={true} onClick={addGroup}>Add a new encounter group</Button>
			</Space>
		);
	};

	const getEditSection = () => {
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
					}
				]}
			/>
		);
	};

	//#endregion

	//#region Preview

	const getPreviewSection = () => {
		return (
			<div style={{ margin: '0 10px' }}>
				<SelectablePanel>
					<EncounterPanel encounter={encounter} mode={PanelMode.Full} />
				</SelectablePanel>
			</div>
		);
	};

	const getMonstersSection = () => {
		const setFilterName = (value: string) => {
			const copy = JSON.parse(JSON.stringify(monsterFilter)) as MonsterFilter;
			copy.name = value;
			setMonsterFilter(copy);
		};

		const setFilterLevel = (value: number[]) => {
			const copy = JSON.parse(JSON.stringify(monsterFilter)) as MonsterFilter;
			copy.level = value;
			setMonsterFilter(copy);
		};

		const setFilterRoles = (value: MonsterRoleType[]) => {
			const copy = JSON.parse(JSON.stringify(monsterFilter)) as MonsterFilter;
			copy.roles = value;
			setMonsterFilter(copy);
		};

		const setFilterMinion = (value: 'any' | 'yes' | 'no') => {
			const copy = JSON.parse(JSON.stringify(monsterFilter)) as MonsterFilter;
			copy.isMinion = value;
			setMonsterFilter(copy);
		};

		const setFilterEV = (value: number[]) => {
			const copy = JSON.parse(JSON.stringify(monsterFilter)) as MonsterFilter;
			copy.ev = value;
			setMonsterFilter(copy);
		};

		const addMonster = (monster: Monster, groupID: string | null) => {
			const copy = JSON.parse(JSON.stringify(encounter)) as Encounter;

			if (groupID) {
				const group = copy.groups.find(g => g.id === groupID);
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
			setDirty(true);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<Expander title='Filter'>
					<Space direction='vertical' style={{ width: '100%' }}>
						<Input
							placeholder='Name'
							allowClear={true}
							value={monsterFilter.name}
							onChange={e => setFilterName(e.target.value)}
						/>
						<Select
							style={{ width: '100%' }}
							mode='multiple'
							allowClear={true}
							placeholder='Role'
							options={[ MonsterRoleType.Ambusher, MonsterRoleType.Artillery, MonsterRoleType.Brute, MonsterRoleType.Controller, MonsterRoleType.Defender, MonsterRoleType.Harrier, MonsterRoleType.Hexer, MonsterRoleType.Leader, MonsterRoleType.Mount, MonsterRoleType.Solo, MonsterRoleType.Support ].map(r => ({ label: r, value: r }))}
							optionRender={option => <div className='ds-text'>{option.data.label}</div>}
							value={monsterFilter.roles}
							onChange={setFilterRoles}
						/>
						<Segmented
							block={true}
							options={[
								{
									value: 'any',
									label: 'All monsters'
								},
								{
									value: 'yes',
									label: 'Minions'
								},
								{
									value: 'no',
									label: 'Non-minions'
								}
							]}
							value={monsterFilter.isMinion}
							onChange={setFilterMinion}
						/>
						<div>
							<Slider
								range={{ draggableTrack: true }}
								min={1}
								max={10}
								value={monsterFilter.level}
								onChange={setFilterLevel}
							/>
							<Field label='Level' value={`${Math.min(...monsterFilter.level)} to ${Math.max(...monsterFilter.level)}`} />
						</div>
						<div>
							<Slider
								range={{ draggableTrack: true }}
								min={0}
								max={200}
								value={monsterFilter.ev}
								onChange={setFilterEV}
							/>
							<Field label='EV' value={`${Math.min(...monsterFilter.ev)} to ${Math.max(...monsterFilter.ev)}`} />
						</div>
					</Space>
				</Expander>
				{
					monsters.map(m => {
						const monsterGroup = SourcebookLogic.getMonsterGroup(sourcebooks, m.id) as MonsterGroup;

						let addBtn: ReactNode;
						if (encounter.groups.length === 0) {
							addBtn = (
								<Button icon={<PlusOutlined />} onClick={() => addMonster(m, null)}>Add</Button>
							);
						}
						if (encounter.groups.length === 1) {
							addBtn = (
								<Button icon={<PlusOutlined />} onClick={() => addMonster(m, encounter.groups[0].id)}>Add</Button>
							);
						}
						if (encounter.groups.length > 1) {
							addBtn = (
								<DropdownButton
									label='Add'
									items={encounter.groups.map((group, n) => ({ key: group.id, label: `Group ${n + 1}` }))}
									onClick={groupID => addMonster(m, groupID)}
								/>
							);
						}

						return (
							<div key={`${m.monsterGroupId}.${m.id}`} className='monster-row'>
								<MonsterPanel monster={m} monsterGroup={monsterGroup} mode={PanelMode.Compact} />
								<div className='actions'>
									<Button block={true} onClick={() => modals.showMonster(m.id)}>Details</Button>
									{addBtn}
								</div>
							</div>
						);
					})
				}
				{
					monsters.length === 0 ?
						<Alert
							type='warning'
							showIcon={true}
							message='No monsters'
						/>
						: null
				}
			</Space>
		);
	};

	const getDifficultySection = () => {
		const budget = EncounterLogic.getBudget(heroCount, heroLevel, heroVictories);
		const strength = EncounterLogic.getStrength(encounter, sourcebooks);
		const difficulty = EncounterLogic.getDifficulty(strength, budget);

		const marks: Record<string | number, ReactNode> = {};
		marks[budget] = <div className='ds-text dimmed-text small-text'>Standard</div>;

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<NumberSpin label='Heroes' min={1} value={heroCount} onChange={setHeroCount} />
				<NumberSpin label='Level' min={1} max={10} value={heroLevel} onChange={setHeroLevel} />
				<NumberSpin label='Victories' min={0} value={heroVictories} onChange={setHeroVictories} />
				<div style={{ margin: '0 10px' }}>
					<Slider
						range={true}
						marks={marks}
						min={0}
						max={budget * 2}
						value={[ strength ]}
						styles={{
							track: {
								background: 'transparent'
							}
						}}
						tooltip={{ open: false }}
					/>
				</div>
				<Field label='Strength' value={strength} />
				<Field label='Difficulty' value={difficulty} />
				{
					(difficulty === EncounterDifficulty.Trivial) ?
						<Alert
							type='info'
							showIcon={true}
							message='This encounter does not warrant any Victories.'
						/>
						: null
				}
				{
					(difficulty === EncounterDifficulty.Easy) || (difficulty === EncounterDifficulty.Standard) ?
						<Alert
							type='info'
							showIcon={true}
							message='This encounter warrants 1 Victory.'
						/>
						: null
				}
				{
					(difficulty === EncounterDifficulty.Hard) || (difficulty === EncounterDifficulty.Extreme) ?
						<Alert
							type='info'
							showIcon={true}
							message='This encounter warrants 2 Victories.'
						/>
						: null
				}
			</Space>
		);
	};

	const getPreview = () => {
		return (
			<Tabs
				items={[
					{
						key: '1',
						label: 'Preview',
						children: getPreviewSection()
					},
					{
						key: '2',
						label: 'Monsters',
						children: getMonstersSection()
					},
					{
						key: '3',
						label: 'Difficulty',
						children: getDifficultySection()
					}
				]}
			/>
		);
	};

	//#endregion

	try {
		return (
			<div className='encounter-edit-page'>
				<AppHeader subtitle='Encounters' goHome={props.goHome}>
					<Button type='primary' disabled={!dirty} onClick={() => props.saveChanges(encounter)}>
						Save Changes
					</Button>
					<Button onClick={() => props.cancelChanges()}>
						Cancel
					</Button>
				</AppHeader>
				<div className='encounter-edit-page-content'>
					<div className='edit-column'>
						{getEditSection()}
					</div>
					<div className='preview-column'>
						{getPreview()}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
