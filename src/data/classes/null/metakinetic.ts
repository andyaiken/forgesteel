import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const metakinetic: SubClass = {
	id: 'null-sub-3',
	name: 'Metakinetic',
	description: 'You learn to see through the illusions of the universe to more fully understand your body and its psionic potential.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-3-1-1',
					listOptions: [ SkillList.Exploration ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'null-sub-3-1-2',
					name: 'Metakinetic Mastery',
					features: [
						FactoryLogic.feature.create({
							id: 'null-sub-3-1-2a',
							name: 'Metakinetic Mastery',
							description: `
As your discipline grows, your psionic potential is amplified, granting benefits from the Metakinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

| Discipline | Benefit                                                                                                                                                                                        |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2              | Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Intuition score.                                                                         |
| 4              | The first time in a combat round that you take damage or are force moved, you gain 1 surge, even if you resist the effect.                                                                 |
| 6              | You gain an edge on the Grab and Knockback maneuvers.                                                                                                                                      |
| 8 (4th level)  | The first time in a combat round that you take damage or are force moved, you gain 2 surges, even if you resist the effect.                                                                |
| 10 (7th level) | You have a double edge on the Grab and Knockback maneuvers.                                                                                                                                |
| 12 (10th level)| Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.|`
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'null-sub-3-1-2b',
							name: 'Metakinetic Mastery',
							description: 'Whenever you use your Inertial Shield ability, you can then use the Knockback maneuver as a free triggered action.',
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
					id: 'null-sub-3-2-1',
					name: 'Inertial Sink',
					description: `
You add your Intuition score to your effective size for the purpose of interacting with creatures and objects, such as for determining whether you can lift an object, whether you are affected by forced movement, and so forth. This has no effect on whether you can be grabbed.

Additionally, when you fall, you reduce the effective height of the fall by 5 squares in addition to any other reductions. Whenever you take damage from being force moved, you reduce that damage by an amount equal to your level.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-3-2-2',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-2-2a',
									name: 'Gravitic Strike',
									description: 'Your fist emanates gravitic force that pulls a distant enemy closer.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '8 + A psychic damage; vertical pull 3',
											tier2: '12 + A psychic damage; vertical pull 5',
											tier3: '16 + A psychic damage; vertical pull 7'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-2-2b',
									name: 'Kinetic Shield',
									description: 'You manifest a force barrier that absorbs incoming kinetic energy.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: 'You gain 10 temporary Stamina',
											tier2: 'You gain 15 temporary Stamina',
											tier3: 'You gain 20 temporary Stamina'
										})),
										FactoryLogic.createAbilitySectionText('While you have temporary Stamina from this ability, you can’t be made bleeding even while dying.')
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
					id: 'null-sub-3-5-1',
					name: 'Inertial Fulcrum',
					description: 'Whenever you use an ability to reduce damage dealt to you or to reduce the distance of forced movement imposed upon you, you can deal damage to one enemy in the area of your Null Field ability equal to your Intuition score.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-3-6-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-6-1a',
									name: 'Gravitic Charge',
									description: 'You channel your discipline into momentum that defies gravity.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Intuition ],
											tier1: 'Vertical slide 5',
											tier2: 'Vertical slide 7',
											tier3: 'Vertical slide 9'
										})),
										FactoryLogic.createAbilitySectionText('This movement ignores stability. If you slide into another creature, you resolve damage to both of you as if your force movement had ended, but you keep moving through that creature’s space.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-6-1b',
									name: 'Iron Body',
									description: 'You weaken your connection to this manifold, allowing you to move through and damage enemies.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You gain 20 temporary Stamina. Additionally, until the end of the encounter, your stability gains a bonus equal to your Intuition score.')
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
					id: 'null-sub-3-8-1',
					name: 'Inertial Dampener',
					description: 'You and each creature or object of your choice in the area of your Null Field ability gain a bonus to stability equal to your Intuition score. A creature who attempts to force move a target with this bonus takes psychic damage equal to your Intuition score.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-3-9-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-9-1a',
									name: 'Inertial Absorption',
									description: 'You absorb an attack to empower your body.',
									type: FactoryLogic.type.createTrigger('Another creature damages you using an ability.', { free: true }),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('You take half the damage, negate any effects associated with the damage for you, and gain 3 surges.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-3-9-1b',
									name: 'Realitas',
									description: 'Your essential hyperreality disrupts your enemy’s connection to existence.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '7 + A psychic damage; I < [weak], dazed',
											tier2: '10 + A psychic damage; I < [average], dazed',
											tier3: '13 + A psychic damage; I < [strong], dazed'
										})),
										FactoryLogic.createAbilitySectionText('While dazed this way, the target takes psychic damage equal to twice your Intuition score at the start of each of your turns. If this ability causes a creature who is not a leader or solo creature to become winded, they are instead reduced to 0 Stamina. Any creature reduced to 0 Stamina by this ability is forgotten by all creatures of your level or lower in the timescape who are not present in the encounter. Loved ones of the forgotten creature retain a faint sense of melancholy. This effect can be reversed only at the Director’s discretion.')
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
