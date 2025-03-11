import { AbilityKeyword } from '../../enums/ability-keyword';
import { Ancestry } from '../../models/ancestry';
import { Characteristic } from '../../enums/characteristic';
import { FactoryLogic } from '../../logic/factory-logic';

export const wodeElf: Ancestry = {
	id: 'ancestry-wode-elf',
	name: 'Elf (wode)',
	description: 'Children of the sylvan celestials and masters of the elf-haunted forests called wodes, wode elves see all forests as their domain by birthright. They know and enjoy their reputation among humans for snatching children who wander too far into the woods. Humans should fear the trees.',
	features: [
		FactoryLogic.feature.create({
			id: 'wode-elf-feature-1',
			name: 'Wode Elf Glamor',
			description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on Agility tests made to hide and sneak, and tests made to find you while you are hidden take a bane.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'wode-elf-feature-2',
			name: 'Wode Elf Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-1',
						name: 'Forest Walk',
						description: 'You can shift into difficult terrain.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-2',
						name: 'Revisit Memory',
						description: 'Accessing memories is as easy as living in the present for you. You have an edge on all tests made to recall lore.'
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
					feature: FactoryLogic.feature.create({
						id: 'wode-elf-feature-2-4',
						name: 'Otherworldly Grace',
						description: 'Your elf body and mind can’t be contained for long. You succeed on saving throws when you get a 5 or higher.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'wode-elf-feature-2-5',
							name: 'The Wode Defends',
							description: 'Thorny vines erupt into existence and attempt to bind your foe.',
							type: FactoryLogic.type.createAction(),
							keywords: [ AbilityKeyword.Magic, AbilityKeyword.Ranged, AbilityKeyword.Strike ],
							distance: [ FactoryLogic.distance.createRanged(10) ],
							target: '1 creature',
							powerRoll: FactoryLogic.createPowerRoll({
								characteristic: [ Characteristic.Might, Characteristic.Agility ],
								tier1: '2 + M or A damage; A < [weak] slowed (save ends)',
								tier2: '3 + M or A damage; A < [average] slowed (save ends)',
								tier3: '5 + M or A damage; A < [strong] restrained (save ends)'
							})
						})
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
