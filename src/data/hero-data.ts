import { Hero } from '../models/hero';

export class HeroData {
	static dwarfFury = {
		id: 'ojZeuF7Jjqw66Di1',
		name: 'Keth',
		folder: '',
		settingIDs: [
			'',
			'orden'
		],
		ancestry: {
			id: 'ancestry-dwarf',
			name: 'Dwarf',
			description: 'Possessed of a strength that belies their size, dwarves have flesh infused with stone - a silico-organic hybrid making them physically denser than other humanoids. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.',
			features: [
				{
					id: 'dwarf-feature-1',
					name: 'Runic Carving',
					description: '\nYou can carve a rune onto your skin and the magic within your body activates it. The rune you carve determines the benefit you receive. You can change or remove this rune with 10 minutes of work while not engaged in combat.\n\n* **Detection**: Pick a specific type of creature, such as “goblins” or “humans” or an object, such as “magic swords” or “potions.” Your rune glows softly when you are within 20 squares of a chosen creature or object, regardless of line of effect. You can change the type of creature as a maneuver.\n* **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.\n* **Voice**: As a maneuver, you can communicate telepathically with another willing creature you have met before whose name you know, who can speak and understand a language you know, and is within 1 mile of you. You and the creature can respond to one another as if having a normal conversation. You can change the person you communicate with by changing the rune.',
					type: 'Text',
					data: null
				},
				{
					id: 'dwarf-feature-2',
					name: 'Dwarf Traits',
					description: '',
					type: 'Choice',
					data: {
						options: [
							{
								feature: {
									id: 'dwarf-feature-2-1',
									name: 'Grounded',
									description: 'Your heavy stone body and connection to the earth makes it difficult for others to move you.',
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
								value: 1
							},
							{
								feature: {
									id: 'dwarf-feature-2-2',
									name: 'Stand Tough',
									description: 'Your body is made to withstand the blows of your enemies. Your Might counts as 1 higher for resisting potencies.',
									type: 'Text',
									data: null
								},
								value: 1
							},
							{
								feature: {
									id: 'dwarf-feature-2-3',
									name: 'Stone Singer',
									description: 'You have a magic connection to the earth. You can spend 1 uninterrupted hour singing and reshape any unworked, mundane stone within 3 squares of you. You can’t destroy this stone, but you can move each square of it anywhere within 3 squares of you, piling it off to one side to dig a hole or building it all up to create a wall.',
									type: 'Text',
									data: null
								},
								value: 1
							},
							{
								feature: {
									id: 'dwarf-feature-2-4',
									name: 'Great Fortitude',
									description: 'Your hearty constitution prevents you from losing strength. You can’t be weakened.',
									type: 'Text',
									data: null
								},
								value: 2
							},
							{
								feature: {
									id: 'dwarf-feature-2-5',
									name: 'Spark Off Your Skin',
									description: 'Your stone skin affords you potent protection.',
									type: 'Bonus',
									data: {
										field: 'Stamina',
										value: 6,
										valueCharacteristics: [],
										valueCharacteristicMultiplier: 1,
										valuePerLevel: 3,
										valuePerEchelon: 0
									}
								},
								value: 2
							}
						],
						count: 3,
						selected: [
							{
								id: 'dwarf-feature-2-1',
								name: 'Grounded',
								description: 'Your heavy stone body and connection to the earth makes it difficult for others to move you.',
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
								id: 'dwarf-feature-2-5',
								name: 'Spark Off Your Skin',
								description: 'Your stone skin affords you potent protection.',
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
					}
				}
			]
		},
		culture: {
			id: 'culture-dwarf',
			name: 'Dwarf',
			description: 'Secluded, bureaucratic, creative.',
			languages: [
				'Zaliac'
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
						'Intimidate'
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
						'Alertness'
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
			id: 'class-fury',
			name: 'Fury',
			description: '\nYou do not temper the heat of battle within you - you unleash it! Like a raptor, a panther, a wolf, your experience in the wild taught you the secret of channeling unfettered anger into martial prowess. Primordial chaos is your ally. Leave it to others to use finesse to clean up the pieces you leave behind.\n\nAs a fury, you have abilities that deal a lot of damage, move you around the battlefield, and grow in strength as your rage increases. Nature has no concept of fairness - and neither do you.',
			heroicResource: 'Rage',
			subclassName: 'Primordial Aspect',
			subclassCount: 1,
			primaryCharacteristicsOptions: [
				[
					'Might',
					'Agility'
				]
			],
			primaryCharacteristics: [
				'Might',
				'Agility'
			],
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'fury-stamina',
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
							id: 'fury-recoveries',
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
							id: 'fury-1-1',
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
									'Nature'
								]
							}
						},
						{
							id: 'fury-1-2',
							name: 'Exploration / Intrigue Skills',
							description: '',
							type: 'Skill Choice',
							data: {
								options: [],
								listOptions: [
									'Exploration',
									'Intrigue'
								],
								count: 2,
								selected: [
									'Jump',
									'Climb'
								]
							}
						},
						{
							id: 'fury-1-3',
							name: 'Rage',
							description: 'At the start of each of your turns during combat, you gain 1d3 rage. Additionally, the first time each round that you take damage, you gain 1 rage. The first time in an encounter that you become winded or dying, you gain 1d3 rage.',
							type: 'Text',
							data: null
						},
						{
							id: 'fury-1-4',
							name: 'Mighty Leaps',
							description: 'You always succeed on Might tests made to jump. You can still roll to see if you get a reward result.',
							type: 'Text',
							data: null
						},
						{
							id: 'fury-1-5',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 'signature',
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'fury-ability-1'
								]
							}
						},
						{
							id: 'fury-1-6',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 3,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'fury-ability-5'
								]
							}
						},
						{
							id: 'fury-1-7',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 5,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'fury-ability-9'
								]
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'fury-2-1',
							name: 'Crafting / Exploration / Intrigue Perk',
							description: '',
							type: 'Perk',
							data: {
								lists: [
									'Crafting',
									'Exploration',
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
							id: 'fury-3-1',
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
					id: 'fury-ability-1',
					name: 'Brutal Slam',
					description: 'The heavy impact of your weapon attacks drives your foes ever backward.',
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
						tier1: '3 + M damage; push 1',
						tier2: '6 + M damage; push 2',
						tier3: '9 + M damage; push 4'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-2',
					name: 'Hit And Run',
					description: 'Keeping in constant motion helps you slip out of reach after a brutal assault.',
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
						tier1: '2 + M damage',
						tier2: '5 + M damage',
						tier3: '7 + M damage; A < [strong], slowed (save ends)'
					},
					test: null,
					effect: 'You can shift 1 square.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-3',
					name: 'Impaled!',
					description: 'You plunge your weapon into your enemy like a boar upon a spit.',
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
					target: '1 creature of your size or smaller',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Might'
						],
						bonus: 0,
						tier1: '2 + M damage; M < [weak], grabbed',
						tier2: '5 + M damage; M < [average], grabbed',
						tier3: '7 + M damage; M < [strong], grabbed'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-4',
					name: 'To the Death!',
					description: 'Your reckless assault leaves you tactically vulnerable.',
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
						tier1: '3 + M damage',
						tier2: '6 + M damage',
						tier3: '9 + M damage'
					},
					test: null,
					effect: 'You gain two surges. The enemy can make an opportunity attack against you as a free triggered action.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-5',
					name: 'Back!',
					description: 'Surrounded? The fools!',
					type: {
						usage: 'Action',
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
							value: 1,
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
							'Might'
						],
						bonus: 0,
						tier1: '5 damage',
						tier2: '8 damage; push 1',
						tier3: '11 damage; push 3'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-6',
					name: 'Out of the Way!',
					description: 'Your enemies will get out of your way - whether they want to or not.',
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Might'
						],
						bonus: 0,
						tier1: '3 + M damage; slide 2',
						tier2: '5 + M damage; slide 3',
						tier3: '8 + M damage; slide 5'
					},
					test: null,
					effect: 'When you slide the target, you can move into any square they leave. If you take damage from an opportunity attack by moving this way, the target takes the same amount and type of damage.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-7',
					name: 'Tide of Death',
					description: 'Teach them the folly of lining up for you.',
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
					preEffect: 'You move up to your speed in a straight line, and you don’t treat enemy squares as difficult terrain for this move. You can end this move in a creature’s space and then move them to an adjacent unoccupied space. You make one power roll that targets each enemy whose space you move through.',
					powerRoll: {
						characteristic: [
							'Might'
						],
						bonus: 0,
						tier1: '2 damage',
						tier2: '3 damage',
						tier3: '5 damage'
					},
					test: null,
					effect: 'The last target you damage takes extra damage equal to your Might score for every free strike you triggered during your move.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-8',
					name: 'Your Entrails Are Your Extrails!',
					description: 'Hard for them to fight when they’re busy holding in their giblets.',
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
						tier1: '3 + M damage; M < [weak], bleeding (save ends)',
						tier2: '5 + M damage; M < [average], bleeding (save ends)',
						tier3: '8 + M damage; M < [strong], bleeding (save ends)'
					},
					test: null,
					effect: 'While bleeding, the target takes damage equal to your Might score at the end of your turns.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-9',
					name: 'Blood for Blood!',
					description: 'A mighty strike leaves your foe reeling.',
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
					target: '1 creature or obeject',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Might'
						],
						bonus: 0,
						tier1: '4 + M damage; M < [weak], bleeding and weakened (save ends)',
						tier2: '6 + M damage; M < [average], bleeding and weakened (save ends)',
						tier3: '10 + M damage; M < [strong], bleeding and weakened (save ends)'
					},
					test: null,
					effect: 'You can deal 1d6 damage to yourself to deal 1d6 bonus damage to the target.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-10',
					name: 'Make Peace With Your God!',
					description: 'Anger is an energy.',
					type: {
						usage: 'Maneuver',
						free: true,
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
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'The next ability roll you make this turn automatically achieves a tier 3 result. You gain one surge.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-11',
					name: 'Thunder Roar',
					description: 'A howl erupts from you that hurls your enemies back.',
					type: {
						usage: 'Action',
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
							type: 'Line',
							value: 5,
							value2: 1,
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
							'Might'
						],
						bonus: 0,
						tier1: '6 damage; push 2',
						tier2: '9 damage; push 4',
						tier3: '13 damage; push 6'
					},
					test: null,
					effect: 'The targets are pushed one at a time, starting with the target closest to you.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-12',
					name: 'To the Uttermost End',
					description: 'You spend your life force to ensure their death.',
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
							'Might'
						],
						bonus: 0,
						tier1: '7 + M damage',
						tier2: '11 + M damage',
						tier3: '16 + M damage'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [
						{
							value: 1,
							effect: 'If you are winded, this ability deals 1d6 bonus damage for each rage spent. If you are dying, it deals 1d10 bonus damage for each rage spent. In either case, you then lose 1d6 Stamina after making this strike.',
							name: '',
							repeatable: false
						}
					],
					persistence: []
				},
				{
					id: 'fury-ability-13',
					name: 'A Demon Unleashed',
					description: 'Foes tremble at the sight of you.',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter or until you are dying, each enemy who starts their turn adjacent to you and has P < strong is frightened until the end of their turn.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-14',
					name: 'Face the Storm!',
					description: 'Fight or flight? FIGHT!!',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter or until you are dying, each creature you make a melee strike against who has P < average is taunted until the end of their next turn. Additionally, against any enemy taunted by you, your abilities deal additional damage equal to twice your Might score and gain a +1 bonus to potency.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-15',
					name: 'Steelbreaker',
					description: 'See how useless their weapons are!',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'You gain 20 Temporary Stamina.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'fury-ability-16',
					name: 'You Are Already Dead',
					description: 'Slash. Walk away.',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'If the target is not a leader or solo creature, they die at the end of their next turn. If the target is a leader or solo creature, you gain three surges and can make a melee free strike against them.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				}
			],
			subclasses: [
				{
					id: 'fury-sub-1',
					name: 'Berserker',
					description: 'You channel your rage into expressions of physical might, acting as a living version of the forces that reshape the world.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'fury-sub-1-1-1',
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
											'Lift'
										]
									}
								},
								{
									id: 'fury-sub-1-1-2',
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
												id: 'kit-panther',
												name: 'Panther',
												description: 'If you want a good balance of protection, speed, and damage, the Panther kit is for you. This kit increases your Stamina not by wearing armor, but through the focused battle preparation of body and mind, letting you be fast and mobile while swinging a heavy weapon at your foes.',
												type: '',
												armor: [],
												weapon: [
													'Heavy Weapon'
												],
												stamina: 6,
												speed: 1,
												stability: 1,
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
														id: 'kit-panther-signature',
														name: 'Devastating Rush',
														description: 'The faster you move, the harder you hit.',
														type: 'Ability',
														data: {
															ability: {
																id: 'kit-panther-signature',
																name: 'Devastating Rush',
																description: 'The faster you move, the harder you hit.',
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
																target: '1 creature or object',
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
																effect: 'You can move up to 3 squares straight toward the target before this attack. You deal extra damage equal to the distance moved this way.',
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
									id: 'fury-sub-1-1-3',
									name: 'Primordial Strength',
									description: '\nWhenever you damage an object with a weapon strike, it takes additional damage equal to your Might score. Additionally, whenever you push another creature into an object, they take additional damage equal to your Might score.\n\nAs your rage grows, your primordial strength intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n* **Rage 2**: Add your Might to the distance you achieve on the Knockback maneuver.\n* **Rage 4**: Gain one surge the first time on a turn that you push a creature.\n* **Rage 6**: Gain an edge on Might tests and the Knockback maneuver.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-1-1-4',
									name: 'Lines of Force',
									description: 'You redirect the energy of motion.',
									type: 'Ability',
									data: {
										ability: {
											id: 'fury-sub-1-1-4',
											name: 'Lines of Force',
											description: 'You redirect the energy of motion.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'The target would be force moved.',
												time: '',
												qualifiers: []
											},
											keywords: [
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
											target: 'Self or 1 creature',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'You can select a new target of the same size or smaller within distance to be force moved instead, and you can turn that forced movement into a push instead. You become the source of the forced movement and decide where the new target’s destination. Additionally, the forced movement distance gains a bonus equal to your Might score.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'The forced movement distance instead gains a bonus equal to twice your Might score.',
													name: '',
													repeatable: false
												}
											],
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
									id: 'fury-sub-1-2-1',
									name: 'Unstoppable Force',
									description: 'Whenever you use the Charge action, you can make a signature strike or a heroic ability melee strike instead of a free strike. Additionally, you can jump as part of a charge.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-1-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'fury-sub-1-2-2a',
													name: 'Special Delivery',
													description: 'You ready?',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-1-2-2a',
															name: 'Special Delivery',
															description: 'You ready?',
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
																	type: 'Melee',
																	value: 1,
																	value2: 0,
																	within: 0,
																	special: '',
																	qualifier: ''
																}
															],
															target: 'One willing ally',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: null,
															test: null,
															effect: 'You vertically push the target up to 4 squares. This forced movement ignores the target’s stability, and the target takes no damage from the move. At the end of this movement, the target can make a free strike that deals additional damage equal to your Might score.',
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
													id: 'fury-sub-1-2-2b',
													name: 'Wrecking Ball',
													description: 'It is easier to destroy than to create. Much easier, in fact!',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-1-2-2b',
															name: 'Wrecking Ball',
															description: 'It is easier to destroy than to create. Much easier, in fact!',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Melee',
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
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '\nYou move up to your speed in a straight line. During this movement, you can move through mundane structures, including walls, which are difficult terrain for you. You automatically destroy each square of structure you move through and leave behind a square of difficult terrain.\n\nAdditionally, you make one power roll that targets each enemy you come adjacent to during the move.',
															powerRoll: {
																characteristic: [
																	'Might'
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
									id: 'fury-sub-1-3-1',
									name: 'Immovable Object',
									description: 'You add your level to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-1-3-2',
									name: 'Stability',
									description: '',
									type: 'Bonus',
									data: {
										field: 'Stability',
										value: 0,
										valueCharacteristics: [
											'Might'
										],
										valueCharacteristicMultiplier: 1,
										valuePerLevel: 0,
										valuePerEchelon: 0
									}
								}
							]
						}
					],
					selected: true
				},
				{
					id: 'fury-sub-2',
					name: 'Reaver',
					description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'fury-sub-2-1-1',
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
											'Hide'
										]
									}
								},
								{
									id: 'fury-sub-2-1-2',
									name: 'Kit',
									description: '',
									type: 'Kit',
									data: {
										types: [
											''
										],
										count: 1,
										selected: []
									}
								},
								{
									id: 'fury-sub-2-1-3',
									name: 'Primordial Cunning',
									description: '\nYou are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.\n\nAs your rage grows, your primordial cunning intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n* **Rage 2**: Add your Agility to the distance you achieve on the Knockback maneuver.\n* **Rage 4**: Gain one surge the first time on a turn that you slide a creature.\n* **Rage 6**: Gain an edge on Agility tests and the Knockback maneuver.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-2-1-4',
									name: 'Unearthly Reflexes',
									description: 'Elusive as a hummingbird.',
									type: 'Ability',
									data: {
										ability: {
											id: 'fury-sub-2-1-4',
											name: 'Unearthly Reflexes',
											description: 'Elusive as a hummingbird.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'You take damage.',
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
											effect: 'You take half damage from the attack and can shift up to a number of squares equal to your Agility score.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'You reduce the potency of any effect associated with the damage for you by 1.',
													name: '',
													repeatable: false
												}
											],
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
									id: 'fury-sub-2-2-1',
									name: 'Inescapable Wrath',
									description: 'Inescapable Wrath, Speed',
									type: 'Multiple Features',
									data: {
										features: [
											{
												id: 'fury-sub-2-2-1a',
												name: 'Inescapable Wrath',
												description: 'You ignore difficult terrain.',
												type: 'Text',
												data: null
											},
											{
												id: 'fury-sub-2-2-1b',
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
											}
										]
									}
								},
								{
									id: 'fury-sub-2-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'fury-sub-2-2-2a',
													name: 'Phalanx Breaker',
													description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-2-2-2a',
															name: 'Phalanx Breaker',
															description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
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
															preEffect: 'You shift up to your speed. You make one power roll that targets up to three enemies you come adjacent to during the shift.',
															powerRoll: {
																characteristic: [
																	'Might'
																],
																bonus: 0,
																tier1: '2 damage; A < [weak], dazed (save ends)',
																tier2: '4 damage; A < [average], dazed (save ends)',
																tier3: '6 damage; A < [strong], dazed (save ends)'
															},
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
													id: 'fury-sub-2-2-2b',
													name: 'RRRAAAGHH!',
													description: 'Death! Deeaaath!!',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-2-2-2b',
															name: 'RRRAAAGHH!',
															description: 'Death! Deeaaath!!',
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
																	'Might'
																],
																bonus: 0,
																tier1: '3 + M damage; P < [weak], dazed and frightened (save ends)',
																tier2: '5 + M damage; P < [average], dazed and frightened (save ends)',
																tier3: '8 + M damage; P < [strong], dazed and frightened (save ends)'
															},
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
									id: 'fury-sub-1-3-1',
									name: 'See Through Your Tricks',
									description: 'You have a double edge on tests made to search for hidden creatures, discern hidden motives, or detect lies. You also have a double edge on tests made to gamble!',
									type: 'Text',
									data: null
								}
							]
						}
					],
					selected: false
				},
				{
					id: 'fury-sub-3',
					name: 'Stormwight',
					description: 'You channel your rage into the form of animals and primordial storms.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'fury-sub-3-1-1',
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
											'Track'
										]
									}
								},
								{
									id: 'fury-sub-3-1-2',
									name: 'Beast Shape',
									description: '',
									type: 'Kit',
									data: {
										types: [
											'Stormwight'
										],
										count: 1,
										selected: []
									}
								},
								{
									id: 'fury-sub-3-1-3',
									name: 'Relentless Hunter',
									description: 'You gain an edge on tests that use the Track skill.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-3-1-4',
									name: 'Furious Change',
									description: 'In your anger, you revert to a more bestial form.',
									type: 'Ability',
									data: {
										ability: {
											id: 'fury-sub-3-1-4',
											name: 'Furious Change',
											description: 'In your anger, you revert to a more bestial form.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'You lose Stamina and are not dying.',
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
											effect: 'After the triggering effect is resolved, you can use a free triggered action to enter your animal form or hybrid form. You gain temporary Stamina equal to your Might score.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'If you are not dying, you can spend a Recovery.',
													name: '',
													repeatable: false
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'fury-sub-3-1-5',
									name: 'Aspect of the Wild',
									description: 'You assume the form of the animal who channels your rage.',
									type: 'Ability',
									data: {
										ability: {
											id: 'fury-sub-3-1-5',
											name: 'Aspect of the Wild',
											description: 'You assume the form of the animal who channels your rage.',
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
											effect: '\nYou can shapeshift into the animal defined by your stormwight kit, a hybrid form, or back into your true form.\n\nWhile in animal form or hybrid form, you can speak normally and can speak to animals who share your form. If you are in a negotiation with an animal, you treat your Renown as 2 higher than usual while in animal form.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'As a free maneuver on your turn, you can shapeshift a second time, either into another animal form, into your hybrid form, or back into your true form.',
													name: '',
													repeatable: false
												}
											],
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
									id: 'fury-sub-3-2-1',
									name: 'Tooth and Claw',
									description: 'When you end your turn, each enemy who is adjacent to you takes damage equal to your Might score.',
									type: 'Text',
									data: null
								},
								{
									id: 'fury-sub-3-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'fury-sub-3-2-2a',
													name: 'Apex Predator',
													description: 'I will hunt you down.',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-3-2-2a',
															name: 'Apex Predator',
															description: 'I will hunt you down.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Animal',
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
																tier1: '4 + M damage; I < [weak], slowed (save ends)',
																tier2: '6 + M damage; I < [average], slowed (save ends)',
																tier3: '10 + M damage; I < [strong], slowed (save ends)'
															},
															test: null,
															effect: 'The target can’t be hidden from you for 24 hours. For the rest of the encounter, whenever the target moves, you can use a free triggered action to move.',
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
													id: 'fury-sub-3-2-2b',
													name: 'Visceral Roar',
													description: 'The sound of the storm within you terrifies your opponents.',
													type: 'Ability',
													data: {
														ability: {
															id: 'fury-sub-3-2-2b',
															name: 'Visceral Roar',
															description: 'The sound of the storm within you terrifies your opponents.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Animal',
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
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Might'
																],
																bonus: 0,
																tier1: '2 damage; push 1; M < [weak], dazed (save ends)',
																tier2: '5 damage; push 2; M < [average], dazed (save ends)',
																tier3: '7 damage; push 3; M < [strong], dazed (save ends)'
															},
															test: null,
															effect: 'This ability deals damage of your primordial storm type.',
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
									id: 'fury-sub-1-3-1',
									name: 'Nature’s Knight',
									description: 'You can speak with animals and elementals. You automatically sense the presence of any animal or elemental within 10 squares of you, even if they are hidden. If you are in a negotiation with an animal or elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your Renown in a negotiation with an animal of your type while in animal form.',
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
					value: 2
				},
				{
					characteristic: 'Agility',
					value: 2
				},
				{
					characteristic: 'Reason',
					value: -1
				},
				{
					characteristic: 'Intuition',
					value: 1
				},
				{
					characteristic: 'Presence',
					value: 1
				}
			]
		},
		career: {
			id: 'career-warden',
			name: 'Warden',
			description: 'You protected a wild region from those who sought to harm it, such as poachers and cultists bent on the destruction of the natural world. Knowing your land well, you could also serve as a guide or the leader of a rescue party for those wandering the wilds.',
			features: [
				{
					id: 'career-warden-feature-1',
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
							'Monsters'
						]
					}
				},
				{
					id: 'career-warden-feature-2',
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
							'Navigate'
						]
					}
				},
				{
					id: 'career-warden-feature-3',
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
							'Track'
						]
					}
				},
				{
					id: 'career-warden-feature-4',
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
					id: 'career-warden-feature-5',
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
					id: 'career-warden-feature-6',
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
								id: 'perk-brawny',
								name: 'Brawny',
								description: 'When you fail a Might test, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
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
						id: 'career-warden-ii-1',
						name: 'Betrayed',
						description: 'When outsiders arrived in your lands with the intent to exploit the wilds for their resources, you spoke out against them. However, several other wardens spoke in favor of these outsiders and allowed them in to despoil nature. Refusing to watch your homeland destroyed, you left. Now you help others avoid such a fate.'
					},
					{
						id: 'career-warden-ii-2',
						name: 'Corruption',
						description: 'A disease has infected the lands you protect, causing animals to become violent and twisting plants into something dark and sinister. You’ve tried everything, magical and mundane, to stop the scourge, but it continues to spread. As such, you’ve set out in search of a cure or an unblighted land to protect.'
					},
					{
						id: 'career-warden-ii-3',
						name: 'Exiled',
						description: 'You made a mistake that could not be forgiven. The other wardens of the region decided your fate, exiling you from your lands with an order never to return.'
					},
					{
						id: 'career-warden-ii-4',
						name: 'Honor the Fallen',
						description: 'A group of heroes arrived in your territory with trouble close on their heels. You fought alongside them to turn back the evil, but it was too much. The heroes fell, and your wilderness was forever altered. Though your lands are beyond saving, there are other lands you can help.'
					},
					{
						id: 'career-warden-ii-5',
						name: 'Portents',
						description: 'There were signs. You tried to ignore them, but when a great beast died at your feet, you had to recognize the truth. You were meant to leave your home territory, meant to fight a battle for the fate of all lands - and so you gave up the only life you’ve ever known.'
					},
					{
						id: 'career-warden-ii-6',
						name: 'Theft',
						description: 'You were responsible for guarding something precious, something vital to your region’s survival. But you let someone in, and they betrayed your trust by stealing the thing you were meant to guard. You left your chosen territory to atone for your mistake.'
					}
				],
				selectedID: 'career-warden-ii-1'
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static highElfTactician = {
		id: '7it9NqSWNlAo8JeB',
		name: 'The Earth Cries The Skies Divide',
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
															usage: 'Action',
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
														target: '2 creatures or objects',
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
														persistence: []
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
															tier2: '6 + M or A damage',
															tier3: '9 + M or A damage'
														},
														test: null,
														effect: 'The target is taunted (EoT).',
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
									target: '1 creature',
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
									persistence: []
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
										usage: 'Action',
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
									target: '1 ally',
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
									persistence: []
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
					persistence: []
				},
				{
					id: 'tactician-ability-2',
					name: 'Concussive Strike',
					description: 'Your precise strike leaves your foe struggling to respond.',
					type: {
						usage: 'Action',
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
						tier1: '3 + M damage; M < [weak], dazed (save ends)',
						tier2: '5 + M damage; M < [average], dazed (save ends)',
						tier3: '8 + M damage; M < [strong], dazed (save ends)'
					},
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
						usage: 'Action',
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
						tier1: '3 + M damage; you or one ally within 10 squares can spend a Recovery',
						tier2: '5 + M damage; you or one ally within 10 squares can spend a Recovery',
						tier3: '8 + M damage; you or one ally within 10 squares can spend a Recovery, and each of you gains an edge on the next ability power roll they make in the encounter'
					},
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Each target can move their speed.',
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
						usage: 'Action',
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
					target: '1 creature or object',
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
					persistence: []
				},
				{
					id: 'tactician-ability-6',
					name: 'The Mind Game',
					description: 'Your attack demoralizes your foe. Your allies begin to think you can win.',
					type: {
						usage: 'Action',
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
					target: '2 allies',
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
					persistence: []
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
					persistence: []
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, if that target has R < [average], they are frightened of the damage dealer (save ends).',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
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
					persistence: []
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
															target: '2 creatures',
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
													description: '“Try picking on someone MY size.”',
													type: 'Ability',
													data: {
														ability: {
															id: 'tactician-sub-1-2-2b',
															name: 'Try Me Instead',
															description: '“Try picking on someone MY size.”',
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
											target: '1 enemy',
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
																usage: 'Action',
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
															target: '1 creature',
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
															persistence: []
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
															target: '2 creatures',
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
											target: 'Self or 1 ally',
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
															target: '1 enemy',
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
															preEffect: '',
															powerRoll: null,
															test: null,
															effect: 'Until the start of your next turn, each target gains a bonus to their Stability equal to your Might score. Additionally, each target gains two surges.',
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static humanCensor = {
		id: 'qrjxZPFJhWdJiZyk',
		name: 'Jennet',
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
										persistence: []
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
																persistence: []
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
							description: 'You utter a pray that outlines your foe in holy energy.',
							type: 'Ability',
							data: {
								ability: {
									id: 'censor-1-4',
									name: 'Judgment',
									description: 'You utter a pray that outlines your foe in holy energy.',
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
															tier1: '2 + M or A damage; push 1',
															tier2: '5 + M or A damage; push 2',
															tier3: '7 + M or A damage; push 3; M < [strong] prone'
														},
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
					persistence: []
				},
				{
					id: 'censor-ability-2',
					name: 'Every Step ... Death!',
					description: 'You show your foe a glimpse of their fate after death.',
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
					persistence: []
				},
				{
					id: 'censor-ability-3',
					name: 'Halt, Miscreant!',
					description: '“Your race is run!”',
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
					persistence: []
				},
				{
					id: 'censor-ability-4',
					name: 'Your Allies Cannot Save You!',
					description: '“See how they abandon you!”',
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
					persistence: []
				},
				{
					id: 'censor-ability-5',
					name: 'Behold, a Shield of Faith!',
					description: '“Allow me to intercede.”',
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
					persistence: []
				},
				{
					id: 'censor-ability-6',
					name: 'Driving Assault',
					description: 'As you force your enemy back with your weapon, you use your faith to stay close.',
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
					persistence: []
				},
				{
					id: 'censor-ability-7',
					name: 'The Gods Punish and Defend',
					description: 'You channel holy energy to smite a foe and heal an ally.',
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
					persistence: []
				},
				{
					id: 'censor-ability-8',
					name: 'Repent!',
					description: 'You conjure memories of their sins.',
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
					persistence: []
				},
				{
					id: 'censor-ability-9',
					name: 'Arrest',
					description: '“I got you, you son of a bitch.”',
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
					persistence: []
				},
				{
					id: 'censor-ability-10',
					name: 'Behold the Face of Evil!',
					description: 'You show your enemies a vision of the true nature of one of their companions.',
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
					persistence: []
				},
				{
					id: 'censor-ability-11',
					name: 'Censored',
					description: 'Judged and sentenced.',
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
					persistence: []
				},
				{
					id: 'censor-ability-12',
					name: 'Purifying Fire',
					description: 'The gods judge, fire cleanses.',
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
															preEffect: '',
															powerRoll: null,
															test: null,
															effect: 'Each target takes twice your Presence in holy damage. Any hidden enemies are automatically revealed and can’t become hidden again until the start of your next turn. You can use Judgment on one of the targets as a free triggered action.',
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
													description: 'I am the law!',
													type: 'Ability',
													data: {
														ability: {
															id: 'censor-sub-3-2-3b',
															name: 'Sentenced',
															description: 'I am the law!',
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static humanNull = {
		id: '75cnGojH6jMwHJQq',
		name: 'Ashley',
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
										persistence: []
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
									persistence: []
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
									persistence: []
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
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-2',
					name: 'Faster than the Eye',
					description: 'You strike so quickly that your hands become a blur.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-3',
					name: 'Inertial Step',
					description: 'You flit about the battlefield with an opportunistic strike.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-4',
					name: 'Joint Lock',
					description: 'You contort your enemy’s body into a stance they struggle to escape from.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-5',
					name: 'Kinetic Strike',
					description: 'Your opponent staggers. They cannot ignore you.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-6',
					name: 'Magnetic Strike',
					description: 'The force of your blow extends past the limits of your body, pulling your enemy closer.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-7',
					name: 'Phase Inversion Strike',
					description: 'You step momentarily out of phase as you pull an enemy through you.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-8',
					name: 'Pressure Points',
					description: 'You strike at key nerve clusters to leave your foe staggered.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-9',
					name: 'Chronal Spike',
					description: 'You foresee the best moment to strike, then exploit it.',
					type: {
						usage: 'Action',
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the area of your Null Field ability increases by 1. When you end your turn, each enemy in that area takes psychic damage equal to your Intuition score.',
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
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-12',
					name: 'Stunning Blow',
					description: 'You focus your psionic technique into a debilitating concussive punch.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-13',
					name: 'Arcane Disruptor',
					description: 'Your blow reorders a foe’s body, causing pain if they attempt to channel sorcery.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-15',
					name: 'Phase Strike',
					description: 'For a moment, your foe slips out of phase with this manifold.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'null-ability-16',
					name: 'A Squad Unto Myself',
					description: 'You move so quickly, it seems as though an army assaulted your foes.',
					type: {
						usage: 'Action',
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy in the area takes a bane on ability power rolls.',
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy who has I < average and enters the area for the first time in a round or starts their turn there is bleeding (save ends). The first time any ally enters the area or starts their turn there, they gain temporary Stamina equal to your Intuition score.',
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and any ally in the area ignore difficult terrain, reduce the potency of enemy effects targeting them by 1, and can use a free triggered action at the start of each of their turns to end one condition or effect that is affecting them.',
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
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, enemies who take damage in the area taken additional psychic damage equal to twice your Intuition score.',
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
													description: 'The force of your strike manifests in a surprising location.',
													type: 'Ability',
													data: {
														ability: {
															id: 'null-sub-1-2-2b',
															name: 'Force Redirected',
															description: 'The force of your strike manifests in a surprising location.',
															type: {
																usage: 'Action',
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
																usage: 'Action',
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
															preEffect: '',
															powerRoll: null,
															test: null,
															effect: 'Until the start of your next turn, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and your allies benefit from concealment while in the area. When you end your turn, each enemy in the aura takes cold damage equal to your Intuition score.',
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
																usage: 'Action',
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static humanTalent = {
		id: 'utdBEimMHFG2Em3P',
		name: 'Garrick',
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
										persistence: []
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
			id: 'culture-monastic-order',
			name: 'Monastic Order',
			description: 'Secluded, bureaucratic, academic.',
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
				id: 'up-academic',
				name: 'Academic',
				description: 'Heroes with an academic upbringing were raised by people who collect, study, and share books and other records. Some academics focus on one area of study, such as a college for wizards dedicated to the study of magic, or a church that teaches the word of one deity. People in an academic culture learn how to wield the power that is knowledge.',
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
			}
		},
		class: {
			id: 'class-talent',
			name: 'Talent',
			description: '\nThe talent is a master of psionics - a source of incredible power created through sheer force of will. A talent can move and change matter, time, gravity, the laws of physics, or another creature’s mind. In rare occurrences, people are born with the potential to harness psionic power, but only those who experience an awakening, an event that activates a talent’s abilities, can actually tap into the mind’s full strength.\n\nA talent is limited only by the strength of their mind. Powerful psionic heroes can have multiple active powers at once and change reality at will. But with this limitless potential comes a gamble. Every manifestation has a chance of harming the talent, and those who use too many too quickly die from the exertion.',
			heroicResource: 'Clarity',
			subclassName: 'Tradition',
			subclassCount: 1,
			primaryCharacteristicsOptions: [
				[
					'Reason',
					'Presence'
				]
			],
			primaryCharacteristics: [
				'Reason',
				'Presence'
			],
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'talent-stamina',
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
							id: 'talent-recoveries',
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
							id: 'talent-skill-a',
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
							id: 'talent-skill-b',
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
							id: 'talent-skill-c',
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
									'Empathize',
									'Timescape'
								]
							}
						},
						{
							id: 'talent-1-1',
							name: 'Clarity and Strain',
							description: '\nAt the start of each of your turns during combat, you gain 1d3 clarity. You gain 1 clarity the first time each round that a creature is force moved.\n\nYou can spend clarity you do not have, pushing that Heroic Resource into negative numbers, to a maximum negative value equal to 1 + your Reason score. At the end of each of your turns, you take 1 damage for each negative point of clarity.\n\nWhenever you have clarity below 0, you are strained. Some psionic abilities have additional effects if you are already strained or become strained when you use them. Strained effects can still impact you even after you are no longer strained.',
							type: 'Text',
							data: null
						},
						{
							id: 'talent-1-2',
							name: 'Mind Spike',
							description: 'A telepathic bolt instantly zaps a creature’s brain.',
							type: 'Ability',
							data: {
								ability: {
									id: 'talent-1-2',
									name: 'Mind Spike',
									description: 'A telepathic bolt instantly zaps a creature’s brain.',
									type: {
										usage: 'Action',
										free: false,
										trigger: '',
										time: '',
										qualifiers: [
											'can be used as a ranged free strike'
										]
									},
									keywords: [
										'Psionic',
										'Ranged',
										'Strike',
										'Telepathy'
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
									preEffect: '',
									powerRoll: {
										characteristic: [
											'Reason'
										],
										bonus: 0,
										tier1: '2 + R psychic damage',
										tier2: '4 + R psychic damage',
										tier3: '6 + R psychic damage'
									},
									test: null,
									effect: '',
									strained: 'The strike deals an extra 2 psychic damage to the target and to you. The damage you take can’t be reduced in any way.',
									alternateEffects: [],
									spend: [],
									persistence: []
								}
							}
						},
						{
							id: 'talent-1-3',
							name: 'Mindspeech',
							description: '',
							type: 'Language',
							data: {
								language: 'Mindspeech'
							}
						},
						{
							id: 'talent-1-4',
							name: 'Telepathic Speech',
							description: 'You can telepathically communicate with any creatures within the distance of your Mind Spike ability if they share a language with you and you know of each other. The receiver of your telepathic communications can choose to respond telepathically.',
							type: 'Text',
							data: null
						},
						{
							id: 'talent-1-5',
							name: 'Psionic Augmentation',
							description: 'Through psionic meditation, you create pathways in your mind that enhance your statistics. Choose one of the following augmentations. You can change your augmentation along with your ward by undergoing a psionic meditation as a respite activity.',
							type: 'Choice',
							data: {
								options: [
									{
										feature: {
											id: 'talent-1-5a',
											name: 'Battle Augmentation',
											description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this augmentation.',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'talent-1-5aa',
														name: 'Battle Augmentation',
														description: 'While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.',
														type: 'Text',
														data: null
													},
													{
														id: 'talent-1-5ab',
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
													}
												]
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'talent-1-5b',
											name: 'Distance Augmentation',
											description: '',
											type: 'Ability Distance',
											data: {
												keywords: [
													'Psionic',
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
											id: 'talent-1-5c',
											name: 'Density Augmentation',
											description: 'Stamina, Stability',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'talent-1-5ca',
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
														id: 'talent-1-5cb',
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
													}
												]
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'talent-1-5d',
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
											id: 'talent-1-5e',
											name: 'Speed Augmentation',
											description: 'Speed, Disengage',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'talent-1-5ea',
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
														id: 'talent-1-5eb',
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
										id: 'talent-1-5b',
										name: 'Distance Augmentation',
										description: '',
										type: 'Ability Distance',
										data: {
											keywords: [
												'Psionic',
												'Ranged'
											],
											value: 2,
											valueCharacteristics: [],
											valueCharacteristicMultiplier: 0,
											valuePerLevel: 0,
											valuePerEchelon: 0
										}
									}
								]
							}
						},
						{
							id: 'talent-1-6',
							name: 'Talent Ward',
							description: 'Through psionic meditation, you create a ward that protects you. Choose one of the following wards. You can change your ward along with your psionic augmentation by undergoing a psionic meditation as a respite activity.',
							type: 'Choice',
							data: {
								options: [
									{
										feature: {
											id: 'talent-1-6a',
											name: 'Entropy Ward',
											description: 'You ward slows time for your enemies. Whenever a creature deals damage to you, their speed is reduced by an amount equal to your Reason score and they can’t use triggered actions, all until the end of their next turn.',
											type: 'Text',
											data: null
										},
										value: 1
									},
									{
										feature: {
											id: 'talent-1-6b',
											name: 'Repulsive Ward',
											description: 'You surround yourself with an invisible ward of telekinetic energy.',
											type: 'Ability',
											data: {
												ability: {
													id: 'talent-1-6b',
													name: 'Repulsive Ward',
													description: 'You surround yourself with an invisible ward of telekinetic energy.',
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
													effect: 'You can push your attacker up to a number of squares equal to your Reason score.',
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
											id: 'talent-1-6c',
											name: 'Steel Ward',
											description: 'Your ward reacts to danger, protecting your body from future harm. Whenever you take damage, the damage resolves and you then gain damage immunity equal to your Reason score until the end of your next turn.',
											type: 'Text',
											data: null
										},
										value: 1
									},
									{
										feature: {
											id: 'talent-1-6d',
											name: 'Vanishing Ward',
											description: 'Your ward allows you to slip away from danger. Whenever you take damage, you become invisible until the end of your next turn.',
											type: 'Text',
											data: null
										},
										value: 1
									}
								],
								count: 1,
								selected: [
									{
										id: 'talent-1-6b',
										name: 'Repulsive Ward',
										description: 'You surround yourself with an invisible ward of telekinetic energy.',
										type: 'Ability',
										data: {
											ability: {
												id: 'talent-1-6b',
												name: 'Repulsive Ward',
												description: 'You surround yourself with an invisible ward of telekinetic energy.',
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
												effect: 'You can push your attacker up to a number of squares equal to your Reason score.',
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
							id: 'talent-1-7',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 'signature',
								minLevel: 1,
								count: 2,
								selectedIDs: [
									'talent-ability-3',
									'talent-ability-4'
								]
							}
						},
						{
							id: 'talent-1-8',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 3,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'talent-ability-9'
								]
							}
						},
						{
							id: 'talent-1-9',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 5,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'talent-ability-13'
								]
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'talent-2-1',
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
							id: 'talent-3-1',
							name: 'Scan',
							description: 'You can extend your psionic senses out beyond their normal range. You can search for hidden creatures as a free maneuver once on each of your turns. Additionally, once you establish line of effect to a thinking creature within the distance of your Mind Spike ability, you always have line of effect to that creature until they leave move outside that distance.',
							type: 'Text',
							data: null
						},
						{
							id: 'talent-3-2',
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
					id: 'talent-ability-1',
					name: 'Entropic Bolt',
					description: 'You advance an enemy’s age for a moment.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Chronopathy',
						'Psionic',
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
						tier1: '2 + P corruption damage; P < [weak], slowed (save ends)',
						tier2: '3 + P corruption damage; P < [average], slowed (save ends)',
						tier3: '5 + P corruption damage; P < [strong], slowed (save ends)'
					},
					test: null,
					effect: 'The target takes 1 extra corruption damage for each additional time they are targeted by this ability in the encounter.',
					strained: 'You gain 1 clarity on a tier 2 or tier 3 result.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-2',
					name: 'Incinerate',
					description: 'The air erupts into a column of smokeless flame.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Area',
						'Fire',
						'Ranged',
						'Pyrokinesis'
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
					effect: 'A column of fire lingers in the area until the start of your next turn. Each enemy who enters the area for the first time in a round or starts their turn there takes 2 fire damage.',
					strained: 'The size of the cube increases by 2, but the fire disappears at the end of your turn.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-3',
					name: 'Hoarfrost',
					description: 'A row of the terrain freezes over ahead of you, turning hard and slick.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Cryokinesis',
						'Psionic',
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
							'Reason'
						],
						bonus: 0,
						tier1: '2 + R cold damage; M < [weak], slowed (EoT)',
						tier2: '4 + R cold damage; M < [average], slowed (EoT)',
						tier3: '6 + R cold damage; M < [strong], slowed (EoT)'
					},
					test: null,
					effect: '',
					strained: 'A target slowed by this ability is restrained instead, and you are slowed until the end of your next turn.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-4',
					name: 'Kinetic Grip',
					description: 'You lift and hurl your foe away from you.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Melee',
						'Psionic',
						'Telekinesis'
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
					target: 'One size 1 creature or object',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Reason'
						],
						bonus: 0,
						tier1: 'Push 3',
						tier2: 'Push 5',
						tier3: 'Push 7; prone'
					},
					test: null,
					effect: 'You can slide the target up to 2 squares before making the power roll.',
					strained: 'You can’t use this ability’s effect, but you can vertical push the target.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-5',
					name: 'Kinetic Pulse',
					description: 'The force of your mind hurls enemies backward.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Area',
						'Psionic',
						'Telepathy'
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
							'Reason'
						],
						bonus: 0,
						tier1: '2 psychic damage',
						tier2: '5 psychic damage; push 1',
						tier3: '7 psychic damage; push 2'
					},
					test: null,
					effect: '',
					strained: 'The size of the burst increases by 2, and you are bleeding until the start of your next turn.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-6',
					name: 'Materialize',
					description: 'You picture an object in your mind and give it form in the world, directly above your opponent’s head.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Resopathy',
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
						tier1: '3 + R damage',
						tier2: '5 + R damage',
						tier3: '8 + R damage'
					},
					test: null,
					effect: 'A size 1M object drops onto the target and then rolls into an adjacent, unoccupied space of your choice. The object is made of wood, stone, or metal (your choice).',
					strained: 'The object is explodes on impact, dealing damage equal to your Reason score to each creature adjacent to the target. You also take damage equal to your Reason score, which can’t be reduced in any way.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-7',
					name: 'Optic Blast',
					description: 'Your eyes emit rays of powerful enervating force.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Metamorphosis',
						'Psionic',
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
						tier1: '2 + R damage; M < [weak], prone',
						tier2: '4 + R damage; M < [average], prone',
						tier3: '6 + R damage; M < [strong], prone'
					},
					test: null,
					effect: 'When targeting an object with a solid reflective surface or a creature carrying or wearing such an object (a mirror, an unpainted metal shield, shiny metal plate armor, and so forth), you can choose an additional target within 3 squares of the first target.',
					strained: 'You gain a surge, which you can use immediately, and take damage equal to your Reason score, which can’t be reduced in any way.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-8',
					name: 'Spirit Sword',
					description: 'You form a blade of mind energy and stab your target, invigorating yourself.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Animapathy',
						'Melee',
						'Psionic',
						'Strike'
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
						tier1: '3 + P damage',
						tier2: '6 + P damage',
						tier3: '9 + P damage'
					},
					test: null,
					effect: 'You gain a surge.',
					strained: 'The attack deals an extra 3 damage to the target and to you. The damage you take can’t be reduced in any way.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-9',
					name: 'Awe',
					description: 'You project psionic energy out to a creature and take on a new visage in their mind.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Strike',
						'Telepathy'
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
					target: 'One ally or enemy',
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: 'Any ally targeted by this ability gains temporary Stamina equal to twice your Presence score, and can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.',
					powerRoll: {
						characteristic: [
							'Reason'
						],
						bonus: 0,
						tier1: '3 + P psychic damage; I < [weak], frightened (save ends)',
						tier2: '6 + P psychic damage; I < [average], frightened (save ends)',
						tier3: '9 + P psychic damage; I < [strong], frightened (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-10',
					name: 'Nothing Exceeds My Grasp',
					description: 'Be careful not to choke on your aspirations.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Strike',
						'Telekinesis'
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
							'Reason'
						],
						bonus: 0,
						tier1: '3 + R damage; M < [weak], slowed (save ends)',
						tier2: '5 + R damage; M < [average], slowed (save ends)',
						tier3: '8 + R damage; M < [strong], restrained (save ends)'
					},
					test: null,
					effect: 'You can vertical pull the target up to 2 squares. You can pull a target restrained by this ability, ignoring their stability.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-11',
					name: 'Precognition',
					description: 'You give a target a glimpse into the future so that they’re ready for what comes next.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Chronopathy',
						'Melee',
						'Psionic'
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Ability power rolls against the target have a bane until the start of your next turn. Whenever the target takes damage while under this effect, they can use a triggered action to make a free strike against the source of the damage.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-12',
					name: 'Smolder',
					description: 'Smoke flows from your enemy like tears as their skin begins to blacken and flake.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Pyrokinesis',
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
					preEffect: 'The target takes damage before this ability imposes any weakness effect. The damage type and the weakness for this ability must be chosen from one of the following: acid, corruption, or fire.',
					powerRoll: {
						characteristic: [
							'Reason'
						],
						bonus: 0,
						tier1: '3 + R damage; R < [weak], the target has weakness 5 (save ends)',
						tier2: '6 + R damage; R < [average], the target has weakness 5 (save ends)',
						tier3: '9 + R damage; R < [strong], the target has weakness equal to 5 + your Reason score (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-13',
					name: 'Flashback',
					description: 'The target is thrown several seconds back through time, and gets to do it all again.',
					type: {
						usage: 'Maneuver',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Chronopathy',
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
					target: 'Self or one ally',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'The target immediately uses an ability they’ve previously used this round without spending any heroic resources.',
					strained: 'You take 1d6 damage and are slowed (save ends).',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-14',
					name: 'Inertia Soak',
					description: 'Your psionic energy surrounds the target and pushes everything else away from them.',
					type: {
						usage: 'Maneuver',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Telekinesis'
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
					effect: 'The target ignores difficult terrain and takes no damage from forced movement until the start of your next turn. Whenever the target moves into a square while under this effect, they can push one adjacent creature up to 2 squares. If pushing an ally, the target can ignore that ally’s stability.',
					strained: 'You are weakened and your stability decreases by 5 (save ends). If your stability becomes a negative value, it adds to the distance you are force moved.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-15',
					name: 'Iron',
					description: 'The target’s skin turns to hard, dark metal, impenetrable and dense.',
					type: {
						usage: 'Maneuver',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Metamorphosis',
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
					target: 'Self or one ally',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'The target’s stability increases by 5 and they gain 10 temporary stamina and two surges.',
					strained: 'You can’t use maneuvers (save ends).',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-16',
					name: 'Perfect Clarity',
					description: 'You clear the mind of nothing but the goal.',
					type: {
						usage: 'Maneuver',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Telepathy'
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
					effect: 'Until the start of your next turn, the target gains a +3 bonus to speed, and they have a double edge on the next power roll they make. If the target gets a tier 3 result on that roll, you gain 1 clarity.',
					strained: 'You take 1d6 damage, and you can’t use triggered actions (save ends).',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-17',
					name: 'Fling Through Time',
					description: 'You hurl the target through the annals of time, forcing them to witness every moment of their existence all at once.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Chronopathy',
						'Psionic',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Presence'
						],
						bonus: 0,
						tier1: '3 + P corruption damage; P < [weak], weakened (save ends)',
						tier2: '5 + P corruption damage; the target is flung through time; P < [average], weakened (save ends)',
						tier3: '8 + P corruption damage; the target is flung through time; P < [strong], weakened (save ends)'
					},
					test: null,
					effect: 'A target who is flung through time is removed from the encounter until the end of their next turn, reappearing in their original space or the nearest available space.',
					strained: 'You take 2d6 damage and grow visibly older (the equivalent of 10 years for a human). On a tier 3 result, you gain 2 clarity.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-18',
					name: 'Force Orb',
					description: 'Three spheres of solid psionic energy float around you.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Psionic',
						'Ranged',
						'Strike',
						'Telekinesis'
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
					preEffect: '\nYou create three size 1T orbs that orbit your body. Each orb you provides you with cumulative damage immunity 1. Whenever you take damage, you lose 1 orb.\n\nOnce on each of your turns, you can use a free maneuver to fire an orb at a creature or object within 5 squares as a ranged strike, losing the orb after the strike.',
					powerRoll: {
						characteristic: [
							'Reason'
						],
						bonus: 0,
						tier1: '2 damage',
						tier2: '3 damage',
						tier3: '5 damage'
					},
					test: null,
					effect: '',
					strained: 'You create five orbs. You are weakened while you have any orbs active.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-19',
					name: 'Reflector Field',
					description: 'A protective field reverses the momentum of incoming attacks.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Area',
						'Psionic',
						'Telepathy'
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
					target: 'Special',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'The aura lasts until the start of your next turn. Whenever an enemy targets an ally in the aura with a ranged ability, the ability is negated on the ally and reflected back at the enemy. The ability deals half the damage to the enemy that it would have dealt to the ally, and loses any additional effects.',
					strained: 'The size of the aura increases by 1. Each ability your aura reflects causes you to take 2d6 damage and makes you forget a memory, as determined in consultation with the Director.',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'talent-ability-20',
					name: 'Soul Burn',
					description: 'You blast their soul out of their body, leaving it to helplessly float back to a weakened husk.',
					type: {
						usage: 'Action',
						free: false,
						trigger: '',
						time: '',
						qualifiers: []
					},
					keywords: [
						'Animapathy',
						'Psionic',
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
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Presence'
						],
						bonus: 0,
						tier1: '6 + P damage; P < [weak], dazed (save ends)',
						tier2: '10 + P damage; P < [average], dazed (save ends)',
						tier3: '14 + P damage; P < [strong], dazed (save ends)'
					},
					test: null,
					effect: 'The target takes a bane on Presence tests until the end of the encounter.',
					strained: 'The potency of this ability increases by 1. You take 2d6 damage, and gain 3 surges.',
					alternateEffects: [],
					spend: [],
					persistence: []
				}
			],
			subclasses: [
				{
					id: 'talent-sub-1',
					name: 'Chronopathy',
					description: 'Abilities that allow you to view future and past events, and to manipulate time to aid allies and hinder foes.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'talent-sub-1-1-1',
									name: 'Accelerate',
									description: 'To your ally, it seems as though the world has slowed down.',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-1-1-1',
											name: 'Accelerate',
											description: 'To your ally, it seems as though the world has slowed down.',
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
													type: 'Ranged',
													value: 10,
													value2: 0,
													within: 0,
													special: '',
													qualifier: ''
												}
											],
											target: 'Self or one creature',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'The target immediately shifts up to a number of squares equal to your Reason score.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 2,
													effect: 'The target can also use a maneuver.',
													name: '',
													repeatable: false
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'talent-sub-1-1-2',
									name: 'Again',
									description: 'You step back a split second to see if things play out a little differently.',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-1-1-2',
											name: 'Again',
											description: 'You step back a split second to see if things play out a little differently.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'The target makes an ability power roll.',
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
											target: 'Self or one creature',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'You can use this ability after seeing the power roll for the triggering roll. You force the target to reroll the power roll and use the new result.',
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
									id: 'talent-sub-1-2-1',
									name: 'Ease the Hours',
									description: 'You can increase the number of rounds in a montage test by 1 if the test would end before the heroes hit the success limit.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-sub-1-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'talent-sub-1-2-2a',
													name: 'Applied Chronometrics',
													description: 'Time slows down around you. Your heartbeat is the only gauge of the extra moments you’ve gained.',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-1-2-2a',
															name: 'Applied Chronometrics',
															description: 'Time slows down around you. Your heartbeat is the only gauge of the extra moments you’ve gained.',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Chronopathy',
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
															target: 'Special',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Presence'
																],
																bonus: 0,
																tier1: 'Target two creatures, one of which can be you',
																tier2: 'Target three creatures, one of which can be you',
																tier3: 'Target four creatures, one of which can be you'
															},
															test: null,
															effect: 'Until the start of your next turn, each target gains a +5 bonus to speed, can’t be dazed, and they can use an additional maneuver on their turn. If a target is dazed, the condition ends for them.',
															strained: 'Your speed is halved until the end of the encounter.',
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
													id: 'talent-sub-1-2-2b',
													name: 'Slow',
													description: 'Perhaps they wonder why everyone else is moving so quickly?',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-1-2-2b',
															name: 'Slow',
															description: 'Perhaps they wonder why everyone else is moving so quickly?',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Chronopathy',
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
															target: 'Three creatures or objects',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Presence'
																],
																bonus: 0,
																tier1: 'The target’s speed is halved (save ends), or if P < [weak], the target is slowed (save ends).',
																tier2: 'The target is slowed (save ends), or if P < [average], the target’s speed is 0 (save ends).',
																tier3: 'The target is slowed (save ends), or if P < [strong], the target’s speed is 0 (save ends).'
															},
															test: null,
															effect: 'A target can’t use triggered actions while their speed is reduced by this ability.',
															strained: 'The potency of this ability increases by 1 and you take 1d6 damage. At the start of each round while any target is affected by this ability, you take 1d6 damage. You can immediately end the effects on all affected targets (no action required).',
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
						}
					],
					selected: false
				},
				{
					id: 'talent-sub-2',
					name: 'Telekinesis',
					description: 'Abilities that allow you to physically manipulate creatures and objects.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'talent-sub-2-1-1',
									name: 'Minor Telekinesis',
									description: 'Wisps of psychic energy ripple visibly from your brain as you force the target to move using only your mind.',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-2-1-1',
											name: 'Minor Telekinesis',
											description: 'Wisps of psychic energy ripple visibly from your brain as you force the target to move using only your mind.',
											type: {
												usage: 'Maneuver',
												free: false,
												trigger: '',
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
											target: 'Self, or a size 1 creature or object',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'You slide the target up to a number of squares equal to your Reason score.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 2,
													repeatable: true,
													effect: 'The size of the creature or object you can target increases by 1 for every 2 clarity you spend.',
													name: ''
												},
												{
													value: 3,
													effect: 'You can vertical slide the target.',
													name: '',
													repeatable: false
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'talent-sub-2-1-2',
									name: 'Repel',
									description: 'They aren’t going anywhere, but you might!',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-2-1-2',
											name: 'Repel',
											description: 'They aren’t going anywhere, but you might!',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'The target takes damage or is force moved.',
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
											target: 'Self or one ally',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'The triggering damage is halved or distance of the triggering forced movement is reduced by a number of squares equal to your Reason score. If the target was damaged and force moved, you choose the effect. If the triggering forced movement is reduced to 0 squares, the target pushes the source of the forced movement a number of squares equal to your Reason score.',
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
									id: 'talent-sub-2-2-1',
									name: 'Ease their Fall',
									description: '',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-2-2-1',
											name: 'Ease their Fall',
											description: '',
											type: {
												usage: 'Triggered Action',
												free: true,
												trigger: 'You land after a fall, or any falling creature lands within 2 squares of you.',
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
											effect: 'You can reduce the falling damage by an amount equal to 2 + your Reason score.',
											strained: '',
											alternateEffects: [],
											spend: [],
											persistence: []
										}
									}
								},
								{
									id: 'talent-sub-2-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'talent-sub-2-2-2a',
													name: 'Gravitic Burst',
													description: 'Everyone get away from me!',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-2-2-2a',
															name: 'Gravitic Burst',
															description: 'Everyone get away from me!',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Area',
																'Psionic',
																'Telekinesis'
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
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Reason'
																],
																bonus: 0,
																tier1: '3 damage; vertical push 2',
																tier2: '6 damage; vertical push 4',
																tier3: '9 damage; vertical push 6'
															},
															test: null,
															effect: '',
															strained: 'The size of the burst increases by 1 and you are weakened until the end of your turn.',
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
													id: 'talent-sub-2-2-2b',
													name: 'Levity and Gravity',
													description: 'You raise the target into the air, then smother them against the ground.',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-2-2-2b',
															name: 'Levity and Gravity',
															description: 'You raise the target into the air, then smother them against the ground.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Psionic',
																'Ranged',
																'Strike',
																'Telekinesis'
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
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Reason'
																],
																bonus: 0,
																tier1: '6 + R damage; M < [weak], prone',
																tier2: '10 + R damage; M < [average], prone',
																tier3: '14 + R damage; M < [strong], prone and can’t stand (save ends)'
															},
															test: null,
															effect: 'A target made prone by this ability is lifted 2 squares into the air before falling immediately to the ground, taking damage as usual.',
															strained: 'You take half the damage the target takes, including any damage from falling.',
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
						}
					],
					selected: false
				},
				{
					id: 'talent-sub-3',
					name: 'Telepathy',
					description: 'Abilities that allow you to communicate with, read, and influence the minds of other creatures.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'talent-sub-3-1-1',
									name: 'Feedback Loop',
									description: 'Creating a brief psychic link between a foe and their target gives that foe a taste of their own medicine.',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-3-1-1',
											name: 'Feedback Loop',
											description: 'Creating a brief psychic link between a foe and their target gives that foe a taste of their own medicine.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'The target deals damage to an ally.',
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
											target: '1 creature',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'The target takes psychic damage equal to half the triggering damage.',
											strained: '',
											alternateEffects: [],
											spend: [],
											persistence: []
										}
									}
								},
								{
									id: 'talent-sub-3-1-2',
									name: 'Remote Assistance',
									description: 'An ally gains the benefit of your intellect.',
									type: 'Ability',
									data: {
										ability: {
											id: 'talent-sub-3-1-2',
											name: 'Remote Assistance',
											description: 'An ally gains the benefit of your intellect.',
											type: {
												usage: 'Maneuver',
												free: false,
												trigger: '',
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
											target: '1 creature or object',
											cost: 0,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'The next ability power roll an ally makes against the target before the start of your next turn gains an edge.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'You target one additional creature or object.',
													name: '',
													repeatable: false
												}
											],
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
									id: 'talent-sub-3-2-1',
									name: 'Ease the Mind',
									description: 'You gain an edge on tests to stop combat and start a negotiation. Any NPC who has a hostile or suspicious starting attitude in a negotiation has an additional 1 patience.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-sub-3-2-2',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'talent-sub-3-2-2a',
													name: 'Overwhelm',
													description: 'You overload their senses, turning all their subconscious thoughts into conscious ones.',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-3-2-2a',
															name: 'Overwhelm',
															description: 'You overload their senses, turning all their subconscious thoughts into conscious ones.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Psionic',
																'Ranged',
																'Strike',
																'Telepathy'
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
																	'Reason'
																],
																bonus: 0,
																tier1: '6 + R psychic damage; I < [weak], slowed (save ends)',
																tier2: '10 + R psychic damage; I < [average], weakened (save ends)',
																tier3: '14 + R psychic damage; I < [strong], dazed (save ends)'
															},
															test: null,
															effect: '',
															strained: 'You start crying. You can’t take triggered actions or take free strikes until the end of the target’s next turn.',
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
													id: 'talent-sub-3-2-2b',
													name: 'Synaptic Override',
													description: 'You gain control over an enemy’s nervous system. How pleasant for them.',
													type: 'Ability',
													data: {
														ability: {
															id: 'talent-sub-3-2-2b',
															name: 'Synaptic Override',
															description: 'You gain control over an enemy’s nervous system. How pleasant for them.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Psionic',
																'Ranged',
																'Telepathy'
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
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Reason'
																],
																bonus: 0,
																tier1: 'The target makes a free strike against one enemy of your choice.',
																tier2: 'The target shifts up to their speed and uses their signature ability against any enemies of your choice.',
																tier3: 'The target moves up to their speed and uses their signature ability against any enemies of your choice.'
															},
															test: null,
															effect: 'You control the target’s movement. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. However, you can',
															strained: 'You take 1d6 damage and are weakened until the end of your turn.',
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
					value: 1
				},
				{
					characteristic: 'Reason',
					value: 2
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
			id: 'career-agent',
			name: 'Agent',
			description: 'You worked as a spy for a government or organization.',
			features: [
				{
					id: 'career-agent-feature-1',
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
							'Sneak'
						]
					}
				},
				{
					id: 'career-agent-feature-2',
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
							'Lie'
						]
					}
				},
				{
					id: 'career-agent-feature-3',
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
							'Disguise'
						]
					}
				},
				{
					id: 'career-agent-feature-4',
					name: 'Language',
					description: '',
					type: 'Language Choice',
					data: {
						options: [],
						count: 2,
						selected: [
							'Vaslorian',
							'Yllyric'
						]
					}
				},
				{
					id: 'career-agent-feature-5',
					name: 'Intrigue Perk',
					description: '',
					type: 'Perk',
					data: {
						lists: [
							'Intrigue'
						],
						count: 1,
						selected: [
							{
								id: 'perk-forgettable-face',
								name: 'Forgettable Face',
								description: 'If you interact with a creature for less than 10 minutes and they haven’t met you before in the past, you can cause them to forget your face when you part. If asked to describe you, they give only a vague, blank, and unhelpful description. Additionally, if you spend at least 1 hour assembling a disguise, creatures who meet you in that disguise do not recognize your true face later from when you were in disguise.',
								type: 'Text',
								data: null,
								list: 'Intrigue'
							}
						]
					}
				}
			],
			incitingIncidents: {
				options: [
					{
						id: 'career-agent-ii-1',
						name: 'Disavowed',
						description: 'While on a dangerous espionage assignment, things went sideways. Although you escaped with your life, the mission was a public failure thanks to bad information your agency gave you. They denied you work for them, and you went on the run. Hero work will let you survive and clear your name.'
					},
					{
						id: 'career-agent-ii-2',
						name: 'Faceless',
						description: 'Your identity was always hidden. It was your way of protecting those around you because the work you did spying on powerful entities came with dangers. Then your world came crashing down when an enemy agent unmasked you, causing you to lose everything - your privacy, livelihood, loved ones, all gone in the blink of an eye. Instead of going into hiding, you became a public hero to protect the innocent in the name of those you lost.'
					},
					{
						id: 'career-agent-ii-3',
						name: 'Free Agent',
						description: 'There was a time in your life when you used to sell information to the highest bidder. Your acts were unsanctioned by any one organization, but you were well-connected enough to trade in secrets. Politics never mattered much to you until the information you sold wound up causing a ripple effect of harm that eventually destroyed the place you once called home. You became a hero to make up for your past.'
					},
					{
						id: 'career-agent-ii-4',
						name: 'Informed',
						description: 'After years of cultivating a rich list of informants, one of those informants risked everything to expose the heinous plans of powerful individuals. You promised to protect your informant, but your agency left them hanging - literally. You cut ties with your employer and swore to always make good on your word as a hero.'
					},
					{
						id: 'career-agent-ii-5',
						name: 'Spies and Lovers',
						description: 'While embedded in an undercover assignment, you fell for someone on the other side. They discovered you were a double-agent and though you insisted your feelings were real, the deceit cut too deep for your love interest to ignore. They exposed you, spurned you, or died because of their closeness to you. You left the espionage business to become a hero with nothing to hide.'
					},
					{
						id: 'career-agent-ii-6',
						name: 'Turncoat',
						description: 'You spent your life in service of your country or an organization that upheld your values. During your undercover operations, you discovered everything you were told was a lie. Whether you confronted your superiors or were exposed, you were stripped of your service medals before you left to become a true hero.'
					}
				],
				selectedID: null
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static orcConduit = {
		id: 'peDWE02tDZH9CK2P',
		name: 'Khettovek',
		folder: '',
		settingIDs: [
			'',
			'orden'
		],
		ancestry: {
			id: 'ancestry-orc',
			name: 'Orc',
			description: 'An anger that cannot be hidden. A fury that drives them in battle. Orcs are famed throughout the world as consummate warriors - a reputation that the peace-loving orcs find distasteful.',
			features: [
				{
					id: 'orc-feature-1',
					name: 'Relentless',
					description: 'When a creature deals damage to you that leaves you dying, you can make a free strike against any creature. If the creature is reduced to 0 Stamina by your strike, you can spend a Recovery.',
					type: 'Text',
					data: null
				},
				{
					id: 'orc-feature-2',
					name: 'Orc Traits',
					description: '',
					type: 'Choice',
					data: {
						options: [
							{
								feature: {
									id: 'orc-feature-2-1',
									name: 'Bloodfire Rush',
									description: 'The magic coursing through your veins makes you run faster in the heat of battle. When you take damage, your speed increases by 2 until the end of the round. You can benefit from this feature only once per round.',
									type: 'Text',
									data: null
								},
								value: 1
							},
							{
								feature: {
									id: 'orc-feature-2-2',
									name: 'Grounded',
									description: 'The magic in your blood makes it difficult for others to move you.',
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
								value: 1
							},
							{
								feature: {
									id: 'orc-feature-2-3',
									name: 'Passionate Artisan',
									description: 'When you are stirred by passion for creation, your bloodfire allows you to work longer and harder. Choose two skills from the crafting skill group. Whenever you make a project roll using these skills, you gain a +2 bonus to the roll.',
									type: 'Text',
									data: null
								},
								value: 1
							},
							{
								feature: {
									id: 'orc-feature-2-4',
									name: 'Glowing Recovery',
									description: 'Your bloodfire allows you to regain your strength quicker than others. When you can take the Catch Breath maneuver, you can spend as many Recoveries as you like instead of just one.',
									type: 'Text',
									data: null
								},
								value: 2
							},
							{
								feature: {
									id: 'orc-feature-2-5',
									name: 'Nonstop',
									description: 'Your bloodfire supplies you with a constant rush of adrenaline. You can’t be slowed.',
									type: 'Text',
									data: null
								},
								value: 2
							}
						],
						count: 3,
						selected: [
							{
								id: 'orc-feature-2-2',
								name: 'Grounded',
								description: 'The magic in your blood makes it difficult for others to move you.',
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
								id: 'orc-feature-2-5',
								name: 'Nonstop',
								description: 'Your bloodfire supplies you with a constant rush of adrenaline. You can’t be slowed.',
								type: 'Text',
								data: null
							}
						]
					}
				}
			]
		},
		culture: {
			id: 'culture-orc',
			name: 'Orc',
			description: 'Wilderness, anarchic, creative.',
			languages: [
				'Kalliac'
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
						'Endurance'
					]
				}
			},
			organization: {
				id: 'org-anarchic',
				name: 'Anarchic',
				description: 'In an anarchic culture, there are no rules and no one person leads the others. This might sound like complete chaos - people taking what they want when they want it - and some cultures that practice anarchy are. Other anarchic cultures are peaceful places where people mostly work for themselves, their friends, or their family, but rely on the whole group when times get tough.',
				type: 'Skill Choice',
				data: {
					options: [],
					listOptions: [
						'Exploration',
						'Intrigue'
					],
					count: 1,
					selected: [
						'Climb'
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
			id: 'class-conduit',
			name: 'Conduit',
			description: '\nThe power of the gods flows through you! As a vessel for divine magic, you don’t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. While the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.\n\nAs a conduit, you heal and buff your allies, and debuff your foes while smiting them with divine magic. The spark of divinity within you shines, aweing your enemies and granting you increased empathy.',
			heroicResource: 'Piety',
			subclassName: '',
			subclassCount: 0,
			primaryCharacteristicsOptions: [
				[
					'Intuition'
				]
			],
			primaryCharacteristics: [
				'Intuition'
			],
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'conduit-stamina',
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
							id: 'conduit-recoveries',
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
							id: 'conduit-1-1',
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
									'Persuade'
								]
							}
						},
						{
							id: 'conduit-1-2',
							name: 'Domain',
							description: '',
							type: 'Domain',
							data: {
								count: 2,
								selected: [
									{
										id: 'domain-life',
										name: 'Life',
										description: 'The Life domain.',
										featuresByLevel: [
											{
												level: 1,
												features: [
													{
														id: 'domain-life-1',
														name: 'Revitalizing Ritual, Exploration Skill',
														description: 'Revitalizing Ritual, Exploration Skill',
														type: 'Multiple Features',
														data: {
															features: [
																{
																	id: 'domain-life-1-1',
																	name: 'Revitalizing Ritual',
																	description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the chosen character gains a bonus to their recovery value equal to your level, which lasts until you finish another respite.',
																	type: 'Text',
																	data: null
																},
																{
																	id: 'domain-life-1-2',
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
														id: 'domain-life-2',
														name: 'Wellspring of Grace',
														description: 'A holy light is emitted from your body, healing your allies.',
														type: 'Ability',
														data: {
															ability: {
																id: 'domain-life-2',
																name: 'Wellspring of Grace',
																description: 'A holy light is emitted from your body, healing your allies.',
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
																		type: 'Aura',
																		value: 3,
																		value2: 0,
																		within: 0,
																		special: '',
																		qualifier: ''
																	}
																],
																target: 'Each ally in the area',
																cost: 5,
																repeatable: false,
																minLevel: 1,
																preEffect: '',
																powerRoll: null,
																test: null,
																effect: 'Until the end of the encounter or you are dying, whenever a target starts their turn in the aura, they can spend a Recovery.',
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
											}
										],
										piety: '\n* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you regains Stamina.\n* Prayer Effect: Choose yourself or one ally within 10 squares of you. The targets can spend a Recovery, can end any effects on them that are ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you and one ally within 10 squares of you gain temporary Stamina equal to 5 × your Intuition score.'
									},
									{
										id: 'domain-sun',
										name: 'Sun',
										description: 'The Sun domain.',
										featuresByLevel: [
											{
												level: 1,
												features: [
													{
														id: 'domain-sun-1',
														name: 'Inner Light, Lore Skill',
														description: 'Inner Light, Lore Skill',
														type: 'Multiple Features',
														data: {
															features: [
																{
																	id: 'domain-sun-1-1',
																	name: 'Inner Light',
																	description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. As you perform the ritual, you place a ray of morning light into the chosen character’s soul, granting them a +1 bonus on saving throws. This benefit lasts until you finish another respite.',
																	type: 'Text',
																	data: null
																},
																{
																	id: 'domain-sun-1-2',
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
														id: 'domain-sun-2',
														name: 'Morning Light',
														description: 'Light shines at your command, burning your foes and blessing your allies.',
														type: 'Ability',
														data: {
															ability: {
																id: 'domain-sun-2',
																name: 'Morning Light',
																description: 'Light shines at your command, burning your foes and blessing your allies.',
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
																target: 'Each enemy in the area',
																cost: 5,
																repeatable: false,
																minLevel: 1,
																preEffect: '',
																powerRoll: {
																	characteristic: [
																		'Intuition'
																	],
																	bonus: 0,
																	tier1: '4 fire damage',
																	tier2: '6 fire damage',
																	tier3: '10 fire damage'
																},
																test: null,
																effect: 'Each ally in the area deals fire damage equal to your Intuition score with their next strike made before the end of their next turn.',
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
											}
										],
										piety: '\n* Piety: You gain 2 piety the first time in an encounter that an enemy within 10 squares of you takes fire or holy damage.\n* Prayer Effect: One enemy of your choice within 10 squares of you takes fire damage equal to three times your Intuition score.'
									}
								]
							}
						},
						{
							id: 'conduit-1-3',
							name: 'Piety',
							description: '\nAt the start of each of your turns during combat, you gain 1d3 piety.\n\nAdditionally, you can gain more piety by praying to the gods - but beware! Doing so can easily draw their ire, as the gods hate to be annoyed. When you roll to gain 1d3 piety at the start of your turn, you can pray to gain the following additional effects (no action required):\n\n* If the roll is a 1, you gain 1 additional piety but anger the gods! You take psychic damage equal to 1d6 + your level, which can’t be reduced in any way.\n* If the roll is a 2, you gain 1 additional piety.\n* If the roll is a 3, you gain 2 additional piety and can activate a domain effect of your choice.',
							type: 'Package',
							data: {}
						},
						{
							id: 'conduit-1-4',
							name: 'Domain Feature Choice',
							description: '',
							type: 'Domain Feature',
							data: {
								level: 1,
								count: 1,
								selected: [
									{
										id: 'domain-life-1',
										name: 'Revitalizing Ritual, Exploration Skill',
										description: 'Revitalizing Ritual, Exploration Skill',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'domain-life-1-1',
													name: 'Revitalizing Ritual',
													description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the chosen character gains a bonus to their recovery value equal to your level, which lasts until you finish another respite.',
													type: 'Text',
													data: null
												},
												{
													id: 'domain-life-1-2',
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
							id: 'conduit-1-5',
							name: 'Healing Grace',
							description: 'Your divine energy restores the righteous.',
							type: 'Ability',
							data: {
								ability: {
									id: 'conduit-1-5',
									name: 'Healing Grace',
									description: 'Your divine energy restores the righteous.',
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
									target: 'Self or 1 ally',
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
											effect: '\nFor each piety spent, you can choose one of the following enhancements:\n\n* You can target one additional ally within distance.\n* You can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.\n* A prone target can stand up.\n* A target can spend 1 additional Recovery.',
											name: ''
										}
									],
									persistence: []
								}
							}
						},
						{
							id: 'conduit-1-6',
							name: 'Ray of Wrath',
							description: 'You unleash a blast of holy light upon your foe.',
							type: 'Ability',
							data: {
								ability: {
									id: 'conduit-1-6',
									name: 'Ray of Wrath',
									description: 'You unleash a blast of holy light upon your foe.',
									type: {
										usage: 'Action',
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
									target: '1 creature or object',
									cost: 0,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: {
										characteristic: [
											'Intuition'
										],
										bonus: 0,
										tier1: '2 + I damage',
										tier2: '4 + I damage',
										tier3: '6 + I damage'
									},
									test: null,
									effect: 'You can have this ability deal holy damage.',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: []
								}
							}
						},
						{
							id: 'conduit-1-7',
							name: 'Triggered Action',
							description: '',
							type: 'Choice',
							data: {
								options: [
									{
										feature: {
											id: 'conduit-1-7a',
											name: 'Word of Guidance',
											description: 'You invigorate an attacking ally with divine energy.',
											type: 'Ability',
											data: {
												ability: {
													id: 'conduit-1-7a',
													name: 'Word of Guidance',
													description: 'You invigorate an attacking ally with divine energy.',
													type: {
														usage: 'Triggered Action',
														free: false,
														trigger: 'The target makes an ability power roll for an ability that deals damage.',
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
													target: '1 ally',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: 'The power roll gains an edge.',
													strained: '',
													alternateEffects: [],
													spend: [
														{
															value: 1,
															effect: 'The power roll gains a double edge.',
															name: '',
															repeatable: false
														}
													],
													persistence: []
												}
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'conduit-1-7b',
											name: 'Word of Judgment',
											description: 'Your holy word saps an attacking enemy’s strength.',
											type: 'Ability',
											data: {
												ability: {
													id: 'conduit-1-7b',
													name: 'Word of Judgment',
													description: 'Your holy word saps an attacking enemy’s strength.',
													type: {
														usage: 'Triggered Action',
														free: false,
														trigger: 'The target takes damage from an ability that requires a power roll.',
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
													target: '1 ally',
													cost: 0,
													repeatable: false,
													minLevel: 1,
													preEffect: '',
													powerRoll: null,
													test: null,
													effect: 'The power roll gains a bane against the target.',
													strained: '',
													alternateEffects: [],
													spend: [
														{
															value: 1,
															effect: 'The power roll gains a double bane against the target.',
															name: '',
															repeatable: false
														}
													],
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
										id: 'conduit-1-7a',
										name: 'Word of Guidance',
										description: 'You invigorate an attacking ally with divine energy.',
										type: 'Ability',
										data: {
											ability: {
												id: 'conduit-1-7a',
												name: 'Word of Guidance',
												description: 'You invigorate an attacking ally with divine energy.',
												type: {
													usage: 'Triggered Action',
													free: false,
													trigger: 'The target makes an ability power roll for an ability that deals damage.',
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
												target: '1 ally',
												cost: 0,
												repeatable: false,
												minLevel: 1,
												preEffect: '',
												powerRoll: null,
												test: null,
												effect: 'The power roll gains an edge.',
												strained: '',
												alternateEffects: [],
												spend: [
													{
														value: 1,
														effect: 'The power roll gains a double edge.',
														name: '',
														repeatable: false
													}
												],
												persistence: []
											}
										}
									}
								]
							}
						},
						{
							id: 'conduit-1-8',
							name: 'Prayer',
							description: '',
							type: 'Choice',
							data: {
								options: [
									{
										feature: {
											id: 'conduit-1-8a',
											name: 'Prayer of Destruction',
											description: 'Your god infuses wrath within your being.',
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
											id: 'conduit-1-8b',
											name: 'Prayer of Distance',
											description: 'Your god blesses you with the ability to stretch your divine magic further.',
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
											id: 'conduit-1-8c',
											name: 'Prayer of Speed',
											description: 'Your god blesses your flesh and infuses it with divine quickness.',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'conduit-1-8ca',
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
														id: 'conduit-1-8cb',
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
											id: 'conduit-1-8d',
											name: 'Prayer of Soldier\'s Skill',
											description: 'Your god gives your mind the training of a soldier. You can wear light armor and wield light weapons effectively, even though you don’t have a kit. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this blessing.',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'conduit-1-8da',
														name: 'Prayer of Soldier\'s Skill',
														description: 'While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.',
														type: 'Text',
														data: null
													},
													{
														id: 'conduit-1-8db',
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
													}
												]
											}
										},
										value: 1
									},
									{
										feature: {
											id: 'conduit-1-8e',
											name: 'Prayer of Steel',
											description: 'Your god fills your body with the light of creation, making you harder to hurt and move.',
											type: 'Multiple Features',
											data: {
												features: [
													{
														id: 'conduit-1-8ea',
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
														id: 'conduit-1-8eb',
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
										id: 'conduit-1-8b',
										name: 'Prayer of Distance',
										description: 'Your god blesses you with the ability to stretch your divine magic further.',
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
									}
								]
							}
						},
						{
							id: 'conduit-1-9',
							name: 'Conduit Ward',
							description: '',
							type: 'Choice',
							data: {
								options: [
									{
										feature: {
											id: 'conduit-1-9a',
											name: 'Bastion Ward',
											description: 'You god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.',
											type: 'Text',
											data: null
										},
										value: 1
									},
									{
										feature: {
											id: 'conduit-1-9b',
											name: 'Quickness Ward',
											description: 'The gods imbue a divine swiftness within you. Whenever an adjacent creature deals damage to you, you can shift up to a number of squares equal to your Intuition score after the damage is dealt.',
											type: 'Text',
											data: null
										},
										value: 1
									},
									{
										feature: {
											id: 'conduit-1-9c',
											name: 'Sanctuary Ward',
											description: 'In response to a foe’s aggression, the gods protect you. After another creature damages you, that creature can’t target you with a strike until you harm them or one of their allies, or until the end of their next turn.',
											type: 'Text',
											data: null
										},
										value: 1
									},
									{
										feature: {
											id: 'conduit-1-9d',
											name: 'Spirit Ward',
											description: 'Invisible spirits surround you if you are harmed. Whenever an adjacent creature deals damage to you, they take corruption damage equal to your Intuition score.',
											type: 'Text',
											data: null
										},
										value: 1
									}
								],
								count: 1,
								selected: [
									{
										id: 'conduit-1-9a',
										name: 'Bastion Ward',
										description: 'You god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.',
										type: 'Text',
										data: null
									}
								]
							}
						},
						{
							id: 'conduit-1-10',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 'signature',
								minLevel: 1,
								count: 2,
								selectedIDs: [
									'conduit-ability-1',
									'conduit-ability-2'
								]
							}
						},
						{
							id: 'conduit-1-11',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 3,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'conduit-ability-11'
								]
							}
						},
						{
							id: 'conduit-1-12',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 5,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'conduit-ability-14'
								]
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'conduit-2-1',
							name: 'The Lists of Heaven',
							description: 'Your patron is aware of your growing influence, making it easier to get their attention and power when you heal your allies. Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.',
							type: 'Text',
							data: null
						},
						{
							id: 'conduit-2-2',
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
							id: 'conduit-2-3',
							name: 'Domain Feature Choice',
							description: '',
							type: 'Domain Feature',
							data: {
								level: 1,
								count: 1,
								selected: []
							}
						},
						{
							id: 'conduit-2-4',
							name: 'Domain Feature Choice',
							description: '',
							type: 'Domain Feature',
							data: {
								level: 2,
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
							id: 'conduit-3-1',
							name: 'Minor Miracle',
							description: '\nAs a respite activity, you perform a religious ritual and beseech the gods to restore a dead creature to life. You must have at least half the creature’s remains, and they must have died within the last 24 hours from an effect that isn’t age related. The creature’s soul must be willing to return to life for the ritual to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately.\n\nA creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite.',
							type: 'Text',
							data: null
						},
						{
							id: 'conduit-3-2',
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
					id: 'conduit-ability-1',
					name: 'Blessed Light',
					description: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
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
					target: '1 creature or object',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I holy damage',
						tier2: '5 + I holy damage',
						tier3: '8 + I holy damage'
					},
					test: null,
					effect: 'An ally of your choice within distance gains a number of surges equal to the tier rolled.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-2',
					name: 'Drain',
					description: 'You drain the energy from your target and revitalize yourself or an ally.',
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
					target: '1 creature',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '2 + I corruption damage',
						tier2: '5 + I corruption damage',
						tier3: '7 + I corruption damage'
					},
					test: null,
					effect: 'You or one ally within distance can spend a Recovery.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-3',
					name: 'Holy Lash',
					description: 'A tendril of divine energy shoots forth to draw in your foe.',
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
					target: '1 creature or object',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I holy damage; vertical pull 2',
						tier2: '5 + I holy damage; vertical pull 3',
						tier3: '8 + I holy damage; vertical pull 4'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-4',
					name: 'Lightfall',
					description: 'A rain of holy light scours your enemies and repositions your allies.',
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
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '2 holy damage',
						tier2: '3 holy damage',
						tier3: '5 holy damage'
					},
					test: null,
					effect: 'You can teleport yourself and each ally in the area to unoccupied spaces in the area.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-5',
					name: 'Sacrificial Offer',
					description: 'Divine magic tears at your foe and defends a nearby friend.',
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
							'Intuition'
						],
						bonus: 0,
						tier1: '2 + I corruption damage',
						tier2: '4 + I corruption damage',
						tier3: '6 + I corruption damage'
					},
					test: null,
					effect: 'You or one ally within distance can impose a bane on one power roll made against them before the end of their next turn.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-6',
					name: 'Staggering Curse',
					description: 'A blast of judgment disorients your foe.',
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
					target: '1 creature or object',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I holy damage; slide 1',
						tier2: '5 + I holy damage; slide 2',
						tier3: '8 + I holy damage; slide 3'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-7',
					name: 'Warrior\'s Prayer',
					description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
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
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I holy damage',
						tier2: '6 + I holy damage',
						tier3: '9 + I holy damage'
					},
					test: null,
					effect: 'You or one ally within distance gains temporary Stamina equal to your Intuition score.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-8',
					name: 'Wither',
					description: 'A bolt of holy energy saps the life from a foe.',
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
					target: '1 creature or object',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I corruption damage; P < [weak], the target takes a bane on their next power roll',
						tier2: '5 + I corruption damage; P < [average], the target takes a bane on their next power roll',
						tier3: '8 + I corruption damage; P < [strong], the target takes a bane on their next power roll'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-9',
					name: 'Call the Thunder Down',
					description: 'You ask your saint for thunder and your prayer is answered.',
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
							'Intuition'
						],
						bonus: 0,
						tier1: '2 sonic damage; push 1',
						tier2: '3 sonic damage; push 2',
						tier3: '5 sonic damage; push 3'
					},
					test: null,
					effect: 'You can push each willing ally in the area. This forced movement ignores any ally’s stability.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-10',
					name: 'Font of Wrath',
					description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'You summon a spirit of size 2 who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. An enemy who moves within 2 squares of the spirit for the first time in a round or starts their turn there takes holy damage equal to your Intuition score.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-11',
					name: 'Judgment\'s Hammer',
					description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
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
					target: '1 creature or object',
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I holy damage; A < [weak], prone',
						tier2: '6 + I holy damage; A < [average], prone',
						tier3: '9 + I holy damage; A < [strong], prone and can’t stand (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-12',
					name: 'Violence Will Not Aid Thee',
					description: 'After some holy lightning, your enemy will think twice about their next attack.',
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I lightning damage',
						tier2: '6 + I lightning damage',
						tier3: '9 + I lightning damage'
					},
					test: null,
					effect: 'The first time on a turn that the target deals damage to another creature, the target of this ability takes another 1d10 lightning damage (save ends).',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-13',
					name: 'Corruption\'s Curse',
					description: 'Cursed by you, your enemy takes more damage from your allies.',
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
					target: '1 creature or object',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '3 + I corruption damage; M < [weak], damage weakness 5 (save ends)',
						tier2: '6 + I corruption damage; M < [average], damage weakness 5 (save ends)',
						tier3: '9 + I corruption damage; M < [strong], damage weakness 5 (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-14',
					name: 'Curse of Terror',
					description: 'Fear of divine judgment overwhelms your foe.',
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
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '6 + I holy damage; I < [weak], frightened (save ends)',
						tier2: '9 + I holy damage; I < [average], frightened (save ends)',
						tier3: '13 + I holy damage; I < [strong], frightened (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-15',
					name: 'Faith is Our Armor',
					description: 'The heroes’ armor glows with golden light, granting divine protection.',
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
					target: 'Self and up to three allies',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: 'The target gains 5 temporary Stamina',
						tier2: 'The target gains 10 temporary Stamina',
						tier3: 'The target gains 15 temporary Stamina'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-16',
					name: 'Sermon of Grace',
					description: 'You inspire your allies with tales of your saint’s great deeds.',
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
							value: 4,
							value2: 0,
							within: 0,
							special: '',
							qualifier: ''
						}
					],
					target: 'Each ally in the area',
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'Each target can spend a Recovery. When you use this ability, each target can use a free triggered action to end one effect that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-17',
					name: 'Fear of the Gods',
					description: 'Your divine magic makes a creature appear as what your enemies fear most.',
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
							value: 5,
							value2: 0,
							within: 10,
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
							'Intuition'
						],
						bonus: 0,
						tier1: '6 psychic damage; I < [weak], frightened (save ends)',
						tier2: '9 psychic damage; I < [average], frightened (save ends)',
						tier3: '13 psychic damage; I < [strong], frightened (save ends)'
					},
					test: null,
					effect: 'The targets are frightened of you or a creature you choose within 10 squares.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-18',
					name: 'Saint\'s Raiment',
					description: 'An ally becomes the wearer of an empowered golden cloak.',
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
					target: '1 ally',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'The target gains 20 Temporary Stamina and three surges.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-19',
					name: 'Soul Siphon',
					description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
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
					target: '1 enemy',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Intuition'
						],
						bonus: 0,
						tier1: '7 + I corruption damage',
						tier2: '10 + I corruption damage',
						tier3: '15 + I corruption damage'
					},
					test: null,
					effect: 'One ally within distance can spend any number of Recoveries (no action required).',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'conduit-ability-20',
					name: 'Words of Wrath and Grace',
					description: 'Your saint grants your enemies a vision of whatever they most fear.',
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
							value: 5,
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
							'Intuition'
						],
						bonus: 0,
						tier1: '2 holy damage',
						tier2: '5 holy damage',
						tier3: '7 holy damage'
					},
					test: null,
					effect: 'Each ally in the area can spend a Recovery.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				}
			],
			subclasses: [],
			level: 1,
			characteristics: [
				{
					characteristic: 'Might',
					value: 1
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
					value: 2
				},
				{
					characteristic: 'Presence',
					value: 2
				}
			]
		},
		career: {
			id: 'career-disciple',
			name: 'Disciple',
			description: 'You worked in a church, temple, or other religious institution as part of the clergy.',
			features: [
				{
					id: 'career-disciple-feature-1',
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
							'Religion'
						]
					}
				},
				{
					id: 'career-disciple-feature-2',
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
							'Culture',
							'Magic'
						]
					}
				},
				{
					id: 'career-disciple-feature-3',
					name: 'Project Points',
					description: '',
					type: 'Bonus',
					data: {
						field: 'Project Points',
						value: 240,
						valueCharacteristics: [],
						valueCharacteristicMultiplier: 1,
						valuePerLevel: 0,
						valuePerEchelon: 0
					}
				},
				{
					id: 'career-disciple-feature-4',
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
								id: 'perk-ritualist',
								name: 'Ritualist',
								description: 'You can spend 1 minute performing a magic ritual of blessing. At the end of the ritual, touch one willing creature, including yourself. The creature gains a double edge on the next test they make within the next minute. A creature can’t use this benefit on an activity that takes longer than a minute.',
								type: 'Text',
								data: null,
								list: 'Supernatural'
							}
						]
					}
				}
			],
			incitingIncidents: {
				options: [
					{
						id: 'career-disciple-ii-1',
						name: 'Angel\'s Advocate',
						description: 'Swayed by an evil faith, your cult was about to unleash horrors upon the world when an angel (figurative or literal) intervened. They convinced you to stop your cult’s efforts. Now you follow in the footsteps of the angel who showed you the righteous path.'
					},
					{
						id: 'career-disciple-ii-2',
						name: 'Dogma',
						description: 'Although you joined the religious institution under the guidance of a kind mentor, others within the house of worship became increasingly fanatical in their convictions. Your mentor sought to be a voice of reason in the rising tide of hatred and was tried as a heretic before being executed. Leaving the institution behind, you became a hero to uphold the beliefs you hold dear.'
					},
					{
						id: 'career-disciple-ii-3',
						name: 'Freedom to Worship',
						description: 'Your temple was destroyed in a religious conflict. The institution’s leaders sought retaliation, but you saw in these actions a ceaseless cycle of destruction that would lead to more conflict. Instead, you became a hero to protect religious freedoms, so all worshipers could practice their faith without fear.'
					},
					{
						id: 'career-disciple-ii-4',
						name: 'Lost Faith',
						description: 'You devoted your life to ministering to the sick and needy and other charitable work. Time and time again, tragedy struck those you served without rhyme or reason. Your prayers went unanswered, and your efforts went thankless. Eventually, you lost your faith in a higher power, and you left your church or temple to do good outside of any religious affiliation.'
					},
					{
						id: 'career-disciple-ii-5',
						name: 'Near-Death Experience',
						description: 'While serving at a religious institution, you almost died in an accident. When you woke, you had lost all memory of ever having worked for the church or temple. Though the clergy encouraged you to stay, you left to forge a new path. Your sense of altruism - whether instilled in you by your past work or a part of who you naturally are - guides you in your life.'
					},
					{
						id: 'career-disciple-ii-6',
						name: 'Taxing Times',
						description: 'The faith-based organization you were once part of became corrupt. It used its status in the community to accumulate wealth through tithes and its leaders sought political appointments. During a season of drought, the institution stockpiled resources and refused to give aid, resulting in the deaths of many. You became a hero to fight against such corruption and to honor your dearly departed.'
					}
				],
				selectedID: 'career-disciple-ii-4'
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static polderElementalist = {
		id: 'mr3vxPGN0NkoVsZe',
		name: 'Bethell',
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
							persistence: []
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
										usage: 'Action',
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
									target: '1 creature or object',
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
									persistence: []
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
											description: 'The protective shield you weave around yourself is made of all the elements to channel their full protective power.',
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
						usage: 'Action',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-2',
					name: 'Bifurcated Conflagration',
					description: 'Two jets of flame lance out at your command.',
					type: {
						usage: 'Action',
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
					target: '2 creatures or objects',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-3',
					name: 'Grasp of Beyond',
					description: 'You absorb the life energy of another creature and use it to teleport.',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-4',
					name: 'The Green Within, The Green Without',
					description: 'Whipping vines erupt from a foe’s body to grasp at another close by.',
					type: {
						usage: 'Action',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-5',
					name: 'A Meteoric Introduction',
					description: 'You give your enemy a gentle tap like an asteroid impact.',
					type: {
						usage: 'Action',
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
					target: '1 creature or object',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-6',
					name: 'Ray of Agonizing Self Reflection',
					description: 'You inflict pain and doubt in equal measure.',
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
					target: '1 creature or object',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-7',
					name: 'Unquiet Ground',
					description: 'A sudden storm of detritus assaults your foes and leaves them struggling to move.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-8',
					name: 'Viscous Fire',
					description: 'A jet of heavy fire erupts with elemental fury where it strikes.',
					type: {
						usage: 'Action',
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
					target: '1 creature or object',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-9',
					name: 'Behold the Mystery',
					description: 'You open a rift into the void to harry your foes.',
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
						usage: 'Action',
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
					target: '1 creature or object',
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
						usage: 'Action',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-12',
					name: 'Ripples in the Earth',
					description: 'Like a stone dropped into a pond, waves in the earth radiate from you.',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-13',
					name: 'Conflagration',
					description: 'A storm of fire descends upon your enemies.',
					type: {
						usage: 'Action',
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
						usage: 'Action',
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
						usage: 'Action',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-19',
					name: 'Translated Through Flame',
					description: 'Your ally disappears, then reappears in a burst of fire!',
					type: {
						usage: 'Action',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-20',
					name: 'Volcano\'s Embrace',
					description: 'Wrap them up in fire and melting stone.',
					type: {
						usage: 'Action',
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
					target: '1 creature',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-21',
					name: 'Erase',
					description: 'With a flick of the wrist, you phase creatures out of existence.',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-22',
					name: 'Maw of Earth',
					description: 'You open up the ground, unleashing a shower of stone and debris.',
					type: {
						usage: 'Action',
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
					target: '1 creature or object',
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
					persistence: []
				},
				{
					id: 'elementalist-ability-23',
					name: 'Swarm of Spirits',
					description: 'Guardian animal spirits surround you to harry your foes and bolster your allies.',
					type: {
						usage: 'Action',
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
												usage: 'Action',
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
											persistence: []
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
											target: 'Self or 1 ally',
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
												usage: 'Action',
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
											persistence: []
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
												usage: 'Action',
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
											target: 'Self or 1 ally',
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
											target: 'Self or 1 ally',
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
												usage: 'Action',
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
											persistence: []
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
											persistence: []
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
											target: 'Self or 1 ally',
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
											usage: 'Action',
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static polderShadow = {
		id: 'DKm8hWT6X5PNSpVz',
		name: 'Bellamy',
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
							persistence: []
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
						'Flirt'
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
						'Alchemy'
					]
				}
			}
		},
		class: {
			id: 'class-shadow',
			name: 'Shadow',
			description: '\nSubtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemies’ weaknesses.\n\nAs a shadow, you have abilities that deal a lot of damage, let you move swiftly across the battlefield and away from hazards, and allow you to fade from notice even in the middle of the most heated combat encounter. You also possess more skills than any other hero.',
			heroicResource: 'Insight',
			subclassName: 'Shadow College',
			subclassCount: 1,
			primaryCharacteristicsOptions: [
				[
					'Agility'
				]
			],
			primaryCharacteristics: [
				'Agility'
			],
			featuresByLevel: [
				{
					level: 1,
					features: [
						{
							id: 'shadow-stamina',
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
							id: 'shadow-recoveries',
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
							id: 'shadow-1-1',
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
									'Hide',
									'Sneak'
								]
							}
						},
						{
							id: 'shadow-1-3',
							name: 'Skills',
							description: '',
							type: 'Skill Choice',
							data: {
								options: [
									'Criminal Underworld'
								],
								listOptions: [
									'Exploration',
									'Interpersonal',
									'Intrigue'
								],
								count: 5,
								selected: [
									'Gymnastics',
									'Jump',
									'Lie',
									'Pick Lock',
									'Pick Pocket'
								]
							}
						},
						{
							id: 'shadow-1-4',
							name: 'Insight',
							description: '\nAt the start of each of your turns during combat, you gain 1d3 insight. The first time each round that you deal damage with at least one surge, you gain 1 insight.\n\nWhen you use a heroic ability that has a power roll, that ability costs 1 less insight if you have an edge or double edge on it. If the ability has multiple targets, the cost is reduced even if the ability has an edge or double edge against only one target.',
							type: 'Text',
							data: null
						},
						{
							id: 'shadow-1-5',
							name: 'Hesitation Is Weakness',
							description: 'Keep up the attack. Never give them a moment’s grace.',
							type: 'Ability',
							data: {
								ability: {
									id: 'shadow-1-5',
									name: 'Hesitation Is Weakness',
									description: 'Keep up the attack. Never give them a moment’s grace.',
									type: {
										usage: 'Triggered Action',
										free: true,
										trigger: 'Another hero ends their turn. That hero can’t have used this ability to start their turn.',
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
									cost: 1,
									repeatable: false,
									minLevel: 1,
									preEffect: '',
									powerRoll: null,
									test: null,
									effect: 'You take your turn after the triggering hero.',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: []
								}
							}
						},
						{
							id: 'shadow-1-5.5',
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
										id: 'kit-cloak-and-dagger',
										name: 'Cloak and Dagger',
										description: 'Providing throwable light weapons and light armor easily concealed by a cloak to confuse your enemies, the Cloak and Dagger kit makes you more mobile while providing a boost to your effectiveness at range and to your damage. This kit is good for a hero who wants to be able to move all over the battlefield while keeping their options open for using short-range attacks.',
										type: '',
										armor: [
											'Light Armor'
										],
										weapon: [
											'Light Weapon'
										],
										stamina: 3,
										speed: 2,
										stability: 0,
										meleeDamage: {
											tier1: 1,
											tier2: 1,
											tier3: 1
										},
										rangedDamage: {
											tier1: 1,
											tier2: 1,
											tier3: 1
										},
										meleeDistance: 0,
										rangedDistance: 5,
										disengage: 1,
										features: [
											{
												id: 'kit-cloak-and-dagger-signature',
												name: 'Fade',
												description: 'A stab, and a few quick, careful steps back.',
												type: 'Ability',
												data: {
													ability: {
														id: 'kit-cloak-and-dagger-signature',
														name: 'Fade',
														description: 'A stab, and a few quick, careful steps back.',
														type: {
															usage: 'Action',
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
															tier1: '2 + M or A damage; you shift 1 square',
															tier2: '5 + M or A damage; you shift up to 2 squares',
															tier3: '7 + M or A damage; you shift up to 3 squares'
														},
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
							id: 'shadow-1-6',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 'signature',
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'shadow-ability-2'
								]
							}
						},
						{
							id: 'shadow-1-7',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 3,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'shadow-ability-8'
								]
							}
						},
						{
							id: 'shadow-1-8',
							name: 'Ability',
							description: '',
							type: 'Class Ability',
							data: {
								cost: 5,
								minLevel: 1,
								count: 1,
								selectedIDs: [
									'shadow-ability-9'
								]
							}
						}
					]
				},
				{
					level: 2,
					features: [
						{
							id: 'shadow-2-1',
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
							id: 'shadow-3-1',
							name: 'Careful Observation',
							description: 'A moment of focus leaves a foe firmly in your sights.',
							type: 'Ability',
							data: {
								ability: {
									id: 'shadow-3-1',
									name: 'Careful Observation',
									description: 'A moment of focus leaves a foe firmly in your sights.',
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
											type: 'Special',
											value: 0,
											value2: 0,
											within: 0,
											special: '20 squares',
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
									effect: 'As long as you remain within distance of the target, maintain line of effect to them, and strike no other creature first, you gain a surge and an edge on the next strike you make against the assessed creature.',
									strained: '',
									alternateEffects: [],
									spend: [],
									persistence: []
								}
							}
						},
						{
							id: 'shadow-3-2',
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
					id: 'shadow-ability-1',
					name: 'Gasping in Pain',
					description: 'Your precise strikes let your allies take advantage of a target’s agony.',
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
							'Agility'
						],
						bonus: 0,
						tier1: '3 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage; I < [strong], prone'
					},
					test: null,
					effect: 'An ally of your choice within 5 squares of the target gains a surge.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-2',
					name: 'I Work Better Alone',
					description: 'It’s better, just you and me. Isn’t it?',
					type: {
						usage: 'Action',
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
					target: '1 creature',
					cost: 'signature',
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage'
					},
					test: null,
					effect: 'If the target has no allies adjacent to them, this strike deals extra damage equal to your Agility score.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-3',
					name: 'Teamwork Has Its Place',
					description: 'You attack an enemy, distracting them long enough for an ally to stab them.',
					type: {
						usage: 'Action',
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
						tier1: '3 + A damage',
						tier2: '6 + A damage',
						tier3: '9 + A damage'
					},
					test: null,
					effect: 'If an ally is adjacent to the target, the target takes extra damage equal to your Agility score.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-4',
					name: 'You Were Watching The Wrong One',
					description: 'They can’t watch both of you at once.',
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
							'Agility'
						],
						bonus: 0,
						tier1: '3 + A damage',
						tier2: '5 + A damage',
						tier3: '8 + A damage'
					},
					test: null,
					effect: 'As long as you have at least one ally within 5 squares of the target, you gain a surge. If you are flanking the target when you use this ability, choose one ally who is flanking with you. That ally also gain a surge.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-5',
					name: 'Disorienting Strike',
					description: 'Your attack leaves them reeling, allowing you to follow up.',
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '4 + A damage; slide 2',
						tier2: '6 + A damage; slide 3',
						tier3: '10 + A damage; slide 5'
					},
					test: null,
					effect: 'You can shift into any square the target leaves when you slide them.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-6',
					name: 'Eviscerate',
					description: 'You leave your foe bleeding out after a devastating attack.',
					type: {
						usage: 'Action',
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
					target: '1 creature',
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '4 + A damage; A < [weak], bleeding (save ends)',
						tier2: '6 + A damage; A < [average], bleeding (save ends)',
						tier3: '10 + A damage; A < [strong], bleeding (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-7',
					name: 'Get In Get Out',
					description: 'Move unexpectedly, strike fast, and be gone!',
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
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '5 + A damage',
						tier2: '8 + A damage',
						tier3: '11 + A damage'
					},
					test: null,
					effect: 'You can shift up to your speed, dividing that movement before or after your strike as desired.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-8',
					name: 'Two Throats At Once',
					description: 'A bargain.',
					type: {
						usage: 'Action',
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
					target: '2 creatures or objects',
					cost: 3,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '4 damage',
						tier2: '6 damage',
						tier3: '10 damage'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-9',
					name: 'Coup de Grâce',
					description: 'Your blade might be the last thing they see.',
					type: {
						usage: 'Action',
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
						tier1: '1d6 + 7 + A damage',
						tier2: '1d6 + 11 + A damage',
						tier3: '1d6 + 16 + A damage'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-10',
					name: 'One Hundred Throats',
					description: 'As you move across the battlefield, every foe within reach feels your wrath.',
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
					preEffect: 'You shift up to your speed. You make one power roll that targets up to three enemies, each of who became adjacent to you during the move.',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '3 damage',
						tier2: '6 damage',
						tier3: '9 + A damage'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-11',
					name: 'Set-Up',
					description: 'Your friends will thank you.',
					type: {
						usage: 'Action',
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
						tier1: '6 + A damage; R < [weak], the target has damage weakness 5 (save ends)',
						tier2: '9 + A damage; R < [average], the target has damage weakness 5 (save ends)',
						tier3: '13 + A damage; R < [strong], the target has damage weakness 5 (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-12',
					name: 'Shadowstrike',
					description: 'They have no idea what the college taught you.',
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
					cost: 5,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: null,
					test: null,
					effect: 'You make two signature strikes.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-13',
					name: 'Dancer',
					description: 'You enter a flow state that makes you nearly impossible to pin down.',
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
					effect: 'Until the end of the encounter, whenever an enemy moves adjacent to you or damages you, you can take the Disengage move action as a free triggered action.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-14',
					name: 'Misdirecting Strike',
					description: 'Why are you looking at ME?!',
					type: {
						usage: 'Action',
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
					target: '1 creature',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '9 + A damage',
						tier2: '13 + A damage',
						tier3: '18 + A damage'
					},
					test: null,
					effect: 'The target is taunted by a willing ally within 5 squares of you until the end of the target’s next turn.',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-15',
					name: 'Pinning Shot',
					description: 'One missile - placed well and placed hard.',
					type: {
						usage: 'Action',
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
					target: '1 creature',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '8 + A damage; A < [weak], restrained (save ends)',
						tier2: '12 + A damage; A < [average], restrained (save ends)',
						tier3: '16 + A damage; A < [strong], restrained (save ends)'
					},
					test: null,
					effect: '',
					strained: '',
					alternateEffects: [],
					spend: [],
					persistence: []
				},
				{
					id: 'shadow-ability-16',
					name: 'Staggering Blow',
					description: 'There’s no recovering from this.',
					type: {
						usage: 'Action',
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
					target: '1 creature',
					cost: 7,
					repeatable: false,
					minLevel: 1,
					preEffect: '',
					powerRoll: {
						characteristic: [
							'Agility'
						],
						bonus: 0,
						tier1: '7 + A damage; M < [weak], slowed (save ends)',
						tier2: '11 + A damage; M < [average], prone and can’t stand (save ends)',
						tier3: '16 + A damage; M < [strong], prone and can’t stand (save ends)'
					},
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
					id: 'shadow-sub-1',
					name: 'College of Black Ash',
					description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'shadow-sub-1-1-1',
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
									id: 'shadow-sub-1-1-2',
									name: 'Black Ash Teleport',
									description: 'In a swirl of black ash, you step from one place to another.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-1-1-2',
											name: 'Black Ash Teleport',
											description: 'In a swirl of black ash, you step from one place to another.',
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
											effect: 'You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you hide using this maneuver, you gain a surge.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													repeatable: true,
													effect: 'You teleport 1 additional square for each insight spent.',
													name: ''
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'shadow-sub-1-1-3',
									name: 'In All This Confusion',
									description: 'You vanish in a plume of black smoke to avoid danger.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-1-1-3',
											name: 'In All This Confusion',
											description: 'You vanish in a plume of black smoke to avoid danger.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'You take damage.',
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
											effect: 'You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													repeatable: true,
													effect: 'You teleport 1 additional square for each insight spent.',
													name: ''
												}
											],
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
									id: 'shadow-sub-1-2-1',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'shadow-sub-1-2-1a',
													name: 'In a Puff of Ash',
													description: 'You enchant a strike with your teleportation magic.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-1-2-1a',
															name: 'In a Puff of Ash',
															description: 'You enchant a strike with your teleportation magic.',
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
																	'Agility'
																],
																bonus: 0,
																tier1: '6 + A damage; you can teleport the target 1 square',
																tier2: '10 + A damage; you can teleport the target up to 3 squares',
																tier3: '14 + A damage; you can teleport the target up to 5 squares'
															},
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
													id: 'shadow-sub-1-2-1b',
													name: 'Too Slow',
													description: 'Your foe made a big mistake.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-1-2-1b',
															name: 'Too Slow',
															description: 'Your foe made a big mistake.',
															type: {
																usage: 'Triggered Action',
																free: true,
																trigger: 'You use your In All This Confusion ability.',
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
															effect: 'You avoid any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.',
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
								},
								{
									id: 'shadow-sub-1-2-2',
									name: 'Burning Ash',
									description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Reason score.',
									type: 'Text',
									data: null
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
					id: 'shadow-sub-2',
					name: 'College of Caustic Alchemy',
					description: 'The College of Caustic Alchemy teaches its students recipes for the acids, bombs, and poisons used in their grim work. Graduates of the college are exceptional assassins.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'shadow-sub-2-1-1',
									name: 'Crafting Skill',
									description: '',
									type: 'Skill Choice',
									data: {
										options: [],
										listOptions: [
											'Crafting'
										],
										count: 1,
										selected: [
											'Alchemy'
										]
									}
								},
								{
									id: 'shadow-sub-2-1-2',
									name: 'Coat The Blade',
									description: 'Just a little poison goes a long way.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-2-1-2',
											name: 'Coat The Blade',
											description: 'Just a little poison goes a long way.',
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
											effect: 'You gain two surges. Whenever you use a surge before the end of the encounter, you can choose to have its damage be poison damage.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													repeatable: true,
													effect: 'For each insight you spend, you gain an additional surge.',
													name: ''
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'shadow-sub-2-1-3',
									name: 'Smoke Bomb',
									description: 'You always carry a supply of smoke bombs to make it easy for you to distract and get away from foes. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are hidden.',
									type: 'Text',
									data: null
								},
								{
									id: 'shadow-sub-2-1-4',
									name: 'Defensive Roll',
									description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-2-1-4',
											name: 'Defensive Roll',
											description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'Another creature damages you.',
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
											effect: 'You halve the damage against the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													value: 1,
													effect: 'You reduce the potency of any effect associated with the damage for you by 1.',
													name: '',
													repeatable: false
												}
											],
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
									id: 'shadow-sub-2-2-1',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'shadow-sub-2-2-1a',
													name: 'Sticky Bomb',
													description: 'Explosives are best when they’re attached to an enemy.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-2-2-1a',
															name: 'Sticky Bomb',
															description: 'Explosives are best when they’re attached to an enemy.',
															type: {
																usage: 'Action',
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
															target: '1 creature',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: 'You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can remove it as an action, disarming the bomb. At the end of your next turn, the bomb detonates. You can also detonate it earlier (no action required). When the bomb detonates, you make a power roll targeting each enemy within 3 squares of it.',
															powerRoll: {
																characteristic: [
																	'Agility'
																],
																bonus: 0,
																tier1: '4 + A fire damage',
																tier2: '7 + A fire damage',
																tier3: '11 + A fire damage'
															},
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
													id: 'shadow-sub-2-2-1b',
													name: 'Stink Bomb',
													description: 'Yellow, disgusting gas explodes from a bomb you toss.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-2-2-1b',
															name: 'Stink Bomb',
															description: 'Yellow, disgusting gas explodes from a bomb you toss.',
															type: {
																usage: 'Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: []
															},
															keywords: [
																'Area',
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
															target: 'Each creature in the area',
															cost: 5,
															repeatable: false,
															minLevel: 1,
															preEffect: '',
															powerRoll: {
																characteristic: [
																	'Agility'
																],
																bonus: 0,
																tier1: '2 poison damage',
																tier2: '5 poison damage',
																tier3: '7 poison damage'
															},
															test: null,
															effect: 'The gas remains in the area until the end of the encounter. Any creature who has M < average and starts their turn in the area is weakened (save ends).',
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
								},
								{
									id: 'shadow-sub-2-2-2',
									name: 'Trained Assassin',
									description: 'You know just where to cut your enemies. Whenever you make a strike with at least one surge and no banes, the strike gains an extra surge which you must use on that strike.',
									type: 'Text',
									data: null
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
					id: 'shadow-sub-3',
					name: 'College of the Harlequin Mask',
					description: 'Graduates of the College of the Harlequin Mask learn illusion magic, which they use to infiltrate enemy strongholds and create orchestrated chaos in combat.',
					featuresByLevel: [
						{
							level: 1,
							features: [
								{
									id: 'shadow-sub-3-1-1',
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
											'Lie'
										]
									}
								},
								{
									id: 'shadow-sub-3-1-2',
									name: 'I’m No Threat',
									description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-3-1-2',
											name: 'I’m No Threat',
											description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
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
											effect: '\nWhen you use this ability, you cover yourself in an illusion that causes you to appear nonthreatening and harmless to your enemies. You might take on the appearance of a harmless animal of your size, such as a sheep or capybara, or you might appear as a less heroic, unarmed, and capable version of yourself. While this illusion lasts, your strikes made against other creatures gain an edge. If you use this ability in combat, you gain a surge when you use it.\n\nThe illusion ends when you harm another creature, when you and any creature physically interact, when you use this ability again, or when you end the illusion (no action required).',
											strained: '',
											alternateEffects: [],
											spend: [
												{
													effect: 'Choose a creature whose size is no more than 1 greater than yours, and who is within 10 squares of you. This ability’s illusion makes you appear to be that creature. This illusion covers your entire body, including clothing and armor, and changes your voice to sound like the creature. You gain an edge on tests made to convince the creature’s allies that you are the creature.',
													value: 1,
													name: '',
													repeatable: false
												}
											],
											persistence: []
										}
									}
								},
								{
									id: 'shadow-sub-3-1-3',
									name: 'Clever Trick',
									description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
									type: 'Ability',
									data: {
										ability: {
											id: 'shadow-sub-3-1-3',
											name: 'Clever Trick',
											description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
											type: {
												usage: 'Triggered Action',
												free: false,
												trigger: 'An enemy targets you with a strike.',
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
											cost: 1,
											repeatable: false,
											minLevel: 1,
											preEffect: '',
											powerRoll: null,
											test: null,
											effect: 'Choose an enemy within distance of the triggering strike, including the enemy who targeted you. The strike targets that enemy instead.',
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
									id: 'shadow-sub-3-2-1',
									name: 'Choice',
									description: '',
									type: 'Choice',
									data: {
										options: [
											{
												feature: {
													id: 'shadow-sub-3-2-1a',
													name: 'Machinations of Sound',
													description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-3-2-1a',
															name: 'Machinations of Sound',
															description: 'Illusory sounds make your foes reposition themselves as they cower or investigate the disturbance.',
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
																tier1: 'Slide 4',
																tier2: 'Slide 5',
																tier3: 'Slide 7'
															},
															test: null,
															effect: 'This forced movement ignores stability. Instead, the forced movement is reduced by a number equal to the target’s Intuition score.',
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
													id: 'shadow-sub-3-2-1b',
													name: 'So Gullible',
													description: 'When your enemy strikes, you reveal you were in a different place all along.',
													type: 'Ability',
													data: {
														ability: {
															id: 'shadow-sub-3-2-1b',
															name: 'So Gullible',
															description: 'When your enemy strikes, you reveal you were in a different place all along.',
															type: {
																usage: 'Triggered Action',
																free: true,
																trigger: 'An enemy strikes you.',
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
															effect: 'You use your Clever Trick ability with no insight cost, causing the creature who made the triggering strike to target an illusory image of you. You appear in an unoccupied space within 3 squares of that creature and can make a free strike against them. You can then spend a Recovery.',
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
								},
								{
									id: 'shadow-sub-3-2-2',
									name: 'Friend!',
									description: '\nYour illusions make your enemies believe you are their friend in critical moments. Whenever an enemy uses an ability or trait that targets multiple allies and you are within distance of the effect, you can choose to be a target of the effect as well.\n\nAdditionally when you use your I’m No Threat ability, you can take the Disengage move action as part of that ability.',
									type: 'Text',
									data: null
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
					value: -1
				},
				{
					characteristic: 'Agility',
					value: 2
				},
				{
					characteristic: 'Reason',
					value: 2
				},
				{
					characteristic: 'Intuition',
					value: 1
				},
				{
					characteristic: 'Presence',
					value: 1
				}
			]
		},
		career: {
			id: 'career-criminal',
			name: 'Criminal',
			description: 'You once worked as a bandit, insurgent, smuggler, outlaw, or even as an assassin.',
			features: [
				{
					id: 'career-criminal-feature-1',
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
							'Criminal Underworld'
						]
					}
				},
				{
					id: 'career-criminal-feature-2',
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
							'Escape Artist'
						]
					}
				},
				{
					id: 'career-criminal-feature-3',
					name: 'Language',
					description: '',
					type: 'Language Choice',
					data: {
						options: [],
						count: 1,
						selected: [
							'Szetch'
						]
					}
				},
				{
					id: 'career-criminal-feature-4',
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
					id: 'career-criminal-feature-5',
					name: 'Intrigue Perk',
					description: '',
					type: 'Perk',
					data: {
						lists: [
							'Intrigue'
						],
						count: 1,
						selected: [
							{
								id: 'perk-lucky-dog',
								name: 'Lucky Dog',
								description: 'When you fail a test using any skill from the intrigue skill group, you can roll a d6. You lose Stamina equal to the roll and improve the result of your test by one tier. You can use this perk only once per test.',
								type: 'Text',
								data: null,
								list: 'Intrigue'
							}
						]
					}
				}
			],
			incitingIncidents: {
				options: [
					{
						id: 'career-criminal-ii-1',
						name: 'Antiquity Procurement',
						description: 'You stole, smuggled, and sold antiquities. In your haste to make a quick sale, you didn’t fully vet a client and they subsequently robbed your warehouse. When the items you had stolen were taken from you, you realized the harm you had caused. Now you adventure to find those items you lost and return them where they belong.'
					},
					{
						id: 'career-criminal-ii-2',
						name: 'Atonement',
						description: 'The last criminal job you pulled led to the death of someone or the destruction of something you love. To make up for the loss you caused, you left your criminal ways behind and became a hero.'
					},
					{
						id: 'career-criminal-ii-3',
						name: 'Friendly Priest',
						description: 'You went to prison for your crimes and eventually escaped. An elderly priest took you in and shielded you from the law, convinced that your soul wasn’t corrupt. They never judged you for your past, speaking only of the future. Eventually, the priest died, imparting final words that inspired you to become a hero.'
					},
					{
						id: 'career-criminal-ii-4',
						name: 'Shadowed Influence',
						description: 'You spent years blackmailing and manipulating nobles for influence and wealth until a scheme went wrong. You were publicly exposed, and after a narrow escape, you reevaluated your life. Under a new identity, you work as a hero and hope no one looks at your past too closely.'
					},
					{
						id: 'career-criminal-ii-5',
						name: 'Simply Survival',
						description: 'Stealing was a matter of survival for you and not what defined you - at least in your mind. But when your thieving actions lead to innocent folk being harmed, you knew you could be better. You turned your back on your old life, though your old skills come in handy.'
					},
					{
						id: 'career-criminal-ii-6',
						name: 'Stand Against Tyranny',
						description: 'When a tyrant rose to power in your homeland, they began cracking down on all criminals with deadly raids and public executions. The nature of the crime didn’t matter - pickpockets and beggars were made to kneel before the axe alongside murderers. After losing enough friends, you stood up and joined the resistance - not just against this tyrant, but against authoritarians anywhere.'
					}
				],
				selectedID: 'career-criminal-ii-6'
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;

	static wodeElfTroubadour = {
		id: 'HVPFufs9Uv4PWrKi',
		name: 'Lliarion',
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
											cost: 0,
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
											persistence: []
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
									persistence: []
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
									persistence: []
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
													persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
					persistence: []
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
											persistence: []
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
											persistence: []
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
															persistence: []
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
											persistence: []
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
											persistence: []
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
															persistence: []
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
											persistence: []
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
											persistence: []
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
											persistence: []
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
															persistence: []
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
											persistence: []
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
											persistence: []
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
			notes: '',
			encounterState: 'ready',
			hidden: false,
			defeated: false
		},
		abilityCustomizations: []
	} as Hero;
}
