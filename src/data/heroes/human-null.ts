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
		description: 'Humans belong to the world in a way the other speaking peoples do not. You can sense the presence of the supernatural—that … oily smell in the air, as I’ve heard it described. And the presence of deathless causes the hairs on the back of your neck to stand up. Or why do you think graveyards affect you so? Whatever magic is, its grip on you is light. Whatever drives the deathless, your nature rebels against it.',
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
						sections: [
							{
								type: 'text',
								text: 'Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another world within 5 squares, even if you don’t have line of effect to that object or creature. You know if you’re detecting an item or a creature, and you know the nature of any creature you detect.'
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
								description: 'Your connection to the natural world allows you to resist certain supernatural effects. You ignore temporary difficult terrain created by magic and psionic abilities. Additionally, when you are force moved by a magic or psionic ability, you can reduce the forced movement distance by 1.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'human-feature-2-2',
								name: 'Perseverence',
								description: 'Giving up is for other people. You gain an edge on tests made using the Endurance skill. Additionally, when you are slowed, your speed is reduced to 3 instead of 2.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'human-feature-2-3',
								name: 'Resist the Unnatural',
								description: 'Your instinctive resilience protects you from injuries beyond the routine.',
								type: 'Ability',
								data: {
									ability: {
										id: 'human-feature-2-3',
										name: 'Resist the Unnatural',
										description: 'Your instinctive resilience protects you from injuries beyond the routine.',
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
										sections: [
											{
												type: 'text',
												text: 'You halve the damage.'
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
								id: 'human-feature-2-4',
								name: 'Determination',
								description: 'A tolerance for pain and dsitress allows you to push through difficult situations.',
								type: 'Ability',
								data: {
									ability: {
										id: 'human-feature-2-4',
										name: 'Determination',
										description: 'A tolerance for pain and dsitress allows you to push through difficult situations.',
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
										sections: [
											{
												type: 'text',
												text: 'You immediately end one of the frightened, slowed, or weakened conditions on yourself.'
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
							value: 2
						},
						{
							feature: {
								id: 'human-feature-2-5',
								name: 'Staying Power',
								description: 'Your human physiology allows you to fight, run, and stay awake longer than others.',
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
					count: 'ancestry',
					selected: [
						{
							id: 'human-feature-2-5',
							name: 'Staying Power',
							description: 'Your human physiology allows you to fight, run, and stay awake longer than others.',
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
						{
							id: 'human-feature-2-2',
							name: 'Perseverence',
							description: 'Giving up is for other people. You gain an edge on tests made using the Endurance skill. Additionally, when you are slowed, your speed is reduced to 3 instead of 2.',
							type: 'Text',
							data: null
						}
					]
				}
			}
		],
		ancestryPoints: 3
	},
	culture: {
		id: 'culture-bespoke-culture',
		name: 'Bespoke Culture',
		description: 'Choose any Environment, Organization, and Upbringing.',
		languages: [
			'Kalliak'
		],
		environment: {
			id: 'env-secluded',
			name: 'Secluded',
			description: 'A secluded culture is based in one relatively close-quarters structure—a building, a cavern, and so forth—and interacts with other cultures only rarely. Such places are often buildings or complexes such as monasteries, castles, or prisons. Folk in a secluded culture have little or no reason to leave their home or interact with other cultures on the outside, but might have an awareness of those cultures and of events happening beyond their enclave. When people live together in close quarters, they typically learn to get along. They often spend much time in study or introspection, as there is not much else to do in seclusion.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Interpersonal',
					'Lore'
				],
				count: 1,
				selected: [
					'Empathize'
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
					'Read Person'
				]
			}
		},
		upbringing: {
			id: 'up-labor',
			name: 'Labor',
			description: 'Your hero came of age in a culture where people labored for a living. They might have been cultivators, typically raising crops or livestock on a farm. They might have harvested natural resources, whether by hunting, trapping, logging, or mining. Or they might have excelled at manual labor tied to settlement and trade, such as construction, carting, loading cargo, and so forth. People with a labor upbringing know the value of hard work.',
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
					'Endurance'
				]
			}
		}
	},
	class: {
		id: 'class-null',
		name: 'Null',
		description: '\nThe mind is not separate from the body. Perfection of one requires perfection of the other. You strive for perfect discipline, perfect order, mastery over mind and body becoming an unarmed psionic warrior who dampens and absorbs magic and psionics. You require no weapons, no tools. You suffice.\n\nAs a null, you resist the supernatural forces of the universe with composure and confidence. As you strive for perfect order, you are an enemy of the ultimate expression of chaos: the supernatural. Those who break the laws of nature using sorcery or psionics should fear you.\n\n"Any weapon can be turned against the hand that wields it." - Ardashir',
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
						id: 'null-resource',
						name: 'Discipline',
						description: '',
						type: 'Heroic Resource',
						data: {
							type: 'heroic',
							gains: [
								{
									tag: 'start',
									trigger: 'Start of your turn',
									value: '2'
								},
								{
									tag: 'action',
									trigger: 'The first time each combat round that an enemy in the area of your Null Field ability uses a main action',
									value: '1'
								},
								{
									tag: 'malice',
									trigger: 'The first time each combat round that the Director uses an ability that costs Malice',
									value: '1'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Persuade',
								'Timescape'
							]
						}
					},
					{
						id: 'null-1-4',
						name: 'Null Field',
						description: 'You project an aura that dampens the power of your foes.',
						type: 'Ability',
						data: {
							ability: {
								id: 'null-1-4',
								name: 'Null Field',
								description: 'You project an aura that dampens the power of your foes.',
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
								sections: [
									{
										type: 'text',
										text: '\nEach target reduces their potencies by 1.\n\nOnce as a free maneuver on each of your turns, you can spend 1 discipline and give your Null Field one of the following additional effects until the start of your next turn:\n* **Gravitic Disruption**: The first time on a turn that a target takes damage, you can slide them up to 2 squares.\n* **Inertial Anchor**: Any target who starts their turn in the area can\'t shift.\n* **Synaptic Break**: Whenever you or any ally uses an ability against a target that has a potency effect, the potency is increased by 1.\n\nThis ability remains active even after an encounter ends. It ends only if you are dying or if you willingly end it (no action required)'
									},
									{
										type: 'package',
										tag: 'null-field'
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
						id: 'null-1-5',
						name: 'Inertial Shield',
						description: 'You intuit the course of an incoming attack, reducing its effects.',
						type: 'Ability',
						data: {
							ability: {
								id: 'null-1-5',
								name: 'Inertial Shield',
								description: 'You intuit the course of an incoming attack, reducing its effects.',
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
								sections: [
									{
										type: 'text',
										text: 'You halve the damage.'
									},
									{
										type: 'field',
										name: 'Spend',
										value: 1,
										repeatable: false,
										effect: 'The potency of one effect associated with the damage is reduced by 1 for you.'
									},
									{
										type: 'package',
										tag: 'inertial-shield'
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
						id: 'null-1-6',
						name: 'Null Speed',
						description: 'The flow of psionic power through you allows you to achieve high velocity.',
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
						description: 'Your training has turned your body into the perfect psionic weapon, shaping pathways in your mind that enhance your physical form. Choose one of the following augmentations. You can change your augmentation by undergoing a psionic meditation as a respite activity.',
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
						description: 'Whenever you use the Knockback or Grab maneuver, you use Intuition instead of Might for the power roll and for determining if you can target creatures larger than you. Additionally, whenever you use the Knockback maneuver, you can choose to slide the target instead of pushing them.',
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
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
						description: 'You can long jump and high jump a distance equal to twice your Agility score without needing to make a test.',
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
								sections: [
									{
										type: 'text',
										text: 'End one effect on you that is ended by a saving throw or that ends at the end of your turn. Alternatively, you can grant this benefit to one creature in the area of your Null Field ability.'
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
						id: 'null-3-3',
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
						id: 'null-4-1a',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'null-4-1b',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'null-4-2',
						name: 'Enhanced Null Field',
						description: 'During combat, any temporary supernatural terrain effects of your level or lower are removed when your aura partially or fully overlaps with their location. Permanent supernatural terrain effects of your level or lower are temporarily negated while your aura overlaps with their location, but return when the aura no longer overlaps with them.',
						type: 'Package Content',
						data: {
							tag: 'null-field'
						}
					},
					{
						id: 'null-4-3',
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
						id: 'null-4-4',
						name: 'Regenerative Field',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'action 2',
							trigger: 'The first time each combat round that an enemy in the area of your Null Field ability uses a main action',
							value: '2',
							replacesTags: [
								'action'
							]
						}
					},
					{
						id: 'null-4-5',
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
					}
				]
			},
			{
				level: 5,
				features: [
					{
						id: 'null-5-1',
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
						id: 'null-6-1',
						name: 'Elemental Absorption',
						description: 'Whenever you use your Inertial Shield triggered action, you gain immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to your Intuition score against the triggering damage.',
						type: 'Package Content',
						data: {
							tag: 'inertial-shield'
						}
					},
					{
						id: 'null-6-2',
						name: 'Elemental Buffer',
						description: 'Whenever you reduce acid, cold, corruption, fire, lightning, poison, or sonic damage with damage immunity, you gain 2 surges that can be used only to increase the damage of your next strike.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-6-3',
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
				level: 7,
				features: [
					{
						id: 'null-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'null-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'null-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'null-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'null-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'null-7-2',
						name: 'Psi Boost',
						description: '\nWhenever you use an ability that is a main action or a maneuver with the Psionic keyword, you can spend additional discipline to apply a psi boost to it and enhance its effects. A psi boost’s effects only last until the end of the turn which the ability is first used. You can apply multiple psi boosts to an ability, but only one instance of each specific boost. You can use the following psi boosts.\n\n**Dynamic Power** (1 Discipline) If the ability force moves a target, the forced movement distance gains a bonus equal to your Intuition score.\n**Expanded Power** (3 Discipline) If the ability targets an area, you increase the size of the area by 1. If the area is a line, you increase the size of one dimension, not both.\n**Extended Power** (1 Discipline) If the ability is ranged, the distance gains a bonus equal to your Intuition score. If the ability is melee, the distance gains a +2 bonus.\n**Heightened Power** (1 Discipline) If the ability deals rolled damage, it deals extra damage equal to your Intuition score.\n**Magnified Power** (5 Discipline) If the ability has a potency, you increase that potency by an amount equal to your Intuition score.\n**Shared Power** (5 Discipline) If the ability targets individual creatures or objects, you target one additional creature or object within distance.\n**Sharpened Power** (1 Discipline) If the ability has any power roll, that roll gains an edge.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-7-3',
						name: 'Improved Body',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'start 2',
							trigger: 'Start of your turn',
							value: '3',
							replacesTags: [
								'start'
							]
						}
					},
					{
						id: 'null-7-4',
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
					}
				]
			},
			{
				level: 8,
				features: [
					{
						id: 'null-8-1',
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
						id: 'null-8-2',
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
						id: 'null-9-1a',
						name: 'I Am the Weapon',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Stamina',
							value: 21,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 0,
							valuePerEchelon: 0
						}
					},
					{
						id: 'null-9-1b',
						name: 'I Am the Weapon',
						description: '',
						type: 'Condition Immunity',
						data: {
							conditions: [
								'Bleeding'
							]
						}
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'null-10-1a',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'null-10-1b',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'null-10-2',
						name: 'Manifold Body',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'start 3',
							trigger: 'Start of your turn',
							value: '4',
							replacesTags: [
								'start',
								'start 2'
							]
						}
					},
					{
						id: 'null-10-3',
						name: 'Manifold Resonance',
						description: '\nYour body becomes perfected matter, beyond the whims and chaos of the timescape and the restrictions of the manifolds. Each time you finish a respite, you can shift yourself and any creatures in the area of your Null Field ability to any location in the timescape known to you, known to any other creature in the area, or where any supernatural treasure in the area has been before.\n\nWhenever you use an ability, you gain 1 discipline that can be used only to apply a benefit from your Psi Boost feature to that ability.\n\nAdditionally, you and allies in the area of your Null Field ability ignore banes and double banes on your power rolls.',
						type: 'Text',
						data: null
					},
					{
						id: 'null-10-4',
						name: 'Order',
						description: '\nYou have an epic resource called order. Each time you finish a respite, you gain order equal to the XP you gain. You can spend order on your abilities as if it were discipline. At the start of a combat encounter, you can spend 1 order to increase the size of your Null Field by 1 until the end of the encounter. Order remains until you spend it',
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
					},
					{
						id: 'null-10-5',
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
						id: 'null-10-6',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '3 damage',
							tier2: '4 damage',
							tier3: '5 damage'
						}
					},
					{
						type: 'text',
						text: 'You can slide one adjacent enemy up to a number of squares equal to your Intuition score.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '4 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}
					},
					{
						type: 'text',
						text: 'You can deal damage equal to your Agility score to one creature or object adjacent to you.'
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
				id: 'null-ability-3',
				name: 'Inertial Step',
				description: 'You flit about the battlefield and take an opportunistic strike.',
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
							tier1: '5 + A damage',
							tier2: '7 + A damage',
							tier3: '10 + A damage'
						}
					},
					{
						type: 'text',
						text: 'You can shift up to half your speed before or after you make the strike.'
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
							tier1: '4 + A damage; A < [weak], grabbed',
							tier2: '7 + A damage; A < [average], grabbed',
							tier3: '9 + A damage; A < [strong], grabbed'
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
							tier1: '4 + A damage; taunted (EoT)',
							tier2: '5 + A damage; taunted (EoT); slide 1',
							tier3: '6 + A damage; taunted (EoT); slide 2'
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
							tier1: '5 + A psychic damage; vertical pull 1',
							tier2: '8 + A psychic damage; vertical pull 2',
							tier3: '11 + A psychic damage; vertical pull 3'
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
							tier1: '4 + A damage; push 2',
							tier2: '6 + A damage; push 4',
							tier3: '8 + A damage; push 6'
						}
					},
					{
						type: 'text',
						text: 'Before the push is resolved, you teleport the target to a square adjacent to you and opposite the one they started in. If the target can’t be teleported this way, you can’t push them.'
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
							tier1: '4 + A damage; A < [weak], weakened (save ends)',
							tier2: '7 + A damage; A < [average], weakened (save ends)',
							tier3: '9 + A damage; A < [strong], weakened (save ends)'
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
				target: 'One creature or object',
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
							tier1: '7 + A damage',
							tier2: '10 + A damage',
							tier3: '13 + A damage'
						}
					},
					{
						type: 'text',
						text: 'You can shift up to half your speed before or after you make this strike. Additionally, whenever an effect lets you make a free strike or use a signature ability, you can use this ability instead, paying its discipline cost as usual.'
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
				sections: [
					{
						type: 'text',
						text: 'Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the size of your Null Field ability increases by 1. At the end of your current turn, each enemy in the area of your Null Field ability takes psychic damage equal to your Intuition score.'
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
				target: 'One creature or object',
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
							tier1: '6 + A damage',
							tier2: '8 + A damage',
							tier3: '12 + A damage'
						}
					},
					{
						type: 'text',
						text: 'Until the start of your next turn, whenever the target moves or is force moved, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.'
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
				id: 'null-ability-12',
				name: 'Stunning Blow',
				description: 'You focus your psionic technique into a concussive punch.',
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
				target: 'One creature or object',
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
							tier1: '4 + A damage; I < [weak], dazed and slowed (save ends)',
							tier2: '5 + A damage; I < [average], dazed and slowed (save ends)',
							tier3: '7 + A damage; I < [strong], dazed and slowed (save ends)'
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
				target: 'One creature or object',
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
							tier1: '8 + A psychic damage; M < [weak], weakened (save ends)',
							tier2: '12 + A psychic damage; M < [average], weakened (save ends)',
							tier3: '16 + A psychic damage; M < [strong], weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While weakened this way, the target takes damage equal to your Intuition score whenever they use a supernatural ability that costs Malice.'
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
				target: 'One creature or object',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: 'Push 3',
							tier2: 'Push 5',
							tier3: 'Push 7'
						}
					},
					{
						type: 'text',
						text: 'An object you target must be your size or smaller. You gain an edge on this ability. Additionally, for each square you push the target, they take 1 psychic damage'
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
							tier1: '3 + A psychic damage; I < [weak], the target goes out of phase (save ends)',
							tier2: '4 + A psychic damage; I < [average], the target goes out of phase (save ends)',
							tier3: '6 + A psychic damage; I < [strong], the target goes out of phase (save ends)'
						}
					},
					{
						type: 'text',
						text: 'A target who goes out of phase is slowed, has their stability reduced by 2, and can’t obtain a tier 3 outcome on ability rolls.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility'
							],
							bonus: 0,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '13 damage'
						}
					},
					{
						type: 'text',
						text: 'You can take the Disengage move action as a free maneuver before or after you use this ability.'
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, each enemy in the area takes a bane on ability rolls.'
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, each enemy who has I < [average] and enters the area for the first time in a combat round or starts their turn there is bleeding (save ends). Each ally who enters the area for the first time in a combat round or starts their turn there gains temporary Stamina equal to your Intuition score.'
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, you ignore difficult terrain and reduce the potency of enemy effects targeting you by 1 for you. You can also use a free triggered action at the start of each of your turns to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Each ally in the area also gains these benefits.'
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, whenever an enemy in the area takes rolled damage, they take extra psychic damage equal to twice your Intuition score.'
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
				id: 'null-ability-21',
				name: 'Anticipating Strike',
				description: 'You suddenly strike an enemy, then grab them in a psionically enhanced grip.',
				type: {
					usage: 'Triggered Action',
					free: true,
					trigger: 'The target moves or uses a main action',
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
							tier1: '7 + A damage; I < [weak], restrained (save ends)',
							tier2: '10 + A damage; I < [average], restrained (save ends)',
							tier3: '13 + A damage; I < [strong], restrained (save ends)'
						}
					},
					{
						type: 'text',
						text: 'This strike resolves before the triggering movement or main action.'
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
				id: 'null-ability-22',
				name: 'Iron Grip',
				description: 'You grab the target with supernatural force.',
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
							tier1: '10 + A damage; A < [weak], grabbed',
							tier2: '14 + A damage; A < [average], grabbed',
							tier3: '18 + A damage; A < [strong], grabbed'
						}
					},
					{
						type: 'text',
						text: 'While grabbed this way, the target takes a bane on the Escape Grab maneuver. Each time they use that maneuver, they take damage equal to twice your Agility score.'
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
				id: 'null-ability-23',
				name: 'Phase Leap',
				description: 'You leap beyond reality, leaving an afterimage of yourself.',
				type: {
					usage: 'Move Action',
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You jump up to your speed without provoking opportunity attacks. Until the end of your next turn, a static afterimage of you remains in the space you left, and any enemy adjacent to your afterimage takes a bane on ability rolls. You can use your abilities from your own space or from the space of your afterimage as if you were still there. Additionally, if your Null Field ability is active, your afterimage also projects the aura from that ability, which you control as if you were in the afterimage’s space.'
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
				id: 'null-ability-24',
				name: 'Synaptic Reset',
				description: 'You expand your nullifying power to mitigate harmful effects.',
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
						value: 3,
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
						text: 'Each target can end any conditions or effects on themself, and gains 5 temporary Stamina for each condition or effect removed.'
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
				id: 'null-ability-25',
				name: 'Arcane Purge',
				description: 'You focus your null field into a pressure point strike that prevents your foe from channeling sorcery.',
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
							tier1: '13 + A damage; M < [weak], the target is suppressed (save ends)',
							tier2: '19 + A damage; M < [average], the target is suppressed (save ends)',
							tier3: '24 + A damage; M < [strong], the target is suppressed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While suppressed, a target takes psychic damage equal to twice your Intuition score at the start of their turns, whenever they use a supernatural ability, or whenever they use an ability that costs Malice.'
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
				id: 'null-ability-26',
				name: 'Phase Hurl',
				description: 'You throw your foe out of phase with this manifold, causing them to harm other enemies as they return.',
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
							tier1: '9 + A damage; push 5; I < [weak], dazed (save ends)',
							tier2: '13 + A damage; push 7;  I < [average], dazed (save ends)',
							tier3: '18 + A damage; push 10; I < [strong], dazed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The target and each creature or object they collide with from this forced movement takes psychic damage equal to the total number of squares the target was force moved. While the target is dazed this way, they see glimpses of creatures from other parts of the timescape.'
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
				id: 'null-ability-27',
				name: 'Scalar Assault',
				description: 'You warp reality to grow a limb for just a moment and make a single devastating attack.',
				type: {
					usage: 'Main Action',
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
						type: 'Cube',
						value: 3,
						value2: 0,
						within: 1,
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
							tier1: '12 psychic damage; push 3',
							tier2: '17 psychic damage; push 5',
							tier3: '23 psychic damage; push 7'
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
				id: 'null-ability-28',
				name: 'Synaptic Anchor',
				description: 'You disrupt an enemy’s strike and create a feedback loop in their mind, preventing them from focusing on future attacks.',
				type: {
					usage: 'Triggered Action',
					free: true,
					trigger: 'The target takes damage from another creature’s ability while in the area of your Null Field ability',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Psionic'
				],
				distance: [
					{
						type: 'Special',
						value: 0,
						value2: 0,
						within: 0,
						special: 'Self; see below',
						qualifier: ''
					}
				],
				target: 'Self or one creature',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target takes half the damage, and if the triggering creature has I < [average], they are dazed (save ends). While the triggering creature is dazed this way, they take psychic damage equal to your Intuition score whenever they use a main action.'
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
				id: 'null-sub-1',
				name: 'Chronokinetic',
				description: 'Your training unmoors you from temporal reality, allowing you to use the flow of time as another dimension that all things move through.',
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
								description: 'Chronokinetic Mastery, Chronokinetic Mastery',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'null-sub-1-1-2a',
											name: 'Chronokinetic Mastery',
											description: '\nAs your discipline grows, your psionic mastery of your body intensifies, granting benefits from the Chronokinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n| Discipline     | Benefit                                                                                                                                                                                    |\n|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| 2              | Whenever you use the Knockback maneuver, you can use the Disengage move action as a free triggered action either before or after the maneuver.                                             |\n| 4              | The first time on a turn that you willingly move 1 or more squares as part of an ability, you gain 1 surge.                                                                                |\n| 6              | You gain an edge on the Grab and Knockback maneuvers.                                                                                                                                      |\n| 8 (4th level)  | The first time on a turn that you willingly move 1 or more squares as part of an ability, you gain 2 surges.                                                                               |\n| 10 (7th level) | You have a double edge on the Grab and Knockback maneuvers.                                                                                                                                |\n| 12 (10th level)| Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.|',
											type: 'Text',
											data: null
										},
										{
											id: 'null-sub-1-1-2b',
											name: 'Chronokinetic Mastery',
											description: 'Whenever you use your Inertial Shield ability, you can then use the Disengage move action as a free triggered action.',
											type: 'Package Content',
											data: {
												tag: 'inertial-shield'
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
														sections: [
															{
																type: 'text',
																text: 'You can use a signature or heroic ability. You gain an edge on that ability’s power rolls.'
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
												id: 'null-sub-1-2-2b',
												name: 'Force Redirected',
												description: 'The force of your strike moves your target in a surprising direction.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-2-2b',
														name: 'Force Redirected',
														description: 'The force of your strike moves your target in a surprising direction.',
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
																	tier1: '8 + A damage; slide 1',
																	tier2: '12 + A damage; slide 3',
																	tier3: '16 + A damage; slide 5'
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
								id: 'null-sub-1-5-1',
								name: 'Instant Action',
								description: 'If you’re not surprised at the start of your first turn in combat, you gain an edge on ability rolls and gain 2 surges. If you are surprised, you can spend 3 discipline to no longer be surprised and gain the benefits of this feature.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'null-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-1-6-1a',
												name: 'Interphase',
												description: 'You slip into a faster timestream to act more quickly.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-6-1a',
														name: 'Interphase',
														description: 'You slip into a faster timestream to act more quickly.',
														type: {
															usage: 'Main Action',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You can use up to three signature abilities, each of which gains an edge.'
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
												id: 'null-sub-1-6-1b',
												name: 'Phase Step',
												description: 'You weaken your connection to this manifold, allowing you to move through and damage enemies.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-6-1b',
														name: 'Phase Step',
														description: 'You weaken your connection to this manifold, allowing you to move through and damage enemies.',
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
															'Weapon'
														],
														distance: [
															{
																type: 'Special',
																value: 0,
																value2: 0,
																within: 0,
																special: 'Self; see below',
																qualifier: ''
															}
														],
														target: 'Self',
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
																	tier1: '6 damage; M < [weak]. dazed',
																	tier2: '8 damage; M < [average]. dazed',
																	tier3: '12 damage; M < [strong]. dazed'
																}
															},
															{
																type: 'text',
																text: 'You can shift up to your speed, and squares occupied by enemies or objects are not difficult terrain for this shift. You make one power roll that targets each enemy you moved through during this shift'
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
								id: 'null-sub-1-8-1',
								name: 'Shared Momentum',
								description: 'When you take the Disengage move action, one ally in the area of your Null Field ability can also take the Disengage move action as a free triggered action, using your distance for that move action.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'null-sub-1-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-1-9-1a',
												name: 'Arrestor Cycle',
												description: 'You trap your foe in a looping cycle of time, where they relive the last few seconds over and over again.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-9-1a',
														name: 'Arrestor Cycle',
														description: 'You trap your foe in a looping cycle of time, where they relive the last few seconds over and over again.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'The triggering creature starts their turn.',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Psionic',
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
																type: 'roll',
																roll: {
																	characteristic: [
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: 'I < [weak]. the target loses their turn',
																	tier2: 'I < [average]. the target loses their turn',
																	tier3: 'I < [strong]. the target loses their turn'
																}
															},
															{
																type: 'text',
																text: 'If the target loses their turn, the round continues as if they had acted. A target who doesn’t lose their turn takes psychic damage equal to twice your Intuition score for each main action they take until the end of their next turn.'
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
												id: 'null-sub-1-9-1b',
												name: 'Time Loop',
												description: 'You show shadows what true speed is.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-1-9-1b',
														name: 'Time Loop',
														description: 'You show shadows what true speed is.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'Another creature on the encounter map ends their turn.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You take a bonus turn immediately after the triggering creature. This ability can be used only once per combat round.'
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
				id: 'null-sub-2',
				name: 'Cryokinetic',
				description: 'You can tap into absolute cold, the most essential energy of myriad manifolds, and manifest its effects in your body.',
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
								description: 'Cryokinetic Mastery, Cryokinetic Mastery',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'null-sub-2-1-2a',
											name: 'Cryokinetic Mastery',
											description: '\nAs your discipline grows, you strengthen the psionic power suffusing you, granting benefits from the Cryokinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n| Discipline     | Benefit                                                                                                                                                                                          |\n|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| 2              | Whenever you use the Knockback maneuver, you can target one additional creature. Additionally, whenever you deal untyped damage with a psionic ability, you can change it to cold damage instead.|\n| 4              | The first time on a turn that you grab a creature or an enemy moves 1 or more squares in the area of your Null Field ability, you gain 1 surge.                                                  |\n| 6              | You gain an edge on the Grab and Knockback maneuvers.                                                                                                                                            |\n| 8 (4th level)  | The first time on a turn that you grab a creature or an enemy moves 1 or more squares in the area of your Null Field ability, you gain 2 surges.                                                 |\n| 10 (7th level) | You have a double edge on the Grab and Knockback maneuvers.                                                                                                                                      |\n| 12 (10th level)| Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.      |',
											type: 'Text',
											data: null
										},
										{
											id: 'null-sub-2-1-2b',
											name: 'Cryokinetic Mastery',
											description: 'Whenever you use your Inertial Shield ability, you can then use the Grab maneuver as a free triggered action.',
											type: 'Package Content',
											data: {
												tag: 'inertial-shield'
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '6 cold damage; A < [weak], slowed (save ends)',
																	tier2: '9 cold damage; A < [average], slowed (save ends)',
																	tier3: '13 cold damage; A < [strong], slowed (save ends)'
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
														sections: [
															{
																type: 'text',
																text: 'Until the start of your next turn, the size of your Null Field ability increases by 1, and you and any ally benefit from concealment while in the area. At the end of this turn, each enemy in the area takes cold damage equal to your Intuition score.'
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
								id: 'null-sub-2-5-1',
								name: 'Chilling Readiness',
								description: 'You steel yourself for imminent danger by tapping into your body’s cold energy. At the start of any combat, you gain a number of surges equal to your Victories.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'null-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-2-6-1a',
												name: 'Ice Pillars',
												description: 'Pillars of ice erupt from the ground and launch your foes into the air.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-6-1a',
														name: 'Ice Pillars',
														description: 'Pillars of ice erupt from the ground and launch your foes into the air.',
														type: {
															usage: 'Main Action',
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
																type: 'Ranged',
																value: 10,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Three creatures or objects',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: 'Vertical slide 6',
																	tier2: 'Vertical slide 8',
																	tier3: 'Vertical slide 10'
																}
															},
															{
																type: 'text',
																text: 'The pillars vanish as soon as the effects of the forced movement are resolved.'
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
												id: 'null-sub-2-6-1b',
												name: 'Wall of Ice',
												description: 'You create a wall of ice.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-6-1b',
														name: 'Wall of Ice',
														description: 'You create a wall of ice.',
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
															'Weapon'
														],
														distance: [
															{
																type: 'Wall',
																value: 10,
																value2: 0,
																within: 10,
																special: '',
																qualifier: ''
															}
														],
														target: 'Special',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You can place this wall in occupied squares, sliding each creature in the area into the nearest unoccupied space of your choice. The wall remains until the end of the encounter or until you are dying. The wall’s squares are treated as stone squares for the purpose of damage, and you and allies can move freely through the wall. Each enemy who enters a square adjacent to the wall and has M < [average] is slowed (save ends). Each enemy who is force moved into the wall and has M < [average] is restrained (save ends).'
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
								id: 'null-sub-2-8-1',
								name: 'Synaptic Triage',
								description: 'As a free maneuver, you can spend 1d6 Stamina to remove one effect on you. Each creature of your choice in the area of your Null Field ability also gains this benefit.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'null-sub-2-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-2-9-1a',
												name: 'Absolute Zero',
												description: 'You become the coldest thing in the timescape.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-9-1a',
														name: 'Absolute Zero',
														description: 'You become the coldest thing in the timescape.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: 'You gain 20 temporary Stamina.',
																	tier2: 'You gain 30 temporary Stamina.',
																	tier3: 'You gain 40 temporary Stamina.'
																}
															},
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dead, you become an avatar of uttermost cold. You gain immunity to all damage equal to the cold damage immunity granted by your Entropic Adaptability trait, you ignore the negative effects of dying, and you have a +2 bonus to potencies.'
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
												id: 'null-sub-2-9-1b',
												name: 'Heat Drain',
												description: 'You drain all the heat from the target.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-2-9-1b',
														name: 'Heat Drain',
														description: 'You drain all the heat from the target.',
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
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: '8 + I cold damage; M < [weak], restrained (save ends)',
																	tier2: '11 + I cold damage; M < [average], restrained (save ends)',
																	tier3: '15 + I cold damage; M < [strong], restrained (save ends)'
																}
															},
															{
																type: 'text',
																text: 'While restrained this way, the target takes cold damage equal to your Intuition score at the start of each of your turns. Additionally, whenever the target damages another creature while restrained this way, any potency associated with the damage is reduced by 2.'
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
				id: 'null-sub-3',
				name: 'Metakinetic',
				description: 'You learn to see through the illusions of the universe to more fully understand your body and its psionic potential.',
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
										'Climb'
									]
								}
							},
							{
								id: 'null-sub-3-1-2',
								name: 'Metakinetic Mastery',
								description: 'Metakinetic Mastery, Metakinetic Mastery',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'null-sub-3-1-2a',
											name: 'Metakinetic Mastery',
											description: '\nAs your discipline grows, your psionic potential is amplified, granting benefits from the Metakinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n| Discipline | Benefit                                                                                                                                                                                        |\n|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| 2              | Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Intuition score.                                                                         |\n| 4              | The first time in a combat round that you take damage or are force moved, you gain 1 surge, even if you resist the effect.                                                                 |\n| 6              | You gain an edge on the Grab and Knockback maneuvers.                                                                                                                                      |\n| 8 (4th level)  | The first time in a combat round that you take damage or are force moved, you gain 2 surges, even if you resist the effect.                                                                |\n| 10 (7th level) | You have a double edge on the Grab and Knockback maneuvers.                                                                                                                                |\n| 12 (10th level)| Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.|',
											type: 'Text',
											data: null
										},
										{
											id: 'null-sub-3-1-2b',
											name: 'Metakinetic Mastery',
											description: 'Whenever you use your Inertial Shield ability, you can then use the Knockback maneuver as a free triggered action.',
											type: 'Package Content',
											data: {
												tag: 'inertial-shield'
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
								id: 'null-sub-3-2-1',
								name: 'Inertial Sink',
								description: '\nYou add your Intuition score to your effective size for the purpose of interacting with creatures and objects, such as for determining whether you can lift an object, whether you are affected by forced movement, and so forth. This has no effect on whether you can be grabbed.\n\nAdditionally, when you fall, you reduce the effective height of the fall by 5 squares in addition to any other reductions. Whenever you take damage from being force moved, you reduce that damage by an amount equal to your level.',
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
												description: 'Your fist emanates gravitic force that pulls a distant enemy closer.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-2-2a',
														name: 'Gravitic Strike',
														description: 'Your fist emanates gravitic force that pulls a distant enemy closer.',
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
																	tier1: '8 + A psychic damage; vertical pull 3',
																	tier2: '12 + A psychic damage; vertical pull 5',
																	tier3: '16 + A psychic damage; vertical pull 7'
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Agility'
																	],
																	bonus: 0,
																	tier1: 'You gain 10 temporary Stamina',
																	tier2: 'You gain 15 temporary Stamina',
																	tier3: 'You gain 20 temporary Stamina'
																}
															},
															{
																type: 'text',
																text: 'While you have temporary Stamina from this ability, you can’t be made bleeding even while dying.'
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
								id: 'null-sub-3-5-1',
								name: 'Inertial Fulcrum',
								description: 'Whenever you use an ability to reduce damage dealt to you or to reduce the distance of forced movement imposed upon you, you can deal damage to one enemy in the area of your Null Field ability equal to your Intuition score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'null-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-3-6-1a',
												name: 'Gravitic Charge',
												description: 'You channel your discipline into momentum that defies gravity.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-6-1a',
														name: 'Gravitic Charge',
														description: 'You channel your discipline into momentum that defies gravity.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: 'Vertical slide 5',
																	tier2: 'Vertical slide 7',
																	tier3: 'Vertical slide 9'
																}
															},
															{
																type: 'text',
																text: 'This movement ignores stability. If you slide into another creature, you resolve damage to both of you as if your force movement had ended, but you keep moving through that creature’s space.'
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
												id: 'null-sub-3-6-1b',
												name: 'Iron Body',
												description: 'You focus until your body becomes as hard as iron.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-6-1b',
														name: 'Iron Body',
														description: 'You focus until your body becomes as hard as iron.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You gain 20 temporary Stamina. Additionally, until the end of the encounter, your stability gains a bonus equal to your Intuition score.'
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
								id: 'null-sub-3-8-1',
								name: 'Inertial Dampener',
								description: 'You and each creature or object of your choice in the area of your Null Field ability gain a bonus to stability equal to your Intuition score. A creature who attempts to force move a target with this bonus takes psychic damage equal to your Intuition score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'null-sub-3-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'null-sub-3-9-1a',
												name: 'Inertial Absorption',
												description: 'You absorb an attack to empower your body.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-9-1a',
														name: 'Inertial Absorption',
														description: 'You absorb an attack to empower your body.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'Another creature damages you using an ability.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You take half the damage, negate any effects associated with the damage for you, and gain 3 surges.'
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
												id: 'null-sub-3-9-1b',
												name: 'Realitas',
												description: 'Your essential hyperreality disrupts your enemy’s connection to existence.',
												type: 'Ability',
												data: {
													ability: {
														id: 'null-sub-3-9-1b',
														name: 'Realitas',
														description: 'Your essential hyperreality disrupts your enemy’s connection to existence.',
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
																	tier1: '7 + A psychic damage; I < [weak], dazed',
																	tier2: '10 + A psychic damage; I < [average], dazed',
																	tier3: '13 + A psychic damage; I < [strong], dazed'
																}
															},
															{
																type: 'text',
																text: 'While dazed this way, the target takes psychic damage equal to twice your Intuition score at the start of each of your turns. If this ability causes a creature who is not a leader or solo creature to become winded, they are instead reduced to 0 Stamina. Any creature reduced to 0 Stamina by this ability is forgotten by all creatures of your level or lower in the timescape who are not present in the encounter. Loved ones of the forgotten creature retain a faint sense of melancholy. This effect can be reversed only at the Director’s discretion.'
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
						'Jump',
						'Alertness'
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
						'Vaslorian'
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
							description: 'You can use the Handle Animals skill to interact with nonsapient creatures who are not animals.',
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
