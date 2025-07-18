import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { HeroClass } from '../../../models/class';
import { PerkList } from '../../../enums/perk-list';
import { SkillList } from '../../../enums/skill-list';
import { insurgent } from './insurgent';
import { mastermind } from './mastermind';
import { vanguard } from './vanguard';

export const tactician: HeroClass = {
	id: 'class-tactician',
	name: 'Tactician',
	description: `
Strategist. Defender. Leader. With sword in hand, you lead allies into the maw of battle, barking out commands that inspire your fellow heroes to move faster and strike more precisely. All the while, you stand between your compatriots and death, taunting the followers of evil to best you if they can.

As a tactician, you have abilities that heal your allies and grant them increased damage, movement, and attacks.`,
	subclassName: 'Tactical Doctrine',
	subclassCount: 1,
	primaryCharacteristicsOptions: [
		[ Characteristic.Might, Characteristic.Reason ]
	],
	primaryCharacteristics: [],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createBonus({
					id: 'tatician-stamina',
					field: FeatureField.Stamina,
					value: 21,
					valuePerLevel: 12
				}),
				FactoryLogic.feature.createBonus({
					id: 'tactician-recoveries',
					field: FeatureField.Recoveries,
					value: 10
				}),
				FactoryLogic.feature.createHeroicResource({
					id: 'tactician-resource',
					name: 'Focus',
					gains: [
						{
							trigger: 'Start of your turn',
							value: '2'
						},
						{
							trigger: 'The first time each round that you or an ally damages a target you have marked',
							value: '1'
						},
						{
							trigger: 'The first time in a round that an ally within 10 squares of you uses a heroic ability',
							value: '1'
						}
					]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Lead' ]
				}),
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-1-2',
					options: [ 'Alertness', 'Architecture', 'Blacksmithing', 'Brag', 'Culture', 'Empathize', 'Fletching', 'Mechanics', 'Monsters', 'Search', 'Strategy' ],
					listOptions: [ SkillList.Exploration ],
					count: 2
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'tactician-1-4',
					name: 'Field Arsenal',
					count: 2
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-1-5',
						name: 'Mark',
						description: 'You draw your allies’ attention to a specific foe - with devastating effect.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText(`
The target is marked by you until the end of the encounter, you die, you use this ability again, or you willingly end this effect (no action required). If another tactician marks the target, then your mark on the target ends. You can have one target marked this way, but other tactician abilities can allow you to have multiple marked creatures.

While the target is marked and within your line of effect, you and allies within your line of effect have an edge on power rolls made against the target.

When the marked creature is reduced to 0 Stamina, you can use a free triggered action to move the mark to a new target within 10 squares.

In addition, you can spend 1 focus to take one of the following free triggered actions whenever you or an ally damages a target with an ability. You can’t use more than one instance of a benefit per trigger:

* The ability deals additional damage equal to twice your Reason score.
* The damage dealer can spend a Recovery.
* The damage dealer can shift up to a number of squares equal to your Reason score.`)
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-1-6',
						name: 'Strike Now!',
						description: 'Your foe left an opening. You point this out to an ally!',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target can make a signature attack as a free triggered action.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 5,
								effect: 'You target two allies instead of one.'
							})
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-1-7',
					cost: 3
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-1-8',
					cost: 5
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'tactician-2-1',
					lists: [ PerkList.Exploration, PerkList.Interpersonal, PerkList.Intrigue ]
				})
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-3-1',
						name: 'Out of Position',
						description: 'You are prepared for all eventualities.',
						type: FactoryLogic.type.createTrigger('At the start of an encounter', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You use your Mark ability against an enemy you have line of effect to, even if you are surprised. You can then immediately slide the marked target up to 3 squares, ignoring their stability. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect.')
						]
					})
				}),
				FactoryLogic.feature.createClassAbilityChoice({
					id: 'tactician-3-2',
					cost: 7
				})
			]
		}
	],
	abilities: [
		FactoryLogic.createAbility({
			id: 'tactician-ability-1',
			name: 'Battle Cry',
			description: 'You shout a phrase that galvanizes your team.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Three allies',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Reason ],
						tier1: 'the target gains one surge',
						tier2: 'the target gains two surges',
						tier3: 'the target gains three surges'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-2',
			name: 'Concussive Strike',
			description: 'Your precise strike leaves your foe struggling to respond.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; M < [weak], dazed (save ends)',
						tier2: '5 + M damage; M < [average], dazed (save ends)',
						tier3: '8 + M damage; M < [strong], dazed (save ends)'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-3',
			name: 'Inspiring Strike',
			description: 'Your attack gives an ally hope.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '3 + M damage; you or one ally within 10 squares can spend a Recovery',
						tier2: '5 + M damage; you or one ally within 10 squares can spend a Recovery',
						tier3: '8 + M damage; you or one ally within 10 squares can spend a Recovery, and each of you gains an edge on the next ability power roll they make in the encounter'
					})
				)
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-4',
			name: 'Squad! Forward!',
			description: 'On your command, you and your allies force back the enemy line.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: 'Self and two allies',
			cost: 3,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can move their speed.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-5',
			name: 'Hammer And Anvil',
			description: '“Let’s not argue about who’s the hammer and who’s the anvil!',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: '1 creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '5 + M damage; one ally within 10 squares can make a signature strike against the target as a free triggered action',
						tier2: '9 + M damage; one ally within 10 squares can make a signature strike that gains an edge against the target as a free triggered action',
						tier3: '12 + M damage; two allies within 10 squares can each make a signature strike that gains an edge against the target as free triggered actions'
					})
				),
				FactoryLogic.createAbilitySectionText('If the target is reduced to 0 Stamina and a strike granted by this ability hasn’t been made, the striker can pick a different target.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-6',
			name: 'The Mind Game',
			description: 'Your attack demoralizes your foe. Your allies begin to think you can win.',
			type: FactoryLogic.type.createAction(),
			keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
			distance: [
				FactoryLogic.distance.createMelee(),
				FactoryLogic.distance.createRanged(5)
			],
			target: 'One creature or object',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('You mark the target.'),
				FactoryLogic.createAbilitySectionRoll(
					FactoryLogic.createPowerRoll({
						characteristic: [ Characteristic.Might ],
						tier1: '4 + M damage; R < [weak], weakened (save ends)',
						tier2: '6 + M damage; R < [average], weakened (save ends)',
						tier3: '10 + M damage; R < [strong], weakened (save ends)'
					})
				),
				FactoryLogic.createAbilitySectionText('The first time any ally deals damage any target you’ve marked before the start of your next turn, that ally can spend a Recovery.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-7',
			name: 'Now!',
			description: 'Your allies wait for your command - then unleash death!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
			distance: [ FactoryLogic.distance.createRanged(5) ],
			target: 'Three allies',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target can make a free strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-8',
			name: 'This Is What We Planned For',
			description: 'All those coordination drills you made them do finally pay off.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [ AbilityKeyword.Ranged ],
			distance: [ FactoryLogic.distance.createRanged(10) ],
			target: '2 allies',
			cost: 5,
			sections: [
				FactoryLogic.createAbilitySectionText('Each target who hasn’t acted yet this round can take their turn in any order immediately after yours.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-9',
			name: 'Double Envelopment',
			description: 'Historians will write about this day.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, they gain two surges, which they can use immediately.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-10',
			name: 'Frontal Assault',
			description: 'The purpose of a charge is to break their morale and force a retreat.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever you or any ally deals damage a target marked by you, the damage dealer can push the target up to 2 squares, then shift up to 2 squares. Additionally, any ally using the Charge action to attack a target marked by you can use a signature or heroic ability in place of a melee free strike.')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-11',
			name: 'Rout',
			description: 'The tide begins to turn.',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, if that target has R < [average], they are frightened of the damage dealer (save ends).')
			]
		}),
		FactoryLogic.createAbility({
			id: 'tactician-ability-12',
			name: 'Stay Strong and Focus',
			description: 'We can do this! Keep faith and hold fast!',
			type: FactoryLogic.type.createManeuver(),
			keywords: [],
			distance: [ FactoryLogic.distance.createSelf() ],
			target: 'Self',
			cost: 7,
			sections: [
				FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever you or any ally deals damage to a target marked by you, the damage dealer can spend a Recovery.')
			]
		})
	],
	subclasses: [
		insurgent,
		mastermind,
		vanguard
	],
	level: 1,
	characteristics: []
};
