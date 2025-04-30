import { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';

import './selectable-panel.scss';

interface Props {
	children: ReactNode;
	showShadow?: boolean;
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
	try {
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
		if (props.showShadow !== false) {
			className += ' shadow';
		}

		return (
			<div className={className} style={props.style} onClick={props.disabled ? undefined : props.onSelect}>
				{props.children}
				{props.action ? <Button className='action-button' onClick={e => { e.stopPropagation(); props.action!.onClick(); }}>{props.action.label}</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
