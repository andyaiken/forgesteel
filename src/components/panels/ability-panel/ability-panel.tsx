import { Ability } from '../../../models/ability';
import { AbilityUsage } from '../../../enums/ability-usage';
import { PanelMode } from '../../../enums/panel-mode';
import { Tag } from 'antd';

import './ability-panel.scss';

interface Props {
	ability: Ability;
	mode?: PanelMode;
}

export const AbilityPanel = (props: Props) => {
	const getType = () => {
		if (props.ability.type.usage === AbilityUsage.Other) {
			return props.ability.type.time;
		}

		let str = `${props.ability.type.free ? 'Free ' : ''}${props.ability.type.usage}`;
		if (props.ability.type.trigger) {
			str += ' (' + props.ability.type.trigger + ')';
		}

		return str;
	};

	return (
		<div className='ability-panel'>
			<div className='header-text'>
				{props.ability.name}
			</div>
			<div className='description-text'>{props.ability.description}</div>
			{
				props.mode === PanelMode.Full ?
					<div>
						<div className='ds-text'>Type: {getType()}</div>
						{
							props.ability.keywords.length > 0 ?
								<div className='ds-text'>
									<span>Keywords: </span>
									{
										props.ability.keywords.map((k, n) => <Tag key={n}>{k}</Tag>)
									}
								</div>
								: null
						}
						{props.ability.distance ? <div className='ds-text'>Distance: {props.ability.distance}</div> : null}
						{props.ability.target ? <div className='ds-text'>Target: {props.ability.target}</div> : null}
						{props.ability.cost > 0 ? <div className='ds-text'>Cost: {props.ability.target}</div> : null}
						{
							props.ability.powerRoll ?
								<div className='power-roll'>
									<div className='power-roll-row power-roll-header'>
										Power Roll + {props.ability.powerRoll.characteristic.join(' or ')}
									</div>
									<div className='power-roll-row'>
										<div className='tier'>11-</div>
										<div className='effect'>{props.ability.powerRoll.tier1}</div>
									</div>
									<div className='power-roll-row'>
										<div className='tier'>12 - 16</div>
										<div className='effect'>{props.ability.powerRoll.tier2}</div>
									</div>
									<div className='power-roll-row'>
										<div className='tier'>17+</div>
										<div className='effect'>{props.ability.powerRoll.tier3}</div>
									</div>
								</div>
								: null
						}
						{props.ability.effect ? <div className='ds-text'>{props.ability.effect}</div> : null}
					</div>
					: null
			}
		</div>
	);
};
