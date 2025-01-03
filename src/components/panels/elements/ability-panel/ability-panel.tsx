import { Ability } from '../../../../models/ability';
import { DistanceLogic } from '../../../../logic/distance-logic';
import { FeatureAbilityCostData } from '../../../../models/feature';
import { FeatureType } from '../../../../enums/feature-type';
import { Field } from '../../../controls/field/field';
import { FormatLogic } from '../../../../logic/format-logic';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../../controls/heroic-resource-badge/heroic-resource-badge';
import { PanelMode } from '../../../../enums/panel-mode';
import { PowerRollPanel } from '../../power-roll/power-roll-panel';
import { Tag } from 'antd';
import { Utils } from '../../../../utils/utils';
import { usePersistedOptions } from '../../../../hooks/use-persisted-options';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	cost?: number;
	mode?: PanelMode;
	tags?: string[];
	onRoll?: () => void;
}

export const AbilityPanel = (props: Props) => {
	const { options } = usePersistedOptions();

	try {
		let cost = props.cost || props.ability.cost;
		let disabled = false;
		if ((cost > 0) && props.hero) {
			HeroLogic.getFeatures(props.hero).filter(f => f.type === FeatureType.AbilityCost).forEach(f => {
				const data = f.data as FeatureAbilityCostData;
				if (data.keywords.every(k => props.ability.keywords.includes(k))) {
					cost += data.modifier;
				}
			});

			cost = Math.max(cost, 1);

			if (options?.dimUnavailableAbilities || false) {
				disabled = cost > props.hero.state.heroicResource;
			}
		}

		let className = 'ability-panel';
		if (disabled) {
			className += ' disabled';
		}

		return (
			<div className={className} id={props.mode === PanelMode.Full ? props.ability.id : undefined}>
				<HeaderText ribbon={cost > 0 ? <HeroicResourceBadge value={cost} /> : null} tags={props.tags}>
					{props.ability.name || 'Unnamed Ability'}
				</HeaderText>
				{props.ability.description ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.ability.description) }} /> : null}
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
									<Field label='Distance' value={props.ability.distance.map(d => DistanceLogic.getDistance(d, props.hero, props.ability)).join(' or ')} />
									: null
							}
							{props.ability.target ? <Field label='Target' value={props.ability.target} /> : null}
							{props.ability.preEffect ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.ability.preEffect) }} /> : null}
							{
								props.ability.powerRoll ?
									<PowerRollPanel
										ability={props.ability}
										hero={props.hero}
										onRoll={props.onRoll}
									/>
									: null
							}
							{props.ability.effect ? <div dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.ability.effect) }} /> : null}
							{
								props.ability.alternateEffects.map((effect, n) => (
									<Field
										key={n}
										label='Alternate Effect'
										value={<span dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(effect) }} />}
									/>
								))
							}
							{
								props.ability.spend.map((spend, n) => (
									<Field
										key={n}
										disabled={props.hero && (options?.dimUnavailableAbilities || false) && (spend.value > props.hero.state.heroicResource)}
										label={(
											<div style={{ display: 'inline-flex',  alignItems: 'center', gap: '5px' }}>
												<span>Spend</span>
												{spend.value ? <HeroicResourceBadge value={spend.value} /> : null}
											</div>
										)}
										value={<span dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(spend.effect) }} />}
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
										value={<span dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(persist.effect) }} />}
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
