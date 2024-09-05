import { Ability } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { Feature } from '../models/feature';
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
		}

		if (hero.class) {
			const classLevel = hero.class.level;
			hero.class.featuresByLevel.forEach(lvl => {
				if (lvl.level <= classLevel) {
					features.push(...lvl.features);
				}
			});
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

		// TODO: Include free strikes

		// TODO: Include class abilities

		hero.kits.forEach(kit => {
			if (kit.signatureAbility) {
				abilities.push(kit.signatureAbility);
			}
		});

		if (hero.kits.some(kit => kit.mobility)) {
			abilities.push({
				id: 'mobility',
				name: 'Mobility',
				description: 'You shift up to 2 squares.',
				keywords: [],
				type: {
					usage: AbilityUsage.Trigger,
					free: true,
					trigger: 'An enemy ends its turn adjacent to you.',
					time: ''
				},
				distance: '',
				target: '',
				cost: 0,
				powerRoll: null
			});
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
				if (f.language) {
					languages.push(...f.language.selected);
				}
			});

		return Collections.sort(languages, l => l);
	};

	static getSkills = (hero: Hero) => {
		const skills: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				if (f.skill) {
					skills.push(...f.skill.selected);
				}
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
