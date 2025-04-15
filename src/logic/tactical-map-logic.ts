import { MapBoundaries, MapItem, MapPosition, MapTile, MapWall, TacticalMap } from '../models/tactical-map';
import { Collections } from '../utils/collections';
import { FactoryLogic } from './factory-logic';
import { Random } from '../utils/random';

export class TacticalMapLogic {
	static getMapSize = (map: TacticalMap) => {
		const tiles = map.items.filter(item => item.type === 'tile');
		return Collections.sum(tiles, tile => tile.dimensions.width * tile.dimensions.height);
	};

	static getMapBoundaries = (map: TacticalMap): MapBoundaries | null => {
		const points = map.items.flatMap(i => {
			switch (i.type) {
				case 'tile':
				case 'zone':
				case 'mini':
					return [
						i.position,
						{
							x: i.position.x + i.dimensions.width - 1,
							y: i.position.y + i.dimensions.height - 1,
							z: i.position.z + i.dimensions.depth - 1
						}
					];
				case 'wall':
					return [
						i.pointA,
						i.pointB
					];
				case 'fog':
					return [ i.position ];
			}
		});

		const boundaries = points.length > 0 ? {
			minX: Math.min(...points.map(pt => pt.x)),
			minY: Math.min(...points.map(pt => pt.y)),
			minZ: Math.min(...points.map(pt => pt.z)),
			maxX: Math.max(...points.map(pt => pt.x)),
			maxY: Math.max(...points.map(pt => pt.y)),
			maxZ: Math.max(...points.map(pt => pt.z))
		} : null;

		return boundaries;
	};

	static canAddTileHere(map: TacticalMap, x: number, y: number, width: number, height: number, minGapX: number, minGapY: number) {
		const coveredSquares: boolean[] = [];

		const left = x - minGapX;
		const top = y - minGapY;
		const right = x + (width - 1) + minGapX;
		const bottom = y + (height - 1) + minGapY;
		for (let x1 = left; x1 <= right; ++x1) {
			for (let y1 = top; y1 <= bottom; ++y1) {
				// Is this square free of tiles?
				const occupants = this.itemsAt(map as TacticalMap, x1, y1);
				const canOccupy = occupants.every(item => item.type !== 'tile');
				coveredSquares.push(canOccupy);
			}
		}

		return coveredSquares.every(square => square);
	}

	static canAddMonsterHere(map: TacticalMap, x: number, y: number, size: number) {
		const coveredSquares: boolean[] = [];

		const right = x + Math.max(1, size) - 1;
		const bottom = y + Math.max(1, size) - 1;
		for (let x1 = x; x1 <= right; ++x1) {
			for (let y1 = y; y1 <= bottom; ++y1) {
				// Is this square on an empty tile?
				const occupants = this.itemsAt(map, x1, y1);
				const canOccupy = (occupants.length > 0) && occupants.every(item => item.type === 'tile');
				coveredSquares.push(canOccupy);
			}
		}

		return coveredSquares.every(square => square);
	}

	static scatterCombatants(map: TacticalMap, tokens: { type: 'hero' | 'monster', encounterID: string, id: string, size: number }[]) {
		const dimensions = this.getMapBoundaries(map);
		if (dimensions) {
			tokens.forEach(token => {
				// Find all squares that we could add this token to
				const candidateSquares: {x: number, y: number}[] = [];
				for (let x = dimensions.minX; x <= dimensions.maxX; ++x) {
					for (let y = dimensions.minY; y <= dimensions.maxY; ++y) {
						const canAddHere = this.canAddMonsterHere(map, x, y, token.size);
						if (canAddHere) {
							candidateSquares.push({ x: x, y: y });
						}
					}
				}

				if (candidateSquares.length > 0) {
					const square = Collections.draw(candidateSquares);

					const mini = FactoryLogic.createMapMini();
					mini.position = { x: square.x, y: square.y, z: 0 };
					mini.dimensions = { width: token.size, height: token.size, depth: 1 };
					mini.content = { type: token.type, encounterID: token.encounterID, id: token.id };

					map.items.push(mini);
				}
			});
		}
	}

