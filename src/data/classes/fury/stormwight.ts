import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const stormwight: SubClass = {
	id: 'fury-sub-3',
	name: 'Stormwight',
	description: 'You channel your rage into the form of animals and primordial storms.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'fury-sub-3-1-1',
					listOptions: [ SkillList.Intrigue ],
					selected: [ 'Track' ]
				}),
				FactoryLogic.feature.createKitChoice({
					id: 'fury-sub-3-1-2',
					name: 'Beast Shape',
					types: [ 'Stormwight' ]
				}),
				FactoryLogic.feature.create({
					id: 'fury-sub-3-1-3',
					name: 'Relentless Hunter',
					description: 'You gain an edge on tests made using the Track skill.'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-3-1-4',
						name: 'Furious Change',
						description: 'In your anger, you revert to a more bestial form.',
						type: FactoryLogic.type.createTrigger('You lose Stamina and are not dying.'),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You gain temporary Stamina equal to your Might score and can enter your animal form or hybrid form.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'If you are not dying, you can spend a Recovery.'
							})
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'fury-sub-3-1-5',
						name: 'Aspect of the Wild',
						description: 'You assume the form of the animal who channels your ferocity.',
						keywords: [ AbilityKeyword.Magic ],
						type: FactoryLogic.type.createManeuver(),
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You can shapeshift into the animal defined by your stormwight kit, into a hybrid form, or back into your true form. While in animal form or hybrid form, you can speak as you usually do, and you can also speak to animals who share your form. If you are in a negotiation with an animal while in animal form, you treat your Renown as 2 higher than usual.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'As a free maneuver, you can shapeshift a second time, either into another animal form, into your hybrid form, or back into your true form.'
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
					id: 'fury-sub-3-2-1',
					name: 'Tooth and Claw',
					description: 'At the end of each of your turns, each enemy adjacent to you takes damage equal to your Might score.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-3-2-2',
					name: '2nd-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-2-2a',
									name: 'Apex Predator',
									description: 'I will hunt you down.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '4 + M damage; I < [weak], slowed (save ends)',
											tier2: '6 + M damage; I < [average], slowed (save ends)',
											tier3: '10 + M damage; I < [strong], slowed (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('The target can’t be hidden from you for 24 hours. Until the end of the encounter, whenever the target willingly moves, you can use a free triggered action to move.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-2-2b',
									name: 'Visceral Roar',
									description: 'The sound of the storm within you staggers your opponents.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Might ],
											tier1: '2 damage; push 1; M < [weak], dazed (save ends)',
											tier2: '5 damage; push 2; M < [average], dazed (save ends)',
											tier3: '7 damage; push 3; M < [strong], dazed (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('This ability deals your primordial damage type.')
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
					id: 'fury-sub-1-3-1',
					name: 'Nature’s Knight',
					description: `
You can speak with animals and elementals. Additionally, you automatically sense the presence of animals and elementals within 10 squares of you, even if they are hidden.

When you are in a negotiation with an animal or elemental, you treat your Renown as 1 higher than usual. This stacks with the increase to your effective Renown in a negotiation with an animal of your type while in animal form.`
				})
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-3-5-1',
					name: 'Stormborn',
					description: 'You and each ally within 5 squares of you ignore negative effects from inclement weather, such as banes or environmental damage. Additionally, you can use the Blessing of Fortunate Weather feature as if you were a 1st-level conduit (see 1st-Level Domain Feature in the Conduit section).'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-3-6-1',
					name: '6th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-6-1a',
									name: 'Pounce',
									description: 'You strike at the target like the ultimate predator you are.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '8 damage; M < [weak], grabbed',
												tier2: '13 damage; M < [average], grabbed',
												tier3: '17 damage; M < [strong], grabbed'
											})
										),
										FactoryLogic.createAbilitySectionText('You can shift up to 4 squares, bringing the target with you. While grabbed this way, the target takes damage equal to twice your Might score at the start of each of your turns.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-6-1b',
									name: 'Riders on the Storm',
									description: 'You focus your connection to the Primordial Chaos into a seething storm.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
									target: 'One creature',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each enemy target takes damage of your primordial damage type equal to twice your Might score at the end of each of your turns. Additionally, you can fly while the aura is active. Each ally target who starts or ends their turn in the area can also fly until the start of their next turn or until the effect ends.'),
										FactoryLogic.createAbilitySectionText('When you use this ability outside of combat without spending ferocity, you must spend 1 uninterrupted minute summoning a primordial storm that fills the area, and you take 1d6 damage before the ability takes effect. The storm lasts for 1 hour or until a combat encounter begins.')
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
			level: 8,
			features: [
				FactoryLogic.feature.create({
					id: 'fury-sub-3-8-1',
					name: 'Menagerie',
					description: 'You can use all stormwight kits. During a respite, you can choose to swap your stormwight kit and still take another respite activity. Your Nature’s Knight feature now lets you automatically sense the presence of animals within 1 mile of you. Additionally, whenever you make a test to track another creature, you can roll three dice and choose which two to use.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'fury-sub-3-9-1',
					name: '9th-Level Aspect Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'fury-sub-3-9-1a',
									name: 'Death Rattle',
									description: 'You unleash an otherworldly cry that rips through your enemies, killing the weakest of them.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '4 psychic damage; any target who is a minion is reduced to 0 Stamina',
												tier2: '6 psychic damage; any target who is a minion is reduced to 0 Stamina, as does one winded target who is not a leader or solo creature',
												tier3: '10 psychic damage; each target who is not a leader or solo creature is winded; any target who is a minion is reduced to 0 Stamina, as does one winded target who is not a leader or solo creature'
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
									id: 'fury-sub-3-9-1b',
									name: 'Deluge',
									description: 'You summon your primordial storm.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 5, within: 10 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Might ],
												tier1: '7 damage',
												tier2: '10 damage',
												tier3: '15 damage'
											})
										),
										FactoryLogic.createAbilitySectionText('This ability deals your primordial damage type and ignores damage immunity.')
									]
								})
							}),
							value: 1
						}
					]
				})
			]
		}
	],
	selected: false
};
