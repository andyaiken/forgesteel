import { BufferGeometry, CanvasTexture, DirectionalLight, HemisphereLight, MathUtils, Mesh, MeshPhysicalMaterial, OrthographicCamera, PCFShadowMap, PlaneGeometry, Raycaster, SRGBColorSpace, Scene, ShadowMaterial, Vector2, Vector3, WebGLRenderer } from 'three';
import { DiceLogic, DiceSimulation, DieDefinition, DieTrack, TrayBounds } from '@/logic/dice-logic';
import { DieResult } from '@/models/die-result';
import { DieType } from '@/enums/die-type';
import { Random } from '@/utils/random';

// The three.js side of the dice tray.
// This module (and three.js and cannon-es with it) is only loaded when dice are first rolled.

const CELL_SIZE = 256;
const FONT = '"PT Sans", "Trebuchet MS", system-ui, sans-serif';

// The camera looks almost straight down, so the face on top of a die looks like it faces the viewer;
// from a lower angle, the top face looks tilted away.
// It has no perspective, so every die is seen from the same angle: with perspective,
// a die off to one side is seen a little from the side, and its top face looks tilted outwards.
const LOOK_AT = new Vector3(0, 0, 0.2);
const CAMERA_TILT = MathUtils.degToRad(6);
const CAMERA_DIRECTION = new Vector3(0, Math.cos(CAMERA_TILT), Math.sin(CAMERA_TILT));
// Far enough back to be above anything in the tray; with no perspective, this doesn't change how big things look
const CAMERA_DISTANCE = 20;
// How much of the table, either side of LOOK_AT, has to be in view
const MIN_EXTENT = { x: 3, z: 1.5 };

// The tray's walls are placed so that a die resting against any of them is still fully in view,
// from the table up to the top of a resting die
const DIE_TOP_HEIGHT = 1.3;
const WALL_MARGIN = 0.05;

interface DieStyle {
	name: string;
	face: string;
	ink: string;
	// Drawn around the edge of each face so the edges read clearly
	rim: string;
}

const DARK_DIE: DieStyle = { name: 'dark', face: '#1c1c1e', ink: '#f4f4f4', rim: 'rgba(255, 255, 255, 0.1)' };
const LIGHT_DIE: DieStyle = { name: 'light', face: '#e4e4e4', ink: '#141414', rim: 'rgba(0, 0, 0, 0.15)' };

interface ActiveDie {
	track: DieTrack;
	mesh: Mesh;
	style: DieStyle;
}

