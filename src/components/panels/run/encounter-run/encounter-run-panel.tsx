import { Alert, Button, Drawer, Flex, Progress, Space, Tabs } from 'antd';
import { Encounter, EncounterGroup, EncounterSlot } from '../../../../models/encounter';
import { EncounterGroupHero, EncounterGroupMonster, EncounterGroupTerrain } from '../../encounter-group/encounter-group-panel';
import { FeatureAbility, FeatureMalice } from '../../../../models/feature';
import { AbilityPanel } from '../../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Empty } from '../../../controls/empty/empty';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectivePanel } from '../../elements/encounter-objective/encounter-objective-panel';
import { EncounterTurnModal } from '../../../modals/encounter-turn/encounter-turn-modal';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroSelectModal } from '../../../modals/select/hero-select/hero-select-modal';
import { HeroStateModal } from '../../../modals/hero-state/hero-state-modal';
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { HeroicResourceBadge } from '../../../controls/badge/badge';
import { Markdown } from '../../../controls/markdown/markdown';
import { MinionGroupHealthPanel } from '../../health/health-panel';
import { Modal } from '../../../modals/modal/modal';
import { Monster } from '../../../../models/monster';
import { MonsterData } from '../../../../data/monster-data';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterSelectModal } from '../../../modals/select/monster-select/monster-select-modal';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Terrain } from '../../../../models/terrain';
import { TerrainModal } from '../../../modals/terrain/terrain-modal';
import { Utils } from '../../../../utils/utils';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { useState } from 'react';

import './encounter-run-panel.scss';

interface Props {
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	heroes: Hero[];
	options: Options;
	onChange: (encounter: Encounter) => void;
}

