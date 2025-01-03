import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';

export const radenwight: MonsterGroup = {
	id: 'monster-group-radenwight',
	name: 'Radenwight',
	description: `
Small, agile, and hardy, radenwights have the appearance of humanoid rodents. They’re often referred to as “ratfolk,” a name they don’t particularly mind but also don’t embrace. Should anyone ask, many radenwights speak of being a ratfolk when they’re alone, but always a radenwight when part of a group. Radenwight groups proudly call themselves a “meddle,” and have a knack for appearing where others hoped they wouldn’t or whenever they are least expected. Radenwight meddles can be found in the wilderness as easily as in any city, so long as there’s suitable work and excitement to keep the members of the meddle occupied.
If radenwights’ enemies expect them to scurry away like rats, they will be painfully surprised to see the combined arrows, bodies, and blades of a meddle thrown against them all at once. Whatever radenwights do, they do it fearlessly, with deeply cherished values of bravery and fair play shining through in even the most rakish and roguish of them. Radenwights aren’t above banditry if it will support the meddle, but they greatly prefer to overwhelm, knock down, and knock out their targets rather than engage in deadly violence. They prefer weapons of precision, and look for opportunities to strike as they and their comrades create openings for one another.`,
	information: [
		{
			id: 'radenwight-info-1',
			name: 'Bonds and Bravado',
			description: 'It’s a big world out there for a bunch of small ratfolk, and radenwights learned long ago that trying to survive by running away or climbing to safety only gets you so far. Radenwights learn boldness from birth, and are taught to hurl themselves fearlessly against any challenge that stands in their way. The key to this bravery is the intense bond of trust that exists between every radenwight, their comrades, and their community, and the knowledge that every other radenwight will act just as decisively as they do. In a scrap, it’s not one radenwight’s blade or arrow that brings down the foe, but the instant and instinctual follow-up from their fellows.'
		},
		{
			id: 'radenwight-info-2',
			name: 'The Magic of Music',
			description: 'The pursuit of arcane studies is unusual among radenwights, though the community throws their support behind any child who happens to show that talent. Somewhat more common is the spontaneous discovery of magical aptitude through music, as the culture of radenwight meddles strongly emphasizes both music and dance. Radenwights are particularly drawn to flutes and panpipes, inspired by the legend of a flutist who enraptured an evil dragon while her meddle lined up a suitably sized boulder to be dropped from the cliff above.'
		},
		{
			id: 'radenwight-info-3',
			name: 'Radenwight Languages',
			description: 'Most radenwights speak Caelian and Szetch.'
		}
	],
	malice: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'radenwight-malice-1',
				name: 'Trouser Cut',
				description: 'A non-minion radenwight can use the following ability.',
				type: FactoryLogic.type.createAction(),
				keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
				distance: [ FactoryLogic.distance.createMelee() ],
				target: 'One creature',
				cost: 3,
				powerRoll: FactoryLogic.createPowerRoll({
					bonus: 2,
					tier1: '5 damage; push 3',
					tier2: '10 damage; push 3; taunted (EoT)',
					tier3: '12 damage; push 3; taunted (REA ends)'
				}),
				effect: 'If a target is wearing clothing covering the lower half of their body, they must use a maneuver to pull that clothing up before they can move.'
			})
		}),
		FactoryLogic.feature.createMalice({
			id: 'radenwight-malice-2',
			name: 'Rat Race',
			description: 'Each radenwight shifts up to their speed. Wherever a radenwight ends this movement adjacent to at least one other radenwight, they can make a melee free strike.',
			cost: 5
		}),
		FactoryLogic.feature.createMalice({
			id: 'radenwight-malice-3',
			name: 'Wall of Rats',
			description: 'A 10 wall of living rats scurrying atop one another in a coordinated manner appears in unoccupied spaces anywhere on the encounter map and lasts until the end of the encounter. The wall doesn’t block line of eﬀect for radenwights and their allies, but it does for other creatures, as the rats coordinate their movements with the radenwights. Each square of the wall has 10 Stamina. If the last radenwight in the encounter dies and the wall is still standing, the rats let out a hideous screech as they disperse. Each enemy on the encounter map must then make an Intuition resistance roll.',
			cost: 7,
			sections: [
				FactoryLogic.createPowerRoll({
					characteristic: Characteristic.Intuition,
					tier1: '10 sonic damage',
					tier2: '5 sonic damage',
					tier3: 'No effect'
				})
			]
		})
	],
	monsters: [
		{
			id: 'radenwight-1',
			name: 'Radenwight Mischiever',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Ambusher, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 1, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-1-feature-1',
						name: 'Dagger Dance',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged(5)
						],
						target: 'One creature per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'If the mischiever is hidden when they use this ability, they can target two creatures.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-1-feature-2',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The mischiever makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-2',
			name: 'Radenwight Ratagast',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Defender, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(6, 'climb'),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-2-feature-1',
						name: 'Stinky Glissando',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 poison damage',
							tier2: '4 poison damage; taunted (EoT)',
							tier3: '5 poison damage; taunted (EoT)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-2-feature-2',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The ratagast makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-3',
			name: 'Radenwight Swiftpaw',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 1, 0, -1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-3-feature-1',
						name: 'Rapier Flunge',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage; slide 1; the swiftpaw can shift 1 square',
							tier2: '4 damage; slide 2; the swiftpaw can shift 2 squares',
							tier3: '5 damage; slide 3; the swiftpaw can shift 3 squares'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-3-feature-2',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The swiftpaw makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-4',
			name: 'Radenwight Redeye',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Artillery, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-4-feature-1',
						name: 'Eyes-On-Me Shot',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'One creature or object per minion',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'An ally of the redeye within 2 squares of the target can shift up to 2 squares.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-4-feature-2',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The redeye makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-5',
			name: 'Radenwight Bruxer',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 1, -1, 0, 0),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-5-feature-1',
						name: 'Lockjaw',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '5 damage',
							tier2: '9 damage; grabbed',
							tier3: '12 damage; grabbed'
						}),
						effect: 'While the target is grabbed, they take 2 damage at the start of each of the bruxer’s turns.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-5-feature-2',
						name: 'Flurry of Bites',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy',
						cost: 3,
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '4 damage',
							tier2: '8 damage',
							tier3: '10 damage; bleeding (EoT)'
						})
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-5-feature-3',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The bruxer makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-6',
			name: 'Radenwight Piper',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 1, 1),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-6-feature-1',
						name: 'Piercing Trill',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [
							FactoryLogic.distance.createMelee(),
							FactoryLogic.distance.createRanged()
						],
						target: 'One creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '3 sonic damage; push 1',
							tier2: '5 sonic damage; push 3',
							tier3: '7 sonic damage; push 4'
						}),
						effect: 'The piper or an ally within distance regains Stamina equal to half the damage dealt.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-6-feature-2',
						name: 'Vivace Vivace!',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally',
						cost: 3,
						effect: 'Each target who has used their Ready Rodent ability since their last turn regains the use of their triggered action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-6-feature-3',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The piper makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-7',
			name: 'Radenwight Ratcrobat',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(7, 'climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 0, 1),
			features: [
				FactoryLogic.feature.create({
					id: 'radenwight-7-feature-1',
					name: 'Gymratstics',
					description: 'The ratcrobat gains an edge on attacks against larger creatures.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-7-feature-2',
						name: 'En Garde!',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Two creatures or objects',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'The ratcrobat can shift up to 2 squares after attacking the first target, then can shift 1 square after attacking the second target.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-7-feature-3',
						name: 'Over Here, Thanks',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						effect: 'Slide 1; the ratcrobat can then shift into the square the target left.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-7-feature-4',
						name: 'Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						effect: 'The ratcrobat makes a free strike against the target.'
					})
				})
			]
		},
		{
			id: 'radenwight-8',
			name: 'Radenwight Maestro',
			description: '',
			level: 1,
			role: FactoryLogic.createMonsterRole(MonsterRoleType.Leader),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 12,
			size: FactoryLogic.createSize(1, 'S'),
			speed: FactoryLogic.createSpeed(5, 'climb'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, 2),
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-1',
						name: 'Cacophony',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 sonic damage; slide 1; the maestro can shift 1 square',
							tier2: '5 sonic damage; slide 3; the maestro can shift 3 squares',
							tier3: '7 sonic damage; slide 5; the maestro can shift 5 squares'
						}),
						effect: 'Each of the maestro’s allies can use Ready Rodent as a free triggered action once before the end of the round.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-2',
						name: 'Tempo Change',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Resistance ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'Two enemies',
						powerRoll: FactoryLogic.createPowerRoll({
							bonus: 3,
							tier1: 'P<1 slowed (save ends)',
							tier2: 'P<2 slowed (save ends)',
							tier3: 'P<3 slowed (save ends)'
						}),
						spend: [
							{
								value: 5,
								effect: 'Each ally of the maestro within distance has their speed increased by 2 until the end of their next turn.'
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-3',
						name: 'Ranged Ready Rodent',
						type: FactoryLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'One creature',
						effect: 'The maestro makes a free strike against the target.'
					})
				}),
				FactoryLogic.feature.create({
					id: 'radenwight-8-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the maestro can take 5 damage to end one EoE effect affecting them. This damage can’t be reduced in any way.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-5',
						name: 'Overture',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'Each Ally',
						effect: 'Each target shifts up to their speed or takes the Defend action.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-6',
						name: 'Solo Act',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(15) ],
						target: 'One creature',
						effect: 'Until the end of their next turn, the target’s Stamina can’t be reduced below 1, their speed is doubled, and their next power roll is automatically a tier 3 result.'
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'radenwight-8-feature-7',
						name: 'Rondo of Rat',
						type: FactoryLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each dead ally',
						effect: 'Each target stands, makes a free strike, then collapses again. Allies of the targets can use Ready Rodent as a free triggered action once in conjunction with these free strikes.'
					})
				})
			]
		}
	]
};
