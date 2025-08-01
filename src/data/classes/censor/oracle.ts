import { AbilityKeyword } from '../../../enums/ability-keyword';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const oracle: SubClass = {
	id: 'censor-sub-2',
	name: 'Oracle',
	description: 'Corruption has deep tendrils that can be missed. You specialize in uncovering long-timescale threats to your order.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-sub-2-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'censor-sub-2-1-2',
					name: 'Judgment Order Benefit',
					description: 'When you use your Judgment ability to judge another creature, you deal holy damage equal to twice your Presence score to the target.',
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
					description: 'Your order has trained you to understand fragments of the constant visions given to you by your deity, giving you a momentary advantage in challenging situations. At the start of an encounter, you can take one action before any other creature and before your first turn. Additionally, whenever a montage test is called for, you can make one test before the montage begins.'
				}),
				FactoryLogic.feature.create({
					id: 'censor-sub-2-2-2',
					name: 'Judge of Character',
					description: 'Your focus on your fragmentary visions to gain divine insight on creatures and the world beyond your normal senses. Whenever you would make an Intuition test, you can make a Presence test instead.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-2-2-3',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-2-2-3a',
									name: 'Prescient Grace',
									description: '“Hah! I see your plan. It will not work!”',
									type: FactoryLogic.type.createTrigger('An enemy within 10 squares starts their turn.'),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: 'Self or one ally',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('You can spend a Recovery to allow the target to regain Stamina equal to your Recovery value. The target can then take their turn immediately before the triggering enemy.')
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
										FactoryLogic.createAbilitySectionText('When you use this ability, the target can use a free triggered action to make a signature strike or a heroic ability that is a strike, and has a double edge on the power roll.')
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
		}
	],
	selected: false
};
