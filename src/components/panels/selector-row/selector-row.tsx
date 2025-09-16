import { Flex, Tag } from 'antd';
import { ReactNode } from 'react';

import './selector-row.scss';

interface Props {
	content: ReactNode;
	info?: ReactNode;
	tags?: string[];
	selected: boolean;
	onSelect: () => void;
}

export const SelectorRow = (props: Props) => {
	return (
		<div className={props.selected ? 'selector-row selected' : 'selector-row'} onClick={() => props.onSelect()}>
			<Flex align='center' justify='space-between' gap={5}>
				<div className='content'>{props.content}</div>
				{props.info ? <div className='info'>{props.info}</div> : null}
			</Flex>
			{
				props.tags && (props.tags.length > 0) ?
					<div>
						{
							props.tags.map((tag, n) => <Tag key={n}>{tag}</Tag>)
						}
					</div>
					: null
			}
		</div>
	);
};
