import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const shadow: HeroClass = {
	id: 'class-shadow',
	name: 'Shadow',
	description: 'Subtlety is your art, the tip of the blade your brush. You studied at a secret college, specializing in alchemy, illusion, or shadow-magics. Your training and knowledge places you among the elite assassins, spies, and commandos. But more powerful than any weapon or sorcery is your insight into your enemy’s weakness.',
	heroicResource: 'Insight',
	subclassName: 'Shadow College',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Agility, Characteristic.Presence ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'shadow-stamina',
					field: FeatureField.Stamina,
					value: 18,
					valuePerLevel: 8
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'shadow-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'shadow-1-1',
					skill: 'Hide'
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'shadow-1-2',
					skill: 'Sneak'
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'shadow-1-3',
					options: [ 'Criminal Underworld' ],
					listOptions: [ SkillList.Exploration, SkillList.Interpersonal, SkillList.Intrigue ],
					count: 5
				}),
				FeatureLogic.feature.createFeature({
					id: 'shadow-1-4',
					name: 'Insight',
					description: 'At the start of each of your turns during combat, you gain 2 insight. You gain 1 insight whenever you get a tier 3 result with an attack.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'shadow-1-5',
						name: 'Hesitation Is Weakness',
						description: 'Waiting for your enemies to act was never your style.',
						type: AbilityLogic.type.createTrigger('Another hero ends their turn.', true),
						distance: [ AbilityLogic.distance.createSelf() ],
						target: 'Self',
						cost: 1,
						effect: 'You take your turn immediately.'
					})
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'shadow-1-5.5'
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'shadow-1-6',
					cost: 0
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'shadow-1-7',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'shadow-1-8',
					cost: 5
				})
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'shadow-ability-1',
			name: 'Distracting Pain',
			description: 'Your precise strikes let your allies take advantage of a target’s agony.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1),
				AbilityLogic.distance.createRanged(3)
			],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '8 damage; the next attack against the target gains an edge',
				tier3: '12 damage; the target falls prone'
			})
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-2',
			name: 'I Work Better Alone',
			description: 'Facing an enemy alone lets you exploit their overconfidence.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1),
				AbilityLogic.distance.createRanged(3)
			],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage'
			}),
			effect: ' If the target has no allies adjacent to them, you gain an edge on the attack.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-3',
			name: 'Shot And Step',
			description: 'Being fast on your feet makes your ranged attacks especially deadly.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '7 damage',
				tier3: '10 damage'
			}),
			effect: 'You can shift 1 square before or after the attack.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-4',
			name: 'Sucker Slice',
			description: 'Keeping an enemy’s focus on you lets your ally hit hard.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1)
			],
			target: '1 creature',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '8 damage',
				tier3: '12 damage'
			}),
			effect: 'If you are flanking the target when you make this attack, one ally who is flanking with you has a double edge on melee attacks against the target until the end of the ally’s next turn, even if they are no longer flanking the target.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-5',
			name: 'Blade Dance',
			description: 'As you move across the battlefield, every foe within reach feels your wrath.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'You move up to your speed, and that movement doesn’t provoke opportunity attacks. You make one power roll that targets each enemy who becomes adjacent to you during the move.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '3 damage',
				tier2: '4 damage',
				tier3: '7 damage'
			})
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-6',
			name: 'Quick Pursuit',
			description: 'A foe forced away from you might assume they’re out of danger, but they’ll soon learn otherwise.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1)
			],
			target: '1 creature',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 damage; slide 2',
				tier2: '9 damage; slide 3',
				tier3: '14 damage; slide 5'
			}),
			effect: 'You can shift into squares the target leaves behind when you force move them.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-7',
			name: 'Two Throats At Once',
			description: 'Striking two foes at once is second nature to you.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1),
				AbilityLogic.distance.createRanged(5)
			],
			target: '2 creatures or objects',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '4 damage',
				tier2: '6 damage',
				tier3: '9 damage'
			})
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-8',
			name: 'Wounding Strike',
			description: 'You leave your foe bleeding out after a devastating attack.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1),
				AbilityLogic.distance.createRanged(3)
			],
			target: '1 creature',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '6 damage',
				tier2: '9 damage; bleeding until a creature uses a maneuver to staunch the wound',
				tier3: '14 damage; bleeding until a creature uses a maneuver to staunch the wound'
			}),
			effect: 'While bleeding, the target takes 4 damage at the start of each of your turns.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-9',
			name: 'Assassinate',
			description: 'You seize the perfect moment and strike with fatal precision!',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1)
			],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '2d6 + 8 damage',
				tier2: '2d6 + 12 damage',
				tier3: '2d6 + 18 damage'
			})
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-10',
			name: 'Get In, Get Out',
			description: 'Move unexpectedly, strike fast, and be gone!',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createReach(1)
			],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '7 damage',
				tier2: '11 damage',
				tier3: '17 damage'
			}),
			effect: 'You can move up to your speed, and that movement doesn’t provoke opportunity attacks. You can move before or after your attack, or can split your movement before and after your attack.'
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-11',
			name: 'Impairing Shot',
			description: 'Your attack leaves a foe in the perfect position for your allies to finish them.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Agility ],
				tier1: '7 damage; attacks against the target gain an edge (EoT)',
				tier2: '11 damage; attacks against the target gain an edge (EoT)',
				tier3: '17 damage; attacks against the target have a double edge (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'shadow-ability-12',
			name: 'Quickness',
			description: 'You put on a burst of magical speed to get the job done.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Magic ],
			distance: [ AbilityLogic.distance.createSelf() ],
			target: 'Self',
			cost: 5,
			effect: 'You make two signature attacks that each deal extra damage equal to twice your Agility.'
		})
	],
	subclasses: [
		{
			id: 'shadow-sub-1',
			name: 'College of Black Ash',
			description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'shadow-sub-1-1-1',
							skill: 'Magic'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-1-1-2',
								name: 'Black Ash Teleport',
								description: 'In a swirl of black ash, you step from one place to another.',
								type: AbilityLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You teleport up to 5 squares. If you end this movement in concealment or cover, you can use the Hide maneuver even if you are observed.',
								spend: [
									{
										effect: 'You teleport 1 additional square for each insight spent.'
									}
								]
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-1-1-3',
								name: 'In All This Confusion',
								description: 'You teleport away in a plume of black smoke to avoid danger.',
								type: AbilityLogic.type.createTrigger('You take damage.'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You teleport up to 4 squares, halve the triggering damage, and don’t suffer any effect associated with the damage.'
							})
						})
					]
				}
			],
			selected: false
		},
		{
			id: 'shadow-sub-2',
			name: 'College of Caustic Alchemy',
			description: 'The College of Caustic Alchemy teaches its students recipes for the acids, bombs, and poisons used in their grim work. Graduates of the college are exceptional assassins.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'shadow-sub-2-1-1',
							skill: 'Alchemy'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-2-1-2',
								name: 'Coat The Blade',
								description: 'Just a little poison goes a long way.',
								type: AbilityLogic.type.createManeuver(),
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You coat one of your weapons with a harmful poison. The next creature you damage with an ability that uses that weapon takes extra poison damage equal to twice your Presence score or the target is weakened (EoT). You choose the effect when you apply the poison. The poison loses its potency after you damage the creature or at the end of the encounter.',
								spend: [
									{
										effect: 'For each insight you spend, the damage dealt by the poison increases by a number equal to your Presence score. You can’t spend more Insight than your shadow level on this ability.'
									}
								]
							})
						}),
						FeatureLogic.feature.createFeature({
							id: 'shadow-sub-2-1-3',
							name: 'Smoke Bomb',
							description: 'You always carry a supply of smoke bombs to make it easy for you to distract and get away from foes. You can use the Hide maneuver even if you are observed and don’t start in cover or concealment. If you do, you can shift a number of squares equal to your Agility. If you end this movement in cover or concealment, you are hidden.'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-2-1-4',
								name: 'Defensive Roll',
								description: '',
								type: AbilityLogic.type.createTrigger('Another creature damages you.'),
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'You shift up to 2 squares, halve the triggering damage, and don’t suffer any effect associated with the damage. If you end this movement with concealment or cover, you can use the Hide maneuver even if you are observed.',
								spend: [
									{
										value: 1,
										effect: 'If the triggering damage was from an attack, you also reduce the attack’s damage by one tier.'
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
			id: 'shadow-sub-3',
			name: 'College of the Harlequin Mask',
			description: 'Graduates of the College of the Harlequin Mask learn illusion magic, which they use to infiltrate enemy strongholds and create orchestrated chaos in combat.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillFeature({
							id: 'shadow-sub-3-1-1',
							skill: 'Lie'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-3-1-2',
								name: 'I’m On Your Side',
								description: 'Taking on the illusory countenance of another creature gives you an advantage on subterfuge.',
								type: AbilityLogic.type.createManeuver(),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								effect: 'Choose a creature of your size, whose size is no more than 1 greater than yours, and who is within 10 squares of you. Your body is covered in an illusion that makes you appear to be that creature. This illusion covers your entire body, including clothing and armor, and changes your voice to sound like the creature. While this illusion lasts, you gain an edge on attacks against and Presence tests made to interact with the creature’s allies, and you don’t provoke opportunity attacks from those allies. These benefits don’t apply against the creature whose appearance you’ve taken on. The illusion ends when you harm another creature, when you and another creature physically interact, when you use this ability again, or when you end the illusion (no action required).'
							})
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'shadow-sub-3-1-3',
								name: 'Misdirection',
								description: 'You sow a moment of confusion in combat, to your enemy’s peril.',
								type: AbilityLogic.type.createTrigger('An enemy attacks you.'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ AbilityLogic.distance.createSelf() ],
								target: 'Self',
								cost: 1,
								effect: 'Choose an enemy within distance of the attack. The attack targets that enemy instead.'
							})
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
