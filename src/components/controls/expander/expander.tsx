import { Collapse } from 'antd';
import { ReactNode } from 'react';

import './expander.scss';

interface Props {
	title: string;
	children: ReactNode;
}

export const Expander = (props: Props) => {
	try {
		return (
			<Collapse
				className='expander'
				items={[
					{
						key: '1',
						label: props.title,
						children: props.children
					}
				]}
				expandIconPosition='end'
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
