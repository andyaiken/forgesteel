import { EnvironmentData, OrganizationData, UpbringingData } from '@/data/culture-data';
import { AbilityKeyword } from '@/enums/ability-keyword';
import { Ancestry } from '@/models/ancestry';
import { Characteristic } from '@/enums/characteristic';
import { CultureType } from '@/enums/culture-type';
import { FactoryLogic } from '@/logic/factory-logic';

export const wodeElf: Ancestry = {
	id: 'ancestry-wode-elf',
	name: 'Elf (wode)',
	description: 'Children of the sylvan celestials and masters of the elf-haunted forests called wodes, wode elves see all forests as their domain by birthright. They know and enjoy their reputation among humans for snatching children who wander too far into the woods. Humans should fear the trees.',
	features: [
		FactoryLogic.feature.create({
			id: 'wode-elf-feature-1',
			name: 'Wode Elf Glamor',
			description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on tests made to hide and sneak, and tests made to search for you while you are hidden take a bane.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'wode-elf-feature-2',
			name: 'Wode Elf Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-1',
						name: 'Forest Walk',
						description: 'You can shift into and while within difficult terrain.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-2',
						name: 'Revisit Memory',
						description: 'Accessing memories is as easy as living in the present for you. You gain an edge on tests made to recall lore.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'wode-elf-feature-2-3',
						name: 'Swift',
						speed: 6
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createSaveThreshold({
						id: 'wode-elf-feature-2-4',
						name: 'Otherworldly Grace',
						description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.',
						value: 5
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'wode-elf-feature-2-5',
							name: 'The Wode Defends',
							description: 'Thorny vines erupt into existence and attempt to bind your foe.',
							type: FactoryLogic.type.createMain(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: 'One creature',
							cost: 'signature',
							sections: [
								FactoryLogic.createAbilitySectionRoll(
									FactoryLogic.createPowerRoll({
										characteristic: [ Characteristic.Might, Characteristic.Agility ],
										tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
										tier2: '3 + M or A damage; A < [average] slowed (save ends)',
										tier3: '5 + M or A damage; A < [strong] restrained (save ends)'
									})
								)
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-6',
						name: 'Quick and Brutal',
						description: 'Whenever you score a critical hit, you can take an additional main action and an additional move action instead of just a main action.'
					}),
					value: 1
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3,
	culture: FactoryLogic.createCulture('Wode Elf', 'Wilderness, bureaucratic, martial.', CultureType.Ancestral, EnvironmentData.wilderness, OrganizationData.bureaucratic, UpbringingData.martial, 'Yllyric')
};
