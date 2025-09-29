import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { StatBlockIcon } from '../../enums/stat-block-icon';

export const rival: MonsterGroup = {
	id: 'monster-group-rival',
	name: 'Rival',
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
			icon: StatBlockIcon.Trait,
			sections: [
				'Until the end of the round, each rival can impose a bane on a strike made against an adjacent rival as a free triggered action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-2',
			name: 'We Just Do It Better',
			cost: 3,
			icon: StatBlockIcon.Trait,
			sections: [
				'Until the end of the round, whenever any rival makes a power roll against the target of their Rivalry trait, they roll a d3 and add it to the power roll.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-3',
			name: 'Check Out Our Loot',
			cost: 5,
			icon: StatBlockIcon.Area,
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
			icon: StatBlockIcon.Trait,
			sections: [
				'Each rival regains 10 Stamina. Until the end of the round, whenever a rival uses an ability against an enemy, each other rival adjacent to that enemy can make a free strike against them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-1st-malice-5',
			name: 'Coordinated Takedown',
			cost: 10,
			icon: StatBlockIcon.Trait,
			sections: [
				'Each rival moves up to their speed and uses a main action or maneuver that doesn’t cost Malice.'
			]
		})
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
			characteristics: FactoryLogic.createCharacteristics(1, 0, 0, 2, 0),
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
							FactoryLogic.createAbilitySectionText('The conduit or one ally within distance regains Stamina equal to half the damage dealt.')
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
							FactoryLogic.createAbilitySectionText('Each target gains an edge on their next strike.')
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
			characteristics: FactoryLogic.createCharacteristics(1, 0, 0, 2, 0),
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
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies until the end of the encounter. Any enemy in the area has acid weakness 2.')
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
							FactoryLogic.createAbilitySectionText('The elementalist can teleport up to 2 squares. Each creature adjacent to the space they leave takes 2 corruption damage.')
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
			characteristics: FactoryLogic.createCharacteristics(2, 1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-1st-3-feature-1',
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
						id: 'rival-1st-3-feature-2',
						name: 'Let’s Tussle',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 2,
								tier1: '8 damage; M < 0 grabbed',
								tier2: '13 damage; M < 1 grabbed',
								tier3: '16 damage; M < 2 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The target must be the fury’s size or smaller. While the target is grabbed this way, the fury gains an edge on strikes against them.')
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
			characteristics: FactoryLogic.createCharacteristics(0, 2, 1, 2, 0),
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
								tier3: '13 damage; R < 2 dazed and slowed (EoT)'
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
			characteristics: FactoryLogic.createCharacteristics(0, 2, 0, 0, 1),
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
							FactoryLogic.createAbilitySectionText('The shadow coats their weapon with poison. They gain an edge on their next strike, and any potency for that strike increases by 1.')
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
			characteristics: FactoryLogic.createCharacteristics(2, 0, 1, 0, 0),
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
							FactoryLogic.createAbilitySectionText('One ally adjacent to the target regains 5 Stamina.')
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
							FactoryLogic.createAbilitySectionText('At any point during the movement, the tactician makes a free strike against the target.')
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
			characteristics: FactoryLogic.createCharacteristics(0, 0, 2, 0, 1),
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
							FactoryLogic.createAbilitySectionText('The talent halves the damage and shifts up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-1st-7-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the talent chooses one creature within their line of effect. Both the talent and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-1',
			name: 'Rival Conduit',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 140,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(2, 0, 0, 3, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-1-feature-1',
						name: 'Raging Tempest',
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
								bonus: 3,
								tier1: '9 holy damage; vertical slide 1',
								tier2: '14 holy damage; vertical slide 2',
								tier3: '17 holy damage; vertical slide 3'
							})),
							FactoryLogic.createAbilitySectionText('The conduit or one ally within distance regains Stamina equal to half the damage dealt.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-1-feature-2',
						name: 'Imbue with Might',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and five allies',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target gains an edge on their next strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-1-feature-3',
					name: 'Stalwart Guardian',
					description: 'Strikes made against allies adjacent to the conduit take a bane.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-1-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the conduit chooses one creature within their line of effect. Both the conduit and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-2',
			name: 'Rival Elementalist',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 1,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(0, 2, 3, 2, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-2-feature-1',
						name: 'The Thriving Wilds',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; slide 1; M < 1 3 acid damage',
								tier2: '14 damage; slide 2; M < 2 5 acid damage',
								tier3: '17 damage; slide 3; M < 3 7 acid damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-2-feature-2',
						name: 'The Depths Hunger',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 10 }) ],
						target: 'Each enemy in the area',
						cost: 4,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '5 damage',
								tier2: '9 damage; restrained (EoT)',
								tier3: '11 damage; restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain for enemies until the end of the encounter. Any enemy in the area has acid weakness 3.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-2-feature-3',
						name: 'Fissures of Darkness',
						type: FactoryLogic.type.createTrigger('The elementalist takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The elementalist can teleport up to 3 squares. Each creature adjacent to the space they leave takes 3 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-2-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the elementalist chooses one creature within their line of effect. Both the elementalist and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-3',
			name: 'Rival Fury',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 160,
			stability: 3,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(3, 2, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-3-feature-1',
						name: 'Thunderous Slam',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage; push 2',
								tier2: '15 damage; push 3',
								tier3: '18 damage; push 4'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Each target who has <code>M < 2</code> is slowed (save ends).'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-3-feature-2',
						name: 'Roughed Up',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '11 damage; M < 1 grabbed',
								tier2: '16 damage; M < 2 grabbed',
								tier3: '21 damage; M < 3 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('Effect: The target must be the fury’s size or smaller. While the target is grabbed this way, the fury and their allies gain an edge on strikes against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-3-feature-3',
					name: 'Overwhelm',
					description: 'Once per turn, when the fury force moves a creature or object, or shifts adjacent to a creature or object, they can use a signature ability against that creature or object.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-3-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the fury chooses one creature within their line of effect. Both the fury and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-4',
			name: 'Rival Null',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 140,
			stability: 3,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(0, 3, 2, 3, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-4-feature-1',
						name: 'Agile Stride',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; the null shifts up to 3 squares; A < 1 6 damage',
								tier2: '14 damage; the null shifts up to 4 squares; A < 2 11 damage',
								tier3: '17 damage; the null shifts up to 5 squares; A < 3 11 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-4-feature-2',
						name: 'Deaden',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 damage; R < 1 dazed (EoT)',
								tier2: '14 damage; R < 2 dazed (save ends)',
								tier3: '17 damage; R < 3 dazed and restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-4-feature-3',
					name: 'Inertial Shield',
					description: 'The first time each round that the null is targeted by a damage-dealing strike, they halve the damage.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-4-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the null chooses one creature within their line of effect. Both the null and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-5',
			name: 'Rival Shadow',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 140,
			stability: 1,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(0, 3, 1, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-5-feature-1',
						name: 'Ambuscade',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '15 damage; A < 2 bleeding (save ends)',
								tier3: '18 damage; A < 3 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The shadow can teleport up to 6 squares, then can attempt to hide.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-5-feature-2',
						name: 'Poison the Blade',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The shadow coats their weapon with poison. They gain an edge on their next strike, and any potency for that strike increases by 1.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-5-feature-3',
					name: 'Exploit Opening',
					description: 'The shadow deals an extra 7 damage to any bleeding target.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-5-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the shadow chooses one creature within their line of effect. Both the shadow and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-6',
			name: 'Rival Tactician',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 7,
			characteristics: FactoryLogic.createCharacteristics(3, 0, 2, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-6-feature-1',
						name: 'Mark Targets',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '10 damage',
								tier2: '15 damage',
								tier3: '18 damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 3,
								effect: 'Two allies within distance can make a free strike against the same target.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-6-feature-2',
						name: 'Preserve and Protect',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '11 damage; M < 1 weakened (save ends)',
								tier2: '16 damage; M < 2 weakened (save ends)',
								tier3: '21 damage; M < 3 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('One ally adjacent to the target regains 7 Stamina.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-6-feature-3',
						name: 'Take the Opening',
						type: FactoryLogic.type.createTrigger('An enemy within distance willingly moves'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('At any point during the movement, the tactician and one ally within distance can each make a free strike against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-6-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the tactician chooses one creature within their line of effect. Both the tactician and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-2nd-7',
			name: 'Rival Talent',
			level: 5,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 28,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 120,
			stability: 2,
			freeStrikeDamage: 6,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 3, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-7-feature-1',
						name: 'Overwhelming Rend',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '9 psychic damage; push 2; M < 1 prone',
								tier2: '14 psychic damage; push 3; M < 2 prone',
								tier3: '17 psychic damage; push 4; M < 3 prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-7-feature-2',
						name: 'Disarrange Thoughts',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 3,
								tier1: '6 psychic damage; R < 1 dazed (save ends)',
								tier2: '6 psychic damage; R < 2 dazed (save ends)',
								tier3: '6 psychic damage; R < 3 dazed and slowed (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-2nd-7-feature-3',
						name: 'Precognitive Shift',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the talent.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('The talent halves the damage and shifts up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-2nd-7-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the talent chooses one creature within their line of effect. Both the talent and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
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
			characteristics: FactoryLogic.createCharacteristics(3, 0, 1, 4, 2),
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
			characteristics: FactoryLogic.createCharacteristics(0, 2, 4, 3, 0),
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
			characteristics: FactoryLogic.createCharacteristics(4, 3, 0, 1, 2),
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
			characteristics: FactoryLogic.createCharacteristics(2, 4, 3, 4, 0),
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
			characteristics: FactoryLogic.createCharacteristics(0, 4, 2, 0, 3),
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
			characteristics: FactoryLogic.createCharacteristics(4, 1, 3, 0, 2),
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
			characteristics: FactoryLogic.createCharacteristics(0, 0, 4, 0, 1),
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
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-1',
			name: 'Rival Conduit',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 240,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(4, 1, 1, 5, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-1-feature-1',
						name: 'Sunder the Very Skies',
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
								bonus: 5,
								tier1: '15 damage; vertical slide 3; M < 3 5 lightning damage',
								tier2: '20 damage; vertical slide 4; M < 4 7 lightning damage',
								tier3: '24 damage; vertical slide 5; M < 5 9 lightning damage'
							})),
							FactoryLogic.createAbilitySectionText('The conduit or one ally within distance regains Stamina equal to half the damage dealt.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 2,
								effect: 'Two additional allies within distance regain the same amount of Stamina.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-1-feature-2',
						name: 'Empyrean Boon',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self and five allies',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target has a double edge on their next strike, and that strike deals an extra 10 holy damage. Additionally, they can vertical slide each creature targeted by the strike up to 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-1-feature-3',
					name: 'Unwavering Defender',
					description: 'Damage dealt to any ally adjacent to the conduit is halved.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-1-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the conduit chooses one creature within their line of effect. Both the conduit and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-2',
			name: 'Rival Elementalist',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 220,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(1, 3, 5, 4, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-2-feature-1',
						name: 'Viridescent Storm',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; slide 3; M < 3 5 acid damage',
								tier2: '20 damage; slide 4; M < 4 7 acid damage',
								tier3: '24 damage; slide 5; M < 5 9 acid damage'
							})),
							FactoryLogic.createAbilitySectionText('One ally within distance ends all conditions on themself.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-2-feature-2',
						name: 'The World Consumes',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 10 }) ],
						target: 'Each enemy in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('The area becomes overgrown with caustic vines until the end of the encounter. While in the area, any enemy has acid weakness 5 and is slowed. Any enemy who ends their turn in the area and has <code>M < 4</code> is restrained (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-2-feature-3',
						name: 'Breach of Nihility',
						type: FactoryLogic.type.createTrigger('The elementalist takes damage.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Void ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The elementalist can teleport up to 5 squares. Each creature adjacent to the space they leave or appear in takes 5 corruption damage.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-2-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the elementalist chooses one creature within their line of effect. Both the elementalist and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-3',
			name: 'Rival Fury',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(5, 4, 0, 2, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-3-feature-1',
						name: 'Seismic Crush',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; push 3',
								tier2: '21 damage; push 4',
								tier3: '25 damage; push 5'
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
						id: 'rival-4th-3-feature-2',
						name: 'Death Grip',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One creature',
						cost: 4,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; M < 3 grabbed',
								tier2: '21 damage; M < 4 grabbed',
								tier3: '25 damage; M < 5 grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The target must be the fury’s size or smaller. While the target is grabbed this way, the fury and their allies have a double edge on strikes against them.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-3-feature-3',
					name: 'Devastate',
					description: 'Once per turn, when the fury force moves a creature or object, or shifts adjacent to a creature or object, they can use a signature ability against that creature or object that has a double edge.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-3-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the fury chooses one creature within their line of effect. Both the fury and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-4',
			name: 'Rival Null',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 240,
			stability: 3,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(3, 5, 4, 5, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-4-feature-1',
						name: 'Kinetic Danse',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; the null shifts up to 4 squares; A < 3 10 damage',
								tier2: '20 damage; the null shifts up to 5 squares; A < 4 15 damage',
								tier3: '224 damage; the null shifts up to 6 squares; A < 5 19 damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-4-feature-2',
						name: 'Incapacitate',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '13 damage; R < 3 dazed and restrained (save ends)',
								tier2: '17 damage; R < 4 dazed and restrained (save ends)',
								tier3: '20 damage; R < 5 dazed and restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-4-feature-3',
					name: 'Energy Conservation',
					description: 'The first time each round that the null is targeted by a strike, it takes a bane and the null halves the damage from it. The creature making the strike takes 10 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-4-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the null chooses one creature within their line of effect. Both the null and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-5',
			name: 'Rival Shadow',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Ambusher),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(7),
			stamina: 240,
			stability: 1,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(0, 5, 3, 2, 4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-5-feature-1',
						name: 'A Hush of Ash',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage; A < 3 bleeding (save ends)',
								tier2: '21 damage; A < 4 bleeding (save ends)',
								tier3: '25 damage; A < 5 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 1,
								effect: 'The shadow can teleport up to 10 squares, then can attempt to hide.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-5-feature-2',
						name: 'Envenomed Steel',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The shadow coats their weapon with poison. They have a double edge on their next strike, any potency for that strike increases by 2, and if the target has m<4], they are weakened (save ends).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-5-feature-3',
					name: 'Exploit Weakness',
					description: 'The shadow deals an extra 10 damage to any target affected by a condition.'
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-5-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the shadow chooses one creature within their line of effect. Both the shadow and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-6',
			name: 'Rival Tactician',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 220,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(5, 2, 4, 0, 3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-6-feature-1',
						name: 'Forward Assault',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 damage',
								tier2: '21 damage; A < 3 prone and can’t stand (EoT)',
								tier3: '25 damage; prone; A < 5 can’t stand (EoT)'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 5,
								effect: 'Two allies within distance move up to their speed and can use a signature ability that has a double edge.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-6-feature-2',
						name: 'Guardian From Afar',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 10 }) ],
						target: 'One creature in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '10 damage; M < 3 weakened (save ends)',
								tier2: '16 damage; M < 4 weakened (save ends)',
								tier3: '20 damage; M < 5 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Each ally in the area regains 10 Stamina')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-6-feature-3',
						name: 'Battlefield Control',
						type: FactoryLogic.type.createTrigger('An enemy within distance willingly moves'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('At any point during the movement, the tactician and one ally within distance can use a signature ability against the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-6-feature-4',
					name: 'Rivalry',
					description: 'At the start of an encounter, the tactician chooses one creature within their line of effect. Both the tactician and the creature can add a d3 roll to power rolls they make against each other.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'rival-4th-7',
			name: 'Rival Talent',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Humanoid', 'Rival' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(1, 'M'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 220,
			stability: 2,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(0, 0, 5, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-7-feature-1',
						name: 'Override',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						cost: 'signature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '15 psychic damage',
								tier2: '20 psychic damage',
								tier3: '24 psychic damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Malice',
								value: 4,
								effect: 'Each target moves up to their speed and can make a free strike against one enemy of the talent’s choice. The target’s movement can provoke opportunity attacks, but they can’t otherwise be moved in a way that would harm them.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-7-feature-2',
						name: 'Steal Time',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: 'R < 3 slowed (save ends)',
								tier2: 'R < 4 restrained (save ends)',
								tier3: 'R < 5 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('One ally within distance can use an additional main action on their next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'rival-4th-7-feature-3',
						name: 'Psionic Retribution',
						type: FactoryLogic.type.createTrigger('A creature deals damage to the talent.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 2,
						sections: [
							FactoryLogic.createAbilitySectionText('The talent halves the damage and shifts up to 2 squares. The triggering creature takes psychic damage equal to half the damage dealt and is pushed up to 5 squares.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'rival-4th-7-feature-4',
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
