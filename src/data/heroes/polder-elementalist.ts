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
					'Alertness'
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
					'Gymnastics'
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
					'Empathize'
				]
			}
		}
	},
	class: {
		id: 'class-elementalist',
		name: 'Elementalist',
		description: '\nAir for movement. Earth for permanence. Fire for destruction. Water for change. Green for growth. Rot for death. Void for the mystery. Years of study and practice and poring over tomes brought you the revelations that allow you to manipulate these building blocks of reality. Now you use your mastery of the seven elements to destroy, create, and warp the world with magic.\n\nAs an elementalist, you can unleash your wrath across a field of foes, put an enemy exactly where you want them, debilitate foes with harmful effects, ward yourself and allies against danger, manipulate terrain, warp space, and more. Your choice of elemental specialization determines which of these things you do best.',
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
							valuePerLevel: 6,
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
						id: 'elementalist-resource',
						name: 'Essence',
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
									tag: 'take-damage',
									trigger: 'The first time in a round that you or a creature within 10 of you takes damage that isn’t untyped or holy',
									value: '1'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Blacksmithing',
								'Tailoring',
								'Alchemy'
							]
						}
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
								sections: [
									{
										type: 'roll',
										roll: {
											characteristic: [
												'Reason'
											],
											bonus: 0,
											tier1: '2 + R damage',
											tier2: '4 + R damage',
											tier3: '6 + R damage'
										}
									},
									{
										type: 'text',
										text: 'When you make this strike, choose the damage type from one of the following options: acid, cold, corruption, fire, lightning, poison, or sonic.'
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
						id: 'elementalist-1-5',
						name: 'Persistent Magic',
						description: '\nSome of your heroic abilities have a persistent effect entry. For example, the Instantaneous Excavation ability has an effect noted as “Persistent 1.” Whenever you use a persistent ability, you decide whether you want to maintain it, and start doing so immediately after you first use the ability. If you maintain a persistent ability in combat, you reduce the amount of essence you earn at the start of your turn by an amount equal to the ability’s persistent value, which enables the ability’s persistent effect. All your active persistent abilities end at the end of the encounter.\n\nYou can’t maintain any abilities that would make you earn a negative amount of essence at the start of your turn. You can stop maintaining an ability at any time (no action required).\n\nIf you maintain the same ability on several targets and the effect includes a power roll, you make that roll once and apply the same effect to all targets. A creature can’t be affected by multiple instances of a persistent ability.\n\nIf you take damage equal to or greater than 5 times your Reason score in one turn, you stop maintaining any persistent abilities. For instance, if you have a Reason score of 2 and are maintaining Instantaneous Excavation, taking 10 or more damage in one turn causes you to stop maintaining the ability.',
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
								sections: [
									{
										type: 'text',
										text: '\nChoose one of the following effects:\n\n* You use the Knockback maneuver, but its distance becomes the range of your Hurl Element ability, and you use Reason instead of Might for the power roll.\n* You choose a creature within the distance of your Hurl Element ability and one of the following damage types: acid, cold, corruption, fire, lightning, poison, or sonic. That creature takes damage of the chosen type equal to your Reason score.\n* You teleport up to a number of squares equal to your Reason score. If you choose this option, you can spend essence to teleport 1 additional square for each essence spent.\n\t\t\t\t\t\t\t'
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
										description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit.',
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
												},
												{
													id: 'elementalist-1-7ac',
													name: 'Proficiency',
													description: '',
													type: 'Proficiency',
													data: {
														weapons: [
															'Light Weapon'
														],
														armor: [
															'Light Armor'
														]
													}
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
										description: 'You gain a bonus to speed and to the distance you can shift when you take the Disengage move action.',
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
										description: 'You gain a bonus to rolled damage with magic abilities.',
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
										description: 'You have a bonus to the distance of your ranged magic abilities.',
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
										description: 'You gain a bonus to Stamina.',
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
									description: 'You gain a bonus to rolled damage with magic abilities.',
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
										description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain 1 surge.',
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
												},
												{
													damageType: 'Poison',
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
													damageType: 'Sonic',
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
												sections: [
													{
														type: 'text',
														text: 'You slide the attacking creature up to a number of squares equal to your Reason score.'
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
										id: 'elementalist-1-8d',
										name: 'Ward of Surprising Reactivity',
										description: 'You use the magic of fire to create a ward of explosive energy.',
										type: 'Ability',
										data: {
											ability: {
												id: 'elementalist-1-8d',
												name: 'Ward of Surprising Reactivity',
												description: 'You use the magic of fire to create a ward of explosive energy.',
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
												sections: [
													{
														type: 'text',
														text: 'You push that creature a number of squares equal to twice your Reason score.'
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
							selected: [
								{
									id: 'elementalist-1-8a',
									name: 'Ward of Delightful Consequences',
									description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain 1 surge.',
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
							minLevel: 3,
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
						id: 'elementalist-4-1a',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'elementalist-4-1b',
						name: 'Choice',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'elementalist-4-1ba',
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
										id: 'elementalist-4-1bb',
										name: 'Agility',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Agility',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-4-1bc',
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
										id: 'elementalist-4-1bd',
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
										id: 'elementalist-4-1be',
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
						id: 'elementalist-4-2',
						name: 'Font of Essence',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'take-damage 2',
							trigger: 'The first time in a round that you or a creature within 10 of you takes damage that isn’t untyped or holy',
							value: '2',
							replacesTags: [
								'take-damage'
							]
						}
					},
					{
						id: 'elementalist-4-3',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Interpersonal',
								'Crafting',
								'Lore',
								'Supernatural',
								'Intrigue',
								'Exploration'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'elementalist-4-4',
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
						id: 'elementalist-5-1',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 9,
							allowAnySource: false,
							minLevel: 5,
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
						id: 'elementalist-6-1',
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
						id: 'elementalist-6-2',
						name: 'Wyrding',
						description: 'You can spend 10 uninterrupted minutes to create a freeform magic spell for a variety of situations. Choose one of the following magical effects:\n\n* You create a mundane object of a size equal to your Reason score or smaller.\n* You construct a place of shelter suitable for twenty creatures that lasts for 24 hours and can’t be detected by enemies.\n* You restore all Stamina to a mundane object of a size equal to your Reason score or smaller.\n* Choose a cube with a size up to your Reason score within 5 squares. You can fill that area with difficult terrain or natural phenomena such as fire, water, or plant life, or can clear the area of those things.\n* You can preserve a corpse or up to 5 pounds of food for a week, or can cause a corpse or that amount of food to instantly rot.\n* You create a seal on a surface that can’t be seen or felt by anyone but you. When a creature comes adjacent to the surface, you can see and hear through the seal for as long as the creature remains adjacent to it. When you create the seal, you can decide to limit the number of creatures who activate it by choosing a creature keyword (such as Undead) or a specific name (such as Ajax the Invincible) or organization (such as the Black Iron Pact). If you do, the seal alerts you only when creatures with the keyword, name, or organizational affiliation you provide pass by it. If you create a second seal, the first one disappears. You can dispel a seal at any time (no action required).',
						type: 'Text',
						data: null
					},
					{
						id: 'elementalist-6-3',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 9,
							allowAnySource: false,
							minLevel: 6,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 7,
				features: [
					{
						id: 'elementalist-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'elementalist-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'elementalist-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'elementalist-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'elementalist-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'elementalist-7-2',
						name: 'Surging Essence',
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
						id: 'elementalist-7-3',
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
						id: 'elementalist-8-1',
						name: 'Perk',
						description: '',
						type: 'Perk',
						data: {
							lists: [
								'Exploration',
								'Interpersonal',
								'Intrigue',
								'Crafting',
								'Lore',
								'Supernatural'
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'elementalist-8-2',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 11,
							allowAnySource: false,
							minLevel: 8,
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
						id: 'elementalist-9-1',
						name: 'Grand Wyrding',
						description: '\nYou have mastered the magic of shaping a wyrd, and can use your Wyrding feature as a main action.\n\nAdditionally, when you have 5 or more Victories, choose one of the following damage types: acid, cold, corruption, fire, lightning, poison, or sonic. You have immunity all to that type.',
						type: 'Text',
						data: null
					},
					{
						id: 'elementalist-9-2',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 11,
							allowAnySource: false,
							minLevel: 9,
							count: 1,
							selectedIDs: []
						}
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'elementalist-10-1',
						name: 'Breath',
						description: '\nYou can spend any number of breath to gain essence (no action required). When you do, 1 breath becomes 3 essence.\n\nBreath remains until you convert it to essence.',
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
						id: 'elementalist-10-2',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'elementalist-10-3',
						name: 'Choice',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'elementalist-10-3-1',
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
										id: 'elementalist-10-3-2',
										name: 'Agility',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Agility',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'elementalist-10-3-4',
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
										id: 'elementalist-10-3-5',
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
						id: 'elementalist-10-4',
						name: 'Essential Being',
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
						id: 'elementalist-10-5',
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
						id: 'elementalist-10-6',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R corruption damage',
							tier2: '4 + R corruption damage',
							tier3: '6 + R corruption damage'
						}
					},
					{
						type: 'text',
						text: 'Choose yourself or one ally within distance. That character can end one effect on them that is ended by a saving throw or that ends at the end of their turn.'
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
				id: 'elementalist-ability-2',
				name: 'Bifurcated Incineration',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 fire damage',
							tier2: '4 fire damage',
							tier3: '6 fire damage'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 + R corruption damage',
							tier2: '6 + R corruption damage',
							tier3: '9 + R corruption damage'
						}
					},
					{
						type: 'text',
						text: 'You can teleport up to a number of squares equal to your Reason score.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R damage',
							tier2: '5 + R damage',
							tier3: '7 + R damage'
						}
					},
					{
						type: 'text',
						text: 'You slide one creature within 10 squares of the target up to 2 squares.'
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
				id: 'elementalist-ability-5',
				name: 'A Meteoric Introduction',
				description: 'You give your enemy a gentle tap - like an asteroid impact.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 + R damage; push 2',
							tier2: '5 + R damage; push 3',
							tier3: '8 + R damage; push 4'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R corruption damage; R < [weak], slowed (save ends)',
							tier2: '4 + R corruption damage; R < [average], slowed (save ends)',
							tier3: '6 + R corruption damage; R < [strong], slowed (save ends)'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}
					},
					{
						type: 'text',
						text: 'The ground beneath the area becomes difficult terrain for enemies.'
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
				id: 'elementalist-ability-8',
				name: 'Viscous Fire',
				description: 'A jet of heavy fire erupts where you strike.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R fire damage; push 2',
							tier2: '5 + R fire damage; push 3',
							tier3: '7 + R fire damage; push 4'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 psychic damage',
							tier2: '4 psychic damage',
							tier3: '6 psychic damage'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
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
				id: 'elementalist-ability-10',
				name: 'The Flesh, a Crucible',
				description: 'Fire engulfs your target and continues to churn.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '5 + R fire damage',
							tier2: '8 + R fire damage',
							tier3: '11 + R fire damage'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'If the target is within distance at the start of your turn, make a power roll for this ability again.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '4 + R poison damage',
							tier2: '7 + R poison damage',
							tier3: '11 + R poison damage'
						}
					},
					{
						type: 'text',
						text: 'Mushrooms cover the target’s body. While the mushrooms are on the target, you and any ally adjacent to the target gain 1 surge whenever the target takes damage. The mushrooms can be removed by the target or an adjacent creature as a main action.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 damage',
							tier2: '5 damage',
							tier3: '8 damage; M < [strong], prone'
						}
					},
					{
						type: 'text',
						text: 'You must be touching the ground to use this ability. Additionally, you can choose a square of ground in the area that is unoccupied or is occupied by you or any ally. A pillar of earth rises out of the ground in that square, with a height in squares up to your Reason score. The pillar can’t collide with any creatures or objects, nor can it force creatures raised by it to collide with other creatures or objects.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '4 fire damage',
							tier2: '6 fire damage',
							tier3: '10 fire damage'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 2,
						repeatable: false,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
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
				sections: [
					{
						type: 'text',
						text: 'You open up two holes with 1-square openings that are 4 squares deep, which can be placed on any mundane surface within distance. You can place these holes next to each other to create fewer holes with wider openings. When the holes open, make a separate power roll for each creature on the ground above a hole and small enough to fall in. (You can’t score a critical hit with this ability because it uses a maneuver.)'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: 'The target can shift 1 square from the edge of the hole to the nearest unoccupied space of their choice.',
							tier2: 'The target falls into the hole.',
							tier3: 'The target falls into the hole and can’t reduce the height of the fall.'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'At the start of your turn, you open another hole, making a power roll against each creature who could fall into the hole when it opens without spending essence.'
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
				sections: [
					{
						type: 'text',
						text: 'Until the start of your next turn, the target can move through solid matter, they ignore difficult terrain, and their movement can’t provoke opportunity attacks. If the target ends their turn inside solid matter, they are forced out into the space where they entered it and this effect ends.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The effect lasts until the start of your next turn.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '4 acid damage',
							tier2: '6 acid damage',
							tier3: '10 acid damage'
						}
					},
					{
						type: 'text',
						text: 'You can end one effect on yourself that is ended by a saving throw or that ends at the end of your turn. Each ally in the area also gains this benefit.'
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
				sections: [
					{
						type: 'text',
						text: '\nUntil the start of your next turn, the area gains the following effects:\n\n* Once as a free maneuver at the start of your turn, you allow yourself and each ally in the area to spend any number of Recoveries.\n* The area is difficult terrain for enemies.\n* Each enemy who enters the area for the first time in a combat round or starts their turn there takes damage equal to your Reason score.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The area remains until the start of your next turn. As a maneuver, you can move the area up to 5 squares. This ability ends if the area is ever not within your line of effect.'
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
				id: 'elementalist-ability-18',
				name: 'Subvert the Green Within',
				description: 'Fungal spores sprout inside your enemy’s brain, allowing you to control their actions.',
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
				sections: [
					{
						type: 'text',
						text: 'The target uses their signature ability against a creature of your choice. This signature ability can target the creature even if it usually wouldn’t. You then make a power roll against the target of this ability.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '5 + R poison damage',
							tier2: '9 + R poison damage',
							tier3: '12 + R poison damage'
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
				sections: [
					{
						type: 'text',
						text: 'The target is teleported to another space within distance. Make a power roll that affects each enemy adjacent to the target’s new space.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 fire damage',
							tier2: '5 fire damage',
							tier3: '8 fire damage'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '5 + R fire damage; A < [weak], restrained (save ends)',
							tier2: '9 + R fire damage; A < [average], restrained (save ends)',
							tier3: '12 + R fire damage; A < [strong], restrained (save ends)'
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
				minLevel: 3,
				sections: [
					{
						type: 'text',
						text: 'The number of creatures you target with this ability is determined by your power roll.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: 'One creature',
							tier2: 'Two creatures',
							tier3: 'Three creatures'
						}
					},
					{
						type: 'text',
						text: 'Each target begins to fade from existence (save ends). On their first turn while fading from existence, a target takes a bane on power rolls. At the end of their first turn, they have a double bane on power rolls. At the end of their second turn, they fade from existence for 1 hour, after which they reappear in their original space or the nearest unoccupied space.'
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
				target: 'Each enemy in the area',
				cost: 7,
				repeatable: false,
				minLevel: 3,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '5 damage',
							tier2: '9 damage',
							tier3: '12 damage'
						}
					},
					{
						type: 'text',
						text: 'The ground in or directly beneath the area drops 3 squares.'
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
				minLevel: 3,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 damage',
							tier2: '6 damage',
							tier3: '9 damage'
						}
					},
					{
						type: 'text',
						text: 'Until the end of your next turn, each ally in the area has each of their characteristic scores treated as 1 higher for the purpose of resisting potencies, and has a +1 bonus to saving throws.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'You make the power roll again to target each enemy in the area without spending essence, and the effect lasts until the start of your next turn.'
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
				minLevel: 3,
				sections: [
					{
						type: 'text',
						text: 'The wall lasts until the start of your next turn, and can be placed in occupied squares. Creatures can enter and pass through the wall. Each enemy who enters the area for the first time in a combat round or starts their turn there takes fire damage equal to your Reason score for each square of the area they start their turn in or enter.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The wall lasts until the start of your next turn, and you can add a number of squares to the wall equal to your Reason score.'
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
				id: 'elementalist-ability-25',
				name: 'Combustion Deferred',
				description: 'Your flames dance from kindling to kindling to kindling.',
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
				cost: 9,
				repeatable: false,
				minLevel: 5,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '8 + M fire damage',
							tier2: '13 + M fire damage',
							tier3: '17 + M fire damage'
						}
					},
					{
						type: 'text',
						text: 'When the target ends their next turn, or if they drop to 0 Stamina before then, each enemy adjacent to them takes fire damage equal to twice your Reason score. Each affected enemy then gains this same effect.'
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
				id: 'elementalist-ability-26',
				name: 'Storm of Sands',
				description: 'Dirt and debris swirl into a dark, pulsing hurricane.',
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
					'Earth',
					'Ranged'
				],
				distance: [
					{
						type: 'Cube',
						value: 4,
						value2: 0,
						within: 10,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 9,
				repeatable: false,
				minLevel: 5,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}
					},
					{
						type: 'text',
						text: 'The area lasts until the start of your next turn. It is difficult terrain for enemies, and you and your allies have concealment while in the area.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The area remains until the start of your next turn, and you can move it up to 5 squares (no action required). As a maneuver, you can make the power roll again without spending essence.'
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
				id: 'elementalist-ability-27',
				name: 'Subverted Perception of Space',
				description: 'You rip an enemy’s world in twain.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Void',
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
				cost: 9,
				repeatable: false,
				minLevel: 5,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '9 + R corruption damage',
							tier2: '10 + R corruption damage; the target has line of effect only to creatures and objects within 4 squares of them until the start of your next turn',
							tier3: '15 + R corruption damage; the target has line of effect only to adjacent creatures and objects until the start of your next turn'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The target’s limited line of effect lasts until the start of your next turn.'
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
				id: 'elementalist-ability-28',
				name: 'Web of All That\'s Come Before',
				description: 'Threads you’ve been weaving through your adventures create a vibrant, pearlescent web.',
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
					'Green',
					'Ranged'
				],
				distance: [
					{
						type: 'Cube',
						value: 4,
						value2: 0,
						within: 10,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 9,
				repeatable: false,
				minLevel: 5,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 corruption damage; A < [weak], restrained (save ends)',
							tier2: '3 corruption damage; A < [average], restrained (save ends)',
							tier3: '5 corruption damage; A < [strong], restrained (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The area is difficult terrain until the start of your next turn. Each enemy who ends their turn in the area is restrained (save ends).'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The area remains until the start of your next turn.'
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
				id: 'elementalist-ability-29',
				name: 'Luminous Champion Aloft',
				description: 'They shine vibrantly, a beautiful diamond in the night sky.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
					'Green',
					'Magic',
					'Ranged',
					'Void'
				],
				distance: [
					{
						type: 'Cube',
						value: 4,
						value2: 0,
						within: 10,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self or one ally',
				cost: 9,
				repeatable: false,
				minLevel: 6,
				sections: [
					{
						type: 'text',
						text: 'The target has a +3 bonus to speed, they can fly, and their abilities ignore concealment. Additionally, whenever the target gains their Heroic Resource, they gain 1 additional Heroic Resource. This effect lasts until the start of your next turn.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 1,
						repeatable: false,
						effect: 'The effect lasts until the start of your next turn.'
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
				id: 'elementalist-ability-30',
				name: 'Magma Titan',
				description: 'Their body swells with lava, mud, and might, towering over their enemies.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Fire',
					'Green',
					'Magic',
					'Ranged',
					'Earth'
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
				cost: 9,
				repeatable: false,
				minLevel: 6,
				sections: [
					{
						type: 'text',
						text: 'Until the start of your next turn, the target has the following benefits:\n\n* Their size and stability increase by 2, with any size 1 target becoming size 3. Each creature who is within the target’s new space slides to the nearest unoccupied space, ignoring stability. If the target doesn’t have space to grow, they grow as much as they can and become restrained until the effect ends.\n* They have fire immunity 10.\n* Their strikes deal extra fire damage equal to twice your Reason score.\n* When the target force moves a creature or object, the forced movement distance gains a +2 bonus.\n* They can use their highest characteristic instead of Might for Might power rolls.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 2,
						repeatable: false,
						effect: 'The effect lasts until the start of your next turn. Additionally, at the start of your turn, the target can spend 2 Recoveries.'
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
				id: 'elementalist-ability-31',
				name: 'Meteor',
				description: 'You teleport the target into the air and let the ground and the elemental force of fire do the rest.',
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
					'Void',
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
				cost: 9,
				repeatable: false,
				minLevel: 6,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: 'You teleport the target up to 4 squares.',
							tier2: 'You teleport the target up to 6 squares.',
							tier3: 'You teleport the target up to 8 squares.'
						}
					},
					{
						type: 'text',
						text: 'If the target is teleported to a space where they would fall, they immediately do so, treating the fall as if their Agility score were 0. The target takes fire damage from the fall, and each enemy within 3 squares of where they land takes the same amount of fire damage. The ground within 3 squares of where the target lands is difficult terrain.'
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
				id: 'elementalist-ability-32',
				name: 'The Wode Remembers and Returns',
				description: 'You create a terrarium that spans from canopy above to underbrush below.',
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
					'Earth',
					'Void'
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
				target: 'Special',
				cost: 9,
				repeatable: false,
				minLevel: 6,
				sections: [
					{
						type: 'text',
						text: 'The area becomes dark and verdant, with trees and plant life appearing in unoccupied spaces within it until the start of your next turn. The area is difficult terrain for enemies, and any ally who ends their turn in the area has cover.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 2,
						repeatable: false,
						effect: 'The area remains until the start of your next turn. Additionally, at the start of your turn, each ally in the area can spend a Recovery.'
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
				id: 'elementalist-ability-33',
				name: 'Heart of the Wode',
				description: 'You call forth one of the Great Tree’s many splinters to provide for your every need.',
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
				cost: 11,
				repeatable: false,
				minLevel: 8,
				sections: [
					{
						type: 'text',
						text: 'A size 5 tree appears in an unoccupied space within distance. The tree has 100 Stamina and can’t be force moved. You and any ally can touch the tree to use the Catch Breath maneuver as a free maneuver. Additionally, when you start your turn with line of effect to the tree, you can end one effect on yourself that is ended by a saving throw or that ends at the end of your turn, or you can stand up if you are prone. Each ally within distance also gains this benefit.\n\nEach enemy who ends their turn within 3 squares of the tree is restrained until the end of their next turn. A creature restrained this way can use a main action to end the effect early.'
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
				id: 'elementalist-ability-34',
				name: 'Muse of Fire',
				description: 'The fire burns hot enough to sear the face of any god watching.',
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
					'Void',
					'Ranged'
				],
				distance: [
					{
						type: 'Cube',
						value: 5,
						value2: 0,
						within: 10,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy in the area',
				cost: 11,
				repeatable: false,
				minLevel: 8,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '7 fire damage; the Director loses 2 Malice',
							tier2: '10 fire damage; the Director loses 3 Malice',
							tier3: '15 fire damage; the Director loses 4 Malice'
						}
					},
					{
						type: 'text',
						text: 'The Director’s Malice can become negative as a result of this ability.'
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
				id: 'elementalist-ability-35',
				name: 'Return to Oblivion',
				description: 'You create a tear in reality that could consume everything.',
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
					'Void',
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
				cost: 11,
				repeatable: false,
				minLevel: 8,
				sections: [
					{
						type: 'text',
						text: 'You create a size 1L vortex that lasts until the end of the encounter. At the start of each combat round while the vortex is unoccupied, the vortex vertical pulls 3 each enemy within 5 squares of it. Each enemy who enters the vortex or starts their turn there is knocked prone. At the end of the round, if a winded enemy who is not a leader or solo creature is in the vortex, they are instantly destroyed.'
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
				id: 'elementalist-ability-36',
				name: 'World Torn Asunder',
				description: 'You stomp your foot and quake the whole world over.',
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
					'Earth'
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
				cost: 11,
				repeatable: false,
				minLevel: 8,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: 'M < [weak]; prone',
							tier2: 'M < [average]; prone',
							tier3: 'M < [strong]; prone'
						}
					},
					{
						type: 'text',
						text: 'You create a fissure in the ground adjacent to you that is a 10 × 2 line and 6 squares deep. Each creature in the area who is prone and size 2 or smaller falls in. Other creatures can enter the fissure or can shift to the nearest unoccupied space of their choice outside it.'
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
				id: 'elementalist-ability-37',
				name: 'Earth Rejects You',
				description: 'Everyone and everything gets blown away in an eruption of rocks and debris.',
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
					'Earth',
					'Ranged'
				],
				distance: [
					{
						type: 'Cube',
						value: 5,
						value2: 0,
						within: 10,
						special: '',
						qualifier: ''
					}
				],
				target: 'Each enemy and object in the area',
				cost: 11,
				repeatable: false,
				minLevel: 9,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '6 damage',
							tier2: '9 damage',
							tier3: '13 damage'
						}
					},
					{
						type: 'field',
						name: 'Persist',
						value: 2,
						repeatable: false,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
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
				id: 'elementalist-ability-38',
				name: 'The Green Defends Its Servants',
				description: 'A luminous green shield shows its true beauty the more it cracks.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
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
				cost: 11,
				repeatable: false,
				minLevel: 9,
				sections: [
					{
						type: 'text',
						text: 'You create a fissure in the ground adjacent to you that is a 10 × 2 line and 6 squares deep. Each creature in the area who is prone and size 2 or smaller falls in. Other creatures can enter the fissure or can shift to the nearest unoccupied space of their choice outside it.'
					},
					{
						type: 'field',
						name: 'Persist',
						value: 2,
						repeatable: false,
						effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
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
				id: 'elementalist-ability-39',
				name: 'Prism',
				description: 'You split your essence, allowing you to cast multiple effects at once.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Magic',
					'Void'
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
				minLevel: 9,
				sections: [
					{
						type: 'text',
						text: 'You use up to three heroic abilities whose essence costs total 11 or less, spending no additional essence beyond the cost of this ability. You can shift up to 2 squares between your use of each ability.'
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
				id: 'elementalist-ability-40',
				name: 'Unquenchable Fire',
				description: 'You let fly a fiery missile braided with pure primal energy.',
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
					'Strike',
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
				target: 'One enemy or object',
				cost: 11,
				repeatable: false,
				minLevel: 9,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '13 + R fire damage; I < [weak] , dazed (save ends)',
							tier2: '18 + R fire damage; I < [average] , dazed (save ends)',
							tier3: '25 + R fire damage; I < [strong] , dazed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'You use up to three heroic abilities whose essence costs total 11 or less, spending no additional essence beyond the cost of this ability. You can shift up to 2 squares between your use of each ability.'
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
				id: 'elementalist-sub-1',
				name: 'Earth',
				description: 'Earth is the element of permanence. Earth abilities bolster your body and grant the power to permanently create and shape physical terrain.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'elementalist-sub-1-1-1',
								name: 'Earth: Acolyte of Earth',
								description: 'You harness the flow of earth magic to become harder to move. Whenever you use an ability that has the Earth and Magic keywords, your stability increases by 1 until the start of your next turn. This benefit is cumulative.',
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
										sections: [
											{
												type: 'text',
												text: '\nYou touch a square containing mundane dirt, stone, or metal and create a 5 wall of the same material, which rises up out of the ground and must include the square you touched.\n\nAlternatively, you touch a structure made of mundane dirt, stone, or metal that occupies 2 or more squares. You can open a 1-square opening in the structure where you touched it. You can instead touch an existing doorway or other opening that is 1 square or smaller in a mundane dirt, stone, or metal surface. The opening is sealed by the same material that makes up the surface.'
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
								id: 'elementalist-sub-1-1-3',
								name: 'Skin Like Castle Walls',
								description: 'You cover yourself or an ally in protective stone.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-1-1-3',
										name: 'Skin Like Castle Walls',
										description: 'You cover yourself or an ally in protective stone.',
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
										sections: [
											{
												type: 'text',
												text: 'The damage is halved.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'If the damage has any potency effect associate with it, the potency is reduced by 1.'
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
								id: 'elementalist-sub-1-2-1',
								name: 'Disciple of Earth',
								description: 'Your body is strengthened by your mind’s connection to the element of permanence.',
								type: 'Bonus',
								data: {
									field: 'Stamina',
									value: 6,
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
										sections: [
											{
												type: 'text',
												text: 'You step into a mundane dirt, metal, or stone object (including a wall) that is as large as you or larger. You can remain inside the object for as long as you like. While inside the object, you can observe events and speak to creatures outside it, but you don’t have line of effect to anything outside the object and vice versa. You can travel through the object freely until you exit it. If the object you meld with is destroyed, you take 10 damage and exit the object.'
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
						level: 4,
						features: [
							{
								id: 'elementalist-sub-1-4-1',
								name: 'Mantle of Essence: Quaking Earth',
								description: '\nWhile you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).\n\nAt the end of each of your turns, you can push each enemy in the area up to a number of squares equal to your Reason score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'elementalist-sub-1-5-1',
								name: 'The Mountain Does Not Move',
								description: '\nYou stand firm and magnetize your allies to stay grounded. Your stability increases by your level.\n\nAdditionally, whenever an ally within distance of your Hurl Element ability is force moved, you can use a free triggered action to decrease your stability down to a minimum of 0, then increase the ally’s stability by an amount equal to the stability you lost. This change lasts until the end of the round.',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'elementalist-sub-1-5-1a',
											name: 'Stability',
											description: '',
											type: 'Bonus',
											data: {
												field: 'Stability',
												value: 1,
												valueCharacteristics: [],
												valueCharacteristicMultiplier: 1,
												valuePerLevel: 1,
												valuePerEchelon: 0
											}
										},
										{
											id: 'elementalist-sub-1-5-1b',
											name: 'The Mountain Does Not Move',
											description: '',
											type: 'Ability',
											data: {
												ability: {
													id: 'elementalist-sub-1-5-1b',
													name: 'The Mountain Does Not Move',
													description: '',
													type: {
														usage: 'Triggered Action',
														free: true,
														trigger: 'The target is force moved',
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
															special: 'The distance of your Hurl Element ability',
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
															text: 'You decrease your stability down to a minimum of 0, then increase the target’s stability by an amount equal to the stability you lost. This change lasts until the end of the round.'
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
							}
						]
					},
					{
						level: 7,
						features: [
							{
								id: 'elementalist-sub-1-6-1',
								name: 'Mantle of Quintessence',
								description: '\nYour Mantle of Essence feature no longer requires essence.\n\nAdditionally, your Mantle of Essence now radiates magic that creates a calming air. Creatures in the area of the mantle’s aura have their starting patience increased by 1 (to a maximum of 5) during any negotiation. While in the area, you and any ally gain an edge on tests that use the Handle Animals skill. If you have 5 or more Victories, the bonus to patience increases to 2 and tests that use the Handle Animals skill have a double edge.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'elementalist-sub-1-7-1',
								name: 'Summon Source of Earth',
								description: 'The ground rumbles as an elemental bursts forth, ready to serve.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-1-7-1',
										name: 'Summon Source of Earth',
										description: 'The ground rumbles as an elemental bursts forth, ready to serve.',
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
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: '\nA source of earth emerges from an unoccupied space within distance. The source takes their turn immediately after you, moving up to their speed and either taking a main action or a maneuver. The source is dismissed at the start of your next turn.\n\nThe source starts an encounter at full Stamina, but maintains their current Stamina throughout the encounter, even if they are dismissed and you use this ability again. They can’t regain Stamina during the encounter. When the source’s Stamina is reduced to 0, you can’t use this ability again until you earn 1 or more Victories.'
											},
											{
												type: 'field',
												name: 'Persist',
												value: 2,
												repeatable: false,
												effect: 'The source takes another turn. They are dismissed at the start of your next turn.'
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
						level: 10,
						features: [
							{
								id: 'elementalist-sub-1-8-1',
								name: 'One: Master of Earth',
								description: '\nYou become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.\n\nYou have damage immunity 5.\n\nAdditionally, as a respite activity, you can shape the mundane earth around you in a 1-mile radius. You can open sinkholes, form mountains, level mundane structures or whole settlements, create canyons, raise islands or sink them in the sea, and perform similar feats. You can’t use this respite activity if another creature within 1 mile is already using it. Once you use this respite activity, you can’t use it again for 10 days.',
								type: 'Text',
								data: null
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'elementalist-sub-2',
				name: 'Fire',
				description: 'Fire is the element of destruction. Fire abilities devastate enemies and melt objects to slag.',
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
										target: 'One mundane object',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'You heat the target and cause it to melt or combust, destroying it. If the object is larger than 1 square, then only the square of the object you touch is destroyed.'
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
										sections: [
											{
												type: 'text',
												text: 'The forced movement distance gains a bonus equal to your Reason score.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'The forced movement distance gains a bonus equal to twice your Reason score instead.'
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
								id: 'elementalist-sub-2-2-1',
								name: 'Disciple of Fire',
								description: '\nYour connection to fire allows you to protect yourself from it, even as you rip away the protections of others. You have fire immunity equal to 5 plus your level. Additionally, fire damage you deal ignores a target’s fire immunity.\n\nAt the start of a combat encounter, you gain a number of surges equal to your Victories. Whenever you spend a surge to deal extra damage, you can make that damage fire damage',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-2-2-2',
								name: 'Damage Modifier',
								description: 'Fire Immunity + 6 + 1 per level after 1st',
								type: 'Damage Modifier',
								data: {
									modifiers: [
										{
											damageType: 'Fire',
											type: 'Immunity',
											value: 6,
											valueCharacteristics: [],
											valueCharacteristicMultiplier: 1,
											valuePerLevel: 1,
											valuePerEchelon: 0
										}
									]
								}
							}
						]
					},
					{
						level: 3,
						features: [
							{
								id: 'elementalist-sub-2-3-1',
								name: 'A Conversation with Fire',
								description: 'When you spend 1 uninterrupted minute in front of a fire, you can speak the name of another creature. If that creature is willing to speak to you, their image appears in the fire, and they can see you before them in a shimmering ball of light. The two of you can speak to each other through these images as if you were together in person. As a maneuver, you or the creature can end the conversation.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 4,
						features: [
							{
								id: 'elementalist-sub-2-4-1',
								name: 'Mantle of Essence: Burning Grounds',
								description: '\nWhile you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).\n\nAt the end of each of your turns, each enemy in the area takes fire damage equal to your Reason score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'elementalist-sub-2-5-1',
								name: 'Smoldering Step',
								description: '\nYou can use 1 square of movement to walk into an area of fire your size or larger and teleport to any other area of fire your size or larger within 10 squares of the first area.\n\nAdditionally, whenever you use a fire ability or are targeted by an ability that deals fire damage, each enemy adjacent to you takes fire damage equal to your Reason score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 7,
						features: [
							{
								id: 'elementalist-sub-2-6-1',
								name: 'Mantle of Quintessence',
								description: '\nYour Mantle of Essence feature no longer requires essence.\n\nAdditionally, your Mantle of Essence now radiates magic that creates a calming air. Creatures in the area of the mantle’s aura have their starting patience increased by 1 (to a maximum of 5) during any negotiation. While in the area, you and any ally gain an edge on tests that use the Handle Animals skill. If you have 5 or more Victories, the bonus to patience increases to 2 and tests that use the Handle Animals skill have a double edge.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'elementalist-sub-2-7-1',
								name: 'The Flame Primordial',
								description: '\nYou produce a fire that entrances the fates, distracting them from aiding your foes. Whenever you deal fire damage to a creature or object, they take an extra 1d6 fire damage. If you deal fire damage to a mundane object, you can use a free triggered action to target it with your Return to Formlessness ability instead.\n\nAdditionally, any enemy who starts their turn adjacent to you has fire weakness equal to your Reason score until the start of their next turn. This increases to twice your Reason score if the enemy is made of or is wearing mostly metal.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 10,
						features: [
							{
								id: 'elementalist-sub-2-8-1a',
								name: 'One: Master of Fire',
								description: '\nYou become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.\n\nThe damage bonus of your Acolyte of Fire feature increases to +5 and applies to all your magic abilities.\n\nAdditionally, your Return to Formlessness ability can be used on supernatural objects (but not on artifacts). When you melt a treasure, you gain breath equal to its echelon.',
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
								description: 'You harness the residual magic from your green spells to bolster yourself and your allies. Whenever you deal damage to one or more creatures using an ability that has the Green and Magic keywords and that costs essence to use (see below), you or one creature within 10 squares of you gains temporary Stamina equal to your Reason score.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-3-1-2',
								name: 'It Is the Soul Which Hears',
								description: '\nYou can speak with and understand animals, beasts, and plant creatures, even if they don’t share a language with you. Your ability to communicate with these creatures doesn’t make them inherently more intelligent, but you can use Reason instead of Presence while making tests to influence them.\n\nAdditionally, you can touch a living plant that is not a plant creature to communicate with it telepathically. You can use words to communicate with the plant, but it communicates with you only by transmitting feelings and sensations that can’t be overly specific.',
								type: 'Text',
								data: null
							},
							{
								id: 'elementalist-sub-3-1-3',
								name: 'Breath of Dawn Remembered',
								description: 'The power you channel grants the ability to get back in the fight.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-3-1-3',
										name: 'Breath of Dawn Remembered',
										description: 'The power you channel grants the ability to get back in the fight.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target starts their turn or takes damage.',
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
										sections: [
											{
												type: 'text',
												text: 'The target can spend a Recovery.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: true,
												effect: 'The target can spend an additional Recovery for each essence spent.'
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
								id: 'elementalist-sub-3-2-1',
								name: 'Disciple of the Green',
								description: '\nYou can use a maneuver to shapeshift into a type of creature on the Green Animal Forms table. While in animal form, you can speak, and you use your Reason score to make melee free strikes. Your statistics stay the same except as noted on the table.\n\nEach form has a prerequisite level that you must attain before you can adopt it. Some animal forms grant you temporary Stamina. You lose this temporary Stamina when you revert back to your true form.\n\nYou choose a specific animal and appearance while in animal form. For example, if you become a rodent, you might become a mouse, a rat, a shrew, or any other size 1T animal who fits the rodent type. When you take on an animal form, your equipment either melds into your new form or falls undamaged to the ground (your choice). When you return to your true form, any melded gear reappears on your person.\n\nYou can revert back to your true form as a maneuver. You can’t enter an animal form unless you are in your true form. When you are dying, you revert to your true form and can’t turn back into an animal until you are no longer dying.\n\n| Animal Type         | Level  | Temporary Stamina  | Speed         | Size | Stability Bonus | Melee Damage Bonus | Special                                                                                                                                                                                                                                                                |\n|:--------------------|:-------|:-------------------|:--------------|:-----|:----------------|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| Canine              | 2nd    | 5                  | 7             | 1M   | +0              | +1/+1/+1           | You gain an edge on tests that involve smell.                                                                                                                                                                                                                          |\n| Fish                | 2nd    | 0                  | 5 (swim only) | 1T   | +0              | +0/+0/+0           | You can breathe in water but can’t breathe outside of it.                                                                                                                                                                                                              |\n| Rodent              | 2nd    | 0                  | 5 (climb)     | 1T   | +0              | +0/+0/+0           | You gain an edge on tests that involve smell.                                                                                                                                                                                                                          |\n| Bird                | 3rd    | 0                  | 5 (fly)       | 1T   | +0              | +0/+0/+0           |  -                                                                                                                                                                                                                                                                     |\n| Great cat           | 3rd    | 5                  | 6 (climb)     | 2    | +0              | +1/+1/+1           | As a maneuver, jump up to 3 squares in any direction. If you land on an enemy of you size or smaller, that enemy is knocked prone and you can make a melee free strike against them as part of the maneuver.                                                           |\n| Giant frog          | 4th    | 5                  | 5 (swim)      | 2    | +0              | +0/+0/+0           | Your melee free strike has a distance of melee 3. When you take the Advance move action, you can high jump or long jump up to half your speed. This jump can allow you to move more squares than your speed.                                                           |\n| Horse               | 4th    | 5                  | 8             | 2    | +1              | +0/+0/+0           | You can use the Charge main action as a maneuver. You can’t use two Charge main actions on the same turn.                                                                                                                                                              |\n| Mohler              | 4th    | 0                  | 7 (burrow)    | 1S   | +1              | +0/+0/+0           | Your melee distance gains a +1 bonus.                                                                                                                                                                                                                                  |\n| Bear                | 5th    | 10                 | 5 (climb)     | 2    | +1              | +2/+2/+2           | Your melee distance gains a +1 bonus.                                                                                                                                                                                                                                  |\n| Giant bird          | 5th    | 0                  | 7 (fly)       | 2    | +0              | +1/+1/+1           | After making a melee free strike, you can shift up to 3 squares as a free triggered action.                                                                                                                                                                            |\n| Giant salamander    | 6th    | 5                  | 5             | 1L   | +3              | +2/+2/+2           | Your melee free strike deals fire damage. Additionally, you have fire immunity 3                                                                                                                                                                                       |\n| Giant spider        | 6th    | 0                  | 5 (climb)     | 2    | +0              | +0/+1/+2           | You have a double edge on melee free strikes against creatures you are hidden from.                                                                                                                                                                                    |\n| Giant snake         | 7th    | 5                  | 5             | 3    | +0              | +0/+1/+2           | Whenever you obtain a tier 2 or tier 3 outcome on a melee free strike, you can automatically grab the target. While grabbed this way, the target takes 2 damage at the start of each of their turns.                                                                   |\n| Kangaroo            | 7th    | 0                  | 7             | 1L   | +1              | +0/+0/+4           | When you score a critical hit with a melee free strike, the target is dazed (save ends). When you take the Advance move action, you can high jump or long jump up to half your speed. This jump can allow you to move more squares than your speed.                    |\n| Spiny Armadillo     | 7th    | 10                 | 5             | 1M   | +2              | +0/+0/+0           | Whenever you take damage from an adjacent creature’s melee ability, that creature takes 3 damage.                                                                                                                                                                      |\n| Ostrich             | 8th    | 0                  | 10            | 2    | +0              | +1/+1/+1           | Your movement does not provoke opportunity attacks.                                                                                                                                                                                                                    |\n| Shark               | 8th    | 0                  | 8 (swim only) | 2    | +0              | +2/+2/+2           | You can breathe in water but can’t breathe outside of it. Additionally, you gain an edge on strikes against targets who are bleeding or winded.                                                                                                                        |\n| Giant octopus       | 9th    | 5                  | 5 (swim)      | 3    | +2              | +0/+0/+0           | You can breathe in water. Additionally, you can target two creatures or objects with your melee free strike. Whenever you obtain a tier 2 or tier 3 outcome on a melee free strike, you can automatically grab the target. You can have up to eight creatures grabbed. |\n| Rhinoceros          | 9th    | 10                 | 8             | 2    | +5              | +2/+2/+2           | Whenever you make a melee free strike as part of the Charge action, that strike gains an edge.                                                                                                                                                                         |\n| King terror lizard  | 10th   | 20                 | 5             | 4    | +3              | +2/+2/+2           | Your melee free strike is a 1 burst with the Area and Strike keywords.                                                                                                                                                                                                 |\n',
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
										sections: [
											{
												type: 'text',
												text: 'You see and hear any events that have occurred within 10 squares of the object within the last 12 hours, perceiving those events from the object’s location as if you were there.'
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
						level: 4,
						features: [
							{
								id: 'elementalist-sub-3-4-1',
								name: 'Mantle of Essence: Veiling Bed',
								description: '\nWhile you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).\n\nThe area provides concealment for you and your allies.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'elementalist-sub-3-5-1',
								name: 'Hide of Tenfold Shields',
								description: '\nYour animal forms become hardier. You gain temporary Stamina equal to your level when you enter an animal form in combat, which is added to any temporary Stamina provided by the animal form.\n\nAdditionally, an adjacent ally can use a maneuver to pet you. If they do so, you can lose temporary Stamina down to a minimum of 0. The ally gains temporary Stamina equal to the amount you lost.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 7,
						features: [
							{
								id: 'elementalist-sub-3-6-1',
								name: 'Mantle of Quintessence',
								description: '\nYour Mantle of Essence feature no longer requires essence.\n\nAdditionally, your Mantle of Essence now radiates magic that creates a calming air. Creatures in the area of the mantle’s aura have their starting patience increased by 1 (to a maximum of 5) during any negotiation. While in the area, you and any ally gain an edge on tests that use the Handle Animals skill. If you have 5 or more Victories, the bonus to patience increases to 2 and tests that use the Handle Animals skill have a double edge.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'elementalist-sub-3-7-1',
								name: 'Chimeric Manifestation',
								description: '\nNature isn’t static and unchanging, and neither are you. You can enter or exit your animal form as a free maneuver the first time you use your Disciple of the Green feature on your turn.\n\nAdditionally, whenever you use your Disciple of the Green feature, you can select an additional animal form and gain the positive benefits from both forms. You can choose the size of either animal, and if both animal forms grant you the same benefit, you can choose whichever you prefer. You gain the highest speed between the two animal forms and have all types of movement from both forms.\n\nYou can only combine animal forms whose levels add up to 12 or less. For example, you can combine a shark (8th level) with a horse (4th level), but you can’t combine a shark with a bear (5th level).',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 10,
						features: [
							{
								id: 'elementalist-sub-3-8-1',
								name: 'One: Master of Green',
								description: '\nYou become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.\n\nThe number of Recoveries you have increases by 2, and each time you finish a respite, you can grant each ally who finished the respite with you 2 additional Recoveries. Your allies’ additional Recoveries disappear when they finish their next respite.\n\nAdditionally, as a respite activity, you can perform a ritual that causes a fruit tree to spring from the ground, grow, mature, and produce 1d6 of a treasure called Life Fruit. You can use a respite activity to cause an existing tree to produce another 1d6 Life Fruit, but it does not grow these magic consumables on its own.\n\nAs a maneuver, a creature can consume a Life Fruit or feed it to an adjacent willing ally. When a creature eats a Life Fruit, they restore all their Stamina, they can end all conditions or effects on themself, and they can stand up if prone. Additionally, if the creature desires, their aging pauses for 1d10 years. If the creature eats additional Life Fruit and chooses to pause their aging, the effects don’t stack. Instead, the creature gains the benefit from the Life Fruit that pauses their aging for the longest time.',
								type: 'Text',
								data: null
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'elementalist-sub-4',
				name: 'Void',
				description: 'Void is the element of the mystery. Void abilities warp space and reality, allowing you to teleport, create illusions, and make things incorporeal.',
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
								description: 'You instantly recognize illusions for what they are, you can see invisible creatures, and supernatural effects can’t conceal creatures and objects from you. Additionally, you always know if an area or object you observe is magical or affected by magic, and you know the specifics of what that magic can do.',
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
										sections: [
											{
												type: 'text',
												text: 'For each Victory you have, you can target one creature. Each target gains the benefit of your A Beyonding of Vision feature until the end of your next turn, but doesn’t gain the use of the Shared Void Sense ability.'
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
								id: 'elementalist-sub-4-1-4',
								name: 'Subtle Relocation',
								description: 'You call on the void to swallow and spit out an ally.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-4-1-4',
										name: 'Subtle Relocation',
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
										sections: [
											{
												type: 'text',
												text: 'You teleport the target up to a number of squares equal to your Reason score. If the target moves to trigger this ability, you can teleport them at any point during the move.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'You teleport the target up to a number of squares equal to twice your Reason score instead.'
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
								id: 'elementalist-sub-4-2-1',
								name: 'There is No Space Between',
								description: 'Knowledge of the mystery reveals that two spaces are the same space.',
								type: 'Ability',
								data: {
									ability: {
										id: 'elementalist-sub-4-2-1',
										name: 'There is No Space Between',
										description: 'Knowledge of the mystery reveals that two spaces are the same space.',
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
										sections: [
											{
												type: 'text',
												text: '\nYou open two size 1 portals in unoccupied spaces within distance, which last until you move beyond distance from any portal, end the effect as a maneuver, or are dying. Each portal must be placed at a height of no more than 1 square above the ground. When you or any ally touch a portal, that creature can choose to be instantly teleported to an unoccupied space of their choice adjacent to the other portal. If an enemy is force moved into a portal, their forced movement ends and they emerge from the other portal in an unoccupied space chosen by the creature who force moved them.\n\nAt the start of each of your turns while the portals are active, you can open a new portal connected to the others. If three or more portals are present, you and your allies choose which portal to emerge from when entering a portal, and a creature who force moves an enemy into a portal chooses that enemy’s destination portal.'
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
						level: 3,
						features: [
							{
								id: 'elementalist-sub-4-3-1',
								name: 'Distance is Only Memory',
								description: 'Each time you finish a respite, you can open a two-way portal that leads to any place you have previously been. You and your allies can pass through the portal, which remains open for 1 hour or until you dismiss it as a main action.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 4,
						features: [
							{
								id: 'elementalist-sub-4-4-1',
								name: 'Mantle of Essence: Veiling Bed',
								description: '\nWhile you have 3 or more essence and are not dying, you exude an aura of magic whose distance is equal to your Reason score. The effects within the area of the aura are based on your specialization, as shown on the Mantle of Essence Specialization Effects table. You can activate and deactivate the aura at will (no action required).\n\nThe area provides concealment for you and your allies.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'elementalist-sub-4-5-1',
								name: 'Pierce the Veil of Substance',
								description: '\nSolidity is merely a suggestion to you. Mundane barriers that are 1 square thick or less do not block your senses or line of effect. You can only sense or have line of effect past one such barrier at a time.\n\nAdditionally, whenever you use a void ability, you or one ally within distance of the ability can teleport a number of squares equal to your Reason score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 7,
						features: [
							{
								id: 'elementalist-sub-4-6-1',
								name: 'Mantle of Quintessence',
								description: '\nYour Mantle of Essence feature no longer requires essence.\n\nAdditionally, your Mantle of Essence now radiates magic that creates a calming air. Creatures in the area of the mantle’s aura have their starting patience increased by 1 (to a maximum of 5) during any negotiation. While in the area, you and any ally gain an edge on tests that use the Handle Animals skill. If you have 5 or more Victories, the bonus to patience increases to 2 and tests that use the Handle Animals skill have a double edge.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'elementalist-sub-4-7-1',
								name: 'Black Hole Star',
								description: '\nYou warp gravity around your heavenly body and can pull even the sturdiest titans toward your core. At the end of each of your turns, you target one creature or object within distance of your Hurl Element ability and vertical pull that target up to 5 squares. If their stability reduces this forced movement, they are pulled a minimum of 2 squares. This forced movement ignores stability for your allies.\n\nAdditionally, your Mantle of Essence improves. While in the area of the aura, enemies and objects have their stability reduced by an amount equal to your level.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 10,
						features: [
							{
								id: 'elementalist-sub-4-8-1',
								name: 'One: Master of Void',
								description: '\nYou become the embodiment of the element of your chosen specialization. Whenever you use magic, elemental motes flit around you and your skin changes to reflect your element, taking on an earthen or stony appearance for earth, appearing like flickering flame for fire, gaining a leaf pattern for green, and becoming a starry expanse for void.\n\nWhenever you willingly move, you can teleport.\n\nAdditionally, your mind is connected to the mystery and helps you find the answers you seek. You no longer require project sources for research projects. Whenever you use a respite activity to make a project roll for a research project, you automatically complete the project.',
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
									sections: [
										{
											type: 'text',
											text: '\nChoose one of the following effects:\n\n* You teleport a size 1S or smaller object adjacent to you into an unoccupied space adjacent to you.\n* Until the start of your next turn, a part of your body shoots a shower of harmless noisy sparks that light up each square adjacent to you.\n* You ignite or snuff out (your choice) every mundane light source of 1L or smaller adjacent to you.\n* You transform up to 1 pound of edible food you touch to make it taste delicious or disgusting.\n* Until the start of your next turn, you make your body exude a particular odor you’ve smelled before. This smell can be sensed by each creature within 5 squares of you, but can’t impose any condition or other drawback on those creatures.\n* You place a small magical inscription on the surface of a mundane object you touch, or you can remove an inscription that was made by you or by another creature using Arcane Trick.\n* You touch a size 1T object to cover it with an illusion that makes it look like a different object. Any creature who handles the object becomes aware of the illusion. The illusion ends when you stop touching the object.'
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
			selected: {
				id: 'career-mages-apprentice-ii-1',
				name: 'Forgotten Memories',
				description: 'While practicing a spell, your inexperience caused the magic to backfire and your memories were wiped, leaving you with only fragments of who you once were. Determined to recall your past, you now dedicate yourself to helping others, hoping your actions will spark some remembrance or lead you to a way to reverse the magic.'
			},
			selectedID: 'career-mages-apprentice-ii-1'
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