	/*
	static canSee(
		walls: { horizontal: { start: number, end: number, y: number }[], vertical: { start: number, end: number, x: number }[] },
		a: { x: number, y: number },
		b: { x: number, y: number }
	): boolean {
		const intersects = (light: { a: { x: number, y: number }, b: { x: number, y: number } }, wall: { a: { x: number, y: number }, b: { x: number, y: number } }) => {
			const det = (light.b.x - light.a.x) * (wall.b.y - wall.a.y) - (wall.b.x - wall.a.x) * (light.b.y - light.a.y);
			if (det === 0) {
				return false;
			} else {
				const lambda = ((wall.b.y - wall.a.y) * (wall.b.x - light.a.x) + (wall.a.x - wall.b.x) * (wall.b.y - light.a.y)) / det;
				const gamma = ((light.a.y - light.b.y) * (wall.b.x - light.a.x) + (light.b.x - light.a.x) * (wall.b.y - light.a.y)) / det;
				return (0 <= lambda && lambda <= 1) && (0 <= gamma && gamma <= 1);
			}
		};

		return !(walls.horizontal.some(wall => intersects({ a: a, b: b }, { a: { x: wall.start, y: wall.y }, b: { x: wall.end, y: wall.y } }))
			|| walls.vertical.some(wall => intersects({ a: a, b: b }, { a: { x: wall.x, y: wall.start }, b: { x: wall.x, y: wall.end } })));
	}

	static calculateDistance(item: { x: number, y: number, z: number, width: number, height: number, depth: number}, x: number, y: number, z: number) {
		let dx = 0;
		if ((item.x) > x) {
			dx = item.x - x;
		}
		if ((item.x + Math.max(item.width, 1) - 1) < x) {
			dx = x - (item.x + Math.max(item.width, 1) - 1);
		}

		let dy = 0;
		if (item.y > y) {
			dy = item.y - y;
		}
		if ((item.y + Math.max(item.height, 1) - 1) < y) {
			dy = y - (item.y + Math.max(item.height, 1) - 1);
		}

		let dz = 0;
		if (item.z > z) {
			dz = item.z - z;
		}
		if ((item.z + Math.max(item.depth, 1) - 1) < z) {
			dz = z - (item.z + Math.max(item.depth, 1) - 1);
		}

		return Math.ceil(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2))) * 5;
	}

	static getWalls(map: TacticalMap, filter: (wall: MapWall) => boolean) {
		const horizontalWalls: { start: number, end: number, y: number }[] = [];
		map.walls
			.filter(w => filter(w))
			.filter(w => this.getWallOrientation(w) === 'horizontal')
			.map(w => ({
				start: Math.min(w.pointA.x, w.pointB.x),
				end: Math.max(w.pointA.x, w.pointB.x),
				y: w.pointA.y
			}))
			.forEach(section => {
				const before = horizontalWalls.find(s => s.y === section.y && s.end === section.start);
				const after = horizontalWalls.find(s => s.y === section.y && s.start === section.end);
				if (before && after) {
					before.end = after.end;
					horizontalWalls.splice(horizontalWalls.indexOf(after), 1);
				} else if (before) {
					before.end = section.end;
				} else if (after) {
					after.start = section.start;
				} else {
					horizontalWalls.push(section);
				}
			});

		const verticalWalls: { start: number, end: number, x: number }[] = [];
		map.walls
			.filter(w => filter(w))
			.filter(w => this.getWallOrientation(w) === 'vertical')
			.map(w => ({
				start: Math.min(w.pointA.y, w.pointB.y),
				end: Math.max(w.pointA.y, w.pointB.y),
				x: w.pointA.x
			}))
			.forEach(section => {
				const before = verticalWalls.find(s => s.x === section.x && s.end === section.start);
				const after = verticalWalls.find(s => s.x === section.x && s.start === section.end);
				if (before && after) {
					before.end = after.end;
					verticalWalls.splice(verticalWalls.indexOf(after), 1);
				} else if (before) {
					before.end = section.end;
				} else if (after) {
					after.start = section.start;
				} else {
					verticalWalls.push(section);
				}
			});

		return {
			horizontal: horizontalWalls,
			vertical: verticalWalls
		};
	}
	*/

