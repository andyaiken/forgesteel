import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { ConditionType } from '../../../enums/condition-type';
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
The mind is not separate from the body. Perfection of one requires perfection of the other. You strive for perfect discipline, perfect order, mastery over mind and body becoming an unarmed psionic warrior who dampens and absorbs magic and psionics. You require no weapons, no tools. You suffice.

As a null, you resist the supernatural forces of the universe with composure and confidence. As you strive for perfect order, you are an enemy of the ultimate expression of chaos: the supernatural. Those who break the laws of nature using sorcery or psionics should fear you.

"Any weapon can be turned against the hand that wields it." - Ardashir`,
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
							tag: 'start',
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							tag: 'action',
							trigger: 'The first time each combat round that an enemy in the area of your Null Field ability uses a main action',
							value: '1'
						},
						{
							tag: 'malice',
							trigger: 'The first time each combat round that the Director uses an ability that costs Malice',
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
						description: 'You project an aura that dampens the power of your foes.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 1 }) ],
						target: 'All enemies',
						sections: [
							FactoryLogic.createAbilitySectionText(`
Each target reduces their potencies by 1.

Once as a free maneuver on each of your turns, you can spend 1 discipline and give your Null Field one of the following additional effects until the start of your next turn:
* **Gravitic Disruption**: The first time on a turn that a target takes damage, you can slide them up to 2 squares.
* **Inertial Anchor**: Any target who starts their turn in the area can't shift.
* **Synaptic Break**: Whenever you or any ally uses an ability against a target that has a potency effect, the potency is increased by 1.

This ability remains active even after an encounter ends. It ends only if you are dying or if you willingly end it (no action required)`),
							FactoryLogic.createAbilitySectionPackage('null-field')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'null-1-5',
						name: 'Inertial Shield',
						description: 'You intuit the course of an incoming attack, reducing its effects.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Psionic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You halve the damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The potency of one effect associated with the damage is reduced by 1 for you.'
							}),
							FactoryLogic.createAbilitySectionPackage('inertial-shield')
						]
					})
				}),
				FactoryLogic.feature.createMultiple({
					id: 'null-1-6',
					name: 'Null Speed',
					description: 'The flow of psionic power through you allows you to achieve high velocity.',
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
					description: 'Your training has turned your body into the perfect psionic weapon, shaping pathways in your mind that enhance your physical form. Choose one of the following augmentations. You can change your augmentation by undergoing a psionic meditation as a respite activity.',
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
					description: 'Whenever you use the Knockback or Grab maneuver, you use Intuition instead of Might for the power roll and for determining if you can target creatures larger than you. Additionally, whenever you use the Knockback maneuver, you can choose to slide the target instead of pushing them.'
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
					description: 'You can long jump and high jump a distance equal to twice your Agility score without needing to make a test.'
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
							FactoryLogic.createAbilitySectionText('End one effect on you that is ended by a saving throw or that ends at the end of your turn. Alternatively, you can grant this benefit to one creature in the area of your Null Field ability.')
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-3-3',
					cost: 7
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-4-1a',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-4-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'null-4-2',
					name: 'Enhanced Null Field',
					description: 'During combat, any temporary supernatural terrain effects of your level or lower are removed when your aura partially or fully overlaps with their location. Permanent supernatural terrain effects of your level or lower are temporarily negated while your aura overlaps with their location, but return when the aura no longer overlaps with them.',
					tag: 'null-field'
				}),
				FactoryLogic.feature.createPerk({
					id: 'null-4-3'
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'null-4-4',
					name: 'Regenerative Field',
					tag: 'action 2',
					trigger: 'The first time each combat round that an enemy in the area of your Null Field ability uses a main action',
					value: '2',
					replacesTags: [ 'action' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-4-5',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-5-1',
					cost: 9
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'null-6-1',
					name: 'Elemental Absorption',
					description: 'Whenever you use your Inertial Shield triggered action, you gain immunity to acid, cold, corruption, fire, lightning, poison, and sonic damage equal to your Intuition score against the triggering damage.',
					tag: 'inertial-shield'
				}),
				FactoryLogic.feature.create({
					id: 'null-6-2',
					name: 'Elemental Buffer',
					description: 'Whenever you reduce acid, cold, corruption, fire, lightning, poison, or sonic damage with damage immunity, you gain 2 surges that can be used only to increase the damage of your next strike.'
				}),
				FactoryLogic.feature.createPerk({
					id: 'null-6-3',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-7-1a',
					characteristic: Characteristic.Might,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-7-1b',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-7-1c',
					characteristic: Characteristic.Reason,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-7-1d',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-7-1e',
					characteristic: Characteristic.Presence,
					value: 1
				}),
				FactoryLogic.feature.create({
					id: 'null-7-2',
					name: 'Psi Boost',
					description: `
