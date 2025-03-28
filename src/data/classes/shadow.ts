import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const shadow: HeroClass = {
	id: 'class-shadow',
	name: 'Shadow',
	description: `
Subtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemies’ weaknesses.

As a shadow, you have abilities that deal a lot of damage, let you move swiftly across the battlefield and away from hazards, and allow you to fade from notice even in the middle of the most heated combat encounter. You also possess more skills than any other hero.`,
	heroicResource: 'Insight',
	subclassName: 'Shadow College',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Agility ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'shadow-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'shadow-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkill({
					id: 'shadow-1-1',
					skill: 'Hide'
				}),
				FactoryLogic.feature.createSkill({
					id: 'shadow-1-2',
					skill: 'Sneak'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-1-3',
					options: [ 'Criminal Underworld' ],
					listOptions: [ SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue ],
					count: 5
				}),
				FactoryLogic.feature.create({
					id: 'shadow-1-4',
					name: 'Insight',
					description: `
At the start of each of your turns during combat, you gain 1d3 insight. The first time each round that you deal damage with at least one surge, you gain 1 insight.

When you use a heroic ability that has a power roll, that ability costs 1 less insight if you have an edge or double edge on it. If the ability has multiple targets, the cost is reduced even if the ability has an edge or double edge against only one target.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-1-5',
						name: 'Hesitation Is Weakness',
						description: 'Keep up the attack. Never give them a moment’s grace.',
						type: FactoryLogic.type.createTrigger('Another hero ends their turn. That hero can’t have used this ability to start their turn.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						effect: 'You take your turn after the triggering hero.'
					})
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'shadow-1-5.5'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-6',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-7',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-1-8',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'shadow-2-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-3-1',
						name: 'Careful Observation',
						description: 'A moment of focus leaves a foe firmly in your sights.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSpecial('20 squares') ],
						target: '1 creature',
						effect: 'As long as you remain within distance of the target, maintain line of effect to them, and strike no other creature first, you gain a surge and an edge on the next strike you make against the assessed creature.'
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'shadow-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'shadow-ability-1',
			name: 'Gasping in Pain',
			description: 'Your precise strikes let your allies take advantage of a target’s agony.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 + A damage',
				tier2: '5 + A damage',
				tier3: '8 + A damage; I < [strong], prone'
			}),
			effect: 'An ally of your choice within 5 squares of the target gains a surge.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-2',
			name: 'I Work Better Alone',
			description: 'It’s better, just you and me. Isn’t it?',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 + A damage',
				tier2: '6 + A damage',
				tier3: '9 + A damage'
			}),
			effect: 'If the target has no allies adjacent to them, this strike deals extra damage equal to your Agility score.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-3',
			name: 'Teamwork Has Its Place',
			description: 'You attack an enemy, distracting them long enough for an ally to stab them.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 + A damage',
				tier2: '6 + A damage',
				tier3: '9 + A damage'
			}),
			effect: 'If an ally is adjacent to the target, the target takes extra damage equal to your Agility score.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-4',
			name: 'You Were Watching The Wrong One',
			description: 'They can’t watch both of you at once.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 + A damage',
				tier2: '5 + A damage',
				tier3: '8 + A damage'
			}),
			effect: 'As long as you have at least one ally within 5 squares of the target, you gain a surge. If you are flanking the target when you use this ability, choose one ally who is flanking with you. That ally also gain a surge.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-5',
			name: 'Disorienting Strike',
			description: 'Your attack leaves them reeling, allowing you to follow up.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; slide 2',
				tier2: '6 + A damage; slide 3',
				tier3: '10 + A damage; slide 5'
			}),
			effect: 'You can shift into any square the target leaves when you slide them.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-6',
			name: 'Eviscerate',
			description: 'You leave your foe bleeding out after a devastating attack.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; A < [weak], bleeding (save ends)',
				tier2: '6 + A damage; A < [average], bleeding (save ends)',
				tier3: '10 + A damage; A < [strong], bleeding (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-7',
			name: 'Get In Get Out',
			description: 'Move unexpectedly, strike fast, and be gone!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '5 + A damage',
				tier2: '8 + A damage',
				tier3: '11 + A damage'
			}),
			effect: 'You can shift up to your speed, dividing that movement before or after your strike as desired.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-8',
			name: 'Two Throats At Once',
			description: 'A bargain.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '2 creatures or objects',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 damage',
				tier2: '6 damage',
				tier3: '10 damage'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-9',
			name: 'Coup de Grace',
			description: 'Your blade might be the last thing they see.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '1d6 + 7 + A damage',
				tier2: '1d6 + 11 + A damage',
				tier3: '1d6 + 16 + A damage'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-10',
			name: 'One Hundred Throats',
			description: 'As you move across the battlefield, every foe within reach feels your wrath.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			preEffect: 'You shift up to your speed. You make one power roll that targets up to three enemies, each of who became adjacent to you during the move.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '6 damage',
				tier3: '9 + A damage'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-11',
			name: 'Set-Up',
			description: 'Your friends will thank you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: '1 creature',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 + A damage; R < [weak], the target has damage weakness 5 (save ends)',
				tier2: '9 + A damage; R < [average], the target has damage weakness 5 (save ends)',
				tier3: '13 + A damage; R < [strong], the target has damage weakness 5 (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-12',
			name: 'Shadowstrike',
			description: 'They have no idea what the college taught you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'You make two signature strikes.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-13',
			name: 'Dancer',
			description: 'You enter a flow state that makes you nearly impossible to pin down.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter, whenever an enemy moves adjacent to you or damages you, you can take the Disengage move action as a free triggered action.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-14',
			name: 'Misdirecting Strike',
			description: 'Why are you looking at ME?!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '9 + A damage',
				tier2: '13 + A damage',
				tier3: '18 + A damage'
			}),
			effect: 'The target is taunted by a willing ally within 5 squares of you until the end of the target’s next turn.'
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-15',
			name: 'Pinning Shot',
			description: 'One missile - placed well and placed hard.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: '1 creature',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '8 + A damage; A < [weak], restrained (save ends)',
				tier2: '12 + A damage; A < [average], restrained (save ends)',
				tier3: '16 + A damage; A < [strong], restrained (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'shadow-ability-16',
			name: 'Staggering Blow',
			description: 'There’s no recovering from this.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '7 + A damage; M < [weak], slowed (save ends)',
				tier2: '11 + A damage; M < [average], prone and can’t stand (save ends)',
				tier3: '16 + A damage; M < [strong], prone and can’t stand (save ends)'
			})
		})
	],
	subclasses: [
		{
			id: 'shadow-sub-1',
			name: 'College of Black Ash',
			description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'shadow-sub-1-1-1',
							skill: 'Magic'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-1-1-2',
								name: 'Black Ash Teleport',
								description: 'In a swirl of black ash, you step from one place to another.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you hide using this maneuver, you gain a surge.',
								spend: [
									{
										value: 1,
										repeatable: true,
										effect: 'You teleport 1 additional square for each insight spent.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-1-1-3',
								name: 'In All This Confusion',
								description: 'You vanish in a plume of black smoke to avoid danger.',
								type: FactoryLogic.type.createTrigger('You take damage.'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.',
								spend: [
									{
										value: 1,
										repeatable: true,
										effect: 'You teleport 1 additional square for each insight spent.'
									}
								]
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'shadow-sub-1-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-1-2-1a',
											name: 'In a Puff of Ash',
											description: 'You enchant a strike with your teleportation magic.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [
												FactoryLogic.distance.createMelee(),
												FactoryLogic.distance.createRanged(5)
											],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '6 + A damage; you can teleport the target 1 square',
												tier2: '10 + A damage; you can teleport the target up to 3 squares',
												tier3: '14 + A damage; you can teleport the target up to 5 squares'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-1-2-1b',
											name: 'Too Slow',
											description: 'Your foe made a big mistake.',
											type: FactoryLogic.type.createTrigger('You use your In All This Confusion ability.', { free: true }),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											effect: 'You avoid any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.'
										})
									}),
									value: 1
								}
							]
						}),
						FactoryLogic.feature.create({
							id: 'shadow-sub-1-2-2',
							name: 'Burning Ash',
							description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Reason score.'
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
			id: 'shadow-sub-2',
			name: 'College of Caustic Alchemy',
			description: 'The College of Caustic Alchemy teaches its students recipes for the acids, bombs, and poisons used in their grim work. Graduates of the college are exceptional assassins.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'shadow-sub-2-1-1',
							skill: 'Alchemy'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-2-1-2',
								name: 'Coat The Blade',
								description: 'Just a little poison goes a long way.',
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You gain two surges. Whenever you use a surge before the end of the encounter, you can choose to have its damage be poison damage.',
								spend: [
									{
										value: 1,
										repeatable: true,
										effect: 'For each insight you spend, you gain an additional surge.'
									}
								]
							})
						}),
						FactoryLogic.feature.create({
							id: 'shadow-sub-2-1-3',
							name: 'Smoke Bomb',
							description: 'You always carry a supply of smoke bombs to make it easy for you to distract and get away from foes. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are hidden.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-2-1-4',
								name: 'Defensive Roll',
								description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
								type: FactoryLogic.type.createTrigger('Another creature damages you.'),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You halve the damage against the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.',
								spend: [
									{
										value: 1,
										effect: 'You reduce the potency of any effect associated with the damage for you by 1.'
									}
								]

							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'shadow-sub-2-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-2-2-1a',
											name: 'Sticky Bomb',
											description: 'Explosives are best when they’re attached to an enemy.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.createRanged(10) ],
											target: '1 creature',
											cost: 5,
											preEffect: 'You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can remove it as an action, disarming the bomb. At the end of your next turn, the bomb detonates. You can also detonate it earlier (no action required). When the bomb detonates, you make a power roll targeting each enemy within 3 squares of it.',
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '4 + A fire damage',
												tier2: '7 + A fire damage',
												tier3: '11 + A fire damage'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-2-2-1b',
											name: 'Stink Bomb',
											description: 'Yellow, disgusting gas explodes from a bomb you toss.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
											target: 'Each creature in the area',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '2 poison damage',
												tier2: '5 poison damage',
												tier3: '7 poison damage'
											}),
											effect: 'The gas remains in the area until the end of the encounter. Any creature who has M < average and starts their turn in the area is weakened (save ends).'
										})
									}),
									value: 1
								}
							]
						}),
						FactoryLogic.feature.create({
							id: 'shadow-sub-2-2-2',
							name: 'Trained Assassin',
							description: 'You know just where to cut your enemies. Whenever you make a strike with at least one surge and no banes, the strike gains an extra surge which you must use on that strike.'
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
			id: 'shadow-sub-3',
			name: 'College of the Harlequin Mask',
			description: 'Graduates of the College of the Harlequin Mask learn illusion magic, which they use to infiltrate enemy strongholds and create orchestrated chaos in combat.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'shadow-sub-3-1-1',
							skill: 'Lie'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-3-1-2',
								name: 'I’m No Threat',
								description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
								type: FactoryLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: `
When you use this ability, you cover yourself in an illusion that causes you to appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic, unarmed, and capable version of yourself. While this illusion lasts, your strikes made against other creatures gain an edge. If you use this ability in combat, you gain a surge when you use it.

The illusion ends when you harm another creature, when you and any creature physically interact, when you use this ability again, or when you end the illusion (no action required).`,
								spend: [
									{
										effect: 'Choose a creature whose size is no more than 1 greater than yours, and who is within 10 squares of you. This ability’s illusion makes you appear to be that creature. This illusion covers your entire body, including clothing and armor, and changes your voice to sound like the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.',
										value: 1
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'shadow-sub-3-1-3',
								name: 'Clever Trick',
								description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
								type: FactoryLogic.type.createTrigger('An enemy targets you with a strike.'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								cost: 1,
								effect: 'Choose an enemy within distance of the triggering strike, including the enemy who targeted you. The strike targets that enemy instead.'
							})
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.createChoice({
							id: 'shadow-sub-3-2-1',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-3-2-1a',
											name: 'Machinations of Sound',
											description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
											target: 'Each enemy in the area',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: 'Slide 4',
												tier2: 'Slide 5',
												tier3: 'Slide 7'
											}),
											effect: 'This forced movement ignores stability. Instead, the forced movement is reduced by a number equal to the target’s Intuition score.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'shadow-sub-3-2-1b',
											name: 'So Gullible',
											description: 'When your enemy strikes, you reveal you were in a different place all along.',
											type: FactoryLogic.type.createTrigger('An enemy strikes you.', { free: true }),
											keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											effect: 'You use your Clever Trick ability with no insight cost, causing the creature who made the triggering strike to target an illusory image of you. You appear in an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.'
										})
									}),
									value: 1
								}
							]
						}),
						FactoryLogic.feature.create({
							id: 'shadow-sub-3-2-2',
							name: 'Friend!',
							description: `
Your illusions make your enemies believe you are their friend in critical moments. Whenever an enemy uses an ability or trait that targets multiple allies and you are within distance of the effect, you can choose to be a target of the effect as well.

Additionally when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.`
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
