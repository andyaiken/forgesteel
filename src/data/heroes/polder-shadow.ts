import { Hero } from '@/models/hero';

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
		description: 'After humans, polders are the most numerous and diverse ancestry in Orden. They are not humans, but they live in and among humans and share their gods and culture. Almost every human culture in Orden has a polder saint or a human saint venerated by polder.',
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
							qualifiers: [],
							freeStrike: false
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
						sections: [
							{
								type: 'text',
								text: '\nYou flatten yourself into a shadow against a wall or floor you are touching, and become hidden from any creature you have cover or concealment from or who isn’t observing you. While in shadow form, you have full awareness of your surroundings, and strikes against you and tests made to search for you take a bane. You can’t move or be force moved, and you can’t take main actions or maneuvers except to exit this form or to direct creates under your control, such as one you summon using an ability. Any ability or effect that targets more than 1 square affects you in this form only if it explicitly affects the surface you are flattened against. You can exit this form as a maneuver.\n\nIf the surface you are flattened against is destroyed, this ability ends and you take 1d6 damage that can’t be reduced in any way.'
							}
						],
						preEffect: '',
						powerRoll: null,
						test: null,
						effect: '',
						strained: '',
						alternateEffects: [],
						spend: [],
						persistence: []
					}
				}
			},
			{
				id: 'polder-feature-2',
				name: 'Small!',
				description: 'Your diminutive stature lets you easily get out of — or into — trouble.',
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
								description: 'Your innate shadow magic grants you resilience against the unnatural.',
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
								description: 'Your small size makes it easier for you to slip away from the fray.',
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
								description: 'Evading others’ notice gives you freedom to move. At the start of each of your turns during combat, if no enemy has line of effect to you or if you are hidden from or have concealment from any enemy with line of effect to you, you gain a +3 bonus to speed until the end of your turn.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'polder-feature-3-4',
								name: 'Reactive Tumble',
								description: 'Staying light on your feet lets you quickly get back into position.',
								type: 'Ability',
								data: {
									ability: {
										id: 'polder-feature-3-4',
										name: 'Reactive Tumble',
										description: 'Staying light on your feet lets you quickly get back into position.',
										type: {
											usage: 'Triggered Action',
											free: true,
											trigger: 'Whenever you are force moved',
											time: '',
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'You shift 1 square after the forced movement is resolved.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
									}
								}
							},
							value: 1
						},
						{
							feature: {
								id: 'polder-feature-3-5',
								name: 'Fearless',
								description: 'Courage is all you know.',
								type: 'Condition Immunity',
								data: {
									conditions: [
										'Frightened'
									]
								}
							},
							value: 2
						},
						{
							feature: {
								id: 'polder-feature-3-6',
								name: 'Nimblestep',
								description: 'A light step serves you well when speed is of the essence. You ignore the effects of difficult terrain and can move at full speed while sneaking.',
								type: 'Text',
								data: null
							},
							value: 2
						}
					],
					count: 'ancestry',
					selected: [
						{
							id: 'polder-feature-3-5',
							name: 'Fearless',
							description: 'Courage is all you know.',
							type: 'Condition Immunity',
							data: {
								conditions: [
									'Frightened'
								]
							}
						},
						{
							id: 'polder-feature-3-1',
							name: 'Corruption Immunity',
							description: 'Your innate shadow magic grants you resilience against the unnatural.',
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
							id: 'polder-feature-3-2',
							name: 'Graceful Retreat',
							description: 'Your small size makes it easier for you to slip away from the fray.',
							type: 'Bonus',
							data: {
								field: 'Disengage',
								value: 1,
								valueCharacteristics: [],
								valueCharacteristicMultiplier: 1,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						}
					]
				}
			}
		],
		ancestryPoints: 4
	},
	culture: {
		id: 'culture-polder',
		name: 'Polder',
		description: 'Urban, communal, creative.',
		type: 'Ancestral',
		language: {
			id: 'culture-language',
			name: 'Language',
			description: '',
			type: 'Language Choice',
			data: {
				options: [],
				count: 1,
				selected: [ 'Khoursirian' ]
			}
		},
		languages: [],
		environment: {
			id: 'env-urban',
			name: 'Urban',
			description: 'An urban culture is always centered in a city. Such a culture might arise within the walls of Capital, a massive metropolis with a cosmopolitan population; within a network of caverns that hold an underground city; or in any other place where a large population lives relatively close together. The people of urban cultures often learn to effectively misdirect others in order to navigate the crowds and the political machinations that can come with city life.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Interpersonal',
					'Intrigue'
				],
				count: 1,
				selected: [
					'Conceal Object'
				]
			}
		},
		organization: {
			id: 'org-communal',
			name: 'Communal',
			description: 'A communal culture is a place where all members of the culture are considered equal. The community works together to make important decisions that affect the majority of the culture. While they elect leaders to carry out these decisions and organize their efforts, each person has a relatively equal say in how the culture operates, and everyone contributes to help their people survive and thrive. Individuals often share the burdens of governing, physical labor, childcare, and other duties. A collective of farmers who work together to cultivate and protect their land without a noble, a city of pirates where each person can do as they wish, and a traveling theatrical troupe whose members vote on every artistic and administrative decision are all communal cultures. Many communal cultures operate outside settled lands, sticking to the wilds, a specific district in a larger settlement, city sewers, forgotten ruins, or other isolated places. For even when such cultures are harmless, their members know that outsiders might try to impose rules upon them if they live in the same place. As such, many folks in communal cultures focus on fending for themselves while avoiding the danger that other groups can represent.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Crafting',
					'Exploration'
				],
				count: 1,
				selected: [
					'Alchemy'
				]
			}
		},
		upbringing: {
			id: 'up-creative',
			name: 'Creative',
			description: 'A hero with a creative upbringing was raised among folk who create art or other works valuable enough to trade. A creative culture might produce fine art such as dance, music, or sculpture, or more practical wares such as wagons, weapons, tools, or buildings. People in such cultures learn the value of quality crafting and attention to detail.',
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
					'Forgery'
				]
			}
		}
	},
	class: {
		id: 'class-shadow',
		name: 'Shadow',
		description: '\nSubtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge place you among the elite ranks of assassins, spies, and commandos. But more potent than any weapon or sorcery is your insight into your enemies’ weaknesses.\n\nAs a shadow, you possess abilities that deal significant damage, enable you to move swiftly across the battlefield and evade hazards, and allow you to fade from notice even in the midstof the most intense combat encounters. You also possess more skills than any other hero.',
		type: 'standard',
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
							valuePerLevel: 6,
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
						id: 'shadow-resource',
						name: 'Insight',
						description: '',
						type: 'Heroic Resource',
						data: {
							type: 'heroic',
							gains: [
								{
									tag: 'start',
									trigger: 'Start of your turn',
									value: '1d3'
								},
								{
									tag: 'deal-damage',
									trigger: 'The first time each combat round that you deal damage incorporating 1 or more surges',
									value: '1'
								}
							],
							details: '\nWhen you use a heroic ability that has a power roll, that ability costs 1 less insight if you have an edge or double edge on it.\n\nIf the ability has multiple targets, the cost is reduced even if the ability has an edge or double edge against only one target.',
							canBeNegative: false,
							value: 0
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
								'Alertness',
								'Flirt',
								'Gymnastics',
								'Jump',
								'Lie'
							]
						}
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
									qualifiers: [],
									freeStrike: false
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
								sections: [
									{
										type: 'text',
										text: 'You take your turn after the triggering hero.'
									}
								],
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: []
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
									description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while increasing the effectiveness of your short-range strikes.',
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
														qualifiers: [],
														freeStrike: false
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
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	'Might',
																	'Agility'
																],
																bonus: 0,
																tier1: '2 + M or A damage; you shift 1 square',
																tier2: '5 + M or A damage; you shift up to 2 squares',
																tier3: '7 + M or A damage; you shift up to 3 squares'
															}
														}
													],
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: '',
													strained: '',
													alternateEffects: [],
													spend: [],
													persistence: []
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
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
									qualifiers: [],
									freeStrike: false
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
								sections: [
									{
										type: 'text',
										text: 'As long as you remain within distance of the target, maintain line of effect to them, and strike no other creature first, you gain a surge and an edge on the next strike you make against the assessed creature.'
									}
								],
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: []
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
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 4,
				features: [
					{
						id: 'shadow-4-1a',
						name: 'Characteristic Increase: Agility',
						description: 'Your Agility score increases to 3',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'shadow-4-1b',
						name: 'Characteristic Increase: Additional',
						description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 3.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'shadow-4-1b-1',
										name: 'Might',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Might',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-4-1b-2',
										name: 'Reason',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Reason',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-4-1b-3',
										name: 'Intuition',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Intuition',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-4-1b-4',
										name: 'Presence',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Presence',
											value: 1
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
						id: 'shadow-4-2',
						name: 'Keep It Down',
						description: 'While conversing with any creature you share a language with, you can decide whether anyone else can perceive what you’re conveying, even while yelling.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-4-3a',
						name: 'Night Watch',
						description: 'Your sense for stealth shows those around you how to evade notice. While you are hidden, enemies take a bane on tests made to search for you or other hidden creatures within 10 squares of you.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-4-3b',
						name: 'Night Watch',
						description: 'A steely dagger from out of the blue knocks another weapon off course.',
						type: 'Ability',
						data: {
							ability: {
								id: 'shadow-4-3b',
								name: 'Night Watch',
								description: 'A steely dagger from out of the blue knocks another weapon off course.',
								type: {
									usage: 'Triggered Action',
									free: false,
									trigger: 'The target takes damage from another creature’s ability while you are hidden.',
									time: '',
									qualifiers: [],
									freeStrike: false
								},
								keywords: [
									'Ranged',
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
								target: 'One ally',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'The target takes half the damage. You remain hidden.'
									}
								],
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: []
							}
						}
					},
					{
						id: 'shadow-4-4',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-4-5',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-4-6',
						name: 'Surge of Insight',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'deal-damage 2',
							trigger: 'The first time each combat round that you deal damage incorporating 1 or more surges',
							value: '2',
							replacesTags: [
								'deal-damage'
							]
						}
					}
				]
			},
			{
				level: 5,
				features: [
					{
						id: 'shadow-5-1',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 9,
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 6,
				features: [
					{
						id: 'shadow-6-1',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-6-2',
						name: 'Umbral Form',
						description: 'You lose control of yourself, becoming a shadow creature dripping with ash.',
						type: 'Ability',
						data: {
							ability: {
								id: 'shadow-6-2',
								name: 'Umbral Form',
								description: 'You lose control of yourself, becoming a shadow creature dripping with ash.',
								type: {
									usage: 'Maneuver',
									free: false,
									trigger: '',
									time: '',
									qualifiers: [],
									freeStrike: false
								},
								target: 'Self',
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'This transformation lasts until the end of the encounter, until you are dying, or after 1 uninterrupted hour of quiet focus outside of combat. You gain the following effects while in this form:'
									},
									{
										type: 'text',
										text: '- You can automatically climb at full speed while moving.'
									},
									{
										type: 'text',
										text: '- Enemies’ spaces don’t count as difficult terrain for you. An enemy takes corruption damage equal to your Agility score the first time you pass through their space on a turn.'
									},
									{
										type: 'text',
										text: '- If you end your turn with cover or concealment from another creature, you are automatically hidden from that creature.'
									},
									{
										type: 'text',
										text: '- You gain 1 surge at the start of each of your turns.'
									},
									{
										type: 'text',
										text: '- You have corruption immunity equal to 5 + your level.'
									},
									{
										type: 'text',
										text: '- Creatures gain an edge on strikes against you.'
									},
									{
										type: 'text',
										text: '- You take a bane on Presence tests made to interact with other creatures.'
									}
								],
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: []
							}
						}
					}
				]
			},
			{
				level: 7,
				features: [
					{
						id: 'shadow-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'shadow-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'shadow-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'shadow-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'shadow-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'shadow-7-2',
						name: 'Keen Insight',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'start 2',
							trigger: 'Start of your turn',
							value: '1d3 + 1',
							replacesTags: [
								'start'
							]
						}
					},
					{
						id: 'shadow-7-3',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-7-4',
						name: 'Careful Observation Improvement',
						description: 'You can target two creatures simultaneously with your Careful Observation ability, observing both simultaneously. Making a strike against one target doesn’t end your observation of the other target.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-7-5',
						name: 'Ventriloquist',
						description: 'Whenever you communicate, you can throw your voice so that it seems to originate from a creature or object within 10 squares. If you are hidden, talking this way doesn’t cause you to be revealed.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 8,
				features: [
					{
						id: 'shadow-8-1',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-8-2',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 11,
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 9,
				features: [
					{
						id: 'shadow-9-1',
						name: 'Gloom Squad',
						description: '\nAt the start of each of your turns, you can forgo gaining insight to create 1d6 clones of yourself in unoccupied adjacent spaces. A clone acts on your turn and uses your statistics, except they have 1 Stamina. They are affected by any conditions and effects on you, and last until the start of your next turn. A clone doesn’t have insight and can’t use the Careful Observation ability, the Umbral Form feature, or any triggered actions. On their turn, a clone has a move action, a maneuver, and a main action that they can use only to make a free strike. While making a free strike, a clone must choose targets that you or another clone aren’t also striking.\n\nOutside of combat, you can have one clone active for every 2 Victories you have. If a clone is destroyed, you must wait 1 hour before creating another one.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'shadow-10-1a',
						name: 'Characteristic Increase: Agility',
						description: 'Your Agility score increases to 5',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'shadow-10-1b',
						name: 'Characteristic Increase: Additional',
						description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 5.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'shadow-10-1b-1',
										name: 'Might',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Might',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-2',
										name: 'Reason',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Reason',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-3',
										name: 'Intuition',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Intuition',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-4',
										name: 'Presence',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Presence',
											value: 1
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
						id: 'shadow-10-2',
						name: 'Death Pool',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'deal-damage 2',
							trigger: 'The first time each combat round that you deal damage incorporating 1 or more surges',
							value: '3',
							replacesTags: [
								'deal-damage',
								'deal-damage 2'
							]
						}
					},
					{
						id: 'shadow-10-3',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-10-4',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Crafting',
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Lore'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'shadow-10-5',
						name: 'Careful Observation Improvement',
						description: 'You can target three creatures simultaneously with your Careful Observation ability.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-10-6',
						name: 'Improved Umbral Form',
						description: '\nYou gain full control over the shadow creature you become with your Umbral Form feature, and you can end the transformation at will (no action required). Additionally, you are always wreathed in darkness that grants you concealment while in this form, and creatures no longer gain an edge on strikes against you.\n\nWhile you are in your umbral form, you can spend 1 uninterrupted minute concentrating on a location where you’ve been before. At the end of that minute, you and each willing creature of your choice within 10 squares of you can teleport to unoccupied spaces of your choice within that location. Each creature who teleports this way is invisible for 1 hour or until they use an ability.',
						type: 'Text',
						data: null
					},
					{
						id: 'shadow-10-7',
						name: 'Subterfuge',
						description: '\nYou can spend subterfuge on your abilities as if it were insight. Additionally, you can spend subterfuge to take additional maneuvers on your turn. You can use one maneuver for each subterfuge you spend.\n\nSubterfuge remains until you spend it.',
						type: 'Heroic Resource',
						data: {
							type: 'epic',
							gains: [
								{
									tag: '',
									trigger: 'Finish a respite',
									value: 'XP gained'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 + A damage',
							tier2: '5 + A damage',
							tier3: '8 + A damage; I < [strong], prone'
						}
					},
					{
						type: 'text',
						text: 'One ally of your choice within 5 squares of the target gains 1 surge.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 + A damage',
							tier2: '6 + A damage',
							tier3: '9 + A damage'
						}
					},
					{
						type: 'text',
						text: 'If the target has none of your allies adjacent to them, you gain 1 surge before making the power roll.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-3',
				name: 'Teamwork Has Its Place',
				description: 'You attack an enemy as an ally exposes their weakness.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 + A damage',
							tier2: '6 + A damage',
							tier3: '9 + A damage'
						}
					},
					{
						type: 'text',
						text: 'If any ally is adjacent to the target, you gain 1 surge before making the power roll.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 + A damage',
							tier2: '5 + A damage',
							tier3: '8 + A damage'
						}
					},
					{
						type: 'text',
						text: 'As long as you have one or more allies within 5 squares of the target, you gain 1 surge. If you are flanking the target when you use this ability, choose one ally who is flanking with you. That ally also gains 1 surge.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '4 + A damage; slide 2',
							tier2: '6 + A damage; slide 3',
							tier3: '10 + A damage; slide 5'
						}
					},
					{
						type: 'text',
						text: 'You can shift into any square the target leaves when you slide them.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '4 + A damage; A < [weak], bleeding (save ends)',
							tier2: '6 + A damage; A < [average], bleeding (save ends)',
							tier3: '10 + A damage; A < [strong], bleeding (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '5 + A damage',
							tier2: '8 + A damage',
							tier3: '11 + A damage'
						}
					},
					{
						type: 'text',
						text: 'You can shift up to your speed, dividing that movement before or after your strike as desired.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '4 damage',
							tier2: '6 damage',
							tier3: '10 damage'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '2d6 + 7 + A damage',
							tier2: '2d6 + 11 + A damage',
							tier3: '2d6 + 16 + A damage'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Melee',
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
				sections: [
					{
						type: 'text',
						text: 'You shift up to your speed and make one power roll that targets up to three enemies who came adjacent to you during the move.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 damage',
							tier2: '6 damage',
							tier3: '9 damage'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-11',
				name: 'Setup',
				description: 'Your friends will thank you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '6 + A damage; R < [weak], the target has damage weakness 5 (save ends)',
							tier2: '9 + A damage; R < [average], the target has damage weakness 5 (save ends)',
							tier3: '13 + A damage; R < [strong], the target has damage weakness 5 (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'text',
						text: 'You use a strike signature ability twice.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever an enemy moves or is force moved adjacent to you or damages you, you can take the Disengage move action as a free triggered action.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '9 + A damage',
							tier2: '13 + A damage',
							tier3: '18 + A damage'
						}
					},
					{
						type: 'text',
						text: 'The target is taunted by a willing ally within 5 squares of you until the end of the target’s next turn.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '8 + A damage; A < [weak], restrained (save ends)',
							tier2: '12 + A damage; A < [average], restrained (save ends)',
							tier3: '16 + A damage; A < [strong], restrained (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '7 + A damage; M < [weak], slowed (save ends)',
							tier2: '11 + A damage; M < [average], prone and can’t stand (save ends)',
							tier3: '16 + A damage; M < [strong], prone and can’t stand (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-17',
				name: 'Blackout',
				description: 'You cause a plume of shadow to erupt from your eyes and create a cloud of darkness.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Burst',
						value: 3,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'A black cloud fills the area until the end of your next turn, granting you and your allies concealment against enemies. While you are in the area, whenever an enemy ends their turn in the area, you can use a free triggered action to shift to a new location within the area and make a free strike against them.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-18',
				name: 'Into the Shadows',
				description: 'You sweep your foe off their feet and plunge them into absolute darkness.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Magic',
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
				target: 'One creature or object',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You and the target are removed from the encounter map until the start of your next turn. You reappear in the spaces you left or the nearest unoccupied spaces. Make a power roll upon your return.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '8 + A corruption damage',
							tier2: '13 + A corruption damage',
							tier3: '17 + A corruption damage'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-19',
				name: 'Shadowfall',
				description: 'You vanish. They fall. You reappear.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Melee',
					'Weapon'
				],
				distance: [
					{
						type: 'Line',
						value: 10,
						value2: 1,
						within: 1,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '10 damage',
							tier2: '14 damage',
							tier3: '20 damage'
						}
					},
					{
						type: 'text',
						text: 'You disappear before making the power roll. After the power roll is resolved, you appear in the first unoccupied space at the far end of the line.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-20',
				name: 'You Talk Too Much',
				description: 'Silence is a virtue. A knife pinning their mouth shut is the next best thing.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '10 + A damage; P < [weak], dazed (save ends)',
							tier2: '15 + A damage; P < [average], dazed (save ends)',
							tier3: '21 + A damage; P < [strong], dazed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The target can’t communicate with anyone until the end of the encounter.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-21',
				name: 'Assassinate',
				description: 'A practiced attack will instantly kill an already weakened foe.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '12 + A damage',
							tier2: '18 + A damage',
							tier3: '24 + A damage'
						}
					},
					{
						type: 'text',
						text: 'A target who is not a minion, leader, or solo creature and who is winded after taking this damage is reduced to 0 Stamina.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-22',
				name: 'Shadowgrasp',
				description: 'The shadows around you give way, allowing the shadow creature within you to grasp at your foes.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Burst',
						value: 2,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '11 corruption damage; A < [weak] , restrained (save ends)',
							tier2: '16 corruption damage; A < [average] , restrained (save ends)',
							tier3: '21 corruption damage; A < [strong] , restrained (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-23',
				name: 'Speed of Shadows',
				description: 'You make multiple strikes against a foe before they even notice they’re dead.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You can use a strike signature ability four times, use a strike signature ability that gains an edge three times, or use a strike signature ability that has a double edge twice. You can shift up to 2 squares between each use.'
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
			},
			{
				id: 'shadow-ability-24',
				name: 'They Always Line Up',
				description: 'You fire a projectile so fast that it passes through a line of foes, hamstringing them.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Ranged',
					'Weapon'
				],
				distance: [
					{
						type: 'Line',
						value: 5,
						value2: 1,
						within: 5,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '12 damage; M < [weak] , slowed (save ends)',
							tier2: '18 damage; M < [average] , slowed (save ends)',
							tier3: '24 damage; M < [strong] , slowed (save ends)'
						}
					}
				],
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: []
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
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you successfully hide using this maneuver, you gain 1 surge.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: true,
												effect: 'You teleport 1 additional square for each insight spent.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
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
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: true,
												effect: 'You teleport 1 additional square for each insight spent.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
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
															qualifiers: [],
															freeStrike: false
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '6 + A damage; you can teleport the target 1 square',
																	tier2: '10 + A damage; you can teleport the target up to 3 squares',
																	tier3: '14 + A damage; you can teleport the target up to 5 squares'
																}
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
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
															qualifiers: [],
															freeStrike: false
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
														sections: [
															{
																type: 'text',
																text: 'You ignore any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
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
								description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Agility score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: []
					},
					{
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'shadow-sub-1-5-1',
								name: 'Trail of Cinders',
								description: '\nWhenever you reduce a non-minion creature to 0 Stamina, you can immediately use a free maneuver to use your Black Ash Teleport ability.\n\nAdditionally, you can now bring an adjacent willing creature along with you whenever you use a shadow ability to teleport. The creature appears in an unoccupied space adjacent to the space into which you teleported. If no such space exists, they can’t teleport with you.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'shadow-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-1-6-1a',
												name: 'Black Ash Eruption',
												description: 'Your attack produces a cloud of black ash that launches an enemy into the air.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-6-1a',
														name: 'Black Ash Eruption',
														description: 'Your attack produces a cloud of black ash that launches an enemy into the air.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '3 + A damage; vertical push 5',
																	tier2: '6 + A damage; vertical push 10',
																	tier3: '9 + A damage; vertical push 15'
																}
															},
															{
																type: 'text',
																text: 'A creature force moved by this ability must be moved straight upward.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-1-6-1b',
												name: 'Cinderstorm',
												description: 'You teleport your friends in a burst of ash and fire.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-6-1b',
														name: 'Cinderstorm',
														description: 'You teleport your friends in a burst of ash and fire.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic'
														],
														distance: [
															{
																type: 'Burst',
																value: 4,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self and each ally in the area',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target can teleport up to 5 squares. For each target in addition to you who teleports away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Agility score. Additionally, a target who ends this movement in concealment or cover can use the Hide maneuver even if they are observed.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 7,
						features: []
					},
					{
						level: 8,
						features: [
							{
								id: 'shadow-sub-1-8-1',
								name: 'Cinder Step',
								description: 'Whenever you willingly move, you can teleport. When you teleport this way, it counts as using a shadow ability for the purpose of using your Burning Ash and Trail of Cinders features.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'shadow-sub-1-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-1-9-1a',
												name: 'Cacophony of Cinders',
												description: 'You tumble through the battle, stabbing foes and teleporting allies.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-9-1a',
														name: 'Cacophony of Cinders',
														description: 'You tumble through the battle, stabbing foes and teleporting allies.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic',
															'Melee',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You shift up to twice your speed, making one power roll that targets each creature you come adjacent to during the shift.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: 'An enemy takes 6 damage; an ally can teleport up to 3 squares.',
																	tier2: 'An enemy takes 10 damage; an ally can teleport up to 5 squares.',
																	tier3: 'An enemy takes 14 damage; an ally can teleport up to 7 squares.'
																}
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-1-9-1b',
												name: 'Demon Door',
												description: 'You create a temporary portal to allow a massive demonic hand to reach through.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-1-9-1b',
														name: 'Demon Door',
														description: 'You create a temporary portal to allow a massive demonic hand to reach through.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic',
															'Melee',
															'Strike',
															'Weapon'
														],
														distance: [
															{
																type: 'Melee',
																value: 3,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'One creature',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '13 + A corruption damage; push 3',
																	tier2: '18 + A corruption damage; push 5',
																	tier3: '25 + A corruption damage; push 7'
																}
															},
															{
																type: 'text',
																text: 'On a critical hit, the target is grabbed by the demon and pulled through the portal before it closes, never to be seen again.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 10,
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
								description: 'A little poison goes a long way.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-2-1-2',
										name: 'Coat The Blade',
										description: 'A little poison goes a long way.',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'You gain two surges. Additionally, whenever you use a surge before the end of the encounter, you can choose to have it deal poison damage.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: true,
												effect: 'For each insight you spend, you gain 1 additional surge.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
									}
								}
							},
							{
								id: 'shadow-sub-2-1-3',
								name: 'Smoke Bomb',
								description: 'You always carry a supply of smoke bombs to use for distractions and easy getaways. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are automatically hidden.',
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
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'You take half the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'The potency of any effects associated with the damage are reduced by 1 for you.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
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
															qualifiers: [],
															freeStrike: false
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
														sections: [
															{
																type: 'text',
																text: 'You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can disarm and remove it as a main action. If they don’t, at the end of your next turn, the bomb detonates. When the bomb detonates, you make a power roll targeting each enemy within 2 squares of it.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '4 + A fire damage',
																	tier2: '7 + A fire damage',
																	tier3: '11 + A fire damage'
																}
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-2-2-1b',
												name: 'Stink Bomb',
												description: 'Putrid yellow gas explodes from a bomb you toss.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-2-1b',
														name: 'Stink Bomb',
														description: 'Putrid yellow gas explodes from a bomb you toss.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '2 poison damage',
																	tier2: '5 poison damage',
																	tier3: '7 poison damage'
																}
															},
															{
																type: 'text',
																text: 'The gas remains in the area until the end of the encounter. Any creature who starts their turn in the area and has M < [average] is weakened (save ends).'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
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
								description: 'You know just where to cut your enemies. Whenever you make a strike that has no bane or double bane, and that incorporates 1 or more surges, you gain 1 additional surge that you can use only on that strike.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: []
					},
					{
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'shadow-sub-2-5-1',
								name: 'Volatile Reagents',
								description: '\nWhenever you take damage, each enemy adjacent to you takes fire, acid, or poison damage (your choice) equal to your Agility score.\n\nAdditionally, your Defensive Roll ability now allows you to shift up to 5 squares, including shifting vertically. If you don’t end this shift on solid ground and are not flying, you fall.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'shadow-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-2-6-1a',
												name: 'One Vial Makes You Better',
												description: 'A well-timed throw of a potion will keep your allies in the fight.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-6-1a',
														name: 'One Vial Makes You Better',
														description: 'A well-timed throw of a potion will keep your allies in the fight.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														target: 'Three creatures',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: '\nYou ready, hand, or lob a potion to each target, who can immediately quaff the potion (no action required). If they don’t drink the potion right away, they must use the Use Consumable maneuver to consume it later. The potion loses its potency at the end of the encounter.\n\nA creature who drinks the potion can spend up to 2 Recoveries, and has acid immunity, fire immunity, or poison immunity (their choice) equal to your level until the end of the encounter.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-2-6-1b',
												name: 'One Vial Makes You Faster',
												description: 'Each ally who catches a potion you throw can take the battle to the next level.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-6-1b',
														name: 'One Vial Makes You Faster',
														description: 'Each ally who catches a potion you throw can take the battle to the next level.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														target: 'Three creatures',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: '\nYou ready, hand, or lob a potion to each target, who can immediately quaff the potion (no action required). If they don’t drink the potion right away, they must use the Use Consumable maneuver to consume it later. The potion loses its potency at the end of the encounter.\n\nA creature who drinks the potion receives benefits based on your power roll.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: 'The creature’s speed is increased by 2 until the end of the encounter.',
																	tier2: 'The creature can fly until the end of the encounter.',
																	tier3: 'The creature turns invisible until the end of their next turn.'
																}
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 7,
						features: []
					},
					{
						level: 8,
						features: [
							{
								id: 'shadow-sub-2-8-1',
								name: 'Time Bomb',
								description: 'You have damage immunity against area abilities and effects equal to your Agility score.',
								type: 'Text',
								data: null
							},
							{
								id: 'shadow-sub-2-8-2',
								name: 'Time Bomb',
								description: 'The longer it cooks, the bigger the boom.',
								type: 'Ability',
								data: {
									ability: {
										id: 'shadow-sub-2-8-2',
										name: 'Time Bomb',
										description: 'The longer it cooks, the bigger the boom.',
										type: {
											usage: 'Maneuver',
											free: true,
											trigger: '',
											time: '',
											qualifiers: [],
											freeStrike: false
										},
										keywords: [
											'Area',
											'Ranged'
										],
										distance: [
											{
												type: 'Cube',
												value: 2,
												value2: 0,
												within: 10,
												special: '',
												qualifier: ''
											}
										],
										target: 'Each enemy in the area',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: '\nEach target takes acid, fire, or poison damage (your choice) equal to your Agility score.\n\nFor each combat round that has passed since this ability was last used in the current encounter, the area increases by 1 and you gain 1 surge that must be used with this ability. After using the ability or at the end of the encounter, its area and surges are reset.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 2,
												repeatable: true,
												effect: 'For every 2 insight spent, you increase the cube’s size by 1 and gain 1 surge that can be used only with this ability.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
									}
								}
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'shadow-sub-2-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-2-9-1a',
												name: 'Chain Reaction',
												description: 'One explosion, an offense. Three explosions, an assault. Nine explosions, a celebration.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-9-1a',
														name: 'Chain Reaction',
														description: 'One explosion, an offense. Three explosions, an assault. Nine explosions, a celebration.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														target: 'One creature or object',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each enemy within 3 squares of the target who is not currently targeted by this ability also becomes targeted by this ability. This effect continues until there are no more available targets. The ability deals acid, fire, or poison damage (your choice).'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '7 damage',
																	tier2: '10 damage',
																	tier3: '15 damage'
																}
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-2-9-1b',
												name: 'To the Stars',
												description: 'You attach your most potent explosive to your foe. Under less pressing circumstances, you’re sure you could launch them into orbit.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-2-9-1b',
														name: 'To the Stars',
														description: 'You attach your most potent explosive to your foe. Under less pressing circumstances, you’re sure you could launch them into orbit.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Melee',
															'Ranged',
															'Strike'
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
																value: 10,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'One creature or object',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '4 + A fire damage; vertical push 8',
																	tier2: '7 + A fire damage; vertical push 10',
																	tier3: '11 + A fire damage; vertical push 15'
																}
															},
															{
																type: 'text',
																text: 'The ground beneath a 3-cube area around the target’s starting position is difficult terrain.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 10,
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
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: '\nYou envelop yourself in an illusion that makes you appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic and unarmed version of yourself. While this illusion lasts, your strikes gain an edge, and when you take the Disengage move action, you gain a +1 bonus to the distance you can shift.\n\nThe illusion ends when you harm another creature, when you physically interact with a creature, when you use this ability again, or when you end the illusion (no action required). If you end this illusion by harming another creature, you gain 1 surge.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'Choose a creature whose size is no more than 1 greater than yours and who is within 10 squares. This ability’s illusion makes you appear as that creature. This illusion covers your entire body, including clothing and armor, and alters your voice to sound like that of the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
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
											qualifiers: [],
											freeStrike: false
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
										sections: [
											{
												type: 'text',
												text: 'Choose an enemy within distance of the triggering strike, including the enemy who targeted you. The strike targets that enemy instead.'
											}
										],
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: []
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
															qualifiers: [],
															freeStrike: false
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: 'Slide 4',
																	tier2: 'Slide 5',
																	tier3: 'Slide 7'
																}
															},
															{
																type: 'text',
																text: 'This forced movement ignores stability. Instead, the forced movement is reduced by a number equal to the target’s Intuition score.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
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
															trigger: 'Another creature targets you with a strike.',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You use your Clever Trick ability with no insight cost against the triggering creature and strike. You can teleport to an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
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
								description: '\nYour illusions make your enemies believe you are their friend in critical moments. Whenever an enemy uses an ability or trait that targets multiple allies and you are within distance of the effect, you can choose to be a target of the effect as well.\n\nAdditionally, when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: []
					},
					{
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'shadow-sub-3-5-1',
								name: 'Harlequin Gambit',
								description: '\nWhenever you reduce an adjacent non-minion creature to 0 Stamina, you can immediately use a free maneuver to use your I’m No Threat ability and then move up to your speed.\n\nIf the creature is the same size as you, you can disguise yourself as them using I’m No Threat without spending insight. If you do, while I’m No Threat is active, the creature’s body is disguised to look like your body. The illusion ends on their body if another creature physically interacts with it. When the illusion would end for either you or the creature’s body, it ends for both.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'shadow-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-3-6-1a',
												name: 'Look!',
												description: 'You distract your foes, allowing your allies to take advantage of that distraction.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-6-1a',
														name: 'Look!',
														description: 'You distract your foes, allowing your allies to take advantage of that distraction.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Area',
															'Magic'
														],
														distance: [
															{
																type: 'Burst',
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each enemy in the area',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the start of your next turn, any ability roll made against a target gains an edge.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-3-6-1b',
												name: 'Puppet Strings',
												description: 'You prick little needles on the tips of your fingers into the nerves of your enemies and cause them to lose control.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-6-1b',
														name: 'Puppet Strings',
														description: 'You prick little needles on the tips of your fingers into the nerves of your enemies and cause them to lose control.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic',
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
														target: 'Two enemies',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '2 damage; if the target has R < [weak], before the damage is resolved, they make a free strike.',
																	tier2: '5 damage; if the target has R < [average], before the damage is resolved, they use a main action ability of your choice.',
																	tier3: '7 damage; if the target has R < [strong], before the damage is resolved, they can shift up to their speed and use a main action ability of your choice.'
																}
															},
															{
																type: 'text',
																text: 'You choose the new targets for the original target’s free strike or ability. Additionally, if you are hidden or disguised, using this ability doesn’t cause you to be revealed.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 7,
						features: []
					},
					{
						level: 8,
						features: [
							{
								id: 'shadow-sub-3-8-1',
								name: 'Parkour',
								description: 'Your movement no longer provokes opportunity attacks. Additionally, you can use your Harlequin Gambit feature as a free triggered action when a creature is reduced to 0 Stamina by your Clever Trick ability.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'shadow-sub-3-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'shadow-sub-3-9-1a',
												name: 'I Am You',
												description: 'Your mask reflects your foe’s face. Surely they won’t need it much longer.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-9-1a',
														name: 'I Am You',
														description: 'Your mask reflects your foe’s face. Surely they won’t need it much longer.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
														},
														keywords: [
															'Magic',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter, you gain the target’s damage immunities and speed (if they are better than yours), and can use any types of movement they can use. You can also use the target’s signature ability, using their bonus for the power roll.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										},
										{
											feature: {
												id: 'shadow-sub-3-9-1b',
												name: 'It Was Me All Along',
												description: 'After everything you’ve been through together, you twist the blade and make the pain extra personal.',
												type: 'Ability',
												data: {
													ability: {
														id: 'shadow-sub-3-9-1b',
														name: 'It Was Me All Along',
														description: 'After everything you’ve been through together, you twist the blade and make the pain extra personal.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: [],
															freeStrike: false
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
														target: 'One creature or object',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '15 + A damage',
																	tier2: '21 + A damage',
																	tier3: '28 + A damage'
																}
															},
															{
																type: 'text',
																text: 'If you are disguised as a creature the target knew using your I’m No Threat ability, this ability deals extra damage equal to three times your Agility score.'
															}
														],
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '',
														strained: '',
														alternateEffects: [],
														spend: [],
														persistence: []
													}
												}
											},
											value: 1
										}
									],
									count: 1,
									selected: []
								}
							}
						]
					},
					{
						level: 10,
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
						'Pick Lock',
						'Pick Pocket'
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
							description: 'Whenever you fail a test using any skill from the intrigue skill group, you can lose Stamina equal to 1d6 + your level to improve the outcome of the test by one tier. You can use this perk only once per test.',
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
			selected: {
				id: 'career-criminal-ii-6',
				name: 'Stand Against Tyranny',
				description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter - pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance - not just against this tyrant, but against authoritarians anywhere.'
			},
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
