import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroicResourceBadge } from '../../controls/heroic-resource-badge/heroic-resource-badge';
import { PanelMode } from '../../../enums/panel-mode';
import { PowerRollPanel } from '../power-roll-panel/power-roll-panel';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Tag } from 'antd';
import { Utils } from '../../../utils/utils';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	mode?: PanelMode;
	onRoll?: () => void;
}

export const AbilityPanel = (props: Props) => {
	try {
		return (
			<SelectablePanel>
				<div className='ability-panel'>
					<HeaderText ribbon={props.ability.cost > 0 ? <HeroicResourceBadge value={props.ability.cost} /> : undefined}>
						{props.ability.name}
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
