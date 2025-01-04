import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const human: Ancestry = {
	id: 'ancestry-human',
	name: 'Human',
	description: '“Humans,” the dwarf said with a combination of exasperation and awe. “Their only virtue seems to be believing in impossible things.”',
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'human-feature-1',
				name: 'Detect the Supernatural',
				description: 'You open your awareness to detect supernatural creatures and phenomena.',
				type: FactoryLogic.type.createManeuver(),
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				effect: 'Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another plane of existence within 5 squares of you, even if you don’t have line of effect to them. You know if you’re detecting an item or a creature, and you know if a creature is undead, a construct, or from another plane of existence.'
			})
		}),
		FactoryLogic.feature.createChoice({
			id: 'human-feature-2',
			name: 'Human Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'human-feature-2-1',
						name: 'Can\'t Take Hold',
						description: 'Your connection to the natural world allows you resist supernatural effects. You ignore difficult terrain (but not other effects) created by magic and psionic abilities. Additionally, when you are force moved by a magic or psionic ability, you reduce the forced movement by 1.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'human-feature-2-2',
						name: 'Perseverence',
						description: 'Giving up is for other people. You have an edge on tests that use the Endurance skill and when you are slowed, your speed is reduced to 3 instead of 2.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'human-feature-2-3',
						name: 'Resist the Unnatural',
						description: 'Your connection to the natural world protects you from unnatural forces. When you take damage that isn’t untyped, you can use your triggered action to half the damage.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'human-feature-2-4',
						name: 'Determination',
						description: 'Your anatomical tolerance for pain allows you to push through difficult situations. If you are frightened, slowed, or weakened, you can use a maneuver to immediately end the condition.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'human-feature-2-5',
						name: 'Staying Power',
						description: 'Your human anatomy allows you to fight, run, and stay awake longer than others.',
						field: FeatureField.Recoveries,
						value: 2
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
