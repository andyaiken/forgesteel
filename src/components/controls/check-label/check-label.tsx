import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { ReactNode } from 'react';

import './check-label.scss';

interface Props {
	state?: 'pending' | 'success' | 'failure';
	children: ReactNode;
}

export const CheckLabel = (props: Props) => {
	return (
		<div className='check-label'>
			<CheckIcon state={props.state} />
			{props.children}
		</div>
	);
};
