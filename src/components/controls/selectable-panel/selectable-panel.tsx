import { Button } from 'antd';

import './selectable-panel.scss';

interface Props {
	children: JSX.Element | JSX.Element[];
	onSelect?: () => void;
	onUnselect?: () => void;
};

export const SelectablePanel = (props: Props) => {
	try {
		let className = 'selectable-panel';
		if (props.onSelect) {
			className += ' selectable';
		}

		return (
			<div className={className} onClick={props.onSelect}>
				{props.children}
				{props.onUnselect ? <Button className='unselect-button' onClick={props.onUnselect}>Unselect</Button> : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
