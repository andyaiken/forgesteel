import { Ability, AbilityDistance } from '../models/ability';
import { Feature, FeatureAbility, FeatureClassAbility } from '../models/feature';
import { AbilityData } from '../data/ability-data';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Ancestry } from '../models/ancestry';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { ConditionType } from '../enums/condition-type';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Domain } from '../models/domain';
import { FactoryLogic } from './factory-logic';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { Kit } from '../models/kit';
import { Language } from '../models/language';
import { Modifier } from '../models/damage-modifier';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { NameGenerator } from '../utils/name-generator';
import { Perk } from '../models/perk';
import { Size } from '../models/size';
import { Skill } from '../models/skill';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import { SourcebookLogic } from './sourcebook-logic';
import { Title } from '../models/title';
import { Utils } from '../utils/utils';

export class HeroLogic {
	static getHeroDescription = (hero: Hero) => {
		if (!hero.class || !hero.ancestry) {
			return 'Hero';
		}

		return `Level ${hero.class.level} ${hero.ancestry.name} ${hero.class.name}`;
	};

	static getFeatures = (hero: Hero) => {
		const features: { feature: Feature, source: string }[] = [];

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

		return Collections.sort(features, f => f.feature.name);
	};

	static getPerks = (hero: Hero) => {
		const perks: Perk[] = [];

		// Collate from features
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Perk)
			.forEach(f => {
				perks.push(...f.data.selected);
			});

