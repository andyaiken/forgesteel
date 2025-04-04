import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapPosition } from '../../../../../models/tactical-map';
import { MouseEvent } from 'react';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-wall-vertex.scss';

interface Props {
	position: MapPosition;
	display: TacticalMapDisplayType;
	style: MapItemStyle;
	selected: boolean;
	onMouseDown: (pos: MapPosition) => void;
	onMouseUp: (pos: MapPosition) => void;
	onMouseEnter: (pos: MapPosition) => void;
}

export const MapWallVertexPanel = (props: Props) => {
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

	try {
		let className = 'map-wall-vertex-panel ' + props.display;
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
	} catch (e) {
		console.error(e);
		return null;
	}
};
