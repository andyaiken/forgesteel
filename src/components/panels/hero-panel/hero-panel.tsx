import { Col, Divider, Row, Statistic } from 'antd';
import { AbilityPanel } from '../ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Characteristic } from '../../../enums/characteristic';
import { Collections } from '../../../utils/collections';
import { CultureData } from '../../../data/culture-data';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { PanelMode } from '../../../enums/panel-mode';
import { SkillList } from '../../../enums/skill-list';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	mode?: PanelMode;
	showSkillsInGroups?: boolean;
	showFreeStrikes?: boolean;
}

export const HeroPanel = (props: Props) => {
	const getTopSection = () => {
		const size = {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 4,
			xl: 4,
			xxl: 4
		};

		const kits = HeroLogic.getKits(props.hero);
		const kitNames = kits.map(k => k.name).join(', ');
		const armorNames = kits.map(k => k.armor).join(', ');
		const weaponNames = kits.map(k => k.weapon).join(', ');
		const implementNames = kits.map(k => k.implement).join(', ');

		return (
			<Row gutter={[ 10, 10 ]} style={{ margin: '10px 0' }}>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					{
						props.hero.ancestry ?
							<Field label='Ancestry' value={props.hero.ancestry.name} />
							:
							<div className='dimmed-text'>No ancestry chosen</div>
					}
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					{
						props.hero.culture ?
							<div>
								{props.hero.culture.id !== CultureData.bespoke.id ? <Field label='Culture' value={props.hero.culture.name} /> : null}
								{props.hero.culture.environment ? <Field label='Environment' value={props.hero.culture.environment.name} /> : null}
								{props.hero.culture.organization ? <Field label='Organization' value={props.hero.culture.organization.name} /> : null}
								{props.hero.culture.upbringing ? <Field label='Upbringing' value={props.hero.culture.upbringing.name} /> : null}
							</div>
							:
							<div className='dimmed-text'>No culture chosen</div>
					}
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					{
						props.hero.career ?
							<Field label='Career' value={props.hero.career.name} />
							:
							<div className='dimmed-text'>No career chosen</div>
					}
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					{
						props.hero.class ?
							<div>
								<Field label='Class' value={props.hero.class.name} />
								<Field label='Level' value={props.hero.class.level} />
								<Field label={props.hero.class.subclassName} value={props.hero.class.subclasses.filter(sc => sc.selected).map(sc => sc.name).join(', ') || ''} />
							</div>
							:
							<div className='dimmed-text'>No class chosen</div>
					}
				</Col>
				{
					props.hero.complication ?
						<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
							<Field label='Complication' value={props.hero.complication.name} />
						</Col>
						: null
				}
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					{
						kits.length > 0 ?
							<div>
								<Field label='Kit' value={kitNames} />
								{armorNames ? <Field label='Armor' value={armorNames} /> : null}
								{weaponNames ? <Field label='Weapons' value={weaponNames} /> : null}
								{implementNames ? <Field label='Implements' value={implementNames} /> : null}
							</div>
							:
							<div className='dimmed-text'>No kit chosen</div>
					}
				</Col>
			</Row>
		);
	};

	const getStatsSection = () => {
		const size = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 12,
			xl: 12,
			xxl: 12
		};

		return (
			<Row gutter={[ 20, 20 ]} style={{ margin: '20px 0' }}>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					<div className='characteristics-row'>
						<div className='characteristic'>
							<Statistic title='Might' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Might)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Agility' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Agility)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Reason' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Reason)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Intuition' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intuition)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Presence' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Presence)} />
						</div>
					</div>
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					<div className='characteristics-row'>
						<div className='characteristic'>
							<Statistic title='Stamina' value={HeroLogic.getStamina(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recoveries' value={HeroLogic.getRecoveries(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recovery Value' value={HeroLogic.getRecoveryValue(props.hero)} />
						</div>
					</div>
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					<div className='characteristics-row'>
						<div className='characteristic'>
							<Statistic title='Size' value={props.hero.ancestry ? HeroLogic.getSize(props.hero.ancestry.size) : '1'} />
						</div>
						<div className='characteristic'>
							<Statistic title='Speed' value={HeroLogic.getSpeed(props.hero)} />
						</div>
						<div className='characteristic'>
							<Statistic title='Stability' value={HeroLogic.getStability(props.hero)} />
						</div>
					</div>
				</Col>
				<Col xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
					<div className='characteristics-row'>
						<div className='characteristic'>
							<Statistic title={props.hero.class ? props.hero.class.heroicResource : 'Heroic Resource'} value={props.hero.state.heroicResource} />
						</div>
						<div className='characteristic'>
							<Statistic title='Renown' value={props.hero.state.renown} />
						</div>
						<div className='characteristic'>
							<Statistic title='Hero Tokens' value={props.hero.state.heroTokens} />
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	const getFeaturesSection = () => {
		const features = Collections.sort(HeroLogic.getFeatures(props.hero).filter(feature => feature.type === FeatureType.Text), f => f.name);
		if (features.length === 0) {
			return null;
		}

		const size = {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 8,
			xl: 6,
			xxl: 4
		};

		return (
			<div className='features-section'>
				<Divider orientation='left'>Features</Divider>
				<Row gutter={[ 20, 20 ]} style={{ margin: '20px 0' }}>
					{
						features.map(feature => (
							<Col key={feature.id} xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
								<FeaturePanel feature={feature} hero={props.hero} mode={PanelMode.Full} />
							</Col>
						))
					}
				</Row>
			</div>
		);
	};

	const getAbilitiesSection = (type: AbilityUsage) => {
		const size = {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 8,
			xl: 6,
			xxl: 4
		};

		const abilities = HeroLogic.getAbilities(props.hero, props.showFreeStrikes || false)
			.filter(ability => ability.type.usage === type);
		if (abilities.length === 0) {
			return null;
		}

		return (
			<div className='abilities-section'>
				<Divider orientation='left'>{type}s</Divider>
				<Row gutter={[ 20, 20 ]} style={{ margin: '20px 0' }}>
					{
						abilities.map(ability => (
							<Col key={ability.id} xs={size.xs} sm={size.sm} md={size.md} lg={size.lg} xl={size.xl} xxl={size.xxl}>
								<AbilityPanel ability={ability} hero={props.hero} mode={PanelMode.Full} />
							</Col>
						))
					}
				</Row>
			</div>
		);
	};

	const immunities = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Immunity);
	const weaknesses = HeroLogic.getDamageModifiers(props.hero, DamageModifierType.Weakness);

	return (
		<div className='hero-panel' id={props.hero.id}>
			<HeaderText>{props.hero.name || 'Unnamed Hero'}</HeaderText>
			{getTopSection()}
			{
				props.mode === PanelMode.Full ?
					<div>
						<Divider />
						<Field label='Languages' value={HeroLogic.getLanguages(props.hero).join(', ') || 'None'} />
						{
							props.showSkillsInGroups ?
								[ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ].map((list, n) => {
									const skills = HeroLogic.getSkills(props.hero).filter(s => s.list === list);
									return (
										<Field key={n} label={list} value={skills.map(s => s.name).join(', ') || 'None'} />
									);
								})
								:
								<Field label='Skills' value={HeroLogic.getSkills(props.hero).map(s => s.name).join(', ') || 'None'} />
						}
						{
							immunities.length > 0 ?
								<Field label='Immune' value={immunities.map(dm => `${dm.type} ${dm.value}`).join(', ')} />
								: null
						}
						{
							weaknesses.length > 0 ?
								<Field label='Weakness' value={weaknesses.map(dm => `${dm.type} ${dm.value}`).join(', ')} />
								: null
						}
						<Divider />
						{getStatsSection()}
						{getFeaturesSection()}
						{getAbilitiesSection(AbilityUsage.Action)}
						{getAbilitiesSection(AbilityUsage.Maneuver)}
						{getAbilitiesSection(AbilityUsage.Trigger)}
						{getAbilitiesSection(AbilityUsage.Other)}
					</div>
					: null
			}
		</div>
	);
};
