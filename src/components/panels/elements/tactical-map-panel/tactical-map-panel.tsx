import { BookOutlined, RotateRightOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Divider, Input, Popover, Segmented, Select } from 'antd';
import { MapBoundaries, MapItem, MapMini, MapPosition, MapTile, MapWall, MapZone, TacticalMap } from '../../../../models/tactical-map';
import { ReactNode, useState } from 'react';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
import { GridSquarePanel } from './grid-square/grid-square';
import { MapMiniPanel } from './map-mini/map-mini';
import { MapTilePanel } from './map-tile/map-tile';
import { MapWallPanel } from './map-wall/map-wall';
import { MapWallVertexPanel } from './map-wall-vertex/map-wall-vertex';
import { MapZonePanel } from './map-zone/map-zone';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapEditMode } from '../../../../enums/tactical-map-edit-mode';
import { TacticalMapLogic } from '../../../../logic/tactical-map-logic';
import { Toggle } from '../../../controls/toggle/toggle';
import { Utils } from '../../../../utils/utils';

import './tactical-map-panel.scss';

export interface MapItemStyle {
	left: string;
	top: string;
	width: string;
	height: string;
	borderRadius: string;
	backgroundSize: string;
}

interface Props {
	map: TacticalMap;
	display: TacticalMapDisplayType;
	options: Options;
	encounters?: Encounter[];
	mode?: PanelMode;
	updateMap?: (map: TacticalMap) => void;
}

