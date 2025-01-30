import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const elfWode: MonsterGroup = {
	id: 'monster-group-elf-wode',
	name: 'Elves, Wode',
	description: `
Children of the Sylvan Celestials, masters of the elf-haunted forests called wodes, these elves see all forests as their domain by birthright. They know and enjoy their reputation among humans as snatching children who wander too far into the woods. Humans should fear the trees.

Their natural ability to mask their presence, called glamor, compliments their guerilla style of fighting, striking quickly from cover and then melding back into the underbrush. These traits also make those few who dwell in human cities naturally adept at urban warfare.`,
	information: [
		{
			id: 'elf-wode-info-1',
			name: 'Heart of the Wode',
			description: 'The primary value of wode elf culture is respect and reverence for their home, the wode in which they live. They speak of the wode as though it is alive and conscious, dangerous and delightful. Wode elves are more receptive to strangers who respect the land they trespass upon. Those who harm it, however, ruin their one and only chance of treating peacefully with the wode’s beating heart.'
		},
		{
			id: 'elf-wode-info-2',
			name: 'Wodeworking',
			description: `
Wode elves know a secret technique to use the trees of the wode to craft materials as strong as metal and to create magical constructs that act as servitor creatures, including their mounts. To breathe life into these creations, the wode elves lift their voices in song. The more intricate the song, the more durable and autonomous the creation becomes. A wodenelg’s rider is typically also their singer, creating a connection between the two that can last a lifetime.

Legends tell of ancient beings, older than the forests themselves, that were sung to life by an entire wode elf civilization joined in sixteen-part harmony. They outlived their creators and roam the world as unknowable guardians who answer to nothing but their final set of instructions.`
		},
		{
			id: 'elf-wode-info-3',
			name: 'Sylvan Surveillance',
			description: `
The wode elves’ natural connection to the wode allows them to stay aware of the forest’s goings-on while inside of it. This isn’t some telepathic connection, but rather a great understanding of every corner of the wode and a hypersensitivity to changes within it. The stench of an amateur campfire, the sudden squawk of a raven, the forced march of a hungry ant colony: all of this information comes together to form a wode elf’s understanding of their surroundings.

A wode elf develops this sense for their home over time, meaning that a wode elf who lives in an urban environment has just as much understanding of their neighborhood as their cousin in the forest does the trees.`
		},
		{
			id: 'elf-wode-info-4',
			name: 'Blightless Ambition',
			description: 'Not all wode elves are happy to negotiate with peaceful interlopers. Some groups view even the very presence of humans as a direct threat to their way of life. One group of scavenging parties, known as the Blightless, searches the forest for lost mortals. They seek to eliminate these threats by any means possible. Overzealous and aggressive, the Blightless seek to expand the boundaries of their home, attacking civilizations that exist close to the forest’s edge. Because Blightless attacks constitute the majority of mortal interaction with the wode elves, they set the tone for mortal perception of a mostly peaceful people.'
		},
		{
			id: 'elf-wode-info-5',
			name: 'Chirugeons',
			description: 'When wode elves control the terrain, one of their primary strategies is divide and conquer. The chirugeons are strategists who enact their picture-perfect plans with their own hands, in the thick of battle. Enemies will never know exactly how many wode elves they’re facing. Not if the crafty chirugeon can help it.'
		},
		{
			id: 'elf-wode-info-6',
			name: 'Warleader',
			description: `
The warleader of a wode elf court is usually their finest tactician. One warleader alone can command dozens of squadrons across miles of their forests with such precision that they can appear to predict an enemy’s movements without ever laying an eye on them. In times of peace, a warleader’s role is primarily that of teacher, a mentor that scouts and soldiers regard almost as an additional parent.

The wode elves only send their warleader if the situation is dire. If you fight one, you should be flattered – the wode elves consider you a formidable threat.`
		},
		{
			id: 'elf-wode-info-7',
			name: 'Wode Elf Languages',
			description: 'Most wode elves speak Caelian and Yllyric.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'elf-wode-malice-1',
			name: 'Forest Network',
			cost: 3,
			sections: [
				'Each wode elf that ends this turn hidden can shift their speed while remaining hidden.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elf-wode-malice-2',
			name: 'Punishing Regrowth',
			cost: 5,
			sections: [
				'Until the end of the turn, each wode elf inflicts slide 2 with their strikes and they have an edge on their abilities. If a target force moved by one of these strikes ends the forced movement in difficult terrain, they are restrained (EoT).'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'elf-wode-malice-3',
			name: 'Vines Everywhere',
			cost: 7,
			sections: [
				'Vines emerge and rapidly grow across the entire encounter map. Each enemy must make an **Agility test**.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '8 damage; restrained (save ends)',
					tier2: 'restrained (EoT)',
					tier3: 'no effect'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'elf-wode-1',
			name: 'Wode Elf Lookout',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Support, MonsterOrganizationType.Minion),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			freeStrikeDamage: 1,
			withCaptain: 'Speed +2',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-1-feature-1',
						name: 'Longbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(8) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-1-feature-2',
					name: 'There!',
					description: 'A wode elf within 5 of the lookout can make a ranged strike as if occupying the lookout’s space.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-1-feature-3',
					name: 'Masking Glamor',
					description: 'The lookout immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-2',
			name: 'Wode Elf Runner',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier, MonsterOrganizationType.Minion),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 4,
			freeStrikeDamage: 1,
			withCaptain: 'Ranged distance +5',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-2-feature-1',
						name: 'Spear',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '1 damage',
							tier2: '2 damage',
							tier3: '3 damage'
						}),
						effect: 'The runner can shift 2 before charging while using this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-2-feature-2',
					name: 'Masking Glamor',
					description: 'The runner immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-3',
			name: 'Wode Elf Scout',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Ambusher, MonsterOrganizationType.Minion),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(10),
			stamina: 4,
			freeStrikeDamage: 2,
			withCaptain: 'Edge on strikes',
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-3-feature-1',
						name: 'Daggers',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
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
					id: 'elf-wode-3-feature-2',
					name: 'Hunter’s Glamor',
					description: 'The scout immediately hides at the end of their turn, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-4',
			name: 'Wode Elf Yeoman',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Artillery, MonsterOrganizationType.Minion),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 3,
			freeStrikeDamage: 2,
			withCaptain: 'Strike damage +1',
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-4-feature-1',
						name: 'Heavy Longbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(12) ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage; push 1',
							tier2: '4 damage; push 2',
							tier3: '5 damage; push 3'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-4-feature-2',
					name: 'Masking Glamor',
					description: 'The yeoman immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-5',
			name: 'Wode Elf Druid',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Controller, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 8,
			speed: FactoryLogic.createSpeed(7),
			stamina: 30,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-5-feature-1',
						name: 'Entangling Vines',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						effect: 'A creature slowed by this ability can’t search for hidden creatures until the condition ends.',
						spend: [
							{ value: 3, effect: 'The area of the cube and the potency of the effect both increase by 1.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-5-feature-2',
						name: 'The Wode Protects Us',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Self and three allies',
						effect: 'Each target teleports to a square within 10 that has cover or concealment from all enemies.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-5-feature-3',
					name: 'Masking Glamor',
					description: 'The druid immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-6',
			name: 'Wode Elf Green Seer',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Hexer, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 20,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-6-feature-1',
						name: 'The Forest’s Embrace',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage; I<1 restrained (save ends)',
							tier3: '9 damage; I<2 restrained (save ends)'
						}),
						effect: 'A creature restrained by this ability can’t search for hidden creatures until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-6-feature-2',
						name: 'The Natural Cycle',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '2 damage',
							tier2: '4 damage; P<1 target has a double bane on strikes (save ends)',
							tier3: '6 damage; P<2 bleeding (save ends), target has a double bane on strikes (save ends)'
						}),
						effect: 'The green seer causes lichen to form and encroach upon each target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-6-feature-3',
						name: 'Foreseen Punishment',
						type: FactoryLogic.type.createTrigger('A creature uses a triggered action targeting the green seer or an ally within distance.', true),
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Triggering creature',
						effect: 'The green seer makes a free strike against the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-6-feature-4',
					name: 'Masking Glamor',
					description: 'The green seer immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-7',
			name: 'Wode Elf Greenskeeper',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Defender, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 40,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-7-feature-1',
						name: 'Growing Longsword',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage'
						}),
						effect: 'Taunted (EoT). The greenskeeper can shift 3 after making the attack.',
						spend: [
							{ value: 2, effect: 'The distance increases to Melee 5.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-7-feature-2',
						name: 'Overgrowth',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 3 }) ],
						target: 'Special',
						effect: 'The affected area is overgrown with heavy brush and bramble. It provides cover and concealment for the greenskeeper and all allies, and is considered difficult terrain for enemies. An enemy that starts their turn in an affected square takes 3 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-7-feature-3',
					name: 'Masking Glamor',
					description: 'The greenskeeper immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-8',
			name: 'Wode Elf Sentry',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Support, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 6,
			speed: FactoryLogic.createSpeed(7),
			stamina: 30,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-8-feature-1',
						name: 'Tracer Longbow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage; marked (save ends)'
						}),
						effect: 'Each ally has an edge on strikes and abilities against marked targets until the condition ends.',
						spend: [
							{ value: 3, effect: 'The sentry targets two additional creatures or objects.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-8-feature-2',
						name: 'Death Blossom',
						type: FactoryLogic.type.createAction(),
						cost: 2,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All marked enemies in the burst',
						effect: '3 damage.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-8-feature-3',
					name: 'Masking Glamor',
					description: 'The sentry immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-9',
			name: 'Wode Elf Tree Chirugeon',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 8,
			speed: FactoryLogic.createSpeed(7),
			stamina: 40,
			freeStrikeDamage: 4,
			characteristics: MonsterLogic.createCharacteristics(1, 2, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-9-feature-1',
						name: 'Wild Ax',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '6 damage; push 1',
							tier2: '9 damage; push 3',
							tier3: '12 damage; push 5'
						}),
						effect: 'The tree chirugeon can make a ranged free strike before using this ability.',
						spend: [
							{ value: 5, effect: 'The tree chirugeon uses this ability again.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-9-feature-2',
						name: 'The Wode Protects Us',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Self and three allies',
						effect: 'Each target teleports to a square within 10 that has cover or concealment from all enemies.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-1-feature-3',
					name: 'Masking Glamor',
					description: 'The tree chirugeon immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-10',
			name: 'Wode Elf Tree Guerilla',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Ambusher, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 10,
			speed: FactoryLogic.createSpeed(7, 'teleport'),
			stamina: 50,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-10-feature-1',
						name: 'Splinter Dagger',
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
							tier1: '7 damage',
							tier2: '11 damage',
							tier3: '14 damage; M<2 bleeding (save ends)'
						}),
						effect: 'The tree guerilla can teleport 3 after using this ability.',
						spend: [
							{ value: 3, effect: 'The tree guerilla targets an additional creature or object. The tree guerilla deals an additional 3 damage if both targets are adjacent to each other.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-10-feature-2',
						name: 'Do Not Hesitate in the wode',
						type: FactoryLogic.type.createTrigger('An ally ends their turn while the tree guerilla hasn’t acted this round.', true),
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createSpecial('Squad')
						],
						target: 'Self and Squad',
						effect: 'The targets take their turn immediately. Each target has an edge on their abilities until the end of their turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-10-feature-3',
					name: 'Hunter’s Glamor',
					description: 'The tree guerilla immediately hides at the end of their turn, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-11',
			name: 'Wode Elf Tree Gweiadur',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Artillery, MonsterOrganizationType.Platoon),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 10,
			speed: FactoryLogic.createSpeed(7),
			stamina: 40,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-11-feature-1',
						name: 'Snare Bow',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '7 damage',
							tier2: '11 damage',
							tier3: '14 damage; A<2 restrained (save ends)'
						}),
						effect: 'The tree gweiadur can shift 3 after using this ability.',
						spend: [
							{ value: 3, effect: 'If this ability restrains the target, an enemy within 1 of the target is also restrained (save ends).' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-11-feature-2',
						name: 'You Activated My Trap!',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'All enemies in the cube',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '4 damage; R<0 marked (save ends)',
							tier2: '6 damage; R<1 slowed and marked (save ends)',
							tier3: '9 damage; R<2 slowed and marked (save ends)'
						}),
						effect: 'Each ally has an edge on strikes and abilities against marked targets until the condition ends.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-11-feature-3',
					name: 'Masking Glamor',
					description: 'The tree gweiadur immediately hides at the end of their turn while in cover or concealment, even if they are observed.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-12',
			name: 'Wode Elf Warleader',
			level: 3,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.NoRole, MonsterOrganizationType.Leader),
			keywords: [ 'Fey', 'Humanoid', 'Wode Elf' ],
			encounterValue: 20,
			speed: FactoryLogic.createSpeed(7, 'teleport'),
			stamina: 120,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 3, 2, 2, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-1',
						name: 'Wodeblade',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: '8 damage; M<1 restrained (save ends)',
							tier2: '12 damage; M<2 restrained (save ends)',
							tier3: '15 damage; M<3 restrained (save ends)'
						}),
						effect: 'The warleader strikes each target one at a time and can teleport 3 squares between each strike.',
						spend: [
							{ value: 2, effect: 'A target restrained by this ability takes an additional 3 damage.' }
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-2',
						name: 'Fairness is a Human Concept',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'All allies the burst',
						effect: 'Each target can makerr a free strike and then shifts 3. A target immediately hides at the end of the warleader’s turn while in cover or concealment.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-3',
						name: 'Wode Sickness',
						type: FactoryLogic.type.createTrigger('An ally ends their turn.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One enemy',
						effect: 'The target must take their turn now, if they have not already taken it. P<2 the target is bleeding and has a bane on their strikes until the end of their turn.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-4',
						name: 'Enough!',
						type: FactoryLogic.type.createTrigger('An enemy targets the ordinator or an ally within distance with an ability.'),
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Triggering enemy',
						effect: 'The ordinator uses Lightning Rod against the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-12-feature-5',
					name: 'End Effect',
					description: 'At the end of their turn, the warleader can take 5 damage to end one save ends effecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-12-feature-6',
					name: 'Hunter’s Glamor',
					description: 'The warleader immediately hides at the end of their turn, even if they are observed.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-7',
						name: 'You Will ALL Witness My Blade',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All enemies in the burst',
						effect: 'The warleader uses Wodeblade against each target with an edge.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-8',
						name: 'Suppressing Volley',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'All allies in the burst',
						effect: 'The warleader uses Wodeblade against a single creature or object. Each target then makes a free strike.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-12-feature-9',
						name: 'Is It Now or Is It Then? Where Are We?',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 })
						],
						target: 'Self and all allies in the burst',
						effect: 'Eeach target becomes invisible until the start of the next round. The warleader then uses Wodeblade.'
					})
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'elf-wode-13',
			name: 'Wodenelg',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Mount, MonsterOrganizationType.Platoon),
			keywords: [ 'Plant', 'Wode Elf' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(10),
			stamina: 30,
			stability: 1,
			freeStrikeDamage: 3,
			characteristics: MonsterLogic.createCharacteristics(2, 1, -1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-13-feature-1',
						name: 'Gore',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '5 damage',
							tier2: '7 damage',
							tier3: '9 damage'
						}),
						effect: 'The wodenelg’s rider can make a free strike at any point during the charge.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-13-feature-2',
					name: 'Sure Footed',
					description: 'The wodenelg ignores all difficult terrain, including enemy squares, and doesn’t provoke opportunity attacks by moving.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elf-wode-13-feature-3',
						name: 'Where I End the Woods Begin',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'The wodenelg and their rider become invisible until the start of their next turn.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-13-feature-4',
					name: 'Mounted Stability',
					description: 'The wodenelg’s rider has damage immunity 2.'
				}),
				FactoryLogic.feature.create({
					id: 'elf-wode-13-feature-5',
					name: 'Shared Glamor',
					description: 'If the wodenelg’s rider has the Masking Glamor or Hunter’s Glamor trait, they also gain the trait’s benefits.'
				})
			]
		})
	]
};
