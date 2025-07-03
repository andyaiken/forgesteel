import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';
import { Feature } from '../models/feature';
import { MonsterRoleType } from '../enums/monster-role-type';

export class RetainerData {
	static getRetainerAdvancementFeatures = (level: number, role: MonsterRoleType, level4?: Feature, level7?: Feature, level10?: Feature): { level: number, feature: Feature }[] => {
		const std = RetainerData.getRetainerStandardAbilities(role);
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 damage; M (weak) bleeding (save ends)',
									tier2: '9 damage; M (average) bleeding (save ends)',
									tier3: '12 damage; M (strong) bleeding (save ends)'
								})),
								FactoryLogic.createAbilitySectionText('If the target is grabbed or the retainer had an edge on the power roll, the retainer gains two surges.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage; M (weak) slowed (EoT)',
									tier2: '10 damage; M (average) slowed (save ends)',
									tier3: '15 damage; M (strong) slowed and target can’t use triggered actions (save ends)'
								})),
								FactoryLogic.createAbilitySectionText('The retainer and their mentor can move up to their speed.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '11 damage; if the target is size 1 or smaller, they are M (weak) grabbed',
									tier2: '16 damage; if the target is size 1 or smaller, they are M (average) grabbed',
									tier3: '21 damage; if the target is size 1 or smaller, they are M (strong) grabbed'
								})),
								FactoryLogic.createAbilitySectionText('The retainer gains two surges when a creature attacks the grabbed target.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('The retainer makes a ranged free strike against the target.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage; M (weak) prone',
									tier2: '11 damage; M (average) prone',
									tier3: '16 damage; M (strong) prone'
								}))
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '9 damage',
									tier2: '14 damage',
									tier3: '19 damage'
								})),
								FactoryLogic.createAbilitySectionText('The retainer can also target a second creature or object within 5 squares of the target and with line of effect to the target. The retainer doesn’t need line of effect to the second target but must be aware of their location.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('Until the next turn, attacks against the retainer gain an edge. At the beginning of the retainer’s next turn, they gain two surges, and their forced movement abilities used that turn move a creature 2 extra squares.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '8 damage',
									tier2: '13 damage; push 2',
									tier3: '16 damage; push 3; M (strong) prone'
								})),
								FactoryLogic.createAbilitySectionText('If a target ends their forced movement in a square adjacent to the retainer’s mentor, the mentor can make a melee free strike against the target.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '10 damage; push 1',
									tier2: '14 damage; push 2',
									tier3: '20 damage; push 4'
								})),
								FactoryLogic.createAbilitySectionText('The retainer is dazed until the end of their next turn.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '4 damage; push 2',
									tier2: '6 damage; push 3',
									tier3: '10 damage; push 5'
								})),
								FactoryLogic.createAbilitySectionText('When the retainer chooses this ability, they can choose one of the following damage types: acid, cold, lightning, poison, sonic, weapon. The ability deals this damage instead.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 poison damage; M (weak) prone',
									tier2: '8 poison damage; M (average) prone',
									tier3: '11 poison damage; M (strong) prone'
								})),
								FactoryLogic.createAbilitySectionText('The area becomes difficult terrain for every creature except the retainer’s mentor. While in the area, a creature gains fire vulnerability 5, and if a creature ends their turn with 0 speed remaining while in the area they fall prone.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage',
									tier2: '11 damage',
									tier3: '16 damage'
								})),
								FactoryLogic.createAbilitySectionText('The area within 2 squares of the object becomes difficult terrain. Each enemy in the area takes the same damage that the object took.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('The retainer pushes the attacker or the mentor up to 2 squares. If the push moves the mentor out of range of the attack, the attack has no effect.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage; taunted (EoT)',
									tier2: '11 damage; taunted (save ends)',
									tier3: '16 damage; taunted (save ends)'
								}))
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '8 damage',
									tier2: '13 damage',
									tier3: '17 damage'
								})),
								FactoryLogic.createAbilitySectionText('The retainer and their mentor each gain 10 Temporary Stamina. Each winded ally within 2 of the retainer can spend a Recovery.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 damage; push 1',
									tier2: '9 damage; push 2',
									tier3: '12 damage; push 4'
								}))
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage',
									tier2: '10 damage',
									tier3: '15 damage'
								})),
								FactoryLogic.createAbilitySectionText('Before or after the attack, the retainer and their mentor can shift up to their speed.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '11 damage; M (weak) grabbed',
									tier2: '16 damage; M (average) grabbed',
									tier3: '21 damage; M (strong) grabbed'
								})),
								FactoryLogic.createAbilitySectionText('After the attack, the retainer can shift 2 while carrying a grabbed creature their size or smaller.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '2 corruption damage; cursed (EoT)',
									tier2: '5 corruption damage; cursed (EoT)',
									tier3: '7 corruption damage; cursed (EoT)'
								})),
								FactoryLogic.createAbilitySectionText('While cursed, when the target makes an attack that targets one creature, the retainer can use a free triggered action to choose a second target within the attack’s range.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '5 damage; M (weak) slowed (save ends)',
									tier2: '9 damage; M (average) slowed (save ends)',
									tier3: '12 damage; M (strong) slowed (save ends)'
								})),
								FactoryLogic.createAbilitySectionText('While slowed, if a target ends their turn without moving on that turn, they are restrained (save ends) instead of slowed (save ends).')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '7 damage; M (weak) mazed',
									tier2: '11 damage; M (average) mazed',
									tier3: '16 damage; M (strong) mazed'
								})),
								FactoryLogic.createAbilitySectionText('While mazed, the target is dazed. Also, at the end of the target’s turn, the retainer can cause the target to move up to their speed in a straight line in a direction of the retainer’s choice. This movement ends before the target enters damaging or difficult terrain. This is not forced movement.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '6 damage',
									tier2: '8 damage',
									tier3: '11 damage'
								})),
								FactoryLogic.createAbilitySectionText('If this ability is used as part of the Charge action, the mount’s rider can make a melee free strike as a free triggered action.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('The mount shifts twice their speed. They can jump as part of this movement.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '10 damage; M (weak) prone',
									tier2: '15 damage; M (average) prone',
									tier3: '21 damage; M (strong) prone'
								})),
								FactoryLogic.createAbilitySectionText('If a creature is knocked prone by the ability or is already prone, the attack deals 5 damage.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('The target spends a Recovery and gains a shield until the start of the retainer’s next turn.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
									tier1: '9 damage',
									tier2: '13 damage',
									tier3: '18 damage'
								})),
								FactoryLogic.createAbilitySectionText('Give an ally within range 2 surges.')
							]
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
							sections: [
								FactoryLogic.createAbilitySectionText('If a target has 0 or less Stamina or has died due to Stamina loss since the end of the retainer’s last turn, the target is alive with 1 Stamina and can spend a Recovery.')
							]
						})
					})
				};
		}

		return null;
	};
}
