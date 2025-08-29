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
		id: 'culture-monastic-order',
		name: 'Monastic Order',
		description: 'Secluded, bureaucratic, academic.',
		languages: [
			'Hyrallic'
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
					'Empathize'
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
					'Disguise'
				]
			}
		},
		upbringing: {
			id: 'up-academic',
			name: 'Academic',
			description: 'Your hero was raised by people who collect, study, and share books and other records. Some academics focus on one area of study, such as a college for wizards dedicated to the study of magic, or a church that teaches the word of one deity. People in an academic culture learn how to wield the power that is knowledge.',
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
		description: '\nA rare few people are born with the potential to harness psionic power, but only those who experience an awakening, a significant event that activates a talent’s abilities, can tap into the mind’s full potential. You are one of those people—a master of psionics and a source of incredible power created through sheer force of will. You can move and change matter, time, gravity, the laws of physics, or another creature’s mind.\n\nAs a talent, you are limited only by the strength of your mind. But the ability to wield multiple powers at once and change reality at will involves a gamble. Every manifestation has a chance of harming you, and talents who use too much power too quickly pay a deadly price.',
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
							valuePerLevel: 6,
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
						id: 'talent-resource',
						name: 'Clarity',
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
									tag: 'move',
									trigger: 'The first time each combat round that a creature is force moved',
									value: '1'
								}
							],
							details: '\nYou can spend clarity you don’t have, pushing that Heroic Resource into negative numbers to a maximum negative value equal to 1 + your Reason score. At the end of each of your turns, you take 1 damage for each negative point of clarity.\n\nWhenever you have clarity below 0, you are strained. Some psionic abilities have additional effects if you are already strained or become strained when you use them. Strained effects can still impact you even after you are no longer strained.',
							canBeNegative: true,
							value: 0
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
								'Timescape',
								'Lie'
							]
						}
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
								sections: [
									{
										type: 'roll',
										roll: {
											characteristic: [
												'Reason'
											],
											bonus: 0,
											tier1: '2 + R psychic damage',
											tier2: '4 + R psychic damage',
											tier3: '6 + R psychic damage'
										}
									},
									{
										type: 'field',
										name: 'Strained',
										value: 0,
										repeatable: false,
										effect: 'The target takes an extra 2 psychic damage. You also take 2 psychic damage that can’t be reduced in any way.'
									}
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
						id: 'talent-1-3',
						name: 'Language',
						description: '',
						type: 'Language Choice',
						data: {
							options: [],
							count: 1,
							selected: [
								'Mindspeech'
							]
						}
					},
					{
						id: 'talent-1-4',
						name: 'Telepathic Speech',
						description: 'You can telepathically communicate with any creatures within distance of your Mind Spike ability if they share a language with you and you know of each other. When you communicate with someone this way, they can respond telepathically.',
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
										description: '\nYou can wear light armor and wield light weapons effectively, even though you don’t have a kit.\n\nYou can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this augmentation.',
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
												},
												{
													id: 'talent-1-5ac',
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
										id: 'talent-1-5b',
										name: 'Density Augmentation',
										description: 'Stamina, Stability',
										type: 'Multiple Features',
										data: {
											features: [
												{
													id: 'talent-1-5ba',
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
													id: 'talent-1-5bb',
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
										id: 'talent-1-5c',
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
									id: 'talent-1-5c',
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
										description: 'Your ward slows time for your enemies. Whenever a creature deals damage to you, their speed is reduced by an amount equal to your Reason score and they can’t use triggered actions until the end of their next turn.',
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
												sections: [
													{
														type: 'text',
														text: 'You can push your attacker up to a number of squares equal to your Reason score.'
													}
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
										id: 'talent-1-6c',
										name: 'Steel Ward',
										description: 'Your ward reacts to danger, protecting you from future harm. Whenever you take damage, after the damage resolves, you gain damage immunity equal to your Reason score until the end of your next turn.',
										type: 'Text',
										data: null
									},
									value: 1
								},
								{
									feature: {
										id: 'talent-1-6d',
										name: 'Vanishing Ward',
										description: 'Your ward allows you to slip away from threats. Whenever you take damage, you become invisible until the end of your next turn.',
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
											sections: [
												{
													type: 'text',
													text: 'You can push your attacker up to a number of squares equal to your Reason score.'
												}
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
						id: 'talent-1-7',
						name: 'Ability',
						description: '',
						type: 'Class Ability',
						data: {
							cost: 'signature',
							allowAnySource: false,
							minLevel: 1,
							count: 2,
							selectedIDs: [
								'talent-ability-4',
								'talent-ability-5'
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
							allowAnySource: false,
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
							allowAnySource: false,
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
						description: 'You can extend your psionic senses beyond their usual range. Once on each of your turns, you can search for hidden creatures as a free maneuver. Additionally, once you establish line of effect to a thinking creature within distance of your Mind Spike ability, you always have line of effect to that creature until they move beyond that distance.',
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
						id: 'talent-4-1a',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'talent-4-1b',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'talent-4-2',
						name: 'Mind Projection',
						description: 'You project your mind outside your body.',
						type: 'Ability',
						data: {
							ability: {
								id: 'talent-4-2',
								name: 'Mind Projection',
								description: 'You project your mind outside your body.',
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
										text: '\nWhile you are in this state, your body remains unconscious and prone, and your mind is a separate entity with size 1T. Your mind automatically has concealment, and can freely move through solid matter. If you end your turn inside solid matter, you are forced out into the space where you entered it.\n\nAny abilities or features you use originate from your mind. Both your mind and your body can take damage while separated, with any such damage applied to your Stamina. Your mind is instantly forced back into your body if you take any damage, and you can immediately return to your body as a free maneuver.'
									}
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
						id: 'talent-4-3',
						name: 'Mind Recovery',
						description: 'Mind Recovery, Mind Recovery',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'talent-4-3a',
									name: 'Mind Recovery',
									description: 'Whenever you spend a Recovery to regain Stamina while strained, you can forgo the Stamina and gain 3 clarity instead.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-4-3b',
									name: 'Mind Recovery',
									description: '',
									type: 'Heroic Resource Gain',
									data: {
										tag: 'move 2',
										trigger: 'The first time each combat round that a creature is force moved',
										value: '2',
										replacesTags: [
											'move'
										]
									}
								}
							]
						}
					},
					{
						id: 'talent-4-4',
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
						id: 'talent-4-5',
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
						id: 'talent-4-6',
						name: 'Suspensor Field',
						description: '\nYou can fly. While flying, your stability is reduced to 0 and can’t be increased. If you can already fly, you have a +2 bonus to speed while flying instead.\n\nIf you are strained while flying and are force moved, the forced movement distance gains a +2 bonus.',
						type: 'Text',
						data: null
					}
				]
			},
			{
				level: 5,
				features: [
					{
						id: 'talent-5-1',
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
						id: 'talent-6-1',
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
						id: 'talent-6-2',
						name: 'Psi Boost',
						description: 'Whenever you use an ability that is a main action or a maneuver with the Psionic keyword, you can spend additional clarity to apply a psi boost to it and enhance its effects. A psi boost’s effects only last until the end of the turn which the ability is first used. You can apply multiple psi boosts to an ability, but only one instance of each specific boost.',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'talent-6-2a',
									name: 'Psi Boost: Dynamic Power (1 Clarity)',
									description: 'If the ability force moves a target, the forced movement distance gains a bonus equal to your Reason score.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2b',
									name: 'Psi Boost: Expanded Power (3 Clarity)',
									description: 'If the ability targets an area, you increase the size of the area by 1. If the area is a line, you increase the size of one dimension, not both.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2c',
									name: 'Psi Boost: Extended Power (1 Clarity)',
									description: 'If the ability is ranged, the distance gains a bonus equal to your Reason score. If the ability is melee, the distance gains a +2 bonus.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2d',
									name: 'Psi Boost: Heightened Power (1 Clarity)',
									description: 'If the ability deals rolled damage, it deals extra damage equal to your Reason score.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2e',
									name: 'Psi Boost: Magnified Power (5 Clarity)',
									description: 'If the ability has a potency, you increase that potency by an amount equal to your Reason score.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2f',
									name: 'Psi Boost: Shared Power (5 Clarity)',
									description: 'If the ability targets individual creatures or objects, you target one additional creature or object within distance.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-6-2g',
									name: 'Psi Boost: Sharpened Power (1 Clarity)',
									description: 'If the ability has any power roll, that roll gains an edge.',
									type: 'Text',
									data: null
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
						id: 'talent-7-1',
						name: 'Ancestry Memory',
						description: 'Each time you finish a respite, you can choose a number of skills you have up to your Reason score and replace them with an equal number of skills from the interpersonal and lore skill groups. These replacements last unil the end of your next respite.',
						type: 'Text',
						data: null
					},
					{
						id: 'talent-7-2',
						name: 'Cascading Strain',
						description: 'Whenever you take damage from a strained effect or from having negative clarity, you can choose one enemy within distance of your Mind Spike ability to take the same damage.',
						type: 'Text',
						data: null
					},
					{
						id: 'talent-7-3a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'talent-7-3b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'talent-7-3c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'talent-7-3d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'talent-7-3e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'talent-7-4',
						name: 'Lucid Mind',
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
						id: 'talent-7-5',
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
						id: 'talent-8-1',
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
						id: 'talent-8-2',
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
						id: 'talent-9-1',
						name: 'Fortress of Perfect Thought',
						description: 'Fortress of Perfect Thought, Damage Modifier, Condition Immunity',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'talent-9-1a',
									name: 'Fortress of Perfect Thought',
									description: '\nYour mind is an impenetrable palace that shields you from danger. You gain the following effects:\n\n* You can breathe even when there is no breathable air.\n* Creatures can’t read your thoughts unless you allow them to.\n* Your Reason and Intuition are treated as 2 higher for the purpose of resisting the potency of abilities.',
									type: 'Text',
									data: null
								},
								{
									id: 'talent-9-1b',
									name: 'Damage Modifier',
									description: 'Psychic Immunity + 10',
									type: 'Damage Modifier',
									data: {
										modifiers: [
											{
												damageType: 'Psychic',
												type: 'Immunity',
												value: 10,
												valueCharacteristics: [],
												valueCharacteristicMultiplier: 1,
												valuePerLevel: 0,
												valuePerEchelon: 0
											}
										]
									}
								},
								{
									id: 'talent-9-1c',
									name: 'Condition Immunity',
									description: '',
									type: 'Condition Immunity',
									data: {
										conditions: [
											'Taunted',
											'Frightened'
										]
									}
								}
							]
						}
					}
				]
			},
			{
				level: 10,
				features: [
					{
						id: 'talent-10-1a',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'talent-10-1b',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'talent-10-2',
						name: 'Clear Mind',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'move 2',
							trigger: 'The first time each combat round that a creature is force moved',
							value: '2',
							replacesTags: [
								'move'
							]
						}
					},
					{
						id: 'talent-10-3',
						name: 'Omnisensory',
						description: 'Ability distance modifier, Omnisensory',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'talent-10-3a',
									name: 'Ability distance modifier',
									description: '',
									type: 'Ability Distance',
									data: {
										keywords: [
											'Ranged'
										],
										value: 10,
										valueCharacteristics: [],
										valueCharacteristicMultiplier: 0,
										valuePerLevel: 0,
										valuePerEchelon: 0
									}
								},
								{
									id: 'talent-10-3b',
									name: 'Omnisensory',
									description: 'You don’t need line of effect to a target of a ranged ability if the target is a creature capable of thought who you have previously had line of effect to.',
									type: 'Text',
									data: null
								}
							]
						}
					},
					{
						id: 'talent-10-4',
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
						id: 'talent-10-5',
						name: 'Psion',
						description: 'Psion, Psion',
						type: 'Multiple Features',
						data: {
							features: [
								{
									id: 'talent-10-5a',
									name: 'Psion',
									description: '',
									type: 'Heroic Resource Gain',
									data: {
										tag: 'start 3',
										trigger: 'Start of your turn',
										value: '1d3 + 2',
										replacesTags: [
											'start',
											'start 2'
										]
									}
								},
								{
									id: 'talent-10-5b',
									name: 'Psion',
									description: 'You can choose to not take damage from having negative clarity. You can also choose to take on any ability’s strained effect even if you’re not strained.',
									type: 'Text',
									data: null
								}
							]
						}
					},
					{
						id: 'talent-10-6',
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
						id: 'talent-10-7',
						name: 'Vision',
						description: '',
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
							details: 'You can spend vision to use one additional psionic ability on your turn, provided you pay the entire cost of the ability in vision. If you choose to use a psionic ability that usually costs no clarity, you must spend 1 vision to use it.',
							canBeNegative: false,
							value: 0
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '2 + P corruption damage; P < [weak], slowed (save ends)',
							tier2: '3 + P corruption damage; P < [average], slowed (save ends)',
							tier3: '5 + P corruption damage; P < [strong], slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The target takes 1 extra corruption damage for each additional time they are targeted by this ability during the encounter.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You gain 1 clarity when you obtain a tier 2 or tier 3 outcome on the power roll.'
					}
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
				id: 'talent-ability-2',
				name: 'Hoarfrost',
				description: 'You blast a foe with a pulse of cold energy.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R cold damage; M < [weak], slowed (EoT)',
							tier2: '4 + R cold damage; M < [average], slowed (EoT)',
							tier3: '6 + R cold damage; M < [strong], slowed (EoT)'
						}
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You are slowed until the end of your next turn. Additionally, a target slowed by this ability is restrained instead.'
					}
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
				id: 'talent-ability-3',
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
					'Psionic',
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
					},
					{
						type: 'text',
						text: 'A column of fire remains in the area until the start of your next turn. Each enemy who enters the area for the first time in a combat round or starts their turn there takes 2 fire damage.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The size of the cube increases by 2, but the fire disappears at the end of your turn.'
					}
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
				target: 'One size 1 creature or object',
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
							tier1: 'Slide 2 + R',
							tier2: 'Slide 4 + R',
							tier3: 'Slide 6 + R; prone'
						}
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You must vertical push the target instead of sliding them.'
					}
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 psychic damage',
							tier2: '5 psychic damage; push 1',
							tier3: '7 psychic damage; push 2'
						}
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The size of the burst increases by 2, and you are bleeding until the start of your next turn.'
					}
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
				id: 'talent-ability-6',
				name: 'Materialize',
				description: 'You picture an object in your mind and give it form—directly above your opponent’s head.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 + R damage',
							tier2: '5 + R damage',
							tier3: '8 + R damage'
						}
					},
					{
						type: 'text',
						text: 'A worthless size 1M object drops onto the target to deal the damage, then rolls into an adjacent unoccupied space of your choice. The object is made of wood, stone, or metal (your choice).'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The object explodes after the damage is dealt, and each creature adjacent to the target takes damage equal to your Reason score. You also take damage equal to your Reason score that can’t be reduced in any way.'
					}
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 + R damage; M < [weak], prone',
							tier2: '4 + R damage; M < [average], prone',
							tier3: '6 + R damage; M < [strong], prone'
						}
					},
					{
						type: 'text',
						text: 'When targeting an object with a solid reflective surface or a creature carrying or wearing such an object (such as a mirror, an unpainted metal shield, or shiny metal plate armor), you can target one additional creature or object within 3 squares of the first target.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You gain 1 surge that you can use immediately, and you take damage equal to your Reason score that can’t be reduced in any way.'
					}
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
						text: 'You gain 1 surge.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The target takes an extra 3 damage. You also take 3 damage that can’t be reduced in any way.'
					}
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
				target: 'One creature',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'If you target an ally, they gain temporary Stamina equal to three times your Presence score, and they can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '3 + P psychic damage; I < [weak], frightened (save ends)',
							tier2: '6 + P psychic damage; I < [average], frightened (save ends)',
							tier3: '9 + P psychic damage; I < [strong], frightened (save ends)'
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
				id: 'talent-ability-10',
				name: 'Choke',
				description: 'You crush a foe in a telekinetic grip.',
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 + R damage; M < [weak], slowed (save ends)',
							tier2: '5 + R damage; M < [average], slowed (save ends)',
							tier3: '8 + R damage; M < [strong], restrained (save ends)'
						}
					},
					{
						type: 'text',
						text: 'You can vertical pull the target up to 2 squares. If the target is made restrained by this ability, this forced movement ignores their stability.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'Ability rolls made against the target take a bane until the start of your next turn. Whenever the target takes damage while under this effect, they can use a triggered action to make a free strike against the source of the damage.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'Choose the damage type and the weakness for this ability from one of the following: acid, corruption, or fire. The target takes damage before this ability imposes any weakness.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '3 + R damage; R < [weak], the target has weakness 5 (save ends)',
							tier2: '6 + R damage; R < [average], the target has weakness 5 (save ends)',
							tier3: '9 + R damage; R < [strong], the target has weakness equal to 5 + your Reason score (save ends)'
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
				id: 'talent-ability-13',
				name: 'Flashback',
				description: 'The target is thrown several seconds back through time and gets to do it all again.',
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
				sections: [
					{
						type: 'text',
						text: 'The target uses an ability with a base Heroic Resource cost of 7 or lower that they’ve previously used this round, without needing to spend the base cost. Augmentations to the ability can be paid for as usual.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You take 1d6 damage and are slowed (save ends).'
					}
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
				sections: [
					{
						type: 'text',
						text: 'The target ignores difficult terrain and takes no damage from forced movement until the start of your next turn. Whenever the target enters a square while under this effect, they can push one adjacent creature up to a number of squares equal to your Reason score. When pushing an ally, the target can ignore that ally’s stability. A creature can only be force moved this way once a turn.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You are weakened (save ends). While you are weakened this way, whenever you are force moved, the forced movement distance gains a +5 bonus.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'The target’s stability increases by an amount equal to your Reason score, and they gain 10 temporary Stamina and 2 surges. This stability increase lasts until the target no longer has temporary Stamina from this ability.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You can’t use maneuvers (save ends).'
					}
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
				sections: [
					{
						type: 'text',
						text: 'Until the start of your next turn, the target gains a +3 bonus to speed, and they have a double edge on the next power roll they make. If the target obtains a tier 3 outcome on that roll, you gain 1 clarity.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You take 1d6 damage, and you can’t use triggered actions (save ends).'
					}
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '3 + P corruption damage; P < [weak], weakened (save ends)',
							tier2: '5 + P corruption damage; the target is flung through time, and if P < [average] they are weakened (save ends)',
							tier3: '8 + P corruption damage; the target is flung through time, and if P < [strong] they are weakened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'A target who is flung through time is removed from the encounter map until the end of their next turn, reappearing in their original space or the nearest unoccupied space.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You take 2d6 damage and permanently grow visibly older (the equivalent of 10 years for a human). If you obtain a tier 3 outcome on the power roll, you gain 2 clarity.'
					}
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
				id: 'talent-ability-18',
				name: 'Force Orb',
				description: 'Spheres of solid psionic energy float around you.',
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
				target: 'Self; see below',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: '\nYou create three size 1T orbs that orbit your body. Each orb gives you a cumulative damage immunity 1. Each time you take damage, you lose 1 orb.\n\nOnce on each of your turns, you can use a free maneuver to fire an orb at a creature or object within 5 squares as a ranged strike, losing the orb after the strike.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '2 damage',
							tier2: '3 damage',
							tier3: '5 damage'
						}
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You create five orbs, and you are weakened while you have any orbs active.'
					}
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
				sections: [
					{
						type: 'text',
						text: 'The aura lasts until the start of your next turn. Whenever an enemy targets an ally in the area with a ranged ability, the ability is negated on the ally and reflected back at the enemy. The ability deals half the damage to the enemy that it would have dealt to the ally and loses any additional effects.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The size of the aura increases by 1. Whenever your aura reflects an ability, you take 2d6 damage and forget a memory, as determined by you and the Director.'
					}
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Presence'
							],
							bonus: 0,
							tier1: '6 + P damage; P < [weak], dazed (save ends)',
							tier2: '10 + P damage; P < [average], dazed (save ends)',
							tier3: '14 + P damage; P < [strong], dazed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The target takes a bane on Presence tests until the end of the encounter.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The potency of this ability increases by 1. You take 2d6 damage and gain 3 surges that you can use immediately.'
					}
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
				id: 'talent-ability-21',
				name: 'Exothermic Shield',
				description: 'You encase the target in psionic flame and allow them to flicker without fear of burning out.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Pyrokinesis',
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Until the start of your next turn, the target has cold immunity 10 and fire immunity 10, and their strikes deal extra fire damage equal to twice your Reason score. Additionally, whenever an enemy attempts uses a melee ability against the target while they are under this effect, the enemy takes 5 fire damage.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'The target gains 2 surges. You are weakened and slowed (save ends).'
					}
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
				id: 'talent-ability-22',
				name: 'Hypersonic',
				description: 'You move fast enough to turn around and watch your foes feel the aftermath.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: []
				},
				keywords: [
					'Area',
					'Charge',
					'Psionic',
					'Telekinesis'
				],
				distance: [
					{
						type: 'Line',
						value: 5,
						value2: 2,
						within: 1,
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
						text: 'You teleport to a square on the opposite side of the area before making the power roll.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Reason'
							],
							bonus: 0,
							tier1: '12 sonic damage',
							tier2: '18 sonic damage',
							tier3: '24 sonic damage'
						}
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'If you obtain a tier 2 outcome or better, you are slowed until the end of your turn and each target is slowed until the end of their turn.'
					}
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
				id: 'talent-ability-23',
				name: 'Mind Snare',
				description: 'You latch onto your prey’s brain and don’t let go, like a song they can’t get out of their head.',
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
							tier1: '10 + R psychic damage; R < [weak], slowed (save ends)',
							tier2: '14 + R psychic damage; R < [average], slowed (save ends)',
							tier3: '20 + R psychic damage; R < [strong], slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'While slowed this way, the target takes 3 psychic damage for each square they willingly leave.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'While slowed this way, the target instead takes 5 psychic damage for each square they willingly leave. You have a double bane on ability rolls made against the target while they are slowed this way.'
					}
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
				id: 'talent-ability-24',
				name: 'Soulbound',
				description: 'You fire a piercing bolt of psychic energy that lances through two foes and leaves a faint intangible thread between them.',
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
				target: 'Two enemies',
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
							tier1: '8 damage; A < [weak], the target is stitched to the other target (save ends)',
							tier2: '13 damage; A < [average], the target is stitched to the other target (save ends)',
							tier3: '17 damage; A < [strong], the target is stitched to the other target (save ends)'
						}
					},
					{
						type: 'text',
						text: 'If any target becomes stitched to the other, both targets are stitched together. While stitched together, a target takes a bane on power rolls while not adjacent to a creature they’re stitched to. Whenever a stitched target takes damage that wasn’t dealt by or also taken by another stitched target, each other stitched target takes half the damage the initial target took.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You target yourself and three enemies instead.'
					}
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
				id: 'talent-ability-25',
				name: 'Doubt',
				description: 'You tug at the strings of the foe’s anima and unravel them, allowing someone else to take advantage of their drive.',
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
							tier1: '10 + P damage; P < [weak], weakened (save ends)',
							tier2: '14 + P damage; P < [average], weakened (save ends)',
							tier3: '20 + P damage; P < [strong], weakened and slowed (save ends)'
						}
					},
					{
						type: 'text',
						text: 'This ability gains an edge against a target with a soul. After you make the power roll, you or one ally within distance have a double edge on the next power roll you make before the end of the encounter.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You feel dispirited until you finish a respite. If you obtain a tier 3 outcome on the power roll, you and the target each have damage weakness 5 (save ends).'
					}
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
				id: 'talent-ability-26',
				name: 'Mindwipe',
				description: 'You attempt to make them forget all their training.',
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
					'Ranged',
					'Telepathy'
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
				target: 'One creature',
				cost: 11,
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
							tier1: '12 + R damage; R < [weak], the target takes a bane on their next power roll',
							tier2: '17 + R damage; R < [average], the target takes a bane on power rolls (save ends)',
							tier3: '23 + R damage; R < [strong], the target has a double bane on power rolls (save ends)'
						}
					},
					{
						type: 'text',
						text: 'The target can’t communicate with anyone until the end of the encounter.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You take 3d6 damage.'
					}
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
				id: 'talent-ability-27',
				name: 'Rejuvenate',
				description: 'You reshape the flow of time in the target’s body to return it to an earlier state.',
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
				target: 'One creature',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: '\nChoose two of the following effects:\n\n* The target can spend any number of Recoveries.\n* The target gains 1 of their Heroic Resource, and can end any\neffects on them that are ended by a saving throw or that end at the end of their turn.\n* The target gains 2 surges, and gains a +3 bonus to speed until the end of the encounter.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You and the target both permanently grow visibly younger (the equivalent of 20 human years, to the minimum of an 18-year-old). Additionally, you are weakened and slowed (save ends).'
					}
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
				id: 'talent-ability-28',
				name: 'Steel',
				description: 'The target’s skin becomes covered in tough metal.',
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
				target: 'One creature',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target has damage immunity 5 and can’t be made slowed or weakened until the start of your next turn. Whenever the target force moves a creature or object while under this effect, the forced movement distance gains a +5 bonus.'
					},
					{
						type: 'field',
						name: 'Strained',
						value: 0,
						repeatable: false,
						effect: 'You can’t use maneuvers (save ends).'
					}
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
				id: 'talent-sub-1',
				name: 'Chronopathy',
				description: 'Chronopathy abilities allow you to view future and past events, and to manipulate time to aid allies and hinder foes.',
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
										sections: [
											{
												type: 'text',
												text: 'The target shifts up to a number of squares equal to your Reason score.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 2,
												repeatable: false,
												effect: 'The target can use a maneuver.'
											}
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
											trigger: 'The target makes an ability roll.',
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
										sections: [
											{
												type: 'text',
												text: 'You can use this ability after seeing the result of the triggering roll. The target must reroll the power roll and use the new roll.'
											}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'You target two creatures, one of which can be you',
																	tier2: 'You target three creatures, one of which can be you',
																	tier3: 'You target four creatures, one of which can be you'
																}
															},
															{
																type: 'text',
																text: 'Until the start of your next turn, each target gains a +5 bonus to speed, they can’t be made dazed, and they can use an additional maneuver on their turn. If a target is already dazed, that condition ends for them.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'Your speed is halved until the end of the encounter.'
															}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'The target’s speed is halved (save ends), or if P < [weak], the target is slowed (save ends).',
																	tier2: 'The target is slowed (save ends), or if P < [average], the target’s speed is 0 (save ends).',
																	tier3: 'The target is slowed (save ends), or if P < [strong], the target’s speed is 0 (save ends).'
																}
															},
															{
																type: 'text',
																text: 'A target can’t use triggered actions while their speed is reduced this way.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The potency of this ability increases by 1 and you take 1d6 damage. At the start of each combat round while any target is affected by this ability, you take 1d6 damage. You can end the effect on all affected targets at any time (no action required).'
															}
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
								id: 'talent-sub-1-5-1',
								name: 'Distortion Temporal',
								description: 'While you are not dying, time behaves irregularly around you in a 3 aura. That area is difficult terrain for enemies. Additionally, when an ally enters the area for the first time in a combat round or starts their turn there, they gain a +2 bonus to speed until the end of the turn.',
								type: 'Text',
								data: null
							},
							{
								id: 'talent-sub-1-5-2',
								name: 'Speed of Thought',
								description: 'Once per combat round while you are not dying, you can spend 2 clarity when you use a triggered action to turn it into a free triggered action.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'talent-sub-1-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-1-6-1a',
												name: 'Fate',
												description: 'Your foe gets a glimpse of how it will end for them.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-1-6-1a',
														name: 'Fate',
														description: 'Your foe gets a glimpse of how it will end for them.',
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
															'Melee'
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
														target: 'One enemy',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The target has damage weakness 5 until the end of your next turn. Whenever the target takes damage while they have this weakness, they are knocked prone.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'This ability gains the Strike keyword as the vision hurts the target’s psyche. You make a power roll, then are weakened (save ends).'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '8 + P psychic damage',
																	tier2: '13 + P psychic damage',
																	tier3: '17 + P psychic damage'
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
												id: 'talent-sub-1-6-1b',
												name: 'Statis Field',
												description: 'Keep everything as it was. Ignore everything that will be.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-1-6-1b',
														name: 'Statis Field',
														description: 'Keep everything as it was. Ignore everything that will be.',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Chronopathy',
															'Psionic',
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
														target: 'Each creature and object in the area',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: '\nThe area is frozen in time until the start of your next turn. Each object in the area is restrained and can’t fall until the effect ends. Until the effect ends, creatures in the area who are reduced to 0 Stamina or would die stay alive, and objects in the area that are reduced to 0 Stamina remain undestroyed.\n\nMake a power roll that targets each enemy in the area.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'P < [weak], the target is slowed until the effect ends',
																	tier2: 'P < [average], the target’s speed is 0 until the effect ends',
																	tier3: 'P < [strong], the target is restrained until the effect ends'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'Any creature or object force moved in the area takes 2 corruption damage for each square of the area they enter. Creatures and objects restrained in the area can be force moved. You are restrained until the effect ends.'
															}
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
								id: 'talent-sub-1-8-1',
								name: 'Doubling the Hours',
								description: 'While you have 5 or more Victories, you can undertake an additional respite activity during a respite.',
								type: 'Text',
								data: null
							},
							{
								id: 'talent-sub-1-8-2',
								name: 'Stasis Shield',
								description: 'You freeze time just long enough to bring the victim to safety!',
								type: 'Ability',
								data: {
									ability: {
										id: 'talent-sub-1-8-2',
										name: 'Stasis Shield',
										description: 'You freeze time just long enough to bring the victim to safety!',
										type: {
											usage: 'Triggered Action',
											free: false,
											trigger: 'The target takes damage.',
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
										target: 'Self or one creature or object',
										cost: 3,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'The target is teleported to an unoccupied space adjacent to you, taking no damage and suffering no additional effects if this movement would get them out of harm’s way.'
											},
											{
												type: 'field',
												name: 'Strained',
												value: 0,
												repeatable: false,
												effect: 'You can’t target yourself, and you take the damage and any additional effects instead of the target.'
											}
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
						level: 9,
						features: [
							{
								id: 'talent-sub-1-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-1-9-1a',
												name: 'Acceleration Field',
												description: 'You forcibly stuff more moments into a critical point in time, knowing full well you might need to steal some of your own.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-1-9-1a',
														name: 'Acceleration Field',
														description: 'You forcibly stuff more moments into a critical point in time, knowing full well you might need to steal some of your own.',
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
														target: 'Three allies',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Each target can use any main action available to them as a free triggered action, but they lose their main action on their next turn.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'Make a power roll that targets you and each enemy within distance.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '4 corruption damage; slowed (save ends)',
																	tier2: '6 corruption damage; slowed (save ends)',
																	tier3: '10 corruption damage; slowed (save ends)'
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
												id: 'talent-sub-1-9-1b',
												name: 'Borrow From the Future',
												description: 'You lean on future heroism to assist you in the now.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-1-9-1b',
														name: 'Borrow From the Future',
														description: 'You lean on future heroism to assist you in the now.',
														type: {
															usage: 'Maneuver',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Area',
															'Chronopathy',
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
														target: 'Each ally in the area',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'The targets share 6 of their Heroic Resource among themselves, as you determine. A target can’t gain more than 3 of their Heroic Resource this way. After using this ability, you can’t gain any clarity until the end of the next combat round.'
															}
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
				id: 'talent-sub-2',
				name: 'Telekinesis',
				description: 'Telekinesis abilities allow you to physically manipulate creatures and objects.',
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
										target: 'Self or one size 1 creature or object',
										cost: 0,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'You slide the target up to a number of squares equal to your Reason score.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 2,
												repeatable: true,
												effect: 'The size of the creature or object you can target increases by 1 for every 2 clarity spent.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 3,
												repeatable: false,
												effect: 'You can vertical slide the target.'
											}
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
										sections: [
											{
												type: 'text',
												text: 'The target takes half the triggering damage, or the distance of the triggering forced movement is reduced by a number of squares equal to your Reason score. If the target took damage and was force moved, you choose the effect. If the forced movement is reduced to 0 squares, the target can push the source of the forced movement a number of squares equal to your Reason score.'
											}
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
										sections: [
											{
												type: 'text',
												text: 'You reduce the falling damage by an amount equal to 2 + your Reason score.'
											}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: '3 damage; vertical push 2',
																	tier2: '6 damage; vertical push 4',
																	tier3: '9 damage; vertical push 6'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The size of the burst increases by 1, and you are weakened until the end of your turn.'
															}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: '6 + R damage; M < [weak], prone',
																	tier2: '10 + R damage; M < [average], prone',
																	tier3: '14 + R damage; M < [strong], prone and can’t stand (save ends)'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You take half the damage the target takes.'
															}
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
								id: 'talent-sub-2-5-1',
								name: 'Kinetic Amplifier',
								description: 'Whenever you force move a creature, you can spend up to 2 surges. For each surge spent, the forced movement distance gains a bonus equal to your Reason score.',
								type: 'Text',
								data: null
							},
							{
								id: 'talent-sub-2-5-2',
								name: 'Triangulate',
								description: 'Whenever an ally uses a ranged ability while you are within the ability’s distance, you can spend 1 clarity as a free triggered action to allow them to use the ability as if they were in your space.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'talent-sub-2-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-2-6-1a',
												name: 'Gravitic Well',
												description: 'You bend gravity into a fine point and pull your foes toward it.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-2-6-1a',
														name: 'Gravitic Well',
														description: 'You bend gravity into a fine point and pull your foes toward it.',
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
															'Ranged',
															'Telekinesis'
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
														target: 'Each enemy and object in the area',
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
																	tier1: '6 damage; vertical pull 5 toward the center of the a',
																	tier2: '9 damage; vertical pull 7 toward the center of the area',
																	tier3: '13 damage; vertical pull 10 toward the center of the area'
																}
															},
															{
																type: 'text',
																text: 'Targets closest to the center of the area are pulled first.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The size of the area increases by 2. You also target yourself and each ally within distance.'
															}
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
												id: 'talent-sub-2-6-1b',
												name: 'Greater Kinetic Grip',
												description: 'You raise the target into the air without breaking a sweat.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-2-6-1b',
														name: 'Greater Kinetic Grip',
														description: 'You raise the target into the air without breaking a sweat.',
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
																	tier1: 'Slide 4 + R; M < [weak], the forced movement is vertic',
																	tier2: 'Slide 8 + R; M < [average], the forced movement is vertical',
																	tier3: 'Slide 12 + R; prone; M < [strong], the forced movement is vertical'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The forced movement ignores stability. You take 2d6 damage and are weakened (save ends).'
															}
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
								id: 'talent-sub-2-8-1',
								name: 'Levitation Field',
								description: 'You manipulate the air around your allies so they can move as freely through the sky as you can.',
								type: 'Ability',
								data: {
									ability: {
										id: 'talent-sub-2-8-1',
										name: 'Levitation Field',
										description: 'You manipulate the air around your allies so they can move as freely through the sky as you can.',
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
												value: 3,
												value2: 0,
												within: 0,
												special: '',
												qualifier: ''
											}
										],
										target: 'Each ally in the area',
										cost: 3,
										repeatable: false,
										minLevel: 1,
										sections: [
											{
												type: 'text',
												text: 'Each target can fly until the start of your next turn, and can immediately shift up to their speed. You can also shift up to your speed. While flying, a target’s stability is reduced to 0 and can’t be increased.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 5,
												repeatable: false,
												effect: 'The effects last for 1 hour instead.'
											}
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
								id: 'talent-sub-2-8-2',
								name: 'Low Gravity',
								description: 'Your mind can carry your body through tough times. You ignore difficult terrain and don’t need to spend additional movement while prone.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'talent-sub-2-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-2-9-1a',
												name: 'Fulcrum',
												description: 'You precisely manipulate the creatures around you.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-2-9-1a',
														name: 'Fulcrum',
														description: 'You precisely manipulate the creatures around you.',
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
																type: 'Special',
																value: 0,
																value2: 0,
																within: 0,
																special: 'Special',
																qualifier: ''
															}
														],
														target: 'Each enemy and object in the area',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'Make a power roll to determine the area of this ability. Each target is vertical pushed 6 squares. You can target only objects of size 1L or smaller.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: '2 burst',
																	tier2: '3 burst',
																	tier3: '4 burst'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You can choose to reduce the size of the burst by 2 (to a minimum of 1 burst) to give the forced movement distance a +2 bonus. You take half the total damage all targets take from forced movement.'
															}
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
												id: 'talent-sub-2-9-1b',
												name: 'Gravitic Nova',
												description: 'Unbridled psionic energy erupts from your body and flashes outward, hurling your foes back.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-2-9-1b',
														name: 'Gravitic Nova',
														description: 'Unbridled psionic energy erupts from your body and flashes outward, hurling your foes back.',
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
																value: 3,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each enemy and object in the area',
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
																	tier1: '6 damage; push 7',
																	tier2: '9 damage; push 10',
																	tier3: '13 damage; push 15'
																}
															},
															{
																type: 'text',
																text: 'On a critical hit, the size of the area increases by 3, and this ability deals an extra 10 damage.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You are weakened (save ends). If you scored a critical hit with this ability, you die.'
															}
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
				id: 'talent-sub-3',
				name: 'Telepathy',
				description: 'Telepathy abilities allow you to communicate with, read, and influence the minds of other creatures.',
				featuresByLevel: [
					{
						level: 1,
						features: [
							{
								id: 'talent-sub-3-1-1',
								name: 'Feedback Loop',
								description: 'Creating a brief psychic link between an enemy and their target gives that foe a taste of their own medicine.',
								type: 'Ability',
								data: {
									ability: {
										id: 'talent-sub-3-1-1',
										name: 'Feedback Loop',
										description: 'Creating a brief psychic link between an enemy and their target gives that foe a taste of their own medicine.',
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
										sections: [
											{
												type: 'text',
												text: 'The target takes psychic damage equal to half the triggering damage.'
											}
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
										sections: [
											{
												type: 'text',
												text: 'The next ability roll an ally makes against the target before the start of your next turn gains an edge.'
											},
											{
												type: 'field',
												name: 'Spend',
												value: 1,
												repeatable: false,
												effect: 'You target one additional creature or object.'
											}
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
								id: 'talent-sub-3-2-1',
								name: 'Ease the Mind',
								description: 'You gain an edge on tests made to stop combat and start a negotiation. Additionally, if you are present during a negotiation, any NPC who has a hostile or suspicious starting attitude has their patience increased by 1 (to a maximum of 5).',
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: '6 + R psychic damage; I < [weak], slowed (save ends)',
																	tier2: '10 + R psychic damage; I < [average], weakened (save ends)',
																	tier3: '14 + R psychic damage; I < [strong], dazed (save ends)'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You start crying, and you can’t use triggered actions or make free strikes until the end of the target’s next turn.'
															}
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
														sections: [
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Reason'
																	],
																	bonus: 0,
																	tier1: 'The target makes a free strike against one enemy of your choice.',
																	tier2: 'The target shifts up to their speed and uses their signature ability against any enemies of your choice.',
																	tier3: 'The target moves up to their speed and uses their signature ability against any enemies of your choice.'
																}
															},
															{
																type: 'text',
																text: 'You control the target’s movement. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. However, you can move them to provoke opportunity attacks.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You take 1d6 damage and are weakened until the end of your turn.'
															}
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
								id: 'talent-sub-3-5-1',
								name: 'Compulsion',
								description: 'Whenever you obtain a success on a test using a skill from the interpersonal skill group while interacting with an NPC, you can ask them a question using your Telepathic Speech feature. The NPC must answer the question truthfully to the best of their ability.',
								type: 'Text',
								data: null
							},
							{
								id: 'talent-sub-3-5-2',
								name: 'Remote Amplification',
								description: 'Remote Amplification, Ability distance modifier',
								type: 'Multiple Features',
								data: {
									features: [
										{
											id: 'talent-sub-3-5-2a',
											name: 'Remote Amplification',
											description: 'The range of your Telepathic Speech feature increases to 1 mile.',
											type: 'Text',
											data: null
										},
										{
											id: 'talent-sub-3-5-2b',
											name: 'Ability distance modifier',
											description: '',
											type: 'Ability Distance',
											data: {
												keywords: [
													'Ranged',
													'Psionic'
												],
												value: 5,
												valueCharacteristics: [],
												valueCharacteristicMultiplier: 0,
												valuePerLevel: 0,
												valuePerEchelon: 0
											}
										}
									]
								}
							}
						]
					},
					{
						level: 6,
						features: [
							{
								id: 'talent-sub-3-6-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-3-6-1a',
												name: 'Synaptic Conditioning',
												description: 'It’s a subtle mindset shift. It’s not that they’re your enemy—you just don’t like them!',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-3-6-1a',
														name: 'Synaptic Conditioning',
														description: 'It’s a subtle mindset shift. It’s not that they’re your enemy—you just don’t like them!',
														type: {
															usage: 'Main Action',
															free: false,
															trigger: '',
															time: '',
															qualifiers: []
														},
														keywords: [
															'Psionic',
															'Melee',
															'Ranged',
															'Telepathy'
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
														target: 'One creature',
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
																	tier1: '10 psychic damage; the target takes a bane on ability rolls made to harm you or your allies (save ends)',
																	tier2: '14 psychic damage; the target has a double bane on ability rolls made to harm you or your allies (save ends)',
																	tier3: '20 psychic damage; the target considers you and your allies to be their allies when using abilities and features (save ends)'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'While the target is under this effect, you no longer consider your enemies to be your enemies when using your abilities and features.'
															}
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
												id: 'talent-sub-3-6-1b',
												name: 'Synaptic Dissipation',
												description: 'You manipulate your enemies’ minds and make them wonder if you were ever really there in the first place.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-3-6-1b',
														name: 'Synaptic Dissipation',
														description: 'You manipulate your enemies’ minds and make them wonder if you were ever really there in the first place.',
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
														target: 'Special',
														cost: 9,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You target a number of creatures with this ability determined by the outcome of your power roll. You and your allies are invisible to each target until the start of your next turn.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'Two creatures',
																	tier2: 'Three creatures',
																	tier3: 'Five creatures'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The effect ends early if you take damage from an enemy’s ability.'
															}
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
								id: 'talent-sub-3-8-1',
								name: 'Mindlink',
								description: 'During a respite, you can choose a number of creatures up to your Reason score who you have communicated with using your Telepathic Speech feature, creating a telepathic link among all of you. Whenever a linked creature spends one or more Recoveries, each other linked creature can spend a Recovery.',
								type: 'Text',
								data: null
							},
							{
								id: 'talent-sub-3-8-2',
								name: 'Universal Connection',
								description: 'The range of your Telepathic Speech feature increases to anywhere on the same world.',
								type: 'Text',
								data: null
							}
						]
					},
					{
						level: 9,
						features: [
							{
								id: 'talent-sub-3-9-1',
								name: 'Choice',
								description: '',
								type: 'Choice',
								data: {
									options: [
										{
											feature: {
												id: 'talent-sub-3-9-1a',
												name: 'Resonant Mind Spike',
												description: 'You fire a telepathic bolt empowered by every consciousness within reach directly into your foe’s mind.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-3-9-1a',
														name: 'Resonant Mind Spike',
														description: 'You fire a telepathic bolt empowered by every consciousness within reach directly into your foe’s mind.',
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
																	tier1: '15 + R psychic damage',
																	tier2: '24 + R psychic damage',
																	tier3: '28 + R psychic damage'
																}
															},
															{
																type: 'text',
																text: 'This ability ignores cover and concealment.'
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'The ability roll scores a critical hit on a natural 17 or higher. You take half the damage the target takes, and you can’t reduce this damage in any way.'
															}
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
												id: 'talent-sub-3-9-1b',
												name: 'Synaptic Terror',
												description: 'You project a terrifying image into the brains of your foes, and their fear psionically invigorates your allies.',
												type: 'Ability',
												data: {
													ability: {
														id: 'talent-sub-3-9-1b',
														name: 'Synaptic Terror',
														description: 'You project a terrifying image into the brains of your foes, and their fear psionically invigorates your allies.',
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
																value: 3,
																value2: 0,
																within: 0,
																special: '',
																qualifier: ''
															}
														],
														target: 'Each ally and enemy in the area',
														cost: 11,
														repeatable: false,
														minLevel: 1,
														sections: [
															{
																type: 'text',
																text: 'You and each target ally can’t obtain lower than a tier 2 outcome on power rolls until the start of your next turn. Each target enemy is affected by the ability’s power roll.'
															},
															{
																type: 'roll',
																roll: {
																	characteristic: [
																		'Presence'
																	],
																	bonus: 0,
																	tier1: 'R < [weak], frightened (save ends)',
																	tier2: 'R < [average], frightened (save ends)',
																	tier3: 'R < [strong], frightened (save ends)'
																}
															},
															{
																type: 'field',
																name: 'Strained',
																value: 0,
																repeatable: false,
																effect: 'You can’t use this ability if doing so would cause you to have negative clarity.'
															}
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
						'Persuade'
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
						'Search'
					]
				}
			},
			{
				id: 'career-agent-feature-4',
				name: 'Languages',
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
							description: 'If you spend 10 minutes or less interacting with a creature who hasn’t met you before, you can cause them to forget your face when you part. If asked to describe you, the creature gives only a vague, blank, and unhelpful description. Additionally, if you spend 1 hour or more assembling a disguise, you automatically obtain a tier 2 outcome on any test that could make use of the Disguise skill. If you have the Disguise skill, you automatically obtain a tier 3 outcome on the test.',
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
			selectedID: 'career-agent-ii-1'
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
