import { Ancestry } from '@/models/ancestry';
import { FactoryLogic } from '@/logic/factory-logic';
import { FeatureField } from '@/enums/feature-field';

export const human: Ancestry = {
	id: 'ancestry-human',
	name: 'Human',
	description: 'Humans belong to the world in a way the other speaking peoples do not. You can sense the presence of the supernatural—that … oily smell in the air, as I’ve heard it described. And the presence of deathless causes the hairs on the back of your neck to stand up. Or why do you think graveyards affect you so? Whatever magic is, its grip on you is light. Whatever drives the deathless, your nature rebels against it.',
	features: [
		FactoryLogic.feature.createAbility({
			ability: FactoryLogic.createAbility({
				id: 'human-feature-1',
				name: 'Detect the Supernatural',
				description: 'You open your awareness to detect supernatural creatures and phenomena.',
				type: FactoryLogic.type.createManeuver(),
				distance: [ FactoryLogic.distance.createSelf() ],
				target: 'Self',
				sections: [
					FactoryLogic.createAbilitySectionText('Until the end of your next turn, you know the location of any supernatural object, undead, construct, or creature from another world within 5 squares, even if you don’t have line of effect to that object or creature. You know if you’re detecting an item or a creature, and you know the nature of any creature you detect.')
				]
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
						description: 'Your connection to the natural world allows you to resist certain supernatural effects. You ignore temporary difficult terrain created by magic and psionic abilities. Additionally, when you are force moved by a magic or psionic ability, you can reduce the forced movement distance by 1.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'human-feature-2-2',
						name: 'Perseverence',
						description: 'Giving up is for other people. You gain an edge on tests made using the Endurance skill. Additionally, when you are slowed, your speed is reduced to 3 instead of 2.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'human-feature-2-3',
							name: 'Resist the Unnatural',
							description: 'Your instinctive resilience protects you from injuries beyond the routine.',
							type: FactoryLogic.type.createTrigger('You take damage that isn’t untyped'),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You halve the damage.')
							]
						})
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createAbility({
						ability: FactoryLogic.createAbility({
							id: 'human-feature-2-4',
							name: 'Determination',
							description: 'A tolerance for pain and dsitress allows you to push through difficult situations.',
							type: FactoryLogic.type.createManeuver(),
							distance: [ FactoryLogic.distance.createSelf() ],
							target: 'Self',
							sections: [
								FactoryLogic.createAbilitySectionText('You immediately end one of the frightened, slowed, or weakened conditions on yourself.')
							]
						})
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'human-feature-2-5',
						name: 'Staying Power',
						description: 'Your human physiology allows you to fight, run, and stay awake longer than others.',
						field: FeatureField.Recoveries,
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
