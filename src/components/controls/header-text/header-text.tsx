import { Tag } from 'antd';

import './header-text.scss';

interface Props {
	children: string;
	ribbon?: string;
	tags?: string[];
}

export const HeaderText = (props: Props) => {
	return (
		<div className='header-text-panel'>
			{
				props.ribbon ?
					<div className='header-ribbon'>{props.ribbon}</div>
					: null
			}
			<div className='header-text'>{props.children}</div>
			{
				props.tags ?
					<div className='header-keywords'>
						{props.tags.map((t, n) => <Tag key={n}>{t}</Tag>)}
					</div>
					: null
			}
		</div>
	);
};
