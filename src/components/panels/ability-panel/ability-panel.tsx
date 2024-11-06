import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { FeatureAbilityCostData } from '../../../models/feature';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroicResourceBadge } from '../../controls/heroic-resource-badge/heroic-resource-badge';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { PowerRollPanel } from '../power-roll-panel/power-roll-panel';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Tag } from 'antd';
import { Utils } from '../../../utils/utils';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	options?: Options;
	mode?: PanelMode;
	onRoll?: () => void;
}

export const AbilityPanel = (props: Props) => {
	try {
		let cost = props.ability.cost;
		let disabled = false;
		if ((cost > 0) && props.hero) {
			HeroLogic.getFeatures(props.hero).filter(f => f.type === FeatureType.AbilityCost).forEach(f => {
				const data = f.data as FeatureAbilityCostData;
				if (data.keywords.every(k => props.ability.keywords.includes(k))) {
					cost += data.modifier;
				}
			});

			cost = Math.max(cost, 1);

			if (props.options?.dimUnavailableAbilities || false) {
				disabled = cost > props.hero.state.heroicResource;
			}
		}

		return (
			<SelectablePanel disabled={disabled}>
				<div className='ability-panel' id={props.mode === PanelMode.Full ? props.ability.id : undefined}>
					<HeaderText ribbon={cost > 0 ? <HeroicResourceBadge value={cost} /> : undefined}>
						{props.ability.name || 'Unnamed Ability'}
					</HeaderText>
					<div className='ds-text description-text'>{props.ability.description}</div>
					{
						props.mode === PanelMode.Full ?
							<div>
								{
									props.ability.keywords.length > 0 ?
										<Field label='Keywords' value={props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)} />
										: null
								}
								<Field label='Type' value={AbilityLogic.getType(props.ability.type)} />
								{props.ability.type.trigger ? <Field label='Trigger' value={props.ability.type.trigger} /> : null}
								{
									props.ability.distance.length > 0 ?
										<Field label='Distance' value={props.ability.distance.map(d => AbilityLogic.getDistance(d, props.hero, props.ability)).join(' or ')} />
										: null
								}
								{props.ability.target ? <Field label='Target' value={props.ability.target} /> : null}
								{props.ability.preEffect ? <div className='ds-text' dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.ability.preEffect) }} /> : null}
								{
									props.ability.powerRoll ?
										<PowerRollPanel
											ability={props.ability}
											hero={props.hero}
											onRoll={props.onRoll}
										/>
										: null
								}
								{props.ability.effect ? <div className='ds-text' dangerouslySetInnerHTML={{ __html: Utils.showdownConverter.makeHtml(props.ability.effect) }} /> : null}
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
											disabled={props.hero && (props.options?.dimUnavailableAbilities || false) && (spend.value > props.hero.state.heroicResource)}
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
			</SelectablePanel>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
