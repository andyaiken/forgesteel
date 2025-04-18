import { Element } from './element';

export interface TacticalMap extends Element {
	items: MapItem[];
}

export interface MapBoundaries {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	minZ: number;
	maxZ: number;
}

export interface MapPosition {
	x: number;
	y: number;
	z: number;
}

export interface MapDimensions {
	width: number;
	height: number;
	depth: number;
}

export type MapItem = MapTile | MapWall | MapZone | MapMini | MapFog;

export interface MapTile {
	id: string;
	type: 'tile';
	notes: string;
	position: MapPosition;
	dimensions: MapDimensions;
	corners: 'square' | 'rounded' | 'circle';
	content:
		{ type: 'color', color: string } |
		{ type: 'image', imageData: string } |
		{ type: 'video', videoData: string } |
		{ type: 'link', url: string, isVideo: boolean };
}

export interface MapWall {
	id: string;
	type: 'wall';
	notes: string;
	pointA: MapPosition;
	pointB: MapPosition;
	blocksLineOfSight: boolean;
	blocksMovement: boolean;
	isOpenable: boolean;
	isConcealed: boolean;
}

export interface MapZone {
	id: string;
	type: 'zone';
	notes: string;
	position: MapPosition;
	dimensions: MapDimensions;
	corners: 'square' | 'rounded' | 'circle';
	color: string;
}

export interface MapMini {
	id: string;
	type: 'mini';
	notes: string;
	position: MapPosition;
	dimensions: MapDimensions;
	content: {
		type: 'hero' | 'monster';
		encounterID: string;
		id: string;
	} | null;
}

export interface MapFog {
	id: string;
	type: 'fog';
	position: MapPosition;
}
