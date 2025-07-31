import { Hero } from '../../models/hero';

export const humanCensor = {
	id: 'qrjxZPFJhWdJiZyk',
	name: 'Jennet',
	picture: null,
	folder: '',
	settingIDs: [
		'',
		'orden'
	],
	ancestry: {
		id: 'ancestry-human',
		name: 'Human',
		description: '“Humans,” the dwarf said with a combination of exasperation and awe. “Their only virtue seems to be believing in impossible things.”',
		features: [
			{
				id: 'human-feature-1',
				name: 'Detect the Supernatural',
				description: 'You open your awareness to detect supernatural creatures and phenomena.',
				type: 'Ability',
				data: {
					ability: {
						id: 'human-feature-1',
						name: 'Detect the Supernatural',
						description: 'You open your awareness to detect supernatural creatures and phenomena.',
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
						effect: 'Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is undead, a construct, or from another plane of existence.',
						strained: '',
						alternateEffects: [],
						spend: [],
						persistence: [], sections: []
					}
				}
			},
			{
				id: 'human-feature-2',
				name: 'Human Traits',
				description: '',
				type: 'Choice',
				data: {
					options: [
						{
							feature: {
								id: 'human-feature-2-1',
								name: 'Can\'t Take Hold',
								description: 'Your connection to the natural world allows you resist supernatural effects. You ignore difficult terrain (but not other effects) created by magic and psionic abilities. Additionally, when you are force moved by a magic or psionic ability, you reduce the forced movement by 1.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'human-feature-2-2',
								name: 'Perseverence',
								description: 'Giving up is for other people. You have an edge on tests that use the Endurance skill and when you are slowed, your speed is reduced to 3 instead of 2.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'human-feature-2-3',
								name: 'Resist the Unnatural',
								description: 'Your connection to the natural world protects you from unnatural forces.',
								type: 'Ability',
								data: {
									ability: {
										id: 'human-feature-2-3',
										name: 'Resist the Unnatural',
										description: 'Your connection to the natural world protects you from unnatural forces.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'You take damage that isn’t untyped',
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
										effect: 'You halve the damage.',
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
								id: 'human-feature-2-4',
								name: 'Determination',
								description: 'Your anatomical tolerance for pain allows you to push through difficult situations.',
								type: 'Ability',
								data: {
									ability: {
										id: 'human-feature-2-4',
										name: 'Determination',
										description: 'Your anatomical tolerance for pain allows you to push through difficult situations.',
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
										effect: 'You can end the frightened, slowed, or weakened condition on yourself.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							value: 2
						},
						{
							feature: {
								id: 'human-feature-2-5',
								name: 'Staying Power',
								description: 'Your human anatomy allows you to fight, run, and stay awake longer than others.',
								type: 'Bonus',
								data: {
									field: 'Recoveries',
									value: 2,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 1,
									valuePerLevel: 0,
									valuePerEchelon: 0
								}
							},
							value: 2
						}
					],
					count: 3,
					selected: [
						{
							id: 'human-feature-2-3',
							name: 'Resist the Unnatural',
							description: 'Your connection to the natural world protects you from unnatural forces.',
							type: 'Ability',
							data: {
								ability: {
									id: 'human-feature-2-3',
									name: 'Resist the Unnatural',
									description: 'Your connection to the natural world protects you from unnatural forces.',
									type: {
										usage: 'Triggered Action',
										free: false,
										trigger: 'You take damage that isn’t untyped',
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
									effect: 'You halve the damage.',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [], sections: []
								}
							}
						},
						{
							id: 'human-feature-2-5',
							name: 'Staying Power',
							description: 'Your human anatomy allows you to fight, run, and stay awake longer than others.',
							type: 'Bonus',
							data: {
								field: 'Recoveries',
								value: 2,
								valueCharacteristics: [],
								valueCharacteristicMultiplier: 1,
								valuePerLevel: 0,
								valuePerEchelon: 0
							}
						}
					]
				}
			}
		]
	},
	culture: {
		id: 'culture-human',
		name: 'Human',
		description: 'Urban, communal, labor.',
		languages: [
			'Vaslorian'
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
					'Escape Artist'
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
					'Persuade'
				]
			}
		},
		upbringing: {
			id: 'up-labor',
			name: 'Labor',
			description: 'People who labor for a living survive through cultivation, typically raising crops or livestock on a farm; by harvesting natural resources, whether by hunting, trapping, logging, or mining; or through manual labor tied to settlement and trade, such as construction, carting, loading cargo, and so forth. People with a labor upbringing know the value of hard work.',
			type: 'Skill Choice',
			data: {
				options: [
					'Blacksmithing',
					'Handle Animals'
				],
				listOptions: [
					'Exploration'
				],
				count: 1,
				selected: [
					'Climb'
				]
			}
		}
	},
	class: {
		id: 'class-censor',
		name: 'Censor',
		description: '\nDemons and devils fear you. Criminals run from the sight of your shadow in the alley. Agents of chaos, blasphemers, and heretics tremble at the sound of your voice. You carry the power of the gods, armed with Wraths and sent out into the world first to seek, then censor those whose actions - or even existence - are anathema to your church.\n\nYou’re at your best against the strongest foes. Your judgments terrify heretics, stop enemies in their tracks, even hurl them across the battlefield.',
		heroicResource: 'Wrath',
		subclassName: 'Order',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Might',
				'Presence'
			]
		],
		primaryCharacteristics: [
			'Might',
			'Presence'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: 'censor-stamina',
						name: 'Stamina',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Stamina',
							value: 21,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 12,
							valuePerEchelon: 0
						}
					},
					{
						id: 'censor-recoveries',
						name: 'Recoveries',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Recoveries',
							value: 12,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 0,
							valuePerEchelon: 0
						}
					},
					{
						id: 'censor-1-1',
						name: 'Interpersonal / Lore Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Interpersonal',
								'Lore'
							],
							count: 2,
							selected: [
								'Religion',
								'Intimidate'
							]
						}
					},
					{
						id: 'censor-1-2',
						name: 'Domain',
						description: '',
						type: 'Domain',
						data: {
							count: 1,
							selected: [
								{
									id: 'domain-war',
									name: 'War',
									description: 'The War domain.',
									featuresByLevel: [
										{
											level: 1,
											features: [
												{
													id: 'domain-war-1',
													name: 'Sanctified Weapon, Exploration Skill',
													description: 'Sanctified Weapon, Exploration Skill',
													type: 'Multiple Features',
													data: {
														features: [
															{
																id: 'domain-war-1-1',
																name: 'Sanctified Weapon',
																description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 rolled damage bonus with abilities that use the weapon. This benefit lasts until you finish another respite.',
																type: 'Text',
																data: null
															},
															{
																id: 'domain-war-1-2',
																name: 'Exploration Skill',
																description: '',
																type: 'Skill Choice',
																data: {
																	options: [],
																	listOptions: [
																		'Exploration'
																	],
																	count: 1,
																	selected: []
																}
															}
														]
													}
												}
											]
										},
										{
											level: 2,
											features: [
												{
													id: 'domain-war-2',
													name: 'Blessing of Insight',
													description: 'The gods grant insight revealing where best to strike your enemies.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-war-2',
															name: 'Blessing of Insight',
															description: 'The gods grant insight revealing where best to strike your enemies.',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
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
															target: 'Self and each ally in the area',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: null,
															test: null,
															effect: 'Until the end of the encounter or until you are dying, each target gains a surge at the end of each of your turns.',
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
											level: 3,
											features: []
										}
									],
									piety: '\n* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of deals damage in an amount equal to or greater than 10 + your level.\n* Prayer Effect: Three allies of your choice within 10 squares of you, including yourself, gain two surges.'
								}
							]
						}
					},
					{
						id: 'censor-1-3',
						name: 'Wrath',
						description: '\nAt the start of each of your turns during combat, you gain 2 wrath.\n\nAdditionally, the first time each round that a creature judged by you (see Judgment) deals damage to you, you gain 1 wrath. You also gain 1 wrath the first time each round that you deal damage to a creature judged by you.',
						type: 'Text',
						data: null
					},
					{
						id: 'censor-1-4',
						name: 'Judgment',
						description: 'You utter a prayer that outlines your foe in holy energy.',
						type: 'Ability',
						data: {
							ability: {
								id: 'censor-1-4',
								name: 'Judgment',
								description: 'You utter a prayer that outlines your foe in holy energy.',
								type: {
									usage: 'Maneuver',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
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
								target: '1 enemy',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '\nThe target is judged by you until the end of the encounter, you die, you use this ability again, or you willingly end this effect (no action required). If another censor judges the target, then your judgment on the target ends.\n\nIf a judged creature uses an action and you have line of effect to them, you can use a free triggered action to deal holy damage equal to twice your Presence score to them.\n\nWhen the judged creature is reduced to 0 Stamina, you can use a free triggered action to use this ability against a new target within distance.\n\nIn addition, you can spend 1 wrath to take one of the following free triggered actions. You can’t use more than one instance of a benefit per trigger:\n\n* When an adjacent judged target shifts, you can make a melee free strike against them. The target doesn\'t shift and their speed becomes 0 until the end of this turn.\n* When a judged target makes a power roll, you can add a bane to the roll.\n* When a judged target within distance uses an ability with a potency against another creature, you reduce the potency of the ability by 1 for that creature (to a minimum of 0).',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'censor-1-5',
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
									id: 'kit-sword-and-board',
									name: 'Sword and Board',
									description: 'The Sword and Board kit doesn\'t just give you a shield - it makes the shield part of your offensive arsenal. With a medium weapon in one hand and a block of steel or solid oak in the other, you can protect yourself and control the battlefield.',
									type: '',
									armor: [
										'Medium Armor',
										'Shield'
									],
									weapon: [
										'Medium Weapon'
									],
									stamina: 9,
									speed: 0,
									stability: 1,
									meleeDamage: {
										tier1: 2,
										tier2: 2,
										tier3: 2
									},
									rangedDamage: null,
									meleeDistance: 0,
									rangedDistance: 0,
									disengage: 1,
									features: [
										{
											id: 'kit-sword-and-board-signature',
											name: 'Shield Bash',
											description: 'In your hands, a shield isn’t just for protection.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-sword-and-board-signature',
													name: 'Shield Bash',
													description: 'In your hands, a shield isn’t just for protection.',
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
													target: '1 creature',
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
														tier1: '2 + M or A damage; push 1',
														tier2: '5 + M or A damage; push 2',
														tier3: '7 + M or A damage; push 3; M < [strong] prone'
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
						id: 'censor-1-6',
						name: 'My Life for Yours',
						description: 'The first principle of the oath: defend the righteous.',
						type: 'Ability',
						data: {
							ability: {
								id: 'censor-1-6',
								name: 'My Life for Yours',
								description: 'The first principle of the oath: defend the righteous.',
								type: {
									usage: 'Triggered Action',
									free: false,
									trigger: 'The target starts their turn or takes damage.',
									time: '',
									qualifiers: []
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
								target: 'Self or one ally',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'You spend a Recovery and the target regains Stamina equal to your Recovery value.',
								strained: '',
								alternateEffects: [],
								spend: [
									{
										value: 1,
										effect: 'You can end one effect on the target that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.',
										name: '',
										repeatable: false
									}
								],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'censor-1-7',
						name: 'Domain Feature Choice',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 1,
							count: 1,
							selected: [
								{
									id: 'domain-war-1',
									name: 'Sanctified Weapon, Exploration Skill',
									description: 'Sanctified Weapon, Exploration Skill',
									type: 'Multiple Features',
									data: {
										features: [
											{
												id: 'domain-war-1-1',
												name: 'Sanctified Weapon',
												description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 rolled damage bonus with abilities that use the weapon. This benefit lasts until you finish another respite.',
												type: 'Text',
												data: null
											},
											{
												id: 'domain-war-1-2',
												name: 'Exploration Skill',
												description: '',
												type: 'Skill Choice',
												data: {
													options: [],
													listOptions: [
														'Exploration'
													],
													count: 1,
													selected: [
														'Endurance'
													]
												}
											}
										]
									}
								}
							]
						}
					},
					{
						id: 'censor-1-8',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'censor-ability-3'
							]
						}
					},
					{
						id: 'censor-1-9',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'censor-ability-7'
							]
						}
					},
					{
						id: 'censor-1-10',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'censor-ability-9'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'censor-2-1',
						name: 'Interpersonal / Lore / Supernatural Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Interpersonal',
								'Lore',
								'Supernatural'
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
						id: 'censor-3-1',
						name: 'Look on My Work and Despair',
						description: 'Your judgment has grown in divine power, manifesting your deity’s ire against blasphemers, causing them to fear your actions, especially when their allies are smited. Whenever you judge a creature you can spend 1 wrath to channel your divine power to make them afraid. If the target has P < [average], they are frightened of you (save ends). Whenever a creature judged by you to is reduced to 0 Stamina and you judge a new target as a free triggered action, if that new target has P < [strong], they are frightened of you (save ends). If the target is already frightened of you, they take damage equal to twice your Presence score instead.',
						type: 'Text',
						data: null
					},
					{
						id: 'censor-3-2',
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
				id: 'censor-ability-1',
				name: 'Back, Blasphemer!',
				description: 'You channel power through your weapon to repel foes.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Magic',
					'Weapon'
				],
				distance: [
					{
						type: 'Cube',
						value: 2,
						value2: 0,
						within: 1,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '2 holy damage; push 1',
					tier2: '4 holy damage; push 2',
					tier3: '6 holy damage; push 3'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-2',
				name: 'Every Step ... Death!',
				description: 'You show your foe a glimpse of their fate after death.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Magic',
					'Ranged',
					'Strike'
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
				target: '1 creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '5 + P psychic damage',
					tier2: '7 + P psychic damage',
					tier3: '10 + P psychic damage'
				},
				test: null,
				effect: 'Each time the target willingly moves before the end of your next turn, they take 1 psychic damage for each square they move.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-3',
				name: 'Halt, Miscreant!',
				description: '“Your race is run!”',
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
				target: '1 creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '2 + M holy damage; P < [weak], slowed (save ends)',
					tier2: '5 + M holy damage; P < [average], slowed (save ends)',
					tier3: '7 + M holy damage; P < [strong], slowed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-4',
				name: 'Your Allies Cannot Save You!',
				description: '“See how they abandon you!”',
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
				target: '1 creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M holy damage',
					tier2: '5 + M holy damage',
					tier3: '8 + M holy damage'
				},
				test: null,
				effect: 'Each enemy adjacent to the target is pushed away from the target up to a number of squares equal to your Presence score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-5',
				name: 'Behold, a Shield of Faith!',
				description: '“Allow me to intercede.”',
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
				target: '1 creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M holy damage',
					tier2: '6 + M holy damage',
					tier3: '9 + M holy damage'
				},
				test: null,
				effect: 'Until the start of your next turn, enemies have a bane on ability power rolls made against you and each ally adjacent to you.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-6',
				name: 'Driving Assault',
				description: 'As you force your enemy back with your weapon, you use your faith to stay close.',
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
				target: '1 creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M damage; push 1',
					tier2: '6 + M damage; push 3',
					tier3: '9 + M damage; push 5'
				},
				test: null,
				effect: 'You can shift up to your speed and must end that shift within distance of the target.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-7',
				name: 'The Gods Punish and Defend',
				description: 'You channel holy energy to smite a foe and heal an ally.',
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
				target: '1 creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '5 + M holy damage',
					tier2: '8 + M holy damage',
					tier3: '11 + M holy damage'
				},
				test: null,
				effect: 'You can spend a Recovery to allow yourself or one ally within 10 squares of you to regain Stamina equal to your Recovery value.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-8',
				name: 'Repent!',
				description: 'You conjure memories of their sins.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Magic',
					'Ranged',
					'Strike'
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
				target: '1 creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '5 + P holy damage; I < [weak], dazed (save ends)',
					tier2: '8 + P holy damage; I < [average], dazed (save ends)',
					tier3: '11 + P holy damage; I < [strong], dazed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-9',
				name: 'Arrest',
				description: '“I got you, you son of a bitch.”',
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
				target: '1 creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '6 + M holy damage; grabbed',
					tier2: '9 + M holy damage; grabbed',
					tier3: '13 + M holy damage; grabbed'
				},
				test: null,
				effect: 'If the target makes a strike against a creature while grabbed by you, you can then spend 3 wrath to deal holy damage to them equal to your Presence score and change the target of the strike to another target within the strike’s distance.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-10',
				name: 'Behold the Face of Evil!',
				description: 'You show your enemies a vision of the true nature of one of their companions.',
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
				target: '1 creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M holy damage; if the target has P < [weak], each enemy within 2 squares of them is frightened of you (save ends)',
					tier2: '5 + M holy damage; if the target has P < [average], each enemy within 2 squares of them is frightened of you (save ends)',
					tier3: '8 + M holy damage; if the target has P < [strong], each enemy within 2 squares of them is frightened of you (save ends)'
				},
				test: null,
				effect: 'Each enemy frightened by this ability is pushed 2 squares away from the target and takes psychic damage equal to your Presence score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-11',
				name: 'Censored',
				description: 'Judged and sentenced.',
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
				target: '1 creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '2 + M holy damage',
					tier2: '3 + M holy damage',
					tier3: '5 + M holy damage'
				},
				test: null,
				effect: 'If a target who is not a leader or a solo creature is winded after the damage is resolved, they die.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-12',
				name: 'Purifying Fire',
				description: 'The gods judge, fire cleanses.',
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
				target: '1 creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '5 + M holy damage; M < [weak], the target has fire weakness 3 (save ends)',
					tier2: '9 + M holy damage; M < [average], the target has fire weakness 5 (save ends)',
					tier3: '12 + M holy damage; M < [strong], the target has fire weakness 7 (save ends)'
				},
				test: null,
				effect: 'While the target has fire weakness from this ability, you can choose to have your abilities deal fire damage to the target instead of holy damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-13',
				name: 'Edict of Disruptive Isolation',
				description: 'Gather not together in secret to conspire.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Aura',
						value: 2,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter or you are dying, at the end of each of your turns, each target takes holy damage equal to your Presence score. Any target adjacent to one or more enemies takes an extra 2d6 holy damage if they are judged by you or adjacent to one of your enemies.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-14',
				name: 'Edict of Perfect Order',
				description: 'Use not the fell arts!',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Aura',
						value: 2,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter or you are dying, whenever a target uses an ability that requires Malice, they take holy damage equal to three times your Presence score. A target judged by you takes an additional 2d6 holy damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-15',
				name: 'Edict of Purifying Pacifism',
				description: 'Shed not the blood of innocents!',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Aura',
						value: 2,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter or you are dying, whenever a target makes a strike, they take holy damage equal to twice your Presence score. A target judged by you takes an extra 2d6 holy damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'censor-ability-16',
				name: 'Edict of Stillness',
				description: 'Flee not from just punishment.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Magic'
				],
				distance: [
					{
						type: 'Aura',
						value: 2,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter or you are dying, whenever a target is force moved or moves willingly out of the aura, they take holy damage equal to twice your Presence score. A target judged by you who moves willingly takes an extra 2d6 holy damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			}
		],
		subclasses: [
			{
				id: 'censor-sub-1',
				name: 'Exorcist',
				description: 'An open mind is an unguarded fortress. You specialize in hunting the hidden enemies of your order.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'censor-sub-1-1-1',
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
										'Read Person'
									]
								}
							},
							{
								id: 'censor-sub-1-1-2',
								name: 'Judgment Order Benefit',
								description: 'You can teleport up to a number of squares equal to twice your Presence score. This movement must take you closer to the judged creature. You do not need line of effect to your destination.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-1-2-1',
								name: 'Saint\'s Vigilance',
								description: 'You have honed your ability to detect sin and can use it to find those who hide from justice. Any creature judged by you cannot take the Hide maneuver. You have an edge when searching for hidden creatures and, if you find a hidden creature, you can use Judgment on them as a free triggered action.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-1-2-2',
								name: 'A Sense for Truth',
								description: 'You are trained in secret techniques from your order that allow you to discern the truth at a supernatural level. This puts you in high demand for your church and any governments it is allied with. If a creature is of a lower level than you, you automatically know when they are lying, though you don’t necessarily know the actual truth behind their lie. Additionally, you have an edge on tests to detect lies or hidden motives, such as when using the Read Person skill.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-1-2-3',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-1-2-3a',
												name: 'It Is Justice You Fear',
												description: 'I am but a vessel. Your own deeds weigh upon you.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-2-3a',
														name: 'It Is Justice You Fear',
														description: 'I am but a vessel. Your own deeds weigh upon you.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Magic',
															'Ranged',
															'Strike'
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
														target: '1 creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Presence'
															],
															bonus: 0,
															tier1: '8 + M holy damage; P < [weak], frightened (save ends)',
															tier2: '12 + M holy damage; P < [average], frightened (save ends)',
															tier3: '15 + M holy damage; P < [strong], frightened (save ends)'
														},
														test: null,
														effect: 'If the target is already frightened of you or another creature when you use this ability and it would frighten them again, they take psychic damage equal to twice your Presence score instead.',
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
												id: 'censor-sub-1-2-3b',
												name: 'Revelator',
												description: 'You channel holy energy to harm unbelievers and reveal those hidden from your judgment.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-2-3b',
														name: 'Revelator',
														description: 'You channel holy energy to harm unbelievers and reveal those hidden from your judgment.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
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
														target: 'Each enemy in the area',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'Each target takes twice your Presence in holy damage. Any hidden enemies are automatically revealed and can’t become hidden again until the start of your next turn. You can use Judgment on one of the targets as a free triggered action.',
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
				id: 'censor-sub-2',
				name: 'Oracle',
				description: 'Corruption has deep tendrils that can be missed. You specialize in uncovering long-timescale threats to your order.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'censor-sub-2-1-1',
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
								id: 'censor-sub-2-1-2',
								name: 'Judgment Order Benefit',
								description: 'You deal holy damage equal to twice your Presence score to the target.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-2-2-1',
								name: 'It Was Foretold',
								description: 'Your order has trained you to understand fragments of the constant visions given to you by your deity, giving you a momentary advantage in challenging situations. At the start of an encounter, you can take one action before any other creature and before your first turn. Additionally, whenever a montage test is called for, you can make one test before the montage begins.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-2-2-2',
								name: 'Judge of Character',
								description: 'Your focus on your fragmentary visions to gain divine insight on creatures and the world beyond your normal senses. Whenever you would make an Intuition test, you can make a Presence test instead.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-2-2-3',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-2-2-3a',
												name: 'Prescient Grace',
												description: '“Hah! I see your plan. It will not work!”',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-2-3a',
														name: 'Prescient Grace',
														description: '“Hah! I see your plan. It will not work!”',
														type: {
															usage: 'Triggered Action',
															free: false,
															trigger: 'An enemy within 10 squares starts their turn.',
															time: '',
															qualifiers: []
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
														target: 'Self or one ally',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'You can spend a Recovery to allow the target to regain Stamina equal to your Recovery value. The target can then take their turn immediately before the triggering enemy.',
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
												id: 'censor-sub-2-2-3b',
												name: 'With My Blessing',
												description: 'A word in prayer, and the gods show the way.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-2-3b',
														name: 'With My Blessing',
														description: 'A word in prayer, and the gods show the way.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
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
														target: 'Self or one ally',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'When you use this ability, the target can use a free triggered action to make a signature strike or a heroic ability that is a strike, and has a double edge on the power roll.',
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
				id: 'censor-sub-3',
				name: 'Paragon',
				description: 'Without a strong example and a firm hand, the weak will be corrupted. You specialize in setting a visible example for your order.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'censor-sub-3-1-1',
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
										'Lead'
									]
								}
							},
							{
								id: 'censor-sub-3-1-2',
								name: 'Judgment Order Benefit',
								description: 'You vertically pull the target up to a number of squares equal to twice your Presence score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-3-2-1',
								name: 'Lead by Example',
								description: 'Your devotion to your deity allows you to take command of the battlefield, letting your allies benefit from your wisdom. When you are adjacent to a target, any ally gains the benefits of flanking against that target. Additionally, each of your allies gains an edge on tests made to aid other creatures with their tests.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-3-2-2',
								name: 'Stalwart Example',
								description: 'You begin to exhibit a small spark of your deity’s power, causing creatures to trust or fear you, depending on what you need. You gain an edge on tests that use skills from the interpersonal skill group.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-3-2-3',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-3-2-3a',
												name: 'Blessing of the Faithful',
												description: 'The gods reward your faith.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-2-3a',
														name: 'Blessing of the Faithful',
														description: 'The gods reward your faith.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Magic'
														],
														distance: [
															{
																type: 'Aura',
																value: 3,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self and each ally in the area',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'Until the end of the encounter or you are dying, each target in the aura gains a surge at the end of each of your turns.',
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
												id: 'censor-sub-3-2-3b',
												name: 'Sentenced',
												description: 'I am the law!',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-2-3b',
														name: 'Sentenced',
														description: 'I am the law!',
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
														target: '1 creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Presence'
															],
															bonus: 0,
															tier1: '5 + P damage; P < [weak], restrained (save ends)',
															tier2: '9 + P damage; P < [average], restrained (save ends)',
															tier3: '12 + P damage; P < [strong], restrained (save ends)'
														},
														test: null,
														effect: 'Any of your abilities that impose forced movement can move the target while they are restrained this way.',
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
				value: 2
			},
			{
				characteristic: 'Agility',
				value: -1
			},
			{
				characteristic: 'Reason',
				value: 1
			},
			{
				characteristic: 'Intuition',
				value: 1
			},
			{
				characteristic: 'Presence',
				value: 2
			}
		]
	},
	career: {
		id: 'career-watch-officer',
		name: 'Watch Officer',
		description: 'You served as an officer of the law for a local government. You might have been a single person in a much larger city watch or the only constable patrolling a small village.',
		features: [
			{
				id: 'career-watch-officer-feature-1',
				name: 'Intrigue Skill',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Intrigue'
					],
					count: 1,
					selected: [
						'Alertness'
					]
				}
			},
			{
				id: 'career-watch-officer-feature-2',
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
						'Disguise'
					]
				}
			},
			{
				id: 'career-watch-officer-feature-3',
				name: 'Language',
				description: '',
				type: 'Language Choice',
				data: {
					options: [],
					count: 2,
					selected: [
						'Szetch',
						'Zaliac'
					]
				}
			},
			{
				id: 'career-watch-officer-feature-4',
				name: 'Exploration Perk',
				description: '',
				type: 'Perk',
				data: {
					lists: [
						'Exploration'
					],
					count: 1,
					selected: [
						{
							id: 'perk-team-leader',
							name: 'Team Leader',
							description: 'At the start of a group test or montage test, you can spend a hero token. If you do, all participants make tests as if they also had your exploration skills.',
							type: 'Text',
							data: null,
							list: 'Exploration'
						}
					]
				}
			}
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-watch-officer-ii-1',
					name: 'Bigger Fish',
					description: 'You grew bored and disillusioned with chasing down petty thieves and imprisoning folks just trying to survive. Surely there are greater threats in the world. You will find that evil wherever it may lurk, and you’ll be the one to stop it.'
				},
				{
					id: 'career-watch-officer-ii-2',
					name: 'Corruption Within',
					description: 'You joined the force to help the helpless and bring justice to those wronged. You weren’t prepared for the rampant corruption reaching the top of your organization. You refused to cover for your fellow officers and were told in no simple terms to leave town or face the consequences. Now you travel as a hero, acting as the protector you always wanted to be.'
				},
				{
					id: 'career-watch-officer-ii-3',
					name: 'Frame Job',
					description: 'Your partner was murdered. That much is irrefutable. But you didn’t do it, despite what the evidence implies. When it became clear you’d take the fall, you fled, leaving everything behind. Not content to cower in the shadows, you decided to adventure under a new name while you work to clear your own.'
				},
				{
					id: 'career-watch-officer-ii-4',
					name: 'Missing Mentor',
					description: 'You learned everything you know about the job from someone you always looked up to in a corrupt organization. One night, they sent you a cryptic message saying they had discovered “something big,” but before you found out more, they disappeared. No longer sure who you could trust, you slipped away and sought a new life. Now you do what good you can and search to find the truth.'
				},
				{
					id: 'career-watch-officer-ii-5',
					name: 'One That Got Away',
					description: 'A particularly violent or depraved criminal began targeting you - perhaps stealing something personal or hurting someone you love - after slipping through your grasp. You left your career to pursue the criminal, but the trail has gone cold … for now. Might as well help folk in the meantime.'
				},
				{
					id: 'career-watch-officer-ii-6',
					name: 'Powerful Enemies',
					description: 'You made it your responsibility to root out and bring down the region’s foremost crime syndicate. They sent goons to burn down your home and teach you a lesson, leaving you bleeding in the street with nothing left except your life. You’ve since taken on the life of a hero to gain the power and influence you need to destroy the syndicate once and for all.'
				}
			],
			selectedID: 'career-watch-officer-ii-1'
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
