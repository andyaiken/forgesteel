import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionType } from '../../../enums/condition-type';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { KitArmor } from '../../../enums/kit-armor';
import { KitWeapon } from '../../../enums/kit-weapon';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { chronopathy } from './chronopathy';
import { telekinesis } from './telekinesis';
import { telepathy } from './telepathy';

export const talent: HeroClass = {
	id: 'class-talent',
	name: 'Talent',
	description: `
A rare few people are born with the potential to harness psionic power, but only those who experience an awakening, a significant event that activates a talent’s abilities, can tap into the mind’s full potential. You are one of those people—a master of psionics and a source of incredible power created through sheer force of will. You can move and change matter, time, gravity, the laws of physics, or another creature’s mind.

As a talent, you are limited only by the strength of your mind. But the ability to wield multiple powers at once and change reality at will involves a gamble. Every manifestation has a chance of harming you, and talents who use too much power too quickly pay a deadly price.`,
	subclassName: 'Tradition',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Reason, Characteristic.Presence ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'talent-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 6
				}),
				FactoryLogic.feature.createBonus({
					id: 'talent-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'talent-resource',
					name: 'Clarity',
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
					details: `
You can spend clarity you don’t have, pushing that Heroic Resource into negative numbers to a maximum negative value equal to 1 + your Reason score. At the end of each of your turns, you take 1 damage for each negative point of clarity.

Whenever you have clarity below 0, you are strained. Some psionic abilities have additional effects if you are already strained or become strained when you use them. Strained effects can still impact you even after you are no longer strained.`,
					canBeNegative: true
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-skill-a',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Psionics' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-skill-b',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-skill-c',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-1-2',
						name: 'Mind Spike',
						description: 'A telepathic bolt instantly zaps a creature’s brain.',
						type: FactoryLogic.type.createMain({ qualifiers: [ 'can be used as a ranged free strike' ] }),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Reason ],
								tier1: '2 + R psychic damage',
								tier2: '4 + R psychic damage',
								tier3: '6 + R psychic damage'
							})),
							FactoryLogic.createAbilitySectionField({
								name: 'Strained',
								effect: 'The target takes an extra 2 psychic damage. You also take 2 psychic damage that can’t be reduced in any way.'
							})
						]
					})
				}),
				FactoryLogic.feature.createLanguageChoice({
					id: 'talent-1-3',
					selected: [ 'Mindspeech' ]
				}),
				FactoryLogic.feature.create({
					id: 'talent-1-4',
					name: 'Telepathic Speech',
					description: 'You can telepathically communicate with any creatures within distance of your Mind Spike ability if they share a language with you and you know of each other. When you communicate with someone this way, they can respond telepathically.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-1-5',
					name: 'Psionic Augmentation',
					description: 'Through psionic meditation, you create pathways in your mind that enhance your statistics. Choose one of the following augmentations. You can change your augmentation along with your ward by undergoing a psionic meditation as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5a',
								name: 'Battle Augmentation',
								description: `
You can wear light armor and wield light weapons effectively, even though you don’t have a kit.

You can use light armor treasures and light weapon treasures. If you have a kit, you can’t take this augmentation.`,
								features: [
									FactoryLogic.feature.create({
										id: 'talent-1-5aa',
										name: 'Battle Augmentation',
										description: 'While you wield a light weapon, you gain a +1 damage bonus with weapon abilities, including free strikes.'
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ab',
										field: FeatureField.Stamina,
										valuePerEchelon: 3
									}),
									FactoryLogic.feature.createProficiency({
										id: 'talent-1-5ac',
										weapons: [ KitWeapon.Light ],
										armor: [ KitArmor.Light ]
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5b',
								name: 'Density Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ba',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5bb',
										field: FeatureField.Stability,
										value: 1
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDistance({
								id: 'talent-1-5c',
								name: 'Distance Augmentation',
								keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
								value: 2
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'talent-1-5d',
								name: 'Force Augmentation',
								keywords: [ AbilityKeyword.Psionic ],
								value: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'talent-1-5e',
								name: 'Speed Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5ea',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'talent-1-5eb',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-1-6',
					name: 'Talent Ward',
					description: 'Through psionic meditation, you create a ward that protects you. Choose one of the following wards. You can change your ward along with your psionic augmentation by undergoing a psionic meditation as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6a',
								name: 'Entropy Ward',
								description: 'Your ward slows time for your enemies. Whenever a creature deals damage to you, their speed is reduced by an amount equal to your Reason score and they can’t use triggered actions until the end of their next turn.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-1-6b',
									name: 'Repulsive Ward',
									description: 'You surround yourself with an invisible ward of telekinetic energy.',
									type: FactoryLogic.type.createTrigger('An adjacent creature deals damage to you.', { free: true }),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									sections: [
										FactoryLogic.createAbilitySectionText('You can push your attacker up to a number of squares equal to your Reason score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6c',
								name: 'Steel Ward',
								description: 'Your ward reacts to danger, protecting you from future harm. Whenever you take damage, after the damage resolves, you gain damage immunity equal to your Reason score until the end of your next turn.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'talent-1-6d',
								name: 'Vanishing Ward',
								description: 'Your ward allows you to slip away from threats. Whenever you take damage, you become invisible until the end of your next turn.'
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-7',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-8',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-1-9',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'talent-2-1',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-3-1',
					name: 'Scan',
					description: 'You can extend your psionic senses beyond their usual range. Once on each of your turns, you can search for hidden creatures as a free maneuver. Additionally, once you establish line of effect to a thinking creature within distance of your Mind Spike ability, you always have line of effect to that creature until they move beyond that distance.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-3-2',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-4-1a',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-4-1b',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-4-2',
						name: 'Mind Projection',
						description: 'You project your mind outside your body.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText(`
While you are in this state, your body remains unconscious and prone, and your mind is a separate entity with size 1T. Your mind automatically has concealment, and can freely move through solid matter. If you end your turn inside solid matter, you are forced out into the space where you entered it.

Any abilities or features you use originate from your mind. Both your mind and your body can take damage while separated, with any such damage applied to your Stamina. Your mind is instantly forced back into your body if you take any damage, and you can immediately return to your body as a free maneuver.`)
						]
					})
				}),
				FactoryLogic.feature.createMultiple({
					id: 'talent-4-3',
					name: 'Mind Recovery',
					features: [
						FactoryLogic.feature.create({
							id: 'talent-4-3a',
							name: 'Mind Recovery',
							description: 'Whenever you spend a Recovery to regain Stamina while strained, you can forgo the Stamina and gain 3 clarity instead.'
						}),
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'talent-4-3b',
							name: 'Mind Recovery',
							tag: 'move 2',
							trigger: 'The first time each combat round that a creature is force moved',
							value: '2',
							replacesTags: [ 'move' ]
						})
					]
				}),
				FactoryLogic.feature.createPerk({
					id: 'talent-4-4'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-4-5',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.create({
					id: 'talent-4-6',
					name: 'Suspensor Field',
					description: `
You can fly. While flying, your stability is reduced to 0 and can’t be increased. If you can already fly, you have a +2 bonus to speed while flying instead.

If you are strained while flying and are force moved, the forced movement distance gains a +2 bonus.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'talent-6-1',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'talent-6-2',
					name: 'Psi Boost',
					description: 'Whenever you use an ability that is a main action or a maneuver with the Psionic keyword, you can spend additional clarity to apply a psi boost to it and enhance its effects. A psi boost’s effects only last until the end of the turn which the ability is first used. You can apply multiple psi boosts to an ability, but only one instance of each specific boost.',
					features: [
						FactoryLogic.feature.create({
							id: 'talent-6-2a',
							name: 'Psi Boost: Dynamic Power (1 Clarity)',
							description: 'If the ability force moves a target, the forced movement distance gains a bonus equal to your Reason score.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2b',
							name: 'Psi Boost: Expanded Power (3 Clarity)',
							description: 'If the ability targets an area, you increase the size of the area by 1. If the area is a line, you increase the size of one dimension, not both.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2c',
							name: 'Psi Boost: Extended Power (1 Clarity)',
							description: 'If the ability is ranged, the distance gains a bonus equal to your Reason score. If the ability is melee, the distance gains a +2 bonus.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2d',
							name: 'Psi Boost: Heightened Power (1 Clarity)',
							description: 'If the ability deals rolled damage, it deals extra damage equal to your Reason score.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2e',
							name: 'Psi Boost: Magnified Power (5 Clarity)',
							description: 'If the ability has a potency, you increase that potency by an amount equal to your Reason score.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2f',
							name: 'Psi Boost: Shared Power (5 Clarity)',
							description: 'If the ability targets individual creatures or objects, you target one additional creature or object within distance.'
						}),
						FactoryLogic.feature.create({
							id: 'talent-6-2g',
							name: 'Psi Boost: Sharpened Power (1 Clarity)',
							description: 'If the ability has any power roll, that roll gains an edge.'
						})
					]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'talent-7-1',
					name: 'Ancestry Memory',
					description: 'Each time you finish a respite, you can choose a number of skills you have up to your Reason score and replace them with an equal number of skills from the interpersonal and lore skill groups. These replacements last unil the end of your next respite.'
				}),
				FactoryLogic.feature.create({
					id: 'talent-7-2',
					name: 'Cascading Strain',
					description: 'Whenever you take damage from a strained effect or from having negative clarity, you can choose one enemy within distance of your Mind Spike ability to take the same damage.'
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-7-3a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-7-3b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-7-3c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-7-3d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-7-3e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'talent-7-4',
					name: 'Lucid Mind',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '1d3 + 1',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-7-5',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'talent-8-1'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'talent-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'talent-9-1',
					name: 'Fortress of Perfect Thought',
					features: [
						FactoryLogic.feature.create({
							id: 'talent-9-1a',
							name: 'Fortress of Perfect Thought',
							description: `
Your mind is an impenetrable palace that shields you from danger. You gain the following effects:

* You can breathe even when there is no breathable air.
* Creatures can’t read your thoughts unless you allow them to.
* Your Reason and Intuition are treated as 2 higher for the purpose of resisting the potency of abilities.`
						}),
						FactoryLogic.feature.createDamageModifier({
							id: 'talent-9-1b',
							modifiers: [
								FactoryLogic.damageModifier.create({
									damageType: DamageType.Psychic,
									modifierType: DamageModifierType.Immunity,
									value: 10
								})
							]
						}),
						FactoryLogic.feature.createConditionImmunity({
							id: 'talent-9-1c',
							conditions: [ ConditionType.Taunted, ConditionType.Frightened ]
						})
					]
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-10-1a',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'talent-10-1b',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'talent-10-2',
					name: 'Clear Mind',
					tag: 'move 2',
					trigger: 'The first time each combat round that a creature is force moved',
					value: '2',
					replacesTags: [ 'move' ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'talent-10-3',
					name: 'Omnisensory',
					features: [
						FactoryLogic.feature.createAbilityDistance({
							id: 'talent-10-3a',
							keywords: [ AbilityKeyword.Ranged ],
							value: 10
						}),
						FactoryLogic.feature.create({
							id: 'talent-10-3b',
							name: 'Omnisensory',
							description: 'You don’t need line of effect to a target of a ranged ability if the target is a creature capable of thought who you have previously had line of effect to.'
						})
					]
				}),
				FactoryLogic.feature.createPerk({
					id: 'talent-10-4',
					lists: [ PerkList.Interpersonal, PerkList.Lore, PerkList.Supernatural ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'talent-10-5',
					name: 'Psion',
					features: [
						FactoryLogic.feature.createHeroicResourceGain({
							id: 'talent-10-5a',
							name: 'Psion',
							tag: 'start 3',
							trigger: 'Start of your turn',
							value: '1d3 + 2',
							replacesTags: [ 'start', 'start 2' ]
						}),
						FactoryLogic.feature.create({
							id: 'talent-10-5b',
							name: 'Psion',
							description: 'You can choose to not take damage from having negative clarity. You can also choose to take on any ability’s strained effect even if you’re not strained.'
						})
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'talent-10-6',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'talent-10-7',
					name: 'Vision',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					details: 'You can spend vision to use one additional psionic ability on your turn, provided you pay the entire cost of the ability in vision. If you choose to use a psionic ability that usually costs no clarity, you must spend 1 vision to use it.'
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'talent-ability-1',
			name: 'Entropic Bolt',
			description: 'You advance an enemy’s age for a moment.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '2 + P corruption damage; P < [weak], slowed (save ends)',
						tier2: '3 + P corruption damage; P < [average], slowed (save ends)',
						tier3: '5 + P corruption damage; P < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The target takes 1 extra corruption damage for each additional time they are targeted by this ability during the encounter.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You gain 1 clarity when you obtain a tier 2 or tier 3 outcome on the power roll.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-2',
			name: 'Hoarfrost',
			description: 'You blast a foe with a pulse of cold energy.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Cryokinesis, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R cold damage; M < [weak], slowed (EoT)',
						tier2: '4 + R cold damage; M < [average], slowed (EoT)',
						tier3: '6 + R cold damage; M < [strong], slowed (EoT)'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You are slowed until the end of your next turn. Additionally, a target slowed by this ability is restrained instead.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-3',
			name: 'Incinerate',
			description: 'The air erupts into a column of smokeless flame.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Fire, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Pyrokinesis ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 fire damage',
						tier2: '4 fire damage',
						tier3: '6 fire damage'
					})
				),
				FactoryLogic.createAbilitySectionText('A column of fire remains in the area until the start of your next turn. Each enemy who enters the area for the first time in a combat round or starts their turn there takes 2 fire damage.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The size of the cube increases by 2, but the fire disappears at the end of your turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-4',
			name: 'Kinetic Grip',
			description: 'You lift and hurl your foe away from you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One size 1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: 'Slide 2 + R',
						tier2: 'Slide 4 + R',
						tier3: 'Slide 6 + R; prone'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You must vertical push the target instead of sliding them.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-5',
			name: 'Kinetic Pulse',
			description: 'The force of your mind hurls enemies backward.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 psychic damage',
						tier2: '5 psychic damage; push 1',
						tier3: '7 psychic damage; push 2'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The size of the burst increases by 2, and you are bleeding until the start of your next turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-6',
			name: 'Materialize',
			description: 'You picture an object in your mind and give it form—directly above your opponent’s head.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Resopathy, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 + R damage',
						tier2: '5 + R damage',
						tier3: '8 + R damage'
					})
				),
				FactoryLogic.createAbilitySectionText('A worthless size 1M object drops onto the target to deal the damage, then rolls into an adjacent unoccupied space of your choice. The object is made of wood, stone, or metal (your choice).'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The object explodes after the damage is dealt, and each creature adjacent to the target takes damage equal to your Reason score. You also take damage equal to your Reason score that can’t be reduced in any way.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-7',
			name: 'Optic Blast',
			description: 'Your eyes emit rays of powerful enervating force.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Metamorphosis, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 + R damage; M < [weak], prone',
						tier2: '4 + R damage; M < [average], prone',
						tier3: '6 + R damage; M < [strong], prone'
					})
				),
				FactoryLogic.createAbilitySectionText('When targeting an object with a solid reflective surface or a creature carrying or wearing such an object (such as a mirror, an unpainted metal shield, or shiny metal plate armor), you can target one additional creature or object within 3 squares of the first target.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You gain 1 surge that you can use immediately, and you take damage equal to your Reason score that can’t be reduced in any way.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-8',
			name: 'Spirit Sword',
			description: 'You form a blade of mind energy and stab your target, invigorating yourself.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: 'One creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '3 + P damage',
						tier2: '6 + P damage',
						tier3: '9 + P damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain 1 surge.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The target takes an extra 3 damage. You also take 3 damage that can’t be reduced in any way.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-9',
			name: 'Awe',
			description: 'You project psionic energy out to a creature and take on a new visage in their mind.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('If you target an ally, they gain temporary Stamina equal to three times your Presence score, and they can end one effect on them that is ended by a saving throw or that ends at the end of their turn. If you target an enemy, you make a power roll.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '3 + P psychic damage; I < [weak], frightened (save ends)',
						tier2: '6 + P psychic damage; I < [average], frightened (save ends)',
						tier3: '9 + P psychic damage; I < [strong], frightened (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-10',
			name: 'Choke',
			description: 'You crush a foe in a telekinetic grip.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 + R damage; M < [weak], slowed (save ends)',
						tier2: '5 + R damage; M < [average], slowed (save ends)',
						tier3: '8 + R damage; M < [strong], restrained (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('You can vertical pull the target up to 2 squares. If the target is made restrained by this ability, this forced movement ignores their stability.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-11',
			name: 'Precognition',
			description: 'You give a target a glimpse into the future so that they’re ready for what comes next.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Melee, AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: 'Self or one ally',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('Ability rolls made against the target take a bane until the start of your next turn. Whenever the target takes damage while under this effect, they can use a triggered action to make a free strike against the source of the damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-12',
			name: 'Smolder',
			description: 'Smoke flows from your enemy like tears as their skin begins to blacken and flake.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Pyrokinesis, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('Choose the damage type and the weakness for this ability from one of the following: acid, corruption, or fire. The target takes damage before this ability imposes any weakness.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '3 + R damage; R < [weak], the target has weakness 5 (save ends)',
						tier2: '6 + R damage; R < [average], the target has weakness 5 (save ends)',
						tier3: '9 + R damage; R < [strong], the target has weakness equal to 5 + your Reason score (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-13',
			name: 'Flashback',
			description: 'The target is thrown several seconds back through time and gets to do it all again.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('The target uses an ability with a base Heroic Resource cost of 7 or lower that they’ve previously used this round, without needing to spend the base cost. Augmentations to the ability can be paid for as usual.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You take 1d6 damage and are slowed (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-14',
			name: 'Inertia Soak',
			description: 'Your psionic energy surrounds the target and pushes everything else away from them.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('The target ignores difficult terrain and takes no damage from forced movement until the start of your next turn. Whenever the target enters a square while under this effect, they can push one adjacent creature up to a number of squares equal to your Reason score. When pushing an ally, the target can ignore that ally’s stability. A creature can only be force moved this way once a turn.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You are weakened (save ends). While you are weakened this way, whenever you are force moved, the forced movement distance gains a +5 bonus.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-15',
			name: 'Iron',
			description: 'The target’s skin turns to hard, dark metal, impenetrable and dense.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Metamorphosis, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('The target’s stability increases by an amount equal to your Reason score, and they gain 10 temporary Stamina and 2 surges. This stability increase lasts until the target no longer has temporary Stamina from this ability.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You can’t use maneuvers (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-16',
			name: 'Perfect Clarity',
			description: 'You clear the mind of nothing but the goal.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target gains a +3 bonus to speed, and they have a double edge on the next power roll they make. If the target obtains a tier 3 outcome on that roll, you gain 1 clarity.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You take 1d6 damage, and you can’t use triggered actions (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-17',
			name: 'Fling Through Time',
			description: 'You hurl the target through the annals of time, forcing them to witness every moment of their existence all at once.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature or object',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '3 + P corruption damage; P < [weak], weakened (save ends)',
						tier2: '5 + P corruption damage; the target is flung through time, and if P < [average] they are weakened (save ends)',
						tier3: '8 + P corruption damage; the target is flung through time, and if P < [strong] they are weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A target who is flung through time is removed from the encounter map until the end of their next turn, reappearing in their original space or the nearest unoccupied space.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You take 2d6 damage and permanently grow visibly older (the equivalent of 10 years for a human). If you obtain a tier 3 outcome on the power roll, you gain 2 clarity.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-18',
			name: 'Force Orb',
			description: 'Spheres of solid psionic energy float around you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self; see below',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText(`
You create three size 1T orbs that orbit your body. Each orb gives you a cumulative damage immunity 1. Each time you take damage, you lose 1 orb.

Once on each of your turns, you can use a free maneuver to fire an orb at a creature or object within 5 squares as a ranged strike, losing the orb after the strike.`),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '2 damage',
						tier2: '3 damage',
						tier3: '5 damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You create five orbs, and you are weakened while you have any orbs active.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-19',
			name: 'Reflector Field',
			description: 'A protective field reverses the momentum of incoming attacks.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
			target: 'Special',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('The aura lasts until the start of your next turn. Whenever an enemy targets an ally in the area with a ranged ability, the ability is negated on the ally and reflected back at the enemy. The ability deals half the damage to the enemy that it would have dealt to the ally and loses any additional effects.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The size of the aura increases by 1. Whenever your aura reflects an ability, you take 2d6 damage and forget a memory, as determined by you and the Director.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-20',
			name: 'Soul Burn',
			description: 'You blast their soul out of their body, leaving it to helplessly float back to a weakened husk.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '6 + P damage; P < [weak], dazed (save ends)',
						tier2: '10 + P damage; P < [average], dazed (save ends)',
						tier3: '14 + P damage; P < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The target takes a bane on Presence tests until the end of the encounter.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The potency of this ability increases by 1. You take 2d6 damage and gain 3 surges that you can use immediately.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-21',
			name: 'Exothermic Shield',
			description: 'You encase the target in psionic flame and allow them to flicker without fear of burning out.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Pyrokinesis, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self or one ally',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, the target has cold immunity 10 and fire immunity 10, and their strikes deal extra fire damage equal to twice your Reason score. Additionally, whenever an enemy attempts uses a melee ability against the target while they are under this effect, the enemy takes 5 fire damage.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'The target gains 2 surges. You are weakened and slowed (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-22',
			name: 'Hypersonic',
			description: 'You move fast enough to turn around and watch your foes feel the aftermath.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Psionic, AbilityKeyword.Telekinesis ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 2, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('You teleport to a square on the opposite side of the area before making the power roll.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '12 sonic damage',
						tier2: '18 sonic damage',
						tier3: '24 sonic damage'
					})
				),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'If you obtain a tier 2 outcome or better, you are slowed until the end of your turn and each target is slowed until the end of their turn.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-23',
			name: 'Mind Snare',
			description: 'You latch onto your prey’s brain and don’t let go, like a song they can’t get out of their head.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '10 + R psychic damage; R < [weak], slowed (save ends)',
						tier2: '14 + R psychic damage; R < [average], slowed (save ends)',
						tier3: '20 + R psychic damage; R < [strong], slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While slowed this way, the target takes 3 psychic damage for each square they willingly leave.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'While slowed this way, the target instead takes 5 psychic damage for each square they willingly leave. You have a double bane on ability rolls made against the target while they are slowed this way.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-24',
			name: 'Soulbound',
			description: 'You fire a piercing bolt of psychic energy that lances through two foes and leaves a faint intangible thread between them.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Two enemies',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '8 damage; A < [weak], the target is stitched to the other target (save ends)',
						tier2: '13 damage; A < [average], the target is stitched to the other target (save ends)',
						tier3: '17 damage; A < [strong], the target is stitched to the other target (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('If any target becomes stitched to the other, both targets are stitched together. While stitched together, a target takes a bane on power rolls while not adjacent to a creature they’re stitched to. Whenever a stitched target takes damage that wasn’t dealt by or also taken by another stitched target, each other stitched target takes half the damage the initial target took.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You target yourself and three enemies instead.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-25',
			name: 'Doubt',
			description: 'You tug at the strings of the foe’s anima and unravel them, allowing someone else to take advantage of their drive.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Animapathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Presence ],
						tier1: '10 + P damage; P < [weak], weakened (save ends)',
						tier2: '14 + P damage; P < [average], weakened (save ends)',
						tier3: '20 + P damage; P < [strong], weakened and slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('This ability gains an edge against a target with a soul. After you make the power roll, you or one ally within distance have a double edge on the next power roll you make before the end of the encounter.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You feel dispirited until you finish a respite. If you obtain a tier 3 outcome on the power roll, you and the target each have damage weakness 5 (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-26',
			name: 'Mindwipe',
			description: 'You attempt to make them forget all their training.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: '12 + R damage; R < [weak], the target takes a bane on their next power roll',
						tier2: '17 + R damage; R < [average], the target takes a bane on power rolls (save ends)',
						tier3: '23 + R damage; R < [strong], the target has a double bane on power rolls (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The target can’t communicate with anyone until the end of the encounter.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You take 3d6 damage.'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-27',
			name: 'Rejuvenate',
			description: 'You reshape the flow of time in the target’s body to return it to an earlier state.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Chronopathy, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText(`
Choose two of the following effects:

* The target can spend any number of Recoveries.
* The target gains 1 of their Heroic Resource, and can end any
effects on them that are ended by a saving throw or that end at the end of their turn.
* The target gains 2 surges, and gains a +3 bonus to speed until the end of the encounter.`),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You and the target both permanently grow visibly younger (the equivalent of 20 human years, to the minimum of an 18-year-old). Additionally, you are weakened and slowed (save ends).'
				})
			]
		}),
		FactoryLogic.createAbility({
			id: 'talent-ability-28',
			name: 'Steel',
			description: 'The target’s skin becomes covered in tough metal.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Metamorphosis, AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('The target has damage immunity 5 and can’t be made slowed or weakened until the start of your next turn. Whenever the target force moves a creature or object while under this effect, the forced movement distance gains a +5 bonus.'),
				FactoryLogic.createAbilitySectionField({
					name: 'Strained',
					effect: 'You can’t use maneuvers (save ends).'
				})
			]
		})
	],
	subclasses: [
		chronopathy,
		telekinesis,
		telepathy
	],
	level: 1,
	characteristics: []
};
