import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { ReactNode } from 'react';

import './stats-row.scss';

interface Props {
	children: ReactNode;
}

export const StatsRow = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='stats-row'>
				{props.children}
			</div>
		</ErrorBoundary>
	);
};
