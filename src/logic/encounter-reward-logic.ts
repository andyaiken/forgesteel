import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { Options } from '@/models/options';
import { OptionsLogic } from '@/logic/options-logic';

export type EncounterRewardTarget = 'party' | 'present';

export class EncounterRewardLogic {
	static getPresentHeroes = (encounterHeroes: Hero[], persistedHeroes: Hero[]) => {
		return encounterHeroes.filter(encounterHero => {
			const persisted = persistedHeroes.find(h => h.id === encounterHero.id);
			return persisted && HeroLogic.isActive(persisted);
		});
	};

	static getPartyHeroes = (heroes: Hero[], party: string) => {
		return heroes.filter(h => h.folder === party);
	};

	static getTargetHeroes = (target: EncounterRewardTarget, encounterHeroes: Hero[], persistedHeroes: Hero[], party: string) => {
		switch (target) {
			case 'present':
				return EncounterRewardLogic.getPresentHeroes(encounterHeroes, persistedHeroes);
			case 'party':
				return party !== ''
					? EncounterRewardLogic.getPartyHeroes(persistedHeroes, party)
					: EncounterRewardLogic.getPresentHeroes(encounterHeroes, persistedHeroes);
		}
	};

	static getDefaultVictories = (options: Options, heroes: Hero[]) => {
		return OptionsLogic.getHeroVictories(options, heroes);
	};
}
