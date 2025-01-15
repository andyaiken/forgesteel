import { AbilityKeyword } from '../enums/ability-keyword';
import { Characteristic } from '../enums/characteristic';
import { FactoryLogic } from '../logic/factory-logic';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';

export class ItemData {
	static blackAshDart: Item = FactoryLogic.createItem({
		id: 'item-black-ash-dart',
		name: 'Black Ash Dart',
		description: 'A diamond-shaped dart holds a shimmering black vial at its core.',
		type: ItemType.Consumable,
		keywords: [ AbilityKeyword.Magic ],
		crafting: FactoryLogic.createProject({
			id: 'item-black-ash-dart-crafting',
			name: 'Crafting',
			prerequisites: 'Three vials of black ash from the College of Black Ash',
			source: 'Texts or lore in Szetch',
			characteristic: [ Characteristic.Agility, Characteristic.Intuition ],
			goal: 45,
			effect: 'Yields 1d3 darts, or three darts if crafted by a shadow'
		}),
		effect: `
As a maneuver, you can make a ranged free strike using a black ash dart. The attack deals 1 bonus damage and adds the following effects to the tier results of the power roll:
* 11 or lower: You can teleport the target up to 2 squares.
* 12–16: You can teleport the target up to 4 squares.
* 17+: You can teleport the target up to 6 squares.`
	});
}
