import { Col, Divider, Flex, Row, Segmented, Select, Space, Statistic, Tag } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { Ability } from '../../../models/ability';
import { AbilityData } from '../../../data/ability-data';
import { AbilityLogic } from '../../../logic/ability-logic';
import { AbilityPanel } from '../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Ancestry } from '../../../models/ancestry';
import { ArrowDownOutlined } from '@ant-design/icons';
import { Career } from '../../../models/career';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { Complication } from '../../../models/complication';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Culture } from '../../../models/culture';
import { CultureData } from '../../../data/culture-data';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { Domain } from '../../../models/domain';
import { Element } from '../../../models/element';
import { Empty } from '../../controls/empty/empty';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { Follower } from '../../../models/follower';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { Kit } from '../../../models/kit';
import { Markdown } from '../../controls/markdown/markdown';
import { MonsterInfo } from '../../controls/token/token';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { Pill } from '../../controls/pill/pill';
import { RulesPage } from '../../../enums/rules-page';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Skill } from '../../../models/skill';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { Title } from '../../../models/title';
import { useMediaQuery } from '../../../hooks/use-media-query';
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
 	onSelectCompanion?: (monster: Monster, monsterGroup?: MonsterGroup) => void;
 	onSelectFollower?: (follower: Follower) => void;
 	onSelectCharacteristic?: (characteristic: Characteristic) => void;
 	onSelectAbility?: (ability: Ability) => void;
 	onShowState?: (page: HeroStatePage) => void;
 	onshowReference?: (page: RulesPage) => void;
}

