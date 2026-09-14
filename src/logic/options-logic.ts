import { Collections } from '@/utils/collections';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';

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

	static getHeroCount = (options: Options, heroes: Hero[]) => {
		let heroCount = options.heroCount;
		if (options.heroParty) {
			const party = HeroLogic.getPartyHeroes(heroes, options.heroParty);
			heroCount = party.length;
			party.forEach(h => {
				const retainers = HeroLogic.getRetainers(h);
				if (retainers.length > 0) {
					heroCount += 1;
				}
			});
		}
		return heroCount;
	};

	static getHeroLevel = (options: Options, heroes: Hero[]) => {
		let heroLevel = options.heroLevel;
		if (options.heroParty) {
			const party = HeroLogic.getPartyHeroes(heroes, options.heroParty);
			heroLevel = Math.round(Collections.mean(party, h => h.class ? h.class.level : 1));
		}
		return heroLevel;
	};

	static getHeroVictories = (options: Options, heroes: Hero[]) => {
		let heroVictories = options.heroVictories;
		if (options.heroParty) {
			const party = HeroLogic.getPartyHeroes(heroes, options.heroParty);
			heroVictories = Math.round(Collections.mean(party, h => h.state.victories));
		}
		return heroVictories;
	};
}
