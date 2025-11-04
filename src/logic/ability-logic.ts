import { Ability, AbilityDistance } from '@/models/ability';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { CreatureLogic } from '@/logic/creature-logic';
import { Format } from '@/utils/format';
import { FormatLogic } from '@/logic/format-logic';
import { Hero } from '@/models/hero';
import { HeroLogic } from '@/logic/hero-logic';
import { KitArmor } from '@/enums/kit-armor';
import { KitWeapon } from '@/enums/kit-weapon';
import { Monster } from '@/models/monster';
import { MonsterLogic } from '@/logic/monster-logic';
import { PowerRoll } from '@/models/power-roll';
import { Utils } from '@/utils/utils';

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
			AbilityKeyword.Performance,
			AbilityKeyword.Persistent,
			AbilityKeyword.Potion,
			AbilityKeyword.Psionic,
			AbilityKeyword.Pyrokinesis,
			AbilityKeyword.Ranged,
			AbilityKeyword.Resistance,
			AbilityKeyword.Resopathy,
			AbilityKeyword.Ring,
			AbilityKeyword.Rot,
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

	static getPanelWidth = (ability: Ability) => {
		const descLength = Math.round(ability.description.split(' ').length / 10);
		const textLength = Collections.sum(ability.sections.filter(s => s.type === 'text'), s => Math.round(s.text.split(' ').length / 10));
		const fieldLength = Collections.sum(ability.sections.filter(s => s.type === 'field'), s => Math.round(s.effect.split(' ').length / 10));
		const rollLength = ability.sections.filter(s => s.type === 'roll').length * 6;

		const length = descLength + textLength + fieldLength + rollLength;
		return Math.max(1, Math.round(length / 12));
	};

	static getDistance = (distance: AbilityDistance, ability?: Ability, hero?: Hero) => {
		if (distance.type === AbilityDistanceType.Self) {
			if (distance.qualifier) {
				return `Self (${distance.qualifier})`;
			} else {
				return 'Self';
			}
		}

		if (distance.type === AbilityDistanceType.Summoner) {
			if (hero) {
				return `Summoner Range (${5 + HeroLogic.getCharacteristic(hero, Characteristic.Reason)})`;
			}

			return 'Summoner Range';
		}

		if (distance.type === AbilityDistanceType.Special) {
			return distance.special || 'Special';
		}

		let bonus = 0;
		if (hero && ability) {
			const abilityCopy = Utils.copy(ability);
			switch (distance.type) {
				case AbilityDistanceType.Melee:
					// The ability if being used as Melee
					// Make sure the ability does not also have the Ranged keyword
					abilityCopy.keywords = abilityCopy.keywords.filter(kw => kw !== AbilityKeyword.Ranged);
					break;
				case AbilityDistanceType.Ranged:
					// The ability if being used as Ranged
					// Make sure the ability does not also have the Melee keyword
					abilityCopy.keywords = abilityCopy.keywords.filter(kw => kw !== AbilityKeyword.Melee);
					break;
			}
			bonus = HeroLogic.getDistanceBonus(hero, abilityCopy);
		}

		const sections: string[] = [];
		switch (distance.type) {
			case AbilityDistanceType.Melee:
			case AbilityDistanceType.Ranged:
				sections.push(`${distance.type} ${distance.value + bonus}`);
				break;
			case AbilityDistanceType.Line:
				sections.push(`${Math.max(distance.value, distance.value2)} x ${Math.min(distance.value, distance.value2)} ${distance.type}`);
				break;
			case AbilityDistanceType.Burst:
			case AbilityDistanceType.Cube:
				sections.push(`${distance.value} ${distance.type}`);
				break;
			default:
				sections.push(`${distance.type} ${distance.value}`);
				break;
		}
		if (distance.within > 0) {
			sections.push(`within ${distance.within}`);
		}
		if (distance.qualifier) {
			sections.push(`(${distance.qualifier})`);
		}
		return sections.filter(x => !!x).join(' ');
	};

	static getDistanceCreature = (distance: AbilityDistance, ability?: Ability, creature?: Hero | Monster) => {
		if (CreatureLogic.isMonster(creature)) {
			return AbilityLogic.getDistance(distance, ability, undefined);
		} else {
			return AbilityLogic.getDistance(distance, ability, creature);
		}
	};

	static usesDamage = (ability: Ability) => {
		return ability.sections
			.filter(s => s.type === 'roll')
			.flatMap(s => [ s.roll.tier1, s.roll.tier2, s.roll.tier3 ])
			.some(tier => tier.includes('damage') || tier.includes('dmg'));
	};

	static usesPotency = (powerRoll: PowerRoll) => {
		const match = (tier: string) => {
			return /(<|>|=)\s*(weak|average|avg|strong)/.test(tier);
		};

		return [ powerRoll.tier1, powerRoll.tier2, powerRoll.tier3 ].some(tier => match(tier));
	};

	static getPowerRollBonusValue = (ability: Ability, creature: Hero | Monster | undefined): number => {
		const rollCharacteristics = this.getPowerRollCharacteristics(ability, creature);
		let rollPowerAmount = 2;// echelon 1 always at least 2
		if (rollCharacteristics.length) {
			rollPowerAmount = Math.max(...rollCharacteristics
				.map(c => CreatureLogic.getCharacteristic(creature, c)));
		} else {
			const rollSections = ability.sections.filter(s => s.type === 'roll');
			if (rollSections.length) {
				const rollSection = rollSections[0];
				if (rollSections.length > 1) {
					console.warn('More than one roll section!', ability.name, rollSections);
				}

				[ rollSection.roll.tier1, rollSection.roll.tier2, rollSection.roll.tier3 ].forEach(tier => {
					const potency = tier.match(/[MmAaRrIiPp]<(\d)/);
					if (potency && potency[1]) {
						rollPowerAmount = Math.max(rollPowerAmount, Number.parseInt(potency[1]));
					}
				});
			}
		}
		return rollPowerAmount;
	};

	static getPowerRollCharacteristics = (ability: Ability, creature: Hero | Monster | undefined): Characteristic[] => {
		const rollSections = ability.sections.filter(s => s.type === 'roll');
		if (rollSections.length) {
			const rollSection = rollSections[0];
			if (rollSections.length > 1) {
				console.warn('More than one roll section!', ability.name, rollSections);
			}

			let rollCharacteristics = rollSection.roll.characteristic;
			// Specific check for Grab/Knockback + Psionic Martial Arts override
			if (CreatureLogic.isHero(creature)
				&& ([ 'grab', 'knockback' ].includes(ability.id))
				&& HeroLogic.getFeatures(creature as Hero).find(f => f.feature.id === 'null-1-8')) { // Psionic Martial Arts id
				rollCharacteristics = [ Characteristic.Intuition ];
			}
			return rollCharacteristics;
		}
		return [];
	};

	static getTierEffect = (value: string, tier: number, ability: Ability, distance: AbilityDistanceType | undefined, hero: Hero | undefined) => {
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

					let isMelee = ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon);
					let isRanged = ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon);
					if (distance) {
						isMelee = (distance === AbilityDistanceType.Melee) && ability.keywords.includes(AbilityKeyword.Weapon);
						isRanged = (distance === AbilityDistanceType.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon);
					}

					const dmgKits = HeroLogic
						.getKitDamageBonuses(hero)
						.filter(dmg => {
							switch (dmg.type) {
								case 'melee':
									return isMelee;
								case 'ranged':
									return isRanged;
							}
						});

					const hasMeleeXorRanged = (isMelee && !isRanged) || (!isMelee && isRanged);
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

					const dmgFeatures = HeroLogic.getFeatureDamageBonuses(hero, ability, distance);
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

				if (hero && (n === 0) && [ 'pull', 'push', 'slide' ].some(s => section.toLowerCase().includes(s))) {
					let value = 0;
					let sign = '+';
					let vertical = false;
					let type = '';
					const dice: string[] = [];
					const characteristics: Characteristic[] = [];

					section.toLowerCase().split(' ').forEach(token => {
						if ((token === 'pull') || (token === 'push') || (token === 'slide')) {
							type = token;
						} else if (token === 'vertical') {
							vertical = true;
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
						}
					});

					const charValues = characteristics.map(ch => HeroLogic.getCharacteristic(hero, ch));
					const maxCharValue = Collections.max(charValues, n => n) || 0;
					let total: number | string = sign === '+' ? value + maxCharValue : value - maxCharValue;
					if (dice.length > 0) {
						total = `${dice.join(' + ')} + ${total}`;
					}

					return Format.capitalize(vertical ? `vertical ${type} ${total}` : `${type} ${total}`);
				}

				return AbilityLogic.getTextEffect(section, hero);
			})
			.join('; ');
	};

	static getTierEffectRetainer = (value: string, tier: number, ability: Ability, retainer: Monster | undefined) => {
		return value
			.split(';')
			.map(section => section.trim())
			.map((section, n) => {
				if (retainer && (n === 0) && [ 'damage', 'dmg' ].some(s => section.toLowerCase().endsWith(s))) {
					let value = 0;
					const types: string[] = [];

					const isSignature = (ability.cost === 'signature');
					const signatureBonus = MonsterLogic.getSignatureDamageBonus(retainer);

					if (isSignature && signatureBonus) {
						switch (tier) {
							case 1:
								value += signatureBonus.tier1;
								break;
							case 2:
								value += signatureBonus.tier2;
								break;
							case 3:
								value += signatureBonus.tier3;
								break;
						}
					}

					section.toLowerCase().split(' ').forEach(token => {
						if ((token === 'damage') || (token === 'dmg')) {
							// Damage; ignore
						} else if (token === 'or') {
							// Ignore
						} else if (!isNaN(parseInt(token))) {
							value += parseInt(token);
						} else {
							types.push(token);
						}
					});

					const damage = [ types.sort().join(' or '), 'damage' ].join(' ');

					return `${value} ${damage}`;
				}

				return AbilityLogic.getTextEffect(section, undefined);
			})
			.join('; ');
	};

	static getTierEffectCreature = (value: string, tier: number, ability: Ability, distance: AbilityDistanceType | undefined, creature: Hero | Monster | undefined): string => {
		if (CreatureLogic.isMonster(creature)) {
			return AbilityLogic.getTierEffectRetainer(value, tier, ability, creature);
		} else {
			return AbilityLogic.getTierEffect(value, tier, ability, distance, creature);
		}
	};

	static getTextEffect = (text: string, hero: Hero | undefined) => {
		// Potency: [weak | average | strong]
		if (hero) {
			text = text
				.replace(/<\s*[[({]?weak[\])}]?/gi, `< ${HeroLogic.getPotency(hero, 'weak')}`)
				.replace(/<\s*[[({]?average[\])}]?/gi, `< ${HeroLogic.getPotency(hero, 'average')}`)
				.replace(/<\s*[[({]?avg[\])}]?/gi, `< ${HeroLogic.getPotency(hero, 'average')}`)
				.replace(/<\s*[[({]?strong[\])}]?/gi, `< ${HeroLogic.getPotency(hero, 'strong')}`);
		}

		// Equal to [N times] your [Characteristic(s)] score
		if (hero) {
			const charRegex = /(equal to(?: or (?:greater|less) than)?)[^,.;:]* your ([^,.;:]*) score/gi;
			[ ...text.matchAll(charRegex) ].forEach(match => {
				const options: number[] = [];
				[
					Characteristic.Might,
					Characteristic.Agility,
					Characteristic.Reason,
					Characteristic.Intuition,
					Characteristic.Presence
				].forEach(ch => {
					if (match[2].toLowerCase() == 'highest characteristic' || match[2].toLowerCase().includes(ch.toLowerCase())) {
						options.push(HeroLogic.getCharacteristic(hero, ch));
					}
				});
				if (options.length > 0) {
					const value = Math.max(...options);

					const dice = FormatLogic.getDice(match[0]);
					const constant = FormatLogic.getConstant(match[0]);
					const multiplier = FormatLogic.getMultiplier(match[0]);

					if (dice) {
						text = text.replace(match[0], `${match[1]} ${dice} + ${constant + (value * multiplier)}`);
					} else {
						text = text.replace(match[0], `${match[1]} ${constant + (value * multiplier)}`);
					}
				}
			});
		}

		// Equal to [N times] your level
		if (hero) {
			const lvlRegex = /equal to[^,.;:]*your level/gi;
			[ ...text.matchAll(lvlRegex) ].map(r => r[0]).forEach(str => {
				const dice = FormatLogic.getDice(str);
				const constant = FormatLogic.getConstant(str);
				const value = hero.class ? hero.class.level : 1;
				const multiplier = FormatLogic.getMultiplier(str);
				if (dice) {
					text = text.replace(str, `equal to ${dice} + ${constant + (value * multiplier)}`);
				} else {
					text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
				}
			});
		}

		// Equal to [N times] your recovery value
		if (hero) {
			const recRegex = /equal to[^,.;:]*your recovery value/gi;
			[ ...text.matchAll(recRegex) ].map(r => r[0]).forEach(str => {
				const dice = FormatLogic.getDice(str);
				const constant = FormatLogic.getConstant(str);
				const value = HeroLogic.getRecoveryValue(hero);
				const multiplier = FormatLogic.getMultiplier(str);
				if (dice) {
					text = text.replace(str, `equal to ${dice} + ${constant + (value * multiplier)}`);
				} else {
					text = text.replace(str, `equal to ${constant + (value * multiplier)}`);
				}
			});
		}

		// Up to [N times] your speed
		if (hero) {
			text = text.replace('a number of squares equal to your speed', 'up to your speed');
			text = text.replace('a number of squares up to your speed', 'up to your speed');
			const speedRegex = /up to[^,.;:]*your speed/gi;
			[ ...text.matchAll(speedRegex) ].map(r => r[0]).forEach(str => {
				const dice = FormatLogic.getDice(str);
				const constant = FormatLogic.getConstant(str);
				const value = HeroLogic.getSpeed(hero).value;
				const multiplier = FormatLogic.getMultiplier(str);
				if (dice) {
					text = text.replace(str, `up to ${dice} + ${constant + (Math.floor(value * multiplier))} squares`);
				} else {
					text = text.replace(str, `up to ${constant + (Math.floor(value * multiplier))} squares`);
				}
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
}
