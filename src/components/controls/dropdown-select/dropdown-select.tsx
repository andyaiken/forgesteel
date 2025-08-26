import { CSSProperties } from 'react';
import { Select } from 'antd';

import './dropdown-select.scss';

interface Props {
	style?: CSSProperties;
	disabled?: boolean;
	label: string;
	options: { value: string, label: string }[];
	value: string;
	onChange: (value: string) => void;
}

export const DropdownSelect = (props: Props) => {
	try {
		return (
			<div className={props.disabled ? 'dropdown-select disabled' : 'dropdown-select'} style={props.style}>
				<div>{props.label}</div>
				<Select<string, { value: string, label: string }>
					options={props.options}
					value={props.value}
					onChange={props.onChange}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
