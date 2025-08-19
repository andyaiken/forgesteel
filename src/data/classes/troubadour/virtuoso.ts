import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const virtuoso: SubClass = {
	id: 'tWBfpTKQXZ12jGsU',
	name: 'Virtuoso',
	description: 'You find drama in music and song, weaving magic between vibrations and filling the audience with your pathos.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'zVuRuelOOMRXxCgG',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Music' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: '8OR9gvPtJN7cIZhh',
						name: 'Power Chord',
						description: 'Your instrument rings true and your music blows everyone away.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Presence ],
									tier1: 'Push 1',
									tier2: 'Push 2',
									tier3: 'Push 3'
								})
							)
						]
					})
				}),
				FactoryLogic.feature.createMultiple({
					id: 'zVLsFRY0V10dNuaA',
					name: 'Virtuoso Performances',
					description: `You have the following performance abilities, which are usable with
your Routines feature.`,
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'K0mQdfUHeiaVSsMN',
								name: '“Thunder Mother”',
								description: 'All for thunder motherrr! ♪ Run and hide for coverrr! ♪',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Magic, AbilityKeyword.Performance, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
								distance: [ FactoryLogic.distance.createRanged(10) ],
								target: 'One creature',
								sections: [
									FactoryLogic.createAbilitySectionText('At the end of each combat round while this performance is active, you can make a power roll against the target that ignores cover. You can’t target the same creature twice with this effect.'),
									FactoryLogic.createAbilitySectionRoll(
										FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: 'Lightning damage equal to your level',
											tier2: 'Lightning damage equal to 5 + your level',
											tier3: 'Lightning damage equal to 10 + your level'
										})
									)
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'T2lumbD5GNggb7kX',
								name: '“Ballad of the Beast”',
								description: 'Teeth are bare! ♪ Eyes black! ♪ No escaping the beast! ♪',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area gains 1 surge.')
								]
							})
						})
					]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'WcIsMpwQBuTdLdmv',
						name: 'Harmonize',
						description: 'Give the chorus a little punch.',
						type: FactoryLogic.type.createTrigger('The target uses an ability that targets only one enemy and costs 3 or fewer of their Heroic Resource.'),
						keywords: [ AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: 'One ally',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The target can choose one additional target for the triggering ability. Any damage dealt to the additional target is sonic damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								repeatable: true,
								effect: 'You can trigger this ability when a target uses an ability that has a Heroic Resource cost of 3 + each additional drama spent.'
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
					id: 'DWhLWnP0bwuHQ2qy',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'U3IGzrqBjqxWKD9K',
									name: 'Encore',
									description: 'Again! Again!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createSpecial('') ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You use an ability that you have observed being used this combat round. The ability must have the Strike keyword, cost 5 or fewer of a Heroic Resource, and cost no Malice. When you make the strike, you use your Presence score for any power rolls, and any damage you deal is sonic damage.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: '3eWhJl6vthKu3RY3',
									name: 'Tough Crowd',
									description: 'Your fans don’t seem to like the opening act …',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('The area is haunted by a swirling horde of phantoms until the end of the encounter. Allies can enter any square of the area without spending movement. At the end of each of your turns, you can make one power roll that targets each enemy in the area.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '5 corruption damage; m < [weak], pull 1 toward the center of the area',
												tier2: '9 corruption damage; m < [average], pull 2 toward the center of the area',
												tier3: '12 corruption damage; m < [strong], pull 3 toward the center of the area'
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
					id: 'gMLn35ehmeBT1RYV',
					name: 'Second Album',
					description: 'You have the following performance abilities, which are usable with your Routines feature.',
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'mWeNhxpEVJMjKcU8',
								name: '“Fire Up the Night”',
								description: 'Maybe you and I ♪ We can still bring the light! ♪',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area doesn’t take a bane on strikes against creatures with concealment. Once during their turn, they can search for hidden creatures as a free maneuver.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'lDpZJV6xP89zFb8e',
								name: '“Never-Ending Hero”',
								description: 'And toniiight we can truly say ♪ They will alllways find a way! ♪',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn dying while in the area gains an edge on power rolls and ignores the effects of bleeding until the end of their turn.')
								]
							})
						})
					]
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
					id: 'suMDtEOQggORQzn4',
					options: [
						{
							feature: FactoryLogic.feature.create({
								id: 'Qcz0plE7f3m2oMpE',
								name: 'Bolstering Banter',
								description: 'Once on each of your turns, you can use a free maneuver to exchange words with a target of your current performance, other than yourself. The target can spend a Recovery to gain temporary Stamina equal to their recovery value.'
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.create({
								id: 'k1vcKIoLARGr6Lsr',
								name: 'Medley',
								description: 'You can maintain two performances at a time using your Routines feature.'
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
					id: 'VD8b06zsDjeJpzlX',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'KVEuxjzQu7tvcsxH',
									name: 'Feedback',
									description: 'Your music pounds the crowd to the beat until their hearts can’t stand it anymore.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.createSpecial('Three 3 cubes within 1') ],
									target: 'Each enemy in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('A prone target ignores this ability.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '7 sonic damage; p < [weak], prone',
												tier2: '10 sonic damage; p < [average], prone',
												tier3: '13 sonic damage; p < [strong], prone'
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
									id: 'uPEJe3YMCKQ5no95',
									name: 'Legendary Drum Fill',
									description: 'You start a drumroll that roars like thunder with every impact the heroes make.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
									target: ' Self and each ally in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target gains 1 surge, then gains 1 surge at the start of each combat round until the end of the encounter.')
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
				FactoryLogic.feature.createMultiple({
					id: '17EPB8FMDm0rbPtb',
					name: 'Crowd Favorites',
					description: 'You have the following performance abilities, which are usable with your Routines feature.',
					features: [
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'cCAwy3SGtXi1BAgF',
								name: 'Moonlight Sonata',
								description: 'Music pours out of your heart, filling the area with the utmost delicacy and without damper.',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Each ally in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('While this performance is active, each target who is dead can choose to continue taking turns after death. On each of their turns, a target can move and use either a main action or a maneuver, but can’t spend Recoveries or use triggered actions. At the end of the encounter, each target who chose to take turns this way turns to dust and blows away.')
								]
							})
						}),
						FactoryLogic.feature.createAbility({
							ability: FactoryLogic.createAbility({
								id: 'uPCAVJRpZCks52hw',
								name: 'Radical Fantasia',
								description: '♪ Viras, my Viras, will you hold their hands as they cryyy-aaaiigh? ♪',
								type: FactoryLogic.type.createNoAction(),
								keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Performance ],
								distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
								target: 'Self and each ally in the area',
								sections: [
									FactoryLogic.createAbilitySectionText('While this performance is active, each target who starts their turn in the area ignores difficult terrain, and any ability they use that imposes forced movement gains a +2 bonus to the forced movement distance until the end of their turn. Additionally, once per combat round, each target can use a triggered action as a free triggered action.')
								]
							})
						})
					]
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'H8CN7zqO4hRni29m',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'ZDIrJmxVMJMwBES0',
									name: 'Jam Session',
									description: 'Your jam session creates new genres that compel everyone to get up and move.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 5 }) ],
									target: 'Each enemy in the area',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '8 sonic damage',
												tier2: '11 sonic damage',
												tier3: '15 sonic damage'
											})
										),
										FactoryLogic.createAbilitySectionText('Each creature within distance gains a +5 bonus to speed until the end of their next turn. While under this effect, each target must use their full movement during their turn.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'eY09PeFg3MJJSua6',
									name: 'Melt Their Faces',
									description: 'The power of music rips through the reality around the target and blows them away.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Melee, AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [
										FactoryLogic.distance.createMelee(),
										FactoryLogic.distance.createRanged(10)
									],
									target: 'One creature or object',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '12 + P sonic damage; push 5',
												tier2: '16 + P sonic damage; push 10',
												tier3: '22 + P sonic damage; push 15'
											})
										),
										FactoryLogic.createAbilitySectionText('Forced movement from this ability ignores stability.')
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
