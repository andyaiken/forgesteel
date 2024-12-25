import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const hakaan: Ancestry = {
	id: 'ancestry-hakaan',
	name: 'Hakaan',
	description: 'In spite of their friendly, outgoing nature, the rare presence of a hakaan in human society is considered a harbinger—an omen of dark times. Descended from a tribe of giants in upper Vanigar, the original Haka’an tribe made a bargain with Holkatja the Vanigar trickster god. They traded some of their gigantic size and strength for the ability to see the future.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'hakaan-size',
			sizeValue: 1,
			sizeMod: 'L'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'hakaan-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createFeature({
			id: 'hakaan-feature-1',
			name: 'Doomsight',
			description: 'Working with your Director, you can predetermine an encounter in which you will die. When that encounter begins, you become doomed. While doomed, you lose the Undaunted benefit from this ancestry, you automatically get tier 3 results on tests and resistance rolls, and you don’t die no matter how low your Stamina falls. You then die immediately at the end of the encounter. If you don’t predetermine your death encounter, you can choose to become doomed while you are dying with the director’s approval (no action required).'
		}),
		FeatureLogic.feature.createFeature({
			id: 'hakaan-feature-2',
			name: 'Hakaan Might',
			description: 'When you force move a creature or object, you can increase the distance moved by 1.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'hakaan-feature-3',
			name: 'Undaunted',
			description: 'You can’t be weakened. Additionally, when your Stamina equals the negative of your winded value, you turn to rubble instead of dying. You are unaware of your surroundings in this state. After 12 hours, you regain Stamina equal to your recovery value.'
		})
	]
};
