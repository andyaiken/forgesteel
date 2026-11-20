import { Body, ContactMaterial, ConvexPolyhedron, Material, Plane, Vec3, World } from 'cannon-es';
import { BufferGeometry, Float32BufferAttribute, IcosahedronGeometry, Matrix4, Quaternion, Vector3 } from 'three';
import { Collections } from '@/utils/collections';
import { DieResult } from '@/models/die-result';
import { DieType } from '@/enums/die-type';
import { Random } from '@/utils/random';

// Geometry and physics for the 3D dice tray.
//
// This module imports three.js and cannon-es, so only import it from code that
// is itself loaded on demand (the dice scene), or they end up in the main bundle.
//
// The result of a roll is always decided first (by Random.die). The throw is then
// simulated from start to finish before anything is shown, and we look at which
// face ended up on top. Every die here is a regular solid, so there is a rotation
// that maps its shape onto itself while moving a face carrying the rolled value
// onto that top face. Rendering the die with that extra rotation looks exactly
// like the simulated throw (it's the same shape in the same place), but it shows
// the right number. Nothing is ever decided by the physics.
//
// The table is the plane y = 0. The camera looks down at it from the +Z side,
// so a label is readable when its top points towards -Z.

export type DieFaceShape = 'triangle' | 'square';

export interface DieFace {
	value: number;
	shape: DieFaceShape;
	// The face's corners, counter-clockwise seen from outside, in the die's own space
	polygon: Vector3[];
	centroid: Vector3;
	// Outward normal, in the die's own space
	normal: Vector3;
	// The direction the top of the label points, in the die's own space
	up: Vector3;
	// Where this face's label is drawn in the die's texture atlas
	cell: { col: number, row: number };
}

export interface DieDefinition {
	type: DieType;
	sides: number;
	faces: DieFace[];
	vertices: Vector3[];
	// For each face, indices into `vertices`
	faceIndices: number[][];
	// Centre to corner
	radius: number;
	// Centre to face; how high the centre sits when the die is resting on the table
	inradius: number;
	geometry: BufferGeometry;
	atlas: { cols: number, rows: number };
	// Mark 6 and 9 so they can be told apart
	underline69: boolean;
}

// The inside of the tray, on the table
export interface TrayBounds {
	minX: number;
	maxX: number;
	minZ: number;
	maxZ: number;
}

export interface DieTrack {
	result: DieResult;
	definition: DieDefinition;
	// Applied in the die's own space so that a face carrying the result ends up on top
	relabel: Quaternion;
	// x, y, z for each frame
	positions: Float32Array;
	// x, y, z, w for each frame
	quaternions: Float32Array;
}

export interface DiceSimulation {
	tracks: DieTrack[];
	frameCount: number;
	// Seconds
	duration: number;
}

const STEP = 1 / 120;
const MAX_DURATION = 6;
const MAX_ATTEMPTS = 25;
const MAX_REROLL_ATTEMPTS = 300;
const GRAVITY = 45;
const CEILING = 4;
// After this long, friction builds up so the dice don't drift around for ages;
// a rerolled die has less far to go than a thrown one
const SETTLE_AFTER = 1.6;
const SETTLE_AFTER_HOP = 0.9;

const GROUP_DICE = 1;
const GROUP_TRAY = 2;
// The wall nearest the viewer only becomes solid once a die is past it, so the dice can be thrown in over it
const GROUP_NEAR_WALL = 4;

// Face outlines inside one atlas cell, in 0-1 cell coordinates with y pointing up.
// The triangle is equilateral with vertex 0 at the top, so labels point at vertex 0;
// on the square, labels point from vertex 0 towards vertex 3.
const TRIANGLE_RADIUS = 0.53;
const TRIANGLE_CENTRE_Y = 0.5 - (TRIANGLE_RADIUS / 4);

const triangleOutline: [ number, number ][] = [
	[ 0.5, TRIANGLE_CENTRE_Y + TRIANGLE_RADIUS ],
	[ 0.5 - TRIANGLE_RADIUS * Math.sin(Math.PI / 3), TRIANGLE_CENTRE_Y - TRIANGLE_RADIUS / 2 ],
	[ 0.5 + TRIANGLE_RADIUS * Math.sin(Math.PI / 3), TRIANGLE_CENTRE_Y - TRIANGLE_RADIUS / 2 ]
];

const squareOutline: [ number, number ][] = [
	[ 0.05, 0.05 ],
	[ 0.95, 0.05 ],
	[ 0.95, 0.95 ],
	[ 0.05, 0.95 ]
];

