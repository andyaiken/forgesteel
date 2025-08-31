import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const auteur: SubClass = {
	id: 'u3JAwbvGQEHPi6cY',
	name: 'Auteur',
	description: 'You seek drama from story and recount, using your magic to manipulate the sequence of events unfolding before you.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: '63GSnAtLidKQThSw',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Brag' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'VM5qLsp8pXpYt180',
						name: 'Blocking',
						description: 'No, no, no, you lose the audience that way. Try it like this …',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 2 }) ],
						target: 'Each creature in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('At the end of each of your turns while this performance is active, you can choose up to a number of targets equal to your Presence score and teleport those targets to unoccupied spaces in the area. A target can’t be teleported in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. ')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'WLhzen5TMIS87eap',
						name: 'Dramatic Monologue',
						description: 'It doesn’t need to make sense. Just say it with emotion.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Special',
						sections: [
							FactoryLogic.createAbilitySectionText(` Choose one of the following effects:
* You orate a rousing tale of victory. One ally within distance gains an edge on the next power roll they make before the start of your next turn.
* You weave a tale of high-stakes heroics. One ally within distance gains 1 surge.
* You insult a foe where they’re most vulnerable. One enemy within distance takes a bane on the next power roll they make before the end of their next turn.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can choose two targets for the chosen effect.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'MUMrI7zMhGiDF6an',
						name: 'Turnabout Is Fair Play',
						description: 'All’s fair in love and whatever.',
						type: FactoryLogic.type.createTrigger('The target makes an ability roll that has an edge, a double edge, a bane, or a double bane.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('An edge on the triggering roll becomes a bane, or a double edge becomes an edge. A bane becomes an edge, or a double bane becomes a bane.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 3,
								effect: 'An edge on the triggering roll becomes a double bane, or a double edge is negated. A bane becomes a double edge, or a double bane is negated.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'NR3KiD1HgYdQ5KHv',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'wbcpRLxbH1FXK30r',
									name: 'Guest Star',
									description: 'We offered them a percentage of the gross. So they’re working for free!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('A guest star appears to help you during the encounter: either a bystander within distance uplifted by your magic, or a mysterious new hero who appears in an unoccupied space within distance. This guest star is controlled by you, has their own turn, and shares your characteristics. Their Stamina maximum is half yours. They have no abilities other than your melee and ranged free strikes. At the end of the encounter, or when the guest star is reduced to 0 Stamina, they retreat or revert to a bystander. The same bystander can’t be uplifted this way more than once during an encounter. ')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'xun0HqS4EyDtB40D',
									name: 'Twist at the End',
									description: 'You didn’t see that coming, did you?!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One dead enemy',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('A target who is not a leader or solo creature comes back to life with half their Stamina and becomes an ally under the Director’s control. The players can work with the Director to determine when the target takes their turn each combat round. At the end of the encounter, the target turns to dust and is blown away.')
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
			features: [
				FactoryLogic.feature.create({
					id: '8mgJuIOaJ89ei7An',
					name: 'Missed Cue',
					description: 'If you aren’t surprised at the start of an encounter, you can choose one enemy within your line of effect who is not a leader or solo creature. The Director temporarily removes the chosen creature from the encounter. The chosen creature enters the encounter at the start of the second combat round. You must earn 3 Victories before you can use this feature again.'
				})
			]
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'z5ajGRuxCgWGBqkY',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'V532EvelvtngOBm5',
								name: 'Fix It in Post',
								description: 'Once on each of your turns, you can use a free maneuver to change one condition affecting a creature within distance of your Dramatic Monologue ability. Choose one of the following conditions on the target: bleeding, frightened, prone, slowed, or taunted. You change that condition to another of those conditions, maintaining the duration and origin of the original condition. A target who is no longer prone can stand up.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'blD6AhJ1qRfFDLGB',
									name: 'Take Two!',
									description: 'One more, and this time make it interesting.',
									type: FactoryLogic.type.createNoAction(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
									target: 'Self and each ally in the area',
									sections: [
										FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area can reroll the first power roll that turn that obtains a tier 2 outcome. They must use the new roll.')
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
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'CwUQTsffxHIfqd1R',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: '0Gh84KaW8ivImayH',
									name: 'Here’s How Your Story Ends',
									description: 'You give away the ending of this battle, and it’s not great for them.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
									target: 'Each enemy in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '2 psychic damage; P < [weak], frightened (save ends)',
												tier2: '5 psychic damage; P < [average], frightened (save ends)',
												tier3: '7 psychic damage; P < [strong], frightened (save ends)'
											})
										)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: '756Ynw8Qoy8v7gPo',
									name: 'You’re All My Understudies',
									description: 'It’s important for everyone to know each other’s lines, just in case …',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
									target: 'Each ally in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter, each target gains the speed bonus, weapon distance bonus, disengage bonus, and stability bonus of your currently equipped kit in addition to their own kit’s bonuses.')
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
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'oyvdzACJtFq8WHn7',
					name: 'Deleted Scene',
					description: 'Whenever a creature within distance of your Dramatic Monologue ability makes a power roll, you can spend 1 drama as a free triggered action to use Dramatic Monologue, targeting only one creature.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'gPzNIv7yp4ELiJSz',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'vHIxEUa7yuxQSjDO',
									name: 'Epic',
									description: 'Your story tells a tale of the villain’s waning power and how the heroes rose to the occasion to stop them.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(10)
									],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: 'The target takes a bane on ability rolls (save ends).',
												tier2: 'The target has a double bane on ability rolls (save ends).',
												tier3: 'The target has a double bane on power rolls (save ends).'
											})
										),
										FactoryLogic.createAbilitySectionText('Choose one ally within distance. While the target is affected by this ability, each time they use an ability, that ally can make a free strike against them after the ability is resolved.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'nqibjR3wWOCxaYIk',
									name: 'Rising Tension',
									description: 'You narrate the tension of the scene and put all hope into your protagonist to turn things around.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('The target gains 3 of their Heroic Resource, has a double edge on a power roll of their choice made during their next turn, is no longer slowed or weakened if they were before, and can immediately take their turn after yours if they have not taken their turn already this round.')
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
