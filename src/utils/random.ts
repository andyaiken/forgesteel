export class Random {
	static die = (sides: number, rng: () => number = Math.random) => {
		return Random.randomNumber(sides, rng) + 1;
	};

	static randomNumber = (max: number, rng: () => number = Math.random) => {
		if (max <= 0) {
			return 0;
		}

		return Math.floor(rng() * max);
	};

	static randomBoolean = (rng: () => number = Math.random) => {
		return Random.randomNumber(2, rng) === 0;
	};

	static randomDecimal = (rng: () => number = Math.random) => {
		return Random.randomNumber(100, rng) / 100;
	};

	static randomColor = (min = 0, max = 256, rng: () => number = Math.random) => {
		const r = Random.randomNumber(max - min, rng) + min;
		const g = Random.randomNumber(max - min, rng) + min;
		const b = Random.randomNumber(max - min, rng) + min;
		return {
			r: r,
			g: g,
			b: b
		};
	};

	static getSeededRNG = (seed: string) => {
		const getHashes = (str: string) => {
			let h1 = 1779033703;
			let h2 = 3144134277;
			let h3 = 1013904242;
			let h4 = 2773480762;

			for (let i = 0, k; i < str.length; i++) {
				k = str.charCodeAt(i);
				h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
				h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
				h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
				h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
			}

			h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
			h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
			h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
			h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

			return [
				(h1 ^ h2 ^ h3 ^ h4) >>> 0,
				(h2 ^ h1) >>> 0,
				(h3 ^ h1) >>> 0,
				(h4 ^ h1) >>> 0
			];
		};

		const getRNG = (a: number, b: number, c: number, d: number) => {
			return () => {
				a >>>= 0;
				b >>>= 0;
				c >>>= 0;
				d >>>= 0;

				let t = (a + b) | 0;
				a = (b ^ b) >>> 9;
				b = c + (c << 3) | 0;
				c = (c << 21) | (c >>> 11);
				d = (d + 1) | 0;
				t = (t + d) | 0;
				c = (c + t) | 0;

				return (t >>> 0) / 4294967296;
			};
		};

		const hashes = getHashes(seed);
		return getRNG(hashes[0], hashes[1], hashes[2], hashes[3]);
	};
}