const drawAtlas = (definition: DieDefinition, style: DieStyle) => {
	const { cols, rows } = definition.atlas;

	const canvas = document.createElement('canvas');
	canvas.width = cols * CELL_SIZE;
	canvas.height = rows * CELL_SIZE;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Could not draw dice texture');
	}

	ctx.fillStyle = style.face;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	definition.faces.forEach(face => {
		const { col, row } = face.cell;
		const toCanvas = ([ x, y ]: [ number, number ]) => [ (col + x) * CELL_SIZE, (row + 1 - y) * CELL_SIZE ];

		const outline = face.shape === 'triangle' ? DiceLogic.triangleOutline : DiceLogic.squareOutline;
		ctx.beginPath();
		outline.forEach((point, n) => {
			const [ x, y ] = toCanvas(point);
			if (n === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});
		ctx.closePath();
		ctx.lineJoin = 'round';
		ctx.lineWidth = CELL_SIZE * 0.05;
		ctx.strokeStyle = style.rim;
		ctx.stroke();

		const text = face.value.toString();
		const fontSize = CELL_SIZE * (face.shape === 'triangle' ? (text.length > 1 ? 0.33 : 0.42) : 0.56);
		const underline = definition.underline69 && ((face.value === 6) || (face.value === 9));
		const [ x, y ] = toCanvas(DiceLogic.getLabelCentre(face.shape));

		ctx.fillStyle = style.ink;
		ctx.font = `700 ${fontSize}px ${FONT}`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'alphabetic';

		const metrics = ctx.measureText(text);
		let baseline = y + ((metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2);
		if (underline) {
			baseline -= fontSize * 0.06;
		}
		ctx.fillText(text, x, baseline);

		if (underline) {
			const width = metrics.width * 0.9;
			ctx.fillRect(x - (width / 2), baseline + (fontSize * 0.1), width, fontSize * 0.08);
		}
	});

	return canvas;
};

export class DiceScene {
	private readonly container: HTMLElement;
	private readonly renderer: WebGLRenderer;
	private readonly scene: Scene;
	private readonly camera: OrthographicCamera;
	private readonly floor: Mesh<PlaneGeometry, ShadowMaterial>;
	private readonly resizeObserver: ResizeObserver;
	private readonly geometries = new Map<DieType, BufferGeometry>();
	private readonly materials = new Map<string, MeshPhysicalMaterial>();

	private readonly raycaster = new Raycaster();

	private simulation: DiceSimulation | null = null;
	private dice: ActiveDie[] = [];
	private extent = MIN_EXTENT;
	private animate = true;
	private startTime = 0;
	private frameID = 0;
	private settled = false;
	private readonly accent: string;
	// Where the pointer is over the tray (in client coordinates), and the die it's over
	private pointer: { x: number, y: number } | null = null;
	private hovered = -1;

	// Called with the values the dice show, each time they come to rest
	onSettled: ((values: number[]) => void) | null = null;
	// If set, the user can click a die to reroll it; called when they do, just before the die is thrown
	onReroll: (() => void) | null = null;

	// Throws if WebGL is not available
	constructor(container: HTMLElement) {
		this.container = container;

		this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFShadowMap;
		container.appendChild(this.renderer.domElement);

		this.scene = new Scene();
		this.camera = new OrthographicCamera(-1, 1, 1, -1, 1, CAMERA_DISTANCE * 2);

		this.scene.add(new HemisphereLight(0xffffff, 0x9090a0, 1.8));

		const sun = new DirectionalLight(0xffffff, 2.4);
		sun.position.set(-3, 9, 4);
		sun.castShadow = true;
		sun.shadow.mapSize.set(1024, 1024);
		sun.shadow.camera.left = -7;
		sun.shadow.camera.right = 7;
		sun.shadow.camera.top = 7;
		sun.shadow.camera.bottom = -7;
		sun.shadow.camera.near = 1;
		sun.shadow.camera.far = 30;
		sun.shadow.radius = 4;
		sun.shadow.bias = -0.0005;
		this.scene.add(sun);

		this.floor = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.28 }));
		this.floor.rotation.x = -Math.PI / 2;
		this.floor.receiveShadow = true;
		this.scene.add(this.floor);

		this.resizeObserver = new ResizeObserver(() => this.resize());
		this.resizeObserver.observe(container);
		this.resize();

		this.accent = getComputedStyle(container).getPropertyValue('--fs-accent').trim() || 'rgb(22, 119, 255)';

		this.renderer.domElement.addEventListener('pointermove', this.onPointerMove);
		this.renderer.domElement.addEventListener('pointerleave', this.onPointerLeave);
		this.renderer.domElement.addEventListener('click', this.onClick);
	}

	// Throws the dice; `onSettled` is called once they have all come to rest.
	// If `animate` is false they are shown at rest straight away (and so are rerolls).
	roll = (dice: DieResult[], animate: boolean) => {
		cancelAnimationFrame(this.frameID);
		this.dice.forEach(d => this.scene.remove(d.mesh));
		this.dice = [];
		this.hovered = -1;

		// More dice need a bigger tray
		const extra = Math.max(0, dice.length - 3);
		this.extent = { x: MIN_EXTENT.x + (extra * 0.7), z: MIN_EXTENT.z + (extra * 0.35) };
		this.fitCamera();

		const simulation = DiceLogic.simulate(dice, this.getTrayBounds());
		this.simulation = simulation;
		this.dice = simulation.tracks.map((track, n) => {
			// In a pair, the second die is light so the two can be told apart
			const style = ((simulation.tracks.length === 2) && (n === 1)) ? LIGHT_DIE : DARK_DIE;
			const mesh = new Mesh(this.getGeometry(track.definition), this.getMaterial(track.definition, style));
			mesh.castShadow = true;
			this.scene.add(mesh);

			return {
				track: track,
				mesh: mesh,
				style: style
			};
		});

		this.animate = animate;
		this.play();
	};

	dispose = () => {
		cancelAnimationFrame(this.frameID);
		this.onSettled = null;
		this.onReroll = null;
		this.resizeObserver.disconnect();
		this.renderer.domElement.removeEventListener('pointermove', this.onPointerMove);
		this.renderer.domElement.removeEventListener('pointerleave', this.onPointerLeave);
		this.renderer.domElement.removeEventListener('click', this.onClick);

		this.geometries.forEach(g => g.dispose());
		this.materials.forEach(m => {
			m.map?.dispose();
			m.dispose();
		});
		this.floor.geometry.dispose();
		this.floor.material.dispose();

		this.renderer.dispose();
		this.renderer.forceContextLoss();
		this.renderer.domElement.remove();
	};

	// Plays the current simulation from the start
	private play = () => {
		const simulation = this.simulation;
		if (!simulation) {
			return;
		}

		cancelAnimationFrame(this.frameID);
		this.settled = false;

		const now = performance.now();
		this.startTime = this.animate ? now : now - (simulation.duration * 1000);
		this.frame(now);
	};

	private frame = (now: number) => {
		const simulation = this.simulation;
		if (!simulation) {
			return;
		}

		const time = (now - this.startTime) / 1000;
		this.dice.forEach(die => {
			const pose = DiceLogic.getPose(simulation, die.track, time);
			die.mesh.position.copy(pose.position);
			die.mesh.quaternion.copy(pose.quaternion);
		});

		this.render();

		if (time < simulation.duration) {
			this.frameID = requestAnimationFrame(this.frame);
		} else {
			this.frameID = 0;
			this.settled = true;
			this.onSettled?.(simulation.tracks.map(t => t.result.value));

			// The pointer may already be over a die
			this.updateHover();
		}
	};

	private canReroll = () => {
		return this.settled && (this.onReroll !== null);
	};

	// The index of the die at a point on the screen, or -1
	private getDieAt = (clientX: number, clientY: number) => {
		const rect = this.renderer.domElement.getBoundingClientRect();
		const pointer = new Vector2(
			(((clientX - rect.left) / rect.width) * 2) - 1,
			1 - (((clientY - rect.top) / rect.height) * 2)
		);

		this.raycaster.setFromCamera(pointer, this.camera);
		const [ hit ] = this.raycaster.intersectObjects(this.dice.map(d => d.mesh), false);
		return hit ? this.dice.findIndex(d => d.mesh === hit.object) : -1;
	};

	// A die that can be clicked to reroll it has its edges picked out in the accent colour
	private setHovered = (index: number) => {
		if (index === this.hovered) {
			return false;
		}

		const set = (n: number, highlight: boolean) => {
			const die = this.dice[n];
			if (die) {
				const style = highlight ? { ...die.style, name: `${die.style.name}-highlight`, rim: this.accent } : die.style;
				die.mesh.material = this.getMaterial(die.track.definition, style);
			}
		};

		set(this.hovered, false);
		set(index, true);
		this.hovered = index;
		return true;
	};

	private updateHover = () => {
		const index = (this.pointer && this.canReroll()) ? this.getDieAt(this.pointer.x, this.pointer.y) : -1;
		this.renderer.domElement.style.cursor = (index !== -1) ? 'pointer' : '';
		if (this.setHovered(index)) {
			this.render();
		}
	};

	private onPointerMove = (event: PointerEvent) => {
		this.pointer = { x: event.clientX, y: event.clientY };
		this.updateHover();
	};

	private onPointerLeave = () => {
		this.pointer = null;
		this.updateHover();
	};

	private onClick = (event: MouseEvent) => {
		const simulation = this.simulation;
		if (!simulation || !this.canReroll()) {
			return;
		}

		const index = this.getDieAt(event.clientX, event.clientY);
		if (index === -1) {
			return;
		}

		// As with any roll, the new value is decided first
		const value = Random.die(simulation.tracks[index].definition.sides);

		let rerolled: DiceSimulation;
		try {
			rerolled = DiceLogic.reroll(simulation, index, value, this.getTrayBounds());
		} catch (err) {
			console.error(err);
			return;
		}

		this.simulation = rerolled;
		this.dice.forEach((die, n) => die.track = rerolled.tracks[n]);
		this.setHovered(-1);
		this.renderer.domElement.style.cursor = '';

		this.onReroll?.();
		this.play();
	};

	private render = () => {
		this.renderer.render(this.scene, this.camera);
	};

	private resize = () => {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		if ((width === 0) || (height === 0)) {
			return;
		}

		this.renderer.setSize(width, height, false);
		this.fitCamera();
		this.render();
	};

	// Move the camera back far enough to show the whole tray, whatever shape it is
	private fitCamera = () => {
		const width = this.container.clientWidth || 460;
		const height = this.container.clientHeight || 200;
		const aspect = width / height;

		const halfHeight = Math.max(this.extent.z, this.extent.x / aspect);
		this.camera.left = -halfHeight * aspect;
		this.camera.right = halfHeight * aspect;
		this.camera.top = halfHeight;
		this.camera.bottom = -halfHeight;

		this.camera.position.copy(LOOK_AT).addScaledVector(CAMERA_DIRECTION, CAMERA_DISTANCE);
		// The far side of the table is at the top of the view (which still holds when looking straight down)
		this.camera.up.set(0, 0, -1);
		this.camera.lookAt(LOOK_AT);
		this.camera.updateProjectionMatrix();
		this.camera.updateMatrixWorld();
	};

	// The inside of the tray is whatever part of the table the camera can see
	private getTrayBounds = (): TrayBounds => {
		// Where the line of sight through a corner of the view reaches the given height
		const corner = (x: number, y: number, height: number) => {
			const origin = new Vector3(x, y, -1).unproject(this.camera);
			const direction = new Vector3(x, y, 1).unproject(this.camera).sub(origin).normalize();
			return origin.addScaledVector(direction, (height - origin.y) / direction.y);
		};

		// Which height is the tighter fit depends on which way the edge of the view leans, so check both
		const heights = [ 0, DIE_TOP_HEIGHT ];
		const left = heights.flatMap(h => [ corner(-1, -1, h).x, corner(-1, 1, h).x ]);
		const right = heights.flatMap(h => [ corner(1, -1, h).x, corner(1, 1, h).x ]);
		const far = heights.map(h => corner(0, 1, h).z);
		const near = heights.map(h => corner(0, -1, h).z);

		return {
			minX: Math.max(...left) + WALL_MARGIN,
			maxX: Math.min(...right) - WALL_MARGIN,
			minZ: Math.max(...far) + WALL_MARGIN,
			maxZ: Math.min(...near) - WALL_MARGIN
		};
	};

	// Each scene has its own copy, so disposing one scene can't affect another
	private getGeometry = (definition: DieDefinition) => {
		let geometry = this.geometries.get(definition.type);
		if (!geometry) {
			geometry = definition.geometry.clone();
			this.geometries.set(definition.type, geometry);
		}

		return geometry;
	};

	private getMaterial = (definition: DieDefinition, style: DieStyle) => {
		const key = `${definition.type}-${style.name}`;
		let material = this.materials.get(key);
		if (!material) {
			const texture = new CanvasTexture(drawAtlas(definition, style));
			texture.colorSpace = SRGBColorSpace;
			texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

			material = new MeshPhysicalMaterial({
				map: texture,
				roughness: 0.45,
				metalness: 0,
				clearcoat: 0.6,
				clearcoatRoughness: 0.3
			});
			this.materials.set(key, material);
		}

		return material;
	};
}
