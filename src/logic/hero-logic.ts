import { Feature, FeatureAbilityData, FeatureClassAbilityData, FeatureLanguageData, FeatureSkillData } from '../models/feature';
import { Ability } from '../models/ability';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from './ability-logic';
import { CampaignSettingData } from '../data/campaign-setting-data';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Size } from '../models/ancestry';
import { Utils } from '../utils/utils';

export class HeroLogic {
	static createHero = (settingID: string) => {
		const hero: Hero = {
			id: Utils.guid(),
			name: '',
			settingID: settingID,
			ancestry: null,
			culture: null,
			class: null,
			career: null,
			complication: null,
			kits: [],
			state: {
				stamina: 0,
				recoveries: 0,
				victories: 0,
				heroicResource: 0,
				heroTokens: 0,
				renown: 0,
				conditions: []
			}
		};
		return hero;
	};

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
			type: AbilityLogic.createTypeAction(true),
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
			type: AbilityLogic.createTypeAction(true),
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

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.ClassAbility)
			.forEach(f => {
				const data = f.data as FeatureClassAbilityData;
				data.selectedIDs.forEach(abilityID => {
					const ability = hero.class?.abilities.find(a => a.id === abilityID);
					if (ability) {
						abilities.push(ability);
					}
				});
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
				type: AbilityLogic.createTypeTrigger('An enemy ends its turn adjacent to you.', true),
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

		const setting = CampaignSettingData.getCampaignSettings().find(cs => cs.id === hero.settingID);
		if (setting) {
			languages.push(...setting.defaultLanguages);
		}

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

	static getSize = (size: Size) => {
		return `${size.value}${size.mod}`;
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
}
