import { Collections } from '@/utils/collections';

import './histogram-panel.scss';

interface Props {
	min?: number;
	max?: number;
	values: number[];
	showPercentages?: boolean;
	getLabel?: (x: number) => string;
	selected?: number;
	onSelect?: (value: number) => void;
}

export const HistogramPanel = (props: Props) => {
	const onSelect = (value: number) => {
		if (props.onSelect) {
			props.onSelect(value);
		}
	};

	const min = props.min ?? Collections.min(props.values, v => v) ?? 0;
	const max = props.max ?? Collections.max(props.values, v => v) ?? 0;

	const data = [];
	for (let n = min; n <= max; ++n) {
		data.push({ x: n, value: props.values.filter(v => v === n).length });
	}

	const mode = Collections.max(data.map(v => v.value), v => v) || 0;
	const height = 100 / mode;

	return (
		<div className={props.onSelect ? 'histogram-panel clickable' : 'histogram-panel'}>
			{
				data.map(v => (
					<div key={v.x} className={v.x === props.selected ? 'bar-section selected' : 'bar-section'} onClick={() => onSelect(v.x)}>
						<div style={{ height: `${height * (mode - v.value)}px` }} />
						{v.value > 0 ? <div className='bar' style={{ height: `${height * v.value}px` }} /> : null}
						<div className='label'>{props.getLabel ? props.getLabel(v.x) : v.x}</div>
						{
							props.showPercentages && (props.values.length > 0) ?
								<div className='percentage'>
									{Math.round(100 * v.value / props.values.length)}%
								</div>
								: null
						}
					</div>
				))
			}
		</div>
	);
};
