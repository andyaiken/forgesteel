import { CSSProperties, ReactNode } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './selectable-panel.scss';

interface Props {
	children: ReactNode;
	watermark?: string;
	disabled?: boolean;
	selected?: boolean;
	style?: CSSProperties;
	action?: ReactNode;
	onSelect?: () => void;
};

export const SelectablePanel = (props: Props) => {
	let className = 'selectable-panel';
	if (props.onSelect) {
		className += ' selectable';
	}
	if (props.selected) {
		className += ' selected';
	}
	if (props.disabled) {
		className += ' disabled';
	}

	return (
		<ErrorBoundary>
			<div className={className} style={props.style} onClick={props.disabled ? undefined : props.onSelect}>
				{props.watermark ? <img className='watermark' src={props.watermark} /> : null}
				{props.children}
				{props.action ? <div className='action-button'>{props.action}</div> : null}
			</div>
		</ErrorBoundary>
	);
};
