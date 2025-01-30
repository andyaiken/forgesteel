import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
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
	primaryCharacteristics: [ Characteristic.Intuition ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'conduit-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'conduit-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'conduit-1-1',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createDomainChoice({
					id: 'conduit-1-2',
					count: 2
				}),
				FactoryLogic.feature.createPackage({
					id: 'conduit-1-3',
					name: 'Piety',
					description: `
At the start of each of your turns during combat, you gain 1d3 piety.

Additionally, you can gain more piety by praying to the gods — but beware! Doing so can easily draw their ire, as the gods hate to be annoyed. When you roll to gain 1d3 piety at the start of your turn, you can pray to gain the following additional effects (no action required):

* If the roll is a 1, you gain 1 additional piety but anger the gods! You take psychic damage equal to 1d6 + your level, which can’t be reduced in any way.
* If the roll is a 2, you gain 1 additional piety.
* If the roll is a 3, you gain 2 additional piety and can activate a domain effect of your choice.`
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-1-4',
					level: 1
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'conduit-1-5',
						name: 'Healing Grace',
						description: 'Your divine energy restores the righteous.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: 'Self or 1 ally',
						effect: 'The target can spend a Recovery.',
						spend: [
							{
								value: 1,
								repeatable: true,
								effect: `
For each piety spent, you can choose one of the following enhancements:

* You can target one additional ally within distance.
* You can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.
* A prone target can stand up.
* A target can spend 1 additional Recovery.`
							}
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'conduit-1-6',
						name: 'Ray of Wrath',
						description: 'You unleash a blast of holy light upon your foe.',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged() ],
						target: '1 creature or object',
						powerRoll: FactoryLogic.createPowerRoll({
							characteristic: [ Characteristic.Intuition ],
							tier1: '2 + I damage',
							tier2: '4 + I damage',
							tier3: '6 + I damage'
						}),
						effect: 'You can have this ability deal holy damage.'
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'conduit-1-7',
					name: 'Triggered Action',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'conduit-1-7a',
									name: 'Word of Guidance',
									description: 'You invigorate an attacking ally with divine energy.',
									type: FactoryLogic.type.createTrigger('The target makes an ability power roll for an ability that deals damage.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged() ],
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
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'conduit-1-7b',
									name: 'Word of Judgment',
									description: 'Your holy word saps an attacking enemy’s strength.',
									type: FactoryLogic.type.createTrigger('The target takes damage from an ability that requires a power roll.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged() ],
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
				FactoryLogic.feature.createChoice({
					id: 'conduit-1-8',
					name: 'Prayer',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-8a',
								name: 'Prayer of Destruction',
								description: 'Your god infuses wrath within your being. You gain a +1 rolled damage bonus with magic abilities.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-8b',
								name: 'Prayer of Distance',
								description: 'Your god blesses you with the ability to stretch your divine magic further. You gain a +2 bonus to the distance of your ranged magic abilities.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'conduit-1-8c',
								name: 'Prayer of Speed',
								description: 'Your god blesses your flesh and infuses it with divine quickness.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'conduit-1-8ca',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'conduit-1-8cb',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'conduit-1-8d',
								name: 'Prayer of Soldier\'s Skill',
								description: 'Your god gives your mind the training of a soldier. You can wear light armor and wield light weapons effectively, even though you don’t have a kit. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this blessing.',
								features: [
									FactoryLogic.feature.create({
										id: 'conduit-1-8da',
										name: 'Prayer of Soldier\'s Skill',
										description: 'While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.'
									}),
									FactoryLogic.feature.createBonus({
										id: 'conduit-1-8db',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'conduit-1-8e',
								name: 'Prayer of Steel',
								description: 'Your god fills your body with the light of creation, making you harder to hurt and move.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'conduit-1-8ea',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: 'conduit-1-8eb',
										field: FeatureField.Stability,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'conduit-1-9',
					name: 'Conduit Ward',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-9a',
								name: 'Bastion Ward',
								description: 'You god grants you a holy countenance that protects you at all times. You gain a +1 bonus to saving throws.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-9b',
								name: 'Quickness Ward',
								description: 'The gods imbue a divine swiftness within you. Whenever an adjacent creature deals damage to you, you can shift up to a number of squares equal to your Intuition score after the damage is dealt.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-9c',
								name: 'Sanctuary Ward',
								description: 'In response to a foe’s aggression, the gods protect you. After another creature damages you, that creature can’t target you with a strike until you harm them or one of their allies, or until the end of their next turn.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'conduit-1-9d',
								name: 'Spirit Ward',
								description: 'Invisible spirits surround you if you are harmed. Whenever an adjacent creature deals damage to you, they take corruption damage equal to your Intuition score.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-1-10',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-1-11',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-1-12',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-2-1',
					name: 'The Lists of Heaven',
					description: 'Your patron is aware of your growing influence, making it easier to get their attention and power when you heal your allies. Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'conduit-2-2',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-2-3',
					level: 1
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-2-4',
					level: 2
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-3-1',
					name: 'Minor Miracle',
					description: `
As a respite activity, you perform a religious ritual and beseech the gods to restore a dead creature to life. You must have at least half the creature’s remains, and they must have died within the last 24 hours from an effect that isn’t age related. The creature’s soul must be willing to return to life for the ritual to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately.

A creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite.`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'conduit-ability-1',
			name: 'Blessed Light',
			description: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage',
				tier2: '5 + I holy damage',
				tier3: '8 + I holy damage'
			}),
			effect: 'An ally of your choice within distance gains a number of surges equal to the tier rolled.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-2',
			name: 'Drain',
			description: 'You drain the energy from your target and revitalize yourself or an ally.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 + I corruption damage',
				tier2: '5 + I corruption damage',
				tier3: '7 + I corruption damage'
			}),
			effect: 'You or one ally within distance can spend a Recovery.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-3',
			name: 'Holy Lash',
			description: 'A tendril of divine energy shoots forth to draw in your foe.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; vertical pull 2',
				tier2: '5 + I holy damage; vertical pull 3',
				tier3: '8 + I holy damage; vertical pull 4'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-4',
			name: 'Lightfall',
			description: 'A rain of holy light scours your enemies and repositions your allies.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 holy damage',
				tier2: '3 holy damage',
				tier3: '5 holy damage'
			}),
			effect: 'You can teleport yourself and each ally in the area to unoccupied spaces in the area.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-5',
			name: 'Sacrificial Offer',
			description: 'Divine magic tears at your foe and defends a nearby friend.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 + I corruption damage',
				tier2: '4 + I corruption damage',
				tier3: '6 + I corruption damage'
			}),
			effect: 'You or one ally within distance can impose a bane on one power roll made against them before the end of their next turn.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-6',
			name: 'Staggering Curse',
			description: 'A blast of judgment disorients your foe.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; slide 1',
				tier2: '5 + I holy damage; slide 2',
				tier3: '8 + I holy damage; slide 3'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-7',
			name: 'Warrior\'s Prayer',
			description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage',
				tier2: '6 + I holy damage',
				tier3: '9 + I holy damage'
			}),
			effect: 'You or one ally within distance gains temporary Stamina equal to your Intuition score.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-8',
			name: 'Wither',
			description: 'A bolt of holy energy saps the life from a foe.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I corruption damage; P < weak, the target takes a bane on their next power roll',
				tier2: '5 + I corruption damage; P < average, the target takes a bane on their next power roll',
				tier3: '8 + I corruption damage; P < strong, the target takes a bane on their next power roll'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-9',
			name: 'Call the Thunder Down',
			description: 'You ask your saint for thunder and your prayer is answered.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '2 sonic damage; push 1',
				tier2: '3 sonic damage; push 2',
				tier3: '5 sonic damage; push 3'
			}),
			effect: 'You can push each willing ally in the area. This forced movement ignores any ally’s stability.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-10',
			name: 'Font of Wrath',
			description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: 'Special',
			cost: 3,
			effect: 'You summon a spirit of size 2 who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. An enemy who moves within 2 squares of the spirit for the first time in a round or starts their turn there takes holy damage equal to your Intuition score.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-11',
			name: 'Judgment\'s Hammer',
			description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I holy damage; A < weak, prone',
				tier2: '6 + I holy damage; A < average, prone',
				tier3: '9 + I holy damage; A < strong, prone and can’t stand (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-12',
			name: 'Violence Will Not Aid Thee',
			description: 'After some holy lightning, your enemy will think twice about their next attack.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I lightning damage',
				tier2: '6 + I lightning damage',
				tier3: '9 + I lightning damage'
			}),
			effect: 'The first time on a turn that the target deals damage to another creature, the target of this ability takes another 1d10 lightning damage (save ends).'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-13',
			name: 'Corruption\'s Curse',
			description: 'Cursed by you, your enemy takes more damage from your allies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '3 + I corruption damage; M < weak, damage weakness 5 (save ends)',
				tier2: '6 + I corruption damage; M < average, damage weakness 5 (save ends)',
				tier3: '9 + I corruption damage; M < strong, damage weakness 5 (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-14',
			name: 'Curse of Terror',
			description: 'Fear of divine judgment overwhelms your foe.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 creature',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 + I holy damage; I < weak, frightened (save ends)',
				tier2: '9 + I holy damage; I < average, frightened (save ends)',
				tier3: '13 + I holy damage; I < strong, frightened (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-15',
			name: 'Faith is Our Armor',
			description: 'The heroes’ armor glows with golden light, granting divine protection.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: 'Self and up to three allies',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: 'The target gains 5 temporary Stamina',
				tier2: 'The target gains 10 temporary Stamina',
				tier3: 'The target gains 15 temporary Stamina'
			})
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-16',
			name: 'Sermon of Grace',
			description: 'You inspire your allies with tales of your saint’s great deeds.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Each ally in the area',
			cost: 5,
			effect: 'Each target can spend a Recovery. When you use this ability, each target can use a free triggered action to end one effect that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-17',
			name: 'Fear of the Gods',
			description: 'Your divine magic makes a creature appear as what your enemies fear most.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '6 psychic damage; I < weak, frightened (save ends)',
				tier2: '9 psychic damage; I < average, frightened (save ends)',
				tier3: '13 psychic damage; I < strong, frightened (save ends)'
			}),
			effect: 'The targets are frightened of you or a creature you choose within 10 squares.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-18',
			name: 'Saint\'s Raiment',
			description: 'An ally becomes the wearer of an empowered golden cloak.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 ally',
			cost: 7,
			effect: 'The target gains 20 Temporary Stamina and three surges.'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-19',
			name: 'Soul Siphon',
			description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged() ],
			target: '1 enemy',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Intuition ],
				tier1: '7 + I corruption damage',
				tier2: '10 + I corruption damage',
				tier3: '15 + I corruption damage'
			}),
			effect: 'One ally within distance can spend any number of Recoveries (no action required).'
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-20',
			name: 'Words of Wrath and Grace',
			description: 'Your saint grants your enemies a vision of whatever they most fear.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			powerRoll: FactoryLogic.createPowerRoll({
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
