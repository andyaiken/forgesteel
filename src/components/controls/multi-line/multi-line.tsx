import { Alert, Button, Input } from 'antd';
import { CSSProperties } from 'react';
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
	try {
		return (
			<div className='multi-line' style={props.style}>
				<Input.TextArea
					className='multi-line-input'
					placeholder={props.placeholder}
					value={props.value}
					onChange={e => props.onChange(e.target.value)}
				/>
				{
					(props.showMarkdownPrompt ?? true) ?
						<Alert
							className='multi-line-alert'
							style={props.inputStyle}
							type='info'
							showIcon={true}
							message='You can use markdown here.'
							action={<Button type='text' title='Info' icon={<InfoCircleOutlined />} onClick={() => window.open('https://www.markdownguide.org/cheat-sheet/', '_blank')} />}
						/>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
