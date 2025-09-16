import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const rival3rd: MonsterGroup = {
	id: 'monster-group-rival-3rd',
	name: 'Rival - 3rd Echelon',
	description: 'Rivals at the 3rd Echelon have been through quite a few adventures the heroes might not know anything about. Even if they’ve clashed with the heroes a few times in the past, there’s something different about the rivals now.',
	picture: null,
	information: [
		{
			id: 'rival-3rd-info-1',
			name: 'Rivals',
			description: `They take the jobs you were eyeing on the local town’s job board. They sit at your favorite table in the tavern with the best drinks, food, and entertainment. You know their names, and they know yours. They’re rivals—heroes just like you. Maybe even better.

Rivals are NPCs built around the mechanics of seven of the classes in Draw Steel: Heroes—the conduit, elementalist, fury, null, shadow, tactician, and talent (see Chapter 5: Classes in that book). Their stat blocks are streamlined and modular, meant to be easy to adjust on the fly with ancestral traits or signature abilities. Examples of each type of rival are presented at every tier, capturing their foray into renown as they inevitably cross, clash with, and impede the player characters’ own heroic journey.`
		},
		{
			id: 'rival-3rd-info-2',
			name: 'Using Rivals in a Campaign',
			description: 'These grab-and-go adaptations of classes are meant to capture a class’s fantasy without making Directors run a full hero character sheet. They also seamlessly work together, allowing Directors to build a party of NPC heroes or villains who can be rivals, enemies, or even allies. The next time the heroes need a bit of competition or need to quickly visit a local tavern, temple, or guild hall in search of capable adventurers to help with a quest, you won’t be fumbling for a stat block. That’s what rivals are for.'
		},
		{
			id: 'rival-3rd-info-3',
			name: 'Rival Ancestries',
			description: 'You can adjust any rival stat block to more closely model a player character of a specific ancestry. Choose an ancestry from the Rival Ancestries table, then modify the stat block by adding the keyword, adjusting the size, adding the stability adjustment value, and giving them the ancestral trait.'
		},
		{
			id: 'rival-3rd-info-4',
			name: 'Rival Abilities',
			description: 'Any rival can replace their signature ability with a signature ability a hero has access to. The fury, shadow, and tactician can select a signature ability from any kit (see Chapter 6: Kits in Draw Steel: Heroes), and other rivals can select a signature ability from their respective class. If you replace a rival’s signature ability, the replacement ability deals extra damage equal to the rival’s level and targets two creatures or objects if the original ability targets only one.'
		},
		{
			id: 'rival-3rd-info-5',
			name: 'Rival Languagues',
			description: 'Most rivals speak Caelian and two other languages.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-1',
			name: 'Work as One',
			cost: 3,
			sections: [
				'Until the end of the round, each rival can impose a bane on a strike made against an adjacent rival as a free triggered action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-2',
			name: 'We Just Do It Better',
			cost: 3,
			sections: [
				'Until the end of the round, whenever any rival makes a power roll against the target of their Rivalry trait, they roll a d3 and add it to the power roll.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-3',
			name: 'Check Out Our Loot',
			cost: 5,
			sections: [
				'One rival pulls out a magic consumable and hurls it, targeting a 5 × 1 line within 1 square of them or a 3 cube within 10 squares of them. Each enemy in the area makes an Agility test. The rival chooses a damage type and a condition for the outcome of the test from one of the following pairs: sonic damage and dazed, poison damange and weakened, or fire damage and frightened.',
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Agility,
					tier1: '11 damage; the condition affects the target (save ends)',
					tier2: '8 damage; the condition affects the target (EoT)',
					tier3: '5 damage'
				})
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-4',
			name: 'Calling the Shots',
			cost: 7,
			sections: [
				'Each rival regains 10 Stamina. Until the end of the round, whenever a rival uses an ability against an enemy, each other rival adjacent to that enemy can make a free strike against them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-3rd-malice-5',
			name: 'Coordinated Takedown',
			cost: 10,
			sections: [
				'Each rival moves up to their speed and uses a main action or maneuver that doesn’t cost Malice.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'rival-3rd-1',
			name: 'Rival Conduit',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 200,
			stability: 1,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(3, 0, 1, 4, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-1-feature-1',
						name: 'Celestial Furor',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(1),
							FactoryLogic.distance.createRanged(10)
						],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 holy damage; vertical slide 2',
								tier2: '17 holy damage; vertical slide 3',
								tier3: '21 holy damage; vertical slide 4'
							})),
							FactoryLogic.createAbilitySectionText('The conduit or one ally within distance regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-1-feature-2',
						name: 'Imbue with Power',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and five allies',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target has a double-edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-1-feature-3',
					name: 'Unwavering Defender',
					description: 'Damage dealt to any ally adjacent to the conduit is halved.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-1-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the conduit chooses one creature within their line of effect. Both the conduit and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-2',
			name: 'Rival Elementalist',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 180,
			stability: 1,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 4, 3, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-2-feature-1',
						name: 'Verdant Rains',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; slide 2; M < 2 4 acid damage',
								tier2: '17 damage; slide 3; M < 3 6 acid damage',
								tier3: '21 damage; slide 4; M < 4 8 acid damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-2-feature-2',
						name: 'The Chasm Engulfs',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, value2: 10 }) ],
						target: 'Each enemy in the area',
						cost: 4,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage',
								tier2: '10 damage; restrained (EoT)',
								tier3: '14 damage; restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies until the end of the encounter. Any enemy in the area has acid weakness 5.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-2-feature-3',
						name: 'Maw of the Abyss',
						type: FactoryLogic.type.createTrigger('The elementalist takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The elementalist can teleport up to 4 squares. Each creature adjacent to the space they leave takes 4 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-2-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the elementalist chooses one creature within their line of effect. Both the elementalist and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-3',
			name: 'Rival Fury',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 220,
			stability: 3,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 0, 1, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-3-feature-1',
						name: 'Bonebreaker',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 damage; push 3',
								tier2: '18 damage; push 4',
								tier3: '22 damage; push 5'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 4,
								effect: 'Each target who has <code>M < 3</code> is bleeding and slowed (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-3-feature-2',
						name: 'Steelfist',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '15 damage; M < 3 grabbed',
								tier2: '21 damage; M < 4 grabbed',
								tier3: '26 damage; M < 5 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The target must be the fury’s size or smaller. While the target is grabbed this way, the fury and their allies have a double edge on strikes against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-3-feature-3',
					name: 'Route',
					description: 'Once per turn, when the fury force moves a creature or object, or shifts adjacent to a creature or object, they can use a signature ability that gains an edge against that creature or object.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-3-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the fury chooses one creature within their line of effect. Both the fury and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-4',
			name: 'Rival Null',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 200,
			stability: 3,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(2, 4, 3, 4, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-4-feature-1',
						name: 'Inertial Flow',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; the null shifts up to 3 squares; A < 2 6 damage',
								tier2: '17 damage; the null shifts up to 4 squares; A < 3 11 damage',
								tier3: '21 damage; the null shifts up to 5 squares; A < 4 11 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-4-feature-2',
						name: 'Stun',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; R < 2 dazed (save ends)',
								tier2: '17 damage; R < 3 dazed (save ends)',
								tier3: '21 damage; R < 4 dazed and restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-4-feature-3',
					name: 'Force Dampener',
					description: 'The first time each round that the null is targeted by a strike, it takes a bane and the null halves any damage from it.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-4-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the null chooses one creature within their line of effect. Both the null and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-5',
			name: 'Rival Shadow',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 200,
			stability: 1,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(0, 4, 2, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-5-feature-1',
						name: 'Assail and Serrate',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 damage; A < 2 bleeding (save ends)',
								tier2: '18 damage; A < 3 bleeding (save ends)',
								tier3: '22 damage; A < 4 bleeding and weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The shadow can teleport up to 7 squares, then can attempt to hide.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-5-feature-2',
						name: 'Poison the Blade',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The shadow coats their weapon with poison. They have a double edge on their next strike, and any potency for that strike increases by 2.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-5-feature-3',
					name: 'Exploit Weakness',
					description: 'The shadow deals an extra 9 damage to any target affected by a condition.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-5-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the shadow chooses one creature within their line of effect. Both the shadow and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-6',
			name: 'Rival Tactician',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(4, 1, 3, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-6-feature-1',
						name: 'Command From the Back',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 damage',
								tier2: '18 damage; A < 3 prone',
								tier3: '22 damage; A < 4 prone '
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 4,
								effect: 'Two allies within distance move up to their speed and can use a signature ability.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-6-feature-2',
						name: 'Safeguard',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '15 damage; M < 2 weakened (save ends)',
								tier2: '21 damage; M < 3 weakened (save ends)',
								tier3: '26 damage; M < 4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Two allies adjacent to the target each regain 7 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-6-feature-3',
						name: 'Quickshot',
						type: FactoryLogic.type.createTrigger('An enemy within distance willingly moves'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('At any point during the movement, the tactician uses a signature ability against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-6-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the tactician chooses one creature within their line of effect. Both the tactician and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-3rd-7',
			name: 'Rival Talent',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 180,
			stability: 2,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 4, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-7-feature-1',
						name: 'Control Synapses',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 psychic damage',
								tier2: '17 psychic damage',
								tier3: '21 psychic damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'Each target shifts up to their speed and can make a free strike against one enemy of the talent’s choice. The target can’t be moved in a way that would harm them.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-7-feature-2',
						name: 'Disorientate',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '8 psychic damage; R < 1 dazed (save ends)',
								tier2: '8 psychic damage; R < 2 dazed and slowed (save ends)',
								tier3: '8 psychic damage; R < 3 dazed and slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-3rd-7-feature-3',
						name: 'Mind Requital',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the talent.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('The talent halves the damage and shifts up to 2 squares. The triggering creature takes psychic damage equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-3rd-7-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the talent chooses one creature within their line of effect. Both the talent and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		})
	],
	addOns: [
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-1',
			name: 'Devil',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Prehensile Tail:** The rival can't be flanked.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-2',
			name: 'Draconian (for the dragon knight)',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Wings:** The rival can fly. While flying, their stability is 0.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-3',
			name: 'Dwarf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Great Fortitude:** The rival can’t be made weakened.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-4',
			name: 'High Elf / Wode Elf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Otherworldly Grace:** At the start of each of their turns, the rival can choose one effect on them that can be ended by a saving throw. That effect instead ends at the end of their turn.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-5',
			name: 'Hakaan',
			description: `
- **Size Adjustment:** 1L
- **Stability Adjustment:** +2,
- **Forceful:** When the rival force moves a creature or object, they can force move them an additional 2 squares.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-6',
			name: 'Human',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Determination:** As a maneuver, the rival can end the frightened, slowed, or weakened condition on themself.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-7',
			name: 'Memonek',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** -1 (minimum 0),
- **Nonstop:** The rival can’t be made slowed.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-8',
			name: 'Orc',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Glowing Recovery:** Once per round, the rival can use a maneuver to regain Stamina equal to 5 times their level.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-9',
			name: 'Polder',
			description: `
- **Size Adjustment:** 1S
- **Stability Adjustment:** 0,
- **Nimblestep:** The rival ignores difficult terrain and can move at full speed while sneaking.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-10',
			name: 'Revenant',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Vengeance Mark:** The rival places a magic sigil on an enemy within 10 squares of them. The rival always knows the direction to that enemy while the sigil is active on them. As a main action, the rival can detonate the sigil, dealing damage to the target equal to the rival’s free strike and sliding the target up to 2 squares.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-11',
			name: 'Time Raider',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Four-Armed Martial Arts:** Whenever the rival uses the Grab or Knockback maneuver, they can target one additional creature.`,
			category: FeatureAddOnType.Ancestry,
			cost: 0
		})
	]
};
