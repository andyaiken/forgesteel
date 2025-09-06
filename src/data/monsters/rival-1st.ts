import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterGroup } from '../../models/monster-group';

export const rival1st: MonsterGroup = {
	id: 'monster-group-rival-1st',
	name: 'Rival - 1st Echelon',
	description: 'It’s possible that these rivals gained a head start on their adventures and will pose a significant challenge to the heroes if they weren’t expecting them.',
	picture: null,
	information: [
		{
			id: 'rival-1st-info-1',
			name: 'Rivals',
			description: `They take the jobs you were eyeing on the local town’s job board. They sit at your favorite table in the tavern with the best drinks, food, and entertainment. You know their names, and they know yours. They’re rivals—heroes just like you. Maybe even better.

Rivals are NPCs built around the mechanics of seven of the classes in Draw Steel: Heroes—the conduit, elementalist, fury, null, shadow, tactician, and talent (see Chapter 5: Classes in that book). Their stat blocks are streamlined and modular, meant to be easy to adjust on the fly with ancestral traits or signature abilities. Examples of each type of rival are presented at every tier, capturing their foray into renown as they inevitably cross, clash with, and impede the player characters’ own heroic journey.`
		},
		{
			id: 'rival-1st-info-2',
			name: 'Using Rivals in a Campaign',
			description: 'These grab-and-go adaptations of classes are meant to capture a class’s fantasy without making Directors run a full hero character sheet. They also seamlessly work together, allowing Directors to build a party of NPC heroes or villains who can be rivals, enemies, or even allies. The next time the heroes need a bit of competition or need to quickly visit a local tavern, temple, or guild hall in search of capable adventurers to help with a quest, you won’t be fumbling for a stat block. That’s what rivals are for.'
		},
		{
			id: 'rival-1st-info-3',
			name: 'Rival Ancestries',
			description: 'You can adjust any rival stat block to more closely model a player character of a specific ancestry. Choose an ancestry from the Rival Ancestries table, then modify the stat block by adding the keyword, adjusting the size, adding the stability adjustment value, and giving them the ancestral trait.'
		},
		{
			id: 'rival-1st-info-4',
			name: 'Rival Abilities',
			description: 'Any rival can replace their signature ability with a signature ability a hero has access to. The fury, shadow, and tactician can select a signature ability from any kit (see Chapter 6: Kits in Draw Steel: Heroes), and other rivals can select a signature ability from their respective class. If you replace a rival’s signature ability, the replacement ability deals extra damage equal to the rival’s level and targets two creatures or objects if the original ability targets only one.'
		},
		{
			id: 'rival-1st-info-5',
			name: 'Rival Languagues',
			description: 'Most rivals speak Caelian and two other languages.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-1',
			name: 'Work as One',
			cost: 3,
			sections: [
				'Until the end of the round, each rival can impose a bane on a strike made against an adjacent rival as a free triggered action.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-2',
			name: 'We Just Do It Better',
			cost: 3,
			sections: [
				'Until the end of the round, whenever any rival makes a power roll against the target of their Rivalry trait, they roll a d3 and add it to the power roll.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-3',
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
			id: 'rival-1st-malice-4',
			name: 'Calling the Shots',
			cost: 7,
			sections: [
				'Each rival regains 10 Stamina. Until the end of the round, whenever a rival uses an ability against an enemy, each other rival adjacent to that enemy can make a free strike against them.',
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-5',
			name: 'Coordinated Takedown',
			cost: 10,
			sections: [
				'Each rival moves up to their speed and uses a main action or maneuver that doesn’t cost Malice.',
			]
		}),
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'rival-1st-1',
			name: 'Rival Conduit',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-1-feature-1',
						name: 'Thunder of Heavens',
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
								bonus: 2,
								tier1: '7 holy damage',
								tier2: '10 holy damage',
								tier3: '13 holy damage'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The conduit or one ally within distance regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-1-feature-2',
						name: 'Imbue with Might',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and five allies',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** Each target gains an edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-1-feature-3',
					name: 'Stalwart Guardian',
					description: 'Strikes made against allies adjacent to the conduit take a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-1-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the conduit chooses one creature within their line of effect. Both the conduit and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-2',
			name: 'Rival Elementalist',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 0, 0, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-2-feature-1',
						name: 'The Writhing Green',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; slide 1',
								tier2: '10 damage; slide 2',
								tier3: '13 damage; slide 3'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-2-feature-2',
						name: 'The Earth Devours',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 10 }) ],
						target: 'Each enemy in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '3 damage; slide 1',
								tier2: '5 damage; restrained (EoT)',
								tier3: '8 damage; restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The area is difficult terrain for enemies until the end of the encounter. Any enemy in the area has acid weakness 2.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-2-feature-3',
						name: 'Jaws of the Void',
						type: FactoryLogic.type.createTrigger('The elementalist takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The elementalist can teleport up to 2 squares. Each creature adjacent to the space they leave takes 2 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-2-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the elementalist chooses one creature within their line of effect. Both the elementalist and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-3',
			name: 'Rival Fury',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 100,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-2-feature-1',
						name: 'Brutal Impact',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; push 1',
								tier2: '10 damage; push 2',
								tier3: '13 damage; push 3'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Each target who has <code>M < 1</code> is slowed (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-2-feature-2',
						name: 'Let’s Tussle',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage; m < 0 grabbed',
								tier2: '13 damage; m < 1 grabbed',
								tier3: '16 damage; m < 2 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** The target must be the fury’s size or smaller. While the target is grabbed this way, the fury gains an edge on strikes against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-3-feature-3',
					name: 'Overwhelm',
					description: 'Once per turn, when the fury force moves a creature or object, or shifts adjacent to a creature or object, they can make a free strike against that creature or object.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-3-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the fury chooses one creature within their line of effect. Both the fury and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-4',
			name: 'Rival Null',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 80,
			stability: 3,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 1, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-4-feature-1',
						name: 'Nimble Step',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; the null shifts up to 2 squares',
								tier2: '10 damage; the null shifts up to 3 squares',
								tier3: '13 damage; the null shifts up to 4 squares'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-4-feature-2',
						name: 'Numb',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage; R < 0 slowed (EoT)',
								tier2: '10 damage; R < 1 slowed (EoT)',
								tier3: '13 damage; R < 2] dazed and slowed (EoT)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-4-feature-3',
					name: 'Inertial Shield',
					description: 'The first time each round that the null is targeted by a damage-dealing strike, they halve the damage.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-4-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the null chooses one creature within their line of effect. Both the null and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-5',
			name: 'Rival Shadow',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-5-feature-1',
						name: 'Swift Serration',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '11 damage',
								tier3: '14 damage; A < 2 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The shadow can teleport up to 5 squares, then can attempt to hide.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-5-feature-2',
						name: 'Poison the Blade',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The shadow coats their weapon with poison. They gain an edge on their next strike, and any potency for that strike increases by 1.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-5-feature-3',
					name: 'Exploit Opening',
					description: 'The shadow deals an extra 5 damage to any bleeding target.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-5-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the shadow chooses one creature within their line of effect. Both the shadow and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-6',
			name: 'Rival Tactician',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(2, 0, 1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-6-feature-1',
						name: 'Dual Targeting Shot',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 damage',
								tier2: '10 damage',
								tier3: '13 damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Two allies within distance can make a free strike against one of the targets.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-6-feature-2',
						name: 'I’ll Cover You!',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage; M < 0 weakened (save ends)',
								tier2: '13 damage; M < 1 weakened (save ends)',
								tier3: '16 damage; M < 2 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('**Effect:** One ally adjacent to the target regains 5 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-6-feature-3',
						name: 'Overwatch',
						type: FactoryLogic.type.createTrigger('An enemy within distance willingly moves'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** At any point during the movement, the tactician makes a free strike against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-6-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the tactician chooses one creature within their line of effect. Both the tactician and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-1st-7',
			name: 'Rival Talent',
			level: 2,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 16,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 60,
			stability: 2,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 2, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-7-feature-1',
						name: 'Reverberating Blast',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '7 psychic damage; M < 0 prone',
								tier2: '10 psychic damage; push 2; M < 1 prone',
								tier3: '13 psychic damage; push 3; M < 2 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-7-feature-2',
						name: 'Muddle the Mind',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: 'R < 0 slowed (save ends)',
								tier2: 'R < 1 dazed (save ends)',
								tier3: 'R < 2 dazed and slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-7-feature-3',
						name: 'Precognitive Shift',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the talent.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('**Effect:** The talent halves the damage and shifts up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-7-feature-4',
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
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-2',
			name: 'Draconian (for the dragon knight)',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Wings:** The rival can fly. While flying, their stability is 0.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-3',
			name: 'Dwarf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Great Fortitude:** The rival can’t be made weakened.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-4',
			name: 'High Elf / Wode Elf',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Otherworldly Grace:** At the start of each of their turns, the rival can choose one effect on them that can be ended by a saving throw. That effect instead ends at the end of their turn.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-5',
			name: 'Hakaan',
			description: `
- **Size Adjustment:** 1L
- **Stability Adjustment:** +2,
- **Forceful:** When the rival force moves a creature or object, they can force move them an additional 2 squares.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-6',
			name: 'Human',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Determination:** As a maneuver, the rival can end the frightened, slowed, or weakened condition on themself.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-7',
			name: 'Memonek',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** -1 (minimum 0),
- **Nonstop:** The rival can’t be made slowed.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-8',
			name: 'Orc',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +2,
- **Glowing Recovery:** Once per round, the rival can use a maneuver to regain Stamina equal to 5 times their level.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-9',
			name: 'Polder',
			description: `
- **Size Adjustment:** 1S
- **Stability Adjustment:** 0,
- **Nimblestep:** The rival ignores difficult terrain and can move at full speed while sneaking.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-10',
			name: 'Revenant',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** +1,
- **Vengeance Mark:** The rival places a magic sigil on an enemy within 10 squares of them. The rival always knows the direction to that enemy while the sigil is active on them. As a main action, the rival can detonate the sigil, dealing damage to the target equal to the rival’s free strike and sliding the target up to 2 squares.`,
			category: FeatureAddOnType.Ancestry,
		}),
		FactoryLogic.feature.createAddOn({
			id: 'ancestry-11',
			name: 'Time Raider',
			description: `
- **Size Adjustment:** 1M
- **Stability Adjustment:** 0,
- **Four-Armed Martial Arts:** Whenever the rival uses the Grab or Knockback maneuver, they can target one additional creature.`,
			category: FeatureAddOnType.Ancestry,
		})
	]
};