export const TacticalMapPanel = (props: Props) => {
	const [ map, setMap ] = useState<TacticalMap>(Utils.copy(props.map));
	const [ editMode, setEditMode ] = useState<TacticalMapEditMode>(TacticalMapEditMode.Map);
	const [ editAdding, setEditAdding ] = useState<boolean>(false);
	const [ selectionStartSquare, setSelectionStartSquare ] = useState<MapPosition | null>(null);
	const [ selectionEndSquare, setSelectionEndSquare ] = useState<MapPosition | null>(null);
	const [ wallStartVertex, setWallStartVertex ] = useState<MapPosition | null>(null);
	const [ wallEndVertex, setWallEndVertex ] = useState<MapPosition | null>(null);
	const [ selectedMapItemID, setSelectedMapItemID ] = useState<string | null>(null);

	const size = props.display === 'thumbnail' ? 5 : props.options.gridSize;

	const updateMapItem = (item: MapItem) => {
		const copy = Utils.copy(map);
		const index = copy.items.findIndex(i => i.id === item.id);
		if (index !== -1) {
			copy.items[index] = item;
		}
		setMap(copy);
		if (props.updateMap) {
			props.updateMap(copy);
		}
	};

	const deleteMapItem = (item: MapItem) => {
		const copy = Utils.copy(map);
		copy.items = copy.items.filter(i => i.id !== item.id);
		setMap(copy);
		if (props.updateMap) {
			props.updateMap(copy);
		}
	};

	const gridSquareMouseDown = (pos: MapPosition) => {
		setSelectionStartSquare(pos);
		setSelectionEndSquare(null);
	};

	const gridSquareEntered = (pos: MapPosition) => {
		if (selectionStartSquare) {
			setSelectionEndSquare(pos);
		}
	};

	const gridSquareMouseUp = (pos: MapPosition) => {
		const addTile = (points: MapPosition[]) => {
			const minX = Math.min(...points.map(pt => pt.x));
			const minY = Math.min(...points.map(pt => pt.y));
			const maxX = Math.max(...points.map(pt => pt.x));
			const maxY = Math.max(...points.map(pt => pt.y));

			const tile = FactoryLogic.createMapTile();
			tile.position = { x: minX, y: minY, z: 0 };
			tile.dimensions = { width: maxX - minX + 1, height: maxY - minY + 1, depth: 1 };

			const copy = Utils.copy(map) as TacticalMap;
			copy.items.push(tile);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const addZone = (points: MapPosition[]) => {
			const minX = Math.min(...points.map(pt => pt.x));
			const minY = Math.min(...points.map(pt => pt.y));
			const maxX = Math.max(...points.map(pt => pt.x));
			const maxY = Math.max(...points.map(pt => pt.y));

			const zone = FactoryLogic.createMapZone();
			zone.position = { x: minX, y: minY, z: 0 };
			zone.dimensions = { width: maxX - minX + 1, height: maxY - minY + 1, depth: 1 };

			const copy = Utils.copy(map) as TacticalMap;
			copy.items.push(zone);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const addMini = (points: MapPosition[]) => {
			const minX = Math.min(...points.map(pt => pt.x));
			const minY = Math.min(...points.map(pt => pt.y));
			const maxX = Math.max(...points.map(pt => pt.x));
			const maxY = Math.max(...points.map(pt => pt.y));

			const width = maxX - minX + 1;
			const height = maxY - minY + 1;

			const mini = FactoryLogic.createMapMini();
			mini.position = { x: minX, y: minY, z: 0 };
			mini.dimensions = { width: Math.min(width, height), height: Math.min(width, height), depth: 1 };

			const copy = Utils.copy(map) as TacticalMap;
			copy.items.push(mini);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const toggleFog = (points: MapPosition[]) => {
			const copy = Utils.copy(map) as TacticalMap;

			const minX = Math.min(...points.map(pt => pt.x));
			const minY = Math.min(...points.map(pt => pt.y));
			const maxX = Math.max(...points.map(pt => pt.x));
			const maxY = Math.max(...points.map(pt => pt.y));

			for (let x = minX; x <= maxX; ++x) {
				for (let y = minY; y <= maxY; ++y) {
					const z = 1;

					const current = copy.items
						.filter(i => i.type === 'fog')
						.find(i => (i.position.x === x) && (i.position.y === y) && (i.position.z === z));
					if (current) {
						// Remove this fog
						copy.items = copy.items.filter(i => i.id !== current.id);
					} else {
						// Add fog here
						const fog = FactoryLogic.createMapFog();
						fog.position.x = x;
						fog.position.y = y;
						fog.position.z = z;
						copy.items.push(fog);
					}
				}
			}

			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		if (selectionStartSquare) {
			if ((editMode === TacticalMapEditMode.Tiles) && editAdding) {
				addTile([ selectionStartSquare, pos ]);
			}
			if ((editMode === TacticalMapEditMode.Zones) && editAdding) {
				addZone([ selectionStartSquare, pos ]);
			}
			if ((editMode === TacticalMapEditMode.Minis) && editAdding) {
				addMini([ selectionStartSquare, pos ]);
			}
			if (editMode === TacticalMapEditMode.Fog) {
				toggleFog([ selectionStartSquare, pos ]);
			}

			setSelectionStartSquare(null);
			setSelectionEndSquare(null);
		}
	};

	const isGridSquareSelected = (pos: MapPosition) => {
		if (selectionStartSquare && selectionEndSquare) {
			const minX = Math.min(selectionStartSquare.x, selectionEndSquare.x);
			const minY = Math.min(selectionStartSquare.y, selectionEndSquare.y);
			const maxX = Math.max(selectionStartSquare.x, selectionEndSquare.x);
			const maxY = Math.max(selectionStartSquare.y, selectionEndSquare.y);
			return ((pos.x >= minX) && (pos.x <= maxX) && (pos.y >= minY) && (pos.y <= maxY));
		}

		return false;
	};

	const vertexMouseDown = (pos: MapPosition) => {
		setWallStartVertex(pos);
		setWallEndVertex(null);
	};

	const vertexEntered = (pos: MapPosition) => {
		if (wallStartVertex) {
			setWallEndVertex(pos);
		}
	};

	const vertexMouseUp = (pos: MapPosition) => {
		const addWall = (points: MapPosition[]) => {
			const minX = Math.min(...points.map(pt => pt.x));
			const minY = Math.min(...points.map(pt => pt.y));
			const maxX = Math.max(...points.map(pt => pt.x));
			const maxY = Math.max(...points.map(pt => pt.y));

			const wall = FactoryLogic.createMapWall();
			wall.pointA = { x: minX, y: minY, z: 0 };
			wall.pointB = { x: maxX, y: maxY, z: 0 };

			const copy = Utils.copy(map) as TacticalMap;
			copy.items.push(wall);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		if (wallStartVertex) {
			if ((editMode === TacticalMapEditMode.Walls) && editAdding) {
				if ((wallStartVertex.x === pos.x) && (wallStartVertex.y === pos.y)) {
					// Can't have a wall that's 0 long
				} else {
					addWall([ wallStartVertex, pos ]);
				}
			}

			setWallStartVertex(null);
			setWallEndVertex(null);
		}
	};

	const isVertexSelected = (pos: MapPosition) => {
		if (wallStartVertex) {
			if ((pos.x === wallStartVertex.x) && (pos.y === wallStartVertex.y)) {
				return true;
			}
		}

		if (wallStartVertex && wallEndVertex) {
			if (wallStartVertex.x === wallEndVertex.x) {
				if (pos.x === wallStartVertex.x) {
					const min = Math.min(wallStartVertex.y, wallEndVertex.y);
					const max = Math.max(wallStartVertex.y, wallEndVertex.y);
					return ((pos.y >= min) && (pos.y <= max));
				}
			}
			if (wallStartVertex.y === wallEndVertex.y) {
				if (pos.y === wallStartVertex.y) {
					const min = Math.min(wallStartVertex.x, wallEndVertex.x);
					const max = Math.max(wallStartVertex.x, wallEndVertex.x);
					return ((pos.x >= min) && (pos.x <= max));
				}
			}
		}

		return false;
	};

	const getMapItemStyle = (x: number, y: number, width: number, height: number, style: 'square' | 'rounded' | 'circle' | 'vertex' | 'wall' | null, dim: MapBoundaries): MapItemStyle => {
		let offsetX = 0;
		let offsetY = 0;
		if ((width < 1) && (style !== 'wall')) {
			offsetX = (1 - width) / 2;
		}
		if ((height < 1) && (style !== 'wall')) {
			offsetY = (1 - height) / 2;
		}

		let radius = '0';
		switch (style) {
			case 'rounded':
				radius = size + 'px';
				break;
			case 'circle':
			case 'vertex':
				radius = '50%';
				break;
		}

		const wallSize = size / 12;

		const dx = x + offsetX - dim.minX;
		const dy = y + offsetY - dim.minY;
		let left = size * dx;
		let top = size * dy;
		if (style === 'vertex') {
			left -= Math.max(5, wallSize);
			top -= Math.max(5, wallSize);
		}
		if (style === 'wall') {
			left -= wallSize;
			top -= wallSize;
		}

		let pixelWidth = size * width;
		let pixelHeight = size * height;
		if (style === 'vertex') {
			pixelWidth = Math.max(10, wallSize * 2);
			pixelHeight = Math.max(10, wallSize * 2);
		}
		if (style === 'wall') {
			pixelWidth += (wallSize * 2);
			pixelHeight += (wallSize * 2);
		}

		return {
			left: left + 'px',
			top: top + 'px',
			width: pixelWidth + 'px',
			height: pixelHeight + 'px',
			borderRadius: radius,
			backgroundSize: size + 'px'
		};
	};

	/*
	const lineOfSightCache: { a: string, b: string, visible: boolean }[] = [];

	const getLineOfSight = (
		walls: { horizontal: { start: number, end: number, y: number }[], vertical: { start: number, end: number, x: number }[] },
		a: { x: number, y: number },
		b: { x: number, y: number }
	) => {
		const aStr = JSON.stringify(a);
		const bStr = JSON.stringify(b);
		const known = lineOfSightCache.find(i => ((i.a === aStr) && (i.b === bStr)) || ((i.a === bStr) && (i.b === aStr)));
		if (known) {
			return known.visible;
		}

		const visible = Mercator.canSee(walls, a, b);
		lineOfSightCache.push({ a: aStr, b: bStr, visible: visible });
		return visible;
	};
	*/

	//#region Rendering

	const getTopToolbar = () => {
		if (props.display !== TacticalMapDisplayType.DirectorEdit) {
			return null;
		}

		const setName = (value: string) => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.name = value;
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const rotateMap = () => {
			const copy = Utils.copy(map) as TacticalMap;
			TacticalMapLogic.rotateMap(copy);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearMap = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = [];
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearTiles = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = copy.items.filter(i => i.type !== 'tile');
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearWalls = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = copy.items.filter(i => i.type !== 'wall');
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearZones = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = copy.items.filter(i => i.type !== 'zone');
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearMinis = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = copy.items.filter(i => i.type !== 'mini');
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const clearFog = () => {
			const copy = Utils.copy(map) as TacticalMap;
			copy.items = copy.items.filter(i => i.type !== 'fog');
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const addSurroundingWalls = () => {
			const copy = Utils.copy(map) as TacticalMap;
			TacticalMapLogic.addWalls(copy, true, false);
			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const fillFog = () => {
			const copy = Utils.copy(map) as TacticalMap;

			const boundaries = TacticalMapLogic.getMapBoundaries(copy);
			if (boundaries) {
				for (let x = boundaries.minX; x <= boundaries.maxX; ++x) {
					for (let y = boundaries.minY; y <= boundaries.maxY; ++y) {
						const z = 1;
						const fog = FactoryLogic.createMapFog();
						fog.position.x = x;
						fog.position.y = y;
						fog.position.z = z;
						copy.items.push(fog);
					}
				}
			}

			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		return (
			<div className='tactical-map-toolbar top-toolbar'>
				<Segmented
					name='edit'
					options={[
						{ value: TacticalMapEditMode.Map, label: 'Map' },
						{ value: TacticalMapEditMode.Tiles, label: 'Tiles' },
						{ value: TacticalMapEditMode.Walls, label: 'Walls' },
						{ value: TacticalMapEditMode.Zones, label: 'Zones' },
						{ value: TacticalMapEditMode.Minis, label: 'Minis' },
						{ value: TacticalMapEditMode.Fog, label: 'Fog' }
					]}
					value={editMode}
					onChange={setEditMode}
				/>
				<Divider type='vertical' />
				{
					editMode === TacticalMapEditMode.Map ?
						<Input
							style={{ width: '200px' }}
							placeholder='Name'
							allowClear={true}
							value={map.name}
							onChange={e => setName(e.target.value)}
						/>
						: null
				}
				{
					editMode === TacticalMapEditMode.Map ?
						<Divider type='vertical' />
						: null
				}
				{
					editMode === TacticalMapEditMode.Map ?
						<Button disabled={map.items.length === 0} icon={<RotateRightOutlined />} onClick={rotateMap}>Rotate</Button>
						: null
				}
				{
					(editMode === TacticalMapEditMode.Tiles) || (editMode === TacticalMapEditMode.Walls) || (editMode === TacticalMapEditMode.Zones) || (editMode === TacticalMapEditMode.Minis) ?
						<Segmented
							options={[
								{ value: false, label: 'Select' },
								{ value: true, label: 'Add' }
							]}
							value={editAdding}
							onChange={setEditAdding}
						/>
						: null
				}
				{
					(editMode === TacticalMapEditMode.Tiles) || (editMode === TacticalMapEditMode.Walls) || (editMode === TacticalMapEditMode.Zones) || (editMode === TacticalMapEditMode.Minis) ?
						<Divider type='vertical' />
						: null
				}
				{
					editMode === TacticalMapEditMode.Walls ?
						<Button onClick={addSurroundingWalls}>Add Surrounding Walls</Button>
						: null
				}
				{
					editMode === TacticalMapEditMode.Fog ?
						<Button onClick={fillFog}>Fill Fog</Button>
						: null
				}
				{
					editMode === TacticalMapEditMode.Map ?
						<DangerButton label='Clear Map' onConfirm={clearMap} />
						: null
				}
				{
					editMode === TacticalMapEditMode.Tiles ?
						<DangerButton disabled={map.items.filter(i => i.type === 'tile').length === 0} label='Clear Tiles' onConfirm={clearTiles} />
						: null
				}
				{
					editMode === TacticalMapEditMode.Walls ?
						<DangerButton disabled={map.items.filter(i => i.type === 'wall').length === 0} label='Clear Walls' onConfirm={clearWalls} />
						: null
				}
				{
					editMode === TacticalMapEditMode.Zones ?
						<DangerButton disabled={map.items.filter(i => i.type === 'zone').length === 0} label='Clear Zones' onConfirm={clearZones} />
						: null
				}
				{
					editMode === TacticalMapEditMode.Minis ?
						<DangerButton disabled={map.items.filter(i => i.type === 'mini').length === 0} label='Clear Minis' onConfirm={clearMinis} />
						: null
				}
				{
					editMode === TacticalMapEditMode.Fog ?
						<DangerButton disabled={map.items.filter(i => i.type === 'fog').length === 0} label='Clear Fog' onConfirm={clearFog} />
						: null
				}
			</div>
		);
	};

	const getBottomToolbar = () => {
		if (props.display !== TacticalMapDisplayType.DirectorEdit) {
			return null;
		}

		const item = map.items.find(i => i.id === selectedMapItemID);
		if (!item) {
			return null;
		}

		const setX = (value: number) => {
			const copy = Utils.copy(item) as MapTile | MapZone | MapMini;
			copy.position.x = value;
			updateMapItem(copy);
		};

		const setY = (value: number) => {
			const copy = Utils.copy(item) as MapTile | MapZone | MapMini;
			copy.position.y = value;
			updateMapItem(copy);
		};

		const setWidth = (value: number) => {
			const copy = Utils.copy(item) as MapTile | MapZone | MapMini;
			copy.dimensions.width = value;
			updateMapItem(copy);
		};

		const setHeight = (value: number) => {
			const copy = Utils.copy(item) as MapTile | MapZone | MapMini;
			copy.dimensions.height = value;
			updateMapItem(copy);
		};

		const setCorners = (value: 'square' | 'rounded' | 'circle') => {
			const copy = Utils.copy(item) as MapTile | MapZone;
			copy.corners = value;
			updateMapItem(copy);
		};

		const setWallX = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointA.x = value;
			copy.pointB.x = value;
			updateMapItem(copy);
		};

		const setWallY = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointA.y = value;
			copy.pointB.y = value;
			updateMapItem(copy);
		};

		const setStartX = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointA.x = value;
			updateMapItem(copy);
		};

		const setStartY = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointA.y = value;
			updateMapItem(copy);
		};

		const setEndX = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointB.x = value;
			updateMapItem(copy);
		};

		const setEndY = (value: number) => {
			const copy = Utils.copy(item) as MapWall;
			copy.pointB.y = value;
			updateMapItem(copy);
		};

		const setBlocksMovement = (value: boolean) => {
			const copy = Utils.copy(item) as MapWall;
			copy.blocksMovement = value;
			updateMapItem(copy);
		};

		const setBlocksLOS = (value: boolean) => {
			const copy = Utils.copy(item) as MapWall;
			copy.blocksLineOfSight = value;
			updateMapItem(copy);
		};

		const setIsOpenable = (value: boolean) => {
			const copy = Utils.copy(item) as MapWall;
			copy.isOpenable = value;
			updateMapItem(copy);
		};

		const setIsConcealed = (value: boolean) => {
			const copy = Utils.copy(item) as MapWall;
			copy.isConcealed = value;
			updateMapItem(copy);
		};

		const setColor = (value: string) => {
			const copy = Utils.copy(item) as MapZone;
			copy.color = value;
			updateMapItem(copy);
		};

		const setSize = (value: number) => {
			const copy = Utils.copy(item) as MapMini;
			copy.dimensions.width = value;
			copy.dimensions.height = value;
			updateMapItem(copy);
		};

		const setNotes = (value: string) => {
			const copy = Utils.copy(item) as MapTile | MapWall | MapZone | MapMini;
			copy.notes = value;
			updateMapItem(copy);
		};

		return (
			<div className='tactical-map-toolbar bottom-toolbar'>
				{
					item.type === 'tile' ?
						<>
							<NumberSpin value={item.position.x} onChange={setX}>
								<Field label='X' value={item.position.x} />
							</NumberSpin>
							<NumberSpin value={item.position.y} onChange={setY}>
								<Field label='Y' value={item.position.y} />
							</NumberSpin>
							<NumberSpin min={1} value={item.dimensions.width} onChange={setWidth}>
								<Field label='Width' value={item.dimensions.width} />
							</NumberSpin>
							<NumberSpin min={1} value={item.dimensions.height} onChange={setHeight}>
								<Field label='Height' value={item.dimensions.height} />
							</NumberSpin>
							<Select
								options={[
									{ id: 'square', label: 'Square' },
									{ id: 'rounded', label: 'Rounded' },
									{ id: 'circle', label: 'Circle' }
								]}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={item.corners}
								onChange={setCorners}
							/>
						</>
						: null
				}
				{
					item.type === 'wall' ?
						<>
							{
								TacticalMapLogic.getWallOrientation(item) === 'vertical' ?
									<>
										<NumberSpin label='X' value={item.pointA.x} onChange={setWallX}>
											<Field label='X' value={item.pointA.x} />
										</NumberSpin>
										<NumberSpin label='Start Y' value={item.pointA.y} onChange={setStartY}>
											<Field label='Start Y' value={item.pointA.y} />
										</NumberSpin>
										<NumberSpin label='End Y' min={item.pointA.y + 1} value={item.pointB.y} onChange={setEndY}>
											<Field label='End Y' value={item.pointB.y} />
										</NumberSpin>
									</>
									:
									<>
										<NumberSpin label='Y' value={item.pointA.y} onChange={setWallY}>
											<Field label='Y' value={item.pointA.y} />
										</NumberSpin>
										<NumberSpin label='Start X' value={item.pointA.x} onChange={setStartX}>
											<Field label='Start X' value={item.pointA.x} />
										</NumberSpin>
										<NumberSpin label='End X' min={item.pointA.x + 1} value={item.pointB.x} onChange={setEndX}>
											<Field label='End X' value={item.pointB.x} />
										</NumberSpin>
									</>
							}
							<Popover
								content={
									<>
										<Toggle
											label='Blocks movement'
											value={item.blocksMovement}
											onChange={setBlocksMovement}
										/>
										<Toggle
											label='Blocks line-of-sight'
											value={item.blocksLineOfSight}
											onChange={setBlocksLOS}
										/>
										<Toggle
											label='Openable'
											value={item.isOpenable}
											onChange={setIsOpenable}
										/>
										<Toggle
											label='Concealed'
											value={item.isConcealed}
											onChange={setIsConcealed}
										/>
									</>
								}
							>
								<Button type='text'>
									<SettingOutlined />
								</Button>
							</Popover>
						</>
						: null
				}
				{
					item.type === 'zone' ?
						<>
							<NumberSpin value={item.position.x} onChange={setX}>
								<Field label='X' value={item.position.x} />
							</NumberSpin>
							<NumberSpin value={item.position.y} onChange={setY}>
								<Field label='Y' value={item.position.y} />
							</NumberSpin>
							<NumberSpin min={1} value={item.dimensions.width} onChange={setWidth}>
								<Field label='Width' value={item.dimensions.width} />
							</NumberSpin>
							<NumberSpin min={1} value={item.dimensions.height} onChange={setHeight}>
								<Field label='Height' value={item.dimensions.height} />
							</NumberSpin>
							<Select
								options={[
									{ id: 'square', label: 'Square' },
									{ id: 'rounded', label: 'Rounded' },
									{ id: 'circle', label: 'Circle' }
								]}
								optionRender={option => <div className='ds-text'>{option.data.label}</div>}
								value={item.corners}
								onChange={setCorners}
							/>
							<ColorPicker
								style={{ flex: '0 0 auto' }}
								format='hex'
								value={item.color}
								onChange={c => setColor(c.toHex())}
							/>
						</>
						: null
				}
				{
					item.type === 'mini' ?
						<>
							<NumberSpin value={item.position.x} onChange={setX}>
								<Field label='X' value={item.position.x} />
							</NumberSpin>
							<NumberSpin value={item.position.y} onChange={setY}>
								<Field label='Y' value={item.position.y} />
							</NumberSpin>
							<NumberSpin value={item.dimensions.width} onChange={setSize}>
								<Field label='Size' value={item.dimensions.width} />
							</NumberSpin>
						</>
						: null
				}
				<Popover
					content={
						<MultiLine
							label='Notes'
							value={(item  as MapTile | MapWall | MapZone | MapMini).notes}
							onChange={setNotes}
						/>
					}
				>
					<Button type='text'>
						<BookOutlined />
					</Button>
				</Popover>
				<DangerButton mode='clear' onConfirm={() => deleteMapItem(item)} />
			</div>
		);
	};

	const getTiles = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'tile')
			.map(tile => (
				<MapTilePanel
					key={tile.id}
					tile={tile}
					display={props.display}
					selectable={(editMode === TacticalMapEditMode.Tiles) && !editAdding}
					selected={selectedMapItemID === tile.id}
					style={getMapItemStyle(tile.position.x, tile.position.y, tile.dimensions.width, tile.dimensions.height, tile.corners, boundaries)}
					selectTile={tile => setSelectedMapItemID(tile.id)}
					updateTile={updateMapItem}
					deleteTile={deleteMapItem}
				/>
			));
	};

	const getWalls = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'wall')
			.map(wall => {
				const x = Math.min(wall.pointA.x, wall.pointB.x);
				const y = Math.min(wall.pointA.y, wall.pointB.y);
				const width = Math.abs(wall.pointA.x - wall.pointB.x);
				const height = Math.abs(wall.pointA.y - wall.pointB.y);

				return (
					<MapWallPanel
						key={wall.id}
						wall={wall}
						display={props.display}
						selectable={(editMode === TacticalMapEditMode.Walls) && !editAdding}
						selected={selectedMapItemID === wall.id}
						style={getMapItemStyle(x, y, width, height, 'wall', boundaries)}
						selectWall={wall => setSelectedMapItemID(wall.id)}
						updateWall={updateMapItem}
						deleteWall={deleteMapItem}
					/>
				);
			});
	};

	const getZones = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'zone')
			.map(zone => (
				<MapZonePanel
					key={zone.id}
					zone={zone}
					display={props.display}
					selectable={(editMode === TacticalMapEditMode.Zones) && !editAdding}
					selected={selectedMapItemID === zone.id}
					style={getMapItemStyle(zone.position.x, zone.position.y, zone.dimensions.width, zone.dimensions.height, zone.corners, boundaries)}
					selectZone={zone => setSelectedMapItemID(zone.id)}
					updateZone={updateMapItem}
					deleteZone={deleteMapItem}
				/>
			));
	};

	const getMinis = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'mini')
			.map(mini => (
				<MapMiniPanel
					key={mini.id}
					mini={mini}
					display={props.display}
					selectable={(editMode === TacticalMapEditMode.Minis) && !editAdding}
					selected={selectedMapItemID === mini.id}
					style={getMapItemStyle(mini.position.x, mini.position.y, mini.dimensions.width, mini.dimensions.height, 'circle', boundaries)}
					selectMini={mini => setSelectedMapItemID(mini.id)}
					updateMini={updateMapItem}
					deleteMini={deleteMapItem}
				/>
			));
	};

	const getFog = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'fog')
			.map(fog => (
				<GridSquarePanel
					key={fog.id}
					position={fog.position}
					display={props.display}
					style={getMapItemStyle(fog.position.x, fog.position.y, 1, 1, 'square', boundaries)}
					render='fog'
					selected={isGridSquareSelected(fog.position)}
					onMouseDown={gridSquareMouseDown}
					onMouseUp={gridSquareMouseUp}
					onMouseEnter={gridSquareEntered}
				/>
			));
	};

	const getGrid = (boundaries: MapBoundaries) => {
		const grid: ReactNode[] = [];

		let showGrid = false;
		switch (editMode) {
			case TacticalMapEditMode.Tiles:
			case TacticalMapEditMode.Zones:
			case TacticalMapEditMode.Minis:
				showGrid = editAdding;
				break;
			case TacticalMapEditMode.Fog:
				showGrid = true;
				break;
		}

		if (showGrid) {
			for (let x = boundaries.minX; x <= boundaries.maxX; ++x) {
				for (let y = boundaries.minY; y <= boundaries.maxY; ++y) {
					const z = 1;
					grid.push(
						<GridSquarePanel
							key={'grid ' + x + ',' + y + ',' + z}
							position={{ x: x, y: y, z: z }}
							display={props.display}
							style={getMapItemStyle(x, y, 1, 1, 'square', boundaries)}
							render='cell'
							selected={isGridSquareSelected({ x: x, y: y, z: z })}
							onMouseDown={gridSquareMouseDown}
							onMouseUp={gridSquareMouseUp}
							onMouseEnter={gridSquareEntered}
						/>
					);
				}
			}
		}

		return grid;
	};

	const getWallVertices = (boundaries: MapBoundaries) => {
		const grid: ReactNode[] = [];

		if ((editMode === TacticalMapEditMode.Walls) && editAdding) {
			for (let x = boundaries.minX + 1; x !== boundaries.maxX + 1; ++x) {
				for (let y = boundaries.minY + 1; y !== boundaries.maxY + 1; ++y) {
					const z = 1;
					grid.push(
						<MapWallVertexPanel
							key={'vertex ' + x + ',' + y + ',' + z}
							position={{ x: x, y: y, z: z }}
							display={props.display}
							style={getMapItemStyle(x, y, 1, 1, 'vertex', boundaries)}
							selected={isVertexSelected({ x: x, y: y, z: z })}
							onMouseDown={vertexMouseDown}
							onMouseUp={vertexMouseUp}
							onMouseEnter={vertexEntered}
						/>
					);
				}
			}
		}

		return grid;
	};

	//#endregion

	try {
		let boundaries = TacticalMapLogic.getMapBoundaries(map);
		if (!boundaries) {
			if (props.display === TacticalMapDisplayType.DirectorEdit) {
				boundaries = {
					minX: 0,
					minY: 0,
					minZ: 1,
					maxX: 15,
					maxY: 15,
					maxZ: 1
				};
			} else {
				return (
					<Empty text='Empty map' />
				);
			}
		}

		if (boundaries) {
			// Apply a border
			const paddingSquares = 1;
			boundaries.minX -= paddingSquares;
			boundaries.minY -= paddingSquares;
			boundaries.maxX += paddingSquares;
			boundaries.maxY += paddingSquares;
		}

		const widthInSquares = 1 + boundaries.maxX - boundaries.minX;
		const heightInSquares = 1 + boundaries.maxY - boundaries.minY;
		const widthInPixels = (size * widthInSquares);
		const heightInPixels = (size * heightInSquares);

		return (
			<ErrorBoundary>
				{getTopToolbar()}
				<div
					id={map.id}
					className={'tactical-map-panel ' + props.display}
					style={{ width: widthInPixels + 'px', height: heightInPixels + 'px' }}
				>
					<div className='grid' onClick={() => setSelectedMapItemID(null)}>
						{getTiles(boundaries)}
						{getWalls(boundaries)}
						{getZones(boundaries)}
						{getMinis(boundaries)}
						{getFog(boundaries)}
						{getGrid(boundaries)}
						{getWallVertices(boundaries)}
					</div>
				</div>
				{getBottomToolbar()}
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
