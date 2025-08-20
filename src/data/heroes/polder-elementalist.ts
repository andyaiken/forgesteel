import { Hero } from '../../models/hero';

export const polderElementalist = {
	id: 'mr3vxPGN0NkoVsZe',
	name: 'Bethell',
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
					'Empathize'
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
					'Blacksmithing'
				]
			}
		}
	},
	class: {
		id: 'class-elementalist',
		name: 'Elementalist',
		description: '\nAir for movement. Earth for permanence. Fire for destruction. Water for change. Green for growth. Rot for death. Void for the mystery. Years of study and practice and poring over tomes brought you the revelations that allow you to manipulate these building blocks of reality. Now you use your mastery of the seven elements to destroy, create, and warp the world with magic.\n\nAs an elementalist, you can unleash your wrath across a field of foes, put an enemy exactly where you want them, debilitate foes with harmful effects, ward yourself and allies against danger, manipulate terrain, warp space, and more. Your choice of elemental specialization determines which of these things you do best.',
		heroicResource: 'Essence',
		subclassName: 'Elemental Specialization',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Reason'
			]
		],
		primaryCharacteristics: [
			'Reason'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: 'elementalist-stamina',
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
						id: 'elementalist-recoveries',
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
						id: 'elementalist-1-1',
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
						id: 'elementalist-1-2',
						name: 'Crafting / Lore Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Crafting',
								'Lore'
							],
							count: 3,
							selected: [
								'Tailoring',
								'Alchemy',
								'Cooking'
							]
						}
					},
					{
						id: 'elementalist-1-3',
						name: 'Essence',
						description: 'At the start of each of your turns during combat, you gain 2 essence. You also gain 1 essence the first time in a round that you or a creature within 10 of you takes damage that isn’t untyped or holy.',
						type: 'Text',
						data: null
					},
					{
						id: 'elementalist-1-4',
						name: 'Hurl Element',
						description: 'You hurl a ball of elemental energy at an unsuspecting foe.',
						type: 'Ability',
						data: {
							ability: {
								id: 'elementalist-1-4',
								name: 'Hurl Element',
								description: 'You hurl a ball of elemental energy at an unsuspecting foe.',
								type: {
									usage: 'Main Action',
									free: false,
									trigger: '',
									time: '',
									qualifiers: [
										'can be used as a ranged free strike'
									]
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
								target: 'One creature or object',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: {
									characteristic: [
										'Reason'
									],
									bonus: 0,
									tier1: '2 + R damage',
									tier2: '4 + R damage',
									tier3: '6 + R damage'
								},
								test: null,
								effect: 'When you make this strike, choose the damage type from one of the following options: acid, cold, corruption, fire, lightning, poison, or sonic.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'elementalist-1-5',
						name: 'Persistent Magic',
						description: '\nSome of your heroic abilities have a persistent effect entry. Whenever you use a persistent ability, you decide whether you want to maintain it, and start doing so immediately after you first use the ability. If you maintain a persistent ability in combat, you reduce the amount of essence you earn at the start of your turn by an amount equal to the ability’s persistent value, which enables the ability’s persistent effect. All your active persistent abilities end at the end of the encounter.\n\nYou can’t maintain any abilities that would make you earn a negative amount of essence at the start of your turn or have a negative amount of essence outside of combat. You can stop maintaining an ability at any time (no action required).\n\nIf you maintain the same ability on several targets and the effect includes a power roll, you make that roll once and apply the same effect to all targets. A creature can’t be affected by multiple instances of a persistent ability.\n\nIf you take damage equal to or greater than 5 × your Reason score in one turn, you stop maintaining any persistent abilities. For instance, if you have a Reason score of 2 and are maintaining Instantaneous Excavation, taking 10 or more damage in one turn causes you to stop maintaining the ability.',
						type: 'Text',
						data: null
					},
					{
						id: 'elementalist-1-6',
						name: 'Practical Magic',
						description: 'Your mastery of elemental power lets you customize your conjurations.',
						type: 'Ability',
						data: {
							ability: {
								id: 'elementalist-1-6',
								name: 'Practical Magic',
								description: 'Your mastery of elemental power lets you customize your conjurations.',
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
								effect: '\nChoose one of the following effects:\n\n* You use the Knockback maneuver, but its distance becomes the range of your Hurl Element ability, and you use Reason instead of Might for the power roll.\n* You choose a creature within the distance of your Hurl Element ability and deal damage equal to your Reason score to them. The damage type can be acid, cold, corruption, fire, lightning, poison, or sonic.\n* You teleport up to a number of squares equal to your Reason score.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'elementalist-1-7',
						name: 'Enchantment',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'elementalist-1-7a',
										name: 'Enchantment of Battle',
										description: 'You tap into the elemental mysteries to gain the mind and training of a warrior.',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'elementalist-1-7aa',
													name: 'Stamina',
													description: '',
													type: 'Bonus',
													data: {
														field: 'Stamina',
														value: 0,
														valueCharacteristics: [],
														valueCharacteristicMultiplier: 1,
														valuePerLevel: 0,
														valuePerEchelon: 3
													}
												},
												{
													id: 'elementalist-1-7ab',
													name: 'Enchantment of Battle',
													description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit. While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this enchantment.',
													type: 'Text',
													data: null
												}
											]
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-1-7b',
										name: 'Enchantment of Celerity',
										description: 'You infuse your body with the speed of elemental air.',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'elementalist-1-7ba',
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
													id: 'elementalist-1-7bb',
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
								},
								{
									feature: {
										id: 'elementalist-1-7c',
										name: 'Enchantment of Destruction',
										description: 'You harness the destructive power of flame inside your mind, allowing you to focus your magic on destroying your enemies.',
										type: 'Ability Damage',
										data: {
											keywords: [
												'Magic'
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
										id: 'elementalist-1-7d',
										name: 'Enchantment of Distance',
										description: 'You reach into the mysteries of the void and mix that element with all of your abilities.',
										type: 'Ability Distance',
										data: {
											keywords: [
												'Magic',
												'Ranged'
											],
											value: 2,
											valueCharacteristics: [],
											valueCharacteristicMultiplier: 0,
											valuePerLevel: 0,
											valuePerEchelon: 0
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-1-7e',
										name: 'Enchantment of Permanence',
										description: 'You place the magic of earth into your flesh and bones, making your body tougher and harder to move.',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: '',
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
												},
												{
													id: '',
													name: 'Stability',
													description: '',
													type: 'Bonus',
													data: {
														field: 'Stability',
														value: 0,
														valueCharacteristics: [],
														valueCharacteristicMultiplier: 1,
														valuePerLevel: 0,
														valuePerEchelon: 1
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
									id: 'elementalist-1-7c',
									name: 'Enchantment of Destruction',
									description: 'You harness the destructive power of flame inside your mind, allowing you to focus your magic on destroying your enemies.',
									type: 'Ability Damage',
									data: {
										keywords: [
											'Magic'
										],
										value: 1,
										valueCharacteristics: [],
										valueCharacteristicMultiplier: 0,
										valuePerLevel: 0,
										valuePerEchelon: 0,
										damageType: 'Damage'
									}
								}
							]
						}
					},
					{
						id: 'elementalist-1-8',
						name: 'Elementalist Ward',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'elementalist-1-8a',
										name: 'Ward of Delightful Consequences',
										description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain a surge.',
										type: 'Text',
										data: null
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-1-8b',
										name: 'Ward of Excellent Protection',
										description: 'You weave a shield of all the elements around yourself, channeling their full protective power. You have immunity to acid, cold, corruption, fire, lightning, poison, or sonic damage equal to your Reason score.',
										type: 'Damage Modifier',
										data: {
											modifiers: [
												{
													damageType: 'Acid',
													type: 'Immunity',
													value: 0,
													valueCharacteristics: [
														'Reason'
													],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												},
												{
													damageType: 'Cold',
													type: 'Immunity',
													value: 0,
													valueCharacteristics: [
														'Reason'
													],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												},
												{
													damageType: 'Corruption',
													type: 'Immunity',
													value: 0,
													valueCharacteristics: [
														'Reason'
													],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												},
												{
													damageType: 'Fire',
													type: 'Immunity',
													value: 0,
													valueCharacteristics: [
														'Reason'
													],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												},
												{
													damageType: 'Lightning',
													type: 'Immunity',
													value: 0,
													valueCharacteristics: [
														'Reason'
													],
													valueCharacteristicMultiplier: 1,
													valuePerLevel: 0,
													valuePerEchelon: 0
												}
											]
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-1-8c',
										name: 'Ward of Nature\'s Affection',
										description: 'You store green energy within your body that allows you to produce powerful vines when you’re in danger.',
										type: 'Ability',
										data: {
											ability: {
												id: 'elementalist-1-8c',
												name: 'Ward of Nature\'s Affection',
												description: 'You store green energy within your body that allows you to produce powerful vines when you’re in danger.',
												type: {
													usage: 'Triggered Action',
													free: true,
													trigger: 'A creature within a number of squares equal to your Reason score deals damage to you,',
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
												effect: 'You slide the attacking creature up to a number of squares equal to your Reason score.',
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
										id: 'elementalist-1-8d',
										name: 'Ward of Surprising Reactivity',
										description: 'You use the magic of fire to create an invisible ward of explosive fire energy.',
										type: 'Ability',
										data: {
											ability: {
												id: 'elementalist-1-8d',
												name: 'Ward of Surprising Reactivity',
												description: 'You use the magic of fire to create an invisible ward of explosive fire energy.',
												type: {
													usage: 'Triggered Action',
													free: true,
													trigger: 'An adjacent creature deals damage to you.',
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
												effect: 'You push that creature a number of squares equal to twice your Reason score.',
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
							selected: [
								{
									id: 'elementalist-1-8a',
									name: 'Ward of Delightful Consequences',
									description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain a surge.',
									type: 'Text',
									data: null
								}
							]
						}
					},
					{
						id: 'elementalist-1-9',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							minLevel: 1,
							count: 2,
							selectedIDs: [
								'elementalist-ability-2',
								'elementalist-ability-8'
							]
						}
					},
					{
						id: 'elementalist-1-10',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'elementalist-ability-10'
							]
						}
					},
					{
						id: 'elementalist-1-11',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'elementalist-ability-13'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'elementalist-2-1',
						name: 'Crafting / Lore / Supernatural Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Crafting',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'elementalist-2-2',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 2,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 3,
				features: [
					{
						id: 'elementalist-3-1',
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
				id: 'elementalist-ability-1',
				name: 'Afflict a Bountiful Decay',
				description: 'Your curse causes a foe’s flesh to rot off as spores that aid your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Green',
					'Rot',
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
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 + R corruption damage',
					tier2: '4 + R corruption damage',
					tier3: '6 + R corruption damage'
				},
				test: null,
				effect: 'You or one ally within distance can end one effect that is ended by a saving throw or that ends at the end of that creature’s turn.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-2',
				name: 'Bifurcated Conflagration',
				description: 'Two jets of flame lance out at your command.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
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
				target: 'Two creatures or objects',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 fire damage',
					tier2: '4 fire damage',
					tier3: '6 fire damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-3',
				name: 'Grasp of Beyond',
				description: 'You absorb the life energy of another creature and use it to teleport.',
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
					'Void'
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
						'Reason'
					],
					bonus: 0,
					tier1: '3 + R corruption damage',
					tier2: '6 + R corruption damage',
					tier3: '9 + R corruption damage'
				},
				test: null,
				effect: 'You can teleport up to a number of squares equal to your Reason score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-4',
				name: 'The Green Within, The Green Without',
				description: 'Whipping vines erupt from a foe’s body to grasp at another close by.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Green',
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
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 + R damage',
					tier2: '5 + R damage',
					tier3: '7 + R damage'
				},
				test: null,
				effect: 'You slide one creature within 10 squares of the target up to 2 squares.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-5',
				name: 'A Meteoric Introduction',
				description: 'You give your enemy a gentle tap like an asteroid impact.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Earth',
					'Magic',
					'Melee',
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '3 + R damage; push 2',
					tier2: '5 + R damage; push 3',
					tier3: '8 + R damage; push 4'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-6',
				name: 'Ray of Agonizing Self Reflection',
				description: 'You inflict pain and doubt in equal measure.',
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
					'Strike',
					'Void'
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
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 + R corruption damage; R < [weak], slowed (save ends)',
					tier2: '4 + R corruption damage; R < [average], slowed (save ends)',
					tier3: '6 + R corruption damage; R < [strong], slowed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-7',
				name: 'Unquiet Ground',
				description: 'A sudden storm of detritus assaults your foes and leaves them struggling to move.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Earth',
					'Magic',
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
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 damage',
					tier2: '5 damage',
					tier3: '7 damage'
				},
				test: null,
				effect: 'The ground beneath the area becomes difficult terrain for enemies.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-8',
				name: 'Viscous Fire',
				description: 'A jet of heavy fire erupts with elemental fury where it strikes.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 + R fire damage; push 2',
					tier2: '5 + R fire damage; push 3',
					tier3: '7 + R fire damage; push 4'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-9',
				name: 'Behold the Mystery',
				description: 'You open a rift into the void to harry your foes.',
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
					'Ranged',
					'Void'
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '2 psychic damage',
					tier2: '4 psychic damage',
					tier3: '6 psychic damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
					}
				]
			},
			{
				id: 'elementalist-ability-10',
				name: 'The Flesh, a Crucible',
				description: 'Fire engulfs a target of your choice and burns at your command.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
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
				target: 'One creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '5 + R fire damage',
					tier2: '8 + R fire damage',
					tier3: '11 + R fire damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'If the target is within distance at the start of your turn, make a power roll for this ability again.'
					}
				]
			},
			{
				id: 'elementalist-ability-11',
				name: 'Invigorating Growth',
				description: 'Mushrooms erupt from a foe, sapping their vitality to spread strengthening spores.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Green',
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
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '4 + R poison damage',
					tier2: '7 + R poison damage',
					tier3: '11 + R poison damage'
				},
				test: null,
				effect: 'Mushrooms cover the target’s body, and can be removed by the target or by an adjacent creature as an action. While the mushrooms are on the target, you and each of your allies adjacent to the target gains a surge whenever the target takes damage.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-12',
				name: 'Ripples in the Earth',
				description: 'Like a stone dropped into a pond, waves in the earth radiate from you.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Earth',
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '3 damage',
					tier2: '5 damage',
					tier3: '8 damage; M < [strong], prone'
				},
				test: null,
				effect: 'You must be touching the ground to use this ability. Choose a square of ground in the area that is unoccupied or occupied by your or an ally. A pillar of earth that is 1 square wide and long and is up to as many squares tall as your Reason score rises out of the ground. The pillar can’t collide with any creatures or objects nor can it force any creatures being raised by it to collide with other creatures or objects.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-13',
				name: 'Conflagration',
				description: 'A storm of fire descends upon your enemies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Fire',
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
						'Reason'
					],
					bonus: 0,
					tier1: '4 fire damage',
					tier2: '6 fire damage',
					tier3: '10 fire damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 2,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
					}
				]
			},
			{
				id: 'elementalist-ability-14',
				name: 'Instantaneous Excavation',
				description: 'The surface of the world around you opens up at your command.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Earth',
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
				target: 'Special',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: 'You open up two holes with 1-square openings that are 4 squares deep, and which can be placed on any mundane surface within distance. You can place these holes next to each other to create fewer holes with wider openings. When the holes open, make a separate power roll for each creature on the ground above a hole and small enough to fall in. (You can’t get a critical hit with this power because it uses a maneuver.)',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: 'The target can shift 1 square from the edge of the hole to the nearest unoccupied space of their choice.',
					tier2: 'The target falls into the hole.',
					tier3: 'The target falls into the hole and can’t reduce the height of the fall.'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'At the start of your turn, you open another hole, rolling power against any creature that could fall into the hole when it opens.'
					}
				]
			},
			{
				id: 'elementalist-ability-15',
				name: 'No More than a Breeze',
				description: 'The material substance of a creature shreds away at your command.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Magic',
					'Ranged',
					'Void'
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
				effect: 'Until the start of your next turn, the target can move through solid matter, ignores difficult terrain, and their movement can’t provoke opportunity attacks. If the target ends their turn inside solid matter, they are shunted out into the space where they entered it and this effect ends.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'The effect lasts until the start of your next turn.'
					}
				]
			},
			{
				id: 'elementalist-ability-16',
				name: 'Test of Rain',
				description: 'You call down a rain that burns your enemies and restores your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Green',
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
						'Reason'
					],
					bonus: 0,
					tier1: '4 acid damage',
					tier2: '6 acid damage',
					tier3: '10 acid damage'
				},
				test: null,
				effect: 'You and each ally within the area can end one effect that is ended by a saving throw or that ends at the end of that creature’s turn.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-17',
				name: 'O Flower Aid, O Earth Defend',
				description: 'Revitalizing plants and jagged stones grow, helping allies and hindering foes.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Earth',
					'Green',
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
				target: 'Special',
				cost: 5,
				repeatable: false,
				minLevel: 2,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '\nUntil the start of your next turn, the area gains the following effects:\n\n* You and each ally in the area can spend any number of Recoveries at the start of your turn once as a free maneuver.\n* The area is difficult terrain for enemies.\n* Any enemy who enters the area for the first time in a round or starts their turn there takes damage equal to your Reason score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'The area remains until the start of your next turn. You can move the area up to 5 squares as a maneuver. This ability ends if you lose line of effect to its area.'
					}
				]
			},
			{
				id: 'elementalist-ability-18',
				name: 'Subvert the Green Within',
				description: 'Burrow into their brains and take control!',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Green',
					'Magic',
					'Ranged',
					'Strike',
					'Void'
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
				minLevel: 2,
				preEffect: 'The target uses their signature ability against a target of your choice. You then make a power roll against the target of this ability.',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '5 + R poison damage',
					tier2: '9 + R poison damage',
					tier3: '12 + R poison damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-19',
				name: 'Translated Through Flame',
				description: 'Your ally disappears, then reappears in a burst of fire!',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
					'Magic',
					'Ranged',
					'Void'
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
				minLevel: 2,
				preEffect: 'The target is teleported to another space within distance. Make a power roll that targets each enemy adjacent to the target’s new space.',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '3 fire damage',
					tier2: '5 fire damage',
					tier3: '8 fire damage'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-20',
				name: 'Volcano\'s Embrace',
				description: 'Wrap them up in fire and melting stone.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Earth',
					'Fire',
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
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 2,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '5 + R fire damage; A < [weak], restrained (save ends)',
					tier2: '9 + R fire damage; A < [average], restrained (save ends)',
					tier3: '12 + R fire damage; A < [strong], restrained (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-21',
				name: 'Erase',
				description: 'With a flick of the wrist, you phase creatures out of existence.',
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
					'Strike',
					'Void'
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
				target: 'Special',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: 'The number of creatures you target with this ability is determined by your power roll.',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: 'One creature',
					tier2: 'Two creatures',
					tier3: 'Three creatures'
				},
				test: null,
				effect: 'Each target begins to fade from existence (save ends). While fading from existence, a target initially takes a bane on power rolls. At the end of their first turn, they have a double bane on power rolls. At the end of their second turn, they fade from existence for 1 hour, reappearing in their original space or the nearest available space.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-22',
				name: 'Maw of Earth',
				description: 'You open up the ground, unleashing a shower of stone and debris.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Earth',
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
				target: 'One creature or object',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '5 damage',
					tier2: '9 damage',
					tier3: '12 damage'
				},
				test: null,
				effect: 'The ground in or directly beneath the area drops, lowering 3 squares.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'elementalist-ability-23',
				name: 'Swarm of Spirits',
				description: 'Guardian animal spirits surround you to harry your foes and bolster your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Green',
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
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: '3 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				},
				test: null,
				effect: 'Until the end of your next turn, each ally in your aura has their characteristic scores increased by 1 for the purpose of resisting potencies and has a +1 bonus on saving throws.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'You make the power roll again to target each enemy in the aura, and the effect lasts until the start of your next turn.'
					}
				]
			},
			{
				id: 'elementalist-ability-24',
				name: 'Wall of Fire',
				description: 'A blazing, beautifully organized inferno erupts at your command.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Fire',
					'Magic',
					'Ranged'
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'The wall lasts until the start of your next turn, and can be placed in occupied squares. Creatures can enter and pass through the wall. When an enemy enters or starts their turn in a square of the wall, they take fire damage equal to your Reason score.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [
					{
						value: 1,
						effect: 'The effect lasts until the start of your next turn, and you can add a number of squares to the wall equal to your Reason score.'
					}
				]
			}
		],
		subclasses: [
			{
				id: 'elementalist-sub-1',
				name: 'Earth',
				description: 'Earth is the element of permanence. Earth abilities create and shape physical terrain in a permanent way, and bolster the strength and hardiness of allies.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'elementalist-sub-1-1-1',
								name: 'Acolyte of Earth',
								description: 'Whenever you use an earth magic ability, your stability increases by 1 until the start of your next turn. This benefit is cumulative.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-1-1-2',
								name: 'Motivate Earth',
								description: 'The earth rises, falls, or opens up at your command.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-1-1-2',
										name: 'Motivate Earth',
										description: 'The earth rises, falls, or opens up at your command.',
										type: {
											usage: 'Main Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Earth',
											'Magic',
											'Melee'
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
										target: 'Special',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '\nYou touch a square containing mundane dirt, stone, or metal and create a 5 wall of the same material, which rises up out of the ground and must include the square you touched.\n\nAlternatively, you touch a structure made of mundane dirt, stone, or metal that takes up at least 2 squares. You can open a 1-square opening in the structure where you touched it.\n\nYou can instead touch a doorway or other opening in a mundane dirt, stone, or metal surface that is no larger than 1 square. The opening is sealed by the same material that makes up the surface.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'elementalist-sub-1-1-3',
								name: 'Skin Like Castle Walls',
								description: 'You make yourself or an ally covered in protective stone.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-1-1-3',
										name: 'Skin Like Castle Walls',
										description: 'You make yourself or an ally covered in protective stone.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target takes damage.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Earth',
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
										effect: 'The damage is halved.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'If the damage has any potency effect associate with it, the potency is reduced by 1.',
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
								id: 'elementalist-sub-1-2-1',
								name: 'Disciple of Earth',
								description: 'Your body is strengthened by your mind’s connection to the element of permanence.',
								type: 'Bonus',
								data: {
									field: 'Stamina',
									value: 3,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 1,
									valuePerLevel: 3,
									valuePerEchelon: 0
								}
							}
						]
					},
					{
						level: 3,
						features: [
							{
								id: 'elementalist-sub-1-3-1',
								name: 'The Earth Accepts Me',
								description: 'You can slip into the stone.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-1-3-1',
										name: 'The Earth Accepts Me',
										description: 'You can slip into the stone.',
										type: {
											usage: 'Main Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Earth',
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
										effect: 'You step into a mundane dirt, metal, or stone object (including a wall) that is as large as you or larger. You can remain inside the object for as long as you like. While inside the object, you can observe events and speak to creatures outside of it, but you don’t have line of effect to anything outside the object and vice versa. You can travel through the object freely until you exit it. If the object you meld with is destroyed, you take 10 damage and exit the object.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'elementalist-sub-2',
				name: 'Fire',
				description: 'Fire is the element of destruction. Fire abilities harm enemies and objects.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'elementalist-sub-2-1-1',
								name: 'Acolyte of Fire',
								description: '',
								type: 'Ability Damage',
								data: {
									keywords: [
										'Fire',
										'Magic'
									],
									value: 1,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 0,
									valuePerLevel: 0,
									valuePerEchelon: 0,
									damageType: 'Damage'
								}
							},
							{
								id: 'elementalist-sub-2-1-2',
								name: 'Return to Formlessness',
								description: 'With the merest touch, you cause an object to turn into slag or ash.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-2-1-2',
										name: 'Return to Formlessness',
										description: 'With the merest touch, you cause an object to turn into slag or ash.',
										type: {
											usage: 'Main Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Fire',
											'Magic',
											'Melee'
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
										target: '1 mundane object',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You heat the target and cause it to combust and melt, destroying it. If the object is larger than 1 square, then only the square of the object that you touch is destroyed.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'elementalist-sub-2-1-3',
								name: 'Explosive Assistance',
								description: 'You add a little magic to an ally’s aggression at just the right time.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-2-1-3',
										name: 'Explosive Assistance',
										description: 'You add a little magic to an ally’s aggression at just the right time.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target force moves a creature or object.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Fire',
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
										effect: 'The forced movement distance gains a bonus equal to your Reason score.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'The forced movement distance gains a bonus equal to twice your Reason score instead.',
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
								id: 'elementalist-sub-2-2-1',
								name: 'Disciple of Fire',
								description: 'Your connection to fire allows you to protect yourself from it, even as you rip away the protections of others. You have fire immunity equal to 5 plus your level in this class. Any fire damage you deal ignores a target’s fire immunity.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: [
							{
								id: 'elementalist-sub-2-3-1',
								name: 'A Conversation with Fire',
								description: 'When you spend 1 minute in front of a fire, you can speak the name of another creature. If that creature is willing to speak to you, their image appears in the fire, and they can see you before them in a shimmering ball of light. The two of you can speak to each other through these images as if you were together in person. You or the creature can end the conversation as a maneuver.',
								type: 'Text',
								data: null
							}
						]
					}
				],
				selected: true
			},
			{
				id: 'elementalist-sub-3',
				name: 'Green',
				description: 'Green is the element of creation and growth. Green abilities make and manipulate plants, fungi, and other forms of life to hamper foes and nourish your allies.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'elementalist-sub-3-1-1',
								name: 'Acolyte of the Green',
								description: 'Whenever you deal damage to one or more creatures with a green magic ability that costs essence to use (see below), you or one creature of your choice within 10 squares of you gains temporary Stamina equal to your Reason score.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-3-1-2',
								name: 'It Is the Soul Which Hears',
								description: '\nYou can speak with and understand Animals, Monstrosities, and Plant Creatures, even if they don’t share a language with you. Your ability to communicate with such creatures doesn’t make them inherently more intelligent, but you can use Reason in place of Presence while making tests to influence them.\n\nAdditionally, whenever you touch a living plant that is not a Plant Creature, you can communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-3-1-3',
								name: 'The Breath of Dawn Remembered',
								description: 'The power you channel grants the ability to get back in the fight.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-3-1-3',
										name: 'The Breath of Dawn Remembered',
										description: 'The power you channel grants the ability to get back in the fight.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target starts their turn.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Green',
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
										effect: 'The target can spend a Recovery.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												repeatable: true,
												effect: 'The target can spend an additional Recovery for each essence spent.',
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
								id: 'elementalist-sub-3-2-1',
								name: 'Disciple of the Green',
								description: '\nYou can use a maneuver to shapeshift into a type of creature on the Green Animal Forms table. While in animal form, you can speak, and you use your Reason score to make melee free strikes. Your statistics stay the same except as noted on the table.\n\nEach form has a prerequisite level that you must attain in this class before you can adopt it. Some animal forms grant you temporary Stamina. You lose this temporary Stamina when you revert back to your true form.\n\nYou choose a specific animal and appearance while in animal form. For example, if you become a rodent, you might become a mouse, a rat, a shrew, or any other size 1T rodent who fits the animal type. When you take on animal form, your equipment either melds into your new form or falls unharmed to the ground, as you decide. When you return to your true form, any melded gear reappears on your person.\n\nYou can revert back to your true form as a maneuver. You can’t enter an animal form unless you are in your true form. If you are dying, you revert to your true form and can’t turn back into an animal until you are no longer dying.\n\n| Animal Type | Level | Temporary Stamina | Speed | Size | Stability Bonus | Melee Damage Bonus | Special |\n|:------------|:------|:------------------|:--------------|:-----|:----------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| Canine | 2nd | 5 | 7 | 1M | +0 | +1/+1/+1 | You gain an edge on tests that involve smell. |\n| Fish | 2nd | 0 | 5 (swim only) | 1T | +0 | +0/+0/+0 | You can breathe in water but can’t breathe outside of it. |\n| Rodent | 2nd | 0 | 5 (climb) | 1T | +0 | +0/+0/+0 | You gain an edge on tests that involve smell. |\n| Bird | 3rd | 0 | 5 (fly) | 1T | +0 | +0/+0/+0 | - |\n| Great cat | 3rd | 5 | 6 (climb) | 2 | +0 | +1/+1/+1 | As a maneuver, jump up to 3 squares in any direction. If you land on an enemy of you size or smaller, that enemy is knocked prone and you can make a melee free strike against them as part of the maneuver. |',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 3,
						features: [
							{
								id: 'elementalist-sub-3-3-1',
								name: 'Remember Growth and Sun and Rain',
								description: 'You stir any wood’s memory and learn what it has seen.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-3-3-1',
										name: 'Remember Growth and Sun and Rain',
										description: 'You stir any wood’s memory and learn what it has seen.',
										type: {
											usage: 'Main Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Green',
											'Magic',
											'Melee'
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
										target: 'One mundane wooden object',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'You see and hear any events that have occurred within 10 squares of the object within the last 12 hours, perceiving those events from the object’s location as if you were there.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'elementalist-sub-4',
				name: 'Void',
				description: 'Void is the element of the unknown. Void abilities warp space and reality, allowing you to teleport, create illusions, and make things incorporeal.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'elementalist-sub-4-1-1',
								name: 'Acolyte of the Void',
								description: '',
								type: 'Ability Distance',
								data: {
									keywords: [
										'Magic',
										'Ranged',
										'Void'
									],
									value: 2,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 0,
									valuePerLevel: 0,
									valuePerEchelon: 0
								}
							},
							{
								id: 'elementalist-sub-4-1-2',
								name: 'A Beyonding of Vision',
								description: 'You instantly recognize illusions for what they are, you can see invisible creatures, and supernatural effects can’t conceal creatures and objects from you. You always know if an area or object you observe is magical or affected by magic, and you know the specifics of what that magic can do.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-4-1-3',
								name: 'Shared Void Sense',
								description: 'You grant allies a taste of your unearthly vision.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-4-1-3',
										name: 'Shared Void Sense',
										description: 'You grant allies a taste of your unearthly vision.',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic',
											'Ranged',
											'Void'
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
										target: 'Special',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'For each Victory you have, you can target one creature. That creature gains the benefit of your A Beyonding of Vision feature until the end of your next turn, but doesn’t gain the use of Shared Void Sense.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'elementalist-sub-4-1-4',
								name: 'A Subtle Relocation',
								description: 'You call on the void to swallow and spit out an ally.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-4-1-4',
										name: 'A Subtle Relocation',
										description: 'You call on the void to swallow and spit out an ally.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target starts their turn, moves, or is force moved.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic',
											'Ranged',
											'Void'
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
										effect: 'You teleport the target up to a number of squares equal to your Reason score. If the target moves to trigger this ability, you can teleport them at any point during the move.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'You teleport the target up to a number of squares equal to twice your Reason score instead.',
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
								id: 'elementalist-sub-4-2-1',
								name: 'There is No Space Between',
								description: '',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-4-2-1',
										name: 'There is No Space Between',
										description: '',
										type: {
											usage: 'Maneuver',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic',
											'Ranged',
											'Void'
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
										target: 'Special',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '\nYou open two size 1 portals in unoccupied spaces in range, which last until you move beyond distance from any portal, end the effect as a maneuver, or are dying. Each portal must be placed at a height of no more than 1 square above the ground. When you or any ally touch a portal, that creature can choose to be instantly teleported to an unoccupied space of their choice within 1 square of the other portal. If an enemy is force moved into a portal, their forced movement ends and they emerge from the other portal in an unoccupied space chosen by the creature who force moved them.\n\nAt the start of each of your turns while the portals are active, you can open a new portal connected to the others. If three or more portals are present, you and your allies choose which portal you emerge from when you enter a portal, and a creature who force moves an enemy into a portal chooses that enemy’s destination portal.',
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
						features: [
							{
								id: 'elementalist-sub-4-3-1',
								name: 'Distance is Only Memory',
								description: 'When you finish a respite, you can open a two-way portal that leads to any place you have previously been. Your allies can pass through the portal, which remains open for 1 hour or until you dismiss it as an action.',
								type: 'Text',
								data: null
							}
						]
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
				value: 1
			},
			{
				characteristic: 'Reason',
				value: 2
			},
			{
				characteristic: 'Intuition',
				value: 2
			},
			{
				characteristic: 'Presence',
				value: 1
			}
		]
	},
	career: {
		id: 'career-mages-apprentice',
		name: 'Mage’s Apprentice',
		description: 'For long years, you studied magic under the mentorship of a more experienced mage.',
		features: [
			{
				id: 'mages-apprentice-feature-1',
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
						'History'
					]
				}
			},
			{
				id: 'mages-apprentice-feature-2',
				name: 'Lore Skills',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Lore'
					],
					count: 2,
					selected: [
						'Monsters',
						'Timescape'
					]
				}
			},
			{
				id: 'mages-apprentice-feature-3',
				name: 'Language',
				description: '',
				type: 'Language Choice',
				data: {
					options: [],
					count: 1,
					selected: [
						'The First Language'
					]
				}
			},
			{
				id: 'mages-apprentice-feature-4',
				name: 'Renown',
				description: '',
				type: 'Bonus',
				data: {
					field: 'Renown',
					value: 1,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				}
			},
			{
				id: 'mages-apprentice-feature-5',
				name: 'Supernatural Perk',
				description: '',
				type: 'Perk',
				data: {
					lists: [
						'Supernatural'
					],
					count: 1,
					selected: [
						{
							id: 'perk-arcane-trick',
							name: 'Arcane Trick',
							description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
							type: 'Ability',
							data: {
								ability: {
									id: 'perk-arcane-trick-1',
									name: 'Arcane Trick',
									description: 'You cast an entertaining spell that creates a minor but impressive magical effect.',
									type: {
										usage: 'Main Action',
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
									effect: '\nChoose one of the following effects:\n\n* You teleport an unattended size 1T or 1S object within 1 square of you to an unoccupied space within 1 square of you.\n* Until the start of your next turn, a part of your body shoots a shower of harmless noisy sparks that give off light within 1 square of you.\n* You ignite or snuff out (your choice) every mundane light source within 1 square of you.\n* You make up to 1 pound of edible food you can touch taste delicious or disgusting.\n* Until the start of your next turn, you make your body exude a particular odor you’ve smelled before. This smell can be sensed by creatures within 5 squares of you, but can’t impose any condition or other drawback on creatures.\n* You place a small magical inscription on the surface of a mundane object you can touch, or remove an inscription that was made by you or by another creature using Arcane Trick.\n* You cover a size 1T object that you touch with an illusion that makes it look like another object. A creature who handles the object can see through the illusion. The illusion ends when you stop touching the object.',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: [], sections: []
								}
							},
							list: 'Supernatural'
						}
					]
				}
			}
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-mages-apprentice-ii-1',
					name: 'Forgotten Memories',
					description: 'While practicing a spell, your inexperience caused the magic to backfire and your memories were wiped, leaving you with only fragments of who you once were. Determined to recall your past, you now dedicate yourself to helping others, hoping your actions will spark some remembrance or lead you to a way to reverse the magic.'
				},
				{
					id: 'career-mages-apprentice-ii-2',
					name: 'Magic of Friendship',
					description: 'As a sign of your status as star pupil, your mentor gifted you a familiar as a magic pet. Another jealous apprentice captured the familiar and slipped away in the night. Haunted by your pet’s absence, you adventure to find your kidnapped friend and prevent others from feeling your loss.'
				},
				{
					id: 'career-mages-apprentice-ii-3',
					name: 'Missing Mage',
					description: 'One day you woke up and the mage you worked for was just gone. They didn’t take any of their belongings and there was no sign of any foul play - just the scent of sulfur in their bedchamber. You set out on your heroic journey in the aftermath and have been looking for them ever since.'
				},
				{
					id: 'career-mages-apprentice-ii-4',
					name: 'Nightmares Made Flesh',
					description: 'Your attempts at magic have always been unpredictable. A powerful mage promised to help you gain control. During your training, a terrible nightmare caused your body to flare with magic and pull the monster of your nightmare into the waking world. The horror escaped. You left, seeking to vanquish their terrible vileness.'
				},
				{
					id: 'career-mages-apprentice-ii-5',
					name: 'Otherworldly',
					description: 'While studying magic, you accidentally sent yourself from your original world to this one. Now you’re stranded here, hoping to find ancient texts or powerful magic treasures that might transport you back home. A life of adventure it is!'
				},
				{
					id: 'career-mages-apprentice-ii-6',
					name: 'Ultimate Power',
					description: 'The mage you worked for was a kindly old soul, but the basic magic they taught you always seemed like a small part of something bigger. It wasn’t until you met an adventuring elementalist that you realized hitting the road as a hero was the only way to truly improve and hone your skills. You resigned your apprenticeship and found yourself walking the path of a hero the next day.'
				}
			],
			selectedID: 'career-mages-apprentice-ii-4'
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
