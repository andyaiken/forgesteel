import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';
import { RollModifierType } from '@/enums/roll-modifier-type';
import { RollType } from '@/enums/roll-type';
import { SubClass } from '@/models/subclass';

export const reaver: SubClass = {
	id: 'fury-sub-2',
	name: 'Reaver',
	description: 'You channel your rage into instinct and cunning, challenging the false order of civilization.',
	classID: '',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-2-1-1',
					selected: [ 'Hide' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-2-1-2'
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-2-1-3',
					name: 'Primordial Cunning',
					description: 'You are never surprised. Additionally, whenever you would push a target with forced movement, you can slide them instead.'
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
							FactoryLogic.createAbilitySectionSpend({
								effect: 'If the damage has any potency effects associated with it, the potency is reduced by 1 for you.'
							})
						]
					})
				}),
				FactoryLogic.feature.createMultiple({
					id: 'fury-sub-2-1-5',
					name: 'Growing Ferocity',
					description: 'As your ferocity grows, you gain benefits as noted on the Reaver Growing Ferocity table. Benefits are cumulative except where an improved benefit replaces a lesser benefit.',
					features: [
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'fury-sub-2-1-5-2',
							resource: 'Ferocity',
							value: 2,
							feature: FactoryLogic.feature.create({
								id: 'fury-sub-2-1-5-2a',
								name: 'Growing Ferocity (Ferocity 2)',
								description: 'Whenever you use the Knockback maneuver, the forced movement distance gains a bonus equal to your Agility score.'
							})
						}),
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'fury-sub-2-1-5-4',
							resource: 'Ferocity',
							value: 4,
							feature: FactoryLogic.feature.create({
								id: 'fury-sub-2-1-5-4a',
								name: 'Growing Ferocity (Ferocity 4)',
								description: 'The first time you slide a creature on a turn, you gain 1 surge.'
							})
						}),
						FactoryLogic.feature.createHeroicResourceThreshold({
							id: 'fury-sub-2-1-5-6',
							resource: 'Ferocity',
							value: 6,
							feature: FactoryLogic.feature.createMultiple({
								id: 'fury-sub-2-1-5-6a',
								name: 'Growing Ferocity (Ferocity 6)',
								features: [
									FactoryLogic.feature.createRollModifier({
										id: 'fury-sub-2-1-5-6a-tests',
										name: 'Growing Ferocity (Ferocity 6)',
										modifier: RollModifierType.Edge,
										characteristics: [ Characteristic.Agility ]
									}),
									FactoryLogic.feature.createRollModifier({
										id: 'fury-sub-2-1-5-6a-maneuvers',
										name: 'Growing Ferocity (Ferocity 6)',
										modifier: RollModifierType.Edge,
										rollType: RollType.Knockback
									})
								]
							})
						})
					]
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
				FactoryLogic.feature.createMultiple({
					id: 'fury-sub-2-3-1',
					name: 'See Through Your Tricks',
					features: [
						FactoryLogic.feature.createRollModifier({
							id: 'fury-sub-2-3-1a',
							name: 'See Through Your Tricks',
							modifier: RollModifierType.DoubleEdge,
							skills: [ 'Search', 'Read Person' ],
							condition: 'When searching for hidden creatures, discerning hidden motives, or detecting lies'
						}),
						FactoryLogic.feature.createRollModifier({
							id: 'fury-sub-2-3-1b',
							name: 'See Through Your Tricks',
							modifier: RollModifierType.DoubleEdge,
							skills: [ 'Gamble' ]
						})
					]
				})
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'fury-sub-2-4-1',
					name: 'Growing Ferocity Improvement',
					resource: 'Ferocity',
					value: 8,
					feature: FactoryLogic.feature.create({
						id: 'fury-sub-2-4-1a',
						name: 'Growing Ferocity (Ferocity 8)',
						description: 'The first time you slide a creature on a turn, you gain 2 surges.'
					})
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'fury-sub-2-5-1',
					name: 'Unfettered',
					features: [
						FactoryLogic.feature.create({
							id: 'fury-sub-2-5-1a',
							name: 'Unfettered',
							description: 'At the start of your turn, you can end any restrained condition on you.'
						}),
						FactoryLogic.feature.createRollModifier({
							id: 'fury-sub-2-5-1b',
							name: 'Unfettered',
							modifier: RollModifierType.DoubleEdge,
							skills: [ 'Escape Artist' ],
							condition: 'When escaping being confined or imprisoned'
						})
					]
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
										FactoryLogic.createAbilitySectionText('You shift up to your speed.'),
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
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'fury-sub-2-7-1',
					name: 'Growing Ferocity Improvement',
					resource: 'Ferocity',
					value: 10,
					feature: FactoryLogic.feature.createMultiple({
						id: 'fury-sub-2-7-1a',
						name: 'Growing Ferocity (Ferocity 10)',
						features: [
							FactoryLogic.feature.createRollModifier({
								id: 'fury-sub-2-7-1a-tests',
								name: 'Growing Ferocity (Ferocity 10)',
								modifier: RollModifierType.DoubleEdge,
								characteristics: [ Characteristic.Agility ]
							}),
							FactoryLogic.feature.createRollModifier({
								id: 'fury-sub-2-7-1a-maneuvers',
								name: 'Growing Ferocity (Ferocity 10)',
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
				FactoryLogic.feature.createHeroicResourceThreshold({
					id: 'fury-sub-2-10-1',
					name: 'Growing Ferocity Improvement',
					resource: 'Ferocity',
					value: 12,
					feature: FactoryLogic.feature.create({
						id: 'fury-sub-2-10-1a',
						name: 'Growing Ferocity (Ferocity 12)',
						description: 'Whenever you use a heroic ability, you gain 10 temporary Stamina. Additionally, whenever you make a power roll that imposes forced movement on a target, the forced movement distance gains a bonus equal to your Agility score.'
					})
				})
			]
		}
	],
	abilities: [],
	selected: false
};
