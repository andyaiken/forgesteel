import { HeroHealthPanel, MonsterHealthPanel } from '@/components/panels/health/health-panel';
import { HeroInfo, HeroToken, MonsterInfo, MonsterToken } from '@/components/panels/token/token';
import { ErrorBoundary } from '@/components/controls/error-boundary/error-boundary';
import { FactoryLogic } from '@/logic/factory-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { MapItemStyle } from '@/components/panels/elements/tactical-map-panel/tactical-map-panel';
import { MapMini } from '@/models/tactical-map';
import { Markdown } from '@/components/controls/markdown/markdown';
import { Monster } from '@/models/monster';
import { Popover } from 'antd';
import { TacticalMapDisplayType } from '@/enums/tactical-map-display-type';

import './map-mini.scss';

interface Props {
	mini: MapMini;
	content: Hero | Monster | null;
	display: TacticalMapDisplayType;
	selectable: boolean;
	selected: boolean;
	style: MapItemStyle;
	selectMini: (mini: MapMini) => void;
	selectHero: (hero: Hero) => void;
	selectMonster: (monster: Monster) => void;
	updateMini: (mini: MapMini) => void;
}

export const MapMiniPanel = (props: Props) => {
	const getSize = () => {
		let size = FactoryLogic.createSize(1, 'M');

		if (props.mini.content) {
			if (props.mini.content.type === 'hero') {
				size = HeroLogic.getSize(props.content as Hero);
			}

			if (props.mini.content.type === 'monster') {
				size = (props.content as Monster).size;
			}
		}

		return size;
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
			if (props.mini.content.type === 'hero') {
				content.push(
					<HeroInfo key='info' hero={props.content as Hero} />
				);

				content.push(
					<HeroHealthPanel
						key='hero-health'
						hero={props.content as Hero}
						showEncounterControls={false}
					/>
				);
			}

			if (props.mini.content.type === 'monster') {
				content.push(
					<MonsterInfo key='info' monster={props.content as Monster} />
				);

				content.push(
					<MonsterHealthPanel
						key='monster-health'
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

	const size = getSize();

	let className = `map-mini-panel ${props.display} size-${size.mod.toLowerCase()}`;
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
					onDoubleClick={e => {
						if (props.selectable) {
							e.stopPropagation();
							if (props.display === TacticalMapDisplayType.DirectorEdit) {
								if (props.content && props.mini.content) {
									if (props.mini.content.type === 'hero') {
										props.selectHero(props.content as Hero);
									}
									if (props.mini.content.type === 'monster') {
										props.selectMonster(props.content as Monster);
									}
								}
							}
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
};
