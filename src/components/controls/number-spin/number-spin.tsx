import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import { Statistic } from 'antd';
import { Utils } from '../../../utils/utils';

import './number-spin.scss';

interface Props {
	disabled?: boolean;
	label?: string;
	value: number;
	suffix?: ReactNode;
	steps?: number[];
	min?: number;
	max?: number;
	children?: ReactNode;
	format?: (value: number) => string;
	onChange: (value: number) => void;
}

export const NumberSpin = (props: Props) => {
	const onChange = (step: number, delta: number) => {
		const change = step * delta;
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

	const steps = props.steps || [ 1 ];
	const ascending = Utils.copy(steps).sort((a, b) => a - b);
	const descending = Utils.copy(steps).sort((a, b) => b - a);

	try {
		return (
			<div className={props.disabled ? 'number-spin disabled' : 'number-spin'}>
				<div className='spin-buttons'>
					{
						descending.map((step, n) => (
							<MinusCircleOutlined
								key={n}
								className={canDown ? 'spin-button' : 'spin-button disabled'}
								title={`-${step}`}
								onClick={() => onChange(step, -1)}
							/>
						))
					}
				</div>
				{
					props.children ?
						props.children
						:
						<Statistic
							className='spin-middle'
							title={props.label}
							value={props.format ? props.format(props.value) : props.value}
							suffix={props.suffix}
						/>
				}
				<div className='spin-buttons'>
					{
						ascending.map((step, n) => (
							<PlusCircleOutlined
								key={n}
								className={canUp ? 'spin-button' : 'spin-button disabled'}
								title={`+${step}`}
								onClick={() => onChange(step, +1)}
							/>
						))
					}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
