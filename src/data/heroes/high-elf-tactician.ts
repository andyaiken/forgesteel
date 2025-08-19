import { Hero } from '../../models/hero';

export const highElfTactician = {
	id: '7it9NqSWNlAo8JeB',
	name: 'The Earth Cries The Skies Divide',
	picture: null,
	folder: '',
	settingIDs: [
		'',
		'orden'
	],
	ancestry: {
		id: 'ancestry-high-elf',
		name: 'Elf (high)',
		description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elves remember a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
		features: [
			{
				id: 'high-elf-feature-1',
				name: 'High Elf Glamor',
				description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you look and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.',
				type: 'Text',
				data: null
			},
			{
				id: 'high-elf-feature-2',
				name: 'High Elf Features',
				description: '',
				type: 'Choice',
				data: {
					options: [
						{
							feature: {
								id: 'high-elf-feature-2-1',
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
								id: 'high-elf-feature-2-2',
								name: 'High Senses',
								description: 'You have senses that are keen and perceptive. You have an edge on Intuition tests that use the Awareness skill.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'high-elf-feature-2-3',
								name: 'Revisit Memory',
								description: 'Accessing memories is as easy as living in the present for you. You have an edge on all tests made to recall lore.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'high-elf-feature-2-4',
								name: 'Otherwordly Grace',
								description: 'Your elf body and mind can’t be contained for long. You succeed on saving throws when you get a 5 or higher.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'high-elf-feature-2-5',
								name: 'Unstoppable Mind',
								description: 'Your mind allows you to maintain your focus in any situation. You can’t be dazed.',
								type: 'Text',
								data: null
							},
							value: 2
						}
					],
					count: 3,
					selected: [
						{
							id: 'high-elf-feature-2-2',
							name: 'High Senses',
							description: 'You have senses that are keen and perceptive. You have an edge on Intuition tests that use the Awareness skill.',
							type: 'Text',
							data: null
						},
						{
							id: 'high-elf-feature-2-4',
							name: 'Otherwordly Grace',
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
		id: 'culture-high-elf',
		name: 'High Elf',
		description: 'Secluded, bureaucratic, martial.',
		languages: [
			'Hyrallic'
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
					'Persuade'
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
					'Search'
				]
			}
		},
		upbringing: {
			id: 'up-martial',
			name: 'Martial',
			description: 'Heroes who have a martial upbringing are raised by warriors. These might be the soldiers of an established army, a band of mercenaries, a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat. Heroes with a martial upbringing are always ready for a fight - and they know how to finish that fight.',
			type: 'Skill Choice',
			data: {
				options: [
					'Alertness',
					'Blacksmithing',
					'Climb',
					'Endurance',
					'Fletching',
					'Intimidate',
					'Jump',
					'Monsters',
					'Ride',
					'Track'
				],
				listOptions: [],
				count: 1,
				selected: [
					'Intimidate'
				]
			}
		}
	},
	class: {
		id: 'class-tactician',
		name: 'Tactician',
		description: '\nStrategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.\n\nAs a tactician, you have abilities that heal your allies and grant them increased damage, movement, and attacks.',
		heroicResource: 'Focus',
		subclassName: 'Tactical Doctrine',
		subclassCount: 1,
		primaryCharacteristicsOptions: [
			[
				'Might',
				'Reason'
			]
		],
		primaryCharacteristics: [
			'Might',
			'Reason'
		],
		featuresByLevel: [
			{
				level: 1,
				features: [
					{
						id: 'tatician-stamina',
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
						id: 'tactician-recoveries',
						name: 'Recoveries',
						description: '',
						type: 'Bonus',
						data: {
							field: 'Recoveries',
							value: 10,
							valueCharacteristics: [],
							valueCharacteristicMultiplier: 1,
							valuePerLevel: 0,
							valuePerEchelon: 0
						}
					},
					{
						id: 'tactician-1-1',
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
						id: 'tactician-1-2',
						name: 'Skills',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [
								'Alertness',
								'Architecture',
								'Blacksmithing',
								'Brag',
								'Culture',
								'Empathize',
								'Fletching',
								'Mechanics',
								'Monsters',
								'Search',
								'Strategy'
							],
							listOptions: [
								'Exploration'
							],
							count: 2,
							selected: [
								'Monsters',
								'Strategy'
							]
						}
					},
					{
						id: 'tactician-1-3',
						name: 'Focus',
						description: 'At the start of each of your turns during combat, you gain 2 focus. The first time each round that you or an ally damages a target you have marked, you gain 1 focus. The first time in a round that an ally within 10 squares of you uses a heroic ability, you gain 1 focus.',
						type: 'Text',
						data: null
					},
					{
						id: 'tactician-1-4',
						name: 'Field Arsenal',
						description: '',
						type: 'Kit',
						data: {
							types: [
								''
							],
							count: 2,
							selected: [
								{
									id: 'kit-rapid-fire',
									name: 'Rapid Fire',
									description: 'The Rapid-Fire kit is for archers who want to deal maximum damage by shooting as many arrows as possible into nearby enemies. With this kit, your fighting technique focuses on peppering foes at medium range.',
									type: '',
									armor: [
										'Light Armor'
									],
									weapon: [
										'Bow'
									],
									stamina: 3,
									speed: 1,
									stability: 0,
									meleeDamage: null,
									rangedDamage: {
										tier1: 2,
										tier2: 2,
										tier3: 2
									},
									meleeDistance: 0,
									rangedDistance: 7,
									disengage: 1,
									features: [
										{
											id: 'kit-rapid-fire-signature',
											name: 'Two Shot',
											description: 'When you fire two arrows back to back, both hit their mark.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-rapid-fire-signature',
													name: 'Two Shot',
													description: 'When you fire two arrows back to back, both hit their mark.',
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
													target: 'Two creatures or objects',
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
														tier1: '2 damage',
														tier2: '4 damage',
														tier3: '6 damage'
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
								},
								{
									id: 'kit-shining-armor',
									name: 'Shining Armor',
									description: 'The Shining Armor kit provides the most protection a kit can afford, providing you with the sword, shield, and armor necessary to play the prototypical knight.',
									type: '',
									armor: [
										'Heavy Armor',
										'Shield'
									],
									weapon: [
										'Medium Weapon'
									],
									stamina: 12,
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
									disengage: 0,
									features: [
										{
											id: 'kit-shining-armor-signature',
											name: 'Protective Attack',
											description: 'The strength of your assault makes it impossible for your foe to ignore you.',
											type: 'Ability',
											data: {
												ability: {
													id: 'kit-shining-armor-signature',
													name: 'Protective Attack',
													description: 'The strength of your assault makes it impossible for your foe to ignore you.',
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
															'Might',
															'Agility'
														],
														bonus: 0,
														tier1: '3 + M or A damage',
														tier2: '6 + M or A damage',
														tier3: '9 + M or A damage'
													},
													test: null,
													effect: 'The target is taunted (EoT).',
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
						id: 'tactician-1-5',
						name: 'Mark',
						description: 'You draw your allies’ attention to a specific foe - with devastating effect.',
						type: 'Ability',
						data: {
							ability: {
								id: 'tactician-1-5',
								name: 'Mark',
								description: 'You draw your allies’ attention to a specific foe - with devastating effect.',
								type: {
									usage: 'Maneuver',
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
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: '\nThe target is marked by you until the end of the encounter, you die, you use this ability again, or you willingly end this effect (no action required). If another tactician marks the target, then your mark on the target ends. You can have one target marked this way, but other tactician abilities can allow you to have multiple marked creatures.\n\nWhile the target is marked and within your line of effect, you and allies within your line of effect have an edge on power rolls made against the target.\n\nWhen the marked creature is reduced to 0 Stamina, you can use a free triggered action to move the mark to a new target within 10 squares.\n\nIn addition, you can spend 1 focus to take one of the following free triggered actions whenever you or an ally damages a target with an ability. You can’t use more than one instance of a benefit per trigger:\n\n* The ability deals additional damage equal to twice your Reason score.\n* The damage dealer can spend a Recovery.\n* The damage dealer can shift up to a number of squares equal to your Reason score.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'tactician-1-6',
						name: 'Strike Now!',
						description: 'Your foe left an opening. You point this out to an ally!',
						type: 'Ability',
						data: {
							ability: {
								id: 'tactician-1-6',
								name: 'Strike Now!',
								description: 'Your foe left an opening. You point this out to an ally!',
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
								target: 'One ally',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								preEffect: '',
								powerRoll: null,
								test: null,
								effect: 'The target can make a signature attack as a free triggered action.',
								strained: '',
								alternateEffects: [],
								spend: [
									{
										value: 5,
										effect: 'You target two allies instead of one.',
										name: '',
										repeatable: false
									}
								],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'tactician-1-7',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'tactician-ability-2'
							]
						}
					},
					{
						id: 'tactician-1-8',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 5,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'tactician-ability-7'
							]
						}
					}
				]
			},
			{
				level: 2,
				features: [
					{
						id: 'tactician-2-1',
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
						id: 'tactician-3-1',
						name: 'Out of Position',
						description: 'You are prepared for all eventualities.',
						type: 'Ability',
						data: {
							ability: {
								id: 'tactician-3-1',
								name: 'Out of Position',
								description: 'You are prepared for all eventualities.',
								type: {
									usage: 'Triggered Action',
									free: true,
									trigger: 'At the start of an encounter',
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
								effect: 'You use your Mark ability against an enemy you have line of effect to, even if you are surprised. You can then immediately slide the marked target up to 3 squares, ignoring their stability. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.',
								strained: '',
								alternateEffects: [],
								spend: [],
								persistence: [], sections: []
							}
						}
					},
					{
						id: 'tactician-3-2',
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
				id: 'tactician-ability-1',
				name: 'Battle Cry',
				description: 'You shout a phrase that galvanizes your team.',
				type: {
					usage: 'Maneuver',
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
				target: 'Three allies',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Reason'
					],
					bonus: 0,
					tier1: 'the target gains one surge',
					tier2: 'the target gains two surges',
					tier3: 'the target gains three surges'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-2',
				name: 'Concussive Strike',
				description: 'Your precise strike leaves your foe struggling to respond.',
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M damage; M < [weak], dazed (save ends)',
					tier2: '5 + M damage; M < [average], dazed (save ends)',
					tier3: '8 + M damage; M < [strong], dazed (save ends)'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-3',
				name: 'Inspiring Strike',
				description: 'Your attack gives an ally hope.',
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '3 + M damage; you or one ally within 10 squares can spend a Recovery',
					tier2: '5 + M damage; you or one ally within 10 squares can spend a Recovery',
					tier3: '8 + M damage; you or one ally within 10 squares can spend a Recovery, and each of you gains an edge on the next ability power roll they make in the encounter'
				},
				test: null,
				effect: '',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-4',
				name: 'Squad! Forward!',
				description: 'On your command, you and your allies force back the enemy line.',
				type: {
					usage: 'Maneuver',
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
				target: 'Self and two allies',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Each target can move their speed.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-5',
				name: 'Hammer And Anvil',
				description: '“Let’s not argue about who’s the hammer and who’s the anvil!',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '5 + M damage; one ally within 10 squares can make a signature strike against the target as a free triggered action',
					tier2: '9 + M damage; one ally within 10 squares can make a signature strike that gains an edge against the target as a free triggered action',
					tier3: '12 + M damage; two allies within 10 squares can each make a signature strike that gains an edge against the target as free triggered actions'
				},
				test: null,
				effect: 'If the target is reduced to 0 Stamina and a strike granted by this ability hasn’t been made, the striker can pick a different target.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-6',
				name: 'The Mind Game',
				description: 'Your attack demoralizes your foe. Your allies begin to think you can win.',
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: 'You mark the target.',
				powerRoll: {
					characteristic: [
						'Might'
					],
					bonus: 0,
					tier1: '4 + M damage; R < [weak], weakened (save ends)',
					tier2: '6 + M damage; R < [average], weakened (save ends)',
					tier3: '10 + M damage; R < [strong], weakened (save ends)'
				},
				test: null,
				effect: 'The first time any ally deals damage any target you’ve marked before the start of your next turn, that ally can spend a Recovery.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-7',
				name: 'Now!',
				description: 'Your allies wait for your command - then unleash death!',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
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
				target: 'Three allies',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Each target can make a free strike.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-8',
				name: 'This Is What We Planned For',
				description: 'All those coordination drills you made them do finally pay off.',
				type: {
					usage: 'Maneuver',
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
				target: 'Two allies',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				preEffect: '',
				powerRoll: null,
				test: null,
				effect: 'Each target who hasn’t acted yet this round can take their turn in any order immediately after yours.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-9',
				name: 'Double Envelopment',
				description: 'Historians will write about this day.',
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
				effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, they gain two surges, which they can use immediately.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-10',
				name: 'Frontal Assault',
				description: 'The purpose of a charge is to break their morale and force a retreat.',
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
				effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage a target marked by you, the damage dealer can push the target up to 2 squares, then shift up to 2 squares. Additionally, any ally using the Charge action to attack a target marked by you can use a signature or heroic ability in place of a melee free strike.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-11',
				name: 'Rout',
				description: 'The tide begins to turn.',
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
				effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, if that target has R < [average], they are frightened of the damage dealer (save ends).',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'tactician-ability-12',
				name: 'Stay Strong and Focus',
				description: 'We can do this! Keep faith and hold fast!',
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
				effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, the damage dealer can spend a Recovery.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			}
		],
		subclasses: [
			{
				id: 'tactician-sub-1',
				name: 'Insurgent',
				description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. By contrast, you’ll do whatever it takes to keep your allies alive.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'tactician-sub-1-1-1',
								name: 'Intrigue Skill',
								description: '',
								type: 'Skill Choice',
								data: {
									options: [],
									listOptions: [
										'Intrigue'
									],
									count: 1,
									selected: []
								}
							},
							{
								id: 'tactician-sub-1-1-2',
								name: 'Covert Operations',
								description: 'While in your presence or working according to your plans, each of your allies gains an edge on tests with any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist on any test made with a skill from the intrigue group. At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of negotiation.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-1-1-3',
								name: 'Advanced Tactics',
								description: 'Your leadership aids an ally.',
								type: 'Ability',
								data: {
									ability: {
										id: 'tactician-sub-1-1-3',
										name: 'Advanced Tactics',
										description: 'Your leadership aids an ally.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target deals damage to another creature.',
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
										target: 'Any creature',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'The target gains two surges, which they can use on the triggering damage.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'If any effect of the damage has a potency effect, you increase the potency by 1.',
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
								id: 'tactician-sub-1-2-1',
								name: 'Infiltration Tactics',
								description: 'You have trained your squad to work together and benefit from staying silent and waiting for the opportune time to strike. When you or any of your allies within 10 squares of you becomes hidden, they gain a surge.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-1-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-1-2-2a',
												name: 'Fog of War',
												description: 'Your unorthodox strategy causes enemies to lash out in fear, heedless of who they might be attacking.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-2-2a',
														name: 'Fog of War',
														description: 'Your unorthodox strategy causes enemies to lash out in fear, heedless of who they might be attacking.',
														type: {
															usage: 'Maneuver',
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
														target: 'Two creatures',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '\nEach target is marked by you. You immediately force each targeted creature to make a free strike against a creature of your choice within 5 squares of the targeted creature.\n\n**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target, you can spend 2 focus to make the marked target free strike a creature of your choice within 5 squares of the marked target.',
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
												id: 'tactician-sub-1-2-2b',
												name: 'Try Me Instead',
												description: '“Try picking on someone MY size.”',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-2-2b',
														name: 'Try Me Instead',
														description: '“Try picking on someone MY size.”',
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
														preEffect: 'You shift your speed directly toward an ally adjacent to the target, then swap locations with the ally as long as you can each fit into the other’s space. The ally can spend a Recovery, and you make a power roll against the target.',
														powerRoll: {
															characteristic: [
																'Reason'
															],
															bonus: 0,
															tier1: '2 + R damage; R < [weak], frightened (save ends)',
															tier2: '3 + R damage; R < [average], frightened (save ends)',
															tier3: '4 + R damage; R < [strong], frightened (save ends)'
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
				id: 'tactician-sub-2',
				name: 'Mastermind',
				description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board, and seeking victory by thinking multiple steps ahead of your opponents.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'tactician-sub-2-1-1',
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
								id: 'tactician-sub-2-1-2',
								name: 'Studied Commander',
								description: '\nYour encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are with them, any hero treats the Discover Lore project related to a war or battle as one category cheaper. This makes projects seeking common lore free, but such projects still require a respite activity to complete.\n\nAdditionally, if you have a reasonable amount of time before a combat encounter or negotiation, and you have at least one clue or rumor regarding the encounter or negotiation, you can make a Reason test as a Respite activity.\n\nThe following test results apply to a combat encounter:\n\n| Roll | Effect |\n|:--------|:--------------------------------------------------------------------------------|\n| 11 - | The Director tells you the number of creatures in the encounter. |\n| 12 - 16 | The Director tells you the number and level of the creatures in the encounter. |\n| 17 + | As 12-16, and when the encounter begins, all enemies are surprised. |\n\nThe following test results apply to a negotiation:\n\n| Roll | Effect |\n|:--------|:------------------------------------------------------------------------------------------------------------------------------|\n| 11 - | The Director tells you three different motivations, one of which is one of an NPC’s motivations, while the other two are not. |\n| 12 - 16 | The Director tells you one of an NPC’s motivations. |\n| 17 + | As 12-16, and you and each of your allies gains an edge on tests made to influence NPCs during the negotiation. |\n\nYou can only make this test once for each encounter and negotiation.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-2-1-3',
								name: 'Overwatch',
								description: 'Under your direction, an ally waits for just the right moment to strike.',
								type: 'Ability',
								data: {
									ability: {
										id: 'tactician-sub-2-1-3',
										name: 'Overwatch',
										description: 'Under your direction, an ally waits for just the right moment to strike.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target moves.',
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
										target: 'One enemy',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'At any point during the target’s movement, one ally can make a free strike against them.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'If the target has R < [average], they are also slowed (EoT).',
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
								id: 'tactician-sub-2-2-1',
								name: 'Goaded',
								description: 'You have learned to leverage the psychology of your marked foes and goad them into acting before they are tactically ready.',
								type: 'Ability',
								data: {
									ability: {
										id: 'tactician-sub-2-2-1',
										name: 'Goaded',
										description: 'You have learned to leverage the psychology of your marked foes and goad them into acting before they are tactically ready.',
										type: {
											usage: 'Triggered Action',
											free: true,
											trigger: 'A creature marked by you uses a strike that targets you or an ally.',
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
										effect: 'You retarget the attack to you or another one of your allies or yourself. The new target must be a valid option for the strike.',
										strained: '',
										alternateEffects: [],
										spend: [],
										persistence: [], sections: []
									}
								}
							},
							{
								id: 'tactician-sub-2-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-2-2-2a',
												name: 'I\'ve Got Your Back',
												description: 'Your enemy will think twice about attacking your friend.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-2-2a',
														name: 'I\'ve Got Your Back',
														description: 'Your enemy will think twice about attacking your friend.',
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
																'Reason'
															],
															bonus: 0,
															tier1: '2 + R damage; R < [weak], the target is frightened of an ally of your choice within range (save ends)',
															tier2: '3 + R damage; R < [average], the target is frightened of an ally of your choice within range (save ends)',
															tier3: '5 + R damage; R < [strong], the target is frightened of an ally of your choice within range (save ends)'
														},
														test: null,
														effect: 'One ally adjacent to the target can spend a Recovery.',
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
												id: 'tactician-sub-2-2-2b',
												name: 'Their Tactics Are So Primitive',
												description: 'All that time you spent studying ancient battles paid off!',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-2-2b',
														name: 'Their Tactics Are So Primitive',
														description: 'All that time you spent studying ancient battles paid off!',
														type: {
															usage: 'Maneuver',
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
																value: 5,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Two creatures',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: '\nEach target is marked by you. You gain two surges.\n\n**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target with a strike, you can spend 2 focus to add one additional target to the strike within the attack’s range.',
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
				id: 'tactician-sub-3',
				name: 'Vanguard',
				description: 'You have learned the tactics and stratagems of the heroes of ancient history, letting you lead from the front lines of battle and seek victory through sheer force of will and personality.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'tactician-sub-3-1-1',
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
										'Flirt'
									]
								}
							},
							{
								id: 'tactician-sub-3-1-2',
								name: 'Commanding Presence',
								description: 'You command any room you walk into. While you are present, each hero with you is treated as having a Renown 2 higher than usual for the purpose of negotiations. Additionally, each hero with you has a double edge on tests made to stop combat and start a negotiation with the other side.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-3-1-3',
								name: 'Parry',
								description: 'Your quick reflexes cost an enemy the precision they seek.',
								type: 'Ability',
								data: {
									ability: {
										id: 'tactician-sub-3-1-3',
										name: 'Parry',
										description: 'Your quick reflexes cost an enemy the precision they seek.',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'A creature deals damage to the target.',
											time: '',
											qualifiers: []
										},
										keywords: [
											'Melee',
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
										target: 'Self or one ally',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										preEffect: '',
										powerRoll: null,
										test: null,
										effect: 'The damage is halved. If any effect of the damage has a potency effect, you decrease the potency by 1.',
										strained: '',
										alternateEffects: [],
										spend: [
											{
												value: 1,
												effect: 'The target can shift a number of squares equal to your Reason score.',
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
								id: 'tactician-sub-3-2-1',
								name: 'Melee Superiority',
								description: '\nAfter constant drills you have improved your ability to anticipate an enemy’s attack and thwart their attempts to move freely across the battlefield. Whenever you make an opportunity attack, the target’s speed is reduced to 0 until the end of the current turn.\n\n**Mark Benefit**: You can spend 2 focus to make a melee free strike against a marked creature who attempts to move or Disengage within distance of your melee free strike as a free triggered action. If you do, the target’s speed is reduced to 0 until the end of the current turn.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-3-2-2',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-3-2-2a',
												name: 'No Dying On My Watch',
												description: 'You prioritize saving an ally over your own safety.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-2-2a',
														name: 'No Dying On My Watch',
														description: 'You prioritize saving an ally over your own safety.',
														type: {
															usage: 'Triggered Action',
															free: false,
															trigger: 'The target deals damage to an ally.',
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
														target: 'One enemy',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: 'You move up to your speed toward the target, ending your move in the nearest square adjacent to them if you can. The triggering ally can spend a Recovery, and gains 5 Temporary Stamina for each enemy you move past while moving to the target. You then make a power roll against the target.',
														powerRoll: {
															characteristic: [
																'Might'
															],
															bonus: 0,
															tier1: 'R < [weak], frightened of the triggering ally (save ends)',
															tier2: ' R < [average], frightened of the triggering ally (save ends)',
															tier3: 'R < [strong], frightened of the triggering ally (save ends)'
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
												id: 'tactician-sub-3-2-2b',
												name: 'Squad! On Me!',
												description: 'Together we are invincible!',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-2-2b',
														name: 'Squad! On Me!',
														description: 'Together we are invincible!',
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
														cost: 5,
														repeatable: false,
														minLevel: 1,
														preEffect: '',
														powerRoll: null,
														test: null,
														effect: 'Until the start of your next turn, each target gains a bonus to their Stability equal to your Might score. Additionally, each target gains two surges.',
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
				value: 2
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
				value: -1
			},
			{
				characteristic: 'Presence',
				value: 1
			}
		]
	},
	career: {
		id: 'career-soldier',
		name: 'Soldier',
		description: 'In your formative years, you fought tirelessly in skirmishes and campaigns against enemy forces.',
		features: [
			{
				id: 'career-soldier-feature-1',
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
			},
			{
				id: 'career-soldier-feature-2',
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
				id: 'career-soldier-feature-3',
				name: 'Language',
				description: '',
				type: 'Language Choice',
				data: {
					options: [],
					count: 2,
					selected: [
						'Szetch',
						'Vaslorian'
					]
				}
			},
			{
				id: 'career-soldier-feature-4',
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
				id: 'career-soldier-feature-5',
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
							id: 'perk-put-your-back-into-it',
							name: 'Put Your Back Into It',
							description: 'Once per montage test, you can turn an ally’s tier 1 test result into a tier 2 result. Additionally, if you make a test to assist a test and a get a tier 1 result, you don’t add a bane to the assisted test.',
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
					id: 'career-soldier-ii-1',
					name: 'Dishonorable Discharge',
					description: 'You enlisted in the military to protect others, but your commander ordered you to beat and kill civilians. When you refused, things got violent. You barely escaped the brawl that ensued, but now you vow to help people on your own terms.'
				},
				{
					id: 'career-soldier-ii-2',
					name: 'Out of Retirement',
					description: 'You had a long and storied career as a soldier before deciding to retire to a simpler life. But when you returned to your old home, you found your enemies had laid waste to it. Now the skills you earned on the battlefield are helping you as you become a different kind of warrior - one seeking to save others from the fate you suffered.'
				},
				{
					id: 'career-soldier-ii-3',
					name: 'Peace Through Healing',
					description: 'The sight of constant bloodshed took its toll on you. You seek peace through healing and dedicated yourself to ending wars before they begin, to spare those around you from the horror.'
				},
				{
					id: 'career-soldier-ii-4',
					name: 'Sole Survivor',
					description: 'You were the last surviving member of your unit after an arduous battle or monstrous assault, surviving only through luck. You turned away from the life of a soldier then, seeking to become a hero who could stand against such threats.'
				},
				{
					id: 'career-soldier-ii-5',
					name: 'Stolen Valor',
					description: 'Tired of eking out an existence on the streets, you enrolled in the military. However, you were unable to escape your lower-status background until the officer leading your unit fell in battle. In the chaos that ensued, you assumed their identity and returned home a hero. To avoid suspicion, you took on the life of an adventurer, staying always on the move.'
				},
				{
					id: 'career-soldier-ii-6',
					name: 'Vow of Sacrifice',
					description: 'You promised a fellow soldier that you’d protect his family if he ever fell in battle. When he did, you traveled to his village, but found its people slain or scattered by war. Driven by your vow, you have dedicated your life to finding any survivors and protecting others from a similar fate.'
				}
			],
			selectedID: 'career-soldier-ii-2'
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
