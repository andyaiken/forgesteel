import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { earth } from './earth';
import { fire } from './fire';
import { green } from './green';
import { voidSubclass } from './void';

export const elementalist: HeroClass = {
	id: 'class-elementalist',
	name: 'Elementalist',
	description: `
Air for movement. Earth for permanence. Fire for destruction. Water for change. Green for growth. Rot for death. Void for the mystery. Years of study and practice and poring over tomes brought you the revelations that allow you to manipulate these building blocks of reality. Now you use your mastery of the seven elements to destroy, create, and warp the world with magic.

As an elementalist, you can unleash your wrath across a field of foes, put an enemy exactly where you want them, debilitate foes with harmful effects, ward yourself and allies against danger, manipulate terrain, warp space, and more. Your choice of elemental specialization determines which of these things you do best.`,
	subclassName: 'Elemental Specialization',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'elementalist-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'elementalist-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'elementalist-resource',
					name: 'Essence',
					gains: [
						{
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							tag: 'take-damage',
							trigger: 'The first time in a round that you or a creature within 10 of you takes damage that isn’t untyped or holy',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'elementalist-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'elementalist-1-2',
					listOptions: [ SkillList.Crafting, SkillList.Lore ],
					count: 3
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-1-4',
						name: 'Hurl Element',
						description: 'You hurl a ball of elemental energy at an unsuspecting foe.',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'can be used as a ranged free strike' ] }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature or object',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason ],
								tier1: '2 + R damage',
								tier2: '4 + R damage',
								tier3: '6 + R damage'
							})),
							FactoryLogic.createAbilitySectionText('When you make this strike, choose the damage type from one of the following options: acid, cold, corruption, fire, lightning, poison, or sonic.')
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'elementalist-1-5',
					name: 'Persistent Magic',
					description: `
Some of your heroic abilities have a persistent effect entry. For example, the Instantaneous Excavation ability has an effect noted as “Persistent 1.” Whenever you use a persistent ability, you decide whether you want to maintain it, and start doing so immediately after you first use the ability. If you maintain a persistent ability in combat, you reduce the amount of essence you earn at the start of your turn by an amount equal to the ability’s persistent value, which enables the ability’s persistent effect. All your active persistent abilities end at the end of the encounter.

You can’t maintain any abilities that would make you earn a negative amount of essence at the start of your turn. You can stop maintaining an ability at any time (no action required).

If you maintain the same ability on several targets and the effect includes a power roll, you make that roll once and apply the same effect to all targets. A creature can’t be affected by multiple instances of a persistent ability.

If you take damage equal to or greater than 5 times your Reason score in one turn, you stop maintaining any persistent abilities. For instance, if you have a Reason score of 2 and are maintaining Instantaneous Excavation, taking 10 or more damage in one turn causes you to stop maintaining the ability.` }),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'elementalist-1-6',
						name: 'Practical Magic',
						description: 'Your mastery of elemental power lets you customize your conjurations.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`
Choose one of the following effects:

