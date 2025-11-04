import { Ancestry } from '@/models/ancestry';
import { ConditionType } from '@/enums/condition-type';
import { FactoryLogic } from '@/logic/factory-logic';

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
			description: 'Your body is light for a creature of your height. Whenever another creature attempts to force move you, you treat your size as one size smaller than it is.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'memonek-feature-3',
			name: 'Memonek Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-1',
						name: 'I Am Law',
						description: 'Your lawful nature and quick reflexes mean you give no quarter to creatures trying to get past you. Enemies can’t move through your space unless you allow them to do so.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-2',
						name: 'Systematic Mind',
						description: 'You gain an edge on tests made to parse schematics, maps, and other systematic documents that aren’t inherently chaotic. In addition, you treat any language you don’t know as if you know a related language.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-3',
						name: 'Unphased',
						description: 'Your ordered mind can’t be caught off guard. You can’t be made surprised.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'memonek-feature-3-4',
						name: 'Useful Emotion',
						description: 'Velloparatha - the worldsickness - might hinder, but you know how to turn your pain into something your enemies feel. At the start of any combat, you gain 1 surge.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'memonek-feature-3-5',
							name: 'Keeper of Order',
							description: 'Your connection to Axiom, the plane of Uttermost Law, allows you to manage chaos around you.',
							type: FactoryLogic.type.createTrigger('You, or a creature adjacent to you, makes a power roll', { free: true }),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You can remove an edge or a bane on the roll, turn a double edge into an edge, or turn a double bane into a bane. You can only use this benefit once per round.')
							]
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
						description: 'Your connection to Axiom allows you to regulate your movement.',
						conditions: [ ConditionType.Slowed ]
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 4
};
