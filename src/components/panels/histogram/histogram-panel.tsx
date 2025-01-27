import { Collections } from '../../../utils/collections';
import './histogram-panel.scss';

interface Props {
	min?: number;
	max?: number;
	values: number[];
}

export const HistogramPanel = (props: Props) => {
	try {
		const min = props.min ?? Collections.min(props.values, v => v) ?? 0;
		const max = props.max ?? Collections.max(props.values, v => v) ?? 0;

		const data = [];
		for (let n = min; n <= max; ++n) {
			data.push({ x: n, value: props.values.filter(v => v === n).length });
		}

		const mode = Collections.max(data.map(v => v.value), v => v) || 0;
		const height = 100 / mode;

		return (
			<div className='histogram-panel'>
				{
					data.map(v => (
						<div key={v.x} className='bar-section'>
							<div style={{ height: `${height * (mode - v.value)}px` }} />
							{v.value > 0 ? <div className='bar' style={{ height: `${height * v.value}px` }} /> : null}
							<div className='label'>{v.x}</div>
						</div>
					))
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
