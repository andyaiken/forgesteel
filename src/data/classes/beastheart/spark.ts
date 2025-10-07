import { AbilityKeyword } from '@/enums/ability-keyword';
import { FactoryLogic } from '@/logic/factory-logic';
import { PerkData } from '@/data/perk-data';
import { SkillList } from '@/enums/skill-list';
import { SubClass } from '@/models/subclass';

export const spark: SubClass = {
	id: 'beastheart-sub-4',
	name: 'Spark',
	description: 'Your connection with nature has imbued you and your companion with the raging magic of the elemental storm. Flame, frost, and lightning crackle from your hands and claws.',
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.createSkillChoice({
					id: 'beastheart-sub-4-1-1',
					listOptions: [ SkillList.Lore ],
					selected: [ 'Magic' ]
				}),
				FactoryLogic.feature.createPackageContent({
					id: 'beastheart-sub-4-1-2',
					name: 'Wild Nature Benefit',
					description: 'This strike deals cold, fire, lightning, or sonic damage. You gain a surge.',
					tag: 'feral-strike'
				}),
				FactoryLogic.feature.createAbility({
					ability: FactoryLogic.createAbility({
						id: 'beastheart-sub-4-1-3',
						name: 'Self-Immolate',
						description: 'You vanish in a sizzling burst of elemental energy.',
						type: FactoryLogic.type.createTrigger('You take damage.'),
						keywords: [ AbilityKeyword.Magic ],
						distance: [ FactoryLogic.distance.createSelf() ],
						target: 'Self',
						sections: [
							FactoryLogic.createAbilitySectionText('You teleport up to 5 spaces and halve the triggering damage.'),
							FactoryLogic.createAbilitySectionField({
								name: 'Spend',
								value: 1,
								effect: 'When you teleport in this way, each enemy adjacent to your original position takes cold, fire, lightning, or sonic damage equal to your Intuition score.'
							})
						]
					})
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createPerk({
					id: 'beastheart-sub-4-2-1a',
					selected: [ PerkData.wildsExplorer ]
				}),
				FactoryLogic.feature.create({
					id: 'beastheart-sub-4-2-1b',
					name: 'Elemental Core',
					description: 'Whenever you or your companion deals damage with no type or deals cold, fire, lightning, or sonic damage, you can change the damage type to cold, fire, lightning, or sonic damage.'
				}),
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-2-2',
					name: 'Spark Ability',
					options: [
						// TODO: Burning Lash
						// TODO: Howling Gale
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
					id: 'beastheart-sub-4-5-1',
					name: 'Suspended Teleportation',
					description: 'When you or your companion teleports using Self-Immolate, they can choose to take a breather in a cozy backwater of Quintessence before arriving. They are removed from the encounter. At the start of your next turn, they can spend a Recovery and they reappear in a space within 5 squares of their original position.'
				})
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-6-1',
					name: 'Spark Ability',
					options: [
						// TODO: Elemental Form
						// TODO: Killing Frost
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
					id: 'beastheart-sub-4-8-1',
					name: 'Walk Through Flames',
					description: 'You both gain damage immunity 10 to cold, fire, lightning, and sonic damage.'
				})
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createChoice({
					id: 'beastheart-sub-4-9-1',
					name: 'Spark Ability',
					options: [
						// TODO: Phoenix Ascendant
						// TODO: Wild Hunt
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
