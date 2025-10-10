import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { FactoryLogic } from '@/logic/factory-logic';
import { SubClass } from '@/models/subclass';

export const oracle: SubClass = {
	id: 'censor-sub-2',
	name: 'Oracle',
	description: 'Corruption has deep tendrils that can be missed, leading you to specialize in uncovering clandestine threats to your order.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-sub-2-1-1',
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'censor-sub-2-1-2',
					name: 'Judgment Order Benefit',
					description: 'You can deal holy damage equal to twice your Presence score to the judged creature.',
					tag: 'censor-judgment'
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-2-2-1',
					name: 'It Was Foretold',
					description: 'Your order has trained you to understand fragments of the visions granted to you by your deity, giving you a momentary advantage in challenging situations. At the start of an encounter, you can take one main action before any other creature and before your first turn. Additionally, whenever the Director calls for a montage test, you can make one free test before the montage begins, which counts as an earned success or failure as usual.'
				}),
				FactoryLogic.feature.create({
					id: 'censor-sub-2-2-2',
					name: 'Judge of Character',
					description: 'Your focus on your fragmentary visions grants divine insight into the world and its creatures beyond your usual senses. Whenever you would make an Intuition test, you can make a Presence test instead.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-2-2-3',
					name: '2nd-Level Oracle Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-2-3a',
									name: 'Prescient Grace',
									description: 'Gifted by a prescient vision, you warn an ally of an impending attack.',
									type: FactoryLogic.type.createTrigger('An enemy within 10 squares starts their turn.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Self or one ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You can spend a Recovery to allow the target to regain Stamina equal to your recovery value. The target can then take their turn immediately before the triggering enemy.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-2-3b',
									name: 'With My Blessing',
									description: 'A word in prayer, and the gods show the way.',
									type: FactoryLogic.type.createMain(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Self or one ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('The target can use a free triggered action to use a strike signature ability or a strike heroic ability, and has a double edge on that ability. If a heroic ability is chosen, reduce its Heroic Resource cost by 3 (to a minimum cost of 0).')
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
					id: 'censor-sub-2-3-1',
					name: 'Prophecy',
					description: `You can better sift through the constant fragmentary visions from your deity and act to make them manifest. Each time you earn 1 or more Victories, you can make a number of 2d10 rolls equal to the number of Victories you earned. Record each roll in order. Then whenever you or a creature within 10 squares makes a power roll, you can use a free triggered action to replace the total on the dice with your first recorded roll.

You discard each roll as it is used, and each time you earn Victories, you
add new rolls to the bottom of the list. Any unused rolls are discarded
when you finish a respite.
					`
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-2-4-1',
					name: '6th-Level Oracle Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-4-1a',
									name: 'Burden of Evil',
									description: 'You reveal a vision of your enemies’ fate that causes them to scramble as it staggers them.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Three enemies',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: 'Slide 3; I < [weak], dazed (save ends)',
											tier2: 'Slide 5; I < [average], dazed (save ends)',
											tier3: 'Slide 7; I < [strong], dazed (save ends)'
										}))
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-4-1b',
									name: 'Edict of Peace',
									description: 'You anticipate your foes’ moves and deny them.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 9,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, whenever any target takes a triggered action or a free triggered action, that action is negated and the target takes holy damage equal to your Presence score.')
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
					id: 'censor-sub-2-5-1',
					name: 'Their Past Revealed',
					description: 'Your constant fragmentary visions become clearer, and can be honed to understand the past of creatures you interact with. While speaking with any creature, you can make a medium Presence test to see visions from their past. On a success, you see a clear view of any subject related to the creature’s past that you wish to understand. On a success with a consequence, you see two visions, one false and one true. On a failure, you lose 2d6 Stamina.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-2-6-1',
					name: '9th-Level Oracle Ability',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-6-1a',
									name: 'Blessing and a Curse',
									description: 'The gods bless and damn in equal measure.',
									type: FactoryLogic.type.createTrigger('The target makes a power roll.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One creature',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('The target obtains a tier 1 or tier 3 outcome on their power roll (your choice). You can then choose another target within distance, who obtains the opposite outcome on their next power roll.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-6-1b',
									name: 'Fulfill Your Destiny',
									description: 'You have looked at various futures, and only this one works.',
									type: FactoryLogic.type.createTrigger('You or another hero ends their turn.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'One ally',
									cost: 11,
									sections: [
										FactoryLogic.createAbilitySectionText('The target takes their turn after the triggering hero, and immediately removes all conditions and negative effects on themself. During their turn, the target has a double edge on power rolls.')
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
