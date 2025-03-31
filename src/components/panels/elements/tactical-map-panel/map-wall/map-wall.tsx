import { Popover, Space, Tabs } from 'antd';
import { DangerButton } from '../../../../controls/danger-button/danger-button';
import { MapItemStyle } from '../tactical-map-panel';
import { MapWall } from '../../../../../models/tactical-map';
import { Markdown } from '../../../../controls/markdown/markdown';
import { MultiLine } from '../../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../../controls/number-spin/number-spin';
import { TacticalMapDisplayType } from '../../../../../enums/tactical-map-display-type';
import { TacticalMapLogic } from '../../../../../logic/tactical-map-logic';
import { Toggle } from '../../../../controls/toggle/toggle';
import { Utils } from '../../../../../utils/utils';
import { useState } from 'react';

import './map-wall.scss';

interface Props {
	wall: MapWall;
	display: TacticalMapDisplayType;
	selectable: boolean;
	style: MapItemStyle;
	updateWall: (wall: MapWall) => void;
	deleteWall: (wall: MapWall) => void;
}

export const MapWallPanel = (props: Props) => {
	const [ wall, setWall ] = useState<MapWall>(Utils.copy(props.wall));
	const [ selected, setSelected ] = useState<boolean>(false);

	const onOpenChange = (value: boolean) => {
		const displays = [ TacticalMapDisplayType.DirectorView, TacticalMapDisplayType.DirectorEdit ];
		if (displays.includes(props.display)) {
			setSelected(value);
		}
	};

	const getEditor = () => {
		const setNotes = (value: string) => {
			const copy = Utils.copy(wall);
			copy.notes = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setX = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointA.x = value;
			copy.pointB.x = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setY = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointA.y = value;
			copy.pointB.y = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setStartX = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointA.x = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setStartY = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointA.y = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setEndX = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointB.x = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setEndY = (value: number) => {
			const copy = Utils.copy(wall);
			copy.pointB.y = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setBlocksMovement = (value: boolean) => {
			const copy = Utils.copy(wall);
			copy.blocksMovement = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setBlocksLOS = (value: boolean) => {
			const copy = Utils.copy(wall);
			copy.blocksLineOfSight = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setIsOpenable = (value: boolean) => {
			const copy = Utils.copy(wall);
			copy.isOpenable = value;
			setWall(copy);
			props.updateWall(copy);
		};

		const setIsConcealed = (value: boolean) => {
			const copy = Utils.copy(wall);
			copy.isConcealed = value;
			setWall(copy);
			props.updateWall(copy);
		};

		return (
			<Tabs
				style={{ width: '300px' }}
				items={[
					{
						key: '1',
						label: 'Notes',
						children: (
							<MultiLine label='Notes' value={wall.notes} onChange={setNotes} />
						)
					},
					{
						key: '2',
						label: 'Edit',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								{
									TacticalMapLogic.getWallOrientation(wall) === 'vertical' ?
										<NumberSpin label='X' value={wall.pointA.x} onChange={setX} />
										:
										<NumberSpin label='Y' value={wall.pointA.y} onChange={setY} />
								}
								{
									TacticalMapLogic.getWallOrientation(wall) === 'vertical' ?
										<NumberSpin label='Start Y' value={wall.pointA.y} onChange={setStartY} />
										:
										<NumberSpin label='Start X' value={wall.pointA.x} onChange={setStartX} />
								}
								{
									TacticalMapLogic.getWallOrientation(wall) === 'vertical' ?
										<NumberSpin label='End Y' min={wall.pointA.y + 1} value={wall.pointB.y} onChange={setEndY} />
										:
										<NumberSpin label='End X' min={wall.pointA.x + 1} value={wall.pointB.x} onChange={setEndX} />
								}
							</Space>
						)
					},
					{
						key: '3',
						label: 'Features',
						children: (
							<Space direction='vertical' style={{ width: '100%' }}>
								<Toggle
									label='Blocks movement'
									value={wall.blocksMovement}
									onChange={setBlocksMovement}
								/>
								<Toggle
									label='Blocks line-of-sight'
									value={wall.blocksLineOfSight}
									onChange={setBlocksLOS}
								/>
								<Toggle
									label='Openable'
									value={wall.isOpenable}
									onChange={setIsOpenable}
								/>
								<Toggle
									label='Concealed'
									value={wall.isConcealed}
									onChange={setIsConcealed}
								/>
							</Space>
						)
					}
				]}
				tabBarExtraContent={
					<DangerButton mode='clear' onConfirm={() => props.deleteWall(wall)} />
				}
			/>
		);
	};

	const getInfo = () => {
		if (!wall.notes) {
			return null;
		}

		return (
			<Markdown text={wall.notes} />
		);
	};

	try {
		let className = 'map-wall-panel ' + props.display;
		if (props.selectable) {
			className += ' selectable';
		}
		if (selected) {
			className += ' selected';
		}

		let content = null;
		let displayAs = wall.isOpenable ? 'door' : 'wall';
		switch (props.display) {
			case TacticalMapDisplayType.Player:
				if (wall.isConcealed) {
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
					{content}
				</div>
			</Popover>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