const definitions = new Map<DieType, DieDefinition>();

const vertexKey = (v: Vector3) => `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;

// Each polygon is counter-clockwise when seen from outside the die
const icosahedronPolygons = (radius: number) => {
	const geometry = new IcosahedronGeometry(radius, 0);
	const position = geometry.getAttribute('position');
	const polygons: Vector3[][] = [];

	for (let n = 0; n < position.count; n += 3) {
		const a = new Vector3().fromBufferAttribute(position, n);
		let b = new Vector3().fromBufferAttribute(position, n + 1);
		let c = new Vector3().fromBufferAttribute(position, n + 2);

		const normal = new Vector3().subVectors(b, a).cross(new Vector3().subVectors(c, a));
		const centroid = a.clone().add(b).add(c);
		if (normal.dot(centroid) < 0) {
			[ b, c ] = [ c, b ];
		}

		polygons.push([ a, b, c ]);
	}

	geometry.dispose();
	return polygons;
};

// Order: +Z, -Z, +X, -X, +Y, -Y, so faces 2n and 2n + 1 are opposite each other
const cubePolygons = (size: number) => {
	const h = size / 2;
	const v = (x: number, y: number, z: number) => new Vector3(x * h, y * h, z * h);

	return [
		[ v(-1, -1, 1), v(1, -1, 1), v(1, 1, 1), v(-1, 1, 1) ],
		[ v(1, -1, -1), v(-1, -1, -1), v(-1, 1, -1), v(1, 1, -1) ],
		[ v(1, -1, 1), v(1, -1, -1), v(1, 1, -1), v(1, 1, 1) ],
		[ v(-1, -1, -1), v(-1, -1, 1), v(-1, 1, 1), v(-1, 1, -1) ],
		[ v(-1, 1, 1), v(1, 1, 1), v(1, 1, -1), v(-1, 1, -1) ],
		[ v(-1, -1, -1), v(1, -1, -1), v(1, -1, 1), v(-1, -1, 1) ]
	];
};

const getPolygonCentroid = (polygon: Vector3[]) => {
	return polygon.reduce((sum, v) => sum.add(v), new Vector3()).divideScalar(polygon.length);
};

const getPolygonNormal = (polygon: Vector3[]) => {
	return new Vector3()
		.subVectors(polygon[1], polygon[0])
		.cross(new Vector3().subVectors(polygon[polygon.length - 1], polygon[0]))
		.normalize();
};

const getPolygonUp = (polygon: Vector3[]) => {
	if (polygon.length === 3) {
		return polygon[0].clone().sub(getPolygonCentroid(polygon)).normalize();
	}

	return polygon[3].clone().sub(polygon[0]).normalize();
};

// A d20 numbered 1 - 10 twice.
// Opposite faces add up to 11 (as a d20's add up to 21),
// and no two faces that share an edge show the same number.
const getD10Values = (polygons: Vector3[][]) => {
	const normals = polygons.map(getPolygonNormal);
	const keys = polygons.map(p => p.map(vertexKey));

	const pairs: [ number, number ][] = [];
	const paired = new Set<number>();
	normals.forEach((normal, i) => {
		if (paired.has(i)) {
			return;
		}

		let opposite = -1;
		let lowest = 2;
		normals.forEach((other, j) => {
			if ((j !== i) && !paired.has(j) && (normal.dot(other) < lowest)) {
				lowest = normal.dot(other);
				opposite = j;
			}
		});

		paired.add(i);
		paired.add(opposite);
		pairs.push([ i, opposite ]);
	});

	const adjacent = (i: number, j: number) => keys[i].filter(k => keys[j].includes(k)).length === 2;

	// Seeded, so the dice look the same every time
	const rng = Random.getSeededRNG('forgesteel-d10');
	let values: number[] = [];
	for (let attempt = 0; attempt < 5000; ++attempt) {
		const order = Collections.shuffle([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], rng);
		values = new Array<number>(polygons.length);
		pairs.forEach(([ i, j ], n) => {
			const low = (order[n] % 5) + 1;
			const flip = Random.randomBoolean(rng);
			values[i] = flip ? low : 11 - low;
			values[j] = flip ? 11 - low : low;
		});

		let valid = true;
		for (let i = 0; valid && (i < polygons.length); ++i) {
			for (let j = i + 1; valid && (j < polygons.length); ++j) {
				if ((values[i] === values[j]) && adjacent(i, j)) {
					valid = false;
				}
			}
		}

		if (valid) {
			break;
		}
	}

	return values;
};

const createDefinition = (type: DieType, sides: number, polygons: Vector3[][], values: number[], underline69: boolean): DieDefinition => {
	const cols = Math.ceil(Math.sqrt(polygons.length));
	const rows = Math.ceil(polygons.length / cols);

	const positions: number[] = [];
	const uvs: number[] = [];

	const faces = polygons.map((polygon, n): DieFace => {
		const col = n % cols;
		const row = Math.floor(n / cols);
		const shape: DieFaceShape = polygon.length === 3 ? 'triangle' : 'square';
		const outline = shape === 'triangle' ? triangleOutline : squareOutline;
		const triangles = shape === 'triangle' ? [ [ 0, 1, 2 ] ] : [ [ 0, 1, 2 ], [ 0, 2, 3 ] ];

		triangles.forEach(triangle => triangle.forEach(index => {
			const [ x, y ] = outline[index];
			positions.push(polygon[index].x, polygon[index].y, polygon[index].z);
			uvs.push((col + x) / cols, 1 - ((row + 1 - y) / rows));
		}));

		return {
			value: values[n],
			shape: shape,
			polygon: polygon,
			centroid: getPolygonCentroid(polygon),
			normal: getPolygonNormal(polygon),
			up: getPolygonUp(polygon),
			cell: { col: col, row: row }
		};
	});

	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
	geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	// The geometry is not indexed, so this gives each face a flat normal
	geometry.computeVertexNormals();

	const vertices: Vector3[] = [];
	const indices = new Map<string, number>();
	const faceIndices = polygons.map(polygon => polygon.map(v => {
		const key = vertexKey(v);
		if (!indices.has(key)) {
			indices.set(key, vertices.length);
			vertices.push(v);
		}
		return indices.get(key) as number;
	}));

	return {
		type: type,
		sides: sides,
		faces: faces,
		vertices: vertices,
		faceIndices: faceIndices,
		radius: Math.max(...vertices.map(v => v.length())),
		inradius: faces[0].centroid.length(),
		geometry: geometry,
		atlas: { cols: cols, rows: rows },
		underline69: underline69
	};
};

// The rotation, in the die's own space, that carries face `from` onto face `to`
// (with corner `corner` of `from` landing on the first corner of `to`).
// For a regular solid this maps the whole shape onto itself.
const getSymmetry = (from: DieFace, corner: number, to: DieFace) => {
	const frame = (face: DieFace, n: number) => {
		const tangent = face.polygon[n].clone().sub(face.centroid).normalize();
		const bitangent = face.normal.clone().cross(tangent);
		return new Matrix4().makeBasis(tangent, bitangent, face.normal);
	};

	const rotation = frame(to, 0).multiply(frame(from, corner).transpose());
	return new Quaternion().setFromRotationMatrix(rotation);
};

const createWorld = (bounds: TrayBounds) => {
	const world = new World({ gravity: new Vec3(0, -GRAVITY, 0) });

	const tableMaterial = new Material('table');
	const wallMaterial = new Material('wall');
	const diceMaterial = new Material('dice');
	world.addContactMaterial(new ContactMaterial(diceMaterial, tableMaterial, { friction: 0.3, restitution: 0.5 }));
	world.addContactMaterial(new ContactMaterial(diceMaterial, wallMaterial, { friction: 0.1, restitution: 0.8 }));
	world.addContactMaterial(new ContactMaterial(diceMaterial, diceMaterial, { friction: 0.2, restitution: 0.6 }));

	// A plane's surface faces along its local +Z
	const addPlane = (material: Material, group: number, position: Vec3, x: number, y: number) => {
		const body = new Body({ mass: 0, shape: new Plane(), material: material, position: position, collisionFilterGroup: group });
		body.quaternion.setFromEuler(x, y, 0);
		world.addBody(body);
	};

	addPlane(tableMaterial, GROUP_TRAY, new Vec3(0, 0, 0), -Math.PI / 2, 0);
	addPlane(wallMaterial, GROUP_TRAY, new Vec3(0, CEILING, 0), Math.PI / 2, 0);
	addPlane(wallMaterial, GROUP_TRAY, new Vec3(bounds.minX, 0, 0), 0, Math.PI / 2);
	addPlane(wallMaterial, GROUP_TRAY, new Vec3(bounds.maxX, 0, 0), 0, -Math.PI / 2);
	addPlane(wallMaterial, GROUP_TRAY, new Vec3(0, 0, bounds.minZ), 0, 0);
	addPlane(wallMaterial, GROUP_NEAR_WALL, new Vec3(0, 0, bounds.maxZ), 0, Math.PI);

	return { world: world, diceMaterial: diceMaterial };
};

// A die with no mass doesn't move: it's just something for the other dice to bounce off
const createDieBody = (definition: DieDefinition, material: Material, mass: number) => {
	return new Body({
		mass: mass,
		material: material,
		shape: new ConvexPolyhedron({
			vertices: definition.vertices.map(v => new Vec3(v.x, v.y, v.z)),
			faces: definition.faceIndices
		}),
		collisionFilterGroup: GROUP_DICE,
		collisionFilterMask: GROUP_DICE | GROUP_TRAY
	});
};

const toQuaternion = (body: Body) => new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);

// How far the label on a face is turned from upright, as seen by the viewer
const getLabelAngle = (face: DieFace, quaternion: Quaternion) => {
	const up = face.up.clone().applyQuaternion(quaternion);
	return Math.abs(Math.atan2(up.x, -up.z));
};

// Whether a die has come to rest flat on the table inside the tray (not cocked against something, or on top of another die)
const isAtRest = (body: Body, definition: DieDefinition, bounds: TrayBounds) => {
	const p = body.position;
	const quaternion = toQuaternion(body);
	const top = DiceLogic.getTopFace(definition, quaternion);

	const flat = top.normal.clone().applyQuaternion(quaternion).y > 0.995;
	const onTable = p.y < definition.inradius + 0.05;
	const inTray = (p.x > bounds.minX) && (p.x < bounds.maxX) && (p.z > bounds.minZ) && (p.z < bounds.maxZ);
	return flat && onTable && inTray;
};

// Of all the ways to bring a face carrying `value` to the top, the one whose label is most upright
const getRelabel = (definition: DieDefinition, quaternion: Quaternion, value: number) => {
	const top = DiceLogic.getTopFace(definition, quaternion);

	let relabel = new Quaternion();
	let bestAngle = Infinity;
	definition.faces
		.filter(f => f.value === value)
		.forEach(face => face.polygon.forEach((_, corner) => {
			const symmetry = getSymmetry(face, corner, top);
			const angle = getLabelAngle(face, quaternion.clone().multiply(symmetry));
			if (angle < bestAngle) {
				bestAngle = angle;
				relabel = symmetry;
			}
		}));

	return relabel;
};

// Steps the world until all the moving dice have come to rest, recording how they move.
// Returns null if a die escapes from the tray or they don't settle in time.
const record = (world: World, moving: { body: Body, definition: DieDefinition }[], bounds: TrayBounds, settleAfter: number) => {
	const maxFrames = Math.ceil(MAX_DURATION / STEP);
	const positions = moving.map(() => new Float32Array(maxFrames * 3));
	const quaternions = moving.map(() => new Float32Array(maxFrames * 4));
	const stillFor = moving.map(() => 0);

	const capture = (frame: number) => moving.forEach(({ body }, n) => {
		positions[n].set([ body.position.x, body.position.y, body.position.z ], frame * 3);
		quaternions[n].set([ body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w ], frame * 4);
	});

	// The first frame is where the dice start
	capture(0);
	let frameCount = 1;
	while (frameCount < maxFrames) {
		const damping = Math.min(0.9, 0.1 + (Math.max(0, (frameCount * STEP) - settleAfter) * 0.6));
		moving.forEach(({ body }) => {
			body.linearDamping = damping;
			body.angularDamping = damping;
		});

		world.step(STEP);
		capture(frameCount);
		frameCount += 1;

		let escaped = false;
		moving.forEach(({ body, definition }, n) => {
			if (((body.collisionFilterMask & GROUP_NEAR_WALL) === 0) && (body.position.z < bounds.maxZ - (definition.radius / 2))) {
				body.collisionFilterMask |= GROUP_NEAR_WALL;
			}

			if ((body.position.z > bounds.maxZ + 5) || (body.position.y < -1)) {
				escaped = true;
			}

			const still = (body.velocity.length() < 0.05) && (body.angularVelocity.length() < 0.1);
			stillFor[n] = still ? stillFor[n] + STEP : 0;
		});

		if (escaped) {
			return null;
		}

		if (stillFor.every(t => t >= 0.2)) {
			return {
				positions: positions.map(p => p.slice(0, frameCount * 3)),
				quaternions: quaternions.map(q => q.slice(0, frameCount * 4)),
				frameCount: frameCount
			};
		}
	}

	return null;
};

// Runs one throw; returns null if it didn't end cleanly (a die left cocked, stacked or out of the tray)
const simulateThrow = (dice: DieResult[], bounds: TrayBounds, rng: () => number): DiceSimulation | null => {
	const rand = (min: number, max: number) => min + (rng() * (max - min));
	const { world, diceMaterial } = createWorld(bounds);

	const centreX = (bounds.minX + bounds.maxX) / 2;
	const width = bounds.maxX - bounds.minX;
	const perRow = 3;

	const moving = dice.map((die, n) => {
		const definition = DiceLogic.getDefinition(die.type);
		const body = createDieBody(definition, diceMaterial, 1);

		// Thrown in from the viewer's side, in rows of up to three, starting out of view
		const row = Math.floor(n / perRow);
		const inRow = Math.min(perRow, dice.length - (row * perRow));
		const lane = (((n % perRow) + 0.5) / inRow) - 0.5;
		const x = centreX + (lane * width * 0.55) + rand(-0.2, 0.2);

		body.position.set(x, rand(1.2, 2.2), bounds.maxZ + 1.8 + (row * 1.9) + rand(0, 0.4));
		body.velocity.set(rand(-3, 3) - ((x - centreX) * 0.4), rand(0, 2), -rand(10, 14));
		body.angularVelocity.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
		body.quaternion.setFromEuler(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2));

		world.addBody(body);
		return { body: body, definition: definition };
	});

	const recording = record(world, moving, bounds, SETTLE_AFTER);
	if (!recording || !moving.every(({ body, definition }) => isAtRest(body, definition, bounds))) {
		return null;
	}

	return {
		tracks: moving.map(({ body, definition }, n) => ({
			result: dice[n],
			definition: definition,
			relabel: getRelabel(definition, toQuaternion(body), dice[n].value),
			positions: recording.positions[n],
			quaternions: recording.quaternions[n]
		})),
		frameCount: recording.frameCount,
		duration: recording.frameCount * STEP
	};
};

// One die from a throw that has come to rest hops up and tumbles, while the others stay where they are.
// Returns null if it didn't end cleanly.
const simulateHop = (simulation: DiceSimulation, index: number, bounds: TrayBounds, rng: () => number) => {
	const rand = (min: number, max: number) => min + (rng() * (max - min));
	const { world, diceMaterial } = createWorld(bounds);
	const poses = simulation.tracks.map(track => DiceLogic.getPose(simulation, track, simulation.duration));

	const bodies = simulation.tracks.map((track, n) => {
		const { position, quaternion } = poses[n];
		const body = createDieBody(track.definition, diceMaterial, n === index ? 1 : 0);
		body.position.set(position.x, position.y, position.z);
		body.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
		world.addBody(body);
		return body;
	});

	const body = bodies[index];
	const definition = simulation.tracks[index].definition;
	body.collisionFilterMask |= GROUP_NEAR_WALL;
	body.velocity.set(rand(-2, 2), rand(9, 12), rand(-2, 2));
	body.angularVelocity.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));

	const recording = record(world, [ { body: body, definition: definition } ], bounds, SETTLE_AFTER_HOP);
	if (!recording || !isAtRest(body, definition, bounds)) {
		return null;
	}

	return {
		poses: poses,
		positions: recording.positions[0],
		quaternions: recording.quaternions[0],
		frameCount: recording.frameCount,
		final: toQuaternion(body)
	};
};

export class DiceLogic {
	static triangleOutline = triangleOutline;
	static squareOutline = squareOutline;

	static getLabelCentre = (shape: DieFaceShape): [ number, number ] => {
		return shape === 'triangle' ? [ 0.5, TRIANGLE_CENTRE_Y ] : [ 0.5, 0.5 ];
	};

	static getDefinition = (type: DieType) => {
		let definition = definitions.get(type);

		if (!definition) {
			switch (type) {
				case DieType.D3:
					definition = createDefinition(type, 3, cubePolygons(1), [ 1, 1, 2, 2, 3, 3 ], false);
					break;
				case DieType.D6:
					definition = createDefinition(type, 6, cubePolygons(1), [ 1, 6, 2, 5, 3, 4 ], false);
					break;
				case DieType.D10: {
					const polygons = icosahedronPolygons(0.8);
					definition = createDefinition(type, 10, polygons, getD10Values(polygons), true);
					break;
				}
			}

			definitions.set(type, definition);
		}

		return definition;
	};

	// Throws the dice into the tray and records how they move until they come to rest.
	// The dice will finish showing the values in `dice`.
	static simulate = (dice: DieResult[], bounds: TrayBounds, rng: () => number = Math.random): DiceSimulation => {
		dice.forEach(die => {
			if (!DiceLogic.getDefinition(die.type).faces.some(f => f.value === die.value)) {
				throw new Error(`A ${die.type} cannot show ${die.value}`);
			}
		});

		if (dice.length === 0) {
			return { tracks: [], frameCount: 0, duration: 0 };
		}

		for (let attempt = 0; attempt < MAX_ATTEMPTS; ++attempt) {
			const simulation = simulateThrow(dice, bounds, rng);
			if (simulation) {
				return simulation;
			}
		}

		throw new Error('Could not settle the dice');
	};

	// Rerolls one die of a throw that has come to rest: it hops up, tumbles and lands showing `value`,
	// while the other dice stay where they are.
	//
	// The rerolled die is in view the whole time, so relabelling it would be seen (its numbers would jump).
	// Instead we keep trying hops until one lands on `value` by itself, preferably with its label the right way up.
	static reroll = (simulation: DiceSimulation, index: number, value: number, bounds: TrayBounds, rng: () => number = Math.random): DiceSimulation => {
		const track = simulation.tracks[index];
		if (!track.definition.faces.some(f => f.value === value)) {
			throw new Error(`A ${track.definition.type} cannot show ${value}`);
		}

		let hop: ReturnType<typeof simulateHop> = null;
		let fallback: ReturnType<typeof simulateHop> = null;
		for (let attempt = 0; !hop && (attempt < MAX_REROLL_ATTEMPTS); ++attempt) {
			const candidate = simulateHop(simulation, index, bounds, rng);
			if (candidate) {
				const top = DiceLogic.getTopFace(track.definition, candidate.final);
				const upright = getLabelAngle(top, candidate.final) <= Math.PI / 2;
				if ((top.value === value) && (upright || (attempt >= MAX_REROLL_ATTEMPTS / 2))) {
					hop = candidate;
				}
				fallback = fallback || candidate;
			}
		}

		// In the very unlikely event that no hop landed on the value, relabel one after all
		const chosen = hop || fallback;
		if (!chosen) {
			throw new Error('Could not reroll the die');
		}

		const relabel = hop ? new Quaternion() : getRelabel(track.definition, chosen.final, value);
		const { frameCount, poses } = chosen;
		return {
			tracks: simulation.tracks.map((t, n): DieTrack => {
				if (n === index) {
					return {
						result: { type: t.result.type, value: value },
						definition: t.definition,
						relabel: relabel,
						positions: chosen.positions,
						quaternions: chosen.quaternions
					};
				}

				// The other dice stay where they came to rest
				const positions = new Float32Array(frameCount * 3);
				const quaternions = new Float32Array(frameCount * 4);
				for (let frame = 0; frame < frameCount; ++frame) {
					poses[n].position.toArray(positions, frame * 3);
					poses[n].quaternion.toArray(quaternions, frame * 4);
				}

				return {
					result: t.result,
					definition: t.definition,
					relabel: new Quaternion(),
					positions: positions,
					quaternions: quaternions
				};
			}),
			frameCount: frameCount,
			duration: frameCount * STEP
		};
	};

	// Where a die is `time` seconds into the throw
	static getPose = (simulation: DiceSimulation, track: DieTrack, time: number) => {
		const frame = Math.min(Math.max(time / STEP, 0), simulation.frameCount - 1);
		const a = Math.floor(frame);
		const b = Math.min(a + 1, simulation.frameCount - 1);
		const t = frame - a;

		const position = new Vector3().fromArray(track.positions, a * 3)
			.lerp(new Vector3().fromArray(track.positions, b * 3), t);
		const quaternion = new Quaternion().fromArray(track.quaternions, a * 4)
			.slerp(new Quaternion().fromArray(track.quaternions, b * 4), t)
			.multiply(track.relabel);

		// The physics lets a die sink into the table a little on a hard landing; don't show that
		const lowest = Math.min(...track.definition.vertices.map(v => v.clone().applyQuaternion(quaternion).y));
		position.y = Math.max(position.y, -lowest);

		return {
			position: position,
			quaternion: quaternion
		};
	};

	static getTopFace = (definition: DieDefinition, quaternion: Quaternion) => {
		return Collections.max(definition.faces, f => f.normal.clone().applyQuaternion(quaternion).y) as DieFace;
	};
}
