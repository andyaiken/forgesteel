import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';

export const hakaan: Ancestry = {
	id: 'ancestry-hakaan',
	name: 'Hakaan',
	description: 'In spite of their friendly, outgoing nature, the rare presence of a hakaan in human society is considered a harbinger - an omen of dark times. Descended from a tribe of giants in upper Vanigar, the original Haka’an tribe made a bargain with Holkatja the Vanigar trickster god. They traded some of their gigantic size and strength for the ability to see the future.',
	features: [
		FactoryLogic.feature.createSize({
			id: 'hakaan-feature-1',
			name: 'Big!',
			sizeValue: 1,
			sizeMod: 'L'
		}),
		FactoryLogic.feature.createChoice({
			id: 'hakaan-feature-2',
			name: 'Hakaan Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-1',
						name: 'All Is A Feather',
						description: 'You are exceptionally strong and have an edge made on tests that use the Lift skill.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-2',
						name: 'Forceful',
						description: 'When you force move a creature or object, you can increase the distance moved by 1.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-3',
						name: 'Stand Tough',
						description: 'Your body is made to withstand the blows of your enemies. Your Might score counts as 1 higher for resisting potencies.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-4',
						name: 'Great Fortitude',
						description: 'Your hearty constitution prevents you from losing strength. You can’t be weakened.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-5',
						name: 'Doomsight',
						description: `
Working with your Director, you can predetermine an encounter in which you will die. When that encounter begins, you become doomed. While doomed, you automatically get tier 3 results on tests and ability power rolls, and you don’t die no matter how low your Stamina falls. You then die immediately at the end of the encounter.

If you don’t predetermine your death encounter, you can choose to become doomed while you are dying with the director’s approval (no action required). Doing so should be reserved for encounters in which you are dying as a result of suitable heroism, such as making a last stand against a boss or saving civilians, or when the consequences of your actions have finally caught up to you.

Additionally, when your Stamina equals the negative of your winded value and you are not doomed, you turn to rubble instead of experiencing death. You are unaware of your surroundings in this state. After 12 hours, you regain Stamina equal to your Recovery value.`
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
