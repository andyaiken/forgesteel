import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { chronokinetic } from './chronokinetic';
import { cryokinetic } from './cryokinetic';
import { metakinetic } from './metakinetic';

export const nullClass: HeroClass = {
	id: 'class-null',
	name: 'Null',
	description: `
The mind is not separate from the body. Perfection of one requires perfection of the other. You strive for perfect discipline, perfect order, mastery over mind and body. You require no weapons, no tools. Any tool can be turned against the hand that wields it. You suffice.

As you strive for perfect order, you become an enemy of that ultimate expression of chaos: magic. Those who employ sorcery or psionics to break the laws of nature should fear you.

The null is an unarmed psionic warrior who dampens and absorbs the effects of magic and psionics. You need no weapon because you are the weapon. Play a null if you want to resist the supernatural forces of the universe with expert calm and confidence.`,
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
				FactoryLogic.feature.createHeroicResource({
					id: 'null-resource',
					name: 'Discipline',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							trigger: 'The first time in a round an enemy in your null field takes an action',
							value: '1'
						},
						{
							trigger: 'The first time in a round that an enemy uses Malice',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Psionics' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-1-2',
					listOptions: [ SkillList.Interpersonal, SkillList.Lore ],
					count: 2
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
						sections: [
							FactoryLogic.createAbilitySectionText(`
Each target reduces their potencies by 1.

Once as a free maneuver on your turn, you can spend 1 discipline and give your Null Field has one of the following additional effects until the start of your next turn:

* **Gravitic Disruption**: When a target takes damage, you can slide them 2.
* **Inertial Anchor**: Each target who starts their turn in the area cannot shift.
* **Synaptic Break**: When a target is subjected to a potency, the potency is increased by 1.

This ability stays active even after encounters end. It ends if you are dying or if you willingly end it (no action required).`)
						]
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
						sections: [
							FactoryLogic.createAbilitySectionText('You halve the damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You decrease the potency of one effect associated with the damage for you by 1.'
							})
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
								value: 1
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
						sections: [
							FactoryLogic.createAbilitySectionText('You can end one effect on you or another creature in the area of your Null Field ability.')
						]
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
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '4 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can slide one adjacent enemy up to a number of squares equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-2',
			name: 'Faster than the Eye',
			description: 'You strike so quickly that your hands become a blur.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'Two creatures or objects',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '4 damage',
						tier2: '5 damage',
						tier3: '7 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can deal damage equal to your Agility score to an adjacent creature or object.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-3',
			name: 'Inertial Step',
			description: 'You flit about the battlefield with an opportunistic strike.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '5 + A damage',
						tier2: '7 + A damage',
						tier3: '10 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift up to half your speed before or after you make the strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-4',
			name: 'Joint Lock',
			description: 'You contort your enemy’s body into a stance they struggle to escape from.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 + A damage; A < [weak], grabbed',
					tier2: '7 + A damage; A < [average], grabbed',
					tier3: '9 + A damage; A < [strong], grabbed'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-5',
			name: 'Kinetic Strike',
			description: 'Your opponent staggers. They cannot ignore you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 + A damage; taunted (EoT)',
					tier2: '5 + A damage; taunted (EoT); slide 1',
					tier3: '6 + A damage; taunted (EoT); slide 2'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-6',
			name: 'Magnetic Strike',
			description: 'The force of your blow extends past the limits of your body, pulling your enemy closer.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee(2) ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '5 + A psychic damage; vertical pull 1',
					tier2: '8 + A psychic damage; vertical pull 2',
					tier3: '11 + A psychic damage; vertical pull 3'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-7',
			name: 'Phase Inversion Strike',
			description: 'You step momentarily out of phase as you pull an enemy through you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '4 + A damage; push 2',
						tier2: '6 + A damage; push 4',
						tier3: '8 + A damage; push 6'
					})
				),
				FactoryLogic.createAbilitySectionText('Before the push is resolved, teleport the target to a square adjacent to you opposite the one they started in. If the target cannot be teleported, then they ignore the push.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-8',
			name: 'Pressure Points',
			description: 'You strike at key nerve clusters to leave your foe staggered.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 + A damage; A < [weak], weakened (save ends)',
					tier2: '7 + A damage; A < [average], weakened (save ends)',
					tier3: '9 + A damage; A < [strong], weakened (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-9',
			name: 'Chronal Spike',
			description: 'You foresee the best moment to strike, then exploit it.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '7 + A damage',
						tier2: '10 + A damage',
						tier3: '13 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can shift up to half your speed before or after you make the strike. Additionally, whenever an effect lets you use a free strike or a signature ability, you can use this ability instead, paying its discipline cost as usual.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the area of your Null Field ability increases by 1. When you end your turn, each enemy in that area takes psychic damage equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-11',
			name: 'Relentless Nemesis',
			description: 'You strike, and for the next few moments, your enemy can’t escape you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '6 + A damage',
						tier2: '8 + A damage',
						tier3: '12 + A damage'
					})
				),
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, when the target moves, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-12',
			name: 'Stunning Blow',
			description: 'You focus your psionic technique into a debilitating concussive punch.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
					characteristic: [ Characteristic.Agility ],
					tier1: '4 + A damage; I < [weak], dazed and slowed (save ends)',
					tier2: '5 + A damage; I < [average], dazed and slowed (save ends)',
					tier3: '7 + A damage; I < [strong], dazed and slowed (save ends)'
				}))
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-13',
			name: 'Arcane Disruptor',
			description: 'Your blow reorders a foe’s body, causing pain if they attempt to channel sorcery.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '8 + A psychic damage; M < [weak], weakened (save ends)',
						tier2: '12 + A psychic damage; M < [average], weakened (save ends)',
						tier3: '16 + A psychic damage; M < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While weakened this way, the target takes damage equal to your Intuition score when they use a supernatural or ability that costs Malice.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: 'Push 3',
						tier2: 'Push 5',
						tier3: 'Push 7'
					})
				),
				FactoryLogic.createAbilitySectionText('You gain an edge on this ability. For each square you push the target, they take 1 psychic damage.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-15',
			name: 'Phase Strike',
			description: 'For a moment, your foe slips out of phase with this manifold.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A psychic damage; I < [weak], the target goes out of phase, then is slowed (save ends)',
						tier2: '4 + A psychic damage; I < [average], the target goes out of phase, then is slowed (save ends)',
						tier3: '6 + A psychic damage; I < [strong], the target goes out of phase, then is slowed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A target who goes out of phase is removed from the encounter until the end of their next turn, reappearing in their original space or the nearest available space.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-16',
			name: 'A Squad Unto Myself',
			description: 'You move so quickly, it seems as though an army assaulted your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
			target: 'Each enemy in the area',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '6 damage',
						tier2: '9 damage',
						tier3: '13 damage'
					})
				),
				FactoryLogic.createAbilitySectionText('You can take the Disengage move action as a free maneuver before or after you make this ability.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy in the area takes a bane on ability power rolls.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, each enemy who has I < average and enters the area for the first time in a round or starts their turn there is bleeding (save ends). The first time any ally enters the area or starts their turn there, they gain temporary Stamina equal to your Intuition score.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, you and any ally in the area ignore difficult terrain, reduce the potency of enemy effects targeting them by 1, and can use a free triggered action at the start of each of their turns to end one condition or effect that is affecting them.')
			]
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
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the area of your Null Field ability increases by 1. While the area is enlarged this way, enemies who take damage in the area taken additional psychic damage equal to twice your Intuition score.')
			]
		})
	],
	subclasses: [
		chronokinetic,
		cryokinetic,
		metakinetic
	],
	level: 1,
	characteristics: []
};
