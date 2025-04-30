import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
import { FactoryLogic } from '../../logic/factory-logic';

export const memonek: Ancestry = {
	id: 'ancestry-memonek',
	name: 'Memonek',
	description: 'The native denizens of Axiom, the Plane of Uttermost Law, memonek dwell in a land with lakes and trees and birds and flowers. But on this alien world, the lakes are seas of mercury, the birds glitter with wings of glass stretched gossamer thin, and the flowers’ petals are iridescent metal as flexible and fragile as any earthly rose.',
	features: [
		FactoryLogic.feature.create({
			id: 'memonek-feature-1',
			name: 'Fall Lightly',
			description: 'Your silicone body is low in density. Whenever you fall, you reduce the distance of the fall by 2 squares.'
		}),
		FactoryLogic.feature.create({
			id: 'memonek-feature-2',
			name: 'Lightweight',
			description: 'Your body is light for a creature of your height. Your size is considered 1S when being force moved by another creature.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'memonek-feature-3',
			name: 'Memonek Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-1',
						name: 'I Am Law',
						description: 'Your lawful nature and quick reflexes give no quarter to enemies trying to get around you. Enemy creatures can’t pass through your space unless you allow them to do so.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-2',
						name: 'Systematic Mind',
						description: 'You have an edge on tests to parse schematics, maps, and other systematic documentation that aren’t inherently chaotic. In addition, you interact with any language you don’t know as if you know a related language, whether or not you actually do.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-3',
						name: 'Unphased',
						description: 'Your ordered mind can’t be caught off guard. You can’t be surprised.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-4',
						name: 'Useful Emotion',
						description: 'Velloparatha might hinder, but it also fuels your strikes. You know how to turn your pain into something your enemies feel. When combat starts, you gain one surge.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'memonek-feature-3-5',
							name: 'Keeper of Order',
							description: 'Your connection to Axiom, the plane of uttermost law, allows you manage chaos around you.',
							type: FactoryLogic.type.createTrigger('You, or a creature adjacent to you, makes a power roll', { free: true }),
							keywords: [],
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							effect: 'You can remove an edge or a bane on the roll. You can only use this benefit once per round.'
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createSpeed({
						id: 'memonek-feature-3-6',
						name: 'Lightning Nimbleness',
						description: 'You can push your body to move at incredible speeds. Your Speed is 7.',
						speed: 7
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'memonek-feature-3-7',
						name: 'Nonstop',
						description: 'Your connection to Axiom allows you to regulate your movements, even when other creatures would be forced to pause.',
						conditions: [ ConditionType.Slowed ]
					}),
					value: 2
				}
			],
			count: 4
		})
	]
};
