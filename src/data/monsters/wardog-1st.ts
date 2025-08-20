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

export const warDog1st: MonsterGroup = {
	id: 'monster-group-wardog-1st',
	name: 'War Dog - 1st Echelon',
	description: 'Ajax’s war dogs—brutal patchwork soldiers—owe their new lives to the Iron Saint and fight for him fanatically. War dog minions are the freshest recruits, possessing minimal patchwork qualities and generally treated as disposable. Those who survive a battle are rewarded with gifts from the Body Banks. Those who don’t survive become recycled back into the Body Banks to be reborn.',
	picture: null,
	information: [
		{
			id: 'wardog-1st-info-warning',
			name: 'Content Warning: Brainwashing and Body Horror',
			description: 'War dogs are explicitly evil soldiers built from the body parts of other humanoids. Check in with your players before running war dogs to make sure that they’re okay with battling brainwashed soldiers with an appearance akin to Frankenstein’s monster if he were built to be a shock trooper. If anyone is uncomfortable, modify the appearance and lore of the war dogs as you see fit.'
		},
		{
			id: 'wardog-1st-info-1',
			name: 'Withdrawn from the Body Banks',
			description: 'Body Bank technology stolen from the upper worlds allows for the storage, manipulation, and reuse of biological body parts, and this technology has been put to terrible use by Ajax and his followers. For the rich and powerful elite, the Body Banks serve as a source of reliable medical materials and even enhancements. For everyone else, they are a looming threat and a warning of what might happen to the disloyal. Those body parts not claimed by the upper classes are stitched, welded, and fused together to become an endless supply of twisted warriors.'
		},
		{
			id: 'wardog-1st-info-2',
			name: 'Soulless Soldiers',
			description: 'War dogs aren’t technically soulless: they have minds, wills, and a vital spark that separates them from the Undead, but their souls are as patchwork as their bodies. Congealed unnaturally from the shattered remains of their constituent parts, their mosaic souls are irrevocably damaged and only partially functional. War dogs are thus metaphysically unstable, incapable of higher spiritual functions like empathy or love, and their personalities and beliefs are highly malleable. This makes them the ideal disposable soldier for the discerning tyrant.'
		},
		{
			id: 'wardog-1st-info-3',
			name: 'Enlisted at Rebirth',
			description: `
From the moment they are reborn, every war dog is part of Ajax’s war machine. Fresh recruits undergo inspections and tests to ensure their viability and assess their capabilities, and those who are found lacking are immediately recycled. 

Those who meet the minimum requirements are sent to a brief but intense training camp, where they are drilled in basic combat, personal fitness, and unswerving loyalty. It is here that war dogs are first indoctrinated with Ajax’s ideals, and any who question those ideals are immediately recycled. Those who survive this training camp are fitted with loyalty collars—unremovable neck pieces fitted with explosive fuse-iron charges—and sent on to join a legion.`
		},
		{
			id: 'wardog-1st-info-4',
			name: 'Chain of Command',
			description: `Ajax leaves the management and tactical goals of individual legions to his hand-picked strategoi. Each strategos is an exceptionally talented war dog, often a veteran with dozens of upgrades and refinements, and is typically selected for their ability to think and plan. A strategos in turn appoints the most powerful and skilled war dogs in the legion to their inner council.

Below the inner council are hundreds of officers and thousands of soldiers. A single deviation from an order, no matter how rational or well considered, can get a lowly soldier sent back to the Body Banks. As such, lower-ranking war dogs rarely alter tactics or show initiative. Without an officer to command them, war dogs can easily turn into an unwieldy and stagnant force capable only of following their most recent orders.`
		},
		{
			id: 'wardog-1st-info-5',
			name: 'War Dog Tactics',
			description: `War dogs have a heavy focus on minion frontlines backed by captains with powerful control or support abilities. Those captains’ tactics reflect the replaceability of their low-ranking troops, who they throw into the fray without caution. Once a squad of minions is reduced to a few stragglers, a captain will order them into position for maximum effect and manually detonate their loyalty collars.

War dog captains are intelligent, well trained, and focused on prioritizing threats to their mission. Defensive and support units focus on tying up and slowing down high-Stamina threats while offensive units try their best to bully low-Stamina backline heroes. Unless ordered, retreat is not an option for war dogs.

**War Dog Sample Encounters**
- **Camp Patrol, 18 EV**: Eight conscripts, eight sharpshooters, one eviscerite, one crucibite

- **Bodyguard Squad, 24 EV**: Eight sharpshooters, eight tetherites, two amalgamites, one phosphorite

- **Scout Patrol, 34 EV**: Eight commandos, sixteen conscripts, two teletalites, two neuronites, one subcommander

- **Oppressor Force, 52 EV**: Eight conscripts, eight sharpshooters, sixteen commandos, one pestilite, one neuronite, one ground commander`
		},
		{
			id: 'wardog-1st-info-6',
			name: 'War Dog Languages',
			description: 'Most war dogs speak Caelian and one Vaslorian human language.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'wardog-1st-malice-1',
			name: 'Reconstitute',
			cost: 3,
			sections: [
				'One war dog acting this turn tears apart a nearby corpse of a humanoid and incorporates its body parts into their own. The war dog regains Stamina equal to 5 times their level.'
			]
		}),
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'wardog-1st-malice-2',
				name: 'Fire for Effect',
				type: FactoryLogic.type.createManeuver(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each creature in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('**Effect:** Each target makes an **Agility test**. The same condition is imposed on each affected target'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 fire damage; slowed or weakened (save ends)',
						tier2: '5 fire damage; slowed or weakened (EoT)',
						tier3: '5 fire damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'wardog-1st-malice-3',
			name: 'Fodder Run',
			cost: 7,
			sections: [
				'Each war dog minion in the encounter shifts up to their speed and can make a free strike. A minion who does so is then reduced to 0 Stamina.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'wardog-1st-1',
			name: 'War Dog Commando',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-1-feature-1',
						name: 'Daggers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** After using this ability, the commando can attempt to hide even if observed.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-1-feature-2',
					name: 'Loyalty Collar',
					description: 'When the commando is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-2',
			name: 'War Dog Conscript',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			stability: 0,
			freeStrikeDamage: 1,
			withCaptain: '+1 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-2-feature-1',
						name: 'Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 damage',
								tier2: '2 damage',
								tier3: '3 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** If used with the Charge main action, this ability gains an edge.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-2-feature-2',
					name: 'Loyalty Collar',
					description: 'When the conscript is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-3',
			name: 'War Dog Sharpshooter',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 3,
			stability: 0,
			freeStrikeDamage: 2,
			withCaptain: '+5 bonus to ranged distance',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-3-feature-1',
						name: 'Bolt Launcher',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** This ability ignores cover and concealment. ')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-3-feature-2',
					name: 'Loyalty Collar',
					description: 'When the sharpshooter is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-4',
			name: 'War Dog Tetherite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 5,
			stability: 1,
			freeStrikeDamage: 2,
			withCaptain: 'Gain an edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(2, 0, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-4-feature-1',
						name: 'Banded Dagger',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 damage',
								tier2: '4 damage',
								tier3: '5 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-4-feature-2',
					name: 'Tethered',
					description: 'A captain attached to a tetherite squad has their stability increased by the number of tetherites within 2 squares of them.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-4-feature-3',
					name: 'Loyalty Collar',
					description: 'When the tetherite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d3 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-5',
			name: 'War Dog Amalgamite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
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
						id: 'wardog-1st-5-feature-1',
						name: 'Several Arms',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '5 damage; A < 1 grabbed',
								tier3: '6 damage; A < 2 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The amalgamite can have up to four targets grabbed at once.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The amalgamite deals 3 damage to each creature grabbed this way or who they already have grabbed, and regains Stamina equal to the damage dealt.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-5-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('Effect: If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-5-feature-3',
					name: 'Loyalty Collar',
					description: 'When the amalgamite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-6',
			name: 'War Dog Crucibite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-6-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-6-feature-2',
						name: 'Flamebelcher',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
						target: 'Each creature and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 fire damage',
								tier2: '4 fire damage',
								tier3: '5 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is covered in sticky fire until the start of the crucibite’s next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 2 fire damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'The area becomes a 10 × 1 line, and if any ally of the crucibite is in the area when it is created, the ability deals an extra 2 damage to each target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-6-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-6-feature-4',
					name: 'Loyalty Collar',
					description: 'When the crucibite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-7',
			name: 'War Dog Eviscerite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
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
						id: 'wardog-1st-7-feature-1',
						name: 'Chainsaw Whip',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage',
								tier2: '4 damage; pull 1',
								tier3: '5 damage; pull 2'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The eviscerite can automatically grab a target pulled adjacent to them this way.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-7-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-7-feature-3',
					name: 'Loyalty Collar',
					description: 'When the eviscerite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-8',
			name: 'War Dog Neuronite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Defender),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 3,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5, 'fly'),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 1,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-8-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Psychic, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-2',
						name: 'Synlirii Grafts',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '1 psychic damage; vertical slide 1',
								tier2: '2 psychic damage; vertical slide 2',
								tier3: '3 psychic damage; vertical slide 3'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-8-feature-4',
						name: 'The Voice',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The neuronite chooses one ally within 10 squares. Each target is either taunted by the ally, or the ally has damage immunity 3 whenever any target makes a strike against them (the neuronite’s choice). Either effect lasts until the start of the neuronite’s next turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-8-feature-5',
					name: 'Loyalty Collar',
					description: 'When the neuronite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-9',
			name: 'War Dog Pestilite',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 5,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 20,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-9-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Poison, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-9-feature-2',
						name: 'Plaguecaster',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '2 poison damage; I < 0 frightened (save ends)',
								tier2: '4 poison damage; I < 1 frightened (save ends)',
								tier3: '5 poison damage; I < 2 frightened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is filled with a cloud of pestilence that lasts until the start of the pestilite’s next turn. Any creature who enters the area for the first time in a round or starts their turn there takes 2 poison damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-9-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-9-feature-4',
					name: 'Loyalty Collar',
					description: 'When the pestilite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-10',
			name: 'War Dog Phosphorite',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 4,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 15,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'wardog-1st-10-feature-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Acid, modifierType: DamageModifierType.Immunity, value: 2 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-10-feature-2',
						name: 'Caustic Detonator',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('A detonator attaches to the target. At the end of each round, roll a die. On an odd result, the detonator explodes, triggering the power roll.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 acid damage; M<0 bleeding (save ends)',
								tier2: '6 acid damage; M<1 bleeding (save ends)',
								tier3: '10 acid damage; M<2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('An adjacent creature can attempt an easy Agility test to remove the detonator as a maneuver. A failure does nothing, a success disarms and destroys the detonator, and a success with a reward allows the disarming creature to throw the detonator onto another target within 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-10-feature-3',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-10-feature-4',
					name: 'Loyalty Collar',
					description: 'When the phosphorite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-11',
			name: 'War Dog Teletalite',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
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
						id: 'wardog-1st-11-feature-1',
						name: 'Corrupted Ash Daggers',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage; slide 1',
								tier2: '6 damage; slide 2',
								tier3: '7 damage; slide 3'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The teletalite gains an edge on this ability if any ally is adjacent to the target.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The portalite teleports the target 3 squares before sliding them.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-11-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-11-feature-3',
						name: 'Corrupted Ash Teleport',
						cost: 1,
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The teletalite can teleport up to 5 squares and gains an edge on strikes until the end of their turn.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-11-feature-4',
					name: 'Loyalty Collar',
					description: 'When the teletalite is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-12',
			name: 'War Dog Subcommander',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Horde, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
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
						id: 'wardog-1st-12-feature-1',
						name: 'Command Saber',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '4 damage',
								tier2: '5 damage',
								tier3: '7 damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** One ally within 5 squares of the subcommander can make a free strike against the target.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-12-feature-2',
						name: 'Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One war dog',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** If the target has a loyalty collar, they are reduced to 0 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-12-feature-3',
					name: 'The Iron Saint Does Not Recognize Retreat',
					description: 'Each ally within 5 squares of the subcommander gains a +3 bonus to stability.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-12-feature-4',
					name: 'Loyalty Collar',
					description: 'When the subcommander is reduced to 0 Stamina, their loyalty collar explodes, dealing 1d6 damage to each adjacent enemy and object.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'wardog-1st-13',
			name: 'War Dog Ground Commander',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Humanoid', 'Soulless', 'War Dog' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(3, 2, 3, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-1',
						name: 'Conditioning Spear',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '8 damage; pull 1',
								tier2: '12 damage; pull 2',
								tier3: '15 damage; pull 3'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** One ally within 10 squares of the ground commander can make a free strike.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'A target who has <code>I < 2</code> and who is adjacent to the ground commander after this ability is resolved is grabbed (save ends). This grab can’t be escaped using the Escape Grab maneuver. The ground commander can grab up to two creatures at a time.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-2',
						name: 'Highest Posthumous Promotion',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each war dog in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Any target who has a loyalty collar is reduced to 0 Stamina')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-3',
						name: 'Final Orders',
						type: FactoryLogic.type.createTrigger('The target takes damage, is force moved, or is reduced to 0 Stamina.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Even if reduced to 0 Stamina, the target moves up to their speed and can make a free strike after the triggering effect is resolved. The target then immediately dies.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-13-feature-4',
					name: 'End Effect',
					description: 'At the end of each of their turns, the ground commander can take 5 damage to end one effect on them that can be ended by a saving throw. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'wardog-1st-13-feature-5',
					name: 'Loyalty Collar',
					description: 'When the ground commander is reduced to 0 Stamina, their loyalty collar explodes, dealing 2d6 damage to each adjacent enemy and object.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-6',
						name: 'Combined Arms',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target can make a ranged free strike, then immediately use the Charge main action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-7',
						name: 'Make an Example of Them',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each ally within 5 squares of the target moves up to their speed and can make a free strike against the target. If the target has <code>I < 2</code>, they are frightened of the ground commander (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'wardog-1st-13-feature-8',
						name: 'Claim Them for the Body Banks',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target ally shifts up to 2 squares and can use the Grab maneuver. Until the end of the encounter, each target enemy takes a bane on the Escape Grab maneuver.')
						]
					})
				})
			]
		})
	],
	addOns: []
};
