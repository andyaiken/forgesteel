import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const highElf: Ancestry = {
	id: 'ancestry-high-elf',
	name: 'Elf (high)',
	description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elf history describes a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
	features: [
		FactoryLogic.feature.create({
			id: 'high-elf-feature-1',
			name: 'High Elf Glamor',
			description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you appear and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'high-elf-feature-2',
			name: 'High Elf Features',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-0',
						name: 'Glamor of Terror',
						description: 'When a foe strikes, you reverse the magic of your glamor to instill fear into their heart. Whenever you take damage from a creature, you can use a triggered action to make that creature frightened of you until the end of their next turn.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'high-elf-feature-2-1',
						name: 'Graceful Retreat',
						description: 'You gain a +1 bonus to the distance you can shift when you take the Disengage move action.',
						field: FeatureField.Disengage,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-2',
						name: 'High Senses',
						description: 'Your senses are especially keen and perceptive. You gain an edge on tests made to notice threats.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-4',
						name: 'Otherwordly Grace',
						description: 'Your elf body and mind can’t be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'high-elf-feature-2-3',
						name: 'Revisit Memory',
						description: 'Accessing memories is as easy as living in the present for you. You gain an edge on tests made to recall lore.'
					}),
					value: 1
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
