import { Alert, Button, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

import './multi-line.scss';

interface Props {
	label: string;
	value: string | string[];
	onChange: (value: string | string[]) => void;
}

export const MultiLine = (props: Props) => {
	const coercedValue = useMemo(() => Array.isArray(props.value) ? props.value.join('\n') : props.value, [ props.value ]);
	function onChange(s: string) {
		const stringOrArray = s.includes('\n')
			? s.split('\n')
			: s;
		props.onChange(stringOrArray);
	}
	try {
		return (
			<div className='multi-line'>
				<Input.TextArea
					placeholder={props.label}
					rows={5}
					value={coercedValue}
					onChange={e => onChange(e.target.value)}
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
