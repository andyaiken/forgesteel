import { Options } from '../models/options';

export class OptionsLogic {
	static getPartyDescription = (options: Options) => {
		if (options.heroParty) {
			return `the heroes in ${options.heroParty}`;
		}

		const heroes = `${options.heroCount === 1 ? 'hero' : 'heroes'}`;
		const victories = `${options.heroVictories === 1 ? 'victory' : 'victories'}`;

		if (options.heroVictories > 0) {
			return `a party of ${options.heroCount} ${heroes} at level ${options.heroLevel} with ${options.heroVictories} ${victories}`;
		}

		return `a party of ${options.heroCount} ${heroes} at level ${options.heroLevel}`;
	};
}
