import { DiceLogic, TrayBounds } from '@/logic/dice-logic';
import { describe, expect, it } from 'vitest';
import { DieType } from '@/enums/die-type';
import { Random } from '@/utils/random';

const countValues = (values: number[]) => {
	const counts = new Map<number, number>();
	values.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
	return counts;
};

describe('getDefinition', () => {
	it('builds a d10 as a d20 numbered 1 to 10 twice', () => {
		const d10 = DiceLogic.getDefinition(DieType.D10);
		const counts = countValues(d10.faces.map(f => f.value));

		expect(d10.faces).toHaveLength(20);
		expect([ ...counts.keys() ].sort((a, b) => a - b)).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]);
		expect([ ...counts.values() ].every(c => c === 2)).toBe(true);
	});

	it('gives opposite faces of the d10 values that add up to 11', () => {
		const d10 = DiceLogic.getDefinition(DieType.D10);

		d10.faces.forEach(face => {
			const opposite = d10.faces.find(f => f.normal.dot(face.normal) < -0.999);
			expect(opposite).toBeDefined();
			expect(face.value + (opposite?.value || 0)).toBe(11);
		});
	});

	it('never puts the same number on two d10 faces that share an edge', () => {
		const d10 = DiceLogic.getDefinition(DieType.D10);

		// On an icosahedron, faces that share an edge have normals ~41.8 degrees apart
		d10.faces.forEach((a, i) => d10.faces.forEach((b, j) => {
			if ((i !== j) && (a.normal.dot(b.normal) > 0.74)) {
				expect(a.value).not.toBe(b.value);
			}
		}));
	});

	it('builds a d3 as a cube numbered 1 to 3 twice, with matching opposite faces', () => {
		const d3 = DiceLogic.getDefinition(DieType.D3);

		expect(d3.faces).toHaveLength(6);
		d3.faces.forEach(face => {
			const opposite = d3.faces.find(f => f.normal.dot(face.normal) < -0.999);
			expect(opposite?.value).toBe(face.value);
		});
		expect([ ...countValues(d3.faces.map(f => f.value)).values() ].every(c => c === 2)).toBe(true);
	});

	it('builds a d6 whose opposite faces add up to 7', () => {
		const d6 = DiceLogic.getDefinition(DieType.D6);

		expect(d6.faces.map(f => f.value).sort()).toEqual([ 1, 2, 3, 4, 5, 6 ]);
		d6.faces.forEach(face => {
			const opposite = d6.faces.find(f => f.normal.dot(face.normal) < -0.999);
			expect(face.value + (opposite?.value || 0)).toBe(7);
		});
	});
});

describe('simulate', () => {
	// The tray in a typical 460 x 200 pixel panel
	const bounds: TrayBounds = { minX: -3.22, maxX: 3.22, minZ: -1.01, maxZ: 1.68 };
	const types = [ DieType.D3, DieType.D6, DieType.D10 ];

	it.each(types)('lands a %s on the rolled value, flat, readable and inside the tray', type => {
		const rng = Random.getSeededRNG(`simulate-${type}`);
		const definition = DiceLogic.getDefinition(type);

		for (let n = 0; n < 40; ++n) {
			const value = Random.die(definition.sides, rng);
			const simulation = DiceLogic.simulate([ { type: type, value: value } ], bounds, rng);
			const [ track ] = simulation.tracks;

			// Never sinks into the table
			for (let frame = 0; frame < simulation.frameCount; frame += 5) {
				const pose = DiceLogic.getPose(simulation, track, frame / 120);
				const lowest = Math.min(...definition.vertices.map(v => v.clone().applyQuaternion(pose.quaternion).y + pose.position.y));
				expect(lowest).toBeGreaterThan(-1e-6);
			}

			const rest = DiceLogic.getPose(simulation, track, simulation.duration);
			const top = DiceLogic.getTopFace(definition, rest.quaternion);
			expect(top.value).toBe(value);
			expect(top.normal.clone().applyQuaternion(rest.quaternion).y).toBeGreaterThan(0.995);

			expect(rest.position.x).toBeGreaterThan(bounds.minX);
			expect(rest.position.x).toBeLessThan(bounds.maxX);
			expect(rest.position.z).toBeGreaterThan(bounds.minZ);
			expect(rest.position.z).toBeLessThan(bounds.maxZ);

			// The label on top faces the viewer (points towards -Z), to within the die's symmetry
			const up = top.up.clone().applyQuaternion(rest.quaternion);
			expect(Math.abs(Math.atan2(up.x, -up.z))).toBeLessThanOrEqual((Math.PI / 3) + 1e-6);
		}
	});

	it.each(types)('only ever relabels a %s with a rotation that maps its shape onto itself', type => {
		const rng = Random.getSeededRNG(`symmetry-${type}`);
		const definition = DiceLogic.getDefinition(type);
		const keys = new Set(definition.vertices.map(v => v.toArray().map(x => x.toFixed(3)).join()));

		for (let n = 0; n < 20; ++n) {
			const simulation = DiceLogic.simulate([ { type: type, value: Random.die(definition.sides, rng) } ], bounds, rng);
			const relabel = simulation.tracks[0].relabel;

			definition.vertices.forEach(v => {
				const moved = v.clone().applyQuaternion(relabel);
				expect(keys.has(moved.toArray().map(x => (Math.abs(x) < 5e-4 ? 0 : x).toFixed(3)).join())).toBe(true);
			});
		}
	});

	it('settles a power roll in a few seconds without the dice overlapping', () => {
		const rng = Random.getSeededRNG('power-roll');

		for (let n = 0; n < 20; ++n) {
			const dice = [ { type: DieType.D10, value: Random.die(10, rng) }, { type: DieType.D10, value: Random.die(10, rng) } ];
			const simulation = DiceLogic.simulate(dice, bounds, rng);
			expect(simulation.duration).toBeLessThan(6);

			const [ a, b ] = simulation.tracks.map(t => DiceLogic.getPose(simulation, t, simulation.duration));
			expect(a.position.distanceTo(b.position)).toBeGreaterThan(1.2);
			simulation.tracks.forEach((track, i) => {
				const top = DiceLogic.getTopFace(track.definition, (i === 0 ? a : b).quaternion);
				expect(top.value).toBe(dice[i].value);
			});
		}
	});

	it('refuses a value the die cannot show', () => {
		expect(() => DiceLogic.simulate([ { type: DieType.D3, value: 4 } ], bounds)).toThrow();
	});
});

