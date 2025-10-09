import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';

export class ItemLogic {
	static isTrinket = (item: Item): boolean => {
		return [
			ItemType.Trinket1st,
			ItemType.Trinket2nd,
			ItemType.Trinket3rd,
			ItemType.Trinket4th
		].includes(item.type);
	};

	static isImbuedItem = (item: Item): boolean => {
		return [
			ItemType.ImbuedArmor,
			ItemType.ImbuedImplement,
			ItemType.ImbuedWeapon
		].includes(item.type);
	};

	static isLeveledTreasure = (item: Item): boolean => {
		return [
			ItemType.ImbuedArmor,
			ItemType.ImbuedImplement,
			ItemType.ImbuedWeapon,
			ItemType.LeveledArmor,
			ItemType.LeveledImplement,
			ItemType.LeveledWeapon,
			ItemType.Leveled
		].includes(item.type);
	};
};
