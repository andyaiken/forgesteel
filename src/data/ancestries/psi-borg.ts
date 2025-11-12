import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';

export const psiBorg: Ancestry = {
	id: 'ancestry-psi-borg',
	name: 'Psi-Borg',
	description: 'Flesh and blood fused with crystal and technology, a union disdained by most timescape governance. Whether implanted through black markets or created under the tight leash of UNISOL, the life of a Psi-borg is far from comfortable. It is not uncommon for Psi-borgs to flee to lower-energy worlds in search of escape. They were outlawed in the earliest days of UNISOL, following their devastating use in the First Psychic War.',
	features: [
		FactoryLogic.feature.createAncestry({
			id: 'psi-borg-feature-1',
			name: 'Vessel of Flesh',
			description: 'Choose the ancestry you were before you were improved! Your size is that ancestry’s size and your speed is 5. Unless you select one of the Vestige of the Vessel traits (see below), you don’t receive any other ancestral traits from your original ancestry.'
		}),
		FactoryLogic.feature.create({
			id: 'psi-borg-feature-2',
			name: 'Certainty of the Artificial',
			description: `
Most of your body has been replaced with psionic implants that allow you to function more reliably. You don’t require food, water, or air.

The enhancements are largely hidden with artificial skin and minor illusions although you may decide that the enhancements are visually noticeable to an unavoidable extent (Crystal Limbs, External Machinery, etc). If this is the case you gain an additional ancestry point and are most likely wanted by UNISOL. Directors should consider how common a presence UNISOL is in their campaign and how NPCs would react to a visually obvious Psi-borg character.`
		}),
		FactoryLogic.feature.createChoice({
			id: 'psi-borg-feature-3',
			name: 'Psi-Borg Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'psi-borg-feature-3-1',
						name: 'Psi-Brand',
						description: 'You are an agent of UNISOL and maintain direct communication with your handler. As long as you continue to support UNISOL’s interests, you may call in favours. Make sure to talk to your Director about the limits of aid given by UNISOL and how it would work in practice.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'psi-borg-feature-3-2',
						name: 'Improvement of the Flesh',
						description: 'You select an echelon 1 Psionic Implant that you have already had installed. You gain the effects of this implant.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'psi-borg-feature-3-3',
						name: 'Vestige of the Vessel',
						current: false,
						former: true,
						customID: '',
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAncestryFeature({
						id: 'psi-borg-feature-3-4',
						name: 'Vestige of the Vessel',
						current: false,
						former: true,
						customID: '',
						value: 2
					}),
					value: 2
				}
			],
			count: 'ancestry'
		})
	],
	ancestryPoints: 3
};
