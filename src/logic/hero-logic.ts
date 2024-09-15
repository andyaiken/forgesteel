import { Ability, AbilityDistance } from '../models/ability';
import { Feature, FeatureAbilityData, FeatureBonusData, FeatureClassAbilityData, FeatureLanguageData, FeatureSkillData } from '../models/feature';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { AbilityLogic } from './ability-logic';
import { CampaignSettingData } from '../data/campaign-setting-data';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { FeatureField } from '../enums/feature-field';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit';
import { Size } from '../models/ancestry';
import { Skill } from '../models/skill';
import { SkillLogic } from './skill-logic';
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
			kit: null,
			state: {
				stamina: 0,
				recoveries: 0,
				victories: 0,
				heroicResource: 0,
				heroTokens: 0,
				renown: 0,
				projectPoints: 0,
				conditions: []
			}
		};
		return hero;
	};

	static getKits = (hero: Hero) => {
		const kits: Kit[] = [];

		if (hero.kit) {
			kits.push(hero.kit);
		}

		return kits;
	};

	static getFeatures = (hero: Hero) => {
		const features: Feature[] = [];

		if (hero.ancestry) {
			features.push(...hero.ancestry.features);
		}

		if (hero.culture) {
			if (hero.culture.environment) {
				features.push(hero.culture.environment);
			}
			if (hero.culture.organization) {
				features.push(hero.culture.organization);
			}
			if (hero.culture.upbringing) {
				features.push(hero.culture.upbringing);
			}
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

			hero.class.subclasses
				.filter(sc => sc.selected)
				.forEach(sc => {
					sc.featuresByLevel.forEach(lvl => {
						if (lvl.level <= classLevel) {
							features.push(...lvl.features);
						}
					});
				});
		}

		if (hero.complication) {
			features.push(...hero.complication.features);
		}

		this.getKits(hero).forEach(kit => {
			if (kit.ward) {
				features.push(kit.ward);
			}
		});

		return features;
	};

	static getAbilities = (hero: Hero, includeFreeStrikes: boolean) => {
		const abilities: Ability[] = [];

		if (includeFreeStrikes) {
			abilities.push(AbilityLogic.createAbility({
				id: 'free-melee',
				name: 'Melee Free Strike',
				description: '',
				type: AbilityLogic.createTypeAction(true),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
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
				distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
				target: '1 creature or object',
				powerRoll: AbilityLogic.createPowerRoll({
					characteristic: [ Characteristic.Might, Characteristic.Agility ],
					tier1: '2 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				})
			}));
		}

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

		this.getKits(hero).forEach(kit => {
			if (kit.signatureAbility) {
				abilities.push(kit.signatureAbility);
			}
		});

		if (this.getKits(hero).some(kit => kit.mobility)) {
			abilities.push(AbilityLogic.createAbility({
				id: 'mobility',
				name: 'Mobility',
				description: '',
				type: AbilityLogic.createTypeTrigger('An enemy ends its turn adjacent to you.', true),
				distance: [ AbilityLogic.createDistanceSelf() ],
				target: 'Self',
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
		const skillNames: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				const data = f.data as FeatureSkillData;
				skillNames.push(...data.selected);
			});

		const skills: Skill[] = [];
		skillNames.forEach(name => {
			const skill = SkillLogic.getSkill(name, hero.settingID);
			if (skill) {
				skills.push(skill);
			}
		});

		return Collections.sort(skills, s => s.name);
	};

	///////////////////////////////////////////////////////////////////////////

	static getStamina = (hero: Hero) => {
		let value = 0;

		if (hero.class) {
			value += hero.class.startingStamina;
			value += hero.class.staminaPerLevel * (hero.class.level - 1);
		}

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.stamina), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Stamina)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
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
				}
			});

		return value;
	};

	static getRecoveries = (hero: Hero) => {
		let value = 0;

		if (hero.class) {
			value += hero.class.recoveries;
		}

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Recoveries)
			.forEach(data => {
				value += data.value;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
				}
			});

		return value;
	};

	static getSize = (size: Size) => {
		return `${size.value}${size.mod}`;
	};

	static getSpeed = (hero: Hero) => {
		let value = 0;

		if (hero.ancestry) {
			value += hero.ancestry.speed;
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

	static getMagicalDamageBonus = (hero: Hero, ability: Ability) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		if (ability.keywords.includes(AbilityKeyword.Magic)) {
			// Add maximum from kits
			const kits = this.getKits(hero);
			value1 += Collections.max(kits.map(kit => kit.magicalDamage?.tier1 || 0), value => value) || 0;
			value2 += Collections.max(kits.map(kit => kit.magicalDamage?.tier2 || 0), value => value) || 0;
			value3 += Collections.max(kits.map(kit => kit.magicalDamage?.tier3 || 0), value => value) || 0;
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

		if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Reach)) {
			// Add maximum reach bonus from kits
			return Collections.max(kits.map(kit => kit.reach), value => value) || 0;
		}

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Ranged)) {
			// Add maximum distance bonus from martial kits
			return Collections.max(kits.filter(kit => kit.type === KitType.Martial).map(kit => kit.distance), value => value) || 0;
		}

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Magic) && (distance.type === AbilityDistanceType.Ranged)) {
			// Add maximum distance bonus from caster kits
			return Collections.max(kits.filter(kit => kit.type === KitType.Caster).map(kit => kit.distance), value => value) || 0;
		}

		const areaTypes = [
			AbilityDistanceType.Aura,
			AbilityDistanceType.Burst,
			AbilityDistanceType.Cube,
			AbilityDistanceType.Line,
			AbilityDistanceType.Wall
		];

		if (ability.keywords.includes(AbilityKeyword.Magic) && areaTypes.includes(distance.type)) {
			// Add maximum area bonus from kits
			return Collections.max(kits.map(kit => kit.area), value => value) || 0;
		}

		return 0;
	};

	///////////////////////////////////////////////////////////////////////////

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
