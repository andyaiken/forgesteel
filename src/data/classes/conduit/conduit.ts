import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';

export const conduit: HeroClass = {
	id: 'class-conduit',
	name: 'Conduit',
	description: `
The power of the gods flows through you! As a vessel for divine power, you don’t just keep your allies in the fight. You make those allies more effective, even as you rain divine energy down upon your foes. Though the deity or saint you serve might have other faithful and clergy, you are special among worshippers, receiving your abilities from the highest source.

As a conduit, you heal and buff your allies, and debuff your foes while smiting them with divine magic. The spark of divinity within you shines, filling your enemies with awe and making you more worldly and aware.`,
	subclassName: '',
	subclassCount: 0,
	primaryCharacteristicsOptions: [
		[ Characteristic.Intuition ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'conduit-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'conduit-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'conduit-resource',
					name: 'Piety',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '1d3'
						}
					]
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
					id: 'conduit-1-3b',
					name: 'Prayer',
					description: `
You can gain more piety by praying to the gods—but beware! Doing so can easily draw their ire, as the gods hate to be annoyed. Before you roll to gain piety at the start of your turn, you can pray (no action required). If you do, your roll gains the following additional effects:

* If the roll is a 1, you gain 1 additional piety but anger the gods! You take psychic damage equal to 1d6 + your level, which can’t be reduced in any way.
* If the roll is a 2, you gain 1 additional piety.
* If the roll is a 3, you gain 2 additional piety and can activate a domain effect of your choice.`,
					tag: 'conduit-prayer'
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-1-4',
					name: '1st-Level Domain Feature',
					level: 1
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'conduit-1-5',
						name: 'Healing Grace',
						description: 'Your divine energy restores the righteous.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target can spend a Recovery.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: `
For each piety spent, you can choose one of the following enhancements:

* You can target one additional ally within distance.
* You can end one effect on a target that is ended by a saving throw or that ends at the end of their turn.
* A prone target can stand up.
* A target can spend 1 additional Recovery.`
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'conduit-1-6',
						name: 'Ray of Wrath',
						description: 'You unleash a blast of holy light upon your foe.',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'can be used as a ranged free strike' ] }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Intuition ],
								tier1: '2 + I damage',
								tier2: '4 + I damage',
								tier3: '6 + I damage'
							})),
							FactoryLogic.createAbilitySectionText('You can have this ability deal holy damage.')
						]
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
									type: FactoryLogic.type.createTrigger('The target makes an ability roll for a damage-dealing ability.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									sections: [
										FactoryLogic.createAbilitySectionText('The power roll gains an edge.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 1,
											effect: 'The power roll has a double edge.'
										})
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
									type: FactoryLogic.type.createTrigger('The target would take damage from an ability that uses a power roll.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									sections: [
										FactoryLogic.createAbilitySectionText('The power roll takes a bane against the target.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 1,
											effect: 'The power roll has a double bane against the target.'
										})
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
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'conduit-1-8a',
								name: 'Prayer of Destruction',
								description: 'Your god infuses wrath within your being.',
								keywords: [ AbilityKeyword.Magic ],
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: 'conduit-1-8b',
								name: 'Prayer of Distance',
								description: 'Your god blesses you with the ability to stretch your divine magic farther.',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'conduit-1-8c',
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
									}),
									FactoryLogic.feature.createProficiency({
										id: 'conduit-1-8dc',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'conduit-1-8d',
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
								description: 'In response to a foe’s aggression, your god protects you. Whenever another creature damages you, that creature can’t target you with a strike until you harm them or one of their allies, or until the end of their next turn.'
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
					description: 'Your deity is aware of your growing influence, making it easier to draw their attention and power when you heal your allies. Whenever you allow another creature to spend a Recovery, you can also spend a Recovery.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'conduit-2-2',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-2-3',
					name: '2nd-Level Domain Feature',
					description: 'You gain the 1st-level domain feature and ability to choose a skill for the domain you selected at 1st level but whose domain feature you didn’t take at that level.',
					level: 1
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-2-4',
					name: '2nd-Level Domain Ability',
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
As a respite activity, you can perform a religious ritual and beseech the gods to restore a dead creature to life. You must have at least half the creature’s remains, and they must have died within the last 24 hours from an effect that isn’t age related. The creature’s soul must be willing to return to life for the ritual to work. If they are not willing, you instinctively understand that as you start the respite activity and can cease it immediately.

A creature with a willing soul returns to life at the end of the respite with full Stamina and half their Recoveries. You regain only half your Recoveries at the end of the respite.`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-3-2',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-4-1',
					name: 'Blessed Domain',
					description: 'Whenever you gain piety from a domain feature, you gain 1 additional piety.'
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-4-1a',
					name: 'Characteristic Increase: Intuition',
					description: 'Your Intuition score increases to 3.',
					characteristic:Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'conduit-4-1b',
					name: 'Characteristic Increase: Additional',
					description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 3.',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'conduit-4-1b-1',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'conduit-4-1b-2',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'conduit-4-1b-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'conduit-4-1b-4',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createPerk({
					id: 'conduit-4-2'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'conduit-4-3',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ],
					count: 1
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-4-4',
					name: '4th-Level Domain Feature',
					level: 4
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-5-1',
					name: '5th-Level Domain Feature',
					description: 'You gain the 4th-level domain feature for the domain whose feature you didn’t select at that level.',
					level: 4
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-5-2',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-6-1',
					name: 'Burgeoning Saint',
					description: `
You are infused with the power your deity reserves for their most worthy instruments. You have the following benefits:

* You gain an edge on Presence tests made to interact with other creatures.
* Whenever you deal damage to an enemy, you can spend a Recovery.
* You have corruption immunity 10 or holy immunity 10 (your choice).
* Your clothing and equipment changes in a way that reflects your status as your deity’s chosen champion, such as ordinary robes turning into gold vestments or a simple dagger becoming a wicked blade with intricate etching.`
				}),
				FactoryLogic.feature.createPerk({
					id: 'conduit-6-2',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-6-3',
					name: '6th-Level Domain Ability',
					level: 6
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.create({
					id: 'conduit-7-2',
					name: 'Faithful’s Reward',
					description: 'When you roll for piety at the start of your turn in combat, you gain 1d3 + 1 piety.'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'conduit-7-3',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-7-4',
					name: '7th-Level Domain Feature',
					level: 7
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'conduit-8-1'
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-8-2',
					name: '8th-Level Domain Feature',
					description: 'You gain the 7th-level domain feature for the domain whose feature you didn’t select at that level.',
					level: 7
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'conduit-8-3',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-9-1',
					name: 'Faith’s Sword',
					description: 'Each time you finish a respite, you can choose a willing hero ally who finished the respite with you. That ally gains the benefits of your Burgeoning Saint feature until you finish another respite. Additionally, you can spend piety as a free maneuver to give the hero 1 of their Heroic Resource for every 2 piety spent.'
				}),
				FactoryLogic.feature.create({
					id: 'conduit-9-2',
					name: 'Ordained',
					description: 'Your god elevates the power flowing through you. Your characteristic scores are treated as 1 higher for the purpose of resisting potencies. Additionally, while you have 5 or more Victories, you speak with the voice of your deity. You have a double edge on Presence tests made to influence other creatures.'
				}),
				FactoryLogic.feature.createDomainFeature({
					id: 'conduit-9-3',
					name: '9th-Level Domain Ability',
					level: 9
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.create({
					id: 'conduit-10-1',
					name: 'Avatar',
					description: `
You are now an avatar of your god! When you use your Prayer feature, you can be affected by up to three prayers at once, and you can change all those prayers and your ward as a respite activity. You can also use a maneuver to activate one of your domain effects without needing to pray.

Additionally, whenever you take a respite, you can open a portal to rest in the presence of your deity and bring along any allies. When you do, you can ask your deity three questions, which the Director must answer honestly if your deity knows the answers (though they might answer cryptically or incompletely). When you finish your respite, you and your allies can appear at any location in the timescape where someone worships your deity.`
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'conduit-10-2a',
					name: 'Characteristic Increase: Intuition',
					description: 'Your Intuition score increases to 5.',
					characteristic:Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'conduit-10-2b',
					name: 'Characteristic Increase: Additional',
					description: 'Additionally, you can increase one of your characteristic scores by 1, to a maximum of 5.',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'shadow-10-1b-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'shadow-10-1b-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'shadow-10-1b-3',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'shadow-10-1b-4',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'conduit-10-3',
					name: 'Divine Power',
					type: 'epic',
					gains: [
						{
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: `
You can spend divine power on your abilities as if it were piety.

Additionally, you can spend divine power as if it were piety to use any conduit abilities you don’t have, as the gods answer your prayers with temporary and unique gifts. If you use a conduit ability you don’t have that usually costs no piety, you must spend 1 divine power to use it.

Divine power remains until you spend it.`
				}),
				FactoryLogic.feature.create({
					id: 'conduit-10-4',
					name: 'Most Pious',
					description: 'When you roll for piety at the start of your turn in combat and you pray, you gain 1 additional piety.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'conduit-10-5',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'conduit-10-6',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'conduit-ability-1',
			name: 'Blessed Light',
			description: 'Burning radiance falls upon your foe, transferring some of their energy to a nearby ally.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '3 + I holy damage',
						tier2: '5 + I holy damage',
						tier3: '8 + I holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('One ally within distance gains a number of surges equal to the tier outcome of your power roll.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-2',
			name: 'Drain',
			description: 'You drain the energy from your target and revitalize yourself or an ally.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '2 + I corruption damage',
						tier2: '5 + I corruption damage',
						tier3: '7 + I corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You or one ally within distance can spend a Recovery.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-3',
			name: 'Holy Lash',
			description: 'A tendril of divine energy shoots forth to draw in your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '3 + I holy damage; vertical pull 2',
					tier2: '5 + I holy damage; vertical pull 3',
					tier3: '8 + I holy damage; vertical pull 4'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-4',
			name: 'Lightfall',
			description: 'A rain of holy light scours your enemies and repositions your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '2 holy damage',
						tier2: '3 holy damage',
						tier3: '5 holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can teleport yourself and each ally in the area to unoccupied spaces in the area.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-5',
			name: 'Sacrificial Offer',
			description: 'Divine magic tears at your foe and defends a nearby friend.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '2 + I corruption damage',
						tier2: '4 + I corruption damage',
						tier3: '6 + I corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Choose yourself or one ally within distance. That character can impose a bane on one power roll made against them before the end of their next turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-6',
			name: 'Staggering Curse',
			description: 'A blast of judgment disorients your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '3 + I holy damage; slide 1',
					tier2: '5 + I holy damage; slide 2',
					tier3: '8 + I holy damage; slide 3'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-7',
			name: 'Warrior\'s Prayer',
			description: 'Your quickly uttered prayer lends aggressive divine energy to a friend engaged in melee.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '3 + I holy damage',
						tier2: '6 + I holy damage',
						tier3: '9 + I holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You or one ally within distance gains temporary Stamina equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-8',
			name: 'Wither',
			description: 'A bolt of holy energy saps the life from a foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '3 + I corruption damage; P < [weak], the target takes a bane on their next power roll',
					tier2: '5 + I corruption damage; P < [average], the target takes a bane on their next power roll',
					tier3: '8 + I corruption damage; P < [strong], the target takes a bane on their next power roll'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-9',
			name: 'Call the Thunder Down',
			description: 'You ask your saint for thunder and your prayer is answered.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '2 sonic damage; push 1',
						tier2: '3 sonic damage; push 2',
						tier3: '5 sonic damage; push 3'
					})
				),
				FactoryLogic.createAbilitySectionText('You can push each willing ally in the area the same distance, ignoring stability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-10',
			name: 'Font of Wrath',
			description: 'A brilliant column of holy light appears on the battlefield, striking out at nearby enemies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('You summon a spirit of size 2 who can’t be harmed, and who appears in an unoccupied space within distance. The spirit lasts until the end of your next turn. You and your allies can move through the spirit’s space, but enemies can’t. Any enemy who moves within 2 squares of the spirit for the first time in a combat round or starts their turn there takes holy damage equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-11',
			name: 'Judgment\'s Hammer',
			description: 'Your divine fury is a hammer that crashes down upon the unrighteous.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '3 + I holy damage; A < [weak], prone',
					tier2: '6 + I holy damage; A < [average], prone',
					tier3: '9 + I holy damage; A < [strong], prone and can’t stand (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-12',
			name: 'Violence Will Not Aid Thee',
			description: 'After some holy lightning, your enemy will think twice about their next attack.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '3 + I lightning damage',
						tier2: '6 + I lightning damage',
						tier3: '9 + I lightning damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The first time on a turn that the target deals damage to another creature, the target of this ability takes 1d10 lightning damage (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-13',
			name: 'Corruption\'s Curse',
			description: 'Cursed by you, your enemy takes more damage from your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '3 + I corruption damage; M < [weak], damage weakness 5 (save ends)',
					tier2: '6 + I corruption damage; M < [average], damage weakness 5 (save ends)',
					tier3: '9 + I corruption damage; M < [strong], damage weakness 5 (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-14',
			name: 'Curse of Terror',
			description: 'Fear of divine judgment overwhelms your foe.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '6 + I holy damage; I < [weak], frightened (save ends)',
					tier2: '9 + I holy damage; I < [average], frightened (save ends)',
					tier3: '13 + I holy damage; I < [strong], frightened (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-15',
			name: 'Faith is Our Armor',
			description: 'The heroes’ armor glows with golden light, granting divine protection.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Four allies',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You can target yourself instead of one ally with this ability.'),
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: 'The target gains 5 temporary Stamina',
					tier2: 'The target gains 10 temporary Stamina',
					tier3: 'The target gains 15 temporary Stamina'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-16',
			name: 'Sermon of Grace',
			description: 'You inspire your allies with tales of your saint’s great deeds.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Each ally in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can spend a Recovery. Additionally, each target can use a free triggered action to end one effect on them that is ended by a saving throw or that ends at the end of their turn, or to stand up if prone.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-17',
			name: 'Fear of the Gods',
			description: 'Your divine magic makes a creature appear as what your enemies fear most.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '6 psychic damage; I < [weak], frightened (save ends)',
					tier2: '9 psychic damage; I < [average], frightened (save ends)',
					tier3: '13 psychic damage; I < [strong], frightened (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('Each target is frightened of you or a creature you choose within distance.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-18',
			name: 'Saint\'s Raiment',
			description: 'An ally becomes the wearer of an empowered golden cloak.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One ally',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('The target gains 20 temporary Stamina and 3 surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-19',
			name: 'Soul Siphon',
			description: 'A beam of energy connects a foe to a friend, draining life from one to heal the other.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '7 + I corruption damage',
					tier2: '10 + I corruption damage',
					tier3: '15 + I corruption damage'
				})),
				FactoryLogic.createAbilitySectionText('One ally within distance can spend any number of Recoveries.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-20',
			name: 'Words of Wrath and Grace',
			description: 'Your saint grants your enemies a vision of pain and fills your allies with healing energy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '2 holy damage',
						tier2: '5 holy damage',
						tier3: '7 holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally in the area can spend a Recovery.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-21',
			name: 'Beacon of Grace',
			description: 'You ignite a foe with holy radiance, rewarding allies who attack them.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '8 + I holy damage',
						tier2: '13 + I holy damage',
						tier3: '17 + I holy damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, whenever you or any ally damages the target using an ability, that creature can spend a Recovery. If the target is reduced to 0 Stamina before the end of the encounter, you can use a free triggered action to move this effect to another creature within distance.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-22',
			name: 'Penance',
			description: '“If you won’t kneel, the gods will make you.”',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Intuition ],
					tier1: '4 corruption damage; I < [weak], prone and can’t stand (save ends)',
					tier2: '7 corruption damage; I < [average], prone and can’t stand (save ends)',
					tier3: '11 corruption damage; I < [strong], prone and can’t stand (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-23',
			name: 'Sanctuary',
			description: 'You send yourself or an ally to a divine manifold to instantaneously regain health.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The target is removed from the encounter map until the start of their next turn and can spend any number of Recoveries. At the start of their turn, the target reappears in the space they left or the nearest unoccupied space of their choice.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-24',
			name: 'Vessel of Retribution',
			description: 'You infuse yourself or an ally with the retributive energy of the gods, waiting to be unleashed.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('The first time the target is dying or winded before the end of the encounter, each enemy within 5 squares of them takes 15 holy damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-25',
			name: 'Arise!',
			description: 'Your deity rewards you or an ally on the verge of defeat with a miracle burst of strength and resolve.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('The target can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone. Additionally, at the start of each of their turns until the end of the encounter or until they are dying, the target gains 3 surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-26',
			name: 'Blessing of Steel',
			description: 'A protective aura defends your allies from harm.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
			target: 'Self and each ally in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, any ability roll made against a target takes a bane and each target has damage immunity 5.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-27',
			name: 'Blessing of the Blade',
			description: '“The power of the gods is within you, friends. Allow me to unleash it.”',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
			target: 'Self and each ally in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('At the end of each of your turns until the end of the encounter or until you are dying, each target gains 3 surges.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'conduit-ability-28',
			name: 'Drag the Unworthy',
			description: 'You conjure an angel who moves a foe and heals your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: '9 + I holy damage, slide 3',
						tier2: '13 + I holy damage, slide 4',
						tier3: '17 + I holy damage, slide 6'
					})
				),
				FactoryLogic.createAbilitySectionText('Each ally the target comes adjacent to during the forced movement can spend a Recovery.')
			]
		})
	],
	subclasses: [],
	level: 1,
	characteristics: []
};
