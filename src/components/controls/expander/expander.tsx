import { Collapse, Flex, Tag } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './expander.scss';

interface Props {
	title: ReactNode;
	tags?: string[];
	children: ReactNode;
	expandedByDefault?: boolean;
	extra?: ReactNode[];
}

export const Expander = (props: Props) => {
	return (
		<ErrorBoundary>
			<Collapse
				items={[
					{
						key: '1',
						label: props.tags ?
							<>{props.title} <Flex gap={5}>{props.tags.map((t, n) => <Tag key={n}>{t}</Tag>)}</Flex></>
							: props.title,
						children: props.children,
						extra: props.extra ?
							<>{props.extra}</>
							: null
					}
				]}
				defaultActiveKey={props.expandedByDefault ? '1' : undefined}
				expandIconPlacement='end'
			/>
		</ErrorBoundary>
	);
};
