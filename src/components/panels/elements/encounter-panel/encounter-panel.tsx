import { Button, Divider, Drawer, Segmented, Space, Tabs } from 'antd';
import { HeartFilled, InfoCircleOutlined } from '@ant-design/icons';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Badge } from '../../../controls/badge/badge';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { EncounterDifficultyPanel } from '../../encounter-difficulty/encounter-difficulty-panel';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Monster } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterPanel } from '../monster-panel/monster-panel';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Terrain } from '../../../../models/terrain';
import { TerrainModal } from '../../../modals/terrain/terrain-modal';
import { TerrainPanel } from '../terrain-panel/terrain-panel';
import { Token } from '../../../controls/token/token';
import { Utils } from '../../../../utils/utils';
import { useState } from 'react';

import './encounter-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	showDifficulty?: boolean;
	onChange?: (encounter: Encounter) => void;
}

export const EncounterPanel = (props: Props) => {
	const [ encounter, setEncounter ] = useState<Encounter>(Utils.copy(props.encounter));
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);
	const [ selectedTerrain, setSelectedTerrain ] = useState<Terrain | null>(null);

	const setMalice = (value: number) => {
		const copy = Utils.copy(encounter);
		copy.malice = value;
		setEncounter(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const nextRound = () => {
		const copy = Utils.copy(encounter);
		copy.round += 1;
		copy.groups.forEach(g => {
			g.acted = false;
		});
		setEncounter(copy);
		if (props.onChange) {
			props.onChange(copy);
		}
	};

	const getEncounterGroups = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		if ((encounter.groups.length === 0) && (encounter.terrain.length === 0)) {
			return (
				<Empty text='No monsters or terrain' />
			);
		}

		return (
			<div className='encounter-groups'>
				{
					encounter.groups.filter(g => g.slots.length > 0).map((group, n) => (
						<div key={group.id} className='encounter-group'>
							{
								encounter.groups.filter(g => g.slots.length > 0).length > 1 ?
									<HeaderText>Group {(n + 1).toString()}</HeaderText>
									:
									<HeaderText>Monsters</HeaderText>
							}
							{
								group.slots.map(slot => {
									const monster = SourcebookLogic.getMonster(props.sourcebooks, slot.monsterID);
									const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, slot.monsterID);

									if (!monster || !monsterGroup) {
										return null;
									}

									const name = MonsterLogic.getMonsterName(monster, monsterGroup);
									const count = slot.count * MonsterLogic.getRoleMultiplier(monster.role.organization);

									return (
										<div key={slot.id} className='encounter-slot'>
											<div className='encounter-slot-name'>
												<Token monster={monster} monsterGroup={monsterGroup} />
												<div className='ds-text'>{name}</div>
											</div>
											{count > 1 ? <Badge>x{count}</Badge> : null}
										</div>
									);
								})
							}
							{
								group.slots.length === 0 ?
									<Empty />
									: null
							}
						</div>
					))
				}
				{
					encounter.terrain.length > 0 ?
						<div key='terrain' className='terrain-group'>
							<HeaderText>Terrain</HeaderText>
							{
								encounter.terrain.map(slot => {
									const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === slot.terrainID);
									return (
										<div key={slot.id} className='terrain-slot'>
											<div className='terrain-slot-name'>
												<div className='ds-text'>{terrain ? terrain.name : 'Unnamed Terrain'}</div>
											</div>
											{slot.count > 1 ? <Badge>x{slot.count}</Badge> : null}
										</div>
									);
								})
							}
						</div>
						: null
				}
			</div>
		);
	};

	const getDifficulty = () => {
		if (props.showDifficulty) {
			return (
				<>
					<Divider />
					<SelectablePanel>
						<EncounterDifficultyPanel encounter={encounter} sourcebooks={props.sourcebooks} options={props.options} />
					</SelectablePanel>
				</>
			);
		}

		return null;
	};

	const getStatBlocks = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		const monsterData = EncounterLogic.getMonsterData(encounter);
		if ((monsterData.length === 0) && (encounter.terrain.length === 0)) {
			return null;
		}

		return (
			<>
				<Divider />
				<HeaderText level={1}>Stat Blocks</HeaderText>
				<div className='encounter-stat-blocks'>
					{
						monsterData.map(data => {
							const monster = EncounterLogic.getCustomizedMonster(data.monsterID, data.addOnIDs, props.sourcebooks);
							const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, data.monsterID);
							if (monster && monsterGroup) {
								return (
									<MonsterPanel
										key={monster.id}
										monster={monster}
										monsterGroup={monsterGroup}
										mode={PanelMode.Full}
									/>
								);
							}

							return null;
						})
					}
					{
						encounter.terrain.map(slot => {
							const terrain = SourcebookLogic.getTerrains(props.sourcebooks).find(t => t.id === slot.terrainID);
							if (terrain) {
								return (
									<TerrainPanel
										key={terrain.id}
										terrain={terrain}
										upgradeIDs={slot.upgradeIDs}
										mode={PanelMode.Full}
									/>
								);
							}
							return null;
						})
					}
				</div>
			</>
		);
	};

	const getMaliceDetails = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		const monsterGroups = EncounterLogic.getMonsterGroups(encounter, props.sourcebooks);
		if (monsterGroups.length === 0) {
			return null;
		}

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				{
					monsterGroups.filter(group => group.malice.length > 0).map(group => (
						<div key={group.id}>
							<HeaderText level={1}>{group.name} Malice</HeaderText>
							<div className='malice'>
								{
									group.malice.map(m => (
										<SelectablePanel key={m.id}>
											<FeaturePanel
												feature={m}
												mode={PanelMode.Full}
												cost={m.type === FeatureType.Ability ? m.data.ability.cost : m.data.cost}
												repeatable={m.type === FeatureType.Malice ? m.data.repeatable : undefined}
											/>
										</SelectablePanel>
									))
								}
							</div>
						</div>
					))
				}
			</Space>
		);
	};

	const getReminders = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

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
											<FeaturePanel key={copy.id} feature={copy} mode={PanelMode.Full} />
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

	const getActiveEncounterGroups = () => {
		const setActed = (groupID: string, value: boolean) => {
			const copy = Utils.copy(encounter);
			copy.groups.filter(g => g.id === groupID).forEach(g => g.acted = value);
			setEncounter(copy);
			if (props.onChange) {
				props.onChange(copy);
			}
		};

		if (props.mode !== PanelMode.Full) {
			return null;
		}

		const groups = encounter.groups.filter(g => g.slots.length > 0);
		if (groups.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='active-encounter-groups'>
				{
					groups.map((group, n) => (
						<div key={group.id} className='encounter-group'>
							<div className='group-name'>
								Group {(n + 1).toString()}
							</div>
							<div className={group.slots.every(s => s.monsters.every(m => m.state.defeated)) ? 'encounter-slots defeated' : 'encounter-slots'}>
								{
									group.slots.map(slot => (
										<div key={slot.id} className='encounter-slot'>
											{
												slot.monsters.map(monster => (
													<div key={monster.id} className={monster.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'}>
														<div className='name-column'>
															<Token monster={monster} />
															{monster.name}
														</div>
														<div className='stamina-column'>
															{MonsterLogic.getStaminaDescription(monster)}
															<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
														</div>
														<div className='conditions-column'>
															{MonsterLogic.getConditionsDescription(monster)}
														</div>
														<Button type='text' icon={<InfoCircleOutlined />} onClick={() => setSelectedMonster(monster)} />
													</div>
												))
											}
										</div>
									))
								}
							</div>
							<div className='group-acted'>
								<Segmented
									options={[ 'Ready', 'Acted' ]}
									value={group.acted ? 'Acted' : 'Ready'}
									onChange={value => setActed(group.id, value === 'Acted')}
								/>
							</div>
						</div>
					))
				}
			</div>
		);
	};

	const getActiveTerrainGroups = () => {
		if (props.mode !== PanelMode.Full) {
			return null;
		}

		if (encounter.terrain.length === 0) {
			return (
				<Empty />
			);
		}

		return (
			<div className='active-encounter-groups'>
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

	try {
		const strength = EncounterLogic.getStrength(encounter, props.sourcebooks);
		const difficulty = EncounterLogic.getDifficulty(strength, props.options);

		return (
			<div className={props.mode === PanelMode.Full ? 'encounter-panel' : 'encounter-panel compact'} id={props.mode === PanelMode.Full ? encounter.id : undefined}>
				<HeaderText level={1} tags={[ difficulty ]}>{encounter.name || 'Unnamed Encounter'}</HeaderText>
				<Markdown text={encounter.description} />
				{
					props.onChange ?
						<div className='stats'>
							<NumberSpin min={0} value={encounter.malice} onChange={setMalice}>
								<Field orientation='vertical' label='Malice' value={encounter.malice} />
							</NumberSpin>
							<div style={{ textAlign: 'center' }}>
								<Field label='Round' value={encounter.round} />
								<Button onClick={nextRound}>Next Round</Button>
							</div>
						</div>
						: null
				}
				{
					props.onChange ?
						<Tabs
							items={[
								{
									key: '1',
									label: 'Groups',
									children: getActiveEncounterGroups()
								},
								{
									key: '2',
									label: 'Terrain',
									children: getActiveTerrainGroups()
								},
								{
									key: '3',
									label: 'Malice',
									children: getMaliceDetails()
								},
								{
									key: '4',
									label: 'Reminders',
									children: getReminders()
								}
							]}
						/>
						:
						<>
							{getEncounterGroups()}
							{getDifficulty()}
							{getStatBlocks()}
							{getMaliceDetails()}
						</>
				}
				<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} width='500px'>
					{
						selectedMonster ?
							<MonsterModal
								monster={selectedMonster}
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
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
