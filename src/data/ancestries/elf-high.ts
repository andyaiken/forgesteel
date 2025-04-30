import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const highElf: Ancestry = {
	id: 'ancestry-high-elf',
	name: 'Elf (high)',
	description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elves remember a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
	features: [
		FactoryLogic.feature.create({
			id: 'high-elf-feature-1',
			name: 'High Elf Glamor',
			description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you look and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'high-elf-feature-2',
			name: 'High Elf Features',
			options: [
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'high-elf-feature-2-1',
						name: 'Graceful Retreat',
						description: 'When you take the Disengage move action, you can shift 1 additional square as part of the move action.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-2',
						name: 'High Senses',
						description: 'You have senses that are keen and perceptive. You have an edge on Intuition tests that use the Awareness skill.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-3',
						name: 'Revisit Memory',
						description: 'Accessing memories is as easy as living in the present for you. You have an edge on all tests made to recall lore.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-4',
						name: 'Otherwordly Grace',
						description: 'Your elf body and mind can’t be contained for long. You succeed on saving throws when you get a 5 or higher.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'high-elf-feature-2-5',
						name: 'Unstoppable Mind',
						description: 'Your mind allows you to maintain your focus in any situation.',
						conditions: [ ConditionType.Dazed ]
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
