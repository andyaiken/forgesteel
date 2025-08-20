import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { DamageModifierType } from '../../../enums/damage-modifier-type';
import { DamageType } from '../../../enums/damage-type';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const cryokinetic: SubClass = {
	id: 'null-sub-2',
	name: 'Cryokinetic',
	description: 'You can tap into absolute cold, the most essential energy of myriad manifolds, and manifest its effects in your body.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-2-1-1',
					listOptions: [ SkillList.Crafting ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'null-sub-2-1-2',
					name: 'Cryokinetic Mastery',
					features: [
						FactoryLogic.feature.create({
							id: 'null-sub-2-1-2a',
							name: 'Cryokinetic Mastery',
							description: `
As your discipline grows, you strengthen the psionic power suffusing you, granting benefits from the Cryokinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

| Discipline     | Benefit                                                                                                                                                                                          |
|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2              | Whenever you use the Knockback maneuver, you can target one additional creature. Additionally, whenever you deal untyped damage with a psionic ability, you can change it to cold damage instead.|
| 4              | The first time on a turn that you grab a creature or an enemy moves 1 or more squares in the area of your Null Field ability, you gain 1 surge.                                                  |
| 6              | You gain an edge on the Grab and Knockback maneuvers.                                                                                                                                            |
| 8 (4th level)  | The first time on a turn that you grab a creature or an enemy moves 1 or more squares in the area of your Null Field ability, you gain 2 surges.                                                 |
| 10 (7th level) | You have a double edge on the Grab and Knockback maneuvers.                                                                                                                                      |
| 12 (10th level)| Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.      |`
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'null-sub-2-1-2b',
							name: 'Cryokinetic Mastery',
							description: 'Whenever you use your Inertial Shield ability, you can then use the Grab maneuver as a free triggered action.',
							tag: 'inertial-shield'
						})
					]
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-2-2-1',
					name: 'Entropic Adaptability',
					description: 'You ignore difficult terrain related to cold and ice, and you can automatically climb at full speed while moving.'
				}),
				FactoryLogic.feature.createDamageModifier({
					id: 'null-sub-2-2-1b',
					modifiers: [
						FactoryLogic.damageModifier.createCharacteristic({ damageType: DamageType.Cold, modifierType: DamageModifierType.Immunity, characteristics: [ Characteristic.Intuition ], multiplier: 2 })
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-2-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-2-2a',
									name: 'Entropic Field',
									description: 'You drastically increase the local entropy.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 1 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 cold damage; A < [weak], slowed (save ends)',
											tier2: '9 cold damage; A < [average], slowed (save ends)',
											tier3: '13 cold damage; A < [strong], slowed (save ends)'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-2-2b',
									name: 'Heat Sink',
									description: 'You absorb ambient heat, coating the ground in frost and precipitating snow from the air',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the start of your next turn, the size of your Null Field ability increases by 1, and you and any ally benefit from concealment while in the area. At the end of this turn, each enemy in the area takes cold damage equal to your Intuition score.')
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
					id: 'null-sub-2-5-1',
					name: 'Chilling Readiness',
					description: 'You steel yourself for imminent danger by tapping into your body’s cold energy. At the start of any combat, you gain a number of surges equal to your Victories.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-2-6-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-6-1a',
									name: 'Ice Pillars',
									description: 'Pillars of ice erupt from the ground and launch your foes into the air.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three creatures or objects',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Intuition ],
											tier1: 'Vertical slide 6',
											tier2: 'Vertical slide 8',
											tier3: 'Vertical slide 10'
										})),
										FactoryLogic.createAbilitySectionText('The pillars vanish as soon as the effects of the forced movement are resolved.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-6-1b',
									name: 'Wall of Ice',
									description: 'You create a wall of ice.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Wall, value: 10, within: 10 }) ],
									target: 'Special',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You can place this wall in occupied squares, sliding each creature in the area into the nearest unoccupied space of your choice. The wall remains until the end of the encounter or until you are dying. The wall’s squares are treated as stone squares for the purpose of damage, and you and allies can move freely through the wall. Each enemy who enters a square adjacent to the wall and has M < [average] is slowed (save ends). Each enemy who is force moved into the wall and has M < [average] is restrained (save ends).')
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
					id: 'null-sub-2-8-1',
					name: 'Synaptic Triage',
					description: 'As a free maneuver, you can spend 1d6 Stamina to remove one effect on you. Each creature of your choice in the area of your Null Field ability also gains this benefit.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-2-9-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-9-1a',
									name: 'Absolute Zero',
									description: 'You become the coldest thing in the timescape.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Intuition ],
											tier1: 'You gain 20 temporary Stamina.',
											tier2: 'You gain 30 temporary Stamina.',
											tier3: 'You gain 40 temporary Stamina.'
										})),
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dead, you become an avatar of uttermost cold. You gain immunity to all damage equal to the cold damage immunity granted by your Entropic Adaptability trait, you ignore the negative effects of dying, and you have a +2 bonus to potencies.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-2-9-1b',
									name: 'Heat Drain',
									description: 'You drain all the heat from the target.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Intuition ],
											tier1: '8 + I cold damage; M < [weak], restrained (save ends)',
											tier2: '11 + I cold damage; M < [average], restrained (save ends)',
											tier3: '15 + I cold damage; M < [strong], restrained (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('While restrained this way, the target takes cold damage equal to your Intuition score at the start of each of your turns. Additionally, whenever the target damages another creature while restrained this way, any potency associated with the damage is reduced by 2.')
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
