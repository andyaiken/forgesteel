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
		description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elf history describes a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
		features: [
			{
				id: 'high-elf-feature-1',
				name: 'High Elf Glamor',
				description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you appear and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.',
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
								id: 'high-elf-feature-2-0',
								name: 'Glamor of Terror',
								description: 'When a foe strikes, you reverse the magic of your glamor to instill fear into their heart. Whenever you take damage from a creature, you can use a triggered action to make that creature frightened of you until the end of their next turn.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'high-elf-feature-2-1',
								name: 'Graceful Retreat',
								description: 'You gain a +1 bonus to the distance you can shift when you take the Disengage move action.',
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
								description: 'Your senses are especially keen and perceptive. You gain an edge on tests made to notice threats.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'high-elf-feature-2-4',
								name: 'Otherwordly Grace',
								description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'high-elf-feature-2-3',
								name: 'Revisit Memory',
								description: 'Accessing memories is as easy as living in the present for you. You gain an edge on tests made to recall lore.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'high-elf-feature-2-5',
								name: 'Unstoppable Mind',
								description: 'Your mind allows you to maintain your focus in any situation.',
								type: 'Condition Immunity',
								data: {
									conditions: [
										'Dazed'
									]
								}
							},
							value: 2
						}
					],
					count: 'ancestry',
					selected: [
						{
							id: 'high-elf-feature-2-2',
							name: 'High Senses',
							description: 'Your senses are especially keen and perceptive. You gain an edge on tests made to notice threats.',
							type: 'Text',
							data: null
						},
						{
							id: 'high-elf-feature-2-4',
							name: 'Otherwordly Grace',
							description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
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
		id: 'culture-high-elf',
		name: 'High Elf',
		description: 'Secluded, bureaucratic, martial.',
		type: 'Ancestral',
		language: {
			id: 'culture-language',
			name: 'Language',
			description: '',
			type: 'Language Choice',
			data: {
				options: [],
				count: 1,
				selected: [ 'Hyrallic' ]
			}
		},
		languages: [],
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
					'Persuade'
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
					'Flirt'
				]
			}
		},
		upbringing: {
			id: 'up-martial',
			name: 'Martial',
			description: 'A hero with a martial upbringing was raised by warriors. These might have been the soldiers of an established army, a band of mercenaries, a guild of monster-slaying adventurers, or any other folk whose lives revolve around combat. Heroes with a martial upbringing are always ready for a fight—and they know how to finish that fight.',
			type: 'Skill Choice',
			data: {
				options: [
					'Blacksmithing',
					'Fletching',
					'Climb',
					'Endurance',
					'Ride',
					'Intimidate',
					'Alertness',
					'Track',
					'Monsters',
					'Strategy'
				],
				listOptions: [],
				count: 1,
				selected: [
					'Strategy'
				]
			}
		}
	},
	class: {
		id: 'class-tactician',
		name: 'Tactician',
		description: '\nStrategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.\n\nAs a tactician, you have abilities that heal your allies and grant them increased damage, movement, and attacks.',
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
							valuePerLevel: 9,
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
						id: 'tactician-resource',
						name: 'Focus',
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
									tag: 'deal-damage',
									trigger: 'The first time each round that you or an ally damages a creature you have marked',
									value: '1'
								},
								{
									tag: 'ability',
									trigger: 'The first time in a round that an ally within 10 squares of you uses a heroic ability',
									value: '1'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Search',
								'Monsters'
							]
						}
					},
					{
						id: 'tactician-1-4',
						name: 'Field Arsenal',
						description: 'You have drilled with a broad array of arms and armor, and have developed techniques to optimize their use. You can use and gain the benefits of two kits, including both their signature abilities. Whenever you would choose or change one kit, you can choose or change your second kit as well.',
						type: 'Kit',
						data: {
							types: [
								''
							],
							count: 2,
							selected: [
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
																tier2: '6 + M or A damage',
																tier3: '9 + M or A damage'
															}
														},
														{
															type: 'text',
															text: 'The target is taunted until the end of their next turn.'
														}
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
									id: 'kit-rapid-fire',
									name: 'Rapid Fire',
									description: 'The Rapid-Fire kit is for archers who want to deal maximum damage by shooting as many arrows as possible into nearby enemies. With this kit, your fighting technique focuses on peppering foes before they can get close enough to counterattack.',
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
													sections: [
														{
															type: 'roll',
															roll: {
																characteristic: [
																	'Might',
																	'Agility'
																],
																bonus: 0,
																tier1: '2 damage',
																tier2: '4 damage',
																tier3: '6 damage'
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
						id: 'tactician-1-5',
						name: 'Mark',
						description: 'Mark, Mark: Trigger',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'tactician-1-5a',
									name: 'Mark',
									description: 'You draw your allies’ attention to a specific foe—with devastating effect.',
									type: 'Ability',
									data: {
										ability: {
											id: 'tactician-1-5a',
											name: 'Mark',
											description: 'You draw your allies’ attention to a specific foe—with devastating effect.',
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
											sections: [
												{
													type: 'text',
													text: '\nThe target is marked by you until the end of the encounter, until you are dying, or until you use this ability again. You can willingly end your mark on a creature (no action required), and if another tactician marks a creature, your mark on that creature ends. When a creature marked by you is reduced to 0 Stamina, you can use a free triggered action to mark a new target within distance.\n\nYou can initially mark only one creature using this ability, though other tactician abilities allow you to mark additional creatures at the same time.\n\nWhile a creature marked by you is within your line of effect, you and allies within your line of effect gain an edge on power rolls made against that creature.'
												},
												{
													type: 'package',
													tag: 'mark'
												}
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
									id: 'tactician-1-5b',
									name: 'Mark: Trigger',
									description: '',
									type: 'Ability',
									data: {
										ability: {
											id: 'tactician-1-5b',
											name: 'Mark: Trigger',
											description: '',
											type: {
												usage: 'Triggered Action',
												free: true,
												trigger: 'You or any ally uses an ability to deal rolled damage to a creature marked by you',
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
													special: 'Special',
													qualifier: ''
												}
											],
											target: 'Special',
											cost: 1,
											repeatable: false,
											minLevel: 1,
											sections: [
												{
													type: 'text',
													text: '\nYou gain one of the following benefits:\n\n* The ability deals extra damage equal to twice your Reason score.\n* The creature dealing the damage can spend a Recovery.\n* The creature dealing the damage can shift up to a number of squares equal to your Reason score.\n* If you damage a creature marked by you with a melee ability, the creature is taunted by you until the end of their next turn.\n\nYou can’t gain more than one benefit from the same trigger.'
												},
												{
													type: 'package',
													tag: 'mark'
												}
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
						id: 'tactician-1-6',
						name: '“Strike Now!”',
						description: 'Your foe left an opening. You point this out to an ally!',
						type: 'Ability',
						data: {
							ability: {
								id: 'tactician-1-6',
								name: '“Strike Now!”',
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
								sections: [
									{
										type: 'text',
										text: 'The target can use a signature ability as a free triggered action.'
									},
									{
										type: 'field',
										name: 'Spend',
										value: 5,
										repeatable: false,
										effect: 'You target two allies instead of one.'
									}
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
						id: 'tactician-1-7',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 3,
							allowAnySource: false,
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
							allowAnySource: false,
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
						description: 'Even before battle begins, your enemies struggle to keep up with your tactics. At the start of an encounter, you can use a free triggered action to use your Mark ability against one enemy you have line of effect to, even if you are surprised. You can then slide the marked target up to 3 squares, ignoring stability. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.',
						type: 'Text',
						data: null
					},
					{
						id: 'tactician-3-2',
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
						id: 'tactician-4-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'tactician-4-1b',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'tactician-4-2',
						name: 'Focus on Their Weakness',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'deal-damage 2',
							trigger: 'The first time each round that you or an ally damages a creature you have marked',
							value: '2',
							replacesTags: [
								'deal-damage'
							]
						}
					},
					{
						id: 'tactician-4-3',
						name: 'Improved Field Arsenal',
						description: 'Your expertise with weapons has grown. Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you gain an edge.',
						type: 'Text',
						data: null
					},
					{
						id: 'tactician-4-4',
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
						id: 'tactician-4-5',
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
						id: 'tactician-5-1',
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
						id: 'tactician-6-1',
						name: 'Master of Arms',
						description: 'Your expertise with weapons has grown to true mastery. Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you can negate a bane on the power roll or reduce a double bane to a bane.',
						type: 'Text',
						data: null
					},
					{
						id: 'tactician-6-2',
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
						id: 'tactician-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'tactician-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'tactician-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'tactician-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'tactician-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'tactician-7-2',
						name: 'Heightened Focus',
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
						id: 'tactician-7-3',
						name: 'Seize the Initiative',
						description: 'If you are not surprised when combat begins, your side gets to go first. If an enemy has an ability that allows their side to go first, you roll as usual to determine who goes first.',
						type: 'Text',
						data: null
					},
					{
						id: 'tactician-7-4',
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
						id: 'tactician-8-1',
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
						id: 'tactician-8-2',
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
						id: 'tactician-9-1',
						name: 'Grandmaster of Arms',
						description: 'Your expertise with weapons has grown to true mastery. Whenever you use a signature ability from one of your equipped kits or make a free strike using a weapon from one of your equipped kits, you automatically obtain a tier 3 outcome on the power roll. You can still roll to determine if you score a critical hit.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'tactician-10-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'tactician-10-1b',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'tactician-10-2',
						name: 'Command',
						description: '\nWhenever you or any ally uses an ability to deal rolled damage to a creature marked by you, you can spend 1 command as a free triggered action to increase the power roll outcome for that target by one tier. Whenever an enemy marked by you makes an ability roll, you can spend 1 command as a free triggered action to decrease the power roll outcome by one tier.\n\nCommand remains until you spend it.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: 'Each target gains 1 surge.',
							tier2: 'Each target gains 2 surges.',
							tier3: 'Each target gains 3 surges.'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M damage; M < [weak], dazed (save ends)',
							tier2: '5 + M damage; M < [average], dazed (save ends)',
							tier3: '8 + M damage; M < [strong], dazed (save ends)'
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '3 + M damage; you or one ally within 10 squares of you can spend a Recovery',
							tier2: '5 + M damage; you or one ally within 10 squares of you can spend a Recovery',
							tier3: '8 + M damage; you and one ally within 10 squares of you can spend a Recovery, and each of you gains an edge on the next ability roll you make during the encounter'
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
				sections: [
					{
						type: 'text',
						text: 'Each target can move up to their speed.'
					}
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '5 + M damage; one ally within 10 squares of you can use a strike signature ability against the target as a free triggered action',
							tier2: '9 + M damage; one ally within 10 squares of you can use a strike signature ability that gains an edge against the target as a free triggered action',
							tier3: '12 + M damage; two allies within 10 squares of you can each use a strike signature ability that gains an edge against the target as a free triggered action'
						}
					},
					{
						type: 'text',
						text: 'If the target is reduced to 0 Stamina before one or both chosen allies has made their strike, the ally or allies can pick a different target.'
					}
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
				id: 'tactician-ability-6',
				name: 'Mind Game',
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
				sections: [
					{
						type: 'text',
						text: 'You mark the target.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '4 + M damage; R < [weak], weakened (save ends)',
							tier2: '6 + M damage; R < [average], weakened (save ends)',
							tier3: '10 + M damage; R < [strong], weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'Before the start of your next turn, the first time any ally deals damage to any target marked by you, that ally can spend a Recovery.'
					}
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
						value: 10,
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
				sections: [
					{
						type: 'text',
						text: 'Each target can make a free strike.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'Each target who hasn’t acted yet this combat round can take their turn in any order immediately after yours.'
					}
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
				id: 'tactician-ability-9',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, the first time on a turn that you or any ally deals damage to a target marked by you, the creature who dealt the damage can push the target up to 2 squares and then shift up to 2 squares. Additionally, any ally using the Charge main action to target a creature marked by you can use a melee strike signature ability or a melee strike heroic ability instead of a melee free strike.'
					}
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
				id: 'tactician-ability-10',
				name: 'Hit ’Em Hard!',
				description: '',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you, that creature gains 2 surges, which they can use immediately.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you who has R < [average], the target is frightened of the creature who dealt the damage (save ends).'
					}
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
				id: 'tactician-ability-12',
				name: 'Stay Strong and Focus!',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, whenever you or any ally deals damage to a target marked by you, the creature who dealt the damage can spend a Recovery.'
					}
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
				id: 'tactician-ability-13',
				name: 'Squad! Gear Check!',
				description: 'You distract a foe while your allies secure their defensive gear.',
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
						text: 'You and each ally adjacent to the target gain 10 temporary Stamina.'
					}
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
				id: 'tactician-ability-14',
				name: 'Squad! Remember Your Training!',
				description: 'You remind your allies how to best use their gear.',
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
				target: 'Self and two allies',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Each target gains 1 surge and can use a signature ability that has a double edge.'
					}
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
				id: 'tactician-ability-15',
				name: 'Win This Day!',
				description: 'You inspire your allies to recover and gather their strength.',
				type: {
					usage: 'Main Action',
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
						text: 'Each target gains 2 surges. Additionally, they can spend a Recovery, remove any conditions or effects on them, and stand up if they are prone.'
					}
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
				id: 'tactician-ability-16',
				name: 'You’ve Still Got Something Left',
				description: 'You push an ally to use a heroic ability sooner than they otherwise would.',
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target uses a heroic ability with the Strike keyword as a free triggered action, and deals extra damage with that ability equal to your Reason score. The ability has its Heroic Resource cost reduced by 1 + your Reason score (minimum cost 0).'
					}
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
				id: 'tactician-ability-17',
				name: 'Go Now and Speed Well',
				description: 'You direct an attack to strike true.',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target gains 2 surges and can use a signature or heroic ability as a free triggered action. The ability has a double edge on the power roll, ignores damage immunity, and increases the potency of any potency effects by 1.'
					}
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
				id: 'tactician-ability-18',
				name: 'Finish Them!',
				description: 'You point out an opening to your ally so they can land a killing blow.',
				type: {
					usage: 'Triggered Action',
					free: true,
					trigger: 'The target is not a leader or solo creature, and becomes winded.',
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target is killed. Additionally, the creature who caused the target to be winded can spend a Recovery.'
					}
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
				id: 'tactician-ability-19',
				name: 'Floodgates Open',
				description: 'You direct your squad to strike in unison and with devastating effect.',
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
				target: 'Three allies',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Each target gains 1 surge and can use a signature ability as a free triggered action. That ability gains an edge on the power roll and increases the potency of any potency effects by 1.'
					}
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
				id: 'tactician-ability-20',
				name: 'I’ll Open and You’ll Close',
				description: 'You create an opening for an ally.',
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
							tier1: '6 + M damage',
							tier2: '10 + M damage',
							tier3: '14 + M damage'
						}
					},
					{
						type: 'text',
						text: 'One ally within 10 squares of you can use a heroic ability against the target as a free triggered action without spending any of their Heroic Resource, as long as they have enough Heroic Resource to pay for the ability. If the target is reduced to 0 Stamina before the chosen ally has used their ability, the ally can pick a different target.'
					}
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
				id: 'tactician-sub-1',
				name: 'Insurgent',
				description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. You’ll do whatever it takes to keep your allies alive.',
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
								description: '\nWhile in your presence or working according to your plans, each of your allies gains an edge on tests using any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist another creature with any test made using a skill from the intrigue group.\n\nAt the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of a negotiation.',
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
										target: 'One ally',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'The target gains 2 surges, which they can use on the triggering damage.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'If the damage has any potency effect associated with it, the potency is increased by 1.'
											}
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
								id: 'tactician-sub-1-2-1',
								name: 'Infiltration Tactics',
								description: 'You have trained your squad to work together, stay silent, and wait for the opportune time to strike. Whenever you or any ally within 10 squares of you becomes hidden, that creature gains 1 surge.',
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
														sections: [
															{
																type: 'text',
																text: 'Each target is marked by you, and must immediately make a free strike against a creature of your choice within 5 squares of them.'
															},
															{
																type: 'field',
																name: 'Mark Benefit',
																value: 0,
																repeatable: false,
																effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to force that target to make a free strike against a creature of your choice within 5 squares of them.'
															}
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
												id: 'tactician-sub-1-2-2b',
												name: 'Try Me Instead',
												description: '“Try picking on someone my size.”',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-2-2b',
														name: 'Try Me Instead',
														description: '“Try picking on someone my size.”',
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
																type: 'Self',
																value: 0,
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
																text: 'You shift up to your speed directly toward an ally, ending adjacent to them, then swapping locations with that ally as long as you can fit into each other’s spaces. The ally can spend a Recovery, and you can make the following weapon strike with a distance of melee 1 against a creature.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: '2 + R damage; R < [weak], frightened (save ends)',
																	tier2: '3 + R damage; R < [average], frightened (save ends)',
																	tier3: '4 + R damage; R < [strong], frightened (save ends)'
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
								id: 'tactician-sub-1-5-1',
								name: 'Distracted',
								description: 'You have mastered the ability to distract your foes, allowing you and your allies to take advantage of their gaps in attention. Whenever you or any ally attempts to hide, any creature marked by you doesn’t count as an observer. Additionally, you and your allies can use other allies as cover for the purpose of hiding.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-1-5-2',
								name: 'Leave No Trace',
								description: 'You and any ally within 10 squares of you can move at full speed while sneaking. Additionally, enemies within 10 squares of you take a bane on tests made to search for you or your allies while any of you are hidden.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'tactician-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-1-6-1a',
												name: 'Coordinated Execution',
												description: 'You direct your ally to make a killing blow.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-6-1a',
														name: 'Coordinated Execution',
														description: 'You direct your ally to make a killing blow.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'The target uses an ability to deal rolled damage to a creature while hidden.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'If the target of the triggering ability is not a leader or solo creature, they are reduced to 0 Stamina. If the target of the triggering ability is a minion, the entire squad is killed. If the target of the triggering ability is a leader or solo creature, the triggering ability’s power roll automatically obtains a tier 3 outcome.'
															}
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
												id: 'tactician-sub-1-6-1b',
												name: 'Panic in Their Lines',
												description: 'You confuse your foes, causing them to turn on each other.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-6-1b',
														name: 'Panic in Their Lines',
														description: 'You confuse your foes, causing them to turn on each other.',
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
														target: 'Two creatures',
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
																	tier1: '6 + M damage; slide 1',
																	tier2: '9 + M damage; slide 3',
																	tier3: '13 + M damage; slide 5'
																}
															},
															{
																type: 'text',
																text: 'If a target is force moved into another creature, they must make a free strike against that creature.'
															}
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
						features: [
							{
								id: 'tactician-sub-1-7-1',
								name: 'Asymmetric Warfare',
								description: 'You have advanced your skills in subterfuge, now directing full battlefield strategy and logistics. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the intrigue skill group. Additionally, you can use skills from the intrigue skill group to conceal large groups of people, such as escaping civilians and groups of guerilla warriors.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'tactician-sub-1-8-1',
								name: 'Bait and Ambush',
								description: 'When you or any ally makes a strike against a creature marked by you, you can spend 2 focus to let the character making the strike shift up to a number of squares equal to your Reason score and use the Hide maneuver as a free maneuver once during the shift. The creature can shift before or after the strike is resolved.',
								type: 'Package Content',
								data: {
									tag: 'mark'
								}
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'tactician-sub-1-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-1-9-1a',
												name: 'Squad! Hit and Run!',
												description: 'I had to pry this secret from the shadow colleges.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-9-1a',
														name: 'Squad! Hit and Run!',
														description: 'I had to pry this secret from the shadow colleges.',
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
														target: 'Self and two allies',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target gains 2 surges, and can use a free triggered action to use a signature ability that gains an edge. After resolving their ability, each target can shift up to 2 squares and become hidden even if they have no cover or concealment, or if they are observed.'
															}
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
												id: 'tactician-sub-1-9-1b',
												name: 'Their Lack of Focus Is Their Undoing',
												description: 'You trick your enemies into attacking each other and leave them confused by the aftermath.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-1-9-1b',
														name: 'Their Lack of Focus Is Their Undoing',
														description: 'You trick your enemies into attacking each other and leave them confused by the aftermath.',
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
														target: 'Three enemies',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target uses a signature ability against one or more targets of your choosing, with each ability automatically obtaining a tier 3 outcome on the power roll. After resolving the targets’ abilities, you make a power roll against each original target.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: 'R < [weak], dazed (save ends)',
																	tier2: 'R < [average], dazed (save ends)',
																	tier3: 'R < [strong], dazed (save ends)'
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
				id: 'tactician-sub-2',
				name: 'Mastermind',
				description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board and seeking victory by thinking steps ahead of your opponents.',
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
								description: '\nYour encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are present, each hero with you treats the Discover Lore project related to a war or battle as one category cheaper. This makes projects seeking common lore free, but such projects still require a respite activity to complete.\n\nAdditionally, if you have 24 hours or more before a combat encounter or negotiation, and you have one or more clues or rumors regarding the encounter or negotiation, you can make a Reason test as a respite activity.\n\nThe following test outcomes apply to a combat encounter:\n\n| Roll    | Effect                                                                                                           |\n|:--------|:-----------------------------------------------------------------------------------------------------------------|\n| ≤ 11    | The Director tells you the number of creatures in the encounter.                                                 |\n| 12 - 16 | The Director tells you the number and level of the creatures in the encounter.                                   |\n| ≥ 17    | The Director tells you the tier 2 outcome information, and when the encounter begins, all enemies are surprised. |\n\nThe following test outcomes apply to a negotiation:\n\n| Roll    | Effect                                                                                                                                                       |\n|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|\n| ≤ 11    | The Director gives you three motivations, one of which belongs to an NPC in the negotiation.                                                                 |\n| 12 - 16 | The Director gives you one motivation for an NPC in the negotiation.                                                                                         |\n| ≥ 17    | The Director tells you the tier 2 outcome information, and you and each of your allies gains an edge on tests made to influence NPCs during the negotiation. |\n\nYou can make this test only once for any encounter or negotiation.',
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
										target: 'One creature',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'At any time during the target’s movement, one ally can make a free strike against them.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'If the target has R < [average], they are slowed (EoT).'
											}
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
								id: 'tactician-sub-2-2-1',
								name: 'Goaded',
								description: 'You have learned to leverage your marked foes’ psychology and goad them into acting before they’re tactically ready.',
								type: 'Ability',
								data: {
									ability: {
										id: 'tactician-sub-2-2-1',
										name: 'Goaded',
										description: 'You have learned to leverage your marked foes’ psychology and goad them into acting before they’re tactically ready.',
										type: {
											usage: 'Triggered Action',
											free: true,
											trigger: 'A creature marked by you uses a strike that targets you or any ally within your line of effect.',
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
												text: 'You can change one target of the strike to you or another ally within your line of effect. The new target must be within distance of the ability and within line of effect of the creature using it.'
											}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: '5 + R damage; taunted (EoT)',
																	tier2: '9 + R damage; taunted (EoT)',
																	tier3: '12 + R damage; taunted (EoT)'
																}
															},
															{
																type: 'text',
																text: 'One ally adjacent to the target can spend a Recovery.'
															}
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
												id: 'tactician-sub-2-2-2b',
												name: 'Targets of Opportunity',
												description: 'You point out easy targets to your friends, allowing them to include more enemies in their attacks.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-2-2b',
														name: 'Targets of Opportunity',
														description: 'You point out easy targets to your friends, allowing them to include more enemies in their attacks.',
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
														sections: [
															{
																type: 'text',
																text: 'Each target is marked by you, and you gain two surges.'
															},
															{
																type: 'field',
																name: 'Mark Benefit',
																value: 0,
																repeatable: false,
																effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to add one additional target to the strike.'
															}
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
								id: 'tactician-sub-2-5-1',
								name: 'Anticipation',
								description: 'You have learned to be more preemptive on the battlefield, thinking more steps ahead than your opponents. You can target two creatures with your Mark ability.',
								type: 'Package Content',
								data: {
									tag: 'mark'
								}
							},
							{
								id: 'tactician-sub-2-5-2',
								name: 'I Predicted That',
								description: 'Your expertise in history and lore allows you and your allies to outthink rivals in the present day. You and any ally within 10 squares of you gain an edge on Reason tests.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'tactician-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-2-6-1a',
												name: 'Battle Plan',
												description: 'With new understanding of your foes, you create the perfect plan to win the battle.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-6-1a',
														name: 'Battle Plan',
														description: 'With new understanding of your foes, you create the perfect plan to win the battle.',
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
														target: 'Three creatures',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target is marked by you. Immediately and until the end of the encounter, the Director tells you if any creatures marked by you have damage immunity or weakness and the value of that immunity or weakness. Additionally, you and each ally within 3 squares of you gains 2 surges.'
															},
															{
																type: 'field',
																name: 'Mark Benefit',
																value: 0,
																repeatable: false,
																effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to make the strike ignore damage immunity and deal extra damage equal to three times your Reason score.'
															}
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
												id: 'tactician-sub-2-6-1b',
												name: 'Hustle!',
												description: 'You and your allies coordinate to form a new battle line.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-6-1b',
														name: 'Hustle!',
														description: 'You and your allies coordinate to form a new battle line.',
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
																value: 2,
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
																text: 'You mark two enemies within 10 squares of you. Each target can shift up to their speed. You and each target gain 2 surges.'
															}
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
						features: [
							{
								id: 'tactician-sub-2-7-1',
								name: 'Grand Strategy',
								description: 'You have grown your skills in strategy, wielding intricate battlefield tactics and plans. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the lore skill group. Additionally, when you take a respite, you can make a project roll for a research project in addition to undertaking another respite activity.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'tactician-sub-1-8-1',
								name: 'Pincer Movement',
								description: 'When you or any ally makes a strike against a creature marked by you, you can spend 2 focus to have the character making the strike shift up to a number of squares equal to your Reason score before the strike is resolved. If you didn’t make the strike, you can make this shift as well. If you did make the strike, one ally within 10 squares of you can make this shift as well.',
								type: 'Package Content',
								data: {
									tag: 'mark'
								}
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'tactician-sub-2-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-2-9-1a',
												name: 'Blot Out the Sun!',
												description: 'What makes a good soldier? The ability to fire four shots a minute in any weather.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-9-1a',
														name: 'Blot Out the Sun!',
														description: 'What makes a good soldier? The ability to fire four shots a minute in any weather.',
														type: {
															usage: 'Main Action',
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
																value: 3,
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
																text: 'Each target can make a ranged free strike that gains an edge against any enemy marked by you within distance of their ranged free strike. A target ignores banes and double banes when making this strike.'
															}
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
												id: 'tactician-sub-2-9-1b',
												name: 'Counterstrategy',
												description: 'I’ve identified a way to negate their strengths.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-2-9-1b',
														name: 'Counterstrategy',
														description: 'I’ve identified a way to negate their strengths.',
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
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You gain 6 surges. Until the end of the encounter or until you are dying, whenever the Director spends Malice, choose yourself or one ally within 10 squares. The chosen character gains 2 of their Heroic Resource.'
															}
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
				id: 'tactician-sub-3',
				name: 'Vanguard',
				description: 'You have learned the stratagems of ancient heroes, letting you lead from the front lines and seek victory through sheer force of will and personality.',
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
										'Intimidate'
									]
								}
							},
							{
								id: 'tactician-sub-3-1-2',
								name: 'Commanding Presence',
								description: 'You command any room you walk into. While you are present during a negotiation, each hero with you treats their Renown as 2 higher than usual. Additionally, each hero with you during a combat encounter has a double edge on tests made to stop combat and start a negotiation.',
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
												value: 2,
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
												text: 'You can shift 1 square. If the target is you, or if you end this shift adjacent to the target, the target takes half the damage. If the damage has any potency effect associated with it, the potency is decreased by 1.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'This ability’s distance becomes Melee 1 + your Reason score, and you can shift up to a number of squares equal to your Reason score instead of 1 square.'
											}
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
								id: 'tactician-sub-3-2-1',
								name: 'Melee Superiority',
								description: 'After constant drills, you can more accurately anticipate an enemy’s plan and thwart their attempts to move across the battlefield. Whenever you make an opportunity attack, the target’s speed is reduced to 0 until the end of the current turn.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-3-2-1a',
								name: 'Mark Benefit',
								description: 'When a creature marked by you attempts to move or shift within distance of your melee free strike, you can use a free triggered action and spend 2 focus to make a melee free strike against that creature.',
								type: 'Package Content',
								data: {
									tag: 'mark'
								}
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
												name: 'No Dying on My Watch',
												description: 'You prioritize saving an ally over your own safety.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-2-2a',
														name: 'No Dying on My Watch',
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
														sections: [
															{
																type: 'text',
																text: 'You move up to your speed toward the triggering ally, ending this movement adjacent to them or in the nearest square if you can’t reach an adjacent square. The triggering ally can spend a Recovery and gains 5 temporary Stamina for each enemy you came adjacent to during the move. You then make a power roll against the target.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: 'R < [weak], the target is frightened of the triggering ally (save ends)',
																	tier2: ' R < [average], the target is frightened of the triggering ally (save ends)',
																	tier3: 'R < [strong], the target is frightened of the triggering ally (save ends)'
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
														sections: [
															{
																type: 'text',
																text: 'Until the start of your next turn, each target has a bonus to stability equal to your Might score. Additionally, each target gains 2 surges.'
															}
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
								id: 'tactician-sub-3-5-1',
								name: 'Shake It Off',
								description: 'As a free maneuver, you can spend 1d6 Stamina to ignore a consequence from a test, or to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Any ally adjacent to you can also spend Stamina as a free maneuver to gain this benefit.',
								type: 'Text',
								data: null
							},
							{
								id: 'tactician-sub-3-5-2',
								name: 'Tactical Offensive',
								description: 'When you use the Charge main action to attack a creature marked by you, you can use a signature or heroic ability with the Melee and Strike keywords instead of a melee free strike.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'tactician-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-3-6-1a',
												name: 'Instant Retaliation',
												description: 'You parry with almost supernatural speed.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-6-1a',
														name: 'Instant Retaliation',
														description: 'You parry with almost supernatural speed.',
														type: {
															usage: 'Triggered Action',
															free: true,
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
														target: 'One ally',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target takes half the damage. You then make a power roll against the triggering creature.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: 'A < [weak], dazed (save ends)',
																	tier2: 'A < [average], dazed (save ends)',
																	tier3: 'A < [strong], dazed (save ends)'
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
												id: 'tactician-sub-3-6-1b',
												name: 'To Me Squad!',
												description: 'You lead your allies in a charge.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-6-1b',
														name: 'To Me Squad!',
														description: 'You lead your allies in a charge.',
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
																	tier1: '6 + M damage; one ally within 10 squares can use the Charge main action as a free triggered action, and can use a melee strike signature ability instead of a free strike for the charge',
																	tier2: '9 + M damage; one ally within 10 squares can use the Charge main action as a free triggered action, and can use a melee strike signature ability that gains an edge instead of a free strike for the charge',
																	tier3: '13 + M damage; two allies within 10 squares can use the Charge main action as a free triggered action, and can each use a melee strike signature ability that gains an edge instead of a free strike for the charge'
																}
															},
															{
																type: 'text',
																text: 'If the target is hit with two or more strikes as part of this ability and they have R < [strong] , they are dazed (save ends). If the target is reduced to 0 Stamina before one or both allies has made their strike, the ally or allies can pick a different target.'
															}
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
						features: [
							{
								id: 'tactician-sub-3-7-1',
								name: 'Shock and Awe',
								description: 'You have expanded your leadership skills, strengthening your followers’ morale and providing logistical support. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the interpersonal skill group. Additionally, you can convince a group of people to help you with a crafting project during a respite. If these people are available when you take a respite, you can make a project roll for a crafting project in addition to undertaking another respite activity.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'tactician-sub-1-8-1',
								name: 'See Your Enemies Driven Before You',
								description: 'When you or any ally makes a melee strike against a creature marked by you, you can spend 2 focus to have the character making the strike push the target up to a number of squares equal to your Reason score. That character can then shift up to a number of squares equal to your Reason score, ending this shift adjacent to the target.',
								type: 'Package Content',
								data: {
									tag: 'mark'
								}
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'tactician-sub-3-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'tactician-sub-3-9-1a',
												name: 'No Escape',
												description: 'Nothing will stop you from reaching your foe.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-9-1a',
														name: 'No Escape',
														description: 'Nothing will stop you from reaching your foe.',
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
																text: 'You mark the target.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '11 + M damage',
																	tier2: '16 + M damage',
																	tier3: '21 + M damage'
																}
															},
															{
																type: 'text',
																text: 'If you use this ability as part of the Charge main action, enemies’ spaces don’t count as difficult terrain for your movement. Additionally, if you move through any creature’s space, you can slide that creature 1 square out of the path of your charge.'
															}
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
												id: 'tactician-sub-3-9-1b',
												name: 'That One Is Mine!',
												description: 'You focus on making an enemy irrelevant.',
												type: 'Ability',
												data: {
													ability: {
														id: 'tactician-sub-3-9-1b',
														name: 'That One Is Mine!',
														description: 'You focus on making an enemy irrelevant.',
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
														target: 'One creature',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target is marked by you.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '8 + M damage',
																	tier2: '13 + M damage',
																	tier3: '17 + M damage'
																}
															},
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, you can use a signature or heroic ability instead of a free strike against any target marked by you.'
															}
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
				name: 'Languages',
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
							description: 'During montage tests, whenever you make a test to assist a test and obtain a tier 1 outcome, the assisted test doesn’t take a bane. Additionally, once per montage test, you can turn an ally’s tier 1 test outcome into a tier 2 outcome.',
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
			selectedID: 'career-soldier-ii-4'
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
