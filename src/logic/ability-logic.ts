import { Ability, AbilityDistance } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { PowerRoll } from '../models/power-roll';

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

	static usesPotency = (powerRoll: PowerRoll) => {
		const match = (tier: string) => {
			return /(<|>|=)\s*(weak|average|avg|strong)/.test(tier);
		};

		return [ powerRoll.tier1, powerRoll.tier2, powerRoll.tier3 ].some(tier => match(tier));
	};

	static getTierEffect = (value: string, tier: number, ability: Ability, hero: Hero) => {
		const dmgMelee = HeroLogic.getMeleeDamageBonus(hero, ability);
		const dmgRanged = HeroLogic.getRangedDamageBonus(hero, ability);

		return value
			.split(';')
			.map(section => section.trim())
			.map(section => {
				if (section.toLowerCase().includes('damage') || section.toLowerCase().includes('dmg')){
					// Modify section to calculate characteristic bonuses
					let value = 0;
					let sign = '+';
					const dice: string[] = [];
					const characteristics: Characteristic[] = [];
					const types: string[] = [];

					const hasMeleeAndRanged = ability.distance.some(d => d.type === AbilityDistanceType.Melee) && ability.distance.some(d => d.type === AbilityDistanceType.Ranged);
					if (dmgMelee && !dmgRanged && !hasMeleeAndRanged) {
						switch (tier) {
							case 1:
								value += dmgMelee.tier1;
								break;
							case 2:
								value += dmgMelee.tier2;
								break;
							case 3:
								value += dmgMelee.tier3;
								break;
						}
					}
					if (!dmgMelee && dmgRanged && !hasMeleeAndRanged) {
						switch (tier) {
							case 1:
								value += dmgRanged.tier1;
								break;
							case 2:
								value += dmgRanged.tier2;
								break;
							case 3:
								value += dmgRanged.tier3;
								break;
						}
					}
					if (dmgMelee && dmgRanged && (dmgMelee.tier1 === dmgRanged.tier1) && (dmgMelee.tier2 === dmgRanged.tier2) && (dmgMelee.tier3 === dmgRanged.tier3)) {
						switch (tier) {
							case 1:
								value += dmgMelee.tier1;
								break;
							case 2:
								value += dmgMelee.tier2;
								break;
							case 3:
								value += dmgMelee.tier3;
								break;
						}
					}

					section.toLowerCase().split(' ').forEach(token => {
						if ((token === 'damage') || (token === 'dmg')) {
							// Damage; ignore
						} else if (token === 'or') {
							// Ignore
						} else if (/\d+d\d+/.test(token)) {
							dice.push(token);
						} else if (!isNaN(parseInt(token))) {
							value += parseInt(token);
						} else if ((token === '+') || (token === '-')) {
							sign = token;
						} else if ((token === 'might') || (token === 'might,') || (token === 'm') || (token === 'm,')) {
							characteristics.push(Characteristic.Might);
						} else if ((token === 'agility') || (token === 'agility,') || (token === 'a') || (token === 'a,')) {
							characteristics.push(Characteristic.Agility);
						} else if ((token === 'reason') || (token === 'reason,') || (token === 'r') || (token === 'r,')) {
							characteristics.push(Characteristic.Reason);
						} else if ((token === 'intuition') || (token === 'intuition,') || (token === 'i') || (token === 'i,')) {
							characteristics.push(Characteristic.Intuition);
						} else if ((token === 'presence') || (token === 'presence,') || (token === 'p') || (token === 'p,')) {
							characteristics.push(Characteristic.Presence);
						} else {
							types.push(token);
						}
					});

					const charValues = characteristics.map(ch => HeroLogic.getCharacteristic(hero, ch));
					const maxCharValue = Collections.max(charValues, n => n) || 0;
					let total: number | string = sign === '+' ? value + maxCharValue : value - maxCharValue;
					if (dice.length > 0) {
						total = `${dice.join(' + ')} + ${total}`;
					}
					const damage = [ ...types, 'damage' ].join(' ');
					return `${total} ${damage}`;
				}

				if (section.toLowerCase().includes('weak') || section.toLowerCase().includes('average') || section.toLowerCase().includes('avg') || section.toLowerCase().includes('strong')) {
					// Modify text to remove weak / average / strong
					const weak = HeroLogic.calculatePotency(hero, 'weak').toString();
					const avg = HeroLogic.calculatePotency(hero, 'average').toString();
					const strong = HeroLogic.calculatePotency(hero, 'strong').toString();
					return section
						.replace(/weak,/, `${weak},`)
						.replace(/average,/, `${avg},`)
						.replace(/avg,/, `${avg},`)
						.replace(/strong,/, `${strong},`);
				}

				return section;
			})
			.join('; ');
	};
}
