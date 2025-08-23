import { Alert, Button, Flex, Popover, Segmented, Space, Tag } from 'antd';
import { DownOutlined, EllipsisOutlined, HeartFilled, PlusOutlined } from '@ant-design/icons';
import { Encounter, EncounterGroup } from '../../../models/encounter';
import { HeroInfo, MonsterInfo, TerrainInfo } from '../token/token';
import { Collections } from '../../../utils/collections';
import { ConditionLogic } from '../../../logic/condition-logic';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { EncounterSlot } from '../../../models/encounter-slot';
import { Format } from '../../../utils/format';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { Monster } from '../../../models/monster';
import { MonsterLogic } from '../../../logic/monster-logic';
import { MonsterOrganizationType } from '../../../enums/monster-organization-type';
import { Options } from '../../../models/options';
import { Terrain } from '../../../models/terrain';
import { TerrainLogic } from '../../../logic/terrain-logic';

import './encounter-group-panel.scss';

interface EncounterGroupHeroProps {
	hero: Hero;
	encounter: Encounter;
	options: Options;
	onSelect: (hero: Hero) => void;
	onSelectMonster: (monster: Monster) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
	onSetState: (hero: Hero, state: 'ready' | 'current' | 'finished') => void;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onDelete: (hero: Hero) => void;
}

