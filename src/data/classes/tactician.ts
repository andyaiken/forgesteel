import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const tactician: HeroClass = {
	id: 'class-tactician',
	name: 'Tactician',
	description: `
Strategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.

As a tactician, you have abilities that heal your allies and grant them increased damage, movement, and attacks.`,
	heroicResource: 'Focus',
	subclassName: 'Tactical Doctrine',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'tatician-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'tactician-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FactoryLogic.feature.createSkill({
					id: 'tactician-1-1',
					skill: 'Lead'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-1-2',
					options: [ 'Alertness', 'Architecture', 'Blacksmithing', 'Brag', 'Culture', 'Empathize', 'Fletching', 'Mechanics', 'Monsters', 'Search', 'Strategy' ],
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FactoryLogic.feature.create({
					id: 'tactician-1-3',
					name: 'Focus',
					description: 'At the start of each of your turns during combat, you gain 2 focus. The first time each round that you or an ally damages a target you have marked, you gain 1 focus. The first time in a round that an ally within 10 squares of you uses a heroic ability, you gain 1 focus.'
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'tactician-1-4',
					name: 'Field Arsenal',
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-1-5',
						name: 'Mark',
						description: 'You draw your allies’ attention to a specific foe - with devastating effect.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						effect: `
The target is marked by you until the end of the encounter, you die, you use this ability again, or you willingly end this effect (no action required). If another tactician marks the target, then your mark on the target ends. You can have one target marked this way, but other tactician abilities can allow you to have multiple marked creatures.

While the target is marked and within your line of effect, you and allies within your line of effect have an edge on power rolls made against the target.

When the marked creature is reduced to 0 Stamina, you can use a free triggered action to move the mark to a new target within 10 squares.

In addition, you can spend 1 focus to take one of the following free triggered actions whenever you or an ally damages a target with an ability. You can’t use more than one instance of a benefit per trigger:

* The ability deals additional damage equal to twice your Reason score.
* The damage dealer can spend a Recovery.
* The damage dealer can shift up to a number of squares equal to your Reason score.`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-1-6',
						name: 'Strike Now!',
						description: 'Your foe left an opening. You point this out to an ally!',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 ally',
						effect: 'The target can make a signature attack as a free triggered action.',
						spend: [
							{
								value: 5,
								effect: 'You target two allies instead of one.'
							}
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-1-7',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-1-8',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'tactician-2-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-3-1',
						name: 'Out of Position',
						description: 'You are prepared for all eventualities.',
						type: FactoryLogic.type.createTrigger('At the start of an encounter', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'You use your Mark ability against an enemy you have line of effect to, even if you are surprised. You can then immediately slide the marked target up to 3 squares, ignoring their stability. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.'
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'tactician-ability-1',
			name: 'Battle Cry',
			description: 'You shout a phrase that galvanizes your team.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Three allies',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Reason ],
				tier1: 'the target gains one surge',
				tier2: 'the target gains two surges',
				tier3: 'the target gains three surges'
			})
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-2',
			name: 'Concussive Strike',
			description: 'Your precise strike leaves your foe struggling to respond.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage; M < [weak], dazed (save ends)',
				tier2: '5 + M damage; M < [average], dazed (save ends)',
				tier3: '8 + M damage; M < [strong], dazed (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-3',
			name: 'Inspiring Strike',
			description: 'Your attack gives an ally hope.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage; you or one ally within 10 squares can spend a Recovery',
				tier2: '5 + M damage; you or one ally within 10 squares can spend a Recovery',
				tier3: '8 + M damage; you or one ally within 10 squares can spend a Recovery, and each of you gains an edge on the next ability power roll they make in the encounter'
			})
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-4',
			name: 'Squad! Forward!',
			description: 'On your command, you and your allies force back the enemy line.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self and two allies',
			cost: 3,
			effect: 'Each target can move their speed.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-5',
			name: 'Hammer And Anvil',
			description: '“Let’s not argue about who’s the hammer and who’s the anvil!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '5 + M damage; one ally within 10 squares can make a signature strike against the target as a free triggered action',
				tier2: '9 + M damage; one ally within 10 squares can make a signature strike that gains an edge against the target as a free triggered action',
				tier3: '12 + M damage; two allies within 10 squares can each make a signature strike that gains an edge against the target as free triggered actions'
			}),
			effect: 'If the target is reduced to 0 Stamina and a strike granted by this ability hasn’t been made, the striker can pick a different target.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-6',
			name: 'The Mind Game',
			description: 'Your attack demoralizes your foe. Your allies begin to think you can win.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 5,
			preEffect: 'You mark the target.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '4 + M damage; R < [weak], weakened (save ends)',
				tier2: '6 + M damage; R < [average], weakened (save ends)',
				tier3: '10 + M damage; R < [strong], weakened (save ends)'
			}),
			effect: 'The first time any ally deals damage any target you’ve marked before the start of your next turn, that ally can spend a Recovery.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-7',
			name: 'Now!',
			description: 'Your allies wait for your command - then unleash death!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'Three allies',
			cost: 5,
			effect: 'Each target can make a free strike.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-8',
			name: 'This Is What We Planned For',
			description: 'All those coordination drills you made them do finally pay off.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '2 allies',
			cost: 5,
			effect: 'Each target who hasn’t acted yet this round can take their turn in any order immediately after yours.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-9',
			name: 'Double Envelopment',
			description: 'Historians will write about this day.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, they gain two surges, which they can use immediately.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-10',
			name: 'Frontal Assault',
			description: 'The purpose of a charge is to break their morale and force a retreat.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage a target marked by you, the damage dealer can push the target up to 2 squares, then shift up to 2 squares. Additionally, any ally using the Charge action to attack a target marked by you can use a signature or heroic ability in place of a melee free strike.'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-11',
			name: 'Rout',
			description: 'The tide begins to turn.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, if that target has R < [average], they are frightened of the damage dealer (save ends).'
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-12',
			name: 'Stay [strong], and Focus',
			description: 'We can do this! Keep faith and hold fast!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, the damage dealer can spend a Recovery.'
		})
	],
	subclasses: [
		{
			id: 'tactician-sub-1',
			name: 'Insurgent',
			description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. By contrast, you’ll do whatever it takes to keep your allies alive.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'tactician-sub-1-1-1',
							listOptions: [ SkillList.Intrigue ]
						}),
						FactoryLogic.feature.create({
							id: 'tactician-sub-1-1-2',
							name: 'Covert Operations',
							description: 'While in your presence or working according to your plans, each of your allies gains an edge on tests with any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist on any test made with a skill from the intrigue group. At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of negotiation.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'tactician-sub-1-1-3',
								name: 'Advanced Tactics',
								description: 'Your leadership aids an ally.',
								type: FactoryLogic.type.createTrigger('The target deals damage to another creature.'),
								keywords: [ AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'Any creature',
								effect: 'The target gains two surges, which they can use on the triggering damage.',
								spend: [
									{
										value: 1,
										effect: 'If any effect of the damage has a potency effect, you increase the potency by 1.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'tactician-sub-1-2-1',
							name: 'Infiltration Tactics',
							description: 'You have trained your squad to work together and benefit from staying silent and waiting for the opportune time to strike. When you or any of your allies within 10 squares of you becomes hidden, they gain a surge.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'tactician-sub-1-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-1-2-2a',
											name: 'Fog of War',
											description: 'Your unorthodox strategy causes enemies to lash out in fear, heedless of who they might be attacking.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '2 creatures',
											cost: 5,
											effect: `
Each target is marked by you. You immediately force each targeted creature to make a free strike against a creature of your choice within 5 squares of the targeted creature.

**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target, you can spend 2 focus to make the marked target free strike a creature of your choice within 5 squares of the marked target.`
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-1-2-2b',
											name: 'Try Me Instead',
											description: '“Try picking on someone MY size.”',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: '1 creature',
											cost: 5,
											preEffect: 'You shift your speed directly toward an ally adjacent to the target, then swap locations with the ally as long as you can each fit into the other’s space. The ally can spend a Recovery, and you make a power roll against the target.',
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '2 + R damage; R < [weak], frightened (save ends)',
												tier2: '3 + R damage; R < [average], frightened (save ends)',
												tier3: '4 + R damage; R < [strong], frightened (save ends)'
											})
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'tactician-sub-2',
			name: 'Mastermind',
			description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board, and seeking victory by thinking multiple steps ahead of your opponents.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'tactician-sub-2-1-1',
							listOptions: [ SkillList.Lore ]
						}),
						FactoryLogic.feature.create({
							id: 'tactician-sub-2-1-2',
							name: 'Studied Commander',
							description: `
Your encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are with them, any hero treats the Discover Lore project related to a war or battle as one category cheaper. This makes projects seeking common lore free, but such projects still require a respite activity to complete.

Additionally, if you have a reasonable amount of time before a combat encounter or negotiation, and you have at least one clue or rumor regarding the encounter or negotiation, you can make a Reason test as a Respite activity.

The following test results apply to a combat encounter:

| Roll    | Effect                                                                          |
|:--------|:--------------------------------------------------------------------------------|
| 11 -    | The Director tells you the number of creatures in the encounter.                |
| 12 - 16 | The Director tells you the number and level of the creatures in the encounter.  |
| 17 +    | As 12-16, and when the encounter begins, all enemies are surprised.             |

The following test results apply to a negotiation:

| Roll    | Effect                                                                                                                        |
|:--------|:------------------------------------------------------------------------------------------------------------------------------|
| 11 -    | The Director tells you three different motivations, one of which is one of an NPC’s motivations, while the other two are not. |
| 12 - 16 | The Director tells you one of an NPC’s motivations.                                                                           |
| 17 +    | As 12-16, and you and each of your allies gains an edge on tests made to influence NPCs during the negotiation.               |

You can only make this test once for each encounter and negotiation.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'tactician-sub-2-1-3',
								name: 'Overwatch',
								description: 'Under your direction, an ally waits for just the right moment to strike.',
								type: FactoryLogic.type.createTrigger('The target moves.'),
								keywords: [ AbilityKeyword.Ranged ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: '1 enemy',
								effect: 'At any point during the target’s movement, one ally can make a free strike against them.',
								spend: [
									{
										value: 1,
										effect: 'If the target has R < [average], they are also slowed (EoT).'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'tactician-sub-2-2-1',
								name: 'Goaded',
								description: 'You have learned to leverage the psychology of your marked foes and goad them into acting before they are tactically ready.',
								type: FactoryLogic.type.createTrigger('A creature marked by you uses a strike that targets you or an ally.', { free: true }),
								keywords: [],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You retarget the attack to you or another one of your allies or yourself. The new target must be a valid option for the strike.'
							})
						}),
						FactoryLogic.feature.createChoice({
							id: 'tactician-sub-2-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-2-2-2a',
											name: 'I\'ve Got Your Back',
											description: 'Your enemy will think twice about attacking your friend.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '2 + R damage; R < [weak], the target is frightened of an ally of your choice within range (save ends)',
												tier2: '3 + R damage; R < [average], the target is frightened of an ally of your choice within range (save ends)',
												tier3: '5 + R damage; R < [strong], the target is frightened of an ally of your choice within range (save ends)'
											}),
											effect: 'One ally adjacent to the target can spend a Recovery.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-2-2-2b',
											name: 'Their Tactics Are So Primitive',
											description: 'All that time you spent studying ancient battles paid off!',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: '2 creatures',
											cost: 5,
											effect: `
Each target is marked by you. You gain two surges.

**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target with a strike, you can spend 2 focus to add one additional target to the strike within the attack’s range.`
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'tactician-sub-3',
			name: 'Vanguard',
			description: 'You have learned the tactics and stratagems of the heroes of ancient history, letting you lead from the front lines of battle and seek victory through sheer force of will and personality.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'tactician-sub-3-1-1',
							listOptions: [ SkillList.Interpersonal ]
						}),
						FactoryLogic.feature.create({
							id: 'tactician-sub-3-1-2',
							name: 'Commanding Presence',
							description: 'You command any room you walk into. While you are present, each hero with you is treated as having a Renown 2 higher than usual for the purpose of negotiations. Additionally, each hero with you has a double edge on tests made to stop combat and start a negotiation with the other side.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'tactician-sub-3-1-3',
								name: 'Parry',
								description: 'Your quick reflexes cost an enemy the precision they seek.',
								type: FactoryLogic.type.createTrigger('A creature deals damage to the target.'),
								keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'Self or 1 ally',
								effect: 'The damage is halved. If any effect of the damage has a potency effect, you decrease the potency by 1.',
								spend: [
									{
										value: 1,
										effect: 'The target can shift a number of squares equal to your Reason score.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'tactician-sub-3-2-1',
							name: 'Melee Superiority',
							description: `
After constant drills you have improved your ability to anticipate an enemy’s attack and thwart their attempts to move freely across the battlefield. Whenever you make an opportunity attack, the target’s speed is reduced to 0 until the end of the current turn.

**Mark Benefit**: You can spend 2 focus to make a melee free strike against a marked creature who attempts to move or Disengage within distance of your melee free strike as a free triggered action. If you do, the target’s speed is reduced to 0 until the end of the current turn.`
						}),
						FactoryLogic.feature.createChoice({
							id: 'tactician-sub-3-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-3-2-2a',
											name: 'No Dying On My Watch',
											description: 'You prioritize saving an ally over your own safety.',
											type: FactoryLogic.type.createTrigger('The target deals damage to an ally.'),
											keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createRanged(5) ],
											target: '1 enemy',
											cost: 5,
											preEffect: 'You move up to your speed toward the target, ending your move in the nearest square adjacent to them if you can. The triggering ally can spend a Recovery, and gains 5 Temporary Stamina for each enemy you move past while moving to the target. You then make a power roll against the target.',
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: 'R < [weak], frightened of the triggering ally (save ends)',
												tier2: ' R < [average], frightened of the triggering ally (save ends)',
												tier3: 'R < [strong], frightened of the triggering ally (save ends)'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'tactician-sub-3-2-2b',
											name: 'Squad! On Me!',
											description: 'Together we are invincible!',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Area ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
											target: 'Self and each ally in the area',
											cost: 5,
											effect: 'Until the start of your next turn, each target gains a bonus to their Stability equal to your Might score. Additionally, each target gains two surges.'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
