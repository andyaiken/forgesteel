import { Button, Flex, Popover, Space, Tag } from 'antd';
import { HeartFilled, PlusOutlined } from '@ant-design/icons';
import { ConditionLogic } from '@/logic/condition-logic';
import { DangerButton } from '@/components/controls/danger-button/danger-button';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Format } from '@/utils/format';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '../../token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';

import './controlled-monsters-panel.scss';

interface Props {
	hero: Hero;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onSelectControlledMonster: (hero: Hero, monster: Monster) => void;
	onSelectControlledSquad: (hero: Hero, slot: EncounterSlot) => void;
}

export const ControlledMonstersPanel = (props: Props) => {
	const companions = HeroLogic.getCompanions(props.hero);
	const retainers = HeroLogic.getRetainers(props.hero);
	const summons = HeroLogic.getSummons(props.hero);

	if (companions.length + retainers.length + summons.length === 0) {
		return null;
	}

	const getAddBtn = () => {
		return (
			<Popover
				trigger='click'
				content={
					<Space orientation='vertical' style={{ width: '100%' }}>
						{
							companions.map(m => (
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
							retainers.map(m => (
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
							summons.map(m => (
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
				<Button block={true}>
					<PlusOutlined />
					Add a controlled monster
				</Button>
			</Popover>
		);
	};

	const getSlot = (slot: EncounterSlot) => {
		const isMinionSlot = slot.monsters.every(m => m.role.organization === MonsterOrganizationType.Minion);
		const isRetainerSlot = slot.monsters.every(m => m.role.organization === MonsterOrganizationType.Retainer);
		const isCompanionSlot = !isMinionSlot && !isRetainerSlot;

		const getMonster = (m: Monster) => {
			const tags: string[] = [];
			if (![ 'healthy', 'injured' ].includes(MonsterLogic.getCombatState(m))) {
				tags.push(Format.capitalize(MonsterLogic.getCombatState(m)));
			}
			if (m.state.hidden) {
				tags.push('Hidden');
			}
			tags.push(...m.state.conditions.map(c => ConditionLogic.getFullDescription(c)));

			return (
				<div key={m.id} className='controlled-monster' onClick={() => props.onSelectControlledMonster(props.hero, m)}>
					<Space orientation='vertical' style={{ flex: '1 1 0' }}>
						<Flex align='center' justify='space-between' gap={5}>
							<MonsterInfo monster={m} />
							{
								!isMinionSlot ?
									<Flex gap={5}>
										{MonsterLogic.getStaminaDescription(m)}
										<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
									</Flex>
									: null
							}
						</Flex>
						{
							tags.length > 0 ?
								<Flex gap={3}>
									{tags.map((tag, n) => <Tag key={n} variant='outlined'>{tag}</Tag>)}
								</Flex>
								: null
						}
					</Space>
				</div>
			);
		};

		return (
			<Space key={slot.id} className='controlled-slot' orientation='vertical' style={{ width: '100%' }}>
				<Flex align='center' style={{ paddingLeft: '5px' }}>
					<b style={{ flex: '1 1 0' }}>
						{isCompanionSlot ? 'Companion' : ''}
						{isRetainerSlot ? 'Retainer' : ''}
						{isMinionSlot ? 'Minion Squad' : ''}
					</b>
					<Button type='text' title='Add Another' icon={<PlusOutlined />} onClick={() => props.onAddMonsterToSquad(props.hero, slot.id)} />
					<DangerButton mode='clear' onConfirm={() => props.onRemoveSquad(props.hero, slot.id)} />
				</Flex>
				{
					isMinionSlot ?
						<div className='controlled-monster' onClick={() => props.onSelectControlledSquad(props.hero, slot)}>
							<Flex align='center' justify='space-between' style={{ width: '100%' }}>
								<b>Squad Stamina</b>
								<Flex gap={5}>
									{MonsterLogic.getMinionStaminaDescription(slot)}
									<HeartFilled style={{ color: 'rgb(200, 0, 0)' }} />
								</Flex>
							</Flex>
						</div>
						: null
				}
				{slot.monsters.map(getMonster)}
				{slot.monsters.length === 0 ? <div>Empty</div> : null}
			</Space>
		);
	};

	return (
		<ErrorBoundary>
			<div className='controlled-monsters-panel'>
				{getAddBtn()}
				{props.hero.state.controlledSlots.map(getSlot)}
			</div>
		</ErrorBoundary>
	);
};
