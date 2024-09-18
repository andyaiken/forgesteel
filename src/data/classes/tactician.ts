import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { SkillList } from '../../enums/skill-list';

export const tactician: HeroClass = {
	id: 'class-tactician',
	name: 'Tactician',
	description: 'Strategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can. As a tactician, you have abilities that heal your allies and grant them extra damage, movement, and attacks. You can taunt your enemies into attacking you instead of targeting your allies, and can help soak up damage when those allies stand alone.',
	heroicResource: 'Focus',
	subclassName: 'Tactical Doctrine',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Might, Characteristic.Reason ],
	startingStamina: 21,
	staminaPerLevel: 10,
	recoveries: 12,
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.createSkillFeature({
					id: 'tactician-1-1',
					name: 'Skill',
					skill: 'Lead'
				}),
				FeatureLogic.createSkillChoiceFeature({
					id: 'tactician-1-2',
					name: 'Skill',
					options: [ 'Altertness', 'Achitechture', 'Blacksmithing', 'Brag', 'Culture', 'Empathize', 'Fletching', 'History', 'Mechanics', 'Monsters', 'Search' ],
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FeatureLogic.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'tactician-1-3',
						name: 'Mark',
						description: 'You draw your allies attention to a specific doe -with devastating effect',
						type: AbilityLogic.createTypeManeuver(),
						distance: [
							AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 })
						],
						target: '1 creature',
						effect: 'The target is marked by you until the start of your next turn. When attacking a marked target you and each of your allies gain an edge on power rolls and deals extra damage equal to your Reason score.',
						spend: [
							{
								value: 1,
								effect: 'You mark 1 additional creature within distance'
							}
						]
					})
				}),
				FeatureLogic.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'tactician',
						name: 'Sieze the Opening',
						description: 'As the battle unfolds, you tell your allies exactly when to strike!',
						type: AbilityLogic.createTypeAction(),
						distance: [
							AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 })
						],
						target: '1 ally',
						effect: 'The target makes a signature attack as a free triggered action',
						spend: [
							{
								value: 5,
								effect: 'You target two allies instead of one.' 
							}
						]

					})
				}),
				// TODO
				// FeatureLogic.createAbilityFeature({
				// 	ability: AbilityLogic.createAbility({
				// 		id: 'tactician',
				// 		name: 'Field Arsenal'
				// 		description: 'You have drilled with a broad array of weapons and have developed techniques to optimize their use. Whenever you select or change your kit, you can select an additional martial kit and gain the benefits of both kits.'
				// 	})
				// }),
			]
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'tactician-ability-1',
			name: 'Battle Cry',
			description: 'Hearing your shout of triumph fills your allies with combat fervor.',
			type: AbilityLogic.createTypeManeuver(),
			keywords: [ AbilityKeyword.Ranged],
			distance: [
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 })
			],
			target: 'Up to three Allies',
			cost: 3,
			preEffect: 'Each target gains an edge on the next attack or resistance roll they make before the end of the encounter.',
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-2',
			name: 'Dazing Blow',
			description: 'Your precise strike leaves your foe struggling to respond.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistanceSelf() ],
			target: 'Self',
			cost: 3,
			preEffect: 'You move up to your speed, and that movement doesn’t pro',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; slowed (EoT)',
				tier2: '8 damage;  dazed (EoT)',
				tier3: '13 damage;  dazed (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-3',
			name: 'Inspiring Strike',
			description: 'You hit a foe so hard that it gets your allies back in the fight.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Weapon , AbilityKeyword.Ranged],
			distance: [ 
				AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }),
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 })
			],
			target: '1 Creature or Object',
			cost: 3,
			preEffect: 'You move up to your speed, and that movement doesn’t pro',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; you or an ally within 10 can spend a Recovery',
				tier2: '8 damage; you or an ally within 10 can spend a Recovery',
				tier3: '13 damage; you or an ally within 10 can spend a Recovery, and each of you gains an edge on the next attack they make this encounter'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-3',
			name: 'Phalanx Forward',
			description: 'On your command, you and your allies force back the enemy line.',
			type: AbilityLogic.createTypeManeuver(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 }) ],
			target: 'Self and all Allies',
			cost: 3,
			preEffect: 'Each target can move their speed, push an adjacent enemy 1 square at the end of that move, and shift 1 square into the square the enemy left.',
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-4',
			name: 'Hammer and Anvil',
			description: 'Your attack is your allies\' signal to strike!',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ 
				AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }),
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 })
			],
			target: '1 Creature or Object',
			cost: 5,
			preEffect: 'If an attack is left to be resolved and the target was reduce to 0 Stamina, the attacker can pick a different target.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; an ally within 10 can make a signature attack against the target as a free triggered action',
				tier2: '10 damage; an ally within 10 can make a signature attack with an edge against the target as a free triggered action',
				tier3: '16 damage; two allies within 10 can each make a signature attack with an edge against the target as a free triggered action'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-5',
			name: 'Now!',
			description: 'Your allies wait for your command—then unleash death!',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ 
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 })
			],
			target: 'All allies',
			cost: 5,
			preEffect: 'Each target can make a free strike',
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-5',
			name: 'Their Weakness is Our Strength',
			description: 'Leaving your foe struggling gives your allies\' a strategic opening.',
			type: AbilityLogic.createTypeAction(),
			keywords: [ AbilityKeyword.Attack, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ 
				AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 }),
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 5 })
			],
			target: '1 Creature or Object',
			cost: 5,
			preEffect: 'The target is marked (EoE). Each of your allies can spend a Recovery the first time they attack any target you’ve marked before the start of your next turn.',
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; weakened (EoT)',
				tier2: '10 damage; weakened (EoT)',
				tier3: '16 damage; weakened (EoT)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-6',
			name: 'This is What We Planned For',
			description: 'A quick signal from you gives your allies a chance to turn the tide of battle.',
			type: AbilityLogic.createTypeManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ 
				AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 })
			],
			target: '2 allies',
			cost: 5,
			preEffect: 'Each target who hasn\'t acted yet this round can take their turn in any order immediately after yours.',
		}),
	],
	subclasses: [
		{
			id: 'tactician-sub-1',
			name: 'Vangaurd',
			description: 'You have learned the tactics and stratagems of the heroes of ancient history, letting you lead from the front lines of battle and seek victory through sheer force of will and personality.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillChoiceFeature({
							id: 'tactician-sub-1-1-1',
							name: 'Skill',
							listOptions: [ SkillList.Interpersonal ],
							count: 1
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-1-1-2',
								name: 'Imposing Attitude',
								description: 'You command any room you walk into.',
								type: AbilityLogic.createTypeAction(),
								effect: ' While you are present, each hero with you is treated as having a Renown 2 higher than usual for the purpose of negotiations and influencing tests. Additionally, each hero with you has a double edge on tests made to stop combat and start a negotiation with the other side.',
								distance: [],
								target: 'Self or Ally'
							})
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-1-1-3',
								name: 'Parry',
								description: 'Your quick reflexes cost an enemy the precision they seek',
								type: AbilityLogic.createTypeTrigger('A create makes a Weapon attack against the target'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [
									AbilityLogic.createDistanceSelf(),
									AbilityLogic.createDistance({ type: AbilityDistanceType.Reach, value: 1 })
								],
								target: 'Self or 1 ally',
								effect: 'The attacks damage against the target is halved',
								spend: [
									{
										value: 1,
										effect: 'The result of the attack’s power roll is treated as one tier lower before the damage is halved. If the attack is a critical hit, the attacker can still take an additional action.'
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
			id: 'tactician-sub-2',
			name: 'Mastermind',
			description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board, and seeking victory by thinking multiple steps ahead of your opponents.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillChoiceFeature({
							id: 'tactician-sub-2-1-1',
							name: 'Skill',
							listOptions: [ SkillList.Lore ],
							count: 1
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-2-1-2',
								name: 'I Read Your Book',
								description: 'Just a little poison goes a long way.',
								type: AbilityLogic.createTypeManeuver(),
								distance: [ AbilityLogic.createDistanceSelf() ],
								target: 'Self',
								effect: 'You coat one of your weapons with a harmful poison. The next creature you damage with an ability that uses that weapon takes extra poison damage equal to twice your Presence score or the target is weakened (EoT). You choose the effect when you apply the poison. The poison loses its potency after you damage the creature or at the end of the encounter.',
								spend: [
									{
										effect: 'For each insight you spend, the damage dealt by the poison increases by a number equal to your Presence score. You can’t spend more Insight than your tactician level on this ability.'
									}
								]
							})
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-2-1-3',
								name: 'Overwatch',
								description: 'Under your direction, an ally waits for just the right moment to strike.',
								type: AbilityLogic.createTypeTrigger('At any point during the target’s movement, one ally can make a free strike against the target.'),
								keywords: [ AbilityKeyword.Ranged ],
								distance: [
									AbilityLogic.createDistance({ type: AbilityDistanceType.Ranged, value: 10 })
								],
								target: '1 Enemy',
								effect: 'At any point during the target’s movement, one ally can make a free strike against the target.',
								spend: [
									{
										value: 1,
										effect: 'Targets speed become 0 (EoT)'
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
			id: 'tactician-sub-3',
			name: 'Insurgent',
			description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. By contrast, you’ll do whatever it takes to keep your allies alive',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.createSkillChoiceFeature({
							id: 'tactician-sub-1-1-1',
							name: 'Skill',
							listOptions: [ SkillList.Intrigue ],
							count: 1
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-3-1-2',
								name: 'Covert Operations',
								description: '',
								target: 'Self',
								effect: 'While in your presence or working according to your plans, each of your allies gains an edge on tests with any skill from the intrigue skill group.  Additionally, you can use the Lead skill to assist on any test made with a skill from the intrigue skill group. At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of negotiation.',
								distance: [AbilityLogic.createDistanceSelf()],
								type: AbilityLogic.createTypeAction(),
							})
						}),
						FeatureLogic.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-3-1-3',
								name: 'Flank Them Now!',
								description: '',
								type: AbilityLogic.createTypeTrigger('A create makes a Weapon attack against the target'),
								keywords: [ AbilityKeyword.Magic ],
								distance: [ AbilityLogic.createDistanceSelf() ],
								target: 'Self',
								effect: ''
							})
						}),
					]
				}
			],
			selected: false
		}
	],
	level: 1,
	characteristics: []
};
