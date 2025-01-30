import { DamageModifier, Modifier } from '../models/damage-modifier';
import { AbilityType } from '../models/ability';
import { AbilityUsage } from '../enums/ability-usage';
import { MonsterRole } from '../models/monster';
import { MonsterRoleType } from '../enums/monster-role-type';
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
		if (role.type === MonsterRoleType.NoRole) {
			return role.organization;
		}

		return `${role.organization} ${role.type}`;
	};

	static getDamageModifier = (mod: DamageModifier) => {
		return `${mod.damageType} ${mod.type} ${FormatLogic.getModifier(mod)}`;
	};

	static getModifier = (mod: Modifier) => {
		const sections: string[] = [];
		if (mod.value && mod.valuePerLevel && (mod.value === mod.valuePerLevel)) {
			sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value} per level`);
		} else {
			if (mod.value) {
				sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value}`);
			}

			if (mod.valuePerLevel) {
				sections.push(`${mod.valuePerLevel >= 0 ? '+' : ''} ${mod.valuePerLevel} per level after 1st`);
			}
		}

		if (mod.valuePerEchelon) {
			sections.push(`${mod.valuePerEchelon >= 0 ? '+' : ''} ${mod.valuePerEchelon} per echelon`);
		}

		if (mod.valueCharacteristics.length > 0) {
			sections.push(`+ ${mod.valueCharacteristics.join(' or ')}`);
		}

		return sections.join(' ') || '+0';
	};
}
