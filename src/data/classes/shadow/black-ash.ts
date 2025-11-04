import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const blackAsh: SubClass = {
	id: 'shadow-sub-1',
	name: 'College of Black Ash',
	description: 'The College of Black Ash founded the art of being a shadow. Its graduates use Black Ash sorcery to teleport around the battlefield in clouds of soot, and to manipulate and create darkness. Graduates of the college are unmatched in mobility.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'shadow-sub-1-1-1',
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-1-1-2',
						name: 'Black Ash Teleport',
						description: 'In a swirl of black ash, you step from one place to another.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport up to 5 squares. If you have concealment or cover at your destination, you can use the Hide maneuver even if you are observed. If you successfully hide using this maneuver, you gain 1 surge.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'You teleport 1 additional square for each insight spent.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'shadow-sub-1-1-3',
						name: 'In All This Confusion',
						description: 'You vanish in a plume of black smoke to avoid danger.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You halve the damage, then can teleport up to 4 squares after the triggering effect resolves.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'You teleport 1 additional square for each insight spent.'
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
					id: 'shadow-sub-1-2-1',
					name: '2nd-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-2-1a',
									name: 'In a Puff of Ash',
									description: 'You enchant a strike with your teleportation magic.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(5)
									],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '6 + A damage; you can teleport the target 1 square',
											tier2: '10 + A damage; you can teleport the target up to 3 squares',
											tier3: '14 + A damage; you can teleport the target up to 5 squares'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-2-1b',
									name: 'Too Slow',
									description: 'Your foe made a big mistake.',
									type: FactoryLogic.type.createTrigger('You use your In All This Confusion ability.', { free: true }),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You ignore any effects associated with the damage that triggered your In All This Confusion ability. Before you teleport, you can make a free strike against a creature who damaged you to trigger In All This Confusion. After you teleport, you can spend a Recovery.')
									]
								})
							}),
							value: 1
						}
					]
				}),
				FactoryLogic.feature.create({
					id: 'shadow-sub-1-2-2',
					name: 'Burning Ash',
					description: 'The ash you leave behind burns your foes. The first time on a turn that you use a shadow ability to teleport away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Agility score.'
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
					id: 'shadow-sub-1-5-1',
					name: 'Trail of Cinders',
					description: `
Whenever you reduce a non-minion creature to 0 Stamina, you can immediately use a free maneuver to use your Black Ash Teleport ability.

Additionally, you can now bring an adjacent willing creature along with you whenever you use a shadow ability to teleport. The creature appears in an unoccupied space adjacent to the space into which you teleported. If no such space exists, they can’t teleport with you.`
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-1-6-1',
					name: '6th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-6-1a',
									name: 'Black Ash Eruption',
									description: 'Your attack produces a cloud of black ash that launches an enemy into the air.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '3 + A damage; vertical push 5',
											tier2: '6 + A damage; vertical push 10',
											tier3: '9 + A damage; vertical push 15'
										})),
										FactoryLogic.createAbilitySectionText('A creature force moved by this ability must be moved straight upward.')

									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-6-1b',
									name: 'Cinderstorm',
									description: 'You teleport your friends in a burst of ash and fire.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
									target: 'Self and each ally in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target can teleport up to 5 squares. For each target in addition to you who teleports away from or into a space adjacent to an enemy, that enemy takes fire damage equal to your Agility score. Additionally, a target who ends this movement in concealment or cover can use the Hide maneuver even if they are observed.')
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
					id: 'shadow-sub-1-8-1',
					name: 'Cinder Step',
					description: 'Whenever you willingly move, you can teleport. When you teleport this way, it counts as using a shadow ability for the purpose of using your Burning Ash and Trail of Cinders features.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'shadow-sub-1-9-1',
					name: '9th-Level College Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-9-1a',
									name: 'Cacophony of Cinders',
									description: 'You tumble through the battle, stabbing foes and teleporting allies.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('You shift up to twice your speed, making one power roll that targets each creature you come adjacent to during the shift.'),
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: 'An enemy takes 6 damage; an ally can teleport up to 3 squares.',
											tier2: 'An enemy takes 10 damage; an ally can teleport up to 5 squares.',
											tier3: 'An enemy takes 14 damage; an ally can teleport up to 7 squares.'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'shadow-sub-1-9-1b',
									name: 'Demon Door',
									description: 'You create a temporary portal to allow a massive demonic hand to reach through.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Agility ],
											tier1: '13 + A corruption damage; push 3',
											tier2: '18 + A corruption damage; push 5',
											tier3: '25 + A corruption damage; push 7'
										})),
										FactoryLogic.createAbilitySectionText('On a critical hit, the target is grabbed by the demon and pulled through the portal before it closes, never to be seen again.')
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
