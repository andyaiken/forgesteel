import { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

import './selectable-panel.scss';

interface Props {
	children: ReactNode;
	watermark?: string;
	shadow?: boolean;
	disabled?: boolean;
	selected?: boolean;
	style?: CSSProperties;
	action?: {
		label: string;
		onClick: () => void;
	};
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
	if ((props.shadow === false) || props.disabled) {
		className += ' no-shadow';
	}

	return (
		<ErrorBoundary>
			<div className={className} style={props.style} onClick={props.disabled ? undefined : props.onSelect}>
				{props.watermark ? <img className='watermark' src={props.watermark} /> : null}
				{props.children}
				{props.action ? <Button className='action-button' onClick={e => { e.stopPropagation(); props.action!.onClick(); }}>{props.action.label}</Button> : null}
			</div>
		</ErrorBoundary>
	);
};
