import { Flex } from 'antd';
import { ReactNode } from 'react';

import './selector-row.scss';

interface Props {
	content: ReactNode;
	info?: ReactNode;
	hoverInfo?: ReactNode;
	selected: boolean;
	onSelect: () => void;
}

export const SelectorRow = (props: Props) => {
	const hasHoverInfo = !!props.hoverInfo;
	const hasInfo = props.info !== undefined && props.info !== null && props.info !== '';

	return (
		<div className={props.selected ? 'selector-row selected' : 'selector-row'} onClick={() => props.onSelect()}>
			<Flex align='center' justify='space-between' gap={5}>
				<div className='content'>{props.content}</div>
				{
					hasInfo || hasHoverInfo ?
						<div className={[
							'info',
							hasHoverInfo ? 'has-hover-info' : '',
							hasInfo ? 'has-default-info' : 'hover-only'
						].filter(Boolean).join(' ')}
						>
							{hasInfo ? <div className='info-default'>{props.info}</div> : null}
							{hasHoverInfo ? <div className='info-hover'>{props.hoverInfo}</div> : null}
						</div>
						: null
				}
			</Flex>
		</div>
	);
};
