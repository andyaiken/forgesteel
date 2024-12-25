import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const wodeElf: Ancestry = {
	id: 'ancestry-wode-elf',
	name: 'Elf (wode)',
	description: 'Children of the sylvan celestials and masters of the elf-haunted forests called wodes, wode elves see all forests as their domain by birthright. They know and enjoy their reputation among humans for snatching children who wander too far into the woods. Humans should fear the trees.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'wode-elf-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'wode-elf-speed',
			field: FeatureField.Speed,
			value: 6
		}),
		FeatureLogic.feature.createFeature({
			id: 'wode-elf-feature-1',
			name: 'Otherworldly Grace',
			description: 'Your elven body and mind can’t be contained for long, and accessing memories is as easy as living in the present for you. You gain an edge on resistance rolls, and on tests that use any skills you have from the lore skill group.'
		}),
		FeatureLogic.feature.createFeature({
			id: 'wode-elf-feature-2',
			name: 'Wode Elf Glamor',
			description: 'You can magically alter your appearance to better blend in with your surroundings. You gain an edge on Agility tests made to hide and sneak, and tests made to find you while you are hidden take a bane.'
		})
	]
};
