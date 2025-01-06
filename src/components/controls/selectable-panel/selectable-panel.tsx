import { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';

import './selectable-panel.scss';

interface Props {
	children: ReactNode;
	showShadow?: boolean;
	style?: CSSProperties;
	onSelect?: () => void;
	onUnselect?: () => void;
};

export const SelectablePanel = (props: Props) => {
	try {
		let className = 'selectable-panel';
		if (props.onSelect) {
			className += ' selectable';
		}
		if (props.showShadow !== false) {
			className += ' shadow';
		}

		return (
			<div className={className} style={props.style} onClick={props.onSelect}>
				{props.children}
				{props.onUnselect ? <Button className='unselect-button' onClick={props.onUnselect}>Unselect</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
