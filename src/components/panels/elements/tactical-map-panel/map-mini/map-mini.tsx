import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapMini } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-mini.scss';

interface Props {
	mini: MapMini;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectMini: (mini: MapMini) => void;
	updateMini: (mini: MapMini) => void;
	deleteMini: (mini: MapMini) => void;
}

export const MapMiniPanel = (props: Props) => {
	try {
		let className = 'map-mini-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (props.selected) {
			className += ' selected';
		}

		return (
			<ErrorBoundary>
				<Popover content={<Markdown text={props.mini.notes} />}>
					<div
						className={className}
						style={props.style}
						onClick={e => {
							e.stopPropagation();
							if (props.selectable) {
								props.selectMini(props.mini);
							}
						}}
					>
						<div className='mini-content' />
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
