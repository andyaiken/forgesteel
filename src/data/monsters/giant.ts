import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterOrganizationType } from '../../enums/monster-organization-type';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const giant: MonsterGroup = {
	id: 'monster-group-giant',
	name: 'Giant',
	description: `
Supremely well adapted to harsh environments, giants thrive in extreme conditions. Fire giants build floating cities in the hearts of volcanic calderas, while stone giant villages dot the tallest mountains. Most people often go their entire lives blissfully unaware of the local tribe of giants living atop the nearby mountain range. This is for the best, as few “smallfolk” structures can survive even a handful of sufficiently motivated giants.`,

	information: [
		{
			id: 'giant-info-1',
			name: 'Adaptable and Elemental',
			description: `
Giants physically resemble the territory they inhabit. A band of frost giants doesn’t simply live on a mountain—they’re part of the mountain, and it’s part of them. Fire giants exude heat like a roaring volcano. Sages have long debated the question, “Does the environment shape a giant, or does the giant shape their environment?”`
		},

		{
			id: 'giant-info-2',
			name: 'Distant Cousins',
			description: `
Humanoid scholars usually assume all giants are related, though giants don’t view their kin as brethren by default. When different giant communities interact, the results depend heavily on the individuals involved and the relationships between their cultures. For instance, stone giants rarely get along with hill giants, as hill giants tend to detest stone artisanship. Meanwhile, frost giants gladly recruit hill giants into raiding parties if they’re willing to be in the vanguard.`
		},

		{
			id: 'giant-info-3',
			name: 'Fire Giants',
			description: `
Hailing from sweltering deserts and deep caverns of roiling magma alike, fire giants embody the passion and ruthlessness of their namesake. Though their reputation is one of violent growth and expansion, their lesser-known side is a deeply spiritual one, guided by introspection and understanding.

Fire giants rarely wear armor, as their bodies heat up to extreme temperatures while they fight, causing straps to melt and metal to deform. They instead hone their own bodies into the perfect weapons of war.
                    `
		},

		{
			id: 'giant-info-4',
			name: 'Frost Giants',
			description: `
        Born of soaring peaks in frigid mountains, frost giants master their environments to rule mountain ranges and build fortresses of unyielding ice. When frost giants march, a blizzard grows overhead, which they carry like a war banner. To frost giants, battle is a way of life, camaraderie, and glory.
        
        
        Where frost giants make their home, a unique form of ice sprouts into flowering crystalline structures. Frost giants harvest this ice, known as issenblau in their tongue, and fashion it into weapons as hard and sharp as steel, which can be used in any environment without melting.            `
		},

		{
			id: 'giant-info-5',
			name: 'Hill Giants',
			description: `
   Of all the giant cultures, hill giants are the most likely to interact with humanoids. Hill giants and smallfolk both love to live in places with rolling, fertile fields, and both appreciate the beauty of nature. However, these commonalities can be quickly forgotten if evil hill giants band together to claim the land solely for themselves, or if the smallfolk let fear of the large get the best of them and attempt to drive off their bigger neighbors. Most hill giants want to be left in peace, but when one is pressed, they can demolish a small village in minutes. 
        
   Most hill giants spend so much time in quiet peace that sudden flashy sights and loud noises can draw their attention. In battle, such distractions can draw the hill giant’s ire, making them switch from one target to another.     
        `
		},

		{
			id: 'giant-info-6',
			name: 'Stone Giants',
			description: `
   Fascinated by the act of creation, stone giants carve cities out of ancient caverns, mine precious metals and gems, and craft relics worthy of glory. To many a stone giant, artisanship is the highest calling, and all their creations are crafted with an eye to beauty and longevity.
  
   Stone giants are made of the same kinds of rocks that form their home—marble, granite, or even basalt. Their stone bodies not only protect them from attack, but also provide them with an additional outlet for self-expression. They often carve runes into their skin, which serve a wide variety of artistic and cultural purposes.        
        `
		},

		{
			id: 'giant-info-6',
			name: 'Giant Languages',
			description: `
   Most giants speak their kind’s dialect of High Kuric. Many hill giants also know Caelian.
                   `
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'giant-malice-1',
				name: 'Hurl Landscape',
				type: FactoryLogic.type.createAction(),
				cost: 3,
				keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
				target: 'All enemies in the cube',
				preEffect: 'A giant unearths a massive structure, hazard, or chunk of the encounter map and launches it. Each target makes an Agility test.',
				test: FactoryLogic.createPowerRoll({
					tier1: '18 damage; prone can’t stand (save ends)',
					tier2: '14 damage; prone',
					tier3: '9 damage'
				})
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'giant-malice-2',
			name: 'Bellow',
			cost: 5,
			sections: [
				'Each giant takes a deep breath and yells, inflicting push 10 on each creature within 3 squares of a giant.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'giant-malice-3',
			name: 'Titanic Tear',
			cost: 7,
			sections: [
				'A giant creates a fissure along the ground either in a 15 × 2 line within 1 or a 3 × 10 line within 2 that falls 6 squares deep. Each giant in the area can shift into the nearest unoccupied square outside of the fissure. Each non-giant in the affected area makes an Agility test.',
				FactoryLogic.createPowerRoll({
					tier1: '15 damage; target falls; prone can’t stand (EoT)',
					tier2: '11 damage; target is prone hanging on the edgee',
					tier3: 'Target can shift into the nearest unoccupied square outside of the fissure'
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
			encounterValue: 22,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7),
			stamina: 13,
			stability: 5,
			freeStrikeDamage: 3,
			withCaptain: 'Speed +3',
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 })
						],
						target: 'All enemies and objects in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '2 fire damage',
							tier2: '5 fire damage; push 1',
							tier3: '6 fire damage; push 2'
						}),
						effect: 'The fireball can jump 4 squares before using this ability.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-1-3',
					name: 'Searing Skin',
					description: 'Whenever an enemy makes physical contact with the fireballer or uses a melee ability against the fireball, they take 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-2',
			name: 'Sand Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Controller),
			keywords: [ 'Stone Giant', 'Giant' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7, 'burrow'),
			stamina: 14,
			stability: 10,
			freeStrikeDamage: 3,
			withCaptain: '6 temporary Stamina',
			characteristics: MonsterLogic.createCharacteristics(4, 2, 0, 3, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-2-feature-1',
						name: 'Buried in Sand',
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '1 creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '3 damage; slide 2',
							tier2: '6 damage; slide 3; A>3 restrained (save ends)',
							tier3: '8 damage; slide 4; A>4 restrained (save ends)'
						})
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
					description: 'Whenever an enemy gets a tier 1 result on a melee strike against the sand stone giant, they have a bane on all subsequent uses of that ability until the end of the encounter.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-3',
			name: 'Frost Giant Snowblaster',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Artillery),
			keywords: [ 'Frost Giant', 'Giant' ],
			encounterValue: 20,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(7),
			stamina: 12,
			stability: 5,
			freeStrikeDamage: 4,
			withCaptain: 'Strike damage +3',
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(12)
						],
						target: '1 creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 cold damage',
							tier2: '7 cold damage',
							tier3: '9 cold damage; prone'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-3-3',
					name: 'Kingdom of Isolation',
					description: 'The snowblaster is surrounded by a snowstorm. An enemy that starts their turn within 2 squares of the snowblaster can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-4',
			name: 'Hill Giant Mosstooth',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Minion, MonsterRoleType.Brute),
			keywords: [ 'Hill Giant', 'Giant' ],
			encounterValue: 18,
			size: FactoryLogic.createSize(4),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 13,
			stability: 5,
			freeStrikeDamage: 4,
			withCaptain: 'Strike damage +3',
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '1 creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '4 damage',
							tier2: '7 damage',
							tier3: '8 cold damage; grabbed'
						}),
						effect: 'The mosstooth can swing a grabbed creature or object as a part of this ability, dealing an additional 5 damage and releasing them prone adjacent to the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-4-3',
					name: 'Distracted',
					description: 'Whenever the mosstooth targets a creature or object with an ability, the Director provides any enemy within range of the ability an opportunity to use a free triggered action to distract the mosstooth. The mosstooth targets that enemy instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-5',
			name: 'Basalt Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Controller),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage; M<2 slowed (save ends)',
							tier2: '17 damage; M<3 slowed (save ends)',
							tier3: '21 damage; M<4 slowed (save ends)'
						}),
						effect: 'This ability reduces a target’s speed to 0 (EoT) if they were already slowed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-2',
						name: 'Forked Knife',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3),
							FactoryLogic.distance.createRanged(12)
						],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '10 damage; A<2 restrained by knife (save ends)',
							tier2: '16 damage; A<3 restrained by knife (save ends)',
							tier3: '20 damage; prone; A<4 restrained by knife (save ends)'
						}),
						effect: 'The knife lands in the target’s square. The knife has 30 Stamina and damage immunity 5. Whenever the knife takes damage, the knife vibrates and deals 4 sonic damage to each enemy within 3 squares.'
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
						effect: 'The basalt stone giant moves up to their speed. Each square that they leave during this movement is considered difficult terrain for enemies. Giants can move through 2 affected squares for the normal cost of 1 speed.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-5-feature-4',
						name: 'Resonate Rune',
						type: FactoryLogic.type.createTrigger('The basalt stone giant takes damage.'),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'All enemies in the burst',
						effect: 'Push 3 or A<3 push 6 and knocked prone.'
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
					description: 'Whenever an enemy gets a tier 1 result on a melee strike against the basalt stone giant, they have a bane on all subsequent uses of that ability until the end of the encounter.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-6',
			name: 'Fire Giant Lightbearer',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Support),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createMelee(6)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '13 fire damage; slide 2',
							tier2: '17 fire damage; slide 4',
							tier3: '22 fire damage; slide 6'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-3',
						name: 'Living Blaze',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [
							FactoryLogic.distance.createRanged(6)
						],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '15 fire damage',
							tier2: '21 fire damage',
							tier3: '26 fire damage'
						}),
						effect: 'The blaze ricochets, targeting 1 additional target within 4 of the original target with a bane, or 2 additional targets within 2 of the original target with a double bane. The lightbearer makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-6-feature-4',
						name: 'Travel By Fire',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.createRanged(5)
						],
						target: '2 creatures or objects',
						effect: 'Each target takes 1d6 fire damage and teleports in a plume of smoke, swapping places with the other target. The targets must be able to fit into the space they enter.'
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
						effect: 'The lightbearer emits a beacon of light until the start of their next turn. Each fire giant that has line of effect to the lightbearer’s beacon has a double edge on their abilities.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-6-feature-6',
					name: 'Healing Heat',
					description: 'Fire giants targeted by the lightbearer’s abilities receive Stamina equal to the value of the damage listed instead of taking damage. Fire giants force moved by the lightbearer’s abilities can choose to ignore stability.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-6-feature-7',
					name: 'Searing Skin',
					description: 'Whenever an enemy makes physical contact with the lightbearer or uses a melee ability against the lightbearer, they take 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-7',
			name: 'Fire Giant Red Fist',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '14 fire damage; push 2',
							tier2: '19 fire damage; push 4; A<3 burning (save ends)',
							tier3: '23 fire damage; push 6; A<4 burning (save ends)'
						}),
						effect: 'A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-3',
						name: 'Caldera',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createSpecial('Special') ],
						target: 'All enemies and objects in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Distance is 2 burst; 8 fire damage; M<2 pull 2',
							tier2: 'Distance is 3 burst; 12 fire damage; M<3 pull 4',
							tier3: 'Distance is 4 burst; 15 fire damage; M<4 pull 6'
						}),
						effect: 'The outermost squares of the affected area become walls of dirt and stone. The rest of the affected area is set on fire. A creature takes 3 fire damage whenever they enter or start their turn in an enflamed square.'
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
						effect: 'The red fist jumps 5 squares. Each creature within 1 of the red fist when they land takes 5 fire damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-5',
						name: 'Heat and Pressure',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the red fist.', { qualifiers: [ 'Free' ] }),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '1 creature or object',
						preEffect: 'The target makes a Might test. A target with a fire immunity automatically gets a tier 3 result.',
						test: FactoryLogic.createPowerRoll({
							tier1: 'Weakened and slowed (save ends)',
							tier2: 'Weakened (EoT)',
							tier3: 'No effect'
						})


					})

				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-7-feature-6',
						name: 'Guardian Block',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the red fist.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: 'Self',
						effect: 'The red fist becomes the target of the ability. The red fist makes a free strike against the enemy after the ability resolves.'

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-7-feature-7',
					name: 'Searing Skin',
					description: 'Whenever an enemy makes physical contact with the red fist or uses a melee ability against the red fist, they take 5 fire damage.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-8',
			name: 'Frost Giant Storm Hurler',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Artillery),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '13 cold damage',
							tier2: '18 cold damage; M<3 bleeding (save ends)',
							tier3: '22 cold damage; M<4 bleeding (save ends)'
						}),
						effect: 'Each time a creature bleeding from this ability takes damage due to bleeding, their speed decreases by 1 (to a minimum of 0) until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-3',
						name: 'Flower of Frost',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Magic ],
						distance: [
							FactoryLogic.distance.createRanged(15)
						],
						target: 'Special',
						preEffect: 'The storm hurler throws three size 1L javelins into unoccupied squares within distance. A javelin has 30 Stamina and fire weakness 5. At the start of the storm hurler’s next turn, each javelin with 1 or more Stamina explodes in a shower of icicles. Each enemy and object within 3 squares of an exploding javelin makes an Agility test.',
						test: FactoryLogic.createPowerRoll({
							tier1: '14 cold damage; push 4; bleeding (save ends)',
							tier2: '11 cold damage; push 2; slowed (save ends)',
							tier3: '7 cold damage'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-8-feature-4',
						name: 'Ice Dance',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: '1 giant ally',
						effect: 'Both giants shift 6, staying adjacent to each other. The storm hurler allows the target to jump 5 and make a free strike.'
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
						effect: 'The storm hurler imposes a double bane on the strike. If the result is tier 1, the storm hurler uses their Ice Javelins ability against the striker.'

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-8-feature-6',
					name: 'Kingdom of Isolation',
					description: 'The storm hurler is surrounded by a snowstorm. An enemy that starts their turn within 2 squares of the storm hurler can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-9',
			name: 'Frost Giant Wind Sprinter',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Harrier),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damagee',
							tier2: '17 damage; A<3 bleeding (save ends)',
							tier3: '21 damage; A<4 bleeding (save ends)'
						}),
						effect: 'This ability deals an additional 1d6 cold damage if the target is already bleeding.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-3',
						name: 'Blizzard Surge',
						type: FactoryLogic.type.createAction(),
						cost: 5,
						keywords: [],
						distance: [
							FactoryLogic.distance.createSelf()
						],
						target: 'Self',
						effect: 'The wind sprinter shifts up to their speed and uses their Cold Axe against each enemy who comes within 2 squares of them during the move. The wind sprinter makes one power roll against all targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-9-feature-4',
						name: 'Ice Dance',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee(1) ],
						target: '1 giant ally',
						effect: 'Both giants shift 6, staying adjacent to each other. The wind sprinter allows the target to jump 5 and make a free strike.'
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
						effect: 'The wind sprinter moves up to their speed and uses their Cold Axe on a single target.'

					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-9-feature-6',
					name: 'Crush Underfoot',
					description: 'The wind sprinter can move through enemies and objects at normal speed. A creature can choose to fall prone or take 8 damage the first time the wind sprinter passes through their space on a turn.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-9-feature-7',
					name: 'Kingdom of Isolation',
					description: 'The wind sprinter is surrounded by a snowstorm. An enemy that starts their turn within 2 squares of the wind sprinter can’t shift.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-10',
			name: 'Granite Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Defender),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage',
							tier2: '17 damage; R<3 weakened (save ends)',
							tier3: '21 damage; R<4 weakened (save ends)'
						}),
						effect: 'This attack inflicts bleeding (save ends) if the target is already weakened.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-2',
						name: 'Crag Burst',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 })
						],
						target: 'All enemies and objects in the burst',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 damage; push 2',
							tier2: '10 damage; push 4',
							tier3: '14 damage; vertical push 4'
						}),
						effect: 'The affected area becomes difficult terrain. A creature takes 3 damage whenever they enter an affected square.'
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
						effect: 'The granite stone giant moves up to their speed and creates a 14 wall of stone. Each segment must include one of the squares the granite stone giant touched.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-10-feature-4',
						name: 'Pillar',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the granite stone giant.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '1 creature or object',
						effect: 'A 1 square wide pillar of stone juts 5 squares out of the ground beneath the target, raising them and then vertically pushing them 5. The forced movement is entirely straight up.'

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
					description: 'Whenever an enemy gets a tier 1 result on a melee strike against the granite stone giant, they have a bane on all subsequent uses of that ability until the end of the encounter.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-11',
			name: 'Hill Giant Clobberer',
			level: 7,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Brute),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '2 creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '12 damage',
							tier2: '17 damage; prone',
							tier3: '21 damage; prone'
						}),
						effect: 'This ability deals an additional 12 damage against already prone targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-3',
						name: 'Stomp',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '14 damage; prone',
							tier2: '20 damage; prone M<3 and can’t stand (save ends)',
							tier3: '25 damage; prone M<4 and can’t stand (save ends)'
						}),
						effect: 'The target becomes entrenched in a 2 square deep hole in the ground.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-4',
						name: 'Hill Quake',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
						target: 'All enemies in the burst',
						preEffect: 'Each target makes either a Might or Agility test.',
						test: FactoryLogic.createPowerRoll({
							tier1: '6 damage; vertical push 4; prone',
							tier2: '2 damage; vertical push 4',
							tier3: 'Push 2'
						}),
						effect: 'The clobberer can choose to fall prone, doubling the push distance.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-11-feature-5',
						name: 'You Ain’t Getting Away',
						type: FactoryLogic.type.createTrigger('The target moves or shifts away from the clobberer.'),
						keywords: [],
						distance: [
							FactoryLogic.distance.createMelee(3)
						],
						target: '1 creature',
						preEffect: 'The target makes an Agility test.',
						test: FactoryLogic.createPowerRoll({
							tier1: 'Grabbed, target has a bane on escaping the grab',
							tier2: 'Grabbed',
							tier3: 'No effect'
						}),
						spend: [ {
							value: 2,
							effect: 'A grabbed target is released and either slammed on the ground for 5 damage and prone can’t stand (EoT) or is vertically pushed 5.'
						} ]
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-11-feature-6',
					name: 'Destructive Path',
					description: 'The clobberer automatically destroys unattended, mundane size 1 objects in their path during their movement. They can break through any mundane wall made of wood, stone, or a similarly sturdy material in this way, so long as the wall is no more than 2 squares thick.'
				}),
				FactoryLogic.feature.create({
					id: 'giant-11-feature-7',
					name: 'Distracted',
					description: 'Whenever the clobberer targets a creature or object with an ability, the director provides any enemy within range of the ability an opportunity to use a free triggered action to distract the clobberer. The clobberer targets that enemy instead.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'giant-12',
			name: 'Marble Stone Giant',
			level: 8,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Troop, MonsterRoleType.Hexer),
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 })
						],
						target: 'All enemies and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: '6 damage; I<2 dazed (save ends)',
							tier2: '10 damage; I<3 dazed (save ends)',
							tier3: '14 damage; I<4 dazed (save ends)'
						}),
						effect: 'This ability knocks the target prone if they are already affected by an EoT or a Save Ends effect.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-2',
						name: 'Far Flung',
						type: FactoryLogic.type.createAction(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(1)
						],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 4,
							tier1: 'Vertical push 10',
							tier2: 'Vertical push 12',
							tier3: 'Vertical push 15'
						}),
						effect: 'The target is catapulted sky high. This ability has a double edge against prone or grabbed targets.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-12-feature-3',
						name: 'Polish Stone Shape',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 10, value2: 2, within: 1 }) ],
						target: 'Special',
						effect: 'The affected area becomes slick and glossy. Non-giants that start or end their turn on the ground in the affected area are knocked prone and slide 2.'
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
						effect: 'The marble stone giant halves the damage, gains damage weakness 3, and increases their speed by 3. The damage weakness increases by 3 each time the marble stone giant uses this ability in an encounter.'
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
					description: 'Whenever an enemy gets a tier 1 result on a melee strike against the marble stone giant, they have a bane on all subsequent uses of that ability until the end of the encounter.'
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
						type: FactoryLogic.type.createAction(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 4 })
						],
						target: 'All enemies and objects',
						preEffect: 'Each target makes either an Agility or Intuition test.',
						test: FactoryLogic.createPowerRoll({
							tier1: '18 fire damage; burning (save ends)',
							tier2: '14 fire damage; burning (EoT)',
							tier3: '9 fire damage'
						}),
						effect: 'A burning target takes 1d6 fire damage at the start of each of their turns until the condition ends.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-3',
						name: 'Burning Kick',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(4)
						],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 5,
							tier1: '14 damage; push 5 A<3 9 fire damage',
							tier2: '19 damage; push 10 A<4 9 fire damage',
							tier3: '23 damage; push 15 A<5 9 fire damage'
						})
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
						target: 'All enemies and objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 5,
							tier1: '7 fire damage; M<3 vertical push 3 and prone',
							tier2: '11 fire damage; M<4 vertical push 5 and prone',
							tier3: '14 fire damage; M<5 vertical push 10 and prone'
						})
					})
				}),

				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-5',
						name: 'Fuel the Fire',
						type: FactoryLogic.type.createTrigger('The target makes a strike.'),
						cost: 1,
						keywords: [],
						distance: [
							FactoryLogic.distance.createRanged(12)
						],
						target: '1 fire giant ally',
						effect: 'The strike gains a double edge and deals 10 fire damage.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-6',
						name: 'Forward!',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all allies',
						effect: 'Each target shifts up to their speed and makes a free strike. An enemy that takes damage from a fire giant during this action is A<4 burning (save ends) (see Roiling Fist)'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-7',
						name: 'Burning Legion',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Special',
						effect: 'Shift 10. 5 fire giant troopers appear in unoccupied spaces.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'giant-13-feature-8',
						name: 'All to Cinders',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [
							FactoryLogic.distance.createSelf(),
							FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 })
						],
						target: 'Self and all fire giant allies',
						preEffect: 'Each target unleashes a fire wave. Each enemy within 2 squares of a target makes an Agility test:',
						test: FactoryLogic.createPowerRoll({
							tier1: '18 fire damage',
							tier2: '14 fire damage',
							tier3: '9 fire damage'
						})
					})
				}),
				FactoryLogic.feature.create({
					id: 'giant-13-feature-9',
					name: 'Scorching Skin',
					description: 'Whenever an enemy makes physical contact with the chief or uses a melee ability against the chief, they take 9 fire damage and are M<4 weakened (save ends).'
				}),
				FactoryLogic.feature.create({
					id: 'giant-13-feature-10',
					name: 'End Effect',
					description: 'At the end of their turn, the chief can take 20 damage to end one save ends effect affecting them. This damage can’t be reduced.'
				})
			]
		})
	],
	addOns: []
};