* You use the Knockback maneuver, but its distance becomes the range of your Hurl Element ability, and you use Reason instead of Might for the power roll.
* You choose a creature within the distance of your Hurl Element ability and one of the following damage types: acid, cold, corruption, fire, lightning, poison, or sonic. That creature takes damage of the chosen type equal to your Reason score.
* You teleport up to a number of squares equal to your Reason score. If you choose this option, you can spend essence to teleport 1 additional square for each essence spent.
							`)
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'elementalist-1-7',
					name: 'Enchantment',
					options: [
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'elementalist-1-7a',
								name: 'Enchantment of Battle',
								description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'elementalist-1-7aa',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									}),
									FactoryLogic.feature.create({
										id: 'elementalist-1-7ab',
										name: 'Enchantment of Battle',
										description: 'You can wear light armor and wield light weapons effectively, even though you don’t have a kit. While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes. You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this enchantment.'
									}),
									FactoryLogic.feature.createProficiency({
										id: 'elementalist-1-7ac',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'elementalist-1-7b',
								name: 'Enchantment of Celerity',
								description: 'You gain a bonus to speed and to the distance you can shift when you take the Disengage move action.',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'elementalist-1-7ba',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'elementalist-1-7bb',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'elementalist-1-7c',
								name: 'Enchantment of Destruction',
								description: 'You gain a bonus to rolled damage with magic abilities.',
								keywords: [ AbilityKeyword.Magic ],
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: 'elementalist-1-7d',
								name: 'Enchantment of Distance',
								description: 'You have a bonus to the distance of your ranged magic abilities.',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'elementalist-1-7e',
								name: 'Enchantment of Permanence',
								description: 'You gain a bonus to Stamina.',
								features: [
									FactoryLogic.feature.createBonus({
										id: '',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: '',
										field: FeatureField.Stability,
										valuePerEchelon: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'elementalist-1-8',
					name: 'Elementalist Ward',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'elementalist-1-8a',
								name: 'Ward of Delightful Consequences',
								description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain 1 surge.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createDamageModifier({
								id: 'elementalist-1-8b',
								name: 'Ward of Excellent Protection',
								description: 'You weave a shield of all the elements around yourself, channeling their full protective power. You have immunity to acid, cold, corruption, fire, lightning, poison, or sonic damage equal to your Reason score.',
								modifiers: [
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Acid,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Cold,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Corruption,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Fire,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Lightning,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Poison,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									}),
									FactoryLogic.damageModifier.createCharacteristic({
										damageType: DamageType.Sonic,
										modifierType: DamageModifierType.Immunity,
										characteristics: [ Characteristic.Reason ]
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'elementalist-1-8c',
									name: 'Ward of Nature\'s Affection',
									description: 'You store green energy within your body that allows you to produce powerful vines when you’re in danger.',
									type: FactoryLogic.type.createTrigger('A creature within a number of squares equal to your Reason score deals damage to you,', { free: true }),
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('You slide the attacking creature up to a number of squares equal to your Reason score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'elementalist-1-8d',
									name: 'Ward of Surprising Reactivity',
									description: 'You use the magic of fire to create a ward of explosive energy.',
									type: FactoryLogic.type.createTrigger('An adjacent creature deals damage to you.', { free: true }),
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('You push that creature a number of squares equal to twice your Reason score.')
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-1-9',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-1-10',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-1-11',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'elementalist-2-1',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-2-2',
					cost: 5,
					minLevel: 2
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-3-1',
					cost: 7,
					minLevel: 3
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-4-1a',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'elementalist-4-1b',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-4-1ba',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-4-1bb',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-4-1bc',
								characteristic: Characteristic.Reason,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-4-1bd',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-4-1be',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'elementalist-4-2',
					name: 'Font of Essence',
					tag: 'take-damage 2',
					trigger: 'The first time in a round that you or a creature within 10 of you takes damage that isn’t untyped or holy',
					value: '2',
					replacesTags: [ 'take-damage' ]
				}),
				FactoryLogic.feature.createPerk({
					id: 'elementalist-4-3',
					lists: [ PerkList.Interpersonal, PerkList.Crafting, PerkList.Lore, PerkList.Supernatural, PerkList.Intrigue, PerkList.Exploration ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'elementalist-4-4',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Lore, SkillList.Intrigue ]
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-5-1',
					cost: 9,
					minLevel: 5
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'elementalist-6-1',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.create({
					id: 'elementalist-6-2',
					name: 'Wyrding',
					description: `You can spend 10 uninterrupted minutes to create a freeform magic spell for a variety of situations. Choose one of the following magical effects:

