import { AbilityKeyword } from '../../enums/ability-keyword';
import { AbilityLogic } from '../../logic/ability-logic';
import { Characteristic } from '../../enums/characteristic';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';
import { HeroClass } from '../../models/class';
import { KitType } from '../../enums/kit';
import { SkillList } from '../../enums/skill-list';

export const tactician: HeroClass = {
	id: 'class-tactician',
	name: 'Tactician',
	description: 'Strategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.',
	heroicResource: 'Focus',
	subclassName: 'Tactical Doctrine',
	subclassCount: 1,
	primaryCharacteristics: [ Characteristic.Might, Characteristic.Reason ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FeatureLogic.feature.createBonusFeature({
					id: 'tatician-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 10
				}),
				FeatureLogic.feature.createBonusFeature({
					id: 'tactician-recoveries',
					field: FeatureField.Recoveries,
					value: 12
				}),
				FeatureLogic.feature.createSkillFeature({
					id: 'tactician-1-1',
					skill: 'Lead'
				}),
				FeatureLogic.feature.createSkillChoiceFeature({
					id: 'tactician-1-2',
					options: [ 'Alertness', 'Architecture', 'Blacksmithing', 'Brag', 'Culture', 'Empathize', 'Fletching', 'History', 'Mechanics', 'Monsters', 'Search' ],
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FeatureLogic.feature.createFeature({
					id: 'tactician-1-3',
					name: 'Focus',
					description: 'At the start of each of your turns during combat, you gain 2 focus. If an ally gets a tier 3 result on an attack against a target you have marked, you gain 1 focus.'
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'tactician-1-4',
						name: 'Mark',
						description: 'You draw your allies’ attention to a specific foe — with devastating effect.',
						type: AbilityLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: '1 creature',
						effect: 'The target is marked by you until the start of your next turn. When attacking a marked target, you and each of your allies gains an edge on power rolls and deals extra damage equal to your Reason score.',
						spend: [
							{
								value: 1,
								effect: 'You mark 1 additional creature within distance.'
							}
						]
					})
				}),
				FeatureLogic.feature.createAbilityFeature({
					ability: AbilityLogic.createAbility({
						id: 'tactician-1-5',
						name: 'Sieze The Opening',
						description: 'As the battle unfolds, you tell your allies exactly when to strike!',
						type: AbilityLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ AbilityLogic.distance.createRanged(10) ],
						target: '1 ally',
						effect: 'The target makes a signature attack as a free triggered action, and deals extra damage equal to your Reason score.',
						spend: [
							{
								value: 5,
								effect: 'You target two allies instead of one.'
							}
						]
					})
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'tactician-1-6a'
				}),
				FeatureLogic.feature.createKitChoiceFeature({
					id: 'tactician-1-6b',
					name: 'Field Arsenal',
					types: [ KitType.Standard ]
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'tactician-1-7',
					cost: 3
				}),
				FeatureLogic.feature.createClassAbilityChoiceFeature({
					id: 'tactician-1-8',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: []
		},
		{
			level: 3,
			features: []
		}
	],
	abilities: [
		AbilityLogic.createAbility({
			id: 'tactician-ability-1',
			name: 'Battle Cry',
			description: 'Hearing your shout of triumph fills your allies with combat fervor.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: 'Up to 3 allies',
			cost: 3,
			effect: 'Each target gains an edge on the next attack or resistance roll they make before the end of the encounter.'
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-2',
			name: 'Dazing Blow',
			description: 'Your precise strike leaves your foe struggling to respond.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createMelee(1),
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; slowed (EoT)',
				tier2: '8 damage; dazed (EoT)',
				tier3: '13 damage; dazed (EoE)'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-3',
			name: 'Inspiring Strike',
			description: 'You hit a foe so hard that it gets your allies back in the fight.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createMelee(1),
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '6 damage; you or an ally within 10 can spend a Recovery',
				tier2: '8 damage; you or an ally within 10 can spend a Recovery',
				tier3: '13 damage; you or an ally within 10 can spend a Recovery, and each of you gains an edge on the next attack they make this encounter'
			})
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-4',
			name: 'Phalanx Forward!',
			description: 'On your command, you and your allies force back the enemy line.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: 'Self and all allies',
			cost: 3,
			effect: 'Each target can move their speed, push an adjacent enemy 1 square at the end of that move, and shift 1 square into the square the enemy left.'
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-5',
			name: 'Hammer And Anvil',
			description: 'Your attack is your allies’ signal to strike!',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createMelee(1),
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; an ally within 10 can make a signature attack against the target as a free triggered action',
				tier2: '10 damage; an ally within 10 can make a signature attack with an edge against the target as a free triggered action',
				tier3: '16 damage; two allies within 10 can each make a signature attack with an edge against the target as a free triggered action'
			}),
			effect: 'If an attack is left to be resolved and the target was reduced to 0 Stamina, the attacker can pick a different target.'
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-6',
			name: 'Now!',
			description: 'Your allies wait for your command—then unleash death!',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(5) ],
			target: 'All allies',
			cost: 5,
			effect: 'Each target can make a free strike.'
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-7',
			name: 'Their Weakness Is Our Strength',
			description: 'Leaving your foe struggling gives your allies a strategic opening.',
			type: AbilityLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				AbilityLogic.distance.createMelee(1),
				AbilityLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 5,
			powerRoll: AbilityLogic.createPowerRoll({
				characteristic: [ Characteristic.Might ],
				tier1: '7 damage; weakened (EoT)',
				tier2: '10 damage; weakened (EoT)',
				tier3: '16 damage; weakened (EoE)'
			}),
			effect: 'The target is marked (EoE). Each of your allies can spend a Recovery the first time they attack any target you’ve marked before the start of your next turn.'
		}),
		AbilityLogic.createAbility({
			id: 'tactician-ability-8',
			name: 'This Is What We Planned For',
			description: 'A quick signal from you gives your allies a chance to turn the tide of battle.',
			type: AbilityLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ AbilityLogic.distance.createRanged(10) ],
			target: '2 allies',
			cost: 5,
			effect: 'Each target who hasn’t acted yet this round can take their turn in any order immediately after yours.'
		})
	],
	subclasses: [
		{
			id: 'tactician-sub-1',
			name: 'Insurgent',
			description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. By contrast, you’ll do whatever it takes to keep your allies alive.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillChoiceFeature({
							id: 'tactician-sub-1-1-1',
							listOptions: [ SkillList.Intrigue ]
						}),
						FeatureLogic.feature.createFeature({
							id: 'tactician-sub-1-1-2',
							name: 'Covert Operations',
							description: 'While in your presence or working according to your plans, each of your allies gains an edge on tests with any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist on any test made with a skill from the intrigue skill group. At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of negotiation.'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-1-1-3',
								name: 'Flank Them Now!',
								description: 'You help keep your side in motion as attacks rain down on your foes.',
								type: AbilityLogic.type.createTrigger('A nontarget ally is about to make an attack.'),
								keywords: [ AbilityKeyword.Ranged ],
								distance: [
									AbilityLogic.distance.createSelf(),
									AbilityLogic.distance.createRanged(10)
								],
								target: 'You or an ally',
								effect: 'The target can shift up to 2 squares before the attack resolves. After the attack resolves, both the original attacker and the target can shift up to 2 squares.',
								spend: [
									{
										value: 1,
										effect: 'The attack deals an extra 1d6 damage.'
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
						FeatureLogic.feature.createSkillChoiceFeature({
							id: 'tactician-sub-2-1-1',
							listOptions: [ SkillList.Lore ]
						}),
						FeatureLogic.feature.createFeature({
							id: 'tactician-sub-2-1-2',
							name: 'I Read Your Book!',
							description: `
Your encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are with them, any hero treats the Discover Lore project as one category cheaper, with projects seeking common lore becoming free.

Additionally, if you have a reasonable amount of time before a combat encounter or negotiation, and you have at least one clue or rumor regarding the encounter, you can make a Reason test as a Respite activity.

The following test results apply to a combat encounter:

| Roll    | Effect                                                                         |
|:--------|:-------------------------------------------------------------------------------|
| 11 -    | The Director tells you the number of creatures in the encounter.               |
| 12 - 16 | The Director tells you the number and level of the creatures in the encounter. |
| 17 +    | As 12-16 and when the encounter begins, all enemies are surprised.             |

The following test results apply to a negotiation:

| Roll    | Effect                                                                                                                       |
|:--------|:-----------------------------------------------------------------------------------------------------------------------------|
| 11 -    | The Director tells you three different motivations, one of which is one of the NPC’s motivations, and the other two are not. |
| 12 - 16 | The Director tells you one of the NPC’s motivations.                                                                         |
| 17 +    | As 12-16 and you and your allies gain an edge on tests made to influence NPCs during the negotiation.                        |

You can only make this test once for each encounter and negotiation.`
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-2-1-3',
								name: 'Overwatch',
								description: 'Under your direction, an ally waits for just the right moment to strike.',
								type: AbilityLogic.type.createTrigger('The target moves.'),
								keywords: [ AbilityKeyword.Ranged ],
								distance: [ AbilityLogic.distance.createRanged(10) ],
								target: '1 enemy',
								effect: 'At any point during the target’s movement, one ally can make a free strike against the target.',
								spend: [
									{
										value: 1,
										effect: 'The target’s speed becomes 0 (EoT).'
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
			name: 'Vanguard',
			description: 'You have learned the tactics and stratagems of the heroes of ancient history, letting you lead from the front lines of battle and seek victory through sheer force of will and personality.',
			featuresByLevel: [
				{
					level: 1,
					features: [
						FeatureLogic.feature.createSkillChoiceFeature({
							id: 'tactician-sub-3-1-1',
							listOptions: [ SkillList.Interpersonal ]
						}),
						FeatureLogic.feature.createFeature({
							id: 'tactician-sub-3-1-2',
							name: 'Imposing Attitude',
							description: 'You command any room you walk into. While you are present, each hero with you is treated as having a Renown 2 higher than usual for the purpose of negotiations and influencing tests. Additionally, each hero with you has a double edge on tests made to stop combat and start a negotiation with the other side.'
						}),
						FeatureLogic.feature.createAbilityFeature({
							ability: AbilityLogic.createAbility({
								id: 'tactician-sub-3-1-3',
								name: 'Parry',
								description: 'Your quick reflexes cost an enemy the precision they seek.',
								type: AbilityLogic.type.createTrigger('A creature makes a Weapon attack against the target.'),
								keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
								distance: [
									AbilityLogic.distance.createSelf(),
									AbilityLogic.distance.createMelee(1)
								],
								target: 'Self or 1 ally',
								effect: 'The attack’s damage against the target is halved.',
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
		}
	],
	level: 1,
	characteristics: []
};
