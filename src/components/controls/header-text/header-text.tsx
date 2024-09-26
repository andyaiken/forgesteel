import { Tag } from 'antd';

import './header-text.scss';

interface Props {
	children: string | string[];
	level?: number;
	ribbon?: JSX.Element;
	tags?: string[];
}

export const HeaderText = (props: Props) => {
	try {
		return (
			<div className={`header-text-panel level-${props.level || 2}`}>
				{props.ribbon}
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
	} catch {
		return null;
	}
};