	static itemsAt(map: TacticalMap, x: number, y: number) {
		const items: MapItem[] = [];

		map.items
			.filter(item => item.type === 'tile')
			.filter(item => {
				const left = item.position.x;
				const right = item.position.x + item.dimensions.width - 1;
				const top = item.position.y;
				const bottom = item.position.y + item.dimensions.height - 1;
				return (x >= left) && (x <= right) && (y >= top) && (y <= bottom);
			})
			.forEach(item => items.push(item));

		map.items
			.filter(item => item.type === 'zone')
			.filter(item => {
				const left = item.position.x;
				const right = item.position.x + item.dimensions.width - 1;
				const top = item.position.y;
				const bottom = item.position.y + item.dimensions.height - 1;
				return (x >= left) && (x <= right) && (y >= top) && (y <= bottom);
			})
			.forEach(item => items.push(item));

		map.items
			.filter(item => item.type === 'mini')
			.filter(item => {
				const left = item.position.x;
				const right = item.position.x + item.dimensions.width - 1;
				const top = item.position.y;
				const bottom = item.position.y + item.dimensions.height - 1;
				return (x >= left) && (x <= right) && (y >= top) && (y <= bottom);
			})
			.forEach(item => items.push(item));

		return items;
	}

	static rotateMap(map: TacticalMap) {
		map.items
			.filter(item => item.type === 'tile')
			.forEach(item => {
				const newX = (item.position.y + item.dimensions.height - 1) * -1;
				const newY = item.position.x;
				const newWidth = item.dimensions.height;
				const newHeight = item.dimensions.width;

				item.position.x = newX;
				item.position.y = newY;
				item.dimensions.width = newWidth;
				item.dimensions.height = newHeight;
			});

		map.items
			.filter(item => item.type === 'wall')
			.forEach(wall => {
				const x = Math.min(wall.pointA.x, wall.pointB.x);
				const y = Math.min(wall.pointA.y, wall.pointB.y);
				const width = Math.max(wall.pointA.x, wall.pointB.x) - x + 1;
				const height = Math.max(wall.pointA.y, wall.pointB.y) - y + 1;

				const newX = (y + height - 1) * -1;
				const newY = x;
				const newWidth = height;
				const newHeight = width;

				wall.pointA.x = newX + 1;
				wall.pointA.y = newY;
				wall.pointB.x = newX + newWidth;
				wall.pointB.y = newY + newHeight - 1;
			});

		map.items
			.filter(item => item.type === 'zone')
			.forEach(item => {
				const newX = (item.position.y + item.dimensions.height - 1) * -1;
				const newY = item.position.x;
				const newWidth = item.dimensions.height;
				const newHeight = item.dimensions.width;

				item.position.x = newX;
				item.position.y = newY;
				item.dimensions.width = newWidth;
				item.dimensions.height = newHeight;
			});

		map.items
			.filter(item => item.type === 'mini')
			.forEach(item => {
				const newX = (item.position.y) * -1;
				const newY = item.position.x;

				item.position.x = newX;
				item.position.y = newY;
			});

		map.items
			.filter(item => item.type === 'fog')
			.forEach(item => {
				const newX = (item.position.y) * -1;
				const newY = item.position.x;

				item.position.x = newX;
				item.position.y = newY;
			});
	}

	static generateDungeon(size: number, map: TacticalMap) {
		map.items = [];

		let n = 0;
		while (n < size) {
			if (this.addRoom(map)) {
				n += 1;
			}
		}

		this.addWalls(map, true, true);
	}

	static generateCavern = (size: number, map: TacticalMap) => {
		map.items = [];

		while (TacticalMapLogic.getMapSize(map) < size) {
			this.addBlob(map);
		}

		this.addWalls(map, true, false);
	};

	static addBlob = (map: TacticalMap) => {
		const blob: MapTile[] = [];

		const getEmptyAdjacentSquares = (tiles: MapTile[]) => {
			const adjacents: MapPosition[] = [];
			tiles.forEach(tile => {
				for (let x = tile.position.x; x <= tile.position.x + tile.dimensions.width - 1; ++x) {
					adjacents.push({ x: x, y: tile.position.y - 1, z: tile.position.z });
					adjacents.push({ x: x, y: tile.position.y + 1, z: tile.position.z });
				}
				for (let y = tile.position.y; y <= tile.position.y + tile.dimensions.height - 1; ++y) {
					adjacents.push({ x: tile.position.x - 1, y: y, z: tile.position.z });
					adjacents.push({ x: tile.position.x + 1, y: y, z: tile.position.z });
				}
			});
			return adjacents.filter(adj => TacticalMapLogic.itemsAt(map, adj.x, adj.y).length === 0);
		};

		while ((blob.length < 5) || (Random.randomNumber(10) !== 0)) {
			const candidates: MapPosition[] = [];
			if (TacticalMapLogic.getMapSize(map) === 0) {
				// Start at origin
				candidates.push({ x: 0, y: 0, z: 0 });
			} else if (blob.length === 0) {
				// Find an empty square adjacent to the map
				const tiles = map.items.filter(item => item.type === 'tile');
				candidates.push(...getEmptyAdjacentSquares(tiles));
			} else {
				candidates.push(...getEmptyAdjacentSquares(blob));
			}

			if (candidates.length === 0) {
				break;
			}

			const square = Collections.draw(candidates);

			const tile = FactoryLogic.createMapTile();
			tile.position = square;
			tile.dimensions = { width: 1, height: 1, depth: 1 };

			map.items.push(tile);
			blob.push(tile);
		}
	};

