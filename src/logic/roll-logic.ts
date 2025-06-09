import { Collections } from '../utils/collections';
import { RollState } from '../enums/roll-state';

export class RollLogic {
	static getOdds = (modifiers: number[], rollState: RollState) => {
		const results = [];

		for (let a = 1; a <= 10; ++a) {
			for (let b = 1; b <= 10; ++b) {
				if (a + b >= 19) {
					results.push(4);
				} else {
					const total = Collections.sum([ a, b, ...modifiers, RollLogic.getBonus(rollState) ], r => r);
					if (total >= 17) {
						// Tier 3
						switch (rollState) {
							case RollState.DoubleBane:
								results.push(2);
								break;
							default:
								results.push(3);
								break;
						}
					} else if (total >= 12) {
						// Tier 2
						switch (rollState) {
							case RollState.DoubleBane:
								results.push(1);
								break;
							case RollState.DoubleEdge:
								results.push(3);
								break;
							default:
								results.push(2);
								break;
						}
					} else {
						// Tier 1
						switch (rollState) {
							case RollState.DoubleEdge:
								results.push(2);
								break;
							default:
								results.push(1);
								break;
						}
					}
				}
			}
		}

		return results;
	};

	static getBonus = (rollState: RollState) => {
		switch (rollState) {
			case RollState.Edge:
				return 2;
			case RollState.Bane:
				return -2;
		}

		return 0;
	};
}
