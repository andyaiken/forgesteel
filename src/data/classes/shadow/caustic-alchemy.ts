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
						description: 'A little poison goes a long way.',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You gain two surges. Additionally, whenever you use a surge before the end of the encounter, you can choose to have it deal poison damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'For each insight you spend, you gain 1 additional surge.'
							})
						]
					})
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-2-1-3',
					name: 'Smoke Bomb',
					description: 'You always carry a supply of smoke bombs to use for distractions and easy getaways. You can use the Hide maneuver even if you are observed and don’t initially have cover or concealment. When you do so, you can shift a number of squares equal to your Agility score. If you end this movement with cover or concealment, you are automatically hidden.'
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
							FactoryLogic.createAbilitySectionText('You take half the triggering damage, then can shift up to 2 squares after the triggering effect resolves. If you end this shift with concealment or cover, you can use the Hide maneuver even if you are observed.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You reduce the potency of any effect associated with the damage reduced by 1 for you..'
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
					name: '2nd-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-2-1a',
									name: 'Sticky Bomb',
									description: 'Explosives are best when they’re attached to an enemy.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You attach a small bomb to a creature. If you are hidden from the creature, they don’t notice the bomb and you remain hidden. The creature otherwise notices the bomb and can disarm and remove it as a main action. If they don’t, at the end of your next turn, the bomb detonates. When the bomb detonates, you make a power roll targeting each enemy within 2 squares of it.'),
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
									description: 'Putrid yellow gas explodes from a bomb you toss.',
									type: FactoryLogic.type.createMain(),
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
										FactoryLogic.createAbilitySectionText('The gas remains in the area until the end of the encounter. Any creature who starts their turn in the area and has M < average is weakened (save ends).')
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
					description: 'You know just where to cut your enemies. Whenever you make a strike that has no bane or double bane, and that incorporates 1 or more surges, you gain 1 additional surge that you can use only on that strike.'
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
					id: 'shadow-sub-2-5-1',
					name: 'Volatile Reagents',
					description: `
Whenever you take damage, each enemy adjacent to you takes fire, acid, or poison damage (your choice) equal to your Agility score.

Additionally, your Defensive Roll ability now allows you to shift up to 5 squares, including shifting vertically. If you don’t end this shift on solid ground and are not flying, you fall.`
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-2-6-1',
					name: '6th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-6-1a',
									name: 'One Vial Makes You Better',
									description: 'A well-timed throw of a potion will keep your allies in the fight.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three creatures',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You ready, hand, or lob a potion to each target, who can immediately quaff the potion (no action required). If they don’t drink the potion right away, they must use the Use Consumable maneuver to consume it later. The potion loses its potency at the end of the encounter.

A creature who drinks the potion can spend up to 2 Recoveries, and has acid immunity, fire immunity, or poison immunity (their choice) equal to your level until the end of the encounter.`)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-6-1b',
									name: 'One Vial Makes You Faster',
									description: 'Each ally who catches a potion you throw can take the battle to the next level.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [
										FactoryLogic.distance.createRanged(10)
									],
									target: 'Three creatures',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText(`
You ready, hand, or lob a potion to each target, who can immediately quaff the potion (no action required). If they don’t drink the potion right away, they must use the Use Consumable maneuver to consume it later. The potion loses its potency at the end of the encounter.

A creature who drinks the potion receives benefits based on your power roll.`),
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: 'The creature’s speed is increased by 2 until the end of the encounter.',
											tier2: 'The creature can fly until the end of the encounter.',
											tier3: 'The creature turns invisible until the end of their next turn.'
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
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'shadow-sub-2-8-1',
					name: 'Time Bomb',
					description: 'You have damage immunity against area abilities and effects equal to your Agility score.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-2-8-2',
						name: 'Time Bomb',
						description: 'The longer it cooks, the bigger the boom.',
						type: FactoryLogic.type.createManeuver({ free: true }),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 2, within: 10 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionText(`
Each target takes acid, fire, or poison damage (your choice) equal to your Agility score.

For each combat round that has passed since this ability was last used in the current encounter, the area increases by 1 and you gain 1 surge that must be used with this ability. After using the ability or at the end of the encounter, its area and surges are reset.`),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								repeatable: true,
								effect: 'For every 2 insight spent, you increase the cube’s size by 1 and gain 1 surge that can be used only with this ability.'
							})
						]
					})
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-2-9-1',
					name: '9th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-9-1a',
									name: 'Chain Reaction',
									description: 'One explosion, an offense. Three explosions, an assault. Nine explosions, a celebration.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Ranged ],
									distance: [
										FactoryLogic.distance.createRanged(10)
									],
									target: 'One creature or object',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Each enemy within 3 squares of the target who is not currently targeted by this ability also becomes targeted by this ability. This effect continues until there are no more available targets. The ability deals acid, fire, or poison damage (your choice).'),
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '7 damage',
											tier2: '10 damage',
											tier3: '15 damage'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-2-9-1b',
									name: 'To the Stars',
									description: 'You attach your most potent explosive to your foe. Under less pressing circumstances, you’re sure you could launch them into orbit.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(10)
									],
									target: 'One creature or object',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '4 + A fire damage; vertical push 8',
											tier2: '7 + A fire damage; vertical push 10',
											tier3: '11 + A fire damage; vertical push 15'
										})),
										FactoryLogic.createAbilitySectionText('The ground beneath a 3-cube area around the target’s starting position is difficult terrain.')
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