	static addRoom(map: TacticalMap) {
		const room = FactoryLogic.createMapTile();
		room.corners = 'square';
		room.dimensions.width = Random.die(6) + Random.die(6) + 2;
		room.dimensions.height = Random.die(6) + Random.die(6) + 2;

		let extra = null;

		const dimensions = this.getMapBoundaries(map);
		if (dimensions) {
			// Try to find a place we can add this tile
			const minGap = 1;
			const maxGap = 2;
			dimensions.minX -= (room.dimensions.width + maxGap);
			dimensions.minY -= (room.dimensions.height + maxGap);
			dimensions.maxX += maxGap;
			dimensions.maxY += maxGap;
			const candidates = [];
			for (let x = dimensions.minX; x !== dimensions.maxX; ++x) {
				for (let y = dimensions.minY; y !== dimensions.maxY; ++y) {
					const canAdd = this.canAddTileHere(map, x, y, room.dimensions.width, room.dimensions.height, minGap, minGap);
					if (canAdd) {
						candidates.push({ x: x, y: y });
					}
				}
			}
			if (candidates.length > 0) {
				const index = Random.randomNumber(candidates.length);
				room.position.x = candidates[index].x;
				room.position.y = candidates[index].y;
			} else {
				return false;
			}

			// Try to add a straight corridor to another tile
			const corridors: { tile: MapTile, horizontal: boolean }[] = [];
			map.items
				.filter(i => i.type === 'tile')
				.forEach(tile => {
					// Find possible straight vertical corridors joining these two tiles
					const minX = Math.max(room.position.x, tile.position.x);
					const maxX = Math.min((room.position.x + room.dimensions.width - 1), (tile.position.x + tile.dimensions.width - 1));
					const overlapX = maxX - minX + 1;
					if (overlapX >= 2) {
						const corridorTop = Math.min((room.position.y + room.dimensions.height - 1), (tile.position.y + tile.dimensions.height - 1)) + 1;
						const corridorBottom = Math.max(room.position.y, tile.position.y) - 1;
						for (let x = minX; x <= maxX - 1; ++x) {
							const corridor = FactoryLogic.createMapTile();
							corridor.corners = 'square';
							corridor.position.x = x;
							corridor.position.y = corridorTop;
							corridor.dimensions.width = 2;
							corridor.dimensions.height = corridorBottom - corridorTop + 1;
							if (this.canAddTileHere(map, corridor.position.x, corridor.position.y, corridor.dimensions.width, corridor.dimensions.height, 1, 0)) {
								corridors.push({ tile: corridor, horizontal: false });
							}
						}
					}

					// Find possible straight horizontal corridors joining these two tiles
					const minY = Math.max(room.position.y, tile.position.y);
					const maxY = Math.min((room.position.y + room.dimensions.height - 1), (tile.position.y + tile.dimensions.height - 1));
					const overlapY = maxY - minY + 1;
					if (overlapY >= 2) {
						const corridorLeft = Math.min((room.position.x + room.dimensions.width - 1), (tile.position.x + tile.dimensions.width - 1)) + 1;
						const corridorRight = Math.max(room.position.x, tile.position.x) - 1;
						for (let y = minY; y <= maxY - 1; ++y) {
							const corridor = FactoryLogic.createMapTile();
							corridor.corners = 'square';
							corridor.position.x = corridorLeft;
							corridor.position.y = y;
							corridor.dimensions.width = corridorRight - corridorLeft + 1;
							corridor.dimensions.height = 2;
							if (this.canAddTileHere(map, corridor.position.x, corridor.position.y, corridor.dimensions.width, corridor.dimensions.height, 0, 1)) {
								corridors.push({ tile: corridor, horizontal: true });
							}
						}
					}
				});

			if (corridors.length > 0) {
				const index = Random.randomNumber(corridors.length);
				const corridor = corridors[index];

				extra = this.getRoomAdjunct(room, map);
				map.items.push(corridor.tile);
				map.items.push(room);
				if (extra) {
					map.items.push(extra);
				}
			} else {
				return false;
			}
		} else {
			map.items.push(room);

			extra = this.getRoomAdjunct(room, map);
			if (extra) {
				map.items.push(extra);
			}
		}

		return true;
	}

