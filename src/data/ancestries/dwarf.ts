import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';
import { FeatureField } from '../../enums/feature-field';

export const dwarf: Ancestry = {
	id: 'ancestry-dwarf',
	name: 'Dwarf',
	description: 'Possessed of a strength that belies their size, dwarves have flesh infused with stone - a silico-organic hybrid making them physically denser than other humanoids. They enjoy a reputation in Orden as savvy engineers and technologists thanks to the lore they inherited from their elder siblings, the long-extinct steel dwarves.',
	features: [
		FactoryLogic.feature.create({
			id: 'dwarf-feature-1',
			name: 'Runic Carving',
			description: `
You can carve a rune onto your skin and the magic within your body activates it. The rune you carve determines the benefit you receive. You can change or remove this rune with 10 minutes of work while not engaged in combat.

* **Detection**: Pick a specific type of creature, such as “goblins” or “humans” or an object, such as “magic swords” or “potions.” Your rune glows softly when you are within 20 squares of a chosen creature or object, regardless of line of effect. You can change the type of creature as a maneuver.
* **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.
* **Voice**: As a maneuver, you can communicate telepathically with another willing creature you have met before whose name you know, who can speak and understand a language you know, and is within 1 mile of you. You and the creature can respond to one another as if having a normal conversation. You can change the person you communicate with by changing the rune.`
		}),
		FactoryLogic.feature.createChoice({
			id: 'dwarf-feature-2',
			name: 'Dwarf Traits',
			options: [
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'dwarf-feature-2-1',
						name: 'Grounded',
						description: 'Your heavy stone body and connection to the earth makes it difficult for others to move you.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dwarf-feature-2-2',
						name: 'Stand Tough',
						description: 'Your body is made to withstand the blows of your enemies. Your Might counts as 1 higher for resisting potencies.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dwarf-feature-2-3',
						name: 'Stone Singer',
						description: 'You have a magic connection to the earth. You can spend 1 uninterrupted hour singing and reshape any unworked, mundane stone within 3 squares of you. You can’t destroy this stone, but you can move each square of it anywhere within 3 squares of you, piling it off to one side to dig a hole or building it all up to create a wall.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dwarf-feature-2-4',
						name: 'Great Fortitude',
						description: 'Your hearty constitution prevents you from losing strength. You can’t be weakened.'
					}),
					value: 2
				},
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'dwarf-feature-2-5',
						name: 'Spark Off Your Skin',
						description: 'Your stone skin affords you potent protection.',
						field: FeatureField.Stamina,
						value: 6,
						valuePerLevel: 3
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
