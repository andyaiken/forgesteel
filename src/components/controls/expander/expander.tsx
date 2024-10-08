import { Collapse } from 'antd';

import './expander.scss';

interface Props {
	title: string;
	children: string | JSX.Element | null | (string | JSX.Element | null)[];
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
