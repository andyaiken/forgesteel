import { CSSProperties, ReactNode } from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popover, Statistic } from 'antd';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';

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
	style?: CSSProperties;
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
	const ascending = [ ...steps ].sort((a, b) => a - b);
	const descending = [ ...steps ].sort((a, b) => b - a);

	return (
		<ErrorBoundary>
			<div className={props.disabled ? 'number-spin disabled' : 'number-spin'} style={props.style}>
				<div className='spin-buttons'>
					{
						descending.map((step, n) => (
							<Popover key={n} trigger='hover' content={`-${step}`}>
								<MinusCircleOutlined
									className={canDown ? 'spin-button' : 'spin-button disabled'}
									onClick={() => onChange(step, -1)}
								/>
							</Popover>
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
							<Popover key={n} trigger='hover' content={`+${step}`}>
								<PlusCircleOutlined
									className={canUp ? 'spin-button' : 'spin-button disabled'}
									onClick={() => onChange(step, +1)}
								/>
							</Popover>
						))
					}
				</div>
			</div>
		</ErrorBoundary>
	);
};
