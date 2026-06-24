import { Button, Flex, Popover, Segmented, Space, Tag } from 'antd';
import { HeartFilled, PlusOutlined } from '@ant-design/icons';
import { Ability } from '@/models/ability';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityUsage } from '@/enums/ability-usage';
import { ButtonGroup } from '@/components/controls/button-group/button-group';
import { ConditionLogic } from '@/logic/condition-logic';
import { ConditionType } from '@/enums/condition-type';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FeaturePanel } from '../../elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { Format } from '@/utils/format';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HealthGauge } from '../../health-gauge/health-gauge';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroModalType } from '@/enums/hero-modal-type';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterInfo } from '@/components/panels/token/token';
import { MonsterLogic } from '@/logic/monster-logic';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { Pill } from '@/components/controls/pill/pill';
import { RulesPage } from '@/enums/rules-page';
import { Skill } from '@/models/skill';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { useOptions } from '@/contexts/data-context';
import { useState } from 'react';

import './sidebar-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	setTab: (tab: string) => void;
	onShowState: (type: HeroModalType) => void;
	onShowReference: (page: RulesPage) => void;
	onAddSquad: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad: (hero: Hero, slotID: string) => void;
	onSelectControlledMonster: (hero: Hero, monster: Monster) => void;
	onSelectControlledSquad: (hero: Hero, slot: EncounterSlot) => void;
}

