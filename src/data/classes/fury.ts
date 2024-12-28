import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { KitType } from '../../enums/kit';
import { SkillList } from '../../enums/skill-list';

export const fury: HeroClass = {
	id: 'class-fury',
	name: 'Fury',
	description: 'You do not temper the heat of battle within you, you unleash it! Like a raptor, a panther, a wolf, your experience in the wild taught you the secret of channeling unfettered anger into martial prowess. Primordial chaos is your ally. Leave it to others to use finesse to clean up the pieces you leave behind.',
	heroicResource: 'Rage',
	subclassName: 'Primordial Aspect',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Might, Characteristic.Agility ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'fury-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 10
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'fury-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'fury-1-1',
					skill: 'Nature'
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'fury-1-2',
					listOptions: [ SkillList.Exploration, SkillList.Intrigue ],
					count: 2
				}),
				FeatureLogic.feature.createFeature({
					id: 'fury-1-3',
					name: 'Rage',
					description: 'At the start of each of your turns during combat, you gain 1d3 rage.'
				}),
				FeatureLogic.feature.createFeature({
					id: 'fury-1-4',
					name: 'Mighty Leaps',
					description: 'You always succeed on Might tests made to jump. You can still roll to see if you get a reward result.'
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'fury-1-4.5'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'fury-1-5',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'fury-1-6',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'fury-1-7',
					cost: 5
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'fury-ability-1',
			name: 'Brutal Slam',
			description: 'The heavy impact of your weapon attacks drives your foes ever backward.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; push 1',
				tier2: '8 damage; push 2',
				tier3: '12 damage; push 4'
			})
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-2',
			name: 'Hit And Run',
			description: 'Keeping in constant motion helps you slip out of reach after a brutal assault.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage; slowed (EoT)'
			}),
			effect: 'You can shift 1 square after the attack is resolved.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-3',
			name: 'Humiliating Strike',
			description: 'You hit with a strength that’s worth the risk of raising your opponent’s ire.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage'
			}),
			effect: 'You can choose to do an extra 1d6 damage to the target. If you do, the target gains an edge on their next attack against you.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-4',
			name: 'Impaling Strike',
			description: 'Fighting up close lets you keep your foe exactly where you want them.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature of your size or smaller',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; slowed (EoT)',
				tier2: '8 damage; grabbed',
				tier3: '12 damage; grabbed'
			}),
			effect: 'If the target is grabbed, they take a bane on attempts to escape the grab. If you move while you have the target grabbed, they take 1 damage for each square you move.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-5',
			name: 'Death Before Beauty',
			description: 'Your enemies will get out of your way—whether they want to or not.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage; slide 2',
				tier2: '5 damage; slide 3',
				tier3: '8 damage; slide 5'
			}),
			effect: 'When you force move the target, you can move into squares they leave. The target takes the damage from any free strikes you provoke with this movement.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-6',
			name: 'Stab Me So I Can Pull Myself Closer To You',
			description: 'When you barrel through your foes, they feel your wrath.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'Move up to your speed in a straight line toward a creature or object. You don’t treat enemy creatures as difficult terrain for this move. If the target is a creature, you can end your movement in the target’s square, moving them to an adjacent open square. Make a power roll against the target and every enemy you moved through.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '5 damage',
				tier2: '6 damage',
				tier3: '9 damage'
			}),
			effect: 'The target takes an extra 1d6 damage for every free strike you triggered from your move.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-7',
			name: 'Whirlwind Strike',
			description: 'As your foes close in around you, why bother taking them on one by one?',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Burst, value: 1 }) ],
			target: 'All enemies',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '3 damage',
				tier2: '4 damage; push 1',
				tier3: '7 damage; push 3'
			})
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-8',
			name: 'Your Entrails Are Your Extrails!',
			description: 'Unless they get some help, your foe is finished.',
			cost: 3,
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; slowed (EoT)',
				tier2: '9 damage; slowed (EoT)',
				tier3: '14 damage; slowed (EoE)'
			}),
			effect: 'While slowed in this way, the target takes an extra 3 damage at the start of each of your turns.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-9',
			name: 'Blood For Blood!',
			description: 'A mighty strike leaves your foe reeling.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; weakened and bleeding (EoT)',
				tier2: '11 damage; weakened and bleeding (EoT)',
				tier3: '17 damage; weakened and bleeding (EoE)'
			}),
			effect: 'You can choose to deal 1d6 damage to yourself to deal an extra 2d6 damage to the target.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-10',
			name: 'Brute Precision',
			description: 'You can always trust to your anger to get the job done.',
			type: AbilityLogic.type.createManeuver(true),
			keywords: [],
			distance: [ AbilityLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'The next attack you make this turn automatically achieves a tier 3 result and deals an extra 1d6 damage.'
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-11',
			name: 'Dying Blow',
			description: 'You focus your rage into a single devastating strike.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createMelee(1) ],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '9 damage',
				tier2: '13 damage',
				tier3: '21 damage'
			}),
			spend: [
				{
					effect: 'If you are winded, you can add 1d6 damage for each rage spent. If you are dying, you can add 1d10 damage for each rage spent. In either case, you then lose 1d6 Stamina.'
				}
			]
		}),
		AbilityLogic.createAbility({
			id: 'fury-ability-12',
			name: 'Primordial Shockwave',
			description: 'The destructive power of nature cannot be contained.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Area, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.create({ type: AbilityDistanceType.Line, value: 5, value2: 1, within: 1 }) ],
			target: 'All enemies',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '4 damage; push 2',
				tier2: '5 damage; push 4',
				tier3: '8 damage; push 6'
			}),
			effect: 'Targets are pushed one at a time, starting with the target closest to you.'
		})
	],
	subclasses: [
		{
			id: 'fury-sub-1',
			name: 'Berserker',
			description: 'You channel your rage into expressions of physical might, acting as a living version of the forces that reshape the world.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'fury-sub-1-1-1',
							skill: 'Lift'
						}),
						FeatureLogic.feature.createFeature({
							id: 'fury-sub-1-1-2',
							name: 'Primordial Strength',
							description: `
When you damage an object with a weapon attack, it takes an additional 5 damage. Additionally, whenever you push another creature, you can make it a vertical push.
* **Rage 2**: You gain an edge on Might tests and resistance rolls.
* **Rage 2**: You gain a bonus to weapon damage equal to your Might score if you are at least 2 squares from where you started your turn when you attack.
* **Rage 4**: You gain a bonus to weapon damage equal to twice your Might score, instead of once your Might score, if you are at least two squares from where you started your turn when you attack.
* **Rage 6**: You have a double edge on Might tests and resistance rolls.`
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-1-1-3',
								name: 'Relentless Toss',
								description: 'The Primordial Chaos allows you to redirect kinetic energy for a monstrous smash!',
								type: AbilityLogic.type.createTrigger('The target is force moved.'),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
								distance: [
									AbilityLogic.distance.createSelf(),
									AbilityLogic.distance.createMelee(1)
								],
								target: 'Self or 1 creature',
								effect: 'You can select a new target of the same size or smaller within distance to be force moved instead. Additionally, you can increase the forced move distance by a number of squares equal to your Might score. You can use your Primordial Strength benefit to make this forced movement vertical.',
								spend: [
									{
										value: 1,
										effect: 'You can increase the forced move distance by a number of squares equal to twice your Might score instead.'
									}
								]
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'fury-sub-2',
			name: 'Reaver',
			description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'fury-sub-3-1-1',
							skill: 'Hide'
						}),
						FeatureLogic.feature.createFeature({
							id: 'fury-sub-2-1-2',
							name: 'Primordial Cunning',
							description: `
You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.
* **Rage 2**: You gain an edge on Agility tests and resistance rolls.
* **Rage 2**: Once per turn, when you slide a target or when you move adjacent to a target during a shift, you can deal weapon damage to the target equal to your Agility score.
* **Rage 4**: Once per turn, when you slide a target or when you move adjacent to a target during a shift, you can deal weapon damage to the target equal to twice your Agility score, instead of once your Agility score.
* **Rage 6**: You have a double edge on Agility tests and resistance rolls.`
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-2-1-3',
								name: 'Uncanny Dodge',
								description: 'When a damaging effect surrounds you, you stay two steps ahead.',
								type: AbilityLogic.type.createTrigger('You are targeted by a damaging area of effect.'),
								keywords: [ AbilityKeyword.Melee ],
								distance: [ AbilityLogic.distance.createMelee(1) ],
								target: 'Self',
								effect: 'You shift up to 2 squares. If that moves you out of the area of effect, you ignore the attack. Otherwise, you take half damage.',
								spend: [
									{
										value: 1,
										effect: 'You move a willing adjacent ally affected by the attack with you, applying the same outcome to them.'
									}
								]
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'fury-sub-3',
			name: 'Stormwight',
			description: 'You channel your rage into the form of animals and primordial storms.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'fury-sub-3-1-1',
							skill: 'Track'
						}),
						FeatureLogic.feature.createFeature({
							id: 'fury-sub-3-1-2',
							name: 'Relentless Hunter',
							description: 'You gain an edge on tests that use the Track skill.'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-3-1-3',
								name: 'Regeneration',
								description: 'Your transformative abilities bring you back into the fight.',
								type: AbilityLogic.type.createTrigger('You lose Stamina and are not dying.'),
								keywords: [ AbilityKeyword.Melee ],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'After damage is resolved, if your rage is high enough, you can enter your animal or hybrid form as a free triggered action. If you can’t gain the temporary Stamina from that form because you have already done so this encounter, you gain temporary Stamina equal to your Might.',
								spend: [
									{
										value: 1,
										effect: 'If you are not dying, you can spend a Recovery.'
									}
								]
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'fury-sub-3-1-4',
								name: 'Animal Form',
								description: 'You take on the form of the animal who channels your rage.',
								type: AbilityLogic.type.createManeuver(),
								keywords: [],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You can shapeshift into the animal defined by your stormwight kit or back into your true form. While in animal form, you can’t use signature abilities or heroic abilities unless they have the Animal keyword. Additionally, you can both speak normally and speak to animals who share your form. If negotiation with an animal comes into play, you treat your Renown as 2 higher than usual while in your animal form.',
								spend: [
									{
										value: 1,
										effect: 'As a free maneuver on your turn, you can shapeshift a second time, either into another animal form or back into your true form.'
									}
								]
							})
						}),
						FeatureLogic.feature.createKitTypeFeature({
							id: 'fury-sub-3-1-5',
							types: [ KitType.Stormwight ]
						})
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
