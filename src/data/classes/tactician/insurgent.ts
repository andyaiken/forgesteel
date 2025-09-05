import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const insurgent: SubClass = {
	id: 'tactician-sub-1',
	name: 'Insurgent',
	description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. You’ll do whatever it takes to keep your allies alive.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-sub-1-1-1',
					listOptions: [ SkillList.Intrigue ]
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-1-1-2',
					name: 'Covert Operations',
					description: `
While in your presence or working according to your plans, each of your allies gains an edge on tests using any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist another creature with any test made using a skill from the intrigue group.

At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of a negotiation.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-1-1-3',
						name: 'Advanced Tactics',
						description: 'Your leadership aids an ally.',
						type: FactoryLogic.type.createTrigger('The target deals damage to another creature.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target gains 2 surges, which they can use on the triggering damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If the damage has any potency effect associated with it, the potency is increased by 1.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'tactician-sub-1-2-1',
					name: 'Infiltration Tactics',
					description: 'You have trained your squad to work together, stay silent, and wait for the opportune time to strike. Whenever you or any ally within 10 squares of you becomes hidden, that creature gains 1 surge.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-1-2-2',
					name: '2nd-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-2-2a',
									name: 'Fog of War',
									description: 'Your unorthodox strategy causes enemies to lash out in fear, heedless of who they might be attacking.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Two creatures',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target is marked by you, and must immediately make a free strike against a creature of your choice within 5 squares of them.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Mark Benefit',
											effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to force that target to make a free strike against a creature of your choice within 5 squares of them.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-2-2b',
									name: 'Try Me Instead',
									description: '“Try picking on someone my size.”',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You shift up to your speed directly toward an ally, ending adjacent to them, then swapping locations with that ally as long as you can fit into each other’s spaces. The ally can spend a Recovery, and you can make the following weapon strike with a distance of melee 1 against a creature.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '2 + R damage; R < [weak], frightened (save ends)',
												tier2: '3 + R damage; R < [average], frightened (save ends)',
												tier3: '4 + R damage; R < [strong], frightened (save ends)'
											})
										)
									]
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
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'tactician-sub-1-5-1',
					name: 'Distracted',
					description: 'You have mastered the ability to distract your foes, allowing you and your allies to take advantage of their gaps in attention. Whenever you or any ally attempts to hide, any creature marked by you doesn’t count as an observer. Additionally, you and your allies can use other allies as cover for the purpose of hiding.'
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-1-5-2',
					name: 'Leave No Trace',
					description: 'You and any ally within 10 squares of you can move at full speed while sneaking. Additionally, enemies within 10 squares of you take a bane on tests made to search for you or your allies while any of you are hidden.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-1-6-1',
					name: '6th-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-6-1a',
									name: 'Coordinated Execution',
									description: 'You direct your ally to make a killing blow.',
									type: FactoryLogic.type.createTrigger('The target uses an ability to deal rolled damage to a creature while hidden.', { free: true }),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('If the target of the triggering ability is not a leader or solo creature, they are reduced to 0 Stamina. If the target of the triggering ability is a minion, the entire squad is killed. If the target of the triggering ability is a leader or solo creature, the triggering ability’s power roll automatically obtains a tier 3 outcome.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-6-1b',
									name: 'Panic in Their Lines',
									description: 'You confuse your foes, causing them to turn on each other.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(5)
									],
									target: 'Two creatures',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 + M damage; slide 1',
												tier2: '9 + M damage; slide 3',
												tier3: '13 + M damage; slide 5'
											})
										),
										FactoryLogic.createAbilitySectionText('If a target is force moved into another creature, they must make a free strike against that creature.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'tactician-sub-1-7-1',
					name: 'Asymmetric Warfare',
					description: 'You have advanced your skills in subterfuge, now directing full battlefield strategy and logistics. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the intrigue skill group. Additionally, you can use skills from the intrigue skill group to conceal large groups of people, such as escaping civilians and groups of guerilla warriors.'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'tactician-sub-1-8-1',
					name: 'Bait and Ambush',
					description: 'When you or any ally makes a strike against a creature marked by you, you can spend 2 focus to let the character making the strike shift up to a number of squares equal to your Reason score and use the Hide maneuver as a free maneuver once during the shift. The creature can shift before or after the strike is resolved.',
					tag: 'mark'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-1-9-1',
					name: '9th-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-9-1a',
									name: 'Squad! Hit and Run!',
									description: 'I had to pry this secret from the shadow colleges.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Self and two allies',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target gains 2 surges, and can use a free triggered action to use a signature ability that gains an edge. After resolving their ability, each target can shift up to 2 squares and become hidden even if they have no cover or concealment, or if they are observed.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-1-9-1b',
									name: 'Their Lack of Focus Is Their Undoing',
									description: 'You trick your enemies into attacking each other and leave them confused by the aftermath.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three enemies',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target uses a signature ability against one or more targets of your choosing, with each ability automatically obtaining a tier 3 outcome on the power roll. After resolving the targets’ abilities, you make a power roll against each original target.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: 'R < [weak], dazed (save ends)',
												tier2: 'R < [average], dazed (save ends)',
												tier3: 'R < [strong], dazed (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	selected: false
};
