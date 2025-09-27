import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const reaver: SubClass = {
	id: 'fury-sub-2',
	name: 'Reaver',
	description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-2-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Hide' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-2-1-2'
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-2-1-3',
					name: 'Primordial Cunning',
					description: `
You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.

As your ferocity grows, you gain benefits as noted on the Reaver Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.

* **Ferocity 2**: Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Agility score.
* **Ferocity 4**: The first time you slide a creature on a turn, you gain 1 surge.
* **Ferocity 6**: You gain an edge on Agility tests and the Knockback maneuver.`
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-2-1-4',
						name: 'Unearthly Reflexes',
						description: 'You are as elusive as a hummingbird.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You take half the damage from the triggering effect and can shift up to a number of squares equal to your Agility score.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If the damage has any potency effects associated with it, the potency is reduced by 1 for you.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'fury-sub-2-2-1',
					name: 'Inescapable Wrath',
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-2-2-1a',
							name: 'Inescapable Wrath',
							description: 'You ignore difficult terrain.'
						}),
						FactoryLogic.feature.createBonus({
							id: 'fury-sub-2-2-1b',
							field: FeatureField.Speed,
							valueCharacteristics: [ Characteristic.Agility ]
						})
					]
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-2-2-2',
					name: '2nd-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-2-2a',
									name: 'Death ... Deeaaath!',
									description: 'Your unbridled rage strikes terror in their hearts.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '3 + M damage; P < [weak], dazed and frightened (save ends)',
											tier2: '5 + M damage; P < [average], dazed and frightened (save ends)',
											tier3: '8 + M damage; P < [strong], dazed and frightened (save ends)'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-2-2b',
									name: 'Phalanx-Breaker',
									description: 'Organizing your forces like feckless creatures of Law. Pitiful.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createSelf() ],
									target: 'Self; see below',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You shift up to your speed and make one power roll that targets up to three enemies you move adjacent to during this shift.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '2 damage; A < [weak], dazed (save ends)',
												tier2: '4 damage; A < [average], dazed (save ends)',
												tier3: '6 damage; A < [strong], dazed (save ends)'
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
					id: 'fury-sub-2-3-1',
					name: 'See Through Your Tricks',
					description: 'You have a double edge on tests made to search for hidden creatures, discern hidden motives, or detect lies. You also have a double edge on tests made to gamble!'
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-2-4-1',
					name: 'Growing Ferocity Improvement',
					description: '**8 Ferocity:** The first time you slide a creature on a turn, you gain 2 surges.'
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-2-5-1',
					name: 'Unfettered',
					description: 'At the start of your turn, you can end any restrained condition on you. Additionally, you have a double edge on tests made to escape being confined or imprisoned.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-2-6-1',
					name: '6th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-6-1a',
									name: 'Death Strike',
									description: 'Once you taste your foe’s blood, you become more efficient and turn every killing blow into an opportunity.',
									type: FactoryLogic.type.createTrigger('You reduce a creature to 0 Stamina with a strike.', { free: true }),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'Self',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('You target a creature adjacent to you with the same strike, using the same power roll as the triggering strike.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-6-1b',
									name: 'Seek and Destroy',
									description: 'You break through the enemy lines to make an example.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '4 + M damage; P < [weak] frightened (save ends)',
												tier2: '6 + M damage; P < [average] frightened (save ends)',
												tier3: '10 + M damage; P < [strong] frightened (save ends)'
											})
										),
										FactoryLogic.createAbilitySectionText('If a target who is not a leader or solo creature is winded by this strike, they are reduced to 0 Stamina and you choose an enemy within 5 squares of you. If that enemy has P < [average], they are frightened of you (save ends).')
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
					id: 'fury-sub-2-7-1',
					name: 'Growing Ferocity Improvement',
					description: '**10 Ferocity:** You have a double edge on Agility tests and the Knockback maneuver.'
				})
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-2-8-1',
					name: 'A Step Ahead',
					description: 'You move with legendary grace. Whenever you make an Agility test, you can roll three dice and choose which two to use. Additionally, whenever you use the Disengage move action, the distance you can shift gains a bonus equal to your Agility score.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-2-9-1',
					name: '9th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-9-1a',
									name: 'Primordial Bane',
									description: 'You attune the target to be weaker to a specific element.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '11 + M damage',
												tier2: '16 + M damage',
												tier3: '21 + M damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Choose acid, cold, corruption, fire, lightning, poison, or sonic damage. The target loses any damage immunity to the chosen type and gains weakness 10 to the chosen type (save ends).')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-2-9-1b',
									name: 'Shower of Blood',
									description: 'You shock your foes with the brutality of your strike, resetting the balance of combat.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '12 + M damage',
												tier2: '18 + M damage',
												tier3: '24 + M damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Each enemy within 5 squares of you is distracted until the end of the round. While a creature is distracted this way, they can’t take triggered actions or free triggered actions, ability rolls made against them gain an edge, and their characteristic scores are considered 1 lower for the purpose of resisting potencies.')
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
					id: 'fury-sub-2-10-1',
					name: 'Growing Ferocity Improvement',
					description: '**12 Ferocity:** Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.'
				})
			]
		}
	],
	selected: false
};
