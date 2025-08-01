import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const mastermind: SubClass = {
	id: 'tactician-sub-2',
	name: 'Mastermind',
	description: 'You have an encyclopedic knowledge of warfare, viewing the battlefield as a game board, and seeking victory by thinking multiple steps ahead of your opponents.',
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
Your encyclopedic knowledge of the history of battle lets you apply that knowledge to current challenges. While you are with them, any hero treats the Discover Lore project related to a war or battle as one category cheaper. This makes projects seeking common lore free, but such projects still require a respite activity to complete.

Additionally, if you have a reasonable amount of time before a combat encounter or negotiation, and you have at least one clue or rumor regarding the encounter or negotiation, you can make a Reason test as a Respite activity.

The following test results apply to a combat encounter:

| Roll    | Effect                                                                          |
|:--------|:--------------------------------------------------------------------------------|
| 11 -    | The Director tells you the number of creatures in the encounter.                |
| 12 - 16 | The Director tells you the number and level of the creatures in the encounter.  |
| 17 +    | As 12-16, and when the encounter begins, all enemies are surprised.             |

The following test results apply to a negotiation:

| Roll    | Effect                                                                                                                        |
|:--------|:------------------------------------------------------------------------------------------------------------------------------|
| 11 -    | The Director tells you three different motivations, one of which is one of an NPC’s motivations, while the other two are not. |
| 12 - 16 | The Director tells you one of an NPC’s motivations.                                                                           |
| 17 +    | As 12-16, and you and each of your allies gains an edge on tests made to influence NPCs during the negotiation.               |

You can only make this test once for each encounter and negotiation.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'tactician-sub-2-1-3',
						name: 'Overwatch',
						description: 'Under your direction, an ally waits for just the right moment to strike.',
						type: FactoryLogic.type.createTrigger('The target moves.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('At any point during the target’s movement, one ally can make a free strike against them.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If the target has R < [average], they are also slowed (EoT).'
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
						description: 'You have learned to leverage the psychology of your marked foes and goad them into acting before they are tactically ready.',
						type: FactoryLogic.type.createTrigger('A creature marked by you uses a strike that targets you or an ally.', { free: true }),
						keywords: [],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You retarget the attack to you or another one of your allies or yourself. The new target must be a valid option for the strike.')
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'tactician-sub-2-2-2',
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
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Reason ],
												tier1: '2 + R damage; R < [weak], the target is frightened of an ally of your choice within range (save ends)',
												tier2: '3 + R damage; R < [average], the target is frightened of an ally of your choice within range (save ends)',
												tier3: '5 + R damage; R < [strong], the target is frightened of an ally of your choice within range (save ends)'
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
									name: 'Their Tactics Are So Primitive',
									description: 'All that time you spent studying ancient battles paid off!',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: '2 creatures',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText(`
Each target is marked by you. You gain two surges.

**Mark Benefit**: For the rest of the encounter whenever you or an ally attacks a marked target with a strike, you can spend 2 focus to add one additional target to the strike within the attack’s range.`)
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
