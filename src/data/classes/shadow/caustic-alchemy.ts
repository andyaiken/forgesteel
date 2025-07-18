import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const causticAlchemy: SubClass = {
	id: 'shadow-sub-2',
	name: 'College of Caustic Alchemy',
	description: 'The College of Caustic Alchemy teaches its students recipes for the acids, bombs, and poisons used in their grim work. Graduates of the college are exceptional assassins.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-sub-2-1-1',
					listOptions: [ SkillList.Crafting ],
					selected: [ 'Alchemy' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-2-1-2',
						name: 'Coat The Blade',
						description: 'Just a little poison goes a long way.',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You gain two surges. Whenever you use a surge before the end of the encounter, you can choose to have its damage be poison damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'For each insight you spend, you gain an additional surge.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-2-1-3',
					name: 'Smoke Bomb',
					description: 'You always carry a supply of smoke bombs to make it easy for you to distract and get away from foes. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are hidden.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-2-1-4',
						name: 'Defensive Roll',
						description: 'When an enemy attacks, you roll with the impact to reduce the harm.',
						type: FactoryLogic.type.createTrigger('Another creature damages you.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You halve the damage against the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You reduce the potency of any effect associated with the damage for you by 1.'
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
					id: 'shadow-sub-2-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-2-1a',
									name: 'Sticky Bomb',
									description: 'Explosives are best when they’re attached to an enemy.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can remove it as an action, disarming the bomb. At the end of your next turn, the bomb detonates. You can also detonate it earlier (no action required). When the bomb detonates, you make a power roll targeting each enemy within 3 squares of it.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '4 + A fire damage',
												tier2: '7 + A fire damage',
												tier3: '11 + A fire damage'
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
									id: 'shadow-sub-2-2-1b',
									name: 'Stink Bomb',
									description: 'Yellow, disgusting gas explodes from a bomb you toss.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
									target: 'Each creature in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '2 poison damage',
											tier2: '5 poison damage',
											tier3: '7 poison damage'
										})),
										FactoryLogic.createAbilitySectionText('The gas remains in the area until the end of the encounter. Any creature who has M < average and starts their turn in the area is weakened (save ends).')
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-2-2-2',
					name: 'Trained Assassin',
					description: 'You know just where to cut your enemies. Whenever you make a strike with at least one surge and no banes, the strike gains an extra surge which you must use on that strike.'
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
