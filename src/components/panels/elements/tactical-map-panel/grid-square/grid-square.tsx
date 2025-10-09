import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { MapItemStyle } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { MapPosition } from '@/models/tactical-map';
import { MouseEvent } from 'react';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';

import './grid-square.scss';

interface Props {
	position: MapPosition;
	display: TacticalMapDisplayType;
	style: MapItemStyle;
	render: 'cell' | 'fog';
	selected: boolean;
	onMouseDown: (position: MapPosition) => void;
	onMouseUp: (position: MapPosition) => void;
	onMouseEnter: (position: MapPosition) => void;
}

export const GridSquarePanel = (props: Props) => {
	const mouseDown = (e: MouseEvent) => {
		e.stopPropagation();
		if (props.onMouseDown) {
			props.onMouseDown(props.position);
		}
	};

	const mouseUp = (e: MouseEvent) => {
		e.stopPropagation();
		if (props.onMouseUp) {
			props.onMouseUp(props.position);
		}
	};

	const mouseEnter = (e: MouseEvent) => {
		e.stopPropagation();
		if (props.onMouseEnter) {
			props.onMouseEnter(props.position);
		}
	};

	let className = 'grid-square-panel ' + props.display + ' ' + props.render;
	if (props.display === TacticalMapDisplayType.DirectorEdit) {
		className += ' selectable';
	}
	if (props.selected) {
		className += ' selected';
	}

	return (
		<ErrorBoundary>
			<div
				className={className}
				style={props.style}
				onMouseDown={mouseDown}
				onMouseUp={mouseUp}
				onMouseEnter={mouseEnter}
			/>
		</ErrorBoundary>
	);
};
