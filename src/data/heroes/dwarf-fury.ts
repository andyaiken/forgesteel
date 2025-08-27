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
				description: '\nYou can carve a rune onto your skin with 10 uninterrupted minutes of work, which is activated by the magic within your body. The rune you carve determines the benefit you receive. chosen from among the following:\n\n* **Detection**: Pick a specific type of creature (such as “goblins” or “humans”) or object (such as “gems” or “potions”). Your rune glows softly when you are within 20 squares of any creature or object of thet type, even if you don’t have line of effect to the creature or object. You can change the type of creature or object as a maneuver.\n* **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.\n* **Voice**: As a maneuver, you can communicate telepathically with a willing creature you have met before and who is within 1 mile of you. You must know the creature’s name, and they must speak and understand a language you know. You and the creature can respond to one another as if having a spoken conversation. You can communicate with a different creature by changing the rune.\n\nYou can have one rune active at a time, and can change or remove a rune with 10 uninterrupted minutes of work.',
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
								description: 'Your heavy stone body and connection to the earth make it difficult for others to move you.',
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
								description: 'Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature’s traits or abilities.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'dwarf-feature-2-3',
								name: 'Stone Singer',
								description: 'You have a magic connection to the earth. When you spend 1 uninterrupted hour singing, you can reshape any unworked mundane stone within 3 squares. You can’t destroy this stone, but you can move each square of it anywhere within 3 squares of you, piling it off to one side to dig a hole or building it up to create a wall.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'dwarf-feature-2-4',
								name: 'Great Fortitude',
								description: 'Your hearty constitution prevents you from losing strength.',
								type: 'Condition Immunity',
								data: {
									conditions: [
										'Weakened'
									]
								}
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
									value: 0,
									valueCharacteristics: [],
									valueCharacteristicMultiplier: 1,
									valuePerLevel: 0,
									valuePerEchelon: 6
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
							description: 'Your heavy stone body and connection to the earth make it difficult for others to move you.',
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
					'Brag'
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
					'Intimidate'
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
					'Blacksmithing'
				]
			}
		}
	},
	class: {
		id: 'class-fury',
		name: 'Fury',
		description: '\nYou do not temper the heat of battle within you. You unleash it! Your experience in the wild taught you the secrets of predators, and now, like the raptor, the panther, the wolf, you channel unfettered anger into martial prowess. Primordial Chaos is your ally. Let others use finesse to clean up the wreckage left in your wake.\n\nAs a fury, you devastate foes with overwhelming might, hurl yourself and enemies around the battlefield, and grow stronger as your ferocity increases. Nature has no concept of fairness — and neither do you..',
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
							valuePerLevel: 9,
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
						id: 'fury-resource',
						name: 'Ferocity',
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
									tag: 'take-damage',
									trigger: 'The first time each combat round that you take damage',
									value: '1'
								},
								{
									tag: 'winded',
									trigger: 'The first time you become winded or are dying in an encounter',
									value: '1d3'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Navigate'
							]
						}
					},
					{
						id: 'fury-1-4',
						name: 'Mighty Leaps',
						description: 'You can’t obtain lower than a tier 2 outcome on any Might test made to jump.',
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
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
						id: 'fury-4-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'fury-4-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'fury-4-2',
						name: 'Damaging Ferocity',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'take-damage 2',
							trigger: 'The first time each combat round that you take damage',
							value: '2',
							replacesTags: [
								'take-damage'
							]
						}
					},
					{
						id: 'fury-4-3',
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
						id: 'fury-4-4',
						name: 'Primordial Attunement',
						description: 'As your ferocity manifests elemental forces created by the Primordial Chaos, you are aware of how elemental power interacts with those around you. You automatically sense whether any creature within 10 squares has damage immunity or damage weakness to acid, cold, corruption, fire, lightning, poison, or sonic damage, learning whether they have immunity or weakness, the value of that immunity or weakness, and the specific damage type. Additionally, you automatically sense any source of one of those damage types within 10 squares, such as a fire or a source of elemental power.',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-4-5',
						name: 'Primordial Strike',
						description: 'You can manifest your ferocity directly as an elemental force created by the Primordial Chaos. As part of any strike, you can spend 1 ferocity to gain 1 surge that must be used for that strike. The extra damage dealt by the surge can be acid, cold, corruption, fire, lightning, poison, or sonic (your choice).',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-4-6',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [],
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
						id: 'fury-5-1',
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
						id: 'fury-6-1',
						name: 'Marauder of the Primordial Chaos',
						description: '\nAs your connection to the power of the Primordial Chaos grows ever stronger, you automatically sense any elemental creatures or magic sources of elemental power, such as a lava pool or a lake overlapping with Quintessence, within 1 mile of you.\n\nAdditionally, you can speak with elemental creatures, and when you are in a negotiation with an elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your effective Renown provided by the Nature’s Knight aspect feature (see 3rd-Level Features). When any elemental first becomes aware of you in combat, if they have P < [average], they are frightened of you (save ends).',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-6-2',
						name: 'Primordial Portal',
						description: '\nAs a main action, you can touch a magic source of elemental power and use it to create a portal to Quintessence. You can then use a main action to teleport yourself and any willing creatures within 10 squares of you through the portal and onto a safe island in Quintessence, or to teleport back again. You can maintain a number of portals equal to your Might score, each leading to the same safe island in Quintessence. If a portal in your network is destroyed, it is no longer part of the network. You can remove a portal from your network no matter your distance from it, including across different worlds (no action required).\n\n(Exploring Quintessence is possible from your island, but continued safety is not guaranteed.)',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-6-3',
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
				level: 7,
				features: [
					{
						id: 'fury-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'fury-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'fury-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'fury-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'fury-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'fury-7-2',
						name: 'Elemental Form',
						description: '\nYou exhibit ever-stronger signs of how the force of the Primordial Chaos flows within you. Whenever you show strong emotion or increase your ferocity, elemental motes attuned to your mood flit around you, and your skin changes in appearance to reflect an element of your choice.\n\nAdditionally, if you are a berserker or reaver, you have immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to your Might score. If you are a stormwight, you have immunity to the damage type of your Primordial Storm feature equal to twice your Might score.',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-7-3',
						name: 'Greater Ferocity',
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
						id: 'fury-7-4',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [],
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
						id: 'fury-8-1',
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
						id: 'fury-8-2',
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
						id: 'fury-9-1',
						name: 'Harbinger of the Primordial Chaos',
						description: 'You can create a temporary source of elemental power as a respite activity. This source of elemental power lasts 24 hours after creation, and can be used to create a portal to Quintessence with your Primordial Portal feature. If you do so, the source of elemental power lasts as long as the portal is maintained in your network.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'fury-10-1',
						name: 'Chaos Incarnate',
						description: '\nYour mastery of elemental forces protects and emboldens you. If you are a berserker or reaver, you have immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to twice your Might score. If you are a stormwight, your damage immunity from your Primordial Storm feature (see Stormwight Kits) increases to three times your Might score.\n\nWhen any elemental or any other creature whose abilities deal acid, cold, corruption, fire, lightning, poison, or sonic damage first becomes aware of you in combat, if they have P < [strong], they are frightened of you (save ends).\n\nAdditionally, when you use Primordial Strike, you can spend up to 3 ferocity, gaining 1 surge per ferocity spent to use for that strike.',
						type: 'Text',
						data: null
					},
					{
						id: 'fury-10-2a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'fury-10-2b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'fury-10-3',
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
						id: 'fury-10-4',
						name: 'Primordial Ferocity',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'take-damage 3',
							trigger: 'The first time each combat round that you take damage',
							value: '3',
							replacesTags: [
								'take-damage',
								'take-damage 2'
							]
						}
					},
					{
						id: 'fury-10-5',
						name: 'Primordial Power',
						description: '\nYou can spend any amount of primordial power as a free maneuver, ending one effect on you for each primordial power spent.\n\nYou can also spend 3 primordial power to create a portal to Quintessence without needing a source of elemental power.\n\nPrimordial power remains until you spend it.',
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
						id: 'fury-10-6',
						name: 'Skill',
						description: '',
						type: 'Skill Choice',
						data: {
							options: [],
							listOptions: [],
							count: 1,
							selected: []
						}
					}
				]
			}
		],
		abilities: [
			{
				id: 'fury-ability-1',
				name: 'Brutal Slam',
				description: 'The heavy impact of your weapon attacks drives your foes ever back.',
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
							tier1: '3 + M damage; push 1',
							tier2: '6 + M damage; push 2',
							tier3: '9 + M damage; push 4'
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
				id: 'fury-ability-2',
				name: 'Hit And Run',
				description: 'Staying in constant motion helps you slip out of reach after a brutal assault.',
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
							tier1: '2 + M damage',
							tier2: '5 + M damage',
							tier3: '7 + M damage; A < [strong], slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'You can shift 1 square.'
					}
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
				id: 'fury-ability-3',
				name: 'Impaled!',
				description: 'You skewer your enemy like a boar upon a spit.',
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
				target: 'One creature of your size or smaller',
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
							tier1: '2 + M damage; M < [weak], grabbed',
							tier2: '5 + M damage; M < [average], grabbed',
							tier3: '7 + M damage; M < [strong], grabbed'
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
				id: 'fury-ability-4',
				name: 'To the Death!',
				description: 'Your reckless assault leaves you tactically vulnerable.',
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
							tier1: '3 + M damage',
							tier2: '6 + M damage',
							tier3: '9 + M damage'
						}
					},
					{
						type: 'text',
						text: 'You gain 2 surges, and the target can make an opportunity attack against you as a free triggered action.'
					}
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
				id: 'fury-ability-5',
				name: 'Back!',
				description: 'You hew about you with your mighty weapon, hurling enemies backward.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '5 damage',
							tier2: '8 damage; push 1',
							tier3: '11 damage; push 3'
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
				id: 'fury-ability-6',
				name: 'Out of the Way!',
				description: 'Your enemies will clear your path — whether they want to or not.',
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
							tier1: '3 + M damage; slide 2',
							tier2: '5 + M damage; slide 3',
							tier3: '8 + M damage; slide 5'
						}
					},
					{
						type: 'text',
						text: 'When you slide the target, you can move into any square they leave. If you take damage from an opportunity attack by moving this way, the target takes the same damage.'
					}
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
				id: 'fury-ability-7',
				name: 'Tide of Death',
				description: 'Teach them the folly of lining up for you.',
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
				target: 'Self; see below',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You move up to your speed in a straight line, and enemy squares are not difficult terrain for this movement. You can end this movement in a creature’s space and move them to an adjacent unoccupied space. You make one power roll that targets each enemy whose space you move through.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '2 damage',
							tier2: '3 damage',
							tier3: '5 damage'
						}
					},
					{
						type: 'text',
						text: 'The last target you damage takes extra damage equal to your Might score for each opportunity attack you trigger during your move'
					}
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
				id: 'fury-ability-8',
				name: 'Your Entrails Are Your Extrails!',
				description: 'Hard for them to fight when they’re busy holding in their giblets.',
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
							tier1: '3 + M damage; M < [weak], bleeding (save ends)',
							tier2: '5 + M damage; M < [average], bleeding (save ends)',
							tier3: '8 + M damage; M < [strong], bleeding (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While bleeding this way, the target takes damage equal to your Might score at the end of your turns.'
					}
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
				id: 'fury-ability-9',
				name: 'Blood for Blood!',
				description: 'See how well they fight after you’ve bled them dry.',
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
							tier1: '4 + M damage; M < [weak], bleeding and weakened (save ends)',
							tier2: '6 + M damage; M < [average], bleeding and weakened (save ends)',
							tier3: '10 + M damage; M < [strong], bleeding and weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'You can deal 1d6 damage to yourself to deal an extra 1d6 damage to the target.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'You gain 1 surge, and the next ability roll you make this turn automatically obtains a tier 3 outcome.'
					}
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
				id: 'fury-ability-11',
				name: 'Thunder Roar',
				description: 'You unleash a howl that hurls your enemies back.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: '6 damage; push 2',
							tier2: '9 damage; push 4',
							tier3: '13 damage; push 6'
						}
					},
					{
						type: 'text',
						text: 'The targets are force moved one at a time, starting with the target nearest to you, and can be pushed into other targets in the same line.'
					}
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
				id: 'fury-ability-12',
				name: 'To the Uttermost End',
				description: 'You gut your life force to ensure a foe’s demise.',
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
							tier1: '7 + M damage',
							tier2: '11 + M damage',
							tier3: '16 + M damage'
						}
					},
					{
						type: 'field',
						name: 'Spend',
						value: 1,
						repeatable: false,
						effect: 'While you are winded, this ability deals an extra 1d6 damage for each ferocity spent. While you are dying, it deals an extra 1d10 damage for each ferocity spent. In either case, you lose 1d6 Stamina after making this strike.'
					}
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
				id: 'fury-ability-13',
				name: 'Demon Unleashed',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, each enemy who starts their turn adjacent to you and has p < [strong] is frightened until the end of their turn.'
					}
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
				id: 'fury-ability-14',
				name: 'Face the Storm!',
				description: 'Shocked in the face of your naked brutality, your enemy’s instincts take over.',
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
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter or until you are dying, each creature you make a melee strike against who has P < [average] is taunted until the end of their next turn. Additionally, when you use an ability that deals rolled damage against any enemy taunted by you, the ability deals extra damage equal to twice your Might score and increases its potency by 1.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'You gain 20 temporary Stamina.'
					}
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
				id: 'fury-ability-16',
				name: 'You Are Already Dead',
				description: 'Slash. Walk away.',
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'If the target is not a leader or solo creature, they are reduced to 0 Stamina at the end of their next turn. If the target is a leader or solo creature, you gain 3 surges and can make a melee free strike against them.'
					}
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
				id: 'fury-ability-17',
				name: 'Debilitating Strike',
				description: 'You need just one blow to sabotage your target.',
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
							tier1: '10 + M damage; M < [weak], slowed (save ends)',
							tier2: '14 + M damage; M < [average], slowed (save ends)',
							tier3: '20 + M damage; M < [strong], slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While slowed this way, the target takes 1 damage for every square they move, including from forced movement.'
					}
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
				id: 'fury-ability-18',
				name: 'My Turn!',
				description: 'You quickly strike back at a foe.',
				type: {
					usage: 'Triggered Action',
					free: false,
					trigger: 'A creature causes you to be winded or dying, or damages you while you are winded or dying.',
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
				target: 'The triggering creature',
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
							tier1: '6 + M damage;',
							tier2: '9 + M damage;',
							tier3: '13 + M damage;'
						}
					},
					{
						type: 'text',
						text: 'You can spend a Recovery.'
					}
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
				id: 'fury-ability-19',
				name: 'Rebounding Storm',
				description: 'You knock around enemies like playthings.',
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
							tier1: '9 + M damage; push 3',
							tier2: '14 + M damage; push 5',
							tier3: '19 + M damage; push 7'
						}
					},
					{
						type: 'text',
						text: 'When a target would end this forced movement by colliding with a creature or object, they take damage as usual, then are pushed the remaining distance away from the creature or object in the direction they came from. As long as forced movement remains, this effect continues if the target collides with another creature or object.'
					}
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
				id: 'fury-ability-20',
				name: 'To Stone!',
				description: 'You channel the Primordial Chaos into blows that petrify your foe … literally.',
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
							tier1: '9 + M damage; M < [weak], slowed (save ends)',
							tier2: '13 + M damage; M < [average], slowed (save ends)',
							tier3: '18 + M damage; M < [strong], restrained (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While the target is slowed this way, any other effect that would make the target slowed instead makes them restrained by this ability. Additionally, a creature who fails the saving throw while restrained this way is petrified until they are given a supernatural cure or you choose to reverse the effect (no action required).'
					}
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
				id: 'fury-ability-21',
				name: 'Elemental Ferocity',
				description: 'Your primordial energy makes for instant retribution.',
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
						text: 'You gain 10 temporary Stamina. Additionally, choose acid, cold, corruption, fire, lightning, poison, or sonic damage. Until the end of the encounter or until you are dying, whenever an enemy damages you, they take 10 damage of the chosen type. If this damage reduces the enemy to 0 Stamina, you gain 10 temporary Stamina.'
					}
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
				id: 'fury-ability-22',
				name: 'Overkill',
				description: 'You strike so no damage is wasted.',
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
						text: 'If the target is a minion or is winded but isn’t a leader or solo creature, they are reduced to 0 Stamina before this ability’s damage is dealt. If the target is killed by this damage, you can deal any damage over what was required to kill them to another creature within 5 squares of the target.'
					}
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
				id: 'fury-ability-23',
				name: 'Primordial Rage',
				description: 'Your ferocity manifests into primordial power.',
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
						text: 'Choose acid, cold, corruption, fire, lightning, poison, or sonic damage. Until the end of the encounter or until you are dying, you can choose one target of any ability you use, with that target taking an extra 15 damage of the chosen type. Additionally, whenever you gain ferocity from taking damage, the source of the damage takes 5 damage of the chosen type.'
					}
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
				id: 'fury-ability-24',
				name: 'Relentless Death',
				description: 'You won’t escape your fate.',
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
						type: 'Self',
						value: 0,
						value2: 0,
						within: 0,
						special: '',
						qualifier: ''
					}
				],
				target: 'Self; see below',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You shift up to your speed. Each enemy you move adjacent to during this movement takes damage equal to twice your Might score. Then make one power roll that targets each enemy you move adjacent to during this shift. You gain 1 ferocity for each target who dies as a result of this ability (maximum 11 ferocity).'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Might'
							],
							bonus: 0,
							tier1: 'Any target whose Stamina is equal to or less than 8 dies.',
							tier2: 'Any target whose Stamina is equal to or less than 11 dies.',
							tier3: 'Any target whose Stamina is equal to or less than 17 dies.'
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
																	text: 'You can move up to 3 squares straight toward the target before this strike, which deals extra damage equal to the number of squares you move this way.'
																}
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
								id: 'fury-sub-1-1-3',
								name: 'Primordial Strength',
								description: '\nWhenever you damage an object with a weapon strike, the strike deals extra damage equal to your Might score. Additionally, whenever you push another creature into an object, the creature takes extra damage equal to your Might score.\n\nAs your ferocity grows, you gain benefits as noted on the Berserker Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n* **Ferocity 2**: Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Might score.\n* **Ferocity 4**: The first time you push a creature on a turn, you gain 1 surge.\n* **Ferocity 6**: You gain an edge on Might tests and the Knockback maneuver.',
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
										target: 'Self or one creature',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'You can select a new target of the same size or smaller within distance to be force moved instead. You become the source of the forced movement, determine the new target’s destination, and can push the target instead of using the original forced movement type. Additionally, the forced movement distance gains a bonus equal to your Might score.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'The forced movement distance gains a bonus equal to twice your Might score instead.'
											}
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
								id: 'fury-sub-1-2-1',
								name: 'Unstoppable Force',
								description: 'Whenever you use the Charge main action, you can use a strike signature ability or a strike heroic ability instead of a free strike. Additionally, you can jump as part of your charge.',
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
														sections: [
															{
																type: 'text',
																text: 'You vertically push the target up to 4 squares. This forced movement ignores the target’s stability, and the target takes no damage from colliding with creatures or objects. At the end of this movement, the target can make a free strike that deals extra damage equal to your Might score.'
															}
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
												id: 'fury-sub-1-2-2b',
												name: 'Wrecking Ball',
												description: 'It’s easier to destroy than to create. Much easier, in fact!',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-1-2-2b',
														name: 'Wrecking Ball',
														description: 'It’s easier to destroy than to create. Much easier, in fact!',
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
														target: 'Self; see below',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: '\nYou move up to your speed in a straight line. During this movement, you can move through mundane structures, including walls, which are difficult terrain for you. You automatically destroy each square of structure you move through and leave behind a square of difficult terrain.\n\nAdditionally, you make one power roll that targets each enemy you move adjacent to during this movement.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
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
								description: 'You add your level to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on whether you can be grabbed.',
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
					},
					{
						level: 4,
						features: [
							{
								id: 'fury-sub-1-4-1',
								name: 'Growing Ferocity Improvement',
								description: '**8 Ferocity:** The first time you push a creature on a turn, you gain 2 surges.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'fury-sub-1-5-1',
								name: 'Bounder',
								description: 'Your jump distance and height double (see Movement Types in Chapter 10: Combat). Additionally, when you fall, you reduce the effective height of your fall by a number of squares equal to your jump distance for the purpose of determining damage and whether you land prone (see Falling in Chapter 10). You are not prone after falling and landing on another creature.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'fury-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-1-6-1a',
												name: 'Avalanche Impact',
												description: 'You leap and crash down, causing a shockwave that devastates foes.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-1-6-1a',
														name: 'Avalanche Impact',
														description: 'You leap and crash down, causing a shockwave that devastates foes.',
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
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You jump up to your maximum jump distance and make one power roll that targets each creature adjacent to the space where you land.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '4 damage; push 1',
																	tier2: '7 damage; push 2',
																	tier3: '11 damage; push 3'
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
												id: 'fury-sub-1-6-1b',
												name: 'Force of Storms',
												description: 'You strike an enemy hard enough to be a projectile that knocks a crowd of creatures around.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-1-6-1b',
														name: 'Force of Storms',
														description: 'You strike an enemy hard enough to be a projectile that knocks a crowd of creatures around.',
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
																	tier1: '7 + M damage; push 3',
																	tier2: '11 + M damage; push 5',
																	tier3: '16 + M damage; push 7'
																}
															},
															{
																type: 'text',
																text: 'When the target ends this forced movement, each creature within 2 squares of the target is pushed 3 squares.'
															}
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
								id: 'fury-sub-1-7-1',
								name: 'Growing Ferocity Improvement',
								description: '**10 Ferocity:** You have a double edge on Might tests and the Knockback maneuver.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'fury-sub-1-8-1',
								name: 'Strongest There Is',
								description: 'Your strength is unmatched. Whenever you make a Might test, you can roll three dice and choose which two to use. Additionally, whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Might score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'fury-sub-1-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-1-9-1a',
												name: 'Death Comes for You All!',
												description: 'You use your weapon to create a destructive shockwave.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-1-9-1a',
														name: 'Death Comes for You All!',
														description: 'You use your weapon to create a destructive shockwave.',
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
																	tier1: '7 damage; push 3',
																	tier2: '10 damage; push 5',
																	tier3: '15 damage; push 7'
																}
															},
															{
																type: 'text',
																text: 'If this forced movement causes a target to be hurled through an object, that target takes an extra 10 damage.'
															}
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
												id: 'fury-sub-1-9-1b',
												name: 'Primordial Vortex',
												description: 'You channel the power of the Primordial Chaos to pull foes to you.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-1-9-1b',
														name: 'Primordial Vortex',
														description: 'You channel the power of the Primordial Chaos to pull foes to you.',
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
																type: 'Burst',
																value: 3,
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
																		'Might'
																	],
																	bonus: 0,
																	tier1: '3 damage; vertical pull 3',
																	tier2: '5 damage; vertical pull 5',
																	tier3: '8 damage; vertical pull 7'
																}
															},
															{
																type: 'text',
																text: 'If this forced movement causes a target to slam into you, you take no damage from the collision and the target takes the damage you would have taken.'
															}
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
						features: [
							{
								id: 'fury-sub-1-10-1',
								name: 'Growing Ferocity Improvement',
								description: '**12 Ferocity:** Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Might score.',
								type: 'Text',
								data: null
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
								description: '\nYou are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.\n\nAs your ferocity grows, you gain benefits as noted on the Reaver Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.\n\n* **Ferocity 2**: Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Agility score.\n* **Ferocity 4**: The first time you slide a creature on a turn, you gain 1 surge.\n* **Ferocity 6**: You gain an edge on Agility tests and the Knockback maneuver.',
								type: 'Text',
								data: null
							},
							{
								id: 'fury-sub-2-1-4',
								name: 'Unearthly Reflexes',
								description: 'You are as elusive as a hummingbird.',
								type: 'Ability',
								data: {
									ability: {
										id: 'fury-sub-2-1-4',
										name: 'Unearthly Reflexes',
										description: 'You are as elusive as a hummingbird.',
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
										sections: [
											{
												type: 'text',
												text: 'You take half the damage from the triggering effect and can shift up to a number of squares equal to your Agility score.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'If the damage has any potency effects associated with it, the potency is reduced by 1 for you.'
											}
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
												name: 'Death ... Deeaaath!',
												description: 'Your unbridled rage strikes terror in their hearts.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-2-2a',
														name: 'Death ... Deeaaath!',
														description: 'Your unbridled rage strikes terror in their hearts.',
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
																	tier1: '3 + M damage; P < [weak], dazed and frightened (save ends)',
																	tier2: '5 + M damage; P < [average], dazed and frightened (save ends)',
																	tier3: '8 + M damage; P < [strong], dazed and frightened (save ends)'
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
												id: 'fury-sub-2-2-2b',
												name: 'Phalanx-Breaker',
												description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-2-2b',
														name: 'Phalanx-Breaker',
														description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
														type: {
															usage: 'Main Action',
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
														target: 'Self; see below',
														cost: 5,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You shift up to your speed and make one power roll that targets up to three enemies you move adjacent to during this shift.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Might'
																	],
																	bonus: 0,
																	tier1: '2 damage; A < [weak], dazed (save ends)',
																	tier2: '4 damage; A < [average], dazed (save ends)',
																	tier3: '6 damage; A < [strong], dazed (save ends)'
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
								id: 'fury-sub-2-3-1',
								name: 'See Through Your Tricks',
								description: 'You have a double edge on tests made to search for hidden creatures, discern hidden motives, or detect lies. You also have a double edge on tests made to gamble!',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 4,
						features: [
							{
								id: 'fury-sub-2-4-1',
								name: 'Growing Ferocity Improvement',
								description: '**8 Ferocity:** The first time you slide a creature on a turn, you gain 2 surges.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'fury-sub-2-5-1',
								name: 'Unfettered',
								description: 'At the start of your turn, you can end any restrained condition on you. Additionally, you have a double edge on tests made to escape being confined or imprisoned.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'fury-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-2-6-1a',
												name: 'Death Strike',
												description: 'Once you taste your foe’s blood, you become more efficient and turn every killing blow into an opportunity.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-6-1a',
														name: 'Death Strike',
														description: 'Once you taste your foe’s blood, you become more efficient and turn every killing blow into an opportunity.',
														type: {
															usage: 'Triggered Action',
															free: true,
															trigger: 'You reduce a creature to 0 Stamina with a strike.',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Magic',
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
														target: 'Self',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You target a creature adjacent to you with the same strike, using the same power roll as the triggering strike.'
															}
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
												id: 'fury-sub-2-6-1b',
												name: 'Seek and Destroy',
												description: 'You break through the enemy lines to make an example.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-6-1b',
														name: 'Seek and Destroy',
														description: 'You break through the enemy lines to make an example.',
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
																	tier1: '4 + M damage; P < [weak] frightened (save ends)',
																	tier2: '6 + M damage; P < [average] frightened (save ends)',
																	tier3: '10 + M damage; P < [strong] frightened (save ends)'
																}
															},
															{
																type: 'text',
																text: 'If a target who is not a leader or solo creature is winded by this strike, they are reduced to 0 Stamina and you choose an enemy within 5 squares of you. If that enemy has P < [average], they are frightened of you (save ends).'
															}
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
								id: 'fury-sub-2-7-1',
								name: 'Growing Ferocity Improvement',
								description: '**10 Ferocity:** You have a double edge on Agility tests and the Knockback maneuver.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 8,
						features: [
							{
								id: 'fury-sub-2-8-1',
								name: 'A Step Ahead',
								description: 'You move with legendary grace. Whenever you make an Agility test, you can roll three dice and choose which two to use. Additionally, whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'fury-sub-2-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-2-9-1a',
												name: 'Primordial Bane',
												description: 'You attune the target to be weaker to a specific element.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-9-1a',
														name: 'Primordial Bane',
														description: 'You attune the target to be weaker to a specific element.',
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
																	tier1: '11 + M damage',
																	tier2: '16 + M damage',
																	tier3: '21 + M damage'
																}
															},
															{
																type: 'text',
																text: 'Choose acid, cold, corruption, fire, lightning, poison, or sonic damage. The target loses any damage immunity to the chosen type and gains weakness 10 to the chosen type (save ends).'
															}
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
												id: 'fury-sub-2-9-1b',
												name: 'Shower of Blood',
												description: 'You shock your foes with the brutality of your strike, resetting the balance of combat.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-2-9-1b',
														name: 'Shower of Blood',
														description: 'You shock your foes with the brutality of your strike, resetting the balance of combat.',
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
																	tier1: '12 + M damage',
																	tier2: '18 + M damage',
																	tier3: '24 + M damage'
																}
															},
															{
																type: 'text',
																text: 'Each enemy within 5 squares of you is distracted until the end of the round. While a creature is distracted this way, they can’t take triggered actions or free triggered actions, ability rolls made against them gain an edge, and their characteristic scores are considered 1 lower for the purpose of resisting potencies.'
															}
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
						features: [
							{
								id: 'fury-sub-2-10-1',
								name: 'Growing Ferocity Improvement',
								description: '**12 Ferocity:** Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.',
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
								description: 'You gain an edge on tests made using the Track skill.',
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
										sections: [
											{
												type: 'text',
												text: 'You gain temporary Stamina equal to your Might score and can enter your animal form or hybrid form.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'If you are not dying, you can spend a Recovery.'
											}
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
								id: 'fury-sub-3-1-5',
								name: 'Aspect of the Wild',
								description: 'You assume the form of the animal who channels your ferocity.',
								type: 'Ability',
								data: {
									ability: {
										id: 'fury-sub-3-1-5',
										name: 'Aspect of the Wild',
										description: 'You assume the form of the animal who channels your ferocity.',
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
												text: 'You can shapeshift into the animal defined by your stormwight kit, into a hybrid form, or back into your true form. While in animal form or hybrid form, you can speak as you usually do, and you can also speak to animals who share your form. If you are in a negotiation with an animal while in animal form, you treat your Renown as 2 higher than usual.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'As a free maneuver, you can shapeshift a second time, either into another animal form, into your hybrid form, or back into your true form.'
											}
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
								id: 'fury-sub-3-2-1',
								name: 'Tooth and Claw',
								description: 'At the end of each of your turns, each enemy adjacent to you takes damage equal to your Might score.',
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
																	tier1: '4 + M damage; I < [weak], slowed (save ends)',
																	tier2: '6 + M damage; I < [average], slowed (save ends)',
																	tier3: '10 + M damage; I < [strong], slowed (save ends)'
																}
															},
															{
																type: 'text',
																text: 'The target can’t be hidden from you for 24 hours. Until the end of the encounter, whenever the target willingly moves, you can use a free triggered action to move.'
															}
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
												id: 'fury-sub-3-2-2b',
												name: 'Visceral Roar',
												description: 'The sound of the storm within you staggers your opponents.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-3-2-2b',
														name: 'Visceral Roar',
														description: 'The sound of the storm within you staggers your opponents.',
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
																	tier1: '2 damage; push 1; M < [weak], dazed (save ends)',
																	tier2: '5 damage; push 2; M < [average], dazed (save ends)',
																	tier3: '7 damage; push 3; M < [strong], dazed (save ends)'
																}
															},
															{
																type: 'text',
																text: 'This ability deals your primordial damage type.'
															}
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
								id: 'fury-sub-1-3-1',
								name: 'Nature’s Knight',
								description: '\nYou can speak with animals and elementals. Additionally, you automatically sense the presence of animals and elementals within 10 squares of you, even if they are hidden.\n\nWhen you are in a negotiation with an animal or elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your effective Renown in a negotiation with an animal of your type while in animal form.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 5,
						features: [
							{
								id: 'fury-sub-3-5-1',
								name: 'Stormborn',
								description: 'You and each ally within 5 squares of you ignore negative effects from inclement weather, such as banes or environmental damage. Additionally, you can use the Blessing of Fortunate Weather feature as if you were a 1st-level conduit (see 1st-Level Domain Feature in the Conduit section).',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'fury-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-3-6-1a',
												name: 'Pounce',
												description: 'You strike at the target like the ultimate predator you are.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-3-6-1a',
														name: 'Pounce',
														description: 'You strike at the target like the ultimate predator you are.',
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
																	tier1: '8 damage; M < [weak], grabbed',
																	tier2: '13 damage; M < [average], grabbed',
																	tier3: '17 damage; M < [strong], grabbed'
																}
															},
															{
																type: 'text',
																text: 'You can shift up to 4 squares, bringing the target with you. While grabbed this way, the target takes damage equal to twice your Might score at the start of each of your turns.'
															}
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
												id: 'fury-sub-3-6-1b',
												name: 'Riders on the Storm',
												description: 'You focus your connection to the Primordial Chaos into a seething storm.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-3-6-1b',
														name: 'Riders on the Storm',
														description: 'You focus your connection to the Primordial Chaos into a seething storm.',
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
														target: 'One creature',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Until the end of the encounter or until you are dying, each enemy target takes damage of your primordial damage type equal to twice your Might score at the end of each of your turns. Additionally, you can fly while the aura is active. Each ally target who starts or ends their turn in the area can also fly until the start of their next turn or until the effect ends.'
															},
															{
																type: 'text',
																text: 'When you use this ability outside of combat without spending ferocity, you must spend 1 uninterrupted minute summoning a primordial storm that fills the area, and you take 1d6 damage before the ability takes effect. The storm lasts for 1 hour or until a combat encounter begins.'
															}
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
						level: 8,
						features: [
							{
								id: 'fury-sub-3-8-1',
								name: 'Menagerie',
								description: 'You can use all stormwight kits. During a respite, you can choose to swap your stormwight kit and still take another respite activity. Your Nature’s Knight feature now lets you automatically sense the presence of animals within 1 mile of you. Additionally, whenever you make a test to track another creature, you can roll three dice and choose which two to use.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'fury-sub-3-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'fury-sub-3-9-1a',
												name: 'Death Rattle',
												description: 'You unleash an otherworldly cry that rips through your enemies, killing the weakest of them.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-3-9-1a',
														name: 'Death Rattle',
														description: 'You unleash an otherworldly cry that rips through your enemies, killing the weakest of them.',
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
																	tier1: '4 psychic damage; any target who is a minion is reduced to 0 Stamina',
																	tier2: '6 psychic damage; any target who is a minion is reduced to 0 Stamina, as does one winded target who is not a leader or solo creature',
																	tier3: '10 psychic damage; each target who is not a leader or solo creature is winded; any target who is a minion is reduced to 0 Stamina, as does one winded target who is not a leader or solo creature'
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
												id: 'fury-sub-3-9-1b',
												name: 'Deluge',
												description: 'You summon your primordial storm.',
												type: 'Ability',
												data: {
													ability: {
														id: 'fury-sub-3-9-1b',
														name: 'Deluge',
														description: 'You summon your primordial storm.',
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
																		'Might'
																	],
																	bonus: 0,
																	tier1: '7 damage',
																	tier2: '10 damage',
																	tier3: '15 damage'
																}
															},
															{
																type: 'text',
																text: 'This ability deals your primordial damage type and ignores damage immunity.'
															}
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
						'Track'
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
						'Climb'
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
						'Alertness'
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
							description: 'Whenever you fail a Might test, you can lose Stamina equal to 1d6 + your level to improve the outcome of the test by one tier. You can use this perk only once per test.',
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
			selectedID: 'career-warden-ii-4'
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
