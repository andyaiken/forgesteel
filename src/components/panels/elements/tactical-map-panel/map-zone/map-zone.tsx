import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { MapItemStyle } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { MapZone } from '@/models/tactical-map';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';

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
};