	static getRoomAdjunct(room: MapTile, map: TacticalMap) {
		if (Random.randomBoolean()) {
			return null;
		}

		let width = 0;
		let height = 0;
		const candidates = [];
		switch (Random.randomNumber(2)) {
			case 0:
				// Top or bottom
				{
					width = Random.randomNumber(room.dimensions.width - 2) + 2;
					height = Random.die(4) + Random.die(4);
					const diffX = room.dimensions.width - width;
					for (let dx = 0; dx !== diffX; ++dx) {
						const x = room.position.x + dx;
						// Can we put this on the top?
						const y1 = room.position.y - height;
						if (this.canAddTileHere(map, x, y1, width, height, 1, 1)) {
							candidates.push({ x: x, y: y1 });
						}
						// Can we put this on the bottom?
						const y2 = room.position.y + room.dimensions.height;
						if (this.canAddTileHere(map, x, y2, width, height, 1, 1)) {
							candidates.push({ x: x, y: y2 });
						}
					}
				}
				break;
			case 1:
				// Left or right
				{
					width = Random.die(4) + Random.die(4);
					height = Random.randomNumber(room.dimensions.height - 2) + 2;
					const diffY = room.dimensions.height - height;
					for (let dy = 0; dy !== diffY; ++dy) {
						const y = room.position.y + dy;
						// Can we put this on the left?
						const x1 = room.position.x - width;
						if (this.canAddTileHere(map, x1, y, width, height, 1, 1)) {
							candidates.push({ x: x1, y: y });
						}
						// Can we put this on the right?
						const x2 = room.position.x + room.dimensions.width;
						if (this.canAddTileHere(map, x2, y, width, height, 1, 1)) {
							candidates.push({ x: x2, y: y });
						}
					}
				}
				break;
		}
		if (candidates.length > 0) {
			const index = Random.randomNumber(candidates.length);
			const selected = candidates[index];

			const extra = FactoryLogic.createMapTile();
			extra.corners = 'square';
			extra.position.x = selected.x;
			extra.position.y = selected.y;
			extra.dimensions.width = width;
			extra.dimensions.height = height;

			return extra;
		}

		return null;
	}

	static getWallOrientation(wall: MapWall) {
		if (wall.pointA.x === wall.pointB.x) {
			return 'vertical';
		} else if (wall.pointA.y === wall.pointB.y) {
			return 'horizontal';
		}

		return '';
	}

	static getWallLength(wall: MapWall) {
		if (wall.pointA.x === wall.pointB.x) {
			return Math.abs(wall.pointA.y - wall.pointB.y);
		} else if (wall.pointA.y === wall.pointB.y) {
			return Math.abs(wall.pointA.x - wall.pointB.x);
		}

		return 0;
	}

