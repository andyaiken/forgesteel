import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { MonsterGroup } from '@/models/monster-group';
import { MonsterOrganizationType } from '@/enums/monster-organization-type';
import { MonsterRoleType } from '@/enums/monster-role-type';
import { StatBlockIcon } from '@/enums/stat-block-icon';

export const valok: MonsterGroup = {
	id: 'monster-group-valok',
	name: 'Valok',
	description: 'Abandoned autonomous machines made by the ancient steel dwarves, valok can still be found deep within the crumbling ruins and underground structures of long-dead civilizations. The steel dwarves made their instruments well, though, and valok can still be activated! However, doing so without the correct control phrases could unleash an unstoppable machine overloaded by the weight of time.',
	picture: null,
	information: [
		{
			id: 'valok-info-1',
			name: 'Exotic Metal Body',
			description: 'Steel dwarves unlocked the secrets of smithing valiar—the truemetal—prized not only for its strength and flexibility, but for its entrancing silvery white beauty. They could turn valiar into anything, from breathtaking weapons and exquisite buildings to hypnotic gossamer fabrics that are nearly transparent and virtually indestructible. The secrets of working with the truemetal disappeared with the steel dwarves, but not before they built the nigh-invulnerable bodies of the valok.'
		},
		{
			id: 'valok-info-2',
			name: 'Prismacore Power',
			description: 'The steel dwarves also mined iridoss, commonly known as prismacore. This rare gemstone was infused with the power of other worlds. Unlike other constructs who are powered by spells or prayer, each valok’s prismacore heart allows them to operate without magic. Since prismacore never loses power, valok can work ceaselessly, without rest or respite.'
		},
		{
			id: 'valok-info-3',
			name: 'Mechanized Evolution',
			description: `The first valok were great machines made to dig, smelt, and build. Legends say these giant walkers could build entire cities in a matter of days, and could even construct other valok. As the steel dwarves learned the deep secrets of prismacore, they made machines who could speak and think more freely.

While two classes of valok—servok and multivok—have been discovered, ancient steel dwarf carvings hint that a highly advanced third class was created just before their makers disappeared.`
		},
		{
			id: 'valok-info-4',
			name: 'Ancient and Deep',
			description: 'Ruined valok litter the deepest ruins of the steel dwarves, and without the steel dwarves’ secrets, their valiar and iridoss are useless to modern smiths. But some valok still labor in the depths, carrying out the orders given to them long ago and ready to end any who interfere.'
		},
		{
			id: 'valok-info-5',
			name: 'Servok',
			description: `Servoks, the labor and siege class of valok, are huge, slow, and built for a specific purpose—though all are designed to defend themselves when threatened. No humaniform servoks have yet been discovered. Their forms depend on their purpose, but they are never smaller than a wagon. Despite each servok’s utilitarian construction and the ages of grime accumulated atop their valiar, they are impressive to behold.

Servok builders once constructed buildings, roads, and walls. Some active builders still work the caverns where they were left, clearing the ground in preparation for lost grand projects known only to their progenitors. Servok miners dug the legendary tunnels of the steel dwarves. A few miners still bore deep into the earth, searching for ore and ready to destroy anything that interferes with that function.

The quaking of earth and the boom of an arcane cannon precedes the appearance of a servok war engine. Built to roll through enemy ranks with their bladed rake, the war engine can also eliminate targets from afar with a massive gun that shoots both magic blasts and burning oil. Many war engines went to battle and never returned, and where they wander now, they consider every creature they meet who isn’t a steel dwarf to be an enemy.`
		},
		{
			id: 'valok-info-6',
			name: 'Multivok',
			description: `Smaller than servoks, multivoks can speak and carry out commands, though their capacity for complexity is limited. While multivoks are humaniform, their masterfully crafted bodies lack the expression and fine articulation of humanoids. They were built to run and maintain ships and ore harvesters, survey dangerous or distant locations, guard nobles, and oversee servoks—tasks which many multivoks tirelessly attempt to continue today.

With arms ending in axe blades and repeating crossbows mounted on their shoulders, a multivok bodyguard cuts an impressive figure. Multivok bodyguards who are still active are often found watching over the bones or possessions of their long-dead charges with unfaltering loyalty.

One of the most advanced multivoks, a chief directs and coordinates other valok to get work done. Multivok chiefs were built to oversee projects in the absence of steel dwarf supervisors. Active chiefs still roam the halls of the steel dwarves, organizing their fellow constructs to protect treasures, construct buildings, dig tunnels, and destroy invaders.`
		},
		{
			id: 'valok-info-7',
			name: 'Valok Languages',
			description: 'Most valok communicate exclusively in Rallarian.'
		}
	],
	malice: [
		FactoryLogic.feature.createMalice({
			id: 'valok-malice-1',
			name: 'Repeater',
			cost: 3,
			icon: StatBlockIcon.Self,
			sections: [
				'One valok acting this turn takes an additional main action.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'valok-malice-2',
			name: 'I Was Not Commanded to Wait ',
			cost: 5,
			icon: StatBlockIcon.SpecialArea,
			sections: [
				'At the end of each turn until the end of the round, one valok can either shift up to 2 squares or make a free strike.'
			]
		}),
		FactoryLogic.feature.createMalice({
			id: 'valok-malice-3',
			name: 'Rapid Logic Overdrive',
			cost: 7,
			icon: StatBlockIcon.Trait,
			sections: [
				'Each valok in the encounter can end one effect on them that can be ended by a saving throw, and can move up to their speed (making use of the bonus below). Additionally, until the end of the encounter, all valok deal an extra 5 damage on strikes and gain a +5 bonus to speed. This feature can be activated multiples times, stacking the effects.'
			]
		})
	],
	monsters: [
		FactoryLogic.createMonster({
			id: 'valok-1',
			name: 'Multivok Bodyguard',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Defender),
			keywords: [ 'Construct', 'Multivok', 'Soulless', 'Valok' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5),
			stamina: 240,
			stability: 5,
			freeStrikeDamage: 9,
			characteristics: FactoryLogic.createCharacteristics(4, 0, -2, 1, -4),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-1-feature-1',
						name: 'Gatling Bolt Gun',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '13 damage',
									tier2: '18 damage',
									tier3: '22 damage; A < 4 bleeding (save ends)'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-1-feature-2',
						name: 'Valiar Axe',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '15 damage; M < 2 weakened (save ends)',
									tier2: '21 damage; M < 3 weakened (save ends)',
									tier3: '26 damage; M < 4 weakened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('The bodyguard has a double edge on this ability if it was previously used against the same target in this encounter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-1-feature-3',
						name: 'Magnetic Pull',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('**Special:** This ability targets only metal-clad enemies and metal objects of size 3 or smaller.'),
							FactoryLogic.createAbilitySectionText('Each target is pulled up to 8 squares, or if they have <code>M < 3</code>, they are pulled up to 15 squares. The bodyguard can make a free strike against each target who ends this forced movement adjacent to them.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-1-feature-4',
						name: 'Valiar Cloak',
						type: FactoryLogic.type.createTrigger('One ally within distance is targeted by an enemy’s ability. The bodyguard can use this ability after seeing the outcome of the power roll.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The bodyguard becomes the triggering ability’s target instead.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'valok-1-feature-5',
					name: 'Multivok Maintenance',
					description: 'At the start of the bodyguard’s turn, each servok within 2 squares of them regains 15 Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-1-feature-6',
					name: 'Crafted to Perfection',
					description: 'The bodyguard’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-1-feature-7',
					name: 'Valiar Might',
					description: 'While the bodyguard isn’t bleeding, weakened, or winded, any power roll made against them is automatically a tier 1 outcome. A critical hit still grants its additional main action.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'valok-2',
			name: 'Multivok Chief',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Support),
			keywords: [ 'Construct', 'Multivok', 'Soulless', 'Valok' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(1, 'L'),
			speed: FactoryLogic.createSpeed(5),
			stamina: 220,
			stability: 3,
			freeStrikeDamage: 9,
			characteristics: FactoryLogic.createCharacteristics(4, 1, -2, 1, -3),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-2-feature-1',
						name: 'Pneumatic Punch',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '13 damage; push 3',
									tier2: '18 damage; push 5',
									tier3: '22 damage; push 8'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-2-feature-2',
						name: 'Targeting Beam',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '15 damage; A < 2 slowed (save ends)',
									tier2: '21 damage; A < 3 slowed (save ends)',
									tier3: '26 damage; A < 4 slowed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('This damage can’t be reduced in any way. While a target is slowed this way, any strike against them has a double edge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-2-feature-3',
						name: 'Chief’s Command',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionText('The target shifts up to their speed and can use a main action.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-2-feature-4',
						name: 'Quick Shield',
						type: FactoryLogic.type.createTrigger('The chief or an ally within distance is subject to an effect that can be ended by a saving throw or that ends at the end of their turn.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target gains 15 temporary Stamina. Each time this triggered action is used, the amount of temporary Stamina received decreases by 3 (to a minimum of 0).')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'valok-2-feature-5',
					name: 'Multivok Maintenance',
					description: 'At the start of the chief’s turn, each servok within 2 squares of them regains 15 Stamina.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-2-feature-6',
					name: 'Crafted to Perfection',
					description: 'The chief’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-2-feature-7',
					name: 'Valiar Might',
					description: 'While the chief isn’t bleeding, weakened, or winded, any power roll made against them is automatically a tier 1 outcome. A critical hit still grants its additional main action.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'valok-3',
			name: 'Servok Builder',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Construct', 'Multivok', 'Soulless', 'Valok' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(5),
			stamina: 240,
			stability: 8,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(4, -2, -4, -1, -5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-3-feature-1',
						name: 'Wrecking Ball',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, value2: 5 }) ],
						target: 'Each enemy and the object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target must make either an **Agility test** or an **Intuition test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
									tier1: '15 damage; push 5, prone',
									tier2: '12 damage; push 3',
									tier3: '8 damage'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-3-feature-2',
						name: 'Construction Arm',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '16 damage',
									tier2: '23 damage; grabbed',
									tier3: '28 damage; grabbed; M < 4 vertical push 5'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-3-feature-3',
						name: 'Lay the Foundation',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 6, value2: 3, within: 1 }) ],
						cost: 3,
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The area is covered in wet concrete and is difficult terrain. Any enemy who starts their turn in the concrete makes a **Might test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									tier1: 'Restrained (EoT)',
									tier2: 'Slowed (EoT)',
									tier3: 'No effect'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-3-feature-4',
						name: 'Build Wall',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 6, value2: 3 }) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText('The builder creates a concrete wall. They can also remove any unoccupied squares of wet concrete within 3 squares of them, creating two additional squares of wall for each square of concrete removed.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-3-feature-4',
						name: 'Sputter',
						type: FactoryLogic.type.createTrigger('A creature or object within distance deals damage to the builder.', { free: true }),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						cost: 1,
						target: 'The triggering creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									tier1: 'A < 2 restrained (save ends)',
									tier2: 'A < 3 restrained (save ends)',
									tier3: 'A < 4 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('While a creature is restrained this way, or if the target is an object, the target and their space are encased in wet concrete. A creature no longer restrained leaves squares of wet concrete behind.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'valok-3-feature-5',
					name: 'Servok Siege Machine',
					description: 'The builder ignores difficult terrain, and their abilities deal an extra 15 damage to objects.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-3-feature-6',
					name: 'Crafted to Perfection',
					description: 'The builder’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-3-feature-7',
					name: 'Valiar Might',
					description: 'While the builder isn’t bleeding, weakened, or winded, any power roll made against them is automatically a tier 1 outcome. A critical hit still grants its additional main action.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'valok-4',
			name: 'Servok Miner',
			level: 9,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Controller),
			keywords: [ 'Construct', 'Multivok', 'Soulless', 'Valok' ],
			encounterValue: 44,
			size: FactoryLogic.createSize(2),
			speed: FactoryLogic.createSpeed(5, 'burrow, climb'),
			stamina: 200,
			stability: 6,
			freeStrikeDamage: 9,
			characteristics: FactoryLogic.createCharacteristics(4, -2, -4, -1, -5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-4-feature-1',
						name: 'Drill Press',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(2) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 4,
									tier1: '13 damage; M < 2 restrained (save ends) and prone',
									tier2: '18 damage; M < 3 restrained (save ends) and prone',
									tier3: '22 damage; prone; M < 4 restrained (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('In suitably soft ground, a target restrained this way is entrenched in a 1-square-deep hole.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-4-feature-2',
						name: 'Unload Rocks',
						type: FactoryLogic.type.createMain(),
						cost: 3,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, value2: 1 }) ],
						target: 'Each enemy and the object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
									tier1: '14 damage; slide 4; the miner’s allies have concealment from the target (save ends)',
									tier2: '11 damage; slide 2',
									tier3: '7 damage'
								})
							),
							FactoryLogic.createAbilitySectionText('The area is difficult terrain.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-4-feature-3',
						name: 'Break Ground',
						type: FactoryLogic.type.createManeuver(),
						cost: 5,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 20, value2: 1, within: 1 }) ],
						target: 'Each enemy and the object in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('A 5-square-deep fissure opens along the ground in the area. Each ally in the area can shift into the nearest unoccupied space outside the fissure. Each target makes an **Agility test**.'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Agility ],
									tier1: '14 damage; the target falls into the fissure, and is prone and can’t stand (EoT)',
									tier2: '11 damage; the target is prone and hanging onto the edge of the fissure',
									tier3: '7 damage; the target can shift into the nearest unoccupied space outside the fissure'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-4-feature-4',
						name: 'Miner Inconvenience',
						type: FactoryLogic.type.createTrigger('The miner is targeted by a strike.'),
						cost: 2,
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the round, dust and dirt billow in a 2 burst around the miner’s initial space. While the miner is in the area, they ignore the nondamaging effects of any strike made against them, including the triggering strike.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'valok-4-feature-5',
					name: 'Valiar Tunneler',
					description: 'The miner can burrow through stone and metal. When the miner burrows, they create a stable size 2 tunnel in their wake.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-4-feature-6',
					name: 'Servok Siege Machine',
					description: 'The miner ignores difficult terrain, and their abilities deal an extra 15 damage to objects.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-4-feature-7',
					name: 'Crafted to Perfection',
					description: 'The miner’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-4-feature-8',
					name: 'Valiar Might',
					description: 'While the miner isn’t bleeding, weakened, or winded, any power roll made against them is automatically a tier 1 outcome. A critical hit still grants its additional main action.'
				})
			]
		}),
		FactoryLogic.createMonster({
			id: 'valok-5',
			name: 'Servok War Engine',
			level: 10,
			role: FactoryLogic.createMonsterRole(MonsterOrganizationType.Elite, MonsterRoleType.Brute),
			keywords: [ 'Construct', 'Multivok', 'Soulless', 'Valok' ],
			encounterValue: 48,
			size: FactoryLogic.createSize(3),
			speed: FactoryLogic.createSpeed(5),
			stamina: 260,
			stability: 8,
			freeStrikeDamage: 10,
			characteristics: FactoryLogic.createCharacteristics(5, -2, -4, -1, -5),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-5-feature-1',
						name: 'Blade Rake',
						type: FactoryLogic.type.createMain(),
						cost: 'signature',
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee(3) ],
						target: 'Two creatures or objects',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '15 damage',
									tier2: '21 damage; pull 3',
									tier3: '25 damage; pull 6'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-5-feature-2',
						name: 'Prismacore Cannon',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '22 damage',
									tier2: '29 damage; I < 4 dazed (save ends)',
									tier3: '34 damage; I < 5 dazed (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('This damage can’t be reduced in any way. This ability can’t be used again until the start of the next round.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-5-feature-3',
						name: 'Destructive Rollout',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('The war engine moves up to their speed in a straight line, automatically destroying mundane size 1 objects or walls in their path. The first time the war engine moves through a creature’s space during this movement, that creature can choose to either fall prone or take 10 damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-5-feature-4',
						name: 'Burning Oil',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 20, value2: 1, within: 1 }) ],
						target: 'Each enemy and object in the area',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target makes an **Agility test.**'),
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: Characteristic.Agility,
									tier1: '16 fire damage; the target is burning (save ends)',
									tier2: '12 fire damage; the target is burning (EoT)',
									tier3: '8 fire damage'
								})
							),
							FactoryLogic.createAbilitySectionText('A burning creature takes 1d6 fire damage at the start of each of their turns. A burning object takes 1d6 fire damage at the end of each round. Additionally, the area is burning until the end of the encounter. While the area is burning, it is difficult terrain and any enemy takes 3 fire damage for each square of the area they enter.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'valok-5-feature-5',
						name: 'Quick Blast',
						type: FactoryLogic.type.createTrigger('The target deals damage to the war engine', { free: true }),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged(20) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									bonus: 5,
									tier1: '8 damage; push 2',
									tier2: '12 damage; push 5',
									tier3: '16 damage; push 8'
								})
							),
							FactoryLogic.createAbilitySectionText('This damage can’t be reduced in any way.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'valok-5-feature-6',
					name: 'Servok Siege Machine',
					description: 'The war engine ignores difficult terrain, and their abilities deal an extra 15 damage to objects.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-5-feature-7',
					name: 'Crafted to Perfection',
					description: 'The war engine’s shape can’t be changed by any external effect.'
				}),
				FactoryLogic.feature.create({
					id: 'valok-5-feature-8',
					name: 'Valiar Might',
					description: 'While the war engine isn’t bleeding, weakened, or winded, any power roll made against them is automatically a tier 1 outcome. A critical hit still grants its additional main action.'
				})
			]
		})
	],
	addOns: []
};
