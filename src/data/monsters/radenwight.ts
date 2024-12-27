import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureLogic } from '../../logic/feature-logic';
import { MonsterGroup } from '../../models/monster';
import { MonsterLogic } from '../../logic/monster-logic';
import { MonsterRoleType } from '../../enums/monster-role-type';
import { PowerRollType } from '../../enums/power-roll-type';

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
		FeatureLogic.feature.createAbilityFeature({
			ability: AbilityLogic.createAbility({
				id: 'radenwight-malice-1',
				name: 'Trouser Cut (3pts)',
				description: 'A non-minion radenwight can use the following ability.',
				type: AbilityLogic.type.createAction(),
				keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
				distance: [ AbilityLogic.distance.createMelee(1) ],
				target: 'One creature',
				cost: 3,
				powerRoll: AbilityLogic.createPowerRoll({
					bonus: 2,
					tier1: '5 damage; push 3',
					tier2: '10 damage; push 3; taunted (EoT)',
					tier3: '12 damage; push 3; taunted (REA ends)'
				}),
				effect: 'If a target is wearing clothing covering the lower half of their body, they must use a maneuver to pull that clothing up before they can move.'
			})
		}),
		FeatureLogic.feature.createFeature({
			id: 'radenwight-malice-2',
			name: 'Rat Race (5pts)',
			description: 'Each radenwight shifts up to their speed. Wherever a radenwight ends this movement adjacent to at least one other radenwight, they can make a melee free strike.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'radenwight-malice-3',
			name: 'Wall of Rats (7pts)',
			description: `
A 10 wall of living rats scurrying atop one another in a coordinated manner appears in unoccupied spaces anywhere on the encounter map and lasts until the end of the encounter. The wall doesn’t block line of eﬀect for radenwights and their allies, but it does for other creatures, as the rats coordinate their movements with the radenwights. Each square of the wall has 10 Stamina. If the last radenwight in the encounter dies and the wall is still standing, the rats let out a hideous screech as they disperse. Each enemy on the encounter map must then make an Intuition resistance roll.

| Roll    | Effect                                                                                                                                                           |
|:--------|:----------------|
| 11 -    | 10 sonic damage |
| 12 - 16 | 5 sonic damage  |
| 17 +    | No effect       |`
		})
	],
	monsters: [
		{
			id: 'radenwight-1',
			name: 'Radenwight Mischiever',
			description: '',
			level: 1,
			role: MonsterLogic.createRole(MonsterRoleType.Ambusher, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(7, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 1, 0),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-1-feature-1',
						name: 'Dagger Dance',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							AbilityLogic.distance.createMelee(1),
							AbilityLogic.distance.createRanged(5)
						],
						target: 'One creature per minion',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'If the mischiever is hidden when they use this ability, they can target two creatures.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-1-feature-2',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Defender, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(6, 'climb'),
			stamina: 12,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 0, 1),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-2-feature-1',
						name: 'Stinky Glissando',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 poison damage',
							tier2: '4 poison damage; taunted (EoT)',
							tier3: '5 poison damage; taunted (EoT)'
						})
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-2-feature-2',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Harrier, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(7, 'climb'),
			stamina: 10,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 1, 1, 0, -1),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-3-feature-1',
						name: 'Rapier Flunge',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
						target: 'One creature or object per minion',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage; slide 1; the swiftpaw can shift 1 square',
							tier2: '4 damage; slide 2; the swiftpaw can shift 2 squares',
							tier3: '5 damage; slide 3; the swiftpaw can shift 3 squares'
						})
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-3-feature-2',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Artillery, true),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(5, 'climb'),
			stamina: 8,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(1, 1, -1, 0, 0),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-4-feature-1',
						name: 'Eyes-On-Me Shot',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: 'One creature or object per minion',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'An ally of the redeye within 2 squares of the target can shift up to 2 squares.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-4-feature-2',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Brute),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(5, 'climb'),
			stamina: 40,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(1, 1, -1, 0, 0),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-5-feature-1',
						name: 'Lockjaw',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
						target: 'One creature or object',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '5 damage',
							tier2: '9 damage; grabbed',
							tier3: '12 damage; grabbed'
						}),
						effect: 'While the target is grabbed, they take 2 damage at the start of each of the bruxer’s turns.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-5-feature-2',
						name: 'Flurry of Bites',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
						target: 'Each enemy',
						cost: 3,
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '4 damage',
							tier2: '8 damage',
							tier3: '10 damage; bleeding (EoT)'
						})
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-5-feature-3',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Support),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(5, 'climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 2,
			characteristics: MonsterLogic.createCharacteristics(0, 0, 0, 1, 1),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-6-feature-1',
						name: 'Piercing Trill',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [
							AbilityLogic.distance.createMelee(1),
							AbilityLogic.distance.createRanged(10)
						],
						target: 'One creature or object',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '3 sonic damage; push 1',
							tier2: '5 sonic damage; push 3',
							tier3: '7 sonic damage; push 4'
						}),
						effect: 'The piper or an ally within distance regains Stamina equal to half the damage dealt.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-6-feature-2',
						name: 'Vivace Vivace!',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each ally',
						cost: 3,
						effect: 'Each target who has used their Ready Rodent ability since their last turn regains the use of their triggered action.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-6-feature-3',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Harrier),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 6,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(7, 'climb'),
			stamina: 30,
			stability: 0,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(-1, 1, 0, 0, 1),
			features: [
				FeatureLogic.feature.createFeature({
					id: 'radenwight-7-feature-1',
					name: 'Gymratstics',
					description: 'The ratcrobat gains an edge on attacks against larger creatures.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-7-feature-2',
						name: 'En Garde!',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
						target: 'Two creatures or objects',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 1,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '6 damage'
						}),
						effect: 'The ratcrobat can shift up to 2 squares after attacking the first target, then can shift 1 square after attacking the second target.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-7-feature-3',
						name: 'Over Here, Thanks',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
						target: 'One enemy',
						effect: 'Slide 1; the ratcrobat can then shift into the square the target left.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-7-feature-4',
						name: 'Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ AbilityLogic.distance.createMelee(1) ],
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
			role: MonsterLogic.createRole(MonsterRoleType.Leader),
			keywords: [ 'Humanoid', 'Radenwight' ],
			encounterValue: 12,
			size: MonsterLogic.createSize(1, 'S'),
			speed: MonsterLogic.createSpeed(5, 'climb'),
			stamina: 80,
			stability: 1,
			freeStrikeDamage: 5,
			characteristics: MonsterLogic.createCharacteristics(-2, 2, 0, 0, 2),
			features: [
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-1',
						name: 'Cacophony',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
						target: 'Each enemy',
						powerRoll: AbilityLogic.createPowerRoll({
							bonus: 2,
							tier1: '3 sonic damage; slide 1; the maestro can shift 1 square',
							tier2: '5 sonic damage; slide 3; the maestro can shift 3 squares',
							tier3: '7 sonic damage; slide 5; the maestro can shift 5 squares'
						}),
						effect: 'Each of the maestro’s allies can use Ready Rodent as a free triggered action once before the end of the round.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-2',
						name: 'Tempo Change',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Resistance ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: 'Two enemies',
						powerRoll: AbilityLogic.createPowerRoll({
							type: PowerRollType.Resistance,
							characteristic: [ Characteristic.Presence ],
							tier1: 'Slowed (MGT ends)',
							tier2: 'Slowed (EoT)',
							tier3: 'No effect'
						}),
						spend: [
							{
								value: 5,
								effect: 'Each ally of the maestro within distance has their speed increased by 2 until the end of their next turn.'
							}
						]
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-3',
						name: 'Ranged Ready Rodent',
						type: AbilityLogic.type.createTrigger('An ally deals damage to the target.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: 'One creature',
						effect: 'The maestro makes a free strike against the target.'
					})
				}),
				FeatureLogic.feature.createFeature({
					id: 'radenwight-8-feature-4',
					name: 'End Effect',
					description: 'At the end of their turn, the maestro can take 5 damage to end one EoE effect affecting them. This damage can’t be reduced in any way.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-5',
						name: 'Overture',
						type: AbilityLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ AbilityLogic.distance.createRanged(15) ],
						target: 'Each Ally',
						effect: 'Each target shifts up to their speed or takes the Defend action.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-6',
						name: 'Solo Act',
						type: AbilityLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(15) ],
						target: 'One creature',
						effect: 'Until the end of their next turn, the target’s Stamina can’t be reduced below 1, their speed is doubled, and their next power roll is automatically a tier 3 result.'
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'radenwight-8-feature-7',
						name: 'Rondo of Rat',
						type: AbilityLogic.type.createVillainAction(),
						keywords: [ AbilityKeyword.Area ],
						distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 10 }) ],
						target: 'Each dead ally',
						effect: 'Each target stands, makes a free strike, then collapses again. Allies of the targets can use Ready Rodent as a free triggered action once in conjunction with these free strikes.'
					})
				})
			]
		}
	]
};