export const SidebarPanel = (props: Props) => {
	const [ page, setPage ] = useState<string>('hero');
	const options = useOptions();

	const useRows = options.singlePage && options.compactView;

	const companions = HeroLogic.getCompanions(props.hero);
	const retainers = HeroLogic.getRetainers(props.hero);
	const summons = HeroLogic.getSummons(props.hero);
	const showRetinue = (companions.length + retainers.length + summons.length > 0);

	const getHeroPage = () => {
		const onShowStats = () => {
			if (props.onShowState) {
				props.onShowState(HeroModalType.Resources);
			}
		};

		const onShowVitals = () => {
			if (props.onShowState) {
				props.onShowState(HeroModalType.Vitals);
			}
		};

		const onShowConditions = () => {
			if (props.onShowReference) {
				props.onShowReference(RulesPage.Conditions);
			}
		};

		const onShowSkills = () => {
			if (props.onShowReference) {
				props.onShowReference(RulesPage.Skills);
			}
		};

		const onShowLanguages = () => {
			if (props.onShowReference) {
				props.onShowReference(RulesPage.Languages);
			}
		};

		const getTrigger = (ability: Ability) => {
			const showTarget = ability.type.trigger.toLowerCase().includes('the target');
			const distance = ability.distance.map(d => AbilityLogic.getDistance(d, ability, props.hero)).join(' or ');

			return (
				<div key={ability.id}>
					{
						ability.type.trigger ?
							<Field
								compact={true}
								label={ability.name || 'Unnamed Ability'}
								value={ability.type.trigger}
							/>
							: null
					}
					{
						showTarget && distance ?
							<Field
								compact={true}
								label={ability.target !== distance ? 'Distance' : 'Distance / Target'}
								value={distance}
							/>
							: null
					}
					{
						showTarget && ability.target && (ability.target !== distance) ?
							<Field
								compact={true}
								label='Target'
								value={ability.target}
							/>
							: null
					}
				</div>
			);
		};

		const getSkills = (label: string, skills: Skill[]) => {
			return skills.length > 0 ?
				useRows ?
					<div className='selectable-row clickable' onClick={onShowSkills}>
						<div>{label}: <b>{skills.map(s => s.name).join(', ')}</b></div>
					</div>
					:
					<div key={label} className='overview-tile clickable' onClick={onShowSkills}>
						<HeaderText>{label}</HeaderText>
						{
							skills.map(s => (
								<div key={s.name} className='ds-text'>
									{s.name} {options.showSkillsInGroups ? null : <Tag variant='outlined'>{s.list}</Tag>}
								</div>
							))
						}
					</div>
				: null;
		};

		const conditionImmunities = HeroLogic.getConditionImmunities(props.hero);
		const damageModifiers = HeroLogic.getDamageModifiers(props.hero);
		const damageImmunities = damageModifiers.filter(dm => dm.modifierType === DamageModifierType.Immunity);
		const damageWeaknesses = damageModifiers.filter(dm => dm.modifierType === DamageModifierType.Weakness);

		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, options.shownStandardAbilities);
		const heroicResources = HeroLogic.getHeroicResources(props.hero);
		const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
		const languages = HeroLogic.getLanguages(props.hero, props.sourcebooks);

		return (
			<>
				{
					HeroLogic.getCombatState(props.hero) === 'dying' ?
						useRows ?
							<div className='selectable-row danger clickable' onClick={onShowVitals}>
								<div><b>Dying</b></div>
							</div>
							:
							<div className='overview-tile danger clickable' onClick={onShowVitals}>
								<HeaderText>Dying</HeaderText>
								<div className='ds-text'>
									You can’t take the Catch Breath maneuver in combat, and you are bleeding, and this condition can’t be removed in any way until you are no longer dying.
								</div>
								<div className='ds-text'>
									Your allies can help you spend Recoveries in combat, and you can spend Recoveries out of combat as usual.
								</div>
							</div>
						: null
				}
				{
					props.hero.state.conditions.map(c =>
						useRows ?
							<div key={c.id} className='selectable-row warning clickable' onClick={onShowVitals}>
								<div>Condition: <b>{c.type === ConditionType.Custom ? c.text || 'A custom condition.' : ConditionLogic.getDescription(c.type)}</b></div>
							</div>
							:
							<div key={c.id} className='overview-tile warning clickable' onClick={onShowVitals}>
								<HeaderText tags={[ c.ends ]}>{c.type}</HeaderText>
								<Markdown text={c.type === ConditionType.Custom ? c.text || 'A custom condition.' : ConditionLogic.getDescription(c.type)} />
							</div>
					)
				}
				{
					useRows ?
						null
						:
						<div className='overview-tile clickable' style={{ display: 'flex', justifyContent: 'center', padding: '0' }} onClick={onShowVitals}>
							<HealthGauge
								stamina={{
									staminaMax: HeroLogic.getStamina(props.hero),
									staminaDamage: props.hero.state.staminaDamage,
									state: HeroLogic.getCombatState(props.hero)
								}}
								staminaTemp={{
									staminaTemp: props.hero.state.staminaTemp
								}}
								recoveries={{
									recoveriesMax: HeroLogic.getRecoveries(props.hero),
									recoveriesUsed: props.hero.state.recoveriesUsed
								}}
							/>
						</div>
				}
				{
					(heroicResources.length > 0) && !options.singlePage ?
						<>
							{
								heroicResources.map(hr =>
									useRows ?
										<div key={hr.id} className={hr.value >= 0 ? 'selectable-row clickable' : 'selectable-row warning clickable'} onClick={onShowStats}>
											<div>Resource: <b>{hr.name}</b></div>
											<div>{hr.value}</div>
										</div>
										:
										<div key={hr.id} className={hr.value >= 0 ? 'overview-tile clickable' : 'overview-tile warning clickable'} onClick={onShowStats}>
											<HeaderText
												extra={<div style={{ fontSize: '16px', fontWeight: '600' }}>{hr.value}</div>}
											>
												{hr.name}
											</HeaderText>
											{
												hr.gains.map((g, n) => (
													<Flex key={n} align='center' justify='space-between' gap={10}>
														<div className='ds-text compact-text'>{g.trigger}</div>
														<Pill>+{g.value}</Pill>
													</Flex>
												))
											}
										</div>
								)
							}
						</>
						: null
				}
				{
					(triggers.length > 0) && !options.singlePage ?
						useRows ?
							<div className='selectable-row clickable' onClick={() => props.setTab('Triggers')}>
								<div>Triggers: <b>{triggers.map(t => t.ability.name).join(', ')}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={() => props.setTab('Triggers')}>
								<HeaderText>Triggered Actions</HeaderText>
								<Space orientation='vertical'>
									{triggers.map(t => getTrigger(t.ability))}
								</Space>
							</div>
						: null
				}
				{
					conditionImmunities.length > 0 ?
						useRows ?
							<div className='selectable-row clickable' onClick={onShowConditions}>
								<div>Cannot Be: <b>{conditionImmunities.join(', ')}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={onShowConditions}>
								<HeaderText>Cannot Be</HeaderText>
								{conditionImmunities.map((c, n) => <div key={n} className='ds-text'>{c}</div>)}
							</div>
						: null
				}
				{
					damageImmunities.length > 0 ?
						useRows ?
							<div className='selectable-row'>
								<div>Immunities: <b>{damageImmunities.map(dm => `${dm.damageType} ${dm.value}`).join(', ')}</b></div>
							</div>
							:
							<div className='overview-tile'>
								<HeaderText>Immunities</HeaderText>
								{damageImmunities.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
							</div>
						: null
				}
				{
					damageWeaknesses.length > 0 ?
						useRows ?
							<div className='selectable-row'>
								<div>Weaknesses: <b>{damageWeaknesses.map(dm => `${dm.damageType} ${dm.value}`).join(', ')}</b></div>
							</div>
							:
							<div className='overview-tile'>
								<HeaderText>Weaknesses</HeaderText>
								{damageWeaknesses.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
							</div>
						: null
				}
				{
					useRows ?
						<div className='selectable-row clickable' onClick={onShowLanguages}>
							<div>Languages: <b>{languages.map(l => l.name).join(', ')}</b></div>
						</div>
						:
						<div className='overview-tile clickable' onClick={onShowLanguages}>
							<HeaderText>Languages</HeaderText>
							{
								languages.length > 0 ?
									languages.map(l => <div key={l.name} className='ds-text'>{l.name}</div>)
									:
									<div className='ds-text dimmed-text'>None</div>
							}
						</div>
				}
				{
					(options.showSkillsInGroups || false) ?
						[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore, SkillList.Custom ]
							.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, props.sourcebooks).filter(s => s.list === list)))
						:
						getSkills('Skills', HeroLogic.getSkills(props.hero, props.sourcebooks))
				}
			</>
		);
	};

	const getRetinuePage = () => {
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
				<div key={slot.id} className='overview-tile'>
					<HeaderText
						extra={
							<ButtonGroup
								buttons={[
									{ type: 'button', tooltip: 'Add Another', icon: <PlusOutlined />, onClick: () => props.onAddMonsterToSquad(props.hero, slot.id) },
									{ type: 'danger', onClick: () => props.onRemoveSquad(props.hero, slot.id) }
								]}
							/>
						}
					>
						{isMinionSlot ? 'Minion Squad' : ''}
						{isRetainerSlot ? 'Retainer' : ''}
						{isCompanionSlot ? 'Companion' : ''}
					</HeaderText>
					<Space orientation='vertical' style={{ width: '100%' }}>
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
				</div>
			);
		};

		return (
			<>
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
						Track Retinue Stats
					</Button>
				</Popover>
				{props.hero.state.controlledSlots.map(getSlot)}
				{props.hero.state.controlledSlots.length === 0 ? <Empty /> : null}
				{
					HeroLogic.getFeatures(props.hero)
						.map(f => f.feature)
						.filter(f => f.type === FeatureType.SummonFormation)
						.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} sourcebooks={props.sourcebooks} />)
				}
			</>
		);
	};

	let display = 'column';
	if (options.singlePage) {
		display = 'grid';
	}
	if (useRows) {
		display = 'list';
	}

	return (
		<ErrorBoundary>
			<div className={`hero-sidebar ${display}`}>
				{
					showRetinue ?
						<Segmented
							block={true}
							options={[
								{ label: 'You', value: 'hero' },
								{ label: 'Retinue', value: 'retinue' }
							]}
							value={page}
							onChange={setPage}
						/>
						: null
				}
				{page === 'hero' ? getHeroPage() : null}
				{page === 'retinue' ? getRetinuePage() : null}
			</div>
		</ErrorBoundary>
	);
};
