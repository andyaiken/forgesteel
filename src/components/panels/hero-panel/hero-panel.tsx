import { Col, Row, Statistic } from 'antd';
import { Ability } from '../../../models/ability';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Ancestry } from '../../../models/ancestry';
import { CampaignSetting } from '../../../models/campaign-setting';
import { Career } from '../../../models/career';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { Complication } from '../../../models/complication';
import { ConditionEndType } from '../../../enums/condition-type';
import { Culture } from '../../../models/culture';
import { CultureData } from '../../../data/culture-data';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { Element } from '../../../models/element';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroLogic } from '../../../logic/hero-logic';
import { Kit } from '../../../models/kit';
import { PanelMode } from '../../../enums/panel-mode';
import { Skill } from '../../../models/skill';
import { SkillList } from '../../../enums/skill-list';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	campaignSettings: CampaignSetting[];
	mode?: PanelMode;
	showSkillsInGroups?: boolean;
	showFreeStrikes?: boolean;
	showStandardAbilities?: boolean;
	onSelectAncestry?: (ancestry: Ancestry) => void;
	onSelectCulture?: (culture: Culture) => void;
	onSelectCareer?: (career: Career) => void;
	onSelectClass?: (heroClass: HeroClass) => void;
	onSelectComplication?: (complication: Complication) => void;
	onSelectKit?: (kit: Kit) => void;
	onSelectCharacteristic?: (characteristic: Characteristic) => void;
	onSelectAbility?: (ability: Ability) => void;
	onShowState?: () => void;
}

