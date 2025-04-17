import { Ability, AbilityDistance } from '../models/ability';
import { AbilityData } from '../data/ability-data';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Domain } from '../models/domain';
import { Feature } from '../models/feature';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { Kit } from '../models/kit';
import { Language } from '../models/language';
import { Modifier } from '../models/damage-modifier';
import { Size } from '../models/size';
import { Skill } from '../models/skill';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import { SourcebookLogic } from './sourcebook-logic';

export class HeroLogic {
	static getHeroDescription = (hero: Hero) => {
		return `Level ${hero.class?.level || 1} ${hero.ancestry?.name || 'Ancestry'} ${hero.class?.name || 'Class'}`;
	};

	static getKits = (hero: Hero) => {
		const kits: Kit[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				kits.push(...f.data.selected);
			});

		return kits;
	};

	static getDomains = (hero: Hero) => {
		const domains: Domain[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Domain)
			.forEach(f => {
				domains.push(...f.data.selected);
			});

		return domains;
	};

	static getFeatures = (hero: Hero) => {
		const features: Feature[] = [];

		if (hero.ancestry) {
			features.push(...FeatureLogic.getFeaturesFromAncestry(hero.ancestry, hero));
		}

		if (hero.culture) {
			features.push(...FeatureLogic.getFeaturesFromCulture(hero.culture, hero));
		}

		if (hero.career) {
			features.push(...FeatureLogic.getFeaturesFromCareer(hero.career, hero));
		}

		if (hero.class) {
			features.push(...FeatureLogic.getFeaturesFromClass(hero.class, hero));
		}

		if (hero.complication) {
			features.push(...FeatureLogic.getFeaturesFromComplication(hero.complication, hero));
		}

		features.push(...FeatureLogic.getFeaturesFromCustomization(hero));

		hero.state.inventory.forEach(item => {
			try {
				features.push(...FeatureLogic.getFeaturesFromItem(item, hero));
			} catch (ex) {
				console.error(ex);
			}
		});

		return Collections.sort(features, f => f.name);
	};

	static getAbilities = (hero: Hero, includeChoices: boolean, includeFreeStrikes: boolean, includeStandard: boolean) => {
		const abilities: Ability[] = [];

		if (includeFreeStrikes) {
			abilities.push(AbilityData.freeStrikeMelee);
			abilities.push(AbilityData.freeStrikeRanged);
		}

		if (includeChoices) {
			const choices: Ability[] = [];

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.Ability)
				.forEach(f => {
					choices.push(f.data.ability);
				});

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.ClassAbility)
				.forEach(f => {
					f.data.selectedIDs.forEach(abilityID => {
						const ability = hero.class?.abilities.find(a => a.id === abilityID);
						if (ability) {
							choices.push(ability);
						}
					});
				});

			Collections.distinct(choices.map(a => a.cost), a => a)
				.sort((a, b) => {
					if (a === 'signature' && b === 'signature') {
						return 0;
					}
					if (a === 'signature') {
						return -1;
					}
					if (b === 'signature') {
						return 1;
					}
					return a - b;
				})
				.forEach(cost => abilities.push(...Collections.sort(choices.filter(a => a.cost === cost), a => a.name)));
		}

		if (includeStandard) {
			abilities.push(AbilityData.advance);
			abilities.push(AbilityData.disengage);
			abilities.push(AbilityData.ride);
			abilities.push(AbilityData.aidAttack);
			abilities.push(AbilityData.catchBreath);
			abilities.push(AbilityData.drinkPotion);
			abilities.push(AbilityData.escapeGrab);
			abilities.push(AbilityData.grab);
			abilities.push(AbilityData.hide);
			abilities.push(AbilityData.knockback);
			abilities.push(AbilityData.makeAssistTest);
			abilities.push(AbilityData.search);
			abilities.push(AbilityData.standUp);
			abilities.push(AbilityData.charge);
			abilities.push(AbilityData.defend);
			abilities.push(AbilityData.heal);
		}

		return abilities;
	};

	static getFormerAncestries = (hero: Hero) => {
		return this.getFeatures(hero).filter(f => f.type === FeatureType.AncestryChoice).map(f => f.data.selected).filter(a => !!a);
	};

	static getCompanions = (hero: Hero) => {
		return this.getFeatures(hero).filter(f => f.type === FeatureType.Companion).map(f => f.data.selected).filter(a => !!a);
	};

	static getCharacteristic = (hero: Hero, characteristic: Characteristic) => {
		let value = 0;

		if (hero.class) {
			const ch = hero.class.characteristics.find(ch => ch.characteristic === characteristic);
			if (ch) {
				value += ch.value;
			}
		}

		hero.features
			.filter(f => f.type === FeatureType.CharacteristicBonus)
			.filter(f => f.data.characteristic === characteristic)
			.forEach(f => value += f.data.value);

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
				languageNames.push(f.data.language);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.LanguageChoice)
			.forEach(f => {
				languageNames.push(...f.data.selected);
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
				skillNames.push(f.data.skill);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.SkillChoice)
			.forEach(f => {
				skillNames.push(...f.data.selected);
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
		const modifiers: { damageType: string, value: number }[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				f.data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						const value = HeroLogic.calculateModifierValue(hero, dm);

						const existing = modifiers.find(x => x.damageType === dm.damageType);
						if (existing) {
							existing.value = Math.max(existing.value, value);
						} else {
							modifiers.push({
								damageType: dm.damageType,
								value: value
							});
						}
					});
			});

		return Collections.sort(modifiers, dm => dm.damageType);
	};

	static calculateModifierValue = (hero: Hero, mod: Modifier) => {
		let value = mod.value;

		value += (Collections.max(mod.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0) * mod.valueCharacteristicMultiplier;

		if (hero.class) {
			value += mod.valuePerLevel * (hero.class.level - 1);
			value += mod.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
		}

		return value;
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Stamina)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.RecoveryValue)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Recoveries)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getSize = (hero: Hero) => {
		const featureSizes = this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Size)
			.map(f => f.data.size);
		if (featureSizes.length > 0) {
			const value = Collections.max(featureSizes.map(s => s.value), v => v);
			const mods = Collections.distinct(featureSizes.map(s => s.mod), m => m);
			return {
				value: value,
				mod: value === 1 ? mods[0] : ''
			} as Size;
		}

		const ancestrySizes = this.getFormerAncestries(hero)
			.flatMap(a => a.features.filter(f => f.type === FeatureType.Size))
			.map(f => f.data.size);
		if (ancestrySizes.length > 0) {
			const value = Collections.max(ancestrySizes.map(s => s.value), v => v);
			const mods = Collections.distinct(ancestrySizes.map(s => s.mod), m => m);
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Speed)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Stability)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
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
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Disengage)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getRenown = (hero: Hero) => {
		let value = hero.state.renown;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Renown)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getProjectPoints = (hero: Hero) => {
		let value = hero.state.projectPoints;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data)
			.filter(data => data.field === FeatureField.ProjectPoints)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getWealth = (hero: Hero) => {
		let value = hero.state.wealth;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data)
			.filter(data => data.field === FeatureField.Wealth)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
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

	static getFeatureDamageBonus = (hero: Hero, ability: Ability) => {
		let value = 0;

		HeroLogic.getFeatures(hero)
			.filter(f => f.type === FeatureType.AbilityDamage)
			.filter(f => f.data.keywords.some(kw => ability.keywords.includes(kw)))
			.forEach(f => {
				const mod = HeroLogic.calculateModifierValue(hero, f.data);
				value += mod;
			});

		return value;
	};

	static getDistanceBonus = (hero: Hero, ability: Ability, distance: AbilityDistance) => {
		let value = 0;

		switch (distance.type) {
			case AbilityDistanceType.Melee:
				if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon)) {
					// Add maximum melee distance bonus from kits
					value += Collections.max(this.getKits(hero).map(kit => kit.meleeDistance), value => value) || 0;
				}
				break;
			case AbilityDistanceType.Ranged:
				if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon)) {
					// Add maximum ranged distance bonus from kits
					value += Collections.max(this.getKits(hero).map(kit => kit.rangedDistance), value => value) || 0;
				}
				break;
		}

		HeroLogic.getFeatures(hero)
			.filter(f => f.type === FeatureType.AbilityDistance)
			.filter(f => f.data.keywords.every(kw => ability.keywords.includes(kw)))
			.forEach(f => {
				const mod = HeroLogic.calculateModifierValue(hero, f.data);
				value += mod;
			});

		return value;
	};

	///////////////////////////////////////////////////////////////////////////

	static canUseItem = (hero: Hero, item: Item) => {
		switch (item.type) {
			case ItemType.LeveledArmor:
				return HeroLogic.getKits(hero).flatMap(k => k.armor).some(a => item.keywords.includes(a));
			case ItemType.LeveledWeapon:
				return HeroLogic.getKits(hero).flatMap(k => k.weapon).some(w => item.keywords.includes(w));
		}

		return true;
	};

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

	static getCharacteristicArrays = (primaryCount: number) => {
		if (primaryCount === 2) {
			return [
				[ 2, -1, -1 ],
				[ 1, 0, 0 ],
				[ 1, 1, -1 ]
			];
		}

		if (primaryCount === 1) {
			return [
				[ 2, 2, -1, -1 ],
				[ 2, 1, 1, -1 ],
				[ 2, 1, 0, 0 ],
				[ 1, 1, 1, 0 ]
			];
		}

		return [];
	};

	static calculateCharacteristicArrays = (array: number[], primary: Characteristic[]) => {
		const all = [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ];
		const others = all.filter(c => !primary.includes(c));

		return Collections.distinct(Collections.getPermutations(array), item => item.join(', ')).map(arr => {
			return all.map(ch => {
				let value = 0;
				if (primary.includes(ch)) {
					value = 2;
				} else {
					const index = others.indexOf(ch);
					value = arr[index];
				}
				return {
					characteristic: ch,
					value: value
				};
			});
		});
	};

	static calculatePotency = (hero: Hero, strength: 'weak' | 'average' | 'strong') => {
		const value = hero.class && (hero.class.characteristics.length > 0) ? Math.max(...hero.class.characteristics.map(c => c.value)) : 0;

		switch (strength) {
			case 'weak':
				return value - 2;
			case 'average':
				return value - 1;
			case 'strong':
				return value;
		}
	};

	static isWinded = (hero: Hero) => {
		return hero.state.staminaDamage >= (HeroLogic.getStamina(hero) / 2);
	};

	static getMinXP = (level: number) => {
		switch (level) {
			case 1:
				return 0;
			case 2:
				return 16;
			case 3:
				return 32;
			case 4:
				return 48;
			case 5:
				return 64;
			case 6:
				return 80;
			case 7:
				return 96;
			case 8:
				return 112;
			case 9:
				return 128;
			case 10:
				return 144;
		}

		return 0;
	};

	static canLevelUp = (hero: Hero) => {
		if (!hero.class) {
			return false;
		}

		return hero.state.xp >= this.getMinXP(hero.class.level + 1);
	};

	static takeRespite = (hero: Hero) => {
		hero.state.staminaDamage = 0;
		hero.state.staminaTemp = 0;
		hero.state.recoveriesUsed = 0;
		hero.state.surges = 0;
		hero.state.heroicResource = 0;
		hero.state.xp += hero.state.victories;
		hero.state.victories = 0;
		hero.state.conditions = [];
		hero.state.hidden = false;
		hero.state.acted = false;
		hero.state.defeated = false;
	};

	///////////////////////////////////////////////////////////////////////////

	static updateHero = (hero: Hero) => {
		if (hero.folder === undefined) {
			hero.folder = '';
		}

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

		if (hero.class) {
			if (hero.class.primaryCharacteristicsOptions === undefined) {
				hero.class.primaryCharacteristicsOptions = [];
			}
		}

		if (hero.features === undefined) {
			hero.features = [];
		}

		hero.state.conditions.forEach(c => {
			if (c.text === undefined) {
				c.text = '';
			}
		});

		if (hero.state.surges === undefined) {
			hero.state.surges = 0;
		}

		if (hero.state.staminaTemp === undefined) {
			hero.state.staminaTemp = 0;
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

		if (hero.state.projects === undefined) {
			hero.state.projects = [];
		}

		if (hero.state.notes === undefined) {
			hero.state.notes = '';
		}

		if (hero.state.acted === undefined) {
			hero.state.acted = false;
		}

		if (hero.state.defeated === undefined) {
			hero.state.defeated = false;
		}

		hero.state.inventory.forEach(item => {
			if (item.customizationsByLevel === undefined) {
				item.customizationsByLevel = [
					{
						level: 1,
						features: []
					},
					{
						level: 5,
						features: []
					},
					{
						level: 9,
						features: []
					}
				];
			}
		});

		if (hero.abilityCustomizations === undefined) {
			hero.abilityCustomizations = [];
		}

		this.getFeatures(hero).filter(f => f.type === FeatureType.Bonus).forEach(f => {
			if (f.data.valueCharacteristics === undefined) {
				f.data.valueCharacteristics = [];
			}
			if (f.data.valuePerEchelon === undefined) {
				f.data.valuePerEchelon = 0;
			}
		});

		this.getFeatures(hero).filter(f => f.type === FeatureType.DamageModifier).forEach(f => {
			f.data.modifiers.forEach(dm => {
				if (dm.valueCharacteristics === undefined) {
					dm.valueCharacteristics = [];
				}
				if (dm.valueCharacteristicMultiplier === undefined) {
					dm.valueCharacteristicMultiplier = 1;
				}
				if (dm.valuePerEchelon === undefined) {
					dm.valuePerEchelon = 0;
				}
			});
		});

		this.getFeatures(hero).filter(f => f.type === FeatureType.Kit).forEach(f => {
			if (f.data.types.includes('Standard')) {
				f.data.types = f.data.types.filter(t => t !== 'Standard');
				f.data.types.push('');
			}
		});

		this.getFeatures(hero).filter(f => f.type === FeatureType.ItemChoice).forEach(f => {
			f.data.selected.forEach(item => {
				if (item.customizationsByLevel === undefined) {
					item.customizationsByLevel = [
						{
							level: 1,
							features: []
						},
						{
							level: 5,
							features: []
						},
						{
							level: 9,
							features: []
						}
					];
				}
			});
		});

		this.getKits(hero).forEach(k => {
			if (k.type === 'Standard') {
				k.type = '';
			}
		});
	};
}