export const EncounterGroupHero = (props: EncounterGroupHeroProps) => {
	try {
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
				<div className='group-column'>
					<Flex align='center' justify='space-between'>
						<div className='group-name'>
							Hero
						</div>
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Segmented
										vertical={true}
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
				<div className='encounter-slots'>
					<div className='encounter-slot'>
						<div className={props.hero.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'} onClick={() => props.onSelect(props.hero)}>
							<div className='name-column'>
								<HeroInfo hero={props.hero} />
							</div>
							{
								HeroLogic.getStamina(props.hero) === 0 ?
									<div className='stamina-column' />
									:
									<div className='stamina-column'>
										{getStaminaDescription()}
										<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
									</div>
							}
							<div className='conditions-column'>
								{[ 'healthy', 'injured' ].includes(HeroLogic.getCombatState(props.hero)) ? null : <Tag>{Format.capitalize(HeroLogic.getCombatState(props.hero))}</Tag>}
								{props.hero.state.hidden ? <Tag>Hidden</Tag> : null}
								{props.hero.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
							</div>
						</div>
					</div>
					{
						(HeroLogic.getCompanions(props.hero).length + HeroLogic.getSummons(props.hero).length) > 0 ?
							<>
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
												onSelectMonster={props.onSelectMonster}
												onSelectMinionSlot={props.onSelectMinionSlot}
											/>
											{slot.monsters.length === 0 ? <div>Empty</div> : null}
										</div>
									))
								}
								<Popover
									trigger='click'
									content={
										<Space direction='vertical' style={{ width: '100%' }}>
											{
												HeroLogic.getCompanions(props.hero).map(m => (
													<Button type='text' onClick={() => props.onAddSquad(props.hero, m, 1)}>
														{m.name}
													</Button>
												))
											}
											{
												HeroLogic.getSummons(props.hero).map(m => (
													<Button type='text' onClick={() => props.onAddSquad(props.hero, m, 1)}>
														Summon: {m.name}
													</Button>
												))
											}
										</Space>
									}
								>
									<Button block={true}>
										Add a Controlled Monster
										<DownOutlined />
									</Button>
								</Popover>
							</>
							: null
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface EncounterGroupMonsterProps {
	group: EncounterGroup;
	index: number;
	encounter: Encounter;
	onSelectMonster: (monster: Monster) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
	onSetState: (group: EncounterGroup, state: 'ready' | 'current' | 'finished') => void;
	onDuplicate: (group: EncounterGroup) => void;
	onDelete: (group: EncounterGroup) => void;
}

export const EncounterGroupMonster = (props: EncounterGroupMonsterProps) => {
	try {
		const defeated = props.group.slots.every(s => s.state.defeated || s.monsters.every(m => m.state.defeated));
		let className = 'encounter-group';
		if (defeated) {
			className += ' defeated';
		} else if (props.group.encounterState === 'finished') {
			className += ' acted';
		}

		return (
			<div className={className}>
				<div className='group-column'>
					<Flex align='center' justify='space-between'>
						<div className='group-name'>
							Group {(props.index + 1).toString()}
						</div>
						<Popover
							trigger='click'
							content={(
								<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
									<Segmented
										vertical={true}
										disabled={defeated}
										options={[
											{ value: 'ready', label: 'Ready To Act' },
											{ value: 'current', label: 'Acting Now' },
											{ value: 'finished', label: 'Finished' }
										]}
										value={props.group.encounterState}
										onChange={value => props.onSetState(props.group, value as 'ready' | 'current' | 'finished')}
									/>
									<Button block={true} onClick={() => props.onDuplicate(props.group)}>Duplicate</Button>
									<DangerButton mode='block' onConfirm={() => props.onDelete(props.group)} />
								</div>
							)}
						>
							<Button type='text' icon={<EllipsisOutlined />} />
						</Popover>
					</Flex>
				</div>
				<div className='encounter-slots'>
					{
						props.group.slots.map(slot => (
							<MonsterSlot
								key={slot.id}
								slot={slot}
								encounter={props.encounter}
								onSelectMonster={props.onSelectMonster}
								onSelectMinionSlot={props.onSelectMinionSlot}
							/>
						))
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface MonsterSlotProps {
	slot: EncounterSlot;
	encounter: Encounter;
	onSelectMonster: (monster: Monster) => void;
	onSelectMinionSlot: (slot: EncounterSlot) => void;
}

export const MonsterSlot = (props: MonsterSlotProps) => {
	const isMinionSlot = props.slot.monsters.every(m => m.role.organization === MonsterOrganizationType.Minion);

	const getStaminaDescription = () => {
		const max = Collections.sum(props.slot.monsters, m => MonsterLogic.getStamina(m));

		let str = `${max}`;
		if (props.slot.state.staminaDamage > 0) {
			str = `${Math.max(max - props.slot.state.staminaDamage, 0)} / ${max}`;
		}
		if (props.slot.state.staminaTemp > 0) {
			str += ` +${props.slot.state.staminaTemp}`;
		}

		return str;
	};

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
					message={`There should be ${minionsExpected} active minions, not ${minionsAlive}.`}
				/>
			);
		}

		return null;
	};

	const getMinionCaptainTag = () => {
		if (!isMinionSlot) {
			return null;
		}

		if (props.slot.state.captainID) {
			const captain = props.encounter.groups
				.flatMap(g => g.slots)
				.flatMap(s => s.monsters)
				.find(m => m.id === props.slot.state.captainID);
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
		<div key={props.slot.id} className='encounter-slot'>
			{
				isMinionSlot ?
					<div key='minions' className={props.slot.state.defeated ? 'encounter-slot-row minion defeated' : 'encounter-slot-row minion'} onClick={() => props.onSelectMinionSlot(props.slot)}>
						<div className='name-column'>
							<b>Minions</b>
						</div>
						<div className='stamina-column'>
							{getStaminaDescription()}
							<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
						</div>
						<div className='conditions-column'>
							{getMinionCaptainTag()}
							{props.slot.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
						</div>
					</div>
					: null
			}
			{
				isMinionSlot ? getMinionCountMessage() : null
			}
			{
				props.slot.monsters.map(monster => (
					<div key={monster.id} className={props.slot.state.defeated || monster.state.defeated ? 'encounter-slot-row defeated' : 'encounter-slot-row'} onClick={() => props.onSelectMonster(monster)}>
						<div className='name-column'>
							<MonsterInfo monster={monster} />
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
							{[ 'healthy', 'injured' ].includes(MonsterLogic.getCombatState(monster)) ? null : <Tag>{Format.capitalize(MonsterLogic.getCombatState(monster))}</Tag>}
							{monster.state.hidden ? <Tag>Hidden</Tag> : null}
							{monster.state.conditions.map(c => <Tag key={c.id}>{ConditionLogic.getFullDescription(c)}</Tag>)}
						</div>
					</div>
				))
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
	try {
		return (
			<div className='encounter-group'>
				<div className='group-column'>
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
				<div className='encounter-slots'>
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
