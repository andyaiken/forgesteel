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
				description: 'Whenever a creature deals damage to you that leaves you dying, you can make a free strike against any creature. If the creature is reduced to 0 Stamina by your strike, you can spend a Recovery.',
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
								description: 'The magic coursing through your veins makes you run faster in the heat of battle. The first time in any combat round that you take damage, you gain a +2 bonus to speed until the end of the round.',
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
								description: 'When you are stirred by passion for creation, your bloodfire allows you to work longer and harder. When you gain your initial skills from your career, culture, class, or other source, choose two skills from the crafting skill group, whether you have those skills or not. Whenever you make a project roll for a crafting project that uses these skills, you gain a +2 bonus to the roll.',
								type: 'Text',
								data: null
							},
							value: 1
						},
						{
							feature: {
								id: 'orc-feature-2-4',
								name: 'Glowing Recovery',
								description: 'Your bloodfire allows you to regain your strength quicker than others. Whenever you use the Catch Breath maneuver, you can spend as many Recoveries as you like.',
								type: 'Text',
								data: null
							},
							value: 2
						},
						{
							feature: {
								id: 'orc-feature-2-5',
								name: 'Nonstop',
								description: 'Your bloodfire supplies you with a constant rush of adrenaline.',
								type: 'Condition Immunity',
								data: {
									conditions: [
										'Slowed'
									]
								}
							},
							value: 2
						}
					],
					count: 'ancestry',
					selected: [
						{
							id: 'orc-feature-2-5',
							name: 'Nonstop',
							description: 'Your bloodfire supplies you with a constant rush of adrenaline.',
							type: 'Condition Immunity',
							data: {
								conditions: [
									'Slowed'
								]
							}
						},
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
				selected: [ 'Kalliak' ]
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
					'Climb'
				]
			}
		},
		organization: {
			id: 'org-communal',
			name: 'Communal',
			description: 'A communal culture is a place where all members of the culture are considered equal. The community works together to make important decisions that affect the majority of the culture. While they elect leaders to carry out these decisions and organize their efforts, each person has a relatively equal say in how the culture operates, and everyone contributes to help their people survive and thrive. Individuals often share the burdens of governing, physical labor, childcare, and other duties. A collective of farmers who work together to cultivate and protect their land without a noble, a city of pirates where each person can do as they wish, and a traveling theatrical troupe whose members vote on every artistic and administrative decision are all communal cultures. Many communal cultures operate outside settled lands, sticking to the wilds, a specific district in a larger settlement, city sewers, forgotten ruins, or other isolated places. For even when such cultures are harmless, their members know that outsiders might try to impose rules upon them if they live in the same place. As such, many folks in communal cultures focus on fending for themselves while avoiding the danger that other groups can represent.',
			type: 'Skill Choice',
			data: {
				options: [],
				listOptions: [
					'Crafting',
					'Exploration'
				],
				count: 1,
				selected: [
					'Jump'
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
					'Perform'
				]
			}
		}
	},
	class: {
		id: 'class-conduit',
		name: 'Conduit',
		description: '\nThe power of the gods flows through you! As a vessel for divine power, you don’t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. Though the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.\n\nAs a conduit, you heal and buff your allies, and debuff your foes while smiting them with divine magic. The spark of divinity within you shines, filling your enemies with awe and making you more worldly and aware.',
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
							valuePerLevel: 6,
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
						id: 'conduit-resource',
						name: 'Piety',
						description: '',
						type: 'Heroic Resource',
						data: {
							type: 'heroic',
							gains: [
								{
									tag: 'start',
									trigger: 'Start of your turn',
									value: '1d3'
								}
							],
							details: '',
							canBeNegative: false,
							value: 0
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
								'Persuade',
								'Read Person'
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
																description: 'Each time you finish a respite, you can choose yourself or one ally who is also finishing a respite to gain the benefit of a divine ritual. The chosen character gains a bonus to their recovery value equal to your level that lasts until you finish another respite.',
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
																qualifiers: [],
																freeStrike: false
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
															sections: [
																{
																	type: 'text',
																	text: 'Until the end of the encounter or until you are dying, whenever a target starts their turn in the area, they can spend a Recovery.'
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
											level: 3,
											features: []
										},
										{
											level: 4,
											features: [
												{
													id: 'domain-life-4',
													name: 'Blessing of Life',
													description: 'Your divine presence causes those you deem worthy to recover quickly from a fight. Whenever an ally within distance of your Healing Grace ability regains Stamina, they regain additional Stamina equal to your Intuition score.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 5,
											features: []
										},
										{
											level: 6,
											features: [
												{
													id: 'domain-life-6',
													name: 'Revitalizing Grace',
													description: 'With a gesture, you restore your health and that of your allies.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-life-6',
															name: 'Revitalizing Grace',
															description: 'With a gesture, you restore your health and that of your allies.',
															type: {
																usage: 'Main Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: [],
																freeStrike: false
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
																	text: 'Each target can spend any number of Recoveries. Additionally, each target can end one effect on themself that is ended by a saving throw or that ends at the end of their turn, or they can stand up if prone.'
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
													id: 'domain-life-7',
													name: 'Font of Grace',
													description: 'Each time you use your Healing Grace ability, you gain 1 piety that can be spent only on that ability during the same turn. If you don’t use this piety, it is lost. Additionally, you can use your Minor Miracle feature to return a creature to life even if you don’t have their remains.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 8,
											features: []
										},
										{
											level: 9,
											features: [
												{
													id: 'domain-life-9',
													name: 'Radiance of Grace',
													description: 'Intense light is emitted from your body, healing your allies.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-life-9',
															name: 'Radiance of Grace',
															description: 'Intense light is emitted from your body, healing your allies.',
															type: {
																usage: 'Main Action',
																free: false,
																trigger: '',
																time: '',
																qualifiers: [],
																freeStrike: false
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
															target: 'Four Allies',
															cost: 11,
															repeatable: false,
															minLevel: 1,
															sections: [
																{
																	type: 'text',
																	text: 'You can target yourself instead of one ally with this ability. Each target can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone.'
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
											level: 10,
											features: []
										}
									],
									resourceGains: [
										{
											resource: 'Piety',
											tag: '',
											trigger: 'The first time in an encounter that a creature within 10 squares regains Stamina',
											value: '2'
										}
									],
									defaultFeatures: [
										{
											id: 'life-default-1',
											name: 'Life Prayer Effect',
											description: 'Choose yourself or one ally within 10 squares of you. That character can spend a Recovery, can end one effect on them that is ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you or one ally within 10 squares gains temporary Stamina equal to 2 times your Intuition score.',
											type: 'Package Content',
											data: {
												tag: 'conduit-prayer'
											}
										}
									]
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
																description: 'Each time you finish a respite, you can choose yourself or one ally who is also finishing a respite to gain the benefit of a divine ritual. You place a ray of morning light into the chosen character’s soul, granting them a +1 bonus to saving throws that lasts until you finish another respite.',
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
																qualifiers: [],
																freeStrike: false
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
															sections: [
																{
																	type: 'roll',
																	roll: {
																		characteristic: [
																			'Intuition'
																		],
																		bonus: 0,
																		tier1: '4 fire damage',
																		tier2: '6 fire damage',
																		tier3: '10 fire damage'
																	}
																},
																{
																	type: 'text',
																	text: 'Each ally in the area deals fire damage equal to your Intuition score with their next strike made before the end of their next turn.'
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
											level: 3,
											features: []
										},
										{
											level: 4,
											features: [
												{
													id: 'domain-sun-4',
													name: 'Light of Revelation',
													description: 'As a maneuver, you make your body shine brightly, illuminating your space and each square within 5 squares. This light shines through any darkness. Hidden creatures in the area are automatically revealed, and creatures in the light, including you, can’t hide. While this feature is active, you gain an edge on tests made to notice hidden objects and entrances and to detect supernatural illusions.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 5,
											features: []
										},
										{
											level: 6,
											features: [
												{
													id: 'domain-sun-6',
													name: 'Blessing of the Midday Sun',
													description: 'Your body emits a heat that bakes your enemies and inspires your allies.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-sun-6',
															name: 'Blessing of the Midday Sun',
															description: 'Your body emits a heat that bakes your enemies and inspires your allies.',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: [],
																freeStrike: false
															},
															keywords: [
																'Area',
																'Magic'
															],
															distance: [
																{
																	type: 'Aura',
																	value: 4,
																	value2: 0,
																	within: 0,
																	special: '',
																	qualifier: ''
																}
															],
															target: 'Self and each creature in the area',
															cost: 9,
															repeatable: false,
															minLevel: 1,
															sections: [
																{
																	type: 'text',
																	text: 'Until the end of the encounter or until you are dying, each enemy in the area takes a bane on power rolls, and you and each ally in the area gain 1 surge at the end of each of your turns.'
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
													id: 'domain-sun-7',
													name: 'Light of the Burning Sun',
													description: 'Sun infuses your body. Whenever you use an ability to deal rolled damage to another creature, that ability deals an extra 5 fire damage, or an extra 15 fire damage if the creature is undead. Additionally, you have fire immunity equal to your level, which is added to any other fire immunity you have.',
													type: 'Text',
													data: null
												}
											]
										},
										{
											level: 8,
											features: []
										},
										{
											level: 9,
											features: [
												{
													id: 'domain-sun-9',
													name: 'Solar Flare',
													description: 'You call down a sphere of fire that burns your foes to ash.',
													type: 'Ability',
													data: {
														ability: {
															id: 'domain-sun-9',
															name: 'Solar Flare',
															description: 'You call down a sphere of fire that burns your foes to ash.',
															type: {
																usage: 'Maneuver',
																free: false,
																trigger: '',
																time: '',
																qualifiers: [],
																freeStrike: false
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
																			'Intuition'
																		],
																		bonus: 0,
																		tier1: '9 fire damage',
																		tier2: '14 fire damage',
																		tier3: '19 fire damage'
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
										},
										{
											level: 10,
											features: []
										}
									],
									resourceGains: [
										{
											resource: 'Piety',
											tag: '',
											trigger: 'The first time in an encounter that an enemy within 10 squares takes fire or holy damage',
											value: '2'
										}
									],
									defaultFeatures: [
										{
											id: 'sun-default-1',
											name: 'Sun Prayer Effect',
											description: 'One enemy within 10 squares takes fire damage equal to three times your Intuition score.',
											type: 'Package Content',
											data: {
												tag: 'conduit-prayer'
											}
										}
									]
								}
							]
						}
					},
					{
						id: 'conduit-1-3b',
						name: 'Prayer',
						description: '\nYou can gain more piety by praying to the gods—but beware! Doing so can easily draw their ire, as the gods hate to be annoyed. Before you roll to gain piety at the start of your turn, you can pray (no action required). If you do, your roll gains the following additional effects:\n\n* If the roll is a 1, you gain 1 additional piety but anger the gods! You take psychic damage equal to 1d6 + your level, which can’t be reduced in any way.\n* If the roll is a 2, you gain 1 additional piety.\n* If the roll is a 3, you gain 2 additional piety and can activate a domain effect of your choice.',
						type: 'Package',
						data: {
							tag: 'conduit-prayer'
						}
					},
					{
						id: 'conduit-1-4',
						name: '1st-Level Domain Feature',
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
												description: 'Each time you finish a respite, you can choose yourself or one ally who is also finishing a respite to gain the benefit of a divine ritual. The chosen character gains a bonus to their recovery value equal to your level that lasts until you finish another respite.',
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
									qualifiers: [],
									freeStrike: false
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
								sections: [
									{
										type: 'text',
										text: 'The target can spend a Recovery.'
									},
									{
										type: 'field',
										name: 'Spend',
										value: 1,
										repeatable: false,
										effect: '\nFor each piety spent, you can choose one of the following enhancements:\n\n* You can target one additional ally within distance.\n* You can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.\n* A prone target can stand up.\n* A target can spend 1 additional Recovery.'
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
								target: 'One creature or object',
								cost: 0,
								repeatable: false,
								minLevel: 1,
								sections: [
									{
										type: 'roll',
										roll: {
											characteristic: [
												'Intuition'
											],
											bonus: 0,
											tier1: '2 + I damage',
											tier2: '4 + I damage',
											tier3: '6 + I damage'
										}
									},
									{
										type: 'text',
										text: 'You can have this ability deal holy damage.'
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
													trigger: 'The target makes an ability roll for a damage-dealing ability.',
													time: '',
													qualifiers: [],
													freeStrike: false
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
												cost: 0,
												repeatable: false,
												minLevel: 1,
												sections: [
													{
														type: 'text',
														text: 'The power roll gains an edge.'
													},
													{
														type: 'field',
														name: 'Spend',
														value: 1,
														repeatable: false,
														effect: 'The power roll has a double edge.'
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
													trigger: 'The target would take damage from an ability that uses a power roll.',
													time: '',
													qualifiers: [],
													freeStrike: false
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
												cost: 0,
												repeatable: false,
												minLevel: 1,
												sections: [
													{
														type: 'text',
														text: 'The power roll takes a bane against the target.'
													},
													{
														type: 'field',
														name: 'Spend',
														value: 1,
														repeatable: false,
														effect: 'The power roll has a double bane against the target.'
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
												trigger: 'The target makes an ability roll for a damage-dealing ability.',
												time: '',
												qualifiers: [],
												freeStrike: false
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
											cost: 0,
											repeatable: false,
											minLevel: 1,
											sections: [
												{
													type: 'text',
													text: 'The power roll gains an edge.'
												},
												{
													type: 'field',
													name: 'Spend',
													value: 1,
													repeatable: false,
													effect: 'The power roll has a double edge.'
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
										description: 'Your god blesses you with the ability to stretch your divine magic farther.',
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
												},
												{
													id: 'conduit-1-8dc',
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
										id: 'conduit-1-8d',
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
									description: 'Your god blesses you with the ability to stretch your divine magic farther.',
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
										description: 'Your god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.',
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
										description: 'In response to a foe’s aggression, your god protects you. Whenever another creature damages you, that creature can’t target you with a strike until you harm them or one of their allies, or until the end of their next turn.',
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
									description: 'Your god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.',
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
							allowAnySource: false,
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
							allowAnySource: false,
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
							allowAnySource: false,
							minLevel: 1,
							count: 1,
							selectedIDs: [
								'conduit-ability-15'
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
						description: 'Your deity is aware of your growing influence, making it easier to draw their attention and power when you heal your allies. Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.',
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
						name: '2nd-Level Domain Feature',
						description: 'You gain the 1st-level domain feature and ability to choose a skill for the domain you selected at 1st level but whose domain feature you didn’t take at that level.',
						type: 'Domain Feature',
						data: {
							level: 1,
							count: 1,
							selected: []
						}
					},
					{
						id: 'conduit-2-4',
						name: '2nd-Level Domain Ability',
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
						description: '\nAs a respite activity, you can perform a religious ritual and beseech the gods to restore a dead creature to life. You must have at least half the creature’s remains, and they must have died within the last 24 hours from an effect that isn’t age related. The creature’s soul must be willing to return to life for the ritual to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately.\n\nA creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite.',
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
						id: 'conduit-4-1',
						name: 'Blessed Domain',
						description: 'Whenever you gain piety from a domain feature, you gain 1 additional piety.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-4-1a',
						name: 'Characteristic Increase: Intuition',
						description: 'Your Intuition score increases to 3.',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'conduit-4-1b',
						name: 'Characteristic Increase: Additional',
						description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 3.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'conduit-4-1b-1',
										name: 'Agility',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Agility',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'conduit-4-1b-2',
										name: 'Might',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Might',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'conduit-4-1b-3',
										name: 'Reason',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Reason',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'conduit-4-1b-4',
										name: 'Presence',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Presence',
											value: 1
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
						id: 'conduit-4-2',
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
						id: 'conduit-4-3',
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
						id: 'conduit-4-4',
						name: '4th-Level Domain Feature',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 4,
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
						id: 'conduit-5-1',
						name: '5th-Level Domain Feature',
						description: 'You gain the 4th-level domain feature for the domain whose feature you didn’t select at that level.',
						type: 'Domain Feature',
						data: {
							level: 4,
							count: 1,
							selected: []
						}
					},
					{
						id: 'conduit-5-2',
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
						id: 'conduit-6-1',
						name: 'Burgeoning Saint',
						description: '\nYou are infused with the power your deity reserves for their most worthy instruments. You have the following benefits:\n\n* You gain an edge on Presence tests made to interact with other creatures.\n* Whenever you deal damage to an enemy, you can spend a Recovery.\n* You have corruption immunity 10 or holy immunity 10 (your choice).\n* Your clothing and equipment changes in a way that reflects your status as your deity’s chosen champion, such as ordinary robes turning into gold vestments or a simple dagger becoming a wicked blade with intricate etching.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-6-2',
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
						id: 'conduit-6-3',
						name: '6th-Level Domain Ability',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 6,
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
						id: 'conduit-7-1a',
						name: 'Might',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Might',
							value: 1
						}
					},
					{
						id: 'conduit-7-1b',
						name: 'Agility',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Agility',
							value: 1
						}
					},
					{
						id: 'conduit-7-1c',
						name: 'Reason',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Reason',
							value: 1
						}
					},
					{
						id: 'conduit-7-1d',
						name: 'Intuition',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'conduit-7-1e',
						name: 'Presence',
						description: '',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Presence',
							value: 1
						}
					},
					{
						id: 'conduit-7-2',
						name: 'Faithful’s Reward',
						description: '',
						type: 'Heroic Resource Gain',
						data: {
							tag: 'start 2',
							trigger: 'Start of your turn',
							value: '1d3 + 1',
							replacesTags: []
						}
					},
					{
						id: 'conduit-7-3',
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
						id: 'conduit-7-4',
						name: '7th-Level Domain Feature',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 7,
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
						id: 'conduit-8-1',
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
						id: 'conduit-8-2',
						name: '8th-Level Domain Feature',
						description: 'You gain the 7th-level domain feature for the domain whose feature you didn’t select at that level.',
						type: 'Domain Feature',
						data: {
							level: 7,
							count: 1,
							selected: []
						}
					},
					{
						id: 'conduit-8-3',
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
						id: 'conduit-9-1',
						name: 'Faith’s Sword',
						description: 'Each time you finish a respite, you can choose a willing hero ally who finished the respite with you. That ally gains the benefits of your Burgeoning Saint feature until you finish another respite. Additionally, you can spend piety as a free maneuver to give the hero 1 of their Heroic Resource for every 2 piety spent.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-9-2',
						name: 'Ordained',
						description: 'Your god elevates the power flowing through you. Your characteristic scores are treated as 1 higher for the purpose of resisting potencies. Additionally, while you have 5 or more Victories, you speak with the voice of your deity. You have a double edge on Presence tests made to influence other creatures.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-9-3',
						name: '9th-Level Domain Ability',
						description: '',
						type: 'Domain Feature',
						data: {
							level: 9,
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
						id: 'conduit-10-1',
						name: 'Avatar',
						description: '\nYou are now an avatar of your god! When you use your Prayer feature, you can be affected by up to three prayers at once, and you can change all those prayers and your ward as a respite activity. You can also use a maneuver to activate one of your domain effects without needing to pray.\n\nAdditionally, whenever you take a respite, you can open a portal to rest in the presence of your deity and bring along any allies. When you do, you can ask your deity three questions, which the Director must answer honestly if your deity knows the answers (though they might answer cryptically or incompletely). When you finish your respite, you and your allies can appear at any location in the timescape where someone worships your deity.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-10-2a',
						name: 'Characteristic Increase: Intuition',
						description: 'Your Intuition score increases to 5.',
						type: 'Characteristic Bonus',
						data: {
							characteristic: 'Intuition',
							value: 1
						}
					},
					{
						id: 'conduit-10-2b',
						name: 'Characteristic Increase: Additional',
						description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 5.',
						type: 'Choice',
						data: {
							options: [
								{
									feature: {
										id: 'shadow-10-1b-1',
										name: 'Might',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Might',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-2',
										name: 'Agility',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Agility',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-3',
										name: 'Reason',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Reason',
											value: 1
										}
									},
									value: 1
								},
								{
									feature: {
										id: 'shadow-10-1b-4',
										name: 'Presence',
										description: '',
										type: 'Characteristic Bonus',
										data: {
											characteristic: 'Presence',
											value: 1
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
						id: 'conduit-10-3',
						name: 'Divine Power',
						description: '\nYou can spend divine power on your abilities as if it were piety.\n\nAdditionally, you can spend divine power as if it were piety to use any conduit abilities you don’t have, as the gods answer your prayers with temporary and unique gifts. If you use a conduit ability you don’t have that usually costs no piety, you must spend 1 divine power to use it.\n\nDivine power remains until you spend it.',
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
						id: 'conduit-10-4',
						name: 'Most Pious',
						description: 'When you roll for piety at the start of your turn in combat and you pray, you gain 1 additional piety.',
						type: 'Text',
						data: null
					},
					{
						id: 'conduit-10-5',
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
						id: 'conduit-10-6',
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
				id: 'conduit-ability-1',
				name: 'Blessed Light',
				description: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I holy damage',
							tier2: '5 + I holy damage',
							tier3: '8 + I holy damage'
						}
					},
					{
						type: 'text',
						text: 'One ally within distance gains a number of surges equal to the tier outcome of your power roll.'
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
				id: 'conduit-ability-2',
				name: 'Drain',
				description: 'You drain the energy from your target and revitalize yourself or an ally.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '2 + I corruption damage',
							tier2: '5 + I corruption damage',
							tier3: '7 + I corruption damage'
						}
					},
					{
						type: 'text',
						text: 'You or one ally within distance can spend a Recovery.'
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
				id: 'conduit-ability-3',
				name: 'Holy Lash',
				description: 'A tendril of divine energy shoots forth to draw in your foe.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I holy damage; vertical pull 2',
							tier2: '5 + I holy damage; vertical pull 3',
							tier3: '8 + I holy damage; vertical pull 4'
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
				id: 'conduit-ability-4',
				name: 'Lightfall',
				description: 'A rain of holy light scours your enemies and repositions your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '2 holy damage',
							tier2: '3 holy damage',
							tier3: '5 holy damage'
						}
					},
					{
						type: 'text',
						text: 'You can teleport yourself and each ally in the area to unoccupied spaces in the area.'
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
				id: 'conduit-ability-5',
				name: 'Sacrificial Offer',
				description: 'Divine magic tears at your foe and defends a nearby friend.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
								'Intuition'
							],
							bonus: 0,
							tier1: '2 + I corruption damage',
							tier2: '4 + I corruption damage',
							tier3: '6 + I corruption damage'
						}
					},
					{
						type: 'text',
						text: 'Choose yourself or one ally within distance. That character can impose a bane on one power roll made against them before the end of their next turn.'
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
				id: 'conduit-ability-6',
				name: 'Staggering Curse',
				description: 'A blast of judgment disorients your foe.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I holy damage; slide 1',
							tier2: '5 + I holy damage; slide 2',
							tier3: '8 + I holy damage; slide 3'
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
				id: 'conduit-ability-7',
				name: 'Warrior\'s Prayer',
				description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I holy damage',
							tier2: '6 + I holy damage',
							tier3: '9 + I holy damage'
						}
					},
					{
						type: 'text',
						text: 'You or one ally within distance gains temporary Stamina equal to your Intuition score.'
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
				id: 'conduit-ability-8',
				name: 'Wither',
				description: 'A bolt of holy energy saps the life from a foe.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 'signature',
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I corruption damage; P < [weak], the target takes a bane on their next power roll',
							tier2: '5 + I corruption damage; P < [average], the target takes a bane on their next power roll',
							tier3: '8 + I corruption damage; P < [strong], the target takes a bane on their next power roll'
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
				id: 'conduit-ability-9',
				name: 'Call the Thunder Down',
				description: 'You ask your saint for thunder and your prayer is answered.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
								'Intuition'
							],
							bonus: 0,
							tier1: '2 sonic damage; push 1',
							tier2: '3 sonic damage; push 2',
							tier3: '5 sonic damage; push 3'
						}
					},
					{
						type: 'text',
						text: 'You can push each willing ally in the area the same distance, ignoring stability.'
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
				id: 'conduit-ability-10',
				name: 'Font of Wrath',
				description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'text',
						text: 'You summon a spirit of size 2 who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. Any enemy who moves within 2 squares of the spirit for the first time in a combat round or starts their turn there takes holy damage equal to your Intuition score.'
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
				id: 'conduit-ability-11',
				name: 'Judgment\'s Hammer',
				description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I holy damage; A < [weak], prone',
							tier2: '6 + I holy damage; A < [average], prone',
							tier3: '9 + I holy damage; A < [strong], prone and can’t stand (save ends)'
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
				id: 'conduit-ability-12',
				name: 'Violence Will Not Aid Thee',
				description: 'After some holy lightning, your enemy will think twice about their next attack.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 3,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I lightning damage',
							tier2: '6 + I lightning damage',
							tier3: '9 + I lightning damage'
						}
					},
					{
						type: 'text',
						text: 'The first time on a turn that the target deals damage to another creature, the target of this ability takes 1d10 lightning damage (save ends).'
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
				id: 'conduit-ability-13',
				name: 'Corruption\'s Curse',
				description: 'Cursed by you, your enemy takes more damage from your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '3 + I corruption damage; M < [weak], damage weakness 5 (save ends)',
							tier2: '6 + I corruption damage; M < [average], damage weakness 5 (save ends)',
							tier3: '9 + I corruption damage; M < [strong], damage weakness 5 (save ends)'
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
				id: 'conduit-ability-14',
				name: 'Curse of Terror',
				description: 'Fear of divine judgment overwhelms your foe.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '6 + I holy damage; I < [weak], frightened (save ends)',
							tier2: '9 + I holy damage; I < [average], frightened (save ends)',
							tier3: '13 + I holy damage; I < [strong], frightened (save ends)'
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
				id: 'conduit-ability-15',
				name: 'Faith is Our Armor',
				description: 'The heroes’ armor glows with golden light, granting divine protection.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'Four allies',
				cost: 5,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'You can target yourself instead of one ally with this ability.'
					},
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: 'The target gains 5 temporary Stamina',
							tier2: 'The target gains 10 temporary Stamina',
							tier3: 'The target gains 15 temporary Stamina'
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
				id: 'conduit-ability-16',
				name: 'Sermon of Grace',
				description: 'You inspire your allies with tales of your saint’s great deeds.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'text',
						text: 'Each target can spend a Recovery. Additionally, each target can use a free triggered action to end one effect on them that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.'
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
				id: 'conduit-ability-17',
				name: 'Fear of the Gods',
				description: 'Your divine magic makes a creature appear as what your enemies fear most.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '6 psychic damage; I < [weak], frightened (save ends)',
							tier2: '9 psychic damage; I < [average], frightened (save ends)',
							tier3: '13 psychic damage; I < [strong], frightened (save ends)'
						}
					},
					{
						type: 'text',
						text: 'Each target is frightened of you or a creature you choose within distance.'
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
				id: 'conduit-ability-18',
				name: 'Saint\'s Raiment',
				description: 'An ally becomes the wearer of an empowered golden cloak.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 7,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target gains 20 temporary Stamina and 3 surges.'
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
				id: 'conduit-ability-19',
				name: 'Soul Siphon',
				description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One enemy',
				cost: 7,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '7 + I corruption damage',
							tier2: '10 + I corruption damage',
							tier3: '15 + I corruption damage'
						}
					},
					{
						type: 'text',
						text: 'One ally within distance can spend any number of Recoveries.'
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
				id: 'conduit-ability-20',
				name: 'Words of Wrath and Grace',
				description: 'Your saint grants your enemies a vision of pain and fills your allies with healing energy.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '2 holy damage',
							tier2: '5 holy damage',
							tier3: '7 holy damage'
						}
					},
					{
						type: 'text',
						text: 'Each ally in the area can spend a Recovery.'
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
				id: 'conduit-ability-21',
				name: 'Beacon of Grace',
				description: 'You ignite a foe with holy radiance, rewarding allies who attack them.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '8 + I holy damage',
							tier2: '13 + I holy damage',
							tier3: '17 + I holy damage'
						}
					},
					{
						type: 'text',
						text: 'Until the end of the encounter, whenever you or any ally damages the target using an ability, that creature can spend a Recovery. If the target is reduced to 0 Stamina before the end of the encounter, you can use a free triggered action to move this effect to another creature within distance.'
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
				id: 'conduit-ability-22',
				name: 'Penance',
				description: '“If you won’t kneel, the gods will make you.”',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Magic',
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
				target: 'Each enemy in the area',
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '4 corruption damage; I < [weak], prone and can’t stand (save ends)',
							tier2: '7 corruption damage; I < [average], prone and can’t stand (save ends)',
							tier3: '11 corruption damage; I < [strong], prone and can’t stand (save ends)'
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
				id: 'conduit-ability-23',
				name: 'Sanctuary',
				description: 'You send yourself or an ally to a divine manifold to instantaneously regain health.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The target is removed from the encounter map until the start of their next turn and can spend any number of Recoveries. At the start of their turn, the target reappears in the space they left or the nearest unoccupied space of their choice.'
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
				id: 'conduit-ability-24',
				name: 'Vessel of Retribution',
				description: 'You infuse yourself or an ally with the retributive energy of the gods, waiting to be unleashed.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				cost: 9,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'The first time the target is dying or winded before the end of the encounter, each enemy within 5 squares of them takes 15 holy damage.'
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
				id: 'conduit-ability-25',
				name: 'Arise!',
				description: 'Your deity rewards you or an ally on the verge of defeat with a miracle burst of strength and resolve.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
						text: 'The target can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone. Additionally, at the start of each of their turns until the end of the encounter or until they are dying, the target gains 3 surges.'
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
				id: 'conduit-ability-26',
				name: 'Blessing of Steel',
				description: 'A protective aura defends your allies from harm.',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Magic'
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'Until the end of the encounter, any ability roll made against a target takes a bane and each target has damage immunity 5.'
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
				id: 'conduit-ability-27',
				name: 'Blessing of the Blade',
				description: '“The power of the gods is within you, friends. Allow me to unleash it.”',
				type: {
					usage: 'Maneuver',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
				},
				keywords: [
					'Area',
					'Magic'
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
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'text',
						text: 'At the end of each of your turns until the end of the encounter or until you are dying, each target gains 3 surges.'
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
				id: 'conduit-ability-28',
				name: 'Drag the Unworthy',
				description: 'You conjure an angel who moves a foe and heals your allies.',
				type: {
					usage: 'Main Action',
					free: false,
					trigger: '',
					time: '',
					qualifiers: [],
					freeStrike: false
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
				target: 'One creature or object',
				cost: 11,
				repeatable: false,
				minLevel: 1,
				sections: [
					{
						type: 'roll',
						roll: {
							characteristic: [
								'Intuition'
							],
							bonus: 0,
							tier1: '9 + I holy damage, slide 3',
							tier2: '13 + I holy damage, slide 4',
							tier3: '17 + I holy damage, slide 6'
						}
					},
					{
						type: 'text',
						text: 'Each ally the target comes adjacent to during the forced movement can spend a Recovery.'
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
						'Magic',
						'Culture'
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
							description: 'You can spend 1 uninterrupted minute to perform a magic ritual of blessing, targeting yourself or one willing creature you touch. The target has a double edge on the next test they make within the next minute. A target can’t use this benefit on an activity that takes longer than 1 minute.',
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
			selected: {
				id: 'career-disciple-ii-5',
				name: 'Near-Death Experience',
				description: 'While serving at a religious institution, you almost died in an accident. When you woke, you had lost all memory of ever having worked for the church or temple. Though the clergy encouraged you to stay, you left to forge a new path. Your sense of altruism - whether instilled in you by your past work or a part of who you naturally are - guides you in your life.'
			},
			selectedID: 'career-disciple-ii-5'
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
