import { CSSProperties, ReactNode } from 'react';

import './stats-row.scss';

interface Props {
	children: ReactNode;
	caption?: string;
	style?: CSSProperties;
	onClick?: () => void;
}

export const StatsRow = (props: Props) => {
	return (
		<div className={props.onClick ? 'stats-row clickable' : 'stats-row'} style={props.style} onClick={props.onClick}>
			<div className='stats-row-content'>
				{props.children}
			</div>
			{
				props.caption ?
					<div className='stats-row-caption'>{props.caption}</div>
					: null
			}
		</div>
	);
};
