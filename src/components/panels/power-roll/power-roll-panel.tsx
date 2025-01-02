import type { PowerRoll } from '../../../models/power-roll';
import type { ReactNode } from 'react';

import './power-roll-panel.scss';

interface Props {
	powerRoll: PowerRoll;
	header?: string;
	footer?: ReactNode;
	onRoll?: () => void;
}

export const PowerRollPanel = (props: Props) => {
	return (
		<div className={props.onRoll ? 'power-roll-panel clickable' : 'power-roll-panel'} onClick={props.onRoll}>
			{
				props.header
					? (
						<div className='power-roll-row power-roll-header'>
							{props.header}
						</div>
					)
					: null
			}
			<div className='power-roll-row'>
				<div className='tier'>11 -</div>
				<div className='effect'>{props.powerRoll.tier1}</div>
			</div>
			<div className='power-roll-row'>
				<div className='tier'>12 - 16</div>
				<div className='effect'>{props.powerRoll.tier2}</div>
			</div>
			<div className='power-roll-row'>
				<div className='tier'>17 +</div>
				<div className='effect'>{props.powerRoll.tier3}</div>
			</div>
			{
				props.footer
					?  (
						<div className='power-roll-row power-roll-footer'>
							{props.footer}
						</div>
					)
					: null
			}
		</div>
	);
};
