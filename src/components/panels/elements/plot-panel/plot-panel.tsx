import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { Plot } from '../../../../models/plot';
import { ReactNode } from 'react';

import './plot-panel.scss';

interface Props {
	plot: Plot;
	selectedPlot?: Plot;
	onSelect?: (plot: Plot | null) => void;
}

export const PlotPanel = (props: Props) => {
	const selectPlotPoint = (plot: Plot | null) => {
		if (props.onSelect) {
			props.onSelect(plot);
		}
	};

	const getRows = () => {
		const rows: Plot[][] = [];

		let unplaced = [ ...props.plot.plots ];
		const placed: Plot[] = [];

		while (unplaced.length > 0) {
			// Find any plot points that only have placed points in their immediate upstream
			const plots = unplaced.filter(plot => {
				// Return true only if each upstream plot point is placed
				return props.plot.plots
					.filter(p => p.links.map(l => l.plotID).includes(plot.id))
					.every(p => placed.includes(p));
			});

			// Add a row of placed plots
			rows.push(plots);

			// Update our working lists
			plots.forEach(p => placed.push(p));
			unplaced = unplaced.filter(p => !placed.includes(p));
		}

		return rows;
	};

	try {
		if (props.plot.plots.length === 0) {
			return (
				<div className='ds-text dimmed-text centered-text'>Empty</div>
			);
		};

		const rowHeight = 60;

		const rows = getRows();
		const rowCount = rows.length === 0 ? 1 : (rows.length * 2) - 1;
		const totalHeight = (rowHeight * rowCount) + 'px';

		const plotPositions: { [plotID: string]: { x: number, y: number, width: number, height: number } } = {};
		rows.forEach((row, rowIndex) => {
			const y = rowHeight * rowIndex * 2;
			const sectionWidth = 100 / ((row.length * 2) + 1);

			row.forEach((plot, plotIndex) => {
				const x = sectionWidth * ((plotIndex * 2) + 1);
				plotPositions[plot.id] = {
					x: x,
					y: y,
					width: sectionWidth,
					height: rowHeight
				};
			});
		});

		const plots: ReactNode[] = [];
		const links: ReactNode[] = [];
		const linkLabels: ReactNode[] = [];
		props.plot.plots.forEach(plot => {
			const position = plotPositions[plot.id];
			let className = 'plot-box';
			if (plot === props.selectedPlot) {
				className += ' selected';
			} else if (props.onSelect) {
				className += ' selectable';
			}

			plots.push(
				<foreignObject
					key={plot.id}
					className='plot-box-container'
					x={position.x + '%'}
					y={position.y}
					width={position.width + '%'}
					height={position.height}
				>
					<div className={className} onClick={e => { e.stopPropagation(); selectPlotPoint(plot); }}>
						{plot.name || 'Unnamed Plot Point'}
					</div>
				</foreignObject>
			);

			plot.links.filter(l => !!l.plotID).forEach(link => {
				const fromPosition = plotPositions[plot.id];
				const toPosition = plotPositions[link.plotID];

				const fromX = fromPosition.x + (fromPosition.width / 2);
				const fromY = fromPosition.y + (fromPosition.height / 2);
				const toX = toPosition.x + (toPosition.width / 2);
				const toY = toPosition.y + (toPosition.height / 2);

				links.push(
					<line
						key={`from ${plot.id} to ${link.plotID} link`}
						className='plot-link'
						x1={fromX + '%'}
						y1={fromY}
						x2={toX + '%'}
						y2={toY}
					/>
				);

				if (link.label) {
					const minX = Math.min(fromPosition.x, toPosition.x);
					const maxX = Math.max(fromPosition.x + fromPosition.width, toPosition.x + toPosition.width);

					linkLabels.push(
						<foreignObject
							key={`from ${plot.id} to ${link.plotID} label`}
							className='link-label-container'
							x={minX + '%'}
							y={fromY}
							width={(maxX - minX) + '%'}
							height={toY - fromY}
						>
							<div className='link-label'>
								{link.label}
							</div>
						</foreignObject>
					);
				}
			});
		});

		return (
			<ErrorBoundary>
				<div className='plot-panel' onClick={() => selectPlotPoint(null)}>
					<svg className='plot-container' style={{ height: totalHeight }}>
						{links}
						{linkLabels}
						{plots}
					</svg>
				</div>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
