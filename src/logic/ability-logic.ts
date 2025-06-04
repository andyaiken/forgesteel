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
			AbilityKeyword.Scroll,
			AbilityKeyword.Strike,
			AbilityKeyword.Telekinesis,
			AbilityKeyword.Telepathy,
			AbilityKeyword.Void,
			AbilityKeyword.Waist,
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

	static usesPotency = (powerRoll: PowerRoll) => {
		const match = (tier: string) => {
			return /(<|>|=)\s*(weak|average|avg|strong)/.test(tier);
		};

		return [ powerRoll.tier1, powerRoll.tier2, powerRoll.tier3 ].some(tier => match(tier));
	};

	static getTierEffect = (value: string, tier: number, ability: Ability, hero: Hero | undefined) => {
		return value
			.split(';')
			.map(section => section.trim())
			.map((section, n) => {
				if (hero && (n === 0) && [ 'damage', 'dmg' ].some(s => section.toLowerCase().endsWith(s))) {
					let value = 0;
					let sign = '+';
					const dice: string[] = [];
					const characteristics: Characteristic[] = [];
					const types: string[] = [];

					const hasMelee = ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon);
					const hasRanged = ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon);

					const dmgKits = HeroLogic
						.getKitDamageBonuses(hero)
						.filter(dmg => {
							switch (dmg.type) {
								case 'melee':
									return hasMelee;
								case 'ranged':
									return hasRanged;
							}
						});

					const hasMeleeXorRanged = (hasMelee && !hasRanged) || (!hasMelee && hasRanged);
					if ((dmgKits.length === 1) && hasMeleeXorRanged) {
						// There's only one applicable kit bonus, and the ability can only be used in one mode
						const dmg = dmgKits[0];
						switch (tier) {
							case 1:
								value += dmg.tier1;
								break;
							case 2:
								value += dmg.tier2;
								break;
							case 3:
								value += dmg.tier3;
								break;
						}
					}

					const dmgFeatures = HeroLogic.getFeatureDamageBonuses(hero, ability);
					value += Collections.sum(dmgFeatures, x => x.value);

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

	static getTextEffect = (text: string, hero: Hero | undefined) => {
		// Potency: [weak | average | strong]
		if (hero) {
			text = text
				.replace(/<\s*[[({]?weak[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'weak')}`)
				.replace(/<\s*[[({]?average[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'average')}`)
				.replace(/<\s*[[({]?avg[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'average')}`)
				.replace(/<\s*[[({]?strong[\])}]?/gi, `< ${HeroLogic.calculatePotency(hero, 'strong')}`);
		}

		// Equal to [N times] your [Characteristic(s)] score
		if (hero) {
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
		}

		// Equal to [N times] your level
		if (hero) {
			const lvlRegex = /equal to[^,.;:]your level/gi;
			[ ...text.matchAll(lvlRegex) ].map(r => r[0]).forEach(str => {
				const constant = AbilityLogic.getConstant(str);
				const value = hero.class ? hero.class.level : 1;
				const multiplier = AbilityLogic.getMultiplier(str);
				text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
			});
		}

		// Equal to [N times] your recovery value
		if (hero) {
			const recRegex = /equal to[^,.;:]your recovery value/gi;
			[ ...text.matchAll(recRegex) ].map(r => r[0]).forEach(str => {
				const constant = AbilityLogic.getConstant(str);
				const value = HeroLogic.getRecoveryValue(hero);
				const multiplier = AbilityLogic.getMultiplier(str);
				text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
			});
		}

		// Up to [N times] your speed
		if (hero) {
			text = text.replace('a number of squares equal to your speed', 'up to your speed');
			text = text.replace('a number of squares up to your speed', 'up to your speed');
			const speedRegex = /up to[^,.;:]your speed/gi;
			[ ...text.matchAll(speedRegex) ].map(r => r[0]).forEach(str => {
				const constant = AbilityLogic.getConstant(str);
				const value = HeroLogic.getSpeed(hero);
				const multiplier = AbilityLogic.getMultiplier(str);
				text = text.replace(str, `up to ${constant + (Math.floor(value * multiplier))} squares`);
			});
		}

		// Potencies
		const potencyRegex = /[MARIP]\s*<\s*\[?(\d+|weak|average|avg|strong)\]?,?/gi;
		[ ...text.matchAll(potencyRegex) ].map(r => r[0]).forEach(str => {
			const x = str.endsWith(',') ? str.substring(0, str.length - 1) : str;
			text = text.replace(str, `\`${x}\``);
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
