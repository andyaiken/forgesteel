import { Ancestry } from '../../models/ancestry';
import { ConditionType } from '../../enums/condition-type';
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
You can carve a rune onto your skin with 10 uninterrupted minutes of work, which is activated by the magic within your body. The rune you carve determines the benefit you receive. chosen from among the following:

* **Detection**: Pick a specific type of creature (such as “goblins” or “humans”) or object (such as “gems” or “potions”). Your rune glows softly when you are within 20 squares of any creature or object of thet type, even if you don’t have line of effect to the creature or object. You can change the type of creature or object as a maneuver.
* **Light**: Your skin sheds light for 10 squares. You can turn this on and off as a maneuver.
* **Voice**: As a maneuver, you can communicate telepathically with a willing creature you have met before and who is within 1 mile of you. You must know the creature’s name, and they must speak and understand a language you know. You and the creature can respond to one another as if having a spoken conversation. You can communicate with a different creature by changing the rune.

You can have one rune active at a time, and can change or remove a rune with 10 uninterrupted minutes of work.`
		}),
		FactoryLogic.feature.createChoice({
			id: 'dwarf-feature-2',
			name: 'Dwarf Traits',
			options: [
				{
					feature: FactoryLogic.feature.createBonus({
						id: 'dwarf-feature-2-1',
						name: 'Grounded',
						description: 'Your heavy stone body and connection to the earth make it difficult for others to move you.',
						field: FeatureField.Stability,
						value: 1
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dwarf-feature-2-2',
						name: 'Stand Tough',
						description: 'Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature’s traits or abilities.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.create({
						id: 'dwarf-feature-2-3',
						name: 'Stone Singer',
						description: 'You have a magic connection to the earth. When you spend 1 uninterrupted hour singing, you can reshape any unworked mundane stone within 3 squares. You can’t destroy this stone, but you can move each square of it anywhere within 3 squares of you, piling it off to one side to dig a hole or building it up to create a wall.'
					}),
					value: 1
				},
				{
					feature: FactoryLogic.feature.createConditionImmunity({
						id: 'dwarf-feature-2-4',
						name: 'Great Fortitude',
						description: 'Your hearty constitution prevents you from losing strength.',
						conditions: [ ConditionType.Weakened ]
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
						valuePerEchelon: 6
					}),
					value: 2
				}
			],
			count: 3
		})
	]
};
