import { Ancestry } from '../../models/ancestry';
import { FeatureField } from '../../enums/feature-field';
import { FeatureLogic } from '../../logic/feature-logic';

export const dwarf: Ancestry = {
	id: 'ancestry-dwarf',
	name: 'Dwarf',
	description: 'Possessed of a strength that belies their size, dwarves have flesh infused with stone—a silico-organic hybrid making them physically denser than other humanoids. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.',
	features: [
		FeatureLogic.feature.createSizeFeature({
			id: 'dwarf-size',
			sizeValue: 1,
			sizeMod: 'M'
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'dwarf-speed',
			field: FeatureField.Speed,
			value: 5
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'dwarf-feature-1',
			name: 'Grounded',
			field: FeatureField.Stability,
			value: 1
		}),
		FeatureLogic.feature.createFeature({
			id: 'dwarf-feature-2',
			name: 'Runic Carving',
			description: `
You can carve a magic rune onto your skin. The rune you carve determines the benefit you receive. You can change or remove this rune with 10 minutes of work while not engaged in combat.
• **Detection**: Pick a specific type of creature, such as “goblins” or “humans” or an object, such as “magic swords” or “potions.” Your rune glows softly when you are within 20 squares of a chosen creature or object, regardless of line of effect. You can change the type of creature as a maneuver.
• **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.
• **Voice**: As a maneuver, you can communicate telepathically with another willing creature you have met before whose name you name, who can speak and understand a language you know, and is within 1 mile of you. You and the creature can respond to one another as if having a normal conversation. You can change the person you communicate with by changing the rune.`
		}),
		FeatureLogic.feature.createBonusFeature({
			id: 'dwarf-feature-3',
			name: 'Spark Off Your Skin',
			field: FeatureField.Stamina,
			value: 6,
			valuePerLevel: 1
		})
	]
};