export const HeroPanel = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const [ tab, setTab ] = useState<string>('Hero');

	try {
		const getNameSection = () => {
			return (
				<HeaderText
					style={{ marginTop: '5px' }}
					level={1}
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

			const onShowProjects = () => {
				if (props.onShowState) {
					props.onShowState(HeroStatePage.Projects);
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

			const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.showStandardAbilities);
			const heroicResources = HeroLogic.getFeatures(props.hero).map(f => f.feature).filter(f => f.type === FeatureType.HeroicResource);
			const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
			const languages = HeroLogic.getLanguages(props.hero, props.sourcebooks);

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
					:
					<div key={label} className='overview-tile'>
						<HeaderText>{label}</HeaderText>
						<div className='ds-text dimmed-text'>None</div>
					</div>;
			};

			return (
				<div className={isSmall || props.options.singlePage ? 'hero-sidebar grid' : 'hero-sidebar column'}>
					{
						HeroLogic.getCombatState(props.hero) === 'dying' ?
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
						props.hero.state.conditions.map(c => (
							<div key={c.id} className='overview-tile warning clickable' onClick={onShowVitals}>
								<HeaderText tags={[ c.ends ]}>{c.type}</HeaderText>
								<Markdown text={c.type === ConditionType.Custom ? c.text || 'A custom condition.' : ConditionLogic.getDescription(c.type)} />
							</div>
						))
					}
					{
						(heroicResources.length > 0) && !props.options.singlePage ?
							<>
								{
									heroicResources.map(f => (
										<div key={f.id} className='overview-tile clickable' onClick={onShowStats}>
											<HeaderText
												extra={<div style={{ fontSize: '16px', fontWeight: '600' }}>{f.data.value}</div>}
											>
												{f.name}
											</HeaderText>
											{
												f.data.gains.map((g, n) => (
													<Flex key={n} align='center' justify='space-between' gap={10}>
														<div className='ds-text compact-text'>{g.trigger}</div>
														<Pill>+{g.value}</Pill>
													</Flex>
												))
											}
										</div>
									))
								}
							</>
							: null
					}
					{
						(triggers.length > 0) && !props.options.singlePage ?
							<div className='overview-tile clickable' onClick={() => setTab('Triggers')}>
								<HeaderText>Triggered Actions</HeaderText>
								<Space direction='vertical'>
									{triggers.map(t => getTrigger(t.ability))}
								</Space>
							</div>
							: null
					}
					{
						conditionImmunities.length > 0 ?
							<div className='overview-tile clickable' onClick={onShowConditions}>
								<HeaderText>Cannot Be</HeaderText>
								{conditionImmunities.map((c, n) => <div key={n} className='ds-text'>{c}</div>)}
							</div>
							: null
					}
					{
						damageImmunities.length > 0 ?
							<div className='overview-tile'>
								<HeaderText>Immunities</HeaderText>
								{damageImmunities.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
							</div>
							: null
					}
					{
						damageWeaknesses.length > 0 ?
							<div className='overview-tile'>
								<HeaderText>Weaknesses</HeaderText>
								{damageWeaknesses.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
							</div>
							: null
					}
					<div className='overview-tile clickable' onClick={onShowLanguages}>
						<HeaderText>Languages</HeaderText>
						{
							languages.length > 0 ?
								languages.map(l => <div key={l.name} className='ds-text'>{l.name}</div>)
								:
								<div className='ds-text dimmed-text'>None</div>
						}
					</div>
					{
						(props.options.showSkillsInGroups || false) ?
							[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
								.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, props.sourcebooks).filter(s => s.list === list)))
							:
							getSkills('Skills', HeroLogic.getSkills(props.hero, props.sourcebooks))
					}
					{
						props.hero.state.projects.length > 0 ?
							<div key='projects' className='overview-tile clickable' onClick={onShowProjects}>
								<HeaderText>Projects</HeaderText>
								{
									props.hero.state.projects.map(p => (
										<Flex key={p.id} align='center' justify='space-between' gap={10}>
											<div className='ds-text compact-text'>{p.name}</div>
											{
												p.progress ?
													<div className='ds-text compact-text'>
														{p.goal > 0 ? `${Math.round(100 * p.progress.points / p.goal)}%` : `${p.goal}`}
													</div>
													: null
											}
										</Flex>
									))
								}
							</div>
							: null
					}
				</div>
			);
		};

		const getStatsSection = () => {
			const sizeSmall = {
				xs: 24,
				sm: 24,
				md: 24,
				lg: 10,
				xl: 10,
				xxl: 10
			};

			const sizeLarge = {
				xs: 24,
				sm: 24,
				md: 24,
				lg: 14,
				xl: 14,
				xxl: 14
			};

			const size = HeroLogic.getSize(props.hero);
			const sizeSuffix = size.mod || undefined;

			const speed = HeroLogic.getSpeed(props.hero);
			const speedSuffix = HeroLogic.getSpeedModified(props.hero) ? <ArrowDownOutlined /> : undefined;

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
				<Row gutter={[ 16, 16 ]} className='stats-section'>
					<Col span={24}>
						<div className='stats-box'>
							<div className='stats'>
								<div className='stat clickable' onClick={() => onSelectCharacteristic(Characteristic.Might)}>
									<Statistic title='Might' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
								</div>
								<div className='stat clickable' onClick={() => onSelectCharacteristic(Characteristic.Agility)}>
									<Statistic title='Agility' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
								</div>
								<div className='stat clickable' onClick={() => onSelectCharacteristic(Characteristic.Reason)}>
									<Statistic title='Reason' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
								</div>
								<div className='stat clickable' onClick={() => onSelectCharacteristic(Characteristic.Intuition)}>
									<Statistic title='Intuition' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
								</div>
								<div className='stat clickable' onClick={() => onSelectCharacteristic(Characteristic.Presence)}>
									<Statistic title='Presence' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
								</div>
							</div>
							<div className='stats-box-caption'>Characteristics</div>
						</div>
					</Col>
					<Col span={24}>
						<div className='stats-box clickable' onClick={onShowHero}>
							<div className='stats'>
								{
									HeroLogic.getFeatures(props.hero).map(f => f.feature).filter(f => f.type === FeatureType.HeroicResource).map(f => (
										<div key={f.id} className='stat'>
											<Statistic title={f.name} value={f.data.value} />
										</div>
									))
								}
								<div className='stat'>
									<Statistic title='Surges' value={props.hero.state.surges} />
								</div>
								<div className='stat'>
									<Statistic title='Victories' value={props.hero.state.victories} />
								</div>
								<div className='stat'>
									<Statistic title='XP' value={props.hero.state.xp} />
								</div>
								<div className='stat'>
									<Statistic title='Renown' value={HeroLogic.getRenown(props.hero)} />
								</div>
								<div className='stat'>
									<Statistic title='Wealth' value={HeroLogic.getWealth(props.hero)} />
								</div>
							</div>
							<div className='stats-box-caption'>Resources</div>
						</div>
					</Col>
					<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
						<div className='stats-box'>
							<div className='stats'>
								<div className='stat'>
									<Statistic title='Size' value={size.value} suffix={sizeSuffix} />
								</div>
								<div className='stat'>
									<Statistic title='Speed' value={speed} suffix={speedSuffix} />
								</div>
								<div className='stat'>
									<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
								</div>
								<div className='stat'>
									<Statistic title='Disengage' value={HeroLogic.getDisengage(props.hero)} />
								</div>
							</div>
							<div className='stats-box-caption'>Statistics</div>
						</div>
					</Col>
					<Col xs={sizeSmall.xs} sm={sizeSmall.sm} md={sizeSmall.md} lg={sizeSmall.lg} xl={sizeSmall.xl} xxl={sizeSmall.xxl}>
						<div className='stats-box clickable' onClick={onShowVitals}>
							<div className='stats'>
								<div className='stat'>
									<Statistic title='Stamina' value={stamina} suffix={staminaSuffix} />
								</div>
								<div className='stat'>
									<Statistic title='Recoveries' value={recoveries} suffix={recoveriesSuffix} />
								</div>
								<div className='stat'>
									<Statistic title='Recov Value' value={HeroLogic.getRecoveryValue(props.hero)} />
								</div>
							</div>
							<div className='stats-box-caption'>Health</div>
						</div>
					</Col>
				</Row>
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

			const onSelectCompanion = (monster: Monster) => {
				if (props.onSelectCompanion) {
					props.onSelectCompanion(monster);
				}
			};

			const onSelectFollower = (follower: Follower) => {
				if (props.onSelectFollower) {
					props.onSelectFollower(follower);
				}
			};

			let incitingIncident: Element | null = null;
			if (props.hero.career && props.hero.career.incitingIncidents.selectedID) {
				incitingIncident = props.hero.career.incitingIncidents.options.find(o => o.id === props.hero.career?.incitingIncidents.selectedID) || null;
			}

			return (
				<div className='choices-section'>
					{
						props.hero.ancestry ?
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
							<div className='overview-tile clickable' onClick={onSelectCulture}>
								<HeaderText>Culture</HeaderText>
								{props.hero.culture.id !== CultureData.bespoke.id ? <Field label='Culture' value={props.hero.culture.name} /> : null}
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
							HeroLogic.getDomains(props.hero).map(domain => (
								<div key={domain.id} className='overview-tile clickable' onClick={() => onSelectDomain(domain)}>
									<HeaderText>Domain</HeaderText>
									<Field label='Domain' value={domain.name} />
								</div>
							))
							:
							null
					}
					{
						HeroLogic.getKits(props.hero).length > 0 ?
							HeroLogic.getKits(props.hero).map(kit => (
								<div key={kit.id} className='overview-tile clickable' onClick={() => onSelectKit(kit)}>
									<HeaderText>Kit</HeaderText>
									<Field label='Kit' value={kit.name} />
									{kit.armor.length > 0 ? <Field label='Armor' value={kit.armor.join(', ')} /> : null}
									{kit.weapon.length > 0 ? <Field label='Weapons' value={kit.weapon.join(', ')} /> : null}
								</div>
							))
							:
							null
					}
					{
						HeroLogic.getTitles(props.hero).length > 0 ?
							HeroLogic.getTitles(props.hero).map(title => (
								<div key={title.id} className='overview-tile clickable' onClick={() => onSelectTitle(title)}>
									<HeaderText>Title</HeaderText>
									<Field label='Title' value={title.name} />
								</div>
							))
							:
							null
					}
					{
						props.hero.complication ?
							<div className='overview-tile clickable' onClick={onSelectComplication}>
								<HeaderText>Complication</HeaderText>
								<Field label='Complication' value={props.hero.complication.name} />
							</div>
							:
							null
					}
					{
						HeroLogic.getCompanions(props.hero).length > 0 ?
							HeroLogic.getCompanions(props.hero).map(monster => (
								<div key={monster.id} className='overview-tile clickable' onClick={() => onSelectCompanion(monster)}>
									<HeaderText>Companion</HeaderText>
									<MonsterInfo monster={monster} style={{ marginBottom: '10px' }} />
								</div>
							))
							:
							null
					}
					{
						HeroLogic.getFollowers(props.hero).length > 0 ?
							HeroLogic.getFollowers(props.hero).map(follower => (
								<div key={follower.id} className='overview-tile clickable' onClick={() => onSelectFollower(follower)}>
									<HeaderText>Follower</HeaderText>
									<Field label='Name' value={follower.name || 'Follower'} />
									<Field label='Type' value={follower.type} />
								</div>
							))
							:
							null
					}
				</div>
			);
		};

		const getFeaturesSection = () => {
			const featureTypes = [ FeatureType.Text, FeatureType.HeroicResource, FeatureType.Package ];

			const features = HeroLogic.getFeatures(props.hero)
				.filter(f => featureTypes.includes(f.feature.type));

			const itemNames = props.hero.state.inventory.map(i => i.name);
			const mainFeatures = features.filter(f => !props.options.separateInventoryFeatures || !itemNames.includes(f.source));
			const inventoryFeatures = features.filter(f => props.options.separateInventoryFeatures && itemNames.includes(f.source));

			return (
				<>
					{
						mainFeatures.length > 0 ?
							<>
								{
									mainFeatures.map(f => (
										<FeaturePanel
											key={f.feature.id}
											feature={f.feature}
											source={props.options.showSources ? f.source : undefined}
											options={props.options}
											hero={props.hero}
											sourcebooks={props.sourcebooks}
											mode={PanelMode.Full}
										/>
									))
								}
							</>
							: null
					}
					{
						inventoryFeatures.length > 0 ?
							<>
								<HeaderText level={1}>Inventory</HeaderText>
								{
									inventoryFeatures.map(f => (
										<FeaturePanel
											key={f.feature.id}
											feature={f.feature}
											source={props.options.showSources ? f.source : undefined}
											options={props.options}
											hero={props.hero}
											sourcebooks={props.sourcebooks}
											mode={PanelMode.Full}
										/>
									))
								}
							</>
							: null
					}
				</>
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

			const getPanelWidth = (ability: Ability) => {
				const descLength = Math.round(ability.description.split(' ').length / 10);
				const textLength = Collections.sum(ability.sections.filter(s => s.type === 'text'), s => Math.round(s.text.split(' ').length / 10));
				const fieldLength = Collections.sum(ability.sections.filter(s => s.type === 'field'), s => Math.round(s.effect.split(' ').length / 10));
				const rollLength = ability.sections.filter(s => s.type === 'roll').length * 6;

				const length = descLength + textLength + fieldLength + rollLength;
				return Math.max(1, Math.round(length / 12));
			};

			const nonStandard = abilities.filter(a => a.source !== 'Standard');
			const standard = abilities.filter(a => a.source === 'Standard');

			return (
				<div className='abilities-section'>
					{props.options.singlePage ? <HeaderText level={1}>{title}</HeaderText> : null}
					{
						(nonStandard.length === 0) && (standard.length === 0) ?
							<Empty />
							: null
					}
					<div className={`abilities-grid ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
						{
							nonStandard.map(a => (
								<SelectablePanel key={a.ability.id} style={isSmall ? undefined : { gridColumn: `span ${getPanelWidth(a.ability)}` }} onSelect={() => showAbility(a.ability)}>
									<AbilityPanel
										ability={a.ability}
										hero={props.hero}
										options={props.options}
										mode={PanelMode.Full}
										tags={props.options.showSources ? [ a.source ] : undefined}
									/>
								</SelectablePanel>
							))
						}
					</div>
					{
						(nonStandard.length > 0) && (standard.length > 0) ?
							<Divider />
							: null
					}
					<div className={`abilities-grid ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
						{
							standard.map(a => (
								<SelectablePanel key={a.ability.id} style={{ gridColumn: `span ${getPanelWidth(a.ability)}` }} onSelect={() => showAbility(a.ability)}>
									<AbilityPanel
										ability={a.ability}
										hero={props.hero}
										options={props.options}
										mode={PanelMode.Full}
										tags={props.options.showSources ? [ a.source ] : undefined}
									/>
								</SelectablePanel>
							))
						}
					</div>
				</div>
			);
		};

		const getTabs = () => {
			const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.showStandardAbilities);
			const actions = abilities.filter(a => a.ability.type.usage === AbilityUsage.Action);
			const maneuvers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Maneuver);
			const moves = abilities.filter(a => a.ability.type.usage === AbilityUsage.Move);
			const triggers = abilities.filter(a => a.ability.type.usage === AbilityUsage.Trigger);
			const others = abilities.filter(a => (a.ability.type.usage === AbilityUsage.Other) || (a.ability.type.usage === AbilityUsage.NoAction));

			const tabs: string[] = [];
			tabs.push('Hero');
			tabs.push('Features');
			if (actions.length > 0) {
				tabs.push('Actions');
			}
			if (maneuvers.length > 0) {
				tabs.push('Maneuvers');
			}
			if (triggers.length > 0) {
				tabs.push('Triggers');
			}
			if (moves.length > 0) {
				tabs.push('Moves');
			}
			if (others.length > 0) {
				tabs.push('Others');
			}
			tabs.push('Free Strikes');

			return tabs;
		};

		const getContent = (tab: string) => {
			const abilities = HeroLogic.getAbilities(props.hero, props.sourcebooks, props.options.showStandardAbilities);
			const actions = abilities.filter(a => a.ability.type.usage === AbilityUsage.Action);
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
				case 'Actions':
					return getAbilitiesSection('Actions', actions);
				case 'Maneuvers':
					return getAbilitiesSection('Maneuvers', maneuvers);
				case 'Triggers':
					return getAbilitiesSection('Triggered Actions', triggers);
				case 'Moves':
					return getAbilitiesSection('Move Actions', moves);
				case 'Others':
					return getAbilitiesSection('Other Abilities', others);
				case 'Free Strikes':
					return getAbilitiesSection('Free Strikes', [
						{ ability: AbilityData.freeStrikeMelee, source: 'Standard' },
						{ ability: AbilityData.freeStrikeRanged, source: 'Standard' }
					]);
			}

			return null;
		};

		if (props.mode !== PanelMode.Full) {
			return (
				<div className='hero-panel compact'>
					<HeaderText level={1} tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
					<Flex align='flex-start' justify='space-evenly'>
						<Field orientation='vertical' label='Ancestry' value={props.hero.ancestry?.name || 'No ancestry'} />
						<Field orientation='vertical' label='Career' value={props.hero.career?.name || 'No career'} />
						<Field orientation='vertical' label='Class' value={props.hero.class ? `${props.hero.class.name} (${props.hero.class.level})` : 'No class'} />
					</Flex>
				</div>
			);
		}

		return (
			<ErrorBoundary>
				<div className='hero-panel' id={props.hero.id}>
					<div className='hero-main-section'>
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
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
