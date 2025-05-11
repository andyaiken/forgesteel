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
		const mainBonus = distance.within ? 0 : bonus;
		const withinBonus = distance.within ? bonus : 0;

		const result = [
			distance.type === AbilityDistanceType.Line ?
				`Line ${distance.value + mainBonus}x${distance.value2 + mainBonus}`
				:
				`${distance.type} ${distance.value + mainBonus}`,
			distance.within ?
				`within ${distance.within + withinBonus}`
				: undefined,
			distance.qualifier ?
				`(${distance.qualifier})`
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
		const dmgBonus = HeroLogic.getFeatureDamageBonus(hero, ability);

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

					value += dmgBonus;

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

				return AbilityLogic.getTextEffect(section, hero);
			})
			.join('; ');
	};

	static getTextEffect = (text: string, hero: Hero) => {
		// Modify text to remove weak / average / strong
		text = text
			.replace(/<\s*[[({]?weak[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'weak')}`)
			.replace(/<\s*[[({]?average[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'average')}`)
			.replace(/<\s*[[({]?avg[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'average')}`)
			.replace(/<\s*[[({]?strong[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'strong')}`);

		// Equal to [N times] your [Characteristic(s)] score
		const charRegex = /equal to[^,.;:]*your[^,.;:]*score/gi;
		[ ...text.matchAll(charRegex) ].map(r => r[0]).forEach(str => {
			const options: number[] = [];
			[
				Characteristic.Might,
				Characteristic.Agility,
				Characteristic.Reason,
				Characteristic.Intuition,
				Characteristic.Presence
			].forEach(ch => {
				if (str.toLowerCase().includes('highest characteristic') || str.toLowerCase().includes(ch.toLowerCase())) {
					options.push(HeroLogic.getCharacteristic(hero, ch));
				}
			});
			const value = Math.max(...options);

			const constant = AbilityLogic.getConstant(str);
			const multiplier = AbilityLogic.getMultiplier(str);
			text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
		});

		// Equal to [N times] your level
		const lvlRegex = /equal to[^,.;:]your level/gi;
		[ ...text.matchAll(lvlRegex) ].map(r => r[0]).forEach(str => {
			const constant = AbilityLogic.getConstant(str);
			const value = hero.class ? hero.class.level : 1;
			const multiplier = AbilityLogic.getMultiplier(str);
			text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
		});

		// Equal to [N times] your recovery value
		const recRegex = /equal to[^,.;:]your recovery value/gi;
		[ ...text.matchAll(recRegex) ].map(r => r[0]).forEach(str => {
			const constant = AbilityLogic.getConstant(str);
			const value = HeroLogic.getRecoveryValue(hero);
			const multiplier = AbilityLogic.getMultiplier(str);
			text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
		});

		// Up to [N times] your speed
		text = text.replace('a number of squares equal to your speed', 'up to your speed');
		text = text.replace('a number of squares up to your speed', 'up to your speed');
		const speedRegex = /up to[^,.;:]your speed/gi;
		[ ...text.matchAll(speedRegex) ].map(r => r[0]).forEach(str => {
			const constant = AbilityLogic.getConstant(str);
			const value = HeroLogic.getSpeed(hero);
			const multiplier = AbilityLogic.getMultiplier(str);
			text = text.replace(str, `up to ${constant + (Math.floor(value * multiplier))} squares`);
		});

		return text;
	};

	static getConstant = (text: string) => {
		let constant = 0;

		const constantMatch = text.match(/(?<c>\d+)\s*(\+|plus)/);
		if (constantMatch && constantMatch.groups) {
			constant = parseInt(constantMatch.groups['c']);
		}

		return constant;
	};

	static getMultiplier = (text: string) => {
		let multiplier = 1;
		const x: { n: number, words: string[] }[] = [
			{
				n: 0.5,
				words: [
					'half'
				]
			},
			{
				n: 2,
				words: [
					'twice',
					'two times',
					'2x',
					'2 x',
					'2×',
					'2 ×'
				]
			},
			{
				n: 3,
				words: [
					'thrice',
					'three times',
					'3x',
					'3 x',
					'3×',
					'3 ×'
				]
			},
			{
				n: 4,
				words: [
					'four times',
					'4x',
					'4 x',
					'4×',
					'4 ×'
				]
			},
			{
				n: 5,
				words: [
					'five times',
					'5x',
					'5 x',
					'5×',
					'5 ×'
				]
			},
			{
				n: 6,
				words: [
					'six times',
					'6x',
					'6 x',
					'6×',
					'6 ×'
				]
			},
			{
				n: 7,
				words: [
					'seven times',
					'7x',
					'7 x',
					'7×',
					'7 ×'
				]
			},
			{
				n: 8,
				words: [
					'eight times',
					'8x',
					'8 x',
					'8×',
					'8 ×'
				]
			},
			{
				n: 9,
				words: [
					'nine times',
					'9x',
					'9 x',
					'9×',
					'9 ×'
				]
			},
			{
				n: 10,
				words: [
					'ten times',
					'10x',
					'10 x',
					'10×',
					'10 ×'
				]
			}
		];
		x.forEach(set => {
			if (set.words.some(w => text.toLowerCase().includes(w))) {
				multiplier = set.n;
			}
		});

		return multiplier;
	};
}
