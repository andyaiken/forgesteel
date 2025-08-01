import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const insurgent: SubClass = {
	id: 'tactician-sub-1',
	name: 'Insurgent',
	description: 'Doing your duty, playing fair, and dying honorably in battle is your opponent’s job. By contrast, you’ll do whatever it takes to keep your allies alive.',
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
					description: 'While in your presence or working according to your plans, each of your allies gains an edge on tests with any skill from the intrigue skill group. Additionally, you can use the Lead skill to assist on any test made with a skill from the intrigue group. At the Director’s discretion, you and your allies can use skills from the intrigue skill group to attempt research or reconnaissance during a negotiation instead of outside of negotiation.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-1-1-3',
						name: 'Advanced Tactics',
						description: 'Your leadership aids an ally.',
						type: FactoryLogic.type.createTrigger('The target deals damage to another creature.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Any creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target gains two surges, which they can use on the triggering damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If any effect of the damage has a potency effect, you increase the potency by 1.'
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
					description: 'You have trained your squad to work together and benefit from staying silent and waiting for the opportune time to strike. When you or any of your allies within 10 squares of you becomes hidden, they gain a surge.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-1-2-2',
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
									target: '2 creatures',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText(`
Each target is marked by you. You immediately force each targeted creature to make a free strike against a creature of your choice within 5 squares of the targeted creature.

**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target, you can spend 2 focus to make the marked target free strike a creature of your choice within 5 squares of the marked target.`)
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
									description: '“Try picking on someone MY size.”',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You shift your speed directly toward an ally adjacent to the target, then swap locations with the ally as long as you can each fit into the other’s space. The ally can spend a Recovery, and you make a power roll against the target.'),
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
		}
	],
	selected: false
};