Whenever you use an ability that is a main action or a maneuver with the Psionic keyword, you can spend additional discipline to apply a psi boost to it and enhance its effects. A psi boost’s effects only last until the end of the turn which the ability is first used. You can apply multiple psi boosts to an ability, but only one instance of each specific boost. You can use the following psi boosts.

**Dynamic Power** (1 Discipline) If the ability force moves a target, the forced movement distance gains a bonus equal to your Intuition score.
**Expanded Power** (3 Discipline) If the ability targets an area, you increase the size of the area by 1. If the area is a line, you increase the size of one dimension, not both.
**Extended Power** (1 Discipline) If the ability is ranged, the distance gains a bonus equal to your Intuition score. If the ability is melee, the distance gains a +2 bonus.
**Heightened Power** (1 Discipline) If the ability deals rolled damage, it deals extra damage equal to your Intuition score.
**Magnified Power** (5 Discipline) If the ability has a potency, you increase that potency by an amount equal to your Intuition score.
**Shared Power** (5 Discipline) If the ability targets individual creatures or objects, you target one additional creature or object within distance.
**Sharpened Power** (1 Discipline) If the ability has any power roll, that roll gains an edge.`
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'null-7-3',
					name: 'Improved Body',
					tag: 'start 2',
					trigger: 'Start of your turn',
					value: '3',
					replacesTags: [ 'start' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-7-4',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'null-8-1'
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'null-8-2',
					cost: 11
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'null-9-1a',
					name: 'I Am the Weapon',
					field: FeatureField.Stamina,
					value: 21
				}),
				FactoryLogic.feature.createConditionImmunity({
					id: 'null-9-1b',
					name: 'I Am the Weapon',
					conditions: [ ConditionType.Bleeding ]
				})
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-10-1a',
					characteristic: Characteristic.Agility,
					value: 1
				}),
				FactoryLogic.feature.createCharacteristicBonus({
					id: 'null-10-1b',
					characteristic: Characteristic.Intuition,
					value: 1
				}),
				FactoryLogic.feature.createHeroicResourceGain({
					id: 'null-10-2',
					name: 'Manifold Body',
					tag: 'start 3',
					trigger: 'Start of your turn',
					value: '4',
					replacesTags: [ 'start', 'start 2' ]
				}),
				FactoryLogic.feature.create({
					id: 'null-10-3',
					name: 'Manifold Resonance',
					description: `
Your body becomes perfected matter, beyond the whims and chaos of the timescape and the restrictions of the manifolds. Each time you finish a respite, you can shift yourself and any creatures in the area of your Null Field ability to any location in the timescape known to you, known to any other creature in the area, or where any supernatural treasure in the area has been before.

Whenever you use an ability, you gain 1 discipline that can be used only to apply a benefit from your Psi Boost feature to that ability.

Additionally, you and allies in the area of your Null Field ability ignore banes and double banes on your power rolls.`
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'null-10-4',
					name: 'Order',
					type: 'epic',
					gains: [
						{
							tag: '',
							trigger: 'Finish a respite',
							value: 'XP gained'
						}
					],
					description: `