describe('reroll', () => {
	const bounds: TrayBounds = { minX: -3.22, maxX: 3.22, minZ: -1.01, maxZ: 1.68 };
	const cases: [ DieType, number ][] = [ [ DieType.D10, 2 ], [ DieType.D6, 1 ], [ DieType.D3, 3 ] ];

	const expectSamePose = (a: ReturnType<typeof DiceLogic.getPose>, b: ReturnType<typeof DiceLogic.getPose>) => {
		expect(a.position.distanceTo(b.position)).toBeLessThan(1e-4);
		expect(a.quaternion.angleTo(b.quaternion)).toBeLessThan(1e-3);
	};

	it.each(cases)('rerolls one %s (of %i) onto the new value, leaving the others where they were', (type, count) => {
		const rng = Random.getSeededRNG(`reroll-${type}`);
		const sides = DiceLogic.getDefinition(type).sides;

		for (let n = 0; n < 12; ++n) {
			let simulation = DiceLogic.simulate(Array.from({ length: count }, () => ({ type: type, value: Random.die(sides, rng) })), bounds, rng);

			// Reroll the same throw twice, to check a reroll can itself be rerolled
			for (let r = 0; r < 2; ++r) {
				const index = Random.randomNumber(count, rng);
				const value = Random.die(sides, rng);
				const before = simulation.tracks.map(t => DiceLogic.getPose(simulation, t, simulation.duration));

				const rerolled = DiceLogic.reroll(simulation, index, value, bounds, rng);
				const after = rerolled.tracks.map(t => DiceLogic.getPose(rerolled, t, rerolled.duration));

				rerolled.tracks.forEach((track, i) => {
					// No die jumps (or changes its numbers) as the reroll starts
					expectSamePose(DiceLogic.getPose(rerolled, track, 0), before[i]);

					const top = DiceLogic.getTopFace(track.definition, after[i].quaternion);
					expect(top.normal.clone().applyQuaternion(after[i].quaternion).y).toBeGreaterThan(0.995);
					expect(after[i].position.x).toBeGreaterThan(bounds.minX);
					expect(after[i].position.x).toBeLessThan(bounds.maxX);
					expect(after[i].position.z).toBeGreaterThan(bounds.minZ);
					expect(after[i].position.z).toBeLessThan(bounds.maxZ);

					if (i === index) {
						expect(track.result.value).toBe(value);
						expect(top.value).toBe(value);
					} else {
						expect(track.result).toEqual(simulation.tracks[i].result);
						expect(top.value).toBe(track.result.value);
						expectSamePose(DiceLogic.getPose(rerolled, track, rerolled.duration / 2), before[i]);
						expectSamePose(after[i], before[i]);

						// The rerolled die doesn't land on, or in, this one
						const minimum = track.definition.inradius + rerolled.tracks[index].definition.inradius;
						expect(after[i].position.distanceTo(after[index].position)).toBeGreaterThan(minimum - 1e-3);
					}
				});

				simulation = rerolled;
			}
		}
	});

	it('refuses a value the die cannot show', () => {
		const simulation = DiceLogic.simulate([ { type: DieType.D3, value: 1 } ], bounds);
		expect(() => DiceLogic.reroll(simulation, 0, 4, bounds)).toThrow();
	});
});
