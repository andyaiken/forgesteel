import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapZone } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-zone.scss';

interface Props {
	zone: MapZone;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectZone: (zone: MapZone) => void;
	updateZone: (zone: MapZone) => void;
}

export const MapZonePanel = (props: Props) => {
	try {
		let className = 'map-zone-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (props.selected) {
			className += ' selected';
		}

		return (
			<ErrorBoundary>
				<Popover content={props.zone.notes ? <Markdown text={props.zone.notes} /> : null}>
					<div
						className={className}
						style={props.style}
						onClick={e => {
							if (props.selectable) {
								e.stopPropagation();
								props.selectZone(props.zone);
							}
						}}
					>
						<div className='zone-content' style={{ borderRadius: props.style.borderRadius, backgroundColor: `#${props.zone.color}` }} />
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
