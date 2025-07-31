import { Hero } from '../../models/hero';

export const orcConduit = {
	id: 'peDWE02tDZH9CK2P',
	name: 'Khettovek',
	picture: null,
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
															persistence: [], sections: []
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
															persistence: [], sections: []
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
								persistence: [], sections: []
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
									usage: 'Main Action',
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
								persistence: [], sections: []
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
												persistence: [], sections: []
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
												persistence: [], sections: []
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
											persistence: [], sections: []
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-2',
				name: 'Drain',
				description: 'You drain the energy from your target and revitalize yourself or an ally.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-3',
				name: 'Holy Lash',
				description: 'A tendril of divine energy shoots forth to draw in your foe.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-4',
				name: 'Lightfall',
				description: 'A rain of holy light scours your enemies and repositions your allies.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-5',
				name: 'Sacrificial Offer',
				description: 'Divine magic tears at your foe and defends a nearby friend.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-6',
				name: 'Staggering Curse',
				description: 'A blast of judgment disorients your foe.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-7',
				name: 'Warrior\'s Prayer',
				description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-8',
				name: 'Wither',
				description: 'A bolt of holy energy saps the life from a foe.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-9',
				name: 'Call the Thunder Down',
				description: 'You ask your saint for thunder and your prayer is answered.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-10',
				name: 'Font of Wrath',
				description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-11',
				name: 'Judgment\'s Hammer',
				description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-12',
				name: 'Violence Will Not Aid Thee',
				description: 'After some holy lightning, your enemy will think twice about their next attack.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-13',
				name: 'Corruption\'s Curse',
				description: 'Cursed by you, your enemy takes more damage from your allies.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-14',
				name: 'Curse of Terror',
				description: 'Fear of divine judgment overwhelms your foe.',
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
				persistence: [], sections: []
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-16',
				name: 'Sermon of Grace',
				description: 'You inspire your allies with tales of your saint’s great deeds.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-17',
				name: 'Fear of the Gods',
				description: 'Your divine magic makes a creature appear as what your enemies fear most.',
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
				persistence: [], sections: []
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-19',
				name: 'Soul Siphon',
				description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
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
				persistence: [], sections: []
			},
			{
				id: 'conduit-ability-20',
				name: 'Words of Wrath and Grace',
				description: 'Your saint grants your enemies a vision of whatever they most fear.',
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
				persistence: [], sections: []
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
		controlledSlots: [],
		notes: '',
		encounterState: 'ready',
		hidden: false,
		defeated: false
	},
	abilityCustomizations: []
} as Hero;
