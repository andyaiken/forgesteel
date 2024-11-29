import { DamageModifier } from '../models/damage-modifier';
import { MonsterRole } from '../models/monster';
import { Size } from '../models/size';

export class FormatLogic {
	static getSize = (size: Size) => {
		if (size.value > 1) {
			return size.value.toString();
		}

		return `1${size.mod}`;
	};

	static getRole = (role: MonsterRole) => {
		if (role.isMinion) {
			return `${role.type} Minion`;
		}

		return role.type;
	};

	static getDamageModifier = (mod: DamageModifier) => {
		let str = `${mod.damageType} ${mod.type} ${mod.value}`;
		if (mod.valuePerLevel > 0) {
			str += `, ${mod.valuePerLevel >= 0 ? '+' : ''}${mod.valuePerLevel} per level after 1st`;
		}
		return str;
	};
}
