import { Alert, Button, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import './multi-line.scss';

interface Props {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export const MultiLine = (props: Props) => {
	try {
		return (
			<div className='multi-line'>
				<Input.TextArea
					placeholder={props.label}
					rows={5}
					value={props.value}
					onChange={e => props.onChange(e.target.value)}
				/>
				<Alert
					type='info'
					showIcon={true}
					message='You can use markdown here.'
					action={<Button type='text' icon={<InfoCircleOutlined />} onClick={() => window.open('https://www.markdownguide.org/cheat-sheet/', '_blank')} />}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
