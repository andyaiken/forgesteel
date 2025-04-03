import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const warDog: MonsterGroup = {
	id: 'monster-group-wardog',
	name: 'War Dog',
	description: 'Ajax’s War Dogs—brutal patchwork soldiers—owe their new lives to the Iron Saint, and fight for him fanatically. War Dog minions are the freshest recruits, possessing minimal patchwork qualities and generally treated as disposable. Those who survive a battle are rewarded with gifts from the Body Banks. Those who don’t survive become material for those Body Banks.',

	information: [
		{
			id: 'wardog-info-1',
			name: 'Withdrawn from the Body Banks',
			description: 'The Body Bank technology stolen from the upper worlds allows for the storage, manipulation, and reuse of biological body parts, and they have been put to terrible use by Ajax and his followers. For the rich and powerful elite, they serve as a source of reliable medical materials and even enhancements; for everyone else, they are a threat looming over them, a warning of what might happen to the disloyal. Those pieces not claimed by the upper classes are stitched, welded, and fused together to become an endless supply of twisted foot soldiers.'
		},
		{
			id: 'wardog-info-2',
			name: 'Splintered Souls',
			description: 'War dogs aren’t technically soulless: they have minds, wills, and a vital spark that separates them from the Undead, but their souls are as patchwork as their bodies. Congealed unnaturally from the shattered remains of their constituent parts, their mosaic souls are irrevocably damaged and only partially functional. War dogs are thus metaphysically unstable, incapable of higher spiritual functions like empathy or love, and their personalities and beliefs are highly malleable. This makes them the ideal disposable soldier for the discerning tyrant.'
		},
		{
			id: 'wardog-info-3',
			name: 'Enlisted at Rebirth',
			description: `
From the moment they are reborn, every war dog is part of Ajax’s war machine. Fresh recruits undergo inspections and tests to ensure their viability and assess their capabilities, and those who are found lacking are immediately recycled.

Those who meet the minimum requirements are sent to a brief but intense training camp, where they are drilled in basic combat, personal fitness, and unswerving loyalty. It is here that they are indoctrinated with Ajax’s ideals, and any who question them are again, immediately recycled. Those who survive this training camp are fitted with “Loyalty Collars” – unremovable neck pieces fitted with explosive fuse-iron charges – and sent on to join a Legion.        
        `
		},
		{
			id: 'wardog-info-4',
			name: 'Chain of Command',
			description: `
Ajax leaves the management and tactical goals of individual legions to his hand-picked Strategoi. Each Strategos is an exceptionally talented war dog, often a veteran with dozens of upgrades and refinements, and is usually selected for their ability to think and plan. The Strategos in turn appoints the most powerful and skilled war dogs in the Legion to their Inner Council.

Below the Inner Council are the hundreds of officers and thousands of soldiers. A single deviation from an order, no matter how rational or well-considered, can get a lowly soldier sent back to the Body Banks. Therefore, lower-ranking war dogs rarely alter tactics or show initiative. Without an officer, war dogs turn into an unwieldy and stagnant force capable of only following their final orders.
                    `
		},
		{
			id: 'wardog-info-5',
			name: 'War Dog Tactics',
			description: `
War dogs have a heavy focus on minion frontlines backed by captains with powerful control or support abilities. Their tactics reflect the replaceability of their low-ranking troops, throwing them into the mix without caution. Once a squad of minions is reduced to a few stragglers, captains will order them into position for maximum effect and manually detonate their loyalty collars.

The captains are intelligent, well-trained, and capable of prioritizing threats to their mission. Defensive and support units focus on tying up and slowing down high-Stamina threats while offensive units try their best to bully low-Stamina backline heroes. Unless ordered, retreat is not an option.
                    `
		},
		{
			id: 'wardog-info-6',
			name: 'War Dog Languages',
			description: `
Most war dogs speak Caelian and one Vaslorian human language.                    
                    `
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver({ qualifiers: [ 'Non-minion' ] }),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the cube',
				preEffect: 'Each target makes an Agility test.',
				test: FactoryLogic.createPowerRoll({
					tier1: '5 fire damage; slowed or weakened (save ends)',
					tier2: '5 fire damage; slowed or weakened (EoT)',
					tier3: '5 fire damage'
				})
			})
		}),

		FactoryLogic.feature.createMalice({
			id: 'wardog-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion can shift up their speed, make a free strike, and then die.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-1',
			name: 'War Dog Commando',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1-feature-2',
						name: 'Daggers',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'The commando can use the Hide maneuver, even if observed.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1-2',
					name: 'Loyalty Collar',
					description: 'When the commando dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-2',
			name: 'War Dog Tetherite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-2-feature-1',
						name: 'Banded Dagger',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2-2',
					name: 'Tethered',
					description: 'A captain attached to a tetherite squad has their Stability increased by the number of tetherites within 2 squares of them.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-2-3',
					name: 'Loyalty Collar',
					description: 'When the tetherite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-3',
			name: 'War Dog Conscript',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-3-feature-1',
						name: 'Blade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'This ability has an edge if it’s used while charging.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the conscript dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-4',
			name: 'War Dog Sharpshooter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-4-feature-1',
						name: 'Bolt Launcher',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}),
						effect: 'This ability ignores cover and concealment.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-4-2',
					name: 'Loyalty Collar',
					description: 'When the sharpshooter dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-5',
			name: 'War Dog Amalgamite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Brute),
			keywords: [ 'Human', 'Humanoid' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 25,
			stability: 2,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-5-feature-1',
						name: 'Several Arms',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(2)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '5 damage; A<1 grabbed',
							tier3: '6 damage; A<2 grabbed'
						}),
						effect: 'The amalgamite can have up to four targets grabbed.',
						spend: [ {
							value: 3,
							effect: 'The amalgamite deals an additional 3 damage to each creature they have grabbed and regains Stamina equal to the damage dealt.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-5-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-5-feature-3',
					name: 'Loyalty Collar',
					description: 'When the amalgamite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-6',
			name: 'War Dog Eviscerite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Harrier),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-6-feature-1',
						name: 'Chainsaw Whip',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 damage',
							tier2: '4 damage; pull 1',
							tier3: '5 damage; pull 2'
						}),
						effect: 'The eviscerite can grab a target pulled adjacent to them by this ability.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-6-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-6-feature-3',
					name: 'Loyalty Collar',
					description: 'When the eviscerite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-7',
			name: 'War Dog Crucibite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Artillery),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-7-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-7-feature-2',
						name: 'Flamebelcher',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 })
						],
						target: 'All creatures and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 fire damage',
							tier2: '4 fire damage',
							tier3: '5 fire damage'
						}),
						effect: 'The area is covered in sticky fire until the start of the crucibite’s next turn. Whenever a creature enters the area for the first time in a round or starts their turn there, they take 2 fire damage.',
						spend: [ {
							value: 3,
							effect: 'The area increases to a 10 × 1 line, and if any ally of the crucibite is in the area when it is created, the crucibite deals an additional 2 damage to each target.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-7-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-7-feature-4',
					name: 'Loyalty Collar',
					description: 'When the crucibite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-8',
			name: 'War Dog Neuronite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Defender),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-8-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-8-feature-2',
						name: 'Synlirii Grafts',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Each enemy in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 psychic damage; vertical slide 1',
							tier2: '2 psychic damage; vertical slide 2',
							tier3: '3 psychic damage; vertical slide 3'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-8-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-8-feature-4',
						name: 'The Voice',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the burst',
						effect: 'The neuronite chooses an ally within 10 squares, then chooses whether each target is taunted by the ally or the ally has damage immunity 3 whenever they’re attacked by a target until the start of the neuronite’s next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-8-feature-5',
					name: 'Loyalty Collar',
					description: 'When the crucibite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-9',
			name: 'War Dog Pestilite',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Controller),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-9-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-9-feature-2',
						name: 'Plaguecaster',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 })
						],
						target: 'Each creature in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 poison damage; I<0 frightened (save ends)',
							tier2: '4 poison damage; I<1 frightened (save ends)',
							tier3: '5 poison damage; I<2 frightened (save ends)'
						}),
						effect: 'The area is covered in a cloud of pestilence that lasts until the start of the pestilite’s next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 2 poison damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-9-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-9-feature-4',
					name: 'Loyalty Collar',
					description: 'When the pestilite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-10',
			name: 'War Dog Portalite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Ambusher),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'teleport'),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-10-feature-1',
						name: 'Corrupted Ash Daggers',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; slide 1',
							tier2: '6 damage; slide 2',
							tier3: '7 damage; slide 3'
						}),
						effect: 'The portalite has an edge on this ability if an ally is adjacent to the target.',
						spend: [ {
							value: 1,
							effect: 'The portalite teleports the target 3 squares before sliding them.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-10-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-10-feature-3',
						name: 'Corrupted Ash Teleport',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The portalite teleports up to 5 squares and has an edge on strikes until the end of their turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-10-feature-4',
					name: 'Loyalty Collar',
					description: 'When the portalite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-11',
			name: 'War Dog Phosphorite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Hexer),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-11-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-11-feature-2',
						name: 'Caustic Detonator',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						preEffect: 'A detonator attaches to the target. At the end of each round, roll a die. On an odd result, the detonator explodes, triggering the power roll.',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 acid damage; M<0 bleeding (save ends)',
							tier2: '6 acid damage; M<1 bleeding (save ends)',
							tier3: '10 acid damage; M<2 bleeding (save ends)'
						}),
						effect: 'An adjacent creature can attempt an easy Agility test to remove the detonator as a maneuver. A failure does nothing, a success disarms and destroys the detonator, and a success with a reward allows the disarming creature to throw the detonator onto another target within 5 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-11-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-11-feature-4',
					name: 'Loyalty Collar',
					description: 'When the phosphorite dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-12',
			name: 'War Dog Subcommander',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Band, MonsterRoleType.Support),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-12-feature-1',
						name: 'Command Saber',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}),
						effect: 'An ally within 5 squares of the subcommander can make a free strike against the target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-12-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog with a loyalty collar',
						effect: 'The target’s loyalty collar detonates, killing them instantly.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-12-feature-3',
					name: 'The Iron Saint Does Not Recognize Retreat',
					description: 'Each ally within 5 squares of the subcommander adds 3 to their stability.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-12-feature-4',
					name: 'Loyalty Collar',
					description: 'When the subcommander dies, they explode, dealing 1d6 damage to each adjacent enemy.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-13',
			name: 'War Dog Ground Commander',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'War Dog', 'Humanoid' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 3, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-1',
						name: 'Conditioning Spear',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; pull 1',
							tier2: '12 damage; pull 2',
							tier3: '8 damage; M<3 slowed (save ends)'
						}),
						effect: 'One ally within 10 squares of the commander can make a free strike.',
						spend: [ {
							value: 1,
							effect: 'A target who is adjacent to the ground commander after this ability is resolved is I<2 grabbed (save ends). This grab can’t be escaped using the Escape Grab maneuver. The ground commander can grab up to two creatures at a time.'
						} ]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-2',
						name: 'Highest Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Each war dog with a loyalty collar',
						effect: 'The ground commander selects any number of targets’ loyalty collars and detonates them, killing the target instantly.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-3',
						name: 'Final Orders',
						type: FactoryLogic.type.createTrigger('The target has a condition imposed on them, is force moved, or is killed.'),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createRanged(10)
						],
						target: 'One ally',
						effect: 'The target can move up to their speed and make a free strike before the triggering effect happens.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-13-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the ground commander can take 5 damage to end one save ends effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-13-feature-5',
					name: 'Loyalty Collar',
					description: 'When the ground commander dies, they explode, dealing 2d6 damage to each adjacent enemy.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-6',
						name: 'Combined Arms',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally',
						effect: 'Each target can make a ranged free strike, then immediately use the Charge action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-7',
						name: 'Make an Example of Them',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						effect: 'Each ally within 5 squares of the target can move up to their speed and make a free strike against the target. The target is then I<2 frightened of the ground commander (save ends).'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-13-feature-8',
						name: 'Claim Them for the Body Banks',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally',
						effect: 'Each target can shift 2 and use the Grab maneuver. For the rest of the encounter, each enemy has a bane on escaping grabs.'
					})
				})
			]
		})
	],
	addOns: []
};




