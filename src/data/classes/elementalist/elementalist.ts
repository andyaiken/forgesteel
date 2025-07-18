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
					valuePerLevel: 9
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
							trigger: 'Start of your turn',
							value: '2'
						},
						{
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
						type: FactoryLogic.type.createAction({ qualifiers: [ 'can be used as a ranged free strike' ] }),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
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
Some of your heroic abilities have a persistent effect entry. Whenever you use a persistent ability, you decide whether you want to maintain it, and start doing so immediately after you first use the ability. If you maintain a persistent ability in combat, you reduce the amount of essence you earn at the start of your turn by an amount equal to the ability’s persistent value, which enables the ability’s persistent effect. All your active persistent abilities end at the end of the encounter.

You can’t maintain any abilities that would make you earn a negative amount of essence at the start of your turn or have a negative amount of essence outside of combat. You can stop maintaining an ability at any time (no action required).

If you maintain the same ability on several targets and the effect includes a power roll, you make that roll once and apply the same effect to all targets. A creature can’t be affected by multiple instances of a persistent ability.

If you take damage equal to or greater than 5 × your Reason score in one turn, you stop maintaining any persistent abilities. For instance, if you have a Reason score of 2 and are maintaining Instantaneous Excavation, taking 10 or more damage in one turn causes you to stop maintaining the ability.`
				}),
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
* You choose a creature within the distance of your Hurl Element ability and deal damage equal to your Reason score to them. The damage type can be acid, cold, corruption, fire, lightning, poison, or sonic.
* You teleport up to a number of squares equal to your Reason score.`)
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
								description: 'You tap into the elemental mysteries to gain the mind and training of a warrior.',
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
								description: 'You infuse your body with the speed of elemental air.',
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
								description: 'You harness the destructive power of flame inside your mind, allowing you to focus your magic on destroying your enemies.',
								keywords: [ AbilityKeyword.Magic ],
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: 'elementalist-1-7d',
								name: 'Enchantment of Distance',
								description: 'You reach into the mysteries of the void and mix that element with all of your abilities.',
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'elementalist-1-7e',
								name: 'Enchantment of Permanence',
								description: 'You place the magic of earth into your flesh and bones, making your body tougher and harder to move.',
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
								description: 'A protective field of void magic absorbs violence aimed at you, then lets you hurl it back at your enemies. The first time each round that you take damage, you gain a surge.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createDamageModifier({
								id: 'elementalist-1-8b',
								name: 'Ward of Excellent Protection',
								description: 'The protective shield you weave around yourself is made of all the elements to channel their full protective power.',
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
									description: 'You use the magic of fire to create an invisible ward of explosive fire energy.',
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
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'elementalist-ability-1',
			name: 'Afflict a Bountiful Decay',
			description: 'Your curse causes a foe’s flesh to rot off as spores that aid your allies.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Rot, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
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
				FactoryLogic.createAbilitySectionText('You or one ally within distance can end one effect that is ended by a saving throw or that ends at the end of that creature’s turn.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-2',
			name: 'Bifurcated Conflagration',
			description: 'Two jets of flame lance out at your command.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '2 creatures or objects',
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature',
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
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
			description: 'You give your enemy a gentle tap like an asteroid impact.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature or object',
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
			type: FactoryLogic.type.createAction(),
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
			description: 'A jet of heavy fire erupts with elemental fury where it strikes.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature or object',
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
			type: FactoryLogic.type.createAction(),
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
			description: 'Fire engulfs a target of your choice and burns at your command.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature or object',
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '4 + R poison damage',
					tier2: '7 + R poison damage',
					tier3: '11 + R poison damage'
				})),
				FactoryLogic.createAbilitySectionText('Mushrooms cover the target’s body, and can be removed by the target or by an adjacent creature as an action. While the mushrooms are on the target, you and each of your allies adjacent to the target gains a surge whenever the target takes damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-12',
			name: 'Ripples in the Earth',
			description: 'Like a stone dropped into a pond, waves in the earth radiate from you.',
			type: FactoryLogic.type.createAction(),
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
				FactoryLogic.createAbilitySectionText('You must be touching the ground to use this ability. Choose a square of ground in the area that is unoccupied or occupied by your or an ally. A pillar of earth that is 1 square wide and long and is up to as many squares tall as your Reason score rises out of the ground. The pillar can’t collide with any creatures or objects nor can it force any creatures being raised by it to collide with other creatures or objects.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-13',
			name: 'Conflagration',
			description: 'A storm of fire descends upon your enemies.',
			type: FactoryLogic.type.createAction(),
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
				FactoryLogic.createAbilitySectionText('You open up two holes with 1-square openings that are 4 squares deep, and which can be placed on any mundane surface within distance. You can place these holes next to each other to create fewer holes with wider openings. When the holes open, make a separate power roll for each creature on the ground above a hole and small enough to fall in. (You can’t get a critical hit with this power because it uses a maneuver.)'),
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
					effect: 'At the start of your turn, you open another hole, rolling power against any creature that could fall into the hole when it opens.'
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
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target can move through solid matter, ignores difficult terrain, and their movement can’t provoke opportunity attacks. If the target ends their turn inside solid matter, they are shunted out into the space where they entered it and this effect ends.'),
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
			type: FactoryLogic.type.createAction(),
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
				FactoryLogic.createAbilitySectionText('You and each ally within the area can end one effect that is ended by a saving throw or that ends at the end of that creature’s turn.')
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

* You and each ally in the area can spend any number of Recoveries at the start of your turn once as a free maneuver.
* The area is difficult terrain for enemies.
* Any enemy who enters the area for the first time in a round or starts their turn there takes damage equal to your Reason score.`),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The area remains until the start of your next turn. You can move the area up to 5 squares as a maneuver. This ability ends if you lose line of effect to its area.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-18',
			name: 'Subvert the Green Within',
			description: 'Burrow into their brains and take control!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Green, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionText('The target uses their signature ability against a target of your choice. You then make a power roll against the target of this ability.'),
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			minLevel: 2,
			sections: [
				FactoryLogic.createAbilitySectionText('The target is teleported to another space within distance. Make a power roll that targets each enemy adjacent to the target’s new space.'),
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Earth, AbilityKeyword.Fire, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '1 creature',
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
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Void ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Special',
			cost: 7,
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
				FactoryLogic.createAbilitySectionText('Each target begins to fade from existence (save ends). While fading from existence, a target initially takes a bane on power rolls. At the end of their first turn, they have a double bane on power rolls. At the end of their second turn, they fade from existence for 1 hour, reappearing in their original space or the nearest available space.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-22',
			name: 'Maw of Earth',
			description: 'You open up the ground, unleashing a shower of stone and debris.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Earth, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: '1 creature or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '5 damage',
					tier2: '9 damage',
					tier3: '12 damage'
				})),
				FactoryLogic.createAbilitySectionText('The ground in or directly beneath the area drops, lowering 3 squares.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'elementalist-ability-23',
			name: 'Swarm of Spirits',
			description: 'Guardian animal spirits surround you to harry your foes and bolster your allies.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Green, AbilityKeyword.Magic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
			target: 'Each enemy in the area',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Reason ],
					tier1: '3 damage',
					tier2: '6 damage',
					tier3: '9 damage'
				})),
				FactoryLogic.createAbilitySectionText('Until the end of your next turn, each ally in your aura has their characteristic scores increased by 1 for the purpose of resisting potencies and has a +1 bonus on saving throws.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'You make the power roll again to target each enemy in the aura, and the effect lasts until the start of your next turn.'
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
			sections: [
				FactoryLogic.createAbilitySectionText('The wall lasts until the start of your next turn, and can be placed in occupied squares. Creatures can enter and pass through the wall. When an enemy enters or starts their turn in a square of the wall, they take fire damage equal to your Reason score.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Persist',
					value: 1,
					effect: 'The effect lasts until the start of your next turn, and you can add a number of squares to the wall equal to your Reason score.'
				})
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
