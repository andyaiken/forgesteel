import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { RollType } from '@/enums/roll-type';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const chronokinetic: SubClass = {
	id: 'null-sub-1',
	name: 'Chronokinetic',
	description: 'Your training unmoors you from temporal reality, allowing you to use the flow of time as another dimension that all things move through.',
	classID: '',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'null-sub-1-1-1',
					listOptions: [ SkillList.Lore ]
				}),
				FactoryLogic.feature.createMultiple({
					id: 'null-sub-1-1-2',
					name: 'Chronokinetic Mastery',
					description: 'As your discipline grows, your psionic mastery of your body intensifies, granting benefits from the Chronokinetic Mastery table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.',
					features: [
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'null-sub-1-1-2-2',
							resource: 'Discipline',
							value: 2,
							feature: FactoryLogic.feature.create({
								id: 'null-sub-1-1-2-2a',
								name: 'Chronokinetic Mastery (Discipline 2)',
								description: 'Whenever you use the Knockback maneuver, you can use the Disengage move action as a free triggered action either before or after the maneuver.'
							})
						}),
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'null-sub-1-1-2-4',
							resource: 'Discipline',
							value: 4,
							feature: FactoryLogic.feature.create({
								id: 'null-sub-1-1-2-4a',
								name: 'Chronokinetic Mastery (Discipline 4)',
								description: 'The first time on a turn that you willingly move 1 or more squares as part of an ability, you gain 1 surge.'
							})
						}),
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'null-sub-1-1-2-6',
							resource: 'Discipline',
							value: 6,
							feature: FactoryLogic.feature.createMultiple({
								id: 'null-sub-1-1-2-6a',
								name: 'Chronokinetic Mastery (Discipline 6)',
								features: [
									FactoryLogic.feature.createRollModifier({
										id: 'null-sub-1-1-2-6a-grab',
										name: 'Chronokinetic Mastery (Discipline 6)',
										modifier: RollModifierType.Edge,
										rollType: RollType.Grab
									}),
									FactoryLogic.feature.createRollModifier({
										id: 'null-sub-1-1-2-6a-knockback',
										name: 'Chronokinetic Mastery (Discipline 6)',
										modifier: RollModifierType.Edge,
										rollType: RollType.Knockback
									})
								]
							})
						}),
						FactoryLogic.feature.createPackageContent({
							id: 'null-sub-1-1-2b',
							name: 'Chronokinetic Mastery',
							description: 'Whenever you use your Inertial Shield ability, you can then use the Disengage move action as a free triggered action.',
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
					id: 'null-sub-1-2-1',
					name: 'Rapid Processing',
					description: 'As a maneuver, you can read an entire book or process a similar amount of information. Additionally, during any respite, you can take an additional respite activity.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'null-sub-1-2-2',
					name: '2nd-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-2-2a',
									name: 'Blur',
									description: 'You release stored time, allowing you to act twice.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You can use a signature or heroic ability. You gain an edge on that ability’s power rolls.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-2-2b',
									name: 'Force Redirected',
									description: 'The force of your strike moves your target in a surprising direction.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '8 + A damage; slide 1',
											tier2: '12 + A damage; slide 3',
											tier3: '16 + A damage; slide 5'
										}))
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
			features: [
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'null-sub-1-4-1',
					name: 'Chronokinetic Mastery Improvement',
					resource: 'Discipline',
					value: 8,
					feature: FactoryLogic.feature.create({
						id: 'null-sub-1-4-1a',
						name: 'Chronokinetic Mastery (Discipline 8)',
						description: 'The first time on a turn that you willingly move 1 or more squares as part of an ability, you gain 2 surges.'
					})
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-1-5-1',
					name: 'Instant Action',
					description: 'If you’re not surprised at the start of your first turn in combat, you gain an edge on ability rolls and gain 2 surges. If you are surprised, you can spend 3 discipline to no longer be surprised and gain the benefits of this feature.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-1-6-1',
					name: '6th-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-6-1a',
									name: 'Interphase',
									description: 'You slip into a faster timestream to act more quickly.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You can use up to three signature abilities, each of which gains an edge.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-6-1b',
									name: 'Phase Step',
									description: 'You weaken your connection to this manifold, allowing you to move through and damage enemies.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Psionic, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSpecial('Self; see below') ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 damage; M < [weak]. dazed',
											tier2: '8 damage; M < [average]. dazed',
											tier3: '12 damage; M < [strong]. dazed'
										})),
										FactoryLogic.createAbilitySectionText('You can shift up to your speed, and squares occupied by enemies or objects are not difficult terrain for this shift. You make one power roll that targets each enemy you moved through during this shift')
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
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'null-sub-1-7-1',
					name: 'Chronokinetic Mastery Improvement',
					resource: 'Discipline',
					value: 10,
					feature: FactoryLogic.feature.createMultiple({
						id: 'null-sub-1-7-1a',
						name: 'Chronokinetic Mastery (Discipline 10)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'null-sub-1-7-1a-grab',
								name: 'Chronokinetic Mastery (Discipline 10)',
								modifier: RollModifierType.DoubleEdge,
								rollType: RollType.Grab
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'null-sub-1-7-1a-knockback',
								name: 'Chronokinetic Mastery (Discipline 10)',
								modifier: RollModifierType.DoubleEdge,
								rollType: RollType.Knockback
							})
						]
					})
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'null-sub-1-8-1',
					name: 'Shared Momentum',
					description: 'When you take the Disengage move action, one ally in the area of your Null Field ability can also take the Disengage move action as a free triggered action, using your distance for that move action.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'null-sub-1-9-1',
					name: '9th-Level Tradition Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-9-1a',
									name: 'Arrestor Cycle',
									description: 'You trap your foe in a looping cycle of time, where they relive the last few seconds over and over again.',
									type: FactoryLogic.type.createTrigger('The triggering creature starts their turn.', { free: true }),
									keywords: [ AbilityKeyword.Psionic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Intuition ],
											tier1: 'I < [weak]. the target loses their turn',
											tier2: 'I < [average]. the target loses their turn',
											tier3: 'I < [strong]. the target loses their turn'
										})),
										FactoryLogic.createAbilitySectionText('If the target loses their turn, the round continues as if they had acted. A target who doesn’t lose their turn takes psychic damage equal to twice your Intuition score for each main action they take until the end of their next turn.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'null-sub-1-9-1b',
									name: 'Time Loop',
									description: 'You show shadows what true speed is.',
									type: FactoryLogic.type.createTrigger('Another creature on the encounter map ends their turn.', { free: true }),
									keywords: [ AbilityKeyword.Psionic ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('You take a bonus turn immediately after the triggering creature. This ability can be used only once per combat round.')
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
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'null-sub-1-10-1',
					name: 'Chronokinetic Mastery Improvement',
					resource: 'Discipline',
					value: 12,
					feature: FactoryLogic.feature.create({
						id: 'null-sub-1-10-1a',
						name: 'Chronokinetic Mastery (Discipline 12)',
						description: 'Whenever you force move a target, the forced movement distance gains a bonus equal to your Intuition score. Additionally, whenever you use a heroic ability, you gain 10 temporary Stamina.'
					})
				})
			]
		}
	],
	abilities: [],
	selected: false
};
