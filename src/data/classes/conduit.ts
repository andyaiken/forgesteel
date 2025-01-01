import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const conduit: HeroClass = {
	id: 'class-conduit',
	name: 'Conduit',
	description: `
The power of the gods flows through you! As a vessel for divine magic, you don’t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. While the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.
As a conduit, you heal and buff your allies, and debuff your foes while smiting them with divine magic. The spark of divinity within you shines, aweing your enemies and granting you increased empathy.`,
	heroicResource: 'Piety',
	subclassName: '',
	subclassCount: 0,
	// TODO: Intuition only
	primaryCharacteristics: [ Characteristic.Intuition, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'conduit-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'conduit-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'conduit-1-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FeatureLogic.feature.createDomainChoiceFeature({
					id: 'conduit-1-6.4',
					count: 2
				}),
				FeatureLogic.feature.createFeature({
					id: 'conduit-1-2',
					name: 'Piety',
					description: `
At the start of each of your turns during combat, you gain 1d3 piety.
Additionally, you can gain more piety by praying to the gods — but beware! Doing so can easily draw their ire, as the gods hate to be annoyed. When you roll to gain 1d3 piety at the start of your turn, you can pray to gain the following additional effects (no action required):
* If the roll is a 1, you gain 1 additional piety but anger the gods! You take psychic damage equal to 1d6 + your level, which can’t be reduced in any way.
* If the roll is a 2, you gain 1 additional piety.
* If the roll is a 3, you gain 2 additional piety and can activate a domain effect of your choice.
**CREATION DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you uses an ability with the Area keyword.
* Prayer Effect: You summon the forces of creation and create a wall of stone whose size is 5 + your Intuition score within 10 squares of you. The wall lasts until the end of the encounter.
**DEATH DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you who isn’t a minion dies or a solo creature becomes winded.
* Prayer Effect: You inflict a deadly curse upon two enemies of your choice within 10 squares of you. Each target takes corruption damage equal to twice your Intuition score.
**FATE DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that an ally within 10 squares of you gets a tier 3 result or an enemy within 10 squares of you gets a tier 1 result.
* Prayer Effect: You call on the forces of fate to create a reliable future. Choose a creature within your line of effect. That creature automatically gets a tier 1 or tier 3 result (your choice) on their next power roll made before the end of the encounter.
**KNOWLEDGE DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that the Director uses an ability or feature that costs Malice.
* Prayer Effect: Choose up to three allies, including yourself, within 10 squares of you. Each target gains a surge.
**LIFE DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you regains Stamina.
* Prayer Effect: Choose yourself or one ally within 10 squares of you. The targets can spend a Recovery, can end any effects on them that are ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you and one ally within 10 squares of you gain temporary Stamina equal to 5 × your Intuition score.
**LOVE DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that you or an ally within 10 squares of you uses the Aid Another maneuver or an ability that targets an ally.
* Prayer Effect: Each ally within 10 squares of you gains temporary Stamina equal to 2 × your Intuition score.
**NATURE DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of you takes acid, cold, fire, lightning, poison, or sonic damage.
* Prayer Effect: Vines whip up from the floor or ground within 10 squares of you, wrapping around a number of creatures of your choice equal to your Intuition score. You can slide each creature up to a number of squares equal to your Intuition score. The vines then fade away.
**PROTECTION DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that you or an ally within 10 squares of you gains temporary Stamina or uses a triggered action to reduce incoming damage or give an enemy a bane on a power roll.
* Prayer Effect: One ally within 10 squares of you gains temporary Stamina equal to three times your Intuition score.
**STORM DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that an enemy within 10 squares of you is force moved.
* Prayer Effect: Each enemy in a 3-cube area within 10 squares of you takes lightning damage equal to twice your Intuition score.
**SUN DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that an enemy within 10 squares of you takes fire or holy damage.
* Prayer Effect: One enemy of your choice within 10 squares of you takes fire damage equal to three times your Intuition score.
**TRICKERY DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of you takes the Aid Another or Hide maneuver.
* Prayer Effect: Choose a creature within 10 squares of you. You can slide that creature up to a number of squares equal to 5 + your conduit level.
**WAR DOMAIN**
* Piety: You gain 2 piety the first time in an encounter that you or a creature within 10 squares of deals damage in an amount equal to or greater than 10 + your level.
* Prayer Effect: Three allies of your choice within 10 squares of you, including yourself, gain two surges.`
				}),
				FeatureLogic.feature.createDomainFeatureFeature({
					id: 'conduit-1-6.5',
					level: 1
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'conduit-1-4',
						name: 'Healing Grace',
						description: 'Your divine energy restores the righteous.',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: 'Self or 1 ally',
						effect: 'The target can spend a Recovery.',
						spend: [
							{
								effect: `
For each piety spent, you can choose one of the following enhancements:
• You can target one additional ally within distance.
• You can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.
• A prone target can stand up.
• A target can spend 1 additional Recovery.`
							}
						]
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'conduit-1-5',
						name: 'Ray of Wrath',
						description: 'You unleash a blast of holy light upon your foe.',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						powerRoll: AbilityLogic.createPowerRoll({
							characteristic: [ Characteristic.Intuition ],
							tier1: '2 + I damage',
							tier2: '4 + I damage',
							tier3: '6 + I damage'
						}),
						effect: 'You can have this ability deal holy damage.'
					})
				}),
				FeatureLogic.feature.createChoiceFeature({
					id: 'conduit-1-6',
					name: 'Triggered Action',
					options: [
						{
							feature: FeatureLogic.feature.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'conduit-1-6-1',
									name: 'Word of Guidance',
									description: 'You invigorate an attacking ally with divine energy.',
									type: AbilityLogic.type.createTrigger('The target makes an ability power roll for an ability that deals damage.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ AbilityLogic.distance.createRanged(10) ],
									target: '1 ally',
									effect: 'The power roll gains an edge.',
									spend: [
										{
											value: 1,
											effect: 'The power roll gains a double edge.'
										}
									]
								})
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createAbilityFeature({
								ability: AbilityLogic.createAbility({
									id: 'conduit-1-6-2',
									name: 'Word of Judgment',
									description: 'Your holy word saps an attacking enemy’s strength.',
									type: AbilityLogic.type.createTrigger('The target takes damage from an ability that requires a power roll.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ AbilityLogic.distance.createRanged(10) ],
									target: '1 ally',
									effect: 'The power roll gains a bane against the target.',
									spend: [
										{
											value: 1,
											effect: 'The power roll gains a double bane against the target.'
										}
									]
								})
							}),
							value: 1
						}
					]
				}),
				FeatureLogic.feature.createChoiceFeature({
					id: 'conduit-1-7',
					name: 'Prayer',
					options: [
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-7a',
								name: 'Prayer of Destruction',
								description: 'Your god infuses wrath within your being. You gain a +1 rolled damage bonus with magic abilities.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-7b',
								name: 'Prayer of Distance',
								description: 'Your god blesses you with the ability to stretch your divine magic further. You gain a +2 bonus to the distance of your ranged magic abilities.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-7c',
								name: 'Prayer of Speed',
								description: 'Your god blesses your flesh and infuses it with divine quickness. You gain a +1 bonus to speed and to the distance you shift when you take the Disengage move action.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-7d',
								name: 'Prayer of Soldier\'s Skill',
								description: 'Your god gives your mind the training of a soldier. You can wear light armor and wield light weapons effectively, even though you don’t have a kit. While you wear light armor, you gain a +3 bonus to Stamina and that bonus increases by 3 at 4th, 7th, and 10th levels. While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this blessing.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-7e',
								name: 'Prayer of Steel',
								description: 'Your god fills your body with the light of creation, making you harder to hurt and move. You gain a +6 bonus to Stamina, and this bonus increases by 6 at 4th, 7th, and 10th levels. Additionally, you gain a +1 bonus to stability.'
							}),
							value: 1
						}
					]
				}),
				FeatureLogic.feature.createChoiceFeature({
					id: 'conduit-1-8',
					name: 'Conduit Ward',
					options: [
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-8a',
								name: 'Bastion Ward',
								description: 'You god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-8b',
								name: 'Quickness Ward',
								description: 'The gods imbue a divine swiftness within you. Whenever an adjacent creature deals damage to you, you can shift up to a number of squares equal to your Intuition score after the damage is dealt.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-8c',
								name: 'Sanctuary Ward',
								description: 'In response to a foe’s aggression, the gods protect you. After another creature damages you, that creature can’t target you with a strike until you harm them or one of their allies, or until the end of their next turn.'
							}),
							value: 1
						},
						{
							feature: FeatureLogic.feature.createFeature({
								id: 'conduit-1-8d',
								name: 'Spirit Ward',
								description: 'Invisible spirits surround you if you are harmed. Whenever an adjacent creature deals damage to you, they take corruption damage equal to your Intuition score.'
							}),
							value: 1
						}
					]
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'conduit-1-9',
					cost: 0,
					count: 2
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'conduit-1-10',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'conduit-1-11',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FeatureLogic.feature.createFeature({
					id: 'conduit-2-1',
					name: 'The Lists of Heaven',
					description: 'Your patron is aware of your growing influence, making it easier to get their attention and power when you heal your allies. Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.'
				}),
				FeatureLogic.feature.createPerkFeature({
					id: 'conduit-2-2',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FeatureLogic.feature.createFeature({
					id: 'conduit-3-1',
					name: 'Minor Miracle',
					description: `
As a respite activity, you perform a religious ritual and beseech the gods to restore a dead creature to life. You must have at least half the creature’s remains, and they must have died within the last 24 hours from an effect that isn’t age related. The creature’s soul must be willing to return to life for the ritual to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately.
A creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite.`
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'conduit-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'conduit-ability-1',
			name: 'Blessed Light',
			description: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage',
				tier2: '5 + I holy damage',
				tier3: '8 + I holy damage'
			}),
			effect: 'An ally of your choice within distance gains a number of surges equal to the tier rolled.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-2',
			name: 'Drain',
			description: 'You drain the energy from your target and revitalize yourself or an ally.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 + I corruption damage',
				tier2: '5 + I corruption damage',
				tier3: '7 + I corruption damage'
			}),
			effect: 'You or one ally within distance can spend a Recovery.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-3',
			name: 'Holy Lash',
			description: 'A tendril of divine energy shoots forth to draw in your foe.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; vertical pull 2',
				tier2: '5 + I holy damage; vertical pull 3',
				tier3: '8 + I holy damage; vertical pull 4'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-4',
			name: 'Lightfall',
			description: 'A rain of holy light scours your enemies and repositions your allies.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 holy damage',
				tier2: '3 holy damage',
				tier3: '5 holy damage'
			}),
			effect: 'You can teleport yourself and each ally in the area to unoccupied spaces in the area.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-5',
			name: 'Sacrificial Offer',
			description: 'Divine magic tears at your foe and defends a nearby friend.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 + I corruption damage',
				tier2: '4 + I corruption damage',
				tier3: '6 + I corruption damage'
			}),
			effect: 'You or one ally within distance can impose a bane on one power roll made against them before the end of their next turn.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-6',
			name: 'Staggering Curse',
			description: 'A blast of judgment disorients your foe.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; slide 1',
				tier2: '5 + I holy damage; slide 2',
				tier3: '8 + I holy damage; slide 3'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-7',
			name: 'Warrior\'s Prayer',
			description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage',
				tier2: '6 + I holy damage',
				tier3: '9 + I holy damage'
			}),
			effect: 'You or one ally within distance gains temporary Stamina equal to your Intuition score.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-8',
			name: 'Wither',
			description: 'A bolt of holy energy saps the life from a foe.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I corruption damage; P < weak, the target takes a bane on their next power roll',
				tier2: '5 + I corruption damage; P < average, the target takes a bane on their next power roll',
				tier3: '8 + I corruption damage; P < strong, the target takes a bane on their next power roll'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-9',
			name: 'Call the Thunder Down',
			description: 'You ask your saint for thunder and your prayer is answered.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 sonic damage; push 1',
				tier2: '3 sonic damage; push 2',
				tier3: '5 sonic damage; push 3'
			}),
			effect: 'You can push each willing ally in the area. This forced movement ignores any ally’s stability.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-10',
			name: 'Font of Wrath',
			description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 3,
			effect: 'You summon a spirit of size 2 who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. An enemy who moves within 2 squares of the spirit for the first time in a round or starts their turn there takes holy damage equal to your Intuition score.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-11',
			name: 'Judgment\'s Hammer',
			description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; A < weak, prone',
				tier2: '6 + I holy damage; A < average, prone',
				tier3: '9 + I holy damage; A < strong, prone and can’t stand (save ends)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-12',
			name: 'Violence Will Not Aid Thee',
			description: 'After some holy lightning, your enemy will think twice about their next attack.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I lightning damage',
				tier2: '6 + I lightning damage',
				tier3: '9 + I lightning damage'
			}),
			effect: 'The first time on a turn that the target deals damage to another creature, the target of this ability takes another 1d10 lightning damage (save ends).'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-13',
			name: 'Corruption\'s Curse',
			description: 'Cursed by you, your enemy takes more damage from your allies.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I corruption damage; M < weak, damage weakness 5 (save ends)',
				tier2: '6 + I corruption damage; M < average, damage weakness 5 (save ends)',
				tier3: '9 + I corruption damage; M < strong, damage weakness 5 (save ends)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-14',
			name: 'Curse of Terror',
			description: 'Fear of divine judgment overwhelms your foe.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 + I holy damage; I < weak, frightened (save ends)',
				tier2: '9 + I holy damage; I < average, frightened (save ends)',
				tier3: '13 + I holy damage; I < strong, frightened (save ends)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-15',
			name: 'Faith is Our Armor',
			description: 'The heroes’ armor glows with golden light, granting divine protection.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: 'Self and up to three allies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: 'The target gains 5 temporary Stamina',
				tier2: 'The target gains 10 temporary Stamina',
				tier3: 'The target gains 15 temporary Stamina'
			})
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-16',
			name: 'Sermon of Grace',
			description: 'You inspire your allies with tales of your saint’s great deeds.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Each ally in the area',
			cost: 5,
			effect: 'Each target can spend a Recovery. When you use this ability, each target can use a free triggered action to end one effect that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-17',
			name: 'Fear of the Gods',
			description: 'Your divine magic makes a creature appear as what your enemies fear most.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 psychic damage; I < weak, frightened (save ends)',
				tier2: '9 psychic damage; I < average, frightened (save ends)',
				tier3: '13 psychic damage; I < strong, frightened (save ends)'
			}),
			effect: 'The targets are frightened of you or a creature you choose within 10 squares.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-18',
			name: 'Saint\'s Raiment',
			description: 'An ally becomes the wearer of an empowered golden cloak.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 ally',
			cost: 7,
			effect: 'The target gains 20 Temporary Stamina and three surges.'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-19',
			name: 'Soul Siphon',
			description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '1 enemy',
			cost: 7,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '7 + I corruption damage',
				tier2: '10 + I corruption damage',
				tier3: '15 + I corruption damage'
			}),
			effect: 'One ally within distance can spend any number of Recoveries (no action required).'
		}),
		AbilityLogic.createAbility({
			id: 'conduit-ability-20',
			name: 'Words of Wrath and Grace',
			description: 'Your saint grants your enemies a vision of whatever they most fear.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 holy damage',
				tier2: '5 holy damage',
				tier3: '7 holy damage'
			}),
			effect: 'Each ally in the area can spend a Recovery.'
		})
	],
	subclasses: [],
	level: 1,
	characteristics: []
};
