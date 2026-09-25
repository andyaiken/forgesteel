import { AbilityKeyword } from '@/enums/ability-keyword';
import { Item } from '@/models/item';
import { ItemType } from '@/enums/item-type';
import { KitWeapon } from '@/enums/kit-weapon';

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

	static isWeapon = (item: Item): boolean => {
		if ([ ItemType.ImbuedWeapon, ItemType.LeveledWeapon ].includes(item.type)) {
			return true;
		}

		// eg artifacts that are wielded as weapons
		const weaponKeywords: string[] = Object.values(KitWeapon);
		return item.keywords.some(kw => weaponKeywords.includes(kw));
	};

	static isImplement = (item: Item): boolean => {
		if ([ ItemType.ImbuedImplement, ItemType.LeveledImplement ].includes(item.type)) {
			return true;
		}

		return item.keywords.some(kw => [ AbilityKeyword.Implement, AbilityKeyword.Orb, AbilityKeyword.Wand ].includes(kw as AbilityKeyword));
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
