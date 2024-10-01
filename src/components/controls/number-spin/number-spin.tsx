import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';

import './number-spin.scss';

interface Props {
	label: string;
	value: number;
	step?: number;
	min?: number;
	max?: number;
	onChange: (value: number) => void;
}

export const NumberSpin = (props: Props) => {
	const onChange = (delta: number) => {
		const change = (props.step ?? 1) * delta;
		let value = props.value + change;
		if (props.min !== undefined) {
			value = Math.max(value, props.min);
		}
		if (props.max !== undefined) {
			value = Math.min(value, props.max);
		}
		props.onChange(value);
	};

	let canDown = true;
	if (props.min !== undefined) {
		canDown = props.value > props.min;
	}
	let canUp = true;
	if (props.max !== undefined) {
		canUp = props.value < props.max;
	}

	try {
		return (
			<div className='number-spin'>
				<MinusCircleOutlined
					className={canDown ? 'spin-button' : 'spin-button disabled'}
					onClick={() => onChange(-1)}
				/>
				<Statistic
					className='spin-middle'
					title={props.label}
					value={props.value}
				/>
				<PlusCircleOutlined
					className={canUp ? 'spin-button' : 'spin-button disabled'}
					onClick={() => onChange(+1)}
				/>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
