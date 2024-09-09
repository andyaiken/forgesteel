import { Feature, FeatureAbilityData, FeatureLanguageData, FeatureSkillData } from '../models/feature';
import { Ability } from '../models/ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from './ability-logic';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';

export class HeroLogic {
	static getFeatures = (hero: Hero) => {
		const features: Feature[] = [];

		if (hero.ancestry) {
			features.push(...hero.ancestry.features);
		}

		if (hero.culture) {
			features.push(hero.culture.environment);
			features.push(hero.culture.organization);
			features.push(hero.culture.upbringing);
		}

		if (hero.career) {
			features.push(...hero.career.features);
			features.push(hero.career.title);
		}

		if (hero.class) {
			const classLevel = hero.class.level;
			hero.class.featuresByLevel.forEach(lvl => {
				if (lvl.level <= classLevel) {
					features.push(...lvl.features);
				}
			});

			const subclassID = hero.class.subclassID;
			const subclass = hero.class.subclasses.find(s => s.id === subclassID);
			if (subclass) {
				subclass.featuresByLevel.forEach(lvl => {
					if (lvl.level <= classLevel) {
						features.push(...lvl.features);
					}
				});
			}
		}

		if (hero.complication) {
			features.push(hero.complication.benefit);
			features.push(hero.complication.drawback);
		}

		hero.kits.forEach(kit => {
			if (kit.ward) {
				features.push(kit.ward);
			}
		});

		return features;
	};

	static getAbilities = (hero: Hero) => {
		const abilities: Ability[] = [];

		abilities.push(AbilityLogic.createAbility({
			id: 'free-melee',
			name: 'Melee Free Strike',
			description: '',
			type: AbilityLogic.createAbilityType({ usage: AbilityUsage.Action, free: true }),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: 'Reach 1',
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
			name: 'Ranged Free Strike',
			description: '',
			type: AbilityLogic.createAbilityType({ usage: AbilityUsage.Action, free: true }),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: 'Ranged 5',
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might, Characteristic.Agility ],
				tier1: '2 damage',
				tier2: '6 damage',
				tier3: '9 damage'
			})
		}));

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Ability)
			.forEach(f => {
				const data = f.data as FeatureAbilityData;
				abilities.push(data.ability);
			});

		hero.kits.forEach(kit => {
			if (kit.signatureAbility) {
				abilities.push(kit.signatureAbility);
			}
		});

		if (hero.kits.some(kit => kit.mobility)) {
			abilities.push(AbilityLogic.createAbility({
				id: 'mobility',
				name: 'Mobility',
				description: '',
				type: AbilityLogic.createAbilityType({ usage: AbilityUsage.Trigger, free: true, trigger: 'An enemy ends its turn adjacent to you.' }),
				effect: 'You shift up to 2 squares.'
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

	static getLanguages = (hero: Hero) => {
		const languages: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Language)
			.forEach(f => {
				const data = f.data as FeatureLanguageData;
				languages.push(...data.selected);
			});

		return Collections.sort(languages, l => l);
	};

	static getSkills = (hero: Hero) => {
		const skills: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				const data = f.data as FeatureSkillData;
				skills.push(...data.selected);
			});

		return Collections.sort(skills, s => s);
	};

	static getStamina = (hero: Hero) => {
		let value = 0;

		if (hero.class) {
			value += hero.class.startingStamina;
			value += hero.class.staminaPerLevel * (hero.class.level - 1);
		}

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.stamina), value => value) || 0;

		return value;
	};

	static getRecoveryValue = (hero: Hero) => {
		const value = Math.floor(this.getStamina(hero) / 3);

		//

		return value;
	};

	static getRecoveries = (hero: Hero) => {
		let value = 0;

		if (hero.class) {
			value += hero.class.recoveries;
		}

		return value;
	};

	static getSize = (hero: Hero) => {
		if (hero.ancestry) {
			return `${hero.ancestry.size.value}${hero.ancestry.size.mod}`;
		}

		return '1M';
	};

	static getReach = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.reach), value => value) || 0;

		return value;
	};

	static getSpeed = (hero: Hero) => {
		let value = 0;

		if (hero.ancestry) {
			value += hero.ancestry.speed;
		}

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.speed), value => value) || 0;

		return value;
	};

	static getStability = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.stability), value => value) || 0;

		return value;
	};

	static getMeleeDamageBonus = (hero: Hero) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		// Add maximum from kits
		value1 += Collections.max(hero.kits.map(kit => kit.meleeDamage?.tier1 || 0), value => value) || 0;
		value2 += Collections.max(hero.kits.map(kit => kit.meleeDamage?.tier2 || 0), value => value) || 0;
		value3 += Collections.max(hero.kits.map(kit => kit.meleeDamage?.tier3 || 0), value => value) || 0;

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getRangedDamageBonus = (hero: Hero) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		// Add maximum from kits
		value1 += Collections.max(hero.kits.map(kit => kit.rangedDamage?.tier1 || 0), value => value) || 0;
		value2 += Collections.max(hero.kits.map(kit => kit.rangedDamage?.tier2 || 0), value => value) || 0;
		value3 += Collections.max(hero.kits.map(kit => kit.rangedDamage?.tier3 || 0), value => value) || 0;

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getMagicalDamageBonus = (hero: Hero) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		// Add maximum from kits
		value1 += Collections.max(hero.kits.map(kit => kit.magicalDamage?.tier1 || 0), value => value) || 0;
		value2 += Collections.max(hero.kits.map(kit => kit.magicalDamage?.tier2 || 0), value => value) || 0;
		value3 += Collections.max(hero.kits.map(kit => kit.magicalDamage?.tier3 || 0), value => value) || 0;

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getDistanceBonus = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.distance), value => value) || 0;

		return value;
	};

	static getAreaBonus = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		value += Collections.max(hero.kits.map(kit => kit.area), value => value) || 0;

		return value;
	};
}
