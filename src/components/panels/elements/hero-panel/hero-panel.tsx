import { Col, Row, Statistic } from 'antd';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { Characteristic } from '../../../../enums/characteristic';
import { ConditionEndType } from '../../../../enums/condition-type';
import { ConditionLogic } from '../../../../logic/condition-logic';
import { CultureData } from '../../../../data/culture-data';
import { DamageModifierType } from '../../../../enums/damage-modifier-type';
import { Domain } from '../../../../models/domain';
import { Element } from '../../../../models/element';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Kit } from '../../../../models/kit';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Skill } from '../../../../models/skill';
import { SkillList } from '../../../../enums/skill-list';
import { useModals } from '../../../../hooks/use-modals';
import { usePersistedOptions } from '../../../../hooks/use-persisted-options';
import { usePersistedSourcebooks } from '../../../../hooks/use-persisted-sourcebooks';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	mode?: PanelMode;
}

export const HeroPanel = (props: Props) => {
	const modals = useModals();
	const { sourcebooks } = usePersistedSourcebooks();
	const { options } = usePersistedOptions();

	const getLeftColumn = () => {
		const onSelectAncestry = () => {
			if (props.hero.ancestry) {
				modals.showAncestry(props.hero.ancestry.id);
			}
		};

		const onSelectCulture = () => {
			if (props.hero.culture) {
				modals.showCulture(props.hero.culture.id);
			}
		};

		const onSelectCareer = () => {
			if (props.hero.career) {
				modals.showCareer(props.hero.career.id);
			}
		};

		const onSelectClass = () => {
			if (props.hero.class) {
				modals.showClass(props.hero.class.id);
			}
		};

		const onSelectComplication = () => {
			if (props.hero.complication) {
				modals.showComplication(props.hero.complication.id);
			}
		};

		const onSelectDomain = (domain: Domain) => {
			modals.showDomain(domain.id);
		};

		const onSelectKit = (kit: Kit) => {
			modals.showKit(kit.id);
		};

		let incitingIncident: Element | null = null;
		if (props.hero.career && props.hero.career.incitingIncidents.selectedID) {
			incitingIncident = props.hero.career.incitingIncidents.options.find(o => o.id === props.hero.career?.incitingIncidents.selectedID) || null;
		}

		return (
			<div className='hero-left-column'>
				{
					props.hero.ancestry ?
						<div className='overview-tile clickable' onClick={onSelectAncestry}>
							<HeaderText>Ancestry</HeaderText>
							<Field label='Ancestry' value={props.hero.ancestry.name} />
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
			</div>
		);
	};

	const getRightColumn = () => {
		const immunities = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Immunity);
		const weaknesses = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Weakness);

		const heroSourcebooks = sourcebooks.filter(cs => props.hero.settingIDs.includes(cs.id));

		const getSkills = (label: string, skills: Skill[]) => {
			return skills.length > 0 ?
				<div key={label} className='overview-tile'>
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
			<div className='hero-right-column'>
				{
					immunities.length > 0 ?
						<div className='overview-tile'>
							<HeaderText>Immunities</HeaderText>
							{immunities.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.type}</span><span>{dm.value}</span></div>)}
						</div>
						: null
				}
				{
					weaknesses.length > 0 ?
						<div className='overview-tile'>
							<HeaderText>Weaknesses</HeaderText>
							{weaknesses.map((dm, n) => <div key={n} className='ds-text damage-modifier'><span>{dm.type}</span><span>{dm.value}</span></div>)}
						</div>
						: null
				}
				<div className='overview-tile'>
					<HeaderText>Languages</HeaderText>
					{
						HeroLogic.getLanguages(props.hero, heroSourcebooks).length > 0 ?
							HeroLogic.getLanguages(props.hero, heroSourcebooks).map(l => <div key={l.name} className='ds-text'>{l.name}</div>)
							:
							<div className='ds-text dimmed-text'>None</div>
					}
				</div>
				{
					(options?.showSkillsInGroups || false) ?
						[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
							.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, heroSourcebooks).filter(s => s.list === list)))
						:
						getSkills('Skills', HeroLogic.getSkills(props.hero, heroSourcebooks))
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
			xxl: 4
		};

		const sizeLarge = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 14,
			xl: 14,
			xxl: 8
		};

		const maxStamina = HeroLogic.getStamina(props.hero);
		const stamina = props.hero.state.staminaDamage === 0 ? maxStamina : maxStamina - props.hero.state.staminaDamage;
		const staminaSuffix = props.hero.state.staminaDamage === 0 ? null : `/ ${maxStamina}`;

		const maxRecoveries = HeroLogic.getRecoveries(props.hero);
		const recoveries = props.hero.state.recoveriesUsed === 0 ? maxRecoveries : maxRecoveries - props.hero.state.recoveriesUsed;
		const recoveriesSuffix = props.hero.state.recoveriesUsed === 0 ? null : `/ ${maxRecoveries}`;

		return (
			<Row gutter={[ 16, 16 ]}>
				<Col span={24}>
					<div className='characteristics-box'>
						<div className='characteristic clickable' onClick={() => modals.showHeroCharacteristic(props.hero.id, Characteristic.Might)}>
							<Statistic title='Might' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
						</div>
						<div className='characteristic clickable' onClick={() => modals.showHeroCharacteristic(props.hero.id, Characteristic.Agility)}>
							<Statistic title='Agility' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
						</div>
						<div className='characteristic clickable' onClick={() => modals.showHeroCharacteristic(props.hero.id, Characteristic.Reason)}>
							<Statistic title='Reason' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
						</div>
						<div className='characteristic clickable' onClick={() => modals.showHeroCharacteristic(props.hero.id, Characteristic.Intuition)}>
							<Statistic title='Intuition' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
						</div>
						<div className='characteristic clickable' onClick={() => modals.showHeroCharacteristic(props.hero.id, Characteristic.Presence)}>
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
					<div className='characteristics-box clickable' onClick={() => modals.showHeroState(props.hero.id, 'stats')}>
						<div className='characteristic'>
							<Statistic title='Hero Tokens' value={props.hero.state.heroTokens} />
						</div>
						<div className='characteristic'>
							<Statistic title='Renown' value={props.hero.state.renown} />
						</div>
						<div className='characteristic'>
							<Statistic title='Wealth' value={props.hero.state.wealth} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box clickable' onClick={() => modals.showHeroState(props.hero.id, 'hero')}>
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
					<div className='characteristics-box clickable' onClick={() => modals.showHeroState(props.hero.id, 'hero')}>
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

		return (
			<div className='conditions-section'>
				<HeaderText level={1}>Conditions</HeaderText>
				<div className='conditions-grid'>
					{
						props.hero.state.conditions.map(c => (
							<div key={c.id} className='condition-tile' onClick={() => modals.showHeroState(props.hero.id, 'conditions')}>
								<HeaderText>
									{
										(c.ends === ConditionEndType.ResistanceEnds) ?
											`${c.type}: ${c.resistCharacteristic} resistance ends`
											:
											`${c.type}: ${c.ends}`
									}
								</HeaderText>
								<div className='ds-text'>{ConditionLogic.getDescription(c.type)}</div>
							</div>
						))
					}
				</div>
			</div>
		);
	};

	const getFeaturesSection = () => {
		const features = HeroLogic.getFeatures(props.hero)
			.filter(feature => feature.type === FeatureType.Text);
		if (features.length === 0) {
			return null;
		}

		return (
			<div className='features-section'>
				<HeaderText level={1}>Features</HeaderText>
				<div className='features-grid'>
					{
						features.map(feature => (
							<FeaturePanel
								key={feature.id}
								feature={feature}
								hero={props.hero}
								mode={PanelMode.Full}
							/>
						))
					}
				</div>
			</div>
		);
	};

	const getAbilitiesSection = (type: AbilityUsage) => {
		const abilities = HeroLogic.getAbilities(props.hero, true, options?.showFreeStrikes || false, options?.showStandardAbilities || false)
			.filter(ability => ability.type.usage === type);
		if (abilities.length === 0) {
			return null;
		}

		return (
			<div className='abilities-section'>
				<HeaderText level={1}>{type}s</HeaderText>
				<div className='abilities-grid'>
					{
						abilities.map(ability => (
							<SelectablePanel key={ability.id} style={{ gridColumn: `span ${AbilityLogic.panelWidth(ability)}` }}>
								<AbilityPanel ability={ability} hero={props.hero} mode={PanelMode.Full} onRoll={() => modals.showHeroAbility(props.hero.id, ability.id)} />
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
					<HeaderText level={1}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
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

		return (
			<div className='hero-panel' id={props.hero.id}>
				<div className='hero-main-section' id='stats'>
					{getLeftColumn()}
					<div className='hero-main-column'>
						<HeaderText level={1}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
						{getStatsSection()}
						{getConditionsSection()}
						{getFeaturesSection()}
					</div>
					{getRightColumn()}
				</div>
				<div className='hero-main-section' id='actions'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.Action)}
					</div>
				</div>
				<div className='hero-main-section' id='maneuvers'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.Maneuver)}
					</div>
				</div>
				<div className='hero-main-section' id='moves'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.Move)}
					</div>
				</div>
				<div className='hero-main-section' id='triggers'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.Trigger)}
					</div>
				</div>
				<div className='hero-main-section' id='others'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.Other)}
					</div>
				</div>
				<div className='hero-main-section' id='none'>
					<div className='hero-main-column'>
						{getAbilitiesSection(AbilityUsage.NoAction)}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
