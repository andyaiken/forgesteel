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
				description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on Agility tests made to hide and sneak, and tests made to find you while you are hidden take a bane.',
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
								description: 'You can shift into difficult terrain.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'wode-elf-feature-2-2',
								name: 'Revisit Memory',
								description: 'Accessing memories is as easy as living in the present for you. You have an edge on all tests made to recall lore.',
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
								description: 'Your elf body and mind can’t be contained for long. You succeed on saving throws when you get a 5 or higher.',
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
											usage: 'Action',
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
												'Might',
												'Agility'
											],
											bonus: 0,
											tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
											tier2: '3 + M or A damage; A < [average] slowed (save ends)',
											tier3: '5 + M or A damage; A < [strong] restrained (save ends)'
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
							value: 2
						}
					],
					count: 3,
					selected: [
						{
							id: 'wode-elf-feature-2-3',
							name: 'Swift',
							description: '',
							type: 'Speed',
							data: {
								speed: 6
							}
						},
						{
							id: 'wode-elf-feature-2-4',
							name: 'Otherworldly Grace',
							description: 'Your elf body and mind can’t be contained for long. You succeed on saving throws when you get a 5 or higher.',
							type: 'Text',
							data: null
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
			'Yllyric'
		],
		environment: {
			id: 'env-wilderness',
			name: 'Wilderness',
			description: 'A wilderness culture doesn’t attempt to tame the terrain in which its people live, whether desert, forest, swamp, tundra, ocean, or more exotic climes. Instead, the folk of such a culture thrive amid nature, taking their sustenance and shelter from the land itself. A wilderness culture might be a circle of druids protecting a great wode, a band of brigands hiding out in desert caves, or a camp of orc mercenaries who call the trackless mountains home. People in a wilderness culture learn how to use the land for all they need to live, typically crafting their own tools, clothing, and more.',
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
			description: 'Bureaucratic cultures are steeped in official leadership and formally recorded laws. Members of such a culture are often ranked in power according to those laws, with a small group of people holding the power to rule according to birthright, popular vote, or some other official and measurable standard. Many bureaucratic communities have one person at the very top, though others might be ruled by a council. A trade guild with a guildmaster, treasurer, secretary, and a charter of rules and regulations for membership; a feudal lord who rules over a group of knights, who in turn rule over peasants who work the land; and a militaristic society with ranks and rules that its people must abide are all examples of bureaucratic cultures.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Intrigue',
					'Lore'
				],
				count: 1,
				selected: [
					'Rumors'
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
					'Perform'
				]
			}
		}
	},
	class: {
		id: 'class-troubadour',
		name: 'Troubadour',
		description: '\nThe whole world\'s a stage and everyone on it, an actor. No one knows this better than the troubadour. You find energy in the drama of everyday life and know how to draw spectacle forth from even the most mundane of situations. You accent highs and deepen lows in service to whomever would witness your performance.\n\nAnd beyond the mundane, there are insurmountable dangers that cause many a hero to cower. But the troubadour must chase that drama. The troubadour takes the world stage not to die, but to find out if they are truly alive.',
		heroicResource: 'Drama',
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
						id: 'troubadour-stamina',
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
						id: 'troubadour-recoveries',
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
						id: 'troubadour-1-1',
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
						id: 'troubadour-1-2',
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
								'Persuade',
								'Lead'
							]
						}
					},
					{
						id: 'troubadour-1-3',
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
								'Sneak'
							]
						}
					},
					{
						id: 'troubadour-1-4',
						name: 'Drama',
						description: '\nAt the start of each of your turns during combat, you gain 1d3 drama.\n\nAdditionally, you gain drama when certain events occur during battle:\n\n* **2 Drama**: Three or more heroes use an ability on the same turn for the first time.\n* **2 Drama**: A hero becomes winded for the first time (only once per encounter and not once per hero).\n* **3 Drama**: A creature within your line of effect rolls a natural 19 or 20.\n* **10 Drama**: A hero, including you, dies.\n\nYou still gain drama during combat if you are dead as long as your body is intact. During the encounter in which you died, if you have 30 drama, you can come back to life with 1 Stamina and 0 drama (no action required). You can’t gain drama in future encounters while you remain dead.',
						type: 'Text',
						data: null
					},
					{
						id: 'troubadour-1-5',
						name: 'Scene Partner',
						description: 'Whenever you use a skill from the interpersonal group on a test while interacting with an NPC (a bystander, a rival, and so forth) and you don’t fail the test, you can form a bond with that NPC. If you then enter into a negotiation with this NPC, their patience increases by 1, and any compelling arguments you personally make to the NPC that would increase their interest by 1 instead increase their interest by 2. You can have a number of such bonds active equal to your level, losing a bond of your choice whenever you make a new bond beyond your limit.',
						type: 'Text',
						data: null
					},
					{
						id: 'troubadour-1-6',
						name: 'Curtain Call',
						description: 'You enter every performance with a set of routines at the ready. Routines are auras and other wide-reaching effects that have the Routine keyword, and which center around you while you move through the fray. At the start of each round of combat, as long as you are not dazed, dead, or surprised, you can either set a new routine to be active or maintain your current routine (no action required). Your routine ends if you are unable to maintain it, or at the end of the encounter.',
						type: 'Text',
						data: null
					},
					{
						id: 'troubadour-1-7',
						name: 'Choreography',
						description: 'Taps, kicks, steps. Now it’s all “choreography.”',
						type: 'Ability',
						data: {
							ability: {
								id: 'troubadour-1-7',
								name: 'Choreography',
								description: 'Taps, kicks, steps. Now it’s all “choreography.”',
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
									'Routine'
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
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'While this routine is active, each target who starts their turn in the aura gains a +2 bonus to speed until the end of their turn.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'troubadour-1-8',
						name: 'Revitalizing Limerick',
						description: 'There once was a man from Capital…',
						type: 'Ability',
						data: {
							ability: {
								id: 'troubadour-1-8',
								name: 'Revitalizing Limerick',
								description: 'There once was a man from Capital…',
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
									'Routine'
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
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'While this routine is active, choose a number of targets equal to your Presence score at the end of your turn. Each chosen target can spend a Recovery.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'troubadour-1-9',
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
									description: 'If you want to be mobile and deal a lot of damage with melee attacks, then you should reach for the Swashbuckler kit. This is a great kit for heroes who want to be master duelists.',
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
											description: 'All combat is a dance - and you’ll be the one leading.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-swashbuckler-signature',
													name: 'Fancy Footwork',
													description: 'All combat is a dance - and you’ll be the one leading.',
													type: {
														usage: 'Action',
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
														tier1: '3 + M or A damage',
														tier2: '5 + M or A damage; push 1',
														tier3: '8 + M or A damage; push 2'
													},
													test: null,
													effect: 'You can shift into any square your target leaves after you force move them with this ability.',
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
						id: 'troubadour-1-10',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'troubadour-ability-4'
							]
						}
					},
					{
						id: 'troubadour-1-11',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'troubadour-ability-6'
							]
						}
					},
					{
						id: 'troubadour-1-12',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'troubadour-ability-9'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'troubadour-2-1',
						name: 'Appeal to the Muses',
						description: '\nYou can give a rousing speech, invoke your inspirations, or lift your fellows’ spirits to heighten the drama of your present circumstances. However, irony is eager to hand your fortune to the villain and achieve the same ends.\n\nWhenever you roll to gain 1d3 drama at the start of your turn, you can make your appeal to gain the following additional effects:\n\n* If the roll is a 1, you gain 1 additional drama. The Director also gains 1d3 Malice.\n* If the roll is a 2, you gain 1 Heroic Resource, which you can keep for yourself or give to an ally within the distance of your active routine. The Director also gains 1 Malice.\n* If the roll is a 3, you gain 2 Heroic Resources, which you can distribute among yourself and any allies within the distance of your active routine.',
						type: 'Text',
						data: null
					},
					{
						id: 'troubadour-2-2',
						name: 'Invocation',
						description: '',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'troubadour-2-2a',
										name: 'Allow Me To Introduce Tonight\'s Players',
										description: '',
										type: 'Ability',
										data: {
											ability: {
												id: 'troubadour-2-2a',
												name: 'Allow Me To Introduce Tonight\'s Players',
												description: '',
												type: {
													usage: 'Action',
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
												effect: 'Whenever you take the first turn in a combat encounter, you can introduce yourself and your allies to your opponents. Each creature on your side can shift up to their speed and gains the benefit of the Defend action until the end of the round. However, any enemies who were surprised are no longer surprised.',
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
										id: 'troubadour-2-2b',
										name: 'Formal Introductions',
										description: '\nAs a respite activity, you can scribe a notice of your arrival, such as a calling card or a formal letter, addressed to an enemy and have it delivered. You can deliver the notice to the target personally if you are in the same general area, send it by courier, or leave it in a covert location for the target to find. You can have only one notice active at a time.\n\nThe Director determines when the target receives your notice. Once the target receives the notice, they become alarmed and take desperate measures to stop you. The Director gains 1 additional Malice per round during future encounters involving the target. The heroes start each such encounter with 2 additional hero tokens. These hero tokens disappear at the end of the encounter.',
										type: 'Text',
										data: null
									},
									value: 1
								},
								{
									feature: {
										id: 'troubadour-2-2c',
										name: 'My Reputation Precedes Me',
										description: '\nYou can invoke your reputation at the start of a social interaction with a group of creatures who haven’t met you before, automatically creating a bond with a representative NPC as if using your Scene Partner feature. While the bond is active, all present heroes are treated as having Renown 2 higher than usual for the purpose of negotiations and influencing tests with the group.\n\nThe Director can choose to award the heroes with 1 Hero Token to stop you from forming this bond, making you infamous with the community instead. Until actions are taken to improve your reputations, all present heroes take a bane on tests using skills from the interpersonal skill group with the group of creatures. You can still use your Scene Partner feature to find allies within the community.',
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
						id: 'troubadour-2-3',
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
					}
				]
			},
			{
				level: 3,
				features: [
					{
						id: 'troubadour-3-1',
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
				id: 'troubadour-ability-1',
				name: 'Artful Flourish',
				description: 'And they said practicing fencing was a waste!',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Agility'
					],
					bonus: 0,
					tier1: '2 damage',
					tier2: '5 damage',
					tier3: '7 damage'
				},
				test: null,
				effect: 'You can shift up to 3 squares.',
				strained: '',
				alternateEffects: [],
				spend: [
					{
						value: 2,
						repeatable: true,
						effect: 'You can target one additional creature or object within distance for every 2 drama you spend.',
						name: ''
					}
				],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-2',
				name: 'Cutting Sarcasm',
				description: 'There you are, radiating your usual charisma.',
				type: {
					usage: 'Action',
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '2 + P psychic damage; P < [weak], bleeding (save ends)',
					tier2: '5 + P psychic damage; P < [average], bleeding (save ends)',
					tier3: '7 + P psychic damage; P < [strong], bleeding (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-3',
				name: 'Instigator',
				description: 'I didn’t do it! What?',
				type: {
					usage: 'Action',
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
						'Presence'
					],
					bonus: 0,
					tier1: '3 + P damage',
					tier2: '6 + P damage',
					tier3: '9 + P damage'
				},
				test: null,
				effect: 'The target is taunted by you or a willing ally adjacent to you until the end of the target’s next turn.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-4',
				name: 'Witty Banter',
				description: 'A lyrical (and physical) jab insults an enemy and inspires an ally.',
				type: {
					usage: 'Action',
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
					tier1: '4 + P psychic damage',
					tier2: '5 + P psychic damage',
					tier3: '7 + P psychic damage'
				},
				test: null,
				effect: 'One ally within 10 squares can end one effect on them that is ended by a saving throw or that ends at the end of their turn.',
				strained: '',
				alternateEffects: [],
				spend: [
					{
						value: 1,
						effect: 'The chosen ally can also spend a Recovery.',
						name: '',
						repeatable: false
					}
				],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-5',
				name: 'Harsh Critic',
				description: 'Just one bad review will ruin their day.',
				type: {
					usage: 'Action',
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
				target: '1 creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '7 + P sonic damage',
					tier2: '10 + P sonic damage',
					tier3: '13 + P sonic damage'
				},
				test: null,
				effect: 'The first time the target uses an ability before the start of your next turn, any tier-related effects of that ability other than damage are suppressed, negating those effects for all targets. Ability effects that always happen regardless of the power roll work as usual.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-6',
				name: 'Hypnotic Overtones',
				description: 'You produce an entrancing note that twists the senses in a spectacular fashion.',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: 'Slide 1; I < [weak], dazed (save ends)',
					tier2: 'Slide 1; I < [average], dazed (save ends)',
					tier3: 'Slide 2; I < [strong], dazed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [
					{
						value: 2,
						repeatable: true,
						effect: 'The size of the burst is increased by 1 for every 2 drama you spend.',
						name: ''
					}
				],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-7',
				name: 'Quick Rewrite',
				description: 'You write something unforeseen into the scene that hinders your enemy.',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '4 damage; P < [weak], slowed (save ends)',
					tier2: '5 damage; P < [average], slowed (save ends)',
					tier3: '6 damage; P < [strong], restrained (save ends)'
				},
				test: null,
				effect: 'The area becomes difficult terrain for enemies.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-8',
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
				preEffect: 'You shift up to your speed. You make one power roll that targets each enemy who becomes adjacent to you during the shift.',
				powerRoll: {
					characteristic: [
						'Agility',
						'Presence'
					],
					bonus: 0,
					tier1: 'Taunted (EoT); A < [weak], prone',
					tier2: 'Taunted (EoT); A < [average], prone',
					tier3: 'Taunted (EoT); A < [strong], prone and can’t stand (EoT)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-9',
				name: 'Dramatic Reversal',
				description: 'Give the audience a surprise.',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: 'The target can shift 1 square and make a free strike.',
					tier2: 'The target can shift up to 2 squares and make a free strike with an edge.',
					tier3: 'The target can shift up to 3 squares and make a free strike with an edge, then can spend a Recovery.'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-10',
				name: 'Fake your Death',
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
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'You turn invisible and create a magical illusion of your corpse falling in your space. While you are invisible, you gain a +3 bonus to speed and you ignore difficult terrain. The illusion melts into the ground and your invisibility ends at the end of your next turn, or earlier if the illusion is interacted with, if you take damage, or if you use an action or a maneuver.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-11',
				name: 'Flip the Script',
				description: 'You try a different take on events, justifying the new locations everyone ended up in.',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Each target can immediately teleport up to 5 squares. Any teleported target who was slowed is no longer slowed.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-12',
				name: 'Method Acting',
				description: 'They’re so hurt by your performance, you sort of start to believe it yourself.',
				type: {
					usage: 'Action',
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
						'Agility'
					],
					bonus: 0,
					tier1: '6 + A damage; P < [weak], weakened (save ends)',
					tier2: '10 + A damage; P < [average], weakened (save ends)',
					tier3: '14 + A damage; P < [strong], weakened (save ends)'
				},
				test: null,
				effect: 'You can become bleeding (save ends) to deal an additional 5 corruption damage to the target.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-13',
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
					'Magic',
					'Ranged'
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: 'Slide 3; P < [weak], this slide ignores the target’s stability.',
					tier2: 'Slide 5; P < [average], this slide ignores the target’s stability.',
					tier3: 'Slide 7; P < [strong], this slide ignores the target’s stability.'
				},
				test: null,
				effect: 'Instead of sliding a target, you can swap their location with another target as long as each can fit into the other’s space. You can’t slide targets into other creatures or objects using this ability.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-14',
				name: 'Infernal Gavotte',
				description: 'A spicy performance lights a fire under your allies’ feet.',
				type: {
					usage: 'Action',
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
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '5 fire damage; A < [weak], weakened (save ends)',
					tier2: '7 fire damage; A < [average], weakened (save ends)',
					tier3: '10 fire damage; A < [strong], weakened (save ends)'
				},
				test: null,
				effect: 'Each ally in the area can shift up to 2 squares.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-15',
				name: 'Virtuoso\'s Solo',
				description: 'Your performance travels and doesn’t stop moving until your audience is completely rocked.',
				type: {
					usage: 'Action',
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
				target: '1 creature or object',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Presence'
					],
					bonus: 0,
					tier1: '5 + P damage',
					tier2: '8 + P damage; push 3',
					tier3: '11 + P damage; push 5'
				},
				test: null,
				effect: 'You can choose to have this ability deal sonic damage. Additionally, you can use this ability on the same target for the next 2 rounds without spending drama.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'troubadour-ability-16',
				name: 'We Meet At Last; Let\'s Finish This',
				description: 'Totus mundus agit histrionem.',
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
				target: '1 creature',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: '\nUntil the end of the encounter, both you and the target can target each other with abilities even if you are beyond distance, with the distance of this ability replacing those abilities’ distances. Abilities that grapple or force move a target are ignored if the target isn’t within the distance of the ability.\n\nAdditionally, on each of your turns, you can use a free maneuver to communicate a motivating or dispiriting message to the target, either giving them two surges or a bane on the next attack they use before the start of your next turn.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			}
		],
		subclasses: [
			{
				id: 'troubadour-sub-1',
				name: 'Duelist',
				description: 'Drama embraces your every movement done in tandem with another. You perform dances of death, putting trust in your opponent to return your passion in kind.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'troubadour-sub-1-1-0',
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
								id: 'troubadour-sub-1-1-1',
								name: 'Acrobatics',
								description: 'Folks love a good tumble.',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-1-1-1',
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
											'Routine'
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
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'While this routine is active, any target who starts their turn in the aura can automatically obtain a tier 3 result on one test made to jump, tumble, or climb as part of their movement before the end of their turn.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-1-1-2',
								name: 'Star Power',
								description: 'You’re the one they came to see!',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-1-1-2',
										name: 'Star Power',
										description: 'You’re the one they came to see!',
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
										effect: 'You gain a +2 bonus to speed until the end of your turn. Additionally, the next power roll you make this turn can’t have a result lower than tier 2.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 2,
												effect: 'You gain a +4 bonus to speed instead.',
												name: '',
												repeatable: false
											}
										],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-1-1-3',
								name: 'Riposte',
								description: '“I’d have brought treats had I known I’d be fighting a dog.”',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-1-1-3',
										name: 'Riposte',
										description: '“I’d have brought treats had I known I’d be fighting a dog.”',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target takes damage from a melee strike.',
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
										target: 'Self or one ally',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'The target makes a free strike against the triggering striker.',
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
								id: 'troubadour-sub-1-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'troubadour-sub-1-2-1a',
												name: 'Classic Chandelier Stunt',
												description: 'Audiences love this bit.',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-1-2-1a',
														name: 'Classic Chandelier Stunt',
														description: 'Audiences love this bit.',
														type: {
															usage: 'Action',
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
														target: 'Self and 1 willing ally',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'Each target shifts up to 5 squares, and can shift vertically. Both targets must end this movement adjacent to each other and on solid ground. Each target can then make a melee free strike that deals additional damage equal to twice their highest characteristic score.',
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
												id: 'troubadour-sub-1-2-1b',
												name: 'En Garde!',
												description: 'Wait it’s … Guard! Turn! Perry! Dodge! Spin! Thrust! Hah!',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-1-2-1b',
														name: 'En Garde!',
														description: 'Wait it’s … Guard! Turn! Perry! Dodge! Spin! Thrust! Hah!',
														type: {
															usage: 'Action',
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
																'Agility'
															],
															bonus: 0,
															tier1: '6 + A damage; the target can shift up to 3 squares and make a free strike against you',
															tier2: '9 + A damage; the target can shift up to 2 squares and make a free strike against you',
															tier3: '13 + A damage; the target can shift 1 square'
														},
														test: null,
														effect: 'If the target shifts or makes a free strike against you as a result of this ability, you can shift up to 3 squares and make a melee free strike against the target.',
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
						features: [
							{
								id: 'troubadour-sub-1-3-1',
								name: 'Foil',
								description: 'Choose one creature within line of effect at the start of an encounter. You have a double edge on power rolls made against or in competition with that creature. The chosen creature also has a double edge on power rolls made against or in competition with you. If the creature dies, you can choose a new foil at the start of the next round.',
								type: 'Text',
								data: null
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'troubadour-sub-2',
				name: 'Skald',
				description: 'You seek drama from story and recount, using your magic to manipulate the sequence of events unfolding before you.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'troubadour-sub-2-1-0',
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
								id: 'troubadour-sub-2-1-1',
								name: 'Blocking',
								description: 'No, no, no, you lose the audience that way. Try it like this …',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-2-1-1',
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
											'Routine'
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
										target: 'Special',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'At the end of each of your turns while this routine is active, you can choose a number of creatures equal to your Presence score in the aura, causing those creatures to be teleported to unoccupied squares in the aura. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-2-1-2',
								name: 'Dramatic Monologue',
								description: 'It doesn’t need to make sense. Just say it with emotionality.',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-2-1-2',
										name: 'Dramatic Monologue',
										description: 'It doesn’t need to make sense. Just say it with emotionality.',
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
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: '\nChoose one of the following effects:\n\n* You orate a rousing tale of victory. One ally within distance gains an edge on the next power roll they make before the start of your next turn.\n* You weave a tale of high stakes heroics. One ally within distance gains a surge.\n* You insult a foe where they’re most vulnerable. That foe takes a bane on the next power roll they make before the end of their next turn.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'You can choose two targets for any of these effects.',
												name: '',
												repeatable: false
											}
										],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-2-1-3',
								name: 'Turnabout is Fair Play',
								description: 'All’s fair in love and whatever.',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-2-1-3',
										name: 'Turnabout is Fair Play',
										description: 'All’s fair in love and whatever.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target makes an ability power roll with at least one edge or bane.',
											time: '',
											qualifiers: []
										},
										keywords: [],
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
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'One of the edges becomes a bane or vice versa.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 3,
												effect: 'One of the edges becomes a double bane, or one of the attack’s banes becomes a double edge.',
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
								id: 'troubadour-sub-2-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'troubadour-sub-2-2-1a',
												name: 'Guest Star',
												description: 'We offered them a percentage of the gross. So they’re working for free!',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-2-2-1a',
														name: 'Guest Star',
														description: 'We offered them a percentage of the gross. So they’re working for free!',
														type: {
															usage: 'Action',
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
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'Either a bystander within distance is uplifted by your magic, or a mysterious new hero appears in an unoccupied space to help out during the encounter. This guest star is controlled by you, has their own turn, shares your characteristics. Their stamina is maximum is half yours. They have no abilities other than your melee and ranged free strikes. When the target is reduced to 0 Stamina or at the end of the encounter, they retreat or revert to a bystander. An individual bystander can’t be uplifted in this way more than once in an encounter.',
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
												id: 'troubadour-sub-2-2-1b',
												name: 'Twist at the End',
												description: 'You didn’t see that coming, did you?!',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-2-2-1b',
														name: 'Twist at the End',
														description: 'You didn’t see that coming, did you?!',
														type: {
															usage: 'Action',
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
														target: '1 dead enemy',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'As long as the target is not a leader or a solo creature, they come back to life with half their Stamina and become an ally under the Director’s control. The players can discuss with the Director when the target takes their turn each round. The target turns to dust and blows away at the end of the encounter.',
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
						features: [
							{
								id: 'troubadour-sub-2-3-1',
								name: 'Recast a Supporting Part',
								description: 'If you aren’t surprised at the beginning of an encounter, you can choose one enemy within line of effect who isn’t a leader or a solo creature. The director swaps that creature out with a squad of minions whose encounter value doesn’t exceed the chosen creature’s encounter value. The Director can determine that this feature can’t be used against certain special enemies.',
								type: 'Text',
								data: null
							}
						]
					}
				],
				selected: false
			},
			{
				id: 'troubadour-sub-3',
				name: 'Virtuoso',
				description: 'You find drama in music and song, weaving magic between the vibrations of your sound and filling the audience with your pathos.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'troubadour-sub-3-1-0',
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
								id: 'troubadour-sub-3-1-1',
								name: 'Power Chord',
								description: 'Your instrument rings true and your music blows everyone away.',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-1-1',
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
										preEffect: '',
										powerRoll: {
											characteristic: [
												'Presence'
											],
											bonus: 0,
											tier1: 'Push 1',
											tier2: 'Push 2',
											tier3: 'Push 3'
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
							{
								id: 'troubadour-sub-3-1-2',
								name: 'Thunder Mother',
								description: 'All for thunder motherrr! 🎵 Run and hide for coverrr! 🎵',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-1-2',
										name: 'Thunder Mother',
										description: 'All for thunder motherrr! 🎵 Run and hide for coverrr! 🎵',
										type: {
											usage: 'No Action',
											free: false,
											trigger: '',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Magic',
											'Ranged',
											'Routine',
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
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: 'At the end of each round while this routine is active, make a power roll that ignores cover. You can’t target the same creature twice with this effect.',
										powerRoll: {
											characteristic: [
												'Presence'
											],
											bonus: 0,
											tier1: 'Lightning damage equal to your level',
											tier2: 'Lightning damage equal to 5 + your level',
											tier3: 'Lightning damage equal to 10 + your level'
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
							{
								id: 'troubadour-sub-3-1-3',
								name: 'Ballad of the Beast',
								description: 'Teeth are bare! 🎵 Eyes black! 🎵 No escaping the beast! 🎵',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-1-3',
										name: 'Ballad of the Beast',
										description: 'Teeth are bare! 🎵 Eyes black! 🎵 No escaping the beast! 🎵',
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
											'Routine'
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
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'While this routine is active, each target who starts their turn in the aura gains a surge.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-3-1-4',
								name: 'Harmonize',
								description: 'Give the chorus a little punch.',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-1-4',
										name: 'Harmonize',
										description: 'Give the chorus a little punch.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target uses a non-area ability that targets one enemy.',
											time: '',
											qualifiers: []
										},
										keywords: [],
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
										target: '1 ally',
										cost: 3,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'The target chooses an additional target for the triggering ability within distance of that ability. They use the original power roll for all additional targets. Any damage dealt to an additional target is sonic damage.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 2,
												effect: 'The target chooses two additional targets instead of one.',
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
								id: 'troubadour-sub-3-2-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'troubadour-sub-3-2-1a',
												name: 'Encore',
												description: 'Again! Again!',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-3-2-1a',
														name: 'Encore',
														description: 'Again! Again!',
														type: {
															usage: 'Action',
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
																special: 'Special',
																qualifier: ''
															}
														],
														target: 'Special',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'You recreate and enact a strike you have observed this round. The strike can’t be one that uses Malice. When you make the strike, you use your Presence score for any power rolls, and any damage you deal is sonic damage.',
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
												id: 'troubadour-sub-3-2-1b',
												name: 'Tough Crowd',
												description: 'Your fans don’t seem to like the opening act …',
												type: 'Ability',
												data: {
													ability: {
														id: 'troubadour-sub-3-2-1b',
														name: 'Tough Crowd',
														description: 'Your fans don’t seem to like the opening act …',
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
														target: 'Special',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: 'The affected area becomes haunted by a swirling horde of phantoms until the end of the encounter. Any ally can enter any square of the area without spending movement. At the end of each of your turns, you can make a power roll against each enemy in the area.',
														powerRoll: {
															characteristic: [
																'Presence'
															],
															bonus: 0,
															tier1: '5 corruption damage; M < [weak], pull 1 toward the center of the area',
															tier2: '9 corruption damage; M < [average], pull 2 toward the center of the area',
															tier3: '12 corruption damage; M < [strong], pull 3 toward the center of the area'
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
						features: [
							{
								id: 'troubadour-sub-3-3-1',
								name: 'Fire Up the Night',
								description: 'Maybe you and I 🎵 We can still bring the light! 🎵',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-3-1',
										name: 'Fire Up the Night',
										description: 'Maybe you and I 🎵 We can still bring the light! 🎵',
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
											'Routine'
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
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'While this routine is active, each target who starts their turn in the aura doesn’t take a bane on attacks against a creature with concealment. They can also search for hidden creatures as a free maneuver once during their turn.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'troubadour-sub-3-3-2',
								name: 'Neverending Hero',
								description: 'And toniiight we can truly say 🎵 They will alllways find a way! 🎵',
								type: 'Ability',
								data: {
									ability: {
										id: 'troubadour-sub-3-3-2',
										name: 'Neverending Hero',
										description: 'And toniiight we can truly say 🎵 They will alllways find a way! 🎵',
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
											'Routine'
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
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'While this routine is active, each target who starts their turn dying while in the aura gains an edge on power rolls and ignores the effects of bleeding until the end of their turn.',
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
				selected: true
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
						'Music'
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
						'Flirt',
						'Brag'
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
							description: '\nFor you, music is a universal language.\n\n* You can make a Presence test with the music skill to influence creatures even if you don’t share a language.\n* Once during a negotiation when an ally makes an argument, you can play music to give them an edge on their test.',
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
			selectedID: 'career-performer-ii-4'
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
