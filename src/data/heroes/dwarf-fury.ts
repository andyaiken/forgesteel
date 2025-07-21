import { Hero } from '../../models/hero';

export const dwarfFury = {
	id: 'ojZeuF7Jjqw66Di1',
	name: 'Keth',
	picture: null,
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
														persistence: [], sections: []
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
														persistence: [], sections: []
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
										persistence: [], sections: []
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
														persistence: [], sections: []
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
		controlledSlots: [],
		notes: '',
		encounterState: 'ready',
		hidden: false,
		defeated: false
	},
	abilityCustomizations: []
} as Hero;
