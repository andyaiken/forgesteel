import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Divider, Flex, Segmented, Select, Space, Statistic, Tag } from 'antd';
import { Pill, ResourcePill } from '@/components/controls/pill/pill';
import { Ability } from '@/models/ability';
import { AbilityData } from '@/data/ability-data';
import { AbilityLogic } from '@/logic/ability-logic';
import { AbilityPanel } from '@/components/panels/elements/ability-panel/ability-panel';
import { AbilityUsage } from '@/enums/ability-usage';
import { Ancestry } from '@/models/ancestry';
import { Career } from '@/models/career';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { Complication } from '@/models/complication';
import { ConditionLogic } from '@/logic/condition-logic';
import { ConditionType } from '@/enums/condition-type';
import { ControlledMonstersPanel } from '@/components/panels/hero/controlled-monsters/controlled-monsters-panel';
import { Culture } from '@/models/culture';
import { CultureData } from '@/data/culture-data';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
import { EncounterSlot } from '@/models/encounter-slot';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Feature } from '@/models/feature';
import { FeaturePanel } from '@/components/panels/elements/feature-panel/feature-panel';
import { FeatureType } from '@/enums/feature-type';
import { Field } from '@/components/controls/field/field';
import { Follower } from '@/models/follower';
import { FollowerPanel } from '@/components/panels/elements/follower-panel/follower-panel';
import { FormatLogic } from '@/logic/format-logic';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { HealthGauge } from '@/components/panels/health-gauge/health-gauge';
import { Hero } from '@/models/hero';
import { HeroClass } from '@/models/class';
import { HeroLogic } from '@/logic/hero-logic';
import { HeroStatePage } from '@/enums/hero-state-page';
import { HeroToken } from '@/components/panels/token/token';
import { Kit } from '@/models/kit';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { MonsterPanel } from '@/components/panels/elements/monster-panel/monster-panel';
import { Options } from '@/models/options';
import { PanelMode } from '@/enums/panel-mode';
import { ProjectLogic } from '@/logic/project-logic';
import { RulesPage } from '@/enums/rules-page';
import { SelectablePanel } from '@/components/controls/selectable-panel/selectable-panel';
import { SheetFormatter } from '@/logic/classic-sheet/sheet-formatter';
import { Skill } from '@/models/skill';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { StatsRow } from '@/components/panels/stats-row/stats-row';
import { StatsSidebarPanel } from '@/components/panels/hero/stats-sidebar/stats-sidebar-panel';
import { SummoningInfo } from '@/models/summon';
import { Title } from '@/models/title';
import { useIsSmall } from '@/hooks/use-is-small';
import { useState } from 'react';

import './hero-panel.scss';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options: Options;
	mode?: PanelMode;
	onSelectAncestry?: (ancestry: Ancestry) => void;
	onSelectCulture?: (culture: Culture) => void;
	onSelectCareer?: (career: Career) => void;
	onSelectClass?: (heroClass: HeroClass) => void;
	onSelectComplication?: (complication: Complication) => void;
	onSelectDomain?: (domain: Domain) => void;
	onSelectKit?: (kit: Kit) => void;
	onSelectTitle?: (title: Title) => void;
	onSelectMonster?: (monster: Monster, summon?: SummoningInfo) => void;
	onSelectFollower?: (follower: Follower) => void;
	onSelectCharacteristic?: (characteristic: Characteristic) => void;
	onSelectFeature?: (feature: Feature) => void;
	onSelectAbility?: (ability: Ability) => void;
	onShowState?: (page: HeroStatePage) => void;
	onShowReference?: (page: RulesPage) => void;
	onAddSquad?: (hero: Hero, monster: Monster, count: number) => void;
	onRemoveSquad?: (hero: Hero, slotID: string) => void;
	onAddMonsterToSquad?: (hero: Hero, slotID: string) => void;
	onSelectControlledMonster?: (hero: Hero, monster: Monster) => void;
	onSelectControlledSquad?: (hero: Hero, slot: EncounterSlot) => void;
}

