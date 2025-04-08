import { Col, Row, Segmented, Statistic } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { ReactNode, useState } from 'react';
import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { AbilityPanel } from '../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Ancestry } from '../../../models/ancestry';
import { Career } from '../../../models/career';
import { Characteristic } from '../../../enums/characteristic';
import { Complication } from '../../../models/complication';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Culture } from '../../../models/culture';
import { CultureData } from '../../../data/culture-data';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { Domain } from '../../../models/domain';
import { Element } from '../../../models/element';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { Kit } from '../../../models/kit';
import { MonsterLogic } from '../../../logic/monster-logic';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { RulesPage } from '../../../enums/rules-page';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Skill } from '../../../models/skill';
import { SkillList } from '../../../enums/skill-list';
import { Sourcebook } from '../../../models/sourcebook';
import { useMediaQuery } from '../../../hooks/use-media-query';

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
 	onSelectCompanion?: (monster: Monster, monsterGroup?: MonsterGroup) => void;
 	onSelectCharacteristic?: (characteristic: Characteristic) => void;
 	onSelectAbility?: (ability: Ability) => void;
 	onShowState?: (page: HeroStatePage) => void;
 	onShowRules?: (page: RulesPage) => void;
}

export const HeroPanel = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const [ tab, setTab ] = useState<string>('Hero');

	const getLeftColumn = (showBorder: boolean) => {
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

		const onSelectCompanion = (monster: Monster) => {
			if (props.onSelectCompanion) {
				props.onSelectCompanion(monster);
			}
		};

		let incitingIncident: Element | null = null;
		if (props.hero.career && props.hero.career.incitingIncidents.selectedID) {
			incitingIncident = props.hero.career.incitingIncidents.options.find(o => o.id === props.hero.career?.incitingIncidents.selectedID) || null;
		}

		return (
			<div className={showBorder ? 'hero-left-column border' : 'hero-left-column'}>
				{
					props.hero.ancestry ?
						<div className='overview-tile clickable' onClick={onSelectAncestry}>
							<HeaderText>Ancestry</HeaderText>
							<Field label='Ancestry' value={props.hero.ancestry.name} />
							{HeroLogic.getFormerAncestries(props.hero).map(a => <Field key={a.id} label='Former Life' value={a.name} />)}
						</div>
						:
						<div className='overview-tile'>
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
								<Field label='Name' value={MonsterLogic.getMonsterName(monster)} />
							</div>
						))
						:
						null
				}
			</div>
		);
	};

	const getRightColumn = (showBorder: boolean) => {
		const onShowSkills = () => {
			if (props.onShowRules) {
				props.onShowRules(RulesPage.Skills);
			}
		};

		const onShowLanguages = () => {
			if (props.onShowRules) {
				props.onShowRules(RulesPage.Languages);
			}
		};

		const immunities = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Immunity);
		const weaknesses = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Weakness);

		const sourcebooks = props.sourcebooks.filter(cs => props.hero.settingIDs.includes(cs.id));

		const getSkills = (label: string, skills: Skill[]) => {
			return skills.length > 0 ?
				<div key={label} className='overview-tile clickable' onClick={onShowSkills}>
					<HeaderText>{label}</HeaderText>
					{skills.map(s => <div key={s.name} className='ds-text'>{s.name}</div>)}
				</div>
				:
				<div key={label} className='overview-tile'>
					<HeaderText>{label}</HeaderText>
					<div className='ds-text dimmed-text'>None</div>
				</div>;
		};

		return (
			<div className={showBorder ? 'hero-right-column border' : 'hero-right-column'}>
				{
					immunities.length > 0 ?
						<div className='overview-tile'>
							<HeaderText>Immunities</HeaderText>
							{immunities.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
						</div>
						: null
				}
				{
					weaknesses.length > 0 ?
						<div className='overview-tile'>
							<HeaderText>Weaknesses</HeaderText>
							{weaknesses.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.damageType}</span><span>{dm.value}</span></div>)}
						</div>
						: null
				}
				<div className='overview-tile clickable' onClick={onShowLanguages}>
					<HeaderText>Languages</HeaderText>
					{
						HeroLogic.getLanguages(props.hero, sourcebooks).length > 0 ?
							HeroLogic.getLanguages(props.hero, sourcebooks).map(l => <div key={l.name} className='ds-text'>{l.name}</div>)
							:
							<div className='ds-text dimmed-text'>None</div>
					}
				</div>
				{
					(props.options.showSkillsInGroups || false) ?
						[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
							.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, sourcebooks).filter(s => s.list === list)))
						:
						getSkills('Skills', HeroLogic.getSkills(props.hero, sourcebooks))
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
			xxl: 5
		};

		const sizeLarge = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 14,
			xl: 14,
			xxl: 7
		};

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
			<Row gutter={[ 16, 16 ]}>
				<Col span={24}>
					<div className='characteristics-box'>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Might)}>
							<Statistic title='Might' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Agility)}>
							<Statistic title='Agility' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Reason)}>
							<Statistic title='Reason' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Intuition)}>
							<Statistic title='Intuition' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Presence)}>
							<Statistic title='Presence' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box'>
						<div className='characteristic'>
							<Statistic title='Size' value={FormatLogic.getSize(HeroLogic.getSize(props.hero))} />
						</div>
						<div className='characteristic'>
							<Statistic title='Speed' value={HeroLogic.getSpeed(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Disengage' value={HeroLogic.getDisengage(props.hero)} />
						</div>
					</div>
				</Col>
				<Col xs={sizeSmall.xs} sm={sizeSmall.sm} md={sizeSmall.md} lg={sizeSmall.lg} xl={sizeSmall.xl} xxl={sizeSmall.xxl}>
					<div className='characteristics-box clickable' onClick={onShowHero}>
						<div className='characteristic'>
							<Statistic title='Hero Tokens' value={props.hero.state.heroTokens} />
						</div>
						<div className='characteristic'>
							<Statistic title='Renown' value={HeroLogic.getRenown(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Wealth' value={props.hero.state.wealth} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box clickable' onClick={onShowHero}>
						<div className='characteristic'>
							<Statistic title={props.hero.class ? props.hero.class.heroicResource : 'Resource'} value={props.hero.state.heroicResource} />
						</div>
						<div className='characteristic'>
							<Statistic title='Surges' value={props.hero.state.surges} />
						</div>
						<div className='characteristic'>
							<Statistic title='Victories' value={props.hero.state.victories} />
						</div>
						<div className='characteristic'>
							<Statistic title='XP' value={props.hero.state.xp} />
						</div>
					</div>
				</Col>
				<Col xs={sizeSmall.xs} sm={sizeSmall.sm} md={sizeSmall.md} lg={sizeSmall.lg} xl={sizeSmall.xl} xxl={sizeSmall.xxl}>
					<div className='characteristics-box clickable' onClick={onShowVitals}>
						<div className='characteristic'>
							<Statistic title='Stamina' value={stamina} suffix={staminaSuffix} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recoveries' value={recoveries} suffix={recoveriesSuffix} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recov Value' value={HeroLogic.getRecoveryValue(props.hero)} />
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	const getConditionsSection = () => {
		if (props.hero.state.conditions.length === 0) {
			return null;
		}

		const showConditions = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Vitals);
			}
		};

		return (
			<div className='conditions-section'>
				<HeaderText level={1}>Conditions</HeaderText>
				<div className='conditions-grid'>
					{
						props.hero.state.conditions.map(c => (
							<div key={c.id} className='condition-tile' onClick={showConditions}>
								<HeaderText>{c.type}: {c.ends}</HeaderText>
								<div className='ds-text'>
									{
										c.type === ConditionType.Custom ?
											c.text || 'A custom condition.'
											:
											ConditionLogic.getDescription(c.type)
									}
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	};

	const getFeaturesSection = (header?: string) => {
		const featureTypes = [ FeatureType.Text, FeatureType.Package ];

		const features = HeroLogic.getFeatures(props.hero)
			.filter(feature => featureTypes.includes(feature.type));
		if (features.length === 0) {
			return null;
		}

		return (
			<div className='features-section'>
				{header ? <HeaderText level={1}>{header}</HeaderText> : null}
				<div className={`features-grid ${props.options.featureWidth.toLowerCase().replace(' ', '-')}`}>
					{
						features.map(feature => (
							<FeaturePanel
								key={feature.id}
								feature={feature}
								options={props.options}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
							/>
						))
					}
				</div>
			</div>
		);
	};

	const getAbilitiesSection = (abilities: Ability[], header?: string) => {
		if (abilities.length === 0) {
			return null;
		}

		const showAbility = (ability: Ability) => {
			if (props.onSelectAbility) {
				props.onSelectAbility(ability);
			}
		};

		return (
			<div className='abilities-section'>
				{header ? <HeaderText level={1}>{header}</HeaderText> : null}
				<div className={`abilities-grid ${props.options.abilityWidth.toLowerCase().replace(' ', '-')}`}>
					{
						abilities.map(ability => (
							<SelectablePanel key={ability.id} style={ header ? { gridColumn: `span ${AbilityLogic.panelWidth(ability)}` } : undefined} onSelect={() => showAbility(ability)}>
								<AbilityPanel ability={ability} hero={props.hero} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						))
					}
				</div>
			</div>
		);
	};

	try {
		if (props.mode !== PanelMode.Full) {
			const subclasses = props.hero.class?.subclasses.filter(sc => sc.selected);
			const domains = HeroLogic.getDomains(props.hero);
			const kits = HeroLogic.getKits(props.hero);

			return (
				<div className='hero-panel compact'>
					<HeaderText level={1} tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
					<Field label='Ancestry' value={props.hero.ancestry?.name || 'No ancestry'} />
					<Field label='Career' value={props.hero.career?.name || 'No career'} />
					<Field label='Class' value={props.hero.class?.name || 'No class'} />
					{subclasses ? <Field label={props.hero.class?.subclassName || 'Subclass'} value={subclasses.map(sc => sc.name).join(', ')} /> : null}
					{props.hero.class ? <Field label='Level' value={props.hero.class.level} /> : null}
					{domains.length > 0 ? <Field label='Domain' value={domains.map(d => d.name).join(', ')} /> : null}
					{kits.length > 0 ? <Field label='Kit' value={kits.map(k => k.name).join(', ')} /> : null}
				</div>
			);
		}

		const abilities = HeroLogic.getAbilities(props.hero, true, props.options.showFreeStrikes, props.options.showStandardAbilities);
		const actions = abilities.filter(a => a.type.usage === AbilityUsage.Action);
		const maneuvers = abilities.filter(a => a.type.usage === AbilityUsage.Maneuver);
		const moves = abilities.filter(a => a.type.usage === AbilityUsage.Move);
		const triggers = abilities.filter(a => a.type.usage === AbilityUsage.Trigger);
		const others = abilities.filter(a => (a.type.usage === AbilityUsage.Other) || (a.type.usage === AbilityUsage.NoAction));

		if (isSmall) {
			const tabs = [ 'Hero', 'Statistics', 'Features' ];
			if (actions.length > 0) {
				tabs.push('Actions');
			}
			if (maneuvers.length > 0) {
				tabs.push('Maneuvers');
			}
			if (triggers.length > 0) {
				tabs.push('Triggers');
			}
			if ((moves.length + others.length) > 0) {
				tabs.push('Others');
			}

			let content: ReactNode;
			switch (tab) {
				case 'Hero':
					content = (
						<>
							<HeaderText tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
							{getLeftColumn(false)}
							{getRightColumn(false)}
						</>
					);
					break;
				case 'Statistics':
					content = (
						<>
							{getStatsSection()}
							{getConditionsSection()}
						</>
					);
					break;
				case 'Features':
					content = getFeaturesSection();
					break;
				case 'Actions':
					content = getAbilitiesSection(actions);
					break;
				case 'Maneuvers':
					content = getAbilitiesSection(maneuvers);
					break;
				case 'Triggers':
					content = getAbilitiesSection(triggers);
					break;
				case 'Others':
					content = getAbilitiesSection([ ...moves, ...others ]);
					break;
			}

			return (
				<div className='hero-panel small' id={props.hero.id}>
					<Segmented
						name='sections'
						style={{ position: 'sticky', top: '0px', borderRadius: '0' }}
						options={
							tabs.map(tab => ({
								value: tab,
								label: <div className='page-button-title'>{tab}</div>
							}))
						}
						block={true}
						value={tab}
						onChange={setTab}
					/>
					<div className='hero-main-section'>
						<div className='hero-main-column'>
							{content}
						</div>
					</div>
				</div>
			);
		}

		return (
			<ErrorBoundary>
				<div className='hero-panel' id={props.hero.id}>
					<div className='hero-main-section' id='stats'>
						{getLeftColumn(true)}
						<div className='hero-main-column'>
							<HeaderText level={1} tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
							{getStatsSection()}
							{getConditionsSection()}
							{getFeaturesSection('Features')}
						</div>
						{getRightColumn(true)}
					</div>
					{
						actions.length > 0 ?
							<div className='hero-main-section' id='actions'>
								<div className='hero-main-column'>
									{getAbilitiesSection(actions, 'Actions')}
								</div>
							</div>
							: null
					}
					{
						maneuvers.length > 0 ?
							<div className='hero-main-section' id='maneuvers'>
								<div className='hero-main-column'>
									{getAbilitiesSection(maneuvers, 'Maneuvers')}
								</div>
							</div>
							: null
					}
					{
						moves.length > 0 ?
							<div className='hero-main-section' id='moves'>
								<div className='hero-main-column'>
									{getAbilitiesSection(moves, 'Move Actions')}
								</div>
							</div>
							: null
					}
					{
						triggers.length > 0 ?
							<div className='hero-main-section' id='triggers'>
								<div className='hero-main-column'>
									{getAbilitiesSection(triggers, 'Triggered Actions')}
								</div>
							</div>
							: null
					}
					{
						others.length > 0 ?
							<div className='hero-main-section' id='others'>
								<div className='hero-main-column'>
									{getAbilitiesSection(others, 'Other Abilities')}
								</div>
							</div>
							: null
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
