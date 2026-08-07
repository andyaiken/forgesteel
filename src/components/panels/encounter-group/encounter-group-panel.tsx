import { Alert, Button, Flex, Popover, Segmented, Space, Tag, Tooltip } from 'antd';
import { DownOutlined, EllipsisOutlined, HeartFilled, PlusOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup } from '@/models/encounter';
import { HeroInfo, MonsterInfo, TerrainInfo } from '@/components/panels/token/token';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { ConditionLogic } from '@/logic/condition-logic';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { DropdownButton } from '@/components/controls/dropdown-button/dropdown-button';
import { EncounterSlot } from '@/models/encounter';
import { FactionType } from '@/enums/faction-type';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Terrain } from '@/models/terrain';
import { TerrainLogic } from '@/logic/terrain-logic';
import { TextInput } from '@/components/controls/text-input/text-input';
import { Toggle } from '@/components/controls/toggle/toggle';
import { useDimensions } from '@/hooks/use-dimensions';
import { useState } from 'react';

import './encounter-group-panel.scss';

const widthBase = 500;
const widthStaminaColumn = 90;
const widthCharacteristicsColumn = 80;
const widthStatsColumn = 75;

interface EncounterGroupHeroProps {
	hero: Hero;
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	onSelect: (hero: Hero) => void;
	onSelectMonster: (monster: Monster, monsterGroupID: string) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
	onSetState: (hero: Hero, value: 'ready' | 'current' | 'finished') => void;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onSetMonsterDefeated: (monster: Monster, value: boolean) => void;
	onSetMonsterHidden: (monster: Monster, value: boolean) => void;
	onDelete: (hero: Hero) => void;
}

