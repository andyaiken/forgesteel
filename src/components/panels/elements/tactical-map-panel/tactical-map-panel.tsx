import { Button, Divider, Input, Segmented } from 'antd';
import { MapBoundaries, MapItem, MapPosition, TacticalMap } from '../../../../models/tactical-map';
import { ReactNode, useState } from 'react';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { GridSquarePanel } from './grid-square/grid-square';
import { MapTilePanel } from './map-tile/map-tile';
import { MapWallPanel } from './map-wall/map-wall';
import { MapWallVertexPanel } from './map-wall-vertex/map-wall-vertex';
import { MapZonePanel } from './map-zone/map-zone';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { RotateRightOutlined } from '@ant-design/icons';
import { TacticalMapDisplayType } from '../../../../enums/tactical-map-display-type';
import { TacticalMapLogic } from '../../../../logic/tactical-map-logic';
import { Utils } from '../../../../utils/utils';

import './tactical-map-panel.scss';

enum TacticalMapEditMode {
	Map,
	Tiles,
	Walls,
	Zones
}

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

	const size = props.display === 'thumbnail' ? 5 : props.options.gridSize;

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

	const addTile = (points: MapPosition[]) => {
		const minX = Math.min(...points.map(pt => pt.x));
		const minY = Math.min(...points.map(pt => pt.y));
		const maxX = Math.max(...points.map(pt => pt.x));
		const maxY = Math.max(...points.map(pt => pt.y));

		const tile = FactoryLogic.createMapTile();
		tile.position = { x: minX, y: minY, z: 0 };
		tile.dimensions = { width: maxX - minX + 1, height: maxY - minY + 1, depth: 0 };

		const copy = Utils.copy(map) as TacticalMap;
		copy.items.push(tile);
		setMap(copy);
		if (props.updateMap) {
			props.updateMap(copy);
		}
	};

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

	const addZone = (points: MapPosition[]) => {
		const minX = Math.min(...points.map(pt => pt.x));
		const minY = Math.min(...points.map(pt => pt.y));
		const maxX = Math.max(...points.map(pt => pt.x));
		const maxY = Math.max(...points.map(pt => pt.y));

		const zone = FactoryLogic.createMapZone();
		zone.position = { x: minX, y: minY, z: 0 };
		zone.dimensions = { width: maxX - minX + 1, height: maxY - minY + 1, depth: 0 };

		const copy = Utils.copy(map) as TacticalMap;
		copy.items.push(zone);
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

	const addSurroundingWalls = () => {
		const copy = Utils.copy(map) as TacticalMap;
		TacticalMapLogic.addWalls(copy, true, false);
		setMap(copy);
		if (props.updateMap) {
			props.updateMap(copy);
		}
	};

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
		if (selectionStartSquare) {
			if ((editMode === TacticalMapEditMode.Tiles) && editAdding) {
				addTile([ selectionStartSquare, pos ]);
			}
			if ((editMode === TacticalMapEditMode.Zones) && editAdding) {
				addZone([ selectionStartSquare, pos ]);
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

	const getToolbar = () => {
		if (props.display !== TacticalMapDisplayType.DirectorEdit) {
			return null;
		}

		return (
			<div className='tactical-map-toolbar'>
				<Segmented
					name='edit'
					options={[
						{ value: TacticalMapEditMode.Map, label: 'Map' },
						{ value: TacticalMapEditMode.Tiles, label: 'Tiles' },
						{ value: TacticalMapEditMode.Walls, label: 'Walls' },
						{ value: TacticalMapEditMode.Zones, label: 'Zones' }
					]}
					value={editMode}
					onChange={setEditMode}
				/>
				<Divider type='vertical' />
				{
					editMode === TacticalMapEditMode.Map ?
						<Input
							style={{ width: '250px' }}
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
					editMode !== TacticalMapEditMode.Map ?
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
					editMode !== TacticalMapEditMode.Map ?
						<Divider type='vertical' />
						: null
				}
				{
					editMode === TacticalMapEditMode.Walls ?
						<Button onClick={addSurroundingWalls}>Add Surrounding Walls</Button>
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
					style={getMapItemStyle(tile.position.x, tile.position.y, tile.dimensions.width, tile.dimensions.height, tile.corners, boundaries)}
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
						style={getMapItemStyle(x, y, width, height, 'wall', boundaries)}
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
					style={getMapItemStyle(zone.position.x, zone.position.y, zone.dimensions.width, zone.dimensions.height, zone.corners, boundaries)}
					updateZone={updateMapItem}
					deleteZone={deleteMapItem}
				/>
			));
	};

	const getGrid = (boundaries: MapBoundaries) => {
		const grid: ReactNode[] = [];

		const squareModes = [ TacticalMapEditMode.Tiles, TacticalMapEditMode.Zones ];
		if (squareModes.includes(editMode) && editAdding) {
			for (let x = boundaries.minX; x !== boundaries.maxX + 1; ++x) {
				for (let y = boundaries.minY; y !== boundaries.maxY + 1; ++y) {
					for (let z = boundaries.minZ; z !== boundaries.maxZ + 1; ++z) {
						grid.push(
							<GridSquarePanel
								key={'grid ' + x + ',' + y + ',' + z}
								position={{ x: x, y: y, z: z }}
								display={props.display}
								style={getMapItemStyle(x, y, 1, 1, 'square', boundaries)}
								selected={isGridSquareSelected({ x: x, y: y, z: z })}
								onMouseDown={gridSquareMouseDown}
								onMouseUp={gridSquareMouseUp}
								onMouseEnter={gridSquareEntered}
							/>
						);
					}
				}
			}
		}

		return grid;
	};

	const getWallVertices = (boundaries: MapBoundaries) => {
		const grid: ReactNode[] = [];

		const vertexModes = [ TacticalMapEditMode.Walls ];
		if (vertexModes.includes(editMode) && editAdding) {
			for (let x = boundaries.minX + 1; x !== boundaries.maxX + 1; ++x) {
				for (let y = boundaries.minY + 1; y !== boundaries.maxY + 1; ++y) {
					for (let z = boundaries.minZ + 1; z !== boundaries.maxZ + 1; ++z) {
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
					minZ: 0,
					maxX: 15,
					maxY: 15,
					maxZ: 0
				};
			} else {
				return (
					<Empty text='Empty map' />
				);
			}
		}

		const widthInSquares = 1 + boundaries.maxX - boundaries.minX;
		const heightInSquares = 1 + boundaries.maxY - boundaries.minY;
		const widthInPixels = (size * widthInSquares);
		const heightInPixels = (size * heightInSquares);

		return (
			<>
				{getToolbar()}
				<div
					id={map.id}
					className={'tactical-map-panel ' + props.display}
					style={{ width: widthInPixels + 'px', height: heightInPixels + 'px' }}
				>
					<div className='grid'>
						{getTiles(boundaries)}
						{getWalls(boundaries)}
						{getZones(boundaries)}
						{getGrid(boundaries)}
						{getWallVertices(boundaries)}
					</div>
				</div>
			</>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
