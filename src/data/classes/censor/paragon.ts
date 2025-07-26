import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const paragon: SubClass = {
	id: 'censor-sub-3',
	name: 'Paragon',
	description: 'Without a strong example and a firm hand, the weak will be corrupted. You specialize in setting a visible example for your order.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-sub-3-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Lead' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'censor-sub-3-1-2',
					name: 'Judgment Order Benefit',
					description: 'When you use your Judgment ability to judge another creature, you vertically pull the target up to a number of squares equal to twice your Presence score.',
					tag: 'censor-judgment'
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-3-2-1',
					name: 'Lead by Example',
					description: 'Your devotion to your deity allows you to take command of the battlefield, letting your allies benefit from your wisdom. When you are adjacent to a target, any ally gains the benefits of flanking against that target. Additionally, each of your allies gains an edge on tests made to aid other creatures with their tests.'
				}),
				FactoryLogic.feature.create({
					id: 'censor-sub-3-2-2',
					name: 'Stalwart Example',
					description: 'You begin to exhibit a small spark of your deity’s power, causing creatures to trust or fear you, depending on what you need. You gain an edge on tests that use skills from the interpersonal skill group.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-3-2-3',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-2-3a',
									name: 'Blessing of the Faithful',
									description: 'The gods reward your faith.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
									target: 'Self and each ally in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, each target in the aura gains a surge at the end of each of your turns.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-3-2-3b',
									name: 'Sentenced',
									description: 'I am the law!',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon ],
									distance: [ FactoryLogic.distance.createMelee() ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: '5 + P damage; P < [weak], restrained (save ends)',
											tier2: '9 + P damage; P < [average], restrained (save ends)',
											tier3: '12 + P damage; P < [strong], restrained (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('Any of your abilities that impose forced movement can move the target while they are restrained this way.')
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
