import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SkillList } from '@/enums/skill-list';
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
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Endurance' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-3-1-2',
					name: 'Wild Nature Benefit',
					description: 'Your companion slides the target up to a number of squares equal to their Might score.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-1-3',
						name: 'Swat Away',
						description: 'You bat away an attacker.',
						type: FactoryLogic.type.createTrigger('An enemy adjacent to you deals damage to a creature.'),
						keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One enemy',
						sections: [
							FactoryLogic.createAbilitySectionText('You deal damage equal to your Might score to the target and push them up to a number of squares equal to your Might score + 1. If this movement causes the enemy to move farther from the creature they damaged, the triggering damage is halved.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can push the enemy twice the distance.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-sub-3-2-1a',
					selected: [ PerkData.youCanPetThem ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-3-2-1b',
						name: 'No, You Take Him',
						description: 'When someone is pushed into you, you reach out to steady an ally or send a foe careening off in another direction.',
						type: FactoryLogic.type.createTrigger('A creature being force moved by another creature enters a space adjacent to you.', { free: true }),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You end the forced movement. You can then push the creature up to a number of squares equal to your Might score + 1. The creature takes 1 damage for each square they are moved in this way.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You can each use this free triggered action on the same turn.'
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
										FactoryLogic.createAbilitySectionText('If the target is force moved at least 1 square, at the end of this movement an enemy adjacent to the target is also targeted by this ability’s power roll but not this additional effect.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-4-2-2b',
									name: 'Psych Up',
									description: 'Your companion builds up courage with a roar, growl, or aggressive display.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion and an ally within range can gain two surges, spend up to two Recoveries, and end one (EoT) or (Save Ends) condition or effect on themselves.')
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
					name: 'Self Sacrifice',
					description: 'When you or your companion uses Swat Away and halves an attack’s damage, they can take the remaining damage instead of the original target. The damage is transferred before immunity and weakness is applied.'
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
									name: 'Howling Advance',
									description: 'Roaring like a pack of wild beasts, your companion and your allies rush toward the foe.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion shifts up to their speed and can make a free strike. If within 10 squares of the square from which this movement started, you and up to 10 allies can also shift up to their speed and make free strikes.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-6-1b',
									name: 'Thundering Strike',
									description: 'The rumble of your companion’s dash is a rolling thunderclap, their impact an earthquake.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion shifts up to their speed. Your companion makes one power roll that targets each enemy your companion comes adjacent to during the shift. If your companion only targets one enemy with this ability, the power roll has an edge.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '9 sonic damage; M < [weak], prone',
												tier2: '13 sonic damage; M < [average], prone',
												tier3: '18 sonic damage; M < [strong], prone'
											})
										),
										FactoryLogic.createAbilitySectionField({
											name: 'Spend',
											value: 2,
											effect: 'You can move up to your speed. The power roll also affects any enemy you come adjacent to during the move.'
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
					name: 'Overhand Throw',
					description: 'When you or your companion uses a maneuver that deals damage, the damage increases by 2. When you or your companion pushes a creature, the push is a vertical push.'
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
									target: 'Creatures of your choice',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: 'P < [weak], battle frenzied',
												tier2: 'P < [average], battle frenzied',
												tier3: 'battle frenzied'
											})
										),
										FactoryLogic.createAbilitySectionText('A battle frenzied creature uses a free triggered action to make a melee free strike against themself or a creature adjacent to them and then they are no longer battle frenzied. You choose each creature’s target. A creature that would normally be unaffected by this ability can choose to be affected.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-3-9-1b',
									name: 'Send \'Em Flying',
									description: 'Your companion plows through the front lines, tossing enemies—and allies—this way and that.',
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
	selected: false
};
