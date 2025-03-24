import { Alert, Button, Divider, Drawer, Progress, Segmented, Space, Tabs, Tag } from 'antd';
import { Encounter, EncounterGroup, EncounterSlot } from '../../../../models/encounter';
import { HeartFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Monster, MonsterState } from '../../../../models/monster';
import { AbilityPanel } from '../../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Collections } from '../../../../utils/collections';
import { ConditionLogic } from '../../../../logic/condition-logic';
import { Empty } from '../../../controls/empty/empty';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectivePanel } from '../../elements/encounter-objective/encounter-objective-panel';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterStateModal } from '../../../modals/monster-state/monster-state-modal';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Terrain } from '../../../../models/terrain';
import { TerrainModal } from '../../../modals/terrain/terrain-modal';
import { Token } from '../../../controls/token/token';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './encounter-run-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	options: Options;
	onChange: (encounter: Encounter) => void;
}

export const EncounterRunPanel = (props: Props) => {
	const [ encounter, setEncounter ] = useState<Encounter>(Utils.copy(props.encounter));
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);
	const [ selectedTerrain, setSelectedTerrain ] = useState<Terrain | null>(null);
	const [ selectedSlot, setSelectedSlot ] = useState<EncounterSlot | null>(null);

	const setMalice = (value: number) => {
		const copy = Utils.copy(encounter);
		copy.malice = value;
		setEncounter(copy);
		props.onChange(copy);
	};

	const nextRound = () => {
		const copy = Utils.copy(encounter);
		copy.round += 1;
		copy.groups.forEach(g => {
			g.acted = false;
		});
		setEncounter(copy);
		props.onChange(copy);
	};

	const updateSlotState = (slot: EncounterSlot, state: MonsterState) => {
		const copy = Utils.copy(encounter);
		if (selectedSlot) {
			copy.groups
				.flatMap(g => g.slots)
				.filter(s => s.id === slot.id)
				.forEach(s => {
					s.state = state;
				});
		}
		setEncounter(copy);
		props.onChange(copy);
	};

	const getEncounterGroups = () => {
		const groups = encounter.groups.filter(g => g.slots.length > 0);
		if (groups.length === 0) {
			return (
				<Empty />
			);
		}

		const getSlot = (slot: EncounterSlot) => {
			const isMinionSlot = slot.monsters.every(m => m.role.organization === MonsterOrganizationType.Minion);

			const getStaminaDescription = () => {
				const max = Collections.sum(slot.monsters, m => MonsterLogic.getStamina(m));

				let str = `${max}`;
				if (slot.state.staminaDamage > 0) {
					str = `${Math.max(max - slot.state.staminaDamage, 0)} / ${max}`;
				}
				if (slot.state.staminaTemp > 0) {
					str += ` +${slot.state.staminaTemp}`;
				}

				return str;
			};

			const getMinionCountMessage = () => {
				if (!isMinionSlot) {
					return null;
				}

				const staminaRemaining = Collections.sum(slot.monsters, m => MonsterLogic.getStamina(m)) - slot.state.staminaDamage;
				const staminaPerMinion = Collections.mean(slot.monsters, m => MonsterLogic.getStamina(m));
				const minionsExpected = Math.ceil(staminaRemaining / staminaPerMinion);
				const minionsAlive = slot.monsters.filter(m => !m.state.defeated).length;

				if (minionsAlive !== minionsExpected) {
					return (
						<Alert
							type='warning'
							showIcon={true}
							message={`There should be ${Math.max(minionsExpected, 0)} active minions, not ${minionsAlive}.`}
						/>
					);
				}

				return null;
			};

			const getMinionCaptainTag = () => {
				if (!isMinionSlot) {
					return null;
				}

				if (slot.state.captainID) {
					const captain = encounter.groups.flatMap(g => g.slots).flatMap(s => s.monsters).find(m => m.id === slot.state.captainID);
					if (captain) {
						return (
							<Tag>
								Captain: {captain.name}
							</Tag>
						);
					}
				}

				return (
					<Tag>No captain</Tag>
				);
			};

			return (
				<div key={slot.id} className='encounter-slot'>
					{
						isMinionSlot ?
							<div key='minions' className={slot.state.defeated ? 'encounter-slot-row minion defeated' : 'encounter-slot-row minion'}>
								<div className='name-column'>
									<b>Minions</b>
								</div>
								<div className='stamina-column'>
									{getStaminaDescription()}
									<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
								</div>
								<div className='conditions-column'>
									{getMinionCaptainTag()}
									{slot.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
								</div>
								<Button type='text' icon={<InfoCircleOutlined />} onClick={() => setSelectedSlot(slot)} />
							</div>
							: null
					}
					{
						isMinionSlot ? getMinionCountMessage() : null
					}
					{
						isMinionSlot ? <Divider /> : null
					}
					{
						slot.monsters.map(monster => (
							<div key={monster.id} className={slot.state.defeated || monster.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'}>
								<div className='name-column'>
									<Token monster={monster} />
									{monster.name}
								</div>
								{
									isMinionSlot ?
										<div className='stamina-column' />
										:
										<div className='stamina-column'>
											{MonsterLogic.getStaminaDescription(monster)}
											<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
										</div>
								}
								<div className='conditions-column'>
									{monster.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
								</div>
								<Button type='text' icon={<InfoCircleOutlined />} onClick={() => setSelectedMonster(monster)} />
							</div>
						))
					}
				</div>
			);
		};

		const getGroup = (group: EncounterGroup, index: number) => {
			const setActed = (value: boolean) => {
				const copy = Utils.copy(encounter);
				copy.groups.filter(g => g.id === group.id).forEach(g => g.acted = value);
				setEncounter(copy);
				if (props.onChange) {
					props.onChange(copy);
				}
			};

			return (
				<div key={group.id} className='encounter-group'>
					<div className='group-name'>
						Group {(index + 1).toString()}
					</div>
					<div className={group.slots.every(s => s.state.defeated || s.monsters.every(m => m.state.defeated)) ? 'encounter-slots defeated' : 'encounter-slots'}>
						{group.slots.map(getSlot)}
					</div>
					<div className='group-acted'>
						<Segmented
							options={[
								{ value: false, label: 'Ready' },
								{ value: true, label: 'Acted' }
							]}
							value={group.acted}
							onChange={setActed}
						/>
					</div>
				</div>
			);
		};

		return (
			<div className='encounter-groups'>
				{groups.map(getGroup)}
			</div>
		);
	};

	const getTerrainGroups = () => {
		if (encounter.terrain.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='encounter-groups'>
				{
					encounter.terrain.map(slot => (
						<div key={slot.id} className='encounter-group'>
							<div className='encounter-slots'>
								<div className='encounter-slot'>
									{
										slot.terrain.map(terrain => (
											<div key={terrain.id} className='encounter-slot-row'>
												<div className='name-column'>
													{terrain.name}
												</div>
												<Button type='text' icon={<InfoCircleOutlined />} onClick={() => setSelectedTerrain(terrain)} />
											</div>
										))
									}
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
	};

	const getMalice = () => {
		const monsterGroups = EncounterLogic.getMonsterGroups(encounter, props.sourcebooks);
		if (monsterGroups.length === 0) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroups.filter(group => group.malice.length > 0).map(group => (
						<div key={group.id}>
							<HeaderText>{group.name} Malice</HeaderText>
							<div className='malice'>
								{
									group.malice.map(m => {
										const cost = m.type === FeatureType.Ability ? m.data.ability.cost as number : m.data.cost;

										return (
											<SelectablePanel key={m.id}>
												<FeaturePanel
													feature={m}
													options={props.options}
													mode={PanelMode.Full}
													cost={cost}
													repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
												/>
												{
													encounter.malice >= cost ?
														<Button
															block={true}
															onClick={() => setMalice(Math.max(encounter.malice - cost, 0))}
														>
															Use
														</Button>
														:
														<div className='malice-progress'>
															<Progress percent={100 * encounter.malice / cost} steps={cost} showInfo={false} />
														</div>
												}
											</SelectablePanel>
										);
									})
								}
							</div>
						</div>
					))
				}
			</Space>
		);
	};

	const getReminders = () => {
		const monsters = encounter.groups
			.flatMap(g => g.slots)
			.flatMap(s => s.monsters)
			.filter(m => {
				return MonsterLogic.getFeatures(m)
					.filter(f => f.type === FeatureType.Ability)
					.map(f => f.data.ability)
					.some(a => a.type.usage === AbilityUsage.Trigger);
			});

		const terrain = encounter.terrain
			.flatMap(s => s.terrain)
			.filter(t => {
				return t.sections
					.flatMap(s => s.content)
					.some(f => f.name === 'Trigger');
			});

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsters.map(m => (
						<div key={m.id}>
							{
								MonsterLogic.getFeatures(m)
									.filter(f => f.type === FeatureType.Ability)
									.map(f => f.data.ability)
									.filter(a => a.type.usage === AbilityUsage.Trigger)
									.map(a => {
										const copy = Utils.copy(a);
										copy.name = `${m.name}: ${a.name}`;
										return (
											<AbilityPanel key={copy.id} ability={copy} mode={PanelMode.Full} />
										);
									})
							}
						</div>
					))
				}
				{
					terrain.map(t => (
						<div key={t.id}>
							{
								t.sections
									.flatMap(s => s.content)
									.filter(f => f.name === 'Trigger')
									.map(f => {
										const copy = Utils.copy(f);
										copy.name = `${t.name}: ${f.name}`;
										return (
											<FeaturePanel key={copy.id} feature={copy} options={props.options} mode={PanelMode.Full} />
										);
									})
							}
						</div>
					))
				}
				{
					(monsters.length === 0) && (terrain.length === 0) ?
						<Empty />
						: null
				}
			</Space>
		);
	};

	try {
		return (
			<div className='encounter-run-panel' id={encounter.id}>
				<HeaderText level={1}>{encounter.name || 'Unnamed Encounter'}</HeaderText>
				<Markdown text={encounter.description} />
				<div className='stats'>
					<NumberSpin min={0} value={encounter.malice} onChange={setMalice}>
						<Field orientation='vertical' label='Malice' value={encounter.malice} />
					</NumberSpin>
					<div style={{ textAlign: 'center', marginTop: '-5px', marginBottom: '5px' }}>
						<Field label='Round' value={encounter.round} />
						<Button onClick={nextRound}>Next Round</Button>
					</div>
				</div>
				<Tabs
					items={[
						{
							key: '1',
							label: 'Groups',
							children: getEncounterGroups()
						},
						{
							key: '2',
							label: 'Terrain',
							children: getTerrainGroups()
						},
						{
							key: '3',
							label: 'Malice',
							children: getMalice()
						},
						{
							key: '4',
							label: 'Objective',
							children: <EncounterObjectivePanel objective={encounter.objective} mode={PanelMode.Full} />
						},
						{
							key: '5',
							label: 'Reminders',
							children: getReminders()
						}
					]}
				/>
				<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} width='500px'>
					{
						selectedMonster ?
							<MonsterModal
								monster={selectedMonster}
								options={props.options}
								onClose={() => setSelectedMonster(null)}
								updateMonster={monster => {
									const copy = Utils.copy(encounter);
									copy.groups.forEach(g => {
										g.slots.forEach(s => {
											const index = s.monsters.findIndex(m => m.id === monster.id);
											if (index !== -1) {
												s.monsters[index] = monster;
											}
										});
									});

									// Make sure no minion groups have a dead captain
									const captainIDs = copy.groups
										.flatMap(g => g.slots)
										.flatMap(s => s.monsters)
										.filter(m => m.role.organization !== MonsterOrganizationType.Minion)
										.filter(m => !m.state.defeated)
										.map(m => m.id);
									copy.groups.forEach(g => {
										g.slots.forEach(s => {
											if (s.state.captainID && !captainIDs.includes(s.state.captainID)) {
												s.state.captainID = undefined;
											}
										});
									});

									setEncounter(copy);
								}}
							/>
							: null
					}
				</Drawer>
				<Drawer open={!!selectedTerrain} onClose={() => setSelectedTerrain(null)} closeIcon={null} width='500px'>
					{
						selectedTerrain ?
							<TerrainModal
								terrain={selectedTerrain}
								upgradeIDs={[]}
								onClose={() => setSelectedTerrain(null)}
								updateTerrain={terrain => {
									const copy = Utils.copy(encounter);
									copy.terrain.forEach(slot => {
										const index = slot.terrain.findIndex(t => t.id === terrain.id);
										if (index !== -1) {
											slot.terrain[index] = terrain;
										}
									});
									setEncounter(copy);
								}}
							/>
							: null
					}
				</Drawer>
				<Drawer open={!!selectedSlot} onClose={() => setSelectedSlot(null)} closeIcon={null} width='500px'>
					{
						selectedSlot ?
							<MonsterStateModal
								state={selectedSlot.state}
								source='minion-group'
								encounter={encounter}
								updateState={state => updateSlotState(selectedSlot, state)}
								onClose={() => setSelectedSlot(null)}
							/>
							: null
					}
				</Drawer>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
