import { CSSProperties, ReactNode } from 'react';
import { Flex, Tag } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './header-text.scss';

interface Props {
	children: ReactNode;
	level?: number;
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
		<ErrorBoundary>
			<div className={`header-text-panel level-${props.level || 2}`} style={props.style}>
				<div className='header-text-content'>
					{props.ribbon}
					<div className='header-text'>{props.children}</div>
					{
						props.tags ?
							<Flex gap={5}>
								{props.tags.map((t, n) => <Tag key={n}>{t}</Tag>)}
							</Flex>
							: null
					}
				</div>
				{props.extra}
			</div>
		</ErrorBoundary>
	);
};
