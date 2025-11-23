import { CSSProperties, useState } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Input } from 'antd';

import './multi-line.scss';

interface Props {
	value: string;
	placeholder?: string;
	style?: CSSProperties;
	inputStyle?: CSSProperties;
	onChange: (value: string) => void;
}

export const MultiLine = (props: Props) => {
	const [ value, setValue ] = useState<string>(props.value);

	const onChange = (text: string) => {
		setValue(text);
		props.onChange(text);
	};

	return (
		<ErrorBoundary>
			<div className='multi-line' style={props.style}>
				<Input.TextArea
					className='multi-line-input'
					style={props.inputStyle}
					placeholder={props.placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
				/>
			</div>
		</ErrorBoundary>
	);
};
