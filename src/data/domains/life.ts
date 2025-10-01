import { AbilityDistanceType } from '@/enums/abiity-distance-type';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Domain } from '@/models/domain';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';

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
							description: 'Each time you finish a respite, you can choose yourself or one ally who is also finishing a respite to gain the benefit of a divine ritual. The chosen character gains a bonus to their recovery value equal to your level that lasts until you finish another respite.'
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
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Aura, value: 3 }) ],
						target: 'Each ally in the area',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, whenever a target starts their turn in the area, they can spend a Recovery.')
						]
					})
				})
			]
		},
		{
			level: 3,
			features: []
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-life-4',
					name: 'Blessing of Life',
					description: 'Your divine presence causes those you deem worthy to recover quickly from a fight. Whenever an ally within distance of your Healing Grace ability regains Stamina, they regain additional Stamina equal to your Presence (censor) or Intuition (conduit) score.'
				})
			]
		},
		{
			level: 5,
			features: []
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-life-6',
						name: 'Revitalizing Grace',
						description: 'With a gesture, you restore your health and that of your allies.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Area, AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.create({ type: AbilityDistanceType.Burst, value: 4 }) ],
						target: 'Self and each ally in the area',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionText('Each target can spend any number of Recoveries. Additionally, each target can end one effect on themself that is ended by a saving throw or that ends at the end of their turn, or they can stand up if prone.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-life-7',
					name: 'Font of Grace',
					description: 'Each time you use your Healing Grace ability, you gain 1 piety that can be spent only on that ability during the same turn. If you don’t use this piety, it is lost. Additionally, you can use your Minor Miracle feature to return a creature to life even if you don’t have their remains.'
				})
			]
		},
		{
			level: 8,
			features: []
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'domain-life-9',
						name: 'Radiance of Grace',
						description: 'Intense light is emitted from your body, healing your allies.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Four Allies',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('You can target yourself instead of one ally with this ability. Each target can spend any number of Recoveries, can end any effects on them that are ended by a saving throw or that end at the end of their turn, and can stand up if they are prone.')
						]
					})
				})
			]
		},
		{
			level: 10,
			features: []
		}
	],
	resourceGains: [
		{
			resource: 'Piety',
			tag: '',
			trigger: 'The first time in an encounter that a creature within 10 squares regains Stamina',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'life-default-1',
			name: 'Life Prayer Effect',
			description: 'Choose yourself or one ally within 10 squares of you. That character can spend a Recovery, can end one effect on them that is ended by a saving throw or that end at the end of their turn, or can stand up if they are prone. Alternatively, you or one ally within 10 squares gains temporary Stamina equal to 2 times your Intuition score.',
			tag: 'conduit-prayer'
		})
	]
};
