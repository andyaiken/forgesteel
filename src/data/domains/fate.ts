import { AbilityKeyword } from '@/enums/ability-keyword';
import { Characteristic } from '@/enums/characteristic';
import { Domain } from '@/models/domain';
import { FactoryLogic } from '@/logic/factory-logic';
import { SkillList } from '@/enums/skill-list';

export const fate: Domain = {
	id: 'domain-fate',
	name: 'Fate',
	description: 'The Fate domain.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createMultiple({
					id: 'domain-fate-1',
					features: [
						FactoryLogic.feature.create({
							id: 'domain-fate-1-1',
							name: 'Oracular Visions',
							description: 'Your deity rewards you with hazy visions of things to come. Each time you earn 1 or more Victories, you earn an equal number of fate points. Whenever you or a creature within 10 squares makes a test, you can spend 1 fate point to tap into a vision of the outcome, granting that creature an edge on the test. You lose any remaining fate points when you finish a respite.'
						}),
						FactoryLogic.feature.createSkillChoice({
							id: 'domain-fate-1-2',
							listOptions: [ SkillList.Lore ]
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
						id: 'domain-fate-2',
						name: 'Blessing of Fate and Destiny',
						description: 'Your enemies suffer their fate; your allies embrace their destiny!',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Three creatures',
						cost: 5,
						sections: [
							FactoryLogic.createAbilitySectionText(`
You can target yourself instead of one creature with this ability. Choose one of the following effects, which lasts until the end of the encounter or until you are dying:

* Whenever a target makes a power roll, they can roll three dice and choose which two rolls to use.
* Whenever a target makes a power roll, they must roll three dice and use the lowest two rolls.`)
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
					id: 'domain-fate-4',
					name: 'Oracular Warning',
					description: 'Each time you finish a respite, you can share the vague dreams of the future granted to you by the gods with allies who finished the respite with you. These premonitions help you and your allies stay alive, granting each of you temporary Stamina equal to 10 + your level that lasts until you finish a respite.'
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
						id: 'domain-fate-6',
						name: 'Your Story Ends Here',
						description: 'You bend the fate of a foe, willing them to die.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'One creature',
						cost: 9,
						sections: [
							FactoryLogic.createAbilitySectionRoll(
								FactoryLogic.createPowerRoll({
									characteristic: [ Characteristic.Intuition ],
									tier1: '9 + I corruption damage; R < [weak], weakened (save ends)',
									tier2: '14 + I corruption damage; R < [average], weakened (save ends)',
									tier3: '19 + I corruption damage; R < [strong], weakened (save ends)'
								})
							),
							FactoryLogic.createAbilitySectionText('If this damage kills the target, you and each ally within distance can spend a Recovery.')
						]
					})
				})
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.create({
					id: 'domain-fate-7',
					name: 'Word of Fate Denied',
					description: 'When an ally within 10 squares takes damage that would leave them dying, you can use a free triggered action to make yourself or another willing creature within 10 squares of you the target of the triggering damage instead. The creature you choose takes the damage and suffers any effects associated with it, and that damage can’t be reduced in any way.'
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
						id: 'domain-fate-9',
						name: 'Bend Fate',
						description: 'The gods know you must prevail, and they bless your fate.',
						type: FactoryLogic.type.createMain(),
						keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged ],
						distance: [ FactoryLogic.distance.createRanged(10) ],
						target: 'Self or one ally',
						cost: 11,
						sections: [
							FactoryLogic.createAbilitySectionText('Until the end of the encounter or until you are dying, each of the target’s power rolls has its outcome improved by one tier.')
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
			trigger: 'The first time in an encounter that an ally within 10 squares of you obtains a tier 3 outcome on a power roll or an enemy within 10 squares of you obtains a tier 1 outcome on a power roll',
			value: '2'
		}
	],
	defaultFeatures: [
		FactoryLogic.feature.createPackageContent({
			id: 'fate-default-1',
			name: 'Fate Prayer Effect',
			description: 'You call on the forces of fate to create a reliable future. Choose a creature within 10 squares. That creature automatically gets a tier 1 or tier 3 outcome (your choice) on their next power roll made before the end of the encounter.',
			tag: 'conduit-prayer'
		})
	]
};
