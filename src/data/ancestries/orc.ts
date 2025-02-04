import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const orc: Ancestry = {
	id: 'ancestry-orc',
	name: 'Orc',
	description: 'An anger that cannot be hidden. A fury that drives them in battle. Orcs are famed throughout the world as consummate warriors - a reputation that the peace-loving orcs find distasteful.',
	features: [
		FactoryLogic.feature.create({
			id: 'orc-feature-1',
			name: 'Relentless',
			description: 'When a creature deals damage to you that leaves you dying, you can make a free strike against any creature. If the creature is reduced to 0 Stamina by your strike, you can spend a Recovery.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'orc-feature-2',
			name: 'Orc Traits',
			options: [
				{
					feature: FactoryLogic.feature.create({
						id: 'orc-feature-2-1',
						name: 'Bloodfire Rush',
						description: 'The magic coursing through your veins makes you run faster in the heat of battle. When you take damage, your speed increases by 2 until the end of the round. You can benefit from this feature only once per round.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'orc-feature-2-2',
						name: 'Grounded',
						description: 'The magic in your blood makes it difficult for others to move you.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'orc-feature-2-3',
						name: 'Passionate Artisan',
						description: 'When you are stirred by passion for creation, your bloodfire allows you to work longer and harder. Choose two skills from the crafting skill group. Whenever you make a project roll using these skills, you gain a +2 bonus to the roll.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'orc-feature-2-4',
						name: 'Glowing Recovery',
						description: 'Your bloodfire allows you to regain your strength quicker than others. When you can take the Catch Breath maneuver, you can spend as many Recoveries as you like instead of just one.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'orc-feature-2-5',
						name: 'Nonstop',
						description: 'Your bloodfire supplies you with a constant rush of adrenaline. You can’t be slowed.'
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
