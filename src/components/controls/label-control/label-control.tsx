import { CSSProperties, ReactNode } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './label-control.scss';

interface Props {
	label: ReactNode;
	control: ReactNode;
	disabled?: boolean;
	style?: CSSProperties;
};

export const LabelControl = (props: Props) => {
	let className = 'label-control';
	if (props.disabled) {
		className += ' disabled';
	}

	return (
		<ErrorBoundary>
			<div className={className} style={props.style}>
				<span className='label-control-label'>
					{
						props.label
					}
				</span>
				<span className='label-control-control'>
					{props.control}
				</span>
			</div>
		</ErrorBoundary>
	);
};
