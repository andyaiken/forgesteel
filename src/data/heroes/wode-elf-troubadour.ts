import { Hero } from '../../models/hero';

export const wodeElfTroubadour = {
	id: 'HVPFufs9Uv4PWrKi',
	name: 'Lliarion',
	picture: null,
	folder: '',
	settingIDs: [
		'',
		'orden'
	],
	ancestry: {
		id: 'ancestry-wode-elf',
		name: 'Elf (wode)',
		description: 'Children of the sylvan celestials and masters of the elf-haunted forests called wodes, wode elves see all forests as their domain by birthright. They know and enjoy their reputation among humans for snatching children who wander too far into the woods. Humans should fear the trees.',
		features: [
			{
				id: 'wode-elf-feature-1',
				name: 'Wode Elf Glamor',
				description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on tests made to hide and sneak, and tests made to search for you while you are hidden take a bane.',
				type: 'Text',
				data: null
			},
			{
				id: 'wode-elf-feature-2',
				name: 'Wode Elf Traits',
				description: '',
				type: 'Choice',
				data: {
					options: [
						{
							feature: {
								id: 'wode-elf-feature-2-1',
								name: 'Forest Walk',
								description: 'You can shift into and while within difficult terrain.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'wode-elf-feature-2-2',
								name: 'Revisit Memory',
								description: 'Accessing memories is as easy as living in the present for you. You gain an edge on tests made to recall lore.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'wode-elf-feature-2-3',
								name: 'Swift',
								description: '',
								type: 'Speed',
								data: {
									speed: 6
								}
							},
							value: 1
						},
						{
							feature: {
								id: 'wode-elf-feature-2-4',
								name: 'Otherworldly Grace',
								description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'wode-elf-feature-2-5',
								name: 'The Wode Defends',
								description: 'Thorny vines erupt into existence and attempt to bind your foe.',
								type: 'Ability',
								data: {
									ability: {
										id: 'wode-elf-feature-2-5',
										name: 'The Wode Defends',
										description: 'Thorny vines erupt into existence and attempt to bind your foe.',
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
														'Might',
														'Agility'
													],
													bonus: 0,
													tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
													tier2: '3 + M or A damage; A < [average] slowed (save ends)',
													tier3: '5 + M or A damage; A < [strong] restrained (save ends)'
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
							value: 2
						},
						{
							feature: {
								id: 'wode-elf-feature-2-6',
								name: 'Quick and Brutal',
								description: 'Whenever you score a critical hit, you can take an additional main action and an additional move action instead of just a main action.',
								type: 'Text',
								data: null
							},
							value: 1
						}
					],
					count: 'ancestry',
					selected: [
						{
							id: 'wode-elf-feature-2-4',
							name: 'Otherworldly Grace',
							description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
							type: 'Text',
							data: null
						},
						{
							id: 'wode-elf-feature-2-3',
							name: 'Swift',
							description: '',
							type: 'Speed',
							data: {
								speed: 6
							}
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
		type: 'Bespoke',
		language: {
			id: 'culture-language',
			name: 'Language',
			description: '',
			type: 'Language Choice',
			data: {
				options: [],
				count: 1,
				selected: [ 'Yllyric' ]
			}
		},
		languages: [],
		environment: {
			id: 'env-wilderness',
			name: 'Wilderness',
			description: 'A wilderness culture doesn’t try to tame the terrain in which its people live, whether desert, forest, swamp, tundra, ocean, or more exotic climes. Instead, the folk of such a culture thrive amid nature, taking their sustenance and shelter from the land. A wilderness culture might be a circle of druids protecting a remote wode, a band of brigands hiding out in desert caves, or a camp of orc mercenaries who call the trackless mountains home. People in a wilderness culture learn how to use the land for all they need to live, typically crafting their own tools, clothing, and more.',
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
		organization: {
			id: 'org-bureaucratic',
			name: 'Bureaucratic',
			description: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws. Members of such a culture are often ranked in power according to those laws, with a small group of people holding the power to rule according to birthright, popular vote, or some other official and measurable standard. Many bureaucratic communities have one person at the top, though others might be ruled by a council. A trade guild with a guildmaster, treasurer, secretary, and a charter of rules and regulations for membership; a feudal lord who rules over a group of knights who in turn rule over peasants working the land; and a militaristic society with ranks and rules that its people must abide are all examples of bureaucratic cultures. Those who thrive in bureaucratic cultures don’t simply follow the rules. They know how to use those rules to their advantage, either bending, changing, or reinterpreting policy to advance their own interests. Schmoozing with those who make the laws is often key to this approach. Others in a bureaucratic culture might specialize in operating outside the strict regulations that govern the culture without getting caught.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Interpersonal',
					'Intrigue'
				],
				count: 1,
				selected: [
					'Sneak'
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
					'Music'
				]
			}
		}
	},
	class: {
		id: '9y3Jx3koKZipiPh1',
		name: 'Troubadour',
		description: 'The whole world’s a stage, and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whoever might witness your performance.\n\nAs a troubadour, you chase drama. The insurmountable dangers of the world might cause many a hero to cower. But you take to that world stage not intending to die, but to find out if you are truly alive.\n\n“History is a tale. Each of us is just a story we tell ourselves. Change the story, and you change the world.”\nJackson Bootblack',
		subclassName: 'Class Act',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Agility',
				'Presence'
			]
		],
		primaryCharacteristics: [
			'Agility',
			'Presence'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: '3G7nEekJVbHgJJNl',
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
						id: 'drlPj8moDZL1c8D1',
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
						id: 'UH5m1URtvSjZqfQb',
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
								'Brag'
							]
						}
					},
					{
						id: 'GjD2ZwdbvEIZOKQV',
						name: 'Interpersonal Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Interpersonal'
							],
							count: 2,
							selected: [
								'Flirt',
								'Persuade'
							]
						}
					},
					{
						id: 'WpHiobCwPhxC5q2g',
						name: 'Intrigue / Lore Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [
								'Intrigue',
								'Lore'
							],
							count: 1,
							selected: [
								'Hide'
							]
						}
					},
					{
						id: 'tS1DEkc8ZWqFRIxE',
						name: 'Drama',
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
									tag: '',
									trigger: 'The first time three or more heroes use an ability on the same turn',
									value: '2'
								},
								{
									tag: '',
									trigger: 'The first time any hero is made winded during the encounter',
									value: '2'
								},
								{
									tag: '',
									trigger: 'Whenever a creature within your line of effect rolls a natural 19 or 20',
									value: '3'
								},
								{
									tag: '',
									trigger: 'When you or another hero dies',
									value: '10'
								}
							],
							details: 'When you are dead, you continue to gain drama during combat as long as your body is intact. If you have 30 drama during the encounter in which you died, you can come back to life with 1 Stamina and 0 drama (no action required). If you are still dead after the encounter in which you died, you can’t gain drama during future encounters.',
							canBeNegative: false,
							value: 0
						}
					},
					{
						id: '3rwc3gnUTZ6Ta7a0',
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
									id: 'kit-swashbuckler',
									name: 'Swashbuckler',
									description: 'If you want to be mobile and deal a lot of damage with melee strikes, then you should reach for the Swashbuckler kit. This is a great kit for heroes who want to be master duelists.',
									type: '',
									armor: [
										'Light Armor'
									],
									weapon: [
										'Medium Weapon'
									],
									stamina: 3,
									speed: 3,
									stability: 0,
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
											id: 'kit-swashbuckler-signature',
											name: 'Fancy Footwork',
											description: 'All combat is a dance - and you\'ll be the one leading.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-swashbuckler-signature',
													name: 'Fancy Footwork',
													description: 'All combat is a dance - and you\'ll be the one leading.',
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
																tier1: '3 + M or A damage',
																tier2: '5 + M or A damage; push 1',
																tier3: '8 + M or A damage; push 2'
															}
														},
														{
															type: 'text',
															text: 'You can shift into any square the target leaves after you push them'
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
						id: 'q9DC0wXzaL4f1EeU',
						name: 'Scene Partner',
						description: 'Whenever you obtain a success on a test to interact with an NPC using a skill from the interpersonal group, you can form a bond with that NPC. When you enter into a negotiation with a bonded NPC, their patience increases by 1 (to a maximum of 5). Additionally, the first time during a negotiation that you personally make an argument that would increase a bonded NPC’s interest by 1, you instead increase their interest by 2 (to a maximum of 5).\n\nYou can have a number of bonds active equal to your level. When you form a bond with a new NPC that would exceed the limit, you must choose which of your active bonds to lose.',
						type: 'Text',
						data: null
					},
					{
						id: 'MTcRnLoVfzQkQw7T',
						name: 'Routines',
						description: 'You enter every battle with a set of performance abilities at the ready. Performances are magical presentations (such as songs, dances, poems, or gymnastic feats) that your allies can participate in. These abilities have the Performance keyword. At the start of each combat round, as long as you are not dazed, dead, or surprised, you can either choose a new performance or maintain your current performance (no action required). Your performance lasts until you are unable to maintain it or until the end of the encounter.',
						type: 'Text',
						data: null
					},
					{
						id: 'DY5KgVsjM9G2b1eP',
						name: 'Choreography',
						description: 'Taps, kicks, steps. It’s all “choreography.”',
						type: 'Ability',
						data: {
							ability: {
								id: 'DY5KgVsjM9G2b1eP',
								name: 'Choreography',
								description: 'Taps, kicks, steps. It’s all “choreography.”',
								type: {
									usage: 'No Action',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
								},
								keywords: [
									'Area',
									'Magic',
									'Performance'
								],
								distance: [
									{
										type: 'Aura',
										value: 5,
										value2: 0,
										within: 0,
										special: '',
										qualifier: ''
									}
								],
								target: 'Self and each ally in the area',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'While this performance is active, each target who starts their turn in the area gains a +2 bonus to speed until the end of their turn. '
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
						id: 'uqp9td9gJ5c4tKKQ',
						name: 'Revitalizing Limerick',
						description: 'There once was a man from Capital …',
						type: 'Ability',
						data: {
							ability: {
								id: 'uqp9td9gJ5c4tKKQ',
								name: 'Revitalizing Limerick',
								description: 'There once was a man from Capital …',
								type: {
									usage: 'No Action',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
								},
								keywords: [
									'Area',
									'Magic',
									'Performance'
								],
								distance: [
									{
										type: 'Aura',
										value: 5,
										value2: 0,
										within: 0,
										special: '',
										qualifier: ''
									}
								],
								target: 'Self and each ally in the area',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'At the end of each of your turns while this performance is active, you can choose up to a number of targets equal to your Presence score. Each chosen target can spend a Recovery.'
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
						id: 'JEPrmTnFwNbi7kWO',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'oklqgAHvGNBYvZ6Y'
							]
						}
					},
					{
						id: 'cCfz5o1dUmzOYVPL',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'48Ek5173XbbcaIuv'
							]
						}
					},
					{
						id: 'smLIhr6BGJPZscJG',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'MKhak5HyGbRZdhWy'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'TzNcWWXAnI5bvPk9',
						name: 'Appeal to the Muses',
						description: 'You can give a rousing speech, invoke your inspirations, or lift your fellows’ spirits, appealing to the muses to heighten a battle’s drama. However, irony is eager to hand your fortune to the villain to achieve the same end.\n\nBefore you roll to gain drama at the start of your turn, you can make your appeal (no action required). If you do, your roll gains the following\nadditional effects:\n* If the roll is a 1, you gain 1 additional drama. The Director gains 1d3 Malice.\n* If the roll is a 2, you gain 1 Heroic Resource, which you can keep or give to an ally within the distance of your active performance. The Director gains 1 Malice.\n* If the roll is a 3, you gain 2 of a Heroic Resource, which you can distribute among yourself and any allies within the distance of your active performance.',
						type: 'Text',
						data: null
					},
					{
						id: 'WagqmAOErEbwOMUA',
						name: 'Invocation',
						description: 'You have a specific manner that helps define your presence on the battlefield. Choose one of the following features.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'Ojd2syAahwIuMZ7E',
										name: 'Allow Me to Introduce Tonight’s Players',
										description: '',
										type: 'Ability',
										data: {
											ability: {
												id: 'Ojd2syAahwIuMZ7E',
												name: 'Allow Me to Introduce Tonight’s Players',
												description: '',
												type: {
													usage: 'Main Action',
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
														text: 'Whenever you take the first turn in a combat encounter, you can use a main action to introduce yourself and your allies to your opponents. Each ally can shift up to their speed, and ability rolls made against them have a double bane until the end of the combat round. Additionally, any surprised enemy is no longer surprised.'
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
										id: '3TpougOk43FTEYlT',
										name: 'Formal Introductions',
										description: 'As a respite activity, you can scribe a notice of your arrival (such as a calling card or a formal letter) addressed to an enemy. You can deliver the notice to the target personally if you are in the same general area, send it by courier, or leave it in a covert location for the target to find. You can have only one notice active at a time.\n\nThe Director determines when the target receives your notice. When the target receives the notice, they become alarmed and take desperate measures to stop you. The Director gains 1 additional Malice per combat round during encounters involving the target. The heroes start each such encounter with 2 additional hero tokens. These hero tokens disappear at the end of the encounter.',
										type: 'Text',
										data: null
									},
									value: 1
								},
								{
									feature: {
										id: 'vAsAdX1lzAwxKC0z',
										name: 'My Reputation Precedes Me',
										description: 'You can invoke your reputation at the start of a social interaction with one or more NPCs who haven’t met you before, automatically creating a bond with one of those NPCs from that group as if using your Scene Partner feature. This bond counts against the limit on active bonds from your Scene Partner feature. While the bond is active, all heroes present treat their Renown as 2 higher than usual for the purpose of entering into a negotiation with the bonded NPC.\n\nThe Director can award the heroes 1 hero token to make you infamous among the group of creatures instead, and preventing you from forming this bond. Until you take action to improve your reputation, all heroes present take a bane on tests made to interact with creatures in the group using skills from the interpersonal skill group. You can still use your Scene Partner feature to find allies within the group.',
										type: 'Text',
										data: null
									},
									value: 1
								}
							],
							count: 1,
							selected: []
						}
					},
					{
						id: 'tknnoxNMdhRdiF1e',
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
						id: 'yoKyUfQEMwhyC4Ze',
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
						id: 'bEgiUgVeMGaONxTn',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'N00Uu7tYlbZh5mLR',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'eMWbssNB1OSeIFmj',
						name: 'Melodrama',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'bPZ0jgAHVi08ZX2X',
										name: 'Melodrama #1',
										description: '',
										type: 'Heroic Resource Gain',
										data: {
											tag: '',
											trigger: 'Whenever a creature rolls a natural 2 on a power roll.',
											value: '2',
											replacesTags: []
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'Jlp0a0yANrSIoeXp',
										name: 'Melodrama #2',
										description: '',
										type: 'Heroic Resource Gain',
										data: {
											tag: '',
											trigger: 'The first time the Director deals damage to a hero using a Villain action or an ability that costs Malice.',
											value: '2',
											replacesTags: []
										}
									},
									value: 1
								},
								{
									feature: {
										id: '05FGfz1LetwQOlGm',
										name: 'Melodrama #3',
										description: '',
										type: 'Heroic Resource Gain',
										data: {
											tag: '',
											trigger: 'The first time a hero unwillingly falls 5 or more squares.',
											value: '2',
											replacesTags: []
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'bnEzQSbTNyay2M51',
										name: 'Melodrama #4',
										description: '',
										type: 'Heroic Resource Gain',
										data: {
											tag: '',
											trigger: 'The first time a hero deals damage with 3 surges.',
											value: '2',
											replacesTags: []
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'lbGOgNoNt9SsiBDB',
										name: 'Melodrama #5',
										description: '',
										type: 'Heroic Resource Gain',
										data: {
											tag: '',
											trigger: 'Whenever a hero spends their last Recovery.',
											value: '2',
											replacesTags: []
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'AOgAXA0Z2YZWf0Be',
										name: 'Melodrama Alternative',
										description: 'You can forgo choosing a new event to choose one event you already have (including an event gained with this feature). Whenever the chosen event grants you drama, you gain 1 additional drama.',
										type: 'Text',
										data: null
									},
									value: 1
								}
							],
							count: 2,
							selected: []
						}
					},
					{
						id: 'c8wilO6exppZ8lk0',
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
						id: 'pBD0Fhn5vO1A26aB',
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
						id: 'faVh7riGGaN0uOHR',
						name: 'Zeitgeist',
						description: 'You always have your ear to the ground, your finger on the pulse. When you start or finish a respite, choose one of the following effects.\n### Foreshadowing\n\nYou can ask the Director for two clues regarding an upcoming encounter or negotiation. One of the clues can be false.\n\n### Hear Ye, Hear Ye!\n\nBy bragging, intimidating, leading, or lying, you attempt to spread one piece of information into the local area. Make a Presence test:\n\n| Roll    | Effect                                                                                                                                                                                                                                        |\n|:--------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| ≤ 11    | Your information reaches no one.                                                                                                                                                                                                              |\n| 12 - 16 | Your information reaches the nearest populated area of town size or larger. You and each ally present when you make the test gain an edge on Presence tests in that area until one of you spends a Recovery.                                  |\n| ≥ 17    | Your information reaches the nearest populated area of town size or larger, plus the next closest such population. You and allies present for your test gain an edge on Presence tests made in those areas until you start your next respite. |\n\n### Latest Goss\n\nYou can ask the Director for three rumors regarding the area you’re in or an area you plan on entering before your next respite. One of the rumors can be false.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 5,
				features: [
					{
						id: 'ExlOitsyzbnBbNA2',
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
						id: 'ywf7fUdThUpCdF6J',
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
					},
					{
						id: 'KFi7rVE3i9lrpXic',
						name: 'Spotlight',
						description: 'The audience is watching, so you’d better give them a show.',
						type: 'Ability',
						data: {
							ability: {
								id: 'KFi7rVE3i9lrpXic',
								name: 'Spotlight',
								description: 'The audience is watching, so you’d better give them a show.',
								type: {
									usage: 'No Action',
									free: false,
									trigger: '',
									time: '',
									qualifiers: []
								},
								keywords: [
									'Area',
									'Magic',
									'Performance'
								],
								distance: [
									{
										type: 'Aura',
										value: 5,
										value2: 0,
										within: 0,
										special: '',
										qualifier: ''
									}
								],
								target: 'Self and each ally in the area',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'text',
										text: 'While this performance is active, each target who starts their turn in the area gains 1 of their Heroic Resource. This Heroic Resource disappears at the end of the target’s turn if they don’t spend it.'
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
						id: 'grnE5hFyVyLylxC2',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'LNpO0wUO8Eevov6c',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'JszVRV1fs7lyz7yF',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'u8XAyI9vpwIPsJXi',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'cuvMsaNuv1KvGvUF',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'HRzXpQyzYdOU4f3r',
						name: 'Equal Billing',
						description: 'You can use your Scene Partner feature to form a bond with one willing hero instead of an NPC you interact with using a test. If you bond with another hero, you lose your existing bond with a hero.\n\nAdditionally, you and creatures you are bonded with gain a +1 bonus to saving throws. Whenever you or a bonded creature succeeds on a saving throw, you and each creature you are bonded with gains temporary Stamina equal to your level.',
						type: 'Text',
						data: null
					},
					{
						id: 'JRIAGwr5xwIXZdG5',
						name: 'A Muse’s Muse',
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
						id: 'A7CsaTimMURrXg0M',
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
						id: 'rm84D6UDOw6SNSVm',
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
						id: 'wAOl8UZ3VTUdA67Z',
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
						id: 'b4oYpDkEydG3CTOD',
						name: 'Roar of the Crowd',
						description: 'You are empowered by your audience, near and far. You can’t be made frightened, and if you are prone, you can stand up as a free maneuver.\n\nAdditionally, whenever you spend a Recovery, you can forgo regaining Stamina to invoke the roar of an invisible applauding audience. You and each ally within 3 squares of you gains temporary Stamina equal to 10 + the number of active bonds from your Scene Partner feature + either your Victories or the number of players in your game (whichever is higher).',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'GYcwgp374s2e3GiY',
						name: 'Applause',
						description: '',
						type: 'Heroic Resource',
						data: {
							type: 'heroic',
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
						id: 'nkOnWwzyFh2QZOnV',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'KyTOfWVz1Htc6DAr',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'SvXvD5JZWWIMcMGv',
						name: 'Dramaturgy',
						description: 'You gain 1 additional drama or other Heroic Resource whenever you use your Appeal to the Muses feature. Additionally, your performances no longer have a distance, but can affect any target on the encounter map within your line of effect.',
						type: 'Text',
						data: null
					},
					{
						id: 'kN2tUhuHAbfRxOM3',
						name: 'Greatest of All Time',
						description: 'Whenever you obtain a success on a test, each NPC within your line of effect has their Impression score decreased by 4 during a negotiation (to a minimum of 1), and each ally within 3 squares of you gains an edge on their next test. These effects last until you start your next respite.',
						type: 'Text',
						data: null
					},
					{
						id: 'MJlch8xy0BmtjEAz',
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
					},
					{
						id: 'gIVmDrETVg4F0eTC',
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
				id: 'gEzZJ1hBo5YTQZVL',
				name: 'Artful Flourish',
				description: 'And they said practicing fencing was a waste!',
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
							tier1: '2 damage',
							tier2: '5 damage',
							tier3: '7 damage'
						}
					},
					{
						type: 'text',
						text: 'You can shift up to 3 squares.'
					},
					{
						type: 'field',
						name: 'Spend',
						value: 2,
						repeatable: true,
						effect: 'You can target one additional creature or object for every 2 drama spent.'
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
				id: 'aiH7V95hu1z7bvnJ',
				name: 'Cutting Sarcasm',
				description: 'There you are, radiating your usual charisma.',
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
							tier1: '2 + P psychic damage; p < [weak] , bleeding (save ends)',
							tier2: '5 + P psychic damage; p < [average] , bleeding (save ends)',
							tier3: '7 + P psychic damage; p < [strong] , bleeding (save ends)'
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
				id: 'Dq8W50f8RkS1gCZR',
				name: 'Instigator',
				description: 'I didn’t do it! What?',
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
								'Presence'
							],
							bonus: 0,
							tier1: '3 + P damage',
							tier2: '6 + P damage',
							tier3: '9 + P damage'
						}
					},
					{
						type: 'text',
						text: 'The target is taunted by you or a willing ally adjacent to you until the end of the target’s next turn.'
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
				id: 'oklqgAHvGNBYvZ6Y',
				name: 'Witty Banter',
				description: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
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
								'Presence'
							],
							bonus: 0,
							tier1: '4 + P psychic damage',
							tier2: '5 + P psychic damage',
							tier3: '7 + P psychic damage'
						}
					},
					{
						type: 'text',
						text: 'One ally within 10 squares of you can end one effect on them that is ended by a saving throw or that ends at the end of their turn.'
					},
					{
						type: 'field',
						name: 'Spend',
						value: 1,
						repeatable: false,
						effect: 'The chosen ally can spend a Recovery.'
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
				id: 'wuGWNezovUaXNrhz',
				name: 'Harsh Critic',
				description: 'Just one bad review will ruin their day.',
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
							tier1: '7 + P sonic damage',
							tier2: '10 + P sonic damage',
							tier3: '13 + P sonic damage'
						}
					},
					{
						type: 'text',
						text: 'The first time the target uses an ability before the start of your next turn, any effects from the ability’s tier outcomes other than damage are negated for all targets. Ability effects that always happen regardless of the power roll work as usual. '
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
				id: '48Ek5173XbbcaIuv',
				name: 'Hypnotic Overtones',
				description: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
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
								'Presence'
							],
							bonus: 0,
							tier1: 'Slide 1; i < [weak], dazed (save ends)',
							tier2: 'Slide 1; i < [average], dazed (save ends)',
							tier3: 'Slide 2; i < [strong], dazed (save ends)'
						}
					},
					{
						type: 'field',
						name: 'Spend',
						value: 2,
						repeatable: true,
						effect: 'The size of the burst increases by 1 for every 2 drama spent.'
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
				id: 'D27ycyqsuILS0KXt',
				name: 'Quick Rewrite',
				description: 'You write something unexpected into the scene that hinders your enemy.',
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
								'Presence'
							],
							bonus: 0,
							tier1: '4 damage; p < [weak], slowed (save ends)',
							tier2: '5 damage; p < [average], slowed (save ends)',
							tier3: '6 damage; p < [strong], restrained (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The area is difficult terrain for enemies.'
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
				id: 'amyFFfmA2oAoiO8P',
				name: 'Upstage',
				description: 'As you bob and weave through the crowd, you can’t help but leave the audience wanting more.',
				type: {
					usage: 'Maneuver',
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You shift up to your speed. You make one power roll that targets each enemy you move adjacent to during this shift.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Agility',
								'Presence'
							],
							bonus: 0,
							tier1: 'Taunted (EoT); a < [weak], prone',
							tier2: 'Taunted (EoT); a < [average], prone',
							tier3: 'Taunted (EoT); a < [strong], prone and can’t stand (EoT)'
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
				id: 'MKhak5HyGbRZdhWy',
				name: 'Dramatic Reversal',
				description: 'Give the audience a surprise.',
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
				target: 'Self and each ally in the area',
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
							tier1: 'The target can shift 1 square and make a free strike.',
							tier2: 'The target can shift up to 2 squares and make a free strike that gains an edge.',
							tier3: 'The target can shift up to 3 squares and make a free strike that gains an edge, then can spend a Recovery.'
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
				id: 'y4twMNJioffMnTAp',
				name: 'Fake Your Death',
				description: 'O happy dagger, this is thy sheath!',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: ' You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion and your invisibility last until the end of your next turn, or until the illusion is interacted with, you take damage, or you use a main action or a maneuver.'
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
				id: 'wkTaIiJ4JOVGjFkE',
				name: 'Flip the Script',
				description: 'You try a different take on events, justifying the new locations everyone ended up in.',
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
				target: 'Self and each ally in the area',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Each target can teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.'
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
				id: 'lHLPt6cUuyXcCdb0',
				name: 'Method Acting',
				description: 'They’re so hurt by your performance, you start to believe it yourself. ',
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
								'Agility'
							],
							bonus: 0,
							tier1: '6 + A damage; p < [weak], weakened (save ends)',
							tier2: '10 + A damage; p < [weak], weakened (save ends)',
							tier3: '14 + A damage; p < [weak], weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'You can become bleeding (save ends) to deal an extra 5 corruption damage to the target.'
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
				id: 'BlO52My4D7X4wdVh',
				name: 'Extensive Rewrites',
				description: 'No, this isn’t right. That foe was over there!',
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
						value: 4,
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
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: 'Slide 3; p < [weak], this slide ignores the target’s stability',
							tier2: 'Slide 5; p < [average], this slide ignores the target’s stability',
							tier3: 'Slide 7; p < [strong], this slide ignores the target’s stability'
						}
					},
					{
						type: 'text',
						text: 'Instead of sliding a target, you can swap their location with another target as long as each can fit into the other’s space. You can’t slide targets into other creatures or objects using this ability.'
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
				id: '7vm0VdMiqgrZtpcu',
				name: 'Infernal Gavotte',
				description: 'A spicy performance lights a fire under your allies’ feet',
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
						type: 'Burst',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '5 fire damage; a < [weak], weakened (save ends)',
							tier2: '7 fire damage; a < [average], weakened (save ends)',
							tier3: '10 fire damage; a < [strong], weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'Each ally in the area can shift up to 2 squares.'
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
				id: '7vm0VdMiqgrZtpcu2',
				name: 'Star Solo',
				description: 'Your performance travels and doesn’t stop moving until your audience is completely rocked.',
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
						value: 10,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'One creature or object',
				cost: 7,
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
							tier1: '5 + P damage',
							tier2: '8 + P damage; push 3',
							tier3: '11 + P damage; push 5'
						}
					},
					{
						type: 'text',
						text: 'You can choose to have this ability deal sonic damage. Additionally, you can use this ability against the same target for the next 2 combat rounds without spending drama.'
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
				id: '7vm0VdMiqgrZtpcu3',
				name: 'We Meet at Last',
				description: 'You magically intertwine your fate with another creature—for better or worse.',
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
				target: 'One creature',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: '\nUntil the end of the encounter, both you and the target can target each other with abilities even if you are beyond distance, with the distance of this ability replacing those abilities’ distances. The target can’t be force moved by an ability used beyond distance this way.\n\nAdditionally, once on each of your turns, you can use a free maneuver to communicate a motivating or dispiriting message to the target, either granting them 2 surges or forcing them to take a bane on the next ability roll they make before the start of your next turn.'
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
				id: 'fyx732V0Vlq49a1N',
				name: 'Action Hero',
				description: 'You wield your weapon at blistering speed, leaving everyone around you fighting for their lives.',
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
					'Weapon'
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
						text: 'Unless you score a critical hit, this ability can’t reduce a non-minion target below 1 Stamina.'
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
				id: 'HeBr76EpA6RIMDSX',
				name: 'Continuity Error',
				description: 'Your subject is written into two places at once.',
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
				target: 'One enemy or object',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target is split into two separate entities, one of which remains in the target’s space while the other appears in an unoccupied space of your choice within distance. If the target is a creature, this creates a new creature under the Director’s control. Each entity has half the original target’s Stamina, is weakened, and takes 1d6 corruption damage at the start of each of their turns. If either entity is reduced to 0 Stamina, the other entity persists as the original entity and this effect ends. The effect also ends if both entities occupy the same space, causing them to automatically merge and combine their current Stamina.'
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
				id: 'Q5GrFFZc8YjRIJjL',
				name: 'Love Song',
				description: 'You play a small ditty that plants you inside your target’s heart.',
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
				target: 'One creature or object',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target gains 20 temporary Stamina. Until the end of the encounter, whenever the target takes damage while you’re within distance, you can choose to take the damage instead of the target.'
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
				id: 'ZrTkbAu3EcZ0C6Di',
				name: 'Patter Song',
				description: 'Dazzle them with your fancy patter and they forget where they were.',
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
				target: 'Special',
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
							tier1: 'One ally within distance can take their turn immediately after yours.',
							tier2: 'Two allies within distance can take their turns immediately after yours in any order.',
							tier3: 'Three allies within distance can take their turns immediately after yours in any order. One of those allies can have already taken a turn this combat round.'
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
				id: 'SRHmnFY5rDCiCRuR',
				name: 'Dramatic Reveal',
				description: 'A little stage trickery, and where once stood a foe, now stands a friend!',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever you reduce a creature to 0 Stamina using an ability, you can use a free triggered action to teleport an ally within distance of that ability into the creature’s space in a plume of rose petals. You or the teleported ally can then make a melee free strike.'
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
				id: '0rmeKAGMyn9Q6YMf',
				name: 'Power Ballad',
				description: 'A song for the brokenhearted wraps itself around the target and blossoms into a ward of thorns.',
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
				target: 'Self or one ally',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever the target takes damage while winded, they can use a free triggered action to deal half the damage they took to the source of the damage.'
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
				id: '2XIhjJCLHQuNte5I',
				name: 'Saved in the Edit',
				description: 'You shout a word of power that allows you to rewrite reality to your whims.',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever you deal rolled damage to a creature or object, or enable a creature to spend a Recovery, you can use a free triggered action to give that creature or object one of the following effects until the start of your next turn. If this ability is triggered by multiple targets taking damage or multiple creatures spending Recoveries simultaneously, each target receives the same effect:\n* The target has damage weakness equal to your Presence score against any magic, psionic, or weapon ability.\n* The target has damage immunity equal to your Presence score.\n* The target has a bonus to stability and a penalty to speed equal to your Presence score.\n* The target has a bonus to speed and a penalty to stability equal to your Presence score.'
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
				id: 'zrzbOjJnBZb8eWUQ',
				name: 'The Show Must Go On',
				description: 'You shine a bright light on the players on the stage and compel them to finish the performance.',
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
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '6 damage; p < [weak], the target can’t willingly leave the area (EoT)',
							tier2: '8 damage; p < [average], the target can’t willingly leave the area (save ends)',
							tier3: '12 damage; the target can’t willingly leave the area (EoT); if p < [strong], they can’t willingly leave the area (save ends)'
						}
					},
					{
						type: 'text',
						text: 'Each ally within distance can’t obtain lower than a tier 2 outcome on the next test they make before the start of your next turn.'
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
				id: 'u3JAwbvGQEHPi6cY',
				name: 'Auteur',
				description: 'You seek drama from story and recount, using your magic to manipulate the sequence of events unfolding before you.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: '63GSnAtLidKQThSw',
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
										'Brag'
									]
								}
							},
							{
								id: 'VM5qLsp8pXpYt180',
								name: 'Blocking',
								description: 'No, no, no, you lose the audience that way. Try it like this …',
								type: 'Ability',
								data: {
									ability: {
										id: 'VM5qLsp8pXpYt180',
										name: 'Blocking',
										description: 'No, no, no, you lose the audience that way. Try it like this …',
										type: {
											usage: 'No Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Area',
											'Magic',
											'Performance'
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
										target: 'Each creature in the area',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'At the end of each of your turns while this performance is active, you can choose up to a number of targets equal to your Presence score and teleport those targets to unoccupied spaces in the area. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. '
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
								id: 'WLhzen5TMIS87eap',
								name: 'Dramatic Monologue',
								description: 'It doesn’t need to make sense. Just say it with emotion.',
								type: 'Ability',
								data: {
									ability: {
										id: 'WLhzen5TMIS87eap',
										name: 'Dramatic Monologue',
										description: 'It doesn’t need to make sense. Just say it with emotion.',
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
										target: 'Special',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: ' Choose one of the following effects:\n* You orate a rousing tale of victory. One ally within distance gains an edge on the next power roll they make before the start of your next turn.\n* You weave a tale of high-stakes heroics. One ally within distance gains 1 surge.\n* You insult a foe where they’re most vulnerable. One enemy within distance takes a bane on the next power roll they make before the end of their next turn.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'You can choose two targets for the chosen effect.'
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
								id: 'MUMrI7zMhGiDF6an',
								name: 'Turnabout Is Fair Play',
								description: 'All’s fair in love and whatever.',
								type: 'Ability',
								data: {
									ability: {
										id: 'MUMrI7zMhGiDF6an',
										name: 'Turnabout Is Fair Play',
										description: 'All’s fair in love and whatever.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target makes an ability roll that has an edge, a double edge, a bane, or a double bane.',
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
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'An edge on the triggering roll becomes a bane, or a double edge becomes an edge. A bane becomes an edge, or a double bane becomes a bane.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 3,
												repeatable: false,
												effect: 'An edge on the triggering roll becomes a double bane, or a double edge is negated. A bane becomes a double edge, or a double bane is negated.'
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
								id: 'NR3KiD1HgYdQ5KHv',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'wbcpRLxbH1FXK30r',
												name: 'Guest Star',
												description: 'We offered them a percentage of the gross. So they’re working for free!',
												type: 'Ability',
												data: {
													ability: {
														id: 'wbcpRLxbH1FXK30r',
														name: 'Guest Star',
														description: 'We offered them a percentage of the gross. So they’re working for free!',
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
																type: 'Melee',
																value: 1,
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
																text: 'A guest star appears to help you during the encounter: either a bystander within distance uplifted by your magic, or a mysterious new hero who appears in an unoccupied space within distance. This guest star is controlled by you, has their own turn, and shares your characteristics. Their Stamina maximum is half yours. They have no abilities other than your melee and ranged free strikes. At the end of the encounter, or when the guest star is reduced to 0 Stamina, they retreat or revert to a bystander. The same bystander can’t be uplifted this way more than once during an encounter. '
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
												id: 'xun0HqS4EyDtB40D',
												name: 'Twist at the End',
												description: 'You didn’t see that coming, did you?!',
												type: 'Ability',
												data: {
													ability: {
														id: 'xun0HqS4EyDtB40D',
														name: 'Twist at the End',
														description: 'You didn’t see that coming, did you?!',
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
														target: 'One dead enemy',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'A target who is not a leader or solo creature comes back to life with half their Stamina and becomes an ally under the Director’s control. The players can work with the Director to determine when the target takes their turn each combat round. At the end of the encounter, the target turns to dust and is blown away.'
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
						features: [
							{
								id: '8mgJuIOaJ89ei7An',
								name: 'Missed Cue',
								description: 'If you aren’t surprised at the start of an encounter, you can choose one enemy within your line of effect who is not a leader or solo creature. The Director temporarily removes the chosen creature from the encounter. The chosen creature enters the encounter at the start of the second combat round. You must earn 3 Victories before you can use this feature again.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'z5ajGRuxCgWGBqkY',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'V532EvelvtngOBm5',
												name: 'Fix It in Post',
												description: 'Once on each of your turns, you can use a free maneuver to change one condition affecting a creature within distance of your Dramatic Monologue ability. Choose one of the following conditions on the target: bleeding, frightened, prone, slowed, or taunted. You change that condition to another of those conditions, maintaining the duration and origin of the original condition. A target who is no longer prone can stand up.',
												type: 'Text',
												data: null
											},
											value: 1
										},
										{
											feature: {
												id: 'blD6AhJ1qRfFDLGB',
												name: 'Take Two!',
												description: 'One more, and this time make it interesting.',
												type: 'Ability',
												data: {
													ability: {
														id: 'blD6AhJ1qRfFDLGB',
														name: 'Take Two!',
														description: 'One more, and this time make it interesting.',
														type: {
															usage: 'No Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Magic',
															'Performance'
														],
														distance: [
															{
																type: 'Aura',
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self and each ally in the area',
														cost: 0,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'While this performance is active, each target who starts their turn in the area can reroll the first power roll that turn that obtains a tier 2 outcome. They must use the new roll.'
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
						level: 6,
						features: [
							{
								id: 'CwUQTsffxHIfqd1R',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: '0Gh84KaW8ivImayH',
												name: 'Here’s How Your Story Ends',
												description: 'You give away the ending of this battle, and it’s not great for them.',
												type: 'Ability',
												data: {
													ability: {
														id: '0Gh84KaW8ivImayH',
														name: 'Here’s How Your Story Ends',
														description: 'You give away the ending of this battle, and it’s not great for them.',
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
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '2 psychic damage; p < [weak], frightened (save ends)',
																	tier2: '5 psychic damage; p < [average], frightened (save ends)',
																	tier3: '7 psychic damage; p < [strong], frightened (save ends)'
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
												id: '756Ynw8Qoy8v7gPo',
												name: 'You’re All My Understudies',
												description: 'It’s important for everyone to know each other’s lines, just in case …',
												type: 'Ability',
												data: {
													ability: {
														id: '756Ynw8Qoy8v7gPo',
														name: 'You’re All My Understudies',
														description: 'It’s important for everyone to know each other’s lines, just in case …',
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
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each ally in the area',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter, each target gains the speed bonus, weapon distance bonus, disengage bonus, and stability bonus of your currently equipped kit in addition to their own kit’s bonuses.'
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
								id: 'oyvdzACJtFq8WHn7',
								name: 'Deleted Scene',
								description: 'Whenever a creature within distance of your Dramatic Monologue ability makes a power roll, you can spend 1 drama as a free triggered action to use Dramatic Monologue, targeting only one creature.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'gPzNIv7yp4ELiJSz',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'vHIxEUa7yuxQSjDO',
												name: 'Epic',
												description: 'Your story tells a tale of the villain’s waning power and how the heroes rose to the occasion to stop them.',
												type: 'Ability',
												data: {
													ability: {
														id: 'vHIxEUa7yuxQSjDO',
														name: 'Epic',
														description: 'Your story tells a tale of the villain’s waning power and how the heroes rose to the occasion to stop them.',
														type: {
															usage: 'Maneuver',
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
																	tier1: 'The target takes a bane on ability rolls (save ends).',
																	tier2: 'The target has a double bane on ability rolls (save ends).',
																	tier3: 'The target has a double bane on power rolls (save ends).'
																}
															},
															{
																type: 'text',
																text: 'Choose one ally within distance. While the target is affected by this ability, each time they use an ability, that ally can make a free strike against them after the ability is resolved.'
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
												id: 'nqibjR3wWOCxaYIk',
												name: 'Rising Tension',
												description: 'You narrate the tension of the scene and put all hope into your protagonist to turn things around.',
												type: 'Ability',
												data: {
													ability: {
														id: 'nqibjR3wWOCxaYIk',
														name: 'Rising Tension',
														description: 'You narrate the tension of the scene and put all hope into your protagonist to turn things around.',
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
														target: 'One ally',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target gains 3 of their Heroic Resource, has a double edge on a power roll of their choice made during their next turn, is no longer slowed or weakened if they were before, and can immediately take their turn after yours if they have not taken their turn already this round.'
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
				id: 'O51GO1EdIggJHj40',
				name: 'Duelist',
				description: 'Drama infuses your every movement done in tandem with another. You perform dances of death, putting trust in your opponent to return your passion in kind.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: '1NhlI9WCQUCKkX0u',
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
										'Gymnastics'
									]
								}
							},
							{
								id: 'gTezUhLaizAfbmXy',
								name: 'Acrobatics',
								description: 'Folks love a good tumble.',
								type: 'Ability',
								data: {
									ability: {
										id: 'gTezUhLaizAfbmXy',
										name: 'Acrobatics',
										description: 'Folks love a good tumble.',
										type: {
											usage: 'No Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Area',
											'Magic',
											'Performance'
										],
										distance: [
											{
												type: 'Aura',
												value: 5,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Self and each ally in the area',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'While this performance is active, each target who starts their turn in the area can automatically obtain a tier 3 outcome on one test made to jump, tumble, or climb as part of their movement before the end of their turn.'
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
								id: 'vS4O8NKJgdBVoVjj',
								name: 'Star Power',
								description: 'Your years of practicing fencing and dancing pay off on the battlefield.',
								type: 'Ability',
								data: {
									ability: {
										id: 'vS4O8NKJgdBVoVjj',
										name: 'Star Power',
										description: 'Your years of practicing fencing and dancing pay off on the battlefield.',
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
												type: 'Melee',
												value: 1,
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
												text: 'You gain a +2 bonus to speed until the end of your turn. Additionally, the next power roll you make this turn can’t have an outcome lower than tier 2.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'You gain a +4 bonus to speed instead.'
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
								id: 'uWQCoI4iBOhFpHgW',
								name: 'Riposte',
								description: '“I’d have brought treats had I known I’d be fighting a dog.”',
								type: 'Ability',
								data: {
									ability: {
										id: 'uWQCoI4iBOhFpHgW',
										name: 'Riposte',
										description: '“I’d have brought treats had I known I’d be fighting a dog.”',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target takes damage from a melee strike.',
											time: '',
											qualifiers: []
										},
										keywords: [
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
										target: 'Self or one ally',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'The target makes a free strike against the creature who made the triggering strike.'
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
								id: 'lAPeP3iSpt8PqQJI',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'FViXbLCcsCb1xdHQ',
												name: 'Classic Chandelier Stunt',
												description: 'Audiences love this bit.',
												type: 'Ability',
												data: {
													ability: {
														id: 'FViXbLCcsCb1xdHQ',
														name: 'Classic Chandelier Stunt',
														description: 'Audiences love this bit.',
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
														target: 'Self and one willing ally',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target can shift up to 5 squares, including vertically, but must end this movement adjacent to the other target and on solid ground. Each target can then make a melee free strike that deals extra damage equal to twice their highest characteristic score.'
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
												id: 'MRR7Ag6ujfREe9A8',
												name: 'En Garde!',
												description: 'Wait, it’s … Guard! Turn! Parry! Dodge! Spin! Thrust! Ha!',
												type: 'Ability',
												data: {
													ability: {
														id: 'MRR7Ag6ujfREe9A8',
														name: 'En Garde!',
														description: 'Wait, it’s … Guard! Turn! Parry! Dodge! Spin! Thrust! Ha!',
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
																		'Agility'
																	],
																	bonus: 0,
																	tier1: '7 + A damage',
																	tier2: '11 + A damage',
																	tier3: '16 + A damage'
																}
															},
															{
																type: 'text',
																text: 'The target can make a melee free strike against you. If they do, you can make a melee free strike against the target.'
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
						features: [
							{
								id: 'TkRYPzOk7E7KosGI',
								name: 'Foil',
								description: 'At the start of an encounter, choose one creature within your line of effect. You have a double edge on power rolls made against or in\ncompetition with that creature. The chosen creature also has a double edge on power rolls made against or in competition with you. If the chosen creature is reduced to 0 Stamina, you can choose a new foil at the start of the next combat round. ',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'AYG8ODq4Xvn4vWMr',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'EpJ6mBFE2kfCK1IY',
												name: 'Verbal Duel',
												description: 'Once on each of your turns while the target of your Foil feature is adjacent to you, you can use a free maneuver to exchange words with them. Make an opposed Presence test with the target. Whoever gets the higher result can make a free strike, which deals psychic damage instead of its usual damage.',
												type: 'Text',
												data: null
											},
											value: 1
										},
										{
											feature: {
												id: 'TqxhltwD22GJjGkU',
												name: 'We Can’t Be Upstaged!',
												description: 'Swordplay so graceful it looks like you all practiced this.',
												type: 'Ability',
												data: {
													ability: {
														id: 'TqxhltwD22GJjGkU',
														name: 'We Can’t Be Upstaged!',
														description: 'Swordplay so graceful it looks like you all practiced this.',
														type: {
															usage: 'No Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Magic',
															'Performance'
														],
														distance: [
															{
																type: 'Aura',
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Self and each ally in the area',
														cost: 0,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'While this performance is active, a target who starts their turn in the area gains a bonus to the distance they can shift equal to your Presence score until the end of their turn.'
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
						level: 6,
						features: [
							{
								id: 'AkvymN5wTwBpvJk6',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'gCxHNxuFdPtoWOSw',
												name: 'Blood on the Stage',
												description: 'It’s love and blood or drama and blood. Either way, there’s always blood.',
												type: 'Ability',
												data: {
													ability: {
														id: 'gCxHNxuFdPtoWOSw',
														name: 'Blood on the Stage',
														description: 'It’s love and blood or drama and blood. Either way, there’s always blood.',
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
																	tier1: '12 + A damage; m < [weak], bleeding (save ends)',
																	tier2: '18 + A damage; m < [average], bleeding (save ends)',
																	tier3: '24 + A damage; bleeding (EoT), or if m < [strong], bleeding (save ends)'
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
												id: 'yzRbbBkrzCSPBh1w',
												name: 'Fight Choreography',
												description: 'You and your partner make a flashy show of derring-do, then get back to your corners.',
												type: 'Ability',
												data: {
													ability: {
														id: 'yzRbbBkrzCSPBh1w',
														name: 'Fight Choreography',
														description: 'You and your partner make a flashy show of derring-do, then get back to your corners.',
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
																type: 'text',
																text: 'You and the target each make a melee free strike that targets each enemy within 3 squares of either of you, dividing the enemies between each of you. You choose which enemies your free strike targets and which enemies the target creature’s free strike targets. You then slide the target 5 squares, ignoring stability.'
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
								id: 'FwA0rbxGHrD7Oj2H',
								name: 'Masterwork',
								description: 'Choose one of your signature abilities and name it after yourself. You always have this ability available, even if it is sourced from a kit you switch out. Whenever you use this ability, you gain an edge and 1 surge that you can use only on this ability.\n\nAdditionally, when your named signature ability is the last ability you use in an encounter, you can immediately use the Hear Ye, Hear Ye! effect of your Zeitgeist feature to tell tales of your exploits after the encounter ends',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'qIMKE6V6R4w2teMf',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: '4LyAtdASe3AEJaon',
												name: 'Expert Fencer',
												description: 'If you can land the strike, the crowd goes wild.',
												type: 'Ability',
												data: {
													ability: {
														id: '4LyAtdASe3AEJaon',
														name: 'Expert Fencer',
														description: 'If you can land the strike, the crowd goes wild.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Charge',
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
																	tier3: '28 + A damage; m < [strong], bleeding (save ends)'
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
												id: 'IZCTPQBJer4fFuKi',
												name: 'Renegotiated Contract',
												description: 'No, no. You don’t die until the sequel.',
												type: 'Ability',
												data: {
													ability: {
														id: 'IZCTPQBJer4fFuKi',
														name: 'Renegotiated Contract',
														description: 'No, no. You don’t die until the sequel.',
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
																type: 'text',
																text: 'Add your current Stamina to your target’s current Stamina, then you have half that total Stamina and the target has the remainder. If either of you would gain more Stamina this way than their Stamina maximum, the difference in Stamina between what that creature would gain and their maximum is gained by the other creature. Neither of you can gain more Stamina than your maximum this way. You then make a power roll.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'You and the target can each end one effect on yourselves that is ended by a saving throw or that ends at the end of your turns.',
																	tier2: 'You and the target can end any effects on yourselves that are ended by a saving throw or that end at the end of your turns.',
																	tier3: 'You can choose any of the current effects on you and the target that are ended by a saving throw or that end at the end of your turns, apply the chosen effects to the target, and end the rest.'
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
						level: 10,
						features: []
					}
				],
				selected: false
			},
			{
				id: 'tWBfpTKQXZ12jGsU',
				name: 'Virtuoso',
				description: 'You find drama in music and song, weaving magic between vibrations and filling the audience with your pathos.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'zVuRuelOOMRXxCgG',
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
								id: '8OR9gvPtJN7cIZhh',
								name: 'Power Chord',
								description: 'Your instrument rings true and your music blows everyone away.',
								type: 'Ability',
								data: {
									ability: {
										id: '8OR9gvPtJN7cIZhh',
										name: 'Power Chord',
										description: 'Your instrument rings true and your music blows everyone away.',
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
												value: 2,
												value2: 0,
												within: 0,
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
												type: 'roll',
												roll: {
													characteristic: [
														'Presence'
													],
													bonus: 0,
													tier1: 'Push 1',
													tier2: 'Push 2',
													tier3: 'Push 3'
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
							{
								id: 'zVLsFRY0V10dNuaA',
								name: 'Virtuoso Performances',
								description: 'You have the following performance abilities, which are usable with\nyour Routines feature.',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'K0mQdfUHeiaVSsMN',
											name: '“Thunder Mother”',
											description: 'All for thunder motherrr! ♪ Run and hide for coverrr! ♪',
											type: 'Ability',
											data: {
												ability: {
													id: 'K0mQdfUHeiaVSsMN',
													name: '“Thunder Mother”',
													description: 'All for thunder motherrr! ♪ Run and hide for coverrr! ♪',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Magic',
														'Performance',
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
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'At the end of each combat round while this performance is active, you can make a power roll against the target that ignores cover. You can’t target the same creature twice with this effect.'
														},
														{
															type: 'roll',
															roll: {
																characteristic: [
																	'Presence'
																],
																bonus: 0,
																tier1: 'Lightning damage equal to your level',
																tier2: 'Lightning damage equal to 5 + your level',
																tier3: 'Lightning damage equal to 10 + your level'
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
										{
											id: 'T2lumbD5GNggb7kX',
											name: '“Ballad of the Beast”',
											description: 'Teeth are bare! ♪ Eyes black! ♪ No escaping the beast! ♪',
											type: 'Ability',
											data: {
												ability: {
													id: 'T2lumbD5GNggb7kX',
													name: '“Ballad of the Beast”',
													description: 'Teeth are bare! ♪ Eyes black! ♪ No escaping the beast! ♪',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Area',
														'Magic',
														'Performance'
													],
													distance: [
														{
															type: 'Aura',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Self and each ally in the area',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'While this performance is active, each target who starts their turn in the area gains 1 surge.'
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
							},
							{
								id: 'WcIsMpwQBuTdLdmv',
								name: 'Harmonize',
								description: 'Give the chorus a little punch.',
								type: 'Ability',
								data: {
									ability: {
										id: 'WcIsMpwQBuTdLdmv',
										name: 'Harmonize',
										description: 'Give the chorus a little punch.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target uses an ability that targets only one enemy and costs 3 or fewer of their Heroic Resource.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Ranged'
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
										cost: 3,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'The target can choose one additional target for the triggering ability. Any damage dealt to the additional target is sonic damage.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: true,
												effect: 'You can trigger this ability when a target uses an ability that has a Heroic Resource cost of 3 + each additional drama spent.'
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
								id: 'DWhLWnP0bwuHQ2qy',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'U3IGzrqBjqxWKD9K',
												name: 'Encore',
												description: 'Again! Again!',
												type: 'Ability',
												data: {
													ability: {
														id: 'U3IGzrqBjqxWKD9K',
														name: 'Encore',
														description: 'Again! Again!',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Magic',
															'Strike'
														],
														distance: [
															{
																type: 'Special',
																value: 0,
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
																text: 'You use an ability that you have observed being used this combat round. The ability must have the Strike keyword, cost 5 or fewer of a Heroic Resource, and cost no Malice. When you make the strike, you use your Presence score for any power rolls, and any damage you deal is sonic damage.'
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
												id: '3eWhJl6vthKu3RY3',
												name: 'Tough Crowd',
												description: 'Your fans don’t seem to like the opening act …',
												type: 'Ability',
												data: {
													ability: {
														id: '3eWhJl6vthKu3RY3',
														name: 'Tough Crowd',
														description: 'Your fans don’t seem to like the opening act …',
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
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The area is haunted by a swirling horde of phantoms until the end of the encounter. Allies can enter any square of the area without spending movement. At the end of each of your turns, you can make one power roll that targets each enemy in the area.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '5 corruption damage; m < [weak], pull 1 toward the center of the area',
																	tier2: '9 corruption damage; m < [average], pull 2 toward the center of the area',
																	tier3: '12 corruption damage; m < [strong], pull 3 toward the center of the area'
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
						features: [
							{
								id: 'gMLn35ehmeBT1RYV',
								name: 'Second Album',
								description: 'You have the following performance abilities, which are usable with your Routines feature.',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'mWeNhxpEVJMjKcU8',
											name: '“Fire Up the Night”',
											description: 'Maybe you and I ♪ We can still bring the light! ♪',
											type: 'Ability',
											data: {
												ability: {
													id: 'mWeNhxpEVJMjKcU8',
													name: '“Fire Up the Night”',
													description: 'Maybe you and I ♪ We can still bring the light! ♪',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Area',
														'Magic',
														'Performance'
													],
													distance: [
														{
															type: 'Aura',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Self and each ally in the area',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'While this performance is active, each target who starts their turn in the area doesn’t take a bane on strikes against creatures with concealment. Once during their turn, they can search for hidden creatures as a free maneuver.'
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
											id: 'lDpZJV6xP89zFb8e',
											name: '“Never-Ending Hero”',
											description: 'And toniiight we can truly say ♪ They will alllways find a way! ♪',
											type: 'Ability',
											data: {
												ability: {
													id: 'lDpZJV6xP89zFb8e',
													name: '“Never-Ending Hero”',
													description: 'And toniiight we can truly say ♪ They will alllways find a way! ♪',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Area',
														'Magic',
														'Performance'
													],
													distance: [
														{
															type: 'Aura',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Self and each ally in the area',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'While this performance is active, each target who starts their turn dying while in the area gains an edge on power rolls and ignores the effects of bleeding until the end of their turn.'
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
						level: 4,
						features: []
					},
					{
						level: 5,
						features: [
							{
								id: 'suMDtEOQggORQzn4',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'Qcz0plE7f3m2oMpE',
												name: 'Bolstering Banter',
												description: 'Once on each of your turns, you can use a free maneuver to exchange words with a target of your current performance, other than yourself. The target can spend a Recovery to gain temporary Stamina equal to their recovery value.',
												type: 'Text',
												data: null
											},
											value: 1
										},
										{
											feature: {
												id: 'k1vcKIoLARGr6Lsr',
												name: 'Medley',
												description: 'You can maintain two performances at a time using your Routines feature.',
												type: 'Text',
												data: null
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
						level: 6,
						features: [
							{
								id: 'VD8b06zsDjeJpzlX',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'KVEuxjzQu7tvcsxH',
												name: 'Feedback',
												description: 'Your music pounds the crowd to the beat until their hearts can’t stand it anymore.',
												type: 'Ability',
												data: {
													ability: {
														id: 'KVEuxjzQu7tvcsxH',
														name: 'Feedback',
														description: 'Your music pounds the crowd to the beat until their hearts can’t stand it anymore.',
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
																type: 'Special',
																value: 0,
																value2: 0,
																within: 0,
																special: 'Three 3 cubes within 1',
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
																text: 'A prone target ignores this ability.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '7 sonic damage; p < [weak], prone',
																	tier2: '10 sonic damage; p < [average], prone',
																	tier3: '13 sonic damage; p < [strong], prone'
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
												id: 'uPEJe3YMCKQ5no95',
												name: 'Legendary Drum Fill',
												description: 'You start a drumroll that roars like thunder with every impact the heroes make.',
												type: 'Ability',
												data: {
													ability: {
														id: 'uPEJe3YMCKQ5no95',
														name: 'Legendary Drum Fill',
														description: 'You start a drumroll that roars like thunder with every impact the heroes make.',
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
																text: 'Each target gains 1 surge, then gains 1 surge at the start of each combat round until the end of the encounter.'
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
								id: '17EPB8FMDm0rbPtb',
								name: 'Crowd Favorites',
								description: 'You have the following performance abilities, which are usable with your Routines feature.',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'cCAwy3SGtXi1BAgF',
											name: 'Moonlight Sonata',
											description: 'Music pours out of your heart, filling the area with the utmost delicacy and without damper.',
											type: 'Ability',
											data: {
												ability: {
													id: 'cCAwy3SGtXi1BAgF',
													name: 'Moonlight Sonata',
													description: 'Music pours out of your heart, filling the area with the utmost delicacy and without damper.',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Area',
														'Magic',
														'Performance'
													],
													distance: [
														{
															type: 'Aura',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Each ally in the area',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'While this performance is active, each target who is dead can choose to continue taking turns after death. On each of their turns, a target can move and use either a main action or a maneuver, but can’t spend Recoveries or use triggered actions. At the end of the encounter, each target who chose to take turns this way turns to dust and blows away.'
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
											id: 'uPCAVJRpZCks52hw',
											name: 'Radical Fantasia',
											description: '♪ Viras, my Viras, will you hold their hands as they cryyy-aaaiigh? ♪',
											type: 'Ability',
											data: {
												ability: {
													id: 'uPCAVJRpZCks52hw',
													name: 'Radical Fantasia',
													description: '♪ Viras, my Viras, will you hold their hands as they cryyy-aaaiigh? ♪',
													type: {
														usage: 'No Action',
														free: false,
														trigger: '',
														time: '',
														qualifiers: []
													},
													keywords: [
														'Area',
														'Magic',
														'Performance'
													],
													distance: [
														{
															type: 'Aura',
															value: 5,
															value2: 0,
															within: 0,
															special: '',
															qualifier: ''
														}
													],
													target: 'Self and each ally in the area',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													sections: [
														{
															type: 'text',
															text: 'While this performance is active, each target who starts their turn in the area ignores difficult terrain, and any ability they use that imposes forced movement gains a +2 bonus to the forced movement distance until the end of their turn. Additionally, once per combat round, each target can use a triggered action as a free triggered action.'
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
						level: 9,
						features: [
							{
								id: 'H8CN7zqO4hRni29m',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'ZDIrJmxVMJMwBES0',
												name: 'Jam Session',
												description: 'Your jam session creates new genres that compel everyone to get up and move.',
												type: 'Ability',
												data: {
													ability: {
														id: 'ZDIrJmxVMJMwBES0',
														name: 'Jam Session',
														description: 'Your jam session creates new genres that compel everyone to get up and move.',
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
														minLevel: 1,
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '8 sonic damage',
																	tier2: '11 sonic damage',
																	tier3: '15 sonic damage'
																}
															},
															{
																type: 'text',
																text: 'Each creature within distance gains a +5 bonus to speed until the end of their next turn. While under this effect, each target must use their full movement during their turn.'
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
												id: 'eY09PeFg3MJJSua6',
												name: 'Melt Their Faces',
												description: 'The power of music rips through the reality around the target and blows them away.',
												type: 'Ability',
												data: {
													ability: {
														id: 'eY09PeFg3MJJSua6',
														name: 'Melt Their Faces',
														description: 'The power of music rips through the reality around the target and blows them away.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Melee',
															'Magic',
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
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '12 + P sonic damage; push 5',
																	tier2: '16 + P sonic damage; push 10',
																	tier3: '22 + P sonic damage; push 15'
																}
															},
															{
																type: 'text',
																text: 'Forced movement from this ability ignores stability.'
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
				value: 1
			},
			{
				characteristic: 'Intuition',
				value: -1
			},
			{
				characteristic: 'Presence',
				value: 2
			}
		]
	},
	career: {
		id: 'career-performer',
		name: 'Performer',
		description: 'You can sing, act, or dance well enough that people actually pay to see you do it. Imagine that!',
		features: [
			{
				id: 'performer-feature-1',
				name: 'Skill',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [
						'Music',
						'Perform'
					],
					listOptions: [],
					count: 1,
					selected: [
						'Perform'
					]
				}
			},
			{
				id: 'performer-feature-2',
				name: 'Interpersonal Skills',
				description: '',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Interpersonal'
					],
					count: 2,
					selected: [
						'Rumors',
						'Society'
					]
				}
			},
			{
				id: 'performer-feature-3',
				name: 'Renown',
				description: '',
				type: 'Bonus',
				data: {
					field: 'Renown',
					value: 2,
					valueCharacteristics: [],
					valueCharacteristicMultiplier: 1,
					valuePerLevel: 0,
					valuePerEchelon: 0
				}
			},
			{
				id: 'performer-feature-4',
				name: 'Interpersonal Perk',
				description: '',
				type: 'Perk',
				data: {
					lists: [
						'Interpersonal'
					],
					count: 1,
					selected: [
						{
							id: 'perk-harmonizer',
							name: 'Harmonizer',
							description: 'You can make a Presence test using the Music skill to influence creatures who don’t have emotions or can’t understand you. Additionally, once during a negotiation when an ally makes an argument, you can play music to give that ally an edge on their test.',
							type: 'Text',
							data: null,
							list: 'Interpersonal'
						}
					]
				}
			}
		],
		incitingIncidents: {
			options: [
				{
					id: 'career-performer-ii-1',
					name: 'Cursed Audience',
					description: 'During a performance, you watched in horror as the audience was suddenly overcome by a curse that caused them to disintegrate before your eyes. You aren’t sure what happened, but seeking an answer quickly led you to places where only heroes dare to go.'
				},
				{
					id: 'career-performer-ii-2',
					name: 'False Accolades',
					description: 'After a poor performance, you found a script to a well-written play left in your dressing room. The accompanying note asked that if you performed the play, you should give the author credit. But after a commanding performance, you claimed to be star and playwright both - and the curse hidden on those pages activated. A small portion of your skin has begun to transform into undead flesh, and the only cure is to prove you have become selfless.'
				},
				{
					id: 'career-performer-ii-3',
					name: 'Fame and Fortune',
					description: 'You thought you were famous - then that hero came to your show. Suddenly, all eyes were on the dragon-slaying brute instead of on the stage where they belonged. The audience even gave them a standing ovation when they entered the room. All you got was polite applause. Fine. If people want a hero so much, then a hero you shall be.'
				},
				{
					id: 'career-performer-ii-4',
					name: 'Songs to the Dead',
					description: 'Your performances have always been tinged with a bit of melancholy. During a particularly soulful performance, spirits disturbed the living audience and sat in their chairs. They begged you to prevent their demise, providing no other details before disappearing. You set out to see if you could help your most dedicated fans.'
				},
				{
					id: 'career-performer-ii-5',
					name: 'Speechless',
					description: 'A heckler’s mocking words left you utterly speechless during a performance, stinging your pride and stirring your arrogance. The incident strained your legendary voice, and you could only speak in soft whispers. The heckler was a fey trickster who stole your voice, promising to give it back after you accomplished real good in the world.'
				},
				{
					id: 'career-performer-ii-6',
					name: 'Tragic Lesson',
					description: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward the producer inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you made it your responsibility to protect others.'
				}
			],
			selected: {
				id: 'career-performer-ii-6',
				name: 'Tragic Lesson',
				description: 'When a producer who once shortchanged you shouted out on the street for you to stop a thief who had picked their pocket, your spite toward the producer inspired you to let the thief run right on by. But that decision led to tragedy when the thief later harmed someone you loved. From that moment on, you made it your responsibility to protect others.'
			},
			selectedID: 'career-performer-ii-6'
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
