import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const duelist: SubClass = {
	id: 'O51GO1EdIggJHj40',
	name: 'Duelist',
	description: 'Drama infuses your every movement done in tandem with another. You perform dances of death, putting trust in your opponent to return your passion in kind.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: '1NhlI9WCQUCKkX0u',
					listOptions: [ SkillList.Exploration ],
					selected: [ 'Gymnastics' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'gTezUhLaizAfbmXy',
						name: 'Acrobatics',
						description: 'Folks love a good tumble.',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area can automatically obtain a tier 3 outcome on one test made to jump, tumble, or climb as part of their movement before the end of their turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'vS4O8NKJgdBVoVjj',
						name: 'Star Power',
						description: 'Your years of practicing fencing and dancing pay off on the battlefield.',
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self',
						cost: 1,
						sections: [
							FactoryLogic.createAbilitySectionText('You gain a +2 bonus to speed until the end of your turn. Additionally, the next power roll you make this turn can’t have an outcome lower than tier 2.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'You gain a +4 bonus to speed instead.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'uWQCoI4iBOhFpHgW',
						name: 'Riposte',
						description: '“I’d have brought treats had I known I’d be fighting a dog.”',
						type: FactoryLogic.type.createTrigger('The target takes damage from a melee strike.'),
						keywords: [ AbilityKeyword.Melee ],
						distance: [ FactoryLogic.distance.createMelee() ],
						target: 'Self or one ally',
						sections: [
							FactoryLogic.createAbilitySectionText('The target makes a free strike against the creature who made the triggering strike.')
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'lAPeP3iSpt8PqQJI',
					name: '2nd-Level Class Act Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'FViXbLCcsCb1xdHQ',
									name: 'Classic Chandelier Stunt',
									description: 'Audiences love this bit.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'Self and one willing ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target can shift up to 5 squares, including vertically, but must end this movement adjacent to the other target and on solid ground. Each target can then make a melee free strike that deals extra damage equal to twice their highest characteristic score.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'MRR7Ag6ujfREe9A8',
									name: 'En Garde!',
									description: 'Wait, it’s … Guard! Turn! Parry! Dodge! Spin! Thrust! Ha!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '7 + A damage',
												tier2: '11 + A damage',
												tier3: '16 + A damage'
											})
										),
										FactoryLogic.createAbilitySectionText('The target can make a melee free strike against you. If they do, you can make a melee free strike against the target.')
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
					id: 'TkRYPzOk7E7KosGI',
					name: 'Foil',
					description: `At the start of an encounter, choose one creature within your line of effect. You have a double edge on power rolls made against or in
competition with that creature. The chosen creature also has a double edge on power rolls made against or in competition with you. If the chosen creature is reduced to 0 Stamina, you can choose a new foil at the start of the next combat round. `
				})
			]
		},
		{
			level: 4,
			features: []
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'AYG8ODq4Xvn4vWMr',
					name: '5th-Level Class Act Feature',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'EpJ6mBFE2kfCK1IY',
								name: 'Verbal Duel',
								description: 'Once on each of your turns while the target of your Foil feature is adjacent to you, you can use a free maneuver to exchange words with them. Make an opposed Presence test with the target. Whoever gets the higher result can make a free strike, which deals psychic damage instead of its usual damage.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'TqxhltwD22GJjGkU',
									name: 'We Can’t Be Upstaged!',
									description: 'Swordplay so graceful it looks like you all practiced this.',
									type: FactoryLogic.type.createNoAction(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
									target: 'Self and each ally in the area',
									sections: [
										FactoryLogic.createAbilitySectionText('While this performance is active, a target who starts their turn in the area gains a bonus to the distance they can shift equal to your Presence score until the end of their turn.')
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
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'AkvymN5wTwBpvJk6',
					name: '6th-Level Class Act Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'gCxHNxuFdPtoWOSw',
									name: 'Blood on the Stage',
									description: 'It’s love and blood or drama and blood. Either way, there’s always blood.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature or object',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '12 + A damage; M < [weak], bleeding (save ends)',
												tier2: '18 + A damage; M < [average], bleeding (save ends)',
												tier3: '24 + A damage; bleeding (EoT), or if M < [strong], bleeding (save ends)'
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
									id: 'yzRbbBkrzCSPBh1w',
									name: 'Fight Choreography',
									description: 'You and your partner make a flashy show of derring-do, then get back to your corners.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You and the target each make a melee free strike that targets each enemy within 3 squares of either of you, dividing the enemies between each of you. You choose which enemies your free strike targets and which enemies the target creature’s free strike targets. You then slide the target 5 squares, ignoring stability.')
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
					id: 'FwA0rbxGHrD7Oj2H',
					name: 'Masterwork',
					description: `Choose one of your signature abilities and name it after yourself. You always have this ability available, even if it is sourced from a kit you switch out. Whenever you use this ability, you gain an edge and 1 surge that you can use only on this ability.

Additionally, when your named signature ability is the last ability you use in an encounter, you can immediately use the Hear Ye, Hear Ye! effect of your Zeitgeist feature to tell tales of your exploits after the encounter ends`
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'qIMKE6V6R4w2teMf',
					name: '9th-Level Class Act Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: '4LyAtdASe3AEJaon',
									name: 'Expert Fencer',
									description: 'If you can land the strike, the crowd goes wild.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee(3) ],
									target: 'One creature or object',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Agility ],
												tier1: '15 + A damage',
												tier2: '21 + A damage',
												tier3: '28 + A damage; M < [strong], bleeding (save ends)'
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
									id: 'IZCTPQBJer4fFuKi',
									name: 'Renegotiated Contract',
									description: 'No, no. You don’t die until the sequel.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('Add your current Stamina to your target’s current Stamina, then you have half that total Stamina and the target has the remainder. If either of you would gain more Stamina this way than their Stamina maximum, the difference in Stamina between what that creature would gain and their maximum is gained by the other creature. Neither of you can gain more Stamina than your maximum this way. You then make a power roll.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: 'You and the target can each end one effect on yourselves that is ended by a saving throw or that ends at the end of your turns.',
												tier2: 'You and the target can end any effects on yourselves that are ended by a saving throw or that end at the end of your turns.',
												tier3: 'You can choose any of the current effects on you and the target that are ended by a saving throw or that end at the end of your turns, apply the chosen effects to the target, and end the rest.'
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
			level: 10,
			features: []
		}
	],
	selected: false
};
