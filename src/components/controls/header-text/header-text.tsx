import { CSSProperties, ReactNode } from 'react';
import { Flex, Tag } from 'antd';

import './header-text.scss';

interface Props {
	children: ReactNode;
	level?: number;
	strikethrough?: boolean;
	ribbon?: ReactNode;
	tags?: string[];
	extra?: ReactNode;
	style?: CSSProperties;
}

export const HeaderText = (props: Props) => {
	if (!props.children) {
		return null;
	}

	return (
		<div className={`header-text-panel level-${props.level || 2}`} style={props.style}>
			<div className='header-text-content'>
				{props.ribbon}
				<div className={props.strikethrough ? 'header-text strikethrough' : 'header-text'}>{props.children}</div>
				{
					props.tags ?
						<Flex gap={3}>{props.tags.map((t, n) => <Tag key={n} variant='outlined'>{t}</Tag>)}</Flex>
						: null
				}
			</div>
			{props.extra}
		</div>
	);
};
