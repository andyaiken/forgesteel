import { AbilityDistanceType } from '@/enums/ability-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const guardian: SubClass = {
	id: 'beastheart-sub-1',
	name: 'Guardian',
	description: 'You are the fearless defender of your pack - anyone who harms them must go through you.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-1-1-1',
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-1-1-2',
					name: 'Wild Nature Benefit',
					description: 'Each enemy target is taunted by your companion until the start of your next turn.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-1-1-3',
						name: 'Living Arrow',
						description: 'You point, and your companion appears.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Beastheart, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One unoccupied space',
						sections: [
							FactoryLogic.createAbilitySectionText('If your companion is within range and can fit into the target space, they teleport to the space. They can then make a melee free strike.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'The distance increases to ranged 15.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-1-1-4',
						name: 'The Pack Defends',
						description: 'You siphon away the pain and endure it yourself.',
						type: FactoryLogic.type.createTrigger('The target takes damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'One ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target takes half the damage.'),
							FactoryLogic.createAbilitySectionSpend({
								effect: 'You spend a Recovery without regaining Stamina, and the target regains Stamina equal to your recovery value.'
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
					id: 'beastheart-sub-1-2-1b',
					name: 'Watchdog',
					description: 'You and your companion can’t be surprised.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-2-2',
					name: 'Guardian Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-2-2a',
									name: 'Omnomnom',
									description: 'What do you have in your mouth? No! Bad boy!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionField({
											name: 'Special',
											effect: 'This ability targets only creatures who are grabbed and are your companion’s size or smaller.'
										}),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 + M damage; M < [weak] the target is swallowed',
												tier2: '10 + M damage; M < [average] the target is swallowed',
												tier3: '14 + M damage; M < [strong] the target is swallowed'
											})
										),
										FactoryLogic.createAbilitySectionText(`
A swallowed creature shares your companion’s space, is grabbed and restrained, and has line of effect only to your companion. Nothing has line of effect to the swallowed creature.

Once per round at the start of your turn, the swallowed creature takes acid damage equal to 1 + your companion’s Might score. If the swallowed creature escapes the grab, your companion immediately regurgitates the creature, who lands prone in an unoccupied square adjacent to your companion. Your companion can also regurgitate a swallowed creature as a free maneuver. Your companion can have only one creature swallowed at a time.`)
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-2-2b',
									name: 'Fetch!',
									description: 'Your companion blinks out of existence, returning with a visitor you were particularly hoping to meet.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature or object',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Your companion can teleport up to 5 squares before and after making the power roll. Instead of grabbing the target, your companion can pick up a target object that is smaller than they are. You can forgo dealing damage with this ability.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '6 + M damage; M < [weak], grabbed',
												tier2: '8 + M damage; M < [average], grabbed',
												tier3: '12 + M damage; M < [strong], grabbed'
											})
										),
										FactoryLogic.createAbilitySectionText('After making the power roll, your companion can teleport with a grabbed creature or held object, provided the creature or object can fit in the destination. You choose which squares adjacent to your companion the grabbed creature or held object is teleported to.')
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
					id: 'beastheart-sub-1-5-1',
					name: 'There For Each Other',
					description: 'When you or your companion uses your The Pack Defends ability to spend a Recovery, you and the target both regain Stamina.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-6-1',
					name: 'Guardian Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-6-1a',
									name: 'Sic \'Em!',
									description: 'Your companion rushes forward to protect you from a dangerous foe.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Might,
												tier1: '11 + M damage; taunted (save ends); M < [weak], prone',
												tier2: '16 + M damage; taunted (save ends); M < [average], prone',
												tier3: '21 + M damage; taunted (save ends); M < [strong], prone and can’t stand (EoT)'
											})
										),
										FactoryLogic.createAbilitySectionSpend({
											value: 2,
											effect: 'Your companion can use this ability as a triggered action against an enemy who damages you.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-6-1b',
									name: 'Stare Down',
									description: 'Your companion locks eyes with an enemy, imposing their will upon the enemy and daring them to move a muscle.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Companion, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(5) ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('The first time the target uses a move action, main action, maneuver, or triggered action before the start of your next turn, your companion makes the following power roll before the target acts. If the target hasn’t acted before the start of your next turn, they are frightened of your companion (save ends).'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '9 + I psychic damage; I < [weak], weakened (save ends)',
												tier2: '13 + I psychic damage; I < [average], weakened (save ends)',
												tier3: '18 + I psychic damage; I < [strong], weakened (save ends)'
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
			level: 7,
			features: []
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'beastheart-sub-1-8-1',
					name: 'Reflexes Perfected',
					description: 'Your and your companion’s free strikes deal extra damage equal to your Intuition score. Whenever an adjacent enemy moves to a space that isn’t adjacent, you or your companion can make an opportunity attack, even if the enemy shifted, teleported, was force moved, or another feature that doesn’t provoke opportunity attacks.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-1-9-1',
					name: 'Guardian Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-9-1a',
									name: 'Banshee Howl',
									description: 'Your companion’s howl, screech, roar, or psychic emanation presages death to those who hear it.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Companion, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '5 sonic damage; I < [weak], frightened (save ends)',
												tier2: '10 sonic damage; I < [average], frightened (save ends)',
												tier3: '15 sonic damage; I < [strong], frightened (save ends)'
											})
										),
										FactoryLogic.createAbilitySectionText('While frightened this way, a creature takes 10 psychic damage at the start of each of your turns.'),
										FactoryLogic.createAbilitySectionSpend({
											effect: 'This ability also affects a 3 burst originating from you. An enemy in both areas is only affected once.'
										})
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'beastheart-sub-1-9-1b',
									name: 'Relentless',
									description: 'Your companion launches at your foe, shielding allies with their body.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Companion, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One enemy',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: Characteristic.Intuition,
												tier1: '11 + M damage; P < [weak], taunted (save ends)',
												tier2: '17 + M damage; P < [average], taunted (save ends)',
												tier3: '22 + M damage; P < [strong], taunted (save ends)'
											})
										),
										FactoryLogic.createAbilitySectionText('While the target is taunted this way, all creatures except your companion have immunity 10 to damage dealt by the target.')
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