You have an epic resource called order. Each time you finish a respite, you gain order equal to the XP you gain. You can spend order on your abilities as if it were discipline. At the start of a combat encounter, you can spend 1 order to increase the size of your Null Field by 1 until the end of the encounter. Order remains until you spend it`
				}),
				FactoryLogic.feature.createPerk({
					id: 'null-10-5'
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'null-10-6',
					listOptions: [ SkillList.Crafting, SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue, SkillList.Lore ]
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
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'Each enemy in the area',
			cost: 'signature',
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 damage',
						tier2: '4 damage',
						tier3: '5 damage'
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
				FactoryLogic.createAbilitySectionText('You can deal damage equal to your Agility score to one creature or object adjacent to you.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-3',
			name: 'Inertial Step',
			description: 'You flit about the battlefield and take an opportunistic strike.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
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
			target: 'One creature or object',
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
			target: 'One creature or object',
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
			target: 'One creature',
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
			target: 'One creature or object',
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
				FactoryLogic.createAbilitySectionText('Before the push is resolved, you teleport the target to a square adjacent to you and opposite the one they started in. If the target can’t be teleported this way, you can’t push them.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-8',
			name: 'Pressure Points',
			description: 'You strike at key nerve clusters to leave your foe staggered.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
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
			target: 'One creature or object',
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
				FactoryLogic.createAbilitySectionText('You can shift up to half your speed before or after you make this strike. Additionally, whenever an effect lets you make a free strike or use a signature ability, you can use this ability instead, paying its discipline cost as usual.')
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
				FactoryLogic.createAbilitySectionText('Each target takes psychic damage equal to twice your Intuition score. Until the start of your next turn, the size of your Null Field ability increases by 1. At the end of your current turn, each enemy in the area of your Null Field ability takes psychic damage equal to your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-11',
			name: 'Relentless Nemesis',
			description: 'You strike, and for the next few moments, your enemy can’t escape you.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
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
				FactoryLogic.createAbilitySectionText('Until the start of your next turn, whenever the target moves or is force moved, you can use a free triggered action to shift up to your speed. You must end this shift adjacent to the target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-12',
			name: 'Stunning Blow',
			description: 'You focus your psionic technique into a concussive punch.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
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
			target: 'One creature or object',
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
				FactoryLogic.createAbilitySectionText('While weakened this way, the target takes damage equal to your Intuition score whenever they use a supernatural ability that costs Malice.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-14',
			name: 'Impart Force',
			description: 'A single touch from you, and your enemy flies backward.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Intuition ],
						tier1: 'Push 3',
						tier2: 'Push 5',
						tier3: 'Push 7'
					})
				),
				FactoryLogic.createAbilitySectionText('An object you target must be your size or smaller. You gain an edge on this ability. Additionally, for each square you push the target, they take 1 psychic damage')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-15',
			name: 'Phase Strike',
			description: 'For a moment, your foe slips out of phase with this manifold.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '3 + A psychic damage; I < [weak], the target goes out of phase (save ends)',
						tier2: '4 + A psychic damage; I < [average], the target goes out of phase (save ends)',
						tier3: '6 + A psychic damage; I < [strong], the target goes out of phase (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('A target who goes out of phase is slowed, has their stability reduced by 2, and can’t obtain a tier 3 outcome on ability rolls.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-16',
			name: 'A Squad Unto Myself',
			description: 'You move so quickly, it seems as though an army assaulted your foes.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
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
				FactoryLogic.createAbilitySectionText('You can take the Disengage move action as a free maneuver before or after you use this ability.')
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
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, each enemy in the area takes a bane on ability rolls.')
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
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, each enemy who has I < [average] and enters the area for the first time in a combat round or starts their turn there is bleeding (save ends). Each ally who enters the area for the first time in a combat round or starts their turn there gains temporary Stamina equal to your Intuition score.')
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
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, you ignore difficult terrain and reduce the potency of enemy effects targeting you by 1 for you. You can also use a free triggered action at the start of each of your turns to end one effect on you that is ended by a saving throw or that ends at the end of your turn. Each ally in the area also gains these benefits.')
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
				FactoryLogic.createAbilitySectionText('Until the end of the encounter, the size of your Null Field ability increases by 1. While the area of that ability is enlarged this way, whenever an enemy in the area takes rolled damage, they take extra psychic damage equal to twice your Intuition score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-21',
			name: 'Anticipating Strike',
			description: 'You suddenly strike an enemy, then grab them in a psionically enhanced grip.',
			type: FactoryLogic.type.createTrigger('The target moves or uses a main action', { free: true }),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '7 + A damage; I < [weak], restrained (save ends)',
						tier2: '10 + A damage; I < [average], restrained (save ends)',
						tier3: '13 + A damage; I < [strong], restrained (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('This strike resolves before the triggering movement or main action.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-22',
			name: 'Iron Grip',
			description: 'You grab the target with supernatural force.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '10 + A damage; A < [weak], grabbed',
						tier2: '14 + A damage; A < [average], grabbed',
						tier3: '18 + A damage; A < [strong], grabbed'
					})
				),
				FactoryLogic.createAbilitySectionText('While grabbed this way, the target takes a bane on the Escape Grab maneuver. Each time they use that maneuver, they take damage equal to twice your Agility score.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-23',
			name: 'Phase Leap',
			description: 'You leap beyond reality, leaving an afterimage of yourself.',
			type: FactoryLogic.type.createMove(),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('You jump up to your speed without provoking opportunity attacks. Until the end of your next turn, a static afterimage of you remains in the space you left, and any enemy adjacent to your afterimage takes a bane on ability rolls. You can use your abilities from your own space or from the space of your afterimage as if you were still there. Additionally, if your Null Field ability is active, your afterimage also projects the aura from that ability, which you control as if you were in the afterimage’s space.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-24',
			name: 'Synaptic Reset',
			description: 'You expand your nullifying power to mitigate harmful effects.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
			target: 'Self and each ally in the area',
			cost: 9,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can end any conditions or effects on themself, and gains 5 temporary Stamina for each condition or effect removed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-25',
			name: 'Arcane Purge',
			description: 'You focus your null field into a pressure point strike that prevents your foe from channeling sorcery.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '13 + A damage; M < [weak], the target is suppressed (save ends)',
						tier2: '19 + A damage; M < [average], the target is suppressed (save ends)',
						tier3: '24 + A damage; M < [strong], the target is suppressed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('While suppressed, a target takes psychic damage equal to twice your Intuition score at the start of their turns, whenever they use a supernatural ability, or whenever they use an ability that costs Malice.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-26',
			name: 'Phase Hurl',
			description: 'You throw your foe out of phase with this manifold, causing them to harm other enemies as they return.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createMelee() ],
			target: 'One creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '9 + A damage; push 5; I < [weak], dazed (save ends)',
						tier2: '13 + A damage; push 7;  I < [average], dazed (save ends)',
						tier3: '18 + A damage; push 10; I < [strong], dazed (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The target and each creature or object they collide with from this forced movement takes psychic damage equal to the total number of squares the target was force moved. While the target is dazed this way, they see glimpses of creatures from other parts of the timescape.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-27',
			name: 'Scalar Assault',
			description: 'You warp reality to grow a limb for just a moment and make a single devastating attack.',
			type: FactoryLogic.type.createMain(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
			target: 'Each enemy in the area',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Agility ],
						tier1: '12 psychic damage; push 3',
						tier2: '17 psychic damage; push 5',
						tier3: '23 psychic damage; push 7'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'null-ability-28',
			name: 'Synaptic Anchor',
			description: 'You disrupt an enemy’s strike and create a feedback loop in their mind, preventing them from focusing on future attacks.',
			type: FactoryLogic.type.createTrigger('The target takes damage from another creature’s ability while in the area of your Null Field ability', { free: true }),
			keywords: [ AbilityKeyword.Psionic ],
			distance: [ FactoryLogic.distance.createSpecial('Self; see below') ],
			target: 'Self or one creature',
			cost: 11,
			sections: [
				FactoryLogic.createAbilitySectionText('The target takes half the damage, and if the triggering creature has I < [average], they are dazed (save ends). While the triggering creature is dazed this way, they take psychic damage equal to your Intuition score whenever they use a main action.')
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
