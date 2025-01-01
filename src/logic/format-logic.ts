import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';
import { DamageModifier } from '../models/damage-modifier';
import { MonsterRole } from '../models/monster';
import { Size } from '../models/size';

export class FormatLogic {
	static getAbilityType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}
		const qualifiers = (type.qualifiers ?? []).map(q => `(${q})`);

		return [ type.free ? 'Free' : undefined, type.usage, ...qualifiers ]
			.filter(x => x)
			.join(' ');
	};

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
		let desc = `${mod.damageType} ${mod.type} `;

		if (mod.value) {
			desc += `${mod.value >= 0 ? '+' : ''}${mod.value}`;
		}

		if (mod.valuePerLevel) {
			if (desc !== '') {
				desc += ', ';
			}
			desc += `${mod.valuePerLevel >= 0 ? '+' : ''}${mod.valuePerLevel} per level after 1st`;
		}

		if (mod.valuePerEchelon) {
			if (desc !== '') {
				desc += ', ';
			}
			desc += `${mod.valuePerEchelon >= 0 ? '+' : ''}${mod.valuePerEchelon} per echelon`;
		}

		return desc;
	};
}
