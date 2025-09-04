import { FactoryLogic } from '../../logic/factory-logic';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type';

export class ImbuedItemData {
	static imbuedArmor: Item = FactoryLogic.createItem({
		id: 'imbued-armor',
		name: 'Imbued Armor',
		description: 'Armor imbued with an enhancement grants you special benefits while it is worn.',
		type: ItemType.ImbuedArmor
	});

	static imbuedImplement: Item = FactoryLogic.createItem({
		id: 'imbued-implement',
		name: 'Imbued Implement',
		description: `
Implements are jewelry, spectacles, orbs, staffs, tomes, wands, weapons, and other objects used by those who channel magic and psionic power to focus that power. You decide what object to imbue when you create an implement treasure, but it must be an object you can carry or wear. You must have a mundane version of the item you plan to imbue when you start this project. 

An implement imbued with an enhancement grants you special benefits while it is wielded.`,
		type: ItemType.ImbuedImplement
	});

	static imbuedWeapon: Item = FactoryLogic.createItem({
		id: 'imbued-weapon',
		name: 'Imbued Weapon',
		description: 'A weapon imbued with an enhancement grants you special benefits while it is wielded.',
		type: ItemType.ImbuedWeapon
	});
}
