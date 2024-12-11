import { Button, Collapse } from 'antd';
import { ReactNode } from 'react';

import './expander.scss';

interface Props {
	title: string;
	children: ReactNode;
	extra?: {
		title: string;
		icon: ReactNode;
		onClick?: () => void;
	}[];
}

export const Expander = (props: Props) => {
	try {
		let extra = null;
		if (props.extra) {
			extra = props.extra.map((item, n) => (
				<Button key={n} type='text' icon={item.icon} onClick={e => {
					e.stopPropagation();
					if (item.onClick) {
						item.onClick();
					}
				}} />
			));
		}

		return (
			<Collapse
				className='expander'
				items={[
					{
						key: '1',
						label: props.title,
						children: props.children,
						extra: extra
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
