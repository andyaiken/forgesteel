import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapWall } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-wall.scss';

interface Props {
	wall: MapWall;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectWall: (wall: MapWall) => void;
	updateWall: (wall: MapWall) => void;
}

export const MapWallPanel = (props: Props) => {
	try {
		let className = 'map-wall-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (props.selected) {
			className += ' selected';
		}

		let content = null;
		let displayAs = props.wall.isOpenable ? 'door' : 'wall';
		switch (props.display) {
			case TacticalMapDisplayType.Player:
				if (props.wall.isConcealed) {
					displayAs = 'wall';
				}
				break;
		}
		switch (displayAs) {
			case 'wall':
				content = (
					<div className='wall-content' />
				);
				break;
			case 'door':
				content = (
					<svg className='wall-content'>
						<rect className='outline' x='10%' y='10%' width='80%' height='80%' />
					</svg>
				);
				break;
		}

		return (
			<ErrorBoundary>
				<Popover content={props.wall.notes ? <Markdown text={props.wall.notes} /> : null}>
					<div
						className={className}
						style={props.style}
						onClick={e => {
							if (props.selectable) {
								e.stopPropagation();
								props.selectWall(props.wall);
							}
						}}
					>
						{content}
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
