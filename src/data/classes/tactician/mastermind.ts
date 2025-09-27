import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const mastermind: SubClass = {
	id: 'tactician-sub-2',
	name: 'Mastermind',
	description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board and seeking victory by thinking steps ahead of your opponents.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'tactician-sub-2-1-1',
					listOptions: [ SkillList.Lore ]
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-2-1-2',
					name: 'Studied Commander',
					description: `
Your encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are present, each hero with you treats the Discover Lore project related to a war or battle as one category cheaper. This makes projects seeking common lore free, but such projects still require a respite activity to complete.

Additionally, if you have 24 hours or more before a combat encounter or negotiation, and you have one or more clues or rumors regarding the encounter or negotiation, you can make a Reason test as a respite activity.

The following test outcomes apply to a combat encounter:

| Roll    | Effect                                                                                                           |
|:--------|:-----------------------------------------------------------------------------------------------------------------|
| ≤ 11    | The Director tells you the number of creatures in the encounter.                                                 |
| 12 - 16 | The Director tells you the number and level of the creatures in the encounter.                                   |
| ≥ 17    | The Director tells you the tier 2 outcome information, and when the encounter begins, all enemies are surprised. |

The following test outcomes apply to a negotiation:

| Roll    | Effect                                                                                                                                                       |
|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ≤ 11    | The Director gives you three motivations, one of which belongs to an NPC in the negotiation.                                                                 |
| 12 - 16 | The Director gives you one motivation for an NPC in the negotiation.                                                                                         |
| ≥ 17    | The Director tells you the tier 2 outcome information, and you and each of your allies gains an edge on tests made to influence NPCs during the negotiation. |

You can make this test only once for any encounter or negotiation.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-2-1-3',
						name: 'Overwatch',
						description: 'Under your direction, an ally waits for just the right moment to strike.',
						type: FactoryLogic.type.createTrigger('The target moves.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('At any time during the target’s movement, one ally can make a free strike against them.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If the target has R < [average], they are slowed (EoT).'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-2-2-1',
						name: 'Goaded',
						description: 'You have learned to leverage your marked foes’ psychology and goad them into acting before they’re tactically ready.',
						type: FactoryLogic.type.createTrigger('A creature marked by you uses a strike that targets you or any ally within your line of effect.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You can change one target of the strike to you or another ally within your line of effect. The new target must be within distance of the ability and within line of effect of the creature using it.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-2-2-2',
					name: '2nd-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-2-2a',
									name: 'I\'ve Got Your Back',
									description: 'Your enemy will think twice about attacking your friend.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '5 + R damage; taunted (EoT)',
												tier2: '9 + R damage; taunted (EoT)',
												tier3: '12 + R damage; taunted (EoT)'
											})
										),
										FactoryLogic.createAbilitySectionText('One ally adjacent to the target can spend a Recovery.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-2-2b',
									name: 'Targets of Opportunity',
									description: 'You point out easy targets to your friends, allowing them to include more enemies in their attacks.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'Two creatures',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target is marked by you, and you gain two surges.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Mark Benefit',
											effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to add one additional target to the strike.'
										})
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
				FactoryLogic.feature.createPackageContent({
					id: 'tactician-sub-2-5-1',
					name: 'Anticipation',
					description: 'You have learned to be more preemptive on the battlefield, thinking more steps ahead than your opponents. You can target two creatures with your Mark ability.',
					tag: 'mark'
				}),
				FactoryLogic.feature.create({
					id: 'tactician-sub-2-5-2',
					name: 'I Predicted That',
					description: 'Your expertise in history and lore allows you and your allies to outthink rivals in the present day. You and any ally within 10 squares of you gain an edge on Reason tests.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-2-6-1',
					name: '6th-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-6-1a',
									name: 'Battle Plan',
									description: 'With new understanding of your foes, you create the perfect plan to win the battle.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three creatures',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target is marked by you. Immediately and until the end of the encounter, the Director tells you if any creatures marked by you have damage immunity or weakness and the value of that immunity or weakness. Additionally, you and each ally within 3 squares of you gains 2 surges.'),
										FactoryLogic.createAbilitySectionField({
											name: 'Mark Benefit',
											effect: 'Until the end of the encounter, whenever you or any ally makes a strike against a creature marked by you, you can spend 2 focus to make the strike ignore damage immunity and deal extra damage equal to three times your Reason score.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-6-1b',
									name: 'Hustle!',
									description: 'You and your allies coordinate to form a new battle line.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Self and each ally in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You mark two enemies within 10 squares of you. Each target can shift up to their speed. You and each target gain 2 surges.')
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
					id: 'tactician-sub-2-7-1',
					name: 'Grand Strategy',
					description: 'You have grown your skills in strategy, wielding intricate battlefield tactics and plans. During a montage test or negotiation, you can obtain one automatic success on a test made using a skill from the lore skill group. Additionally, when you take a respite, you can make a project roll for a research project in addition to undertaking another respite activity.'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createPackageContent({
					id: 'tactician-sub-1-8-1',
					name: 'Pincer Movement',
					description: 'When you or any ally makes a strike against a creature marked by you, you can spend 2 focus to have the character making the strike shift up to a number of squares equal to your Reason score before the strike is resolved. If you didn’t make the strike, you can make this shift as well. If you did make the strike, one ally within 10 squares of you can make this shift as well.',
					tag: 'mark'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-2-9-1',
					name: '9th-Level Doctrine Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-9-1a',
									name: 'Blot Out the Sun!',
									description: 'What makes a good soldier? The ability to fire four shots a minute in any weather.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Self and each ally in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target can make a ranged free strike that gains an edge against any enemy marked by you within distance of their ranged free strike. A target ignores banes and double banes when making this strike.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'tactician-sub-2-9-1b',
									name: 'Counterstrategy',
									description: 'I’ve identified a way to negate their strengths.',
									type: FactoryLogic.type.createMain(),
									keywords: [],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('You gain 6 surges. Until the end of the encounter or until you are dying, whenever the Director spends Malice, choose yourself or one ally within 10 squares. The chosen character gains 2 of their Heroic Resource.')
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
