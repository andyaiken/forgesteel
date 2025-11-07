import { FeatureMalice, FeatureMaliceAbility } from '@/models/feature';
import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { ConditionType } from '@/enums/condition-type';
import { CreatureLogic } from '@/logic/creature-logic';
import { DamageModifierType } from '@/enums/damage-modifier-type';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { FeatureLogic } from '@/logic/feature-logic';
import { FeatureType } from '@/enums/feature-type';
import { ModifierLogic } from '@/logic/modifier-logic';
import { Monster } from '@/models/monster';
import { MonsterData } from '@/data/monster-data';
import { MonsterFeatureCategory } from '@/enums/monster-feature-category';
import { MonsterFilter } from '@/models/filter';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { MonsterState } from '@/models/monster-state';
import { Random } from '@/utils/random';
import { Skill } from '@/models/skill';
import { SkillList } from '@/enums/skill-list';
import { Sourcebook } from '@/models/sourcebook';
import { SourcebookLogic } from '@/logic/sourcebook-logic';
import { Utils } from '@/utils/utils';

export class MonsterLogic {
	static getMonsterName = (monster: Monster, group?: MonsterGroup) => {
		if (monster.name) {
			return monster.name;
		}

		if (group && group.name) {
			return `${group.name} ${monster.role.type}`;
		}

		return 'Unnamed Monster';
	};

	static getMonsterLevel = (monster: Monster) => {
		if (monster.retainer && monster.retainer.level) {
			return monster.retainer.level;
		}

		return monster.level;
	};

	static getMonsterDescription = (monster: Monster) => {
		const lvl = MonsterLogic.getMonsterLevel(monster);

		if (monster.role.type === MonsterRoleType.NoRole) {
			if (monster.role.organization === MonsterOrganizationType.NoOrganization) {
				return lvl ? `Level ${lvl}` : '';
			} else {
				return lvl ? `Level ${lvl} ${monster.role.organization}` : `${monster.role.organization}`;
			}
		}

		if (monster.role.organization === MonsterOrganizationType.NoOrganization) {
			return lvl ? `Level ${lvl} ${monster.role.type}` : `${monster.role.type}`;
		}

		const orgGoesLast = [
			MonsterOrganizationType.Retainer
		].includes(monster.role.organization);
		if (orgGoesLast) {
			return lvl ? `Level ${lvl} ${monster.role.type} ${monster.role.organization}` : `${monster.role.type} ${monster.role.organization}`;
		}

		return lvl ? `Level ${lvl} ${monster.role.organization} ${monster.role.type}` : `${monster.role.organization} ${monster.role.type}`;
	};

	static getStamina = (monster: Monster) => {
		let stamina = monster.stamina;

		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Bonus)
			.filter(f => f.data.field === FeatureField.Stamina)
			.forEach(f => {
				stamina += ModifierLogic.calculateModifierValue(f.data, monster);
			});

		if (monster.retainer && monster.retainer.level) {
			stamina += 9 * (monster.retainer.level - monster.level);
		}

