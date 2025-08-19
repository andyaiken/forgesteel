import { Hero } from '../../models/hero';

export const humanTalent = {
	id: 'utdBEimMHFG2Em3P',
	name: 'Garrick',
	picture: null,
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
						persistence: [], sections: []
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
										persistence: [], sections: []
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
										persistence: [], sections: []
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
									persistence: [], sections: []
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
									usage: 'Main Action',
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
								target: 'One creature',
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
								persistence: [], sections: []
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
												persistence: [], sections: []
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
											persistence: [], sections: []
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
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-2',
				name: 'Incinerate',
				description: 'The air erupts into a column of smokeless flame.',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-3',
				name: 'Hoarfrost',
				description: 'A row of the terrain freezes over ahead of you, turning hard and slick.',
				type: {
					usage: 'Main Action',
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
					tier1: '2 + R cold damage; M < [weak], slowed (EoT)',
					tier2: '4 + R cold damage; M < [average], slowed (EoT)',
					tier3: '6 + R cold damage; M < [strong], slowed (EoT)'
				},
				test: null,
				effect: '',
				strained: 'A target slowed by this ability is restrained instead, and you are slowed until the end of your next turn.',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-4',
				name: 'Kinetic Grip',
				description: 'You lift and hurl your foe away from you.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-5',
				name: 'Kinetic Pulse',
				description: 'The force of your mind hurls enemies backward.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-6',
				name: 'Materialize',
				description: 'You picture an object in your mind and give it form in the world, directly above your opponent’s head.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-7',
				name: 'Optic Blast',
				description: 'Your eyes emit rays of powerful enervating force.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-8',
				name: 'Spirit Sword',
				description: 'You form a blade of mind energy and stab your target, invigorating yourself.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-9',
				name: 'Awe',
				description: 'You project psionic energy out to a creature and take on a new visage in their mind.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-10',
				name: 'Nothing Exceeds My Grasp',
				description: 'Be careful not to choke on your aspirations.',
				type: {
					usage: 'Main Action',
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
					tier1: '3 + R damage; M < [weak], slowed (save ends)',
					tier2: '5 + R damage; M < [average], slowed (save ends)',
					tier3: '8 + R damage; M < [strong], restrained (save ends)'
				},
				test: null,
				effect: 'You can vertical pull the target up to 2 squares. You can pull a target restrained by this ability, ignoring their stability.',
				strained: '',
				alternateEffects: [],
				spend: [],
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-11',
				name: 'Precognition',
				description: 'You give a target a glimpse into the future so that they’re ready for what comes next.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-12',
				name: 'Smolder',
				description: 'Smoke flows from your enemy like tears as their skin begins to blacken and flake.',
				type: {
					usage: 'Main Action',
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
				target: 'One creature',
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-17',
				name: 'Fling Through Time',
				description: 'You hurl the target through the annals of time, forcing them to witness every moment of their existence all at once.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-18',
				name: 'Force Orb',
				description: 'Three spheres of solid psionic energy float around you.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-19',
				name: 'Reflector Field',
				description: 'A protective field reverses the momentum of incoming attacks.',
				type: {
					usage: 'Main Action',
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
				persistence: [], sections: []
			},
			{
				id: 'talent-ability-20',
				name: 'Soul Burn',
				description: 'You blast their soul out of their body, leaving it to helplessly float back to a weakened husk.',
				type: {
					usage: 'Main Action',
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
				target: 'One creature',
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
				persistence: [], sections: []
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
										persistence: [], sections: []
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
														persistence: [], sections: []
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
										target: 'Self, or one size 1 creature or object',
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
										persistence: [], sections: []
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
										persistence: [], sections: []
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
															usage: 'Main Action',
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
														persistence: [], sections: []
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
															usage: 'Main Action',
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
										target: 'One creature',
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
										persistence: [], sections: []
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
										target: 'One creature or object',
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
															usage: 'Main Action',
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
															tier1: '6 + R psychic damage; I < [weak], slowed (save ends)',
															tier2: '10 + R psychic damage; I < [average], weakened (save ends)',
															tier3: '14 + R psychic damage; I < [strong], dazed (save ends)'
														},
														test: null,
														effect: '',
														strained: 'You start crying. You can’t take triggered actions or take free strikes until the end of the target’s next turn.',
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
															usage: 'Main Action',
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
														target: 'One enemy',
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
		controlledSlots: [],
		notes: '',
		encounterState: 'ready',
		hidden: false,
		defeated: false
	},
	abilityCustomizations: []
} as Hero;
