import { CheckIcon } from '@/components/controls/check-icon/check-icon';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './check-label.scss';

interface Props {
	state?: 'pending' | 'success' | 'failure';
	children: ReactNode;
}

export const CheckLabel = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='check-label'>
				<CheckIcon state={props.state} />
				{props.children}
			</div>
		</ErrorBoundary>
	);
};
