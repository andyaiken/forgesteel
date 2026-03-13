import { Random } from '@/utils/random';

export class Collections {
	static sort = <T>(collection: T[], key: (item: T) => string) => {
		const getText = (item: T) => {
			let k = key(item);
			const starts = [ 'a ', 'the ' ];
			starts.forEach(start => {
				if (k.toLowerCase().startsWith(start)) {
					k = k.substring(start.length);
				}
			});
			return k;
		};

		return [ ...collection ].sort((a, b) => {
			const strA = getText(a);
			const strB = getText(b);
			return strA.localeCompare(strB);
		});
	};

	static shuffle = <T>(collection: T[], rng: () => number = Math.random) => {
		let currentIndex = collection.length;
		while (currentIndex !== 0) {
			const randomIndex = Random.randomNumber(currentIndex, rng);
			currentIndex -= 1;

			const temporaryValue = collection[currentIndex];
			collection[currentIndex] = collection[randomIndex];
			collection[randomIndex] = temporaryValue;
		}

		return collection;
	};

	static draw = <T>(collection: T[], rng: () => number = Math.random) => {
		const index = Random.randomNumber(collection.length, rng);
		return collection[index];
	};

	static distinct = <T, U>(collection: T[], key: (item: T) => U) => {
		const seen = new Set<U>();
		return collection.filter(item => {
			const k = key(item);
			return seen.has(k) ? false : seen.add(k);
		});
	};

	static sum = <T>(collection: T[], callback: (item: T) => number): number => {
		return collection.reduce((sum, item) => sum + callback(item), 0);
	};

	static mean = <T>(collection: T[], callback: (item: T) => number): number => {
		if (collection.length === 0) {
			return 0;
		}

		return Collections.sum(collection, callback) / collection.length;
	};

	static median = <T>(collection: T[], callback: (item: T) => number): number => {
		if (collection.length === 0) {
			return 0;
		}

		const values = collection.map(callback).sort((a, b) => a - b);
		const len = values.length;
		if (len % 2 === 1) {
			return values[Math.floor(len / 2)];
		} else {
			const mid1 = values[len / 2 - 1];
			const mid2 = values[len / 2];
			return (mid1 + mid2) / 2;
		}
	};

	static mode = <T>(collection: T[], callback: (item: T) => number): number => {
		if (collection.length === 0) {
			return 0;
		}

		const values = collection.map(callback);
		const freq: Map<number, number> = new Map();
		for (const val of values) {
			freq.set(val, (freq.get(val) || 0) + 1);
		}
		let maxFreq = 0;
		let mode = 0;
		for (const [ val, count ] of freq) {
			if (count > maxFreq) {
				maxFreq = count;
				mode = val;
			}
		}
		return mode;
	};

	static min = <T>(collection: T[], callback: (item: T) => number): T | null => {
		let item = null;
		let min = Number.MAX_VALUE;

		collection.forEach(i => {
			const value = callback(i);
			if (value < min) {
				item = i;
				min = value;
			}
		});

		return item;
	};

	static max = <T>(collection: T[], callback: (item: T) => number): T | null => {
		let item = null;
		let max = -Number.MAX_VALUE;

		collection.forEach(i => {
			const value = callback(i);
			if (value > max) {
				item = i;
				max = value;
			}
		});

		return item;
	};

	static getPermutations = <T>(inputArr: T[]) => {
		const result: T[][] = [];

		const permute = (arr: T[], m: T[] = []) => {
			if (arr.length === 0) {
				result.push(m);
			} else {
				for (let i = 0; i < arr.length; i++) {
					const curr = arr.slice();
					const next = curr.splice(i, 1);
					permute(curr.slice(), m.concat(next));
				}
			}
		};

		permute(inputArr);

		return result;
	};

	static move = <T>(collection: T[], index: number, direction: 'up' | 'down') => {
		switch (direction) {
			case 'up':
				if ((index >= 1) && (index <= collection.length - 1)) {
					const temp = collection[index - 1];
					collection[index - 1] = collection[index];
					collection[index] = temp;
				}
				break;
			case 'down':
				if ((index >= 0) && (index <= collection.length - 2)) {
					const temp = collection[index + 1];
					collection[index + 1] = collection[index];
					collection[index] = temp;
				}
				break;
		}

		return collection;
	};
}
