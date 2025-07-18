import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { FeatureField } from '../../../enums/feature-field';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const berserker: SubClass = {
	id: 'fury-sub-1',
	name: 'Berserker',
	description: 'You channel your rage into expressions of physical might, acting as a living version of the forces that reshape the world.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-1-1-1',
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Lift' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-1-1-2'
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-1-1-3',
					name: 'Primordial Strength',
					description: `
Whenever you damage an object with a weapon strike, it takes additional damage equal to your Might score. Additionally, whenever you push another creature into an object, they take additional damage equal to your Might score.

As your rage grows, your primordial strength intensifies. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Rage 2**: Add your Might to the distance you achieve on the Knockback maneuver.
* **Rage 4**: Gain one surge the first time on a turn that you push a creature.
* **Rage 6**: Gain an edge on Might tests and the Knockback maneuver.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-1-1-4',
						name: 'Lines of Force',
						description: 'You redirect the energy of motion.',
						type: FactoryLogic.type.createTrigger('The target would be force moved.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self or 1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText('You can select a new target of the same size or smaller within distance to be force moved instead, and you can turn that forced movement into a push instead. You become the source of the forced movement and decide where the new target’s destination. Additionally, the forced movement distance gains a bonus equal to your Might score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The forced movement distance instead gains a bonus equal to twice your Might score.'
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
					id: 'fury-sub-1-2-1',
					name: 'Unstoppable Force',
					description: 'Whenever you use the Charge action, you can make a signature strike or a heroic ability melee strike instead of a free strike. Additionally, you can jump as part of a charge.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-1-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-2-2a',
									name: 'Special Delivery',
									description: 'You ready?',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One willing ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You vertically push the target up to 4 squares. This forced movement ignores the target’s stability, and the target takes no damage from the move. At the end of this movement, the target can make a free strike that deals additional damage equal to your Might score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-2-2b',
									name: 'Wrecking Ball',
									description: 'It is easier to destroy than to create. Much easier, in fact!',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You move up to your speed in a straight line. During this movement, you can move through mundane structures, including walls, which are difficult terrain for you. You automatically destroy each square of structure you move through and leave behind a square of difficult terrain.

Additionally, you make one power roll that targets each enemy you come adjacent to during the move.`),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: 'Push 1',
												tier2: 'Push 2',
												tier3: 'Push 3'
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
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-3-1',
					name: 'Immovable Object',
					description: 'You add your level to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on your ability to be grabbed.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'fury-sub-1-3-2',
					field: FeatureField.Stability,
					valueCharacteristics: [ Characteristic.Might ]
				})
			]
		}
	],
	selected: false
};
