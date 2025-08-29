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
						}
					]
				}
			}
		],
		ancestryPoints: 3
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
					'Intimidate'
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
					'Climb'
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
		id: 'class-censor',
		name: 'Censor',
		description: '\nDemons and deathless fear you. Criminals run from the sight of your shadow. Agents of chaos, blasphemers, and heretics tremble at the sound of your voice. You carry the power of the gods, armed with wrath and sent out into the world first to seek, then censor those whose actions—or even existence—are anathema to your church.\n\nAs a censor, you’re at your best against the strongest foes. Your judgment terrifies heretics, stops enemies in their tracks, and even hurls them across the battlefield.',
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
							valuePerLevel: 9,
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
						id: 'censor-resource',
						name: 'Wrath',
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
									trigger: 'The first time each round that a creature judged by you deals damage to you',
									value: '1'
								},
								{
									tag: 'deal-damage',
									trigger: 'The first time each round that you deal damage to a creature judged by you',
									value: '1'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Read Person',
								'Religion'
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
																description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 bonus to rolled damage with abilities that use the weapon. This benefit lasts until you finish another respite.',
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
															target: 'Self and each ally',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															sections: [
																{
																	type: 'text',
																	text: 'Until the end of the encounter or until you are dying, each target gains 1 surge at the end of each of your turns.'
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
											features: []
										},
										{
											level: 4,
											features: [
												{
													id: 'domain-war-4',
													name: 'Improved Sanctified Weapon',
													description: 'The weapon improved by your Sanctified Weapon feature grants a +3 bonus to rolled damage instead of +1.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 5,
											features: []
										},
										{
											level: 6,
											features: [
												{
													id: 'domain-war-6',
													name: 'Blade of the Heavens',
													description: 'A greatsword streams down from the sky, threatening to pin your foe.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-war-6',
															name: 'Blade of the Heavens',
															description: 'A greatsword streams down from the sky, threatening to pin your foe.',
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
																			'Intuition'
																		],
																		bonus: 0,
																		tier1: '8 + I damage; A < [weak], prone and restrained (save ends)',
																		tier2: '12 + I damage; A < [average], prone and restrained (save ends)',
																		tier3: '16 + I damage; A < [strong], prone and restrained (save ends)'
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
										},
										{
											level: 7,
											features: [
												{
													id: 'domain-war-7',
													name: 'Your Triumphs Are Remembered',
													description: 'The gods allow you and your companions to bask in the glory of past successes. Whenever you finish a respite, you and any other heroes who rested with you regain 1 Victory after your Victories are converted to XP. This Victory isn’t converted into XP at the end of a subsequent respite.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 8,
											features: []
										},
										{
											level: 9,
											features: [
												{
													id: 'domain-war-9',
													name: 'Righteous Phalanx',
													description: 'A wall of spinning swords and knives appears where you wish.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-war-9',
															name: 'Righteous Phalanx',
															description: 'A wall of spinning swords and knives appears where you wish.',
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
																'Ranged'
															],
															distance: [
																{
																	type: 'Wall',
																	value: 15,
																	value2: 0,
																	within: 10,
																	special: '',
																	qualifier: ''
																}
															],
															target: 'Special',
															cost: 11,
															repeatable: false,
															minLevel: 1,
															sections: [
																{
																	type: 'text',
																	text: 'The wall lasts until the end of the encounter or until you are dying, and can be placed in occupied squares. Creatures can enter and pass through the wall. Each enemy who enters the area for the first time in a combat round or starts their turn there takes 15 damage.'
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
											features: []
										}
									],
									resourceGains: [
										{
											resource: 'Piety',
											tag: '',
											trigger: 'The first time in an encounter that you or a creature within 10 squares takes damage greater than 10 + your level in a single turn.',
											value: '2'
										}
									],
									defaultFeatures: [
										{
											id: 'war-default-1',
											name: 'War Prayer Effect',
											description: 'Choose up to three allies within 10 squares of you, or choose yourself instead of one ally. Each target gains 2 surges.',
											type: 'Package Content',
											data: {
												tag: 'conduit-prayer'
											}
										}
									]
								}
							]
						}
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
								target: 'One enemy',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'The target is judged by you until the end of the encounter, you use this ability again, you willingly end this effect (no action required), or another censor judges the target.\n\nWhenever a creature judged by you uses a main action and is within your line of effect, you can use a free triggered action to deal holy damage equal to twice your Presence score to them.\n\nWhen a creature judged by you is reduced to 0 Stamina, you can use a free triggered action to use this ability against a new target.\n\nAdditionally, you can spend 1 wrath to take one of the following free triggered actions:\n\n* When an adjacent creature judged by you starts to shift, you make a melee free strike against them and their speed becomes 0 until the end of the current turn, preventing them from shifting.\n* When a creature judged by you within 10 squares makes a power roll, you cause them to take a bane on the roll.\n* When a creature judged by you within 10 squares uses an ability with a potency that targets only one creature, the potency is reduced by 1 for that creature.\n* If you damage a creature judged by you with a melee ability, the creature is taunted by you until the end of their next turn.\n\nYou can choose only one free triggered action option at a time, even if multiple options are triggered by the same effect.'
									},
									{
										type: 'package',
										tag: 'censor-judgment'
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
									id: 'kit-mountain',
									name: 'Mountain',
									description: 'The Mountain kit does exactly what it says on the tin. You don heavy armor and raise a heavy weapon to stand strong against your foes, quickly demolishing them when it\'s your turn to strike.',
									type: '',
									armor: [
										'Heavy Armor'
									],
									weapon: [
										'Heavy Weapon'
									],
									stamina: 9,
									speed: 0,
									stability: 2,
									meleeDamage: {
										tier1: 0,
										tier2: 0,
										tier3: 4
									},
									rangedDamage: null,
									meleeDistance: 0,
									rangedDistance: 0,
									disengage: 0,
									features: [
										{
											id: 'kit-mountain-signature',
											name: 'Pain For Pain',
											description: 'An enemy who tagged you will pay for that.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-mountain-signature',
													name: 'Pain For Pain',
													description: 'An enemy who tagged you will pay for that.',
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
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	'Might',
																	'Agility'
																],
																bonus: 0,
																tier1: '3 damage + M or A damage',
																tier2: '5 damage + M or A damage',
																tier3: '9 damage + M or A damage'
															}
														},
														{
															type: 'text',
															text: 'If the target dealt damage to you since the end of your last turn, this strike deals additional damage equal to your Might or Agility score (your choice).'
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
						id: 'censor-1-6',
						name: 'My Life for Yours',
						description: 'You channel some of your vitality into more resilience for you or an ally.',
						type: 'Ability',
						data: {
							ability: {
								id: 'censor-1-6',
								name: 'My Life for Yours',
								description: 'You channel some of your vitality into more resilience for you or an ally.',
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
								sections: [
									{
										type: 'text',
										text: 'You spend a Recovery and the target regains Stamina equal to your Recovery value.'
									},
									{
										type: 'field',
										name: 'Spend',
										value: 1,
										repeatable: false,
										effect: 'You can end one effect on the target that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.'
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
												description: 'As a respite activity, you can bless a weapon. Any creature who wields the weapon gains a +1 bonus to rolled damage with abilities that use the weapon. This benefit lasts until you finish another respite.',
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
														'Jump'
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
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'censor-ability-4'
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
							allowAnySource: false,
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
							allowAnySource: false,
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
						name: 'Look On My Work and Despair',
						description: 'Your judgment has grown in divine power, instilling fear in those you condemn. Whenever you use your Judgment ability, you can spend 1 wrath, and if the target has P < Average , they are frightened of you (save ends). Additionally, whenever a creature judged by you is reduced to 0 Stamina and you use Judgment as a free triggered action, if the new target has P < Strong , they are frightened of you (save ends). If the target is already frightened of you, they instead take holy damage equal to twice your Presence score.',
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
						id: 'censor-4-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'censor-4-1b',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'censor-4-2',
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
						id: 'censor-4-3',
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
						id: 'censor-4-4',
						name: 'Wrath Beyond Wrath',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'deal-damage 2',
							trigger: 'The first time each round that you deal damage to a creature judged by you',
							value: '2',
							replacesTags: [
								'deal-damage'
							]
						}
					},
					{
						id: 'censor-4-5',
						name: 'Domain Feature Choice',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 4,
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
						id: 'censor-5-1',
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
						id: 'censor-6-1',
						name: 'Implement of Wrath',
						description: 'Each time you finish a respite, you can choose one hero’s weapon, including your own, to channel supernatural power as an implement of your god’s wrath. The weapon becomes magic and gains the following benefits until your next respite:\n\n* Strikes with the weapon deal extra holy damage equal to the wielder’s highest characteristic score.\n* Any creature struck by the weapon who has holy weakness and has P < Strong is frightened and weakened (save ends).\n* Any minion targeted by a strike using the weapon dies. That minion’s Stamina maximum is removed from the minion Stamina pool before any damage is applied to the rest of the squad.\n* The weapon’s wielder can’t be made frightened.',
						type: 'Text',
						data: null
					},
					{
						id: 'censor-6-2',
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
				level: 7,
				features: [
					{
						id: 'censor-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'censor-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'censor-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'censor-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'censor-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'censor-7-2',
						name: 'Domain Feature Choice',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 7,
							count: 1,
							selected: []
						}
					},
					{
						id: 'censor-7-3',
						name: 'Focused Wrath',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'start 2',
							trigger: 'Start of your turn',
							value: '2',
							replacesTags: [
								'start'
							]
						}
					},
					{
						id: 'censor-7-4',
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
						id: 'censor-8-1',
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
						id: 'censor-8-2',
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
						id: 'censor-9-1',
						name: 'Improved Implement of Wrath',
						description: 'The weapon you target with your Implement of Wrath feature gains the following additional benefits:\n\n* The weapon’s wielder and each ally adjacent to them gain a +2 bonus to saving throws.\n* At the end of each of the weapon wielder’s turns, each ally adjacent to the wielder makes a saving throw against each effect on them that is ended by a saving throw.\n* The weapon’s wielder has corruption immunity 10.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'censor-10-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'censor-10-1b',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'censor-10-2',
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
						id: 'censor-10-3',
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
						id: 'censor-10-4',
						name: 'Templar',
						description: 'You are the ultimate representation of your god’s justice in the timescape. Whenever you use your Judgment ability, you can use a free triggered action to use a conduit domain effect associated with your chosen domain, or a domain you access with virtue. If the effect calls for the use of your Intuition score, you use your Presence score instead. If the effect uses your conduit level, use your censor level instead.\n\nAdditionally, whenever you take a respite, you can open a portal to rest in the presence of your deity and bring along any allies. When you do, you can ask your deity three questions, which the Director must answer honestly if your deity knows the answers (though they might answer cryptically or incompletely). When you finish your respite, you and your allies can appear at any location in the timescape where someone worships your deity.\n\nWhile you rest in their presence, your god might also give you priority targets to enact justice upon. You and your allies each have a double edge on power rolls made against such targets. If you attempt to open a portal to your deity again before you have defeated your priority targets, you suffer your god’s wrath, as determined by the Director.\t \n  \n  \t\t\t\t',
						type: 'Text',
						data: null
					},
					{
						id: 'censor-10-5',
						name: 'Virtue',
						description: '\nYou can spend 3 virtue to access one of your deity’s domains that you usually don’t have access to. When you do, you can use that domain’s features until you finish another respite.\n\nVirtue remains until you spend it.',
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
						id: 'censor-10-6',
						name: 'Wrath of the Gods',
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
					'Melee',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '2 holy damage; push 1',
							tier2: '4 holy damage; push 2',
							tier3: '6 holy damage; push 3'
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
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '5 + P psychic damage',
							tier2: '7 + P psychic damage',
							tier3: '10 + P psychic damage'
						}
					},
					{
						type: 'text',
						text: 'Each time the target willingly moves before the end of your next turn, they take 1 psychic damage for each square they move.'
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
				id: 'censor-ability-3',
				name: 'Halt, Miscreant!',
				description: 'You infuse your weapon with holy magic that makes it difficult for your foe to get away.',
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '2 + M holy damage; P < [weak], slowed (save ends)',
							tier2: '5 + M holy damage; P < [average], slowed (save ends)',
							tier3: '7 + M holy damage; P < [strong], slowed (save ends)'
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
				id: 'censor-ability-4',
				name: 'Your Allies Cannot Save You!',
				description: 'Your magic strike turns your foe’s guilt into a burst of holy power',
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M holy damage',
							tier2: '5 + M holy damage',
							tier3: '8 + M holy damage'
						}
					},
					{
						type: 'text',
						text: 'Each enemy adjacent to the target is pushed away from the target up to a number of squares equal to your Presence score.'
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
				id: 'censor-ability-5',
				name: 'Behold, a Shield of Faith!',
				description: 'A mighty blow turns your foe’s vitality into a holy light that envelops you and an ally, discouraging enemies who might attack you.',
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
				target: 'One creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M holy damage',
							tier2: '6 + M holy damage',
							tier3: '9 + M holy damage'
						}
					},
					{
						type: 'text',
						text: 'Until the start of your next turn, enemies have a bane on ability rolls made against you and each ally adjacent to you.'
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
				target: 'One creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M damage; push 1',
							tier2: '6 + M damage; push 3',
							tier3: '9 + M damage; push 5'
						}
					},
					{
						type: 'text',
						text: 'You can shift up to your speed in a straight line toward the target after pushing them.'
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '5 + M holy damage',
							tier2: '8 + M holy damage',
							tier3: '11 + M holy damage'
						}
					},
					{
						type: 'text',
						text: 'You can spend a Recovery to allow yourself or one ally within 10 squares to regain Stamina equal to your recovery value.'
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
				id: 'censor-ability-8',
				name: 'Repent!',
				description: 'You conjure memories of their sins to harry your foes.',
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
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '5 + P holy damage; I < [weak], dazed (save ends)',
							tier2: '8 + P holy damage; I < [average], dazed (save ends)',
							tier3: '11 + P holy damage; I < [strong], dazed (save ends)'
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
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '6 + M holy damage; grabbed',
							tier2: '9 + M holy damage; grabbed',
							tier3: '13 + M holy damage; grabbed'
						}
					},
					{
						type: 'text',
						text: 'If the target makes a strike against a creature while grabbed this way, you can spend 3 wrath to deal holy damage to them equal to your Presence score, then change the target of the strike to another target within the strike’s distance.'
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
				id: 'censor-ability-10',
				name: 'Behold the Face of Justice!',
				description: 'You attack a foe and your enemies behold a vision of the true nature of your resolve.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M holy damage; if the target has P < [weak], each enemy within 2 squares of them is frightened of you (save ends)',
							tier2: '5 + M holy damage; if the target has P < [average], each enemy within 2 squares of them is frightened of you (save ends)',
							tier3: '8 + M holy damage; if the target has P < [strong], each enemy within 2 squares of them is frightened of you (save ends)'
						}
					},
					{
						type: 'text',
						text: 'Each enemy frightened by this ability is pushed 2 squares away from the target and takes psychic damage equal to your Presence score.'
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
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '2 + M holy damage',
							tier2: '3 + M holy damage',
							tier3: '5 + M holy damage'
						}
					},
					{
						type: 'text',
						text: 'When a target who is not a leader or solo creature is made winded by this ability, they are reduced to 0 Stamina.'
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
				target: 'One creature',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '5 + M holy damage; M < [weak], the target has fire weakness 3 (save ends)',
							tier2: '9 + M holy damage; M < [average], the target has fire weakness 5 (save ends)',
							tier3: '12 + M holy damage; M < [strong], the target has fire weakness 7 (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While the target has fire weakness from this ability, you can choose to have your abilities deal fire damage to the target instead of holy damage.'
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
				id: 'censor-ability-13',
				name: 'Edict of Disruptive Isolation',
				description: 'The evil within your foes detonates with holy fire that burns only the guilty.',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, each target takes holy damage equal to your Presence score at the end of each of your turns. A target takes an extra 2d6 holy damage if they are judged by you or if they are adjacent to any enemy.'
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
				id: 'censor-ability-14',
				name: 'Edict of Perfect Order',
				description: 'Within the area of your divine presence, your enemies will regret using their fell abilities.',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever a target uses an ability that costs Malice, they take holy damage equal to three times your Presence score. A target judged by you takes an extra 2d6 holy damage.'
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
				id: 'censor-ability-15',
				name: 'Edict of Purifying Pacifism',
				description: 'You shed a righteous energy that punishes enemies who would harm you or your allies.',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever a target makes a strike, they take holy damage equal to twice your Presence score. A target judged by you takes an extra 2d6 holy damage.'
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
				id: 'censor-ability-16',
				name: 'Edict of Stillness',
				description: 'The holy aura you project makes it painful for evil-doers to leave your reach.',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever a target moves or is force moved out of the area, they take holy damage equal to twice your Presence score. A target judged by you who moves willingly takes an extra 2d6 holy damage.'
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
				id: 'censor-ability-17',
				name: 'Gods Grant Thee Strength',
				description: 'You channel divine force for movement that cannot be stopped.',
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
				target: 'Self or one ally',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target ends any condition or effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up. The target then gains 2 surges, can shift up to their speed while ignoring difficult terrain, and can use a strike signature ability as a free triggered action.'
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
				id: 'censor-ability-18',
				name: 'Orison of Victory',
				description: 'You channel your god’s will to overcome hardship and inflict pain.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area'
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
				target: 'Self and each ally in the area',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: 'Each target gains 1 surge.',
							tier2: 'Each target gains 2 surges.',
							tier3: 'Each target gains 3 surges.'
						}
					},
					{
						type: 'text',
						text: 'A target can end one effect on them that is ended by a saving throw or that ends at the end of their turn, or a prone target can stand up.'
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
				id: 'censor-ability-19',
				name: 'Righteous Judgment',
				description: 'You amplify the power of your judgment.',
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '10 + M damage',
							tier2: '14 + M damage',
							tier3: '20 + M damage'
						}
					},
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever any ally deals damage to a target judged by you, that ally gains 1 surge.'
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
				id: 'censor-ability-20',
				name: 'Shield of the Righteous',
				description: 'You strike a foe and create a fleet of divine shields that protect your allies.',
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '10 + M damage; you and each ally adjacent to you gain 10 temporary Stamina',
							tier2: '14 + M damage; you and each ally adjacent to you gain 15 temporary Stamina',
							tier3: '20 + M damage; you and each ally adjacent to you gain 20 temporary Stamina'
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
				id: 'censor-ability-21',
				name: 'Excommunication',
				description: 'You curse your foe to become a bane to their allies.',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '9 + M damage; I < [weak], weakened (save ends)',
							tier2: '13 + M damage; I < [average], weakened (save ends)',
							tier3: '18 + M damage; I < [strong], weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'At the end of each of your turns, a target weakened this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them. Additionally, a target weakened this way can’t be targeted by their allies’ abilities.'
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
				id: 'censor-ability-22',
				name: 'Hand of the Gods',
				description: 'You use your foe as a tool against your enemies.',
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
								'Might'
							],
							bonus: 0,
							tier1: '10 + M damage',
							tier2: '15 + M damage',
							tier3: '21 + M damage'
						}
					},
					{
						type: 'text',
						text: 'Until the end of the encounter, while the target is judged by you, you can choose to make them the source of any of your abilities. Additionally, the target counts as an ally for the purpose of flanking.'
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
				id: 'censor-ability-23',
				name: 'Pillar of Holy Fire',
				description: 'Your enemy’s guilt fuels a holy flame that burns your foes.',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '9 + M damage; I < [weak], dazed (save ends)',
							tier2: '13 + M damage; I < [average], dazed (save ends)',
							tier3: '18 + M damage; I < [strong], dazed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'At the end of each of your turns, a target dazed this way deals holy damage equal to twice your Presence score to each enemy within 2 squares of them.'
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
				id: 'censor-ability-24',
				name: 'Your Allies Turn on You!',
				description: 'You turn your enemies’ ire to the target.',
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
								'Presence'
							],
							bonus: 0,
							tier1: '5 + P damage; I < [weak], slowed (save ends)',
							tier2: '9 + P damage; I < [average], slowed (save ends)',
							tier3: '12 + P damage; I < [strong], slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While the target is slowed this way, each of their allies who starts their turn within 5 squares of them must use a free maneuver to make a free strike against the target. Additionally, while the target is slowed this way, each of their allies within 5 squares of them who can make a triggered free strike against a different creature must make the free strike against the target instead.'
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
				id: 'censor-sub-1',
				name: 'Exorcist',
				description: 'You specialize in hunting your order’s hidden enemies, knowing that an open mind is an unguarded fortress. You have the Read Person skill.',
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
								type: 'Package Content',
								data: {
									tag: 'censor-judgment'
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-1-2-1',
								name: 'Saint\'s Vigilance',
								description: 'You have honed your ability to detect sin and can use it to find those who hide from justice. Any creature judged by you can’t use the Hide maneuver. Additionally, you gain an edge when searching for hidden creatures. If you find a hidden creature, you can use your Judgment ability against them as a free triggered action.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-1-2-2',
								name: 'A Sense for Truth',
								description: 'You are trained in secret techniques from your order that allow you to discern the truth with supernatural precision. If a creature is of a lower level than you, you automatically know when they are lying, though you don’t necessarily know the actual truth behind their lie. Additionally, you gain an edge on tests made to detect lies or hidden motives.',
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
														target: 'One creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '8 + M holy damage; P < [weak], frightened (save ends)',
																	tier2: '12 + M holy damage; P < [average], frightened (save ends)',
																	tier3: '15 + M holy damage; P < [strong], frightened (save ends)'
																}
															},
															{
																type: 'text',
																text: 'If the target is already frightened of you or another creature and this ability would frighten them again, they instead take psychic damage equal to twice your Presence score.'
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
														sections: [
															{
																type: 'text',
																text: 'Each target takes holy damage equal to twice your Presence score. Additionally, each hidden target is automatically revealed and can’t become hidden again until the start of your next turn. You can then use your Judgment ability against one target as a free triggered action.'
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
								id: 'censor-sub-1-3-1',
								name: 'Evil Revealed',
								description: 'Your order has taught you methods to discern the disguises of both mortals and monsters. You automatically see through disguises and illusions created by creatures of your level or lower, and you gain an edge on tests made to see through the disguises and illusions of more powerful creatures. Whenever you see through a creature’s disguise or illusion, you can use your Judgment ability against them as a free triggered action.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'censor-sub-1-4-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-1-4-1a',
												name: 'Begone',
												description: 'You terrify your enemies into retreating, creating chaos in their ranks.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-4-1a',
														name: 'Begone',
														description: 'You terrify your enemies into retreating, creating chaos in their ranks.',
														type: {
															usage: 'Main Action',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '4 psychic damage; slide 3',
																	tier2: '6 psychic damage; slide 5',
																	tier3: '8 psychic damage; slide 7'
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
												id: 'censor-sub-1-4-1b',
												name: 'Pain of Your Own Making',
												description: 'You reverse the effects from an evildoer.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-4-1b',
														name: 'Pain of Your Own Making',
														description: 'You reverse the effects from an evildoer.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'The target gains a condition or effect that is ended by a saving throw or that ends at the end of their turn.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The effect ends on the target and is applied to the creature who imposed the effect on them. That creature also takes damage equal to three times your Presence score.'
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
								id: 'censor-sub-1-5-1',
								name: 'Demonologist',
								description: 'The most esoteric secrets of your order teach you that to defeat your enemy, you must understand them. You treat your Renown as 2 higher than usual when dealing with demons, devils, and other agents of chaos. If you successfully complete a negotiation with one of these creatures, you gain an edge on power rolls made against them and can use your Judgment ability against them as a free triggered action before an encounter begins.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'censor-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-1-6-1a',
												name: 'Banish',
												description: 'You sever the target’s tenuous connection to the world.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-6-1a',
														name: 'Banish',
														description: 'You sever the target’s tenuous connection to the world.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '5 + M damage; P < [weak], the target is banished (save ends)',
																	tier2: '8 + M damage; P < [average], the target is banished (save ends)',
																	tier3: '11 + M damage; P < [strong], the target is banished (save ends)'
																}
															},
															{
																type: 'text',
																text: 'This ability gains an edge against demons, devils, undead, and creatures not native to your current world. If you know the target’s true name, this ability has a double edge. While banished, the target is sent to another manifold in the timescape and removed from the encounter map. A banished target can do nothing but make saving throws, and takes 10 holy damage each time they do so. If the target is reduced to 0 Stamina while banished, they are lost to the timescape.'
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
												id: 'censor-sub-1-6-1b',
												name: 'Terror Manifest',
												description: '“I know what you fear.”',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-1-6-1b',
														name: 'Terror Manifest',
														description: '“I know what you fear.”',
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
														target: 'One creature',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '7 + P psychic damage; P < [weak], frightened (save ends)',
																	tier2: '10 + P psychic damage; P < [average], frightened (save ends)',
																	tier3: '12 + P psychic damage; P < [strong], frightened (save ends)'
																}
															},
															{
																type: 'text',
																text: 'While frightened this way, if a target who is a leader or solo creature is winded, they take an extra 25 psychic damage. If a target frightened this way is not a leader or solo creature and is winded, they are reduced to 0 Stamina.'
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
				id: 'censor-sub-2',
				name: 'Oracle',
				description: 'Corruption has deep tendrils that can be missed, leading you to specialize in uncovering clandestine threats to your order. You have the Magic skill.',
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
								description: 'You can deal holy damage equal to twice your Presence score to the judged creature.',
								type: 'Package Content',
								data: {
									tag: 'censor-judgment'
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-2-2-1',
								name: 'It Was Foretold',
								description: 'Your order has trained you to understand fragments of the visions granted to you by your deity, giving you a momentary advantage in challenging situations. At the start of an encounter, you can take one main action before any other creature and before your first turn. Additionally, whenever the Director calls for a montage test, you can make one free test before the montage begins, which counts as an earned success or failure as usual.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-2-2-2',
								name: 'Judge of Character',
								description: 'Your focus on your fragmentary visions grants divine insight into the world and its creatures beyond your usual senses. Whenever you would make an Intuition test, you can make a Presence test instead.',
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
												description: 'Gifted by a prescient vision, you warn an ally of an impending attack.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-2-3a',
														name: 'Prescient Grace',
														description: 'Gifted by a prescient vision, you warn an ally of an impending attack.',
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
														sections: [
															{
																type: 'text',
																text: 'You can spend a Recovery to allow the target to regain Stamina equal to your recovery value. The target can then take their turn immediately before the triggering enemy.'
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
														sections: [
															{
																type: 'text',
																text: 'The target can use a free triggered action to use a strike signature ability or a strike heroic ability, and has a double edge on that ability. If a heroic ability is chosen, reduce its Heroic Resource cost by 3 (to a minimum cost of 0).'
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
								id: 'censor-sub-2-3-1',
								name: 'Prophecy',
								description: 'You can better sift through the constant fragmentary visions from your deity and act to make them manifest. Each time you earn 1 or more Victories, you can make a number of 2d10 rolls equal to the number of Victories you earned. Record each roll in order. Then whenever you or a creature within 10 squares makes a power roll, you can use a free triggered action to replace the total on the dice with your first recorded roll.\n\nYou discard each roll as it is used, and each time you earn Victories, you\nadd new rolls to the bottom of the list. Any unused rolls are discarded\nwhen you finish a respite.\n\t\t\t\t\t',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'censor-sub-2-4-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-2-4-1a',
												name: 'Burden of Evil',
												description: 'You reveal a vision of your enemies’ fate that causes them to scramble as it staggers them.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-4-1a',
														name: 'Burden of Evil',
														description: 'You reveal a vision of your enemies’ fate that causes them to scramble as it staggers them.',
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
														target: 'Three enemies',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'Slide 3; I < [weak], dazed (save ends)',
																	tier2: 'Slide 5; I < [average], dazed (save ends)',
																	tier3: 'Slide 7; I < [strong], dazed (save ends)'
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
												id: 'censor-sub-2-4-1b',
												name: 'Edict of Peace',
												description: 'You anticipate your foes’ moves and deny them.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-4-1b',
														name: 'Edict of Peace',
														description: 'You anticipate your foes’ moves and deny them.',
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
														target: 'Each enemy in the area',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, whenever any target takes a triggered action or a free triggered action, that action is negated and the target takes holy damage equal to your Presence score.'
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
								id: 'censor-sub-2-5-1',
								name: 'Their Past Revealed',
								description: 'Your constant fragmentary visions become clearer, and can be honed to understand the past of creatures you interact with. While speaking with any creature, you can make a medium Presence test to see visions from their past. On a success, you see a clear view of any subject related to the creature’s past that you wish to understand. On a success with a consequence, you see two visions, one false and one true. On a failure, you lose 2d6 Stamina.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'censor-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-2-6-1a',
												name: 'Blessing and a Curse',
												description: 'The gods bless and damn in equal measure.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-6-1a',
														name: 'Blessing and a Curse',
														description: 'The gods bless and damn in equal measure.',
														type: {
															usage: 'Triggered Action',
															free: false,
															trigger: 'The target makes a power roll.',
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
														target: 'One creature',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target obtains a tier 1 or tier 3 outcome on their power roll (your choice). You can then choose another target within distance, who obtains the opposite outcome on their next power roll.'
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
												id: 'censor-sub-2-6-1b',
												name: 'Fulfill Your Destiny',
												description: 'You have looked at various futures, and only this one works.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-2-6-1b',
														name: 'Fulfill Your Destiny',
														description: 'You have looked at various futures, and only this one works.',
														type: {
															usage: 'Triggered Action',
															free: false,
															trigger: 'You or another hero ends their turn.',
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
														target: 'One ally',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target takes their turn after the triggering hero, and immediately removes all conditions and negative effects on themself. During their turn, the target has a double edge on power rolls.'
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
				id: 'censor-sub-3',
				name: 'Paragon',
				description: 'Without a strong example and a firm hand, the weak will be corrupted. You specialize in setting an example for your order. You have the Lead skill.',
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
										'Interrogate'
									]
								}
							},
							{
								id: 'censor-sub-3-1-2',
								name: 'Judgment Order Benefit',
								description: 'You can vertical pull the judged creature up to a number of squares equal to twice your Presence score.',
								type: 'Package Content',
								data: {
									tag: 'censor-judgment'
								}
							}
						]
					},
					{
						level: 2,
						features: [
							{
								id: 'censor-sub-3-2-1',
								name: 'Lead by Example',
								description: 'Your devotion to your deity allows you to take command of the battlefield, letting your allies benefit from your wisdom. While you are adjacent to a creature, your allies gain the benefits of flanking against that creature. Additionally, your allies gain an edge on tests made to aid other creatures with their tests.',
								type: 'Text',
								data: null
							},
							{
								id: 'censor-sub-3-2-2',
								name: 'Stalwart Example',
								description: 'You exhibit a small spark of your deity’s power, causing creatures to trust or fear you, depending on what you need. You gain an edge on tests made to intimidate or persuade others.',
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
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, each target in the aura gains 1 surge at the end of each of your turns.'
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
												id: 'censor-sub-3-2-3b',
												name: 'Sentenced',
												description: 'The shock of your condemnation freezes your enemy in their boots.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-2-3b',
														name: 'Sentenced',
														description: 'The shock of your condemnation freezes your enemy in their boots.',
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
														target: 'One creature',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '5 + P damage; P < [weak], restrained (save ends)',
																	tier2: '9 + P damage; P < [average], restrained (save ends)',
																	tier3: '12 + P damage; P < [strong], restrained (save ends)'
																}
															},
															{
																type: 'text',
																text: 'While the target is restrained this way, your abilities that impose forced movement can still move them.'
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
								id: 'censor-sub-3-3-1',
								name: 'Stand Fast!',
								description: 'Your divine spark grows in power, allowing you and your allies to focus and endure. At the start of each of your turns, you can spend 1d6 Stamina to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Any ally who starts their turn within 5 squares of you can also spend Stamina to gain this benefit.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'censor-sub-3-4-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-3-4-1a',
												name: 'Congregation',
												description: 'You focus your allies’ wrath on a chosen foe.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-4-1a',
														name: 'Congregation',
														description: 'You focus your allies’ wrath on a chosen foe.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '8 + M damage; as a free triggered action, one ally within 10 squares of the target can use a strike signature ability against the target',
																	tier2: '12 + M damage; as a free triggered action, one ally within 10 squares of the target can use a strike signature ability that gains an edge against the target',
																	tier3: '16 + M damage; as a free triggered action, two allies within 10 squares of the target can each use a strike signature ability that gains an edge against the target'
																}
															},
															{
																type: 'text',
																text: 'Each ally can shift up to 2 squares and gains 2 surges before making the strike.'
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
												id: 'censor-sub-3-4-1b',
												name: 'Intercede',
												description: 'You take your ally’s place.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-4-1b',
														name: 'Intercede',
														description: 'You take your ally’s place.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'A creature makes a strike against the target.',
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
														target: 'One ally',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target is unaffected by the strike and you become the target instead, even if you aren’t a valid target for it. You take half the damage from the strike, and the target gains 3 surges.'
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
								id: 'censor-sub-3-5-1',
								name: 'Vow',
								description: 'Your words take on the power of your deity, with all the authority that entails. If you convince a creature to take an oath, they can’t break it for 7 days. If you take an oath, you can’t break it for 7 days.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'censor-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'censor-sub-3-6-1a',
												name: 'Apostate',
												description: 'You channel holy energy to seal an enemy’s fate.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-6-1a',
														name: 'Apostate',
														description: 'You channel holy energy to seal an enemy’s fate.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '13 + M holy damage',
																	tier2: '19 + M holy damage',
																	tier3: '26 + M holy damage'
																}
															},
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, the target has damage weakness 10.'
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
												id: 'censor-sub-3-6-1b',
												name: 'Edict of Unyielding Resolve',
												description: 'You and your allies are clad in shimmering armor.',
												type: 'Ability',
												data: {
													ability: {
														id: 'censor-sub-3-6-1b',
														name: 'Edict of Unyielding Resolve',
														description: 'You and your allies are clad in shimmering armor.',
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
																type: 'Aura',
																value: 2,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self and each ally in the area',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, each target who starts their turn in the area gains 10 temporary Stamina.'
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
						'Lift'
					]
				}
			},
			{
				id: 'career-watch-officer-feature-3',
				name: 'Languages',
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
							description: 'At the start of a group test or montage test, you can spend a hero token. If you do, all participants make tests as if they also had any skill you have from the exploration group.',
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
