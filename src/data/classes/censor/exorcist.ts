import { AbilityDistanceType } from '../../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../../enums/ability-keyword';
import { Characteristic } from '../../../enums/characteristic';
import { FactoryLogic } from '../../../logic/factory-logic';
import { SkillList } from '../../../enums/skill-list';
import { SubClass } from '../../../models/subclass';

export const exorcist: SubClass = {
	id: 'censor-sub-1',
	name: 'Exorcist',
	description: 'An open mind is an unguarded fortress. You specialize in hunting the hidden enemies of your order.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'censor-sub-1-1-1',
					listOptions: [ SkillList.Interpersonal ],
					selected: [ 'Read Person' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'censor-sub-1-1-2',
					name: 'Judgment Order Benefit',
					description: 'When you use your Judgment ability to judge another creature, you can teleport up to a number of squares equal to twice your Presence score. This movement must take you closer to the judged creature. You do not need line of effect to your destination.',
					tag: 'censor-judgment'
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.create({
					id: 'censor-sub-1-2-1',
					name: 'Saint\'s Vigilance',
					description: 'You have honed your ability to detect sin and can use it to find those who hide from justice. Any creature judged by you cannot take the Hide maneuver. You have an edge when searching for hidden creatures and, if you find a hidden creature, you can use Judgment on them as a free triggered action.'
				}),
				FactoryLogic.feature.create({
					id: 'censor-sub-1-2-2',
					name: 'A Sense for Truth',
					description: 'You are trained in secret techniques from your order that allow you to discern the truth at a supernatural level. This puts you in high demand for your church and any governments it is allied with. If a creature is of a lower level than you, you automatically know when they are lying, though you don’t necessarily know the actual truth behind their lie. Additionally, you have an edge on tests to detect lies or hidden motives, such as when using the Read Person skill.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'censor-sub-1-2-3',
					options: [
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-1-2-3a',
									name: 'It Is Justice You Fear',
									description: 'I am but a vessel. Your own deeds weigh upon you.',
									type: FactoryLogic.type.createAction(),
									keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
									distance: [ FactoryLogic.distance.createRanged(10) ],
									target: '1 creature',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionRoll(FactoryLogic.createPowerRoll({
											characteristic: [ Characteristic.Presence ],
											tier1: '8 + M holy damage; P < [weak], frightened (save ends)',
											tier2: '12 + M holy damage; P < [average], frightened (save ends)',
											tier3: '15 + M holy damage; P < [strong], frightened (save ends)'
										})),
										FactoryLogic.createAbilitySectionText('If the target is already frightened of you or another creature when you use this ability and it would frighten them again, they take psychic damage equal to twice your Presence score instead.')
									]
								})
							}),
							value: 1
						},
						{
							feature: FactoryLogic.feature.createAbility({
								ability: FactoryLogic.createAbility({
									id: 'censor-sub-1-2-3b',
									name: 'Revelator',
									description: 'You channel holy energy to harm unbelievers and reveal those hidden from your judgment.',
									type: FactoryLogic.type.createManeuver(),
									keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
									distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 3 }) ],
									target: 'Each enemy in the area',
									cost: 5,
									sections: [
										FactoryLogic.createAbilitySectionText('Each target takes twice your Presence in holy damage. Any hidden enemies are automatically revealed and can’t become hidden again until the start of your next turn. You can use Judgment on one of the targets as a free triggered action.')
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
