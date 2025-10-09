import { CSSProperties, ReactNode } from 'react';
import { Switch } from 'antd';

import './toggle.scss';

interface Props {
	style?: CSSProperties;
	disabled?: boolean;
	label: string;
	text?: {
		unchecked: ReactNode;
		checked: ReactNode;
	};
	value: boolean;
	onChange: (value: boolean) => void;
}

export const Toggle = (props: Props) => {
	const onClick = () => {
		props.onChange(!props.value);
	};

	return (
		<div className={props.disabled ? 'toggle disabled' : 'toggle'} style={props.style} onClick={onClick}>
			<div>{props.label}</div>
			<Switch
				unCheckedChildren={props.text ? props.text.unchecked : undefined}
				checkedChildren={props.text ? props.text.checked : undefined}
				checked={props.value}
			/>
		</div>
	);
};
