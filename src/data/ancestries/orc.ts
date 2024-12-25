import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const orc: Ancestry = {
	id: 'ancestry-orc',
	name: 'Orc',
	description: 'An anger that cannot be hidden. A fury that drives them in battle. Orcs are famed throughout the world as consummate warriors—a reputation that the peace-loving orcs find distasteful.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'orc-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'orc-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createFeature({
			id: 'orc-feature-1',
			name: 'Bloodfire Rush',
			description: 'When you take damage, your speed increases by 2 until the end of your next turn. You can benefit from this feature only once per round.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'orc-feature-2',
			name: 'Relentless',
			description: 'When a creature deals damage to you that leaves you dying, you can make a free strike against any creature. If the creature is reduced to 0 Stamina by your attack, you can spend a Recovery.'
		})
	]
};