export const EncounterGroupHero = (props: EncounterGroupHeroProps) => {
	const [ setRef, size ] = useDimensions();

	const showStamina = size.width >= (widthBase + widthStaminaColumn);
	const showCharacteristics = size.width >= (widthBase + widthStaminaColumn + widthCharacteristicsColumn);
	const showStats = size.width >= (widthBase + widthStaminaColumn + widthCharacteristicsColumn + widthStatsColumn);

	let className = 'encounter-group';
	if (props.hero.state.defeated) {
		className += ' defeated';
	} else if (props.hero.state.encounterState === 'finished') {
		className += ' acted';
	}

	const getStaminaDescription = () => {
		const max = HeroLogic.getStamina(props.hero);

		let str = `${max}`;
		if (props.hero.state.staminaDamage > 0) {
			str = `${Math.max(max - props.hero.state.staminaDamage, 0)} / ${max}`;
		}
		if (props.hero.state.staminaTemp > 0) {
			str += ` +${props.hero.state.staminaTemp}`;
		}

		return str;
	};

	return (
		<div className={className}>
			<div className='group-column hero'>
				<Flex align='center' justify='space-between'>
					<div className='group-name'>
						Hero
					</div>
					<Popover
						trigger='click'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Segmented
									disabled={props.hero.state.defeated}
									options={[
										{ value: 'ready', label: 'Ready To Act' },
										{ value: 'current', label: 'Acting Now' },
										{ value: 'finished', label: 'Finished' }
									]}
									value={props.hero.state.encounterState}
									onChange={value => props.onSetState(props.hero, value as 'ready' | 'current' | 'finished')}
								/>
								<DangerButton mode='block' onConfirm={() => props.onDelete(props.hero)} />
							</div>
						)}
					>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Popover>
				</Flex>
			</div>
			<div className='encounter-slots hero'>
				<div className='encounter-slot' ref={setRef}>
					<Flex key='minions' align='center' gap={5}>
						<div
							style={{ flex: '1 1 0' }}
							className={props.hero.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'}
							onClick={() => props.onSelect(props.hero)}
						>
							<div className='name-column'>
								<HeroInfo hero={props.hero} />
							</div>
							{
								showStamina ?
									HeroLogic.getStamina(props.hero) === 0 ?
										<div className='stamina-column' />
										:
										<div className='stamina-column'>
											{getStaminaDescription()}
											<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
										</div>
									: null
							}
							{
								showCharacteristics ?
									<div className='characteristics-column'>
										<div className='characteristics-column-item'>
											<div>M</div>
											<div>{HeroLogic.getCharacteristic(props.hero, Characteristic.Might)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>A</div>
											<div>{HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>R</div>
											<div>{HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>I</div>
											<div>{HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>P</div>
											<div>{HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)}</div>
										</div>
									</div>
									: null
							}
							{
								showStats ?
									<div className='stats-column'>
										<div className='stats-column-item'>
											<div>Spd</div>
											<div>{HeroLogic.getSpeed(props.hero).value}</div>
										</div>
										<div className='stats-column-item'>
											<div>Stab</div>
											<div>{HeroLogic.getStability(props.hero)}</div>
										</div>
										<div className='stats-column-item'>
											<div>FS</div>
											<div>-</div>
										</div>
									</div>
									: null
							}
							<div className='conditions-column'>
								<Flex gap={3}>
									{[ 'healthy', 'injured' ].includes(HeroLogic.getCombatState(props.hero)) ? null : <Tag variant='outlined'>{Format.capitalize(HeroLogic.getCombatState(props.hero))}</Tag>}
									{props.hero.state.hidden ? <Tag variant='outlined'>Hidden</Tag> : null}
									{props.hero.state.conditions.map(c => <Tooltip key={c.id} title={ConditionLogic.getDescription(c.type)}><Tag variant='outlined'>{ConditionLogic.getFullDescription(c)}</Tag></Tooltip>)}
								</Flex>
							</div>
						</div>
						{
							HeroLogic.getCompanions(props.hero).length + HeroLogic.getRetainers(props.hero).length + HeroLogic.getSummons(props.hero).length > 0 ?
								<Popover
									trigger='click'
									content={
										<Space orientation='vertical' style={{ width: '100%' }}>
											{
												HeroLogic.getCompanions(props.hero).map(m => (
													<Button
														key={m.id}
														type='text'
														block={true}
														onClick={e => {
															e.stopPropagation();
															props.onAddSquad(props.hero, m, 1);
														}}
													>
														Companion: {m.name}
													</Button>
												))
											}
											{
												HeroLogic.getRetainers(props.hero).map(m => (
													<Button
														key={m.id}
														type='text'
														block={true}
														onClick={e => {
															e.stopPropagation();
															props.onAddSquad(props.hero, m, 1);
														}}
													>
														Retainer: {m.name}
													</Button>
												))
											}
											{
												HeroLogic.getSummons(props.hero).map(m => (
													<Button
														key={m.id}
														type='text'
														block={true}
														onClick={e => {
															e.stopPropagation();
															props.onAddSquad(props.hero, m.monster, m.info.count);
														}}
													>
														{m.info.count === 1 ? `Summon: ${m.name}` : `Summon: ${m.name} (x${m.info.count})`}
													</Button>
												))
											}
										</Space>
									}
								>
									<Button
										type='text'
										icon={<PlusOutlined />}
										title='Add a controlled monster'
										onClick={e => e.stopPropagation()}
									/>
								</Popover>
								: null
						}
					</Flex>
					{
						props.hero.state.controlledSlots.map(slot => (
							<div key={slot.id} className='encounter-slot controlled-slot'>
								<Flex align='center' style={{ paddingLeft: '5px' }}>
									<b style={{ flex: '1 1 0' }}>Controlling</b>
									<Button type='text' icon={<PlusOutlined />} onClick={() => props.onAddMonsterToSquad(props.hero, slot.id)} />
									<DangerButton mode='clear' onConfirm={() => props.onRemoveSquad(props.hero, slot.id)} />
								</Flex>
								<MonsterSlot
									slot={slot}
									encounter={props.encounter}
									sourcebooks={props.sourcebooks}
									onSelectMonster={props.onSelectMonster}
									onSelectMinionSlot={props.onSelectMinionSlot}
									onSetDefeated={props.onSetMonsterDefeated}
									onSetHidden={props.onSetMonsterHidden}
								/>
								{slot.monsters.length === 0 ? <div>Empty</div> : null}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

interface EncounterGroupMonsterProps {
	group: EncounterGroup;
	index: number;
	encounter: Encounter;
	sourcebooks: Sourcebook[];
	onSelectMonster: (monster: Monster, monsterGroupID: string) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
	onSetName: (group: EncounterGroup, value: string) => void;
	onSetFaction: (group: EncounterGroup, value: FactionType) => void;
	onSetState: (group: EncounterGroup, value: 'ready' | 'current' | 'finished') => void;
	onDuplicate: (group: EncounterGroup) => void;
	onDelete: (group: EncounterGroup) => void;
	onSetDefeated: (monster: Monster, value: boolean) => void;
	onSetHidden: (monster: Monster, value: boolean) => void;
	onMoveSlot: (slot: EncounterSlot, toGroupID: string) => void;
	onCopySlot: (slot: EncounterSlot, toGroupID: string) => void;
}

export const EncounterGroupMonster = (props: EncounterGroupMonsterProps) => {
	const defeated = props.group.slots.every(s => s.state.defeated || s.monsters.every(m => m.state.defeated));
	let className = 'encounter-group';
	if (defeated) {
		className += ' defeated';
	} else if (props.group.encounterState === 'finished') {
		className += ' acted';
	}

	return (
		<div className={className}>
			<div className={`group-column ${props.group.faction.toLowerCase()}`}>
				<Flex align='center' justify='space-between'>
					<div className='group-name'>
						{props.group.name || `Group ${props.index + 1}`}
					</div>
					<Popover
						trigger='click'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '300px' }}>
								<TextInput
									placeholder='Group name'
									allowClear={true}
									value={props.group.name}
									onChange={value => props.onSetName(props.group, value)}
								/>
								<Segmented
									block={true}
									disabled={defeated}
									options={[
										{ value: 'ready', label: 'Ready To Act' },
										{ value: 'current', label: 'Acting Now' },
										{ value: 'finished', label: 'Finished' }
									]}
									value={props.group.encounterState}
									onChange={value => props.onSetState(props.group, value as 'ready' | 'current' | 'finished')}
								/>
								<Segmented
									block={true}
									disabled={defeated}
									options={[ FactionType.Enemy, FactionType.Ally ].map(ft => ({ value: ft, label: ft }))}
									value={props.group.faction}
									onChange={value => props.onSetFaction(props.group, value)}
								/>
								{
									props.group.slots.map(slot => (
										<DropdownButton
											key={`mode-${slot.id}`}
											label={`Move ${slot.monsters[0].name}${slot.monsters.length > 1 ? ' (et al)' : ''} To`}
											items={[
												...props.encounter.groups
													.filter(g => g.id !== props.group.id)
													.map(g => ({ key: g.id, label: <Button type='text' block={true}>{g.name || `Group ${props.encounter.groups.indexOf(g) + 1}`}</Button> })),
												{ key: '', label: <Button type='text' block={true}>New Group</Button> }
											]}
											onClick={toGroupID => props.onMoveSlot(slot, toGroupID)}
										/>
									))
								}
								{
									props.group.slots.map(slot => (
										<DropdownButton
											key={`copy-${slot.id}`}
											label={`Copy ${slot.monsters[0].name}${slot.monsters.length > 1 ? ' (et al)' : ''} To`}
											items={[
												...props.encounter.groups
													.filter(g => g.id !== props.group.id)
													.map(g => ({ key: g.id, label: <Button type='text' block={true}>{g.name || `Group ${props.encounter.groups.indexOf(g) + 1}`}</Button> })),
												{ key: '', label: <Button type='text' block={true}>New Group</Button> }
											]}
											onClick={toGroupID => props.onCopySlot(slot, toGroupID)}
										/>
									))
								}
								<Button block={true} onClick={() => props.onDuplicate(props.group)}>Duplicate Group</Button>
								<DangerButton mode='block' onConfirm={() => props.onDelete(props.group)} />
							</div>
						)}
					>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Popover>
				</Flex>
			</div>
			<div className={`encounter-slots ${props.group.faction.toLowerCase()}`}>
				{
					props.group.slots.map(slot => (
						<MonsterSlot
							key={slot.id}
							slot={slot}
							encounter={props.encounter}
							sourcebooks={props.sourcebooks}
							onSelectMonster={props.onSelectMonster}
							onSelectMinionSlot={props.onSelectMinionSlot}
							onSetDefeated={props.onSetDefeated}
							onSetHidden={props.onSetHidden}
						/>
					))
				}
			</div>
		</div>
	);
};

interface MonsterSlotProps {
	slot: EncounterSlot;
	encounter?: Encounter;
	sourcebooks: Sourcebook[];
	onSelectMonster: (monster: Monster, monsterGroupID: string) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
	onSetDefeated: (monster: Monster, value: boolean) => void;
	onSetHidden: (monster: Monster, value: boolean) => void;
}

export const MonsterSlot = (props: MonsterSlotProps) => {
	const [ setRef, size ] = useDimensions();

	const showStamina = size.width >= (widthBase + widthStaminaColumn);
	const showCharacteristics = size.width >= (widthBase + widthStaminaColumn + widthCharacteristicsColumn);
	const showStats = size.width >= (widthBase + widthStaminaColumn + widthCharacteristicsColumn + widthStatsColumn);

	const isMinionSlot = props.slot.monsters.every(m => m.role.organization === MonsterOrganizationType.Minion);
	const [ showMonsters, setShowMonsters ] = useState<boolean>(!isMinionSlot);

	const monsterGroup = SourcebookLogic.getMonsterGroup(props.sourcebooks, props.slot.monsterID);

	const getMinionCountMessage = () => {
		if (!isMinionSlot) {
			return null;
		}

		const staminaRemaining = Collections.sum(props.slot.monsters, m => MonsterLogic.getStamina(m)) - props.slot.state.staminaDamage;
		const staminaPerMinion = Collections.mean(props.slot.monsters, m => MonsterLogic.getStamina(m));
		const minionsExpected = Math.max(Math.ceil(staminaRemaining / staminaPerMinion), 0);
		const minionsAlive = props.slot.monsters.filter(m => !m.state.defeated).length;

		if (minionsAlive !== minionsExpected) {
			return (
				<Alert
					type='warning'
					showIcon={true}
					title={`There should be ${minionsExpected} active minions, not ${minionsAlive}.`}
				/>
			);
		}

		return null;
	};

	const getMinionCaptainTag = () => {
		if (!isMinionSlot) {
			return null;
		}

		if (!props.encounter) {
			return null;
		}

		if (props.slot.state.captainID) {
			const captain = props.encounter.groups
				.flatMap(g => g.slots)
				.flatMap(s => s.monsters)
				.find(m => m.id === props.slot.state.captainID);
			if (captain) {
				return (
					<Tag variant='outlined'>
						Captain: {captain.name}
					</Tag>
				);
			}
		}

		return (
			<Tag variant='outlined'>No captain</Tag>
		);
	};

	return (
		<div key={props.slot.id} className='encounter-slot' ref={setRef}>
			{
				isMinionSlot ?
					<Flex key='minions' align='center' gap={5}>
						<div
							style={{ flex: '1 1 0' }}
							className={props.slot.state.defeated ? 'encounter-slot-row minion defeated' : 'encounter-slot-row minion'}
							onClick={() => props.onSelectMinionSlot(props.slot)}
						>
							<div className='name-column'>
								<b>Minions</b>
							</div>
							{
								showStamina ?
									<div className='stamina-column'>
										{MonsterLogic.getMinionStaminaDescription(props.slot)}
										<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
									</div>
									: null
							}
							{
								showCharacteristics ?
									<div className='characteristics-column'>
										<div className='characteristics-column-item'>
											<div>M</div>
											<div>{MonsterLogic.getCharacteristic(props.slot.monsters[0], Characteristic.Might)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>A</div>
											<div>{MonsterLogic.getCharacteristic(props.slot.monsters[0], Characteristic.Agility)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>R</div>
											<div>{MonsterLogic.getCharacteristic(props.slot.monsters[0], Characteristic.Reason)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>I</div>
											<div>{MonsterLogic.getCharacteristic(props.slot.monsters[0], Characteristic.Intuition)}</div>
										</div>
										<div className='characteristics-column-item'>
											<div>P</div>
											<div>{MonsterLogic.getCharacteristic(props.slot.monsters[0], Characteristic.Presence)}</div>
										</div>
									</div>
									: null
							}
							{
								showStats ?
									<div className='stats-column'>
										<div className='stats-column-item'>
											<div>Spd</div>
											<div>{MonsterLogic.getSpeed(props.slot.monsters[0]).value}</div>
										</div>
										<div className='stats-column-item'>
											<div>Stab</div>
											<div>{props.slot.monsters[0].stability}</div>
										</div>
										<div className='stats-column-item'>
											<div>FS</div>
											<div>{props.slot.monsters[0].freeStrikeDamage}</div>
										</div>
									</div>
									: null
							}
							<div className='conditions-column'>
								<Flex gap={3}>
									{getMinionCaptainTag()}
									{props.slot.state.conditions.map(c => <Tooltip key={c.id} title={ConditionLogic.getDescription(c.type)}><Tag variant='outlined'>{ConditionLogic.getFullDescription(c)}</Tag></Tooltip>)}
								</Flex>
							</div>
						</div>
						<Button
							type='text'
							icon={showMonsters ? <DownOutlined rotate={180} /> : <DownOutlined />}
							onClick={e => {
								e.stopPropagation();
								setShowMonsters(!showMonsters);
							}}
						/>
					</Flex>
					: null
			}
			{
				isMinionSlot ? getMinionCountMessage() : null
			}
			{
				showMonsters ?
					props.slot.monsters.map(monster => (
						<Flex key={monster.id} align='center' gap={5}>
							<div
								style={{ flex: '1 1 0' }}
								className={props.slot.state.defeated || monster.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'}
								onClick={() => props.onSelectMonster(monster, monsterGroup ? monsterGroup.id : '')}
							>
								<div className='name-column'>
									<MonsterInfo monster={monster} />
								</div>
								{
									showStamina ?
										isMinionSlot ?
											<div className='stamina-column' />
											:
											<div className='stamina-column'>
												{MonsterLogic.getStaminaDescription(monster)}
												<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
											</div>
										: null
								}
								{
									showCharacteristics ?
										<div className='characteristics-column'>
											<div className='characteristics-column-item'>
												<div>M</div>
												<div>{MonsterLogic.getCharacteristic(monster, Characteristic.Might)}</div>
											</div>
											<div className='characteristics-column-item'>
												<div>A</div>
												<div>{MonsterLogic.getCharacteristic(monster, Characteristic.Agility)}</div>
											</div>
											<div className='characteristics-column-item'>
												<div>R</div>
												<div>{MonsterLogic.getCharacteristic(monster, Characteristic.Reason)}</div>
											</div>
											<div className='characteristics-column-item'>
												<div>I</div>
												<div>{MonsterLogic.getCharacteristic(monster, Characteristic.Intuition)}</div>
											</div>
											<div className='characteristics-column-item'>
												<div>P</div>
												<div>{MonsterLogic.getCharacteristic(monster, Characteristic.Presence)}</div>
											</div>
										</div>
										: null
								}
								{
									showStats ?
										<div className='stats-column'>
											<div className='stats-column-item'>
												<div>Spd</div>
												<div>{MonsterLogic.getSpeed(monster).value}</div>
											</div>
											<div className='stats-column-item'>
												<div>Stab</div>
												<div>{monster.stability}</div>
											</div>
											<div className='stats-column-item'>
												<div>FS</div>
												<div>{props.slot.monsters[0].freeStrikeDamage}</div>
											</div>
										</div>
										: null
								}
								<div className='conditions-column'>
									<Flex gap={3}>
										{[ 'healthy', 'injured' ].includes(MonsterLogic.getCombatState(monster)) ? null : <Tag variant='outlined'>{Format.capitalize(MonsterLogic.getCombatState(monster))}</Tag>}
										{monster.state.hidden ? <Tag variant='outlined'>Hidden</Tag> : null}
										{monster.state.conditions.map(c => <Tooltip key={c.id} title={ConditionLogic.getDescription(c.type)}><Tag variant='outlined'>{ConditionLogic.getFullDescription(c)}</Tag></Tooltip>)}
									</Flex>
								</div>
							</div>
							<Popover
								trigger='click'
								content={(
									<div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<Segmented
											block={true}
											options={[
												{ value: true, label: 'Defeated' },
												{ value: false, label: 'Active' }
											]}
											value={monster.state.defeated}
											onChange={value => props.onSetDefeated(monster, value)}
										/>
										<Toggle label='Hidden' value={monster.state.hidden} onChange={value => props.onSetHidden(monster, value)} />
									</div>
								)}
							>
								<Button type='text' icon={<EllipsisOutlined />} />
							</Popover>
						</Flex>
					))
					: null
			}
		</div>
	);
};

interface EncounterGroupTerrainProps {
	terrain: Terrain;
	onSelect: (terrain: Terrain) => void;
	onDuplicate: (terrain: Terrain) => void;
	onDelete: (terrain: Terrain) => void;
}

export const EncounterGroupTerrain = (props: EncounterGroupTerrainProps) => {
	return (
		<div className='encounter-group'>
			<div className='group-column terrain'>
				<Flex align='center' justify='space-between'>
					<div className='group-name'>
						Terrain
					</div>
					<Popover
						trigger='click'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button block={true} onClick={() => props.onDuplicate(props.terrain)}>Duplicate</Button>
								<DangerButton onConfirm={() => props.onDelete(props.terrain)} />
							</div>
						)}
					>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Popover>
				</Flex>
			</div>
			<div className='encounter-slots terrain'>
				<div className='encounter-slot'>
					<div className='encounter-slot-row' onClick={() => props.onSelect(props.terrain)}>
						<div className='name-column'>
							<TerrainInfo terrain={props.terrain} />
						</div>
						<div className='stamina-column'>
							{TerrainLogic.getStaminaValue(props.terrain)}
							<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
						</div>
						<div className='conditions-column'>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
