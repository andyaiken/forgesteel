import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const lizardfolk: MonsterGroup = {
	id: 'monster-group-lizardfolk',
	name: 'Lizardfolk',
	description: `
Lizardfolk prefer warm, tropical climates, but they’re willing to settle in any humid region—the more moisture in the air, the better. Even in colder climates, lizardfolk can be found in any sufficiently marshy environment. Bogs and wetlands are particularly common nesting grounds.

Their scales protect both against weapons and the moisture in their native environments. Coloring and hue vary wildly with environment and diet.`,
	information: [
		{
			id: 'lizardfolk-info-1',
			name: 'Homeland Protectors',
			description: `
Lizardfolk aren’t especially hostile unless they feel their territory is threatened—which it often is. However, respectful travelers entering lizardfolk territory find no great hardship. Lizardfolk cultures often take up a specific trade, like boatmaking, fletching, weaving, or navigating, and they sell their services to travelers in need, including lizardfolk from other places.

Adventurers cross paths with lizardfolk while trekking through their homelands. The reptilian humanoids watch travelers who skirt too close to sources of food and shelter, attacking those who take more than they need. Many lizardfolk dwell in caverns and abandoned ruins for protection. Treasure-seekers who delve into these places are typically given one warning before the attack begins.`
		},
		{
			id: 'lizardfolk-info-2',
			name: 'Focused and Loyal',
			description: 'Most lizardfolk speak plainly, viewing blunt honesty as a sign of respect. When they make a vow or personal promise, they do all they can to honor that word. Lizardfolk who swear to destroy an enemy follow their quarry to the ends of the earth.'
		},
		{
			id: 'lizardfolk-info-3',
			name: 'Marshland Tyrants',
			description: 'In times of crisis, such as a food shortage, an evil lizardfolk leader can exploit the emergency, oppressing others in the name of defending their territory. But there are always other local lizardfolk tribes who oppose such aggressive, expansionist posturing; they often seek the aid of others who value freedom from tyranny.'
		},
		{
			id: 'lizardfolk-info-4',
			name: 'Lizardfolk Languages',
			description: 'Most lizardfolk speak Caelian and Khamish.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'lizardfolk-malice-1',
				name: 'Iron Jaws',
				type: FactoryLogic.type.createManeuver(),
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 1, within: 3 }) ],
				target: 'Special',
				cost: 3,
				preEffect: 'A lizardfolk acting this turn drops a net trap on a square during their movement. The first time an enemy steps into an affected square, they make an **Agility test**. If the creature was unaware of the net, they make the roll with a bane.',
				test: FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: 'Restrained (save ends)',
					tier2: 'Restrained (EoT)',
					tier3: 'no effect'
				}),
				effect: 'A creature can use a maneuver to free an adjacent creature restrained by the trap.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'lizardfolk-malice-2',
			name: 'Water Pit',
			cost: 5,
			sections: [
				'A lizardfolk acting this turn unearths a 2 × 2 pit in the ground that fills up with water. A lizardfolk that exits the pit gains 10 temporary Stamina, regrows their tail, and ends one save ends eﬀect aﬀecting them.',
				'A creature with the Nature skill or the ability to burrow can make a **hard Might or Reason test** when adjacent to a pit to drain it. Success empties the pit of water. Failure with a consequence causes the creature to fall into the pit prone.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'lizardfolk-malice-3',
			name: 'Flood the Shores',
			cost: 10,
			sections: [
				'Waist-high water floods the entire battlemap. All lizardfolk submerged in water have their speed doubled while swimming and have an edge on their abilities. The water drains at the end of the round if there are no open water pits on the encounter map.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'lizardfolk-1',
			name: 'Lizardfolk Grunt',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(6, 'swim'),
			stamina: 4,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-1-feature-1',
						name: 'Snap and Toss',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage; slide 2',
							tier3: '3 damage; slide 4'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-1-feature-2',
					name: 'Reptilian Escape',
					description: 'While the grunt still has a tail, whenever the grunt is grabbed, slowed, weakened, or knocked prone, the grunt can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-2',
			name: 'Lizardfolk Shellguard',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 6,
			stability: 1,
			size: FactoryLogic.createSize(1, 'L'),
			freeStrikeDamage: 1,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-2-feature-1',
						name: 'Shield Smash',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'The target has a bane on their next strike.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-2-feature-2',
					name: 'Reptilian Escape',
					description: 'While the shellguard still has a tail, whenever the shellguard is grabbed, slowed, weakened, or knocked prone, the shellguard can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-3',
			name: 'Lizardfolk Tonguer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 3,
			stability: 0,
			size: FactoryLogic.createSize(1, 'S'),
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1 ',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-3-feature-1',
						name: 'Tonguelash',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(8) ],
						target: '1 creature or object per minion',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; shift 1 towards target or pull 1',
							tier2: '4 damage; shift 2 towards target or pull 2',
							tier3: '5 damage; shift 3 towards target or pull 3'
						}),
						effect: 'If the target ends up in a space adjacent to the tonguer, they are also grabbed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-3-feature-2',
					name: 'Reptilian Escape',
					description: 'While the tonguer still has a tail, whenever the tonguer is grabbed, slowed, weakened, or knocked prone, the tonguer can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-4',
			name: 'Lizardfolk Bloodeye',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 20,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 1, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-4-feature-1',
						name: 'Bola Knock',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; A<0 restrained (save ends)',
							tier2: '7 damage; A<1 restrained (save ends)',
							tier3: '9 damage; A<2 restrained (save ends)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-4-feature-2',
						name: 'Bloodshot',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 acid damage; M<0 target can’t establish line of effect beyond 4 squares (save ends)',
							tier2: '7 acid damage; M<1 target can’t establish line of effect beyond 3 squares (save ends)',
							tier3: '9 acid damage; M<2 target can’t establish line of effect beyond 2 squares (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-4-feature-3',
					name: 'Reptilian Escape',
					description: 'While the bloodeye still has a tail, whenever the bloodeye is grabbed, slowed, weakened, or knocked prone, the bloodeye can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-5',
			name: 'Lizardfolk Scaletooth',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(5, 'swim'),
			stamina: 46,
			stability: 0,
			size: FactoryLogic.createSize(1, 'M'),
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-5-feature-1',
						name: 'Razor Bite',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '12 damage; A<2 bleeding (save ends)'
						}),
						effect: 'The potency of this ability increases by 1 if the target is grabbed by the scaletooth.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-5-feature-2',
						name: 'Tail Whip',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: '2 creatures or objects',
						cost: 2,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; slide 1',
							tier2: '8 damage; slide 2; M<1 grappled if within 2 of the scaletooth',
							tier3: '10 damage; slide 3; M<2 grappled if within 2 of the scaletooth'
						}),
						effect: 'The scaletooth needs their tail to use this ability. The scaletooth can’t grapple more than one creature or object with this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-5-feature-3',
					name: 'Reptilian Escape',
					description: 'While the scaletooth still has a tail, whenever the scaletooth is grabbed, slowed, weakened, or knocked prone, the scaletooth can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-6',
			name: 'Lizardfolk Skyterror',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7, 'swim'),
			stamina: 30,
			stability: 0,
			size: FactoryLogic.createSize(1, 'S'),
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-6-feature-1',
						name: 'Glaive Rush',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(8) ],
						target: '1 creature or object',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage; prone'
						}),
						effect: 'The skyterror can shift 4 after using this ability if they are flying.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-6-feature-2',
						name: 'Poison Blowdart',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage; M<0 weakened (save ends)',
							tier2: '5 damage; M<1 weakened (save ends)',
							tier3: '7 damage; M<2 weakened (save ends)'
						}),
						effect: 'A creature that ends their turn adjacent to a creature or object weakened by this ability is weakened (EoT).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-6-feature-3',
					name: 'Glider',
					description: 'The skyterror adds the flying keyword to their movement until the end of their next turn whenever they move at least 2 squares along the ground or fall at least 2 squares.'
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-6-feature-4',
					name: 'Reptilian Escape',
					description: 'While the skyterror still has a tail, whenever the skyterror is grabbed, slowed, weakened, or knocked prone, the skyterror can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'lizardfolk-7',
			name: 'Lizardfolk Deathrex',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Lizardfolk' ],
			encounterValue: 12,
			speed: FactoryLogic.createSpeed(5, 'climb, swim'),
			stamina: 80,
			stability: 2,
			size: FactoryLogic.createSize(2),
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-1',
						name: 'Ripper Spear',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: '2 creatures or objects',
						cost: 'signature',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '7 damage; pull 1; A<1 bleeding (save ends)',
							tier2: '10 damage; pull 1; A<2 bleeding (save ends)',
							tier3: '13 damage; pull 2; A<3 bleeding (save ends)'
						}),
						spend: [
							{
								value: 1,
								effect: 'One target that is adjacent to the deathrex is grabbed by the deathrex’s mouth.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-2',
						name: 'Death Roll',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 grabbed creature or object',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; M<1 dazed (save ends)',
							tier2: '12 damage; M<2 dazed (save ends)',
							tier3: '15 damage; M<3 dazed (save ends)'
						}),
						effect: 'The target is released from the grab and slides 5.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-3',
						name: 'Trundle',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The deathrex moves up to their speed. The deathrex can make a free strike on each creature that makes an opportunity attack against them during this movement.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-4',
						name: 'Swat the Fly',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the deathrex.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: '1 adjacent creature or object',
						effect: 'Slide 5.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-5',
						name: 'Sneak Attack',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Self and all allies in the burst',
						effect: 'Each target moves up to their speed and makes a free strike. A target receives temporary Stamina equal to the amount of damage they dealt during this action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-6',
						name: 'Shed Some Skin',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The deathrex shifts up to their speed, leaving behind a skin shed duplicate in the space that they started in. The duplicate has 10 Stamina, has no villain actions, shares the rest of the deathrex’s characteristics, and takes their turn at the same time as the deathrex.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'lizardfolk-7-feature-7',
						name: 'Thresher Thrasher',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Self and all allies in the burst',
						effect: 'Each target moves up to their speed. Until the end of the encounter, when a creature enters or starts their turn adjacent to a target, the target can make a free strike against them..'
					})
				}),
				FactoryLogic.feature.create({
					id: 'lizardfolk-7-feature-8',
					name: 'Rex Reptilian Escape',
					description: 'While the deathrex still has a tail, whenever the deathrex is inflicted with an EoT or save ends eﬀect, the deathrex can lose their tail to immediately end the eﬀect and shift 2.'
				})
			]
		})
	],
	addOns: []
};
