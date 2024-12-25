import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const highElf: Ancestry = {
	id: 'ancestry-high-elf',
	name: 'Elf (high)',
	description: 'Children of the solar celestials created to tend their libraries and attend to the true elves as heralds, the high elves remember a better age, before the coming of humans and war. A time when the celestials were still in the world, and all that mattered was art and beauty.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'high-elf-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'high-elf-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createFeature({
			id: 'high-elf-feature-1',
			name: 'High Elf Glamor',
			description: 'A magic glamor makes others perceive you as interesting and engaging, granting you an edge on Presence tests using the Flirt or Persuade skills. This glamor makes you look and sound slightly different to each creature you meet, since what is engaging to one might be different for another. However, you never appear to be anyone other than yourself.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'high-elf-feature-2',
			name: 'Otherworldly Grace',
			description: 'Your elven body and mind can’t be contained for long, and accessing memories is as easy as living in the present for you. You gain an edge on resistance rolls, and on tests that use any skills you have from the lore skill group.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'high-elf-feature-3',
			name: 'Unstoppable Mind',
			description: 'Your mind allows you to maintain your cool in any situation. You can’t be dazed.'
		})
	]
};
