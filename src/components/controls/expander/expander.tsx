import { Collapse, Tag } from 'antd';
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
	try {
		return (
			<Collapse
				className='expander'
				items={[
					{
						key: '1',
						label: props.tags ? <>{props.title} {props.tags.map((t, n) => <Tag key={n}>{t}</Tag>)}</> : props.title,
						children: props.children,
						extra: props.extra ? <>{props.extra}</> : null
					}
				]}
				defaultActiveKey={props.expandedByDefault ? '1' : undefined}
				expandIconPosition='end'
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
