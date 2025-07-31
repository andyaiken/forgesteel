import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
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
						description: 'You are exceptionally strong. You gain an edge on tests made to lift and haul heavy objects.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-2',
						name: 'Forceful',
						description: 'Whenever you force move a creature or object, the forced movement distance gains a +1 bonus.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-3',
						name: 'Stand Tough',
						description: 'Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature’s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'hakaan-feature-2-4',
						name: 'Great Fortitude',
						description: 'Your hearty constitution prevents you from losing strength.',
						conditions: [ ConditionType.Weakened ]
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'hakaan-feature-2-5',
						name: 'Doomsight',
						description: `
Working with your Director, you can predetermine an encounter in which you will die. When that encounter begins, you become doomed. While doomed, you automatically obtain a tier 3 outcome on tests and ability rolls, and you don’t die no matter how low your Stamina falls. You then die immediately at the end of the encounter, and can’t be returned to life by any means.

If you don’t predetermine your death encounter, you can choose to become doomed while you are dying with the Director’s approval (no action required). Doing so should be reserved for encounters in which you are dying as a result of suitable heroism, such as making a last stand against a boss or saving civilians, or when the consequences of your actions have finally caught up to you — not because you’re playing a one-shot and have nothing to lose, Hacaarl.

Additionally, when your Stamina reaches the negative of your winded value and you are not doomed, you turn to rubble instead of experiencing death. You are unaware of your surroundings in this state, and you can’t regain Stamina or have this effect undone in any way. After 12 hours, you regain Stamina equal to your Recovery value.`
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
