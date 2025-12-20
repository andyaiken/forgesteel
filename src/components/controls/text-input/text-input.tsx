import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@/hooks/use-debounce';

interface Props {
	value: string;
	disabled?: boolean;
	placeholder?: string;
	status?: '' | 'error' | 'warning' | 'success' | 'validating'
	allowClear?: boolean;
	suffix?: ReactNode;
	style?: CSSProperties;
	onChange: (value: string) => void;
}

export const TextInput = (props: Props) => {
	const [ value, setValue ] = useState(props.value);
	const debouncedValue = useDebounce(value);

	useEffect(
		() => props.onChange(debouncedValue),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ debouncedValue ]
	);

	return (
		<ErrorBoundary>
			<Input
				value={value}
				disabled={props.disabled}
				placeholder={props.placeholder}
				status={props.status}
				allowClear={props.allowClear}
				suffix={props.suffix}
				style={props.style}
				onChange={e => setValue(e.target.value)}
			/>
		</ErrorBoundary>
	);
};

interface SearchBoxProps {
	searchTerm: string;
	disabled?: boolean;
	style?: CSSProperties;
	setSearchTerm: (value: string) => void;
}

export const SearchBox = (props: SearchBoxProps) => {
	return (
		<ErrorBoundary>
			<TextInput
				placeholder='Search'
				allowClear={true}
				value={props.searchTerm}
				disabled={props.disabled}
				suffix={<SearchOutlined />}
				style={props.style}
				onChange={props.setSearchTerm}
			/>
		</ErrorBoundary>
	);
};
