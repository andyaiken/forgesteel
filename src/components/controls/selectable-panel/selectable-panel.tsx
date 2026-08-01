import { CSSProperties, ReactNode } from 'react';
import { Property } from 'csstype';

import './selectable-panel.scss';

interface Props {
	children: ReactNode;
	watermark?: string;
	watermarkFit?: Property.ObjectFit;
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
		<div className={className} style={props.style} onClick={props.disabled ? undefined : props.onSelect}>
			{props.watermark ? <img className='watermark' src={props.watermark} style={{ objectFit: props.watermarkFit || 'cover' }} /> : null}
			{props.children}
			{props.action ? <div className='action-button'>{props.action}</div> : null}
		</div>
	);
};
