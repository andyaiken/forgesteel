import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { SubClass } from '@/models/subclass';

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
					selected: [ 'Lift' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-1-1-2'
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-1-1-3',
					name: 'Primordial Strength',
					description: `
Whenever you damage an object with a weapon strike, the strike deals extra damage equal to your Might score. Additionally, whenever you push another creature into an object, the creature takes extra damage equal to your Might score.

As your ferocity grows, you gain benefits as noted on the Berserker Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Ferocity 2**: Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Might score.
* **Ferocity 4**: The first time you push a creature on a turn, you gain 1 surge.
* **Ferocity 6**: You gain an edge on Might tests and the Knockback maneuver.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-1-1-4',
						name: 'Lines of Force',
						description: 'You redirect the energy of motion.',
						type: FactoryLogic.type.createTrigger('The target would be force moved.'),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self or one creature',
						sections: [
							FactoryLogic.createAbilitySectionText('You can select a new target of the same size or smaller within distance to be force moved instead. You become the source of the forced movement, determine the new target’s destination, and can push the target instead of using the original forced movement type. Additionally, the forced movement distance gains a bonus equal to your Might score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'The forced movement distance gains a bonus equal to twice your Might score instead.'
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
					description: 'Whenever you use the Charge main action, you can use a strike signature ability or a strike heroic ability instead of a free strike. Additionally, you can jump as part of your charge.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-1-2-2',
					name: '2nd-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-2-2a',
									name: 'Special Delivery',
									description: 'You ready?',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One willing ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You vertically push the target up to 4 squares. This forced movement ignores the target’s stability, and the target takes no damage from colliding with creatures or objects. At the end of this movement, the target can make a free strike that deals extra damage equal to your Might score.')
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
									description: 'It’s easier to destroy than to create. Much easier, in fact!',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self; see below',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You move up to your speed in a straight line. During this movement, you can move through mundane structures, including walls, which are difficult terrain for you. You automatically destroy each square of structure you move through and leave behind a square of difficult terrain.

Additionally, you make one power roll that targets each enemy you move adjacent to during this movement.`),
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
					description: 'You add your level to your effective size for the purpose of interacting with creatures and objects, including determining whether you can lift an object, are affected by forced movement, and so forth. This has no effect on whether you can be grabbed.'
				}),
				FactoryLogic.feature.createBonus({
					id: 'fury-sub-1-3-2',
					field: FeatureField.Stability,
					valueCharacteristics: [ Characteristic.Might ]
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-4-1',
					name: 'Growing Ferocity Improvement',
					description: '**8 Ferocity:** The first time you push a creature on a turn, you gain 2 surges.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-5-1',
					name: 'Bounder',
					description: 'Your jump distance and height double (see Movement Types in Chapter 10: Combat). Additionally, when you fall, you reduce the effective height of your fall by a number of squares equal to your jump distance for the purpose of determining damage and whether you land prone (see Falling in Chapter 10). You are not prone after falling and landing on another creature.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-1-6-1',
					name: '6th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-6-1a',
									name: 'Avalanche Impact',
									description: 'You leap and crash down, causing a shockwave that devastates foes.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You jump up to your maximum jump distance and make one power roll that targets each creature adjacent to the space where you land.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '4 damage; push 1',
												tier2: '7 damage; push 2',
												tier3: '11 damage; push 3'
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
									id: 'fury-sub-1-6-1b',
									name: 'Force of Storms',
									description: 'You strike an enemy hard enough to be a projectile that knocks a crowd of creatures around.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '7 + M damage; push 3',
												tier2: '11 + M damage; push 5',
												tier3: '16 + M damage; push 7'
											})
										),
										FactoryLogic.createAbilitySectionText('When the target ends this forced movement, each creature within 2 squares of the target is pushed 3 squares.')
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
					id: 'fury-sub-1-7-1',
					name: 'Growing Ferocity Improvement',
					description: '**10 Ferocity:** You have a double edge on Might tests and the Knockback maneuver.'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-8-1',
					name: 'Strongest There Is',
					description: 'Your strength is unmatched. Whenever you make a Might test, you can roll three dice and choose which two to use. Additionally, whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Might score.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-1-9-1',
					name: '9th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-9-1a',
									name: 'Death Comes for You All!',
									description: 'You use your weapon to create a destructive shockwave.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '7 damage; push 3',
												tier2: '10 damage; push 5',
												tier3: '15 damage; push 7'
											})
										),
										FactoryLogic.createAbilitySectionText('If this forced movement causes a target to be hurled through an object, that target takes an extra 10 damage.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-1-9-1b',
									name: 'Primordial Vortex',
									description: 'You channel the power of the Primordial Chaos to pull foes to you.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '3 damage; vertical pull 3',
												tier2: '5 damage; vertical pull 5',
												tier3: '8 damage; vertical pull 7'
											})
										),
										FactoryLogic.createAbilitySectionText('If this forced movement causes a target to slam into you, you take no damage from the collision and the target takes the damage you would have taken.')
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
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-1-10-1',
					name: 'Growing Ferocity Improvement',
					description: '**12 Ferocity:** Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Might score.'
				})
			]
		}
	],
	selected: false
};
