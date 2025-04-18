import { Alert, Button, Divider, Drawer, Flex, Popover, Progress, Segmented, Space, Tabs, Tag } from 'antd';
import { EllipsisOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup, EncounterSlot } from '../../../../models/encounter';
import { HeroToken, MonsterToken } from '../../../controls/token/token';
import { AbilityPanel } from '../../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Collections } from '../../../../utils/collections';
import { ConditionLogic } from '../../../../logic/condition-logic';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { EncounterLogic } from '../../../../logic/encounter-logic';
import { EncounterObjectivePanel } from '../../elements/encounter-objective/encounter-objective-panel';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroSelectModal } from '../../../modals/hero-select/hero-select-modal';
import { HeroStateModal } from '../../../modals/hero-state/hero-state-modal';
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { HeroicResourceBadge } from '../../../controls/badge/badge';
import { Markdown } from '../../../controls/markdown/markdown';
import { MinionGroupHealthPanel } from '../../health/health-panel';
import { Modal } from '../../../modals/modal/modal';
import { Monster } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MonsterSelectModal } from '../../../modals/monster-select/monster-select-modal';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Terrain } from '../../../../models/terrain';
import { TerrainLogic } from '../../../../logic/terrain-logic';
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
	const [ tab, setTab ] = useState<string>('1');
	const [ addingHeroes, setAddingHeroes ] = useState<boolean>(false);
	const [ addingMonsters, setAddingMonsters ] = useState<boolean>(false);
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

	const nextRound = () => {
		const copy = Utils.copy(encounter);
		copy.malice += EncounterLogic.getMaliceGained(copy);
		copy.round += 1;
		copy.groups.forEach(g => {
			g.acted = false;
		});
		copy.heroes.forEach(h => {
			h.state.acted = false;
		});
		setEncounter(copy);
		props.onChange(copy);
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

	const getCombatants = () => {
		const groups = encounter.groups.filter(g => g.slots.length > 0);
		if ((groups.length === 0) && (encounter.heroes.length === 0)) {
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
								<Button type='text' icon={<IdcardOutlined />} onClick={() => setSelectedMinionSlot(slot)} />
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
									<MonsterToken monster={monster} />
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
									{MonsterLogic.isWinded(monster) ? <Tag>Winded</Tag> : null}
									{monster.state.hidden ? <Tag>Hidden</Tag> : null}
									{monster.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
								</div>
								<Button type='text' icon={<IdcardOutlined />} onClick={() => setSelectedMonster(monster)} />
							</div>
						))
					}
				</div>
			);
		};

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

			const setActed = (value: boolean) => {
				const copy = Utils.copy(encounter);
				copy.groups.filter(g => g.id === group.id).forEach(g => g.acted = value);
				setEncounter(copy);
				props.onChange(copy);
			};

			const defeated = group.slots.every(s => s.state.defeated || s.monsters.every(m => m.state.defeated));
			let className = 'encounter-group';
			if (defeated) {
				className += ' defeated';
			} else if (group.acted) {
				className += ' acted';
			}

			return (
				<div key={group.id} className={className}>
					<div className='group-column'>
						<Flex align='center' justify='space-between'>
							<div className='group-name'>
								Group {(index + 1).toString()}
							</div>
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Button block={true} onClick={duplicateGroup}>Duplicate</Button>
										<DangerButton onConfirm={deleteGroup} />
									</div>
								)}
							>
								<Button type='text' icon={<EllipsisOutlined />} />
							</Popover>
						</Flex>
						{
							defeated ?
								null
								:
								<Segmented
									block={true}
									options={[
										{ value: false, label: 'Ready' },
										{ value: true, label: 'Acted' }
									]}
									value={group.acted}
									onChange={setActed}
								/>
						}
					</div>
					<div className='encounter-slots'>
						{group.slots.map(getSlot)}
					</div>
				</div>
			);
		};

		const getHeroGroup = (hero: Hero) => {
			const deleteHero = () => {
				const copy = Utils.copy(encounter);
				copy.heroes = copy.heroes.filter(h => h.id !== hero.id);
				setEncounter(copy);
				props.onChange(copy);
			};

			const setActed = (value: boolean) => {
				const copy = Utils.copy(encounter);
				copy.heroes.filter(h => h.id === hero.id).forEach(h => h.state.acted = value);
				setEncounter(copy);
				props.onChange(copy);
			};

			let className = 'encounter-group';
			if (hero.state.defeated) {
				className += ' defeated';
			} else if (hero.state.acted) {
				className += ' acted';
			}

			const getStaminaDescription = () => {
				const max = HeroLogic.getStamina(hero);

				let str = `${max}`;
				if (hero.state.staminaDamage > 0) {
					str = `${Math.max(max - hero.state.staminaDamage, 0)} / ${max}`;
				}
				if (hero.state.staminaTemp > 0) {
					str += ` +${hero.state.staminaTemp}`;
				}

				return str;
			};

			return (
				<div key={hero.id} className={className}>
					<div className='group-column'>
						<Flex align='center' justify='space-between'>
							<div className='group-name'>
								Hero
							</div>
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<DangerButton onConfirm={deleteHero} />
									</div>
								)}
							>
								<Button type='text' icon={<EllipsisOutlined />} />
							</Popover>
						</Flex>
						{
							hero.state.defeated ?
								null
								:
								<Segmented
									block={true}
									options={[
										{ value: false, label: 'Ready' },
										{ value: true, label: 'Acted' }
									]}
									value={hero.state.acted}
									onChange={setActed}
								/>
						}
					</div>
					<div className='encounter-slots'>
						<div className='encounter-slot'>
							<div className={hero.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'}>
								<div className='name-column'>
									<HeroToken hero={hero} />
									<div>
										<div>{hero.name || 'Unnamed Hero'}</div>
										<div style={{ fontSize: '10px', opacity: 0.7 }}>{HeroLogic.getHeroDescription(hero)}</div>
									</div>
								</div>
								<div className='stamina-column'>
									{getStaminaDescription()}
									<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
								</div>
								<div className='conditions-column'>
									{HeroLogic.isWinded(hero) ? <Tag>Winded</Tag> : null}
									{hero.state.hidden ? <Tag>Hidden</Tag> : null}
									{hero.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
								</div>
								<Button type='text' icon={<IdcardOutlined />} onClick={() => setSelectedHero(hero)} />
							</div>
						</div>
					</div>
				</div>
			);
		};

		return (
			<div className='encounter-groups'>
				{groups.map(getMonsterGroup)}
				{encounter.heroes.map(getHeroGroup)}
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
				<div key={terrain.id} className='encounter-group'>
					<div className='group-column'>
						<Flex align='center' justify='space-between'>
							<div className='group-name'>
								Terrain
							</div>
							<Popover
								trigger='click'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Button block={true} onClick={duplicateTerrain}>Duplicate</Button>
										<DangerButton onConfirm={deleteTerrain} />
									</div>
								)}
							>
								<Button type='text' icon={<EllipsisOutlined />} />
							</Popover>
						</Flex>
					</div>
					<div className='encounter-slots'>
						<div className='encounter-slot'>
							<div className='encounter-slot-row'>
								<div className='name-column'>
									{terrain.name}
								</div>
								<div className='stamina-column'>
									{TerrainLogic.getStaminaValue(terrain)}
									<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
								</div>
								<div className='conditions-column'>
								</div>
								<Button type='text' icon={<IdcardOutlined />} onClick={() => setSelectedTerrain(terrain)} />
							</div>
						</div>
					</div>
				</div>
			);
		};

		return (
			<div className='encounter-groups'>
				{encounter.terrain.flatMap(ts => ts.terrain).map(getTerrainSlot)}
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
															<HeroicResourceBadge value={cost} />
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
				<Markdown text={encounter.description} />
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

		const monstersDone = encounter.groups
			.filter(g => g.slots.length > 0)
			.every(g => g.acted || g.slots.every(s => s.state.defeated || s.monsters.every(m => m.state.defeated)));
		const heroesDone = encounter.heroes.every(h => h.state.acted || h.state.defeated);
		const allDone = monstersDone && heroesDone;
		const roundIsNotFinished = (encounter.round > 0) && !allDone;

		const getRoundButtonText = () => {
			if (roundIsNotFinished) {
				return `Round ${encounter.round}`;
			}

			return `Start Round ${encounter.round + 1}`;
		};

		const getRoundButtonInfo = () => {
			if (roundIsNotFinished) {
				return 'Some combatants have not acted';
			}

			const malice = EncounterLogic.getMaliceGained(encounter);
			if (malice > 0) {
				return `Gain ${EncounterLogic.getMaliceGained(encounter)} malice`;
			}

			if (encounter.round === 0) {
				return `Gain ${encounter.round + 1} + (number of heroes) + (average victories) malice`;
			}

			return `Gain ${encounter.round + 1} + (number of heroes) malice`;
		};

		return (
			<ErrorBoundary>
				<div className={className} id={encounter.id}>
					<HeaderText level={1}>{encounter.name || 'Unnamed Encounter'}</HeaderText>
					<div className='stats'>
						<NumberSpin min={0} value={encounter.round} onChange={setRound}>
							<Field orientation='vertical' label='Round' value={encounter.round || '-'} />
						</NumberSpin>
						<Button className='round-button' type='primary' disabled={roundIsNotFinished} onClick={nextRound}>
							<Space direction='vertical'>
								<div className='maintext'>
									{getRoundButtonText()}
								</div>
								<div className='subtext'>
									{getRoundButtonInfo()}
								</div>
							</Space>
						</Button>
						<NumberSpin min={0} value={encounter.malice} onChange={setMalice}>
							<Field orientation='vertical' label='Malice' value={encounter.malice} />
						</NumberSpin>
					</div>
					<Tabs
						items={[
							{
								key: '1',
								label: 'Combatants',
								children: getCombatants()
							},
							{
								key: '2',
								label: 'Terrain',
								children: getTerrain()
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
						activeKey={tab}
						onChange={setTab}
						tabBarExtraContent={
							tab === '1' ?
								<Flex gap={5}>
									<Button block={true} onClick={() => setAddingHeroes(true)}>Add hero(es)</Button>
									<Button block={true} onClick={() => setAddingMonsters(true)}>Add a monster</Button>
								</Flex>
								: null
						}
					/>
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
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
