import { AbilityCustomization, Hero } from '../../../../models/hero';
import { Alert, Button, Space, Tag } from 'antd';
import { Badge, HeroicResourceBadge } from '../../../controls/badge/badge';
import { ThunderboltFilled, ThunderboltOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { Ability } from '../../../../models/ability';
import { AbilityData } from '../../../../data/ability-data';
import { AbilityKeyword } from '../../../../enums/ability-keyword';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityUsage } from '../../../../enums/ability-usage';
import { ConditionType } from '../../../../enums/condition-type';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroLogic } from '../../../../logic/hero-logic';
import { Markdown } from '../../../controls/markdown/markdown';
import { Monster } from '../../../../models/monster';
import { MonsterLogic } from '../../../../logic/monster-logic';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { PowerRollPanel } from '../../power-roll/power-roll-panel';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	monster?: Monster;
	cost?: number | 'signature';
	repeatable?: boolean;
	options?: Options;
	mode?: PanelMode;
	tags?: string[];
}

export const AbilityPanel = (props: Props) => {
	const [ autoCalc, setAutoCalc ] = useState<boolean>(true);

	const cost = useMemo(
		() => {
			const cost = props.cost ?? props.ability.cost;
			if (cost === 'signature' || cost <= 0 || !props.hero) {
				return cost;
			}
			const modifierSum = HeroLogic.getFeatures(props.hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.AbilityCost)
				.filter(f => f.data.keywords.every(k => props.ability.keywords.includes(k)))
				.map(f => f.data.modifier)
				.reduce((sum, m) => sum + m, 0);

			return Math.max(cost + modifierSum, 1);
		},
		[ props.cost, props.ability, props.hero ]
	);

	const repeatable = useMemo(
		() => {
			return props.repeatable ?? props.ability.repeatable;
		},
		[ props.repeatable, props.ability ]
	);

	const headerRibbon = useMemo(
		() => cost === 'signature'
			? (<Badge>Signature</Badge>)
			: cost > 0 ? (<HeroicResourceBadge value={cost} repeatable={repeatable} />) : null,
		[ cost, repeatable ]
	);

	const disabled = useMemo(
		() => (props.options?.dimUnavailableAbilities ?? false)
			&& props.hero
			&& cost !== 'signature'
			&& cost > 0
			&& cost > props.hero.state.heroicResource,
		[ props.hero, props.options, cost ]
	);

	const parseText = (text: string) => {
		if (autoCalc && props.hero) {
			text = AbilityLogic.getTextEffect(text, props.hero);
		}

		return text;
	};

	const autoCalcAvailable = () => {
		const texts = [
			props.ability.preEffect,
			props.ability.effect,
			props.ability.strained,
			...props.ability.alternateEffects,
			...props.ability.spend.map(s => s.effect),
			...props.ability.persistence.map(p => p.effect)
		];

		return props.hero
			&& (
				props.ability.powerRoll || props.ability.test || texts.some(text => AbilityLogic.getTextEffect(text, props.hero!) !== text)
			);
	};

	const getWarnings = () => {
		let conditions: ConditionType[] = [];
		let state = 'healthy';
		if (props.hero) {
			conditions = props.hero.state.conditions.map(c => c.type);
			state = HeroLogic.getCombatState(props.hero);
		}
		if (props.monster) {
			conditions = props.monster.state.conditions.map(c => c.type);
			state = MonsterLogic.getCombatState(props.monster);
		}

		const warnings: { label: string, text: string }[] = [];

		if ((conditions.includes(ConditionType.Bleeding) || ((state === 'dying') && (props.ability.id !== AbilityData.catchBreath.id))) && ([ AbilityUsage.Action, AbilityUsage.Maneuver, AbilityUsage.Trigger ].includes(props.ability.type.usage) || props.ability.keywords.includes(AbilityKeyword.Strike))) {
			warnings.push({
				label: ConditionType.Bleeding,
				text: 'After using this ability, you lose 1d6 Stamina.'
			});
		}
		if (conditions.includes(ConditionType.Dazed) && (props.ability.type.usage === AbilityUsage.Trigger)) {
			warnings.push({
				label: ConditionType.Dazed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Dazed) && ((props.ability.type.usage === AbilityUsage.Maneuver) && props.ability.type.free)) {
			warnings.push({
				label: ConditionType.Dazed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Frightened) && (props.ability.powerRoll || props.ability.test)) {
			warnings.push({
				label: ConditionType.Frightened,
				text: 'This ability takes a bane if it targets the source of your fear.'
			});
		}
		if (conditions.includes(ConditionType.Grabbed) && (props.ability.powerRoll || props.ability.test)) {
			warnings.push({
				label: ConditionType.Grabbed,
				text: 'This ability takes a bane if it doesn’t target the creature grabbing you.'
			});
		}
		if (conditions.includes(ConditionType.Grabbed) && (props.ability.id === AbilityData.knockback.id)) {
			warnings.push({
				label: ConditionType.Grabbed,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Prone) && props.ability.keywords.includes(AbilityKeyword.Strike)) {
			warnings.push({
				label: ConditionType.Prone,
				text: 'This ability takes a bane.'
			});
		}
		if (conditions.includes(ConditionType.Restrained) && (props.ability.powerRoll || props.ability.test)) {
			warnings.push({
				label: ConditionType.Restrained,
				text: 'This ability takes a bane.'
			});
		}
		if (conditions.includes(ConditionType.Restrained) && (props.ability.id === AbilityData.standUp.id)) {
			warnings.push({
				label: ConditionType.Restrained,
				text: 'You can’t use this ability.'
			});
		}
		if (conditions.includes(ConditionType.Taunted) && (props.ability.powerRoll || props.ability.test)) {
			warnings.push({
				label: ConditionType.Taunted,
				text: 'This ability takes a bane if it doesn’t target the creature who taunted you, and you have line of effect to that creature.'
			});
		}
		if (conditions.includes(ConditionType.Weakened) && (props.ability.powerRoll || props.ability.test)) {
			warnings.push({
				label: ConditionType.Weakened,
				text: 'This ability takes a bane.'
			});
		}
		if ((state === 'dying') && (props.ability.id === AbilityData.catchBreath.id)) {
			warnings.push({
				label: 'Dying',
				text: 'You can’t use this ability.'
			});
		}

		return warnings;
	};

	try {
		let className = 'ability-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}
		if (disabled) {
			className += ' disabled';
		}

		let customization: AbilityCustomization | null = null;
		if (props.hero) {
			customization = props.hero.abilityCustomizations.find(ac => ac.abilityID === props.ability.id) || null;
		}

		return (
			<ErrorBoundary>
				<div className={className} id={props.mode === PanelMode.Full ? props.ability.id : undefined}>
					<Space direction='vertical' style={{ marginTop: '15px', width: '100%' }}>
						{
							getWarnings().map((warn, n) => (
								<Alert
									key={n}
									type='warning'
									showIcon={true}
									message={<div><b>{warn.label}</b>: {warn.text}</div>}
								/>
							))
						}
					</Space>
					<HeaderText
						ribbon={headerRibbon}
						tags={props.tags}
						extra={
							autoCalcAvailable() ?
								<Button
									type='text'
									title='Auto-calculate damage, potancy, etc'
									icon={autoCalc ? <ThunderboltFilled style={{ color: 'rgb(22, 119, 255)' }} /> : <ThunderboltOutlined />}
									onClick={e => { e.stopPropagation(); setAutoCalc(!autoCalc); }}
								/>
								: null
						}
					>
						{customization?.name || props.ability.name || 'Unnamed Ability'}
					</HeaderText>
					<Markdown text={customization?.description || props.ability.description} className='ability-description-text' />
					{
						props.mode === PanelMode.Full ?
							<div>
								{
									props.ability.keywords.length > 0 ?
										<div>
											{props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)}
										</div>
										: null
								}
								<Field label='Type' value={FormatLogic.getAbilityType(props.ability.type)} />
								{
									props.ability.type.trigger ?
										<Field label='Trigger' value={props.ability.type.trigger} />
										: null
								}
								{
									props.ability.distance.length > 0 ?
										<Field label='Distance' value={props.ability.distance.map(d => AbilityLogic.getDistance(d, props.hero, props.ability)).join(' or ')} />
										: null
								}
								{
									props.ability.target ?
										<Field label='Target' value={props.ability.target} />
										: null
								}
								{
									props.ability.preEffect ?
										<Field
											label='Effect'
											value={<Markdown text={parseText(props.ability.preEffect)} useSpan={true} />}
										/>
										: null
								}
								{
									props.ability.powerRoll ?
										<PowerRollPanel
											powerRoll={props.ability.powerRoll}
											ability={props.ability}
											hero={props.hero}
											autoCalc={autoCalc}
										/>
										: null
								}
								{
									props.ability.test ?
										<PowerRollPanel
											powerRoll={props.ability.test}
											test={true}
										/>
										: null
								}
								{
									props.ability.effect ?
										<Field
											label='Effect'
											value={<Markdown text={parseText(props.ability.effect)} useSpan={true} />}
										/>
										: null
								}
								{
									props.ability.strained ?
										<Field
											danger={props.hero && (props.hero.state.heroicResource < 0)}
											label='Strained'
											value={<Markdown text={parseText(props.ability.strained)} useSpan={true} />}
										/>
										: null
								}
								{
									props.ability.alternateEffects.map((effect, n) => (
										<Field
											key={n}
											label='Alternate Effect'
											value={<Markdown text={parseText(effect)} useSpan={true} />}
										/>
									))
								}
								{
									props.ability.spend.map((spend, n) => (
										<Field
											key={n}
											disabled={props.hero && (props.options?.dimUnavailableAbilities || false) && (spend.value > props.hero.state.heroicResource)}
											label={(
												<div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
													<span>{ spend.name || 'Spend' }</span>
													{spend.value ? <HeroicResourceBadge value={spend.value} repeatable={spend.repeatable} /> : null}
												</div>
											)}
											value={<Markdown text={parseText(spend.effect)} useSpan={true} />}
										/>
									))
								}
								{
									props.ability.persistence.map((persist, n) => (
										<Field
											key={n}
											label={(
												<div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
													<span>Persist</span>
													{persist.value ? <HeroicResourceBadge value={persist.value} /> : null}
												</div>
											)}
											value={<Markdown text={parseText(persist.effect)} useSpan={true} />}
										/>
									))
								}
								{
									customization && customization.notes ?
										<Field
											label='Notes'
											value={<Markdown text={parseText(customization.notes)} useSpan={true} />}
										/>
										: null
								}
								{
									props.ability.keywords.includes(AbilityKeyword.Charge) && (props.ability.id !== AbilityData.freeStrikeMelee.id) ?
										<Alert
											type='info'
											showIcon={true}
											message='This ability can be used in place of a melee free strike when you take the Charge action.'
										/>
										: null
								}
								{
									props.ability.keywords.includes(AbilityKeyword.Routine) ?
										<Alert
											type='info'
											showIcon={true}
											message='This ability is a Routine.'
										/>
										: null
								}
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
