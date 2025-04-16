import { HeroHealthPanel, MonsterHealthPanel } from '../../../health/health-panel';
import { HeroToken, MonsterToken } from '../../../../controls/token/token';
import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../../logic/factory-logic';
import { HeaderText } from '../../../../controls/header-text/header-text';
import { Hero } from '../../../../../models/hero';
import { HeroLogic } from '../../../../../logic/hero-logic';
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
	const getSizeModifier = () => {
		let size = FactoryLogic.createSize(1);

		if (props.mini.content) {
			if (props.mini.content.type === 'hero') {
				size = HeroLogic.getSize(props.content as Hero);
			}

			if (props.mini.content.type === 'monster') {
				size = (props.content as Monster).size;
			}
		}

		return size.mod;
	};

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

	const getInfo = () => {
		const content = [];

		if (props.mini.content && props.content) {
			content.push(
				<HeaderText key='name'>
					{props.content.name}
				</HeaderText>
			);

			if (props.mini.content.type === 'hero') {
				content.push(
					<HeroHealthPanel
						key='hero'
						hero={props.content as Hero}
						showEncounterControls={false}
					/>
				);
			}

			if (props.mini.content.type === 'monster') {
				content.push(
					<MonsterHealthPanel
						key='monster'
						monster={props.content as Monster}
					/>
				);
			}
		}

		if (props.mini.notes) {
			content.push(
				<Markdown
					key='notes'
					text={props.mini.notes}
				/>
			);
		}

		if (content.length > 0) {
			return (
				<>
					{content}
				</>
			);
		}

		return null;
	};

	// Don't show hidden minis
	const hideMinis = [ TacticalMapDisplayType.Player, TacticalMapDisplayType.Thumbnail ];
	if (hideMinis.includes(props.display) && props.content && props.content.state.hidden) {
		return null;
	}

	try {
		let className = 'map-mini-panel ' + props.display + ' size-' + getSizeModifier().toLowerCase();
		if (props.selectable) {
			className += ' selectable';
		}
		if (props.selected) {
			className += ' selected';
		}
		if (props.content && props.content.state.hidden) {
			className += ' hidden';
		}

		return (
			<ErrorBoundary>
				<Popover content={getInfo()}>
					<div
						className={className}
						style={props.style}
						onClick={e => {
							if (props.selectable) {
								e.stopPropagation();
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
