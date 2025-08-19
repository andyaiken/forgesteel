import { Hero } from '../../models/hero';

export const polderShadow = {
	id: 'DKm8hWT6X5PNSpVz',
	name: 'Bellamy',
	picture: null,
	folder: '',
	settingIDs: [
		'',
		'orden'
	],
	ancestry: {
		id: 'ancestry-polder',
		name: 'Polder',
		description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans, sharing their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
		features: [
			{
				id: 'polder-feature-1',
				name: 'Shadowmeld',
				description: 'You become an actual shadow.',
				type: 'Ability',
				data: {
					ability: {
						id: 'polder-feature-1',
						name: 'Shadowmeld',
						description: 'You become an actual shadow.',
						type: {
							usage: 'Maneuver',
							free: false,
							trigger: '',
							time: '',
							qualifiers: []
						},
						keywords: [
							'Magic'
						],
						distance: [
							{
								type: 'Self',
								value: 0,
								value2: 0,
								within: 0,
								special: '',
								qualifier: ''
							}
						],
						target: 'Self',
						cost: 0,
						repeatable: false,
						minLevel: 1,
						preEffect: '',
						powerRoll: null,
						test: null,
						effect: 'You flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, attacks against you and tests made to find you take a bane, and you can’t move or take actions or maneuvers except to exit this form. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.',
						strained: '',
						alternateEffects: [],
						spend: [],
						persistence: [], sections: []
					}
				}
			},
			{
				id: 'polder-feature-2',
				name: 'Small!',
				description: '',
				type: 'Size',
				data: {
					size: {
						value: 1,
						mod: 'S'
					}
				}
			},
			{
				id: 'polder-feature-3',
				name: 'Polder Traits',
				description: '',
				type: 'Choice',
				data: {
					options: [
						{
							feature: {
								id: 'polder-feature-3-1',
								name: 'Corruption Immunity',
								description: 'Corruption Immunity + 3 + 1 per level after 1st',
								type: 'Damage Modifier',
								data: {
									modifiers: [
										{
											damageType: 'Corruption',
											type: 'Immunity',
											value: 3,
											valueCharacteristics: [],
											valueCharacteristicMultiplier: 1,
											valuePerLevel: 1,
											valuePerEchelon: 0
										}
									]
								}
							},
							value: 1
						},
						{
							feature: {
								id: 'polder-feature-3-2',
								name: 'Graceful Retreat',
								description: 'When you take the Disengage move action, you can shift 1 additional square as part of the move action.',
								type: 'Bonus',
								data: {
									field: 'Disengage',
									value: 1,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 1,
									valuePerLevel: 0,
									valuePerEchelon: 0
								}
							},
							value: 1
						},
						{
							feature: {
								id: 'polder-feature-3-3',
								name: 'Polder Geist',
								description: 'When you start your turn while no creatures have line of effect to you, or while you are hidden from or have concealment from all enemies with line of effect to you, your speed is increased by 3 until the end of your turn.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'polder-feature-3-4',
								name: 'Fearless',
								description: 'Courage is all you know. You can’t be frightened.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'polder-feature-3-5',
								name: 'Nimblestep',
								description: 'Your light feet allow you to ignore the effects of difficult terrain and move at full speed while you are sneaking.',
								type: 'Text',
								data: null
							},
							value: 2
						}
					],
					count: 3,
					selected: [
						{
							id: 'polder-feature-3-1',
							name: 'Corruption Immunity',
							description: 'Corruption Immunity + 3 + 1 per level after 1st',
							type: 'Damage Modifier',
							data: {
								modifiers: [
									{
										damageType: 'Corruption',
										type: 'Immunity',
										value: 3,
										valueCharacteristics: [],
										valueCharacteristicMultiplier: 1,
										valuePerLevel: 1,
										valuePerEchelon: 0
									}
								]
							}
						},
						{
							id: 'polder-feature-3-4',
							name: 'Fearless',
							description: 'Courage is all you know. You can’t be frightened.',
							type: 'Text',
							data: null
						}
					]
				}
			}
		]
	},
	culture: {
		id: 'culture-polder',
		name: 'Polder',
		description: 'Urban, communal, creative.',
		languages: [
			'Khoursirian'
		],
		environment: {
			id: 'env-urban',
			name: 'Urban',
			description: 'An urban culture is always centered in a city. Such a culture might arise within the walls of Capital, a massive metropolis with a cosmopolitan population; within a network of caverns that hold an underground city; or in any other place where a large population lives relatively close together. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowd.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Interpersonal',
					'Intrigue'
				],
				count: 1,
				selected: [
					'Alertness'
				]
			}
		},
		organization: {
			id: 'org-communal',
			name: 'Communal',
			description: 'A communal culture has no formal book of laws or rules for governing. Instead, the community works together to pick leaders and make important decisions. Often in these cultures, each person has a relatively equal say in how the culture operates, and everyone contributes to help the culture survive and thrive. People share the burdens of governing, physical labor, childcare, and other duties. A collective of farmers who work together to cultivate and protect their land without a noble, a city of pirates where each person can do as they wish, and a traveling theatrical troupe whose members vote on every artistic and administrative decision are all communal cultures.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Crafting',
					'Interpersonal'
				],
				count: 1,
				selected: [
					'Flirt'
				]
			}
		},
		upbringing: {
			id: 'up-creative',
			name: 'Creative',
			description: 'Heroes with a creative upbringing were raised among folk who create art or other works valuable enough to trade. A creative culture might produce fine art such as dance, music, or sculpture, or more practical wares such as wagons, weapons, tools, or buildings. People in such cultures learn the value of quality crafting and attention to detail.',
			type: 'Skill Choice',
			data: {
				options: [
					'Music',
					'Perform'
				],
				listOptions: [
					'Crafting'
				],
				count: 1,
				selected: [
					'Alchemy'
				]
			}
		}
	},
	class: {
		id: 'class-shadow',
		name: 'Shadow',
		description: '\nSubtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemies’ weaknesses.\n\nAs a shadow, you have abilities that deal a lot of damage, let you move swiftly across the battlefield and away from hazards, and allow you to fade from notice even in the middle of the most heated combat encounter. You also possess more skills than any other hero.',
		heroicResource: 'Insight',
		subclassName: 'Shadow College',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Agility'
			]
		],
		primaryCharacteristics: [
			'Agility'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: 'shadow-stamina',
						name: 'Stamina',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Stamina',
							value: 18,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 9,
							valuePerEchelon: 0
						}
					},
					{
						id: 'shadow-recoveries',
						name: 'Recoveries',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Recoveries',
							value: 8,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 0,
							valuePerEchelon: 0
						}
					},
					{
						id: 'shadow-1-1',
						name: 'Intrigue Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Intrigue'
							],
							count: 2,
							selected: [
								'Hide',
								'Sneak'
							]
						}
					},
					{
						id: 'shadow-1-3',
						name: 'Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [
								'Criminal Underworld'
							],
							listOptions: [
								'Exploration',
								'Interpersonal',
								'Intrigue'
							],
							count: 5,
							selected: [
								'Gymnastics',
								'Jump',
								'Lie',
								'Pick Lock',
								'Pick Pocket'
							]
						}
					},
					{
						id: 'shadow-1-4',
						name: 'Insight',
						description: '\nAt the start of each of your turns during combat, you gain 1d3 insight. The first time each round that you deal damage with at least one surge, you gain 1 insight.\n\nWhen you use a heroic ability that has a power roll, that ability costs 1 less insight if you have an edge or double edge on it. If the ability has multiple targets, the cost is reduced even if the ability has an edge or double edge against only one target.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-1-5',
						name: 'Hesitation Is Weakness',
						description: 'Keep up the attack. Never give them a moment’s grace.',
						type: 'Ability',
						data: {
							ability: {
								id: 'shadow-1-5',
								name: 'Hesitation Is Weakness',
								description: 'Keep up the attack. Never give them a moment’s grace.',
								type: {
									usage: 'Triggered Action',
									free: true,
									trigger: 'Another hero ends their turn. That hero can’t have used this ability to start their turn.',
									time: '',
									qualifiers: []
								},
								keywords: [],
								distance: [
									{
										type: 'Self',
										value: 0,
										value2: 0,
										within: 0,
										special: '',
										qualifier: ''
									}
								],
								target: 'Self',
								cost: 1,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'You take your turn after the triggering hero.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'shadow-1-5.5',
						name: 'Kit',
						description: '',
						type: 'Kit',
						data: {
							types: [
								''
							],
							count: 1,
							selected: [
								{
									id: 'kit-cloak-and-dagger',
									name: 'Cloak and Dagger',
									description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while providing a boost to your effectiveness at range and to your damage. This kit is good for a hero who wants to be able to move all over the battlefield while keeping their options open for using short-range attacks.',
									type: '',
									armor: [
										'Light Armor'
									],
									weapon: [
										'Light Weapon'
									],
									stamina: 3,
									speed: 2,
									stability: 0,
									meleeDamage: {
										tier1: 1,
										tier2: 1,
										tier3: 1
									},
									rangedDamage: {
										tier1: 1,
										tier2: 1,
										tier3: 1
									},
									meleeDistance: 0,
									rangedDistance: 5,
									disengage: 1,
									features: [
										{
											id: 'kit-cloak-and-dagger-signature',
											name: 'Fade',
											description: 'A stab, and a few quick, careful steps back.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-cloak-and-dagger-signature',
													name: 'Fade',
													description: 'A stab, and a few quick, careful steps back.',
													type: {
														usage: 'Main Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Melee',
														'Ranged',
														'Strike',
														'Weapon'
													],
													distance: [
														{
															type: 'Melee',
															value: 1,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														},
														{
															type: 'Ranged',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'One creature',
													cost: 'signature',
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: {
														characteristic: [
															'Might',
															'Agility'
														],
														bonus: 0,
														tier1: '2 + M or A damage; you shift 1 square',
														tier2: '5 + M or A damage; you shift up to 2 squares',
														tier3: '7 + M or A damage; you shift up to 3 squares'
													},
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: [], sections: []
												}
											}
										}
									]
								}
							]
						}
					},
					{
						id: 'shadow-1-6',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'shadow-ability-2'
							]
						}
					},
					{
						id: 'shadow-1-7',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'shadow-ability-8'
							]
						}
					},
					{
						id: 'shadow-1-8',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'shadow-ability-9'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'shadow-2-1',
						name: 'Exploration / Interpersonal / Intrigue Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Exploration',
								'Interpersonal',
								'Intrigue'
							],
							count: 1,
							selected: []
						}
					}
				]
			},
			{
				level: 3,
				features: [
					{
						id: 'shadow-3-1',
						name: 'Careful Observation',
						description: 'A moment of focus leaves a foe firmly in your sights.',
						type: 'Ability',
						data: {
							ability: {
								id: 'shadow-3-1',
								name: 'Careful Observation',
								description: 'A moment of focus leaves a foe firmly in your sights.',
								type: {
									usage: 'Maneuver',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
								},
								keywords: [],
								distance: [
									{
										type: 'Special',
										value: 0,
										value2: 0,
										within: 0,
										special: '20 squares',
										qualifier: ''
									}
								],
								target: 'One creature',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'As long as you remain within distance of the target, maintain line of effect to them, and strike no other creature first, you gain a surge and an edge on the next strike you make against the assessed creature.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'shadow-3-2',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 7,
							minLevel: 1,
							count: 1,
							selectedIDs: []
						}
					}
				]
			}
		],
		abilities: [
			{
				id: 'shadow-ability-1',
				name: 'Gasping in Pain',
				description: 'Your precise strikes let your allies take advantage of a target’s agony.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 + A damage',
					tier2: '5 + A damage',
					tier3: '8 + A damage; I < [strong], prone'
				},
				test: null,
				effect: 'An ally of your choice within 5 squares of the target gains a surge.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-2',
				name: 'I Work Better Alone',
				description: 'It’s better, just you and me. Isn’t it?',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 + A damage',
					tier2: '6 + A damage',
					tier3: '9 + A damage'
				},
				test: null,
				effect: 'If the target has no allies adjacent to them, this strike deals extra damage equal to your Agility score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-3',
				name: 'Teamwork Has Its Place',
				description: 'You attack an enemy, distracting them long enough for an ally to stab them.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 + A damage',
					tier2: '6 + A damage',
					tier3: '9 + A damage'
				},
				test: null,
				effect: 'If an ally is adjacent to the target, the target takes extra damage equal to your Agility score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-4',
				name: 'You Were Watching The Wrong One',
				description: 'They can’t watch both of you at once.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 + A damage',
					tier2: '5 + A damage',
					tier3: '8 + A damage'
				},
				test: null,
				effect: 'As long as you have at least one ally within 5 squares of the target, you gain a surge. If you are flanking the target when you use this ability, choose one ally who is flanking with you. That ally also gain a surge.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-5',
				name: 'Disorienting Strike',
				description: 'Your attack leaves them reeling, allowing you to follow up.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; slide 2',
					tier2: '6 + A damage; slide 3',
					tier3: '10 + A damage; slide 5'
				},
				test: null,
				effect: 'You can shift into any square the target leaves when you slide them.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-6',
				name: 'Eviscerate',
				description: 'You leave your foe bleeding out after a devastating attack.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; A < [weak], bleeding (save ends)',
					tier2: '6 + A damage; A < [average], bleeding (save ends)',
					tier3: '10 + A damage; A < [strong], bleeding (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-7',
				name: 'Get In Get Out',
				description: 'Move unexpectedly, strike fast, and be gone!',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '5 + A damage',
					tier2: '8 + A damage',
					tier3: '11 + A damage'
				},
				test: null,
				effect: 'You can shift up to your speed, dividing that movement before or after your strike as desired.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-8',
				name: 'Two Throats At Once',
				description: 'A bargain.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Two creatures or objects',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '4 damage',
					tier2: '6 damage',
					tier3: '10 damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-9',
				name: 'Coup de Grâce',
				description: 'Your blade might be the last thing they see.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '1d6 + 7 + A damage',
					tier2: '1d6 + 11 + A damage',
					tier3: '1d6 + 16 + A damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-10',
				name: 'One Hundred Throats',
				description: 'As you move across the battlefield, every foe within reach feels your wrath.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Self',
						value: 0,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: 'You shift up to your speed. You make one power roll that targets up to three enemies, each of who became adjacent to you during the move.',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 damage',
					tier2: '6 damage',
					tier3: '9 + A damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-11',
				name: 'Set-Up',
				description: 'Your friends will thank you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '6 + A damage; R < [weak], the target has damage weakness 5 (save ends)',
					tier2: '9 + A damage; R < [average], the target has damage weakness 5 (save ends)',
					tier3: '13 + A damage; R < [strong], the target has damage weakness 5 (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-12',
				name: 'Shadowstrike',
				description: 'They have no idea what the college taught you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Magic',
					'Melee',
					'Ranged'
				],
				distance: [
					{
						type: 'Self',
						value: 0,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'You make two signature strikes.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-13',
				name: 'Dancer',
				description: 'You enter a flow state that makes you nearly impossible to pin down.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [],
				distance: [
					{
						type: 'Self',
						value: 0,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter, whenever an enemy moves adjacent to you or damages you, you can take the Disengage move action as a free triggered action.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-14',
				name: 'Misdirecting Strike',
				description: 'Why are you looking at ME?!',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '9 + A damage',
					tier2: '13 + A damage',
					tier3: '18 + A damage'
				},
				test: null,
				effect: 'The target is taunted by a willing ally within 5 squares of you until the end of the target’s next turn.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-15',
				name: 'Pinning Shot',
				description: 'One missile - placed well and placed hard.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '8 + A damage; A < [weak], restrained (save ends)',
					tier2: '12 + A damage; A < [average], restrained (save ends)',
					tier3: '16 + A damage; A < [strong], restrained (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'shadow-ability-16',
				name: 'Staggering Blow',
				description: 'There’s no recovering from this.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Ranged',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 1,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					},
					{
						type: 'Ranged',
						value: 5,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '7 + A damage; M < [weak], slowed (save ends)',
					tier2: '11 + A damage; M < [average], prone and can’t stand (save ends)',
					tier3: '16 + A damage; M < [strong], prone and can’t stand (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			}
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
							{
								id: 'shadow-sub-1-1-1',
								name: 'Lore Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Lore'
									],
									count: 1,
									selected: [
										'Magic'
									]
								}
							},
							{
								id: 'shadow-sub-1-1-2',
								name: 'Black Ash Teleport',
								description: 'In a swirl of black ash, you step from one place to another.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-1-1-2',
										name: 'Black Ash Teleport',
										description: 'In a swirl of black ash, you step from one place to another.',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic'
										],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you hide using this maneuver, you gain a surge.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												repeatable: true,
												effect: 'You teleport 1 additional square for each insight spent.',
												name: ''
											}
										],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'shadow-sub-1-1-3',
								name: 'In All This Confusion',
								description: 'You vanish in a plume of black smoke to avoid danger.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-1-1-3',
										name: 'In All This Confusion',
										description: 'You vanish in a plume of black smoke to avoid danger.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'You take damage.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic'
										],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												repeatable: true,
												effect: 'You teleport 1 additional square for each insight spent.',
												name: ''
											}
										],
										persistence: [], sections: []
									}
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'shadow-sub-1-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-1-2-1a',
												name: 'In a Puff of Ash',
												description: 'You enchant a strike with your teleportation magic.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-2-1a',
														name: 'In a Puff of Ash',
														description: 'You enchant a strike with your teleportation magic.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Magic',
															'Melee',
															'Ranged',
															'Strike',
															'Weapon'
														],
														distance: [
															{
																type: 'Melee',
																value: 1,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															},
															{
																type: 'Ranged',
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'One creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: '6 + A damage; you can teleport the target 1 square',
															tier2: '10 + A damage; you can teleport the target up to 3 squares',
															tier3: '14 + A damage; you can teleport the target up to 5 squares'
														},
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-1-2-1b',
												name: 'Too Slow',
												description: 'Your foe made a big mistake.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-2-1b',
														name: 'Too Slow',
														description: 'Your foe made a big mistake.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'You use your In All This Confusion ability.',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Melee',
															'Ranged',
															'Strike',
															'Weapon'
														],
														distance: [
															{
																type: 'Self',
																value: 0,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'You avoid any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'shadow-sub-1-2-2',
								name: 'Burning Ash',
								description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Reason score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: []
					}
				],
				selected: true
			},
			{
				id: 'shadow-sub-2',
				name: 'College of Caustic Alchemy',
				description: 'The College of Caustic Alchemy teaches its students recipes for the acids, bombs, and poisons used in their grim work. Graduates of the college are exceptional assassins.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'shadow-sub-2-1-1',
								name: 'Crafting Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Crafting'
									],
									count: 1,
									selected: [
										'Alchemy'
									]
								}
							},
							{
								id: 'shadow-sub-2-1-2',
								name: 'Coat The Blade',
								description: 'Just a little poison goes a long way.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-2-1-2',
										name: 'Coat The Blade',
										description: 'Just a little poison goes a long way.',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You gain two surges. Whenever you use a surge before the end of the encounter, you can choose to have its damage be poison damage.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												repeatable: true,
												effect: 'For each insight you spend, you gain an additional surge.',
												name: ''
											}
										],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'shadow-sub-2-1-3',
								name: 'Smoke Bomb',
								description: 'You always carry a supply of smoke bombs to make it easy for you to distract and get away from foes. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are hidden.',
								type: 'Text',
								data: null
							},
							{
								id: 'shadow-sub-2-1-4',
								name: 'Defensive Roll',
								description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-2-1-4',
										name: 'Defensive Roll',
										description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'Another creature damages you.',
											time: '',
											qualifiers: []
										},
										keywords: [],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You halve the damage against the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'You reduce the potency of any effect associated with the damage for you by 1.',
												name: '',
												repeatable: false
											}
										],
										persistence: [], sections: []
									}
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'shadow-sub-2-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-2-2-1a',
												name: 'Sticky Bomb',
												description: 'Explosives are best when they’re attached to an enemy.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-2-1a',
														name: 'Sticky Bomb',
														description: 'Explosives are best when they’re attached to an enemy.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Ranged'
														],
														distance: [
															{
																type: 'Ranged',
																value: 10,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'One creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: 'You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can remove it as an action, disarming the bomb. At the end of your next turn, the bomb detonates. You can also detonate it earlier (no action required). When the bomb detonates, you make a power roll targeting each enemy within 3 squares of it.',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: '4 + A fire damage',
															tier2: '7 + A fire damage',
															tier3: '11 + A fire damage'
														},
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-2-2-1b',
												name: 'Stink Bomb',
												description: 'Yellow, disgusting gas explodes from a bomb you toss.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-2-1b',
														name: 'Stink Bomb',
														description: 'Yellow, disgusting gas explodes from a bomb you toss.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Ranged'
														],
														distance: [
															{
																type: 'Cube',
																value: 3,
																value2: 0,
																within: 10,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each creature in the area',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: '2 poison damage',
															tier2: '5 poison damage',
															tier3: '7 poison damage'
														},
														test: null,
														effect: 'The gas remains in the area until the end of the encounter. Any creature who has M < average and starts their turn in the area is weakened (save ends).',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'shadow-sub-2-2-2',
								name: 'Trained Assassin',
								description: 'You know just where to cut your enemies. Whenever you make a strike with at least one surge and no banes, the strike gains an extra surge which you must use on that strike.',
								type: 'Text',
								data: null
							}
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
							{
								id: 'shadow-sub-3-1-1',
								name: 'Interpersonal Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Interpersonal'
									],
									count: 1,
									selected: [
										'Lie'
									]
								}
							},
							{
								id: 'shadow-sub-3-1-2',
								name: 'I’m No Threat',
								description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-3-1-2',
										name: 'I’m No Threat',
										description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic'
										],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '\nWhen you use this ability, you cover yourself in an illusion that causes you to appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic, unarmed, and capable version of yourself. While this illusion lasts, your strikes made against other creatures gain an edge. If you use this ability in combat, you gain a surge when you use it.\n\nThe illusion ends when you harm another creature, when you and any creature physically interact, when you use this ability again, or when you end the illusion (no action required).',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												effect: 'Choose a creature whose size is no more than 1 greater than yours, and who is within 10 squares of you. This ability’s illusion makes you appear to be that creature. This illusion covers your entire body, including clothing and armor, and changes your voice to sound like the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.',
												value: 1,
												name: '',
												repeatable: false
											}
										],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'shadow-sub-3-1-3',
								name: 'Clever Trick',
								description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-3-1-3',
										name: 'Clever Trick',
										description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'An enemy targets you with a strike.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic'
										],
										distance: [
											{
												type: 'Self',
												value: 0,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self',
										cost: 1,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'Choose an enemy within distance of the triggering strike, including the enemy who targeted you. The strike targets that enemy instead.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'shadow-sub-3-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-3-2-1a',
												name: 'Machinations of Sound',
												description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-2-1a',
														name: 'Machinations of Sound',
														description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Magic',
															'Ranged'
														],
														distance: [
															{
																type: 'Cube',
																value: 3,
																value2: 0,
																within: 10,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each enemy in the area',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: 'Slide 4',
															tier2: 'Slide 5',
															tier3: 'Slide 7'
														},
														test: null,
														effect: 'This forced movement ignores stability. Instead, the forced movement is reduced by a number equal to the target’s Intuition score.',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-3-2-1b',
												name: 'So Gullible',
												description: 'When your enemy strikes, you reveal you were in a different place all along.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-2-1b',
														name: 'So Gullible',
														description: 'When your enemy strikes, you reveal you were in a different place all along.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'An enemy strikes you.',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Magic',
															'Melee',
															'Ranged',
															'Strike',
															'Weapon'
														],
														distance: [
															{
																type: 'Self',
																value: 0,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'You use your Clever Trick ability with no insight cost, causing the creature who made the triggering strike to target an illusory image of you. You appear in an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: [], sections: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'shadow-sub-3-2-2',
								name: 'Friend!',
								description: '\nYour illusions make your enemies believe you are their friend in critical moments. Whenever an enemy uses an ability or trait that targets multiple allies and you are within distance of the effect, you can choose to be a target of the effect as well.\n\nAdditionally when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.',
								type: 'Text',
								data: null
							}
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
		characteristics: [
			{
				characteristic: 'Might',
				value: -1
			},
			{
				characteristic: 'Agility',
				value: 2
			},
			{
				characteristic: 'Reason',
				value: 2
			},
			{
				characteristic: 'Intuition',
				value: 1
			},
			{
				characteristic: 'Presence',
				value: 1
			}
		]
	},
	career: {
		id: 'career-criminal',
		name: 'Criminal',
		description: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
		features: [
			{
				id: 'career-criminal-feature-1',
				name: 'Lore Skill',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Lore'
					],
					count: 1,
					selected: [
						'Criminal Underworld'
					]
				}
			},
			{
				id: 'career-criminal-feature-2',
				name: 'Intrigue Skills',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Intrigue'
					],
					count: 2,
					selected: [
						'Search',
						'Escape Artist'
					]
				}
			},
			{
				id: 'career-criminal-feature-3',
				name: 'Language',
				description: '',
				type: 'Language Choice',
				data: {
					options: [],
					count: 1,
					selected: [
						'Szetch'
					]
				}
			},
			{
				id: 'career-criminal-feature-4',
				name: 'Project Points',
				description: '',
				type: 'Bonus',
				data: {
					field: 'Project Points',
					value: 120,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				}
			},
			{
				id: 'career-criminal-feature-5',
				name: 'Intrigue Perk',
				description: '',
				type: 'Perk',
				data: {
					lists: [
						'Intrigue'
					],
					count: 1,
					selected: [
						{
							id: 'perk-lucky-dog',
							name: 'Lucky Dog',
							description: 'When you fail a test using any skill from the intrigue skill group, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
							type: 'Text',
							data: null,
							list: 'Intrigue'
						}
					]
				}
			}
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-criminal-ii-1',
					name: 'Antiquity Procurement',
					description: 'You stole, smuggled, and sold antiquities. In your haste to make a quick sale, you didn’t fully vet a client and they subsequently robbed your warehouse. When the items you had stolen were taken from you, you realized the harm you had caused. Now you adventure to find those items you lost and return them where they belong.'
				},
				{
					id: 'career-criminal-ii-2',
					name: 'Atonement',
					description: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. To make up for the loss you caused, you left your criminal ways behind and became a hero.'
				},
				{
					id: 'career-criminal-ii-3',
					name: 'Friendly Priest',
					description: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn’t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.'
				},
				{
					id: 'career-criminal-ii-4',
					name: 'Shadowed Influence',
					description: 'You spent years blackmailing and manipulating nobles for influence and wealth until a scheme went wrong. You were publicly exposed, and after a narrow escape, you reevaluated your life. Under a new identity, you work as a hero and hope no one looks at your past too closely.'
				},
				{
					id: 'career-criminal-ii-5',
					name: 'Simply Survival',
					description: 'Stealing was a matter of survival for you and not what defined you - at least in your mind. But when your thieving actions lead to innocent folk being harmed, you knew you could be better. You turned your back on your old life, though your old skills come in handy.'
				},
				{
					id: 'career-criminal-ii-6',
					name: 'Stand Against Tyranny',
					description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter - pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance - not just against this tyrant, but against authoritarians anywhere.'
				}
			],
			selectedID: 'career-criminal-ii-6'
		}
	},
	complication: null,
	features: [
		{
			id: 'default-language',
			name: 'Default Language',
			description: '',
			type: 'Language Choice',
			data: {
				options: [],
				count: 1,
				selected: [
					'Caelian'
				]
			}
		}
	],
	state: {
		staminaDamage: 0,
		staminaTemp: 0,
		recoveriesUsed: 0,
		surges: 0,
		victories: 0,
		xp: 0,
		heroicResource: 0,
		heroTokens: 0,
		renown: 0,
		wealth: 1,
		projectPoints: 0,
		conditions: [],
		inventory: [],
		projects: [],
		controlledSlots: [],
		notes: '',
		encounterState: 'ready',
		hidden: false,
		defeated: false
	},
	abilityCustomizations: []
} as Hero;
