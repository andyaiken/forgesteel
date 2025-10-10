import { Alert, Button, Input } from 'antd';
import { CSSProperties, useState } from 'react';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { InfoCircleOutlined } from '@ant-design/icons';

import './multi-line.scss';

interface Props {
	value: string;
	placeholder?: string;
	style?: CSSProperties;
	inputStyle?: CSSProperties;
	showMarkdownPrompt?: boolean;
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
				{
					(props.showMarkdownPrompt ?? true) ?
						<Alert
							className='multi-line-alert'
							type='info'
							showIcon={true}
							message='You can use markdown here.'
							action={<Button type='text' title='Info' icon={<InfoCircleOutlined />} onClick={() => window.open('https://www.markdownguide.org/cheat-sheet/', '_blank')} />}
						/>
						: null
				}
			</div>
		</ErrorBoundary>
	);
};
