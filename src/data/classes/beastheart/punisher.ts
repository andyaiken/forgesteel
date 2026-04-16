import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const punisher: SubClass = {
	id: 'beastheart-sub-3',
	name: 'Punisher',
	description: 'Using brute force, you overwhelm anyone unwise enough to earn your wrath.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-3-1-1',
					selected: [ 'Endurance' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-3-1-2',
					name: 'Wild Nature Benefit',
					description: 'Your companion slides each target up to a number of squares equal to their Might score.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-1-3',
						name: 'Avalanche Rush',
						description: 'You ride a cascade of ice over your foes.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One creature',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes damage equal to 3 + your Might score, and if they have M<[average], they are knocked prone. You can move up to 3 squares before and after you use this ability. During this movement, a prone enemy’s space doesn’t count as difficult terrain, and the first time you enter a prone enemy’s space, that enemy takes cold damage equal to your Might score.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'If the target has M<[strong], they are knocked prone.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-1-4',
						name: 'Thunderclap',
						description: 'The force of your counterattack cracks the air.',
						type: FactoryLogic.type.createTrigger('The target deals damage to a creature.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('You deal sonic damage equal to your Might score to the target and push them up to a number of squares equal to 1 + your Might score. If this forced movement pushes the target away from the creature they damaged, the creature takes half the triggering damage.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'The forced movement distance is doubled.'
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
						id: 'beastheart-sub-3-2-1b',
						name: 'This One\'s Yours',
						description: 'When someone is pushed into you, you reach out to steady an ally or send a foe careening off in another direction.',
						type: FactoryLogic.type.createTrigger('A creature force moved by another creature enters a space adjacent to you.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You end the forced movement. You can then push the creature up to a number of squares equal to 1 + your Might score. The creature takes 1 damage for each square they are force moved this way.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'You and your companions can each use this free triggered action on the same turn.'
							})
						]
					})
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-2-2',
					name: 'Punisher Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-2-2a',
									name: 'Foe Bowling',
									description: 'Your companion sends one enemy tumbling into another, taking them both out.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '3 + M damage; push 2; M < [weak], prone',
												tier2: '5 + M damage; push 3; M < [average], prone',
												tier3: '8 + M damage; push 4; M < [strong], prone'
											})
										),
										FactoryLogic.createAbilitySectionText('If the target is force moved at least 1 square, an enemy adjacent to the target at the end of this forced movement is also targeted by this ability’s power roll, but they don’t trigger this effect.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-2-2b',
									name: 'One Roar and We’re Back In the Fight',
									description: 'Your companion builds up courage with a roar, growl, or aggressive display.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'One ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion and the target can each gain 2 surges, spend up to 2 Recoveries, and end one condition or effect on them that is ended by a saving throw or that ends at the end of their turn.')
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
					id: 'beastheart-sub-3-5-1',
					name: 'I Can Take It',
					description: 'When you or your companion uses your Thunderclap ability and halves the triggering damage, whoever uses the ability can take the remaining damage instead of the original target. The damage is transferred before immunity and weakness are applied.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-6-1',
					name: 'Punisher Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-6-1a',
									name: 'Lead the Pack',
									description: 'Roaring like wild beasts, your companion and your allies rush toward the foe.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion shifts up to their speed and can make a melee free strike. As a free triggered action, you and up to 10 allies within 10 squares of your companion’s starting position can shift up to their speed and make free strikes.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-6-1b',
									name: 'Rolling Thunder',
									description: 'The rumble of your companion’s dash is a rolling thunderclap, their impact an earthquake.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion shifts up to their speed and makes one power roll that targets each enemy they come adjacent to during the shift. If your companion targets only one enemy with this ability, the power roll gains an edge.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '9 sonic damage; M < [weak], prone',
												tier2: '13 sonic damage; M < [average], prone',
												tier3: '18 sonic damage; M < [strong], prone'
											})
										),
										FactoryLogic.createAbilitySectionSpend({
											value: 2,
											effect: 'You can move up to your speed. The power roll also targets each enemy you come adjacent to during the move.'
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
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-3-8-1',
					name: 'Built for Violence',
					description: 'You and your companion gain a +2 damage bonus to maneuvers that deal damage. When you or your companion pushes a creature, you can vertical push that creature.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-3-9-1',
					name: 'Punisher Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-9-1a',
									name: 'Battle Frenzy',
									description: 'Your companion shatters the floodgates that keep their rampage dammed up, and it cascades into the unprepared minds of nearby creatures.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
									target: 'Special',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionField({
											name: 'Special',
											effect: 'This ability targets only creatures you choose within distance.'
										}),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: 'P < [weak], the target is battle-frenzied',
												tier2: 'P < [average], the target is battle-frenzied',
												tier3: 'the target is battle-frenzied'
											})
										),
										FactoryLogic.createAbilitySectionText('If a target resists the potency, they can choose to become battle-frenzied.'),
										FactoryLogic.createAbilitySectionText('A battle-frenzied creature must use a free triggered action to make a melee free strike against themself or a creature adjacent to them. You choose each creature’s target. After making this strike, they are no longer battle frenzied.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-9-1b',
									name: 'Juggernaut',
									description: 'Your companion plows through the front lines, tossing enemies — and allies — this way and that.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Charge, AbilityKeyword.Companion ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '9 damage; vertical slide 2, M [weak] prone',
												tier2: '13 damage; vertical slide 4, M [average] prone',
												tier3: '18 damage; vertical slide 6, M [strong] prone'
											})
										),
										FactoryLogic.createAbilitySectionText('Your companion can forgo dealing damage to targets of your choice.')
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
	abilities: [],
	selected: false
};
