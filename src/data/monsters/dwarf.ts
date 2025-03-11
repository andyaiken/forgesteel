import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const dwarf: MonsterGroup = {
	id: 'monster-group-dwarf',
	name: 'Dwarf',
	description: `
Possessed of a strength that belies their size, dwarven flesh is infused with stone - a silico-organic hybrid making them physically denser than humans or elves. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.

They are the children of the elder god Ord. A common phrase among the dwarves is “Ord made the world.” Their way of saying, “What will be, will be.” Dwarves take great pride in knowing that along with Aan, Eth, and Kul, their god created the mundane world, and many dwarves leave their homes to see the world and seek glory in Ord’s name.`,
	information: [
		{
			id: 'dwarf-info-1',
			name: 'Tools of the Trade',
			description: `
Those raised within dwarven enclaves have a relationship with technology not found in many other places on Orden. The gifts of the Steel Dwarves are many in number, but the most prominent is that of pneumatic steam power.

Dwarves have incorporated steam into much of their warfare and weaponry, making them deadly opponents. But like all technology, it's a double headed hammer. As much as they use it for destruction, construction is where they truly shine. Creating the formidable and brutalist facades common dwarven architecture is made much easier with the use of tools created to utilize pneumatic power. Some of the larger and more metropolitan dwarven cities are rumored to power wealthier districts using steam from geothermal vents.`
		},
		{
			id: 'dwarf-info-2',
			name: 'Innovative Operation',
			description: `
The dwarves have yet to crack all the secrets of the valok, their ancestors’ greatest achievement, but they’ve made great strides in researching them. They’ve innovated ways to repurpose, recycle, and reverse engineer (to a limited degree) valok assemblage, giving rise to a new multifaceted occupation: the operator.

Operators now span the manifold and come from all walks of life, but the first among them were dwarves who built powered suits from excavated valok parts. These suits were initially used for utility and construction purposes but can be repurposed and refitted for warfare when the need arises.

Word of these wonderous dwarven creations quickly spread among the tunnels of the underground, and up into the overworld. This led to a brief arms race where smiths, artisans, and craftspeople from all over were commissioned by wealthy rulers and aristocrats to create mechanized suits to bolster their armies and personal guard.`
		},
		{
			id: 'dwarf-info-3',
			name: 'The Press Gangs of Kas Kalavar',
			description: `
Before Ajax came to power, the dwarves of Kas Kalavar were renowned for their disciplined constabulary. The constables were kind, kept the order, and kept the city safe.

But now, the dwarves of Kas Kalavar have submitted to Ajax’s rule and pay him tribute in prisoners. Ajax has need for bodies, either as forced labor or to be used to make war dogs and grant eternal life. Most dwarves do not like this deal, but the press gangs are committed to their work.

### Marauder Lord
A press gang’s marauder lord has in their possession a salvaged valok communication array, which they wear like a mohawk on their head. The array gives them access to magnetomancy, allowing them to shape and levitate metal, including multiple axes in battle.`
		},
		{
			id: 'dwarf-info-4',
			name: 'Servitor War Walkers',
			description: 'The war walker is a common sight both in dwarven armies and cities. They vary in appearance and make, ranging anywhere from cobbled together heaps of gears, belts, and plates to elegant and sleek marvels of dwarven engineering. In battle, they carry multiple dwarves and keep foes at a distance. In society, they’re used for public transit and accessibility needs within dwarven cities.'
		},
		{
			id: 'dwarf-info-5',
			name: 'Stone Whisperers',
			description: `
Some dwarves are born with an innate talent to communicate with the stones. Young dwarves identified with this gift are taken to a secretive enclave where they are trained to manipulate the movement and shape of stones using only whispers. The stone whispering technique is a deadly and quiet force in battle; often the rumble of stone is the only precursor to a crushing defeat.

Legends speak of stone singers, dwarves who could move mountains with their song. However, those same legends tell a tale of two stone singers that harmonized their voices and nearly ended the world. This is why today’s stone whisperers stay quiet, afraid of their own potential.`
		},
		{
			id: 'dwarf-info-6',
			name: 'Dwarf Languages',
			description: 'Most dwarves speak Caelian and Zaliac.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'dwarf-malice-1',
			name: 'Breaching Charge',
			cost: 3,
			repeatable: true,
			sections: [
				'A dwarf can destroy one adjacent object or square of wall for every 3 malice spent. Each enemy adjacent to the destroyed object or square takes the object’s Stamina in damage (3 wood / 6 stone / 9 metal).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'dwarf-malice-2',
			name: 'Rappelling Barrage',
			cost: 5,
			sections: [
				'All dwarves acting this turn gain the climb keyword to their movement. At any point during their movement, they can make a free strike.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'dwarf-malice-3',
				name: 'Snaring Line',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 7,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 1, value2: 10, within: 10 }) ],
				target: 'All enemies in the line',
				preEffect: 'Each target makes an **Agility test**.',
				test: FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '8 damage; restrained (EoT)',
					tier2: '6 damage; slowed (EoT)',
					tier3: 'No effect'
				}),
				effect: 'The snaring line remains until the end of the encounter. An enemy that moves into an affected square for the first time on their turn must make the test.'
			})
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'dwarf-1',
			name: 'Dwarf Runner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Defender),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 2,
			freeStrikeDamage: 1,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-1-feature-1',
						name: 'Whistling Axes',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage; an ally adjacent to the target can make a free strike'
						}),
						effect: 'The target can’t use triggered actions until the start of the next round.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-2',
			name: 'Dwarf Catchpole',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 7,
			stability: 2,
			freeStrikeDamage: 2,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-2-feature-1',
						name: 'Maul',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage; grabbed or prone'
						}),
						effect: 'The catchpole deals an additional 2 damage to restrained targets.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-3',
			name: 'Dwarf Hunter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Support),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 6,
			stability: 1,
			freeStrikeDamage: 1,
			withCaptain: '2 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-3-feature-1',
						name: 'Snaring Javelin',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage; push 1',
							tier2: '2 damage; push 2',
							tier3: '3 damage; push 4'
						}),
						effect: 'A target restrained by a dwarf can be pulled by this ability.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-4',
			name: 'Dwarf Grenadier',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Hexer),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 39,
			stability: 3,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-4-feature-1',
						name: 'Concussive Grenade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '6 damage; M<1 slowed (save ends)',
							tier3: '8 damage; M<2 slowed (save ends)'
						}),
						effect: 'A target restrained by a dwarf can be pushed by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-4-feature-2',
						name: 'Sleep Grenade',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 poison damage; I<0 dazed (save ends)',
							tier2: '6 poison damage; I<1 dazed (save ends)',
							tier3: '8 poison damage; I<2 dazed (save ends)'
						}),
						effect: 'A creature dazed by this ability has -1 to all characteristics while resisting potent effects until the condition ends.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-4-feature-3',
					name: 'Indirect Fire',
					description: 'The grenadier ignores dover and concealment and doesn’t need to establish line of effect for their abilities.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-5',
			name: 'Dwarf Gunner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Artillery),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 26,
			stability: 1,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-5-feature-1',
						name: 'Portable Ballista',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage; push 1',
							tier2: '9 damage; push 3',
							tier3: '12 damage; push 5'
						}),
						effect: 'If the target is adjacent to a wall or object after the power roll is resolved, they are restrained (EoT). A target restrained by a dwarf can be pushed by this ability.',
						spend: [
							{ value: 5, effect: 'If the target is pushed into another creature, both the target and the creature are restrained (EoT).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-5-feature-2',
						name: 'Ensnaring Chains',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One restained, slowed, or prone target',
						effect: 'The gunner makes a free strike against the target. The target loses any restrained, slowed or prone conditions and gains restrained (save ends).'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-5-feature-3',
					name: 'Split Shot',
					description: 'Whenever the gunner deals damage to a creature or object, a creature or object within 1 of the recipient takes 3 damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-6',
			name: 'Dwarf Reel Winch',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Support),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 13,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 36,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-1',
						name: 'Snaring Crossbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage; M<2 restrained (save ends)'
						}),
						effect: 'Pull 5. A target restrained by a dwarf, indlucing by this ability, can be pulled this way.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-6-feature-2',
						name: 'Reel Them In',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						effect: 'Pull 8. A slowed or restrained target is pulled an additional 2. A target restrained by a dwarf can be pulled in this way.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-6-feature-3',
					name: 'We Have a Quota!',
					description: 'If the engineer applies the slowed condition to a target who is already slowed or grabbed, the target becomes restrained (save ends) and the slowed or grabbed condition ends.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-7',
			name: 'Dwarf Shieldwall',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Defender),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 21,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 72,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-7-feature-1',
						name: 'Wide Axe',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; slide 1',
							tier2: '10 damage; slide 1',
							tier3: '13 damage; slide 1'
						}),
						effect: 'The shieldwall can shift 1 to remain adjacent to the target. A target restrained by a dwarf can be slid by this ability.',
						spend: [
							{ value: 3, effect: 'The shieldwall targets an additional creature or object.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-7-feature-2',
						name: 'Intercepting Shield',
						type: FactoryLogic.type.createTrigger('A creature strikes an adjacent ally.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The shieldwall becomes the strike’s target and halves the damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-7-feature-3',
					name: 'Call to the Wall',
					description: 'The shieldwall inflicts taunted (EoT) on a creature whenever they deal damage to the shieldwall or take damage from the shieldwall.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-8',
			name: 'Dwarf Stonewhisperer',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Controller),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 52,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 2, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-8-feature-1',
						name: 'Tile Slide',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 1 }) ],
						target: 'All creatures and objects in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; slide 1; M<0 slowed (save ends)',
							tier2: '8 damage; slide 3; M<1 slowed (save ends)',
							tier3: '11 damage; slide 5; M<2 restrained (save ends)'
						}),
						effect: 'A target restrained by a dwarf can be slid by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-8-feature-2',
						name: 'Stone Wave',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; R<0 slowed (save ends)',
							tier2: '6 damage; R<1 slowed (save ends)',
							tier3: '9 damage; R<2 slowed (save ends)'
						}),
						effect: 'A target restrained by a dwarf can be pushed by this ability. The affected area is considered difficult terrain for enemies.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-8-feature-3',
					name: 'Stonewalker',
					description: 'The stonewhisperer can phase through 2 squares of stone as part of any movement they take. If they end their movement inside stone, they are shunted out into the square where they entered it.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-9',
			name: 'Dwarf Trapper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Harrier),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 36,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-9-feature-1',
						name: 'Concussive Bolts',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; push 2',
							tier2: '7 damage; push 4',
							tier3: '9 damage; push 6'
						}),
						effect: 'A target restrained by a dwarf can be pushed by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-9-feature-2',
						name: 'Steam Powered Snare',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
						target: 'All enemies in the cube',
						preEffect: 'Each target makes a **Might test**.',
						test: FactoryLogic.createPowerRoll({
							characteristic: Characteristic.Might,
							tier1: '7 damage; restrained (EoT)',
							tier2: '5 damage; slowed (EoT)',
							tier3: 'No effect'
						}),
						effect: 'The snare remains until the end of the encounter. An enemy that moves into an affected square for the first time on their turn must make the test.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-10',
			name: 'Dwarf Warden',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Platoon, MonsterRoleType.Brute),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 8,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 59,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-10-feature-1',
						name: 'Concussive Maul',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage; push 1',
							tier2: '10 damage; push 3',
							tier3: '13 damage; push 5; M<2 restrained (save ends)'
						}),
						effect: 'A target restrained by a dwarf can be pushed by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-10-feature-2',
						name: 'Concussive Shockwave',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage; push 2; A<0 slowed (save ends)',
							tier2: '8 damage; push 4; A<1 slowed (save ends)',
							tier3: '11 damage; push 6; A<2 dazed (save ends)'
						}),
						effect: 'A target restrained by a dwarf can be pushed by this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-10-feature-3',
					name: 'Escort the Prisoners',
					description: 'Whenever the warden moves, they can carry an adjacent restrained enemy as if they were grabbed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-11',
			name: 'Dwarf Marauder Lord',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 132,
			stability: 4,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 0, 2, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-1',
						name: 'Levitating Axes',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; slide 1',
							tier2: '12 damage; slide 3',
							tier3: '15 damage; slide 5'
						}),
						effect: 'A target restrained by a dwarf can be slid by this ability.',
						spend: [
							{ value: 3, effect: 'A target that is force moved adjacent to an ally with this ability is restrained (EoT).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-2',
						name: 'Magnetomancy',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						effect: 'Vertical slide 5. A target restrained by a dwarf can be slid by this ability.',
						spend: [
							{ value: 5, effect: 'This ability gains the Area keyword, its distance becomes 10 burst, and it now targets restrained creatures.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-3',
						name: 'Your Weapon is Useless',
						type: FactoryLogic.type.createTrigger('A creature makes a melee strike against the target.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Self or one ally',
						effect: 'The target takes half damage from the attack. The attacker takes 4 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-11-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the marauder lord can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-5',
						name: 'Ajax Will Pay Well for These Specimens',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
						target: 'All enemies in the cube',
						effect: 'The marauder lord uses Levitating Axes against each target. The marauder lord makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-6',
						name: 'Don’t Let Them Escape!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						effect: 'Each target shift up to their speed. The marauder lord then uses Levitating Axes.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-11-feature-7',
						name: 'Test Your Metal!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						effect: 'The marauder lord creates three 2-square metal objects in unoccupied squares within distance. When the marauder lord uses Magnetomancy, they can additionally target one of these objects.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-12',
			name: 'Servitor War Worker',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Mount),
			keywords: [ 'Construct', 'Dwarf' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(8, 'climb'),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 0, -2, 0, -2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-1',
						name: 'Grasping Claws',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage',
							tier2: '8 damage',
							tier3: '12 damage; M<2 restrained (save ends)'
						}),
						effect: 'Restrained targets and targets restrained by this ability are pulled 3. A target restrained by a dwarf can be pulled by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-12-feature-2',
						name: 'Stunning Blast',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 lightning damage; A<0 slowed (save ends)',
							tier2: '6 lightning damage; A<1 slowed (save ends)',
							tier3: '8 lightning damage; A<2 slowed (save ends)'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-12-feature-3',
					name: 'Cupola',
					description: 'Three of the war walker’s size 1 allies can occupy the same space while riding the war walker. Riders have cover against attacks that target them.'
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-12-feature-4',
					name: 'Mobile Prison Harness',
					description: 'Slowed or restrained creatures adjacent to the war walker become restrained (save ends) and have a bane on all power rolls. Adjacent restrained creatures are automatically moved with the war walker, ignoring stability.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'dwarf-13',
			name: 'Dwarf Mortar',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Retainer, MonsterRoleType.Hexer),
			keywords: [ 'Dwarf', 'Humanoid' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 3,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-feature-1',
						name: 'Armor-Piercing Shell',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'The attack ignores cover and Temporary Stamina.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'dwarf-13-feature-2',
					name: 'Voice Thrower',
					description: 'The mortar can use a gadget to talk to their mentor over any distance.'
				})
			],
			retainer: {
				level4: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-retainer-4',
						name: 'Signal Shell',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createSpecial('See below') ],
						target: 'All enemies',
						preEffect: 'The mortar fires a shell up to 2 squares vertically. The shell hovers in the air, shedding light in a 3 burst. Enemies illuminated by this light can’t Hide or turn invisible and can’t benefit from shields. At the start of the mortar’s next turn, the shell explodes, damaging enemies in the area.',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '5 fire damage',
							tier2: '8 fire damage',
							tier3: '11 fire damage'
						})
					})
				}),
				level7: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-retainer-7',
						name: 'Screaming Shell',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 1, within: 1 }) ],
						target: 'All creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '6 damage; P (weak) frightened',
							tier2: '9 damage; P (average) frightened',
							tier3: '13 damage; P (strong) frightened'
						}),
						effect: 'Until the start of the mortar’s next turn, attacks against the mortar and allies within 1 suffer a bane.'
					})
				}),
				level10: FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'dwarf-13-retainer-10',
						name: 'Pacifier Shell',
						type: FactoryLogic.type.createAction({ qualifiers: [ 'encounter' ] }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 15 }) ],
						target: 'All enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Might, Characteristic.Agility, Characteristic.Reason, Characteristic.Intuition, Characteristic.Presence ],
							tier1: '8 damage; I (weak) dazed (save ends)',
							tier2: '12 damage; I (average) dazed (save ends)',
							tier3: '16 damage; I (strong) dazed (save ends), prone'
						})
					})
				})
			}
		})
	],
	addOns: []
};
