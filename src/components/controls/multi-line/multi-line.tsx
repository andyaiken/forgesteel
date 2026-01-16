import { CSSProperties, useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Input } from 'antd';
import { useDebounce } from '@/hooks/use-debounce';

import './multi-line.scss';

interface Props {
	value: string;
	placeholder?: string;
	style?: CSSProperties;
	inputStyle?: CSSProperties;
	onChange: (value: string) => void;
}

export const MultiLine = (props: Props) => {
	const [ value, setValue ] = useState(props.value);
	const debouncedValue = useDebounce(value);

	useEffect(
		() => setValue(props.value),
		[ props.value ]
	);

	useEffect(
		() => props.onChange(debouncedValue),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ debouncedValue ]
	);

	return (
		<ErrorBoundary>
			<div className='multi-line' style={props.style}>
				<Input.TextArea
					className='multi-line-input'
					style={props.inputStyle}
					placeholder={props.placeholder}
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</ErrorBoundary>
	);
};
