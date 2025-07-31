import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const virtuoso: SubClass = {
	id: 'troubadour-sub-3',
	name: 'Virtuoso',
	description: 'You find drama in music and song, weaving magic between the vibrations of your sound and filling the audience with your pathos.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'troubadour-sub-3-1-0',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Music' ]
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-3-1-1',
						name: 'Power Chord',
						description: 'Your instrument rings true and your music blows everyone away.',
						type: FactoryLogic.type.createManeuver(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 2 }) ],
						target: 'Each enemy in the area',
						sections: [
							FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Presence ],
								tier1: 'Push 1',
								tier2: 'Push 2',
								tier3: 'Push 3'
							}))
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-3-1-2',
						name: 'Thunder Mother',
						description: 'All for thunder motherrr! 🎵 Run and hide for coverrr! 🎵',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Routine, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: '1 creature',
						sections: [
							FactoryLogic.createAbilitySectionText('At the end of each round while this routine is active, make a power roll that ignores cover. You can’t target the same creature twice with this effect'),
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
						id: 'troubadour-sub-3-1-3',
						name: 'Ballad of the Beast',
						description: 'Teeth are bare! 🎵 Eyes black! 🎵 No escaping the beast! 🎵',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, each target who starts their turn in the aura gains a surge.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-3-1-4',
						name: 'Harmonize',
						description: 'Give the chorus a little punch.',
						type: FactoryLogic.type.createTrigger('The target uses a non-area ability that targets one enemy.'),
						keywords: [],
						distance: [ FactoryLogic.distance.createRanged(5) ],
						target: '1 ally',
						cost: 3,
						sections: [
							FactoryLogic.createAbilitySectionText('The target chooses an additional target for the triggering ability within distance of that ability. They use the original power roll for all additional targets. Any damage dealt to an additional target is sonic damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 2,
								effect: 'The target chooses two additional targets instead of one.'
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
					id: 'troubadour-sub-3-2-1',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-3-2-1a',
									name: 'Encore',
									description: 'Again! Again!',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createSpecial('Special') ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You recreate and enact a strike you have observed this round. The strike can’t be one that uses Malice. When you make the strike, you use your Presence score for any power rolls, and any damage you deal is sonic damage.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'troubadour-sub-3-2-1b',
									name: 'Tough Crowd',
									description: 'Your fans don’t seem to like the opening act …',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Cube, value: 3, within: 10 }) ],
									target: 'Special',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('The affected area becomes haunted by a swirling horde of phantoms until the end of the encounter. Any ally can enter any square of the area without spending movement. At the end of each of your turns, you can make a power roll against each enemy in the area.'),
										FactoryLogic.createAbilitySectionRoll(
											FactoryLogic.createPowerRoll({
												characteristic: [ Characteristic.Presence ],
												tier1: '5 corruption damage; M < [weak], pull 1 toward the center of the area',
												tier2: '9 corruption damage; M < [average], pull 2 toward the center of the area',
												tier3: '12 corruption damage; M < [strong], pull 3 toward the center of the area'
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
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-3-3-1',
						name: 'Fire Up the Night',
						description: 'Maybe you and I 🎵 We can still bring the light! 🎵',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, each target who starts their turn in the aura doesn’t take a bane on attacks against a creature with concealment. They can also search for hidden creatures as a free maneuver once during their turn.')
						]
					})
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'troubadour-sub-3-3-2',
						name: 'Neverending Hero',
						description: 'And toniiight we can truly say 🎵 They will alllways find a way! 🎵',
						type: FactoryLogic.type.createNoAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic, AbilityKeyword.Routine ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 5 }) ],
						target: 'Self and each ally in the area',
						sections: [
							FactoryLogic.createAbilitySectionText('While this routine is active, each target who starts their turn dying while in the aura gains an edge on power rolls and ignores the effects of bleeding until the end of their turn.')
						]
					})
				})
			]
		}
	],
	selected: false
};
