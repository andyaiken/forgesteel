import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Characteristic } from '../../enums/characteristic';
import { DamageModifierType } from '../../enums/damage-modifier-type';
import { DamageType } from '../../enums/damage-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';
import { HeroClass } from '../../models/class';
import { PerkList } from '../../enums/perk-list';
import { SkillList } from '../../enums/skill-list';

export const nullClass: HeroClass = {
	id: 'class-null',
	name: 'Null',
	description: `
The mind is not separate from the body. Perfection of one requires perfection of the other. You strive for perfect discipline, perfect order, mastery over mind and body. You require no weapons, no tools. Any tool can be turned against the hand that wields it. You suffice.

As you strive for perfect order, you become an enemy of that ultimate expression of chaos: magic. Those who employ sorcery or psionics to break the laws of nature should fear you.

The null is an unarmed psionic warrior who dampens and absorbs the effects of magic and psionics. You need no weapon because you are the weapon. Play a null if you want to resist the supernatural forces of the universe with expert calm and confidence.`,
	heroicResource: 'Discipline',
	subclassName: 'Tradition',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Agility, Characteristic.Intuition ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'null-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 9
				}),
				FactoryLogic.feature.createBonus({
					id: 'null-recoveries',
					field: FeatureField.Recoveries,
					value: 8
				}),
				FactoryLogic.feature.createSkill({
					id: 'null-1-1',
					skill: 'Psionics'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-1-2',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
				}),
				FactoryLogic.feature.create({
					id: 'null-1-3',
					name: 'Discipline',
					description: 'At the start of each of your turns during combat, you gain 2 discipline. Additionally, you gain 1 discipline the first time in a round an enemy in your null field takes an action. You gain 1 discipline the first time in a round that an enemy uses Malice.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'null-1-4',
						name: 'Null Field',
						description: 'You project a psionic field of order around your body, dampening the effects of supernatural abilities harmful to you and your allies.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 1 }) ],
						target: 'All enemies',
						effect: `
Each target reduces their potencies by 1.

Once as a free maneuver on your turn, you can spend 1 discipline and give your Null Field has one of the following additional effects until the start of your next turn:

* **Gravitic Disruption**: When a target takes damage, you can slide them 2.
* **Inertial Anchor**: Each target who starts their turn in the area cannot shift.
* **Synaptic Break**: When a target is subjected to a potency, the potency is increased by 1.

This ability stays active even after encounters end. It ends if you are dying or if you willingly end it (no action required).`
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'null-1-5',
						name: 'Inertial Shield',
						description: 'Your instincts for danger let you predict attacks before they happen.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'You halve the damage.',
						spend: [
							{
								value: 1,
								effect: 'You decrease the potency of one effect associated with the damage for you by 1.'
							}
						]
					})
				}),
				FactoryLogic.feature.createMultiple({
					id: 'null-1-6',
					name: 'Null Speed',
					description: 'Your psionic mastery of your body allows you to achieve great quickness.',
					features: [
						FactoryLogic.feature.createBonus({
							id: 'null-1-6a',
							field: FeatureField.Speed,
							valueCharacteristics: [ Characteristic.Agility ]
						}),
						FactoryLogic.feature.createBonus({
							id: 'null-1-6b',
							field: FeatureField.Disengage,
							valueCharacteristics: [ Characteristic.Agility ]
						})
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-1-7',
					name: 'Psionic Augmentation',
					description: 'Your training has turned your body into the perfect psionic weapon, shaping pathways in your mind that enhance your physical form. Choose one of the following augmentations. You can change your focus by undergoing a psionic meditation as a respite activity.',
					options: [
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'null-1-7a',
								name: 'Density Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'null-1-7aa',
										field: FeatureField.Stability,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'null-1-7ab',
										field: FeatureField.Stamina,
										valuePerEchelon: 6
									})
								]
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbilityDamage({
								id: 'null-1-7b',
								name: 'Force Augmentation',
								keywords: [ AbilityKeyword.Psionic ],
								modifier: 1
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createMultiple({
								id: 'null-1-7c',
								name: 'Speed Augmentation',
								features: [
									FactoryLogic.feature.createBonus({
										id: 'null-1-7ca',
										field: FeatureField.Speed,
										value: 1
									}),
									FactoryLogic.feature.createBonus({
										id: 'null-1-7cb',
										field: FeatureField.Disengage,
										value: 1
									})
								]
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'null-1-8',
					name: 'Psionic Martial Arts',
					description: 'When you use the Knockback or Grab maneuver, you use Intuition instead of Might for the power roll. If you use Knockback, you can choose to slide the target instead of pushing them.'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-1-9',
					cost: 'signature',
					count: 2
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-1-10',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-1-11',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'null-2-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.create({
					id: 'null-3-1',
					name: 'Psionic Leap',
					description: 'You can long and high jump a distance equal to twice your Agility score without needing to make a test.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'null-3-2',
						name: 'Reorder',
						description: '',
						type: FactoryLogic.type.createTrigger('You start your turn.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						effect: 'You can end one effect on you or another creature in the area of your Null Field ability.'
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-3-3',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'null-ability-1',
			name: 'Dance of Blows',
			description: 'You strike everywhere at once, tricking an enemy into moving out of position.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 damage',
				tier2: '5 damage',
				tier3: '7 damage'
			}),
			effect: 'You can slide one adjacent enemy up to a number of squares equal to your Intuition score.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-2',
			name: 'Faster than the Eye',
			description: 'You strike so quickly that your hands become a blur.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures or objects',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 damage',
				tier2: '5 damage',
				tier3: '7 damage'
			}),
			effect: 'You can deal damage equal to your Agility score to an adjacent creature or object.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-3',
			name: 'Inertial Step',
			description: 'You flit about the battlefield with an opportunistic strike.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '5 + A damage',
				tier2: '7 + A damage',
				tier3: '10 + A damage'
			}),
			effect: 'You can shift up to half your speed before or after you make the strike.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-4',
			name: 'Joint Lock',
			description: 'You contort your enemy’s body into a stance they struggle to escape from.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; A < [weak], grabbed',
				tier2: '7 + A damage; A < [average], grabbed',
				tier3: '9 + A damage; A < [strong], grabbed'
			})
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-5',
			name: 'Kinetic Strike',
			description: 'Your opponent staggers. They cannot ignore you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; taunted (EoT)',
				tier2: '5 + A damage; taunted (EoT); slide 1',
				tier3: '6 + A damage; taunted (EoT); slide 2'
			})
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-6',
			name: 'Magnetic Strike',
			description: 'The force of your blow extends past the limits of your body, pulling your enemy closer.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '5 + A psychic damage; vertical pull 1',
				tier2: '8 + A psychic damage; vertical pull 2',
				tier3: '11 + A psychic damage; vertical pull 3'
			})
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-7',
			name: 'Phase Inversion Strike',
			description: 'You step momentarily out of phase as you pull an enemy through you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; push 2',
				tier2: '6 + A damage; push 4',
				tier3: '8 + A damage; push 6'
			}),
			effect: 'Before the push is resolved, teleport the target to a square adjacent to you opposite the one they started in. If the target cannot be teleported, then they ignore the push.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-8',
			name: 'Pressure Points',
			description: 'You strike at key nerve clusters to leave your foe staggered.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; A < [weak], weakened (save ends)',
				tier2: '7 + A damage; A < [average], weakened (save ends)',
				tier3: '9 + A damage; A < [strong], weakened (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-9',
			name: 'Chronal Spike',
			description: 'You foresee the best moment to strike, then exploit it.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '7 + A damage',
				tier2: '10 + A damage',
				tier3: '13 + A damage'
			}),
			effect: 'You can shift up to half your speed before or after you make the strike. Additionally, whenever an effect lets you use a free strike or a signature ability, you can use this ability instead, paying its discipline cost as usual.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-10',
			name: 'Psychic Pulse',
			description: 'A burst of psionic energy interferes with your enemy’s synapses.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 3,
			effect: 'Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the area of your Null Field ability increases by 1. When you end your turn, each enemy in that area takes psychic damage equal to your Intuition score.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-11',
			name: 'Relentless Nemesis',
			description: 'You strike, and for the next few moments, your enemy can’t escape you.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 + A damage',
				tier2: '8 + A damage',
				tier3: '12 + A damage'
			}),
			effect: 'Until the start of your next turn, when the target moves, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-12',
			name: 'Stunning Blow',
			description: 'You focus your psionic technique into a debilitating concussive punch.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 + A damage; I < [weak], dazed and slowed (save ends)',
				tier2: '5 + A damage; I < [average], dazed and slowed (save ends)',
				tier3: '7 + A damage; I < [strong], dazed and slowed (save ends)'
			})
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-13',
			name: 'Arcane Disruptor',
			description: 'Your blow reorders a foe’s body, causing pain if they attempt to channel sorcery.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '8 + A psychic damage; M < [weak], weakened (save ends)',
				tier2: '12 + A psychic damage; M < [average], weakened (save ends)',
				tier3: '16 + A psychic damage; M < [strong], weakened (save ends)'
			}),
			effect: 'While weakened this way, the target takes damage equal to your Intuition score when they use a supernatural or ability that costs Malice.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-14',
			name: 'Impart Force',
			description: 'A single touch from you, and your enemy flies backward.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: 'Push 3',
				tier2: 'Push 5',
				tier3: 'Push 7'
			}),
			effect: 'You gain an edge on this ability. For each square you push the target, they take 1 psychic damage.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-15',
			name: 'Phase Strike',
			description: 'For a moment, your foe slips out of phase with this manifold.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 + A psychic damage; I < [weak], the target goes out of phase, then is slowed (save ends)',
				tier2: '4 + A psychic damage; I < [average], the target goes out of phase, then is slowed (save ends)',
				tier3: '6 + A psychic damage; I < [strong], the target goes out of phase, then is slowed (save ends)'
			}),
			effect: 'A target who goes out of phase is removed from the encounter until the end of their next turn, reappearing in their original space or the nearest available space.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-16',
			name: 'A Squad Unto Myself',
			description: 'You move so quickly, it seems as though an army assaulted your foes.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			powerRoll: FactoryLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 damage',
				tier2: '9 damage',
				tier3: '13 damage'
			}),
			effect: 'You can take the Disengage move action as a free maneuver before or after you make this ability.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-17',
			name: 'Absorption Field',
			description: 'Your null field absorbs kinetic energy.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy in the area takes a bane on ability power rolls.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-18',
			name: 'Molecular Rearrangement Field',
			description: 'Your enemies’ wounds open, your allies’ wounds close.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy who has I < average and enters the area for the first time in a round or starts their turn there is bleeding (save ends). The first time any ally enters the area or starts their turn there, they gain temporary Stamina equal to your Intuition score.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-19',
			name: 'Stabilizing Field',
			description: 'You project order, making it harder for your enemies to interfere with you and your allies.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and any ally in the area ignore difficult terrain, reduce the potency of enemy effects targeting them by 1, and can use a free triggered action at the start of each of their turns to end one condition or effect that is affecting them.'
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-20',
			name: 'Synapse Field',
			description: 'Attacks made by allies in your null field disrupt your enemies’ thoughts, causing psychic pain.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			effect: 'Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, enemies who take damage in the area taken additional psychic damage equal to twice your Intuition score.'
		})
	],
	subclasses: [
		{
			id: 'null-sub-1',
			name: 'Chronokinetic',
			description: 'Your training has allowed you to become unmoored from temporal reality, using the flow of time as another dimension that all things move through.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'null-sub-1-1-1',
							listOptions: [ SkillList.Lore ]
						}),
						FactoryLogic.feature.create({
							id: 'null-sub-1-1-2',
							name: 'Chronokinetic Mastery',
							description: `
You can use the Disengage move action as a free maneuver when you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                                 |
|:-----------|:------------------------------------------------------------------------------------------------------------------------|
| 2          | When you take the Knockback maneuver you can Disengage as a free triggered action, either before or after the maneuver. |
| 4          | You gain one surge the first time on a turn that you move at least 1 square as part of an ability.                      |
| 6          | You gain an edge on the power rolls for Grab and Knockback maneuvers.                                                   |
`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'null-sub-1-2-1',
							name: 'Rapid Processing',
							description: 'As a maneuver, you can read an entire book or process a similar amount of information. Additionally, during any respite, you can take an additional respite activity.'
						}),
						FactoryLogic.feature.createChoice({
							id: 'null-sub-1-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-1-2-2a',
											name: 'Blur',
											description: 'You release stored time, allowing you to act twice.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Psionic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											effect: 'You can use a signature or heroic ability as a free maneuver. You gain an edge on power rolls with this ability.'
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-1-2-2b',
											name: 'Force Redirected',
											description: 'The force of your strike manifests in a surprising location.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee(3) ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '8 + A damage; slide 1',
												tier2: '12 + A damage; slide 3',
												tier3: '16 + A damage; slide 5'
											})
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'null-sub-2',
			name: 'Cryokinetic',
			description: 'You are able to tap into absolute cold, the most essential energy of the manifolds, and manifest its effects in your body.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'null-sub-2-1-1',
							listOptions: [ SkillList.Crafting ]
						}),
						FactoryLogic.feature.create({
							id: 'null-sub-2-1-2',
							name: 'Cryokinetic Mastery',
							description: `
You can use the Grab maneuver as a free triggered action whenever you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                                    |
|:-----------|:---------------------------------------------------------------------------------------------------------------------------|
| 2          | You can target one additional creature when using the Knockback maneuver.                                                  |
| 4          | You gain one surge the first time on a turn that you grab a target or an enemy moves at least 1 square in your Null Field. |
| 6          | You gain an edge on the power rolls for the Grab and Knockback maneuvers.                                                  |
`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'null-sub-2-2-1',
							name: 'Entropic Adaptability',
							description: 'You ignore difficult terrain related to cold and ice, and you can automatically climb at full speed while moving.'
						}),
						FactoryLogic.feature.createDamageModifier({
							id: 'null-sub-2-2-1b',
							modifiers: [
								FactoryLogic.damageModifier.createCharacteristic({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, characteristics: [ Characteristic.Intuition ], multiplier: 2 })
							]
						}),
						FactoryLogic.feature.createChoice({
							id: 'null-sub-2-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-2-2-2a',
											name: 'Entropic Field',
											description: 'You drastically increase the local entropy.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
											target: 'Each enemy in the area',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '6 cold damage; A < [weak], slowed (save ends)',
												tier2: '9 cold damage; A < [average], slowed (save ends)',
												tier3: '13 cold damage; A < [strong], slowed (save ends)'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-2-2-2b',
											name: 'Heat Sink',
											description: 'You absorb ambient heat, coating the ground in frost and precipitating snow from the air',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Psionic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											effect: 'Until the start of your next turn, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and your allies benefit from concealment while in the area. When you end your turn, each enemy in the aura takes cold damage equal to your Intuition score.'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		},
		{
			id: 'null-sub-3',
			name: 'Metakinetic',
			description: 'You learn to see through the illusions of the universe to truly understand your body and its psionic potential.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FactoryLogic.feature.createSkillChoice({
							id: 'null-sub-3-1-1',
							listOptions: [ SkillList.Exploration ]
						}),
						FactoryLogic.feature.create({
							id: 'null-sub-3-1-2',
							name: 'Metakinetic Mastery',
							description: `
You can use the Knockback maneuver as a free triggered action whenever you use Inertial Shield.

As your discipline grows, your psionic mastery of your body intensifies.

| Discipline | Benefit                                                                                                              |
|:-----------|:---------------------------------------------------------------------------------------------------------------------|
| 2          | You add your Intuition score to the distance you push a creature with the Knockback maneuver.                        |
| 4          | You gain one surge the first time in a round that you take damage or are force moved, even if you resist the effect. |
| 6          | You gain an edge on the power rolls for the Grab and Knockback maneuvers.                                            |
`
						})
					]
				},
				{
					level: 2,
					features: [
						FactoryLogic.feature.create({
							id: 'null-sub-3-2-1',
							name: 'Inertial Sink',
							description: `
You add your Intuition score to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.

Additionally, you have forced movement damage immunity equal to your level and reduce the distance of your falls by an additional 5 squares.`
						}),
						FactoryLogic.feature.createChoice({
							id: 'null-sub-3-2-2',
							options: [
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-3-2-2a',
											name: 'Gravitic Strike',
											description: 'Your fist projects gravitic force that pulls a distant enemy closer.',
											type: FactoryLogic.type.createAction(),
											keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
											distance: [ FactoryLogic.distance.createMelee(3) ],
											target: '1 creature',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '8 + A psychic damage; vertical pull 3',
												tier2: '12 + A psychic damage; vertical pull 5',
												tier3: '16 + A psychic damage; vertical pull 7'
											})
										})
									}),
									value: 1
								},
								{
									feature: FactoryLogic.feature.createAbility({
										ability: FactoryLogic.createAbility({
											id: 'null-sub-3-2-2b',
											name: 'Kinetic Shield',
											description: 'You manifest a force barrier that absorbs incoming kinetic energy.',
											type: FactoryLogic.type.createManeuver(),
											keywords: [ AbilityKeyword.Psionic ],
											distance: [ FactoryLogic.distance.createSelf() ],
											target: 'Self',
											cost: 5,
											powerRoll: FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: 'You gain 10 temporary Stamina',
												tier2: 'You gain 15 temporary Stamina',
												tier3: 'You gain 20 temporary Stamina'
											}),
											effect: 'While you have this temporary Stamina, you can’t be made bleeding.'
										})
									}),
									value: 1
								}
							]
						})
					]
				},
				{
					level: 3,
					features: []
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
