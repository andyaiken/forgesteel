import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const conduit: HeroClass = {
	id: 'class-conduit',
	name: 'Conduit',
	description: 'The power of the gods flows through you! As a vessel for divine magic, you don’t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. While the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.',
	heroicResource: 'Piety',
	subclassName: 'Domain',
	subclassCount: 2,
	primaryCharacteristics: [ Characteristic.Intuition, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.createBonusFeature({
					id: 'conduit-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 8
				}),
				FeatureLogic.createBonusFeature({
					id: 'conduit-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FeatureLogic.createSkillChoiceFeature({
					id: 'conduit-1-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FeatureLogic.createFeature({
					id: 'conduit-1-2',
					name: 'Piety',
					description: 'At the start of each of your turns during combat, you gain 2 piety.'
				}),
				FeatureLogic.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'conduit-1-3',
						name: 'Prayer',
						description: 'I beseech you!',
						type: AbilityLogic.createTypeManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ AbilityLogic.createDistanceSelf() ],
						target: 'Self',
						powerRoll: AbilityLogic.createPowerRoll({
							characteristic: [ Characteristic.Intuition ],
							tier1: '1d6 damage; bleeding (EoT)',
							tier2: 'Gain 1 piety',
							tier3: 'Gain 2 piety and choose and use a domain effect'
						}),
						effect: `
The first time you use this ability during an encounter, it has a double edge. The second time you use it, it takes an edge. The third time you use it, it takes a bane. The fourth and each subsequent time you use this ability during an encounter, it has a double bane.
Whenever you get the tier 3 result of the Prayer ability, you can choose one of your domain’s effects to immediately take effect.`
					})
				}),
				FeatureLogic.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'conduit-1-4',
						name: 'Healing Grace',
						description: 'Your divine energy restores the righteous.',
						type: AbilityLogic.createTypeManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
						target: 'Self or 1 ally',
						effect: 'The target can spend 1 Recovery.',
						spend: [
							{
								effect: `
For each piety spent, you can choose one of the following enhancements:
• You can target one additional ally within distance.
• You can end one effect on a target that has a duration of EoT or is ended by a resistance roll.
• A prone target can stand up.
• A target can spend 1 additional Recovery.`
							}
						]
					})
				}),
				FeatureLogic.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'conduit-1-5',
						name: 'Pious Force',
						description: 'You unleash a blast of raw divine magic upon your foe.',
						type: AbilityLogic.createTypeAction(),
						keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
						target: '1 creature or object',
						powerRoll: AbilityLogic.createPowerRoll({
							characteristic: [ Characteristic.Intuition ],
							tier1: '2 damage',
							tier2: '6 damage',
							tier3: '9 damage'
						}),
						effect: 'You can choose to change the damage type to holy.'
					})
				}),
				FeatureLogic.createChoiceFeature({
					id: 'conduit-1-6',
					name: 'Triggered Action',
					options: [
						{
							feature: FeatureLogic.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'conduit-1-6-1',
									name: 'Divine Disruption',
									description: 'You sap the strength of an attacking enemy with divine energy.',
									type: AbilityLogic.createTypeTrigger('The target makes an attack. You can use this ability after seeing the result of the attack.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
									target: '1 enemy',
									effect: 'The attack takes a bane and the damage to one creature targeted by the attack is reduced by an amount equal to your Intuition.',
									spend: [
										{
											value: 1,
											effect: 'The attack has a double bane and the damage to one creature targeted by the attack is reduced by an amount equal to twice your Intuition score.'
										}
									]
								})
							}),
							value: 1
						},
						{
							feature: FeatureLogic.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'conduit-1-6-2',
									name: 'Holy Infusion',
									description: 'You invigorate an attacking ally with divine energy.',
									type: AbilityLogic.createTypeTrigger('The target makes an attack. You can use this ability after seeing the result of the attack.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
									target: '1 ally',
									effect: 'The attack gains an edge and deals holy damage equal to twice your Intuition score.',
									spend: [
										{
											value: 1,
											effect: 'The attack has a double edge and deals holy damage equal to twice your Intuition score.'
										}
									]
								})
							}),
							value: 1
						}
					]
				}),
				FeatureLogic.createSubclassFeature({
					id: 'conduit-1-6.5',
					category: 'Domain Feature and Skill'
				}),
				FeatureLogic.createKitChoiceFeature({
					id: 'conduit-1-6.6'
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'conduit-1-7',
					cost: 0
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'conduit-1-8',
					cost: 3
				}),
				FeatureLogic.createClassAbilityChoiceFeature({
					id: 'conduit-1-9',
					cost: 5
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'conduit-ability-1',
			name: 'Holy Lance',
			description: 'A tendril of divine energy shoots forth to draw in your foe.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 holy damage; pull 2',
				tier2: '6 holy damage; pull 3',
				tier3: '9 holy damage; pull 4'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-2',
			name: 'Lightfall',
			description: 'Holy light scours your foes and sets your allies into perfect attack position.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Cube, value: 3, within: 5 }) ],
			target: 'All enemies',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 holy damage',
				tier2: '3 holy damage',
				tier3: '4 holy damage'
			}),
			effect: 'You can teleport each ally in the area and yourself if you’re in the area to an unoccupied space within the area.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-3',
			name: 'Sacrificial Offer',
			description: 'The divine energy of creation tears at your foe.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 corruption damage',
				tier2: '6 corruption damage; the next ally to damage the target before the start of your next turn deals an extra 1d6 corruption damage',
				tier3: '9 corruption damage; the next ally to damage the target before the start of your next turn deals an extra 1d10 corruption damage'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-4',
			name: 'Wither',
			description: 'A bolt of holy energy saps the life from a foe.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 corruption damage',
				tier2: '6 corruption damage; the target takes a bane on ability power rolls (EoT)',
				tier3: '9 corruption damage; the target has a double bane on ability power rolls (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-5',
			name: 'Angel Of Wrath',
			description: 'You conjure an angelic spirit who lashes your foes with burning radiance.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: 'Special',
			cost: 3,
			effect: 'You summon an angelic spirit of size 1M who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. The first time on a turn that an enemy moves within 1 square of the spirit or starts their turn there, they take holy damage equal to twice your Intuition score.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-6',
			name: 'Punishing Smite',
			description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 holy damage',
				tier2: '8 holy damage; prone',
				tier3: '13 holy damage; prone and can’t stand (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-7',
			name: 'Righteous Rebuke',
			description: 'Divine wrath strikes your foe with lightning that follows them across the battlefield.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 lightning damage',
				tier2: '8 lightning damage',
				tier3: '13 lightning damage'
			}),
			effect: 'If the target deals damage to another creature before the end of their next turn, the target of this ability takes another 1d10 lightning damage.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-8',
			name: 'Thunder Of The Divine',
			description: 'A resounding clap of thunder disrupts your foes.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Cube, value: 4, within: 5 }) ],
			target: 'All enemies',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '4 sonic damage; push 1',
				tier2: '5 sonic damage; push 3',
				tier3: '8 sonic damage; push 5'
			}),
			effect: 'You can also push each willing ally in the area, and their stability doesn’t count against this forced movement.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-9',
			name: 'Armor Of The Faithful',
			description: 'The divine light of protection surrounds your allies.',
			type: AbilityLogic.createTypeManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '3 allies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: 'Gain 10 temporary Stamina',
				tier2: 'Gain 15 temporary Stamina',
				tier3: 'Gain 20 temporary Stamina'
			}),
			effect: 'This temporary Stamina disappears at the end of the encounter.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-10',
			name: 'Divine Weakness',
			description: 'Divine energy scours your target to make them more susceptible to harm.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '7 corruption damage; whenever the target takes damage, they take an extra 3 corruption damage (EoT)',
				tier2: '10 damage; whenever the target takes damage, they take an extra 5 corruption damage (EoT)',
				tier3: '16 damage; whenever the target takes damage, they take an extra 5 corruption damage (EoE)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-11',
			name: 'Terrifying Smite',
			description: 'A mote of holy light racks your foe with their greatest fear.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 }) ],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '7 holy damage',
				tier2: '10 holy damage; frightened (EoT)',
				tier3: '16 holy damage; frightened (EoE)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-12',
			name: 'Wave Of Virtue',
			description: 'A pulse of divine magic lets your comrades draw on their reserves of inner strength.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'All allies',
			cost: 5,
			effect: 'Each target can spend one or two Recoveries, and end one effect that has a duration of EoT or is ended by a resistance roll.'
		})
	],
	subclasses: [
		{
			id: 'conduit-sub-1',
			name: 'Creation',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-1-1-1',
							name: 'Creation Prayer Effect',
							description: 'You create a 5 wall of stone within 10 squares of you.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-1-1-optional-1',
									features: [
										FeatureLogic.createAbilityFeature({
											ability: AbilityLogic.createAbility({
												id: 'conduit-sub-1-1-2',
												name: 'Hands Of The Maker',
												description: 'Craft objects with the power of your mind!',
												type: AbilityLogic.createTypeManeuver(),
												keywords: [ AbilityKeyword.Magic ],
												distance: [ AbilityLogic.createDistanceSelf() ],
												target: 'Self',
												effect: 'You create a mundane object no larger than size 1S that you hold. If you use this feature again or stop holding the object, it disappears.'
											})
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-1-1-3',
											listOptions: [ SkillList.Crafting ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-2',
			name: 'Death',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-2-1-1',
							name: 'Death Prayer Effect',
							description: 'Two enemies of your choice within 10 squares of you take corruption damage equal to 5 + your conduit level.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-2-1-optional-1',
									features: [
										FeatureLogic.createAbilityFeature({
											ability: AbilityLogic.createAbility({
												id: 'conduit-sub-2-1-2',
												name: 'Grave Speech',
												description: 'The power of death lets you speak with those who have passed from the world.',
												type: AbilityLogic.createTypeManeuver(),
												keywords: [ AbilityKeyword.Magic ],
												distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }) ],
												target: 'Special',
												effect: 'You can speak to the corpse or head of a creature who has died within the last 24 hours and who can speak a language you know. The target regards you as they would have in life, and you might need to make tests to influence them and convince them to speak with you. After 1 minute, the effect ends. You can’t use this ability on the same creature twice.'
											})
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-2-1-3',
											listOptions: [ SkillList.Lore ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-3',
			name: 'Fate',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-3-1-1',
							name: 'Fate Prayer Effect',
							description: 'Choose another creature you have line of effect to. That creature automatically gets a tier 1 or tier 3 result (your choice) on their next power roll.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-3-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-3-1-2',
											name: 'Fate Trance',
											description: 'If you spend 10 minutes in an uninterrupted meditative state without moving, you get a glimpse of any significant events that will happen in the area around you in the next 24 hours unless you or your allies intercede in those events. As described by the Director, these glimpses of the future might be clear and concise, or might be vague and hard to understand.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-3-1-3',
											listOptions: [ SkillList.Lore ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-4',
			name: 'Knowledge',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-4-1-1',
							name: 'Knowledge Prayer Effect',
							description: 'Choose up to three allies within 10 squares of you. Each ally has a double edge on the next power roll they make.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-4-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-4-1-2',
											name: 'Cypher Mind',
											description: 'Given a little time, you can translate almost any text into a language you know, even if you don’t know the text’s original language. For the purpose of making project rolls, you are considered fluent in all languages.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-4-1-3',
											listOptions: [ SkillList.Lore ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-5',
			name: 'Life',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-5-1-1',
							name: 'Life Prayer Effect',
							description: 'You or an ally within 10 squares of you can spend 2 Recoveries, can end any effects on them that have a duration of EoT or are ended by a resistance roll, and can stand up if they are prone. Alternatively, you or an ally within 10 squares of you gains 20 temporary Stamina.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-5-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-5-1-2',
											name: 'Revitalizing Ritual',
											description: 'Each time you finish a respite, you can choose yourself or another character who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the target’s recovery value increases by an amount equal to your level. This benefit lasts until you complete another respite.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-5-1-3',
											listOptions: [ SkillList.Exploration ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-6',
			name: 'Love',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-6-1-1',
							name: 'Love Prayer Effect',
							description: 'Each ally within 10 squares of you gains 5 temporary Stamina, and gains an edge on the next power roll they make before the end of the encounter.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-6-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-6-1-2',
											name: 'Compassionate Aura',
											description: `
You exude a magic aura that can soothe those willing to socially engage with you. You gain an edge on any test made to assist another creature with a test.
Additionally, when you are present at the start of a negotiation, the NPC’s patience increases by 1 (to a maximum of 5), and the first test made to influence them gains an edge.`
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-6-1-3',
											listOptions: [ SkillList.Interpersonal ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-7',
			name: 'Nature',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-7-1-1',
							name: 'Nature Prayer Effect',
							description: 'Vines whip up from the floor or ground around a creature of your choice within 10 squares of you, then slide that creature a number of squares equal to 3 times your Intuition score.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-7-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-7-1-2',
											name: 'Animal Spirit',
											description: 'As an action, you conjure an animal spirit that takes the form of any animal you have seen. The incorporeal animal can’t physically interact with the world, but they have a speed of 5 (fly) and can move through mundane objects. While you are within 20 squares of the spirit, you can sense everything an animal of their form could sense, in addition to sensing your own surroundings. You can dismiss the spirit at any time (no action required).'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-7-1-3',
											listOptions: [ SkillList.Exploration ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-8',
			name: 'Protection',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-8-1-1',
							name: 'Protection Prayer Effect',
							description: 'An ally of your choice within 10 squares of you gains damage immunity equal to your Intuition score plus your level, which lasts until the end of your next turn.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-8-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-8-1-2',
											name: 'Alertness Ward',
											description: 'You exude a magic aura of awareness, granting you and each ally within 2 squares of you an edge on tests that use the Alertness skill.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-8-1-3',
											listOptions: [ SkillList.Exploration ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-9',
			name: 'Storm',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-9-1-1',
							name: 'Storm Prayer Effect',
							description: 'Each enemy in a 3-cube area within 10 squares of you takes lightning damage equal to 5 + your conduit level.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-9-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-9-1-2',
											name: 'Control Weather',
											description: `
When you finish a respite, you can decide the weather conditions in the local area. Those weather conditions follow you through any mundane outdoors locations where you travel until the end of your next respite.
Choose one of the following types of weather:
* **Clear**: You and your allies each gain an edge on tests that use the Search or Navigate skills.
* **Foggy**: You and your allies each gain an edge on tests that use the Hide skill.
* **Overcast**: You and your allies each gain an edge on tests that use the Endurance skill.
* **Precipitation**: When the ground is muddy or snowy, you and your allies each gain an edge on tests that use the Track skill.`
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-9-1-3',
											listOptions: [ SkillList.Exploration ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-10',
			name: 'Sun',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-10-1-1',
							name: 'Sun Prayer Effect',
							description: 'An enemy of your choice within 10 squares of you takes fire damage equal to 10 + your conduit level.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-10-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-10-1-2',
											name: 'Inner Light',
											description: 'Each time you finish a respite, you can choose yourself or another character who is also ending a respite to gain the benefit of a divine ritual. As you perform the ritual, you place a ray of morning light into the target’s soul, granting the target an edge on resistance rolls. This benefit lasts until you complete another respite.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-10-1-3',
											listOptions: [ SkillList.Lore ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-11',
			name: 'Trickery',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-11-1-1',
							name: 'Trickery Prayer Effect',
							description: 'Choose a creature within 10 squares of you. You can slide that creature a number of squares equal to 5 + your conduit level. If you choose a willing ally, this movement can ignore their stability.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-11-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-11-1-2',
											name: 'Divine Thievery',
											description: 'The gods favor your thievery with magic. Whenever you make a test that uses a skill you have from the intrigue skill group, you can use Intuition on the test instead of another characteristic.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-11-1-3',
											listOptions: [ SkillList.Intrigue ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		},
		{
			id: 'conduit-sub-12',
			name: 'War',
			description: '',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createFeature({
							id: 'conduit-sub-12-1-1',
							name: 'War Prayer Effect',
							description: 'Your attacks deal extra damage equal to twice your Intuition score until the end of your next turn.'
						})
					],
					optionalFeatures: [
						{
							category: 'Domain Feature and Skill',
							features: [
								FeatureLogic.createMultipleFeature({
									id: 'conduit-sub-12-1-optional-1',
									features: [
										FeatureLogic.createFeature({
											id: 'conduit-sub-12-1-2',
											name: 'Ritual Of Preparation',
											description: 'As a respite action, you can bless a weapon. Any creature who wields the weapon gains a +1 bonus to damage with abilities that use the weapon. This benefit lasts until you complete your next respite.'
										}),
										FeatureLogic.createSkillChoiceFeature({
											id: 'conduit-sub-12-1-3',
											listOptions: [ SkillList.Exploration ]
										})
									]
								})
							]
						}
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
