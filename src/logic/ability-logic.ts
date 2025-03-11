import { Ability, AbilityDistance } from '../models/ability';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { Hero } from '../models/hero';
import { HeroLogic } from './hero-logic';
import { KitArmor } from '../enums/kit-armor';
import { KitWeapon } from '../enums/kit-weapon';
import { PowerRoll } from '../models/power-roll';

export class AbilityLogic {
	static getKeywords = () => {
		return [
			AbilityKeyword.Animal,
			AbilityKeyword.Animapathy,
			AbilityKeyword.Area,
			AbilityKeyword.Arms,
			AbilityKeyword.Charge,
			AbilityKeyword.Chronopathy,
			AbilityKeyword.Cryokinesis,
			AbilityKeyword.Earth,
			AbilityKeyword.Feet,
			AbilityKeyword.Fire,
			AbilityKeyword.Green,
			AbilityKeyword.Hands,
			AbilityKeyword.Head,
			AbilityKeyword.Implement,
			AbilityKeyword.Magic,
			AbilityKeyword.Melee,
			AbilityKeyword.Metamorphosis,
			AbilityKeyword.Neck,
			AbilityKeyword.Oil,
			AbilityKeyword.Orb,
			AbilityKeyword.Persistent,
			AbilityKeyword.Potion,
			AbilityKeyword.Psionic,
			AbilityKeyword.Pyrokinesis,
			AbilityKeyword.Ranged,
			AbilityKeyword.Resistance,
			AbilityKeyword.Resopathy,
			AbilityKeyword.Ring,
			AbilityKeyword.Rot,
			AbilityKeyword.Routine,
			AbilityKeyword.Strike,
			AbilityKeyword.Telekinesis,
			AbilityKeyword.Telepathy,
			AbilityKeyword.Void,
			AbilityKeyword.Wand,
			AbilityKeyword.Weapon,
			KitArmor.Heavy,
			KitArmor.Light,
			KitArmor.Medium,
			KitArmor.Shield,
			KitWeapon.Bow,
			KitWeapon.Ensnaring,
			KitWeapon.Heavy,
			KitWeapon.Light,
			KitWeapon.Medium,
			KitWeapon.Polearm,
			KitWeapon.Unarmed,
			KitWeapon.Whip
		].sort();
	};

	static getDistance = (distance: AbilityDistance, hero?: Hero, ability?: Ability) => {
		if (distance.type === AbilityDistanceType.Self) {
			if (distance.qualifier) {
				return `Self (${distance.qualifier})`;
			} else {
				return 'Self';
			}
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
		return Math.max(1, Math.round(length / 12));
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
			.map((section, n) => {
				if ((n === 0) && section.toLowerCase().endsWith('damage') || section.toLowerCase().endsWith('dmg')){
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

				if ([ 'weak', 'average', 'avg', 'strong' ].some(p => section.toLowerCase().includes(p))) {
					// Modify text to remove weak / average / strong
					return section
						.replace(/[[({]weak[\])}]/, `${HeroLogic.calculatePotency(hero, 'weak')}`)
						.replace(/[[({]average[\])}]/, `${HeroLogic.calculatePotency(hero, 'average')}`)
						.replace(/[[({]avg[\])}]/, `${HeroLogic.calculatePotency(hero, 'average')}`)
						.replace(/[[({]strong[\])}]/, `${HeroLogic.calculatePotency(hero, 'strong')}`);
				}

				return section;
			})
			.join('; ');
	};
}