* You create a mundane object of a size equal to your Reason score or smaller.
* You construct a place of shelter suitable for twenty creatures that lasts for 24 hours and can’t be detected by enemies.
* You restore all Stamina to a mundane object of a size equal to your Reason score or smaller.
* Choose a cube with a size up to your Reason score within 5 squares. You can fill that area with difficult terrain or natural phenomena such as fire, water, or plant life, or can clear the area of those things.
* You can preserve a corpse or up to 5 pounds of food for a week, or can cause a corpse or that amount of food to instantly rot.
* You create a seal on a surface that can’t be seen or felt by anyone but you. When a creature comes adjacent to the surface, you can see and hear through the seal for as long as the creature remains adjacent to it. When you create the seal, you can decide to limit the number of creatures who activate it by choosing a creature keyword (such as Undead) or a specific name (such as Ajax the Invincible) or organization (such as the Black Iron Pact). If you do, the seal alerts you only when creatures with the keyword, name, or organizational affiliation you provide pass by it. If you create a second seal, the first one disappears. You can dispel a seal at any time (no action required).`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-6-3',
					cost: 9,
					minLevel: 6
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'elementalist-7-2',
					name: 'Surging Essence',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '3',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'elementalist-7-3',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'elementalist-8-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue, PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-8-2',
					cost: 11,
					minLevel: 8
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.create({
					id: 'elementalist-9-1',
					name: 'Grand Wyrding',
					description: `
You have mastered the magic of shaping a wyrd, and can use your Wyrding feature as a main action.

Additionally, when you have 5 or more Victories, choose one of the following damage types: acid, cold, corruption, fire, lightning, poison, or sonic. You have immunity all to that type.`
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'elementalist-9-2',
					cost: 11,
					minLevel: 9
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createHeroicResource({
					id: 'elementalist-10-1',
					name: 'Breath',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: `
You can spend any number of breath to gain essence (no action required). When you do, 1 breath becomes 3 essence.

