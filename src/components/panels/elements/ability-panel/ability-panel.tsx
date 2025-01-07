import { Ability } from '../../../../models/ability';
import { AbilityLogic } from '../../../../logic/ability-logic';
import { AbilityPowerRollPanel } from '../../power-roll/ability-power-roll-panel';
import { Badge } from '../../../controls/badge/badge';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../../controls/heroic-resource-badge/heroic-resource-badge';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Tag } from 'antd';
import { useMemo } from 'react';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	cost?: number | 'signature';
	options?: Options;
	mode?: PanelMode;
	tags?: string[];
	onRoll?: () => void;
}

export const AbilityPanel = (props: Props) => {
	const cost = useMemo(
		() => {
			const cost = props.cost ?? props.ability.cost;
			if (cost === 'signature' || cost <= 0 || !props.hero) {
				return cost;
			}
			const modifierSum = HeroLogic.getFeatures(props.hero)
				.filter(f => f.type === FeatureType.AbilityCost)
				.filter(f => f.data.keywords.every(k => props.ability.keywords.includes(k)))
				.map(f => f.data.modifier)
				.reduce((sum, m) => sum + m, 0);

			return Math.max(cost + modifierSum, 1);
		},
		[ props.cost, props.ability, props.hero ]
	);
	const headerRibbon = useMemo(
		() => cost === 'signature'
			? (<Badge>Signature</Badge>)
			: cost > 0 ? (<HeroicResourceBadge value={cost} />) : null,
		[ cost ]
	);
	const disabled = useMemo(
		() => (props.options?.dimUnavailableAbilities ?? false)
			&& props.hero
			&& cost !== 'signature'
			&& cost > props.hero.state.heroicResource,
		[ props.hero, props.options, cost ]
	);
	try {
		let className = 'ability-panel';
		if (disabled) {
			className += ' disabled';
		}

		return (
			<div className={className} id={props.mode === PanelMode.Full ? props.ability.id : undefined}>
				<HeaderText ribbon={headerRibbon} tags={props.tags}>
					{props.ability.name || 'Unnamed Ability'}
				</HeaderText>
				{props.ability.description ? <Markdown text={props.ability.description} /> : null}
				{
					props.mode === PanelMode.Full ?
						<div>
							{
								props.ability.keywords.length > 0 ?
									<Field label='Keywords' value={props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
									: null
							}
							<Field label='Type' value={FormatLogic.getAbilityType(props.ability.type)} />
							{props.ability.type.trigger ? <Field label='Trigger' value={props.ability.type.trigger} /> : null}
							{
								props.ability.distance.length > 0 ?
									<Field label='Distance' value={props.ability.distance.map(d => AbilityLogic.getDistance(d, props.hero, props.ability)).join(' or ')} />
									: null
							}
							{props.ability.target ? <Field label='Target' value={props.ability.target} /> : null}
							{props.ability.preEffect ? <Markdown text={props.ability.preEffect} /> : null}
							{
								props.ability.powerRoll ?
									<AbilityPowerRollPanel
										powerRoll={props.ability.powerRoll}
										ability={props.ability}
										hero={props.hero}
										onRoll={props.onRoll}
									/>
									: null
							}
							{props.ability.effect ? <Markdown text={props.ability.effect} /> : null}
							{
								props.ability.strained ?
									<Field
										label='Strained'
										value={<Markdown text={props.ability.strained} useSpan={true} />}
									/>
									: null
							}
							{
								props.ability.alternateEffects.map((effect, n) => (
									<Field
										key={n}
										label='Alternate Effect'
										value={<Markdown text={effect} useSpan={true} />}
									/>
								))
							}
							{
								props.ability.spend.map((spend, n) => (
									<Field
										key={n}
										disabled={props.hero && (props.options?.dimUnavailableAbilities || false) && (spend.value > props.hero.state.heroicResource)}
										label={(
											<div style={{ display: 'inline-flex',  alignItems: 'center', gap: '5px' }}>
												<span>Spend</span>
												{spend.value ? <HeroicResourceBadge value={spend.value} repeatable={spend.repeatable} /> : null}
											</div>
										)}
										value={<Markdown text={spend.effect} useSpan={true} />}
									/>
								))
							}
							{
								props.ability.persistence.map((persist, n) => (
									<Field
										key={n}
										label={(
											<div style={{ display: 'inline-flex',  alignItems: 'center', gap: '5px' }}>
												<span>Persist</span>
												{persist.value ? <HeroicResourceBadge value={persist.value} /> : null}
											</div>
										)}
										value={<Markdown text={persist.effect} useSpan={true} />}
									/>
								))
							}
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
