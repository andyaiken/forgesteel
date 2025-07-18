import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SubClass } from '../../../models/subclass';

export const telepathy: SubClass = {
	id: 'talent-sub-3',
	name: 'Telepathy',
	description: 'Abilities that allow you to communicate with, read, and influence the minds of other creatures.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-3-1-1',
						name: 'Feedback Loop',
						description: 'Creating a brief psychic link between a foe and their target gives that foe a taste of their own medicine.',
						type: FactoryLogic.type.createTrigger('The target deals damage to an ally.'),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes psychic damage equal to half the triggering damage.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'talent-sub-3-1-2',
						name: 'Remote Assistance',
						description: 'An ally gains the benefit of your intellect.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature or object',
						sections: [
							FactoryLogic.createAbilitySectionText('The next ability power roll an ally makes against the target before the start of your next turn gains an edge.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You target one additional creature or object.'
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
					id: 'talent-sub-3-2-1',
					name: 'Ease the Mind',
					description: 'You gain an edge on tests to stop combat and start a negotiation. Any NPC who has a hostile or suspicious starting attitude in a negotiation has an additional 1 patience.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'talent-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-3-2-2a',
									name: 'Overwhelm',
									description: 'You overload their senses, turning all their subconscious thoughts into conscious ones.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Telepathy ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Reason ],
											tier1: '6 + R psychic damage; I < [weak], slowed (save ends)',
											tier2: '10 + R psychic damage; I < [average], weakened (save ends)',
											tier3: '14 + R psychic damage; I < [strong], dazed (save ends)'
										})),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You start crying. You can’t take triggered actions or take free strikes until the end of the target’s next turn.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'talent-sub-3-2-2b',
									name: 'Synaptic Override',
									description: 'You gain control over an enemy’s nervous system. How pleasant for them.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged, AbilityKeyword.Telepathy ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 enemy',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Reason ],
											tier1: 'The target makes a free strike against one enemy of your choice.',
											tier2: 'The target shifts up to their speed and uses their signature ability against any enemies of your choice.',
											tier3: 'The target moves up to their speed and uses their signature ability against any enemies of your choice.'
										})),
										FactoryLogic.createAbilitySectionText('You control the target’s movement. The target can’t be moved in a way that would harm them (such as over a cliff), leave them dying, or result in them suffering a condition or other negative effect. However, you can'),
										FactoryLogic.createAbilitySectionField({
											name: 'Strained',
											effect: 'You take 1d6 damage and are weakened until the end of your turn.'
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
		}
	],
	selected: false
};