		return stamina;
	};

	static getSignatureDamageBonus = (monster: Monster) => {
		let tier1 = 0;
		let tier2 = 0;
		let tier3 = 0;

		if (monster.retainer && monster.retainer.level) {
			const levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].filter(lvl => (lvl > monster.level) && (lvl <= monster.retainer!.level));
			tier1 += levels.filter(lvl => lvl % 2 === 0).length;
			tier2 += levels.length;
			tier3 += levels.length;
		}

		if (tier1 + tier2 + tier3 === 0) {
			return null;
		}

		return {
			tier1: tier1,
			tier2: tier2,
			tier3: tier3
		};
	};

	static getFreeStrikeDamage = (monster: Monster) => {
		let damage = monster.freeStrikeDamage;

		if (monster.retainer && monster.retainer.level) {
			const levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].filter(lvl => (lvl > monster.level) && (lvl <= monster.retainer!.level));
			damage += levels.filter(lvl => lvl % 3 === 0).length * 2;
		}

		return damage;
	};

	static getFreeStrikeDistance = (monster: Monster) => {
		const distance = monster.features.filter(f => f.type === FeatureType.Ability)
			.filter(f => f.data.ability.cost === 'signature')
			.map(f => f.data.ability)
			.reduce((distance, a) => {
				const abilityRangedDistance = a.distance.filter(d => d.type === AbilityDistanceType.Ranged)
					.reduce((rd, ad) => {
						return Math.max(rd, ad.value);
					}, 0);
				return Math.max(distance, abilityRangedDistance);
			}, 5);

		return distance;
	};

	static getFeatures = (monster: Monster) => {
		const features = [ ...monster.features ];

		if (monster.retainer) {
			monster.retainer.featuresByLevel
				.filter(lvl => lvl.level <= MonsterLogic.getMonsterLevel(monster))
				.forEach(lvl => {
					if (lvl.feature) {
						switch (lvl.feature.type) {
							case FeatureType.Choice:
								features.push(...lvl.feature.data.selected);
								break;
							case FeatureType.Multiple:
								features.push(...lvl.feature.data.features);
								break;
							default:
								features.push(lvl.feature);
								break;
						}
					}
				});
		}

		return features;
	};

	static matches = (monster: Monster, filter: MonsterFilter) => {
		if (filter.name) {
			const tokens = filter.name.toLowerCase().split(' ');
			const monsterName = MonsterLogic.getMonsterName(monster);
			if (!tokens.every(token => monsterName.toLowerCase().includes(token))) {
				return false;
			}
		}

		if (filter.keywords.length > 0) {
			if (!filter.keywords.every(k => monster.keywords.includes(k))) {
				return false;
			}
		}

		if (filter.roles.length > 0) {
			if (!filter.roles.includes(monster.role.type)) {
				return false;
			}
		}

		if (filter.organizations.length > 0) {
			if (!filter.organizations.includes(monster.role.organization)) {
				return false;
			}
		}

		if (filter.size.length > 0) {
			const minSize = Math.min(...filter.size);
			const maxSize = Math.max(...filter.size);
			if ((monster.size.value < minSize) || (monster.size.value > maxSize)) {
				return false;
			}
		}

		if (filter.level.length > 0) {
			const minLevel = Math.min(...filter.level);
			const maxLevel = Math.max(...filter.level);
			if ((monster.level < minLevel) || (monster.level > maxLevel)) {
				return false;
			}
		}

		if (filter.ev.length > 0) {
			const minEV = Math.min(...filter.ev);
			const maxEV = Math.max(...filter.ev);
			if ((monster.encounterValue < minEV) || (monster.encounterValue > maxEV)) {
				return false;
			}
		}

		return true;
	};

	static getRoleMultiplier = (organization: MonsterOrganizationType) => {
		switch (organization) {
			case MonsterOrganizationType.Minion:
				return 4;
		}

		return 1;
	};

	static getCharacteristic = (monster: Monster, characteristic: Characteristic) => {
		let value = 0;

		const ch = monster.characteristics.find(ch => ch.characteristic === characteristic);
		if (ch) {
			value = ch.value;
		}

		MonsterLogic.getFeatures(monster).forEach(f => {
			if (f.type === FeatureType.CharacteristicBonus) {
				if (f.data.characteristic === characteristic) {
					value += f.data.value;
				}
			}
		});

		return value;
	};

	static getStability = (monster: Monster) => {
		let stability = monster.stability;

		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Bonus)
			.filter(f => f.data.field === FeatureField.Stability)
			.forEach(f => {
				stability += ModifierLogic.calculateModifierValue(f.data, monster);
			});

		return stability;
	};

	static getSpeed = (monster: Monster) => {
		let value = monster.speed.value;

		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Bonus)
			.filter(f => f.data.field === FeatureField.Speed)
			.forEach(f => {
				value += ModifierLogic.calculateModifierValue(f.data, monster);
			});

		if (monster.state.conditions.some(c => [ ConditionType.Grabbed, ConditionType.Restrained ].includes(c.type))) {
			value = 0;
		}
		if (monster.state.conditions.some(c => [ ConditionType.Slowed ].includes(c.type))) {
			value = Math.min(value, 2);
		}

		return {
			value: value,
			modes: monster.speed.modes
		};
	};

	static getSpeedModified = (monster: Monster) => {
		if (monster.state.conditions.some(c => [ ConditionType.Grabbed, ConditionType.Restrained, ConditionType.Slowed ].includes(c.type))) {
			return true;
		}

		return false;
	};

	static getConditionImmunities = (monster: Monster) => {
		const conditions: ConditionType[] = [];

		// Collate from features
		MonsterLogic.getFeatures(monster)
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

	static getDamageModifiers = (monster: Monster, type: DamageModifierType) => {
		const modifiers: { damageType: string, value: number }[] = [];

		// Collate from features
		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				f.data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						const value = ModifierLogic.calculateModifierValue(dm, monster);

						const existing = modifiers.find(x => x.damageType === dm.damageType);
						if (existing) {
							existing.value += dm.value;
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

	static getCombatState = (monster: Monster) => {
		const maxStamina = MonsterLogic.getStamina(monster);
		if ((monster.role.organization !== MonsterOrganizationType.Minion) && (maxStamina > 0)) {
			const winded = Math.floor(maxStamina / 2);
			const currentStamina = maxStamina - monster.state.staminaDamage;

			if (currentStamina <= 0) {
				return 'dead';
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

	static getRoleTypeDescription = (type: MonsterRoleType) => {
		switch (type) {
			case MonsterRoleType.Ambusher:
				return 'Ambushers are melee warriors who can slip by beefier heroes to reach squishier targets in the back lines.';
			case MonsterRoleType.Artillery:
				return 'Artillery creatures fight best from afar, and can use their most powerful abilities at great distance.';
			case MonsterRoleType.Brute:
				return 'Brutes are hardy creatures who have lots of Stamina and deal lots of damage. They have abilities and traits that make them difficult to ignore and hard to get away from, and that let them push enemies around.';
			case MonsterRoleType.Controller:
				return 'Controllers are creatures who change the battlefield, often with magic or psionics. They reposition foes and alter terrain to make it more advantageous for their allies. Controllers are often on the squishier side, so they need some protection!';
			case MonsterRoleType.Defender:
				return 'Defenders are tough creatures able to take a lot of damage, and who can force enemies to attack them instead of squishier targets. Defenders often act in squads with allies who have lower Stamina, such as controllers and hexers.';
			case MonsterRoleType.Harrier:
				return 'Harriers are mobile warriors who make definitive use of hit-and-run tactics. Their traits allow them to make the most of their positioning on the battlefield.';
			case MonsterRoleType.Hexer:
				return 'Hexers specialize in debuffing enemies with conditions and other effects. They are generally squishy and rely on allies to help defend them.';
			case MonsterRoleType.Mount:
				return 'Mounts are mobile creatures meant to be ridden in combat, and who make their riders even more dangerous. Mounts act at the same time as their riders.';
			case MonsterRoleType.Support:
				return 'Support creatures specialize in aiding their allies, providing buffs, healing, movement, or action options.';
		}

		return '';
	};

	static getRoleOrganizationDescription = (organization: MonsterOrganizationType) => {
		switch (organization) {
			case MonsterOrganizationType.Minion:
				return 'Minions are weaker enemies who are made to die fast and threaten heroes en masse.';
			case MonsterOrganizationType.Horde:
				return 'Monster bands are hardier and work in smaller groups than minions, but it still takes multiple of these creatures to effectively threaten a single hero of the same level.';
			case MonsterOrganizationType.Platoon:
				return 'Monster platoons are highly organized and usually self- sufficient armies.';
			case MonsterOrganizationType.Elite:
				return 'Troops are the functional opposite of minions. A creature under the troop organization is hardy and can usually stand up to two heroes of the same level on their own.';
			case MonsterOrganizationType.Leader:
				return 'A leader is a powerful who buffs their allies and grants them extra actions.';
			case MonsterOrganizationType.Solo:
				return 'A creature under a solo organization is an encounter all on their own.';
			case MonsterOrganizationType.Retainer:
				return 'A retainer is a type of follower who fights alongside the heroes. A retainer can gain levels just as heroes do, so their battlefield contributions remain relevant as the heroes advance.';
		}
	};

	static getStaminaDescription = (monster: Monster) => {
		const max = MonsterLogic.getStamina(monster);
		let str = `${max}`;

		if (monster.state.staminaDamage > 0) {
			str = `${Math.max(max - monster.state.staminaDamage, 0)} / ${max}`;
		}
		if (monster.state.staminaTemp > 0) {
			str += ` +${monster.state.staminaTemp}`;
		}

		return str;
	};

	static getWindedThreshold = (monster: Monster) => {
		return Math.floor(MonsterLogic.getStamina(monster) / 2);
	};

	static getDeadThreshold = (monster: Monster) => {
		return -MonsterLogic.getWindedThreshold(monster);
	};

	static getSkills = (monster: Monster, sourcebooks: Sourcebook[]) => {
		const skillNames: string[] = [];

		// Collate from features
		this.getFeatures(monster)
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
				} else {
					skills.push({ name: name, description: '', list: SkillList.Custom });
				}
			});

		return Collections.sort(skills, s => s.name);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getRecoveries = (_monster: Monster) => {
		return 6; // Monsters, p. 351
	};

	static getRecoveryValue = (monster: Monster) => {
		return Math.floor(MonsterLogic.getStamina(monster) / 3);
	};

	static resetState = (state: MonsterState) => {
		state.staminaDamage = 0;
		state.staminaTemp = 0;
		state.conditions = [];
		state.reactionUsed = false;
		state.defeated = false;
		state.captainID = undefined;
	};

	static getMaliceOptions = (monster: Monster, group?: MonsterGroup) => {
		const options: (FeatureMalice | FeatureMaliceAbility)[] = [ ...MonsterData.malice ];
		if (group) {
			const level = MonsterLogic.getMonsterLevel(monster);
			options.push(...group.malice.filter(f => f.data.echelon <= CreatureLogic.getEchelon(level)));
		}

		return options.sort((a, b) => {
			const getCost = (malice: FeatureMalice | FeatureMaliceAbility) => {
				let cost = (malice.type === FeatureType.MaliceAbility) ? malice.data.ability.cost as number : malice.data.cost;
				const repeatable = (malice.type === FeatureType.MaliceAbility) ? malice.data.ability.repeatable : malice.data.repeatable;
				if (repeatable) {
					cost += 0.5;
				}
				return cost;
			};

			return getCost(a) - getCost(b);
		});
	};

	///////////////////////////////////////////////////////////////////////////

	static getSuggestedStats = (monster: Monster) => {
		let roleMod = 0;
		let damageMod = 0;
		let orgMod = 0;
		let staminaMod = 0;
		let characteristicMod = 0;

		switch (monster.role.type) {
			case MonsterRoleType.Ambusher:
				roleMod = 20;
				damageMod = 1;
				break;
			case MonsterRoleType.Artillery:
				roleMod = 10;
				damageMod = 1;
				break;
			case MonsterRoleType.Brute:
				roleMod = 30;
				damageMod = 1;
				break;
			case MonsterRoleType.Controller:
				roleMod = 10;
				break;
			case MonsterRoleType.Defender:
				roleMod = 30;
				break;
			case MonsterRoleType.Harrier:
				roleMod = 20;
				break;
			case MonsterRoleType.Hexer:
				roleMod = 10;
				break;
			case MonsterRoleType.Mount:
				roleMod = 20;
				break;
			case MonsterRoleType.Support:
				roleMod = 20;
				break;
		}

		switch (monster.role.organization) {
			case MonsterOrganizationType.Minion:
				staminaMod = 0.125;
				orgMod = 0.5;
				break;
			case MonsterOrganizationType.Horde:
				staminaMod = 0.5;
				orgMod = 0.5;
				break;
			case MonsterOrganizationType.Platoon:
				staminaMod = 1;
				orgMod = 1;
				break;
			case MonsterOrganizationType.Elite:
				damageMod += 1; // Add 1, because this one stacks
				staminaMod = 2;
				orgMod = 2;
				break;
			case MonsterOrganizationType.Leader:
				damageMod = 1;
				roleMod += 30;
				staminaMod = 2;
				orgMod = 2;
				characteristicMod = 1;
				break;
			case MonsterOrganizationType.Solo:
				damageMod = 2;
				roleMod += 30;
				staminaMod = 5;
				orgMod = 6;
				characteristicMod = 1;
				break;
		}

		const ev = ((2 * monster.level) + 4) * orgMod;
		const stamina = ((10 * monster.level) + roleMod) * staminaMod;

		const dmg1 = (4 + monster.level + damageMod) * 0.6;
		const dmg2 = (4 + monster.level + damageMod) * 1.1;
		const dmg3 = (4 + monster.level + damageMod) * 1.4;

		return {
			highestCharacteristic: 1 + CreatureLogic.getEchelon(monster.level) + characteristicMod,
			ev: Math.ceil(ev),
			stamina: Math.ceil(stamina),
			freeStrikeDamage: Math.ceil(dmg1),
			damage: {
				tier1: Math.ceil(dmg1),
				tier2: Math.ceil(dmg2),
				tier3: Math.ceil(dmg3)
			},
			damagePlus1: {
				tier1: Math.ceil(dmg1 * 0.8),
				tier2: Math.ceil(dmg2 * 0.8),
				tier3: Math.ceil(dmg3 * 0.8)
			},
			damagePlus2: {
				tier1: Math.ceil(dmg1 * 0.5),
				tier2: Math.ceil(dmg2 * 0.5),
				tier3: Math.ceil(dmg3 * 0.5)
			},
			damageMinus1: {
				tier1: Math.ceil(dmg1 * 1.2),
				tier2: Math.ceil(dmg2 * 1.2),
				tier3: Math.ceil(dmg3 * 1.2)
			}
		};
	};

	///////////////////////////////////////////////////////////////////////////

	static genesplice = (target: Monster, source: Monster[]) => {
		// We don't touch ID, name, or description

		target.level = Collections.draw(source.map(m => m.level));
		target.role.type = Collections.draw(source.map(m => m.role.type));
		target.role.organization = Collections.draw(source.map(m => m.role.organization));
		target.encounterValue = Collections.draw(source.map(m => m.encounterValue));
		target.size.value = Collections.draw(source.map(m => m.size.value));
		target.size.mod = Collections.draw(source.map(m => m.size.mod));
		target.speed.value = Collections.draw(source.map(m => m.speed.value));
		target.speed.modes = Collections.draw(source.map(m => m.speed.modes));
		target.stamina = Collections.draw(source.map(m => m.stamina));
		target.stability = Collections.draw(source.map(m => m.stability));
		target.freeStrikeDamage = Collections.draw(source.map(m => m.freeStrikeDamage));

		if (target.role.organization === MonsterOrganizationType.Minion) {
			target.withCaptain = Collections.draw(source.map(m => m.withCaptain).filter(v => !!v));
		} else {
			target.withCaptain = '';
		}

		const keywordMap: { keyword: string, count: number }[] = [];
		source.flatMap(m => m.keywords).forEach(kw => {
			const current = keywordMap.find(pair => pair.keyword === kw);
			if (current) {
				current.count += 1;
			} else {
				keywordMap.push({
					keyword: kw,
					count: 1
				});
			}
		});
		target.keywords = keywordMap
			.filter(pair => Random.die(source.length) <= pair.count)
			.map(pair => pair.keyword)
			.sort();

		target.characteristics = FactoryLogic.createCharacteristics(
			Collections.draw(source.map(m => MonsterLogic.getCharacteristic(m, Characteristic.Might))),
			Collections.draw(source.map(m => MonsterLogic.getCharacteristic(m, Characteristic.Agility))),
			Collections.draw(source.map(m => MonsterLogic.getCharacteristic(m, Characteristic.Reason))),
			Collections.draw(source.map(m => MonsterLogic.getCharacteristic(m, Characteristic.Intuition))),
			Collections.draw(source.map(m => MonsterLogic.getCharacteristic(m, Characteristic.Presence)))
		);

		target.features = [];
		[
			MonsterFeatureCategory.Text,
			MonsterFeatureCategory.DamageMod,
			MonsterFeatureCategory.Signature,
			MonsterFeatureCategory.Action,
			MonsterFeatureCategory.Maneuver,
			MonsterFeatureCategory.Trigger,
			MonsterFeatureCategory.Other
		].forEach(category => {
			const candidates = source.flatMap(m => m.features).filter(f => FeatureLogic.getFeatureCategory(f) === category);
			const count = Math.round(candidates.length / source.length);
			for (let n = 0; n < count; ++n) {
				const f = Collections.draw(candidates);
				const copy = Utils.copy(f);
				copy.id = Utils.guid();
				target.features.push(copy);
			}
		});
	};
}
