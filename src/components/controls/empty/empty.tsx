import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './empty.scss';

interface Props {
	text?: string;
}

export const Empty = (props: Props) => {
	return (
		<ErrorBoundary>
			<div className='empty'>
				{props.text || 'None'}
			</div>
		</ErrorBoundary>
	);
};
