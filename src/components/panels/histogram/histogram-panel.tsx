import { Collections } from '../../../utils/collections';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';

import './histogram-panel.scss';

interface HistogramPanelProps {
	min?: number;
	max?: number;
	values: number[];
	selected?: number;
	onSelect?: (value: number) => void;
}

export const HistogramPanel = (props: HistogramPanelProps) => {
	const onSelect = (value: number) => {
		if (props.onSelect) {
			props.onSelect(value);
		}
	};

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
			<ErrorBoundary>
				<div className={props.onSelect ? 'histogram-panel clickable' : 'histogram-panel'}>
					{
						data.map(v => (
							<div key={v.x} className={v.x === props.selected ? 'bar-section selected' : 'bar-section'} onClick={() => onSelect(v.x)}>
								<div style={{ height: `${height * (mode - v.value)}px` }} />
								{v.value > 0 ? <div className='bar' style={{ height: `${height * v.value}px` }} /> : null}
								<div className='label'>{v.x}</div>
							</div>
						))
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface HistogramTextPanelProps {
	values: string[];
	selected?: string;
	onSelect?: (value: string) => void;
}

export const HistogramTextPanel = (props: HistogramTextPanelProps) => {
	const onSelect = (value: string) => {
		if (props.onSelect) {
			props.onSelect(value);
		}
	};

	try {
		const data: { key: string, value: number }[] = [];
		props.values.forEach(v => {
			const pair = data.find(p => p.key === v);
			if (pair) {
				pair.value += 1;
			} else {
				data.push({ key: v, value: 1 });
			}
		});

		const sortedData = Collections.sort(data, p => p.key);

		const mode = Collections.max(data.map(v => v.value), v => v) || 0;
		const height = 100 / mode;

		return (
			<ErrorBoundary>
				<div className={props.onSelect ? 'histogram-panel clickable' : 'histogram-panel'}>
					{
						sortedData.map(v => (
							<div key={v.key} className={v.key === props.selected ? 'bar-section selected' : 'bar-section'} onClick={() => onSelect(v.key)}>
								<div style={{ height: `${height * (mode - v.value)}px` }} />
								{v.value > 0 ? <div className='bar' style={{ height: `${height * v.value}px` }} /> : null}
								<div className='label'>{v.key}</div>
							</div>
						))
					}
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
