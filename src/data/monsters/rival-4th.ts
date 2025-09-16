import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureAddOnType } from '../../enums/feature-addon-type';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const rival4th: MonsterGroup = {
	id: 'monster-group-rival-4th',
	name: 'Rival - 4th Echelon',
	description: 'This is what peak performance looks like. Few bands of monsters can put up a fight with the heroes like the rivals can. Even if they somehow lose, the rivals will always find a way back to the heroes for a rematch.',
	picture: null,
	information: [
		{
			id: 'rival-4th-info-1',
			name: 'Rivals',
			description: `They take the jobs you were eyeing on the local town’s job board. They sit at your favorite table in the tavern with the best drinks, food, and entertainment. You know their names, and they know yours. They’re rivals—heroes just like you. Maybe even better.

Rivals are NPCs built around the mechanics of seven of the classes in Draw Steel: Heroes—the conduit, elementalist, fury, null, shadow, tactician, and talent (see Chapter 5: Classes in that book). Their stat blocks are streamlined and modular, meant to be easy to adjust on the fly with ancestral traits or signature abilities. Examples of each type of rival are presented at every tier, capturing their foray into renown as they inevitably cross, clash with, and impede the player characters’ own heroic journey.`
		},
		{
			id: 'rival-4th-info-2',
			name: 'Using Rivals in a Campaign',
			description: 'These grab-and-go adaptations of classes are meant to capture a class’s fantasy without making Directors run a full hero character sheet. They also seamlessly work together, allowing Directors to build a party of NPC heroes or villains who can be rivals, enemies, or even allies. The next time the heroes need a bit of competition or need to quickly visit a local tavern, temple, or guild hall in search of capable adventurers to help with a quest, you won’t be fumbling for a stat block. That’s what rivals are for.'
		},
		{
			id: 'rival-4th-info-3',
			name: 'Rival Ancestries',
			description: 'You can adjust any rival stat block to more closely model a player character of a specific ancestry. Choose an ancestry from the Rival Ancestries table, then modify the stat block by adding the keyword, adjusting the size, adding the stability adjustment value, and giving them the ancestral trait.'
		},
		{
			id: 'rival-4th-info-4',
			name: 'Rival Abilities',
			description: 'Any rival can replace their signature ability with a signature ability a hero has access to. The fury, shadow, and tactician can select a signature ability from any kit (see Chapter 6: Kits in Draw Steel: Heroes), and other rivals can select a signature ability from their respective class. If you replace a rival’s signature ability, the replacement ability deals extra damage equal to the rival’s level and targets two creatures or objects if the original ability targets only one.'
		},
		{
			id: 'rival-4th-info-5',
			name: 'Rival Languagues',
			description: 'Most rivals speak Caelian and two other languages.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'rival-4th-malice-1',
			name: 'Work as One',
			cost: 3,
			sections: [
				'Until the end of the round, each rival can impose a bane on a strike made against an adjacent rival as a free triggered action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-4th-malice-2',
			name: 'We Just Do It Better',
			cost: 3,
			sections: [
				'Until the end of the round, whenever any rival makes a power roll against the target of their Rivalry trait, they roll a d3 and add it to the power roll.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-4th-malice-3',
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
			id: 'rival-4th-malice-4',
			name: 'Calling the Shots',
			cost: 7,
			sections: [
				'Each rival regains 10 Stamina. Until the end of the round, whenever a rival uses an ability against an enemy, each other rival adjacent to that enemy can make a free strike against them.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'rival-4th-malice-5',
			name: 'Coordinated Takedown',
			cost: 10,
			sections: [
				'Each rival moves up to their speed and uses a main action or maneuver that doesn’t cost Malice.'
			]
		})
	],
	monsters: [
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
			characteristics: MonsterLogic.createCharacteristics(4, 1, 1, 5, 3),
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
			characteristics: MonsterLogic.createCharacteristics(1, 3, 5, 4, 1),
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
			characteristics: MonsterLogic.createCharacteristics(5, 4, 0, 2, 3),
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
			characteristics: MonsterLogic.createCharacteristics(3, 5, 4, 5, 0),
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
			characteristics: MonsterLogic.createCharacteristics(0, 5, 3, 2, 4),
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
			characteristics: MonsterLogic.createCharacteristics(5, 2, 4, 0, 3),
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
			characteristics: MonsterLogic.createCharacteristics(0, 0, 5, 0, 1),
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
