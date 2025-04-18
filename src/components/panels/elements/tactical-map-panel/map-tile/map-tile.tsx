import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapTile } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-tile.scss';

interface Props {
	tile: MapTile;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectTile: (tile: MapTile) => void;
	updateTile: (tile: MapTile) => void;
}

export const MapTilePanel = (props: Props) => {
	const getContent = () => {
		switch (props.tile.content.type) {
			case 'color':
				return (
					<div
						className='tile-content'
						style={{
							backgroundColor: `#${props.tile.content.color}`,
							borderRadius: props.style.borderRadius
						}}
					/>
				);
			case 'image':
				return (
					<img
						className='tile-content'
						style={{
							borderRadius: props.style.borderRadius
						}}
						src={props.tile.content.imageData || undefined}
					/>
				);
			case 'video':
				return (
					<video
						className='tile-content'
						style={{
							borderRadius: props.style.borderRadius
						}}
						src={props.tile.content.videoData || undefined}
						autoPlay={true}
						controls={false}
						loop={true}
						muted={true}
					/>
				);
			case 'link':
				return (
					props.tile.content.isVideo ?
						<video
							className='tile-content'
							style={{
								borderRadius: props.style.borderRadius
							}}
							src={props.tile.content.url || undefined}
							autoPlay={true}
							controls={false}
							loop={true}
							muted={true}
						/>
						:
						<img
							className='tile-content'
							style={{
								borderRadius: props.style.borderRadius
							}}
							src={props.tile.content.url || undefined}
						/>
				);
		}

		return null;
	};

	try {
		let className = 'map-tile-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (props.selected) {
			className += ' selected';
		}

		return (
			<ErrorBoundary>
				<Popover content={props.tile.notes ? <Markdown text={props.tile.notes} /> : null}>
					<div
						className={className}
						style={props.style}
						onClick={e => {
							if (props.selectable) {
								e.stopPropagation();
								props.selectTile(props.tile);
							}
						}}
					>
						{getContent()}
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
