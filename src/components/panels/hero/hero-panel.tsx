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
import { Complication } from '@/models/complication';
import { ConditionLogic } from '@/logic/condition-logic';
import { ConditionType } from '@/enums/condition-type';
import { Culture } from '@/models/culture';
import { CultureData } from '@/data/culture-data';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { Domain } from '@/models/domain';
import { Element } from '@/models/element';
import { Empty } from '@/components/controls/empty/empty';
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
	onshowReference?: (page: RulesPage) => void;
}

export const HeroPanel = (props: Props) => {
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
				{props.hero.name || 'Unnamed Hero'}
			</HeaderText>
		);
	};

	const getSidebarSection = () => {
		const onShowStats = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Hero);
			}
		};

		const onShowVitals = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Vitals);
			}
		};

		const onShowConditions = () => {
			if (props.onshowReference) {
				props.onshowReference(RulesPage.Conditions);
			}
		};

		const onShowSkills = () => {
			if (props.onshowReference) {
				props.onshowReference(RulesPage.Skills);
			}
		};

		const onShowLanguages = () => {
			if (props.onshowReference) {
				props.onshowReference(RulesPage.Languages);
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
									{s.name} {props.options.showSkillsInGroups ? null : <Tag>{s.list}</Tag>}
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
						(heroicResources.length > 0) && !props.options.singlePage ?
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
						(triggers.length > 0) && !props.options.singlePage ?
							useRows ?
								<div className='selectable-row clickable' onClick={() => setTab('Triggers')}>
									<div>Triggers: <b>{triggers.map(t => t.ability.name).join(', ')}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={() => setTab('Triggers')}>
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
		const speedStr = speed.modes.length === 0 ? 'Speed' : `Speed (${FormatLogic.getSpeedModes(speed.modes).toLowerCase()})`;

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

		const onShowHero = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Hero);
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
					<Flex gap={5}>
						<StatsRow caption={isSmall ? 'M' : 'Might'} onClick={() => onSelectCharacteristic(Characteristic.Might)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
						</StatsRow>
						<StatsRow caption={isSmall ? 'A' : 'Agility'} onClick={() => onSelectCharacteristic(Characteristic.Agility)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
						</StatsRow>
						<StatsRow caption={isSmall ? 'R' : 'Reason'} onClick={() => onSelectCharacteristic(Characteristic.Reason)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
						</StatsRow>
						<StatsRow caption={isSmall ? 'I' : 'Intuition'} onClick={() => onSelectCharacteristic(Characteristic.Intuition)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
						</StatsRow>
						<StatsRow caption={isSmall ? 'P' : 'Presence'} onClick={() => onSelectCharacteristic(Characteristic.Presence)} style={{ flex: '1 1 0' }}>
							<Statistic value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
						</StatsRow>
					</Flex>
					{
						useRows ?
							<>
								<div className='selectable-row clickable' onClick={onShowHero}>
									{
										HeroLogic.getHeroicResources(props.hero).map(hr => (
											<div key={hr.id}>{hr.name}: <b>{hr.value}</b></div>
										))
									}
									<div>Surges: <b>{props.hero.state.surges}</b></div>
									<div>Victories: <b>{props.hero.state.victories}</b></div>
									<div>XP: <b>{props.hero.state.xp}</b></div>
									<div>Renown: <b>{HeroLogic.getRenown(props.hero)}</b></div>
									<div>Wealth: <b>{HeroLogic.getWealth(props.hero)}</b></div>
								</div>
								<div className='selectable-row'>
									<div>Size: <b>{FormatLogic.getSize(size)}</b></div>
									<div>{speedStr}: <b>{speed.value}</b></div>
									<div>Stability: <b>{HeroLogic.getStability(props.hero)}</b></div>
									<div>Disengage: <b>{HeroLogic.getDisengage(props.hero)}</b></div>
									<div>Save: <b>{HeroLogic.getSaveThreshold(props.hero)}</b></div>
								</div>
								<div className='selectable-row clickable' onClick={onShowVitals}>
									<div>Stamina: <b>{stamina}</b></div>
									<div>Recoveries: <b>{recoveries}</b></div>
									<div>Recovery Value: <b>{HeroLogic.getRecoveryValue(props.hero)}</b></div>
								</div>
							</>
							:
							<>
								<StatsRow caption='Resources' onClick={onShowHero}>
									{
										HeroLogic.getHeroicResources(props.hero).map(hr => (
											<Statistic key={hr.id} title={hr.name} value={hr.value} />
										))
									}
									<Statistic title='Surges' value={props.hero.state.surges} />
									<Statistic title='Victories' value={props.hero.state.victories} />
									<Statistic title='XP' value={props.hero.state.xp} suffix={xpSuffix} />
									<Statistic title='Renown' value={HeroLogic.getRenown(props.hero)} />
									<Statistic title='Wealth' value={HeroLogic.getWealth(props.hero)} />
								</StatsRow>
								<Flex gap={20}>
									<StatsRow caption='Statistics' style={{ flex: '5 5 0' }}>
										<Statistic title='Size' value={size.value} suffix={sizeSuffix} />
										<Statistic title={speedStr} value={speed.value} suffix={speedSuffix} />
										<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
										<Statistic title='Disengage' value={HeroLogic.getDisengage(props.hero)} />
										<Statistic title='Save' value={HeroLogic.getSaveThreshold(props.hero)} suffix={HeroLogic.getSaveBonus(props.hero) ? `+${HeroLogic.getSaveBonus(props.hero)}` : undefined} />
									</StatsRow>
									<StatsRow caption='Vitals' onClick={onShowVitals} style={{ flex: '3 3 0' }}>
										<Statistic title='Stamina' value={stamina} suffix={staminaSuffix} />
										<Statistic title='Recoveries' value={recoveries} suffix={recoveriesSuffix} />
										<Statistic title='Recovery Value' value={HeroLogic.getRecoveryValue(props.hero)} />
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
									<div>Ancestry: <b>{props.hero.ancestry.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectAncestry}>
									<HeaderText>Ancestry</HeaderText>
									<Field label='Ancestry' value={props.hero.ancestry.name} />
									{HeroLogic.getFormerAncestries(props.hero).map(a => <Field key={a.id} label='Former Life' value={a.name} />)}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>Ancestry</HeaderText>
								<div className='ds-text dimmed-text'>No ancestry chosen</div>
							</div>
					}
					{
						props.hero.culture ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectCulture}>
									<div>Culture: <b>{props.hero.culture.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectCulture}>
									<HeaderText>Culture</HeaderText>
									{props.hero.culture ? <Field label='Culture' value={props.hero.culture.name} /> : null}
									{props.hero.culture.environment ? <Field label='Environment' value={props.hero.culture.environment.name} /> : null}
									{props.hero.culture.organization ? <Field label='Organization' value={props.hero.culture.organization.name} /> : null}
									{props.hero.culture.upbringing ? <Field label='Upbringing' value={props.hero.culture.upbringing.name} /> : null}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>Culture</HeaderText>
								<div className='ds-text dimmed-text'>No culture chosen</div>
							</div>
					}
					{
						props.hero.career ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectCareer}>
									<div>Career: <b>{props.hero.career.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectCareer}>
									<HeaderText>Career</HeaderText>
									<Field label='Career' value={props.hero.career.name} />
									{incitingIncident ? <Field label='Inciting Incident' value={incitingIncident.name} /> : null}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>Career</HeaderText>
								<div className='ds-text dimmed-text'>No career chosen</div>
							</div>
					}
					{
						props.hero.class ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectClass}>
									{
										props.hero.class.subclasses.filter(sc => sc.selected).length > 0 ?
											<div>Class: <b>{props.hero.class.name} ({props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.name).join(' ')}, level {props.hero.class.level})</b></div>
											:
											<div>Class: <b>{props.hero.class.name} (level {props.hero.class.level})</b></div>
									}
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectClass}>
									<HeaderText>Class</HeaderText>
									<Field label='Class' value={props.hero.class.name} />
									<Field label='Level' value={props.hero.class.level} />
									{
										props.hero.class.subclasses.filter(sc => sc.selected).length > 0 ?
											<Field label={props.hero.class.subclassName} value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.name).join(', ') || ''} />
											: null
									}
								</div>
							:
							<div className='overview-tile'>
								<HeaderText>Class</HeaderText>
								<div className='ds-text dimmed-text'>No class chosen</div>
							</div>
					}
					{
						HeroLogic.getDomains(props.hero).length > 0 ?
							HeroLogic.getDomains(props.hero).map(domain =>
								useRows ?
									<div key={domain.id} className='selectable-row clickable' onClick={() => onSelectDomain(domain)}>
										<div>Domain: <b>{domain.name}</b></div>
									</div>
									:
									<div key={domain.id} className='overview-tile clickable' onClick={() => onSelectDomain(domain)}>
										<HeaderText>Domain</HeaderText>
										<Field label='Domain' value={domain.name} />
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
										<div>Kit: <b>{kit.name}</b></div>
									</div>
									:
									<div key={kit.id} className='overview-tile clickable' onClick={() => onSelectKit(kit)}>
										<HeaderText>Kit</HeaderText>
										<Field label='Kit' value={kit.name} />
										{kit.armor.length > 0 ? <Field label='Armor' value={kit.armor.join(', ')} /> : null}
										{kit.weapon.length > 0 ? <Field label='Weapons' value={kit.weapon.join(', ')} /> : null}
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
										<div>Title: <b>{title.name}</b></div>
									</div>
									:
									<div key={title.id} className='overview-tile clickable' onClick={() => onSelectTitle(title)}>
										<HeaderText>Title</HeaderText>
										<Field label='Title' value={title.name} />
									</div>
							)
							:
							null
					}
					{
						props.hero.complication ?
							useRows ?
								<div className='selectable-row clickable' onClick={onSelectComplication}>
									<div>Complication: <b>{props.hero.complication.name}</b></div>
								</div>
								:
								<div className='overview-tile clickable' onClick={onSelectComplication}>
									<HeaderText>Complication</HeaderText>
									<Field label='Complication' value={props.hero.complication.name} />
								</div>
							:
							null
					}
					{
						props.hero.state.projects.length > 0 ?
							props.hero.state.projects.map(project =>
								useRows ?
									<div key={project.id} className='selectable-row clickable' onClick={onSelectProject}>
										<div>Project: <b>{project.name}</b></div>
									</div>
									:
									<div key={project.id} className='overview-tile clickable' onClick={onSelectProject}>
										<HeaderText>Project</HeaderText>
										<Field label='Project' value={project.name} />
										{project.progress ? <Field label='State' value={ProjectLogic.getStatus(project)} /> : null}
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
					{props.options.showSources ? <Tag>{data.source}</Tag> : null}
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
								{useRows ? <HeaderText level={props.options.compactView ? 3 : 1}>Features</HeaderText> : null}
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
								<HeaderText level={props.options.compactView ? 3 : 1}>Inventory</HeaderText>
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
					<div><b>{data.ability.name}</b></div>
					<div>{data.ability.distance.map(d => AbilityLogic.getDistance(d, data.ability, props.hero)).join(' or ')}</div>
					<div>{data.ability.target}</div>
					{props.options.showSources ? <Tag>{data.source}</Tag> : null}
					{
						data.ability.cost === 'signature' ?
							<Pill>Signature</Pill>
							:
							(data.ability.cost > 0) ? <ResourcePill value={data.ability.cost} repeatable={data.ability.repeatable} /> : null
					}
					{data.ability.type.trigger ? <div>{data.ability.type.trigger}</div> : null}
				</div>
			);
		};

		const nonStandard = abilities.filter(a => a.source !== 'Standard');
		const standard = abilities.filter(a => a.source === 'Standard');

		const useRows = props.options.compactView;

		return (
			<ErrorBoundary>
				<div className='abilities-section'>
					{useRows ? <HeaderText level={props.options.compactView ? 3 : 1}>{title}</HeaderText> : null}
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

		const companions = HeroLogic.getCompanions(props.hero);
		const followers = HeroLogic.getFollowers(props.hero);
		const retainers = HeroLogic.getRetainers(props.hero);
		const summons = HeroLogic.getSummons(props.hero);

		return (
			<ErrorBoundary>
				<div className='retinue-section'>
					{
						companions.length > 0 ?
							<>
								<HeaderText level={props.options.compactView ? 3 : 1}>Companions</HeaderText>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										companions.map(monster =>
											useRows ?
												<div key={monster.id} className='selectable-row clickable' onClick={() => onSelectMonster(monster)}>
													<div>Companion: <b>{monster.name}</b></div>
												</div>
												:
												<SelectablePanel key={monster.id} onSelect={() => onSelectMonster(monster)}>
													<MonsterPanel monster={monster} sourcebooks={props.sourcebooks} options={props.options} />
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
								<HeaderText level={props.options.compactView ? 3 : 1}>Followers</HeaderText>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										followers.map(follower =>
											useRows ?
												<div key={follower.id} className='selectable-row clickable' onClick={() => onSelectFollower(follower)}>
													<div>Follower: <b>{follower.name}</b></div>
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
					{
						retainers.length > 0 ?
							<>
								<HeaderText level={props.options.compactView ? 3 : 1}>Retainers</HeaderText>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										retainers.map(monster =>
											useRows ?
												<div key={monster.id} className='selectable-row clickable' onClick={() => onSelectMonster(monster)}>
													<div>Companion: <b>{monster.name}</b></div>
												</div>
												:
												<SelectablePanel key={monster.id} onSelect={() => onSelectMonster(monster)}>
													<MonsterPanel monster={monster} sourcebooks={props.sourcebooks} options={props.options} />
												</SelectablePanel>
										)
									}
								</div>
							</>
							: null
					}
					{
						summons.length > 0 ?
							<>
								<HeaderText level={props.options.compactView ? 3 : 1}>Summons</HeaderText>
								<div className={`retinue-grid ${useRows ? 'compact' : ''} ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
									{
										summons.map(summon =>
											useRows ?
												<div key={summon.id} className='selectable-row clickable' onClick={() => onSelectMonster(summon.monster)}>
													<div>Summon: <b>{summon.monster.name}</b></div>
												</div>
												:
												<SelectablePanel key={summon.id} onSelect={() => onSelectMonster(summon.monster)}>
													<MonsterPanel monster={summon.monster} summon={summon.info} sourcebooks={props.sourcebooks} options={props.options} />
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
						{props.hero.name || 'Unnamed Hero'}
					</HeaderText>
					{
						props.hero.ancestry ?
							<Field
								label='Ancestry'
								value={props.hero.ancestry.name}
							/>
							: null
					}
					{
						background.length > 0 ?
							<Field
								label='Background'
								value={background.join(' / ')}
							/>
							: null
					}
					{
						props.hero.class ?
							<Field
								label='Class'
								value={`${props.hero.class.name} (${[ `Level ${props.hero.class.level}`, ...props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.name) ].join(' ')})`}
							/>
							: null
					}
					{
						props.hero.complication ?
							<Field
								label='Complication'
								value={props.hero.complication.name}
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
