import { ReactNode } from 'react';
import './badge.scss';

interface Props {
	children?: ReactNode;
}

export const Badge = (props: Props) => (
	<span className='badge'>
		{props.children}
	</span>
);