		return perks;
	};

	static getKits = (hero: Hero) => {
		const kits: Kit[] = [];

		// Collate from features
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				kits.push(...f.data.selected);
			});

		return kits;
	};

	static getTitles = (hero: Hero) => {
		const titles: Title[] = [];

		// Collate from features
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.TitleChoice)
			.forEach(f => {
				titles.push(...f.data.selected);
			});

		return titles;
	};

	static getDomains = (hero: Hero) => {
		const domains: Domain[] = [];

		// Collate from features
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Domain)
			.forEach(f => {
				domains.push(...f.data.selected);
			});

		return domains;
	};

	static getAbilities = (hero: Hero, includeStandard: boolean) => {
		const choices: { ability: Ability, source: string }[] = [];

		this.getFeatures(hero)
			.filter(f => f.feature.type === FeatureType.Ability)
			.forEach(f => {
				choices.push({ ability: (f.feature as FeatureAbility).data.ability, source: f.source });
			});

		this.getFeatures(hero)
			.filter(f => f.feature.type === FeatureType.ClassAbility)
			.forEach(f => {
				(f.feature as FeatureClassAbility).data.selectedIDs.forEach(abilityID => {
					const ability = hero.class?.abilities.find(a => a.id === abilityID);
					if (ability) {
						choices.push({ ability: ability, source: f.source });
					}
				});
			});

		const abilities: { ability: Ability, source: string }[] = [];

		Collections.distinct(choices.map(a => a.ability.cost), a => a)
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
			.forEach(cost => abilities.push(...Collections.sort(choices.filter(a => a.ability.cost === cost), a => a.ability.name)));

		if (includeStandard) {
			abilities.push({ ability: AbilityData.advance, source: 'Standard' });
			abilities.push({ ability: AbilityData.disengage, source: 'Standard' });
			abilities.push({ ability: AbilityData.ride, source: 'Standard' });
			abilities.push({ ability: AbilityData.aidAttack, source: 'Standard' });
			abilities.push({ ability: AbilityData.catchBreath, source: 'Standard' });
			abilities.push({ ability: AbilityData.drinkPotion, source: 'Standard' });
			abilities.push({ ability: AbilityData.escapeGrab, source: 'Standard' });
			abilities.push({ ability: AbilityData.grab, source: 'Standard' });
			abilities.push({ ability: AbilityData.hide, source: 'Standard' });
			abilities.push({ ability: AbilityData.knockback, source: 'Standard' });
			abilities.push({ ability: AbilityData.makeAssistTest, source: 'Standard' });
			abilities.push({ ability: AbilityData.search, source: 'Standard' });
			abilities.push({ ability: AbilityData.standUp, source: 'Standard' });
			abilities.push({ ability: AbilityData.charge, source: 'Standard' });
			abilities.push({ ability: AbilityData.defend, source: 'Standard' });
			abilities.push({ ability: AbilityData.heal, source: 'Standard' });
			abilities.push({ ability: AbilityData.swap, source: 'Standard' });
		}

		return abilities;
	};

	static getFormerAncestries = (hero: Hero) => {
		return this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.AncestryChoice)
			.map(f => f.data.selected)
			.filter(a => !!a);
	};

	static getCompanions = (hero: Hero) => {
		return this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Companion)
			.map(f => f.data.selected)
			.filter(a => !!a);
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
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Language)
			.forEach(f => {
				languageNames.push(f.data.language);
			});
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.LanguageChoice)
			.forEach(f => {
				languageNames.push(...f.data.selected);
			});

		const allLanguages = sourcebooks.flatMap(cs => cs.languages);

		const languages: Language[] = [];
		Collections.distinct(languageNames, l => l)
			.forEach(name => {
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
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				skillNames.push(f.data.skill);
			});
		this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.SkillChoice)
			.forEach(f => {
				skillNames.push(...f.data.selected);
			});

		const skills: Skill[] = [];
		Collections.distinct(skillNames, s => s)
			.forEach(name => {
				const skill = SourcebookLogic.getSkill(name, sourcebooks);
				if (skill) {
					skills.push(skill);
				}
			});

		return Collections.sort(skills, s => s.name);
	};

	static getConditionImmunities = (hero: Hero) => {
		const conditions: ConditionType[] = [];

		// Collate from features
		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.ConditionImmunity)
			.forEach(f => {
				f.data.conditions.forEach(c => {
					if (!conditions.includes(c)) {
						conditions.push(c);
					}
				});
			});

		return Collections.sort(conditions, c => c);
	};

	static getDamageModifiers = (hero: Hero, type: DamageModifierType) => {
		const modifiers: { damageType: string, value: number }[] = [];

		// Collate from features
		this.getFeatures(hero)
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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

		const features = this.getFeatures(hero)
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.Speed);
		if (features.length > 0) {
			const datas = features.map(f => f.data);
			value = Collections.max(datas.map(d => d.speed), v => v) || 0;
		}

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.speed), value => value) || 0;

		this.getFeatures(hero)
			.map(f => f.feature)
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

		if (hero.state.conditions.some(c => [ ConditionType.Grabbed, ConditionType.Restrained ].includes(c.type))) {
			value = 0;
		}
		if (hero.state.conditions.some(c => [ ConditionType.Slowed ].includes(c.type))) {
			value = Math.min(value, 2);
		}

		return value;
	};

	static getSpeedModified = (hero: Hero) => {
		if (hero.state.conditions.some(c => [ ConditionType.Grabbed, ConditionType.Restrained, ConditionType.Slowed ].includes(c.type))) {
			return true;
		}

		return false;
	};

	static getStability = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.stability), value => value) || 0;

		this.getFeatures(hero)
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
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
			.map(f => f.feature)
			.filter(f => f.type === FeatureType.AbilityDamage)
			.filter(f => f.data.keywords.every(kw => ability.keywords.includes(kw)))
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
			.map(f => f.feature)
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

	static getCombatState = (hero: Hero) => {
		const maxStamina = HeroLogic.getStamina(hero);
		if (maxStamina > 0) {
			const winded = Math.floor(maxStamina / 2);
			const currentStamina = maxStamina - hero.state.staminaDamage;

			if (currentStamina <= -winded) {
				return 'dead';
			}

			if (currentStamina <= 0) {
				return 'dying';
			}

			if (currentStamina <= winded) {
				return 'winded';
			}

			if (currentStamina < maxStamina) {
				return 'injured';
			}
		}

		return 'healthy';
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
		hero.state.encounterState = 'ready';
		hero.state.defeated = false;
	};

	///////////////////////////////////////////////////////////////////////////

	static createRandomHero = () => {
		const sourcebooks = [ SourcebookData.core, SourcebookData.orden ];
		const hero = FactoryLogic.createHero(sourcebooks.map(sb => sb.id));
		hero.name = NameGenerator.generateName();
		hero.ancestry = Collections.draw(SourcebookLogic.getAncestries(sourcebooks));
		hero.culture = Collections.draw(SourcebookLogic.getCultures(sourcebooks));
		hero.career = Collections.draw(SourcebookLogic.getCareers(sourcebooks));
		hero.class = Collections.draw(SourcebookLogic.getClasses(sourcebooks));

		hero.class.primaryCharacteristics = Collections.draw(hero.class.primaryCharacteristicsOptions);
		const array = Collections.draw(HeroLogic.getCharacteristicArrays(hero.class.primaryCharacteristics.length));
		hero.class.characteristics = Collections.draw(HeroLogic.calculateCharacteristicArrays(array, hero.class.primaryCharacteristics));

		while (hero.class.subclasses.filter(sc => sc.selected).length < hero.class.subclassCount) {
			const options = hero.class.subclasses.filter(sc => !sc.selected);
			Collections.draw(options).selected = true;
		}

		HeroLogic.getFeatures(hero)
			.map(f => f.feature)
			.filter(feature => FeatureLogic.isChoice(feature))
			.forEach(feature => {
				switch (feature.type) {
					case FeatureType.AncestryChoice: {
						const options = SourcebookLogic.getAncestries(sourcebooks);
						feature.data.selected = Collections.draw(options);
						break;
					}
					case FeatureType.AncestryFeatureChoice: {
						const ancestries: Ancestry[] = [];
						if (feature.data.source.current) {
							if (hero.ancestry) {
								ancestries.push(hero.ancestry);
							}
						}
						if (feature.data.source.former) {
							ancestries.push(...HeroLogic.getFormerAncestries(hero));
						}
						const options = ancestries
							.flatMap(a => a.features)
							.filter(f => f.type === FeatureType.Choice)
							.flatMap(f => f.data.options)
							.filter(opt => feature.data.value === opt.value)
							.filter(opt => opt.feature.type !== FeatureType.AncestryFeatureChoice)
							.map(opt => opt.feature);
						feature.data.selected = Collections.draw(options);
						break;
					}
					case FeatureType.Choice: {
						let remaining = feature.data.count;
						while (feature.data.options.some(o => o.value <= remaining)) {
							const currentIDs = feature.data.selected.map(f => f.id);
							const options = feature.data.options
								.filter(o => !currentIDs.includes(o.feature.id))
								.filter(o => o.value <= remaining);
							const selected = Collections.draw(options);
							feature.data.selected.push(selected.feature);
							remaining -= selected.value;
						}
						break;
					}
					case FeatureType.ClassAbility: {
						if (hero.class) {
							while (feature.data.selectedIDs.length < feature.data.count) {
								const currentIDs = feature.data.selectedIDs;
								const options = hero.class.abilities
									.filter(a => !currentIDs.includes(a.id))
									.filter(a => a.cost === feature.data.cost);
								const selected = Collections.draw(options);
								feature.data.selectedIDs.push(selected.id);
							}
						}
						break;
					}
					case FeatureType.Companion: {
						const options = SourcebookLogic.getMonsterGroups(sourcebooks)
							.flatMap(mg => mg.monsters)
							.filter(m => {
								switch (feature.data.type) {
									case 'companion':
										return true;
									case 'mount':
										return m.role.type === MonsterRoleType.Mount;
									case 'retainer':
										return m.role.organization === MonsterOrganizationType.Retainer;
								}
							});
						feature.data.selected = Collections.draw(Utils.copy(options));
						break;
					}
					case FeatureType.Domain: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = HeroLogic.getDomains(hero).map(d => d.id);
							const options = SourcebookLogic.getDomains(sourcebooks)
								.filter(a => !currentIDs.includes(a.id));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.DomainFeature: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = HeroLogic.getFeatures(hero).map(f => f.feature.id);
							const options = HeroLogic.getDomains(hero)
								.flatMap(d => d.featuresByLevel)
								.filter(lvl => lvl.level === feature.data.level)
								.flatMap(lvl => lvl.features)
								.filter(f => !currentIDs.includes(f.id));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.ItemChoice: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = feature.data.selected.map(d => d.id);
							const options = SourcebookLogic.getItems(sourcebooks)
								.filter(i => !currentIDs.includes(i.id))
								.filter(i => (feature.data.types.length === 0) || feature.data.types.includes(i.type));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.Kit: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = HeroLogic.getKits(hero).map(k => k.id);
							const options = SourcebookLogic.getKits(sourcebooks)
								.filter(k => !currentIDs.includes(k.id))
								.filter(k => (feature.data.types.length === 0) || feature.data.types.includes(k.type));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.LanguageChoice: {
						while (feature.data.selected.length < feature.data.count) {
							const current = HeroLogic.getLanguages(hero, sourcebooks).map(l => l.name);
							const options = SourcebookLogic.getLanguages(sourcebooks)
								.filter(l => !current.includes(l.name));
							feature.data.selected.push(Collections.draw(options).name);
						}
						break;
					}
					case FeatureType.Perk: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = HeroLogic.getPerks(hero).map(p => p.id);
							const options = SourcebookLogic.getPerks(sourcebooks)
								.filter(p => !currentIDs.includes(p.id))
								.filter(p => (feature.data.lists.length === 0) || feature.data.lists.includes(p.list));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.SkillChoice: {
						while (feature.data.selected.length < feature.data.count) {
							const current = HeroLogic.getSkills(hero, sourcebooks).map(s => s.name);
							const allOptions = [ ...feature.data.options ];
							feature.data.listOptions.forEach(list => {
								SourcebookLogic.getSkills(sourcebooks)
									.filter(s => s.list === list)
									.map(s => s.name)
									.forEach(s => allOptions.push(s));
							});
							const options = allOptions
								.filter(s => !current.includes(s));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.TaggedFeatureChoice: {
						while (feature.data.selected.length < feature.data.count) {
							const taggedFeatures = HeroLogic.getFeatures(hero)
								.map(f => f.feature)
								.filter(f => f.type === FeatureType.TaggedFeature)
								.filter(f => f.data.tag === feature.data.tag);
							const currentIDs = HeroLogic.getFeatures(hero)
								.map(f => f.feature)
								.filter(f => f.type === FeatureType.TaggedFeatureChoice)
								.flatMap(f => f.data.selected)
								.map(f => f.id);
							const options = taggedFeatures
								.filter(t => !currentIDs.includes(t.id));
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
					case FeatureType.TitleChoice: {
						while (feature.data.selected.length < feature.data.count) {
							const currentIDs = HeroLogic.getTitles(hero).map(t => t.id);
							const options = SourcebookLogic.getTitles(sourcebooks)
								.filter(t => !currentIDs.includes(t.id))
								.filter(t => feature.data.echelon === t.echelon);
							feature.data.selected.push(Collections.draw(options));
						}
						break;
					}
				};
			});

		// Choose culture language
		const currentLanguages = HeroLogic.getLanguages(hero, sourcebooks).map(l => l.name);
		const options = SourcebookLogic.getLanguages(sourcebooks)
			.filter(l => !currentLanguages.includes(l.name));
		hero.culture.languages.push(Collections.draw(options).name);

		// Choose career inciting incident
		hero.career.incitingIncidents.selectedID = Collections.draw(hero.career.incitingIncidents.options.map(ii => ii.id));

		return hero;
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

		if (hero.state.encounterState === undefined) {
			hero.state.encounterState = 'ready';
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

		this.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.Bonus).forEach(f => {
			if (f.data.valueCharacteristics === undefined) {
				f.data.valueCharacteristics = [];
			}
			if (f.data.valuePerEchelon === undefined) {
				f.data.valuePerEchelon = 0;
			}
		});

		this.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.DamageModifier).forEach(f => {
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

		this.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.Kit).forEach(f => {
			if (f.data.types.includes('Standard')) {
				f.data.types = f.data.types.filter(t => t !== 'Standard');
				f.data.types.push('');
			}
		});

		this.getFeatures(hero).map(f => f.feature).filter(f => f.type === FeatureType.ItemChoice).forEach(f => {
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
