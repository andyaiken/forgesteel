import { Button } from 'antd';

import './selectable-panel.scss';

interface Props {
	children: JSX.Element;
	onSelect?: () => void;
	onUnselect?: () => void;
};

export const SelectablePanel = (props: Props) => {
	return (
		<div className='selectable-panel'>
			{props.children}
			{props.onSelect ? <Button block={true} onClick={props.onSelect}>Select</Button> : null}
			{props.onUnselect ? <Button block={true} onClick={props.onUnselect}>Unselect</Button> : null}
		</div>
	);
};