	static addWalls(map: TacticalMap, addWalls: boolean, addDoors: boolean) {
		const walls: MapWall[] = [];

		const addDoor = (xA: number, yA: number, xB: number, yB: number) => {
			const door = FactoryLogic.createMapWall();
			door.isOpenable = true;
			door.pointA = { x: xA, y: yA, z: 0 };
			door.pointB = { x: xB, y: yB, z: 0 };
			if (this.getWallLength(door) <= 2) {
				if (addDoors) {
					walls.push(door);
				}
			}
			return door;
		};

		const tiles = map.items.filter(i => i.type === 'tile');
		tiles.forEach(tile => {
			const top = tile.position.y;
			const right = tile.position.x + tile.dimensions.width - 1;
			const bottom = tile.position.y + tile.dimensions.height - 1;
			const left = tile.position.x;

			let north: number[] = [];
			let east: number[] = [];
			let south: number[] = [];
			let west: number[] = [];
			for (let x = left; x <= right; ++x) {
				north.push(x);
				south.push(x);
			}
			for (let y = top; y <= bottom; ++y) {
				east.push(y);
				west.push(y);
			}

			// Find tiles adjacent to the north edge
			tiles.filter(t => (t.position.y + t.dimensions.height - 1 === top - 1) && (t.position.x <= right) && (t.position.x + t.dimensions.width - 1 >= left))
				.forEach(t => {
					const door = addDoor(Math.max(left, t.position.x), top, Math.min(right + 1, t.position.x + t.dimensions.width), top);
					for (let x = door.pointA.x; x < door.pointB.x; ++x) {
						north = north.filter(val => val !== x);
					}
				});

			// Find tiles adjacent to the east edge
			tiles.filter(t => (t.position.x === right + 1) && (t.position.y <= bottom) && (t.position.y + t.dimensions.height - 1 >= top))
				.forEach(t => {
					const door = addDoor(right + 1, Math.max(top, t.position.y), right + 1, Math.min(bottom + 1, t.position.y + t.dimensions.height));
					for (let y = door.pointA.y; y < door.pointB.y; ++y) {
						east = east.filter(val => val !== y);
					}
				});

			// Find tiles adjacent to the south edge
			tiles.filter(t => (t.position.y === bottom + 1) && (t.position.x <= right) && (t.position.x + t.dimensions.width - 1 >= left))
				.forEach(t => {
					const door = addDoor(Math.max(left, t.position.x), bottom + 1, Math.min(right + 1, t.position.x + t.dimensions.width), bottom + 1);
					for (let x = door.pointA.x; x < door.pointB.x; ++x) {
						south = south.filter(val => val !== x);
					}
				});

			// Find tiles adjacent to the west edge
			tiles.filter(t => (t.position.x + t.dimensions.width - 1 === left - 1) && (t.position.y <= bottom) && (t.position.y + t.dimensions.height - 1 >= top))
				.forEach(t => {
					const door = addDoor(left, Math.max(top, t.position.y), left, Math.min(bottom + 1, t.position.y + t.dimensions.height));
					for (let y = door.pointA.y; y < door.pointB.y; ++y) {
						west = west.filter(val => val !== y);
					}
				});

			if (addWalls) {
				// Add missing walls
				while (north.length > 0) {
					let val = north[0];
					north.splice(0, 1);

					const wall = FactoryLogic.createMapWall();
					wall.pointA.x = val;
					wall.pointA.y = top;
					wall.pointB.x = val + 1;
					wall.pointB.y = top;

					while ((north.length > 0) && (north[0] === val + 1)) {
						val = north[0];
						north.splice(0, 1);
						wall.pointB.x += 1;
					}

					walls.push(wall);
				}
				while (east.length > 0) {
					let val = east[0];
					east.splice(0, 1);

					const wall = FactoryLogic.createMapWall();
					wall.pointA.x = right + 1;
					wall.pointA.y = val;
					wall.pointB.x = right + 1;
					wall.pointB.y = val + 1;

					while ((east.length > 0) && (east[0] === val + 1)) {
						val = east[0];
						east.splice(0, 1);
						wall.pointB.y += 1;
					}

					walls.push(wall);
				}
				while (south.length > 0) {
					let val = south[0];
					south.splice(0, 1);

					const wall = FactoryLogic.createMapWall();
					wall.pointA.x = val;
					wall.pointA.y = bottom + 1;
					wall.pointB.x = val + 1;
					wall.pointB.y = bottom + 1;

					while ((south.length > 0) && (south[0] === val + 1)) {
						val = south[0];
						south.splice(0, 1);
						wall.pointB.x += 1;
					}

					walls.push(wall);
				}
				while (west.length > 0) {
					let val = west[0];
					west.splice(0, 1);

					const wall = FactoryLogic.createMapWall();
					wall.pointA.x = left;
					wall.pointA.y = val;
					wall.pointB.x = left;
					wall.pointB.y = val + 1;

					while ((west.length > 0) && (west[0] === val + 1)) {
						val = west[0];
						west.splice(0, 1);
						wall.pointB.y += 1;
					}

					walls.push(wall);
				}
			}
		});

		Collections.distinct(
			walls,
			wall => {
				const a = wall.pointA.x + ',' + wall.pointA.y + ',' + wall.pointA.z;
				const b = wall.pointB.x + ',' + wall.pointB.y + ',' + wall.pointB.z;
				return a + '-' + b;
			})
			.forEach(wall => map.items.push(wall));
	}
}
