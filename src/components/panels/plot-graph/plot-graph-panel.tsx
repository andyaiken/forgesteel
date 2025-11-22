import { Button, Flex } from 'antd';
import { LoginOutlined, LogoutOutlined, PartitionOutlined } from '@ant-design/icons';
import { Adventure } from '@/models/adventure';
import { AdventureLogic } from '@/logic/adventure-logic';
import { Empty } from '@/components/controls/empty/empty';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { HeaderText } from '@/components/controls/header-text/header-text';
import { Plot } from '@/models/plot';
import { ReactNode } from 'react';

import './plot-graph-panel.scss';

interface Props {
	label: string;
	tags: string[];
	plot: Plot;
	adventure: Adventure;
	selectedPlot?: Plot;
	onSelect?: (plot: Plot | null) => void;
	onOpen?: (plot: Plot) => void;
	onCreate?: () => void;
}

export const PlotGraphPanel = (props: Props) => {
	const openPlotPoint = (plot: Plot) => {
		if (props.onOpen) {
			props.onOpen(plot);
		}
	};

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

	const parentPlot = AdventureLogic.getPlotPointParent(props.adventure.plot, props.plot.id);

	const rowHeight = 80;

	const rows = getRows();
	const rowCount = rows.length === 0 ? 1 : (rows.length * 2) - 1;
	const totalHeight = (rowHeight * rowCount) + 'px';

	const plotPositions: { [plotID: string]: { x: number, y: number, width: number, height: number } } = {};
	rows.forEach((row, rowIndex) => {
		const y = rowHeight * rowIndex * 2;

		const boxes = row.length;
		const gaps = row.length + 1;
		const boxWidth = 1;
		const gapWidth = 0.2;
		const sectionWidth = 100 / ((boxes * boxWidth) + (gaps * gapWidth));

		row.forEach((plot, plotIndex) => {
			const x = sectionWidth * (gapWidth + (plotIndex * (boxWidth + gapWidth)));
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
				<div
					className={className}
					onClick={e => { e.stopPropagation(); selectPlotPoint(plot); }}
					onDoubleClick={e => e.stopPropagation()}
				>
					{plot.plots.length > 0 ? <PartitionOutlined className='subplot-indicator' rotate={90} style={{ fontSize: position.height / 2 }} /> : null}
					<div className='plot-name'>{plot.name || 'Unnamed Plot Point'}</div>
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

	const canGoOut = props.onOpen && parentPlot;
	const canGoIn = props.onOpen && props.selectedPlot && ((props.selectedPlot.plots.length > 0) || props.onCreate);

	return (
		<ErrorBoundary>
			<div className='plot-graph-panel' onClick={() => selectPlotPoint(null)} onDoubleClick={props.onCreate}>
				<div className='header-row' onClick={e => e.stopPropagation()}>
					<HeaderText
						level={1}
						style={{ margin: '0' }}
						tags={props.tags}
						extra={
							<Flex gap={5}>
								{canGoOut ? <Button type='text' icon={<LogoutOutlined rotate={210} />} onClick={() => openPlotPoint(parentPlot)} /> : null}
								{canGoIn ? <Button type='text' icon={<LoginOutlined rotate={30} />} onClick={() => openPlotPoint(props.selectedPlot!)} /> : null}
							</Flex>
						}
					>
						{props.label}
					</HeaderText>
				</div>
				{
					props.plot.plots.length > 0 ?
						<svg className='plot-container' style={{ height: totalHeight }}>
							{links}
							{linkLabels}
							{plots}
						</svg>
						:
						<Empty text={props.onCreate ? 'Double-click to add a plot point.' : 'No plot points'} />
				}
			</div>
		</ErrorBoundary>
	);
};
