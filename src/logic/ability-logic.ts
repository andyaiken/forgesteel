import { Ability, AbilityDistance } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { Collections } from '../utils/collections';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';

export class AbilityLogic {
	static getDistance = (distance: AbilityDistance, hero?: Hero, ability?: Ability) => {
		if (distance.type === AbilityDistanceType.Self) {
			return 'Self';
		}

		if (distance.type === AbilityDistanceType.Special) {
			return distance.special || 'Special';
		}

		const bonus = (hero && ability) ? HeroLogic.getDistanceBonus(hero, ability, distance) : 0;

		const result = [
			distance.type === AbilityDistanceType.Line
				? `Line ${distance.value + bonus}x${distance.value2 + bonus}`
				: `${distance.type} ${distance.value + bonus}`,
			distance.within ? `within ${distance.within}` : undefined,
			distance.qualifier
				? `(${distance.qualifier})`
				: undefined
		].filter(x => x).join(' ');

		return result;
	};

	static panelWidth = (ability: Ability) => {
		const descLength = Math.round(ability.description.split(' ').length / 10);
		const preEffectLength = Math.round(ability.preEffect.split(' ').length / 10);
		const powerRollLength = ability.powerRoll ? 6 : 0;
		const effectLength = Math.round(ability.effect.split(' ').length / 10);
		const alternateLength = Collections.sum(ability.alternateEffects, e => Math.round(e.split(' ').length / 10));
		const spendLength = Collections.sum(ability.spend, e => Math.round(e.effect.split(' ').length / 10));
		const persistLength = Collections.sum(ability.persistence, e => Math.round(e.effect.split(' ').length / 10));

		const length = descLength + preEffectLength + powerRollLength + effectLength + alternateLength + spendLength + persistLength;
		return Math.max(1, Math.round(length / 20));
	};
}
