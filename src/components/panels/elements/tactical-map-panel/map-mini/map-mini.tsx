import { HeroToken, MonsterToken } from '../../../../controls/token/token';
import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { Hero } from '../../../../../models/hero';
import { MapItemStyle } from '../tactical-map-panel';
import { MapMini } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { Monster } from '../../../../../models/monster';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';

import './map-mini.scss';

interface Props {
	mini: MapMini;
	content: Hero | Monster | null;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectMini: (mini: MapMini) => void;
	updateMini: (mini: MapMini) => void;
	deleteMini: (mini: MapMini) => void;
}

export const MapMiniPanel = (props: Props) => {
	const getContent = () => {
		if (props.mini.content && props.content) {
			const size = parseInt(props.style.width);

			if (props.mini.content.type === 'hero') {
				return (
					<HeroToken hero={props.content as Hero} size={size} />
				);
			}

			if (props.mini.content.type === 'monster') {
				return (
					<MonsterToken monster={props.content as Monster} size={size} />
				);
			}
		}

		return null;
	};

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
				<Popover content={props.mini.notes ? <Markdown text={props.mini.notes} /> : null}>
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
						<div className='mini-content'>
							{getContent()}
						</div>
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
