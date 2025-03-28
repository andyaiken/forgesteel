import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const fury: HeroClass = {
	id: 'class-fury',
	name: 'Fury',
	description: `
You do not temper the heat of battle within you - you unleash it! Like a raptor, a panther, a wolf, your experience in the wild taught you the secret of channeling unfettered anger into martial prowess. Primordial chaos is your ally. Leave it to others to use finesse to clean up the pieces you leave behind.

As a fury, you have abilities that deal a lot of damage, move you around the battlefield, and grow in strength as your rage increases. Nature has no concept of fairness - and neither do you.`,
	heroicResource: 'Rage',
	subclassName: 'Primordial Aspect',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Agility ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'fury-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'fury-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FactoryLogic.feature.createSkill({
					id: 'fury-1-1',
					skill: 'Nature'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-1-2',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FactoryLogic.feature.create({
					id: 'fury-1-3',
					name: 'Rage',
					description: 'At the start of each of your turns during combat, you gain 1d3 rage. Additionally, the first time each round that you take damage, you gain 1 rage. The first time in an encounter that you become winded or dying, you gain 1d3 rage.'
				}),
				FactoryLogic.feature.create({
					id: 'fury-1-4',
					name: 'Mighty Leaps',
					description: 'You always succeed on Might tests made to jump. You can still roll to see if you get a reward result.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-5',
					cost: 'signature'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-6',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-1-7',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'fury-2-1',
					lists: [ PerkList.Crafting, PerkList.Exploration, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'fury-3-1',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'fury-ability-1',
			name: 'Brutal Slam',
			description: 'The heavy impact of your weapon attacks drives your foes ever backward.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage; push 1',
				tier2: '6 + M damage; push 2',
				tier3: '9 + M damage; push 4'
			})
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-2',
			name: 'Hit And Run',
			description: 'Keeping in constant motion helps you slip out of reach after a brutal assault.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '2 + M damage',
				tier2: '5 + M damage',
				tier3: '7 + M damage; A < [strong], slowed (save ends)'
			}),
			effect: 'You can shift 1 square.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-3',
			name: 'Impaled!',
			description: 'You plunge your weapon into your enemy like a boar upon a spit.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature of your size or smaller',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '2 + M damage; M < [weak], grabbed',
				tier2: '5 + M damage; M < [average], grabbed',
				tier3: '7 + M damage; M < [strong], grabbed'
			})
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-4',
			name: 'To the Death!',
			description: 'Your reckless assault leaves you tactically vulnerable.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage',
				tier2: '6 + M damage',
				tier3: '9 + M damage'
			}),
			effect: 'You gain two surges. The enemy can make an opportunity attack against you as a free triggered action.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-5',
			name: 'Back!',
			description: 'Surrounded? The fools!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '5 damage',
				tier2: '8 damage; push 1',
				tier3: '11 damage; push 3'
			})
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-6',
			name: 'Out of the Way!',
			description: 'Your enemies will get out of your way - whether they want to or not.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage; slide 2',
				tier2: '5 + M damage; slide 3',
				tier3: '8 + M damage; slide 5'
			}),
			effect: 'When you slide the target, you can move into any square they leave. If you take damage from an opportunity attack by moving this way, the target takes the same amount and type of damage.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-7',
			name: 'Tide of Death',
			description: 'Teach them the folly of lining up for you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'You move up to your speed in a straight line, and you don’t treat enemy squares as difficult terrain for this move. You can end this move in a creature’s space and then move them to an adjacent unoccupied space. You make one power roll that targets each enemy whose space you move through.',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '2 damage',
				tier2: '3 damage',
				tier3: '5 damage'
			}),
			effect: 'The last target you damage takes extra damage equal to your Might score for every free strike you triggered during your move.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-8',
			name: 'Your Entrails Are Your Extrails!',
			description: 'Hard for them to fight when they’re busy holding in their giblets.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 + M damage; M < [weak], bleeding (save ends)',
				tier2: '5 + M damage; M < [average], bleeding (save ends)',
				tier3: '8 + M damage; M < [strong], bleeding (save ends)'
			}),
			effect: 'While bleeding, the target takes damage equal to your Might score at the end of your turns.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-9',
			name: 'Blood for Blood!',
			description: 'A mighty strike leaves your foe reeling.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or obeject',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '4 + M damage; M < [weak], bleeding and weakened (save ends)',
				tier2: '6 + M damage; M < [average], bleeding and weakened (save ends)',
				tier3: '10 + M damage; M < [strong], bleeding and weakened (save ends)'
			}),
			effect: 'You can deal 1d6 damage to yourself to deal 1d6 bonus damage to the target.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-10',
			name: 'Make Peace With Your God!',
			description: 'Anger is an energy.',
			type: FactoryLogic.type.createManeuver({ free: true }),
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'The next ability roll you make this turn automatically achieves a tier 3 result. You gain one surge.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-11',
			name: 'Thunder Roar',
			description: 'A howl erupts from you that hurls your enemies back.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; push 2',
				tier2: '9 damage; push 4',
				tier3: '13 damage; push 6'
			}),
			effect: 'The targets are pushed one at a time, starting with the target closest to you.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-12',
			name: 'To the Uttermost End',
			description: 'You spend your life force to ensure their death.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 + M damage',
				tier2: '11 + M damage',
				tier3: '16 + M damage'
			}),
			spend: [
				{
					value: 1,
					effect: 'If you are winded, this ability deals 1d6 bonus damage for each rage spent. If you are dying, it deals 1d10 bonus damage for each rage spent. In either case, you then lose 1d6 Stamina after making this strike.'
				}
			]
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-13',
			name: 'A Demon Unleashed',
			description: 'Foes tremble at the sight of you.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or until you are dying, each enemy who starts their turn adjacent to you and has P < strong is frightened until the end of their turn.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-14',
			name: 'Face the Storm!',
			description: 'Fight or flight? FIGHT!!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter or until you are dying, each creature you make a melee strike against who has P < average is taunted until the end of their next turn. Additionally, against any enemy taunted by you, your abilities deal additional damage equal to twice your Might score and gain a +1 bonus to potency.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-15',
			name: 'Steelbreaker',
			description: 'See how useless their weapons are!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'You gain 20 Temporary Stamina.'
		}),
		FactoryLogic.createAbility({
			id: 'fury-ability-16',
			name: 'You Are Already Dead',
			description: 'Slash. Walk away.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 7,
			effect: 'If the target is not a leader or solo creature, they die at the end of their next turn. If the target is a leader or solo creature, you gain three surges and can make a melee free strike against them.'
		})
	],
	subclasses: [
		{
			id: 'fury-sub-1',
			name: 'Berserker',
			description: 'You channel your rage into expressions of physical might, acting as a living version of the forces that reshape the world.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'fury-sub-1-1-1',
							skill: 'Lift'
						}),
						FactoryLogic.feature.createKitChoice({
							id: 'fury-sub-1-1-2'
						}),
						FactoryLogic.feature.create({
							id: 'fury-sub-1-1-3',
							name: 'Primordial Strength',
							description: `
Whenever you damage an object with a weapon strike, it takes additional damage equal to your Might score. Additionally, whenever you push another creature into an object, they take additional damage equal to your Might score.

As your rage grows, your primordial strength intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Rage 2**: Add your Might to the distance you achieve on the Knockback maneuver.
* **Rage 4**: Gain one surge the first time on a turn that you push a creature.
* **Rage 6**: Gain an edge on Might tests and the Knockback maneuver.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'fury-sub-1-1-4',
								name: 'Lines of Force',
								description: 'You redirect the energy of motion.',
								type: FactoryLogic.type.createTrigger('The target would be force moved.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [ FactoryLogic.distance.createMelee() ],
								target: 'Self or 1 creature',
								effect: 'You can select a new target of the same size or smaller within distance to be force moved instead, and you can turn that forced movement into a push instead. You become the source of the forced movement and decide where the new target’s destination. Additionally, the forced movement distance gains a bonus equal to your Might score.',
								spend: [
									{
										value: 1,
										effect: 'The forced movement distance instead gains a bonus equal to twice your Might score.'
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
							id: 'fury-sub-1-2-1',
							name: 'Unstoppable Force',
							description: 'Whenever you use the Charge action, you can make a signature strike or a heroic ability melee strike instead of a free strike. Additionally, you can jump as part of a charge.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'fury-sub-1-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-1-2-2a',
											name: 'Special Delivery',
											description: 'You ready?',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: 'One willing ally',
											cost: 5,
											effect: 'You vertically push the target up to 4 squares. This forced movement ignores the target’s stability, and the target takes no damage from the move. At the end of this movement, the target can make a free strike that deals additional damage equal to your Might score.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-1-2-2b',
											name: 'Wrecking Ball',
											description: 'It is easier to destroy than to create. Much easier, in fact!',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											preEffect: `
You move up to your speed in a straight line. During this movement, you can move through mundane structures, including walls, which are difficult terrain for you. You automatically destroy each square of structure you move through and leave behind a square of difficult terrain.

Additionally, you make one power roll that targets each enemy you come adjacent to during the move.`,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: 'Push 1',
												tier2: 'Push 2',
												tier3: 'Push 3'
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
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-1-3-1',
							name: 'Immovable Object',
							description: 'You add your level to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'fury-sub-1-3-2',
							field: FeatureField.Stability,
							valueCharacteristics: [ Characteristic.Might ]
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'fury-sub-2',
			name: 'Reaver',
			description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'fury-sub-2-1-1',
							skill: 'Hide'
						}),
						FactoryLogic.feature.createKitChoice({
							id: 'fury-sub-2-1-2'
						}),
						FactoryLogic.feature.create({
							id: 'fury-sub-2-1-3',
							name: 'Primordial Cunning',
							description: `
You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.

As your rage grows, your primordial cunning intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Rage 2**: Add your Agility to the distance you achieve on the Knockback maneuver.
* **Rage 4**: Gain one surge the first time on a turn that you slide a creature.
* **Rage 6**: Gain an edge on Agility tests and the Knockback maneuver.`
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'fury-sub-2-1-4',
								name: 'Unearthly Reflexes',
								description: 'Elusive as a hummingbird.',
								type: FactoryLogic.type.createTrigger('You take damage.'),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You take half damage from the attack and can shift up to a number of squares equal to your Agility score.',
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
						FactoryLogic.feature.createMultiple({
							id: 'fury-sub-2-2-1',
							name: 'Inescapable Wrath',
							features: [
								FactoryLogic.feature.create({
									id: 'fury-sub-2-2-1a',
									name: 'Inescapable Wrath',
									description: 'You ignore difficult terrain.'
								}),
								FactoryLogic.feature.createBonus({
									id: 'fury-sub-2-2-1b',
									field: FeatureField.Speed,
									valueCharacteristics: [ Characteristic.Agility ]
								})
							]
						}),
						FactoryLogic.feature.createChoice({
							id: 'fury-sub-2-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-2-2-2a',
											name: 'Phalanx Breaker',
											description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											preEffect: 'You shift up to your speed. You make one power roll that targets up to three enemies you come adjacent to during the shift.',
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '2 damage; A < [weak], dazed (save ends)',
												tier2: '4 damage; A < [average], dazed (save ends)',
												tier3: '6 damage; A < [strong], dazed (save ends)'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-2-2-2b',
											name: 'RRRAAAGHH!',
											description: 'Death! Deeaaath!!',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '3 + M damage; P < [weak], dazed and frightened (save ends)',
												tier2: '5 + M damage; P < [average], dazed and frightened (save ends)',
												tier3: '8 + M damage; P < [strong], dazed and frightened (save ends)'
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
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-1-3-1',
							name: 'See Through Your Tricks',
							description: 'You have a double edge on tests made to search for hidden creatures, discern hidden motives, or detect lies. You also have a double edge on tests made to gamble!'
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'fury-sub-3',
			name: 'Stormwight',
			description: 'You channel your rage into the form of animals and primordial storms.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkill({
							id: 'fury-sub-3-1-1',
							skill: 'Track'
						}),
						FactoryLogic.feature.createKitChoice({
							id: 'fury-sub-3-1-2',
							name: 'Beast Shape',
							types: [ 'Stormwight' ]
						}),
						FactoryLogic.feature.create({
							id: 'fury-sub-3-1-3',
							name: 'Relentless Hunter',
							description: 'You gain an edge on tests that use the Track skill.'
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'fury-sub-3-1-4',
								name: 'Furious Change',
								description: 'In your anger, you revert to a more bestial form.',
								type: FactoryLogic.type.createTrigger('You lose Stamina and are not dying.'),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'After the triggering effect is resolved, you can use a free triggered action to enter your animal form or hybrid form. You gain temporary Stamina equal to your Might score.',
								spend: [
									{
										value: 1,
										effect: 'If you are not dying, you can spend a Recovery.'
									}
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'fury-sub-3-1-5',
								name: 'Aspect of the Wild',
								description: 'You assume the form of the animal who channels your rage.',
								keywords: [ AbilityKeyword.Magic ],
								type: FactoryLogic.type.createManeuver(),
								distance: [ FactoryLogic.distance.createSelf() ],
								target: 'Self',
								effect: `
You can shapeshift into the animal defined by your stormwight kit, a hybrid form, or back into your true form.

While in animal form or hybrid form, you can speak normally and can speak to animals who share your form. If you are in a negotiation with an animal, you treat your Renown as 2 higher than usual while in animal form.`,
								spend: [
									{
										value: 1,
										effect: 'As a free maneuver on your turn, you can shapeshift a second time, either into another animal form, into your hybrid form, or back into your true form.'
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
							id: 'fury-sub-3-2-1',
							name: 'Tooth and Claw',
							description: 'When you end your turn, each enemy who is adjacent to you takes damage equal to your Might score.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'fury-sub-3-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-3-2-2a',
											name: 'Apex Predator',
											description: 'I will hunt you down.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Animal, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee() ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '4 + M damage; I < [weak], slowed (save ends)',
												tier2: '6 + M damage; I < [average], slowed (save ends)',
												tier3: '10 + M damage; I < [strong], slowed (save ends)'
											}),
											effect: 'The target can’t be hidden from you for 24 hours. For the rest of the encounter, whenever the target moves, you can use a free triggered action to move.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'fury-sub-3-2-2b',
											name: 'Visceral Roar',
											description: 'The sound of the storm within you terrifies your opponents.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Animal, AbilityKeyword.Area, AbilityKeyword.Magic ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
											target: 'Each enemy in the area',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '2 damage; push 1; M < [weak], dazed (save ends)',
												tier2: '5 damage; push 2; M < [average], dazed (save ends)',
												tier3: '7 damage; push 3; M < [strong], dazed (save ends)'
											}),
											effect: 'This ability deals damage of your primordial storm type.'
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
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-1-3-1',
							name: 'Nature’s Knight',
							description: 'You can speak with animals and elementals. You automatically sense the presence of any animal or elemental within 10 squares of you, even if they are hidden. If you are in a negotiation with an animal or elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your Renown in a negotiation with an animal of your type while in animal form.'
						})
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
