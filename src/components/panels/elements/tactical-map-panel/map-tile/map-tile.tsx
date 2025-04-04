import { Flex, Popover, Segmented, Space, Tabs } from 'antd';
import { DangerButton } from '../../../../controls/danger-button/danger-button';
import { ErrorBoundary } from '../../../../controls/error-boundary/error-boundary';
import { MapItemStyle } from '../tactical-map-panel';
import { MapTile } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { MultiLine } from '../../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../../controls/number-spin/number-spin';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';
import { Utils } from '../../../../../utils/utils';
import { useState } from 'react';

import './map-tile.scss';

interface Props {
	tile: MapTile;
	display: TacticalMapDisplayType;
	selectable: boolean;
	style: MapItemStyle;
	updateTile: (tile: MapTile) => void;
	deleteTile: (tile: MapTile) => void;
}

export const MapTilePanel = (props: Props) => {
	const [ tile, setTile ] = useState<MapTile>(Utils.copy(props.tile));
	const [ selected, setSelected ] = useState<boolean>(false);

	const onOpenChange = (value: boolean) => {
		const displays = [ TacticalMapDisplayType.DirectorView, TacticalMapDisplayType.DirectorEdit ];
		if (displays.includes(props.display)) {
			setSelected(value);
		}
	};

	const getEditor = () => {
		const setNotes = (value: string) => {
			const copy = Utils.copy(tile);
			copy.notes = value;
			setTile(copy);
			props.updateTile(copy);
		};

		const setX = (value: number) => {
			const copy = Utils.copy(tile);
			copy.position.x = value;
			setTile(copy);
			props.updateTile(copy);
		};

		const setY = (value: number) => {
			const copy = Utils.copy(tile);
			copy.position.y = value;
			setTile(copy);
			props.updateTile(copy);
		};

		const setWidth = (value: number) => {
			const copy = Utils.copy(tile);
			copy.dimensions.width = value;
			setTile(copy);
			props.updateTile(copy);
		};

		const setHeight = (value: number) => {
			const copy = Utils.copy(tile);
			copy.dimensions.height = value;
			setTile(copy);
			props.updateTile(copy);
		};

		const setCorners = (value: 'square' | 'rounded' | 'circle') => {
			const copy = Utils.copy(tile);
			copy.corners = value;
			setTile(copy);
			props.updateTile(copy);
		};

		return (
			<Tabs
				style={{ width: '300px' }}
				items={[
					{
						key: '1',
						label: 'Notes',
						children: (
							<MultiLine label='Notes' value={tile.notes} onChange={setNotes} />
						)
					},
					{
						key: '2',
						label: 'Edit',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<Flex>
									<div style={{ flex: '1 1 0' }}>
										<NumberSpin label='X' value={tile.position.x} onChange={setX} />
										<NumberSpin label='Y' value={tile.position.y} onChange={setY} />
									</div>
									<div style={{ flex: '1 1 0' }}>
										<NumberSpin label='Width' min={1} value={tile.dimensions.width} onChange={setWidth} />
										<NumberSpin label='Height' min={1} value={tile.dimensions.height} onChange={setHeight} />
									</div>
								</Flex>
							</Space>
						)
					},
					{
						key: '3',
						label: 'Appearance',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<Segmented
									block={true}
									options={[
										{ value: 'square', label: 'Square' },
										{ value: 'rounded', label: 'Rounded' },
										{ value: 'circle', label: 'Circle' }
									]}
									value={tile.corners}
									onChange={setCorners}
								/>
							</Space>
						)
					}
				]}
				tabBarExtraContent={
					<DangerButton mode='clear' onConfirm={() => props.deleteTile(tile)} />
				}
			/>
		);
	};

	const getInfo = () => {
		if (!tile.notes) {
			return null;
		}

		return (
			<Markdown text={tile.notes} />
		);
	};

	try {
		let className = 'map-tile-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (selected) {
			className += ' selected';
		}

		return (
			<ErrorBoundary>
				<Popover
					content={props.selectable ? getEditor() : getInfo()}
					trigger={props.selectable ? 'click' : 'hover'}
					open={selected}
					onOpenChange={onOpenChange}
				>
					<div
						className={className}
						style={props.style}
					>
						<div className='tile-content' style={{ borderRadius: props.style.borderRadius }} />
					</div>
				</Popover>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
