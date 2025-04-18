import { BarsOutlined, CloseOutlined, DownloadOutlined, DragOutlined, FileTextOutlined, IdcardOutlined, LinkOutlined, RotateRightOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Divider, Drawer, Input, Popover, Segmented, Select, Space, Upload } from 'antd';
import { HeroToken, MonsterToken } from '../../../controls/token/token';
import { MapBoundaries, MapItem, MapMini, MapPosition, MapTile, MapWall, MapZone, TacticalMap } from '../../../../models/tactical-map';
import { ReactNode, useState } from 'react';
import { Collections } from '../../../../utils/collections';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Empty } from '../../../controls/empty/empty';
import { Encounter } from '../../../../models/encounter';
import { ErrorBoundary } from '../../../controls/error-boundary/error-boundary';
import { FactoryLogic } from '../../../../logic/factory-logic';
import { Field } from '../../../controls/field/field';
import { GridSquarePanel } from './grid-square/grid-square';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroLogic } from '../../../../logic/hero-logic';
import { HeroStateModal } from '../../../modals/hero-state/hero-state-modal';
import { HeroStatePage } from '../../../../enums/hero-state-page';
import { MapMiniPanel } from './map-mini/map-mini';
import { MapTilePanel } from './map-tile/map-tile';
import { MapWallPanel } from './map-wall/map-wall';
import { MapWallVertexPanel } from './map-wall-vertex/map-wall-vertex';
import { MapZonePanel } from './map-zone/map-zone';
import { Monster } from '../../../../models/monster';
import { MonsterModal } from '../../../modals/monster/monster-modal';
import { MonsterOrganizationType } from '../../../../enums/monster-organization-type';
import { MultiLine } from '../../../controls/multi-line/multi-line';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Radial } from '../../../controls/radial/radial';
import { Sourcebook } from '../../../../models/sourcebook';
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
	heroes?: Hero[];
	encounters?: Encounter[];
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	updateMap?: (map: TacticalMap) => void;
	updateHero?: (hero: Hero) => void;
	updateEncounter?: (encounter: Encounter) => void;
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
	const [ miniSource, setMiniSource ] = useState<string | null>(() => {
		if (props.encounters && props.encounters.length > 0) {
			return props.encounters[0].id;
		}

		if (props.heroes && props.heroes.length > 0) {
			return props.heroes[0].folder;
		}

		return null;
	});
	const [ selectedMini, setSelectedMini ] = useState<{ type: 'hero' | 'monster', encounterID: string, id: string } | null>(null);
	const [ selectedHero, setSelectedHero ] = useState<Hero | null>(null);
	const [ selectedMonster, setSelectedMonster ] = useState<Monster | null>(null);

	const zLevel = 0;
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

	//#region Grid squares

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
			tile.position = { x: minX, y: minY, z: zLevel };
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
			zone.position = { x: minX, y: minY, z: zLevel };
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

			const mini = FactoryLogic.createMapMini();
			mini.position = { x: minX, y: minY, z: zLevel };

			if (selectedMini) {
				mini.content = selectedMini;
				setSelectedMini(null);

				let size = FactoryLogic.createSize(1, 'M');
				const content = getMiniContent(mini);
				if (content) {
					if (mini.content!.type === 'hero') {
						size = HeroLogic.getSize(content as Hero);
					} else {
						size = (content as Monster).size;
					}
				}
				mini.dimensions = { width: size.value, height: size.value, depth: 1 };
			} else {
				const width = maxX - minX + 1;
				const height = maxY - minY + 1;
				const size = Math.min(width, height);
				mini.dimensions = { width: size, height: size, depth: 1 };
			}

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
					const current = copy.items
						.filter(i => i.type === 'fog')
						.find(i => (i.position.x === x) && (i.position.y === y) && (i.position.z === zLevel));
					if (current) {
						// Remove this fog
						copy.items = copy.items.filter(i => i.id !== current.id);
					} else {
						// Add fog here
						const fog = FactoryLogic.createMapFog();
						fog.position.x = x;
						fog.position.y = y;
						fog.position.z = zLevel;
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

	//#endregion

	//#region Vertices

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
			wall.pointA = { x: minX, y: minY, z: zLevel };
			wall.pointB = { x: maxX, y: maxY, z: zLevel };

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

	//#endregion

	const getMiniContent = (mini: MapMini): Hero | Monster | null => {
		if (mini.content) {
			if (props.encounters) {
				const enc = props.encounters.find(e => e.id === mini.content!.encounterID);
				if (enc) {
					const hero = enc.heroes.find(h => h.id === mini.content!.id);
					if (hero) {
						return hero;
					}
					const monster = enc.groups.flatMap(g => g.slots).flatMap(s => s.monsters).find(m => m.id === mini.content!.id);
					if (monster) {
						return monster;
					}
				}
			}

			if (props.heroes) {
				const hero = props.heroes.find(h => h.id === mini.content!.id);
				if (hero) {
					return hero;
				}
			}
		}

		return null;
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

		const changeEditMode = (mode: TacticalMapEditMode) => {
			setEditMode(mode);
			setSelectedMapItemID(null);
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
						const fog = FactoryLogic.createMapFog();
						fog.position.x = x;
						fog.position.y = y;
						fog.position.z = zLevel;
						copy.items.push(fog);
					}
				}
			}

			setMap(copy);
			if (props.updateMap) {
				props.updateMap(copy);
			}
		};

		const editModes = [
			{ value: TacticalMapEditMode.Map, label: 'Map' },
			{ value: TacticalMapEditMode.Tiles, label: 'Tiles' },
			{ value: TacticalMapEditMode.Walls, label: 'Walls' },
			{ value: TacticalMapEditMode.Zones, label: 'Overlays' }
		];
		if (props.heroes || props.encounters) {
			editModes.push({ value: TacticalMapEditMode.Minis, label: 'Minis' });
			editModes.push({ value: TacticalMapEditMode.Fog, label: 'Fog' });
		}

		return (
			<div className='tactical-map-toolbar top-toolbar'>
				<Segmented
					name='edit'
					options={editModes}
					value={editMode}
					onChange={changeEditMode}
				/>
				<Divider type='vertical' />
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
						<DangerButton disabled={map.items.filter(i => i.type === 'zone').length === 0} label='Clear Overlays' onConfirm={clearZones} />
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

		if (editMode === TacticalMapEditMode.Map) {
			const setName = (value: string) => {
				const copy = Utils.copy(map) as TacticalMap;
				copy.name = value;
				setMap(copy);
				if (props.updateMap) {
					props.updateMap(copy);
				}
			};

			return (
				<div className='tactical-map-toolbar bottom-toolbar'>
					<Input
						style={{ width: '200px' }}
						placeholder='Name'
						allowClear={true}
						value={map.name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
			);
		}

		const item = map.items.find(i => i.id === selectedMapItemID);
		if (item) {
			const move = (dx: number, dy: number) => {
				const copy = Utils.copy(item) as MapTile | MapZone | MapMini;
				copy.position.x += dx;
				copy.position.y += dy;
				updateMapItem(copy);
			};

			const moveWall = (dx: number, dy: number) => {
				const copy = Utils.copy(item) as MapWall;
				copy.pointA.x += dx;
				copy.pointB.x += dx;
				copy.pointA.y += dy;
				copy.pointB.y += dy;
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

			const setContentType = (value: 'color' | 'image' | 'video' | 'link') => {
				const copy = Utils.copy(item) as MapTile;
				switch (value) {
					case 'color':
						copy.content = { type: 'color', color: 'C8C8C8FF' };
						break;
					case 'image':
						copy.content = { type: 'image', imageData: '' };
						break;
					case 'video':
						copy.content = { type: 'video', videoData: '' };
						break;
					case 'link':
						copy.content = { type: 'link', url: '', isVideo: false };
						break;
				}
				updateMapItem(copy);
			};

			const setContentColor = (value: string) => {
				const copy = Utils.copy(item) as MapTile;
				if (copy.content.type === 'color') {
					copy.content.color = value;
				}
				updateMapItem(copy);
			};

			const setContentImageData = (value: string) => {
				const copy = Utils.copy(item) as MapTile;
				if (copy.content.type === 'image') {
					copy.content.imageData = value;
				}
				updateMapItem(copy);
			};

			const setContentVideoData = (value: string) => {
				const copy = Utils.copy(item) as MapTile;
				if (copy.content.type === 'video') {
					copy.content.videoData = value;
				}
				updateMapItem(copy);
			};

			const setContentUrl = (value: string) => {
				const copy = Utils.copy(item) as MapTile;
				if (copy.content.type === 'link') {
					copy.content.url = value;
				}
				updateMapItem(copy);
			};

			const setContentIsVideo = (value: boolean) => {
				const copy = Utils.copy(item) as MapTile;
				if (copy.content.type === 'link') {
					copy.content.isVideo = value;
				}
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

			const showMiniInfo = () => {
				const mini = item as MapMini;
				const content = getMiniContent(mini);
				if (mini.content && mini.content.type === 'hero') {
					setSelectedHero(content as Hero);
				}
				if (mini.content && mini.content.type === 'monster') {
					setSelectedMonster(content as Monster);
				}
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
								<Popover content={<Radial onChange={move} />}>
									<Button>
										<DragOutlined />
									</Button>
								</Popover>
								<NumberSpin min={1} value={item.dimensions.width} onChange={setWidth}>
									<Field label='Width' value={item.dimensions.width} />
								</NumberSpin>
								<NumberSpin min={1} value={item.dimensions.height} onChange={setHeight}>
									<Field label='Height' value={item.dimensions.height} />
								</NumberSpin>
								<Select
									options={[
										{ value: 'square', label: 'Square' },
										{ value: 'rounded', label: 'Rounded' },
										{ value: 'circle', label: 'Circle' }
									]}
									optionRender={option => <div className='ds-text'>{option.data.label}</div>}
									value={item.corners}
									onChange={setCorners}
								/>
								<Select
									options={[
										{ value: 'color', label: 'Color' },
										{ value: 'image', label: 'Image' },
										{ value: 'video', label: 'Animated' },
										{ value: 'link', label: 'Link' }
									]}
									optionRender={option => <div className='ds-text'>{option.data.label}</div>}
									value={item.content.type}
									onChange={setContentType}
								/>
								{
									item.content.type === 'color' ?
										<ColorPicker
											format='hex'
											value={item.content.color}
											onChange={c => setContentColor(c.toHex())}
										/>
										: null
								}
								{
									item.content.type === 'image' ?
										<Upload
											style={{ width: '100%' }}
											accept='.png,.webp,.gif.jpg,.jpeg,.svg'
											showUploadList={false}
											beforeUpload={file => {
												const reader = new FileReader();
												reader.onload = progress => {
													if (progress.target) {
														const content = progress.target.result as string;
														setContentImageData(content);
													}
												};
												reader.readAsDataURL(file);
												return false;
											}}
										>
											<Button>
												<DownloadOutlined />
											</Button>
										</Upload>
										: null
								}
								{
									item.content.type === 'video' ?
										<Upload
											style={{ width: '100%' }}
											accept='.mp4,webm'
											showUploadList={false}
											beforeUpload={file => {
												const reader = new FileReader();
												reader.onload = progress => {
													if (progress.target) {
														const content = progress.target.result as string;
														setContentVideoData(content);
													}
												};
												reader.readAsDataURL(file);
												return false;
											}}
										>
											<Button>
												<DownloadOutlined />
											</Button>
										</Upload>
										: null
								}
								{
									item.content.type === 'link' ?
										<Popover
											content={
												<Space direction='vertical' style={{ width: '100%' }}>
													<Input
														placeholder={item.content.isVideo ? 'URL of video' : 'URL of image'}
														allowClear={true}
														value={item.content.url}
														onChange={e => setContentUrl(e.target.value)}
													/>
													<Segmented
														block={true}
														options={[
															{ value: false, label: 'Image' },
															{ value: true, label: 'Video' }
														]}
														value={item.content.isVideo}
														onChange={setContentIsVideo}
													/>
												</Space>
											}
										>
											<Button>
												<LinkOutlined />
											</Button>
										</Popover>
										: null
								}
							</>
							: null
					}
					{
						item.type === 'wall' ?
							<>
								<Popover content={<Radial onChange={moveWall} />}>
									<Button>
										<DragOutlined />
									</Button>
								</Popover>
								{
									TacticalMapLogic.getWallOrientation(item) === 'vertical' ?
										<NumberSpin min={item.pointA.y + 1} value={item.pointB.y} onChange={setEndY}>
											<Field label='Length' value={item.pointB.y - item.pointA.y} />
										</NumberSpin>
										:
										<NumberSpin min={item.pointA.x + 1} value={item.pointB.x} onChange={setEndX}>
											<Field label='Length' value={item.pointB.x - item.pointA.x} />
										</NumberSpin>
								}
								<Popover
									content={
										<>
											<Toggle
												style={{ display: 'none' }}
												label='Blocks movement'
												value={item.blocksMovement}
												onChange={setBlocksMovement}
											/>
											<Toggle
												style={{ display: 'none' }}
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
												disabled={!item.isOpenable}
												label='Concealed'
												value={item.isConcealed}
												onChange={setIsConcealed}
											/>
										</>
									}
								>
									<Button>
										<BarsOutlined />
									</Button>
								</Popover>
							</>
							: null
					}
					{
						item.type === 'zone' ?
							<>
								<Popover content={<Radial onChange={move} />}>
									<Button>
										<DragOutlined />
									</Button>
								</Popover>
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
								<Popover content={<Radial onChange={move} />}>
									<Button>
										<DragOutlined />
									</Button>
								</Popover>
								<NumberSpin min={1} value={item.dimensions.width} onChange={setSize}>
									<Field label='Size' value={item.dimensions.width} />
								</NumberSpin>
								<Button onClick={showMiniInfo}>
									<IdcardOutlined />
 								</Button>
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
						<Button>
							<FileTextOutlined />
						</Button>
					</Popover>
					<DangerButton mode='icon' onConfirm={() => deleteMapItem(item)} />
				</div>
			);
		}

		if ((editMode === TacticalMapEditMode.Minis) && editAdding) {
			if (selectedMini) {
				return (
					<div className='tactical-map-toolbar bottom-toolbar'>
						<Button onClick={() => setSelectedMini(null)}>
							<CloseOutlined />
						</Button>
						<div>
							Select a square to place this mini
						</div>
					</div>
				);
			}

			const sources: { value: string, label: string }[] = [];
			if (props.heroes) {
				props.heroes.forEach(h => sources.push({ value: h.folder, label: h.folder || 'Heroes' }));
			}
			if (props.encounters) {
				props.encounters.forEach(enc => sources.push({ value: enc.id, label: enc.name || 'Unnamed Encounter' }));
			}
			const distinctSources = Collections.distinct(sources, s => s.value);

			const onMap = map.items
				.filter(i => i.type === 'mini')
				.map(mini => mini.content)
				.filter(c => !!c)
				.map(c => c.id);

			const heroes: Hero[] = [];
			const encounterHeroes: { hero: Hero, encounter: Encounter }[] = [];
			const encounterMonsters: { monster: Monster, encounter: Encounter }[] = [];

			if (props.heroes) {
				props.heroes
					.filter(h => h.folder === miniSource)
					.filter(h => !onMap.includes(h.id))
					.forEach(h => heroes.push(h));
			}
			if (props.encounters) {
				props.encounters
					.filter(enc => enc.id === miniSource)
					.forEach(enc => {
						enc.heroes
							.filter(h => !onMap.includes(h.id))
							.forEach(h => encounterHeroes.push({ hero: h, encounter: enc }));
						enc.groups.forEach(g => {
							g.slots.forEach(s => {
								s.monsters
									.filter(m => !onMap.includes(m.id))
									.forEach(m => encounterMonsters.push({ monster: m, encounter: enc }));
							});
						});
					});
			}

			const scatterMinis = () => {
				const copy = Utils.copy(map);

				const tokens: { type: 'hero' | 'monster', encounterID: string, id: string, size: number }[] = [];
				heroes.forEach(h => tokens.push({ type: 'hero', encounterID: '', id: h.id, size: HeroLogic.getSize(h).value }));
				encounterHeroes.forEach(h => tokens.push({ type: 'hero', encounterID: h.encounter.id, id: h.hero.id, size: HeroLogic.getSize(h.hero).value }));
				encounterMonsters.forEach(m => tokens.push({ type: 'monster', encounterID: m.encounter.id, id: m.monster.id, size: m.monster.size.value }));
				TacticalMapLogic.scatterCombatants(copy, tokens);

				setMap(copy);
				if (props.updateMap) {
					props.updateMap(copy);
				}
			};

			const tokens = [
				...heroes.map(h => (
					<HeroToken
						key={h.id}
						hero={h}
						size={30}
						onClick={() => setSelectedMini({ type: 'hero', encounterID: '', id: h.id })}
					/>
				)),
				...encounterHeroes.map(h => (
					<HeroToken
						key={h.hero.id}
						hero={h.hero}
						size={30}
						onClick={() => setSelectedMini({ type: 'hero', encounterID: h.encounter.id, id: h.hero.id })}
					/>
				)),
				...encounterMonsters.map(m => (
					<MonsterToken
						key={m.monster.id}
						monster={m.monster}
						size={30}
						onClick={() => setSelectedMini({ type: 'monster', encounterID: m.encounter.id, id: m.monster.id })}
					/>
				))
			];

			return (
				<div className='tactical-map-toolbar bottom-toolbar'>
					<Select
						style={{ width: '200px' }}
						options={distinctSources}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						dropdownRender={menu => (
							<>
								<HeaderText>Pick minis from:</HeaderText>
								{menu}
							</>
						)}
						value={miniSource}
						onChange={setMiniSource}
					/>
					<Divider type='vertical' />
					{
						tokens.length > 0 ?
							<>
								{tokens}
								<Divider type='vertical' />
								<Button onClick={scatterMinis}>Scatter</Button>
							</>
							:
							<div className='ds-text'>No minis to add</div>
					}
				</div>
			);
		}

		let message: string | null = null;
		switch (editMode) {
			case TacticalMapEditMode.Tiles:
				message = editAdding ? 'Click on a square and drag to create a tile.' : 'Click on a tile to select it.';
				break;
			case TacticalMapEditMode.Walls:
				message = editAdding ? 'Click on a corner and drag to create a wall.' : 'Click on a wall to select it.';
				break;
			case TacticalMapEditMode.Zones:
				message = editAdding ? 'Click on a square and drag to create an overlay.' : 'Click on an overlay to select it.';
				break;
			case TacticalMapEditMode.Minis:
				message = editAdding ? 'Click on a square to create a mini token.' : 'Double-click on a hero or monster mini to edit it.';
				break;
			case TacticalMapEditMode.Fog:
				message = 'Click on a square and drag to create a zone of fog.';
				break;
		}

		if (message) {
			return (
				<div className='tactical-map-toolbar bottom-toolbar'>
					<div className='ds-text' style={{ padding: '0 10px' }}>{message}</div>
				</div>
			);
		}

		return null;
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
				/>
			));
	};

	const getMinis = (boundaries: MapBoundaries) => {
		return map.items
			.filter(i => i.type === 'mini')
			.filter(mini => {
				if (props.display === TacticalMapDisplayType.Player) {
					// Don't show hidden minis
					const content = getMiniContent(mini);
					if (content) {
						return !content.state.hidden;
					}
				}

				return true;
			})
			.map(mini => {
				const content = getMiniContent(mini);
				return (
					<MapMiniPanel
						key={content ? JSON.stringify(content) : JSON.stringify(mini)}
						mini={mini}
						content={content}
						display={props.display}
						selectable={(editMode === TacticalMapEditMode.Minis) && !editAdding}
						selected={selectedMapItemID === mini.id}
						style={getMapItemStyle(mini.position.x, mini.position.y, mini.dimensions.width, mini.dimensions.height, 'circle', boundaries)}
						selectMini={mini => setSelectedMapItemID(mini.id)}
						selectHero={setSelectedHero}
						selectMonster={setSelectedMonster}
						updateMini={updateMapItem}
					/>
				);
			});
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
					grid.push(
						<GridSquarePanel
							key={'grid ' + x + ',' + y + ',' + zLevel}
							position={{ x: x, y: y, z: zLevel }}
							display={props.display}
							style={getMapItemStyle(x, y, 1, 1, 'square', boundaries)}
							render='cell'
							selected={isGridSquareSelected({ x: x, y: y, z: zLevel })}
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
					grid.push(
						<MapWallVertexPanel
							key={'vertex ' + x + ',' + y + ',' + zLevel}
							position={{ x: x, y: y, z: zLevel }}
							display={props.display}
							style={getMapItemStyle(x, y, 1, 1, 'vertex', boundaries)}
							selected={isVertexSelected({ x: x, y: y, z: zLevel })}
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

		if (boundaries && (props.display === TacticalMapDisplayType.DirectorEdit) && (editMode === TacticalMapEditMode.Tiles) && editAdding) {
			// Apply a border
			const paddingSquares = 5;
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
				<Drawer open={!!selectedMonster} onClose={() => setSelectedMonster(null)} closeIcon={null} width='500px'>
					{
						selectedMonster ?
							<MonsterModal
								monster={selectedMonster}
								options={props.options}
								onClose={() => setSelectedMonster(null)}
								updateMonster={monster => {
									const mini = map.items.filter(item => item.type === 'mini').find(mini => mini.id === selectedMapItemID);
									if (mini && mini.content) {
										const encounter = props.encounters ? props.encounters.find(e => e.id === mini.content!.encounterID) : undefined;
										if (encounter) {
											const copy = Utils.copy(encounter as Encounter);
											copy.groups.forEach(g => {
												g.slots.forEach(s => {
													const index = s.monsters.findIndex(m => m.id === monster.id);
													if (index !== -1) {
														s.monsters[index] = monster;
													}
												});
											});

											// Make sure no minion groups have a dead captain
											const captainIDs = copy.groups
												.flatMap(g => g.slots)
												.flatMap(s => s.monsters)
												.filter(m => m.role.organization !== MonsterOrganizationType.Minion)
												.filter(m => !m.state.defeated)
												.map(m => m.id);
											copy.groups.forEach(g => {
												g.slots.forEach(s => {
													if (s.state.captainID && !captainIDs.includes(s.state.captainID)) {
														s.state.captainID = undefined;
													}
												});
											});

											if (props.updateEncounter) {
												props.updateEncounter(copy);
											}
										}
									}
								}}
							/>
							: null
					}
				</Drawer>
				<Drawer open={!!selectedHero} onClose={() => setSelectedHero(null)} closeIcon={null} width='500px'>
					{
						selectedHero ?
							<HeroStateModal
								hero={selectedHero}
								sourcebooks={props.sourcebooks || []}
								options={props.options}
								startPage={HeroStatePage.Vitals}
								showEncounterControls={true}
								onClose={() => setSelectedHero(null)}
								onChange={hero => {
									const mini = map.items.filter(item => item.type === 'mini').find(mini => mini.id === selectedMapItemID);
									if (mini && mini.content) {
										const encounter = props.encounters ? props.encounters.find(e => e.id === mini.content!.encounterID) : undefined;
										if (encounter) {
											const copy = Utils.copy(encounter);
											const index = copy.heroes.findIndex(h => h.id === hero.id);
											if (index !== -1) {
												copy.heroes[index] = hero;
											}

											if (props.updateEncounter) {
												props.updateEncounter(copy);
											}
										} else {
											if (props.updateHero) {
												props.updateHero(hero);
											}
										}
									}
								}}
							/>
							: null
					}
				</Drawer>
			</ErrorBoundary>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
