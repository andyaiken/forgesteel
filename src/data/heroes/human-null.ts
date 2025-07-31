import { Hero } from '../../models/hero';

export const humanNull = {
	id: '75cnGojH6jMwHJQq',
	name: 'Ashley',
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
		id: 'culture-bespoke-culture',
		name: 'Bespoke Culture',
		description: 'Choose any Environment, Organization, and Upbringing.',
		languages: [
			'Vaslorian'
		],
		environment: {
			id: 'env-secluded',
			name: 'Secluded',
			description: 'A secluded culture is based in one relatively close-quarters structure - a building, a cavern, and so forth - and interacts with other cultures only rarely. Such places are often buildings or complexes such as monasteries, castles, or prisons. Folk in a secluded culture have little or no reason to leave their home or interact with other cultures on the outside, but might have an awareness of those cultures and of events happening outside their enclave.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Interpersonal',
					'Lore'
				],
				count: 1,
				selected: [
					'Read Person'
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
					'Lift'
				]
			}
		}
	},
	class: {
		id: 'class-null',
		name: 'Null',
		description: '\nThe mind is not separate from the body. Perfection of one requires perfection of the other. You strive for perfect discipline, perfect order, mastery over mind and body. You require no weapons, no tools. Any tool can be turned against the hand that wields it. You suffice.\n\nAs you strive for perfect order, you become an enemy of that ultimate expression of chaos: magic. Those who employ sorcery or psionics to break the laws of nature should fear you.\n\nThe null is an unarmed psionic warrior who dampens and absorbs the effects of magic and psionics. You need no weapon because you are the weapon. Play a null if you want to resist the supernatural forces of the universe with expert calm and confidence.',
		heroicResource: 'Discipline',
		subclassName: 'Tradition',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Agility',
				'Intuition'
			]
		],
		primaryCharacteristics: [
			'Agility',
			'Intuition'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: 'null-stamina',
						name: 'Stamina',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Stamina',
							value: 21,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 9,
							valuePerEchelon: 0
						}
					},
					{
						id: 'null-recoveries',
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
						id: 'null-1-1',
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
								'Psionics'
							]
						}
					},
					{
						id: 'null-1-2',
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
								'Timescape',
								'Empathize'
							]
						}
					},
					{
						id: 'null-1-3',
						name: 'Discipline',
						description: 'At the start of each of your turns during combat, you gain 2 discipline. Additionally, you gain 1 discipline the first time in a round an enemy in your null field takes an action. You gain 1 discipline the first time in a round that an enemy uses Malice.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-1-4',
						name: 'Null Field',
						description: 'You project a psionic field of order around your body, dampening the effects of supernatural abilities harmful to you and your allies.',
						type: 'Ability',
						data: {
							ability: {
								id: 'null-1-4',
								name: 'Null Field',
								description: 'You project a psionic field of order around your body, dampening the effects of supernatural abilities harmful to you and your allies.',
								type: {
									usage: 'Maneuver',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
								},
								keywords: [
									'Psionic'
								],
								distance: [
									{
										type: 'Aura',
										value: 1,
										value2: 0,
										within: 0,
										special: '',
										qualifier: ''
									}
								],
								target: 'All enemies',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '\nEach target reduces their potencies by 1.\n\nOnce as a free maneuver on your turn, you can spend 1 discipline and give your Null Field has one of the following additional effects until the start of your next turn:\n\n* **Gravitic Disruption**: When a target takes damage, you can slide them 2.\n* **Inertial Anchor**: Each target who starts their turn in the area cannot shift.\n* **Synaptic Break**: When a target is subjected to a potency, the potency is increased by 1.\n\nThis ability stays active even after encounters end. It ends if you are dying or if you willingly end it (no action required).',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'null-1-5',
						name: 'Inertial Shield',
						description: 'Your instincts for danger let you predict attacks before they happen.',
						type: 'Ability',
						data: {
							ability: {
								id: 'null-1-5',
								name: 'Inertial Shield',
								description: 'Your instincts for danger let you predict attacks before they happen.',
								type: {
									usage: 'Triggered Action',
									free: false,
									trigger: 'You take damage.',
									time: '',
									qualifiers: []
								},
								keywords: [
									'Psionic'
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
								effect: 'You halve the damage.',
								strained: '',
								alternateEffects: [],
								spend: [
									{
										value: 1,
										effect: 'You decrease the potency of one effect associated with the damage for you by 1.',
										name: '',
										repeatable: false
									}
								],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'null-1-6',
						name: 'Null Speed',
						description: 'Your psionic mastery of your body allows you to achieve great quickness.',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'null-1-6a',
									name: 'Speed',
									description: '',
									type: 'Bonus',
									data: {
										field: 'Speed',
										value: 0,
										valueCharacteristics: [
											'Agility'
										],
										valueCharacteristicMultiplier: 1,
										valuePerLevel: 0,
										valuePerEchelon: 0
									}
								},
								{
									id: 'null-1-6b',
									name: 'Disengage',
									description: '',
									type: 'Bonus',
									data: {
										field: 'Disengage',
										value: 0,
										valueCharacteristics: [
											'Agility'
										],
										valueCharacteristicMultiplier: 1,
										valuePerLevel: 0,
										valuePerEchelon: 0
									}
								}
							]
						}
					},
					{
						id: 'null-1-7',
						name: 'Psionic Augmentation',
						description: 'Your training has turned your body into the perfect psionic weapon, shaping pathways in your mind that enhance your physical form. Choose one of the following augmentations. You can change your focus by undergoing a psionic meditation as a respite activity.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'null-1-7a',
										name: 'Density Augmentation',
										description: 'Stability, Stamina',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'null-1-7aa',
													name: 'Stability',
													description: '',
													type: 'Bonus',
													data: {
														field: 'Stability',
														value: 1,
														valueCharacteristics: [],
														valueCharacteristicMultiplier: 1,
														valuePerLevel: 0,
														valuePerEchelon: 0
													}
												},
												{
													id: 'null-1-7ab',
													name: 'Stamina',
													description: '',
													type: 'Bonus',
													data: {
														field: 'Stamina',
														value: 0,
														valueCharacteristics: [],
														valueCharacteristicMultiplier: 1,
														valuePerLevel: 0,
														valuePerEchelon: 6
													}
												}
											]
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'null-1-7b',
										name: 'Force Augmentation',
										description: '',
										type: 'Ability Damage',
										data: {
											keywords: [
												'Psionic'
											],
											value: 1,
											valueCharacteristics: [],
											valueCharacteristicMultiplier: 0,
											valuePerLevel: 0,
											valuePerEchelon: 0,
											damageType: 'Damage'
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'null-1-7c',
										name: 'Speed Augmentation',
										description: 'Speed, Disengage',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'null-1-7ca',
													name: 'Speed',
													description: '',
													type: 'Bonus',
													data: {
														field: 'Speed',
														value: 1,
														valueCharacteristics: [],
														valueCharacteristicMultiplier: 1,
														valuePerLevel: 0,
														valuePerEchelon: 0
													}
												},
												{
													id: 'null-1-7cb',
													name: 'Disengage',
													description: '',
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
									},
									value: 1
								}
							],
							count: 1,
							selected: [
								{
									id: 'null-1-7a',
									name: 'Density Augmentation',
									description: 'Stability, Stamina',
									type: 'Multiple Features',
									data: {
										features: [
											{
												id: 'null-1-7aa',
												name: 'Stability',
												description: '',
												type: 'Bonus',
												data: {
													field: 'Stability',
													value: 1,
													valueCharacteristics: [],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												}
											},
											{
												id: 'null-1-7ab',
												name: 'Stamina',
												description: '',
												type: 'Bonus',
												data: {
													field: 'Stamina',
													value: 0,
													valueCharacteristics: [],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 6
												}
											}
										]
									}
								}
							]
						}
					},
					{
						id: 'null-1-8',
						name: 'Psionic Martial Arts',
						description: 'When you use the Knockback or Grab maneuver, you use Intuition instead of Might for the power roll. If you use Knockback, you can choose to slide the target instead of pushing them.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-1-9',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							minLevel: 1,
							count: 2,
							selectedIDs: [
								'null-ability-2',
								'null-ability-3'
							]
						}
					},
					{
						id: 'null-1-10',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'null-ability-12'
							]
						}
					},
					{
						id: 'null-1-11',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'null-ability-16'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'null-2-1',
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
						id: 'null-3-1',
						name: 'Psionic Leap',
						description: 'You can long and high jump a distance equal to twice your Agility score without needing to make a test.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-3-2',
						name: 'Reorder',
						description: '',
						type: 'Ability',
						data: {
							ability: {
								id: 'null-3-2',
								name: 'Reorder',
								description: '',
								type: {
									usage: 'Triggered Action',
									free: true,
									trigger: 'You start your turn.',
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
								effect: 'You can end one effect on you or another creature in the area of your Null Field ability.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'null-3-3',
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
				id: 'null-ability-1',
				name: 'Dance of Blows',
				description: 'You strike everywhere at once, tricking an enemy into moving out of position.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Melee',
					'Psionic',
					'Weapon'
				],
				distance: [
					{
						type: 'Burst',
						value: 1,
						value2: 0,
						within: 0,
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 damage',
					tier2: '5 damage',
					tier3: '7 damage'
				},
				test: null,
				effect: 'You can slide one adjacent enemy up to a number of squares equal to your Intuition score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-2',
				name: 'Faster than the Eye',
				description: 'You strike so quickly that your hands become a blur.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
				target: 'Two creatures or objects',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '4 damage',
					tier2: '5 damage',
					tier3: '7 damage'
				},
				test: null,
				effect: 'You can deal damage equal to your Agility score to an adjacent creature or object.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-3',
				name: 'Inertial Step',
				description: 'You flit about the battlefield with an opportunistic strike.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '5 + A damage',
					tier2: '7 + A damage',
					tier3: '10 + A damage'
				},
				test: null,
				effect: 'You can shift up to half your speed before or after you make the strike.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-4',
				name: 'Joint Lock',
				description: 'You contort your enemy’s body into a stance they struggle to escape from.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; A < [weak], grabbed',
					tier2: '7 + A damage; A < [average], grabbed',
					tier3: '9 + A damage; A < [strong], grabbed'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-5',
				name: 'Kinetic Strike',
				description: 'Your opponent staggers. They cannot ignore you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; taunted (EoT)',
					tier2: '5 + A damage; taunted (EoT); slide 1',
					tier3: '6 + A damage; taunted (EoT); slide 2'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-6',
				name: 'Magnetic Strike',
				description: 'The force of your blow extends past the limits of your body, pulling your enemy closer.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
					'Strike',
					'Weapon'
				],
				distance: [
					{
						type: 'Melee',
						value: 2,
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
						'Agility'
					],
					bonus: 0,
					tier1: '5 + A psychic damage; vertical pull 1',
					tier2: '8 + A psychic damage; vertical pull 2',
					tier3: '11 + A psychic damage; vertical pull 3'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-7',
				name: 'Phase Inversion Strike',
				description: 'You step momentarily out of phase as you pull an enemy through you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; push 2',
					tier2: '6 + A damage; push 4',
					tier3: '8 + A damage; push 6'
				},
				test: null,
				effect: 'Before the push is resolved, teleport the target to a square adjacent to you opposite the one they started in. If the target cannot be teleported, then they ignore the push.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-8',
				name: 'Pressure Points',
				description: 'You strike at key nerve clusters to leave your foe staggered.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; A < [weak], weakened (save ends)',
					tier2: '7 + A damage; A < [average], weakened (save ends)',
					tier3: '9 + A damage; A < [strong], weakened (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-9',
				name: 'Chronal Spike',
				description: 'You foresee the best moment to strike, then exploit it.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '7 + A damage',
					tier2: '10 + A damage',
					tier3: '13 + A damage'
				},
				test: null,
				effect: 'You can shift up to half your speed before or after you make the strike. Additionally, whenever an effect lets you use a free strike or a signature ability, you can use this ability instead, paying its discipline cost as usual.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-10',
				name: 'Psychic Pulse',
				description: 'A burst of psionic energy interferes with your enemy’s synapses.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Psionic'
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the area of your Null Field ability increases by 1. When you end your turn, each enemy in that area takes psychic damage equal to your Intuition score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-11',
				name: 'Relentless Nemesis',
				description: 'You strike, and for the next few moments, your enemy can’t escape you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '6 + A damage',
					tier2: '8 + A damage',
					tier3: '12 + A damage'
				},
				test: null,
				effect: 'Until the start of your next turn, when the target moves, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-12',
				name: 'Stunning Blow',
				description: 'You focus your psionic technique into a debilitating concussive punch.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
						'Agility'
					],
					bonus: 0,
					tier1: '4 + A damage; I < [weak], dazed and slowed (save ends)',
					tier2: '5 + A damage; I < [average], dazed and slowed (save ends)',
					tier3: '7 + A damage; I < [strong], dazed and slowed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-13',
				name: 'Arcane Disruptor',
				description: 'Your blow reorders a foe’s body, causing pain if they attempt to channel sorcery.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '8 + A psychic damage; M < [weak], weakened (save ends)',
					tier2: '12 + A psychic damage; M < [average], weakened (save ends)',
					tier3: '16 + A psychic damage; M < [strong], weakened (save ends)'
				},
				test: null,
				effect: 'While weakened this way, the target takes damage equal to your Intuition score when they use a supernatural or ability that costs Malice.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-14',
				name: 'Impart Force',
				description: 'A single touch from you, and your enemy flies backward.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: 'Push 3',
					tier2: 'Push 5',
					tier3: 'Push 7'
				},
				test: null,
				effect: 'You gain an edge on this ability. For each square you push the target, they take 1 psychic damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-15',
				name: 'Phase Strike',
				description: 'For a moment, your foe slips out of phase with this manifold.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Melee',
					'Psionic',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '3 + A psychic damage; I < [weak], the target goes out of phase, then is slowed (save ends)',
					tier2: '4 + A psychic damage; I < [average], the target goes out of phase, then is slowed (save ends)',
					tier3: '6 + A psychic damage; I < [strong], the target goes out of phase, then is slowed (save ends)'
				},
				test: null,
				effect: 'A target who goes out of phase is removed from the encounter until the end of their next turn, reappearing in their original space or the nearest available space.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-16',
				name: 'A Squad Unto Myself',
				description: 'You move so quickly, it seems as though an army assaulted your foes.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Melee',
					'Psionic',
					'Weapon'
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '6 damage',
					tier2: '9 damage',
					tier3: '13 damage'
				},
				test: null,
				effect: 'You can take the Disengage move action as a free maneuver before or after you make this ability.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-17',
				name: 'Absorption Field',
				description: 'Your null field absorbs kinetic energy.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Psionic'
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy in the area takes a bane on ability power rolls.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-18',
				name: 'Molecular Rearrangement Field',
				description: 'Your enemies’ wounds open, your allies’ wounds close.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Psionic'
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy who has I < average and enters the area for the first time in a round or starts their turn there is bleeding (save ends). The first time any ally enters the area or starts their turn there, they gain temporary Stamina equal to your Intuition score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-19',
				name: 'Stabilizing Field',
				description: 'You project order, making it harder for your enemies to interfere with you and your allies.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Psionic'
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and any ally in the area ignore difficult terrain, reduce the potency of enemy effects targeting them by 1, and can use a free triggered action at the start of each of their turns to end one condition or effect that is affecting them.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'null-ability-20',
				name: 'Synapse Field',
				description: 'Attacks made by allies in your null field disrupt your enemies’ thoughts, causing psychic pain.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Psionic'
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, enemies who take damage in the area taken additional psychic damage equal to twice your Intuition score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			}
		],
		subclasses: [
			{
				id: 'null-sub-1',
				name: 'Chronokinetic',
				description: 'Your training has allowed you to become unmoored from temporal reality, using the flow of time as another dimension that all things move through.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'null-sub-1-1-1',
								name: 'Lore Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Lore'
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'null-sub-1-1-2',
								name: 'Chronokinetic Mastery',
								description: '\nYou can use the Disengage move action as a free maneuver when you use Inertial Shield.\n\nAs your discipline grows, your psionic mastery of your body intensifies.\n\n| Discipline | Benefit |\n|:-----------|:------------------------------------------------------------------------------------------------------------------------|\n| 2 | When you take the Knockback maneuver you can Disengage as a free triggered action, either before or after the maneuver. |\n| 4 | You gain one surge the first time on a turn that you move at least 1 square as part of an ability. |\n| 6 | You gain an edge on the power rolls for Grab and Knockback maneuvers. |\n',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'null-sub-1-2-1',
								name: 'Rapid Processing',
								description: 'As a maneuver, you can read an entire book or process a similar amount of information. Additionally, during any respite, you can take an additional respite activity.',
								type: 'Text',
								data: null
							},
							{
								id: 'null-sub-1-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-1-2-2a',
												name: 'Blur',
												description: 'You release stored time, allowing you to act twice.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-2-2a',
														name: 'Blur',
														description: 'You release stored time, allowing you to act twice.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Psionic'
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
														effect: 'You can use a signature or heroic ability as a free maneuver. You gain an edge on power rolls with this ability.',
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
												id: 'null-sub-1-2-2b',
												name: 'Force Redirected',
												description: 'The force of your strike manifests in a surprising location.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-2-2b',
														name: 'Force Redirected',
														description: 'The force of your strike manifests in a surprising location.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Melee',
															'Psionic',
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
														target: '1 creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: '8 + A damage; slide 1',
															tier2: '12 + A damage; slide 3',
															tier3: '16 + A damage; slide 5'
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
				id: 'null-sub-2',
				name: 'Cryokinetic',
				description: 'You are able to tap into absolute cold, the most essential energy of the manifolds, and manifest its effects in your body.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'null-sub-2-1-1',
								name: 'Crafting Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Crafting'
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'null-sub-2-1-2',
								name: 'Cryokinetic Mastery',
								description: '\nYou can use the Grab maneuver as a free triggered action whenever you use Inertial Shield.\n\nAs your discipline grows, your psionic mastery of your body intensifies.\n\n| Discipline | Benefit |\n|:-----------|:---------------------------------------------------------------------------------------------------------------------------|\n| 2 | You can target one additional creature when using the Knockback maneuver. |\n| 4 | You gain one surge the first time on a turn that you grab a target or an enemy moves at least 1 square in your Null Field. |\n| 6 | You gain an edge on the power rolls for the Grab and Knockback maneuvers. |\n',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'null-sub-2-2-1',
								name: 'Entropic Adaptability',
								description: 'You ignore difficult terrain related to cold and ice, and you can automatically climb at full speed while moving.',
								type: 'Text',
								data: null
							},
							{
								id: 'null-sub-2-2-1b',
								name: 'Damage Modifier',
								description: 'Cold Immunity + Intuition x 2',
								type: 'Damage Modifier',
								data: {
									modifiers: [
										{
											damageType: 'Cold',
											type: 'Immunity',
											value: 0,
											valueCharacteristics: [
												'Intuition'
											],
											valueCharacteristicMultiplier: 2,
											valuePerLevel: 0,
											valuePerEchelon: 0
										}
									]
								}
							},
							{
								id: 'null-sub-2-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-2-2-2a',
												name: 'Entropic Field',
												description: 'You drastically increase the local entropy.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-2-2a',
														name: 'Entropic Field',
														description: 'You drastically increase the local entropy.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Psionic',
															'Weapon'
														],
														distance: [
															{
																type: 'Cube',
																value: 3,
																value2: 0,
																within: 1,
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
															tier1: '6 cold damage; A < [weak], slowed (save ends)',
															tier2: '9 cold damage; A < [average], slowed (save ends)',
															tier3: '13 cold damage; A < [strong], slowed (save ends)'
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
												id: 'null-sub-2-2-2b',
												name: 'Heat Sink',
												description: 'You absorb ambient heat, coating the ground in frost and precipitating snow from the air',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-2-2b',
														name: 'Heat Sink',
														description: 'You absorb ambient heat, coating the ground in frost and precipitating snow from the air',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Psionic'
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
														effect: 'Until the start of your next turn, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and your allies benefit from concealment while in the area. When you end your turn, each enemy in the aura takes cold damage equal to your Intuition score.',
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
				id: 'null-sub-3',
				name: 'Metakinetic',
				description: 'You learn to see through the illusions of the universe to truly understand your body and its psionic potential.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'null-sub-3-1-1',
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
										'Swim'
									]
								}
							},
							{
								id: 'null-sub-3-1-2',
								name: 'Metakinetic Mastery',
								description: '\nYou can use the Knockback maneuver as a free triggered action whenever you use Inertial Shield.\n\nAs your discipline grows, your psionic mastery of your body intensifies.\n\n| Discipline | Benefit |\n|:-----------|:---------------------------------------------------------------------------------------------------------------------|\n| 2 | You add your Intuition score to the distance you push a creature with the Knockback maneuver. |\n| 4 | You gain one surge the first time in a round that you take damage or are force moved, even if you resist the effect. |\n| 6 | You gain an edge on the power rolls for the Grab and Knockback maneuvers. |\n',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'null-sub-3-2-1',
								name: 'Inertial Sink',
								description: '\nYou add your Intuition score to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.\n\nAdditionally, you have forced movement damage immunity equal to your level and reduce the distance of your falls by an additional 5 squares.',
								type: 'Text',
								data: null
							},
							{
								id: 'null-sub-3-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-3-2-2a',
												name: 'Gravitic Strike',
												description: 'Your fist projects gravitic force that pulls a distant enemy closer.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-2-2a',
														name: 'Gravitic Strike',
														description: 'Your fist projects gravitic force that pulls a distant enemy closer.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Melee',
															'Psionic',
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
														target: '1 creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: '8 + A psychic damage; vertical pull 3',
															tier2: '12 + A psychic damage; vertical pull 5',
															tier3: '16 + A psychic damage; vertical pull 7'
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
												id: 'null-sub-3-2-2b',
												name: 'Kinetic Shield',
												description: 'You manifest a force barrier that absorbs incoming kinetic energy.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-2-2b',
														name: 'Kinetic Shield',
														description: 'You manifest a force barrier that absorbs incoming kinetic energy.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Psionic'
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
														powerRoll: {
															characteristic: [
																'Agility'
															],
															bonus: 0,
															tier1: 'You gain 10 temporary Stamina',
															tier2: 'You gain 15 temporary Stamina',
															tier3: 'You gain 20 temporary Stamina'
														},
														test: null,
														effect: 'While you have this temporary Stamina, you can’t be made bleeding.',
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
			}
		],
		level: 1,
		characteristics: [
			{
				characteristic: 'Might',
				value: 1
			},
			{
				characteristic: 'Agility',
				value: 2
			},
			{
				characteristic: 'Reason',
				value: 0
			},
			{
				characteristic: 'Intuition',
				value: 2
			},
			{
				characteristic: 'Presence',
				value: 0
			}
		]
	},
	career: {
		id: 'career-farmer',
		name: 'Farmer',
		description: 'You grew crops or cared for livestock.',
		features: [
			{
				id: 'career-farmer-feature-1',
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
						'Handle Animals'
					]
				}
			},
			{
				id: 'career-farmer-feature-2',
				name: 'Exploration Skills',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Exploration'
					],
					count: 2,
					selected: [
						'Climb',
						'Jump'
					]
				}
			},
			{
				id: 'career-farmer-feature-3',
				name: 'Language',
				description: '',
				type: 'Language Choice',
				data: {
					options: [],
					count: 1,
					selected: [
						'Kalliak'
					]
				}
			},
			{
				id: 'career-farmer-feature-4',
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
				id: 'career-farmer-feature-5',
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
							id: 'perk-monster-whisperer',
							name: 'Monster Whisperer',
							description: 'You can use the Handle Animals skill to interact with non-sapient monsters who are not animals.',
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
					id: 'career-farmer-ii-1',
					name: 'Blight',
					description: 'A horrible blight swept over your homeland, sickening the livestock and causing crops to rot. No one knows whether the blight is of natural origin or something more malevolent, but you set out in search of a way to cleanse the land of this affliction.'
				},
				{
					id: 'career-farmer-ii-2',
					name: 'Bored',
					description: 'You’ve always wanted so much more than gathering eggs and milking cows. You kept a secret journal of your dreams, filled with all the things you wanted. When your parent found the journal, they burned it and told you to keep your head out of the clouds. In response, you gathered what you could in a pack and left everything else behind, seeking a life of adventure.'
				},
				{
					id: 'career-farmer-ii-3',
					name: 'Cursed',
					description: 'While tilling your fields, you found something in the dirt. Perhaps it was a chipped and dented weapon, a piece of ancient jewelry, or something altogether unique. Excited by your find, you showed it to a loved one, but when they touched it, something happened. You now know it was a curse conveyed by the item, though you don’t know why it affected them and not you. You left your old life in search of answers.'
				},
				{
					id: 'career-farmer-ii-4',
					name: 'Hard Times',
					description: 'Your farm had always been prosperous, until the last few years. Changes in the weather caused smaller yields until you could no longer pay your tithe to the local noble. Her soldiers took what items of value they found, including a precious family heirloom. You left the struggling farm behind to find a better life.'
				},
				{
					id: 'career-farmer-ii-5',
					name: 'Razed',
					description: 'Your animals were killed, your crops and home set ablaze. The culprits might have been wandering bandits, raiders from a nearby kingdom, or hired thugs sent by a rival farm. Whoever they were, they left you with nothing. You couldn’t face the thought of starting again from scratch, so you took up a life of heroism to protect others from such villainy.'
				},
				{
					id: 'career-farmer-ii-6',
					name: 'Stolen',
					description: 'Your family bred horses - beautiful creatures that few could rival on the track and in the jousting lists. When a local noble arrived with an offer to buy your prized stallion, your father refused. The noble struck him down where he stood and stole the horse. Without that stallion, the renowned bloodline would end. You intend to get them back - and get revenge.'
				}
			],
			selectedID: 'career-farmer-ii-5'
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
