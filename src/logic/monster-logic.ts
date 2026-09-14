import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { Characteristic } from '@/enums/characteristic';
import { Collections } from '@/utils/collections';
import { ConditionType } from '@/enums/condition-type';
import { CreatureLogic } from '@/logic/creature-logic';
import { EncounterSlot } from '@/models/encounter';
import { FactoryLogic } from '@/logic/factory-logic';
import { Feature } from '@/models/feature';
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
import { TutorialMode } from '@/enums/tutorial-mode';
import { Utils } from '@/utils/utils';

type StaminaTier = 'low' | 'med' | 'high';
type DamageTier = 'normal' | 'dps';

const STAMINA_LEADER = [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ];
const STAMINA_SOLO = [ 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700 ];

const SUGGESTED_STAMINA: Partial<Record<MonsterOrganizationType, Record<StaminaTier, number[]>>> = {
	[MonsterOrganizationType.Minion]: {
		low: [ 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 14 ],
		med: [ 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 15 ],
		high: [ 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18 ]
	},
	[MonsterOrganizationType.Horde]: {
		low: [ 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 55 ],
		med: [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 60 ],
		high: [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70 ]
	},
	[MonsterOrganizationType.Platoon]: {
		low: [ 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 110 ],
		med: [ 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 120 ],
		high: [ 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
	},
	[MonsterOrganizationType.Elite]: {
		low: [ 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 220 ],
		med: [ 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 240 ],
		high: [ 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280 ]
	},
	[MonsterOrganizationType.Leader]: { low: STAMINA_LEADER, med: STAMINA_LEADER, high: STAMINA_LEADER },
	[MonsterOrganizationType.Solo]: { low: STAMINA_SOLO, med: STAMINA_SOLO, high: STAMINA_SOLO }
};

const SUGGESTED_DAMAGE: Record<number, [ number, number, number ]> = {
	5: [ 3, 5, 7 ],
	6: [ 4, 7, 10 ],
	7: [ 5, 8, 11 ],
	8: [ 5, 9, 12 ],
	9: [ 6, 10, 13 ],
	10: [ 6, 11, 14 ],
	11: [ 7, 12, 15 ],
	12: [ 7, 13, 16 ],
	13: [ 8, 13, 17 ],
	14: [ 9, 14, 18 ],
	15: [ 10, 15, 19 ],
	16: [ 10, 16, 20 ],
	17: [ 11, 17, 21 ]
};

const SUGGESTED_DAMAGE_MINION: Record<DamageTier, [ number, number, number ][]> = {
	normal: [ [ 1, 2, 3 ], [ 2, 3, 5 ], [ 2, 4, 5 ], [ 2, 4, 6 ], [ 3, 5, 6 ], [ 3, 5, 7 ], [ 3, 6, 7 ], [ 3, 6, 8 ], [ 4, 6, 8 ], [ 4, 7, 9 ], [ 5, 7, 9 ] ],
	dps: [ [ 2, 4, 5 ], [ 3, 4, 6 ], [ 3, 5, 6 ], [ 3, 5, 7 ], [ 3, 6, 7 ], [ 4, 6, 8 ], [ 4, 7, 8 ], [ 4, 7, 9 ], [ 5, 7, 9 ], [ 5, 8, 10 ], [ 5, 8, 10 ] ]
};

const HITS_TWO_TARGETS = [
	MonsterOrganizationType.Elite,
	MonsterOrganizationType.Leader,
	MonsterOrganizationType.Solo
];

const STRIKES_ADD_CHARACTERISTIC = [
	MonsterOrganizationType.Horde,
	MonsterOrganizationType.Platoon,
	MonsterOrganizationType.Elite,
	MonsterOrganizationType.Leader,
	MonsterOrganizationType.Solo
];

const MAX_SUGGESTION_LEVEL = 11;

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

		MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.Bonus)
			.filter(f => f.data.field === FeatureField.FreeStrikeDamage)
			.forEach(f => {
				damage += ModifierLogic.calculateModifierValue(f.data, monster);
			});

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

		const monsterLevel = MonsterLogic.getMonsterLevel(monster);

		if (monster.retainer) {
			monster.retainer.featuresByLevel
				.filter(lvl => lvl.level <= monsterLevel)
				.forEach(lvl => features.push(lvl.feature));
		}

		if (monster.role.organization === MonsterOrganizationType.Companion) {
			features.push(FactoryLogic.feature.create({
				id: 'companion-kit',
				name: 'Kit',
				description: `
Your companion gains all the benefits of your kit, with the following exceptions:

* Your companion cannot use the kit’s signature ability.
* Your companion can choose between the melee damage bonus provided by the kit (if any) or a melee damage bonus of +0/+0/+4.`
			}));

			if (monsterLevel >= 4) {
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-might-4',
					characteristic: Characteristic.Might,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-intuition-4',
					characteristic: Characteristic.Intuition,
					value: 1
				}));
			}

			if (monsterLevel >= 7) {
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-might-7',
					characteristic: Characteristic.Might,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-agility-7',
					characteristic: Characteristic.Agility,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-reason-7',
					characteristic: Characteristic.Reason,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-intuition-7',
					characteristic: Characteristic.Intuition,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-presence-7',
					characteristic: Characteristic.Presence,
					value: 1
				}));
			}

			if (monsterLevel >= 10) {
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-might-10',
					characteristic: Characteristic.Might,
					value: 1
				}));
				features.push(FactoryLogic.feature.createCharacteristicBonus({
					id: 'companion-intuition-10',
					characteristic: Characteristic.Intuition,
					value: 1
				}));
			}
		}

		const simplified = FeatureLogic.simplifyFeatures(features.map(f => ({ feature: f, source: '', level: undefined })), monsterLevel, TutorialMode.Complete).map(f => f.feature);

		const toAdd = features.filter(f => !simplified.map(sf => sf.id).includes(f.id));
		return [ ...simplified, ...toAdd ];
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

	static getDamageModifiers = (monster: Monster) => {
		const features = MonsterLogic.getFeatures(monster)
			.filter(f => f.type === FeatureType.DamageModifier);
		return ModifierLogic.getDamageModifiers(features, monster);
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

	static getMinionStaminaDescription = (slot: EncounterSlot) => {
		const max = Collections.sum(slot.monsters, m => MonsterLogic.getStamina(m));

		let str = `${max}`;
		if (slot.state.staminaDamage > 0) {
			str = `${Math.max(max - slot.state.staminaDamage, 0)} / ${max}`;
		}
		if (slot.state.staminaTemp > 0) {
			str += ` +${slot.state.staminaTemp}`;
		}

		return str;
	};

	static getExpectedMinionCount = (slot: EncounterSlot) => {
		const staminaPerMinion = Collections.mean(slot.monsters, m => MonsterLogic.getStamina(m));
		if (staminaPerMinion <= 0) {
			return slot.monsters.length;
		}

		const staminaRemaining = Collections.sum(slot.monsters, m => MonsterLogic.getStamina(m)) - slot.state.staminaDamage;
		return Math.max(Math.ceil(staminaRemaining / staminaPerMinion), 0);
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
		const options: Feature[] = [ ...MonsterData.malice ];
		if (group) {
			const level = MonsterLogic.getMonsterLevel(monster);
			options.push(...group.malice.filter(f => {
				let echelon = 1;
				switch (f.type) {
					case FeatureType.Malice:
					case FeatureType.MaliceAbility:
						echelon = f.data.echelon;
						break;
				}
				return echelon <= CreatureLogic.getEchelon(level);
			}));
		}

		return options.sort((a, b) => {
			const getCost = (malice: Feature) => {
				let cost = 0;
				let repeatable = false;
				switch (malice.type) {
					case FeatureType.Malice:
						cost = malice.data.cost as number;
						repeatable = malice.data.repeatable || false;
						break;
					case FeatureType.MaliceAbility:
						cost = malice.data.ability.cost as number;
						repeatable = malice.data.ability.repeatable;
						break;
				}
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
		const characteristics = { m: '0', a: '0', r: '0', i: '0', p: '0' };
		let staminaTier: StaminaTier = 'low';
		let damageTier: DamageTier = 'normal';
		let damageMod = 0;
		let orgMod = 0;
		let characteristicMod = 0;
		const actions = {
			main: '0',
			maneuver: '0',
			triggered: '0',
			villain: '0'
		};

		switch (monster.role.type) {
			case MonsterRoleType.Ambusher:
				characteristics.m = '0';
				characteristics.a = '2';
				characteristics.r = '0';
				characteristics.i = '1';
				characteristics.p = '0';
				staminaTier = 'med';
				damageTier = 'dps';
				damageMod = 1;
				break;
			case MonsterRoleType.Artillery:
				characteristics.m = '0';
				characteristics.a = '2';
				characteristics.r = '1';
				characteristics.i = '0';
				characteristics.p = '0';
				staminaTier = 'low';
				damageTier = 'dps';
				damageMod = 1;
				break;
			case MonsterRoleType.Brute:
				characteristics.m = '2';
				characteristics.a = '1';
				characteristics.r = '-1';
				characteristics.i = '0';
				characteristics.p = '0';
				staminaTier = 'high';
				damageTier = 'dps';
				damageMod = 1;
				break;
			case MonsterRoleType.Controller:
				characteristics.m = '0';
				characteristics.a = '1';
				characteristics.r = '2';
				characteristics.i = '2';
				characteristics.p = '1';
				staminaTier = 'low';
				break;
			case MonsterRoleType.Defender:
				characteristics.m = '2';
				characteristics.a = '1';
				characteristics.r = '0';
				characteristics.i = '1';
				characteristics.p = '1';
				staminaTier = 'high';
				break;
			case MonsterRoleType.Harrier:
				characteristics.m = '1';
				characteristics.a = '2';
				characteristics.r = '0';
				characteristics.i = '0';
				characteristics.p = '0';
				staminaTier = 'med';
				break;
			case MonsterRoleType.Hexer:
				characteristics.m = '0';
				characteristics.a = '1';
				characteristics.r = '1';
				characteristics.i = '1';
				characteristics.p = '2';
				staminaTier = 'low';
				break;
			case MonsterRoleType.Mount:
				characteristics.m = '2';
				characteristics.a = '2';
				characteristics.r = '-1';
				characteristics.i = '0';
				characteristics.p = '-1';
				staminaTier = 'med';
				break;
			case MonsterRoleType.Support:
				characteristics.m = '1';
				characteristics.a = '1';
				characteristics.r = '0';
				characteristics.i = '2';
				characteristics.p = '1';
				staminaTier = 'med';
				break;
		}

		switch (monster.role.organization) {
			case MonsterOrganizationType.Minion:
				orgMod = 0.5;
				break;
			case MonsterOrganizationType.Horde:
				orgMod = 0.5;
				actions.maneuver = '0 - 1';
				break;
			case MonsterOrganizationType.Platoon:
				orgMod = 1;
				actions.main = '0 - 1';
				actions.maneuver = '0 - 1';
				break;
			case MonsterOrganizationType.Elite:
				damageMod += 1; // Add 1, because this one stacks
				orgMod = 2;
				actions.main = '1';
				actions.maneuver = '0 - 1';
				actions.triggered = '0 - 1';
				break;
			case MonsterOrganizationType.Leader:
				characteristics.m = '2 - 4';
				characteristics.a = '2 - 3';
				characteristics.r = '2 - 4';
				characteristics.i = '2 - 3';
				characteristics.p = '3 - 5';
				damageMod = 1;
				orgMod = 2;
				characteristicMod = 1;
				actions.maneuver = '1';
				actions.triggered = '1';
				actions.villain = '3';
				break;
			case MonsterOrganizationType.Solo:
				characteristics.m = '2 - 4';
				characteristics.a = '2 - 3';
				characteristics.r = '2 - 4';
				characteristics.i = '2 - 3';
				characteristics.p = '3 - 5';
				damageMod = 2;
				orgMod = 6;
				characteristicMod = 1;
				actions.main = '2';
				actions.maneuver = '1';
				actions.triggered = '1 - 2';
				actions.villain = '3';
				break;
		}

		const ev = ((2 * monster.level) + 4) * orgMod;

		const level = Math.max(1, Math.min(MAX_SUGGESTION_LEVEL, monster.level));
		const staminaByLevel = SUGGESTED_STAMINA[monster.role.organization]?.[staminaTier];
		const stamina = staminaByLevel ? staminaByLevel[level - 1] : 0;

		const staminaTolerance = staminaByLevel ?
			Math.max(...staminaByLevel.map((value, index) => index > 0 ? Math.abs(value - staminaByLevel[index - 1]) : 0))
			: 0;

		const isSwarm = [ MonsterOrganizationType.Minion, MonsterOrganizationType.Horde ].includes(monster.role.organization);
		const [ dmg1, dmg2, dmg3 ] = isSwarm ?
			SUGGESTED_DAMAGE_MINION[damageTier][level - 1]
			: SUGGESTED_DAMAGE[4 + level + damageMod];

		const highestCharacteristic = Math.min(5, 1 + CreatureLogic.getEchelon(level) + characteristicMod);

		const strikeBonus = STRIKES_ADD_CHARACTERISTIC.includes(monster.role.organization) ? highestCharacteristic : 0;
		const [ strike1, strike2, strike3 ] = [ dmg1, dmg2, dmg3 ].map(d => d + strikeBonus);

		const moreTargets = (damage: number) => Math.ceil(damage * 4 / 5);
		const fewerTargets = (damage: number) => Math.floor(((damage * 12) + 3) / 10);
		const area = (damage: number) => Math.floor(((damage * 8) + 3) / 10);

		return {
			characteristics: characteristics,
			highestCharacteristic: highestCharacteristic,
			ev: Math.ceil(ev),
			stamina: stamina,
			staminaTolerance: staminaTolerance,
			freeStrikeDamage: dmg1,
			actions: actions,
			expectedTargets: HITS_TWO_TARGETS.includes(monster.role.organization) ? 2 : 1,
			potencies: {
				weak: highestCharacteristic - 2,
				average: highestCharacteristic - 1,
				strong: highestCharacteristic
			},
			baseDamage: {
				tier1: dmg1,
				tier2: dmg2,
				tier3: dmg3
			},
			damage: {
				tier1: strike1,
				tier2: strike2,
				tier3: strike3
			},
			damageMoreTargets: {
				tier1: moreTargets(strike1),
				tier2: moreTargets(strike2),
				tier3: moreTargets(strike3)
			},
			damageFewerTargets: {
				tier1: fewerTargets(strike1),
				tier2: fewerTargets(strike2),
				tier3: fewerTargets(strike3)
			},
			areaDamage: {
				tier1: area(dmg1),
				tier2: area(dmg2),
				tier3: area(dmg3)
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
