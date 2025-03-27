import { ReactNode } from 'react';
import { Tag } from 'antd';

import './header-text.scss';

interface Props {
	children: ReactNode;
	level?: number;
	ribbon?: ReactNode;
	tags?: string[];
	extra?: ReactNode;
}

export const HeaderText = (props: Props) => {
	try {
		if (!props.children) {
			return null;
		}

		return (
			<div className={`header-text-panel level-${props.level || 2}`}>
				<div className='header-text-content'>
					{props.ribbon}
					<div className='header-text'>{props.children}</div>
					{
						props.tags ?
							<div className='header-tags'>
								{props.tags.map((t, n) => <Tag key={n}>{t}</Tag>)}
							</div>
							: null
					}
				</div>
				{props.extra}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
