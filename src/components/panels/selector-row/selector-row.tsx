import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Flex } from 'antd';
import { ReactNode } from 'react';

import './selector-row.scss';

interface Props {
	content: ReactNode;
	info?: ReactNode;
	selected: boolean;
	onSelect: () => void;
}

export const SelectorRow = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className={props.selected ? 'selector-row selected' : 'selector-row'} onClick={() => props.onSelect()}>
				<Flex align='center' justify='space-between' gap={5}>
					<div className='content'>{props.content}</div>
					{props.info ? <div className='info'>{props.info}</div> : null}
				</Flex>
			</div>
		</ErrorBoundary>
	);
};
