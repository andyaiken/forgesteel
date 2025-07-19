import { AbilityDistanceType } from '../../enums/abiity-distance-type';
import { AbilityKeyword } from '../../enums/ability-keyword';
import { Domain } from '../../models/domain';
import { FactoryLogic } from '../../logic/factory-logic';
import { SkillList } from '../../enums/skill-list';

export const life: Domain = {
	id: 'domain-life',
	name: 'Life',
	description: 'The Life domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-life-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-life-1-1',
							name: 'Revitalizing Ritual',
							description: 'Each time you finish a respite, you can choose yourself or an ally who is also ending a respite to gain the benefit of a divine ritual. When you perform the ritual, the chosen character gains a bonus to their recovery value equal to your level, which lasts until you finish another respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-life-1-2',
							listOptions: [ SkillList.Exploration ]
						})
					]
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-life-2',
						name: 'Wellspring of Grace',
						description: 'A holy light is emitted from your body, healing your allies.',
						type: FactoryLogic.type.createAction(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or you are dying, whenever a target starts their turn in the aura, they can spend a Recovery.')
						]
					})
				})
			]
		},
		{
			level: 3,
			features: []
		}
	],
	piety: `
* Piety: You gain 2 piety the first time in an encounter that a creature within 10 squares of you regains Stamina.
* Prayer Effect: Choose yourself or one ally within 10 squares of you. The targets can spend a Recovery, can end any effects on them that are ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you and one ally within 10 squares of you gain temporary Stamina equal to 5 × your Intuition score.`
};
