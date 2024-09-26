import { Random } from './random';

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

		return collection.sort((a, b) => {
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

	static distinct = <T>(collection: T[], key: (item: T) => string) => {
		const seen = new Set();
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
}
