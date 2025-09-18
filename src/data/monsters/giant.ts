import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster-group';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const giant: MonsterGroup = {
	id: 'monster-group-giant',
	name: 'Giant',
	description: `
Supremely well adapted to harsh environments, giants thrive in extreme conditions. Fire giants build floating cities in the hearts of volcanic calderas, while stone giant villages dot the tallest mountains. Most people often go their entire lives blissfully unaware of the local tribe of giants living atop the nearby mountain range. This is for the best, as few “smallfolk” structures can survive even a handful of sufficiently motivated giants.`,
	picture: null,
	information: [
		{
			id: 'giant-info-1',
			name: 'Adaptable and Elemental',
			description: `
Giants physically resemble the territory they inhabit. A band of frost giants doesn’t simply live on a glacial mountain—they’re part of that mountain, and it’s part of them. Fire giants exude heat like a roaring volcano. Sages have long debated the question, “Does the environment shape a giant, or does the giant shape their environment?”`
		},

		{
			id: 'giant-info-2',
			name: 'Distant Cousins',
			description: `
Humanoid scholars generally assume that all giants are related, though giants don’t view each other as kin by default. When different giant communities interact, the results depend heavily on the individuals involved and the relationships between their cultures. For instance, stone giants rarely get along with hill giants, as hill giants often detest stone artisanship. Meanwhile, frost giants gladly recruit hill giants into raiding parties if they’re willing to be in the vanguard.`
		},

		{
			id: 'giant-info-3',
			name: 'Fire Giants',
			description: `
Hailing from sweltering deserts and deep caverns of roiling magma, fire giants embody the passion and ruthlessness of their namesake element. Though they have a reputation for violent growth and expansion, their lesser-known side is a deeply spiritual one, guided by introspection and understanding.

Fire giants rarely wear armor, as their bodies heat to extreme temperatures while they fight, causing leather to melt and metal to deform. They instead hone their own bodies into perfect weapons of war.`
		},

		{
			id: 'giant-info-4',
			name: 'Frost Giants',
			description: `
Born of soaring, frigid peaks, frost giants master their environments to rule mountain ranges and build fortresses of unyielding ice. When frost giants march, a blizzard grows overhead, accompanying them like a war banner. To frost giants, battle is a way of life, camaraderie, and glory.

Where frost giants make their homes, a unique form of ice sprouts into flowering crystalline structures. Frost giants harvest this ice, known as *issenblau* in their dialect, and fashion it into weapons as hard and sharp as steel, which can be used in any environment without melting.`
		},

		{
			id: 'giant-info-5',
			name: 'Hill Giants',
			description: `
Of all the giant cultures, hill giants are the most likely to interact with humanoids. Hill giants and smallfolk both love to live in places with rolling, fertile fields, and both appreciate the beauty of nature. However, these commonalities can be quickly forgotten if evil hill giants band together to claim the land solely for themselves, or if the smallfolk let fear of the large get the best of them and attempt to drive off their bigger neighbors. Most hill giants want to be left in peace, but when one is pressed, they can demolish a smallfolk village in minutes. 

Most hill giants spend so much time in quiet peace that sudden flashy sights and loud noises can draw their attention. In battle, such distractions can draw a hill giant’s ire, making them switch from one target to another.`
		},

		{
			id: 'giant-info-6',
			name: 'Stone Giants',
			description: `
Fascinated by the act of creation, stone giants carve cities out of ancient caverns, mine precious metals and gems, and craft relics worthy of glory. To many a stone giant, artisanship is the highest calling, and all their creations are crafted with an eye to beauty and longevity.

Stone giants are made of the same kinds of rocks that form their homes—sandstone, marble, granite, and even basalt. Their stone bodies not only protect them from attack, but also provide them with an additional outlet for self-expression. They often carve runes into their skin, which serve a wide variety of artistic and cultural purposes.`
		},

		{
			id: 'giant-info-6',
			name: 'Giant Languages',
			description: 'Most giants speak their kind’s dialect of High Kuric. Many hill giants also know Caelian.'
		}
	],
	malice: [
		FactoryLogic.feature.createMaliceAbility({
			ability: FactoryLogic.createAbility({
				id: 'giant-malice-1',
				name: 'Hurl Landscape',
				type: FactoryLogic.type.createMain(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'Each enemy in the area',
				sections: [
					FactoryLogic.createAbilitySectionText('A giant unearths a structure, hazard, or chunk of the encounter map and launches it to fill the area. Each target makes an **Agility test**.'),
					FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
						tier1: '18 damage; prone and can’t stand (save ends)',
						tier2: '14 damage; prone',
						tier3: '9 damage'
					}))
				]
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'giant-malice-2',
			name: 'Bellow',
			cost: 5,
			sections: [
				'Each giant in the encounter takes a deep breath and yells, pushing each creature within 3 squares of them up to 10 squares. A creature who can be pushed by more than one giant is pushed by one giant of your choice.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'giant-malice-3',
			name: 'Titanic Tear',
			cost: 7,
			sections: [
				'A giant creates a fissure along the ground, either in a 15 × 2 line within 1 or a 10 × 3 line within 2, and that opens up to a depth of 6 squares. Each giant in the area can shift into the nearest unoccupied space outside the fissure. Each non-giant in the area makes an **Agility test**.',
				FactoryLogic.createPowerRoll({
					tier1: '10 damage; the target falls into the fissure, and is prone and can’t stand (EoT)',
					tier2: '10 damage; the target is prone and hanging onto the edge of the fissure',
					tier3: 'Target can shift into the nearest unoccupied square outside the fissure'
				})
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'giant-1',
			name: 'Fire Giant Fireballer',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Harrier),
			keywords: [ 'Fire Giant', 'Giant' ],
			encounterValue: 11,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7),
			stamina: 13,
			stability: 5,
			freeStrikeDamage: 3,
			withCaptain: '+3 bonus to speed',
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-1-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 9 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-1-feature-2',
						name: 'Blazing Leap',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '2 fire damage',
								tier2: '5 fire damage; push 1',
								tier3: '6 fire damage; push 2'
							})),
							FactoryLogic.createAbilitySectionText('The fireballer can jump up to 4 squares before using this ability.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-1-3',
					name: 'Searing Skin',
					description: 'Whenever an adjacent enemy grabs the fireballer or uses a melee ability against them, that enemy takes 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-2',
			name: 'Sand Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Stone Giant', 'Giant' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 14,
			stability: 10,
			freeStrikeDamage: 3,
			withCaptain: '+6 bonus to Stamina',
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 3, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-2-feature-1',
						name: 'Buried in Sand',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '3 damage; slide 2',
								tier2: '6 damage; slide 3; A<3 restrained (save ends)',
								tier3: '8 damage; slide 4; A<4 restrained (save ends)'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-2-2',
					name: 'Stone Steps',
					description: 'The sand stone giant ignores difficult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-2-3',
					name: 'Stonebreaker Flesh',
					description: 'Whenever an enemy obtains a tier 1 outcome on a melee ability used against the sand stone giant, they take a bane on that ability until the end of the encounter.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-2-4',
					name: 'Stone Swim',
					description: 'The sand stone giant can burrow through stone, but can’t drag other creatures underground when they do so.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-3',
			name: 'Frost Giant Snowblaster',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Frost Giant', 'Giant' ],
			encounterValue: 10,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7),
			stamina: 12,
			stability: 5,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(3, -1, -1, 4, 2),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-3-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 8 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-3-feature-2',
						name: 'Slushfall',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(12)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 cold damage',
								tier2: '7 cold damage',
								tier3: '9 cold damage; prone'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-3-3',
					name: 'Kingdom of Isolation',
					description: 'The snowblaster is surrounded by a snowstorm. Any enemy who starts their turn within 2 squares of the snowblaster can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-4',
			name: 'Hill Giant Mosstooth',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Hill Giant', 'Giant' ],
			encounterValue: 9,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 13,
			stability: 5,
			freeStrikeDamage: 4,
			withCaptain: '+3 damage bonus to strikes',
			characteristics: MonsterLogic.createCharacteristics(4, -1, -1, -1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-4-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-4-feature-2',
						name: 'Swing',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'One creature or object per minion',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '4 damage',
								tier2: '7 damage',
								tier3: '8 cold damage; grabbed'
							})),
							FactoryLogic.createAbilitySectionText('The mosstooth can use a creature or object they have grabbed as a weapon for this ability, dealing an extra 5 damage to that creature or object and the target. They then end the grab and leave the creature or object prone in an unoccupied space adjacent to the target.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-4-3',
					name: 'Distracted',
					description: 'Whenever the mosstooth targets a creature or object with an ability, any enemy within distance of the ability can use a free triggered action to distract the mosstooth. The mosstooth targets that enemy instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-5',
			name: 'Basalt Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Stone Giant', 'Giant' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 207,
			stability: 10,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-1',
						name: 'Rune Signed Blade',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage; M<2 slowed (save ends)',
								tier2: '17 damage; M<3 slowed (save ends)',
								tier3: '21 damage; M<4 slowed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If a target was already slowed, that condition continues but their speed is 0 until the end of their next turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-2',
						name: 'Forked Knife',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3),
							FactoryLogic.distance.createRanged(12)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '10 damage; A<2 restrained (save ends)',
								tier2: '16 damage; A<3 restrained (save ends)',
								tier3: '20 damage; prone; A<4 restrained (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('The knife lands in the target’s square, and has 30 Stamina and damage immunity 5. Whenever the knife takes damage, it deals 4 sonic damage to each enemy within 3 squares. The knife lasts until the end of the encounter, and can’t be picked up or manipulated.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-3',
						name: 'Cobble Stone Shape',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The basalt stone giant moves up to their speed. Each square that they leave during this move is difficult terrain for enemies. Giants ignore this difficult terrain. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-4',
						name: 'Resonate Rune',
						type: FactoryLogic.type.createTrigger('The basalt stone giant takes damage.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('The target is pushed up to 3 squares, or if they have A<3, they are pushed up to 6 squares and knocked prone.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-5-feature-5',
					name: 'Stone Steps',
					description: 'The basalt stone giant ignores difficult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-5-feature-6',
					name: 'Stonebreaker Flesh',
					description: 'Whenever an enemy obtains a tier 1 outcome on a melee ability used against the basalt stone giant, they take a bane on that ability until the end of the encounter.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-5-feature-7',
					name: 'Stone Swim',
					description: 'The basalt stone giant can burrow through stone, but can’t drag other creatures underground when they do so.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-6',
			name: 'Fire Giant Lightbearer',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Fire Giant', 'Giant' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 200,
			stability: 5,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 0, 4, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-6-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 9 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-2',
						name: 'Flamelash',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(6)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 fire damage; slide 2',
								tier2: '17 fire damage; slide 4',
								tier3: '22 fire damage; slide 6'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-3',
						name: 'Living Blaze',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(6)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '15 fire damage',
								tier2: '21 fire damage',
								tier3: '26 fire damage'
							})),
							FactoryLogic.createAbilitySectionText('The blaze ricochets, targeting one additional target within 4 squares of an original target and taking a bane against that target, or targeting two additional targets within 2 squares of an original target and having a double bane against those targets. The lightbearer makes one power roll against all targets.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-4',
						name: 'Travel By Fire',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(5)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('The lightbearer can target themself with this ability. Each target takes 1d6 fire damage and teleports in a plume of smoke to swap places with the other target. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-5',
						name: 'Emergency Beacon',
						type: FactoryLogic.type.createTrigger('The lightbearer takes damage.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The lightbearer emits a beacon of light until the start of their next turn. Each fire giant who has line of effect to the lightbearer has a double edge on abilities.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-6-feature-6',
					name: 'Healing Heat',
					description: 'Any fire giant targeted by the lightbearer’s damage-dealing abilities ignores the damage and instead regains Stamina equal to the damage that would have been dealt. If the lightbearer moves a fire giant using an ability, they can choose to ignore stability.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-6-feature-7',
					name: 'Searing Skin',
					description: ' Whenever an adjacent enemy grabs the lightbearer or uses a melee ability against them, that enemy takes 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-7',
			name: 'Fire Giant Red Fist',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Fire Giant', 'Giant' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(8),
			stamina: 240,
			stability: 5,
			freeStrikeDamage: 10,
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 2, 1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-7-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 9 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-2',
						name: 'Flaming Punch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '14 fire damage; push 2',
								tier2: '19 fire damage; push 4; A<3 burning (save ends)',
								tier3: '23 fire damage; push 6; A<4 burning (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-3',
						name: 'Caldera',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createSpecial('Special') ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'The distance is 2 burst; 8 fire damage; M<2 pull 2',
								tier2: 'The distance is 3 burst; 12 fire damage; M<3 pull 4',
								tier3: 'The distance is 4 burst; 15 fire damage; M<4 pull 6'
							})),
							FactoryLogic.createAbilitySectionText('The outermost squares of the area become a 1-square-tall wall of stone. The rest of the area is on fire until the end of the encounter. A creature who enters the area for the first time in a round or starts their turn there takes 3 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-4',
						name: 'Blazing Leap',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The red fist jumps up to 5 squares. Each creature adjacent to them when they land takes 5 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-5',
						name: 'Heat and Pressure',
						type: FactoryLogic.type.createTrigger('A creature within distance willingly moves or shifts away from the red fist.', { qualifiers: [ 'Free' ] }),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a **Might test**. A target with fire immunity automatically obtains a tier 3 outcome.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'Weakened and slowed (save ends)',
								tier2: 'Weakened (EoT)',
								tier3: 'No effect'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-6',
						name: 'Guardian Block',
						type: FactoryLogic.type.createTrigger('An ally within distance is targeted by an enemy’s ability.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The red fist becomes the target of the triggering ability, then can make a free strike against the enemy after the ability resolves.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-7-feature-7',
					name: 'Searing Skin',
					description: ' Whenever an adjacent enemy grabs the red fist or uses a melee ability against them, that enemy takes 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-8',
			name: 'Frost Giant Storm Hurler',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Artillery),
			keywords: [ 'Frost Giant', 'Giant' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7),
			stamina: 180,
			stability: 5,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(4, -1, 0, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-8-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 8 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-2',
						name: 'Ice Javelins',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '13 cold damage',
								tier2: '18 cold damage; M<3 bleeding (save ends)',
								tier3: '22 cold damage; M<4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('Whenever a creature bleeding this way takes damage from that condition, their speed decreases by 1 (to a minimum of 0) until that condition ends.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-3',
						name: 'Flower of Frost',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The storm hurler throws three size 1L ice javelins into unoccupied squares within distance. Each javelin has 30 Stamina and fire weakness 5. At the start of the storm hurler’s next turn, all javelins not destroyed explode in a shower of icicles. Each enemy and object within 3 squares of an exploding javelin makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '14 cold damage; push 4; bleeding (save ends)',
								tier2: '11 cold damage; push 2; slowed (save ends)',
								tier3: '7 cold damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-4',
						name: 'Ice Dance',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One giant ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The storm hurler and the target each shift up to 6 squares while staying adjacent to each other. The target can then jump up to 5 squares and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-5',
						name: 'Frozen Retribution',
						type: FactoryLogic.type.createTrigger('The storm hurler is targeted by a ranged strike.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The triggering strike has a double bane. If the strike obtains a tier 1 outcome, the storm hurler uses Ice Javelins against the creature who made it.')
						]

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-8-feature-6',
					name: 'Kingdom of Isolation',
					description: 'The storm hurler is surrounded by a snowstorm. Any enemy who starts their turn within 2 squares of the storm hurler can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-9',
			name: 'Frost Giant Wind Sprinter',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Harrier),
			keywords: [ 'Frost Giant', 'Giant' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(10),
			stamina: 200,
			stability: 5,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(4, 4, -1, 0, 0),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-9-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, value: 8 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-2',
						name: 'Cold Axe',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damagee',
								tier2: '17 damage; A<3 bleeding (save ends)',
								tier3: '21 damage; A<4 bleeding (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('A target who is already bleeding takes an extra 1d6 cold damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-3',
						name: 'Blizzard Surge',
						type: FactoryLogic.type.createMain(),
						cost: 5,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The wind sprinter shifts up to their speed and uses Cold Axe against each enemy who comes within 2 squares of them during the move. The wind sprinter makes one power roll against all targets.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-4',
						name: 'Ice Dance',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: 'One giant ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The wind sprinter and the target each shift up to 6 squares while staying adjacent to each other. The target can then jump up to 5 squares and make a free strike.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-5',
						name: 'Begone, Smallfolk!',
						type: FactoryLogic.type.createTrigger('The wind sprinter takes damage.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The wind sprinter moves up to their speed and uses Cold Axe against one target.')
						]

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-9-feature-6',
					name: 'Crush Underfoot',
					description: 'The wind sprinter can move through enemies’ spaces at their usual speed. The first time on a turn that a wind sprinter enters a creature’s space, that creature can choose to fall prone or to take 8 damage.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-9-feature-7',
					name: 'Kingdom of Isolation',
					description: ' The wind sprinter is surrounded by a snowstorm. Any enemy who starts their turn within 2 squares of the wind sprinter can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-10',
			name: 'Granite Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Stone Giant', 'Giant' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 247,
			stability: 10,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(4, 1, 1, 2, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-1',
						name: 'Jagged Stoneclub',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage',
								tier2: '17 damage; R<3 weakened (save ends)',
								tier3: '21 damage; R<4 weakened (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the target is already weakened, they are also bleeding (save ends).')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-2',
						name: 'Crag Burst',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage; push 2',
								tier2: '10 damage; push 4',
								tier3: '14 damage; vertical push 4'
							})),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain. Whenever a creature enters a square in the area, they take 3 damage')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-3',
						name: 'Castle Stone Shape',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The granite stone giant moves up to their speed and creates a 14 wall of stone in squares adjacent to the path of their movement.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-4',
						name: 'Pillar',
						type: FactoryLogic.type.createTrigger('A creature or object within distance moves or shifts away from the granite stone giant.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'The triggering creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('A 1-square pillar of stone rises 5 squares out of the ground beneath the target, who moves with the ground to its new elevation, then is vertical pushed 5 squares.')
						]

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-10-feature-5',
					name: 'Stone Steps',
					description: 'The granite stone giant ignores difficult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-10-feature-6',
					name: 'Stonebreaker Flesh',
					description: 'Whenever an enemy obtains a tier 1 outcome on a melee ability used against the granite stone giant, they take a bane on that ability until the end of the encounter.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-10-feature-7',
					name: 'Stone Swim',
					description: 'The granite stone giant can burrow through stone, but can’t drag other creatures underground when they do so.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-11',
			name: 'Hill Giant Clobberer',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Hill Giant', 'Giant' ],
			encounterValue: 36,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 200,
			stability: 5,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(4, -1, -1, -1, -1),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-11-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Damage, modifierType: DamageModifierType.Immunity, value: 3 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-2',
						name: 'Clobberin’ Club',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '12 damage',
								tier2: '17 damage; prone',
								tier3: '21 damage; prone'
							})),
							FactoryLogic.createAbilitySectionText('A target who is already prone takes an extra 12 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-3',
						name: 'Stomp',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '14 damage; prone',
								tier2: '20 damage; prone M<3 can’t stand (save ends)',
								tier3: '25 damage; prone M<4 can’t stand (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('In suitably soft ground, the target is entrenched in a 2-square deep hole.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-4',
						name: 'Hill Quake',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must make either a **Might** or **Agility** test.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '6 damage; vertical push 3',
								tier2: '2 damage; vertical push 4',
								tier3: 'Push 2'
							})),
							FactoryLogic.createAbilitySectionText('The clobberer can choose to fall prone in order to double the forced movement distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-5',
						name: 'You Ain’t Getting Away',
						type: FactoryLogic.type.createTrigger('A creature within distance moves or shifts away from the clobberer.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes an **Agility** test.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: 'Grabbed, and the target takes a bane on the Escape Grab maneuver',
								tier2: 'Grabbed',
								tier3: 'No effect'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'A target who would be grabbed by this ability is instead either vertical pushed up to 5 squares; or they take 5 damage, are knocked prone, and can’t stand until the end of their next turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-11-feature-6',
					name: 'Destructive Path',
					description: 'The clobberer automatically destroys any mundane size 1 objects in their path when they move or are forced moved. They can break through any mundane wall made of wood, stone, or a similarly sturdy material this way as long as the wall is 2 squares thick or less.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-11-feature-7',
					name: 'Distracted',
					description: ' Whenever the clobberer targets a creature or object with an ability, any enemy within distance of the ability can use a free triggered action to distract the clobberer. The clobberer targets that enemy instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-12',
			name: 'Marble Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Hexer),
			keywords: [ 'Stone Giant', 'Giant' ],
			encounterValue: 40,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'burrow'),
			stamina: 207,
			stability: 10,
			freeStrikeDamage: 8,
			characteristics: MonsterLogic.createCharacteristics(4, 3, 0, 3, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-1',
						name: 'Marble From A Great Sling',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 15 })
						],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: '6 damage; I<2 dazed (save ends)',
								tier2: '10 damage; I<3 dazed (save ends)',
								tier3: '14 damage; I<4 dazed (save ends)'
							})),
							FactoryLogic.createAbilitySectionText('If the target has any effect on them that can be ended by a saving throw or that ends at the end of their turn, they are also knocked prone. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-2',
						name: 'Far Flung',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 4,
								tier1: 'Vertical push 7',
								tier2: 'Vertical push 10',
								tier3: 'Vertical push 12'
							})),
							FactoryLogic.createAbilitySectionText('Against a target who is prone or grabbed, this ability has a double edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-3',
						name: 'Polish Stone Shape',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 1 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The ground in the area becomes slick and glossy. Any non-giant who starts or ends their turn in the area is knocked prone and slides 2 squares.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-4',
						name: 'Break Armor',
						cost: 1,
						type: FactoryLogic.type.createTrigger('The marble stone giant takes damage'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The marble stone giant halves the damage, and has damage weakness 3 and a +3 bonus to speed until the end of the encounter. The damage weakness increases by 3 each time the marble stone giant uses this ability in the same encounter.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-12-feature-5',
					name: 'Stone Steps',
					description: 'The marble stone giant ignores difficult terrain.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-12-feature-6',
					name: 'Stonebreaker Flesh',
					description: 'Whenever an enemy obtains a tier 1 outcome on a melee ability used against the marble stone giant, they take a bane on that ability until the end of the encounter.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-12-feature-6',
					name: 'Stone Swim',
					description: 'The marble stone giant can burrow through stone, but can’t drag other creatures underground when they do so.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-13',
			name: 'Fire Giant Chief',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Leader),
			keywords: [ 'Fire Giant', 'Giant' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(5),
			speed: FactoryLogic.createSpeed(10),
			stamina: 240,
			stability: 10,
			freeStrikeDamage: 9,
			characteristics: MonsterLogic.createCharacteristics(5, 3, 0, 2, 3),
			features: [
				FactoryLogic.feature.createDamageModifier({
					id: 'giant-13-1',
					modifiers: [
						FactoryLogic.damageModifier.create({ damageType: DamageType.Fire, modifierType: DamageModifierType.Immunity, value: 10 })
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-2',
						name: 'Roiling Fist',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 4 })
						],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes either an **Agility test** or an **Intuition test**.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '18 fire damage; prone; weakened (save ends)',
								tier2: '14 fire damage; prone (EoT)',
								tier3: '9 fire damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-3',
						name: 'Burning Kick',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(4)
						],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '14 damage; push 5; A<3 9 fire damage',
								tier2: '19 damage; push 10; A<4 9 fire damage',
								tier3: '23 damage; push 15; A<5 9 fire damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-4',
						name: 'Lava Pillar',
						type: FactoryLogic.type.createManeuver(),
						cost: 3,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
						target: 'Each enemy and object in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								bonus: 5,
								tier1: '5 fire damage; M<3, vertical push 3',
								tier2: '7 fire damage; M<4, vertical push 4',
								tier3: '9 fire damage; M<5, vertical push 5'
							}))
						]
					})
				}),

				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-5',
						name: 'Fuel the Fire',
						type: FactoryLogic.type.createTrigger('A fire giant ally within distance makes a strike.'),
						cost: 1,
						keywords: [],
						distance: [
							FactoryLogic.distance.createRanged(12)
						],
						target: 'The triggering ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The strike has a double edge and deals an extra 10 fire damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-6',
						name: 'Forward!',
						type: FactoryLogic.type.createVillainAction(1),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target shifts up to their speed and can make a free strike. Any enemy who takes damage from a free strike this way and who has A<4 is burning (save ends). A burning enemy takes 1d6 fire damage at the start of each of their turns.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-7',
						name: 'Burning Legion',
						type: FactoryLogic.type.createVillainAction(2),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The chief shifts up to 10 squares. Five **fire giant fireballers** then arrive in unoccupied spaces within distance.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-8',
						name: 'All to Cinders',
						type: FactoryLogic.type.createVillainAction(3),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and each fire giant ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target unleashes a wave of fire, and each enemy within 2 squares of any target makes an **Agility test**. An enemy affected by two targets takes a bane on the test, while an enemy affected by three or more targets has a double bane.'),
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								tier1: '18 fire damage',
								tier2: '14 fire damage',
								tier3: '9 fire damage'
							}))
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-13-feature-9',
					name: 'Scorching Skin',
					description: 'Whenever an adjacent enemy grabs the chief or uses a melee ability against them, that enemy takes 9 fire damage, and if they have M<4 they are weakened (save ends).'
				})
			]
		})
	],
	addOns: []
};
