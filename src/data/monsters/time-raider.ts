import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const timeRaider: MonsterGroup = {
	id: 'monster-group-time-raider',
	name: 'Time Raider',
	description: 'The kuran’zoi (coor-AN-zoy), also called time raiders, are humanoids who make the Sea of Stars their home. Many kuran’zoi make their living as guides for travelers from other planes, while others survive on the Sea of Stars through piracy against interplanar vessels.',
	information: [
		{
			id: 'time-raider-info-1',
			name: 'Veterans of the Psychic Wars',
			description: 'Thousands of years ago, the synlirii—a powerful species of evil psionic aberrations—created the kuran’zoi as soldiers. But as the synlirii experimented with and enhanced these warriors’ psionic potential, the kuran’zoi came to understand the true nature of their progenitors. They rebelled against the synlirii and fled to the Sea of Stars, becoming nomads of the timescape.'
		},
		{
			id: 'time-raider-info-2',
			name: 'Hardened-Vision Hexapods',
			description: `
Kuran’zoi possess resilient ocular sensors that allow them to see in the dark. Knowing these sensors would also defend them against the hardlight storms of the astral realm, the escaping kuran’zoi chose the Sea of Stars as their home. They thrive where the winds of limbo roar.

Time raiders also have two sets of arms, allowing them to wield melee weapons at the same time as ranged weapons. A single well-trained kuran’zoi is like a squad unto themself.`
		},
		{
			id: 'time-raider-info-3',
			name: 'Psi-Tech',
			description: 'Like their synlirii foes, time raiders travel on mindships and wield psionic weapons and tools that only their people can activate. Many kuran’zoi specialize in melee weapons that psionically devastate enemies, but time raider vertexes also learn to pilot enormous suits of psionic armor that empower their allies.'
		},
		{
			id: 'time-raider-info-4',
			name: 'Genre Raiders',
			description: 'The moniker “time raider” is imprecise. Rather, when kuran’zoi raid a world of the timescape that relies on sorcery instead of kuran’zoi technology—including Orden—it seems to those worlds’ people as though the time raiders have come from the future, wielding marvelous weapons of light that hit as hard as steel.'
		},
		{
			id: 'time-raider-info-5',
			name: 'Leave a Few Alive',
			description: 'Time raider pirates plunder the vessels they target, but allow just enough of the crew to survive so the ship can make it back home. Kuran’zoi pirate captains often remind their crews: “Leave the sheep alive. Next year, they’ll return with a new coat of wool for us to shear.”'
		},
		{
			id: 'time-raider-info-6',
			name: 'Creatures Outside Time',
			description: `
While in the Sea of Stars, time raiders and other creatures don’t age. As a result, many living kuran’zoi recall the Psychic Wars. They carry the lessons learned from millennia of conflict with the synlirii into new battles with devastating effect, using mindships to launch attacks on other planes and appearing exactly where they want to. However, this knowledge serves them far beyond war.

Time raiders raise their young in ruined citadels and similar strongholds on obscure worlds, keeping their creches secret and protected.`
		},
		{
			id: 'time-raider-info-6',
			name: 'Time Raider Languages',
			description: 'Most time raiders speak Caelian and Voll. '
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'time-raider-malice-1',
				name: 'Gravity Well',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 3 }) ],
				target: 'Special',
				effect: 'A time raider acting this turn activates a gravity well in the affected area. The gravity well sits in the center of the cube and lasts until the end of the encounter or until a creature who can reach the well uses a maneuver to disable it. The affected area is considered difficult terrain for enemies. Whenever an enemy ends their turn in an affected square, they are pulled 4 towards the well.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'time-raider-malice-2',
			name: 'Recall Module',
			cost: 5,
			sections: [
				'Until the end of the round, each time raider has the teleport keyword added to their movement and their speed increases by 3.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'time-raider-malice-3',
			name: 'Psi-Cage',
			cost: 10,
			sections: [
				'All time raiders in the encounter create a psionic ﬁeld over the encounter map, which lasts until the time raider with the highest Stamina maximum drops to Stamina 0 or chooses to end the ﬁeld. While the ﬁeld is up, each non-time raider on the map must make a **Reason test** against this psionic eﬀect at the start of each round.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Reason,
					tier1: '10 psychic damage; slowed (EoT)',
					tier2: '7 psychic damage; slowed (EoT)',
					tier3: 'No effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'time-raider-1',
			name: 'Time Raider Archon',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 7,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 2, 2, 1, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-1-feature-1',
						name: 'Brutal Flail',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage; an ally can make a free strike against the target'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-1-feature-2',
					name: 'Foresight',
					description: 'The archon doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-2',
			name: 'Time Raider Myriad',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 3,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 2, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-2-feature-1',
						name: 'Fifth Fist',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage; slide 1',
							tier2: '5 damage; slide 2',
							tier3: '6 damage; slide 3; prone'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-2-feature-2',
					name: 'Foresight',
					description: 'The myriad doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-2-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-3',
			name: 'Time Raider Armiger',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-3-feature-1',
						name: 'Serrated Saber',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '10 damage',
							tier3: '13 damage; R<2 weakened (save ends)'
						}),
						spend: [
							{ value: 2, effect: 'A creature is bleeding while weakened from this ability.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-3-feature-2',
						name: 'Shared Sickness',
						type: FactoryLogic.type.createTrigger('A creature deals damage to any ally of the armiger to whom the armiger has line of effect.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'Triggering creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 psychic damage; R<0 5 poison damage',
							tier2: '6 psychic damage; R<1 5 poison damage',
							tier3: '9 psychic damage; R<2 5 poison damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-3-feature-3',
					name: 'Foresight',
					description: 'The armiger doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-3-feature-4',
					name: 'Kuran\'zoi Heraldry',
					description: 'While any time raider starts their turn with line of eﬀect to the armiger, that time raider can end one condition aﬀecting them.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-3-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-4',
			name: 'Time Raider Cannonfall',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-4-feature-1',
						name: 'Sunderbuss',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 sonic damage',
							tier2: '7 sonic damage',
							tier3: '10 sonic damage; prone; M<2 slowed (save ends)'
						}),
						effect: 'A layer of ground of floor beneath the area that is 1 square deep is destroyed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-4-feature-2',
						name: 'Buss Buffer',
						type: FactoryLogic.type.createTrigger('A creature damages the cannonfall with a ranged or area ability.', { free: true }),
						cost: 1,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and all allies in the burst',
						effect: 'The damage is reduced by half for the cannonfall and each target also affected by the triggering ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-4-feature-3',
					name: 'Foresight',
					description: 'The cannonfall doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-4-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-5',
			name: 'Time Raider Helix',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-5-feature-1',
						name: 'Blaster Volley',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 corruption damage; push 2',
							tier2: '8 corruption damage; push 4',
							tier3: '11 corruption damage; push 6; prone'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-5-feature-2',
						name: 'Kinetic Lane',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 4, value2: 2, within: 10 }) ],
						target: 'Special',
						effect: 'The area becomes a psionically charged treadmill that pushes creatures and objects at high speed in one direction of the helix’s choice. Any creature that moves into the area or starts their turn there immediately slides 3 squares toward the square at the end of the area in the chosen direction. Each enemy in the area when it first appears takes 3 damage before they are moved.',
						spend: [
							{ value: 3, effect: 'The helix creates a second kinetic lane' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-5-feature-3',
					name: 'Foresight',
					description: 'The helix doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-5-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-6',
			name: 'Time Raider Hijack',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(6),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-6-feature-1',
						name: 'Golden Sickles',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage',
							tier3: '14 damage; A<2 bleeding (save ends)'
						}),
						effect: 'The hijack is hidden from creatures bleeding form this ability until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-6-feature-2',
						name: 'Psi-Sickle',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						effect: 'The hijack psychically latches their sickle onto the target and closes the distance between them. If the target is larger than the hijack, the hijack moves adjacent to the target. Otherwise, the target is pulled 4 squares toward the hijack.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-6-feature-3',
					name: 'Foresight',
					description: 'The hijack doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-6-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-7',
			name: 'Time Raider Mind Punk',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 40,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 2, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-7-feature-1',
						name: 'Repelling Psihander',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures adjacent ot each other',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '8 damage; M<1 dazed (save ends)',
							tier3: '11 damage; M<2 dazed (save ends)'
						}),
						effect: 'A target who ends their next turn adjacent to the other target falls prone.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-7-feature-2',
						name: 'Mindpunk',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 psychic damage; R<0 prone',
							tier2: '6 psychic damage; push 1; R<1 prone can\'t stand (save ends)',
							tier3: '9 psychic damage; push 2; R<2 prone can\'t stand (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-7-feature-3',
					name: 'Foresight',
					description: 'The mind punk doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-7-feature-4',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-8',
			name: 'Time Raider Nemesis',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 2, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-8-feature-1',
						name: 'Golden Scythe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; pull 1',
							tier2: '10 damage; pull 2',
							tier3: '13 damage; pull 3; A<2 restrained (save ends)'
						}),
						effect: 'This ability can affect creatures on parallel planes of existence and pull them onto the nemesis\'s plane.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-8-feature-2',
						name: 'Kinetic Crush',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 psychic damage; M<0 slowed (save ends)',
							tier2: '10 psychic damage; M<1 slowed (save ends)',
							tier3: '13 psychic damage; M<2 slowed (save ends)'
						}),
						effect: 'A creature slowed by this ability takes 2 damage whenever they move into or are force moved into a square until the condition ends.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-1-feature-2',
					name: 'Foresight',
					description: 'The nemesis doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-1-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-9',
			name: 'Gnoll Vertex',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'fly, hover'),
			stamina: 50,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 2, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-9-feature-1',
						name: 'Psionic Slam',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; 2 psychic damage',
							tier2: '7 damage; 3 psychic damage',
							tier3: '9 damage; 4 psychic damage'
						}),
						effect: 'Power rolls made against the target have an edge until the start of the vertex\'s next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-9-feature-2',
						name: 'Split Space',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
						target: 'Special',
						effect: 'A portal fills the area, leading to a location the vertex has experienced (in person or otherwise) on any plane of existence. Each creature who touches the portal is instantly teleported to the nearest unoccupied square at the chosen location. The portal lasts until the vertex dies, uses this ability again, dismisses the portal (no action required), or is transported by the portal.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-9-feature-3',
						name: 'Split Space',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'All allies in the burst',
						effect: 'Each target shifts up to half their speed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-9-feature-4',
					name: 'Foresight',
					description: 'The vertex doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-9-feature-5',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 3 }) ]
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-10',
			name: 'Time Raider Tyrannis',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Time Raider' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10, 'teleport, hover'),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 3, 3, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-1',
						name: 'Gatling Blaster',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2),
							FactoryLogic.distance.createRanged(10)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 corruption damage',
							tier2: '12 corruption damage',
							tier3: '15 corruption damage'
						}),
						effect: 'Each target\'s speed is reduced by 2 until the start of the tyrannis\' next turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-2',
						name: 'Air Raid!',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three time raiders',
						effect: 'Each target is psionically lifted into the air, flies up to their speed and makes a free strike. If a target doesn\'t land in an unoccupied space, they fall.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-3',
						name: 'Precog Reflexes',
						type: FactoryLogic.type.createTrigger('The target strikes the tyrannis.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						effect: 'The strike has a bane. After the strike resolves, the tyrannis makes a free strike against the target.',
						spend: [
							{ value: 2, effect: 'The strike has a double bane instead.' }
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-10-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the tyrannis can take 5 damage to end one save ends effect affecting them. This damage can\'t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-10-feature-5',
					name: 'Foresight',
					description: 'The tyrannis doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-10-feature-6',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-7',
						name: 'We Will Won!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Self and three allies',
						effect: 'Each target gains 15 temporary Stamina and has their speed doubled until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-8',
						name: 'Stick to the Plan!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all allies in the burst',
						effect: 'Each target can end one effect or condition affecting them or can move up to their speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-10-feature-9',
						name: 'Armageddon',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Special',
						effect: 'The tyrannis fires a sensor mine into each unoccupied square in the burst and a gravity well (see Gravity Well) into one of their own squares. Whenever an enemy moves into a square with a sensor mine in it, the mine explodes, dealing 3 damage to the enemy.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'time-raider-11',
			name: 'Time Raider Mind Healer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Psionic', 'Time Raider' ],
			encounterValue: 19,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 50,
			stability: 0,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-11-feature-1',
						name: 'Laser Lancet',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 fire damage',
							tier2: '8 fire damage',
							tier3: '11 fire damage'
						}),
						effect: 'The healer can end on EoT or Save Ends effect on the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'time-raider-11-feature-2',
					name: 'Foresight',
					description: 'The healer doesn\'t have a bane on strikes against concealed creatures.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'time-raider-11-feature-3',
					modifiers: [ FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 5 }) ]
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-11-feature-4',
						name: 'Stim Charge',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One creature',
						effect: 'The target can spend 1 Recovery. Until the end of their next turn, their speed is doubled.'
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-11-feature-5',
						name: 'Mind Whelm',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(3) ],
						target: 'One creature',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '8 psychic damage; R (weak) frightened (save ends)',
							tier2: '13 psychic damage; R (average) frightened (save ends)',
							tier3: '17 psychic damage; R (strong) frightened (save ends)'
						})
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'time-raider-11-feature-6',
						name: 'Psychic Short Circuit',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '11 psychic damage',
							tier2: '16 psychic damage',
							tier3: '21 psychic damage'
						}),
						effect: ' If the healer is dazed, frightened, or taunted, they can end that condition and inflict it on one enemy in the area. Additionally, if the healer’s mentor is in the area and is dazed, frightened, or taunted, the healer can end that condition and inflict it on one enemy in the area.'
					})
				})
			}
		})
	],
	addOns: []
};
