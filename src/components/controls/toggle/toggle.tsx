import { Switch } from 'antd';

interface Props {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

export const Toggle = (props: Props) => {
	const onClick = () => {
		props.onChange(!props.value);
	};

	return (
		<div className='toggle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', cursor: 'pointer' }} onClick={onClick}>
			<div className='ds-text'>{props.label}</div>
			<Switch checked={props.value} />
		</div>
	);
};
