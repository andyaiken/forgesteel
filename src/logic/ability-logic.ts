import { Ability, AbilityDistance } from '@/models/ability';
import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { ConditionType } from '@/enums/condition-type';
import { CreatureLogic } from '@/logic/creature-logic';
import { FeatureType } from '@/enums/feature-type';
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
	static getAllKeywords = () => {
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

	static getTargets = () => {
		return Collections.sort([
			'Self',
			'Each creature and object in the area',
			'Each creature in the area',
			'Each enemy in the area',
			'Each ally in the area',
			'One creature or object',
			'One creature',
			'One enemy',
			'One ally',
			'Two creatures or objects',
			'Two creatures',
			'Two enemies',
			'Two allies',
			'One creature or object per minion',
			'One creature per minion'
		], a => a);
	};

	static getPanelWidth = (ability: Ability) => {
		const descLength = Math.round(ability.description.split(' ').length / 10);
		const textLength = Collections.sum(ability.sections.filter(s => s.type === 'text'), s => Math.round(s.text.split(' ').length / 10));
		const fieldLength = Collections.sum(ability.sections.filter(s => s.type === 'field'), s => Math.round(s.effect.split(' ').length / 10));
		const rollLength = ability.sections.filter(s => s.type === 'roll').length * 6;

		const length = descLength + textLength + fieldLength + rollLength;
		return Math.max(1, Math.round(length / 12));
	};

	static getKeywords = (ability: Ability, hero?: Hero) => {
		let keywords = [ ...ability.keywords ];

		if (hero) {
			HeroLogic.getFeatures(hero)
				.map(f => f.feature)
				.filter(f => f.type === FeatureType.AbilityKeyword)
				.filter(f => f.data.keywords.every(kw => keywords.includes(kw)))
				.forEach(f => {
					f.data.toRemove.forEach(ak => keywords = keywords.filter(k => k !== ak));
					f.data.toAdd.forEach(ak => keywords.push(ak));
				});
		}

		return keywords;
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
			sections.push(`within ${distance.within + bonus}`);
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

	// Parses a token such as 'm', 'might,', '2m', or '2might' (an attached multiplier collapsed by the caller)
	// into a characteristic reference with an optional leading multiplier (defaults to x1)
	static getCharacteristicReference = (token: string) => {
		const match = token.trim().replace(/,$/, '').match(/^(\d+)?(might|agility|reason|intuition|presence|m|a|r|i|p)$/i);
		if (!match) {
			return null;
		}

		let characteristic = Characteristic.Might;
		switch (match[2].toLowerCase()) {
			case 'agility':
			case 'a':
				characteristic = Characteristic.Agility;
				break;
			case 'reason':
			case 'r':
				characteristic = Characteristic.Reason;
				break;
			case 'intuition':
			case 'i':
				characteristic = Characteristic.Intuition;
				break;
			case 'presence':
			case 'p':
				characteristic = Characteristic.Presence;
				break;
		}

		return {
			characteristic: characteristic,
			multiplier: match[1] ? parseInt(match[1]) : 1
		};
	};

	static getTierEffect = (value: string, tier: number, ability: Ability, distance: AbilityDistanceType | undefined, hero: Hero | undefined) => {
		const keywords = AbilityLogic.getKeywords(ability, hero);

		const isDamageSection = (section: string) => [ 'damage', 'dmg' ].some(s => section.toLowerCase().endsWith(s));

		// Tokenizes a single 'damage'-ending section into its value / dice / damage type(s), without any
		// kit or feature bonus (that's only ever applied once, to the primary damage section - see below)
		const parseDamageTokens = (section: string) => {
			let value = 0;
			let sign = '+';
			const dice: string[] = [];
			const characteristics: { characteristic: Characteristic; multiplier: number }[] = [];
			const types: string[] = [];

			// Collapse 'N x Characteristic' / 'N × Characteristic' into a single 'NCharacteristic' token,
			// so (for example) '2 x Might' and '2Might' are both recognized as a x2 characteristic multiplier below
			const tokenSource = section
				.toLowerCase()
				.replace(/(\d+)\s*(?:x|×|\*)\s*(might|agility|reason|intuition|presence|m|a|r|i|p)\b/g, '$1$2');

			tokenSource.split(' ').forEach(token => {
				const charRef = AbilityLogic.getCharacteristicReference(token);

				if ((token === 'damage') || (token === 'dmg')) {
					// Damage; ignore
				} else if (token === 'or') {
					// Ignore
				} else if (/\d+d\d+/.test(token)) {
					dice.push(token);
				} else if (charRef) {
					characteristics.push(charRef);
				} else if (!isNaN(parseInt(token))) {
					value += parseInt(token);
				} else if ((token === '+') || (token === '-')) {
					sign = token;
				} else {
					types.push(token);
				}
			});

			const charValues = characteristics.map(c => (hero ? HeroLogic.getCharacteristic(hero, c.characteristic) : 0) * c.multiplier);
			const maxCharValue = Collections.max(charValues, n => n) || 0;
			const total = sign === '+' ? value + maxCharValue : value - maxCharValue;

			return { total: total, dice: dice, types: types };
		};

		const sections = value.split(';').map(section => section.trim());

		// Additional damage sections later in the same tier text get folded into the primary (first) damage
		// section when they don't introduce a conflicting damage type (eg an untyped '+4 damage' bonus, or a
		// repeated '+4 fire damage' clause) - their indices are recorded here so they're dropped from the output
		const mergedIndices = new Set<number>();

		const results = sections.map((section, n) => {
			if (hero && (n === 0) && isDamageSection(section)) {
				let isMelee = keywords.includes(AbilityKeyword.Melee) && keywords.includes(AbilityKeyword.Weapon);
				let isRanged = keywords.includes(AbilityKeyword.Ranged) && keywords.includes(AbilityKeyword.Weapon);
				if (distance) {
					isMelee = (distance === AbilityDistanceType.Melee) && keywords.includes(AbilityKeyword.Weapon);
					isRanged = (distance === AbilityDistanceType.Ranged) && keywords.includes(AbilityKeyword.Weapon);
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

				let bonus = 0;
				const hasMeleeXorRanged = (isMelee && !isRanged) || (!isMelee && isRanged);
				if ((dmgKits.length === 1) && hasMeleeXorRanged) {
					// There's only one applicable kit bonus, and the ability can only be used in one mode
					const dmg = dmgKits[0];
					switch (tier) {
						case 1:
							bonus += dmg.tier1;
							break;
						case 2:
							bonus += dmg.tier2;
							break;
						case 3:
							bonus += dmg.tier3;
							break;
					}
				}

				const dmgFeatures = HeroLogic.getFeatureDamageBonuses(hero, ability, distance);
				bonus += Collections.sum(dmgFeatures, x => x.value);
				bonus += HeroLogic.getRolledDamageBonus(hero);

				const primary = parseDamageTokens(section);
				let total = bonus + primary.total;
				let dice = [ ...primary.dice ];
				const types = [ ...primary.types ];

				for (let m = n + 1; m < sections.length; m++) {
					if (isDamageSection(sections[m])) {
						const extra = parseDamageTokens(sections[m]);
						const mergeable = (extra.types.length === 0) || ((extra.types.length === types.length) && extra.types.every(t => types.includes(t)));
						if (mergeable) {
							total += extra.total;
							dice = [ ...dice, ...extra.dice ];
							mergedIndices.add(m);
						}
					}
				}

				let totalDisplay: number | string = total;
				if (dice.length > 0) {
					totalDisplay = `${dice.join(' + ')} + ${total}`;
				}

				const damage = [ ...types, 'damage' ].join(' ');

				return `${totalDisplay} ${damage}`;
			}

			if (mergedIndices.has(n)) {
				return null;
			}

			return AbilityLogic.getTextEffect(section, hero);
		});

		return results.filter((s): s is string => s !== null).join('; ');
	};

	static getTierEffectRetainer = (value: string, tier: number, ability: Ability, retainer: Monster | undefined) => {
		const isDamageSection = (section: string) => [ 'damage', 'dmg' ].some(s => section.toLowerCase().endsWith(s));

		// Tokenizes a single 'damage'-ending section into its flat value and damage type(s), without any
		// signature bonus (that's only ever applied once, to the primary damage section - see below)
		const parseDamageTokens = (section: string) => {
			let value = 0;
			const types: string[] = [];

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

			return { value: value, types: types };
		};

		const sections = value.split(';').map(section => section.trim());

		// Additional damage sections later in the same tier text get folded into the primary (first) damage
		// section when they don't introduce a conflicting damage type (eg an untyped '+4 damage' bonus, or a
		// repeated '+4 fire damage' clause) - their indices are recorded here so they're dropped from the output
		const mergedIndices = new Set<number>();

		const results = sections.map((section, n) => {
			if (retainer && (n === 0) && isDamageSection(section)) {
				let value = 0;

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

				const primary = parseDamageTokens(section);
				value += primary.value;
				const types = [ ...primary.types ];

				for (let m = n + 1; m < sections.length; m++) {
					if (isDamageSection(sections[m])) {
						const extra = parseDamageTokens(sections[m]);
						const mergeable = (extra.types.length === 0) || ((extra.types.length === types.length) && extra.types.every(t => types.includes(t)));
						if (mergeable) {
							value += extra.value;
							mergedIndices.add(m);
						}
					}
				}

				const damage = [ types.sort().join(' or '), 'damage' ].join(' ');

				return `${value} ${damage}`;
			}

			if (mergedIndices.has(n)) {
				return null;
			}

			return AbilityLogic.getTextEffect(section, undefined);
		});

		return results.filter((s): s is string => s !== null).join('; ');
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

		// N + [Characteristic], optionally with a multiplier on the characteristic (eg 'N + 2M' / 'N + 2 x Might')
		if (hero) {
			text = text.replace(/(\d+)\s*(?:x|×|\*)\s*(might|agility|reason|intuition|presence|m|a|r|i|p)\b/gi, '$1$2');

			const regex = /(\d+)\s*\+\s*(\d*(?:might|agility|reason|intuition|presence|m|a|r|i|p))\b/gi;
			text = text.replace(regex, (match, value, characteristicToken) => {
				const charRef = AbilityLogic.getCharacteristicReference(characteristicToken);
				if (!charRef) {
					return match;
				}

				const total = Number(value) + (HeroLogic.getCharacteristic(hero, charRef.characteristic) * charRef.multiplier);
				return `${total}`;
			});
		}

		// N + your [Characteristic] score
		if (hero) {
			const regex = /(\d+)\s*(\+|plus)\s*your\s*(Might|Agility|Reason|Intuition|Presence)\s*score/gi;
			text = text.replace(regex, (_match, value, _plus, characteristic) => {
				let ch = 0;
				switch (characteristic.toLowerCase()) {
					case 'might':
						ch = HeroLogic.getCharacteristic(hero, Characteristic.Might);
						break;
					case 'agility':
						ch = HeroLogic.getCharacteristic(hero, Characteristic.Agility);
						break;
					case 'reason':
						ch = HeroLogic.getCharacteristic(hero, Characteristic.Reason);
						break;
					case 'intuition':
						ch = HeroLogic.getCharacteristic(hero, Characteristic.Intuition);
						break;
					case 'presence':
						ch = HeroLogic.getCharacteristic(hero, Characteristic.Presence);
						break;
				}
				const total = Number(value) + ch;
				return `${total}`;
			});
		}

		// Equal to [N times] your [Characteristic(s)] score
		if (hero) {
			const charRegex = /(equal to(?: or (?:greater|less) than)?)[^,.;:]*? your ([^,.;:]*) score/gi;
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

		// Handle [pull / push / slide] N, including past / third-person forms (pushed, pushes, pulled, pulls, slides, slid)
		if (hero) {
			const forcedMovementRegex = /(pushed|pushes|push|pulled|pulls|pull|slides|slide|slid)\s+(\d+)/gi;
			text = text.replace(forcedMovementRegex, (_match, verb, value) => {
				const lower = verb.toLowerCase();
				const type = lower.startsWith('push') ? 'push' : lower.startsWith('pull') ? 'pull' : 'slide';
				const bonus = HeroLogic.getForcedMovementBonus(hero, type);
				const total = Number(value) + bonus;
				return `${verb} ${total}`;
			});
		}

		// Potencies
		const potencyRegex = /[MARIP]\s*<\s*\[?(\d+|weak|average|avg|strong)\]?,?/gi;
		[ ...text.matchAll(potencyRegex) ].map(r => r[0]).forEach(str => {
			const x = str.endsWith(',') ? str.substring(0, str.length - 1) : str;
			text = text.replace(str, `\`${x}\``);
		});

		// Condition names
		const conditionNames = Object.values(ConditionType).filter(c => (c !== ConditionType.Custom) && (c !== ConditionType.Quick));
		const conditionRegex = new RegExp(`\\b(${conditionNames.join('|')})\\b`, 'gi');
		text = text.replace(conditionRegex, '**$1**');

		return text;
	};
}
