import { Monster, MonsterGroup, MonsterState } from '../models/monster';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { ConditionType } from '../enums/condition-type';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { FactoryLogic } from './factory-logic';
import { Feature } from '../models/feature';
import { FeatureLogic } from './feature-logic';
import { FeatureType } from '../enums/feature-type';
import { MonsterFeatureCategory } from '../enums/monster-feature-category';
import { MonsterFilter } from '../models/filter';
import { MonsterOrganizationType } from '../enums/monster-organization-type';
import { MonsterRoleType } from '../enums/monster-role-type';
import { Options } from '../models/options';
import { Random } from '../utils/random';
import { Utils } from '../utils/utils';

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
				return `Level ${lvl}`;
			} else {
				return `Level ${lvl} ${monster.role.organization}`;
			}
		}

		if (monster.role.organization === MonsterOrganizationType.NoOrganization) {
			return `Level ${lvl} ${monster.role.type}`;
		}

		const orgGoesLast = [
			MonsterOrganizationType.Retainer
		].includes(monster.role.organization);
		if (orgGoesLast) {
			return `Level ${lvl} ${monster.role.type} ${monster.role.organization}`;
		}

		return `Level ${lvl} ${monster.role.organization} ${monster.role.type}`;
	};

	static getStamina = (monster: Monster) => {
		let stamina = monster.stamina;

		if (monster.retainer && monster.retainer.level) {
			stamina += 10 * (monster.retainer.level - monster.level);
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

	static getRetainerAdvancementFeatures = (level: number, role: MonsterRoleType, level4?: Feature, level7?: Feature, level10?: Feature): { level: number, feature: Feature }[] => {
		const std = MonsterLogic.getRetainerStandardAbilities(role);
		const options4 = [];
		if (level4) {
			options4.push(level4);
		}
		if (std) {
			options4.push(std.level4);
		}
		const options7 = [];
		if (level7) {
			options7.push(level7);
		}
		if (std) {
			options7.push(std.level7);
		}
		const options10 = [];
		if (level10) {
			options10.push(level10);
		}
		if (std) {
			options10.push(std.level10);
		}

		const levels = [
			{
				level: 2,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-2',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-2-5',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				})
			},
			{
				level: 4,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-4',
					options: options4.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 5,
				feature: FactoryLogic.feature.createMultiple({
					id: 'retainer-5',
					features: [
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-1',
							characteristic: Characteristic.Might,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-2',
							characteristic: Characteristic.Agility,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-3',
							characteristic: Characteristic.Reason,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-4',
							characteristic: Characteristic.Intuition,
							value: 1
						}),
						FactoryLogic.feature.createCharacteristicBonus({
							id: 'retainer-5-5',
							characteristic: Characteristic.Presence,
							value: 1
						})
					]
				})
			},
			{
				level: 7,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-7',
					options: options7.map(o => ({ feature: o, value: 1 }))
				})
			},
			{
				level: 8,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-8',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'retainer-8-5',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				})
			},
			{
				level: 10,
				feature: FactoryLogic.feature.createChoice({
					id: 'retainer-10',
					options: options10.map(o => ({ feature: o, value: 1 }))
				})
			}
		];

		return levels.filter(lvl => lvl.level > level);
	};

	static getRetainerStandardAbilities = (role: MonsterRoleType) => {
		switch (role) {
			case MonsterRoleType.Ambusher:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-ambusher-4',
							name: 'Go for the Jugular',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 damage; M (weak) bleeding (save ends)',
								tier2: '9 damage; M (average) bleeding (save ends)',
								tier3: '12 damage; M (strong) bleeding (save ends)'
							}),
							effect: 'If the target is grabbed or the retainer had an edge on the power roll, the retainer gains two surges.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-ambusher-7',
							name: 'Hamstring Slice',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [
								FactoryLogic.distance.createMelee(),
								FactoryLogic.distance.createRanged(5)
							],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage; M (weak) slowed (EoT)',
								tier2: '10 damage; M (average) slowed (save ends)',
								tier3: '15 damage; M (strong) slowed and target can’t use triggered actions (save ends)'
							}),
							effect: 'The retainer and their mentor can move up to their speed.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-ambusher-10',
							name: '',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [
								FactoryLogic.distance.createMelee(),
								FactoryLogic.distance.createRanged(5)
							],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '11 damage; if the target is size 1 or smaller, they are M (weak) grabbed',
								tier2: '16 damage; if the target is size 1 or smaller, they are M (average) grabbed',
								tier3: '21 damage; if the target is size 1 or smaller, they are M (strong) grabbed'
							}),
							effect: 'The retainer gains two surges when a creature attacks the grabbed target.'
						})
					})
				};
			case MonsterRoleType.Artillery:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-artillery-4',
							name: 'Supporting Volley',
							type: FactoryLogic.type.createTrigger('The retainer’s mentor makes an attack against the target.'),
							keywords: [],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: '1 creature',
							effect: 'The retainer makes a ranged free strike against the target.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-artillery-7',
							name: 'Line ‘Em Up',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage; M (weak) prone',
								tier2: '11 damage; M (average) prone',
								tier3: '16 damage; M (strong) prone'
							})
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-artillery-10',
							name: 'Ricochet Shot',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: '1 creature or object',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '9 damage',
								tier2: '14 damage',
								tier3: '19 damage'
							}),
							effect: 'The retainer can also target a second creature or object within 5 squares of the target and with line of effect to the target. The retainer doesn’t need line of effect to the second target but must be aware of their location.'
						})
					})
				};
			case MonsterRoleType.Brute:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-brute-4',
							name: 'Big Windup',
							type: FactoryLogic.type.createManeuver(),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'Until the next turn, attacks against the retainer gain an edge. At the beginning of the retainer’s next turn, they gain two surges, and their forced movement abilities used that turn move a creature 2 extra squares.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-brute-7',
							name: 'Overhand Swat',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '8 damage',
								tier2: '13 damage; push 2',
								tier3: '16 damage; push 3; M (strong) prone'
							}),
							effect: 'If a target ends their forced movement in a square adjacent to the retainer’s mentor, the mentor can make a melee free strike against the target.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-brute-10',
							name: 'Dizzying Sweep',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'All creatures',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '10 damage; push 1',
								tier2: '14 damage; push 2',
								tier3: '20 damage; push 4'
							}),
							effect: 'The retainer is dazed until the end of their next turn.'
						})
					})
				};
			case MonsterRoleType.Controller:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-controller-4',
							name: 'Fire Blast',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
							target: 'All creatures',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '4 damage; push 2',
								tier2: '6 damage; push 3',
								tier3: '10 damage; push 5'
							}),
							effect: 'When the retainer chooses this ability, they can choose one of the following damage types: acid, cold, lightning, poison, sonic, weapon. The ability deals this damage instead.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-controller-7',
							name: 'Oil Slick',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 poison damage; M (weak) prone',
								tier2: '8 poison damage; M (average) prone',
								tier3: '11 poison damage; M (strong) prone'
							}),
							effect: 'The area becomes difficult terrain for every creature except the retainer’s mentor. While in the area, a creature gains fire vulnerability 5, and if a creature ends their turn with 0 speed remaining while in the area they fall prone.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-controller-10',
							name: 'Shattering Shards',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One M or smaller object',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage',
								tier2: '11 damage',
								tier3: '16 damage'
							}),
							effect: 'The area within 2 squares of the object becomes difficult terrain. Each enemy in the area takes the same damage that the object took.'
						})
					})
				};
			case MonsterRoleType.Defender:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-defender-4',
							name: 'Watch Out!',
							type: FactoryLogic.type.createTrigger('The retainer’s mentor is targeted with a melee attack.', { qualifiers: [ 'encounter' ] }),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							effect: 'The retainer pushes the attacker or the mentor up to 2 squares. If the push moves the mentor out of range of the attack, the attack has no effect.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-defender-7',
							name: 'It’s Me You Want!',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '2 creatures',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage; taunted (EoT)',
								tier2: '11 damage; taunted (save ends)',
								tier3: '16 damage; taunted (save ends)'
							})
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-defender-10',
							name: 'Last Stand',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '8 damage',
								tier2: '13 damage',
								tier3: '17 damage'
							}),
							effect: 'The retainer and their mentor each gain 10 Temporary Stamina. Each winded ally within 2 of the retainer can spend a Recovery.'
						})
					})
				};
			case MonsterRoleType.Harrier:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-harrier-4',
							name: 'Knock Back',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 damage; push 1',
								tier2: '9 damage; push 2',
								tier3: '12 damage; push 4'
							})
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-harrier-7',
							name: 'Meet You There',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage',
								tier2: '10 damage',
								tier3: '15 damage'
							}),
							effect: 'Before or after the attack, the retainer and their mentor can shift up to their speed.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-harrier-10',
							name: 'Nab and Stab',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'All creatures',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '11 damage; M (weak) grabbed',
								tier2: '16 damage; M (average) grabbed',
								tier3: '21 damage; M (strong) grabbed'
							}),
							effect: 'After the attack, the retainer can shift 2 while carrying a grabbed creature their size or smaller.'
						})
					})
				};
			case MonsterRoleType.Hexer:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-hexer-4',
							name: 'Backfire Curse',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 enemy',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '2 corruption damage; cursed (EoT)',
								tier2: '5 corruption damage; cursed (EoT)',
								tier3: '7 corruption damage; cursed (EoT)'
							}),
							effect: 'While cursed, when the target makes an attack that targets one creature, the retainer can use a free triggered action to choose a second target within the attack’s range.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-hexer-7',
							name: 'Take Root',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '5 damage; M (weak) slowed (save ends)',
								tier2: '9 damage; M (average) slowed (save ends)',
								tier3: '12 damage; M (strong) slowed (save ends)'
							}),
							effect: 'While slowed, if a target ends their turn without moving on that turn, they are restrained (save ends) instead of slowed (save ends).'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-hexer-10',
							name: 'Mazed',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '7 damage; M (weak) mazed',
								tier2: '11 damage; M (average) mazed',
								tier3: '16 damage; M (strong) mazed'
							}),
							effect: 'While mazed, the target is dazed. Also, at the end of the target’s turn, the retainer can cause the target to move up to their speed in a straight line in a direction of the retainer’s choice. This movement ends before the target enters damaging or difficult terrain. This is not forced movement.'
						})
					})
				};
			case MonsterRoleType.Mount:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-mount-4',
							name: 'Cavalry Charge',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '6 damage',
								tier2: '8 damage',
								tier3: '11 damage'
							}),
							effect: 'If this ability is used as part of the Charge action, the mount’s rider can make a melee free strike as a free triggered action.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-mount-7',
							name: 'Giddyup!',
							type: FactoryLogic.type.createMove({ qualifiers: [ 'encounter' ] }),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'The mount shifts twice their speed. They can jump as part of this movement.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-mount-10',
							name: 'Rearing Trample',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
							target: 'All enemies',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '10 damage; M (weak) prone',
								tier2: '15 damage; M (average) prone',
								tier3: '21 damage; M (strong) prone'
							}),
							effect: 'If a creature is knocked prone by the ability or is already prone, the attack deals 5 damage.'
						})
					})
				};
			case MonsterRoleType.Support:
				return {
					level4: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-support-4',
							name: 'Battlefield Medic',
							type: FactoryLogic.type.createManeuver(),
							keywords: [],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: 'Self or ally',
							effect: 'The target spends a Recovery and gains a shield until the start of the retainer’s next turn.'
						})
					}),
					level7: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-support-7',
							name: 'Focus Fire',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
							distance: [ FactoryLogic.distance.createRanged(5) ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
								tier1: '9 damage',
								tier2: '13 damage',
								tier3: '18 damage'
							}),
							effect: 'Give an ally within range 2 surges.'
						})
					}),
					level10: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'retainer-support-10',
							name: 'Back from the Dead',
							type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
							keywords: [ AbilityKeyword.Melee ],
							distance: [ FactoryLogic.distance.createMelee() ],
							target: '1 ally',
							effect: 'If a target has 0 or less Stamina or has died due to Stamina loss since the end of the retainer’s last turn, the target is alive with 1 Stamina and can spend a Recovery.'
						})
					})
				};
		}

		return null;
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

		const minSize = Math.min(...filter.size);
		const maxSize = Math.max(...filter.size);
		if ((monster.size.value < minSize) || (monster.size.value > maxSize)) {
			return false;
		}

		const minLevel = Math.min(...filter.level);
		const maxLevel = Math.max(...filter.level);
		if ((monster.level < minLevel) || (monster.level > maxLevel)) {
			return false;
		}

		const minEV = Math.min(...filter.ev);
		const maxEV = Math.max(...filter.ev);
		if ((monster.encounterValue < minEV) || (monster.encounterValue > maxEV)) {
			return false;
		}

		return true;
	};

	static getRoleMultiplier = (organization: MonsterOrganizationType, options: Options) => {
		switch (organization) {
			case MonsterOrganizationType.Minion:
				return options.minionCount;
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

	static getSpeed = (monster: Monster) => {
		let value = monster.speed.value;

		if (monster.state.conditions.some(c => [ ConditionType.Grabbed, ConditionType.Restrained ].includes(c.type))) {
			value = 0;
		}
		if (monster.state.conditions.some(c => [ ConditionType.Slowed ].includes(c.type))) {
			value = Math.min(value, 2);
		}

		return value;
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
						let value = dm.value;
						value += (Collections.max(dm.valueCharacteristics.map(ch => MonsterLogic.getCharacteristic(monster, ch)), v => v) || 0) * dm.valueCharacteristicMultiplier;
						value += dm.valuePerLevel * (monster.level - 1);
						value += dm.valuePerEchelon * MonsterLogic.getEchelon(monster);

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

	static getEchelon = (monster: Monster) => {
		const level = MonsterLogic.getMonsterLevel(monster);

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
			case MonsterOrganizationType.Band:
				return 'Monster bands are hardier and work in smaller groups than minions, but it still takes multiple of these creatures to effectively threaten a single hero of the same level.';
			case MonsterOrganizationType.Platoon:
				return 'Monster platoons are highly organized and usually self- sufficient armies.';
			case MonsterOrganizationType.Troop:
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
		let str = `${monster.stamina}`;

		if (monster.state.staminaDamage > 0) {
			str = `${Math.max(monster.stamina - monster.state.staminaDamage, 0)} / ${monster.stamina}`;
		}
		if (monster.state.staminaTemp > 0) {
			str += ` +${monster.state.staminaTemp}`;
		}

		return str;
	};

	static resetState = (state: MonsterState) => {
		state.staminaDamage = 0;
		state.staminaTemp = 0;
		state.conditions = [];
		state.reactionUsed = false;
		state.defeated = false;
		state.captainID = undefined;
	};

	///////////////////////////////////////////////////////////////////////////

	static createCharacteristics = (might: number, agility: number, reason: number, intuition: number, presence: number) => {
		return [
			{ characteristic: Characteristic.Might, value: might },
			{ characteristic: Characteristic.Agility, value: agility },
			{ characteristic: Characteristic.Reason, value: reason },
			{ characteristic: Characteristic.Intuition, value: intuition },
			{ characteristic: Characteristic.Presence, value: presence }
		];
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

		target.characteristics = MonsterLogic.createCharacteristics(
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
