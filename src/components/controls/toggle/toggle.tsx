import { Switch } from 'antd';

import './toggle.scss';

interface Props {
	disabled?: boolean;
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

export const Toggle = (props: Props) => {
	const onClick = () => {
		props.onChange(!props.value);
	};

	try {
		return (
			<div className={props.disabled ? 'toggle disabled' : 'toggle'} onClick={onClick}>
				<div>{props.label}</div>
				<Switch checked={props.value} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};