export const EncounterRunPanel = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const [ encounter, setEncounter ] = useState<Encounter>(Utils.copy(props.encounter));
	const [ tab, setTab ] = useState<string>('combatants');
	const [ addingHeroes, setAddingHeroes ] = useState<boolean>(false);
	const [ addingMonsters, setAddingMonsters ] = useState<boolean>(false);
	const [ selectingGroup, setSelectingGroup ] = useState<boolean>(false);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ selectedTerrain, setSelectedTerrain ] = useState<Terrain | null>(null);
	const [ selectedMinionSlot, setSelectedMinionSlot ] = useState<EncounterSlot | null>(null);

	const setRound = (value: number) => {
		const copy = Utils.copy(encounter);
		copy.round = value;
		setEncounter(copy);
		props.onChange(copy);
	};

	const setMalice = (value: number) => {
		const copy = Utils.copy(encounter);
		copy.malice = value;
		setEncounter(copy);
		props.onChange(copy);
	};

	const nextTurn = () => {
		setSelectingGroup(true);
	};

	const addHeroes = (heroes: Hero[]) => {
		const copy = Utils.copy(encounter);
		heroes.forEach(h => copy.heroes.push(Utils.copy(h)));
		setEncounter(copy);
		props.onChange(copy);
	};

	const addSlot = (monster: Monster) => {
		const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, monster.id);
		if (monsterGroup) {
			const slot = FactoryLogic.createEncounterSlot(monster.id, monsterGroup.id);
			slot.count = 1;

			while (slot.monsters.length < slot.count) {
				const monsterCopy = Utils.copy(monster);
				monsterCopy.id = Utils.guid();
				slot.monsters.push(monsterCopy);
			}

			const group = FactoryLogic.createEncounterGroup();
			group.slots.push(slot);

			const copy = Utils.copy(encounter);
			copy.groups.push(group);

			setEncounter(copy);
			props.onChange(copy);
		}
	};

	const getControlSection = () => {
		const getMainText = () => {
			if (encounter.heroes.length === 0) {
				return 'No Heroes';
			}

			if (!encounter.initiative) {
				return 'Initiative';
			}

			if (encounter.groups.every(g => g.encounterState !== 'current') && encounter.heroes.every(h => h.state.encounterState !== 'current')) {
				return 'Start Turn';
			}

			return 'End Turn';
		};

		const getSubText = () => {
			if (encounter.heroes.length === 0) {
				return 'To start, add your heroes';
			}

			if (!encounter.initiative) {
				return 'Click here to set initiative';
			}

			if (encounter.groups.every(g => g.encounterState !== 'current') && encounter.heroes.every(h => h.state.encounterState !== 'current')) {
				return 'Click here to start a turn';
			}

			return 'Click here to finish this turn';
		};

		const victory = EncounterLogic.getEncounterVictory(encounter);

		return (
			<div className='stats'>
				<NumberSpin min={0} value={encounter.round} onChange={setRound}>
					<Field orientation='vertical' label='Round' value={encounter.round || '-'} />
				</NumberSpin>
				{
					victory ?
						<Alert
							type='info'
							showIcon={true}
							message={(
								<div>
									The <b>{victory}</b> have won this encounter.
								</div>
							)}
						/>
						:
						<Button className='initiative-button' type='primary' disabled={encounter.heroes.length === 0} onClick={nextTurn}>
							<Space direction='vertical'>
								<div className='maintext'>
									{getMainText()}
								</div>
								<div className='subtext'>
									{getSubText()}
								</div>
							</Space>
						</Button>
				}
				<NumberSpin min={0} value={encounter.malice} onChange={setMalice}>
					<Field orientation='vertical' label='Malice' value={encounter.malice} />
				</NumberSpin>
			</div>
		);
	};

	const getCombatants = () => {
		const getMonsterGroup = (group: EncounterGroup, index: number) => {
			const duplicateGroup = () => {
				const copy = Utils.copy(encounter);
				const index = copy.groups.findIndex(g => g.id === group.id);
				if (index !== -1) {
					const groupCopy = Utils.copy(group);
					groupCopy.id = Utils.guid();
					groupCopy.slots.forEach(s => {
						s.id = Utils.guid();
						MonsterLogic.resetState(s.state);
						s.monsters.forEach(m => {
							m.id = Utils.guid();
							MonsterLogic.resetState(m.state);
						});
					});
					copy.groups.splice(index + 1, 0, groupCopy);
				}
				setEncounter(copy);
				props.onChange(copy);
			};

			const deleteGroup = () => {
				const copy = Utils.copy(encounter);
				copy.groups = copy.groups.filter(g => g.id !== group.id);
				setEncounter(copy);
				props.onChange(copy);
			};

			const setEncounterState = (value: 'ready' | 'current' | 'finished') => {
				const copy = Utils.copy(encounter);
				copy.groups
					.filter(g => g.id === group.id)
					.forEach(g => g.encounterState = value);
				setEncounter(copy);
				props.onChange(copy);
			};

			return (
				<EncounterGroupMonster
					key={group.id}
					group={group}
					index={index}
					encounter={encounter}
					onSelectMonster={monster => setSelectedMonster(monster)}
					onSelectMinionSlot={slot => setSelectedMinionSlot(slot)}
					onSetState={(_group, state) => setEncounterState(state)}
					onDuplicate={() => duplicateGroup()}
					onDelete={() => deleteGroup()}
				/>
			);
		};

		const getHeroGroup = (hero: Hero) => {
			const deleteHero = () => {
				const copy = Utils.copy(encounter);
				copy.heroes = copy.heroes.filter(h => h.id !== hero.id);
				setEncounter(copy);
				props.onChange(copy);
			};

			const setEncounterState = (value: 'ready' | 'current' | 'finished') => {
				const copy = Utils.copy(encounter);
				copy.heroes
					.filter(h => h.id === hero.id)
					.forEach(h => h.state.encounterState = value);
				setEncounter(copy);
				props.onChange(copy);
			};

			return (
				<EncounterGroupHero
					key={hero.id}
					hero={hero}
					onSelect={hero => setSelectedHero(hero)}
					onSetState={(_hero, state) => setEncounterState(state)}
					onDelete={() => deleteHero()}
				/>
			);
		};

		const sections = [ 'current', 'ready', 'finished' ];
		if (props.options.showDefeatedCombatants) {
			sections.push('defeated');
		}

		const combatants = EncounterLogic.getCombatants(encounter);

		return (
			<div className='encounter-groups'>
				{
					sections.map(section => {
						let heading = '';
						switch (section) {
							case 'current':
								heading = 'Acting Now';
								break;
							case 'ready':
								heading = 'Ready To Act';
								break;
							case 'finished':
								heading = 'Finished';
								break;
							case 'defeated':
								heading = 'Defeated';
								break;
						}

						return (
							<div key={section}>
								<HeaderText>{heading}</HeaderText>
								{
									combatants
										.filter(c => c.section === section)
										.map(c => {
											switch (c.type) {
												case 'group': {
													const group = encounter.groups.find(g => g.id === c.id);
													return group ? getMonsterGroup(group, encounter.groups.indexOf(group)) : null;
												}
												case 'hero': {
													const hero = encounter.heroes.find(h => h.id === c.id);
													return hero ? getHeroGroup(hero) : null;
												}
											}
										})
								}
								{
									combatants.filter(c => c.section === section).length === 0 ?
										<Empty text='No-one' />
										: null
								}
							</div>
						);
					})
				}
			</div>
		);
	};

	const getTerrain = () => {
		if (encounter.terrain.length === 0) {
			return (
				<Empty />
			);
		}

		const getTerrainSlot = (terrain: Terrain) => {
			const duplicateTerrain = () => {
				const copy = Utils.copy(encounter);
				copy.terrain.forEach(ts => {
					if (ts.terrain.map(t => t.id).includes(terrain.id)) {
						const terrainCopy = Utils.copy(terrain);
						terrainCopy.id = Utils.guid();
						terrainCopy.state.staminaDamage = 0;
						ts.terrain.push(terrainCopy);
					}
				});
				setEncounter(copy);
				props.onChange(copy);
			};

			const deleteTerrain = () => {
				const copy = Utils.copy(encounter);
				copy.terrain.forEach(ts => {
					ts.terrain = ts.terrain.filter(t => t.id !== terrain.id);
				});
				setEncounter(copy);
				props.onChange(copy);
			};

			return (
				<EncounterGroupTerrain
					key={terrain.id}
					terrain={terrain}
					onSelect={terrain => setSelectedTerrain(terrain)}
					onDuplicate={() => duplicateTerrain()}
					onDelete={() => deleteTerrain()}
				/>
			);
		};

		return (
			<div className='encounter-groups'>
				<div>
					{encounter.terrain.flatMap(ts => ts.terrain).map(getTerrainSlot)}
				</div>
			</div>
		);
	};

	const getMalice = () => {
		const monsterGroups = EncounterLogic.getMonsterGroups(encounter, props.sourcebooks);
		if (monsterGroups.length === 0) {
			return null;
		}

		const getMaliceItem = (m: FeatureMalice | FeatureAbility) => {
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
								<HeroicResourceBadge value={cost} />
							</Button>
							:
							<div className='malice-progress'>
								<Progress percent={100 * encounter.malice / cost} steps={cost} showInfo={false} />
							</div>
					}
				</SelectablePanel>
			);
		};

		return (
			<Space direction='vertical' style={{ width: '100%' }}>
				<HeaderText>Malice</HeaderText>
				<div className='malice'>
					{MonsterData.malice.map(getMaliceItem)}
				</div>
				{
					monsterGroups.filter(group => group.malice.length > 0).map(group => (
						<div key={group.id}>
							<HeaderText>{group.name} Malice</HeaderText>
							<div className='malice'>
								{group.malice.map(getMaliceItem)}
							</div>
						</div>
					))
				}
			</Space>
		);
	};

	const getNotes = () => {
		return (
			<>
				{
					encounter.description ?
						<>
							<HeaderText>Encounter Description</HeaderText>
							<Markdown text={encounter.description} />
						</>
						: null
				}
				{
					encounter.notes.map(note => (
						<div key={note.id}>
							<HeaderText>{note.name}</HeaderText>
							<Markdown text={note.description} />
						</div>
					))
				}
				{encounter.objective ? <EncounterObjectivePanel objective={encounter.objective} mode={PanelMode.Full} /> : null}
				{(encounter.notes.length === 0) && !encounter.objective ? <Empty text='No notes' /> : null}
			</>
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
		let className = 'encounter-run-panel';
		if (isSmall) {
			className += ' is-small';
		}

		return (
			<ErrorBoundary>
				<div className={className} id={encounter.id}>
					<HeaderText level={1}>{encounter.name || 'Unnamed Encounter'}</HeaderText>
					{getControlSection()}
					<Tabs
						items={[
							{
								key: 'combatants',
								label: 'Combatants',
								children: getCombatants()
							},
							{
								key: 'terrain',
								label: 'Terrain',
								children: getTerrain()
							},
							{
								key: 'malice',
								label: 'Malice',
								children: getMalice()
							},
							{
								key: 'notes',
								label: 'Notes',
								children: getNotes()
							},
							{
								key: 'reminders',
								label: 'Reminders',
								children: getReminders()
							}
						]}
						activeKey={tab}
						onChange={setTab}
						tabBarExtraContent={
							tab === 'combatants' ?
								<Flex gap={5}>
									<Button block={true} type={encounter.heroes.length === 0 ? 'primary' : 'default'} onClick={() => setAddingHeroes(true)}>Add hero(es)</Button>
									<Button block={true} onClick={() => setAddingMonsters(true)}>Add a monster</Button>
								</Flex>
								: null
						}
					/>
				</div>
				<Drawer open={addingHeroes} onClose={() => setAddingHeroes(false)} closeIcon={null} width='500px'>
					<HeroSelectModal
						heroes={props.heroes}
						sourcebooks={props.sourcebooks}
						options={props.options}
						onClose={() => setAddingHeroes(false)}
						onSelect={heroes => {
							setAddingHeroes(false);
							addHeroes(heroes);
						}}
					/>
				</Drawer>
				<Drawer open={addingMonsters} onClose={() => setAddingMonsters(false)} closeIcon={null} width='500px'>
					<MonsterSelectModal
						type='companion'
						sourcebooks={props.sourcebooks}
						options={props.options}
						selectOriginal={true}
						onClose={() => setAddingMonsters(false)}
						onSelect={m => {
							setAddingMonsters(false);
							addSlot(m);
						}}
					/>
				</Drawer>
				<Drawer open={selectingGroup} onClose={() => setSelectingGroup(false)} closeIcon={null} width='500px'>
					{
						selectingGroup ?
							<EncounterTurnModal
								encounter={encounter}
								updateEncounter={enc => {
									setEncounter(enc);
									props.onChange(enc);
								}}
								onClose={() => setSelectingGroup(false)}
							/>
							: null
					}
				</Drawer>
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
									props.onChange(copy);
								}}
							/>
							: null
					}
				</Drawer>
				<Drawer open={!!selectedHero} onClose={() => setSelectedHero(null)} closeIcon={null} width='500px'>
					{
						selectedHero ?
							<HeroStateModal
								hero={selectedHero}
								sourcebooks={props.sourcebooks}
								options={props.options}
								startPage={HeroStatePage.Vitals}
								showEncounterControls={true}
								onClose={() => setSelectedHero(null)}
								onChange={hero => {
									const copy = Utils.copy(encounter);
									const index = copy.heroes.findIndex(h => h.id === hero.id);
									if (index !== -1) {
										copy.heroes[index] = hero;
									}
									setEncounter(copy);
									props.onChange(copy);
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
									props.onChange(copy);
								}}
							/>
							: null
					}
				</Drawer>
				<Drawer open={!!selectedMinionSlot} onClose={() => setSelectedMinionSlot(null)} closeIcon={null} width='500px'>
					{
						selectedMinionSlot ?
							<Modal
								content={
									<div style={{ padding: '20px' }}>
										<MinionGroupHealthPanel
											slot={selectedMinionSlot}
											encounter={encounter}
											onChange={slot => {
												const copy = Utils.copy(encounter);
												copy.groups.forEach(g => {
													const index = g.slots.findIndex(s => s.id === slot.id);
													if (index !== -1) {
														g.slots[index] = slot;
													}
												});
												setEncounter(copy);
												props.onChange(copy);
											}}
										/>
									</div>
								}
								onClose={() => setSelectedMinionSlot(null)}
							/>
							: null
					}
				</Drawer>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