Breath remains until you convert it to essence.`
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'elementalist-10-2',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createChoice({
					id: 'elementalist-10-3',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-10-3-1',
								characteristic: Characteristic.Might,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-10-3-2',
								characteristic: Characteristic.Agility,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-10-3-4',
								characteristic: Characteristic.Intuition,
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'elementalist-10-3-5',
								characteristic: Characteristic.Presence,
								value: 1
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'elementalist-10-4',
					name: 'Essential Being',
					tag: 'start 3',
					trigger: 'Start of your turn',
					value: '4',
					replacesTags: [ 'start', 'start 2' ]
				}),
				FactoryLogic.feature.createPerk({
					id: 'elementalist-10-5',
					lists: [ PerkList.Crafting, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'elementalist-10-6',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'elementalist-ability-1',
			name: 'Afflict a Bountiful Decay',
			description: 'Your curse causes a foe’s flesh to rot off as spores that aid your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Rot, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R corruption damage',
						tier2: '4 + R corruption damage',
						tier3: '6 + R corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Choose yourself or one ally within distance. That character can end one effect on them that is ended by a saving throw or that ends at the end of their turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-2',
			name: 'Bifurcated Incineration',
			description: 'Two jets of flame lance out at your command.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Two creatures or objects',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 fire damage',
						tier2: '4 fire damage',
						tier3: '6 fire damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-3',
			name: 'Grasp of Beyond',
			description: 'You absorb the life energy of another creature and use it to teleport.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 + R corruption damage',
						tier2: '6 + R corruption damage',
						tier3: '9 + R corruption damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can teleport up to a number of squares equal to your Reason score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-4',
			name: 'The Green Within, The Green Without',
			description: 'Whipping vines erupt from a foe’s body to grasp at another close by.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R damage',
						tier2: '5 + R damage',
						tier3: '7 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You slide one creature within 10 squares of the target up to 2 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-5',
			name: 'A Meteoric Introduction',
			description: 'You give your enemy a gentle tap - like an asteroid impact.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 + R damage; push 2',
						tier2: '5 + R damage; push 3',
						tier3: '8 + R damage; push 4'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-6',
			name: 'Ray of Agonizing Self Reflection',
			description: 'You inflict pain and doubt in equal measure.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R corruption damage; R < [weak], slowed (save ends)',
						tier2: '4 + R corruption damage; R < [average], slowed (save ends)',
						tier3: '6 + R corruption damage; R < [strong], slowed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-7',
			name: 'Unquiet Ground',
			description: 'A sudden storm of detritus assaults your foes and leaves them struggling to move.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('The ground beneath the area becomes difficult terrain for enemies.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-8',
			name: 'Viscous Fire',
			description: 'A jet of heavy fire erupts where you strike.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R fire damage; push 2',
						tier2: '5 + R fire damage; push 3',
						tier3: '7 + R fire damage; push 4'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-9',
			name: 'Behold the Mystery',
			description: 'You open a rift into the void to harry your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 psychic damage',
						tier2: '4 psychic damage',
						tier3: '6 psychic damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-10',
			name: 'The Flesh, a Crucible',
			description: 'Fire engulfs your target and continues to churn.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '5 + R fire damage',
						tier2: '8 + R fire damage',
						tier3: '11 + R fire damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'If the target is within distance at the start of your turn, make a power roll for this ability again.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-11',
			name: 'Invigorating Growth',
			description: 'Mushrooms erupt from a foe, sapping their vitality to spread strengthening spores.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '4 + R poison damage',
					tier2: '7 + R poison damage',
					tier3: '11 + R poison damage'
				})),
				FactoryLogic.createAbilitySectionText('Mushrooms cover the target’s body. While the mushrooms are on the target, you and any ally adjacent to the target gain 1 surge whenever the target takes damage. The mushrooms can be removed by the target or an adjacent creature as a main action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-12',
			name: 'Ripples in the Earth',
			description: 'Like a stone dropped into a pond, waves in the earth radiate from you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '3 damage',
					tier2: '5 damage',
					tier3: '8 damage; M < [strong], prone'
				})),
				FactoryLogic.createAbilitySectionText('You must be touching the ground to use this ability. Additionally, you can choose a square of ground in the area that is unoccupied or is occupied by you or any ally. A pillar of earth rises out of the ground in that square, with a height in squares up to your Reason score. The pillar can’t collide with any creatures or objects, nor can it force creatures raised by it to collide with other creatures or objects.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-13',
			name: 'Conflagration',
			description: 'A storm of fire descends upon your enemies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '4 fire damage',
					tier2: '6 fire damage',
					tier3: '10 fire damage'
				})),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 2,
					effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-14',
			name: 'Instantaneous Excavation',
			description: 'The surface of the world around you opens up at your command.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You open up two holes with 1-square openings that are 4 squares deep, which can be placed on any mundane surface within distance. You can place these holes next to each other to create fewer holes with wider openings. When the holes open, make a separate power roll for each creature on the ground above a hole and small enough to fall in. (You can’t score a critical hit with this ability because it uses a maneuver.)'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: 'The target can shift 1 square from the edge of the hole to the nearest unoccupied space of their choice.',
						tier2: 'The target falls into the hole.',
						tier3: 'The target falls into the hole and can’t reduce the height of the fall.'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'At the start of your turn, you open another hole, making a power roll against each creature who could fall into the hole when it opens without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-15',
			name: 'No More than a Breeze',
			description: 'The material substance of a creature shreds away at your command.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target can move through solid matter, they ignore difficult terrain, and their movement can’t provoke opportunity attacks. If the target ends their turn inside solid matter, they are forced out into the space where they entered it and this effect ends.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The effect lasts until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-16',
			name: 'Test of Rain',
			description: 'You call down a rain that burns your enemies and restores your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '4 acid damage',
					tier2: '6 acid damage',
					tier3: '10 acid damage'
				})),
				FactoryLogic.createAbilitySectionText('You can end one effect on yourself that is ended by a saving throw or that ends at the end of your turn. Each ally in the area also gains this benefit.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-17',
			name: 'O Flower Aid, O Earth Defend',
			description: 'Revitalizing plants and jagged stones grow, helping allies and hindering foes.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Special',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Until the start of your next turn, the area gains the following effects:

* Once as a free maneuver at the start of your turn, you allow yourself and each ally in the area to spend any number of Recoveries.
* The area is difficult terrain for enemies.
* Each enemy who enters the area for the first time in a combat round or starts their turn there takes damage equal to your Reason score.`),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The area remains until the start of your next turn. As a maneuver, you can move the area up to 5 squares. This ability ends if the area is ever not within your line of effect.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-18',
			name: 'Subvert the Green Within',
			description: 'Fungal spores sprout inside your enemy’s brain, allowing you to control their actions.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionText('The target uses their signature ability against a creature of your choice. This signature ability can target the creature even if it usually wouldn’t. You then make a power roll against the target of this ability.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '5 + R poison damage',
						tier2: '9 + R poison damage',
						tier3: '12 + R poison damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-19',
			name: 'Translated Through Flame',
			description: 'Your ally disappears, then reappears in a burst of fire!',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionText('The target is teleported to another space within distance. Make a power roll that affects each enemy adjacent to the target’s new space.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 fire damage',
						tier2: '5 fire damage',
						tier3: '8 fire damage'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-20',
			name: 'Volcano\'s Embrace',
			description: 'Wrap them up in fire and melting stone.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '5 + R fire damage; A < [weak], restrained (save ends)',
					tier2: '9 + R fire damage; A < [average], restrained (save ends)',
					tier3: '12 + R fire damage; A < [strong], restrained (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-21',
			name: 'Erase',
			description: 'With a flick of the wrist, you phase creatures out of existence.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 7,
			minLevel: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('The number of creatures you target with this ability is determined by your power roll.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: 'One creature',
						tier2: 'Two creatures',
						tier3: 'Three creatures'
					})
				),
				FactoryLogic.createAbilitySectionText('Each target begins to fade from existence (save ends). On their first turn while fading from existence, a target takes a bane on power rolls. At the end of their first turn, they have a double bane on power rolls. At the end of their second turn, they fade from existence for 1 hour, after which they reappear in their original space or the nearest unoccupied space.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-22',
			name: 'Maw of Earth',
			description: 'You open up the ground, unleashing a shower of stone and debris.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			minLevel: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '5 damage',
					tier2: '9 damage',
					tier3: '12 damage'
				})),
				FactoryLogic.createAbilitySectionText('The ground in or directly beneath the area drops 3 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-23',
			name: 'Swarm of Spirits',
			description: 'Guardian animal spirits surround you to harry your foes and bolster your allies.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			minLevel: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '3 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				})),
				FactoryLogic.createAbilitySectionText('Until the end of your next turn, each ally in the area has each of their characteristic scores treated as 1 higher for the purpose of resisting potencies, and has a +1 bonus to saving throws.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'You make the power roll again to target each enemy in the area without spending essence, and the effect lasts until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-24',
			name: 'Wall of Fire',
			description: 'A blazing, beautifully organized inferno erupts at your command.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10, within: 10 }) ],
			target: 'Special',
			cost: 7,
			minLevel: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('The wall lasts until the start of your next turn, and can be placed in occupied squares. Creatures can enter and pass through the wall. Each enemy who enters the area for the first time in a combat round or starts their turn there takes fire damage equal to your Reason score for each square of the area they start their turn in or enter.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The wall lasts until the start of your next turn, and you can add a number of squares to the wall equal to your Reason score.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-25',
			name: 'Combustion Deferred',
			description: 'Your flames dance from kindling to kindling to kindling.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 9,
			minLevel: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '8 + M fire damage',
					tier2: '13 + M fire damage',
					tier3: '17 + M fire damage'
				})),
				FactoryLogic.createAbilitySectionText('When the target ends their next turn, or if they drop to 0 Stamina before then, each enemy adjacent to them takes fire damage equal to twice your Reason score. Each affected enemy then gains this same effect.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-26',
			name: 'Storm of Sands',
			description: 'Dirt and debris swirl into a dark, pulsing hurricane.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Earth, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 9,
			minLevel: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '2 damage',
					tier2: '5 damage',
					tier3: '7 damage'
				})),
				FactoryLogic.createAbilitySectionText('The area lasts until the start of your next turn. It is difficult terrain for enemies, and you and your allies have concealment while in the area.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The area remains until the start of your next turn, and you can move it up to 5 squares (no action required). As a maneuver, you can make the power roll again without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-27',
			name: 'Subverted Perception of Space',
			description: 'You rip an enemy’s world in twain.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Void, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 9,
			minLevel: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '9 + R corruption damage',
					tier2: '10 + R corruption damage; the target has line of effect only to creatures and objects within 4 squares of them until the start of your next turn',
					tier3: '15 + R corruption damage; the target has line of effect only to adjacent creatures and objects until the start of your next turn'
				})),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The target’s limited line of effect lasts until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-28',
			name: 'Web of All That\'s Come Before',
			description: 'Threads you’ve been weaving through your adventures create a vibrant, pearlescent web.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Green, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 9,
			minLevel: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '2 corruption damage; A < [weak], restrained (save ends)',
					tier2: '3 corruption damage; A < [average], restrained (save ends)',
					tier3: '5 corruption damage; A < [strong], restrained (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('The area is difficult terrain until the start of your next turn. Each enemy who ends their turn in the area is restrained (save ends).'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The area remains until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-29',
			name: 'Luminous Champion Aloft',
			description: 'They shine vibrantly, a beautiful diamond in the night sky.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 4, within: 10 }) ],
			target: 'Self or one ally',
			cost: 9,
			minLevel: 6,
			sections: [
				FactoryLogic.createAbilitySectionText('The target has a +3 bonus to speed, they can fly, and their abilities ignore concealment. Additionally, whenever the target gains their Heroic Resource, they gain 1 additional Heroic Resource. This effect lasts until the start of your next turn.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The effect lasts until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-30',
			name: 'Magma Titan',
			description: 'Their body swells with lava, mud, and might, towering over their enemies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Earth ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 9,
			minLevel: 6,
			sections: [
				FactoryLogic.createAbilitySectionText(`Until the start of your next turn, the target has the following benefits:

* Their size and stability increase by 2, with any size 1 target becoming size 3. Each creature who is within the target’s new space slides to the nearest unoccupied space, ignoring stability. If the target doesn’t have space to grow, they grow as much as they can and become restrained until the effect ends.
* They have fire immunity 10.
* Their strikes deal extra fire damage equal to twice your Reason score.
* When the target force moves a creature or object, the forced movement distance gains a +2 bonus.
* They can use their highest characteristic instead of Might for Might power rolls.`),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 2,
					effect: 'The effect lasts until the start of your next turn. Additionally, at the start of your turn, the target can spend 2 Recoveries.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-31',
			name: 'Meteor',
			description: 'You teleport the target into the air and let the ground and the elemental force of fire do the rest.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Void, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 9,
			minLevel: 6,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: 'You teleport the target up to 4 squares.',
					tier2: 'You teleport the target up to 6 squares.',
					tier3: 'You teleport the target up to 8 squares.'
				})),
				FactoryLogic.createAbilitySectionText('If the target is teleported to a space where they would fall, they immediately do so, treating the fall as if their Agility score were 0. The target takes fire damage from the fall, and each enemy within 3 squares of where they land takes the same amount of fire damage. The ground within 3 squares of where the target lands is difficult terrain.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-32',
			name: 'The Wode Remembers and Returns',
			description: 'You create a terrarium that spans from canopy above to underbrush below.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Earth, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
			target: 'Special',
			cost: 9,
			minLevel: 6,
			sections: [
				FactoryLogic.createAbilitySectionText('The area becomes dark and verdant, with trees and plant life appearing in unoccupied spaces within it until the start of your next turn. The area is difficult terrain for enemies, and any ally who ends their turn in the area has cover.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 2,
					effect: 'The area remains until the start of your next turn. Additionally, at the start of your turn, each ally in the area can spend a Recovery.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-33',
			name: 'Heart of the Wode',
			description: 'You call forth one of the Great Tree’s many splinters to provide for your every need.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 11,
			minLevel: 8,
			sections: [
				FactoryLogic.createAbilitySectionText(`A size 5 tree appears in an unoccupied space within distance. The tree has 100 Stamina and can’t be force moved. You and any ally can touch the tree to use the Catch Breath maneuver as a free maneuver. Additionally, when you start your turn with line of effect to the tree, you can end one effect on yourself that is ended by a saving throw or that ends at the end of your turn, or you can stand up if you are prone. Each ally within distance also gains this benefit.

Each enemy who ends their turn within 3 squares of the tree is restrained until the end of their next turn. A creature restrained this way can use a main action to end the effect early.`)
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-34',
			name: 'Muse of Fire',
			description: 'The fire burns hot enough to sear the face of any god watching.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Void, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			minLevel: 8,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '7 fire damage; the Director loses 2 Malice',
					tier2: '10 fire damage; the Director loses 3 Malice',
					tier3: '15 fire damage; the Director loses 4 Malice'
				})),
				FactoryLogic.createAbilitySectionText('The Director’s Malice can become negative as a result of this ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-35',
			name: 'Return to Oblivion',
			description: 'You create a tear in reality that could consume everything.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Void, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 11,
			minLevel: 8,
			sections: [
				FactoryLogic.createAbilitySectionText('You create a size 1L vortex that lasts until the end of the encounter. At the start of each combat round while the vortex is unoccupied, the vortex vertical pulls 3 each enemy within 5 squares of it. Each enemy who enters the vortex or starts their turn there is knocked prone. At the end of the round, if a winded enemy who is not a leader or solo creature is in the vortex, they are instantly destroyed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-36',
			name: 'World Torn Asunder',
			description: 'You stomp your foot and quake the whole world over.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Earth ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			minLevel: 8,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: 'M < [weak]; prone',
					tier2: 'M < [average]; prone',
					tier3: 'M < [strong]; prone'
				})),
				FactoryLogic.createAbilitySectionText('You create a fissure in the ground adjacent to you that is a 10 × 2 line and 6 squares deep. Each creature in the area who is prone and size 2 or smaller falls in. Other creatures can enter the fissure or can shift to the nearest unoccupied space of their choice outside it.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-37',
			name: 'Earth Rejects You',
			description: 'Everyone and everything gets blown away in an eruption of rocks and debris.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Earth, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
			target: 'Each enemy and object in the area',
			cost: 11,
			minLevel: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '6 damage',
					tier2: '9 damage',
					tier3: '13 damage'
				})),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 2,
					effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-38',
			name: 'The Green Defends Its Servants',
			description: 'A luminous green shield shows its true beauty the more it cracks.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 11,
			minLevel: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('You create a fissure in the ground adjacent to you that is a 10 × 2 line and 6 squares deep. Each creature in the area who is prone and size 2 or smaller falls in. Other creatures can enter the fissure or can shift to the nearest unoccupied space of their choice outside it.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 2,
					effect: 'At the start of your turn, you can use a maneuver to use this ability again without spending essence.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-39',
			name: 'Prism',
			description: 'You split your essence, allowing you to cast multiple effects at once.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 11,
			minLevel: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('You use up to three heroic abilities whose essence costs total 11 or less, spending no additional essence beyond the cost of this ability. You can shift up to 2 squares between your use of each ability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-40',
			name: 'Unquenchable Fire',
			description: 'You let fly a fiery missile braided with pure primal energy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One enemy or object',
			cost: 11,
			minLevel: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '13 + R fire damage; I < [weak] , dazed (save ends)',
					tier2: '18 + R fire damage; I < [average] , dazed (save ends)',
					tier3: '25 + R fire damage; I < [strong] , dazed (save ends)'
				})),
				FactoryLogic.createAbilitySectionText('You use up to three heroic abilities whose essence costs total 11 or less, spending no additional essence beyond the cost of this ability. You can shift up to 2 squares between your use of each ability.')
			]
		})

	],
	subclasses: [
		earth,
		fire,
		green,
		voidSubclass
	],
	level: 1,
	characteristics: []
};
