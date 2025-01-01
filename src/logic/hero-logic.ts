import { Ability, AbilityDistance } from '../models/ability';
import { Feature, FeatureAbilityData, FeatureBonusData, FeatureClassAbilityData, FeatureDamageModifierData, FeatureDomainData, FeatureKitData, FeatureKitTypeData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureSizeData, FeatureSkillChoiceData, FeatureSkillData } from '../models/feature';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from './ability-logic';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Domain } from '../models/domain';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit';
import { Language } from '../models/language';
import { PowerRollType } from '../enums/power-roll-type';
import { Size } from '../models/size';
import { Skill } from '../models/skill';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import { SourcebookLogic } from './sourcebook-logic';

export class HeroLogic {
	static getKitTypes = (hero: Hero) => {
		const types = [ KitType.Standard ];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.KitType)
			.forEach(f => {
				const data = f.data as FeatureKitTypeData;
				types.push(...data.types);
			});

		return types;
	};

	static getKits = (hero: Hero) => {
		const kits: Kit[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				const data = f.data as FeatureKitData;
				kits.push(...data.selected);
			});

		return kits;
	};

	static getDomains = (hero: Hero) => {
		const domains: Domain[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Domain)
			.forEach(f => {
				const data = f.data as FeatureDomainData;
				domains.push(...data.selected);
			});

		return domains;
	};

	static getFeatures = (hero: Hero) => {
		const features: Feature[] = [];

		if (hero.ancestry) {
			features.push(...FeatureLogic.getFeaturesFromAncestry(hero.ancestry));
		}

		if (hero.culture) {
			features.push(...FeatureLogic.getFeaturesFromCulture(hero.culture));
		}

		if (hero.career) {
			features.push(...FeatureLogic.getFeaturesFromCareer(hero.career));
		}

		if (hero.class) {
			features.push(...FeatureLogic.getFeaturesFromClass(hero.class));
		}

		if (hero.complication) {
			features.push(...FeatureLogic.getFeaturesFromComplication(hero.complication));
		}

		features.push(...hero.features);

		hero.state.inventory.forEach(item => {
			features.push(...FeatureLogic.getFeaturesFromItem(item));
		});

		return Collections.sort(features, f => f.name);
	};

	static getAbilities = (hero: Hero, includeChoices: boolean, includeFreeStrikes: boolean, includeStandard: boolean) => {
		const abilities: Ability[] = [];

		if (includeFreeStrikes) {
			abilities.push(AbilityLogic.createAbility({
				id: 'free-melee',
				name: 'Free Strike (melee)',
				description: '',
				type: AbilityLogic.type.createAction({ free: true }),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.distance.createMelee(1) ],
				target: '1 creature or object',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				})
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'free-ranged',
				name: 'Free Strike (ranged)',
				description: '',
				type: AbilityLogic.type.createAction({ free: true }),
				keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.distance.createRanged(5) ],
				target: '1 creature or object',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				})
			}));
		}

		if (includeChoices) {
			const choices: Ability[] = [];

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.Ability)
				.forEach(f => {
					const data = f.data as FeatureAbilityData;
					choices.push(data.ability);
				});

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.ClassAbility)
				.forEach(f => {
					const data = f.data as FeatureClassAbilityData;
					data.selectedIDs.forEach(abilityID => {
						const ability = hero.class?.abilities.find(a => a.id === abilityID);
						if (ability) {
							choices.push(ability);
						}
					});
				});

			Collections.distinct(choices.map(a => a.cost), a => a)
				.sort((a, b) => a - b)
				.forEach(cost => abilities.push(...Collections.sort(choices.filter(a => a.cost === cost), a => a.name)));
		}

		if (includeStandard) {
			abilities.push(AbilityLogic.createAbility({
				id: 'advance',
				name: 'Advance',
				description: '',
				type: AbilityLogic.type.createMove(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'When you take the Advance move action, you can move a number of squares up to your speed. You can break up this movement granted with your maneuver and action however you wish.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'disengage',
				name: 'Disengage',
				description: '',
				type: AbilityLogic.type.createMove(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'When you take the Disengage move action, you can shift 1 square. Some class features, kits, or other rules let you shift more than 1 square when you take this move action, if they do, you can break up the movement granted by this move action with your maneuver and action however you wish.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'ride',
				name: 'Ride',
				description: '',
				type: AbilityLogic.type.createMove(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You can only take the Ride move action while mounted on another creature. When you take the Ride move action, you cause your mount to move up to their speed, taking you with them. Alternatively, you can use this move action to have your mount use the Disengage move action as a free triggered action. A mount can only be ridden with this move action once per round.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'aid-attack',
				name: 'Aid Attack',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createMelee(1) ],
				target: '1 enemy',
				effect: 'The next attack an ally makes against the target before the start of your next turn has an edge.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'catch-breath',
				name: 'Catch Breath',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: `
By using the Catch Breath maneuver, you spend a Recovery and heal an amount equal to your recovery value. In addition, you also gain the benefit of the Defend action.
If you are dying, you can’t take the Catch Breath maneuver, but other creatures can help you spend recoveries.`
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'drink-potion',
				name: 'Drink Potion',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [
					AbilityLogic.distance.createSelf(),
					AbilityLogic.distance.createMelee(1)
				],
				target: 'Self or 1 creature',
				effect: 'You can use this maneuver to drink a potion yourself or to administer a potion to an adjacent creature.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'escape-grab',
				name: 'Escape Grab',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				preEffect: 'While you are grabbed by another creature, you can attempt to escape by making a resistance roll. You take a bane on the roll if the creature’s size is larger than yours.',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: 'You fail to escape the grab.',
					tier2: 'You can escape the grab, but if you do, the creature grabbing you can make a melee free strike against you before you are no longer grabbed.',
					tier3: 'You are no longer grabbed.'
				})
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'grab',
				name: 'Grab',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Melee ],
				distance: [ AbilityLogic.distance.createMelee(1) ],
				target: '1 creature the same size or smaller than you',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might ],
					tier1: 'No effect',
					tier2: 'You can grab the target, but if you do, they can make a melee free strike against you right before they become grabbed by you.',
					tier3: 'The target is grabbed by you.'
				}),
				effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours. You can grab only one creature at a time this way.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'hide',
				name: 'Hide',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You attempt to hide from other creatures who aren’t observing you while you have cover or concealment.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'knockback',
				name: 'Knockback',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Melee ],
				distance: [ AbilityLogic.distance.createMelee(1) ],
				target: '1 creature the same size or smaller than you',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might ],
					tier1: 'Push 1',
					tier2: 'Push 2',
					tier3: 'Push 3'
				}),
				effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'make-assist-test',
				name: 'Make Or Assist A Test',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: `
Many tests are maneuvers if made in combat. Searching a chest with a Reason test, picking a door’s lock with an Agility test, or lifting a portcullis with a Might test would all be maneuvers. Assisting a test is also a maneuver in combat.
Complex or time-consuming tests might require an action if made in combat—or could take so long that they can’t be made during combat at all. Other tests that take no time at all, such as a Reason test to recall lore about mummies, are usually free maneuvers in combat. The Director has the final say regarding which tests can be made as maneuvers.`
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'search',
				name: 'Search',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'You can use this maneuver to attempt to search for creatures hidden from you.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'stand-up',
				name: 'Stand Up',
				description: '',
				type: AbilityLogic.type.createManeuver(),
				keywords: [],
				distance: [
					AbilityLogic.distance.createSelf(),
					AbilityLogic.distance.createMelee(1)
				],
				target: 'Self or 1 creature',
				effect: 'You can use this maneuver to stand up if you are prone, ending that condition. Alternatively, you can use this maneuver to make an adjacent prone creature stand up.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'charge',
				name: 'Charge',
				description: '',
				type: AbilityLogic.type.createAction(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'When you take the Charge action, you move up to your speed in a straight line, then make a melee free strike against a creature when you end your move. You can’t shift when you charge.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'defend',
				name: 'Defend',
				description: '',
				type: AbilityLogic.type.createAction(),
				keywords: [],
				distance: [ AbilityLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'When you take the Defend action, all attacks against you have a double bane until the end of your next turn. You gain no benefit from this action while another creature is taunted by you.'
			}));
			abilities.push(AbilityLogic.createAbility({
				id: 'heal',
				name: 'Heal',
				description: '',
				type: AbilityLogic.type.createAction(),
				keywords: [],
				distance: [
					AbilityLogic.distance.createSelf(),
					AbilityLogic.distance.createMelee(1)
				],
				target: 'Self or 1 creature',
				effect: 'You use your action to employ medicine or inspiring words to make an adjacent creature feel better and stay in the fight. The creature can spend a Recovery to regain Stamina, or can make a resistance roll against a “(resistance ends)” effect they are suffering.'
			}));
		}

		return abilities;
	};

	static getCharacteristic = (hero: Hero, characteristic: Characteristic) => {
		let value = 0;

		if (hero.class) {
			const ch = hero.class.characteristics.find(ch => ch.characteristic === characteristic);
			if (ch) {
				value += ch.value;
			}
		}

		return value;
	};

	static getLanguages = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const languageNames: string[] = [];

		if (hero.culture) {
			languageNames.push(...hero.culture.languages);
		}

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Language)
			.forEach(f => {
				const data = f.data as FeatureLanguageData;
				languageNames.push(data.language);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.LanguageChoice)
			.forEach(f => {
				const data = f.data as FeatureLanguageChoiceData;
				languageNames.push(...data.selected);
			});

		const allLanguages = sourcebooks.flatMap(cs => cs.languages);

		const languages: Language[] = [];
		languageNames.forEach(name => {
			const language = allLanguages.find(l => l.name === name);
			if (language) {
				languages.push(language);
			}
		});

		return Collections.sort(languages, l => l.name);
	};

	static getSkills = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const skillNames: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				const data = f.data as FeatureSkillData;
				skillNames.push(data.skill);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.SkillChoice)
			.forEach(f => {
				const data = f.data as FeatureSkillChoiceData;
				skillNames.push(...data.selected);
			});

		const skills: Skill[] = [];
		skillNames.forEach(name => {
			const skill = SourcebookLogic.getSkill(name, sourcebooks);
			if (skill) {
				skills.push(skill);
			}
		});

		return Collections.sort(skills, s => s.name);
	};

	static getDamageModifiers = (hero: Hero, type: DamageModifierType) => {
		const immunities: { type: string, value: number }[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				const data = f.data as FeatureDamageModifierData;
				data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						let value = dm.value;
						if (hero.class) {
							value += dm.valuePerLevel * (hero.class.level - 1);
							value += dm.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
						}
						immunities.push({
							type: dm.damageType,
							value: value
						});
					});
			});

		return Collections.sort(immunities, i => i.type);
	};

	///////////////////////////////////////////////////////////////////////////

	static getStamina = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		const kits = this.getKits(hero);
		const v = Collections.max(kits.map(kit => kit.stamina), value => value) || 0;
		if (hero.class) {
			value += v * HeroLogic.getEchelon(hero.class.level);
		}

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Stamina)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getRecoveryValue = (hero: Hero) => {
		let value = Math.floor(this.getStamina(hero) / 3);

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.RecoveryValue)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getRecoveries = (hero: Hero) => {
		let value = 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Recoveries)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getSize = (hero: Hero) => {
		const features = this.getFeatures(hero).filter(f => f.type === FeatureType.Size);
		if (features.length > 0) {
			const datas = features.map(f => f.data as FeatureSizeData);
			const value = Collections.max(datas.map(d => d.size.value), v => v);
			const mods = Collections.distinct(datas.map(d => d.size.mod), m => m);
			return {
				value: value,
				mod: value === 1 ? mods[0] : ''
			} as Size;
		}

		return {
			value: 1,
			mod: 'M'
		} as Size;
	};

	static getSpeed = (hero: Hero) => {
		let value = 5;

		const features = this.getFeatures(hero).filter(f => f.type === FeatureType.Speed);
		if (features.length > 0) {
			const datas = features.map(f => f.data);
			value = Collections.max(datas.map(d => d.speed), v => v) || 0;
		}

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.speed), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Speed)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getStability = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.stability), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Stability)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getDisengage = (hero: Hero) => {
		let value = 1;

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.disengage), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Disengage)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	///////////////////////////////////////////////////////////////////////////

	static getMeleeDamageBonus = (hero: Hero, ability: Ability) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon)) {
			// Add maximum from kits
			const kits = this.getKits(hero);
			value1 += Collections.max(kits.map(kit => kit.meleeDamage?.tier1 || 0), value => value) || 0;
			value2 += Collections.max(kits.map(kit => kit.meleeDamage?.tier2 || 0), value => value) || 0;
			value3 += Collections.max(kits.map(kit => kit.meleeDamage?.tier3 || 0), value => value) || 0;
		}

		if ((value1 === 0) && (value2 === 0) && (value3 === 0)) {
			return null;
		}

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getRangedDamageBonus = (hero: Hero, ability: Ability) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon)) {
			// Add maximum from kits
			const kits = this.getKits(hero);
			value1 += Collections.max(kits.map(kit => kit.rangedDamage?.tier1 || 0), value => value) || 0;
			value2 += Collections.max(kits.map(kit => kit.rangedDamage?.tier2 || 0), value => value) || 0;
			value3 += Collections.max(kits.map(kit => kit.rangedDamage?.tier3 || 0), value => value) || 0;
		}

		if ((value1 === 0) && (value2 === 0) && (value3 === 0)) {
			return null;
		}

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getDistanceBonus = (hero: Hero, ability: Ability, distance: AbilityDistance) => {
		const kits = this.getKits(hero);

		if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Melee)) {
			// Add maximum melee distance bonus from kits
			return Collections.max(kits.map(kit => kit.meleeDistance), value => value) || 0;
		}

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Ranged)) {
			// Add maximum ranged distance bonus from kits
			return Collections.max(kits.map(kit => kit.rangedDistance), value => value) || 0;
		}

		return 0;
	};

	///////////////////////////////////////////////////////////////////////////

	static getEchelon = (level: number) => {
		switch (level) {
			case 1:
			case 2:
			case 3:
				return 1;
			case 4:
			case 5:
			case 6:
				return 2;
			case 7:
			case 8:
			case 9:
				return 3;
			case 10:
				return 4;
		}

		return 1;
	};

	static calculateCharacteristicArrays = (primary: Characteristic[]) => {
		const all = [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ];
		const others = all.filter(c => !primary.includes(c));

		const arrays: { characteristic: Characteristic, value: number }[][] = [];
		others.forEach(single => {
			arrays.push(all.map(ch => {
				let value: number;
				if (primary.includes(ch)) {
					value = 2;
				} else if (ch === single) {
					value = 2;
				} else {
					value = -1;
				}
				return {
					characteristic: ch,
					value: value
				};
			}));

			arrays.push(all.map(ch => {
				let value: number;
				if (primary.includes(ch)) {
					value = 2;
				} else if (ch === single) {
					value = 1;
				} else {
					value = 0;
				}
				return {
					characteristic: ch,
					value: value
				};
			}));

			arrays.push(all.map(ch => {
				let value: number;
				if (primary.includes(ch)) {
					value = 2;
				} else if (ch === single) {
					value = -1;
				} else {
					value = 1;
				}
				return {
					characteristic: ch,
					value: value
				};
			}));
		});

		return arrays;
	};

	static getMinXP = (level: number) => {
		switch (level) {
			case 1:
				return 0;
			case 2:
				return 10;
			case 3:
				return 25;
			case 4:
				return 40;
			case 5:
				return 55;
			case 6:
				return 70;
			case 7:
				return 85;
			case 8:
				return 100;
			case 9:
				return 115;
			case 10:
			default:
				return 130;
		}
	};

	static canLevelUp = (hero: Hero) => {
		if (!hero.class) {
			return false;
		}

		return hero.state.xp >= this.getMinXP(hero.class.level + 1);
	};

	///////////////////////////////////////////////////////////////////////////

	static updateHero = (hero: Hero) => {
		if (hero.settingIDs === undefined) {
			hero.settingIDs = [ SourcebookData.core.id, SourcebookData.orden.id ];
		}

		if (hero.career) {
			if (hero.career.incitingIncidents === undefined) {
				hero.career.incitingIncidents = {
					options: [],
					selectedID: null
				};
			}
		}

		if (hero.features === undefined) {
			hero.features = [];
		}

		if (hero.state.surges === undefined) {
			hero.state.surges = 0;
		}

		if (hero.state.xp === undefined) {
			hero.state.xp = 0;
		}

		if (hero.state.wealth === undefined) {
			hero.state.wealth = 1;
		}

		if (hero.state.inventory === undefined) {
			hero.state.inventory = [];
		}

		this.getFeatures(hero).filter(f => f.type === FeatureType.Bonus).forEach(f => {
			const data = f.data as FeatureBonusData;
			if (data.valuePerEchelon === undefined) {
				data.valuePerEchelon = 0;
			}
		});

		this.getFeatures(hero).filter(f => f.type === FeatureType.DamageModifier).forEach(f => {
			const data = f.data as FeatureDamageModifierData;
			data.modifiers.forEach(dm => {
				if (dm.valuePerEchelon === undefined) {
					dm.valuePerEchelon = 0;
				}
			});
		});

		this.getAbilities(hero, true, true, true).forEach(a => {
			if (a.powerRoll && (a.powerRoll.type === undefined)) {
				a.powerRoll.type = PowerRollType.PowerRoll;
			}
		});
	};
}