export const HeroPanel = (props: Props) => {
	const getLeftSidebar = () => {
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

		const onSelectKit = (kit: Kit) => {
			if (props.onSelectKit) {
				props.onSelectKit(kit);
			}
		};

		const getSkills = (label: string, skills: Skill[]) => {
			return skills.length > 0 ?
				<div key={label} className='top-tile'>
					<HeaderText>{label}</HeaderText>
					{skills.map(s => <Field key={s.name} label={s.name} value={s.description}  />)}
				</div>
				:
				<div key={label} className='top-tile'>
					<HeaderText>{label}</HeaderText>
					<div className='ds-text dimmed-text'>None</div>
				</div>;
		};

		const settings = props.campaignSettings.filter(cs => props.hero.settingIDs.includes(cs.id));

		let incitingIncident: Element | null = null;
		if (props.hero.career && props.hero.career.incitingIncidents.selectedID) {
			incitingIncident = props.hero.career.incitingIncidents.options.find(o => o.id === props.hero.career?.incitingIncidents.selectedID) || null;
		}

		const conditions = props.hero.state.conditions
			.map(c => {
				if (c.ends === ConditionEndType.ResistanceEnds) {
					return `${c.type}: ${c.resistCharacteristic} resistance ends`;
				}
				return `${c.type}: ${c.ends}`;
			})
			.join(', ');
		const immunities = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Immunity);
		const weaknesses = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Weakness);

		return (
			<div className='hero-left-column'>
				{
					conditions ?
						<div className='top-tile clickable' onClick={props.onShowState}>
							<HeaderText>Conditions</HeaderText>
							<div className='ds-text'>{conditions}</div>
						</div>
						: null
				}
				{
					props.hero.ancestry ?
						<div className='top-tile clickable' onClick={onSelectAncestry}>
							<HeaderText>Ancestry</HeaderText>
							<Field label='Ancestry' value={props.hero.ancestry.name} />
						</div>
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No ancestry chosen</div>
						</div>
				}
				{
					props.hero.culture ?
						<div className='top-tile clickable' onClick={onSelectCulture}>
							<HeaderText>Culture</HeaderText>
							{props.hero.culture.id !== CultureData.bespoke.id ? <div className='ds-text'>{props.hero.culture.name}</div> : null}
							{props.hero.culture.environment ? <Field label='Environment' value={props.hero.culture.environment.name} /> : null}
							{props.hero.culture.organization ? <Field label='Organization' value={props.hero.culture.organization.name} /> : null}
							{props.hero.culture.upbringing ? <Field label='Upbringing' value={props.hero.culture.upbringing.name} /> : null}
						</div>
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No culture chosen</div>
						</div>
				}
				{
					props.hero.career ?
						<div className='top-tile clickable' onClick={onSelectCareer}>
							<HeaderText>Career</HeaderText>
							<Field label='Career' value={props.hero.career.name} />
							{incitingIncident ? <Field label='Inciting Incident' value={incitingIncident.name} /> : null}
						</div>
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No career chosen</div>
						</div>
				}
				{
					props.hero.class ?
						<div className='top-tile clickable' onClick={onSelectClass}>
							<HeaderText>Class</HeaderText>
							<Field label='Class' value={props.hero.class.name} />
							<Field label='Level' value={props.hero.class.level} />
							<Field label={props.hero.class.subclassName} value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.name).join(', ') || ''} />
						</div>
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No class chosen</div>
						</div>
				}
				{
					HeroLogic.getKits(props.hero).length > 0 ?
						HeroLogic.getKits(props.hero).map(kit => (
							<div key={kit.id} className='top-tile clickable' onClick={() => onSelectKit(kit)}>
								<HeaderText>Kit</HeaderText>
								<Field label='Kit' value={kit.name} />
								{kit.armor.length > 0 ? <Field label='Armor' value={kit.armor.join(', ')} /> : null}
								{kit.weapon.length > 0 ? <Field label='Weapons' value={kit.weapon.join(', ')} /> : null}
								{kit.implement.length > 0 ? <Field label='Implements' value={kit.implement.join(', ')} /> : null}
							</div>
						))
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No kit chosen</div>
						</div>
				}
				{
					props.hero.complication ?
						<div className='top-tile clickable' onClick={onSelectComplication}>
							<HeaderText>Complication</HeaderText>
							<Field label='Complication' value={props.hero.complication.name} />
						</div>
						:
						<div className='top-tile'>
							<div className='ds-text dimmed-text'>No complication chosen</div>
						</div>
				}
				<div className='top-tile'>
					<HeaderText>Languages</HeaderText>
					{
						HeroLogic.getLanguages(props.hero, settings).length > 0 ?
							HeroLogic.getLanguages(props.hero, settings).map(l => <Field key={l.name} label={l.name} value={l.description}  />)
							:
							<div className='ds-text dimmed-text'>None</div>
					}
				</div>
				{
					props.showSkillsInGroups ?
						[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
							.map(list => getSkills(`${list} Skills`, HeroLogic.getSkills(props.hero, settings).filter(s => s.list === list)))
						:
						getSkills('Skills', HeroLogic.getSkills(props.hero, settings))
				}
				{
					immunities.length > 0 ?
						<div className='top-tile'>
							<HeaderText>Immunities</HeaderText>
							<div className='ds-text'>{immunities.map(dm => `${dm.type} ${dm.value}`).join(', ')}</div>
						</div>
						: null
				}
				{
					weaknesses.length > 0 ?
						<div className='top-tile'>
							<HeaderText>Weaknesses</HeaderText>
							<div className='ds-text'>{weaknesses.map(dm => `${dm.type} ${dm.value}`).join(', ')}</div>
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
			lg: 9,
			xl: 9,
			xxl: 9
		};

		const sizeLarge = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 15,
			xl: 15,
			xxl: 15
		};

		const onSelectCharacteristic = (characteristic: Characteristic) => {
			if (props.onSelectCharacteristic) {
				props.onSelectCharacteristic(characteristic);
			}
		};

		const onShowState = () => {
			if (props.onShowState) {
				props.onShowState();
			}
		};

		const maxStamina = HeroLogic.getStamina(props.hero);
		const stamina = props.hero.state.staminaDamage === 0 ? maxStamina : maxStamina - props.hero.state.staminaDamage;
		const staminaSuffix = props.hero.state.staminaDamage === 0 ? null : `/ ${maxStamina}`;

		const maxRecoveries = HeroLogic.getRecoveries(props.hero);
		const recoveries = props.hero.state.recoveriesUsed === 0 ? maxRecoveries : maxRecoveries - props.hero.state.recoveriesUsed;
		const recoveriesSuffix = props.hero.state.recoveriesUsed === 0 ? null : `/ ${maxRecoveries}`;

		return (
			<Row gutter={[ 16, 16 ]}>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-row'>
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
				<Col xs={sizeSmall.xs} sm={sizeSmall.sm} md={sizeSmall.md} lg={sizeSmall.lg} xl={sizeSmall.xl} xxl={sizeSmall.xxl}>
					<div className='characteristics-row'>
						<div className='characteristic'>
							<Statistic title='Size' value={FormatLogic.getSize(HeroLogic.getSize(props.hero))} />
						</div>
						<div className='characteristic'>
							<Statistic title='Speed' value={HeroLogic.getSpeed(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-row clickable' onClick={onShowState}>
						<div className='characteristic'>
							<Statistic title={props.hero.class ? props.hero.class.heroicResource : 'Resource'} value={props.hero.state.heroicResource} />
						</div>
						<div className='characteristic'>
							<Statistic title='Victories' value={props.hero.state.victories} />
						</div>
						<div className='characteristic'>
							<Statistic title='Renown' value={props.hero.state.renown} />
						</div>
						<div className='characteristic'>
							<Statistic title='Hero' value={props.hero.state.heroTokens} />
						</div>
						<div className='characteristic'>
							<Statistic title='Project' value={props.hero.state.projectPoints} />
						</div>
					</div>
				</Col>
				<Col xs={sizeSmall.xs} sm={sizeSmall.sm} md={sizeSmall.md} lg={sizeSmall.lg} xl={sizeSmall.xl} xxl={sizeSmall.xxl}>
					<div className='characteristics-row clickable' onClick={onShowState}>
						<div className='characteristic'>
							<Statistic title='Stamina' value={stamina} suffix={staminaSuffix} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recoveries' value={recoveries} suffix={recoveriesSuffix} />
						</div>
						<div className='characteristic'>
							<Statistic title='Rec Value' value={HeroLogic.getRecoveryValue(props.hero)} />
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	const getFeaturesSection = () => {
		const unsorted = HeroLogic.getFeatures(props.hero)
			.filter(feature => feature.type === FeatureType.Text);
		const features = Collections.sort(unsorted, f => f.name);
		if (features.length === 0) {
			return null;
		}

		const size = {
			xs: 24,
			sm: 24,
			md: 12,
			lg: 12,
			xl: 8,
			xxl: 6
		};

		return (
			<div className='features-section'>
				<HeaderText level={1}>Features</HeaderText>
				<Row gutter={[ 16, 16 ]}>
					{
						features.map(feature => (
							<Col key={feature.id} xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
								<FeaturePanel feature={feature} hero={props.hero} campaignSettings={props.campaignSettings} mode={PanelMode.Full} />
							</Col>
						))
					}
				</Row>
			</div>
		);
	};

	const getAbilitiesSection = (type: AbilityUsage) => {
		const unsorted = HeroLogic.getAbilities(props.hero, props.showFreeStrikes || false, props.showStandardAbilities || false)
			.filter(ability => ability.type.usage === type);
		const abilities = Collections.sort(unsorted, a => a.name);
		if (abilities.length === 0) {
			return null;
		}

		const size = {
			xs: 24,
			sm: 24,
			md: 12,
			lg: 12,
			xl: 8,
			xxl: 6
		};

		const onSelectAbility = (ability: Ability) => {
			if (props.onSelectAbility) {
				props.onSelectAbility(ability);
			}
		};

		return (
			<div className='abilities-section'>
				<HeaderText level={1}>{type}s</HeaderText>
				<Row gutter={[ 16, 16 ]}>
					{
						abilities.map(ability => (
							<Col key={ability.id} xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
								<AbilityPanel ability={ability} hero={props.hero} mode={PanelMode.Full} onRoll={() => onSelectAbility(ability)} />
							</Col>
						))
					}
				</Row>
			</div>
		);
	};

	try {
		if (props.mode !== PanelMode.Full) {
			return (
				<div className='hero-panel compact'>
					<HeaderText level={1}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
					<Field label='Ancestry' value={props.hero.ancestry?.name || 'None'} />
					<Field label='Career' value={props.hero.career?.name || 'None'} />
					<Field label='Class' value={props.hero.class?.name || 'None'} />
					<Field label='Level' value={props.hero.class?.level || '-'} />
					<Field label='Kit' value={HeroLogic.getKits(props.hero).map(k => k.name).join(', ') || 'None'} />
				</div>
			);
		}

		return (
			<div className='hero-panel' id={props.hero.id}>
				<HeaderText level={1}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
				<div className='hero-main-section'>
					{getLeftSidebar()}
					<div className='hero-right-column'>
						{getStatsSection()}
						{getFeaturesSection()}
						{getAbilitiesSection(AbilityUsage.Action)}
						{getAbilitiesSection(AbilityUsage.Maneuver)}
						{getAbilitiesSection(AbilityUsage.Trigger)}
						{getAbilitiesSection(AbilityUsage.Other)}
					</div>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
