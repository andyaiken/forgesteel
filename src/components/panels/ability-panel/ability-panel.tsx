import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';
import { PowerRollPanel } from '../power-roll-panel/power-roll-panel';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Tag } from 'antd';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	hero?: Hero;
	mode?: PanelMode;
}

export const AbilityPanel = (props: Props) => {
	try {
		return (
			<SelectablePanel>
				<div className='ability-panel'>
					<HeaderText ribbon={props.ability.cost > 0 ? `${props.ability.cost} pt` : ''}>{props.ability.name}</HeaderText>
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
								{props.ability.preEffect ? <Field label='Effect' value={props.ability.preEffect} /> : null}
								{props.ability.powerRoll ? <PowerRollPanel ability={props.ability} hero={props.hero} /> : null}
								{props.ability.effect ? <Field label='Effect' value={props.ability.effect} /> : null}
								{
									props.ability.spend.map((spend, n) => (
										<Field key={n} label={spend.value ? `Spend ${spend.value}` : 'Spend'} value={spend.effect} />
									))
								}
							</div>
							: null
					}
				</div>
			</SelectablePanel>
		);
	} catch {
		return null;
	}
};