export const HeroPanel = (props: Props) => {
	const { t } = useTranslation([ 'common', 'hero', 'ancestry', 'class', 'heroicResource' ]);
	const isSmall = useIsSmall();
	const [ tab, setTab ] = useState<string>('Hero');

	const getNameSection = () => {
		return (
			<HeaderText
				style={{ marginTop: '0' }}
				level={props.options.compactView ? 2 : 1}
				ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={props.options.compactView ? 21 : 34} /> : null}
				tags={props.hero.folder ? [ props.hero.folder ] : []}
			>
				{props.hero.name || t('hero:unnamedHero')}
			</HeaderText>
		);
	};

	const getSidebarSection = () => {
		const onShowStats = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Resources);
			}
		};

		const onShowVitals = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Vitals);
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

		const conditionImmunities = HeroLogic.getConditionImmunities(props.hero);
		const damageImmunities = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Immunity);
		const damageWeaknesses = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Weakness);

		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.shownStandardAbilities);
		const heroicResources = HeroLogic.getHeroicResources(props.hero);
		const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
		const languages = HeroLogic.getLanguages(props.hero, props.sourcebooks);

		const useRows = props.options.singlePage && props.options.compactView;

		const getTrigger = (ability: Ability) => {
			const showTarget = ability.type.trigger.toLowerCase().includes('the target');
			const distance = ability.distance.map(d => AbilityLogic.getDistance(d, ability, props.hero)).join(' or ');

			return (
				<div key={ability.id}>
					{
						ability.type.trigger ?
							<Field
								compact={true}
								label={i18next.format(t(ability.name || 'hero:unnamedAbility'), 'capitalize') || 'Unnamed Ability'}
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
									{s.name} {props.options.showSkillsInGroups ? null : <Tag variant='outlined'>{s.list}</Tag>}
								</div>
							))
						}
					</div>
				: null;
		};

		let display = 'column';
		if (props.options.singlePage) {
			display = 'grid';
		}
		if (useRows) {
			display = 'list';
		}

		return (
			<ErrorBoundary>
				<div className={`hero-sidebar ${display}`}>
					{
						HeroLogic.getCombatState(props.hero) === 'dying' ?
							useRows ?
								<div className='selectable-row danger clickable' onClick={onShowVitals}>
									<div><b>{i18next.format(t('dying'), 'capitalize')}</b></div>
								</div>
								:
								<div className='overview-tile danger clickable' onClick={onShowVitals}>
									<HeaderText>{i18next.format(t('dying'), 'capitalize')}</HeaderText>
									<div className='ds-text'>
										{t('hero:catchBreathWhileDying')}
									</div>
									<div className='ds-text'>
										{t('hero:recoveriesWhileDying')}
									</div>
								</div>
							: null
					}
					{
						props.hero.state.conditions.map(c =>
							useRows ?
								<div key={c.id} className='selectable-row warning clickable' onClick={onShowVitals}>
									<div>{i18next.format(t('condition_one'), 'capitalize')}: <b>{c.type === ConditionType.Custom ? c.text || 'A custom condition.' : ConditionLogic.getDescription(c.type)}</b></div>
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
						(heroicResources.length > 0) && !props.options.singlePage ?
							<>
								{
									heroicResources.map(hr =>
										useRows ?
											<div key={hr.id} className={hr.value >= 0 ? 'selectable-row clickable' : 'selectable-row warning clickable'} onClick={onShowStats}>
												<div>{i18next.format(t('heroicResource_one'), 'capitalize')}: <b>{i18next.format(t(`${hr.languageKey}.name_one`), 'capitalize')}</b></div>
												<div>{hr.value}</div>
											</div>
											:
											<div key={hr.id} className={hr.value >= 0 ? 'overview-tile clickable' : 'overview-tile warning clickable'} onClick={onShowStats}>
												<HeaderText
													extra={<div style={{ fontSize: '16px', fontWeight: '600' }}>{hr.value}</div>}
												>
													{i18next.format(t(`${hr.languageKey}.name_one`), 'capitalize')}
												</HeaderText>
												{
													hr.gains.map((g, n) => (
														<Flex key={n} align='center' justify='space-between' gap={10}>
															<div className='ds-text compact-text'>{t(`${hr.languageKey}:${g.tag}.trigger`)}</div>
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
					<ControlledMonstersPanel
						hero={props.hero}
						onAddSquad={props.onAddSquad!}
						onRemoveSquad={props.onRemoveSquad!}
						onAddMonsterToSquad={props.onAddMonsterToSquad!}
						onSelectControlledMonster={props.onSelectControlledMonster!}
						onSelectControlledSquad={props.onSelectControlledSquad!}
					/>
					{
						(triggers.length > 0) && !props.options.singlePage ?
							useRows ?
								<div className='selectable-row clickable' onClick={() => setTab('Triggers')}>
									<div>{i18next.format(t('trigger_other'), 'capitalize')}: <b>{triggers.map(tr => i18next.format(t(tr.ability.name), 'capitalize')).join(', ')}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={() => setTab('Triggers')}>
									<HeaderText>{i18next.format(t('triggeredAction_other'), 'capitalize')}</HeaderText>
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
									<div>{t('hero:cannotBeImmunity')}: <b>{conditionImmunities.join(', ')}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onShowConditions}>
									<HeaderText>{t('hero:cannotBeImmunity')}</HeaderText>
									{conditionImmunities.map((c, n) => <div key={n} className='ds-text'>{c}</div>)}
								</div>
							: null
					}
					{
						damageImmunities.length > 0 ?
							useRows ?
								<div className='selectable-row'>
									<div>{i18next.format(t('immunity_other'), 'capitalize')}: <b>{damageImmunities.map(dm => `${i18next.format(t(dm.damageType), 'capitalize')} ${dm.value}`).join(', ')}</b></div>
								</div>
								:
								<div className='overview-tile'>
									<HeaderText>{i18next.format(t('immunity_other'), 'capitalize')}</HeaderText>
									{damageImmunities.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{i18next.format(t(dm.damageType), 'capitalize')}</span><span>{dm.value}</span></div>)}
								</div>
							: null
					}
					{
						damageWeaknesses.length > 0 ?
							useRows ?
								<div className='selectable-row'>
									<div>{i18next.format(t('weakness_other'), 'capitalize')}: <b>{damageWeaknesses.map(dm => `${i18next.format(t(dm.damageType), 'capitalize')} ${dm.value}`).join(', ')}</b></div>
								</div>
								:
								<div className='overview-tile'>
									<HeaderText>{i18next.format(t('weakness_other'), 'capitalize')}</HeaderText>
									{damageWeaknesses.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{i18next.format(t(dm.damageType), 'capitalize')}</span><span>{dm.value}</span></div>)}
								</div>
							: null
					}
					{
						useRows ?
							<div className='selectable-row clickable' onClick={onShowLanguages}>
								<div>{i18next.format(t('language_other'), 'capitalize')}: <b>{languages.map(l => i18next.format(t(l.name), 'capitalize')).join(', ')}</b></div>
							</div>
							:
							<div className='overview-tile clickable' onClick={onShowLanguages}>
								<HeaderText>{i18next.format(t('language_other'), 'capitalize')}</HeaderText>
								{
									languages.length > 0 ?
										languages.map(l => <div key={l.name} className='ds-text'>{i18next.format(t(l.name), 'capitalize')}</div>)
										:
										<div className='ds-text dimmed-text'>None</div>
								}
							</div>
					}
					{
						(props.options.showSkillsInGroups || false) ?
							[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore, SkillList.Custom ]
								.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, props.sourcebooks).filter(s => s.list === list)))
							:
							getSkills('Skills', HeroLogic.getSkills(props.hero, props.sourcebooks))
					}
				</div>
			</ErrorBoundary>
		);
	};

	const getStatsSection = () => {
		const useRows = props.options.compactView;

		const xpSuffix = HeroLogic.canLevelUp(props.hero, props.options) ? <ArrowUpOutlined /> : undefined;

		const size = HeroLogic.getSize(props.hero);
		const sizeSuffix = size.mod || undefined;

		const speed = HeroLogic.getSpeed(props.hero);
		const speedSuffix = HeroLogic.getSpeedModified(props.hero) ? <ArrowDownOutlined /> : undefined;
		const speedStr = speed.modes.length === 0 ? i18next.format(t('speed'), 'capitalize') : `${i18next.format(t('speed'), 'capitalize')} (${FormatLogic.getSpeedModes(speed.modes, t).toLowerCase()})`;

		const maxStamina = HeroLogic.getStamina(props.hero);
		const stamina = props.hero.state.staminaDamage === 0 ? maxStamina : maxStamina - props.hero.state.staminaDamage;
		const staminaSuffix = props.hero.state.staminaDamage === 0 ? null : `/ ${maxStamina}`;

		const maxRecoveries = HeroLogic.getRecoveries(props.hero);
		const recoveries = props.hero.state.recoveriesUsed === 0 ? maxRecoveries : maxRecoveries - props.hero.state.recoveriesUsed;
		const recoveriesSuffix = props.hero.state.recoveriesUsed === 0 ? null : `/ ${maxRecoveries}`;

		const onSelectCharacteristic = (characteristic: Characteristic) => {
			if (props.onSelectCharacteristic) {
				props.onSelectCharacteristic(characteristic);
			}
		};

		const onShowResources = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Resources);
			}
		};

		const onShowVitals = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Vitals);
			}
		};

		return (
			<ErrorBoundary>
				<div className='stats-section'>
					<Flex gap={10}>
						<StatsRow caption={isSmall ? i18next.format(t('might_short'), 'capitalize') : i18next.format(t('might'), 'capitalize')} onClick={() => onSelectCharacteristic(Characteristic.Might)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
						</StatsRow>
						<StatsRow caption={isSmall ? i18next.format(t('agility_short'), 'capitalize') : i18next.format(t('agility'), 'capitalize')} onClick={() => onSelectCharacteristic(Characteristic.Agility)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
						</StatsRow>
						<StatsRow caption={isSmall ? i18next.format(t('reason_short'), 'capitalize') : i18next.format(t('reason'), 'capitalize')} onClick={() => onSelectCharacteristic(Characteristic.Reason)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
						</StatsRow>
						<StatsRow caption={isSmall ? i18next.format(t('intuition_short'), 'capitalize') : i18next.format(t('intuition'), 'capitalize')} onClick={() => onSelectCharacteristic(Characteristic.Intuition)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
						</StatsRow>
						<StatsRow caption={isSmall ? i18next.format(t('presence_short'), 'capitalize') : i18next.format(t('presence'), 'capitalize')} onClick={() => onSelectCharacteristic(Characteristic.Presence)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
						</StatsRow>
					</Flex>
					{
						useRows ?
							<>
								<div className='selectable-row clickable' onClick={onShowResources}>
									{
										HeroLogic.getHeroicResources(props.hero).map(hr => (
											<div key={hr.id}>{hr.name}: <b>{hr.value}</b></div>
										))
									}
									<div>{i18next.format(t('surge_other'), 'capitalize')}: <b>{props.hero.state.surges}</b></div>
									<div>{i18next.format(t('victory_other'), 'capitalize')}: <b>{props.hero.state.victories}</b></div>
									<div>{i18next.format(t('xp'), 'uppercase')}: <b>{props.hero.state.xp}</b></div>
									<div>{i18next.format(t('renown'), 'capitalize')}: <b>{HeroLogic.getRenown(props.hero)}</b></div>
									<div>{i18next.format(t('wealth'), 'capitalize')}: <b>{HeroLogic.getWealth(props.hero)}</b></div>
								</div>
								<div className='selectable-row'>
									<div>{i18next.format(t('size'), 'capitalize')}: <b>{FormatLogic.getSize(size)}</b></div>
									<div>{speedStr}: <b>{speed.value}</b></div>
									<div>{i18next.format(t('stability'), 'capitalize')}: <b>{HeroLogic.getStability(props.hero)}</b></div>
									<div>{i18next.format(t('disengage'), 'capitalize')}: <b>{HeroLogic.getDisengage(props.hero)}</b></div>
									<div>{i18next.format(t('save'), 'capitalize')}: <b>{HeroLogic.getSaveThreshold(props.hero)}</b></div>
								</div>
								<div className='selectable-row clickable' onClick={onShowVitals}>
									<div>{i18next.format(t('stamina'), 'capitalize')}: <b>{stamina}</b></div>
									<div>{i18next.format(t('recovery_other'), 'capitalize')}: <b>{recoveries}</b></div>
									<div>{i18next.format(t('recoveryValue'), 'capitalize')}: <b>{HeroLogic.getRecoveryValue(props.hero)}</b></div>
								</div>
							</>
							:
							<>
								<StatsRow caption={i18next.format(t('resource_other'), 'capitalize')} onClick={onShowResources}>
									{
										HeroLogic.getHeroicResources(props.hero).map(hr => (
											<Statistic key={hr.id} title={hr.name} value={hr.value} />
										))
									}
									<Statistic title={i18next.format(t('surge_other'), 'capitalize')} value={props.hero.state.surges} />
									<Statistic title={i18next.format(t('victory_other'), 'capitalize')} value={props.hero.state.victories} />
									<Statistic title={i18next.format(t('xp'), 'uppercase')} value={props.hero.state.xp} suffix={xpSuffix} />
									<Statistic title={i18next.format(t('renown'), 'capitalize')} value={HeroLogic.getRenown(props.hero)} />
									<Statistic title={i18next.format(t('wealth'), 'capitalize')} value={HeroLogic.getWealth(props.hero)} />
								</StatsRow>
								<Flex gap={10}>
									<StatsRow caption={i18next.format(t('statistics_other'), 'capitalize')} style={{ flex: '5 5 0' }}>
										<Statistic title={i18next.format(t('size'), 'capitalize')} value={size.value} suffix={sizeSuffix} />
										<Statistic title={speedStr} value={speed.value} suffix={speedSuffix} />
										<Statistic title={i18next.format(t('stability'), 'capitalize')} value={HeroLogic.getStability(props.hero)} />
										<Statistic title={i18next.format(t('disengage'), 'capitalize')} value={HeroLogic.getDisengage(props.hero)} />
										<Statistic title={i18next.format(t('save'), 'capitalize')} value={HeroLogic.getSaveThreshold(props.hero)} suffix={HeroLogic.getSaveBonus(props.hero) ? `+${HeroLogic.getSaveBonus(props.hero)}` : undefined} />
									</StatsRow>
									<StatsRow caption={i18next.format(t('vitals'), 'capitalize')} onClick={onShowVitals} style={{ flex: '3 3 0' }}>
										<Statistic title={i18next.format(t('stamina'), 'capitalize')} value={stamina} suffix={staminaSuffix} />
										<Statistic title={i18next.format(t('recovery_other'), 'capitalize')} value={recoveries} suffix={recoveriesSuffix} />
										<Statistic title={i18next.format(t('recoveryValue'), 'capitalize')} value={HeroLogic.getRecoveryValue(props.hero)} />
									</StatsRow>
								</Flex>
							</>
					}
				</div>
			</ErrorBoundary>
		);
	};

	const getChoicesSection = () => {
		const onSelectAncestry = () => {
			if (props.hero.ancestry && props.onSelectAncestry) {
				props.onSelectAncestry(props.hero.ancestry);
			}
		};

		const onSelectCulture = () => {
			if (props.hero.culture && props.onSelectCulture) {
				props.onSelectCulture(props.hero.culture);
			}
		};

		const onSelectCareer = () => {
			if (props.hero.career && props.onSelectCareer) {
				props.onSelectCareer(props.hero.career);
			}
		};

		const onSelectClass = () => {
			if (props.hero.class && props.onSelectClass) {
				props.onSelectClass(props.hero.class);
			}
		};

		const onSelectComplication = () => {
			if (props.hero.complication && props.onSelectComplication) {
				props.onSelectComplication(props.hero.complication);
			}
		};

		const onSelectDomain = (domain: Domain) => {
			if (props.onSelectDomain) {
				props.onSelectDomain(domain);
			}
		};

		const onSelectKit = (kit: Kit) => {
			if (props.onSelectKit) {
				props.onSelectKit(kit);
			}
		};

		const onSelectTitle = (title: Title) => {
			if (props.onSelectTitle) {
				props.onSelectTitle(title);
			}
		};

		const onSelectProject = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Projects);
			}
		};

		let incitingIncident: Element | null = null;
		if (props.hero.career) {
			incitingIncident = props.hero.career.incitingIncidents.selected;
		}

		const useRows = props.options.compactView;

		return (
			<ErrorBoundary>
				<div className={`choices-section ${useRows ? 'compact' : ''}`}>
					{
						props.hero.ancestry ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectAncestry}>
									<div>{t('ancestry', { format: 'capitalize' })}: <b>{i18next.format(t(`${props.hero.ancestry.languageKey}.name_one`), 'capitalize')}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectAncestry}>
									<HeaderText>{t('ancestry')}</HeaderText>
									<Field
										label={i18next.format(t('ancestry'), 'capitalize')}
										value={i18next.format(t(`${props.hero.ancestry.languageKey}.name_one`), 'capitalize')}
									/>
									{HeroLogic.getFormerAncestries(props.hero).map(a => <Field key={a.id} label='Former Life' value={i18next.format(t(`${a.languageKey}.name_one`), 'capitalize')} />)}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>{t('ancestry', { format: 'capitalize' })}</HeaderText>
								<div className='ds-text dimmed-text'>{t('hero:noAncestryChosen')}</div>
							</div>
					}
					{
						props.hero.culture ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectCulture}>
									<div>{t('culture', 'capitalize')}: <b>{i18next.format(t(`culture:${props.hero.culture.languageKey}.name_one`), 'capitalize')}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectCulture}>
									<HeaderText>{i18next.format(t('culture'), 'capitalize')}</HeaderText>
									{props.hero.culture ? <Field label={i18next.format(t('culture'), 'capitalize')} value={i18next.format(t(`culture:${props.hero.culture.languageKey}.name_one`), 'capitalize')} /> : null}
									{props.hero.culture.environment ? <Field label={i18next.format(t('environment'), 'capitalize')} value={i18next.format(t(`environment:${props.hero.culture.environment.languageKey}`), 'capitalize')} /> : null}
									{props.hero.culture.organization ? <Field label={i18next.format(t('organization'), 'capitalize')} value={i18next.format(t(`organization:${props.hero.culture.organization.languageKey}`), 'capitalize')} /> : null}
									{props.hero.culture.upbringing ? <Field label={i18next.format(t('upbringing'), 'capitalize')} value={i18next.format(t(`upbringing:${props.hero.culture.upbringing.languageKey}`), 'capitalize')} /> : null}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>{i18next.format(t('culture'), 'capitalize')}</HeaderText>
								<div className='ds-text dimmed-text'>{t('hero:noCultureChosen')}</div>
							</div>
					}
					{
						props.hero.career ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectCareer}>
									<div>{i18next.format(t('career'), 'capitalize')}: <b>{props.hero.career.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectCareer}>
									<HeaderText>{i18next.format(t('career'), 'capitalize')}</HeaderText>
									<Field label={i18next.format(t('career'), 'capitalize')} value={props.hero.career.name} />
									{incitingIncident ? <Field label='Inciting Incident' value={incitingIncident.name} /> : null}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>{i18next.format(t('career'), 'capitalize')}</HeaderText>
								<div className='ds-text dimmed-text'>{t('hero:noCareerChosen')}</div>
							</div>
					}
					{
						props.hero.class ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectClass}>
									{
										props.hero.class.subclasses.filter(sc => sc.selected).length > 0 ?
											<div>{i18next.format(t('class'), 'capitalize')}: <b>{i18next.format(t(props.hero.class.name), 'capitalize')} ({props.hero.class.subclasses.filter(sc => sc.selected).map(sc => i18next.format(t(sc.name), 'capitalize')).join(' ')}, level {props.hero.class.level})</b></div>
											:
											<div>{i18next.format(t('class'), 'capitalize')}: <b>{i18next.format(t(props.hero.class.name), 'capitalize')} (level {props.hero.class.level})</b></div>
									}
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectClass}>
									<HeaderText>{i18next.format(t('class'), 'capitalize')}</HeaderText>
									<Field label={i18next.format(t('class'), 'capitalize')} value={i18next.format(t(props.hero.class.name), 'capitalize')} />
									<Field label={i18next.format(t('level'), 'capitalize')} value={props.hero.class.level} />
									{
										props.hero.class.subclasses.filter(sc => sc.selected).length > 0 ?
											<Field label={i18next.format(t(props.hero.class.subclassName), 'capitalize')} value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => i18next.format(t(sc.name), 'capitalize')).join(', ') || ''} />
											: null
									}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>{i18next.format(t('class'), 'capitalize')}</HeaderText>
								<div className='ds-text dimmed-text'>{t('hero:noClassChosen')}</div>
							</div>
					}
					{
						HeroLogic.getDomains(props.hero).length > 0 ?
							HeroLogic.getDomains(props.hero).map(domain =>
								useRows ?
									<div key={domain.id} className='selectable-row clickable' onClick={() => onSelectDomain(domain)}>
										<div>{i18next.format(t('domain'), 'capitalize')}: <b>{i18next.format(t(domain.name), 'capitalize')}</b></div>
									</div>
									:
									<div key={domain.id} className='overview-tile clickable' onClick={() => onSelectDomain(domain)}>
										<HeaderText>{i18next.format(t('domain'), 'capitalize')}</HeaderText>
										<Field label={i18next.format(t('domain'), 'capitalize')} value={i18next.format(t(domain.name), 'capitalize')} />
									</div>
							)
							:
							null
					}
					{
						HeroLogic.getKits(props.hero).length > 0 ?
							HeroLogic.getKits(props.hero).map(kit =>
								useRows ?
									<div key={kit.id} className='selectable-row clickable' onClick={() => onSelectKit(kit)}>
										<div>{i18next.format(t('kit'), 'capitalize')}: <b>{i18next.format(t(kit.name), 'capitalize')}</b></div>
									</div>
									:
									<div key={kit.id} className='overview-tile clickable' onClick={() => onSelectKit(kit)}>
										<HeaderText>{i18next.format(t('kit'), 'capitalize')}</HeaderText>
										<Field label={i18next.format(t('kit'), 'capitalize')} value={i18next.format(t(kit.name), 'capitalize')} />
										{kit.armor.length > 0 ? <Field label={i18next.format(t('armor'), 'capitalize')} value={kit.armor.join(', ')} /> : null}
										{kit.weapon.length > 0 ? <Field label={i18next.format(t('weapon_other'), 'capitalize')} value={kit.weapon.join(', ')} /> : null}
									</div>
							)
							:
							null
					}
					{
						HeroLogic.getTitles(props.hero).length > 0 ?
							HeroLogic.getTitles(props.hero).map(title =>
								useRows ?
									<div key={title.id} className='selectable-row clickable' onClick={() => onSelectTitle(title)}>
										<div>{i18next.format(t('title_one'), 'capitalize')}: <b>{i18next.format(t(title.name), 'capitalize')}</b></div>
									</div>
									:
									<div key={title.id} className='overview-tile clickable' onClick={() => onSelectTitle(title)}>
										<HeaderText>{i18next.format(t('title_one'), 'capitalize')}</HeaderText>
										<Field label={i18next.format(t('title_one'), 'capitalize')} value={i18next.format(t(title.name), 'capitalize')} />
									</div>
							)
							:
							null
					}
					{
						props.hero.complication ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectComplication}>
									<div>{i18next.format(t('complication'), 'capitalize')}: <b>{props.hero.complication.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectComplication}>
									<HeaderText>{i18next.format(t('complication'), 'capitalize')}</HeaderText>
									<Field label={i18next.format(t('complication'), 'capitalize')} value={i18next.format(t(props.hero.complication.name), 'capitalize')} />
								</div>
							:
							null
					}
					{
						props.hero.state.projects.length > 0 ?
							props.hero.state.projects.map(project =>
								useRows ?
									<div key={project.id} className='selectable-row clickable' onClick={onSelectProject}>
										<div>{i18next.format(t('project'), 'capitalize')}: <b>{project.name}</b></div>
									</div>
									:
									<div key={project.id} className='overview-tile clickable' onClick={onSelectProject}>
										<HeaderText>{i18next.format(t('project'), 'capitalize')}</HeaderText>
										<Field label={i18next.format(t('project'), 'capitalize')} value={i18next.format(t(project.name), 'capitalize')} />
										{project.progress ? <Field label={i18next.format(t('state'), 'capitalize')} value={i18next.format(t(ProjectLogic.getStatus(project)), 'capitalize')} /> : null}
									</div>
							)
							:
							null
					}
				</div>
			</ErrorBoundary>
		);
	};

	const getFeaturesSection = () => {
		const featureTypes = [ FeatureType.Text, FeatureType.HeroicResource, FeatureType.Package ];

		const features = HeroLogic.getFeatures(props.hero)
			.filter(f => featureTypes.includes(f.feature.type));

		const showFeature = (feature: Feature) => {
			if (props.onSelectFeature) {
				props.onSelectFeature(feature);
			}
		};

		const getRow = (data: { feature: Feature, source: string }) => {
			return (
				<div key={data.feature.id} className='selectable-row clickable' onClick={() => showFeature(data.feature)}>
					<div><b>{data.feature.name}</b></div>
					{props.options.showSources ? <Tag variant='outlined'>{data.source}</Tag> : null}
				</div>
			);
		};

		const itemNames = props.hero.state.inventory.map(i => i.name);
		const mainFeatures = features.filter(f => !props.options.separateInventoryFeatures || !itemNames.includes(f.source));
		const inventoryFeatures = features.filter(f => props.options.separateInventoryFeatures && itemNames.includes(f.source));

		const useRows = props.options.compactView;

		return (
			<ErrorBoundary>
				<div className='features-section'>
					{
						mainFeatures.length > 0 ?
							<div className={`features-grid ${useRows ? 'compact' : ''}`}>
								{useRows ? <HeaderText level={props.options.compactView ? 3 : 1}>{i18next.format(t('features'), 'capitalize')}</HeaderText> : null}
								{
									mainFeatures.map(f =>
										useRows ?
											getRow(f)
											:
											<SelectablePanel key={f.feature.id} onSelect={() => showFeature(f.feature)}>
												<FeaturePanel
													feature={f.feature}
													source={props.options.showSources ? f.source : undefined}
													options={props.options}
													hero={props.hero}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
									)
								}
							</div>
							: null
					}
					{
						inventoryFeatures.length > 0 ?
							<div className={`features-grid ${useRows ? 'compact' : ''}`}>
								<HeaderText level={props.options.compactView ? 3 : 1}>{i18next.format(t('inventory'), 'capitalize')}</HeaderText>
								{
									inventoryFeatures.map(f =>
										useRows ?
											getRow(f)
											:
											<SelectablePanel key={f.feature.id} onSelect={() => showFeature(f.feature)}>
												<FeaturePanel
													feature={f.feature}
													source={props.options.showSources ? f.source : undefined}
													options={props.options}
													hero={props.hero}
													sourcebooks={props.sourcebooks}
													mode={PanelMode.Full}
												/>
											</SelectablePanel>
									)
								}
							</div>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	};

	const getAbilitiesSection = (title: string, abilities: { ability: Ability, source: string }[]) => {
		if (abilities.length === 0) {
			return null;
		}

		const showAbility = (ability: Ability) => {
			if (props.onSelectAbility) {
				props.onSelectAbility(ability);
			}
		};

		const getRow = (data: { ability: Ability, source: string }) => {
			return (
				<div key={data.ability.id} className='selectable-row clickable' onClick={() => showAbility(data.ability)}>
					<div><b>{i18next.format(t(data.ability.name), 'capitalize')}</b></div>
					<div>{data.ability.distance.map(d => AbilityLogic.getDistance(d, data.ability, props.hero)).join(' or ')}</div>
					<div>{i18next.format(t(data.ability.target), 'capitalize')}</div>
					{props.options.showSources ? <Tag variant='outlined'>{i18next.format(t(data.source), 'capitalize')}</Tag> : null}
					{
						data.ability.cost === 'signature' ?
							<Pill>{t('common.signatureAbility')}</Pill>
							:
							(data.ability.cost > 0) ? <ResourcePill value={data.ability.cost} repeatable={data.ability.repeatable} /> : null
					}
					{data.ability.type.trigger ? <div>{t(data.ability.type.trigger)}</div> : null}
				</div>
			);
		};

		const nonStandard = abilities.filter(a => a.source !== 'Standard');
		const standard = abilities.filter(a => a.source === 'Standard');

		const useRows = props.options.compactView;

		return (
			<ErrorBoundary>
				<div className='abilities-section'>
					{useRows ? <HeaderText level={props.options.compactView ? 3 : 1}>{t(title)}</HeaderText> : null}
					{
						(nonStandard.length === 0) && (standard.length === 0) ?
							<Empty />
							: null
					}
					<div className={`abilities-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
						{
							nonStandard.map(a =>
								useRows ?
									getRow(a)
									:
									<SelectablePanel key={a.ability.id} style={isSmall ? undefined : { gridColumn: `span ${AbilityLogic.getPanelWidth(a.ability)}` }} onSelect={() => showAbility(a.ability)}>
										<AbilityPanel
											ability={a.ability}
											hero={props.hero}
											options={props.options}
											mode={PanelMode.Full}
											tags={props.options.showSources ? [ a.source ] : undefined}
										/>
									</SelectablePanel>
							)
						}
					</div>
					{
						(nonStandard.length > 0) && (standard.length > 0) ?
							<Divider />
							: null
					}
					<div className={`abilities-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
						{
							standard.map(a =>
								useRows ?
									getRow(a)
									:
									<SelectablePanel key={a.ability.id} style={{ gridColumn: `span ${AbilityLogic.getPanelWidth(a.ability)}` }} onSelect={() => showAbility(a.ability)}>
										<AbilityPanel
											ability={a.ability}
											hero={props.hero}
											options={props.options}
											mode={PanelMode.Full}
											tags={props.options.showSources ? [ a.source ] : undefined}
										/>
									</SelectablePanel>
							)
						}
					</div>
				</div>
			</ErrorBoundary>
		);
	};

	const getRetinueSection = () => {
		const onSelectMonster = (monster: Monster, summon?: SummoningInfo) => {
			if (props.onSelectMonster) {
				props.onSelectMonster(monster, summon);
			}
		};

		const onSelectFollower = (follower: Follower) => {
			if (props.onSelectFollower) {
				props.onSelectFollower(follower);
			}
		};

		const useRows = props.options.compactView;

		const monsters: { monster: Monster, summon?: SummoningInfo }[] = [
			...HeroLogic.getCompanions(props.hero).map(m => ({ monster: m, summon: undefined })),
			...HeroLogic.getRetainers(props.hero).map(m => ({ monster: m, summon: undefined })),
			...HeroLogic.getSummons(props.hero).map(m => ({ monster: m.monster, summon: m.info }))
		];

		const followers = HeroLogic.getFollowers(props.hero);

		return (
			<ErrorBoundary>
				<div className='retinue-section'>
					{
						monsters.length > 0 ?
							<>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										Collections.sort(monsters, m => m.monster.name).map(m =>
											useRows ?
												<div key={m.monster.id} className='selectable-row clickable' onClick={() => onSelectMonster(m.monster, m.summon)}>
													<div>{i18next.format(t('monsterCompanion_one'), 'capitalize')}: <b>{i18next.format(t(m.monster.name), 'capitalize')}</b></div>
												</div>
												:
												<SelectablePanel key={m.monster.id} onSelect={() => onSelectMonster(m.monster, m.summon)}>
													<MonsterPanel monster={m.monster} summon={m.summon} sourcebooks={props.sourcebooks} options={props.options} />
												</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
					{
						followers.length > 0 ?
							<>
								<HeaderText level={props.options.compactView ? 3 : 1}>{i18next.format(t('follower_other'), 'capitalize')}</HeaderText>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										followers.map(follower =>
											useRows ?
												<div key={follower.id} className='selectable-row clickable' onClick={() => onSelectFollower(follower)}>
													<div>{i18next.format(t('follower_one'), 'capitalize')}: <b>{follower.name}</b></div>
												</div>
												:
												<SelectablePanel key={follower.id} onSelect={() => onSelectFollower(follower)}>
													<FollowerPanel follower={follower} />
												</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	};

	const getTabs = () => {
		const tabs: string[] = [];

		tabs.push('Hero');
		tabs.push('Features');

		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.shownStandardAbilities);
		if (props.options.compactView) {
			if (abilities.length > 0) {
				tabs.push('Abilities');
			}
		} else {
			const mains = abilities.filter(a => a.ability.type.usage === AbilityUsage.MainAction);
			const maneuvers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Maneuver);
			const moves = abilities.filter(a => a.ability.type.usage === AbilityUsage.Move);
			const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
			const others = abilities.filter(a => (a.ability.type.usage === AbilityUsage.Other) || (a.ability.type.usage === AbilityUsage.NoAction));

			if (mains.length > 0) {
				tabs.push('Mains');
			}
			if (maneuvers.length > 0) {
				tabs.push('Maneuvers');
			}
			if (moves.length > 0) {
				tabs.push('Moves');
			}
			if (triggers.length > 0) {
				tabs.push('Triggers');
			}
			if (others.length > 0) {
				tabs.push('Others');
			}
			tabs.push('Free Strikes');
		}

		const retinue = HeroLogic.getCompanions(props.hero).length + HeroLogic.getFollowers(props.hero).length + HeroLogic.getRetainers(props.hero).length + HeroLogic.getSummons(props.hero).length;
		if (retinue > 0) {
			tabs.push('Retinue');
		}

		return tabs;
	};

	const getContent = (tab: string) => {
		const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.shownStandardAbilities);
		const mains = abilities.filter(a => a.ability.type.usage === AbilityUsage.MainAction);
		const maneuvers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Maneuver);
		const moves = abilities.filter(a => a.ability.type.usage === AbilityUsage.Move);
		const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
		const others = abilities.filter(a => (a.ability.type.usage === AbilityUsage.Other) || (a.ability.type.usage === AbilityUsage.NoAction));

		switch (tab) {
			case 'Hero':
				return (
					<>
						{getNameSection()}
						{getStatsSection()}
						{getChoicesSection()}
						{isSmall || props.options.singlePage ? getSidebarSection() : null}
					</>
				);
			case 'Features':
				return getFeaturesSection();
			case 'Abilities':
				return (
					<>
						{getAbilitiesSection('Main Actions', mains)}
						{getAbilitiesSection('Maneuvers', maneuvers)}
						{getAbilitiesSection('Move Actions', moves)}
						{getAbilitiesSection('Triggered Actions', triggers)}
						{getAbilitiesSection('Other Abilities', others)}
						{getAbilitiesSection('Free Strikes', [
							{ ability: AbilityData.freeStrikeMelee, source: 'Standard' },
							{ ability: AbilityData.freeStrikeRanged, source: 'Standard' }
						])}
					</>
				);
			case 'Mains':
				return getAbilitiesSection('Main Actions', mains);
			case 'Maneuvers':
				return getAbilitiesSection('Maneuvers', maneuvers);
			case 'Moves':
				return getAbilitiesSection('Move Actions', moves);
			case 'Triggers':
				return getAbilitiesSection('Triggered Actions', triggers);
			case 'Others':
				return getAbilitiesSection('Other Abilities', others);
			case 'Free Strikes':
				return getAbilitiesSection('Free Strikes', [
					{ ability: AbilityData.freeStrikeMelee, source: 'Standard' },
					{ ability: AbilityData.freeStrikeRanged, source: 'Standard' },
					...abilities.filter(a => a.ability.type.freeStrike)
				]);
			case 'Retinue':
				return getRetinueSection();
		}

		return null;
	};

	if (props.mode !== PanelMode.Full) {
		const background: string[] = [];
		if (props.hero.culture && (props.hero.culture.id !== CultureData.bespoke.id)) {
			background.push(props.hero.culture.name);
		}
		if (props.hero.career) {
			background.push(props.hero.career.name);

			if (props.hero.career.incitingIncidents.selected) {
				background.push(props.hero.career.incitingIncidents.selected.name);
			}
		}

		return (
			<ErrorBoundary>
				<div className='hero-panel compact'>
					<HeaderText
						level={1}
						ribbon={props.hero.picture ? <HeroToken hero={props.hero} size={34} /> : null}
						tags={props.hero.folder ? [ props.hero.folder ] : []}
					>
						{props.hero.name || t('hero:unnamedHero')}
					</HeaderText>
					{
						props.hero.ancestry ?
							<Field
								label={i18next.format(t('ancestry'), 'capitalize')}
								value={i18next.format(t(`${props.hero.ancestry.languageKey}.name_one`), 'capitalize')}
							/>
							: null
					}
					{
						background.length > 0 ?
							<Field
								label={i18next.format(t('background'), 'capitalize')}
								value={background.map(b => i18next.format(t(b), 'capitalize')).join(' / ')}
							/>
							: null
					}
					{
						props.hero.class ?
							<Field
								label={i18next.format(t('class'), 'capitalize')}
								value={`${i18next.format(t(props.hero.class.name), 'capitalize')} (${[ i18next.format(t('levelWithCount_other', { count: props.hero.class.level }), 'capitalize'), ...props.hero.class.subclasses.filter(sc => sc.selected).map(sc => i18next.format(t(sc.name), 'capitalize')) ].join(' ')})`}
							/>
							: null
					}
					{
						props.hero.complication ?
							<Field
								label={i18next.format(t('complication'), 'capitalize')}
								value={i18next.format(t(props.hero.complication.name), 'capitalize')}
							/>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary>
			<div className='hero-panel' id={SheetFormatter.getPageId('hero', props.hero.id)}>
				<div className='hero-main-section'>
					{!isSmall && !props.options.singlePage ? <StatsSidebarPanel hero={props.hero} showStats={tab !== 'Hero'} /> : null}
					<div className='hero-center-column'>
						{
							props.options.singlePage ?
								null
								:
								<div className='center-top'>
									<Flex align='center' justify='space-between' gap={10}>
										{
											isSmall ?
												<Select
													style={{ flex: '1 1 0' }}
													options={
														getTabs().map(tab => ({
															value: tab,
															label: tab
														}))
													}
													optionRender={o => <div className='ds-text'>{o.label}</div>}
													value={tab}
													onChange={setTab}
												/>
												:
												<Segmented
													style={{ flex: '1 1 0' }}
													name='sections'
													block={true}
													options={
														getTabs().map(tab => ({
															value: tab,
															label: tab
														}))
													}
													value={tab}
													onChange={setTab}
												/>
										}
									</Flex>
								</div>
						}
						<div className='center-content'>
							{
								props.options.singlePage ?
									getTabs().map(tab => <div key={tab}>{getContent(tab)}</div>)
									:
									getContent(tab)
							}
						</div>
					</div>
					{!isSmall && !props.options.singlePage ? getSidebarSection() : null}
				</div>
			</div>
		</ErrorBoundary>
	);
};
